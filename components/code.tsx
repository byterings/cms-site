'use client';

import { useEffect, useState } from 'react';

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      className="copy"
      type="button"
      aria-label="Copy code"
      onClick={() => {
        void navigator.clipboard?.writeText(text).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        });
      }}
    >
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

/** A dark code block with a copy button. */
export function CodeBlock({ code, lang, title }: { code: string; lang?: string; title?: string }) {
  return (
    <div className="code-block">
      {title ? <div className="code-title">{title}</div> : null}
      {lang && !title ? <span className="code-lang">{lang}</span> : null}
      <CopyButton text={code} />
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
}

export interface CodeTab {
  label: string;
  code: string;
  lang?: string;
}

const STORAGE_PREFIX = 'tabs:';

/**
 * Tabs of code blocks. Tabs that share a `group` (e.g. "pm" for package
 * managers) stay in sync and remember the reader's choice.
 */
export function CodeTabs({ tabs, group }: { tabs: CodeTab[]; group?: string }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!group) return;
    const apply = (label: string | null) => {
      const index = tabs.findIndex((t) => t.label === label);
      if (index >= 0) setActive(index);
    };
    try {
      apply(localStorage.getItem(STORAGE_PREFIX + group));
    } catch {
      /* storage unavailable */
    }
    const onChange = (e: Event) => {
      const detail = (e as CustomEvent<{ group: string; label: string }>).detail;
      if (detail.group === group) apply(detail.label);
    };
    window.addEventListener('tabs:change', onChange);
    return () => window.removeEventListener('tabs:change', onChange);
  }, [group, tabs]);

  const select = (index: number) => {
    setActive(index);
    if (!group) return;
    const label = tabs[index]!.label;
    try {
      localStorage.setItem(STORAGE_PREFIX + group, label);
    } catch {
      /* storage unavailable */
    }
    window.dispatchEvent(new CustomEvent('tabs:change', { detail: { group, label } }));
  };

  const current = tabs[active]!;
  return (
    <div className="tabs">
      <div className="tab-list" role="tablist">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            type="button"
            role="tab"
            aria-selected={i === active}
            onClick={() => select(i)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-panel" role="tabpanel">
        <CodeBlock code={current.code} lang={current.lang} />
      </div>
    </div>
  );
}

export const INSTALL_TABS: CodeTab[] = [
  { label: 'npm', code: 'npx create-bytecontent@latest my-cms', lang: 'bash' },
  { label: 'pnpm', code: 'pnpm create bytecontent my-cms', lang: 'bash' },
  { label: 'yarn', code: 'yarn create bytecontent my-cms', lang: 'bash' },
  { label: 'bun', code: 'bun create bytecontent my-cms', lang: 'bash' },
];
