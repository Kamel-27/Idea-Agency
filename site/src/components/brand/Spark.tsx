// The Idea spark: 3 rays placed on a quarter circle, like an unfinished ring.
// The rays radiate from the bottom-left corner, so place that corner on the
// thing the spark belongs to (the "a" in the logo, the laptop in the hero).

export function Spark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 70 70" className={className} aria-hidden="true">
      <g className="stroke-brand" strokeWidth="8" strokeLinecap="round">
        <line x1="5" y1="40" x2="9" y2="19" />
        <line x1="21" y1="49" x2="37" y2="33" />
        <line x1="30" y1="65" x2="51" y2="61" />
      </g>
    </svg>
  );
}
