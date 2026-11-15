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

    // Tabs: <div class="tabs" data-group="pm"><div class="tab-panel" data-label="npm">…</div>…</div>
    const cleanups: (() => void)[] = [];
    article.querySelectorAll<HTMLElement>('.tabs[data-group]').forEach((tabs) => {
      if (tabs.querySelector(':scope > .tab-list')) return;
      const group = tabs.dataset.group!;
      const panels = [...tabs.querySelectorAll<HTMLElement>(':scope > .tab-panel')];
      const list = document.createElement('div');
      list.className = 'tab-list';
      list.setAttribute('role', 'tablist');
      const buttons = panels.map((panel) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.setAttribute('role', 'tab');
        button.textContent = panel.dataset.label ?? '';
        list.appendChild(button);
        return button;
      });
      tabs.prepend(list);
      const show = (label: string | null) => {
        let index = panels.findIndex((p) => p.dataset.label === label);
        if (index < 0) index = 0;
        panels.forEach((p, i) => (p.hidden = i !== index));
        buttons.forEach((b, i) => b.setAttribute('aria-selected', String(i === index)));
      };
      let stored: string | null = null;
      try {
        stored = localStorage.getItem(`tabs:${group}`);
      } catch {
        /* storage unavailable */
      }
      show(stored);
      buttons.forEach((button) =>
        button.addEventListener('click', () => {
          const label = button.textContent ?? '';
          try {
            localStorage.setItem(`tabs:${group}`, label);
          } catch {
            /* storage unavailable */
          }
          window.dispatchEvent(new CustomEvent('tabs:change', { detail: { group, label } }));
        }),
      );
      const onChange = (e: Event) => {
        const detail = (e as CustomEvent<{ group: string; label: string }>).detail;
        if (detail.group === group) show(detail.label);
      };
      window.addEventListener('tabs:change', onChange);
      cleanups.push(() => window.removeEventListener('tabs:change', onChange));
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
    return () => {
      article.removeEventListener('click', onClick);
      cleanups.forEach((fn) => fn());
    };
  }, [pathname, router]);

  return null;
}
