"use server";

// Server Action: the form calls this function, but it runs on our server.
// That keeps the Make.com webhook address secret (it never reaches the browser).
//
// Flow: check the honeypot -> validate again -> build the payload -> POST to Make.
// Make then scores the lead, writes the CRM row and sends the replies (Flow A).

import { normalizeUtm } from "@/lib/tracking/utm";
import {
  STEP_1_FIELDS,
  STEP_2_FIELDS,
  normalizeEgyptianPhone,
  parseLeadInput,
  validateLead,
  type FieldErrors,
} from "./validation";

export type SubmitLeadResult =
  | { ok: true }
  | { ok: false; reason: "invalid"; errors: FieldErrors }
  | { ok: false; reason: "server" };

type SubmitLeadMeta = {
  locale: string;
  page: string;
  utm: unknown;
  /** Hidden field that people never see. Bots fill it, so a value means spam. */
  honeypot: string;
};

export async function submitLead(rawLead: unknown, meta: SubmitLeadMeta): Promise<SubmitLeadResult> {
  // Pretend it worked, so the bot does not learn it was caught.
  if (typeof meta?.honeypot === "string" && meta.honeypot !== "") {
    return { ok: true };
  }

  const lead = parseLeadInput(rawLead);
  const errors = validateLead(lead, [...STEP_1_FIELDS, ...STEP_2_FIELDS]);
  if (Object.keys(errors).length > 0) {
    return { ok: false, reason: "invalid", errors };
  }

  const payload = {
    ...lead,
    phone: normalizeEgyptianPhone(lead.phone),
    email: lead.email.toLowerCase(),
    ...normalizeUtm(meta.utm),
    locale: meta.locale === "ar" ? "ar" : "en",
    page: typeof meta.page === "string" ? meta.page.slice(0, 100) : "",
    submitted_at: new Date().toISOString(),
    is_simulated: false,
  };

  const webhookUrl = process.env.MAKE_WEBHOOK_URL;

  if (!webhookUrl) {
    // Local development without Make: log the lead so the form can still be tested.
    if (process.env.NODE_ENV !== "production") {
      console.log("[submitLead] MAKE_WEBHOOK_URL is not set. Lead not sent:", payload);
      return { ok: true };
    }
    console.error("[submitLead] MAKE_WEBHOOK_URL is missing in production.");
    return { ok: false, reason: "server" };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      console.error(`[submitLead] Make webhook answered ${response.status}`);
      return { ok: false, reason: "server" };
    }
    return { ok: true };
  } catch (error) {
    console.error("[submitLead] Could not reach the Make webhook:", error);
    return { ok: false, reason: "server" };
  }
}
