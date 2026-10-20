import { INDUSTRIES, ROLES, SPEND_LEVELS, TEAM_SIZES, TIMELINES } from "./fields";

// Lead form rules, shared by the browser and the server.
// The browser uses them to show errors right away.
// The server runs them again, because anyone can send data to the server directly.

export type LeadInput = {
  // Step 1
  name: string;
  phone: string;
  business: string;
  // Step 2
  email: string;
  industry: string;
  role: string;
  team_size: string;
  spend: string;
  challenge: string;
  timeline: string;
  whatsapp_opt_in: boolean;
};

export type LeadField = keyof LeadInput;

export type FieldError = "required" | "invalid_phone" | "invalid_email" | "too_short" | "invalid_choice";

export type FieldErrors = Partial<Record<LeadField, FieldError>>;

export const STEP_1_FIELDS: LeadField[] = ["name", "phone", "business"];

export const STEP_2_FIELDS: LeadField[] = [
  "email",
  "industry",
  "role",
  "team_size",
  "spend",
  "challenge",
  "timeline",
];

export const EMPTY_LEAD: LeadInput = {
  name: "",
  phone: "",
  business: "",
  email: "",
  industry: "",
  role: "",
  team_size: "",
  spend: "",
  challenge: "",
  timeline: "",
  whatsapp_opt_in: false,
};

const CHOICES: Partial<Record<LeadField, readonly string[]>> = {
  industry: INDUSTRIES,
  role: ROLES,
  team_size: TEAM_SIZES,
  spend: SPEND_LEVELS,
  timeline: TIMELINES,
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Turns an Egyptian mobile number into +20 format, or returns null.
 * Accepts "010 1234 5678", "01012345678", "+201012345678" and "201012345678".
 */
export function normalizeEgyptianPhone(raw: string): string | null {
  const digits = raw.replace(/[\s\-()]/g, "");
  const match = digits.match(/^(?:\+?20|0)?(1[0125]\d{8})$/);
  return match ? `+20${match[1]}` : null;
}

/** Checks the given fields and returns an error code for each problem. */
export function validateLead(lead: LeadInput, fields: LeadField[]): FieldErrors {
  const errors: FieldErrors = {};

  for (const field of fields) {
    const value = lead[field];
    if (typeof value !== "string") continue;

    if (value.trim() === "") {
      errors[field] = "required";
    } else if (field === "phone" && !normalizeEgyptianPhone(value)) {
      errors[field] = "invalid_phone";
    } else if (field === "email" && !EMAIL_PATTERN.test(value.trim())) {
      errors[field] = "invalid_email";
    } else if (field === "challenge" && value.trim().length < 10) {
      errors[field] = "too_short";
    } else if (CHOICES[field] && !CHOICES[field].includes(value)) {
      errors[field] = "invalid_choice";
    }
  }

  return errors;
}

/** Builds a clean LeadInput from untrusted data (used on the server). */
export function parseLeadInput(raw: unknown): LeadInput {
  const data = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const text = (key: string, max = 300) =>
    typeof data[key] === "string" ? data[key].trim().slice(0, max) : "";

  return {
    name: text("name", 100),
    phone: text("phone", 30),
    business: text("business", 150),
    email: text("email", 150),
    industry: text("industry", 30),
    role: text("role", 30),
    team_size: text("team_size", 10),
    spend: text("spend", 20),
    challenge: text("challenge", 1000),
    timeline: text("timeline", 30),
    whatsapp_opt_in: data.whatsapp_opt_in === true,
  };
}
