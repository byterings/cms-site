import Link from 'next/link';
import type { ReactNode } from 'react';
import { formatPrice, type Listing } from '@/data/marketplace';
import { Icon, type IconName } from './icon';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/** Adds the base path to root-relative links in trusted HTML (blog, legal). */
export function withBasePath(html: string): string {
  return basePath ? html.replace(/href="\/(?!\/)/g, `href="${basePath}/`) : html;
}

export function SectionHeader({
  eyebrow,
  title,
  children,
  center = true,
}: {
  eyebrow?: string;
  title: ReactNode;
  children?: ReactNode;
  center?: boolean;
}) {
  return (
    <div className={center ? 'section-header center' : 'section-header'}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {children ? <p className="section-lead">{children}</p> : null}
    </div>
  );
}

export function PageHero({ eyebrow, title, children }: { eyebrow?: string; title: ReactNode; children?: ReactNode }) {
  return (
    <section className="page-hero">
      <div className="container">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1>{title}</h1>
        {children ? <div className="page-hero-lead">{children}</div> : null}
      </div>
    </section>
  );
}

/** A screenshot in a browser-style frame. */
export function Screenshot({ src, alt, url = 'localhost:3000' }: { src: string; alt: string; url?: string }) {
  return (
    <figure className="browser">
      <div className="browser-bar" aria-hidden="true">
        <span />
        <span />
        <span />
        <div className="browser-url">{url}</div>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`${basePath}${src}`} alt={alt} loading="lazy" width={1440} height={900} />
    </figure>
  );
}

export function FeatureCard({ icon, title, children, href }: { icon: IconName; title: string; children: ReactNode; href?: string }) {
  const body = (
    <>
      <span className="feature-icon">
        <Icon name={icon} size={22} />
      </span>
      <h3>{title}</h3>
      <p>{children}</p>
    </>
  );
  return href ? (
    <Link className="feature-card" href={href}>
      {body}
    </Link>
  ) : (
    <div className="feature-card">{body}</div>
  );
}

export function PriceBadge({ listing }: { listing: Listing }) {
  return listing.price.type === 'free' ? (
    <span className="badge free">Free</span>
  ) : (
    <span className="badge paid">{formatPrice(listing.price)}</span>
  );
}

export function ListingIcon({ listing, size = 44 }: { listing: Listing; size?: number }) {
  return (
    <span className={`listing-icon cat-${listing.category.toLowerCase().replace(/\s+/g, '-')}`} style={{ width: size, height: size }}>
      <Icon name={listing.icon} size={Math.round(size * 0.5)} />
    </span>
  );
}

export function ListingCard({ listing }: { listing: Listing }) {
  return (
    <Link className="listing-card" href={`/marketplace/${listing.slug}/`}>
      <div className="listing-card-head">
        <ListingIcon listing={listing} />
        <div className="listing-badges">
          <PriceBadge listing={listing} />
          {listing.status === 'coming-soon' ? <span className="badge soon">Coming soon</span> : null}
        </div>
      </div>
      <h3>{listing.name}</h3>
      <p>{listing.tagline}</p>
      <div className="listing-meta">
        <span>
          {listing.author.name}
          {listing.author.official ? (
            <span className="verified" title="Official">
              <Icon name="check" size={12} />
            </span>
          ) : null}
        </span>
        <span>{listing.kind === 'template' ? 'Template' : listing.category}</span>
      </div>
    </Link>
  );
}

export function CtaBand({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <section className="cta-band">
      <div className="container cta-inner">
        <div>
          <h2>{title}</h2>
          {children ? <p>{children}</p> : null}
        </div>
        <div className="buttons">
          <Link className="button primary large" href="/docs/installation/">
            Get started
          </Link>
          <Link className="button large" href="/docs/">
            Read the docs
          </Link>
        </div>
      </div>
    </section>
  );
}
