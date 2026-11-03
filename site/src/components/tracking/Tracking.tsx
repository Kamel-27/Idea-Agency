"use client";

// Meta Pixel on every page (both root layouts render this).
// It loads right away and sends a PageView on every page change (Next.js
// changes pages without a full reload, so the Pixel would not see them by itself).

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { siteConfig } from "@/content/site";
import { loadMetaPixel, sendMetaEvent } from "@/lib/tracking/metaPixel";

export function Tracking() {
  const pathname = usePathname();
  const pixelId = siteConfig.metaPixelId;

  useEffect(() => {
    if (!pixelId) return;
    loadMetaPixel(pixelId);
    sendMetaEvent("PageView");
  }, [pathname, pixelId]);

  return null;
}
