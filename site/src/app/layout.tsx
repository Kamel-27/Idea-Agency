import type { Metadata } from "next";
import { Caveat, Inter, Outfit } from "next/font/google";
import { siteConfig } from "@/content/site";
import "./globals.css";

// Root layout: wraps every page on the site, including landing pages.
// Only global things belong here: fonts, metadata, <html> and <body>.
// The header and footer live in app/(site)/layout.tsx, so landing pages can skip them.

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat" });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} ${caveat.variable}`}>
      <body>{children}</body>
    </html>
  );
}
