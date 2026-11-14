'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import type { NavGroup } from '@/lib/content';
import { Search } from './search';
import { ThemeToggle } from './theme-toggle';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/** Top bar, sidebar navigation and the mobile menu around every page. */
export function DocsShell({
  siteName,
  repository,
  nav,
  children,
}: {
  siteName: string;
  repository: string;
  nav: NavGroup[];
  children: ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const sidebar = useRef<HTMLElement>(null);

  useEffect(() => {
    setOpen(false);
    sidebar.current?.querySelector('a.active')?.scrollIntoView({ block: 'nearest' });
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle('nav-open', open);
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname === href.replace(/\/$/, '');

  return (
    <>
      <a className="skip" href="#content">
        Skip to content
      </a>
      <header className="topbar">
        <button
          className="menu-toggle"
          type="button"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open}
          aria-controls="sidebar"
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <Link className="brand" href="/">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${basePath}/favicon.svg`} alt="" width={28} height={28} />
          <span>{siteName}</span>
          <span className="brand-docs">Docs</span>
        </Link>
        <Search />
        <div className="topbar-actions">
          <a className="icon-link" href={repository} aria-label="Source code on GitHub" rel="noopener">
            <svg viewBox="0 0 16 16" width="20" height="20" aria-hidden="true">
              <path
                fill="currentColor"
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
              />
            </svg>
          </a>
          <ThemeToggle />
        </div>
      </header>
      <div className="layout">
        <aside id="sidebar" ref={sidebar} className="sidebar" aria-label="Documentation">
          {nav.map((group) => (
            <div className="nav-group" key={group.title}>
              <p className="nav-title">{group.title}</p>
              <ul>
                {group.items.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <li key={item.slug}>
                      <Link href={item.href} className={active ? 'active' : undefined} aria-current={active ? 'page' : undefined}>
                        {item.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </aside>
        {open ? <div className="sidebar-backdrop" onClick={() => setOpen(false)} /> : null}
        {children}
      </div>
    </>
  );
}
