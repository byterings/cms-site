# ByteRings CMS documentation website

Next.js (App Router) site for the ByteRings CMS documentation. It is
exported as **static files** (`out/`) so it can be published on any static
host now, and can later run as a full Next.js app (remove `output: 'export'`
in `next.config.ts`) when server features are needed.

## Develop

```bash
pnpm install
pnpm dev            # http://localhost:3200 (pages reload as you edit content/)
```

## Build and preview

```bash
pnpm build          # static site in out/
pnpm check-links    # every internal link and #anchor must exist
pnpm preview        # serve out/ at http://localhost:3300
```

## Edit content

- Pages are HTML fragments in `content/<slug>.html`. Each starts with a
  metadata comment (`title`, optional `nav`, `description`, `layout: home`).
- Write code blocks as fenced blocks (```` ```bash ```` … ```` ``` ````); they are
  escaped and get a copy button automatically.
- Link to other pages as `./quickstart.html#anchor`; links are converted to
  site routes and checked at build time.
- `<h2>`/`<h3>` headings build the "On this page" outline and the search index.
- Add a new page by creating `content/<slug>.html` and listing the slug in
  `site.config.ts` (sidebar order = reading order).
- The product name, tagline and repository URL are in `site.config.ts`.

## Publish

The build output in `out/` is plain HTML/CSS/JS:

| Host | How |
| ---- | --- |
| **GitHub Pages** | Push to `main`; `.github/workflows/deploy.yml` builds and deploys (Settings → Pages → Source: GitHub Actions). The base path is set automatically. |
| **Netlify / Cloudflare Pages / Vercel** | Build command `pnpm build`, output directory `out`. Or drag-and-drop the `out/` folder into Netlify Drop. |
| **Any web server** | Copy `out/` to the document root. |

When serving from a sub-path manually (e.g. `https://example.com/docs/`), build
with `NEXT_PUBLIC_BASE_PATH=/docs pnpm build`.

## Structure

```
app/            Next.js routes (/, /[slug]/, /search-index.json)
components/     Shell, sidebar, search, outline, theme toggle
content/        Documentation pages (HTML fragments)
lib/content.ts  Loads and processes pages at build time
public/         Static assets (favicon)
scripts/        preview server, link checker
site.config.ts  Site name and navigation
```
