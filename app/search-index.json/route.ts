import { allPages } from '@/lib/content';

// Generated once at build time and written to out/search-index.json.
export const dynamic = 'force-static';

export function GET() {
  return Response.json(allPages().flatMap((page) => page.search));
}
