"use client";

// Switches between the English and Arabic version of the current page:
//   /diagnostic  <->  /ar/diagnostic
//   /thank-you   <->  /ar/thank-you
// Client component because it needs the current URL.
// It keeps the query string, so the UTM tags from the ad are not lost.

import { usePathname } from "next/navigation";
import type { Locale } from "@/content/landing/types";

const labels: Record<Locale, { text: string; lang: string }> = {
  en: { text: "العربية", lang: "ar" }, // shown on English pages
  ar: { text: "English", lang: "en" }, // shown on Arabic pages
};

export function LanguageSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const target = locale === "en" ? `/ar${pathname}` : pathname.replace(/^\/ar(?=\/|$)/, "") || "/";
  const label = labels[locale];

  return (
    <a
      href={target}
      lang={label.lang}
      onClick={(event) => {
        // Add the current ?utm_... tags to the link at click time.
        event.preventDefault();
        window.location.href = target + window.location.search;
      }}
      className="inline-flex min-h-11 items-center rounded-full border border-line px-4 text-[15px] font-medium transition hover:border-brand hover:text-brand"
    >
      {label.text}
    </a>
  );
}
