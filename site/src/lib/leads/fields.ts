// The answer options of the lead form, as fixed codes.
// These codes are what Make.com and the CRM receive, in every language.
// The words people see live in content/landing/*.ts, one label per code.
// Keep them in sync with docs/03-system-spec.md (lead scoring uses them).

export const INDUSTRIES = [
  "retail",
  "food",
  "beauty",
  "health",
  "education",
  "real_estate",
  "services",
  "ecommerce",
  "other",
] as const;

export const ROLES = ["owner", "marketing_manager", "employee"] as const;

export const TEAM_SIZES = ["1-4", "5-49", "50+"] as const;

export const SPEND_LEVELS = ["none", "under_5k", "5k_20k", "over_20k"] as const;

export const TIMELINES = ["this_month", "within_3_months", "just_exploring"] as const;

export type Industry = (typeof INDUSTRIES)[number];
export type Role = (typeof ROLES)[number];
export type TeamSize = (typeof TEAM_SIZES)[number];
export type SpendLevel = (typeof SPEND_LEVELS)[number];
export type Timeline = (typeof TIMELINES)[number];
