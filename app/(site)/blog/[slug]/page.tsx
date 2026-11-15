import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArticleEnhancer } from '@/components/article-enhancer';
import { withBasePath } from '@/components/ui';
import { allPosts, formatDate, getPost } from '@/data/blog';

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return allPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: `/blog/${post.slug}/` },
    openGraph: { type: 'article', title: post.title, description: post.summary, publishedTime: post.date },
  };
}

export default async function PostPage({ params }: { params: Promise<Params> }) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const others = allPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);
  return (
    <article className="container narrow post">
      <Link className="back-link" href="/blog/">
        ← All posts
      </Link>
      <p className="post-meta">
        {formatDate(post.date)} · {post.author}
      </p>
      <h1>{post.title}</h1>
      <div className="prose" dangerouslySetInnerHTML={{ __html: withBasePath(post.body) }} />
      <ArticleEnhancer />
      {others.length ? (
        <aside className="post-more">
          <h2>Keep reading</h2>
          <div className="post-grid">
            {others.map((p) => (
              <Link key={p.slug} className="post-card" href={`/blog/${p.slug}/`}>
                <p className="post-meta">{formatDate(p.date)}</p>
                <h3>{p.title}</h3>
                <p>{p.summary}</p>
              </Link>
            ))}
          </div>
        </aside>
      ) : null}
    </article>
  );
}
