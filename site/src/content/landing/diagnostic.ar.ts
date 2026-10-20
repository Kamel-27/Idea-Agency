import type { DiagnosticPageContent } from "./types";

// Arabic text of the free diagnostic landing page (/ar/diagnostic).
// Voice: Egyptian Arabic the way business owners really talk, with common
// English marketing words mixed in (Ads, Plan, Budget). Conversational in the
// headlines, clear and professional in the form and privacy text.
// In Arabic the offer is called «كشف تسويقي ببلاش». No city or country names.
// Rule: only true claims. No invented reviews, numbers or results.
// Spacing note: short Arabic prefixes (بـ، لـ، الـ، و) before an English word are
// joined to it with a non-breaking space, so a line never breaks between them.
// It looks like a normal space. A normal space also works, it just may wrap badly.

const cta = "عايز أعرف إيه اللي شغال";

export const diagnosticAr: DiagnosticPageContent = {
  locale: "ar",
  meta: {
    title: "كشف تسويقي ببلاش",
    description:
      "اكشف على التسويق بتاعك واعرف فلوسك بتروح فين: Call ببلاش لمدة 20 دقيقة، و Plan واضحة في صفحة واحدة توصلك خلال 48 ساعة.",
  },
  cta,
  links: { thankYou: "/ar/thank-you", privacy: "/ar/privacy" },

  hero: {
    eyebrow: "كشف تسويقي ببلاش",
    headline: "بتصرف على الإعلانات، بس مش عارف إيه اللي بيجيبلك عملاء فعلًا؟",
    subheadline:
      "اكشف على التسويق بتاعك، واعرف فلوسك بتروح فين. هنبص على الـ Ads والـ Pages بتاعتك، ونقولك إيه اللي شغال، وتعمل إيه في الـ30 يوم الجايين.",
    highlights: ["Call ببلاش لمدة 20 دقيقة", "Plan واضحة في صفحة واحدة", "الـ Plan توصلك خلال 48 ساعة"],
    trustLine: "ببلاش ومن غير أي التزام. والـ Plan بتاعتك حتى لو ما اشتغلتش معانا.",
    planCard: {
      title: "الـ Plan بتاعتك في صفحة واحدة",
      rows: ["إيه اللي شغال", "فلوسك بتروح فين", "أولوياتك في الـ30 يوم الجايين"],
      footer: "توصلك خلال 48 ساعة",
    },
  },

  problem: {
    eyebrow: "المشكلة",
    title: "بتصرف على التسويق، بس مش شايف الصورة كاملة؟",
    body: "بتعمل Boost للبوستات، وبتجرب Ads جديدة، ويمكن بتدفع لـ Freelancer. بس هل ده بيجيب Sales فعلًا؟ ولا جزء من الـ Budget بيروح من غير نتيجة؟",
  },

  steps: {
    eyebrow: "إزاي بنشتغل",
    title: "3 خطوات بسيطة عشان تعرف تبدأ منين",
    items: [
      { title: "احكيلنا عن البيزنس بتاعك", description: "الفورم بياخد دقيقة." },
      { title: "Call لمدة 20 دقيقة", description: "نبص سوا على الـ Pages والـ Ads والأرقام." },
      {
        title: "تستلم Plan واضحة",
        description: "أهم 3 حاجات محتاجة تتصلح، وتعمل إيه في الـ30 يوم الجايين.",
      },
    ],
  },

  value: {
    eyebrow: "هتاخد إيه",
    title: "كل اللي محتاجه عشان تاخد قرارك الجاي وانت فاهم",
    items: [
      "كشف على الـ Social Media Pages والـ Ads بتاعتك",
      "أهم 3 أماكن بتخسر فيها فلوس أو عملاء",
      "Plan لـ 30 يوم تنفذها بنفسك أو مع أي Team",
      "ببلاش، ومن غير أي التزام",
    ],
  },

  trust: {
    eyebrow: "مين إحنا",
    title: "إحنا Idea Agency، وعايزين نبدأ معاك بشغل واضح",
    paragraphs: [
      "إحنا Team من 5 أشخاص، اتدربنا على التسويق والـ Automation بالـ AI في برنامج DEPI.",
      "لسه بنبني الـ Portfolio بتاعنا، فمش هتلاقي هنا Reviews لسه. وعشان كده بنبدأ بكشف ببلاش يساعدك تفهم وضع التسويق عندك قبل ما تاخد أي قرار أو تدفع أي حاجة.",
    ],
  },

  faq: {
    eyebrow: "أسئلة متكررة",
    title: "قبل ما تبدأ",
    items: [
      { question: "هو الكشف ببلاش فعلًا؟", answer: "أيوه. الـ Call والـ Plan ببلاش بالكامل." },
      {
        question: "لازم أشتغل معاكم بعدها؟",
        answer: "لأ. الـ Plan بتاعتك، تنفذها بنفسك أو مع أي حد تختاره.",
      },
      {
        question: "الكشف ده مناسب لمين؟",
        answer: "لأصحاب ومديري البيزنس اللي بيصرفوا على التسويق بالفعل، وعايزين يعرفوا إيه اللي بيجيب نتيجة.",
      },
      {
        question: "بياناتي هتتستخدم في إيه؟",
        answer: "بنستخدمها بس عشان نتواصل معاك بخصوص الكشف. التفاصيل كلها في سياسة الخصوصية.",
      },
    ],
  },

  formSection: {
    eyebrow: "ابدأ دلوقتي",
    title: "اعرف إيه اللي شغال في التسويق بتاعك",
    riskReversal: "ببلاش ومن غير التزام. هنكلمك خلال يوم عمل واحد.",
  },

  form: {
    stepLabel: "خطوة {step} من 2",
    stepTitles: ["بياناتك", "عن البيزنس بتاعك"],
    labels: {
      name: "الاسم",
      phone: "رقم الواتساب",
      business: "اسم البيزنس",
      email: "الإيميل (هنبعتلك عليه الـ Plan)",
      industry: "المجال",
      role: "دورك في البيزنس",
      team_size: "عدد الفريق",
      spend: "ميزانية التسويق الشهرية",
      challenge: "إيه أكبر تحدي بتواجهه في التسويق؟",
      timeline: "إمتى حابب تبدأ؟",
      whatsapp_opt_in: "موافق إنكم تتواصلوا معايا على واتساب.",
    },
    placeholders: {
      name: "سارة أحمد",
      phone: "010 1234 5678",
      business: "بوتيك سارة",
      email: "sara@example.com",
      challenge: "مثلًا: إعلانات Instagram بتجيب Engagement، بس مش بتجيب Sales.",
    },
    options: {
      industry: {
        retail: "تجزئة وملابس",
        food: "مطاعم وأكل",
        beauty: "تجميل وصالونات",
        health: "صحة وعيادات",
        education: "تعليم وتدريب",
        real_estate: "عقارات",
        services: "خدمات مهنية",
        ecommerce: "Online Store",
        other: "مجال تاني",
      },
      role: { owner: "صاحب البيزنس", marketing_manager: "Marketing Manager", employee: "موظف" },
      team_size: { "1-4": "من 1 لـ 4", "5-49": "من 5 لـ 49", "50+": "50 أو أكتر" },
      spend: {
        none: "مفيش ميزانية حاليًا",
        under_5k: "أقل من 5,000 جنيه",
        "5k_20k": "من 5,000 لـ 20,000 جنيه",
        over_20k: "أكتر من 20,000 جنيه",
      },
      timeline: {
        this_month: "الشهر ده",
        within_3_months: "خلال 3 شهور",
        just_exploring: "لسه بستكشف",
      },
    },
    selectPlaceholder: "اختار من القائمة",
    optInPrivacyText: "سياسة الخصوصية",
    errors: {
      required: "الخانة دي مطلوبة.",
      invalid_phone: "اكتب رقم موبايل مصري صحيح، زي 010 1234 5678.",
      invalid_email: "اكتب إيميل صحيح، زي name@example.com.",
      too_short: "اكتب جملة قصيرة على الأقل عشان نفهم التحدي.",
      invalid_choice: "اختار من الاختيارات المتاحة.",
    },
    serverError: "حصلت مشكلة من عندنا. جرّب تاني، أو كلمنا على واتساب.",
    next: "التالي",
    back: "رجوع",
    submit: cta,
    sending: "جاري الإرسال...",
  },
};
