import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DocView } from '@/components/doc-view';
import { getPage, pageSlugs, routeOf } from '@/lib/content';

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return pageSlugs()
    .filter((slug) => slug !== 'index')
    .map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getPage(slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: routeOf(slug) },
    openGraph: { title: page.title, description: page.description },
  };
}

export default async function DocPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const page = getPage(slug);
  if (!page || slug === 'index') notFound();
  return <DocView page={page} />;
}
