/**
 * Idea Agency: lead Inbox (Google Apps Script, inside the "Idea Agency CRM" Sheet).
 *
 * The website sends every lead here as well as to Make, so no lead is lost
 * when Make is down or out of operations. It costs no Make operations.
 *
 *   stage "partial"   the visitor filled step 1 (name, WhatsApp, business) and clicked Next
 *   stage "complete"  the visitor submitted the whole form
 *
 * Every hour, checkInbox() emails the team about:
 *   - partial leads that did not finish the form within 2 hours
 *   - complete leads that are still missing from the Leads tab after 1 hour
 *     (Make was out of operations, off, or failed)
 * Each row is reported once (the "alerted" column).
 *
 * Setup: automation/apps-script/README.md
 */

const INBOX_SHEET = "Inbox";
const LEADS_SHEET = "Leads";

const HEADERS = [
  "received_at", "stage", "form_id", "make_ok", "alerted",
  "name", "phone", "email", "business", "industry", "role", "team_size", "spend",
  "challenge", "timeline", "whatsapp_opt_in", "locale", "page",
  "utm_source", "utm_medium", "utm_campaign", "utm_content", "is_simulated",
];

const PARTIAL_WAIT_HOURS = 2;
const COMPLETE_WAIT_HOURS = 1;

// ---------- Receiving leads from the website ----------

function doPost(e) {
  let data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return json({ ok: false, error: "bad json" });
  }

  const secret = PropertiesService.getScriptProperties().getProperty("INBOX_SECRET");
  if (!secret || data.secret !== secret) return json({ ok: false, error: "unauthorized" });
  if (data.stage !== "partial" && data.stage !== "complete") return json({ ok: false, error: "bad stage" });

  const row = HEADERS.map((header) => {
    if (header === "received_at") return new Date();
    if (header === "alerted") return "";
    return safeCell(data[header]);
  });

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    getInbox().appendRow(row);
  } finally {
    lock.releaseLock();
  }
  return json({ ok: true });
}

// ---------- Hourly check ----------

function checkInbox() {
  const inbox = getInbox();
  const values = inbox.getDataRange().getValues();
  if (values.length < 2) return;

  const col = {};
  values[0].forEach((name, i) => (col[name] = i));
  const rows = values.slice(1);
  const now = Date.now();
  const hoursAgo = (date) => (now - new Date(date).getTime()) / 36e5;

  const crmPhones = getCrmPhones();
  const completedForms = new Set();
  const completedPhones = new Set();
  rows.forEach((r) => {
    if (r[col.stage] === "complete") {
      completedForms.add(String(r[col.form_id]));
      completedPhones.add(cleanPhone(r[col.phone]));
    }
  });

  const unfinished = [];
  const missing = [];
  rows.forEach((r, i) => {
    if (r[col.alerted]) return;
    const phone = cleanPhone(r[col.phone]);
    const age = hoursAgo(r[col.received_at]);

    if (r[col.stage] === "partial" && age >= PARTIAL_WAIT_HOURS) {
      const finished =
        completedForms.has(String(r[col.form_id])) || completedPhones.has(phone) || crmPhones.has(phone);
      // Several partial rows of the same visitor (Back then Next again): report the latest only.
      const newerPartial = rows.some(
        (other, j) => j > i && other[col.stage] === "partial" && String(other[col.form_id]) === String(r[col.form_id]),
      );
      if (!finished && !newerPartial) unfinished.push(i);
      else markAlerted(inbox, i, col, finished ? "finished" : "duplicate");
    }

    if (r[col.stage] === "complete" && age >= COMPLETE_WAIT_HOURS) {
      if (!crmPhones.has(phone)) missing.push(i);
      else markAlerted(inbox, i, col, "in CRM");
    }
  });

  if (unfinished.length === 0 && missing.length === 0) return;

  const line = (i) => {
    const r = rows[i];
    const parts = [r[col.name], r[col.business], cleanPhone(r[col.phone]), r[col.email], r[col.locale], r[col.utm_source] + " / " + r[col.utm_content]];
    return "<li>" + parts.filter(String).map(escapeHtml).join(" · ") + "</li>";
  };

  let html = "";
  if (missing.length) {
    html +=
      "<p><b>" + missing.length + " complete lead(s) are NOT in the CRM.</b> Make did not process them " +
      "(out of operations, off, or an error). Add them by hand or resend them after Make is back:</p><ul>" +
      missing.map(line).join("") + "</ul>";
  }
  if (unfinished.length) {
    html +=
      "<p><b>" + unfinished.length + " visitor(s) filled step 1 but did not finish the form.</b> " +
      "You have their WhatsApp number: a call can win them back.</p><ul>" +
      unfinished.map(line).join("") + "</ul>";
  }
  html += "<p>Full details: CRM Sheet, Inbox tab.</p>";

  MailApp.sendEmail({
    to: PropertiesService.getScriptProperties().getProperty("TEAM_EMAIL"),
    subject:
      "Idea Agency Inbox: " +
      (missing.length ? missing.length + " not in CRM" : "") +
      (missing.length && unfinished.length ? ", " : "") +
      (unfinished.length ? unfinished.length + " unfinished" : ""),
    htmlBody: html,
  });

  missing.forEach((i) => markAlerted(inbox, i, col, "emailed: not in CRM"));
  unfinished.forEach((i) => markAlerted(inbox, i, col, "emailed: unfinished"));
}

/** Run once by hand: creates the hourly trigger for checkInbox. */
function setup() {
  getInbox();
  ScriptApp.getProjectTriggers()
    .filter((t) => t.getHandlerFunction() === "checkInbox")
    .forEach((t) => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger("checkInbox").timeBased().everyHours(1).create();
}

// ---------- Helpers ----------

function getInbox() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(INBOX_SHEET);
  if (!sheet) {
    sheet = ss.insertSheet(INBOX_SHEET);
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function getCrmPhones() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(LEADS_SHEET);
  const phones = new Set();
  if (!sheet) return phones;
  const values = sheet.getDataRange().getValues();
  const phoneCol = values[0].indexOf("phone");
  values.slice(1).forEach((r) => phones.add(cleanPhone(r[phoneCol])));
  return phones;
}

function markAlerted(sheet, rowIndex, col, note) {
  // rowIndex is 0-based in the data rows: +2 for the header row and 1-based rows.
  sheet.getRange(rowIndex + 2, col.alerted + 1).setValue(note);
}

function cleanPhone(value) {
  return String(value || "").replace(/[^\d]/g, "");
}

// Keeps text as text: a leading +, =, - or @ would make Sheets read a number or a formula.
function safeCell(value) {
  if (value === undefined || value === null) return "";
  if (typeof value === "boolean") return value;
  const text = String(value).slice(0, 2000);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function escapeHtml(text) {
  return String(text).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
}

function json(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);
}
