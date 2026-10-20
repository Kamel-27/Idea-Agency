"use client";

// Floating WhatsApp button. Client component because the click fires the
// "contact" tracking event. Renders nothing until a WhatsApp number is set
// in content/site.ts.

import { siteConfig } from "@/content/site";
import type { LandingChromeContent } from "@/content/landing/types";
import { trackEvent } from "@/lib/tracking/events";
import { whatsappLink } from "@/lib/whatsapp";

export function WhatsAppButton({ content }: { content: LandingChromeContent }) {
  const href = whatsappLink(siteConfig.whatsappNumber, content.whatsappMessage);
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={content.whatsappLabel}
      onClick={() => trackEvent("contact", { method: "whatsapp", locale: content.locale })}
      className="fixed end-4 bottom-24 z-30 grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-card transition hover:scale-105 lg:bottom-6"
    >
      <svg viewBox="0 0 24 24" className="size-7" fill="currentColor" aria-hidden="true">
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.4-.3Z" />
      </svg>
    </a>
  );
}
