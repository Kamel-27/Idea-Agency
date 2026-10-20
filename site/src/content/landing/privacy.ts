import type { Locale } from "./types";

// Privacy note for the lead form and WhatsApp opt-in (Egypt PDPL).
// DRAFT: review with the team before launch, and add the agency email once decided.
// Keep it true: list only tools we actually use.

export type PrivacyContent = {
  meta: { title: string };
  title: string;
  updated: string;
  sections: { heading: string; body: string }[];
};

export const privacyContent: Record<Locale, PrivacyContent> = {
  en: {
    meta: { title: "Privacy note" },
    title: "Privacy note",
    updated: "Last updated: October 2026",
    sections: [
      {
        heading: "What we collect",
        body: "When you request the free diagnostic, we collect what you type in the form: your name, WhatsApp number, email, business name and your answers about your business. We also save which ad or link brought you to the page (UTM tags).",
      },
      {
        heading: "Why we collect it",
        body: "Only to contact you about your diagnostic, prepare your plan and follow up about it. We do not sell your data.",
      },
      {
        heading: "Where it goes",
        body: "Your request is processed with Make.com (automation), saved in Google Sheets (our lead list), and summarized with an AI assistant (Anthropic Claude) so we can prepare for your call. Emails are sent with Gmail.",
      },
      {
        heading: "WhatsApp",
        body: "We only message you on WhatsApp if you tick the WhatsApp box in the form.",
      },
      {
        heading: "Cookies and tracking",
        body: "With your consent, we use Google Analytics and the Meta Pixel to understand which ads work. You can refuse them and still use the page.",
      },
      {
        heading: "Your choices",
        body: "You can ask us to show, correct or delete your data at any time. Just reply to any message we send you.",
      },
    ],
  },
  ar: {
    meta: { title: "سياسة الخصوصية" },
    title: "سياسة الخصوصية",
    updated: "آخر تحديث: أكتوبر 2026",
    sections: [
      {
        heading: "بنجمع إيه",
        body: "لما تطلب التشخيص المجاني، بنحفظ اللي بتكتبه في الفورم: اسمك، رقم الواتساب، الإيميل، اسم البيزنس، وإجاباتك عن البيزنس بتاعك. وكمان بنحفظ الإعلان أو اللينك اللي جابك للصفحة (UTM).",
      },
      {
        heading: "ليه بنجمعها",
        body: "بس عشان نتواصل معاك بخصوص التشخيص، ونجهز خطتك، ونتابع معاك. مش بنبيع بياناتك.",
      },
      {
        heading: "بتروح فين",
        body: "طلبك بيتعالج على Make.com (أتمتة)، وبيتحفظ في Google Sheets (قائمة العملاء المحتملين)، وبنلخصه بمساعد ذكاء اصطناعي (Anthropic Claude) عشان نجهز للمكالمة. والإيميلات بتتبعت من Gmail.",
      },
      {
        heading: "واتساب",
        body: "مش هنبعتلك على واتساب غير لو علمت على خانة الواتساب في الفورم.",
      },
      {
        heading: "الكوكيز والتتبع",
        body: "بموافقتك، بنستخدم Google Analytics و Meta Pixel عشان نعرف أنهي إعلان شغال. تقدر ترفضهم وتستخدم الصفحة عادي.",
      },
      {
        heading: "اختياراتك",
        body: "تقدر تطلب تشوف بياناتك أو تعدلها أو تمسحها في أي وقت. رد بس على أي رسالة نبعتهالك.",
      },
    ],
  },
};
