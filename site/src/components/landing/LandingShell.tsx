import type { LandingChromeContent } from "@/content/landing/types";
import { siteConfig } from "@/content/site";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/ui/Container";
import Link from "next/link";
import { LanguageSwitch } from "@/components/layout/LanguageSwitch";
import { WhatsAppButton } from "./WhatsAppButton";

// The frame around every landing page.
// Course rule: a landing page has ONE goal, so there is no menu.
// The only exits are quiet ones: the logo and a footer link to our website
// (decision 11 in docs/decisions.md), WhatsApp, the privacy note and the
// language switch, which opens the same page in the other language.

type LandingShellProps = {
  content: LandingChromeContent;
  children: React.ReactNode;
};

export function LandingShell({ content, children }: LandingShellProps) {
  return (
    <>
      <header className="border-b border-line bg-paper">
        {/* dir="ltr": the header keeps the English layout on Arabic pages too
            (logo on the left, language switch on the right). */}
        <Container dir="ltr" className="flex h-17 items-center justify-between">
          <Link href={content.homeHref} aria-label={content.homeLabel} className="pt-2">
            <Logo className="text-[26px]" />
          </Link>
          <LanguageSwitch locale={content.locale} />
        </Container>
      </header>

      <main>{children}</main>

      {/* Extra bottom padding on phones so the sticky button never covers the footer */}
      <footer className="border-t border-line pt-8 pb-28 text-sm text-muted lg:pb-8">
        <Container className="flex flex-wrap justify-between gap-3">
          <span>&copy; {siteConfig.name}</span>
          <div className="flex gap-5">
            <Link href={content.homeHref} className="underline underline-offset-2 hover:decoration-brand">
              {content.homeLabel}
            </Link>
            <Link href={content.privacyHref} className="underline underline-offset-2 hover:decoration-brand">
              {content.privacyLabel}
            </Link>
          </div>
        </Container>
      </footer>

      <WhatsAppButton content={content} />
    </>
  );
}
