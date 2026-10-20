import type { NavLink } from "./types";

// Site-wide settings: name, menu and the main call to action.
// Edit text here, the header and footer update everywhere.

export const siteConfig = {
  name: "Idea Agency",
  description:
    "A digital marketing and web agency in Cairo. Clear strategy, data-driven decisions and content that connects.",
  location: "Cairo, Egypt",

  nav: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Portfolio", href: "/work" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ] satisfies NavLink[],

  primaryCta: { label: "Get Started", href: "/diagnostic" } satisfies NavLink,
};
