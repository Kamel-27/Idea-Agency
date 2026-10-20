import type { HomeContent } from "@/content/types";
import { DiagnosticCta } from "./DiagnosticCta";
import { Hero } from "./Hero";
import { Services } from "./Services";

// The home page, used by "/" and "/ar". It only decides which sections
// appear and in what order. All text comes in through `content`.

export function HomePage({ content }: { content: HomeContent }) {
  return (
    <>
      <Hero hero={content.hero} />
      <Services services={content.services} />
      <DiagnosticCta diagnosticCta={content.diagnosticCta} />
    </>
  );
}
