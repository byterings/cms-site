import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { withBasePath } from '@/components/ui';
import { formatDate } from '@/data/blog';
import { getLegalPage, legalPages } from '@/data/legal';

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return legalPages().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const page = getLegalPage((await params).slug);
  if (!page) return {};
  return { title: page.title, alternates: { canonical: `/legal/${page.slug}/` } };
}

export default async function LegalPage({ params }: { params: Promise<Params> }) {
  const page = getLegalPage((await params).slug);
  if (!page) notFound();
  return (
    <div className="container legal">
      <nav className="legal-nav" aria-label="Legal">
        {legalPages().map((p) => (
          <Link key={p.slug} href={`/legal/${p.slug}/`} className={p.slug === page.slug ? 'active' : undefined}>
            {p.title}
          </Link>
        ))}
      </nav>
      <article className="prose">
        <h1>{page.title}</h1>
        <p className="post-meta">Last updated {formatDate(page.updated)}</p>
        {page.draft ? (
          <div className="callout warn">
            <strong>Draft</strong>
            <p>This page is a draft and will be reviewed before the marketplace and hosted services launch.</p>
          </div>
        ) : null}
        <div dangerouslySetInnerHTML={{ __html: withBasePath(page.body) }} />
      </article>
    </div>
  );
}
