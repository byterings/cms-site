import Link from 'next/link';
import { siteConfig } from '@/site.config';
import { Icon } from './icon';
import { Logo } from './logo';

const columns = [
  {
    title: 'Product',
    links: [
      { title: 'Features', href: '/features/' },
      { title: 'Marketplace', href: '/marketplace/' },
      { title: 'Pricing', href: '/pricing/' },
      { title: 'Changelog', href: '/changelog/' },
    ],
  },
  {
    title: 'Developers',
    links: [
      { title: 'Documentation', href: '/docs/' },
      { title: 'Installation', href: '/docs/installation/' },
      { title: 'REST API', href: '/docs/rest-api/' },
      { title: 'Build a plugin', href: '/docs/build-a-plugin/' },
      { title: 'Publish a plugin', href: '/marketplace/publish/' },
    ],
  },
  {
    title: 'Company',
    links: [
      { title: 'About ByteRings', href: '/about/' },
      { title: 'Blog', href: '/blog/' },
      { title: 'Community', href: '/community/' },
      { title: 'Contact', href: '/contact/' },
      { title: 'Brand', href: '/brand/' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { title: 'Privacy', href: '/legal/privacy/' },
      { title: 'Terms', href: '/legal/terms/' },
      { title: 'License (MIT)', href: '/legal/license/' },
      { title: 'Marketplace terms', href: '/legal/marketplace-terms/' },
    ],
  },
];

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo />
          <p>{siteConfig.tagline}</p>
          <p className="footer-by">
            Built by <Link href="/about/">{siteConfig.company}</Link>.
          </p>
          <a className="icon-link" href={siteConfig.repository} aria-label="GitHub" rel="noopener">
            <Icon name="github" size={20} />
          </a>
        </div>
        {columns.map((column) => (
          <div key={column.title}>
            <p className="footer-title">{column.title}</p>
            <ul>
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="container footer-bottom">
        <span>
          © {year} {siteConfig.company}. {siteConfig.name} is open source under the MIT License.
        </span>
        <span>ByteContent and ByteRings are trademarks of ByteRings.</span>
      </div>
    </footer>
  );
}
