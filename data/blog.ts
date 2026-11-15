/** Blog posts (static for now). Bodies are trusted HTML written by the team. */
export interface Post {
  slug: string;
  title: string;
  date: string;
  author: string;
  summary: string;
  tags: string[];
  body: string;
}

const posts: Post[] = [
  {
    slug: 'introducing-bytecontent',
    title: 'Introducing ByteContent',
    date: '2026-11-16',
    author: 'The ByteRings team',
    summary:
      'An open-source headless CMS that treats multi-tenancy, schema-as-code and safe upgrades as core features, not add-ons.',
    tags: ['announcement'],
    body: `
<p class="lead">Today we are introducing ByteContent, an open-source, metadata-driven headless CMS from ByteRings.</p>
<p>Most content platforms are designed for one team and one website. Agencies, SaaS products and larger organisations end up running many copies, or stretching one installation with conventions and hope. ByteContent starts from the other end: one installation can serve one workspace or thousands, each isolated by PostgreSQL row-level security.</p>
<h2>What is in the first release</h2>
<ul>
  <li><strong>Schema builder.</strong> Create entities and fields in the Admin Studio; forms, lists and validation follow automatically.</li>
  <li><strong>REST API with OpenAPI 3.1.</strong> Filtering, sorting, search, pagination and relation expansion, plus a read-only public API for websites and apps.</li>
  <li><strong>Multi-tenancy.</strong> Workspaces, members and roles, with isolation enforced in the application and in the database.</li>
  <li><strong>Media library</strong> on local disk or any S3-compatible storage.</li>
  <li><strong>Templates and plugins.</strong> Install the CMS starter in one click, upgrade it safely, and extend behaviour with trusted plugins.</li>
  <li><strong>Developer tools.</strong> A typed TypeScript SDK and a CLI that keeps your content model in Git.</li>
  <li><strong>Operations.</strong> Structured logs, quotas, backups with an automated restore drill, and production Docker images.</li>
</ul>
<h2>Open source, MIT licensed</h2>
<p>ByteContent is released under the MIT License. Use it for client work, inside your product or as the base of your own platform. We will fund development through the marketplace, paid plugins and a hosted cloud offering.</p>
<h2>What comes next</h2>
<p>We are working on a one-command installer (<code>npx create-bytecontent</code>) that works with npm, pnpm, yarn and bun, and on the marketplace for free and paid plugins. Follow along in the <a href="/changelog/">changelog</a>.</p>
`,
  },
  {
    slug: 'why-mit',
    title: 'Why ByteContent is MIT licensed',
    date: '2026-11-16',
    author: 'The ByteRings team',
    summary: 'We moved from AGPL to MIT before the first release. Here is why, and what it means for plugin authors.',
    tags: ['open source', 'company'],
    body: `
<p class="lead">We started ByteContent under the AGPL. Before the first public release we switched to MIT.</p>
<h2>Adoption matters more than control</h2>
<p>Many companies cannot use AGPL software without a legal review. A CMS is infrastructure: it should be as easy to adopt as the database underneath it.</p>
<h2>A marketplace needs a clear licence</h2>
<p>We want plugin authors to be able to build free and paid plugins, open or closed source, without asking a lawyer whether linking against the core changes their licence. MIT makes that question simple.</p>
<h2>How we sustain the project</h2>
<p>ByteRings earns from paid plugins and templates, support, and a hosted cloud. The core stays free and open. The names ByteContent and ByteRings, and the logos, remain trademarks so that users can tell the official project from forks.</p>
`,
  },
  {
    slug: 'multi-tenancy-with-row-level-security',
    title: 'Multi-tenancy with PostgreSQL row-level security',
    date: '2026-11-16',
    author: 'The ByteRings team',
    summary: 'How ByteContent keeps every workspace isolated, even if application code gets a query wrong.',
    tags: ['engineering', 'security'],
    body: `
<p class="lead">In a multi-tenant CMS the worst bug is one tenant seeing another tenant's content. ByteContent defends against it twice.</p>
<h2>Layer one: the application</h2>
<p>Every request resolves a tenant from the session or API key. Services receive a tenant context and every query is scoped to it.</p>
<h2>Layer two: the database</h2>
<p>Each tenant-owned table has a row-level security policy, and the application connects as a role that cannot bypass it. Each transaction sets the current tenant; PostgreSQL then only returns and accepts rows for that tenant:</p>
<pre><code>ALTER TABLE records ENABLE ROW LEVEL SECURITY;
ALTER TABLE records FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON records
  USING (app_rls_allows(tenant_id))
  WITH CHECK (app_rls_allows(tenant_id));</code></pre>
<p>If a query forgets its <code>WHERE tenant_id = …</code>, the database still filters it. Our test suite checks this directly: it runs queries as the application role without a tenant and expects to see nothing.</p>
<h2>Why not a database per tenant?</h2>
<p>Separate databases isolate well but are expensive to migrate, back up and monitor at thousands of tenants. Row-level security keeps one schema and one migration path while giving strong isolation.</p>
`,
  },
];

export function allPosts(): Post[] {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function formatDate(date: string): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
