'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { siteConfig } from '@/site.config';
import { Icon } from './icon';
import { Logo } from './logo';
import { Search } from './search';
import { ThemeToggle } from './theme-toggle';

/**
 * Header on every page. On small screens the menu button opens a drawer:
 * the docs sidebar on /docs pages, the main navigation elsewhere.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const inDocs = pathname.startsWith('/docs');

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.classList.toggle('nav-open', open);
  }, [open]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href);

  return (
    <>
      <a className="skip" href="#content">
        Skip to content
      </a>
      <header className="topbar">
        <button
          className="menu-toggle"
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls={inDocs ? 'sidebar' : 'mobile-nav'}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? 'x' : 'menu'} size={22} />
        </button>
        <Link className="brand" href="/" aria-label={`${siteConfig.name} home`}>
          <Logo />
        </Link>
        <nav className="main-nav" aria-label="Main">
          {siteConfig.mainNav.map((item) => (
            <Link key={item.href} href={item.href} className={isActive(item.href) ? 'active' : undefined}>
              {item.title}
            </Link>
          ))}
        </nav>
        <Search />
        <div className="topbar-actions">
          <a className="icon-link" href={siteConfig.repository} aria-label="ByteContent on GitHub" rel="noopener">
            <Icon name="github" size={20} />
          </a>
          <ThemeToggle />
          <Link className="button primary small header-cta" href="/docs/installation/">
            Get started
          </Link>
        </div>
      </header>
      {!inDocs ? (
        <nav id="mobile-nav" className="mobile-nav" aria-label="Main">
          {siteConfig.mainNav.map((item) => (
            <Link key={item.href} href={item.href} className={isActive(item.href) ? 'active' : undefined}>
              {item.title}
            </Link>
          ))}
          <Link href="/about/">About</Link>
          <Link href="/community/">Community</Link>
          <Link className="button primary" href="/docs/installation/">
            Get started
          </Link>
        </nav>
      ) : null}
      {open ? <div className="nav-backdrop" onClick={() => setOpen(false)} /> : null}
    </>
  );
}
