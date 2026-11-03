"use client";

// Cookie banner + Meta Pixel, on every page (both root layouts render it).
// Nothing is loaded until the visitor clicks "Accept". After that, the Pixel
// loads and a PageView is sent on every page change (Next.js changes pages
// without a full reload, so the Pixel would not see them by itself).

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { consentBanner, siteConfig } from "@/content/site";
import type { Locale } from "@/content/types";
import { setConsent, useConsent } from "@/lib/tracking/consent";
import { loadMetaPixel, sendMetaEvent } from "@/lib/tracking/metaPixel";

export function Tracking({ locale }: { locale: Locale }) {
  const consent = useConsent();
  const pathname = usePathname();
  const pixelId = siteConfig.metaPixelId;

  useEffect(() => {
    if (consent !== "granted" || !pixelId) return;
    loadMetaPixel(pixelId);
    sendMetaEvent("PageView");
  }, [consent, pathname, pixelId]);

  if (!pixelId || consent !== null) return null;

  const text = consentBanner[locale];
  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={text.privacy.label}
      className="fixed inset-x-3 bottom-3 z-40 mx-auto flex max-w-[640px] flex-wrap items-center gap-x-5 gap-y-3 rounded-card bg-ink px-5 py-4 text-[15px] text-paper shadow-card"
    >
      <p className="min-w-[220px] flex-1">
        {text.text}{" "}
        <Link href={text.privacy.href} className="underline underline-offset-2">
          {text.privacy.label}
        </Link>
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setConsent("denied")}
          className="rounded-full border border-paper/40 px-4 py-2 font-medium transition hover:border-paper"
        >
          {text.refuse}
        </button>
        <button
          type="button"
          onClick={() => setConsent("granted")}
          className="rounded-full bg-brand px-5 py-2 font-semibold text-ink transition hover:shadow-brand"
        >
          {text.accept}
        </button>
      </div>
    </div>
  );
}
