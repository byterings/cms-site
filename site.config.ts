// Site-wide settings. Every page reads the product name, links and contact
// details from here. Leave a value empty to hide it on the site.
export const siteConfig = {
  name: 'ByteContent',
  company: 'ByteRings',
  tagline: 'The open-source headless CMS for multi-tenant content platforms.',
  description:
    'ByteContent is an open-source, metadata-driven headless CMS by ByteRings. Model content in the browser, deliver it through a typed REST API, and run one tenant or thousands on PostgreSQL.',
  repository: 'https://github.com/byterings/bytecontent',
  /** Public URL of the published site (canonical links); optional. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? '',
  /** Contact and social links: shown only when set. */
  contact: {
    email: '',
    salesEmail: '',
    securityEmail: '',
  },
  social: {
    discord: '',
    x: '',
    linkedin: '',
    youtube: '',
  },
  /** Main navigation in the header. */
  mainNav: [
    { title: 'Features', href: '/features/' },
    { title: 'Marketplace', href: '/marketplace/' },
    { title: 'Docs', href: '/docs/' },
    { title: 'Pricing', href: '/pricing/' },
    { title: 'Blog', href: '/blog/' },
  ],
  /** Documentation sidebar: page slugs are file names in content/ without .html. */
  nav: [
    { title: 'Getting started', pages: ['index', 'installation', 'quickstart', 'concepts'] },
    { title: 'Using the Admin Studio', pages: ['admin-studio', 'field-types', 'cms-template'] },
    {
      title: 'Developers',
      pages: ['rest-api', 'public-api', 'sdk', 'cli', 'templates-plugins'],
    },
    { title: 'Plugins', pages: ['build-a-plugin', 'plugin-sdk'] },
    {
      title: 'Operations',
      pages: ['deployment', 'configuration', 'backup-restore', 'maintenance-monitoring', 'security'],
    },
  ],
} as const;
