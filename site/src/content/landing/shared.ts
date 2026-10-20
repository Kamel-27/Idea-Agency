import type { LandingChromeContent, Locale, ThankYouPageContent } from "./types";

// Text shared by all landing pages (footer, WhatsApp button) and the thank-you page.

export const landingChrome: Record<Locale, LandingChromeContent> = {
  en: {
    locale: "en",
    privacyLabel: "Privacy note",
    privacyHref: "/privacy",
    whatsappLabel: "Chat on WhatsApp",
    whatsappMessage: "Hi Idea Agency, I would like to ask about the free marketing diagnostic.",
  },
  ar: {
    locale: "ar",
    privacyLabel: "سياسة الخصوصية",
    privacyHref: "/ar/privacy",
    whatsappLabel: "كلمنا على واتساب",
    whatsappMessage: "أهلًا Idea Agency، عايز أسأل عن التشخيص التسويقي المجاني.",
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
    body: "هنبعتلك على واتساب خلال يوم عمل واحد عشان نحدد معاد المكالمة (20 دقيقة).",
    listTitle: "في المكالمة هنبص على:",
    list: [
      "البيزنس بتاعك بيجيب عملاء إزاي النهارده",
      "إيه اللي شغال وإيه اللي مش شغال",
      "أكبر 3 أماكن بتخسر فيها",
      "تعمل إيه في الـ30 يوم الجايين",
    ],
    whatsappPrompt: "عايز تتكلم أسرع؟",
  },
};
