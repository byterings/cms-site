import type { IconName } from '@/components/icon';

/**
 * Marketplace listings (static for now). Replace this file with data from
 * the marketplace backend when it exists; pages only use the exported
 * functions below.
 *
 * status:
 *   available    - ships today with ByteContent
 *   coming-soon  - planned; shown as a preview listing
 */
export type ListingKind = 'plugin' | 'template';
export type Price =
  | { type: 'free' }
  | { type: 'paid'; amount: number; currency: 'USD'; period: 'one-time' | 'year' | 'month' };

export interface Listing {
  slug: string;
  name: string;
  kind: ListingKind;
  tagline: string;
  description: string[];
  category: Category;
  icon: IconName;
  price: Price;
  author: { name: string; official: boolean };
  status: 'available' | 'coming-soon';
  version?: string;
  updated?: string;
  features: string[];
  /** Plugin capabilities the listing requests (see the Plugin SDK docs). */
  capabilities?: string[];
  /** How to install it today (available listings only). */
  install?: string;
  docs?: string;
  tags: string[];
  featured?: boolean;
}

export const CATEGORIES = [
  'Content',
  'SEO',
  'Media',
  'Commerce',
  'Integrations',
  'Analytics',
  'Security',
  'Developer tools',
  'Starters',
] as const;
export type Category = (typeof CATEGORIES)[number];

const BYTERINGS = { name: 'ByteRings', official: true };

const listings: Listing[] = [
  {
    slug: 'cms-publishing',
    name: 'Publishing helpers',
    kind: 'plugin',
    tagline: 'Sets the publish date and fills SEO titles automatically.',
    description: [
      'The publishing helpers plugin ships with ByteContent and works with the CMS template. When an article or page is published for the first time it sets publishedAt, and when the SEO title is empty it fills it from the title.',
      'It is a reference for trusted plugins: it only receives record data, returns field changes that the platform validates like any user input, and runs with a time limit.',
    ],
    category: 'Content',
    icon: 'zap',
    price: { type: 'free' },
    author: BYTERINGS,
    status: 'available',
    version: '1.0.0',
    updated: '2026-11-14',
    features: [
      'Sets publishedAt on first publish',
      'Fills an empty SEO title from the title (70 characters)',
      'Logs published records',
      'Enable per workspace in Admin Studio → Templates & plugins',
    ],
    capabilities: ['records:modify', 'records:observe'],
    install: 'Included. Enable it in Admin Studio → Templates & plugins.',
    docs: '/docs/templates-plugins/',
    tags: ['publishing', 'seo', 'workflow'],
    featured: true,
  },
  {
    slug: 'cms-starter',
    name: 'CMS starter',
    kind: 'template',
    tagline: 'Articles, pages, categories, tags and authors, ready to publish.',
    description: [
      'The CMS starter installs a complete content model in one click: articles, pages, categories, tags and authors with SEO fields, media and a draft/published workflow.',
      'It upgrades safely: your own fields and changes are kept, and every upgrade is previewed and recorded in the template history.',
    ],
    category: 'Starters',
    icon: 'layout',
    price: { type: 'free' },
    author: BYTERINGS,
    status: 'available',
    version: '1.0.0',
    updated: '2026-11-14',
    features: [
      'Five entities with relations and SEO fields',
      'Draft / published workflow',
      'Works with the public content API out of the box',
      'Safe upgrades with preview and history',
    ],
    install: 'Included. Install it in Admin Studio → Templates & plugins.',
    docs: '/docs/cms-template/',
    tags: ['blog', 'website', 'starter'],
    featured: true,
  },
  {
    slug: 'seo-toolkit',
    name: 'SEO toolkit',
    kind: 'plugin',
    tagline: 'Search previews, sitemaps and metadata checks for every entry.',
    description: [
      'See how each entry looks in search results while you edit, get warnings for missing or too-long metadata, and publish an XML sitemap through the public API.',
    ],
    category: 'SEO',
    icon: 'search',
    price: { type: 'free' },
    author: BYTERINGS,
    status: 'coming-soon',
    features: ['Search result preview', 'Metadata length and duplicate checks', 'Sitemap endpoint', 'Open Graph fields'],
    capabilities: ['records:observe'],
    tags: ['seo', 'sitemap', 'metadata'],
    featured: true,
  },
  {
    slug: 'webhooks',
    name: 'Webhooks',
    kind: 'plugin',
    tagline: 'Notify any URL when content is created, updated or deleted.',
    description: [
      'Trigger static site rebuilds, cache purges or your own workflows. Deliveries are signed, retried with backoff and visible in a delivery log.',
    ],
    category: 'Integrations',
    icon: 'plug',
    price: { type: 'free' },
    author: BYTERINGS,
    status: 'coming-soon',
    features: ['Per-entity and per-event subscriptions', 'Signed payloads', 'Retries with backoff', 'Delivery log'],
    capabilities: ['records:observe'],
    tags: ['webhooks', 'deploy', 'automation'],
    featured: true,
  },
  {
    slug: 'scheduled-publishing',
    name: 'Scheduled publishing',
    kind: 'plugin',
    tagline: 'Publish and unpublish content at a set date and time.',
    description: [
      'Plan launches and embargoes: choose when an entry goes live and when it is taken down. A calendar shows everything that is scheduled across the workspace.',
    ],
    category: 'Content',
    icon: 'clock',
    price: { type: 'paid', amount: 49, currency: 'USD', period: 'year' },
    author: BYTERINGS,
    status: 'coming-soon',
    features: ['Publish and unpublish dates', 'Content calendar', 'Time zone aware', 'Audit trail of scheduled changes'],
    capabilities: ['records:modify', 'records:observe'],
    tags: ['workflow', 'calendar', 'publishing'],
    featured: true,
  },
  {
    slug: 'content-versions',
    name: 'Content versions',
    kind: 'plugin',
    tagline: 'Full version history with side-by-side diffs and restore.',
    description: [
      'Every save becomes a version. Compare any two versions field by field and restore an earlier one in a click, with the change recorded in the audit log.',
    ],
    category: 'Content',
    icon: 'branch',
    price: { type: 'paid', amount: 79, currency: 'USD', period: 'year' },
    author: BYTERINGS,
    status: 'coming-soon',
    features: ['Unlimited versions', 'Field-level diffs', 'One-click restore', 'Retention settings'],
    capabilities: ['records:observe'],
    tags: ['history', 'diff', 'restore'],
  },
  {
    slug: 'localization',
    name: 'Localization',
    kind: 'plugin',
    tagline: 'Translate content into any number of languages.',
    description: [
      'Add locales to a workspace, mark fields as translatable and edit translations side by side. The public API returns content in the requested locale with fallbacks.',
    ],
    category: 'Content',
    icon: 'globe',
    price: { type: 'paid', amount: 99, currency: 'USD', period: 'year' },
    author: BYTERINGS,
    status: 'coming-soon',
    features: ['Unlimited locales', 'Translatable fields', 'Fallback locales', 'Translation status per entry'],
    capabilities: ['records:modify', 'records:observe'],
    tags: ['i18n', 'translation', 'languages'],
  },
  {
    slug: 'image-transforms',
    name: 'Image transforms',
    kind: 'plugin',
    tagline: 'Resize, crop and convert images on the fly, with focal points.',
    description: [
      'Request any size or format (WebP, AVIF) through URL parameters, set a focal point once and get smart crops everywhere. Works with local and S3-compatible storage.',
    ],
    category: 'Media',
    icon: 'image',
    price: { type: 'paid', amount: 59, currency: 'USD', period: 'year' },
    author: BYTERINGS,
    status: 'coming-soon',
    features: ['Resize and crop by URL', 'WebP and AVIF', 'Focal points', 'Cache-friendly URLs'],
    tags: ['images', 'performance', 'cdn'],
  },
  {
    slug: 'search-sync',
    name: 'Search sync',
    kind: 'plugin',
    tagline: 'Keep Meilisearch, Typesense or Algolia in sync with your content.',
    description: [
      'Choose which entities and fields to index. Changes are pushed to your search engine as they happen, and a full re-index is one click away.',
    ],
    category: 'Integrations',
    icon: 'search',
    price: { type: 'free' },
    author: BYTERINGS,
    status: 'coming-soon',
    features: ['Meilisearch, Typesense and Algolia', 'Field mapping', 'Live updates', 'Full re-index'],
    capabilities: ['records:observe'],
    tags: ['search', 'meilisearch', 'algolia'],
  },
  {
    slug: 'commerce-catalog',
    name: 'Commerce catalog sync',
    kind: 'plugin',
    tagline: 'Sync products and prices from Stripe or Shopify.',
    description: [
      'Enrich products with rich content in ByteContent while prices and stock stay in your commerce platform. Products are kept in sync in both directions.',
    ],
    category: 'Commerce',
    icon: 'cart',
    price: { type: 'paid', amount: 149, currency: 'USD', period: 'year' },
    author: BYTERINGS,
    status: 'coming-soon',
    features: ['Stripe and Shopify', 'Product and price sync', 'Rich product content', 'Sync log'],
    capabilities: ['records:modify', 'records:observe'],
    tags: ['ecommerce', 'stripe', 'shopify'],
  },
  {
    slug: 'analytics-widgets',
    name: 'Analytics widgets',
    kind: 'plugin',
    tagline: 'Page views and top content from your analytics, on the dashboard.',
    description: [
      'Connect Plausible, Umami or Google Analytics and see which content performs best without leaving the Admin Studio.',
    ],
    category: 'Analytics',
    icon: 'chart',
    price: { type: 'free' },
    author: BYTERINGS,
    status: 'coming-soon',
    features: ['Plausible, Umami and Google Analytics', 'Top content', 'Per-entry statistics'],
    tags: ['analytics', 'dashboard'],
  },
  {
    slug: 'sso',
    name: 'Single sign-on',
    kind: 'plugin',
    tagline: 'Sign in with OIDC or SAML, and provision members automatically.',
    description: [
      'Connect Okta, Microsoft Entra ID, Google Workspace or any OIDC/SAML identity provider. Map groups to ByteContent roles and remove access when people leave.',
    ],
    category: 'Security',
    icon: 'key',
    price: { type: 'paid', amount: 299, currency: 'USD', period: 'year' },
    author: BYTERINGS,
    status: 'coming-soon',
    features: ['OIDC and SAML 2.0', 'Group to role mapping', 'Just-in-time provisioning', 'Enforce SSO per workspace'],
    tags: ['sso', 'saml', 'oidc', 'enterprise'],
  },
  {
    slug: 'audit-export',
    name: 'Audit log export',
    kind: 'plugin',
    tagline: 'Stream audit events to your SIEM or storage bucket.',
    description: [
      'Send every audit event to Datadog, Splunk, an S3 bucket or a webhook, with longer retention for compliance.',
    ],
    category: 'Security',
    icon: 'shield',
    price: { type: 'paid', amount: 199, currency: 'USD', period: 'year' },
    author: BYTERINGS,
    status: 'coming-soon',
    features: ['Datadog, Splunk, S3 and webhooks', 'Configurable retention', 'Tamper-evident batches'],
    tags: ['audit', 'compliance', 'siem'],
  },
  {
    slug: 'form-submissions',
    name: 'Forms',
    kind: 'plugin',
    tagline: 'Collect form submissions from your site into ByteContent.',
    description: [
      'Create forms as entities and accept submissions through a public endpoint with spam protection and email notifications.',
    ],
    category: 'Content',
    icon: 'form',
    price: { type: 'free' },
    author: BYTERINGS,
    status: 'coming-soon',
    features: ['Public submission endpoint', 'Spam protection', 'Email notifications', 'CSV export'],
    tags: ['forms', 'leads'],
  },
  {
    slug: 'notifications',
    name: 'Team notifications',
    kind: 'plugin',
    tagline: 'Post content updates to Slack, Microsoft Teams or email.',
    description: ['Let your team know when content is published, changed or waiting for review.'],
    category: 'Integrations',
    icon: 'bell',
    price: { type: 'free' },
    author: BYTERINGS,
    status: 'coming-soon',
    features: ['Slack, Teams and email', 'Per-entity rules', 'Digest mode'],
    capabilities: ['records:observe'],
    tags: ['slack', 'teams', 'email'],
  },
  {
    slug: 'graphql',
    name: 'GraphQL API',
    kind: 'plugin',
    tagline: 'A GraphQL endpoint generated from your content model.',
    description: [
      'Query entries and relations in one request. The schema is generated from your entities and follows the same permissions as the REST API.',
    ],
    category: 'Developer tools',
    icon: 'code',
    price: { type: 'free' },
    author: BYTERINGS,
    status: 'coming-soon',
    features: ['Generated schema', 'Relations and filtering', 'Same permissions as REST', 'Persisted queries'],
    tags: ['graphql', 'api'],
  },
  {
    slug: 'docs-starter',
    name: 'Documentation site starter',
    kind: 'template',
    tagline: 'Sections, pages and navigation for product documentation.',
    description: ['A content model for documentation sites: sections, ordered pages, versions and callouts, with a Next.js front end.'],
    category: 'Starters',
    icon: 'book',
    price: { type: 'free' },
    author: BYTERINGS,
    status: 'coming-soon',
    features: ['Sections and ordered pages', 'Versions', 'Next.js front end'],
    tags: ['docs', 'starter'],
  },
  {
    slug: 'commerce-starter',
    name: 'Commerce starter',
    kind: 'template',
    tagline: 'Products, collections and landing pages for an online store.',
    description: ['A complete store content model with products, variants, collections and landing pages, plus a Next.js storefront.'],
    category: 'Starters',
    icon: 'cart',
    price: { type: 'paid', amount: 129, currency: 'USD', period: 'one-time' },
    author: BYTERINGS,
    status: 'coming-soon',
    features: ['Products, variants and collections', 'Landing page blocks', 'Next.js storefront'],
    tags: ['ecommerce', 'starter', 'storefront'],
  },
  {
    slug: 'agency-starter',
    name: 'Agency multi-site starter',
    kind: 'template',
    tagline: 'One installation, a workspace per client site.',
    description: ['Run many client websites from one ByteContent installation: a workspace per client with pages, menus, blog and SEO, isolated by tenancy.'],
    category: 'Starters',
    icon: 'building',
    price: { type: 'paid', amount: 199, currency: 'USD', period: 'one-time' },
    author: BYTERINGS,
    status: 'coming-soon',
    features: ['Workspace per client', 'Pages, menus and blog', 'Shared starter content'],
    tags: ['agency', 'multi-site', 'starter'],
  },
];

export function allListings(): Listing[] {
  return listings;
}

export function getListing(slug: string): Listing | undefined {
  return listings.find((l) => l.slug === slug);
}

export function featuredListings(): Listing[] {
  return listings.filter((l) => l.featured);
}

export function relatedListings(listing: Listing, count = 3): Listing[] {
  return listings
    .filter((l) => l.slug !== listing.slug)
    .sort((a, b) => Number(b.category === listing.category) - Number(a.category === listing.category))
    .slice(0, count);
}

export function formatPrice(price: Price): string {
  if (price.type === 'free') return 'Free';
  const amount = `$${price.amount}`;
  return price.period === 'one-time' ? amount : `${amount} / ${price.period}`;
}
