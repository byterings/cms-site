'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/**
 * Adds behaviour to the server-rendered article HTML: copy buttons on code
 * blocks, horizontally scrollable tables, and client-side navigation for
 * internal links.
 */
export function ArticleEnhancer() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const article = document.querySelector('.prose');
    if (!article) return;

    article.querySelectorAll('table').forEach((table) => {
      if (table.parentElement?.classList.contains('table-wrap')) return;
      const wrap = document.createElement('div');
      wrap.className = 'table-wrap';
      table.parentNode?.insertBefore(wrap, table);
      wrap.appendChild(table);
    });

    const onClick = (event: Event) => {
      const target = event.target as HTMLElement;
      const button = target.closest<HTMLButtonElement>('.code-block .copy');
      if (button) {
        const code = button.parentElement?.querySelector('code')?.innerText ?? '';
        void navigator.clipboard?.writeText(code).then(() => {
          button.textContent = 'Copied';
          setTimeout(() => (button.textContent = 'Copy'), 1500);
        });
        return;
      }
      const link = target.closest<HTMLAnchorElement>('a[href]');
      const mouse = event as MouseEvent;
      if (!link || mouse.metaKey || mouse.ctrlKey || mouse.shiftKey || link.target) return;
      const href = link.getAttribute('href') ?? '';
      if (href.startsWith(`${basePath}/`) && !href.startsWith('//')) {
        event.preventDefault();
        router.push(href.slice(basePath.length) || '/');
      }
    };
    article.addEventListener('click', onClick);
    return () => article.removeEventListener('click', onClick);
  }, [pathname, router]);

  return null;
}
