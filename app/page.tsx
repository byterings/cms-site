import type { Metadata } from 'next';
import { DocView } from '@/components/doc-view';
import { getPage } from '@/lib/content';
import { siteConfig } from '@/site.config';

const page = () => getPage('index')!;

export function generateMetadata(): Metadata {
  return {
    title: { absolute: `${siteConfig.name} documentation` },
    description: page().description,
    alternates: { canonical: '/' },
  };
}

export default function HomePage() {
  return <DocView page={page()} />;
}
