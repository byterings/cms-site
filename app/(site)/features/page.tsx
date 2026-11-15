import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { CodeBlock } from '@/components/code';
import { Icon, type IconName } from '@/components/icon';
import { CtaBand, PageHero, Screenshot } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Features',
  description:
    'Schema builder, REST and public APIs, multi-tenancy with row-level security, media, templates, plugins, SDK, CLI and production operations.',
  alternates: { canonical: '/features/' },
};

function Feature({
  id,
  icon,
  eyebrow,
  title,
  children,
  points,
  visual,
  link,
  reverse,
}: {
  id: string;
  icon: IconName;
  eyebrow: string;
  title: string;
  children: ReactNode;
  points: string[];
  visual: ReactNode;
  link?: { href: string; label: string };
  reverse?: boolean;
}) {
  return (
    <section id={id} className={reverse ? 'feature-row reverse' : 'feature-row'}>
      <div className="feature-text">
        <p className="eyebrow">
          <Icon name={icon} size={16} /> {eyebrow}
        </p>
        <h2>{title}</h2>
        <p className="section-lead">{children}</p>
        <ul className="check-list">
          {points.map((point) => (
            <li key={point}>
              <Icon name="check" size={18} /> {point}
            </li>
          ))}
        </ul>
        {link ? (
          <Link className="text-link" href={link.href}>
            {link.label} <Icon name="arrowRight" size={14} />
          </Link>
        ) : null}
      </div>
      <div className="feature-visual">{visual}</div>
    </section>
  );
}

const FIELD_TYPES = [
  'Text',
  'Long text',
  'Integer',
  'Decimal',
  'Boolean',
  'Date',
  'Date & time',
  'Select',
  'Multi-select',
  'Relation',
  'Media',
];

export default function FeaturesPage() {
  return (
    <>
      <PageHero eyebrow="Features" title="One platform for content, from schema to production">
        <p>
          ByteContent combines a visual schema builder, fast APIs, real multi-tenancy and the operational tools you
          need to run content for one site or thousands.
        </p>
        <nav className="pill-nav" aria-label="Features on this page">
          <a href="#modeling">Content modeling</a>
          <a href="#api">APIs</a>
          <a href="#multi-tenancy">Multi-tenancy</a>
          <a href="#media">Media</a>
          <a href="#templates">Templates</a>
          <a href="#plugins">Plugins</a>
          <a href="#developers">SDK & CLI</a>
          <a href="#security">Security</a>
          <a href="#operations">Operations</a>
        </nav>
      </PageHero>

      <div className="container features-list">
        <Feature
          id="modeling"
          icon="layers"
          eyebrow="Content modeling"
          title="Design your content model in the browser"
          points={[
            '11 field types with validation rules',
            'Required, unique and default values',
            'Field-level read and write permissions per role',
            'Draft changes, then activate a new schema version',
          ]}
          visual={<Screenshot src="/screenshots/schema.png" alt="Schema builder showing the fields of the article entity" />}
          link={{ href: '/docs/admin-studio/', label: 'Admin Studio guide' }}
        >
          Create entities such as articles, products or events and add fields. The Admin Studio generates forms and
          lists from your definitions; the API validates every write against them.
          <span className="chip-row">
            {FIELD_TYPES.map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
          </span>
        </Feature>

        <Feature
          id="api"
          icon="code"
          eyebrow="APIs"
          title="A REST API with an OpenAPI 3.1 contract"
          reverse
          points={[
            'Filter, sort, search and paginate any entity',
            'Expand relations in one request',
            'Anonymous read-only public API for websites',
            'Optimistic concurrency with record versions',
          ]}
          visual={
            <CodeBlock
              lang="http"
              code={`GET /api/v1/entities/article/records
  ?filter[status]=published
  &filter[publishedAt][gte]=2026-01-01
  &sort=-publishedAt
  &expand=author,category
  &page=1&pageSize=20

200 OK
{ "data": [ … ], "meta": { "page": 1, "total": 42 } }`}
            />
          }
          link={{ href: '/docs/rest-api/', label: 'REST API reference' }}
        >
          Every entity gets consistent endpoints the moment you create it. Use API keys with scopes on the server and the
          public API in the browser.
        </Feature>

        <Feature
          id="multi-tenancy"
          icon="users"
          eyebrow="Multi-tenancy"
          title="Real isolation between workspaces"
          points={[
            'PostgreSQL row-level security on tenant data',
            'Members with four roles: viewer, editor, admin, owner',
            'Platform admins provision workspaces',
            'Per-workspace quotas and usage',
          ]}
          visual={<Screenshot src="/screenshots/dashboard.png" alt="Workspace dashboard in the Admin Studio" />}
          link={{ href: '/docs/concepts/', label: 'Core concepts' }}
        >
          Choose single-tenant mode for one organisation, or multi-tenant mode to host many isolated workspaces. Each
          workspace has its own schema, content, media, members and API keys.
        </Feature>

        <Feature
          id="media"
          icon="image"
          eyebrow="Media"
          title="A media library that works with your storage"
          reverse
          points={[
            'Local disk or S3, R2, MinIO and other S3-compatible storage',
            'Content-type sniffing on upload',
            'Alt text and metadata',
            'Public file URLs for published content only',
          ]}
          visual={<Screenshot src="/screenshots/media.png" alt="Media library with uploaded images" />}
        >
          Upload images and documents, reuse them across entries with the media picker, and serve them through the
          public API.
        </Feature>

        <Feature
          id="templates"
          icon="layout"
          eyebrow="Templates"
          title="Start from a template, upgrade without fear"
          points={[
            'CMS starter: articles, pages, categories, tags, authors',
            'Preview every upgrade before applying it',
            'Your own customisations are kept',
            'Upgrade history per workspace',
          ]}
          visual={<Screenshot src="/screenshots/templates.png" alt="Templates page with the CMS starter installed" />}
          link={{ href: '/docs/cms-template/', label: 'The CMS template' }}
        >
          Templates install a complete content model in one click. When a new version is released, ByteContent shows
          exactly what will change and applies it atomically.
        </Feature>

        <Feature
          id="plugins"
          icon="plug"
          eyebrow="Plugins"
          title="Extend behaviour with trusted plugins"
          reverse
          points={[
            'Hooks before and after create, update and delete',
            'Capabilities declared in a manifest',
            'Plugin changes are validated like user input',
            'Enable per workspace, with audit events',
          ]}
          visual={
            <CodeBlock
              lang="js"
              code={`function register(api) {
  api.on('record.beforeCreate', ({ entity, data }) => {
    if (entity === 'article' && !data.seoTitle) {
      return { seoTitle: String(data.title).slice(0, 70) };
    }
  });
}

module.exports = { register };`}
            />
          }
          link={{ href: '/docs/build-a-plugin/', label: 'Build a plugin' }}
        >
          Add automation and integrations with plugins, install them from the <Link href="/marketplace/">marketplace</Link>,
          or publish your own — free or paid.
        </Feature>

        <Feature
          id="developers"
          icon="terminal"
          eyebrow="SDK & CLI"
          title="Developer tools that respect your workflow"
          points={[
            'Typed TypeScript SDK for Node.js, Bun, Deno and edge runtimes',
            'Generate TypeScript types from your entities',
            'Export, diff and push the schema from Git',
            'Destructive changes need an explicit flag',
          ]}
          visual={
            <CodeBlock
              lang="text"
              code={`$ bytecontent schema:push
Plan: 3 change(s)
  + createEntity event
  + createField event.title
  ~ updateField article.title (label)
Apply these changes? [y/N] y
Applied 3 change(s).`}
            />
          }
          link={{ href: '/docs/cli/', label: 'CLI reference' }}
        >
          Treat your content model like code: review it in pull requests and promote it from development to staging to
          production.
        </Feature>

        <Feature
          id="security"
          icon="shield"
          eyebrow="Security"
          title="Secure by default"
          reverse
          points={[
            'Argon2id password hashing and secure session cookies',
            'CSRF protection and rate limiting',
            'Scoped, revocable API keys',
            'Audit log of sensitive actions',
          ]}
          visual={<Screenshot src="/screenshots/api-keys.png" alt="API keys with scopes in the Admin Studio" />}
          link={{ href: '/docs/security/', label: 'Security overview' }}
        >
          Security is part of the core, not a paid add-on: from how passwords are stored to how tenants are isolated.
        </Feature>

        <Feature
          id="operations"
          icon="server"
          eyebrow="Operations"
          title="Ready for production"
          points={[
            'Docker images and Compose with automatic HTTPS',
            'Structured JSON logs with request ids',
            'Backups with an automated restore drill',
            'Maintenance jobs and health checks',
          ]}
          visual={
            <CodeBlock
              lang="bash"
              code={`docker compose --env-file .env.production \\
  -f docker-compose.prod.yml up -d

node scripts/backup.mjs --database-url "$DATABASE_URL" \\
  --storage /srv/media --out /srv/backups   # database + media`}
            />
          }
          link={{ href: '/docs/deployment/', label: 'Deployment guide' }}
        >
          Run ByteContent on a single VPS or your own cloud. Everything you need to operate it safely is included and
          documented.
        </Feature>
      </div>

      <CtaBand title="See it for yourself">Install ByteContent locally in a few minutes.</CtaBand>
    </>
  );
}
