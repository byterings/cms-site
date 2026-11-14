// Site-wide settings. Rename the product here; every page picks it up.
export const siteConfig = {
  name: 'ByteRings CMS',
  tagline: 'A multi-tenant, metadata-driven headless CMS and application platform.',
  repository: 'https://github.com/byterings/byteringscms',
  /** Public URL of the published site (canonical links, sitemap); optional. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? '',
  /** Sidebar groups: page slugs are file names in content/ without .html. */
  nav: [
    { title: 'Getting started', pages: ['index', 'quickstart', 'concepts'] },
    { title: 'Using the Admin Studio', pages: ['admin-studio', 'field-types', 'cms-template'] },
    {
      title: 'Developers',
      pages: ['rest-api', 'public-api', 'sdk', 'cli', 'templates-plugins'],
    },
    {
      title: 'Operations',
      pages: ['deployment', 'configuration', 'backup-restore', 'maintenance-monitoring', 'security'],
    },
  ],
} as const;
