import type { ReactNode } from 'react';
import { DocsSidebar } from '@/components/docs-sidebar';
import { navigation } from '@/lib/content';

/** Documentation: sidebar, article and outline. */
export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="layout">
      <DocsSidebar nav={navigation()} />
      {children}
    </div>
  );
}
