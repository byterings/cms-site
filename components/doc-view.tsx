import Link from 'next/link';
import { neighbours, routeOf, type DocPage } from '@/lib/content';
import { siteConfig } from '@/site.config';
import { ArticleEnhancer } from './article-enhancer';
import { Toc } from './toc';

/** Renders one documentation page: article, pager, footer and outline. */
export function DocView({ page }: { page: DocPage }) {
  const { prev, next } = neighbours(page.slug);
  return (
    <>
      <main id="content" className="content">
        <article
          className={page.layout === 'home' ? 'prose prose-home' : 'prose'}
          dangerouslySetInnerHTML={{ __html: page.html }}
        />
        <ArticleEnhancer />
        <nav className="pager" aria-label="Previous and next page">
          {prev ? (
            <Link className="pager-link prev" href={routeOf(prev.slug)}>
              <span>Previous</span>
              {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link className="pager-link next" href={routeOf(next.slug)}>
              <span>Next</span>
              {next.title}
            </Link>
          ) : null}
        </nav>
        <footer className="footer">
          <p>
            {siteConfig.name} is open source under the GNU AGPL-3.0.{' '}
            <a href={siteConfig.repository}>Source code</a>
          </p>
        </footer>
      </main>
      {page.layout === 'doc' ? <Toc items={page.toc} /> : null}
    </>
  );
}
