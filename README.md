# ByteContent website

Product website and documentation for **ByteContent** by ByteRings, built with
Next.js (App Router). It is exported as **static files** (`out/`) so it can be
published on any static host now, and can later run as a full Next.js app
(remove `output: 'export'` in `next.config.ts`) when the marketplace needs
server features such as accounts and checkout.

## Develop

```bash
pnpm install
pnpm dev            # http://localhost:3200
```

## Build and preview

```bash
pnpm build          # static site in out/
pnpm check-links    # every internal link, #anchor and image must exist
pnpm typecheck
pnpm preview        # serve out/ at http://localhost:3300
```

## What lives where

| Area | Route | Edit |
| ---- | ----- | ---- |
| Home, features, pricing, about, contact, community, brand | `/`, `/features/`, … | `app/(site)/*/page.tsx` |
| Marketplace | `/marketplace/`, `/marketplace/<slug>/`, `/marketplace/publish/` | Listings in `data/marketplace.ts` |
| Blog | `/blog/`, `/blog/<slug>/` | Posts in `data/blog.ts` |
| Changelog | `/changelog/` | `data/changelog.ts` |
| Legal (drafts) | `/legal/<slug>/` | `data/legal.ts` |
| Documentation | `/docs/`, `/docs/<slug>/` | `content/<slug>.html` + sidebar in `site.config.ts` |
| Search index | `/search-index.json` | Built from docs, marketplace and blog |

The `data/` files are the only source of listings, posts and releases, so
they can be replaced one by one with a real backend (marketplace API, CMS)
without changing the pages.

## Site settings

`site.config.ts` holds the product and company names, repository URL,
header navigation and docs sidebar. **Contact emails and social links are
empty on purpose**: fill them in and the Contact, Community, Pricing and
marketplace "Notify me" buttons use them automatically; until then they
point to GitHub Discussions.

## Brand

Starter brand files are in `public/brand/` (logo, dark logo, mark) and
`public/favicon.svg`; colour tokens are at the top of `styles/base.css`. The
`/brand/` page documents them. Replace the files and tokens when the final
brand is ready.

## Screenshots

`public/screenshots/*.png` are real Admin Studio screenshots (1440×900) taken
from a throwaway database seeded with sample content. Retake them after UI
changes.

## Edit documentation

- Pages are HTML fragments in `content/<slug>.html`. Each starts with a
  metadata comment (`title`, optional `nav`, `description`, `layout: home`).
- Write code blocks as fenced blocks (```` ```bash ```` … ```` ``` ````); they are
  escaped and get a copy button automatically.
- Link to other docs pages as `./quickstart.html#anchor` and to other site
  pages as `site:/marketplace/`; links are converted and checked at build time.
- Package-manager tabs:
  `<div class="tabs" data-group="pm"><div class="tab-panel" data-label="npm">…</div>…</div>`.
  Tabs with the same `data-group` stay in sync and remember the reader's choice.
- `<h2>`/`<h3>` headings build the "On this page" outline and the search index.
- Add a page by creating `content/<slug>.html` and listing the slug in
  `site.config.ts`.

## Publish

| Host | How |
| ---- | --- |
| **GitHub Pages** | Push to `main`; `.github/workflows/deploy.yml` builds and deploys (Settings → Pages → Source: GitHub Actions). The base path is set automatically. |
| **Netlify / Cloudflare Pages / Vercel** | Build command `pnpm build`, output directory `out`. |
| **Any web server** | Copy `out/` to the document root. |

When serving from a sub-path manually (e.g. `https://example.com/site/`),
build with `NEXT_PUBLIC_BASE_PATH=/site pnpm build`.

## License

The website code is MIT licensed. "ByteContent", "ByteRings" and the logos
are trademarks of ByteRings.
