/** Release notes (static for now). */
export interface Release {
  version: string;
  date: string | null;
  title: string;
  status: 'released' | 'upcoming';
  groups: { title: string; items: string[] }[];
}

export const releases: Release[] = [
  {
    version: 'Next',
    date: null,
    title: 'Installer and marketplace',
    status: 'upcoming',
    groups: [
      {
        title: 'Planned',
        items: [
          'npx create-bytecontent installer for npm, pnpm, yarn and bun',
          'Interactive database setup with a connection check and clear warnings',
          'bytecontent CLI: dev, start, setup, migrate, doctor, backup and restore',
          'One .env file at the project root',
          'Marketplace for free and paid plugins and templates',
          'Plugin SDK package (@bytecontent/plugin-sdk)',
        ],
      },
    ],
  },
  {
    version: '0.1.0',
    date: '2026-11-16',
    title: 'Developer preview',
    status: 'released',
    groups: [
      {
        title: 'Platform',
        items: [
          'Multi-tenant workspaces with members, roles (viewer, editor, admin, owner) and API keys',
          'PostgreSQL row-level security on every tenant-owned table',
          'Single or multi tenancy mode per installation',
          'Sessions with Argon2id passwords, CSRF protection and rate limiting',
        ],
      },
      {
        title: 'Content',
        items: [
          'Entities and 11 field types, with field-level read and write permissions',
          'Relations, unique fields, soft delete and optimistic concurrency',
          'Media library on local disk or S3-compatible storage',
          'CMS starter template with safe upgrades and history',
        ],
      },
      {
        title: 'APIs and tools',
        items: [
          'REST API documented with OpenAPI 3.1',
          'Read-only public content API',
          'Typed TypeScript SDK',
          'CLI for schema export, diff, push and type generation',
          'Trusted plugins with record hooks',
        ],
      },
      {
        title: 'Operations',
        items: [
          'Structured JSON logs with request ids',
          'Tenant quotas and usage',
          'Backup and restore scripts with an automated restore drill',
          'Production Docker images and Docker Compose with automatic HTTPS',
        ],
      },
    ],
  },
];
