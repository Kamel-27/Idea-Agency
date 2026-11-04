// Server only (used by the Server Actions in submitLead.ts).
// Sends a lead to the backup Inbox: a Google Apps Script web app that adds a row
// to the "Inbox" tab of the CRM Sheet (automation/apps-script/inbox.gs).
// It is free and separate from Make, so a lead is never lost when Make is down
// or out of operations. Returns true when the row was saved.

export type InboxStage = "partial" | "complete";

export async function sendToInbox(stage: InboxStage, lead: Record<string, unknown>): Promise<boolean> {
  const url = process.env.INBOX_URL;
  const secret = process.env.INBOX_SECRET;

  if (!url || !secret) {
    if (process.env.NODE_ENV !== "production") {
      console.log(`[inbox] INBOX_URL or INBOX_SECRET not set. Not saved (${stage}):`, lead);
    } else {
      console.error("[inbox] INBOX_URL or INBOX_SECRET is missing in production.");
    }
    return false;
  }

  try {
    // Apps Script answers with a redirect to the result; fetch follows it.
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ ...lead, stage, secret }),
      signal: AbortSignal.timeout(10_000),
    });
    const result = (await response.json().catch(() => null)) as { ok?: boolean } | null;
    if (!result?.ok) console.error(`[inbox] Inbox refused the ${stage} lead:`, result);
    return result?.ok === true;
  } catch (error) {
    console.error(`[inbox] Could not reach the Inbox (${stage}):`, error);
    return false;
  }
}
