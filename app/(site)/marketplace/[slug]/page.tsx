import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Icon } from '@/components/icon';
import { ListingCard, ListingIcon, PriceBadge } from '@/components/ui';
import { allListings, formatPrice, getListing, relatedListings } from '@/data/marketplace';
import { siteConfig } from '@/site.config';

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return allListings().map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const listing = getListing((await params).slug);
  if (!listing) return {};
  return {
    title: `${listing.name} — Marketplace`,
    description: listing.tagline,
    alternates: { canonical: `/marketplace/${listing.slug}/` },
  };
}

const CAPABILITY_TEXT: Record<string, string> = {
  'records:modify': 'Change field values before records are created or updated (validated like user input)',
  'records:observe': 'Read records after they are created, updated or deleted',
};

export default async function ListingPage({ params }: { params: Promise<Params> }) {
  const listing = getListing((await params).slug);
  if (!listing) notFound();
  const available = listing.status === 'available';
  const notifyHref = siteConfig.contact.email
    ? `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(`Notify me: ${listing.name}`)}`
    : `${siteConfig.repository}/discussions`;

  return (
    <div className="container listing-page">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/marketplace/">Marketplace</Link>
        <span aria-hidden="true">/</span>
        <span>{listing.kind === 'template' ? 'Templates' : listing.category}</span>
      </nav>

      <header className="listing-header">
        <ListingIcon listing={listing} size={72} />
        <div>
          <h1>{listing.name}</h1>
          <p className="listing-tagline">{listing.tagline}</p>
          <div className="listing-badges">
            <PriceBadge listing={listing} />
            {available ? <span className="badge free">Available</span> : <span className="badge soon">Coming soon</span>}
            {listing.author.official ? (
              <span className="badge brand">
                <Icon name="check" size={12} /> Official
              </span>
            ) : null}
            <span className="badge">{listing.kind === 'template' ? 'Template' : 'Plugin'}</span>
          </div>
        </div>
      </header>

      <div className="listing-body">
        <div className="listing-main prose">
          <h2>Overview</h2>
          {listing.description.map((p) => (
            <p key={p.slice(0, 32)}>{p}</p>
          ))}
          <h2>Features</h2>
          <ul>
            {listing.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          {listing.capabilities?.length ? (
            <>
              <h2>Permissions</h2>
              <p>This plugin asks for the following capabilities. The Admin Studio shows them next to the plugin before you enable it.</p>
              <ul className="capabilities">
                {listing.capabilities.map((c) => (
                  <li key={c}>
                    <code>{c}</code> — {CAPABILITY_TEXT[c] ?? c}
                  </li>
                ))}
              </ul>
            </>
          ) : null}
          <h2>Installation</h2>
          {available && listing.install ? (
            <p>{listing.install}</p>
          ) : (
            <p>
              This {listing.kind} is not released yet. When it is, you will be able to install it from the Admin Studio
              or with the <code>bytecontent</code> CLI.
            </p>
          )}
          {listing.docs ? (
            <p>
              <Link href={listing.docs}>Read the documentation →</Link>
            </p>
          ) : null}
        </div>

        <aside className="listing-aside">
          <div className="buy-box">
            <p className="buy-price">{formatPrice(listing.price)}</p>
            {listing.price.type === 'paid' ? (
              <p className="buy-note">{listing.price.period === 'one-time' ? 'One-time purchase' : 'Billed yearly'} · indicative</p>
            ) : (
              <p className="buy-note">Free to use</p>
            )}
            {available ? (
              listing.docs ? (
                <Link className="button primary" href={listing.docs}>
                  Get started
                </Link>
              ) : null
            ) : (
              <a className="button primary" href={notifyHref} rel="noopener">
                <Icon name="bell" size={16} /> Notify me
              </a>
            )}
          </div>
          <dl className="listing-facts">
            <div>
              <dt>Publisher</dt>
              <dd>
                {listing.author.name}
                {listing.author.official ? ' (official)' : ''}
              </dd>
            </div>
            <div>
              <dt>Category</dt>
              <dd>{listing.category}</dd>
            </div>
            <div>
              <dt>Version</dt>
              <dd>{listing.version ?? 'Not released'}</dd>
            </div>
            {listing.updated ? (
              <div>
                <dt>Updated</dt>
                <dd>{listing.updated}</dd>
              </div>
            ) : null}
            <div>
              <dt>Works with</dt>
              <dd>ByteContent 0.1+</dd>
            </div>
            <div>
              <dt>Tags</dt>
              <dd className="tag-list">
                {listing.tags.map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
        </aside>
      </div>

      <section className="mp-section">
        <h2>Related</h2>
        <div className="listing-grid">
          {relatedListings(listing).map((l) => (
            <ListingCard key={l.slug} listing={l} />
          ))}
        </div>
      </section>
    </div>
  );
}
