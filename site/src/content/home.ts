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
        "بنساعدك تكبّر البيزنس بتاعك أونلاين بـ Strategy واضحة، وقرارات مبنية على الأرقام، و Content بيوصل للناس الصح.",
    },
    hero: {
      eyebrow: "Digital Marketing Agency",
      titleLine1: "حوّل فكرتك",
      titleLine2: "لـ Growth حقيقي",
      description:
        "بنساعدك تكبّر البيزنس بتاعك أونلاين بـ Strategy واضحة، وقرارات مبنية على الأرقام، و Content بيوصل للناس الصح.",
      primaryAction: { label: "يلا نتكلم", href: "/ar/contact" },
      secondaryAction: { label: "شوف خدماتنا", href: "#services" },
      // Stays in English on purpose: part of the design, written in a handwriting font.
      screenText: ["Better Marketing", "Bigger Opportunities"],
    },
    services: {
      eyebrow: "بنعمل إيه",
      title: "من الـ Strategy لحد نتيجة تقدر تقيسها",
      items: [
        {
          title: "Marketing Strategy",
          description:
            "بنفهم السوق والجمهور بتاعك، ونطلعلك رسالة واضحة وخطة 90 يوم، عشان كل فلوس بتصرفها يبقى ليها هدف.",
        },
        {
          title: "Ads و Content",
          description: "إعلانات ومحتوى و Tracking يوضحلك إيه اللي بيجيب عملاء وإيه اللي بيضيع فلوس.",
        },
        {
          title: "Websites و Landing Pages",
          description: "مواقع سريعة ومعمولة للموبايل الأول، هدفها تحوّل الزوار لـ Leads.",
        },
      ],
    },
    diagnosticCta: {
      titleStart: "مش عارف إيه اللي شغال في التسويق بتاعك؟ اعمل",
      titleHighlight: "كشف تسويقي ببلاش",
      action: { label: "عايز أعرف إيه اللي شغال", href: "/ar/diagnostic" },
    },
  },
};
