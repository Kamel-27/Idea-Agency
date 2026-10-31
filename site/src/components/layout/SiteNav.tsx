"use client";

// Client component: it needs the browser for two things,
// the current URL (to highlight the active link) and the open/closed mobile menu.

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { SiteChrome } from "@/content/types";
import { Button } from "@/components/ui/Button";
import { LanguageSwitch } from "./LanguageSwitch";

export function SiteNav({ chrome }: { chrome: SiteChrome }) {
  const { nav, primaryCta, locale } = chrome;
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Home links ("/" and "/ar") are only active on the home page itself.
  const isActive = (href: string) =>
    href === chrome.homeHref ? pathname === href : pathname.startsWith(href);

  return (
    <>
      {/* Desktop: links in the middle */}
      {/* The header stays left-to-right, but Arabic menu items read right-to-left */}
      <nav aria-label="Main" className="hidden lg:block">
        <ul dir={locale === "ar" ? "rtl" : "ltr"} className="flex gap-9">
          {nav.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`border-b-2 py-6.5 font-display font-medium transition-colors hover:border-brand ${
                  isActive(link.href) ? "border-brand" : "border-transparent"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Right side: language switch, button (desktop), menu button (mobile) */}
      <div className="flex items-center gap-3">
        <LanguageSwitch locale={locale} />
        <div className="hidden lg:block">
          <Button href={primaryCta.href} showArrow>
            {primaryCta.label}
          </Button>
        </div>
        <button
          type="button"
          className="grid size-11 place-items-center lg:hidden"
          aria-label={isOpen ? chrome.closeMenu : chrome.openMenu}
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="stroke-ink" strokeWidth="2" strokeLinecap="round">
            {isOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {/* Mobile: panel under the header, in the page's own text direction */}
      {isOpen && (
        <nav
          aria-label="Mobile"
          dir={locale === "ar" ? "rtl" : "ltr"}
          className="absolute inset-x-0 top-full border-b border-line bg-paper lg:hidden"
        >
          <ul className="px-6 pt-2 pb-6">
            {nav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block py-3 font-display text-lg font-medium ${isActive(link.href) ? "underline decoration-brand decoration-[3px] underline-offset-8" : ""}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="px-6 pb-6">
            <Button href={primaryCta.href} showArrow className="w-full justify-center">
              {primaryCta.label}
            </Button>
          </div>
        </nav>
      )}
    </>
  );
}
