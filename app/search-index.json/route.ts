import { allPosts } from '@/data/blog';
import { allListings } from '@/data/marketplace';
import { allPages, type SearchEntry } from '@/lib/content';

// Generated once at build time and written to out/search-index.json.
// Covers the docs, the marketplace and the blog.
export const dynamic = 'force-static';

export function GET() {
  const docs = allPages().flatMap((page) => page.search.map((e) => ({ ...e, page: `Docs · ${e.page}` })));
  const listings: SearchEntry[] = allListings().map((l) => ({
    url: `/marketplace/${l.slug}/`,
    page: `Marketplace · ${l.kind === 'template' ? 'Template' : 'Plugin'}`,
    heading: l.name,
    text: `${l.tagline} ${l.description.join(' ')} ${l.tags.join(' ')}`,
  }));
  const posts: SearchEntry[] = allPosts().map((p) => ({
    url: `/blog/${p.slug}/`,
    page: 'Blog',
    heading: p.title,
    text: p.summary,
  }));
  return Response.json([...docs, ...listings, ...posts]);
}
