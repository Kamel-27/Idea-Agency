import type { HomeContent, Locale } from "./types";

// Home page text in both languages. Components read from here, so copy
// changes never touch layout code.
// Arabic voice: Egyptian Arabic with common English marketing words mixed in.
// Spacing note: short Arabic prefixes (بـ، لـ، الـ، و) before an English word are
// joined to it with a non-breaking space, so a line never breaks between them.
// It looks like a normal space. A normal space also works, it just may wrap badly.

export const homeContent: Record<Locale, HomeContent> = {
  en: {
    locale: "en",
    meta: {
      title: "Idea Agency",
      description:
        "A digital marketing and web agency. Clear strategy, data-driven decisions and content that connects.",
    },
    hero: {
      eyebrow: "Digital marketing agency",
      titleLine1: "Turn Ideas Into",
      titleLine2: "Real Growth",
      description:
        "We help brands grow online with clear strategy, data-driven decisions, and content that connects.",
      primaryAction: { label: "Let's Talk", href: "/contact" },
      secondaryAction: { label: "Our services", href: "#services" },
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
      ],
    },
    diagnosticCta: {
      titleStart: "Not sure what is working? Get a",
      titleHighlight: "free marketing diagnostic",
      action: { label: "Book my free diagnostic", href: "/diagnostic" },
    },
  },

  ar: {
    locale: "ar",
    meta: {
      title: "Idea Agency",
      description:
        "بنعمل Plan تسويق و Content و Ads للبيزنس بتاعك، ونتابع الأرقام معاك عشان تعرف كل جنيه بيروح فين.",
    },
    hero: {
      eyebrow: "Digital Marketing Agency",
      titleLine1: "تسويق واضح،",
      titleLine2: "بأرقام تفهمها",
      description:
        "بنعمل Plan تسويق و Content و Ads للبيزنس بتاعك، ونتابع الأرقام معاك عشان تعرف كل جنيه بيروح فين.",
      primaryAction: { label: "احكيلنا عن مشروعك", href: "/ar/diagnostic" },
      secondaryAction: { label: "شوف خدماتنا", href: "#services" },
      // Stays in English on purpose: part of the design, written in a handwriting font.
      screenText: ["Better Marketing", "Bigger Opportunities"],
    },
    services: {
      eyebrow: "بنعمل إيه",
      title: "من أول Plan لحد نتيجة تقدر تقيسها",
      items: [
        {
          title: "Plan تسويق",
          description: "بنفهم السوق وعملاءك، ونرتبلك هدف واضح وخطوات تمشي عليها، عشان كل جنيه يبقى ليه هدف.",
        },
        {
          title: "Ads و Content",
          description: "إعلانات ومحتوى بلغة عملائك، مع Tracking يوضحلك إيه اللي بيجيب عملاء وإيه اللي بيضيع فلوس.",
        },
        {
          title: "Websites و Landing Pages",
          description: "مواقع سريعة ومعمولة للموبايل الأول، هدفها تحوّل الزوار لعملاء.",
        },
      ],
    },
    diagnosticCta: {
      titleStart: "مش متأكد إن التسويق بتاعك ماشي صح؟ خد",
      titleHighlight: "خطة تسويق ببلاش",
      action: { label: "احكيلنا عن مشروعك", href: "/ar/diagnostic" },
    },
  },
};
