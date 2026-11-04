"use client";

// Google Analytics 4 and the Meta Pixel on every page (both root layouts render this).
// They load right away. The Pixel gets a PageView on every page change (Next.js
// changes pages without a full reload, so the Pixel would not see them by itself);
// GA4 counts page changes by itself (Enhanced measurement).

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { siteConfig } from "@/content/site";
import { loadGa4 } from "@/lib/tracking/ga4";
import { loadMetaPixel, sendMetaEvent } from "@/lib/tracking/metaPixel";

export function Tracking() {
  const pathname = usePathname();
  const { ga4Id, metaPixelId } = siteConfig;

  useEffect(() => {
    if (ga4Id) loadGa4(ga4Id);
  }, [ga4Id]);

  useEffect(() => {
    if (!metaPixelId) return;
    loadMetaPixel(metaPixelId);
    sendMetaEvent("PageView");
  }, [pathname, metaPixelId]);

  return null;
}
