import type { Metadata } from 'next';
import { DocView } from '@/components/doc-view';
import { getPage } from '@/lib/content';
import { siteConfig } from '@/site.config';

const page = () => getPage('index')!;

export function generateMetadata(): Metadata {
  return {
    title: `Documentation`,
    description: page().description,
    alternates: { canonical: '/docs/' },
    openGraph: { title: `${siteConfig.name} documentation`, description: page().description },
  };
}

export default function DocsHome() {
  return <DocView page={page()} />;
}
