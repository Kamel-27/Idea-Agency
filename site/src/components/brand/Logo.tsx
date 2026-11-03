import { IdeaLogo } from "./IdeaLogo";

// The site logo: the IDEA wordmark. Sized in em, so the logo scales
// with font size: <Logo className="text-[28px]" /> for the header, bigger elsewhere.

export function Logo({ className = "" }: { className?: string }) {
  return (
    // dir="ltr": the wordmark reads "IDEA" even on Arabic (right-to-left) pages.
    <span dir="ltr" className={`inline-flex leading-none ${className}`}>
      <IdeaLogo className="h-[1.25em]" />
    </span>
  );
}
