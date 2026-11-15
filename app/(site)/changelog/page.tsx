import type { Metadata } from 'next';
import { PageHero } from '@/components/ui';
import { formatDate } from '@/data/blog';
import { releases } from '@/data/changelog';

export const metadata: Metadata = {
  title: 'Changelog',
  description: 'Release notes for ByteContent.',
  alternates: { canonical: '/changelog/' },
};

export default function ChangelogPage() {
  return (
    <>
      <PageHero eyebrow="Changelog" title="What’s new in ByteContent">
        <p>Every release, and what we are working on next.</p>
      </PageHero>
      <div className="container narrow changelog">
        {releases.map((release) => (
          <section key={release.version} className="release" id={`v${release.version.toLowerCase()}`}>
            <div className="release-head">
              <span className={release.status === 'upcoming' ? 'badge soon' : 'badge brand'}>
                {release.status === 'upcoming' ? 'Upcoming' : `v${release.version}`}
              </span>
              <span className="release-date">{release.date ? formatDate(release.date) : 'In progress'}</span>
            </div>
            <h2>{release.title}</h2>
            {release.groups.map((group) => (
              <div key={group.title} className="release-group">
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        ))}
      </div>
    </>
  );
}
