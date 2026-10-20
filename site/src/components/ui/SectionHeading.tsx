import { Eyebrow } from "./Eyebrow";

// Eyebrow + title, the standard top of every section.

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  className?: string;
};

export function SectionHeading({ eyebrow, title, className = "" }: SectionHeadingProps) {
  return (
    <div className={`max-w-[640px] ${className}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-3 text-[clamp(28px,4vw,44px)] leading-[1.2] font-semibold">{title}</h2>
    </div>
  );
}
