import type { Metadata } from 'next';
import { Logo, LogoMark } from '@/components/logo';
import { PageHero } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Brand',
  description: 'ByteContent logo, colours and usage guidelines.',
  alternates: { canonical: '/brand/' },
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const BRAND = [
  ['50', '#f1f0ff'],
  ['100', '#e5e3ff'],
  ['200', '#cecaff'],
  ['300', '#ada5ff'],
  ['400', '#8a7bff'],
  ['500', '#6c55fb'],
  ['600', '#5b3df0'],
  ['700', '#4c2fd4'],
  ['800', '#3f28ab'],
  ['900', '#352687'],
  ['950', '#1f164f'],
] as const;

const ACCENT = [
  ['300', '#5eead4'],
  ['400', '#2dd4bf'],
  ['500', '#14b8a6'],
  ['600', '#0d9488'],
] as const;

export default function BrandPage() {
  return (
    <>
      <PageHero eyebrow="Brand" title="ByteContent brand guidelines">
        <p>
          Logo files, colours and usage rules for ByteContent by ByteRings. This is a starter identity; files on this page
          are updated when the final brand is ready.
        </p>
      </PageHero>
      <div className="container brand-page">
        <section>
          <h2>Logo</h2>
          <div className="brand-logos">
            <div className="brand-tile light">
              <Logo size={48} />
            </div>
            <div className="brand-tile dark">
              <Logo size={48} />
            </div>
            <div className="brand-tile gradient">
              <LogoMark size={88} />
            </div>
          </div>
          <div className="buttons">
            <a className="button small" href={`${basePath}/brand/logo.svg`} download>
              Logo (light backgrounds)
            </a>
            <a className="button small" href={`${basePath}/brand/logo-dark.svg`} download>
              Logo (dark backgrounds)
            </a>
            <a className="button small" href={`${basePath}/brand/mark.svg`} download>
              Mark only
            </a>
          </div>
          <p>
            The mark is a “B” built from content blocks: a spine and two stacked blocks on a violet-to-teal gradient. Keep
            clear space of at least a quarter of the mark’s width around it. Do not stretch, recolour, rotate or add
            effects.
          </p>
        </section>

        <section>
          <h2>Colours</h2>
          <h3>Brand violet</h3>
          <div className="swatches">
            {BRAND.map(([step, hex]) => (
              <div key={step} className="swatch">
                <span style={{ background: hex }} className={step === '600' ? 'primary' : undefined} />
                <strong>{step === '600' ? `${step} · primary` : step}</strong>
                <code>{hex}</code>
              </div>
            ))}
          </div>
          <h3>Accent teal</h3>
          <div className="swatches">
            {ACCENT.map(([step, hex]) => (
              <div key={step} className="swatch">
                <span style={{ background: hex }} />
                <strong>{step}</strong>
                <code>{hex}</code>
              </div>
            ))}
            <div className="swatch">
              <span style={{ background: '#0c0b1d' }} />
              <strong>Ink</strong>
              <code>#0c0b1d</code>
            </div>
          </div>
          <h3>Gradient</h3>
          <div className="gradient-bar" />
          <p>
            <code>linear-gradient(135deg, #6c55fb, #14b8a6)</code> — for the mark, illustrations and large accents only. Use
            solid <code>#5b3df0</code> for buttons and links (6.2:1 contrast on white).
          </p>
        </section>

        <section>
          <h2>Typography</h2>
          <p>
            The system UI font stack (Inter, Segoe UI, system-ui) for interface and headings, with tight letter spacing on
            large headings. A monospace stack for code.
          </p>
          <div className="type-sample">
            <p className="type-display">Content for every team</p>
            <p className="type-body">ByteContent turns your content model into APIs, forms and permissions.</p>
            <code>npx create-bytecontent@latest</code>
          </div>
        </section>

        <section>
          <h2>Name</h2>
          <ul>
            <li>
              Write <strong>ByteContent</strong> — one word, capital B and C. Not “Byte Content” or “Bytecontent”.
            </li>
            <li>
              The company is <strong>ByteRings</strong>. Use “ByteContent by ByteRings” where the company should be
              visible.
            </li>
            <li>
              The CLI and npm packages are lower case: <code>bytecontent</code>, <code>create-bytecontent</code>,{' '}
              <code>@bytecontent/sdk</code>.
            </li>
            <li>
              Plugins may say “for ByteContent”, but should not use ByteContent or ByteRings as part of their own name or
              logo.
            </li>
          </ul>
        </section>
      </div>
    </>
  );
}
