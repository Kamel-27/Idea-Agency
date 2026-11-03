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
        "Marketing plans, content and ads for your business, with the numbers tracked so you know where every pound goes.",
    },
    hero: {
      eyebrow: "Digital marketing agency",
      titleLine1: "Clear marketing,",
      titleLine2: "numbers you understand",
      description:
        "We create marketing plans, content and ads for your business, and track the numbers with you so you know where every pound goes.",
      primaryAction: { label: "Tell us about your business", href: "/diagnostic" },
      secondaryAction: { label: "Our services", href: "#services" },
      screenText: ["Better Marketing", "Bigger Opportunities"],
    },
    services: {
      eyebrow: "What we do",
      title: "From the first plan to results you can measure",
      items: [
        {
          title: "Marketing plan",
          description:
            "We understand your market and customers, and set a clear goal with steps to follow, so every pound has a purpose.",
        },
        {
          title: "Ads and content",
          description:
            "Ads and content in your customers' language, with tracking that shows what brings customers and what wastes money.",
        },
        {
          title: "Websites and landing pages",
          description: "Fast, mobile-first sites built to turn visitors into customers.",
        },
      ],
    },
    diagnosticCta: {
      titleStart: "Not sure your marketing is on the right track? Get a",
      titleHighlight: "free marketing plan",
      action: { label: "Tell us about your business", href: "/diagnostic" },
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
