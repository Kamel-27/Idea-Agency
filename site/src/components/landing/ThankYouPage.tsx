import type { LandingChromeContent, ThankYouPageContent } from "@/content/landing/types";
import { siteConfig } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Spark } from "@/components/brand/Spark";
import { whatsappLink } from "@/lib/whatsapp";

// Shown after the form is sent: confirms the request and says what happens next.

type ThankYouPageProps = {
  content: ThankYouPageContent;
  chrome: LandingChromeContent;
};

export function ThankYouPage({ content, chrome }: ThankYouPageProps) {
  const whatsapp = whatsappLink(siteConfig.whatsappNumber, chrome.whatsappMessage);

  return (
    <Container className="max-w-[720px] py-16 lg:py-24">
      <Spark className="size-14 rtl:-scale-x-100" />
      <h1 className="mt-4 text-[clamp(30px,4.5vw,48px)] leading-[1.15] font-semibold">{content.title}</h1>
      <p className="mt-4 text-lg text-muted">{content.body}</p>

      <div className="mt-10 rounded-card bg-brand-tint p-7">
        <p className="font-display text-lg font-semibold">{content.listTitle}</p>
        <ul className="mt-4 space-y-3">
          {content.list.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-2.5 size-2 shrink-0 rounded-full bg-brand" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {whatsapp && (
        <p className="mt-8 text-muted">
          {content.whatsappPrompt}{" "}
          <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="font-medium text-brand underline underline-offset-2">
            {chrome.whatsappLabel}
          </a>
        </p>
      )}
    </Container>
  );
}
