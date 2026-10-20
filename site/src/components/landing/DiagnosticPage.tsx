import type { DiagnosticPageContent } from "@/content/landing/types";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LeadForm } from "./LeadForm";
import { PlanCard } from "./PlanCard";

// The free diagnostic landing page, used by /diagnostic and /ar/diagnostic.
// It only arranges sections. All text comes in through `content`.
//
// Section order follows the course skeleton (Sessions 17 and 18):
// Hero -> Problem -> How it works -> What you get -> Who we are -> FAQ -> Form.
// The CTA text is identical everywhere and repeats 4 times, plus the sticky phone button.

const FORM_ANCHOR = "#lead-form";

export function DiagnosticPage({ content }: { content: DiagnosticPageContent }) {
  const { hero, problem, steps, value, trust, faq, formSection, cta } = content;

  return (
    <>
      {/* 1. Hero: headline, subheadline, trust signal, visual, CTA */}
      <Container className="grid items-center gap-14 pt-10 pb-16 lg:grid-cols-[1.1fr_1fr] lg:pt-20 lg:pb-24">
        <div>
          <Eyebrow>{hero.eyebrow}</Eyebrow>
          <h1 className="mt-4 text-[clamp(34px,5vw,58px)] leading-[1.12] font-semibold">{hero.headline}</h1>
          <p className="mt-5 max-w-[540px] text-lg text-muted">{hero.subheadline}</p>
          <ul className="mt-6 space-y-2.5">
            {hero.highlights.map((highlight) => (
              <li key={highlight} className="flex items-center gap-2.5 font-medium">
                <CheckIcon />
                {highlight}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button href={FORM_ANCHOR} showArrow>
              {cta}
            </Button>
          </div>
          <p className="mt-4 text-[15px] text-muted">
            {hero.trustLine}
          </p>
        </div>
        <PlanCard {...hero.planCard} />
      </Container>

      {/* 2. Problem */}
      <section className="bg-ink py-16 text-white lg:py-20">
        <Container className="max-w-[860px] text-center">
          <Eyebrow>{problem.eyebrow}</Eyebrow>
          <h2 className="mt-3 text-[clamp(26px,3.6vw,40px)] leading-[1.25] font-semibold">{problem.title}</h2>
          <p className="mt-5 text-lg text-white/75">{problem.body}</p>
        </Container>
      </section>

      {/* 3. How it works (StoryBrand 3-step plan) */}
      <section className="py-16 lg:py-24">
        <Container>
          <SectionHeading eyebrow={steps.eyebrow} title={steps.title} />
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.items.map((item, index) => (
              <li key={item.title} className="rounded-card border border-line p-7">
                <span className="grid size-12 place-items-center rounded-[14px] bg-brand font-display text-xl font-bold text-white">
                  {index + 1}
                </span>
                <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-muted">{item.description}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10">
            <Button href={FORM_ANCHOR} showArrow>
              {cta}
            </Button>
          </div>
        </Container>
      </section>

      {/* 4. What you get (value stack) */}
      <section className="bg-brand-tint py-16 lg:py-24">
        <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <SectionHeading eyebrow={value.eyebrow} title={value.title} />
          <ul className="space-y-4">
            {value.items.map((item) => (
              <li key={item} className="flex items-start gap-3 rounded-card bg-white p-5 shadow-card">
                <CheckIcon />
                <span className="font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 5. Who we are (honest trust: no invented proof) */}
      <section className="py-16 lg:py-24">
        <Container className="max-w-[860px]">
          <SectionHeading eyebrow={trust.eyebrow} title={trust.title} />
          <div className="mt-6 space-y-4 text-lg text-muted">
            {trust.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-8">
            <Button href={FORM_ANCHOR} showArrow>
              {cta}
            </Button>
          </div>
        </Container>
      </section>

      {/* 6. FAQ: <details> opens and closes without any JavaScript */}
      <section className="border-t border-line py-16 lg:py-24">
        <Container className="max-w-[860px]">
          <SectionHeading eyebrow={faq.eyebrow} title={faq.title} />
          <div className="mt-8 divide-y divide-line border-y border-line">
            {faq.items.map((item) => (
              <details key={item.question} className="group py-5">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-lg font-medium">
                  {item.question}
                  <span className="text-2xl text-brand transition group-open:rotate-45" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-muted">{item.answer}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      {/* 7. Closing CTA + form */}
      <section id="lead-form" className="scroll-mt-4 bg-brand-tint py-16 lg:py-24">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <div className="lg:sticky lg:top-10">
            <SectionHeading eyebrow={formSection.eyebrow} title={formSection.title} />
            <p className="mt-5 flex items-center gap-2 text-muted">
              <CheckIcon />
              {formSection.riskReversal}
            </p>
          </div>
          <LeadForm content={content} />
        </Container>
      </section>

      {/* Sticky CTA on phones */}
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-white/95 p-3 backdrop-blur lg:hidden">
        <Button href={FORM_ANCHOR} className="w-full justify-center">
          {cta}
        </Button>
      </div>
    </>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="mt-0.5 size-5 shrink-0 text-brand" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}
