import type { Metadata } from 'next';
import Link from 'next/link';
import { CodeTabs, INSTALL_TABS } from '@/components/code';
import { Icon } from '@/components/icon';
import { CtaBand, FeatureCard, ListingCard, Screenshot, SectionHeader } from '@/components/ui';
import { featuredListings } from '@/data/marketplace';
import { siteConfig } from '@/site.config';

export const metadata: Metadata = {
  title: { absolute: `${siteConfig.name} — ${siteConfig.tagline}` },
  alternates: { canonical: '/' },
};

const SDK_EXAMPLE = `import { createClient } from '@bytecontent/sdk';

const cms = createClient({
  baseUrl: process.env.CMS_URL,
  apiKey: process.env.CMS_API_KEY,
});

const articles = await cms.records<Article>('article').list({
  filter: { status: 'published' },
  sort: ['-publishedAt'],
  expand: ['author'],
});`;

const FETCH_EXAMPLE = `// Anonymous, read-only public API - safe in the browser
const res = await fetch(
  'https://cms.example.com/api/v1/public/acme/entities/article/records' +
    '?sort=-publishedAt&expand=author,category',
);
const { data, meta } = await res.json();`;

const CLI_EXAMPLE = `# Keep the content model in Git
bytecontent export              # entities/*.json
bytecontent schema:diff         # review the plan
bytecontent schema:push         # apply it atomically
bytecontent types --out src/cms-types.ts`;

const comparison: { row: string; values: [string, string, string, string] }[] = [
  { row: 'License', values: ['MIT', 'MIT (Community)', 'BSL 1.1', 'MIT'] },
  {
    row: 'Multi-tenancy',
    values: ['Built in, enforced by PostgreSQL RLS', 'Via plugins', 'Custom setup', 'Official plugin'],
  },
  { row: 'Model content in the browser', values: ['Yes', 'Yes (development mode)', 'Yes', 'No, in code'] },
  { row: 'Schema as code with diff & push', values: ['Yes', 'Generated files', 'Schema snapshots', 'Yes, in code'] },
  { row: 'Safe template upgrades', values: ['Yes, with preview & history', '—', '—', '—'] },
  { row: 'Databases', values: ['PostgreSQL', 'PostgreSQL, MySQL, SQLite', 'Most SQL databases', 'PostgreSQL, MongoDB, SQLite'] },
];

export default function HomePage() {
  const featured = featuredListings().slice(0, 6);
  return (
    <>
      <section className="home-hero">
        <div className="hero-glow" aria-hidden="true" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <Link className="hero-pill" href="/blog/introducing-bytecontent/">
              <span className="badge brand">New</span> Introducing ByteContent <Icon name="arrowRight" size={14} />
            </Link>
            <h1>
              The headless CMS for <span className="gradient-text">every team you serve</span>
            </h1>
            <p className="hero-lead">
              ByteContent is an open-source, metadata-driven headless CMS. Model content in the browser, deliver it
              through a typed REST API, and run one workspace or thousands — isolated by PostgreSQL row-level
              security.
            </p>
            <div className="buttons">
              <Link className="button primary large" href="/docs/installation/">
                Get started <Icon name="arrowRight" size={16} />
              </Link>
              <a className="button large" href={siteConfig.repository} rel="noopener">
                <Icon name="github" size={18} /> Star on GitHub
              </a>
            </div>
            <div className="hero-install">
              <div className="hero-install-label">
                Create a project <span className="badge soon">Installer coming soon</span>
              </div>
              <CodeTabs tabs={INSTALL_TABS} group="pm" />
            </div>
            <ul className="hero-points">
              <li>
                <Icon name="check" size={16} /> MIT licensed
              </li>
              <li>
                <Icon name="check" size={16} /> Self-host anywhere
              </li>
              <li>
                <Icon name="check" size={16} /> PostgreSQL
              </li>
            </ul>
          </div>
          <div className="hero-visual">
            <Screenshot src="/screenshots/content-list.png" alt="ByteContent Admin Studio showing a list of articles" />
          </div>
        </div>
      </section>

      <section className="stack-strip">
        <div className="container">
          <p>Built on proven open-source technology</p>
          <ul>
            <li>PostgreSQL</li>
            <li>TypeScript</li>
            <li>NestJS</li>
            <li>Next.js</li>
            <li>OpenAPI 3.1</li>
            <li>Docker</li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="Features" title="Everything a content platform needs, in one product">
            From the schema builder to backups, ByteContent covers the full lifecycle of content — for one site or a
            platform of thousands.
          </SectionHeader>
          <div className="feature-grid">
            <FeatureCard icon="layers" title="Visual schema builder" href="/features/#modeling">
              Create entities and fields in the browser. Forms, lists and validation are generated instantly.
            </FeatureCard>
            <FeatureCard icon="code" title="REST API + OpenAPI" href="/features/#api">
              Filtering, sorting, search, pagination and relation expansion, documented with OpenAPI 3.1.
            </FeatureCard>
            <FeatureCard icon="users" title="Multi-tenant by design" href="/features/#multi-tenancy">
              Workspaces, members and roles with isolation enforced by the database itself.
            </FeatureCard>
            <FeatureCard icon="image" title="Media library" href="/features/#media">
              Upload images and files to local disk or any S3-compatible storage, with type checks.
            </FeatureCard>
            <FeatureCard icon="layout" title="Templates" href="/features/#templates">
              Install a complete content model in one click and upgrade it safely later.
            </FeatureCard>
            <FeatureCard icon="plug" title="Plugins & marketplace" href="/marketplace/">
              Extend ByteContent with free and paid plugins, or build your own with record hooks.
            </FeatureCard>
            <FeatureCard icon="terminal" title="SDK & CLI" href="/features/#developers">
              A typed TypeScript client, schema-as-code and type generation for your entities.
            </FeatureCard>
            <FeatureCard icon="shield" title="Secure by default" href="/features/#security">
              Argon2id passwords, CSRF protection, scoped API keys, field permissions and an audit log.
            </FeatureCard>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <SectionHeader eyebrow="How it works" title="From install to production in three steps" />
          <ol className="how-steps">
            <li>
              <span className="how-num">1</span>
              <h3>Install</h3>
              <p>
                Run ByteContent on your machine, a VPS or Docker. Bring your own PostgreSQL — the installer asks for the
                connection and checks it.
              </p>
            </li>
            <li>
              <span className="how-num">2</span>
              <h3>Model your content</h3>
              <p>
                Start from the CMS template or design entities and fields in the Admin Studio. Export them to Git when
                you are ready.
              </p>
            </li>
            <li>
              <span className="how-num">3</span>
              <h3>Deliver anywhere</h3>
              <p>
                Fetch content from any website or app with the public API, the REST API or the typed SDK. Your
                front end, your framework.
              </p>
            </li>
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <SectionHeader eyebrow="Multi-tenancy" title="One installation. Thousands of isolated workspaces." center={false}>
              Agencies run every client site from one place. SaaS products give every customer their own content
              space. ByteContent isolates each workspace in the application and again in PostgreSQL, so a bug in a
              query can not leak another tenant&apos;s content.
            </SectionHeader>
            <ul className="check-list">
              <li>
                <Icon name="check" size={18} /> Row-level security on every tenant-owned table
              </li>
              <li>
                <Icon name="check" size={18} /> Members, roles and API keys per workspace
              </li>
              <li>
                <Icon name="check" size={18} /> Quotas for records and media storage
              </li>
              <li>
                <Icon name="check" size={18} /> Or switch to single-tenant mode for one organisation
              </li>
            </ul>
            <Link className="text-link" href="/blog/multi-tenancy-with-row-level-security/">
              How the isolation works <Icon name="arrowRight" size={14} />
            </Link>
          </div>
          <div className="tenancy-diagram" aria-label="Diagram: three workspaces share one installation; PostgreSQL row-level security keeps their rows apart">
            <div className="tenants">
              {['Acme', 'Globex', 'Initech'].map((name, i) => (
                <div key={name} className={`tenant t${i}`}>
                  <Icon name="building" size={18} />
                  <span>{name}</span>
                </div>
              ))}
            </div>
            <div className="diagram-arrow" aria-hidden="true" />
            <div className="diagram-box">
              <Icon name="server" size={18} /> ByteContent API <small>tenant context per request</small>
            </div>
            <div className="diagram-arrow" aria-hidden="true" />
            <div className="diagram-box db">
              <Icon name="database" size={18} /> PostgreSQL <small>row-level security policies</small>
            </div>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container split">
          <div>
            <SectionHeader eyebrow="For developers" title="APIs you will enjoy using" center={false}>
              A consistent REST API with an OpenAPI 3.1 contract, a typed SDK, and a CLI that treats your content model
              like code: review changes in pull requests and push them to any environment.
            </SectionHeader>
            <div className="buttons">
              <Link className="button" href="/docs/rest-api/">
                REST API reference
              </Link>
              <Link className="button" href="/docs/sdk/">
                SDK guide
              </Link>
            </div>
          </div>
          <CodeTabs
            tabs={[
              { label: 'SDK', code: SDK_EXAMPLE, lang: 'ts' },
              { label: 'fetch', code: FETCH_EXAMPLE, lang: 'js' },
              { label: 'CLI', code: CLI_EXAMPLE, lang: 'bash' },
            ]}
          />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="Admin Studio" title="A studio your editors will actually like">
            Clean forms generated from your schema, relation pickers, a media library and a draft / published workflow.
          </SectionHeader>
          <div className="shot-grid">
            <Screenshot src="/screenshots/record-edit.png" alt="Editing an article in the Admin Studio" />
            <Screenshot src="/screenshots/schema.png" alt="The schema builder with the fields of an entity" />
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <SectionHeader eyebrow="Marketplace" title="Extend ByteContent with plugins and templates">
            Free and paid plugins and starters from ByteRings and the community. Build your own and sell it.
          </SectionHeader>
          <div className="listing-grid">
            {featured.map((listing) => (
              <ListingCard key={listing.slug} listing={listing} />
            ))}
          </div>
          <div className="center-row">
            <Link className="button" href="/marketplace/">
              Browse the marketplace <Icon name="arrowRight" size={16} />
            </Link>
            <Link className="button" href="/marketplace/publish/">
              Publish a plugin
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="Use cases" title="Built for teams that publish at scale" />
          <div className="usecase-grid">
            <div className="usecase">
              <Icon name="building" size={24} />
              <h3>Agencies</h3>
              <p>Run every client website from one installation, with a workspace and its own editors per client.</p>
            </div>
            <div className="usecase">
              <Icon name="cloud" size={24} />
              <h3>SaaS products</h3>
              <p>Give each of your customers a content space inside your product, backed by one API.</p>
            </div>
            <div className="usecase">
              <Icon name="book" size={24} />
              <h3>Publishers & marketing</h3>
              <p>Articles, pages, authors and SEO fields out of the box, delivered to any front end.</p>
            </div>
            <div className="usecase">
              <Icon name="shield" size={24} />
              <h3>Enterprises</h3>
              <p>Self-host on your own infrastructure with audit logs, roles, backups and no vendor lock-in.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <SectionHeader eyebrow="Compare" title="How ByteContent compares" />
          <div className="compare-wrap">
            <table className="compare">
              <thead>
                <tr>
                  <th />
                  <th className="us">ByteContent</th>
                  <th>Strapi</th>
                  <th>Directus</th>
                  <th>Payload</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map(({ row, values }) => (
                  <tr key={row}>
                    <th scope="row">{row}</th>
                    {values.map((value, i) => (
                      <td key={i} className={i === 0 ? 'us' : undefined}>
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="footnote">
            Based on each project&apos;s public documentation in November 2026. Products change — check their sites for
            the latest details.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <SectionHeader eyebrow="Open source" title="Yours to run, change and extend" center={false}>
              ByteContent is MIT licensed. Self-host it, fork it, embed it in your product, or build a business on the
              marketplace. No telemetry, no lock-in.
            </SectionHeader>
            <div className="buttons">
              <a className="button" href={siteConfig.repository} rel="noopener">
                <Icon name="github" size={18} /> View the source
              </a>
              <Link className="button" href="/community/">
                Join the community
              </Link>
            </div>
          </div>
          <div className="oss-grid">
            <div>
              <Icon name="lock" size={20} />
              <h3>Security first</h3>
              <p>Row-level security, scoped API keys, rate limits and an audit trail.</p>
            </div>
            <div>
              <Icon name="refresh" size={20} />
              <h3>Safe upgrades</h3>
              <p>Template upgrades are previewed, applied atomically and recorded.</p>
            </div>
            <div>
              <Icon name="database" size={20} />
              <h3>Backups built in</h3>
              <p>Backup and restore scripts, verified by an automated restore drill.</p>
            </div>
            <div>
              <Icon name="server" size={20} />
              <h3>Production ready</h3>
              <p>Docker images, structured logs, health checks and automatic HTTPS.</p>
            </div>
          </div>
        </div>
      </section>

      <CtaBand title="Start building with ByteContent">
        Free and open source. Install it in minutes, deploy it anywhere.
      </CtaBand>
    </>
  );
}
