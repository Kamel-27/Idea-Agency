import type { LandingChromeContent, Locale, ThankYouPageContent } from "./types";

// Text shared by all landing pages (footer, WhatsApp button) and the thank-you page.

export const landingChrome: Record<Locale, LandingChromeContent> = {
  en: {
    locale: "en",
    homeLabel: "Visit our website",
    homeHref: "/",
    privacyLabel: "Privacy note",
    privacyHref: "/privacy",
    whatsappLabel: "Chat on WhatsApp",
    whatsappMessage: "Hi Idea Agency, I would like to ask about the free marketing diagnostic.",
  },
  ar: {
    locale: "ar",
    homeLabel: "زور موقعنا",
    homeHref: "/", // no Arabic website yet, so this opens the English home page
    privacyLabel: "سياسة الخصوصية",
    privacyHref: "/ar/privacy",
    whatsappLabel: "كلمنا على واتساب",
    whatsappMessage: "أهلًا Idea Agency، حابب أعرف أكتر عن المراجعة التسويقية المجانية.",
  },
};

export const thankYouContent: Record<Locale, ThankYouPageContent> = {
  en: {
    locale: "en",
    meta: { title: "Thank you" },
    title: "Thank you, we got your request.",
    body: "We will message you on WhatsApp within one working day to book your 20-minute call.",
    listTitle: "On the call we will look at:",
    list: [
      "How your business gets customers today",
      "What is working and what is not",
      "The 3 biggest leaks in your marketing",
      "What to do in the next 30 days",
    ],
    whatsappPrompt: "Want to talk sooner?",
  },
  ar: {
    locale: "ar",
    meta: { title: "شكرًا" },
    title: "شكرًا، طلبك وصلنا.",
    body: "هنتواصل معاك على واتساب خلال يوم عمل واحد عشان نحدد معاد المكالمة (20 دقيقة).",
    listTitle: "في المكالمة هنراجع مع بعض:",
    list: [
      "إزاي البيزنس بتاعك بيجيب عملاء دلوقتي",
      "إيه اللي شغال وإيه اللي محتاج يتغير",
      "أهم 3 أماكن ممكن تكون بتخسر فيها",
      "أولوياتك في الـ30 يوم الجايين",
    ],
    whatsappPrompt: "حابب تتكلم معانا أسرع؟",
  },
};
