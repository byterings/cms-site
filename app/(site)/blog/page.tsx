import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/ui';
import { allPosts, formatDate } from '@/data/blog';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'News, engineering notes and guides from the ByteContent team at ByteRings.',
  alternates: { canonical: '/blog/' },
};

export default function BlogPage() {
  const [latest, ...rest] = allPosts();
  return (
    <>
      <PageHero eyebrow="Blog" title="News and notes from the ByteContent team">
        <p>
          Product announcements, engineering deep dives and guides. See the <Link href="/changelog/">changelog</Link> for
          release notes.
        </p>
      </PageHero>
      <div className="container post-list">
        {latest ? (
          <Link className="post-card featured" href={`/blog/${latest.slug}/`}>
            <div className="post-cover" aria-hidden="true" />
            <div>
              <p className="post-meta">
                {formatDate(latest.date)} · {latest.tags.join(', ')}
              </p>
              <h2>{latest.title}</h2>
              <p>{latest.summary}</p>
            </div>
          </Link>
        ) : null}
        <div className="post-grid">
          {rest.map((post) => (
            <Link key={post.slug} className="post-card" href={`/blog/${post.slug}/`}>
              <p className="post-meta">
                {formatDate(post.date)} · {post.tags.join(', ')}
              </p>
              <h2>{post.title}</h2>
              <p>{post.summary}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
