// The new "IDEA" wordmark (concept landing page): navy letters, the E's middle
// bar in amber, and an amber path leaving the A and ending in a dot.
// Drawn as shapes, not text, so it looks the same in every font and language.
// Size it with height: <IdeaLogo className="h-9" />.

export function IdeaLogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 -10 168 72" className={`w-auto ${className}`} role="img" aria-label="IDEA">
      <g className="fill-ink" fillRule="evenodd">
        {/* I */}
        <rect x="0" y="12" width="12" height="48" rx="1" />
        {/* D */}
        <path d="M20 12h15a24 24 0 0 1 0 48H20Z M32 24h3a12 12 0 0 1 0 24h-3Z" />
        {/* E without its middle bar */}
        <path d="M66 12h32v12H78v24h20v12H66Z" />
        {/* A */}
        <path d="M106 60l16-48h13l16 48h-13l-3-10h-16l-3 10Z M122 40h10l-5-16Z" />
      </g>
      {/* E middle bar + the path from the A */}
      <rect x="78" y="31" width="22" height="10" rx="1" className="fill-brand" />
      <path d="M131 18 152 0" className="stroke-brand" strokeWidth="5" strokeLinecap="round" fill="none" />
      <circle cx="156" cy="-3" r="7" className="fill-brand" />
    </svg>
  );
}
