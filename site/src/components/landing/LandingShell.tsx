import type { LandingChromeContent } from "@/content/landing/types";
import { siteConfig } from "@/content/site";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/ui/Container";
import Link from "next/link";
import { WhatsAppButton } from "./WhatsAppButton";

// The frame around every landing page.
// Course rule: a landing page has ONE goal, so there is no menu and no links
// out. The logo is not a link. The only exits are WhatsApp and the privacy note.

type LandingShellProps = {
  content: LandingChromeContent;
  children: React.ReactNode;
};

export function LandingShell({ content, children }: LandingShellProps) {
  return (
    <>
      <header className="border-b border-line bg-white">
        <Container className="flex h-17 items-center">
          <Logo className="pt-2 text-[26px]" />
        </Container>
      </header>

      {/* Bottom padding leaves room for the sticky button on phones */}
      <main className="pb-24 lg:pb-0">{children}</main>

      <footer className="border-t border-line py-8 text-sm text-muted">
        <Container className="flex flex-wrap justify-between gap-3">
          <span>&copy; {siteConfig.name}</span>
          <Link href={content.privacyHref} className="underline underline-offset-2 hover:text-brand">
            {content.privacyLabel}
          </Link>
        </Container>
      </footer>

      <WhatsAppButton content={content} />
    </>
  );
}
