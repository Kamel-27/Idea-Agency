import Link from "next/link";

// The one button style for the whole site. It is a link, because every
// button here takes the visitor somewhere (a page, a section or a form).

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: keyof typeof variants;
  showArrow?: boolean;
  className?: string;
};

const variants = {
  primary: "bg-brand text-white hover:shadow-brand",
  outline: "border-[1.5px] border-ink text-ink",
};

export function Button({
  href,
  children,
  variant = "primary",
  showArrow = false,
  className = "",
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-12 items-center gap-2.5 rounded-full px-6 font-display text-[17px] font-medium transition hover:-translate-y-0.5 ${variants[variant]} ${className}`}
    >
      {children}
      {showArrow && (
        <span aria-hidden="true" className="inline-block rtl:rotate-180">
          &rarr;
        </span>
      )}
    </Link>
  );
}
