import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { englishFonts } from "@/lib/fonts";
import "./globals.css";

// 404 page for any unknown URL. It needs its own <html> because the app has
// two root layouts, (en) and (ar). Enabled in next.config.ts (globalNotFound).

export const metadata: Metadata = {
  title: "Page not found | Idea Agency",
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={englishFonts}>
      <body className="grid min-h-screen place-items-center px-6 text-center">
        <div>
          <Logo className="text-[32px]" />
          <h1 className="mt-10 text-4xl font-semibold">This page is not here yet</h1>
          <p className="mt-3 text-muted">We are still building parts of the site.</p>
          <Link
            href="/"
            className="mt-8 inline-flex min-h-12 items-center rounded-full bg-brand px-6 font-display font-medium text-white"
          >
            Back to home
          </Link>
        </div>
      </body>
    </html>
  );
}
