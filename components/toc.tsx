'use client';

import { useEffect, useState } from 'react';
import type { TocItem } from '@/lib/content';

/** "On this page" outline that highlights the section being read. */
export function Toc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const visible = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) visible.set(entry.target.id, entry.isIntersecting);
        const first = items.find((item) => visible.get(item.id));
        if (first) setActive(first.id);
      },
      { rootMargin: '-70px 0px -60% 0px' },
    );
    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [items]);

  if (items.length < 2) return null;
  return (
    <nav className="toc" aria-label="On this page">
      <p className="toc-title">On this page</p>
      <ul>
        {items.map((item) => (
          <li key={item.id} className={`toc-l${item.level}`}>
            <a href={`#${item.id}`} className={active === item.id ? 'active' : undefined}>
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
