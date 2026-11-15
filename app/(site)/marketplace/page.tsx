import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@/components/icon';
import { MarketplaceBrowser } from '@/components/marketplace-browser';
import { ListingCard, PageHero } from '@/components/ui';
import { allListings } from '@/data/marketplace';

export const metadata: Metadata = {
  title: 'Marketplace',
  description: 'Free and paid plugins and templates for ByteContent: SEO, webhooks, localization, media, commerce, security and more.',
  alternates: { canonical: '/marketplace/' },
};

export default function MarketplacePage() {
  const listings = allListings();
  const available = listings.filter((l) => l.status === 'available');
  return (
    <>
      <PageHero eyebrow="Marketplace" title="Plugins and templates for ByteContent">
        <p>
          Add SEO, workflows, integrations and complete starters to your workspace. Free and paid, from ByteRings and
          the community.
        </p>
        <div className="buttons">
          <a className="button primary" href="#browse">
            Browse all
          </a>
          <Link className="button" href="/marketplace/publish/">
            <Icon name="upload" size={16} /> Publish your plugin
          </Link>
        </div>
      </PageHero>

      <div className="container">
        <div className="notice">
          <Icon name="sparkles" size={20} />
          <p>
            <strong>The marketplace is opening soon.</strong> Items marked “Available” ship with ByteContent today. Others
            are previews of what is coming; prices are indicative until launch.
          </p>
        </div>

        <section className="mp-section">
          <h2>Available now</h2>
          <div className="listing-grid">
            {available.map((listing) => (
              <ListingCard key={listing.slug} listing={listing} />
            ))}
          </div>
        </section>

        <section className="mp-section" id="browse">
          <h2>Browse</h2>
          <MarketplaceBrowser listings={listings} />
        </section>

        <section className="mp-publish-band">
          <div>
            <h2>Build for the ByteContent ecosystem</h2>
            <p>
              Publish free or paid plugins and templates, reach every ByteContent team, and keep the majority of every
              sale.
            </p>
          </div>
          <div className="buttons">
            <Link className="button primary" href="/marketplace/publish/">
              Become a publisher
            </Link>
            <Link className="button" href="/docs/build-a-plugin/">
              Build a plugin
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
