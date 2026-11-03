import Image from "next/image";
import type { DiagnosticPageContent } from "@/content/landing/types";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { LeadForm } from "./LeadForm";

// The landing page in the new IDEA look (Arabic /ar/diagnostic). Ads send people here.
// Order: hero (illustration) -> problem -> steps (illustration) -> what you get
// and who we are -> form -> FAQ. Every button jumps down to the form.
// LandingShell adds the header, footer and WhatsApp button around it.
// The form and its fields are the same as before, so Make Flow A keeps working.

type LandingImage = { src: string; width: number; height: number; alt: string };

type LandingPageProps = {
  content: DiagnosticPageContent;
  images: { hero: LandingImage; steps: LandingImage };
};

const FORM_ANCHOR = "#form";

export function LandingPage({ content: c, images }: LandingPageProps) {
  return (
    <div className="overflow-x-clip">
      {/* Hero */}
      <Container className="grid items-center gap-10 pt-8 pb-20 lg:grid-cols-[1fr_1.05fr] lg:pt-12">
        <div>
          <p className="font-bold text-teal">{c.hero.eyebrow}</p>
          <h1 className="mt-3 text-[clamp(30px,4.4vw,50px)] leading-[1.25] font-black">{c.hero.headline}</h1>
          <p className="mt-5 max-w-[540px] text-[18px] leading-relaxed text-ink/85">{c.hero.subheadline}</p>
          <ul className="mt-6 space-y-2.5">
            {c.hero.highlights.map((item) => (
              <li key={item} className="flex gap-2.5 font-bold">
                <Check />
                {item}
              </li>
            ))}
          </ul>
          <Button href={FORM_ANCHOR} showArrow className="mt-8 px-8 font-bold shadow-brand">
            {c.cta}
          </Button>
          <p className="mt-4 text-[15px] text-muted">{c.hero.trustLine}</p>
        </div>
        <div className="relative">
          <div aria-hidden="true" className="absolute inset-x-[6%] top-[4%] bottom-[10%] rounded-[48%_52%_40%_60%] bg-sand/70" />
          <Image
            src={images.hero.src}
            width={images.hero.width}
            height={images.hero.height}
            alt={images.hero.alt}
            priority
            sizes="(min-width: 1024px) 600px, 100vw"
            className="relative h-auto w-full"
          />
        </div>
      </Container>

      {/* Problem */}
      <Container className="pb-20">
        <div className="rounded-card border-s-4 border-brand bg-white p-8 shadow-card">
          <h2 className="text-[clamp(24px,3vw,32px)] font-extrabold">{c.problem.title}</h2>
          <p className="mt-4 max-w-[760px] text-[18px] leading-loose text-ink/85">{c.problem.body}</p>
        </div>
      </Container>

      {/* How it works */}
      <section className="bg-sand/70 py-16 lg:mx-6 lg:rounded-[32px]">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Title>{c.steps.title}</Title>
            <ol className="mt-10 space-y-8">
              {c.steps.items.map((step, i) => (
                <li key={step.title} className="relative flex gap-5">
                  {/* the line joining the numbers */}
                  {i < c.steps.items.length - 1 && (
                    <span aria-hidden="true" className="absolute start-[19px] top-11 -bottom-8 w-0.5 bg-brand/60" />
                  )}
                  <span className="relative grid size-10 shrink-0 place-items-center rounded-full bg-brand text-lg font-extrabold">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-[20px] font-extrabold">{step.title}</h3>
                    <p className="mt-1 text-muted">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <Image
            src={images.steps.src}
            width={images.steps.width}
            height={images.steps.height}
            alt={images.steps.alt}
            sizes="(min-width: 1024px) 520px, 100vw"
            className="h-auto w-full max-w-[520px] justify-self-center"
          />
        </Container>
      </section>

      {/* What you get + who we are */}
      <Container className="grid gap-8 py-20 lg:grid-cols-2">
        <div className="rounded-card bg-white p-8 shadow-card">
          <Title>{c.value.title}</Title>
          <ul className="mt-8 space-y-4">
            {c.value.items.map((item) => (
              <li key={item} className="flex gap-3 text-[17px]">
                <Check />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-card bg-white p-8 shadow-card">
          <Title>{c.trust.title}</Title>
          {c.trust.paragraphs.map((p) => (
            <p key={p} className="mt-5 leading-loose text-ink/85">
              {p}
            </p>
          ))}
        </div>
      </Container>

      {/* Form */}
      <section id="form" className="scroll-mt-6">
        <Container>
          <div className="mx-auto max-w-[640px] rounded-[24px] bg-white p-6 shadow-card sm:p-9">
            <div className="mb-7 text-center">
              <Title center>{c.formSection.title}</Title>
              <p className="mt-4 text-muted">{c.formSection.riskReversal}</p>
            </div>
            <LeadForm content={c} />
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <Container className="pt-20 pb-20">
        <Title center>{c.faq.title}</Title>
        <div className="mx-auto mt-10 max-w-[720px] space-y-3">
          {c.faq.items.map((item) => (
            <details key={item.question} className="group rounded-card bg-white px-6 py-4 shadow-card">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[18px] font-bold">
                {item.question}
                <span aria-hidden="true" className="text-2xl text-brand transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-ink/85">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>

      {/* Sticky button on phones */}
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-paper/95 p-3 backdrop-blur lg:hidden">
        <Button href={FORM_ANCHOR} className="w-full justify-center font-bold">
          {c.cta}
        </Button>
      </div>
    </div>
  );
}

// Section title with the short amber bar under it.
function Title({ children, center = false }: { children: React.ReactNode; center?: boolean }) {
  return (
    <div className={center ? "text-center" : ""}>
      <h2 className="text-[clamp(26px,3.6vw,38px)] leading-tight font-extrabold">{children}</h2>
      <span aria-hidden="true" className={`mt-3 block h-1.5 w-14 rounded-full bg-brand ${center ? "mx-auto" : ""}`} />
    </div>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 20 20" className="mt-1 size-5 shrink-0" aria-hidden="true">
      <circle cx="10" cy="10" r="10" className="fill-teal/20" />
      <path d="m6 10.5 2.5 2.5L14 7.5" className="stroke-teal" strokeWidth="2.2" fill="none" strokeLinecap="round" />
    </svg>
  );
}
