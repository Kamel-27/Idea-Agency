import type { Industry, Role, SpendLevel, TeamSize, Timeline } from "@/lib/leads/fields";
import type { FieldError, LeadField } from "@/lib/leads/validation";

// The shape of a landing page's text. English and Arabic files must both
// match it, so TypeScript tells us if a translation is missing.

export type Locale = "en" | "ar";

type Heading = {
  eyebrow: string;
  title: string;
};

export type LeadFormContent = {
  stepLabel: string; // "Step {step} of 2"
  stepTitles: [string, string];
  labels: Record<LeadField, string>;
  placeholders: Partial<Record<LeadField, string>>;
  options: {
    industry: Record<Industry, string>;
    role: Record<Role, string>;
    team_size: Record<TeamSize, string>;
    spend: Record<SpendLevel, string>;
    timeline: Record<Timeline, string>;
  };
  selectPlaceholder: string;
  optInPrivacyText: string; // the link text inside the opt-in line
  errors: Record<FieldError, string>;
  serverError: string;
  next: string;
  back: string;
  submit: string;
  sending: string;
};

export type DiagnosticPageContent = {
  locale: Locale;
  meta: { title: string; description: string };
  cta: string;
  links: { thankYou: string; privacy: string };

  hero: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    trustLine: string;
    planCard: { title: string; rows: string[]; footer: string };
  };
  problem: Heading & { body: string };
  steps: Heading & { items: { title: string; description: string }[] };
  value: Heading & { items: string[] };
  trust: Heading & { paragraphs: string[] };
  faq: Heading & { items: { question: string; answer: string }[] };
  formSection: Heading & { riskReversal: string };
  form: LeadFormContent;
};

export type ThankYouPageContent = {
  locale: Locale;
  meta: { title: string };
  title: string;
  body: string;
  listTitle: string;
  list: string[];
  whatsappPrompt: string;
};

export type LandingChromeContent = {
  locale: Locale;
  privacyLabel: string;
  privacyHref: string;
  whatsappLabel: string;
  whatsappMessage: string;
};
