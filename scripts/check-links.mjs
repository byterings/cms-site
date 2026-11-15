// Verifies that every internal link and #anchor in the static export exists.
//   pnpm build && pnpm check-links
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

const root = resolve('out');
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return name === '_next' ? [] : htmlFiles(full);
    return name.endsWith('.html') ? [full] : [];
  });
}

const ids = new Map();
const pageOf = (path) => {
  const clean = path.replace(/\/$/, '');
  const candidates = [join(root, clean, 'index.html'), join(root, `${clean}.html`)];
  return candidates.find((c) => existsSync(c));
};
const idsOf = (file) => {
  if (!ids.has(file)) ids.set(file, new Set([...readFileSync(file, 'utf8').matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
  return ids.get(file);
};

const problems = [];
for (const file of htmlFiles(root)) {
  const html = readFileSync(file, 'utf8');
  for (const [, src] of html.matchAll(/<img[^>]*\ssrc="([^"]+)"/g)) {
    if (!src.startsWith('/')) continue;
    const local = basePath && src.startsWith(basePath) ? src.slice(basePath.length) : src;
    if (!existsSync(join(root, local))) problems.push(`${relative(root, file)}: missing image ${src}`);
  }
  for (const [, href] of html.matchAll(/href="([^"]+)"/g)) {
    if (/^(https?:|mailto:|data:)/.test(href) || href.startsWith('/_next/') || href.startsWith(`${basePath}/_next/`)) continue;
    const [path, hash] = href.split('#');
    let target = file;
    if (path) {
      if (!path.startsWith('/')) continue;
      const withoutBase = basePath && path.startsWith(basePath) ? path.slice(basePath.length) || '/' : path;
      if (/\.(svg|json|png|ico|txt|css|js)$/.test(withoutBase)) {
        if (!existsSync(join(root, withoutBase))) problems.push(`${relative(root, file)}: missing file ${href}`);
        continue;
      }
      target = pageOf(withoutBase);
      if (!target) {
        problems.push(`${relative(root, file)}: broken link ${href}`);
        continue;
      }
    }
    if (hash && !idsOf(target).has(hash)) problems.push(`${relative(root, file)}: missing anchor ${href}`);
  }
}

if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log(`All internal links OK (${htmlFiles(root).length} pages).`);
