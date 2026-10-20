import type { Metadata } from "next";
import { arabicFonts } from "@/lib/fonts";
import "../globals.css";

// Root layout for every Arabic page (everything under /ar).
// lang="ar" and dir="rtl" flip the whole layout to right-to-left.
// Components use start/end (not left/right) so they flip correctly.

export const metadata: Metadata = {
  title: {
    default: "Idea Agency",
    template: "%s | Idea Agency",
  },
};

export default function ArabicRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={arabicFonts}>
      <body>{children}</body>
    </html>
  );
}
