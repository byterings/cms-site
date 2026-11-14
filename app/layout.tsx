import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { DocsShell } from '@/components/docs-shell';
import { navigation } from '@/lib/content';
import { themeInitScript } from '@/lib/theme';
import { siteConfig } from '@/site.config';
import './globals.css';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export const metadata: Metadata = {
  title: { default: `${siteConfig.name} documentation`, template: `%s · ${siteConfig.name}` },
  description: siteConfig.tagline,
  metadataBase: siteConfig.url ? new URL(siteConfig.url) : undefined,
  icons: { icon: `${basePath}/favicon.svg` },
  openGraph: { siteName: `${siteConfig.name} documentation`, type: 'website' },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0b1120' },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <DocsShell siteName={siteConfig.name} repository={siteConfig.repository} nav={navigation()}>
          {children}
        </DocsShell>
      </body>
    </html>
  );
}
