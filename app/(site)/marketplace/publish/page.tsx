import type { Metadata } from 'next';
import Link from 'next/link';
import { CodeBlock } from '@/components/code';
import { Icon } from '@/components/icon';
import { FeatureCard, PageHero, SectionHeader } from '@/components/ui';
import { siteConfig } from '@/site.config';

export const metadata: Metadata = {
  title: 'Publish your plugin',
  description: 'Build free or paid plugins and templates for ByteContent and publish them on the marketplace.',
  alternates: { canonical: '/marketplace/publish/' },
};

const MANIFEST = `{
  "id": "reading-time",
  "name": "Reading time",
  "version": "1.0.0",
  "description": "Calculates the reading time of articles.",
  "capabilities": ["records:modify"],
  "entities": ["article"],
  "main": "index.js"
}`;

export default function PublishPage() {
  const applyHref = siteConfig.contact.email
    ? `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent('Marketplace publisher')}`
    : `${siteConfig.repository}/discussions`;
  return (
    <>
      <PageHero eyebrow="For developers" title="Publish on the ByteContent marketplace">
        <p>
          Turn your integrations and starters into products. Publish free plugins to grow your reputation, or paid ones
          to grow a business — on the open, MIT-licensed core.
        </p>
        <div className="buttons">
          <Link className="button primary" href="/docs/build-a-plugin/">
            Build your first plugin
          </Link>
          <a className="button" href={applyHref} rel="noopener">
            Join the early publisher program
          </a>
        </div>
      </PageHero>

      <section className="section">
        <div className="container">
          <SectionHeader title="Why publish with ByteContent" />
          <div className="feature-grid three">
            <FeatureCard icon="heart" title="Free or paid, your choice">
              Release under any licence. Paid plugins can be closed source — the MIT core makes that simple.
            </FeatureCard>
            <FeatureCard icon="users" title="Reach every workspace">
              One install can serve thousands of workspaces, and each one can enable your plugin.
            </FeatureCard>
            <FeatureCard icon="shield" title="Trusted by design">
              Plugins declare capabilities up front and every submission is reviewed, so teams can install with
              confidence.
            </FeatureCard>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container split">
          <div>
            <SectionHeader eyebrow="How it works" title="From idea to listing" center={false} />
            <ol className="timeline">
              <li>
                <strong>Build</strong>
                <p>Write a plugin with a manifest and a register function. Test it against a local ByteContent.</p>
              </li>
              <li>
                <strong>Submit</strong>
                <p>Send your package, listing text, screenshots and pricing. Declare every capability you need.</p>
              </li>
              <li>
                <strong>Review</strong>
                <p>We check security, declared capabilities, compatibility and quality, and send feedback.</p>
              </li>
              <li>
                <strong>Publish & earn</strong>
                <p>Your listing goes live. For paid items we handle checkout and licences; you receive payouts.</p>
              </li>
            </ol>
          </div>
          <div>
            <CodeBlock title="plugin.json" code={MANIFEST} />
            <p className="footnote">
              Every plugin starts with a manifest. See the <Link href="/docs/plugin-sdk/">Plugin SDK reference</Link>.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader title="Guidelines" />
          <div className="guidelines">
            <div>
              <h3>
                <Icon name="check" size={18} /> Do
              </h3>
              <ul>
                <li>Ask only for the capabilities you use</li>
                <li>Keep hooks fast (they are time-limited)</li>
                <li>Document setup and configuration</li>
                <li>Follow semantic versioning</li>
                <li>Respond to security reports quickly</li>
              </ul>
            </div>
            <div>
              <h3>
                <Icon name="x" size={18} /> Don&apos;t
              </h3>
              <ul>
                <li>Collect data you do not need, or send it elsewhere without saying so</li>
                <li>Bundle obfuscated code in free plugins</li>
                <li>Use the ByteContent or ByteRings names in your plugin name or logo</li>
                <li>Bypass validation or permissions</li>
              </ul>
            </div>
          </div>
          <p className="footnote">
            Revenue share, payouts and review times will be published with the final{' '}
            <Link href="/legal/marketplace-terms/">marketplace terms</Link>. Authors receive the majority of every sale.
          </p>
        </div>
      </section>
    </>
  );
}
