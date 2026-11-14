import Link from 'next/link';

export default function NotFound() {
  return (
    <main id="content" className="content">
      <article className="prose">
        <h1>Page not found</h1>
        <p>
          The page you are looking for does not exist. <Link href="/">Go to the documentation home</Link> or use
          the search above.
        </p>
      </article>
    </main>
  );
}
