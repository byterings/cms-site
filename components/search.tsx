'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { SearchEntry } from '@/lib/content';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

function escapeRegExp(text: string) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function Highlight({ text, terms }: { text: string; terms: string[] }) {
  if (!terms.length) return <>{text}</>;
  const parts = text.split(new RegExp(`(${terms.map(escapeRegExp).join('|')})`, 'ig'));
  return (
    <>
      {parts.map((part, i) =>
        terms.some((t) => t.toLowerCase() === part.toLowerCase()) ? <mark key={i}>{part}</mark> : part,
      )}
    </>
  );
}

function snippet(text: string, term: string) {
  const i = text.toLowerCase().indexOf(term);
  if (i < 0) return text.slice(0, 140);
  const start = Math.max(0, i - 50);
  return `${start > 0 ? '…' : ''}${text.slice(start, start + 160)}`;
}

/** Client-side full-text search over a build-time index (/search-index.json). */
export function Search() {
  const router = useRouter();
  const input = useRef<HTMLInputElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState<SearchEntry[] | null>(null);
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(-1);

  const load = useCallback(() => {
    if (index) return;
    fetch(`${basePath}/search-index.json`)
      .then((r) => r.json())
      .then((data: SearchEntry[]) => setIndex(data))
      .catch(() => setIndex([]));
  }, [index]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (document.activeElement?.tagName ?? '').toLowerCase();
      if (e.key === '/' && tag !== 'input' && tag !== 'textarea') {
        e.preventDefault();
        input.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (box.current && !box.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClick);
    };
  }, []);

  const terms = useMemo(() => query.toLowerCase().split(/\s+/).filter(Boolean), [query]);
  const results = useMemo(() => {
    if (!index || !terms.length) return [];
    return index
      .map((item) => {
        const title = `${item.page} ${item.heading}`.toLowerCase();
        const body = item.text.toLowerCase();
        let score = 0;
        for (const term of terms) {
          const inTitle = title.includes(term);
          const inBody = body.includes(term);
          if (!inTitle && !inBody) return null;
          score += (inTitle ? 10 : 0) + (inBody ? 1 : 0);
        }
        return { item, score };
      })
      .filter((r): r is { item: SearchEntry; score: number } => r !== null)
      .sort((a, b) => b.score - a.score)
      .slice(0, 12)
      .map((r) => r.item);
  }, [index, terms]);

  const go = (item: SearchEntry) => {
    setOpen(false);
    setQuery('');
    router.push(item.url);
  };

  return (
    <div className="search" ref={box}>
      <input
        ref={input}
        type="search"
        placeholder="Search docs…"
        autoComplete="off"
        aria-label="Search documentation"
        aria-controls="search-results"
        aria-expanded={open && query.trim().length > 0}
        role="combobox"
        value={query}
        onFocus={() => {
          load();
          setOpen(true);
        }}
        onChange={(e) => {
          setQuery(e.target.value);
          setSelected(-1);
          setOpen(true);
        }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelected((s) => (results.length ? (s + 1) % results.length : -1));
          } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelected((s) => (results.length ? (s - 1 + results.length) % results.length : -1));
          } else if (e.key === 'Enter') {
            const target = results[selected >= 0 ? selected : 0];
            if (target) go(target);
          } else if (e.key === 'Escape') {
            setQuery('');
            setOpen(false);
            input.current?.blur();
          }
        }}
      />
      <kbd>/</kbd>
      {open && query.trim() ? (
        <div id="search-results" className="search-results" role="listbox">
          {index === null ? <p className="empty">Loading…</p> : null}
          {index !== null && results.length === 0 ? <p className="empty">No results for “{query}”</p> : null}
          {results.map((item, i) => (
            <a
              key={`${item.url}-${i}`}
              role="option"
              aria-selected={i === selected}
              href={`${basePath}${item.url}`}
              onClick={(e) => {
                e.preventDefault();
                go(item);
              }}
            >
              <span className="r-page">{item.page}</span>
              <span className="r-title">
                <Highlight text={item.heading || item.page} terms={terms} />
              </span>
              <span className="r-text">
                <Highlight text={snippet(item.text, terms[0] ?? '')} terms={terms} />
              </span>
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}
