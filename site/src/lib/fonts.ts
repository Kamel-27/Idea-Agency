import { Cairo, Inter, Poppins } from "next/font/google";

// All fonts in one place, as set in the brand kit. next/font downloads them
// at build time and serves them from our own domain: no request to Google
// from the visitor's browser.
//
// Each font fills a CSS variable that globals.css maps to Tailwind classes:
//   --font-body     -> font-sans     (body text: Inter / Cairo)
//   --font-heading  -> font-display  (headings, buttons: Poppins)
// Arabic pages load Cairo as --font-body and have no --font-heading, so
// globals.css falls back to Cairo for headings.

export const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
// Poppins is not a variable font, so we list the weights the site uses.
export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-heading",
});

export const cairo = Cairo({ subsets: ["arabic", "latin"], variable: "--font-body" });

export const englishFonts = `${inter.variable} ${poppins.variable}`;
export const arabicFonts = cairo.variable;
