'use client';

import { useMemo, useState } from 'react';
import { CATEGORIES, type Listing } from '@/data/marketplace';
import { Icon } from './icon';
import { ListingCard } from './ui';

type PriceFilter = 'all' | 'free' | 'paid';
type KindFilter = 'all' | 'plugin' | 'template';
type Sort = 'featured' | 'name' | 'price';

/** Client-side search and filters over the static listings. */
export function MarketplaceBrowser({ listings }: { listings: Listing[] }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('all');
  const [price, setPrice] = useState<PriceFilter>('all');
  const [kind, setKind] = useState<KindFilter>('all');
  const [availableOnly, setAvailableOnly] = useState(false);
  const [sort, setSort] = useState<Sort>('featured');

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const l of listings) map.set(l.category, (map.get(l.category) ?? 0) + 1);
    return map;
  }, [listings]);

  const results = useMemo(() => {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    const filtered = listings.filter((l) => {
      if (category !== 'all' && l.category !== category) return false;
      if (price !== 'all' && l.price.type !== price) return false;
      if (kind !== 'all' && l.kind !== kind) return false;
      if (availableOnly && l.status !== 'available') return false;
      const haystack = `${l.name} ${l.tagline} ${l.category} ${l.tags.join(' ')}`.toLowerCase();
      return terms.every((t) => haystack.includes(t));
    });
    const priceOf = (l: Listing) => (l.price.type === 'free' ? 0 : l.price.amount);
    return [...filtered].sort((a, b) => {
      if (sort === 'name') return a.name.localeCompare(b.name);
      if (sort === 'price') return priceOf(a) - priceOf(b) || a.name.localeCompare(b.name);
      return (
        Number(b.status === 'available') - Number(a.status === 'available') ||
        Number(!!b.featured) - Number(!!a.featured)
      );
    });
  }, [listings, query, category, price, kind, availableOnly, sort]);

  const reset = () => {
    setQuery('');
    setCategory('all');
    setPrice('all');
    setKind('all');
    setAvailableOnly(false);
  };

  return (
    <div className="mp-layout">
      <aside className="mp-filters" aria-label="Filters">
        <p className="mp-filter-title">Categories</p>
        <ul className="mp-categories">
          <li>
            <button type="button" aria-pressed={category === 'all'} onClick={() => setCategory('all')}>
              All <span>{listings.length}</span>
            </button>
          </li>
          {CATEGORIES.map((c) => (
            <li key={c}>
              <button type="button" aria-pressed={category === c} onClick={() => setCategory(c)}>
                {c} <span>{counts.get(c) ?? 0}</span>
              </button>
            </li>
          ))}
        </ul>
      </aside>
      <div className="mp-main">
        <div className="mp-toolbar">
          <label className="mp-search">
            <Icon name="search" size={18} />
            <span className="sr-only">Search plugins and templates</span>
            <input
              type="search"
              placeholder="Search plugins and templates…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
          <div className="segmented" role="group" aria-label="Price">
            {(['all', 'free', 'paid'] as const).map((p) => (
              <button key={p} type="button" aria-pressed={price === p} onClick={() => setPrice(p)}>
                {p === 'all' ? 'All prices' : p === 'free' ? 'Free' : 'Paid'}
              </button>
            ))}
          </div>
          <div className="segmented" role="group" aria-label="Type">
            {(['all', 'plugin', 'template'] as const).map((k) => (
              <button key={k} type="button" aria-pressed={kind === k} onClick={() => setKind(k)}>
                {k === 'all' ? 'All types' : k === 'plugin' ? 'Plugins' : 'Templates'}
              </button>
            ))}
          </div>
          <label className="mp-check">
            <input type="checkbox" checked={availableOnly} onChange={(e) => setAvailableOnly(e.target.checked)} />
            Available now
          </label>
          <label className="mp-sort">
            <span className="sr-only">Sort by</span>
            <select value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
              <option value="featured">Featured</option>
              <option value="name">Name</option>
              <option value="price">Price: low to high</option>
            </select>
          </label>
          <label className="mp-category-select">
            <span className="sr-only">Category</span>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="all">All categories</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
        </div>
        <p className="mp-count" aria-live="polite">
          {results.length} {results.length === 1 ? 'result' : 'results'}
        </p>
        {results.length ? (
          <div className="listing-grid">
            {results.map((listing) => (
              <ListingCard key={listing.slug} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="mp-empty">
            <p>Nothing matches these filters.</p>
            <button className="button small" type="button" onClick={reset}>
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
