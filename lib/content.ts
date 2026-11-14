import 'server-only';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { siteConfig } from '@/site.config';

/**
 * Documentation pages live in content/<slug>.html as HTML fragments that
 * start with a metadata comment:
 *
 *   <!--
 *   title: Quickstart
 *   nav: Quickstart            (optional sidebar label)
 *   description: ...
 *   layout: home               (optional: no "On this page" outline)
 *   -->
 *
 * Markdown-style fenced code blocks (```lang ... ```) are HTML-escaped and
 * get a copy button. <h2>/<h3> get ids and feed the outline and search.
 * Links written as ./page.html#anchor become site routes.
 */

export interface TocItem {
  level: 2 | 3;
  id: string;
  text: string;
}

export interface SearchEntry {
  url: string;
  page: string;
  heading: string;
  text: string;
}

export interface DocPage {
  slug: string;
  title: string;
  navTitle: string;
  description: string;
  layout: 'doc' | 'home';
  html: string;
  toc: TocItem[];
  search: SearchEntry[];
}

const CONTENT_DIR = join(process.cwd(), 'content');
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const escapeHtml = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const stripTags = (html: string) =>
  html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();

const slugify = (text: string) =>
  stripTags(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

/** Route of a page, relative to the site root (without base path). */
export function routeOf(slug: string): string {
  return slug === 'index' ? '/' : `/${slug}/`;
}

function parse(slug: string): DocPage {
  const raw = readFileSync(join(CONTENT_DIR, `${slug}.html`), 'utf8');
  const match = /^<!--([\s\S]*?)-->\s*/.exec(raw);
  if (!match) throw new Error(`content/${slug}.html must start with a metadata comment`);
  const meta: Record<string, string> = {};
  for (const line of match[1]!.split('\n')) {
    const m = /^\s*(\w+)\s*:\s*(.+?)\s*$/.exec(line);
    if (m) meta[m[1]!] = m[2]!;
  }
  if (!meta.title) throw new Error(`content/${slug}.html needs a title`);
  let html = raw.slice(match[0].length);

  // Fenced code blocks.
  html = html.replace(/^```([\w-]*)[ \t]*\r?\n([\s\S]*?)^```[ \t]*$/gm, (_m, lang: string, code: string) => {
    const label = lang ? `<span class="code-lang">${escapeHtml(lang)}</span>` : '';
    const cls = lang ? ` class="language-${escapeHtml(lang)}"` : '';
    return `<div class="code-block">${label}<button class="copy" type="button" aria-label="Copy code">Copy</button><pre><code${cls}>${escapeHtml(
      code.replace(/\r?\n$/, ''),
    )}</code></pre></div>`;
  });

  // Internal links: ./page.html#anchor -> /page/#anchor (with base path).
  html = html.replace(/href="\.\/([\w-]+)\.html(#[^"]*)?"/g, (_m, page: string, hash = '') => {
    if (!pageSlugs().includes(page)) throw new Error(`content/${slug}.html links to unknown page "${page}"`);
    return `href="${basePath}${routeOf(page)}${hash}"`;
  });

  // Heading ids + outline.
  const toc: TocItem[] = [];
  const used = new Set<string>();
  html = html.replace(/<h([23])([^>]*)>([\s\S]*?)<\/h\1>/g, (_m, level: string, attrs: string, inner: string) => {
    const existing = /\sid="([^"]+)"/.exec(attrs);
    let id = existing ? existing[1]! : slugify(inner);
    while (used.has(id)) id = `${id}-x`;
    used.add(id);
    toc.push({ level: Number(level) as 2 | 3, id, text: stripTags(inner) });
    const rest = existing ? attrs : `${attrs} id="${id}"`;
    return `<h${level}${rest}><a class="anchor" href="#${id}" aria-hidden="true">#</a>${inner}</h${level}>`;
  });

  // Search: page intro + one entry per h2 section.
  const search: SearchEntry[] = html.split(/(?=<h2[\s>])/).map((part) => {
    const heading = /<h2[^>]*id="([^"]+)"[^>]*>([\s\S]*?)<\/h2>/.exec(part);
    return {
      url: `${routeOf(slug)}${heading ? `#${heading[1]}` : ''}`,
      page: meta.title!,
      heading: heading ? stripTags(heading[2]!).replace(/^#\s*/, '') : '',
      text: stripTags(part).replace(/^#\s*/, '').slice(0, 1200),
    };
  });

  return {
    slug,
    title: meta.title,
    navTitle: meta.nav ?? meta.title,
    description: meta.description ?? siteConfig.tagline,
    layout: meta.layout === 'home' ? 'home' : 'doc',
    html,
    toc,
    search,
  };
}

export function pageSlugs(): string[] {
  return siteConfig.nav.flatMap((group) => [...group.pages]);
}

const cache = new Map<string, DocPage>();

export function getPage(slug: string): DocPage | null {
  if (!pageSlugs().includes(slug)) return null;
  if (!cache.has(slug) || process.env.NODE_ENV === 'development') cache.set(slug, parse(slug));
  return cache.get(slug)!;
}

export function allPages(): DocPage[] {
  return pageSlugs().map((slug) => getPage(slug)!);
}

export interface NavGroup {
  title: string;
  items: { slug: string; title: string; href: string }[];
}

export function navigation(): NavGroup[] {
  return siteConfig.nav.map((group) => ({
    title: group.title,
    items: group.pages.map((slug) => ({ slug, title: getPage(slug)!.navTitle, href: routeOf(slug) })),
  }));
}

export function neighbours(slug: string): { prev: DocPage | null; next: DocPage | null } {
  const slugs = pageSlugs();
  const index = slugs.indexOf(slug);
  return {
    prev: index > 0 ? getPage(slugs[index - 1]!) : null,
    next: index >= 0 && index < slugs.length - 1 ? getPage(slugs[index + 1]!) : null,
  };
}
