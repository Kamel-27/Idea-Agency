import type { DiagnosticPageContent } from "./types";

// English text of the free diagnostic landing page (/diagnostic).
// Draft copy from docs/04-landing-page-spec.md. The funnel teammate finalizes it.
// Rule: only true claims. No invented reviews, numbers or results.

export const diagnosticEn: DiagnosticPageContent = {
  locale: "en",
  meta: {
    title: "Free SME Marketing Diagnostic",
    description:
      "A free 20-minute marketing diagnostic for Cairo businesses, with a 1-page action plan in 48 hours.",
  },
  cta: "Book my free diagnostic",
  links: { thankYou: "/thank-you", privacy: "/privacy" },

  hero: {
    eyebrow: "Free SME marketing diagnostic",
    headline: "Find out which part of your marketing brings customers, before you spend another pound.",
    subheadline:
      "A free 20-minute marketing diagnostic for Cairo businesses, with a 1-page action plan in 48 hours.",
    trustLine: "Free, no obligation. The plan is yours to keep.",
    planCard: {
      title: "Your 1-page plan",
      rows: ["What is working", "What is wasting money", "Your next 30 days"],
      footer: "Ready in 48 hours",
    },
  },

  problem: {
    eyebrow: "Sound familiar?",
    title: "You spend on marketing, but you do not know what works",
    body: "You boost posts, pay a freelancer, try a new ad every month. Some months sales go up, some months they do not, and you do not know why.",
  },

  steps: {
    eyebrow: "How it works",
    title: "Three simple steps",
    items: [
      { title: "Fill the short form", description: "It takes about one minute." },
      {
        title: "Talk to us for 20 minutes",
        description: "We look at your page, your ads and your numbers with you.",
      },
      {
        title: "Get your 1-page plan",
        description: "What is working, what is wasting money, and what to do in the next 30 days.",
      },
    ],
  },

  value: {
    eyebrow: "What you get",
    title: "Everything you need to decide your next move",
    items: [
      "A review of your social media pages and ads",
      "The 3 biggest places you are losing money or customers",
      "A 30-day action plan you can follow yourself or with anyone",
      "Free, with no obligation",
    ],
  },

  trust: {
    eyebrow: "Who we are",
    title: "A new agency that shows its work",
    paragraphs: [
      "Idea Agency is a team of five: marketing strategists, content creators and a web developer, trained in DEPI's Advanced Marketing Automation with AI program.",
      "We are new, so you will not see reviews here yet. We would rather earn them. The diagnostic is how we prove we can help, before you pay anything.",
    ],
  },

  faq: {
    eyebrow: "Questions",
    title: "Before you book",
    items: [
      { question: "Is it really free?", answer: "Yes. The call and the plan are free." },
      {
        question: "Do I have to hire you after?",
        answer: "No. The plan is yours, use it with anyone you like.",
      },
      {
        question: "Who is it for?",
        answer: "Business owners and managers who already spend on marketing and want to know what works.",
      },
      {
        question: "What happens to my data?",
        answer:
          "We only use it to contact you about your diagnostic. Read our privacy note for the details.",
      },
    ],
  },

  formSection: {
    eyebrow: "Book now",
    title: "Get your free marketing diagnostic",
    riskReversal: "Free, no obligation. We reply within one working day.",
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
    submit: "Book my free diagnostic",
    sending: "Sending...",
  },
};
