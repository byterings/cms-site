import Link from 'next/link';
import { SiteFooter } from '@/components/site-footer';

export default function NotFound() {
  return (
    <>
      <main id="content" className="site-main">
        <section className="page-hero not-found">
          <div className="container">
            <p className="eyebrow">404</p>
            <h1>Page not found</h1>
            <div className="page-hero-lead">
              <p>The page you are looking for does not exist or has moved. Try the search above, or go to:</p>
            </div>
            <div className="buttons">
              <Link className="button primary" href="/">
                Home
              </Link>
              <Link className="button" href="/docs/">
                Documentation
              </Link>
              <Link className="button" href="/marketplace/">
                Marketplace
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
