import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon, type IconName } from '@/components/icon';
import { PageHero, SectionHeader } from '@/components/ui';
import { siteConfig } from '@/site.config';

export const metadata: Metadata = {
  title: 'Community',
  description: 'Join the ByteContent community: discussions, contributions, plugins and events.',
  alternates: { canonical: '/community/' },
};

export default function CommunityPage() {
  const { repository, social } = siteConfig;
  const places: { icon: IconName; title: string; text: string; href: string }[] = [
    { icon: 'github', title: 'GitHub', text: 'Star the project, follow releases and read the source.', href: repository },
    { icon: 'message', title: 'Discussions', text: 'Ask questions, share ideas and show what you built.', href: `${repository}/discussions` },
  ];
  if (social.discord) places.push({ icon: 'users', title: 'Discord', text: 'Chat with the team and other builders.', href: social.discord });
  if (social.x) places.push({ icon: 'message', title: 'X', text: 'News and release announcements.', href: social.x });
  if (social.linkedin) places.push({ icon: 'building', title: 'LinkedIn', text: 'Company news from ByteRings.', href: social.linkedin });
  if (social.youtube) places.push({ icon: 'sparkles', title: 'YouTube', text: 'Tutorials and walkthroughs.', href: social.youtube });

  return (
    <>
      <PageHero eyebrow="Community" title="Build ByteContent with us">
        <p>ByteContent is open source. Ask questions, report bugs, write plugins, improve the docs — every contribution counts.</p>
      </PageHero>
      <section className="section tight">
        <div className="container">
          <div className="feature-grid three">
            {places.map((p) => (
              <a key={p.title} className="feature-card" href={p.href} rel="noopener">
                <span className="feature-icon">
                  <Icon name={p.icon} size={22} />
                </span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
      <section className="section alt">
        <div className="container">
          <SectionHeader title="Ways to contribute" />
          <div className="feature-grid">
            <div className="feature-card">
              <span className="feature-icon">
                <Icon name="code" size={22} />
              </span>
              <h3>Code</h3>
              <p>
                Pick an issue, read the contributing guide and open a pull request. Tests and docs come with every change.
              </p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">
                <Icon name="book" size={22} />
              </span>
              <h3>Documentation</h3>
              <p>Fix a typo, clarify a guide or write a tutorial. Every docs page has an edit link.</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">
                <Icon name="plug" size={22} />
              </span>
              <h3>Plugins</h3>
              <p>
                Build plugins and templates, share them for free or <Link href="/marketplace/publish/">publish them</Link>.
              </p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">
                <Icon name="message" size={22} />
              </span>
              <h3>Feedback</h3>
              <p>Tell us what works and what does not. Feature requests shape the roadmap.</p>
            </div>
          </div>
          <p className="footnote center">
            Please be kind, patient and constructive in every community space.
          </p>
        </div>
      </section>
    </>
  );
}
