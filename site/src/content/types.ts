// Shared content shapes. Each one will become a Sanity schema later,
// so pages already receive data in the shape the CMS will return.
// English and Arabic files must both match these shapes, so TypeScript
// tells us when a translation is missing.

export type Locale = "en" | "ar";

export type NavLink = {
  label: string;
  href: string;
};

export type Service = {
  title: string;
  description: string;
};

/** Header and footer text of the website pages, per language. */
export type SiteChrome = {
  locale: Locale;
  homeHref: string;
  nav: NavLink[];
  primaryCta: NavLink;
  openMenu: string;
  closeMenu: string;
};

export type HomeContent = {
  locale: Locale;
  meta: { title: string; description: string };
  hero: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    description: string;
    primaryAction: NavLink;
    secondaryAction: NavLink;
    screenText: string[];
  };
  services: {
    eyebrow: string;
    title: string;
    items: Service[];
  };
  diagnosticCta: {
    titleStart: string;
    titleHighlight: string;
    action: NavLink;
  };
};
