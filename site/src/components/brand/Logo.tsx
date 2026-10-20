import { Spark } from "./Spark";

// The "Idea Agency" wordmark. Everything is sized in em, so the logo scales
// with font size: <Logo className="text-[28px]" /> for the header, bigger elsewhere.

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-baseline gap-[0.32em] font-display leading-none ${className}`}>
      <span className="font-bold tracking-tight">
        Ide
        <span className="relative">
          a
          <Spark className="absolute -top-[0.12em] left-[62%] size-[0.6em]" />
        </span>
      </span>
      <span className="font-light">Agency</span>
    </span>
  );
}
