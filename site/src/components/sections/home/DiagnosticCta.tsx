import type { HomeContent } from "@/content/types";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

// Dark banner that sends visitors to the free diagnostic, our lead magnet.

export function DiagnosticCta({ diagnosticCta }: { diagnosticCta: HomeContent["diagnosticCta"] }) {

  return (
    <section className="py-16 lg:py-24">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-8 rounded-[28px] bg-ink px-7 py-10 text-white lg:p-16">
          <h2 className="max-w-[620px] text-[clamp(28px,3.6vw,42px)] leading-[1.15] font-semibold">
            {diagnosticCta.titleStart}{" "}
            <span className="text-brand">{diagnosticCta.titleHighlight}</span>.
          </h2>
          <Button href={diagnosticCta.action.href} showArrow>
            {diagnosticCta.action.label}
          </Button>
        </div>
      </Container>
    </section>
  );
}
