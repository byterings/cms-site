'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import type { NavGroup } from '@/lib/content';
import { siteConfig } from '@/site.config';

/** Documentation navigation; on small screens it is the menu drawer. */
export function DocsSidebar({ nav }: { nav: NavGroup[] }) {
  const pathname = usePathname();
  const sidebar = useRef<HTMLElement>(null);

  useEffect(() => {
    sidebar.current?.querySelector('a.active')?.scrollIntoView({ block: 'nearest' });
  }, [pathname]);

  const isActive = (href: string) => pathname === href || pathname === href.replace(/\/$/, '');

  return (
    <aside id="sidebar" ref={sidebar} className="sidebar" aria-label="Documentation">
      <div className="nav-group mobile-only">
        <p className="nav-title">{siteConfig.name}</p>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          {siteConfig.mainNav
            .filter((item) => item.href !== '/docs/')
            .map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.title}</Link>
              </li>
            ))}
        </ul>
      </div>
      {nav.map((group) => (
        <div className="nav-group" key={group.title}>
          <p className="nav-title">{group.title}</p>
          <ul>
            {group.items.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.slug}>
                  <Link
                    href={item.href}
                    className={active ? 'active' : undefined}
                    aria-current={active ? 'page' : undefined}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </aside>
  );
}
