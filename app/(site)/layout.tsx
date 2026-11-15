import type { ReactNode } from 'react';
import { SiteFooter } from '@/components/site-footer';

/** Product pages: full-width sections and the site footer. */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <main id="content" className="site-main">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
