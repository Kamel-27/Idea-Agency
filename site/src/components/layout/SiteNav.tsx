"use client";

// Client component: it needs the browser for two things,
// the current URL (to highlight the active link) and the open/closed mobile menu.

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { NavLink } from "@/content/types";
import { Button } from "@/components/ui/Button";

type SiteNavProps = {
  links: NavLink[];
  cta: NavLink;
};

export function SiteNav({ links, cta }: SiteNavProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      {/* Desktop: links in the middle, button on the right */}
      <nav aria-label="Main" className="hidden lg:block">
        <ul className="flex gap-9">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`border-b-2 py-6.5 font-display font-medium transition-colors hover:border-brand hover:text-brand ${
                  isActive(link.href) ? "border-brand text-brand" : "border-transparent"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="hidden lg:block">
        <Button href={cta.href} showArrow>
          {cta.label}
        </Button>
      </div>

      {/* Mobile: menu button that opens a panel under the header */}
      <button
        type="button"
        className="grid size-11 place-items-center lg:hidden"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="stroke-ink" strokeWidth="2" strokeLinecap="round">
          {isOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>

      {isOpen && (
        <nav aria-label="Mobile" className="absolute inset-x-0 top-full border-b border-line bg-white lg:hidden">
          <ul className="px-6 pt-2 pb-6">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block py-3 font-display text-lg font-medium ${isActive(link.href) ? "text-brand" : ""}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="px-6 pb-6">
            <Button href={cta.href} showArrow className="w-full justify-center">
              {cta.label}
            </Button>
          </div>
        </nav>
      )}
    </>
  );
}
