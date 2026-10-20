import { Cairo, Caveat, Inter, Outfit } from "next/font/google";

// All fonts in one place. next/font downloads them at build time and serves
// them from our own domain: no request to Google from the visitor's browser.
//
// Each font fills a CSS variable that globals.css maps to Tailwind classes:
//   --font-body     -> font-sans     (body text)
//   --font-heading  -> font-display  (headings, buttons)
//   --font-hand     -> font-script   (handwriting)
// Arabic pages load Cairo as --font-body and have no --font-heading, so
// globals.css falls back to Cairo for headings.

export const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
export const outfit = Outfit({ subsets: ["latin"], variable: "--font-heading" });
export const caveat = Caveat({ subsets: ["latin"], variable: "--font-hand" });

export const cairo = Cairo({ subsets: ["arabic", "latin"], variable: "--font-body" });

export const englishFonts = `${inter.variable} ${outfit.variable} ${caveat.variable}`;
// Caveat stays on Arabic pages for the English handwriting on the home page laptop.
export const arabicFonts = `${cairo.variable} ${caveat.variable}`;
