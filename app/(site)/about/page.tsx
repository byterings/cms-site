import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@/components/icon';
import { PageHero } from '@/components/ui';

export const metadata: Metadata = {
  title: 'About ByteRings',
  description: 'ByteRings builds ByteContent, the open-source headless CMS for multi-tenant content platforms.',
  alternates: { canonical: '/about/' },
};

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About" title="We are ByteRings. We build ByteContent.">
        <p>
          ByteRings is a software company focused on content infrastructure. ByteContent is our open-source headless CMS,
          built for teams that publish for many audiences, clients or customers from one platform.
        </p>
      </PageHero>
      <section className="section tight">
        <div className="container split">
          <div className="prose">
            <h2>Why we built ByteContent</h2>
            <p>
              We kept meeting the same problem: content platforms are designed for one team and one website. Agencies run
              dozens of copies. SaaS products bolt content onto their own database. Large organisations stretch one
              installation with conventions and hope.
            </p>
            <p>
              ByteContent starts from the other end. Workspaces, roles and isolation are part of the core, enforced by the
              database. The content model is metadata you can design in the browser and keep in Git. Upgrades are
              previewed and recorded. And it is all open source.
            </p>
            <h2>How we work</h2>
            <p>
              We build in the open under the MIT License, write down our architecture decisions, and automatically test
              the things that matter most: tenant isolation, upgrades and restores.
            </p>
          </div>
          <div className="values">
            <div>
              <Icon name="shield" size={22} />
              <h3>Safe by default</h3>
              <p>Security and isolation are core features, never paid extras.</p>
            </div>
            <div>
              <Icon name="heart" size={22} />
              <h3>Open source</h3>
              <p>MIT licensed core. You own your content and your infrastructure.</p>
            </div>
            <div>
              <Icon name="refresh" size={22} />
              <h3>Upgrades without fear</h3>
              <p>Every change is previewed, atomic and recorded.</p>
            </div>
            <div>
              <Icon name="users" size={22} />
              <h3>Built with the community</h3>
              <p>A marketplace where developers can build and earn.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="section alt">
        <div className="container center">
          <h2>Work with us</h2>
          <p className="section-lead">Questions, partnerships or enterprise needs — we would love to hear from you.</p>
          <div className="buttons center-row">
            <Link className="button primary" href="/contact/">
              Contact us
            </Link>
            <Link className="button" href="/community/">
              Join the community
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
