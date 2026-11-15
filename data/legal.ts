/**
 * Legal pages. These are DRAFTS written as a starting point; have them
 * reviewed by a lawyer for your jurisdiction before relying on them.
 */
export interface LegalPage {
  slug: string;
  title: string;
  updated: string;
  draft: boolean;
  body: string;
}

const MIT = `MIT License

Copyright (c) 2026 ByteRings

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`;

const pages: LegalPage[] = [
  {
    slug: 'privacy',
    title: 'Privacy policy',
    updated: '2026-11-16',
    draft: true,
    body: `
<p>This policy explains what personal data ByteRings ("we") processes when you use this website and the ByteContent marketplace.</p>
<h2>Self-hosted ByteContent</h2>
<p>When you run ByteContent on your own servers, your content and your users' data stay on your infrastructure. The software does not send telemetry or content to ByteRings.</p>
<h2>This website</h2>
<p>This website is a static site. It does not use cookies for tracking. Your theme preference (light or dark) is stored in your browser only. Our hosting provider may keep standard server logs (IP address, user agent, time) for security and operations.</p>
<h2>Marketplace accounts and purchases</h2>
<p>When the marketplace opens, we will process the data needed to run accounts and purchases: name, email address, billing details handled by our payment provider, and licence records. We will update this policy before then.</p>
<h2>Your rights</h2>
<p>Depending on where you live, you may have the right to access, correct, export or delete your personal data. Contact us through the <a href="/contact/">contact page</a>.</p>
`,
  },
  {
    slug: 'terms',
    title: 'Terms of use',
    updated: '2026-11-16',
    draft: true,
    body: `
<p>These terms apply to this website and to services operated by ByteRings. The ByteContent software itself is licensed separately under the <a href="/legal/license/">MIT License</a>.</p>
<h2>Using the website</h2>
<p>You may use this website and its documentation to learn about, evaluate and operate ByteContent. Do not attempt to disrupt the website or access it in ways it was not designed for.</p>
<h2>Trademarks</h2>
<p>"ByteContent", "ByteRings" and their logos are trademarks of ByteRings. The MIT License does not grant rights to them. You may refer to ByteContent by name to describe compatibility or that you use it; please do not use the names or logos in a way that suggests endorsement, or as the name of a fork.</p>
<h2>No warranty</h2>
<p>The website and software are provided as is, without warranty of any kind, to the extent permitted by law.</p>
<h2>Changes</h2>
<p>We may update these terms. The date at the top shows the latest version.</p>
`,
  },
  {
    slug: 'license',
    title: 'License',
    updated: '2026-11-16',
    draft: false,
    body: `
<p>ByteContent (core, Admin Studio, SDK, CLI, templates and first-party free plugins) is open source under the MIT License. Paid marketplace items are licensed under their own terms, shown on each listing.</p>
<pre><code>${MIT}</code></pre>
<h2>What the MIT License allows</h2>
<ul>
  <li>Use ByteContent for any purpose, including commercial projects and client work.</li>
  <li>Modify it, embed it in your product and host it for others.</li>
  <li>Build and sell plugins and templates under any licence.</li>
</ul>
<p>Keep the copyright notice and licence text with copies of the software. The names and logos are trademarks and are not covered by the licence; see the <a href="/legal/terms/">terms</a>.</p>
`,
  },
  {
    slug: 'marketplace-terms',
    title: 'Marketplace terms',
    updated: '2026-11-16',
    draft: true,
    body: `
<p>The ByteContent marketplace is not open yet. These draft terms describe how we intend it to work so that plugin authors can plan ahead. Final terms will be published before the first sale.</p>
<h2>For buyers</h2>
<ul>
  <li>Free items can be used without an account.</li>
  <li>Paid items come with a licence for the plan shown on the listing (for example per installation, per year).</li>
  <li>Each listing states what the item can access (its capabilities) before you install it.</li>
</ul>
<h2>For authors</h2>
<ul>
  <li>Authors keep ownership of their plugins and choose their licence.</li>
  <li>Every submission is reviewed for security, declared capabilities and quality before it is listed.</li>
  <li>Paid items: authors receive the majority of each sale; the revenue share and payout schedule will be published with the final terms.</li>
  <li>We may remove an item that is malicious, breaks these terms or is abandoned with known security issues.</li>
</ul>
`,
  },
];

export function legalPages(): LegalPage[] {
  return pages;
}

export function getLegalPage(slug: string): LegalPage | undefined {
  return pages.find((p) => p.slug === slug);
}
