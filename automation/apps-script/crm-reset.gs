/**
 * Idea Agency: clean CRM with sample data, a "Today" tab and a dashboard.
 * Google Apps Script, in the same project as inbox.gs (inside the CRM Sheet).
 *
 * Run resetCrmWithSampleData() once. It:
 *   1. makes a full backup copy of the Sheet in your Google Drive
 *   2. clears the Leads, Log, Errors and Inbox rows (headers stay)
 *   3. adds 52 sample leads over the last 4 weeks (is_simulated = TRUE)
 *   4. builds the "Today" tab (leads that need action) and the "Dashboard" tab
 *
 * Run buildCrmViews() alone to rebuild only Today + Dashboard (no data change).
 *
 * Sample leads use the agency's own Gmail with +sim (idea.agency2026+sim01@gmail.com),
 * so if Flow B sends them a follow-up, it lands in the agency inbox, never with a stranger.
 * All names start with CRM_ / crm because Apps Script shares names between files.
 */

const CRM_LEADS_HEADERS = [
  "lead_id", "created_at", "name", "phone", "email", "business", "industry", "role", "team_size", "spend",
  "challenge", "timeline", "opt_in", "locale", "page", "utm_source", "utm_medium", "utm_campaign", "utm_content",
  "rule_score", "ai_rating", "score", "tier", "ai_summary", "ai_reply", "wa_link", "status", "owner",
  "next_action", "next_action_date", "touch_count", "last_contact", "lost_reason", "is_simulated",
];
const CRM_SAMPLE_COUNT = 52;
const CRM_SAMPLE_DAYS = 28;
const CRM_AGENCY_EMAIL = "idea.agency2026";

const CRM_COLORS = { navy: "#0E1B3D", amber: "#FFB020", teal: "#1CB5A3", sand: "#EDE7DB", cream: "#F8F6F1", slate: "#5B6475" };
const CRM_STAGES = ["New", "Contacted", "Engaged", "Call Booked", "Plan Delivered", "Proposal Sent", "Won", "Lost", "Nurture", "Needs review"];
const CRM_BOOKED_PLUS = ["Call Booked", "Plan Delivered", "Proposal Sent", "Won"];
const CRM_SOURCES = ["meta", "linkedin", "whatsapp", "email", "direct"];

// ---------------- Main ----------------

function resetCrmWithSampleData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const stamp = Utilities.formatDate(new Date(), "Africa/Cairo", "yyyy-MM-dd HH:mm");
  ss.copy(ss.getName() + " (backup " + stamp + ")");

  const leads = crmSheet(ss, "Leads", CRM_LEADS_HEADERS);
  const log = crmSheet(ss, "Log", ["timestamp", "lead_id", "flow", "action", "details"]);
  crmSheet(ss, "Errors", ["timestamp", "flow", "module", "error", "phone", "details"]);
  [leads, log, ss.getSheetByName("Errors"), ss.getSheetByName("Inbox")].forEach(crmClearRows);

  const rows = crmSampleLeads();
  leads.getRange(2, 1, rows.length, CRM_LEADS_HEADERS.length).setValues(rows);
  leads.getRange(2, 2, rows.length, 1).setNumberFormat("yyyy-mm-dd hh:mm");
  leads.getRange(2, 30, rows.length, 1).setNumberFormat("yyyy-mm-dd hh:mm");
  leads.getRange(2, 32, rows.length, 1).setNumberFormat("yyyy-mm-dd hh:mm");
  crmStatusDropdown(leads);

  const logRows = rows.map((r) => [r[1], r[0], "A", "captured", r[22] + ", " + r[21] + " points (sample data)"]);
  log.getRange(2, 1, logRows.length, 5).setValues(logRows);
  log.getRange(2, 1, logRows.length, 1).setNumberFormat("yyyy-mm-dd hh:mm");

  buildCrmViews();
  const message =
    "Done: backup saved in your Drive, " + rows.length + " sample leads added, Today and Dashboard tabs built.\n\n" +
    "Last step in Make: Data stores > Idea leads index > delete all records.";
  Logger.log(message);
  try {
    SpreadsheetApp.getUi().alert(message);
  } catch (err) {
    // No popup when run from a trigger; the message is in the execution log.
  }
}

function buildCrmViews() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  tidyLeadsTab();
  crmBuildToday(ss);
  crmBuildDashboard(ss);
}

/**
 * Makes the Leads tab easy to work in, without moving any column (Make writes
 * some columns by position, so the order must stay). Run it alone any time.
 *   - hides the technical columns (UTM details, answers, AI reply...)
 *   - freezes lead_id, created_at and name on the left
 *   - status is a dropdown, with a color per stage; tier has a color too
 * To see everything again, run showAllLeadColumns.
 */
function tidyLeadsTab() {
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Leads");
  showAllLeadColumns();
  CRM_HIDDEN_COLUMNS.forEach((name) => {
    const col = CRM_LEADS_HEADERS.indexOf(name) + 1;
    if (col > 0) sh.hideColumns(col);
  });
  sh.setFrozenRows(1);
  sh.setFrozenColumns(3);
  sh.getRange(1, 1, 1, CRM_LEADS_HEADERS.length).setBackground(CRM_COLORS.navy).setFontColor("#ffffff").setFontWeight("bold");
  crmStatusDropdown(sh);

  const col = (name) => CRM_LEADS_HEADERS.indexOf(name) + 1;
  const status = sh.getRange(2, col("status"), sh.getMaxRows() - 1, 1);
  const tier = sh.getRange(2, col("tier"), sh.getMaxRows() - 1, 1);
  const colors = {
    New: "#FFE8B8", Contacted: "#FFF4DB", Engaged: "#D6F3EF", "Call Booked": "#B8EBE4", "Plan Delivered": "#9FE0D6",
    "Proposal Sent": "#C9D3EA", Won: "#FFB020", Lost: "#E2E2E2", Nurture: "#EDE7DB", "Needs review": "#F8C9C4",
  };
  const rules = Object.keys(colors).map((s) =>
    SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo(s).setBackground(colors[s]).setRanges([status]).build());
  rules.push(SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo("Hot").setBackground("#FFE8B8").setBold(true).setRanges([tier]).build());
  rules.push(SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo("Warm").setBackground("#D6F3EF").setRanges([tier]).build());
  sh.setConditionalFormatRules(rules);
}

function showAllLeadColumns() {
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Leads");
  sh.showColumns(1, CRM_LEADS_HEADERS.length);
}

const CRM_HIDDEN_COLUMNS = [
  "email", "industry", "role", "team_size", "spend", "timeline", "opt_in", "locale", "page",
  "utm_medium", "utm_campaign", "utm_content", "rule_score", "ai_rating", "ai_reply", "touch_count", "last_contact", "is_simulated",
];

// ---------------- Sample data ----------------

function crmSampleLeads() {
  const rand = crmRandom(20261104);
  const pick = (list) => list[Math.floor(rand() * list.length)];
  const weighted = (pairs) => {
    let roll = rand() * pairs.reduce((sum, p) => sum + p[1], 0);
    for (const [value, weight] of pairs) if ((roll -= weight) < 0) return value;
    return pairs[pairs.length - 1][0];
  };

  const firstNames = ["Ahmed", "Mona", "Omar", "Nour", "Youssef", "Salma", "Karim", "Hana", "Mostafa", "Yasmin", "Tarek", "Rana", "Hossam", "Dina", "Mahmoud", "Laila", "Amr", "Farida", "Sherif", "Mariam"];
  const lastNames = ["Hassan", "Adel", "Fathy", "Samir", "Mansour", "Kamal", "Nabil", "Saad", "Ezzat", "Gamal"];
  const businesses = {
    retail: ["Lamar Boutique", "Nile Kids Wear", "Urban Shoes"], food: ["Koshary Corner", "Bake House", "Zaatar Cafe"],
    beauty: ["Glow Salon", "Lotus Spa", "Mira Beauty"], health: ["Smile Dental Clinic", "Physio Plus", "Care Pharmacy"],
    education: ["Bright Minds Center", "Code Kids Academy", "English Hub"], real_estate: ["Delta Homes", "New Cairo Properties"],
    services: ["Atlas Accounting", "Prime Law Office", "Swift Logistics"], ecommerce: ["Handmade Egypt", "TechDeals Store", "Organic Box"],
    other: ["Studio Nine", "Green Events"],
  };
  const challengesEn = [
    "Our Instagram ads get likes but no sales.",
    "We spend 15,000 EGP a month on Facebook ads and do not know what works.",
    "We need more bookings before the summer season.",
    "Our website gets visitors but nobody fills the contact form.",
    "We post every day but followers do not turn into customers.",
    "I want a clear marketing plan for our new branch this month.",
  ];
  const challengesAr = [
    "إعلانات Instagram بتجيب Likes بس مفيش Sales.",
    "بنصرف 10,000 جنيه في الشهر على Ads ومش عارفين إيه اللي شغال.",
    "محتاجين حجوزات أكتر قبل الموسم.",
    "الصفحة عليها تفاعل بس الناس مش بتشتري.",
    "عايزين Plan تسويق واضحة للفرع الجديد الشهر ده.",
    "الـ Budget بيخلص ومش شايفين نتيجة.",
    "مش عارفين نبدأ منين في التسويق أونلاين.",
  ];
  const sources = [
    [["meta", "cpc", "fb_ad"], 16], [["meta", "cpc", "ig_ad"], 12], [["meta", "cpc", "video_negation_v1"], 6],
    [["meta", "social", "ig_bio"], 5], [["linkedin", "cpc", "li_ad"], 6], [["linkedin", "social", "carousel_audit_v1"], 5],
    [["whatsapp", "referral", "wa_share"], 5], [["email", "email", "signature"], 3], [["direct", "none", "none"], 8],
  ];
  const lostReasons = ["No budget yet", "Chose another agency", "Not the right time", "No reply after the call"];

  const owner = crmSetting("hot_owner") || "Kamel";
  const now = new Date();
  const rows = [];
  const usedPhones = {};

  for (let i = 0; i < CRM_SAMPLE_COUNT; i++) {
    const created = new Date(now.getTime() - (CRM_SAMPLE_DAYS * rand() + 0.2) * 864e5);
    created.setHours(9 + Math.floor(rand() * 12), Math.floor(rand() * 60), 0, 0);
    const [source, medium, content] = weighted(sources);
    const b2b = source === "linkedin";
    const locale = b2b ? weighted([["en", 6], ["ar", 4]]) : weighted([["ar", 7], ["en", 3]]);
    const industry = pick(Object.keys(businesses));
    const role = b2b ? weighted([["marketing_manager", 6], ["owner", 3], ["employee", 1]]) : weighted([["owner", 5], ["marketing_manager", 1], ["employee", 3]]);
    const team = weighted([["1-4", 6], ["5-49", 3], ["50+", 1]]);
    const spend = b2b ? weighted([["5k_20k", 5], ["over_20k", 3], ["under_5k", 2]]) : weighted([["none", 4], ["under_5k", 5], ["5k_20k", 3], ["over_20k", 1]]);
    const timeline = weighted([["this_month", 3], ["within_3_months", 3], ["just_exploring", 4]]);
    const spam = i === 17 || i === 41;

    const rule = crmPoints(spend, { none: 0, under_5k: 10, "5k_20k": 25, over_20k: 30 }) +
      crmPoints(timeline, { this_month: 25, within_3_months: 15, just_exploring: 5 }) +
      crmPoints(role, { owner: 20, marketing_manager: 15, employee: 5 }) +
      crmPoints(team, { "1-4": 5, "5-49": 15, "50+": 10 });
    const ai = spam ? 0 : 2 * weighted([[1, 1], [2, 3], [3, 4], [4, 3], [5, 1]]);
    const score = rule + ai;
    const tier = score >= 70 ? "Hot" : score >= 40 ? "Warm" : "Cold";

    const first = pick(firstNames);
    const name = first + " " + pick(lastNames);
    const business = spam ? "Test" : pick(businesses[industry]);
    const challenge = spam ? "asdf test" : locale === "ar" ? pick(challengesAr) : pick(challengesEn);
    let phone;
    do phone = "+2010000" + String(Math.floor(rand() * 1e5)).padStart(5, "0"); while (usedPhones[phone]);
    usedPhones[phone] = true;
    const optIn = rand() < 0.8;

    const age = (now - created) / 864e5;
    const status = spam ? "Needs review" : crmStatus(tier, age, rand, weighted);
    const plan = crmNextAction(status, created, now, rand);
    const leadOwner = tier === "Hot" || CRM_BOOKED_PLUS.includes(status) ? owner : "";
    const touches = status === "Needs review" ? 0 : status === "Contacted" ? (age >= 2 ? 2 : 1) : status === "Nurture" ? 3 : 2;
    const lastContact = status === "Needs review" ? "" : new Date(created.getTime() + Math.min(age, 5) * 0.8 * 864e5);
    const leadId = "IDEA-" + String(i + 1).padStart(4, "0");

    rows.push([
      leadId, created, name, "'" + phone, CRM_AGENCY_EMAIL + "+sim" + String(i + 1).padStart(2, "0") + "@gmail.com",
      business, industry, role, team, spend, challenge, timeline, optIn, locale,
      locale === "ar" ? "/ar/diagnostic" : "/diagnostic", source, medium, medium === "none" ? "none" : "leads_cairosme_2026-10", content,
      rule, ai, score, tier,
      spam ? "Looks like a test or spam, check before replying." :
        crmLabel(role) + " of a " + team + " person " + industry.replace("_", " ") + " business, spend " + spend.replace("_", " ") + ", wants to start " + timeline.replace(/_/g, " ") + ".",
      "(sample data)", optIn ? "https://wa.me/" + phone.slice(1) : "No opt-in: email only",
      status, leadOwner, plan.action, plan.date, touches, lastContact,
      status === "Lost" ? pick(lostReasons) : "", true,
    ]);
  }
  rows.sort((a, b) => a[1] - b[1]);
  rows.forEach((r, i) => {
    const n = String(i + 1);
    r[0] = "IDEA-" + n.padStart(4, "0");
    r[4] = CRM_AGENCY_EMAIL + "+sim" + n.padStart(2, "0") + "@gmail.com";
  });
  return rows;
}

function crmStatus(tier, age, rand, weighted) {
  if (age < 2) return "Contacted";
  if (tier === "Hot") return weighted([["Call Booked", 3], ["Plan Delivered", 3], ["Proposal Sent", 3], ["Won", 3], ["Engaged", 1], ["Lost", 1]]);
  if (tier === "Warm") {
    if (age < 5) return weighted([["Contacted", 3], ["Engaged", 2], ["Call Booked", 1]]);
    return weighted([["Engaged", 2], ["Call Booked", 2], ["Plan Delivered", 1], ["Proposal Sent", 1], ["Won", 1], ["Nurture", 3], ["Lost", 2]]);
  }
  if (age < 5) return "Contacted";
  return weighted([["Nurture", 6], ["Lost", 2], ["Engaged", 1]]);
}

function crmNextAction(status, created, now, rand) {
  const days = (d) => new Date(now.getTime() + d * 864e5);
  const map = {
    Contacted: ["Day 2 follow-up", days(rand() * 3 - 1)],
    Engaged: ["Book the 20-minute call", days(rand() * 2)],
    "Call Booked": ["Run the 20-minute call", days(rand() * 4)],
    "Plan Delivered": ["Send the proposal", days(rand() * 3)],
    "Proposal Sent": ["Follow up on the proposal", days(rand() * 5 - 1)],
    Won: ["Start onboarding", ""],
    Lost: ["", ""],
    Nurture: ["Nurture: monthly tip", ""],
    "Needs review": ["Check this lead", days(0)],
  };
  const [action, date] = map[status];
  if (date) date.setMinutes(0, 0, 0);
  return { action, date };
}

// ---------------- Today tab ----------------

// The Today tab is a work list you can edit. Change status, next_action,
// next_action_date or owner there and onEdit() saves it to the Leads row.
// It refreshes when the Sheet opens, and from the menu IDEA CRM > Refresh Today.
const CRM_TODAY_COLUMNS = [
  // [title on Today, column in Leads or a special value, width, editable]
  ["lead_id", "lead_id", 95, false],
  ["name", "name", 150, false],
  ["business", "business", 160, false],
  ["tier", "tier", 60, false],
  ["score", "score", 55, false],
  ["WhatsApp", "wa_link", 130, false],
  ["phone", "phone", 130, false],
  ["challenge", "challenge", 260, false],
  ["status", "status", 140, true],
  ["next_action", "next_action", 220, true],
  ["next_action_date", "next_action_date", 140, true],
  ["owner", "owner", 90, true],
];
const CRM_TODAY_FIRST_ROW = 4;

function crmBuildToday(ss) {
  const sh = crmFreshSheet(ss, "Today", 1);
  sh.getRange("A1").setValue("Today: leads to contact (due today, overdue, or needs review)")
    .setFontSize(14).setFontWeight("bold").setFontColor(CRM_COLORS.navy);
  sh.getRange("A2").setValue("Edit the yellow columns here: the change is saved in the Leads tab. Menu IDEA CRM > Refresh Today to update the list.")
    .setFontColor(CRM_COLORS.slate);
  const header = sh.getRange(3, 1, 1, CRM_TODAY_COLUMNS.length);
  header.setValues([CRM_TODAY_COLUMNS.map((c) => c[0])]).setFontWeight("bold").setBackground(CRM_COLORS.navy).setFontColor("#ffffff");
  CRM_TODAY_COLUMNS.forEach((c, i) => {
    sh.setColumnWidth(i + 1, c[2]);
    if (c[3]) sh.getRange(3, i + 1).setBackground(CRM_COLORS.amber).setFontColor(CRM_COLORS.navy);
  });
  sh.setFrozenRows(3);
  sh.setFrozenColumns(2);
  refreshToday();
}

function refreshToday() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName("Today");
  const leads = ss.getSheetByName("Leads");
  if (!sh || !leads) return;

  const values = leads.getDataRange().getValues();
  const head = values[0];
  const at = (name) => head.indexOf(name);
  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);
  const closed = ["Won", "Lost", "Nurture"];

  const due = values.slice(1).filter((r) => {
    if (!r[at("lead_id")] || closed.includes(r[at("status")])) return false;
    if (r[at("status")] === "Needs review") return true;
    const date = crmDate(r[at("next_action_date")]);
    return date && date <= endOfToday;
  });
  due.sort((a, b) => (crmDate(a[at("next_action_date")]) || 0) - (crmDate(b[at("next_action_date")]) || 0));

  const last = sh.getMaxRows();
  if (last >= CRM_TODAY_FIRST_ROW) {
    const old = sh.getRange(CRM_TODAY_FIRST_ROW, 1, last - CRM_TODAY_FIRST_ROW + 1, CRM_TODAY_COLUMNS.length);
    old.clearContent().clearDataValidations().setBackground(null);
  }
  if (due.length === 0) {
    sh.getRange(CRM_TODAY_FIRST_ROW, 1).setValue("Nothing due today");
    return;
  }

  const rows = due.map((r) =>
    CRM_TODAY_COLUMNS.map(([, source]) => {
      const value = r[at(source)];
      if (source === "wa_link") {
        return String(value).indexOf("https://wa.me/") === 0 ? '=HYPERLINK("' + value + '","Open WhatsApp")' : "No opt-in: email only";
      }
      if (source === "phone") return "'" + String(value).replace(/^'/, "");
      return value;
    }),
  );
  const range = sh.getRange(CRM_TODAY_FIRST_ROW, 1, rows.length, CRM_TODAY_COLUMNS.length);
  range.setValues(rows);

  const col = (title) => CRM_TODAY_COLUMNS.findIndex((c) => c[0] === title) + 1;
  const statusRule = SpreadsheetApp.newDataValidation().requireValueInList(CRM_STAGES, true).setAllowInvalid(false).build();
  sh.getRange(CRM_TODAY_FIRST_ROW, col("status"), rows.length, 1).setDataValidation(statusRule);
  sh.getRange(CRM_TODAY_FIRST_ROW, col("next_action_date"), rows.length, 1).setNumberFormat("yyyy-mm-dd hh:mm");
  CRM_TODAY_COLUMNS.forEach((c, i) => {
    if (c[3]) sh.getRange(CRM_TODAY_FIRST_ROW, i + 1, rows.length, 1).setBackground("#FFF8E6");
  });
  const tier = sh.getRange(CRM_TODAY_FIRST_ROW, col("tier"), rows.length, 1);
  sh.setConditionalFormatRules([
    SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo("Hot").setBackground("#FFE8B8").setBold(true).setRanges([tier]).build(),
    SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo("Warm").setBackground("#D6F3EF").setRanges([tier]).build(),
  ]);
}

/** Simple trigger: an edit in a yellow Today column is copied to the same lead in Leads. */
function onEdit(e) {
  const sh = e.range.getSheet();
  if (sh.getName() !== "Today" || e.range.getRow() < CRM_TODAY_FIRST_ROW || e.range.getNumRows() > 1 || e.range.getNumColumns() > 1) return;
  const column = CRM_TODAY_COLUMNS[e.range.getColumn() - 1];
  if (!column || !column[3]) return;

  const leadId = sh.getRange(e.range.getRow(), 1).getValue();
  const leads = e.source.getSheetByName("Leads");
  const head = leads.getRange(1, 1, 1, leads.getLastColumn()).getValues()[0];
  const ids = leads.getRange(2, 1, Math.max(leads.getLastRow() - 1, 1), 1).getValues();
  const index = ids.findIndex((r) => r[0] === leadId);
  if (!leadId || index < 0) return;

  leads.getRange(index + 2, head.indexOf(column[1]) + 1).setValue(e.range.getValue());
  e.range.setBackground("#D6F3EF"); // green: saved in Leads
}

/** Simple trigger: adds the IDEA CRM menu and refreshes Today when the Sheet opens. */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("IDEA CRM")
    .addItem("Refresh Today", "refreshToday")
    .addItem("Rebuild Today + Dashboard", "buildCrmViews")
    .addItem("Tidy the Leads tab", "tidyLeadsTab")
    .addItem("Show all Leads columns", "showAllLeadColumns")
    .addToUi();
  refreshToday();
}

function crmDate(value) {
  if (value instanceof Date) return value;
  if (!value) return null;
  const date = new Date(String(value).replace(" ", "T"));
  return isNaN(date) ? null : date;
}

// ---------------- Dashboard ----------------

function crmBuildDashboard(ss) {
  const sh = crmFreshSheet(ss, "Dashboard", 0);
  sh.getCharts().forEach((c) => sh.removeChart(c));
  const L = (col) => "Leads!" + col + "2:" + col;
  const status = L("AA"), tier = L("W"), source = L("P"), created = L("B");
  const booked = (extra) => "SUM(COUNTIFS(" + status + ',{"Call Booked","Plan Delivered","Proposal Sent","Won"}' + (extra || "") + "))";

  sh.getRange("A1").setValue("IDEA Lead Dashboard").setFontSize(22).setFontWeight("bold").setFontColor(CRM_COLORS.navy);
  sh.getRange("A2").setFormula('="Updated live from the Leads tab · " & COUNTIF(' + L("AH") + ',TRUE) & " sample leads included"').setFontColor(CRM_COLORS.slate);

  // KPI cards: label row 4, value row 5
  const kpis = [
    ["Total leads", "=COUNTA(" + L("A") + ")", "0"],
    ["Leads last 7 days", "=COUNTIFS(" + created + ',">="&(TODAY()-7))', "0"],
    ["Qualified rate (Hot + Warm)", "=IFERROR((COUNTIF(" + tier + ',"Hot")+COUNTIF(' + tier + ',"Warm"))/A5,0)', "0%"],
    ["Calls booked or further", "=" + booked(), "0"],
    ["Booking rate", "=IFERROR(D5/A5,0)", "0%"],
    ["Won", "=COUNTIF(" + status + ',"Won")', "0"],
    ["Win rate", "=IFERROR(F5/A5,0)", "0%"],
    ["Average score", "=IFERROR(AVERAGE(" + L("V") + "),0)", "0"],
  ];
  kpis.forEach(([label, formula, fmt], i) => {
    sh.getRange(4, i + 1).setValue(label).setFontColor(CRM_COLORS.slate).setFontSize(9).setWrap(true);
    sh.getRange(5, i + 1).setFormula(formula).setNumberFormat(fmt).setFontSize(20).setFontWeight("bold").setFontColor(CRM_COLORS.navy);
  });
  sh.getRange(4, 1, 2, kpis.length).setBackground(CRM_COLORS.cream).setBorder(true, true, true, true, true, false, CRM_COLORS.sand, null);

  // Leads by source (A8:F13)
  crmHeader(sh, 8, 1, ["Source", "Leads", "Hot", "Qualified", "Booked+", "Won"]);
  CRM_SOURCES.forEach((src, i) => {
    const r = 9 + i, s = '"' + src + '"';
    sh.getRange(r, 1).setValue(src);
    sh.getRange(r, 2).setFormula("=COUNTIF(" + source + "," + s + ")");
    sh.getRange(r, 3).setFormula("=COUNTIFS(" + source + "," + s + "," + tier + ',"Hot")');
    sh.getRange(r, 4).setFormula("=COUNTIFS(" + source + "," + s + "," + tier + ',"Hot")+COUNTIFS(' + source + "," + s + "," + tier + ',"Warm")');
    sh.getRange(r, 5).setFormula("=" + booked("," + source + "," + s));
    sh.getRange(r, 6).setFormula("=COUNTIFS(" + source + "," + s + "," + status + ',"Won")');
  });

  // Pipeline by stage (H8:I18)
  crmHeader(sh, 8, 8, ["Stage", "Leads"]);
  CRM_STAGES.forEach((stage, i) => {
    sh.getRange(9 + i, 8).setValue(stage);
    sh.getRange(9 + i, 9).setFormula("=COUNTIF(" + status + ',"' + stage + '")');
  });

  // Leads by tier (A21:B24)
  crmHeader(sh, 21, 1, ["Tier", "Leads"]);
  ["Hot", "Warm", "Cold"].forEach((t, i) => {
    sh.getRange(22 + i, 1).setValue(t);
    sh.getRange(22 + i, 2).setFormula("=COUNTIF(" + tier + ',"' + t + '")');
  });

  // Weekly trend (D21:E26): leads per week, oldest first
  crmHeader(sh, 21, 4, ["Week starting", "Leads"]);
  for (let k = 0; k < 5; k++) {
    const r = 22 + k;
    sh.getRange(r, 4).setFormula("=TODAY()-WEEKDAY(TODAY(),3)-7*" + (4 - k)).setNumberFormat("mmm d");
    sh.getRange(r, 5).setFormula("=COUNTIFS(" + created + ',">="&D' + r + "," + created + ',"<"&(D' + r + '+7))');
  }

  // Form completion (H21:I23) from the Inbox tab
  crmHeader(sh, 21, 8, ["Website form", "Count"]);
  sh.getRange("H22:H24").setValues([["Filled step 1"], ["Submitted the form"], ["Completion rate"]]);
  sh.getRange("I22").setFormula('=IFERROR(COUNTUNIQUE(FILTER(Inbox!C2:C,Inbox!B2:B="partial")),0)');
  sh.getRange("I23").setFormula('=COUNTIF(Inbox!B2:B,"complete")');
  sh.getRange("I24").setFormula("=IFERROR(I23/I22,0)").setNumberFormat("0%");

  sh.setColumnWidths(1, 9, 120);
  sh.setColumnWidth(8, 150);
  sh.setHiddenGridlines(true);

  const chart = (type, range, title, row, col, colors, extra) => {
    let b = sh.newChart().setChartType(type).addRange(sh.getRange(range)).setPosition(row, col, 0, 0)
      .setNumHeaders(1).setOption("title", title).setOption("colors", colors).setOption("legend", { position: "none" })
      .setOption("width", 520).setOption("height", 300);
    Object.keys(extra || {}).forEach((k) => (b = b.setOption(k, extra[k])));
    sh.insertChart(b.build());
  };
  chart(Charts.ChartType.COLUMN, "A8:B13", "Leads by source", 1, 11, [CRM_COLORS.navy]);
  chart(Charts.ChartType.PIE, "A21:B24", "Leads by tier", 17, 11, [CRM_COLORS.amber, CRM_COLORS.teal, CRM_COLORS.navy], { legend: { position: "right" }, pieHole: 0.45 });
  chart(Charts.ChartType.BAR, "H8:I18", "Pipeline by stage", 1, 17, [CRM_COLORS.amber]);
  chart(Charts.ChartType.LINE, "D21:E26", "Leads per week", 17, 17, [CRM_COLORS.teal], { pointSize: 6 });
}

// ---------------- Helpers ----------------

function crmSheet(ss, name, headers) {
  let sh = ss.getSheetByName(name);
  if (!sh) sh = ss.insertSheet(name);
  sh.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight("bold");
  sh.setFrozenRows(1);
  return sh;
}

function crmFreshSheet(ss, name, index) {
  const old = ss.getSheetByName(name);
  if (old) ss.deleteSheet(old);
  return ss.insertSheet(name, index);
}

function crmClearRows(sh) {
  if (!sh) return;
  const last = sh.getLastRow();
  if (last > 1) sh.getRange(2, 1, last - 1, sh.getMaxColumns()).clearContent();
}

function crmStatusDropdown(leads) {
  const rule = SpreadsheetApp.newDataValidation().requireValueInList(CRM_STAGES, true).setAllowInvalid(false).build();
  leads.getRange("AA2:AA").setDataValidation(rule);
}

function crmHeader(sh, row, col, labels) {
  sh.getRange(row, col, 1, labels.length).setValues([labels])
    .setFontWeight("bold").setBackground(CRM_COLORS.navy).setFontColor("#ffffff");
}

/** A value from the Settings tab (key in column A, value in column B). */
function crmSetting(key) {
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Settings");
  if (!sh) return "";
  const row = sh.getDataRange().getValues().find((r) => r[0] === key);
  return row ? String(row[1]).trim() : "";
}

function crmPoints(value, table) {
  return table[value] || 0;
}

function crmLabel(role) {
  return { owner: "Owner", marketing_manager: "Marketing manager", employee: "Employee" }[role];
}

// Small seeded random generator, so the sample data is the same every run.
function crmRandom(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
