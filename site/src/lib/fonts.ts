import { Cairo, Caveat, Inter, Outfit } from "next/font/google";

// All fonts in one place. next/font downloads them at build time and serves
// them from our own domain: no request to Google from the visitor's browser.
//
// Each font fills a CSS variable that globals.css maps to Tailwind classes:
//   --font-body     -> font-sans     (body text)
//   --font-heading  -> font-display  (headings, buttons)
//   --font-hand     -> font-script   (handwriting)
// Arabic pages only load Cairo as --font-body. The heading and handwriting
// variables are missing there, so globals.css falls back to Cairo for them.

export const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
export const outfit = Outfit({ subsets: ["latin"], variable: "--font-heading" });
export const caveat = Caveat({ subsets: ["latin"], variable: "--font-hand" });

export const cairo = Cairo({ subsets: ["arabic", "latin"], variable: "--font-body" });

export const englishFonts = `${inter.variable} ${outfit.variable} ${caveat.variable}`;
export const arabicFonts = cairo.variable;
