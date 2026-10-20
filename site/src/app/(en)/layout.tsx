import type { Metadata } from "next";
import { siteConfig } from "@/content/site";
import { englishFonts } from "@/lib/fonts";
import "../globals.css";

// Root layout for every English page (website and landing pages).
// Arabic pages have their own root layout in app/(ar), because <html> needs
// a different lang, text direction and font there.

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function EnglishRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className={englishFonts}>
      <body>{children}</body>
    </html>
  );
}
