"use client";

// Switches between the English and Arabic version of the current page:
//   /            <->  /ar
//   /diagnostic  <->  /ar/diagnostic
// Used in the website header and on landing pages.
// Client component because it needs the current URL and a loading state.
// It keeps the query string, so the UTM tags from the ad are not lost.
//
// On click it fades in a branded loading screen for SWITCH_DELAY_MS before
// opening the other language, so the switch feels calm instead of jumpy.
//
// The loading screen is rendered with a portal straight into <body>.
// Why: the website header uses backdrop-blur, and a blurred parent traps any
// "position: fixed" child inside it. Without the portal, the screen would
// only cover the header instead of the whole page.

import { useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import type { Locale } from "@/content/types";
import { Logo } from "@/components/brand/Logo";

/** How long the loading screen shows before the page changes. */
const SWITCH_DELAY_MS = 600;

// Each entry describes the OTHER language (the one we switch to).
const switchTo: Record<Locale, { label: string; lang: string; dir: "ltr" | "rtl"; loading: string }> = {
  en: { label: "العربية", lang: "ar", dir: "rtl", loading: "جاري التحويل للعربي..." }, // on English pages
  ar: { label: "English", lang: "en", dir: "ltr", loading: "Switching to English..." }, // on Arabic pages
};

export function LanguageSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [isSwitching, setIsSwitching] = useState(false);

  const target = otherLanguagePath(pathname, locale);
  const other = switchTo[locale];

  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    if (isSwitching) return;

    setIsSwitching(true);
    // Read the ?utm_... tags at click time, then change page after the delay.
    const destination = target + window.location.search;
    window.setTimeout(() => {
      window.location.href = destination;
    }, SWITCH_DELAY_MS);
  }

  return (
    <>
      <a
        href={target}
        lang={other.lang}
        onClick={handleClick}
        aria-disabled={isSwitching}
        className="inline-flex min-h-11 items-center rounded-full border border-line px-4 text-[15px] font-medium transition hover:border-brand hover:text-brand"
      >
        {other.label}
      </a>

      {isSwitching &&
        createPortal(
          <div
            role="status"
            aria-live="polite"
            className="fixed inset-0 z-[100] grid animate-fade-in place-items-center bg-white"
          >
            <div className="flex flex-col items-center gap-7">
              <Logo className="text-[34px]" />
              <span className="size-10 animate-spin rounded-full border-4 border-brand-soft border-t-brand" />
              <p lang={other.lang} dir={other.dir} className="text-muted">
                {other.loading}
              </p>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}

/** "/" -> "/ar", "/diagnostic" -> "/ar/diagnostic", and back. */
function otherLanguagePath(pathname: string, locale: Locale): string {
  if (locale === "en") return pathname === "/" ? "/ar" : `/ar${pathname}`;
  return pathname.replace(/^\/ar(?=\/|$)/, "") || "/";
}
