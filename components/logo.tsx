import { useId } from 'react';

/** ByteContent mark: a "B" built from content blocks (starter brand). */
export function LogoMark({ size = 28, className }: { size?: number; className?: string }) {
  const gradient = `bc-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={gradient} x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#6c55fb" />
          <stop offset="1" stopColor="#14b8a6" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill={`url(#${gradient})`} />
      <rect x="16" y="14" width="9" height="36" rx="3" fill="#fff" />
      <rect x="28" y="14" width="18" height="16" rx="6" fill="#fff" fillOpacity=".82" />
      <rect x="28" y="34" width="21" height="16" rx="6" fill="#fff" />
    </svg>
  );
}

/** Mark + wordmark. */
export function Logo({ size = 28 }: { size?: number }) {
  return (
    <span className="logo">
      <LogoMark size={size} />
      <span className="logo-word">
        Byte<span>Content</span>
      </span>
    </span>
  );
}
