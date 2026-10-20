import Link from "next/link";
import { siteChrome, siteConfig } from "@/content/site";
import type { Locale } from "@/content/types";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/ui/Container";
import { SiteNav } from "./SiteNav";

// Sticky top bar: logo on the left, menu in the middle, language switch and
// call to action on the right. dir="ltr" keeps this layout on Arabic pages too.

export function Header({ locale }: { locale: Locale }) {
  const chrome = siteChrome[locale];

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-white/90 backdrop-blur">
      <Container dir="ltr" className="relative flex h-19 items-center justify-between gap-4">
        <Link href={chrome.homeHref} aria-label={siteConfig.name} className="pt-2.5">
          <Logo className="text-[28px]" />
        </Link>
        <SiteNav chrome={chrome} />
      </Container>
    </header>
  );
}
