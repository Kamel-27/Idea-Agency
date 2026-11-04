"use server";

// Server Actions: the form calls these functions, but they run on our server.
// That keeps the Make.com webhook and the Inbox address secret (they never reach the browser).
//
// savePartialLead: step 1 done ("Next" clicked) -> backup Inbox only. Costs no Make operations.
// submitLead:      whole form sent -> Make (Flow A scores, saves, replies) + backup Inbox.
// The visitor sees success when at least one of the two saved the lead.

import { normalizeUtm } from "@/lib/tracking/utm";
import { sendToInbox } from "./inbox";
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
  /** Random id of this form visit: links the step 1 save to the final submit. */
  formId: string;
};

/** Fields every save shares: where the lead came from and when. */
function context(meta: SubmitLeadMeta) {
  return {
    ...normalizeUtm(meta.utm),
    locale: meta.locale === "ar" ? "ar" : "en",
    page: typeof meta.page === "string" ? meta.page.slice(0, 100) : "",
    form_id: typeof meta.formId === "string" ? meta.formId.slice(0, 64) : "",
    submitted_at: new Date().toISOString(),
    is_simulated: false,
  };
}

/** Step 1 saved quietly when the visitor clicks Next. Nothing changes for the visitor. */
export async function savePartialLead(rawLead: unknown, meta: SubmitLeadMeta): Promise<void> {
  if (typeof meta?.honeypot === "string" && meta.honeypot !== "") return;

  const lead = parseLeadInput(rawLead);
  if (Object.keys(validateLead(lead, STEP_1_FIELDS)).length > 0) return;

  await sendToInbox("partial", {
    name: lead.name,
    phone: normalizeEgyptianPhone(lead.phone),
    business: lead.business,
    ...context(meta),
  });
}

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
    ...context(meta),
  };

  const makeOk = await sendToMake(payload);
  const inboxOk = await sendToInbox("complete", { ...payload, make_ok: makeOk });

  if (makeOk || inboxOk) return { ok: true };

  // Local development without Make or the Inbox: the lead was printed in the terminal.
  if (process.env.NODE_ENV !== "production" && !process.env.MAKE_WEBHOOK_URL) return { ok: true };
  return { ok: false, reason: "server" };
}

async function sendToMake(payload: Record<string, unknown>): Promise<boolean> {
  const webhookUrl = process.env.MAKE_WEBHOOK_URL;

  if (!webhookUrl) {
    if (process.env.NODE_ENV !== "production") {
      console.log("[submitLead] MAKE_WEBHOOK_URL is not set. Lead not sent to Make:", payload);
    } else {
      console.error("[submitLead] MAKE_WEBHOOK_URL is missing in production.");
    }
    return false;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) console.error(`[submitLead] Make webhook answered ${response.status}`);
    return response.ok;
  } catch (error) {
    console.error("[submitLead] Could not reach the Make webhook:", error);
    return false;
  }
}
