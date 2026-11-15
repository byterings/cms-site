import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon, type IconName } from '@/components/icon';
import { PageHero } from '@/components/ui';
import { siteConfig } from '@/site.config';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with the ByteContent team at ByteRings.',
  alternates: { canonical: '/contact/' },
};

interface Channel {
  icon: IconName;
  title: string;
  text: string;
  href: string;
  label: string;
}

export default function ContactPage() {
  const { contact, repository } = siteConfig;
  const channels: Channel[] = [
    {
      icon: 'message',
      title: 'Questions & ideas',
      text: 'Ask questions, share what you built and suggest features in GitHub Discussions.',
      href: `${repository}/discussions`,
      label: 'Open Discussions',
    },
    {
      icon: 'code',
      title: 'Bugs',
      text: 'Found a problem? Open an issue with steps to reproduce it.',
      href: `${repository}/issues`,
      label: 'Report an issue',
    },
  ];
  if (contact.email) {
    channels.push({
      icon: 'mail',
      title: 'General',
      text: 'Partnerships, press and everything else.',
      href: `mailto:${contact.email}`,
      label: contact.email,
    });
  }
  if (contact.salesEmail) {
    channels.push({
      icon: 'building',
      title: 'Sales & enterprise',
      text: 'SSO, support and custom terms.',
      href: `mailto:${contact.salesEmail}`,
      label: contact.salesEmail,
    });
  }
  if (contact.securityEmail) {
    channels.push({
      icon: 'shield',
      title: 'Security',
      text: 'Report vulnerabilities privately.',
      href: `mailto:${contact.securityEmail}`,
      label: contact.securityEmail,
    });
  }

  return (
    <>
      <PageHero eyebrow="Contact" title="Talk to the ByteContent team">
        <p>We read everything. Pick the channel that fits best.</p>
      </PageHero>
      <section className="section tight">
        <div className="container">
          <div className="feature-grid three">
            {channels.map((c) => (
              <a key={c.title} className="feature-card" href={c.href} rel="noopener">
                <span className="feature-icon">
                  <Icon name={c.icon} size={22} />
                </span>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
                <span className="text-link">
                  {c.label} <Icon name="arrowRight" size={14} />
                </span>
              </a>
            ))}
          </div>
          {!contact.securityEmail ? (
            <p className="footnote">
              Security issues: please do not open a public issue. Use GitHub&apos;s private vulnerability reporting on
              the <a href={`${repository}/security`}>repository</a>. See also the{' '}
              <Link href="/docs/security/">security overview</Link>.
            </p>
          ) : null}
        </div>
      </section>
    </>
  );
}
