// Sends one test lead to the Make.com webhook, exactly like the website form does.
// Use it to test Flow A without filling the form every time.
//
// Usage (from the repo root):
//   node automation/scripts/send-test-lead.mjs automation/test-leads/01-hot-owner-high-spend.json
//   node automation/scripts/send-test-lead.mjs all        <- sends every file, 3 seconds apart
//
// The webhook URL is read from MAKE_WEBHOOK_URL in site/.env.local (the same
// value the website uses), or from the MAKE_WEBHOOK_URL environment variable.
// Test leads have is_simulated = true, so they are easy to filter out of reports.

import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, basename } from "node:path";

const TEST_LEADS_DIR = "automation/test-leads";
const ENV_FILE = "site/.env.local";

function readWebhookUrl() {
  if (process.env.MAKE_WEBHOOK_URL) return process.env.MAKE_WEBHOOK_URL;
  if (existsSync(ENV_FILE)) {
    const line = readFileSync(ENV_FILE, "utf8")
      .split(/\r?\n/)
      .find((row) => row.startsWith("MAKE_WEBHOOK_URL="));
    const value = line?.slice("MAKE_WEBHOOK_URL=".length).trim();
    if (value) return value;
  }
  console.error(`MAKE_WEBHOOK_URL not found. Add it to ${ENV_FILE} or set it in your terminal.`);
  process.exit(1);
}

async function sendLead(url, file) {
  const lead = JSON.parse(readFileSync(file, "utf8"));
  // Fresh timestamp, so each test run looks like a new submission.
  lead.submitted_at = new Date().toISOString();

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead),
  });
  const answer = await response.text();
  console.log(`${response.ok ? "OK  " : "FAIL"} ${response.status}  ${basename(file)}  ${answer.slice(0, 80)}`);
}

const target = process.argv[2];
if (!target) {
  console.error("Give a test lead file, or 'all'. See the top of this script for examples.");
  process.exit(1);
}

const url = readWebhookUrl();
const files =
  target === "all"
    ? readdirSync(TEST_LEADS_DIR)
        .filter((name) => name.endsWith(".json"))
        .sort()
        .map((name) => join(TEST_LEADS_DIR, name))
    : [target];

for (const [index, file] of files.entries()) {
  if (index > 0) await new Promise((resolve) => setTimeout(resolve, 3000));
  await sendLead(url, file);
}
