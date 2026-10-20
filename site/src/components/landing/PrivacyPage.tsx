import type { PrivacyContent } from "@/content/landing/privacy";
import { Container } from "@/components/ui/Container";

export function PrivacyPage({ content }: { content: PrivacyContent }) {
  return (
    <Container className="max-w-[760px] py-16 lg:py-20">
      <h1 className="text-[clamp(30px,4vw,44px)] font-semibold">{content.title}</h1>
      <p className="mt-2 text-sm text-muted">{content.updated}</p>
      <div className="mt-10 space-y-8">
        {content.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-xl font-semibold">{section.heading}</h2>
            <p className="mt-2 text-muted">{section.body}</p>
          </section>
        ))}
      </div>
    </Container>
  );
}
