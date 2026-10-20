import type { Locale, SiteChrome } from "./types";

// Site-wide settings, and the header text in each language.
// Edit text here, the header updates on every page of that language.

export const siteConfig = {
  name: "Idea Agency",
  description:
    "A digital marketing and web agency. Clear strategy, data-driven decisions and content that connects.",

  // WhatsApp number in international format without "+", e.g. "201012345678".
  // Empty until the team picks the number: the WhatsApp buttons stay hidden.
  whatsappNumber: "",
};

export const siteChrome: Record<Locale, SiteChrome> = {
  en: {
    locale: "en",
    homeHref: "/",
    nav: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "About", href: "/about" },
      { label: "Portfolio", href: "/work" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
    primaryCta: { label: "Get Started", href: "/diagnostic" },
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  ar: {
    locale: "ar",
    homeHref: "/ar",
    nav: [
      { label: "الرئيسية", href: "/ar" },
      { label: "خدماتنا", href: "/ar/services" },
      { label: "عننا", href: "/ar/about" },
      { label: "شغلنا", href: "/ar/work" },
      { label: "البلوج", href: "/ar/blog" },
      { label: "كلمنا", href: "/ar/contact" },
    ],
    primaryCta: { label: "يلا نبدأ", href: "/ar/diagnostic" },
    openMenu: "افتح القائمة",
    closeMenu: "اقفل القائمة",
  },
};
