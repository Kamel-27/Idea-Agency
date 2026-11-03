import type { DiagnosticPageContent } from "./types";

// English text of the landing page (/diagnostic). Same message as the Arabic
// page: the free offer is a "free marketing plan", the main button is
// "Tell us about your business".
// Rule: only true claims. No invented reviews, numbers or results.

const cta = "Tell us about your business";

export const diagnosticEn: DiagnosticPageContent = {
  locale: "en",
  meta: {
    title: "Free Marketing Plan",
    description:
      "Tell us about your business and get a free 20-minute call and a clear 1-page plan within 48 hours.",
  },
  cta,
  links: { thankYou: "/thank-you", privacy: "/privacy" },

  hero: {
    eyebrow: "Free marketing plan",
    headline: "You spend on ads, but do you know what actually brings you customers?",
    subheadline:
      "Tell us about your business. On a 20-minute call we look at your ads and pages, then give you a clear plan: what is working, where your money goes, and what to do in the next 30 days.",
    highlights: ["Free 20-minute call", "A clear 1-page plan", "Your plan within 48 hours"],
    trustLine: "Free, with no obligation. The plan is yours, even if you never work with us.",
    planCard: {
      title: "Your 1-page plan",
      rows: ["What is working", "Where your money goes", "Your next 30 days"],
      footer: "Ready in 48 hours",
    },
  },

  problem: {
    eyebrow: "The problem",
    title: "You spend on marketing, but cannot see the full picture?",
    body: "You boost posts, try new ads, maybe pay a freelancer. But is it bringing sales, or is part of your budget going nowhere?",
  },

  steps: {
    eyebrow: "How it works",
    title: "3 simple steps to know where to start",
    items: [
      { title: "Tell us about your business", description: "The form takes a minute." },
      { title: "A 20-minute call", description: "We look at your pages, ads and numbers together." },
      {
        title: "Get a clear plan",
        description: "The 3 things that most need fixing, and what to do in the next 30 days.",
      },
    ],
  },

  value: {
    eyebrow: "What you get",
    title: "Everything you need to make your next decision with confidence",
    items: [
      "A look at your social media pages and ads",
      "The 3 biggest places you lose money or customers",
      "A 30-day plan you can follow yourself or with any team",
      "Free, with no obligation",
    ],
  },

  trust: {
    eyebrow: "Who we are",
    title: "We are Idea Agency, and we want to start with clear work",
    paragraphs: [
      "We are a team of 5, trained in marketing and AI automation in the DEPI program.",
      "We are still building our portfolio, so you will not find reviews here yet. That is why we start with a free plan that helps you understand your marketing before you decide or pay anything.",
    ],
  },

  faq: {
    eyebrow: "Questions",
    title: "Before you start",
    items: [
      { question: "Is the plan really free?", answer: "Yes. The call and the plan are completely free." },
      {
        question: "Do I have to work with you after?",
        answer: "No. The plan is yours, use it yourself or with anyone you choose.",
      },
      {
        question: "Who is the plan for?",
        answer: "Owners and managers who already spend on marketing and want to know what brings results.",
      },
      {
        question: "What will my data be used for?",
        answer: "Only to contact you about your plan. All the details are in the privacy policy.",
      },
    ],
  },

  formSection: {
    eyebrow: "Start now",
    title: "Tell us about your business",
    riskReversal: "Free, no obligation. We contact you within one working day.",
  },

  form: {
    stepLabel: "Step {step} of 2",
    stepTitles: ["Your details", "About your business"],
    labels: {
      name: "Your name",
      phone: "WhatsApp number",
      business: "Business name",
      email: "Email (we send your plan here)",
      industry: "Industry",
      role: "Your role",
      team_size: "Team size",
      spend: "Monthly marketing spend",
      challenge: "What is your biggest marketing challenge?",
      timeline: "When do you want to start?",
      whatsapp_opt_in: "Yes, you can contact me on WhatsApp.",
    },
    placeholders: {
      name: "Sara Ahmed",
      phone: "010 1234 5678",
      business: "Sara's Boutique",
      email: "sara@example.com",
      challenge: "For example: my Instagram ads get likes but no sales.",
    },
    options: {
      industry: {
        retail: "Retail and fashion",
        food: "Food and restaurants",
        beauty: "Beauty and salons",
        health: "Health and clinics",
        education: "Education and training",
        real_estate: "Real estate",
        services: "Professional services",
        ecommerce: "Online store",
        other: "Other",
      },
      role: { owner: "Owner", marketing_manager: "Marketing manager", employee: "Employee" },
      team_size: { "1-4": "1 to 4", "5-49": "5 to 49", "50+": "50 or more" },
      spend: {
        none: "None yet",
        under_5k: "Under 5,000 EGP",
        "5k_20k": "5,000 to 20,000 EGP",
        over_20k: "Over 20,000 EGP",
      },
      timeline: {
        this_month: "This month",
        within_3_months: "Within 3 months",
        just_exploring: "Just exploring",
      },
    },
    selectPlaceholder: "Choose one",
    optInPrivacyText: "Privacy note",
    errors: {
      required: "Please fill this in.",
      invalid_phone: "Enter an Egyptian mobile number, like 010 1234 5678.",
      invalid_email: "Enter a valid email, like name@example.com.",
      too_short: "Tell us a little more, at least a short sentence.",
      invalid_choice: "Please choose one of the options.",
    },
    serverError: "Something went wrong on our side. Please try again, or message us on WhatsApp.",
    next: "Next",
    back: "Back",
    submit: cta,
    sending: "Sending...",
  },
};

// Illustrations of the English landing page (files in public/concept/).
export const diagnosticEnImages = {
  hero: {
    src: "/concept/team-chat.webp",
    width: 2472,
    height: 1518,
    alt: "Two Idea Agency team members discussing a plan on their laptops",
  },
  steps: {
    src: "/concept/planning-chair.webp",
    width: 2138,
    height: 1584,
    alt: "A business owner thinking about his marketing plan",
  },
};
