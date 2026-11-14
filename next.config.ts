import type { NextConfig } from 'next';

/**
 * The site is exported as static files (`out/`) so it can be published on
 * any static host today. Remove `output: 'export'` later to use server
 * features (API routes, middleware, ISR, auth).
 *
 * NEXT_PUBLIC_BASE_PATH: set when the site is served from a sub-path, e.g.
 * "/cms-site" for https://<user>.github.io/cms-site/.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
