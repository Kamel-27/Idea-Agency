import type { NavLink, Service } from "./types";

// Home page text. Components read from here, so copy changes never touch layout code.

export const homeContent = {
  hero: {
    eyebrow: "Digital marketing agency",
    titleLine1: "Turn Ideas Into",
    titleLine2: "Real Growth",
    description:
      "We help brands grow online with clear strategy, data-driven decisions, and content that connects.",
    primaryAction: { label: "Let's Talk", href: "/contact" } satisfies NavLink,
    secondaryAction: { label: "Our services", href: "#services" } satisfies NavLink,
    screenText: ["Better Marketing", "Bigger Opportunities"],
  },

  services: {
    eyebrow: "What we do",
    title: "From marketing strategy to measurable action",
    items: [
      {
        title: "Marketing strategy",
        description: "Research, audience, messaging and a 90-day plan, so every pound has a job.",
      },
      {
        title: "Campaigns and content",
        description:
          "Ads, content and tracking that show you what brings customers and what does not.",
      },
      {
        title: "Websites and landing pages",
        description: "Fast, mobile-first sites built to turn visitors into leads.",
      },
    ] satisfies Service[],
  },

  diagnosticCta: {
    titleStart: "Not sure what is working? Get a",
    titleHighlight: "free marketing diagnostic",
    action: { label: "Book my free diagnostic", href: "/diagnostic" } satisfies NavLink,
  },
};
