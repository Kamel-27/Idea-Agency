import Link from "next/link";
import { siteConfig } from "@/content/site";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/ui/Container";
import { SiteNav } from "./SiteNav";

// Sticky top bar: logo on the left, menu in the middle, call to action on the right.

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-white/90 backdrop-blur">
      <Container className="relative flex h-19 items-center justify-between">
        <Link href="/" aria-label={`${siteConfig.name}, home`} className="pt-2.5">
          <Logo className="text-[28px]" />
        </Link>
        <SiteNav links={siteConfig.nav} cta={siteConfig.primaryCta} />
      </Container>
    </header>
  );
}
