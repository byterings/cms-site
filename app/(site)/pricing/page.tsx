import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@/components/icon';
import { CtaBand, PageHero } from '@/components/ui';
import { siteConfig } from '@/site.config';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'ByteContent is free and open source. Pay only for the plugins and services you choose.',
  alternates: { canonical: '/pricing/' },
};

interface Plan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: { label: string; href: string; external?: boolean };
  highlight?: boolean;
  soon?: boolean;
}

const FAQ = [
  {
    q: 'Is ByteContent really free?',
    a: 'Yes. The core, Admin Studio, SDK, CLI and first-party free plugins are MIT licensed. Use them for any project, including commercial ones, with no limits on users, workspaces or content.',
  },
  {
    q: 'What do I pay for?',
    a: 'Only for what you choose: paid marketplace plugins and templates, and in future the hosted Cloud and Enterprise support. Self-hosting the core is free.',
  },
  {
    q: 'Can I use ByteContent for client projects?',
    a: 'Yes. Agencies can run every client on one installation using workspaces, or give each client their own installation.',
  },
  {
    q: 'Do I need to give credit or open-source my changes?',
    a: 'No. The MIT License only asks you to keep the copyright and licence notice with copies of the software.',
  },
  {
    q: 'How are paid plugins licensed?',
    a: 'Each paid item shows its licence and price on its listing. Prices shown today are indicative until the marketplace opens.',
  },
  {
    q: 'When will ByteContent Cloud be available?',
    a: 'Cloud is in planning. Follow the blog and changelog for news.',
  },
];

export default function PricingPage() {
  const contactHref = siteConfig.contact.salesEmail ? `mailto:${siteConfig.contact.salesEmail}` : '/contact/';
  const plans: Plan[] = [
    {
      name: 'Community',
      price: 'Free',
      period: 'forever',
      description: 'The complete open-source CMS, self-hosted on your infrastructure.',
      features: [
        'Unlimited workspaces, users and content',
        'Admin Studio, REST and public APIs',
        'Multi-tenancy with row-level security',
        'SDK, CLI and schema as code',
        'CMS template and free plugins',
        'Community support',
      ],
      cta: { label: 'Get started', href: '/docs/installation/' },
      highlight: true,
    },
    {
      name: 'Marketplace',
      price: 'Pay per item',
      period: '',
      description: 'Add the paid plugins and templates you need, nothing more.',
      features: ['Free and paid plugins', 'Starter templates', 'Reviewed for security', 'Updates during your licence'],
      cta: { label: 'Browse the marketplace', href: '/marketplace/' },
    },
    {
      name: 'Cloud',
      price: 'Coming soon',
      period: '',
      description: 'ByteContent hosted and operated by ByteRings.',
      features: ['Managed updates and backups', 'Global media delivery', 'Monitoring and uptime', 'Usage-based plans'],
      cta: { label: 'Follow the news', href: '/blog/' },
      soon: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'For organisations with security, compliance and support needs.',
      features: ['SSO and audit log export', 'Support and response times', 'Architecture and migration help', 'Custom terms'],
      cta: { label: 'Contact us', href: contactHref, external: contactHref.startsWith('mailto:') },
    },
  ];

  return (
    <>
      <PageHero eyebrow="Pricing" title="Free and open source. Pay only for what you add.">
        <p>The full CMS costs nothing to run yourself. Extend it with paid plugins, or let us host it for you later.</p>
      </PageHero>
      <section className="section tight">
        <div className="container">
          <div className="plans">
            {plans.map((plan) => (
              <div key={plan.name} className={plan.highlight ? 'plan highlight' : 'plan'}>
                {plan.highlight ? <span className="plan-flag">Start here</span> : null}
                <h2>{plan.name}</h2>
                <p className="plan-desc">{plan.description}</p>
                <p className="plan-price">
                  {plan.price}
                  {plan.period ? <span> {plan.period}</span> : null}
                </p>
                {plan.cta.external ? (
                  <a className={plan.highlight ? 'button primary' : 'button'} href={plan.cta.href}>
                    {plan.cta.label}
                  </a>
                ) : (
                  <Link className={plan.highlight ? 'button primary' : 'button'} href={plan.cta.href}>
                    {plan.cta.label}
                  </Link>
                )}
                <ul>
                  {plan.features.map((f) => (
                    <li key={f}>
                      <Icon name="check" size={16} /> {f}
                    </li>
                  ))}
                </ul>
                {plan.soon ? <span className="badge soon">In planning</span> : null}
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section alt">
        <div className="container narrow">
          <h2 className="center">Frequently asked questions</h2>
          <div className="faq">
            {FAQ.map((item) => (
              <details key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <CtaBand title="Start free today">No credit card, no account. Just install and build.</CtaBand>
    </>
  );
}
