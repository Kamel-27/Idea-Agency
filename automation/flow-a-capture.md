# Flow A: lead capture (as built)

The live demo flow. A lead submits the form on the website, and within a minute they are scored, saved in the CRM, answered by email, and Hot leads alert the team.

This guide matches the scenario **Flow A: Lead capture** as it was built and tested on Oct 21, 2026. Module numbers below are the ones Make gave in that build. If you rebuild it, your numbers may differ: pick each field from Make's mapping panel by name instead of typing the number.

## The whole flow

```
[1] Webhook ─► [2] Data store: phone exists? ─► [3] Router
                                                  │
  ┌──── 1st: Duplicate (Exists = true) ───────────┤
  │  [4]  Data store: get the record              │
  │  [8]  Sheets: update the Leads row            │
  │  [9]  Sheets: Log row with the new answers    │
  │  [20] Gmail: "Returning lead" to the team     │
  │                                               │
  └──── fallback: New lead ───────────────────────┘
     [5]  Tools: rule score (90 points)
     [10] Gemini: rating, summary, email, WhatsApp (JSON)
            ╳ error ─► [19] Sheets: Errors row ─► [21] Gmail: "AI failed" to the team ─► [22] Skip
     [11] Tools: score, tier, review, next action, wa.me link
     [12] Sheets: add the Leads row
     [13] Data store: save phone, row number, lead ID
     [14] Router
          ├─ 1st: Reply to lead (not spam) ─► [15] Gmail: reply to the lead
          ├─ 2nd: Hot alert (Hot, not review) ─► [16] Gmail: alert to the team
          └─ 3rd: always ─► [17] Sheets: update row (ID, status) ─► [18] Sheets: Log row
```

About **15 operations per new lead**, 5 per returning lead. The Make free plan has 1,000 operations a month: enough for testing, the scenarios and the demo.

## Before you start

1. **One agency Google account** for everything (decision 16): Make, the Sheet, Gmail, the Gemini key.
2. **Google Sheet** `Idea Agency CRM` with 5 tabs: `Leads`, `Settings`, `Templates`, `Log`, `Errors`. Paste the header row from `automation/crm/*.csv` into row 1 of each tab, then Data > Split text to columns. View > Freeze > 1 row.
3. **Sheet formats:** select columns B, AD and AF of `Leads` (created_at, next_action_date, last_contact) > Format > Number > Date time.
4. **Gemini API key** from Google AI Studio. It goes into Make only.
5. **Data store** `Idea leads index` with fields `lead_id` (Text) and `row_number` (Number). The record key is the phone number.

## [1] Webhooks > Custom webhook

Webhook `website-leads`. Copy its URL into `site/.env.local` as `MAKE_WEBHOOK_URL=...`, restart the site, and send a test lead so Make learns the fields:

```bash
node automation/scripts/send-test-lead.mjs automation/test-leads/01-hot-owner-high-spend.json
```

## [2] Data store > Check the existence of a record

Data store `Idea leads index`, key `{{1.phone}}`.

## [3] Router

| Route | Filter |
| --- | --- |
| 1st | Label `Duplicate`. Condition `2. Exists`, Boolean operators: Equal to, `true` |
| fallback | Label `New lead`. "Set the route as a fallback": Yes |

## Duplicate route (decision 17)

The returning lead's new answers go into the Log, and the team gets an email. No new row, no AI call.

**[4] Data store > Get a record:** key `{{1.phone}}`.

**[8] Google Sheets > Update a Row:** sheet `Leads`, column headers as IDs: Yes, row number `{{4.row_number}}`. Only:

- `next_action`: `Submitted the form again, see Log`
- `next_action_date`: `{{formatDate(now; "YYYY-MM-DD HH:mm")}}`

**[9] Google Sheets > Add a Row:** sheet `Log`:

- `timestamp`: `{{formatDate(now; "YYYY-MM-DD HH:mm")}}`
- `lead_id`: `{{4.lead_id}}`
- `flow`: `A`, `action`: `duplicate`
- `details`: `Sent the form again. New answers: challenge: {{1.challenge}} | spend: {{1.spend}} | timeline: {{1.timeline}} | role: {{1.role}} | team: {{1.team_size}} | source: {{1.utm_source}} / {{1.utm_medium}} / {{1.utm_campaign}} / {{1.utm_content}} | page: {{1.page}}`

**[20] Gmail > Send an email** to the team:

- Subject: `Returning lead: {{1.name}} ({{4.lead_id}})`
- Body type: Raw HTML. Content: name, business, new challenge, spend, timeline, source, phone, email, and "Their full history is in the CRM, Log tab, lead {{4.lead_id}}."

## New lead route

### [5] Tools > Set variable

`rule_score`:

```text
{{switch(1.spend; "none"; 0; "under_5k"; 10; "5k_20k"; 25; "over_20k"; 30; 0) + switch(1.timeline; "this_month"; 25; "within_3_months"; 15; "just_exploring"; 5; 0) + switch(1.role; "owner"; 20; "marketing_manager"; 15; "employee"; 5; 0) + switch(1.team_size; "1-4"; 5; "5-49"; 15; "50+"; 10; 0)}}
```

The frozen scoring rules from `docs/03-system-spec.md`: spend 30, timeline 25, role 20, team size 15. Maximum 90.

### [10] Google Gemini AI > Generate a response

- Model: the current Flash model (built with Gemini 3.8 Flash)
- Message: role User, type Text, the prompt from `automation/prompts/gemini-lead-scoring.md` with `{{1.name}}`, `{{1.challenge}}` etc. mapped
- Advanced settings > Generation configurations:
  - **Response Format: JSON Output.** Make then splits the answer into `Result` fields by itself, so no "parse JSON" step is needed
  - **Response Schema: leave empty.** Adding one made every Gemini call fail in our build; JSON Output plus the prompt's output format is enough
  - **Thinking Level: Low.** The task is simple; high thinking only makes it slow

Output used later: `10.result.challenge_rating`, `10.result.is_spam`, `10.result.summary`, `10.result.email_subject`, `10.result.email_body`, `10.result.whatsapp_text`.

### Error route on [10] (decision 17)

Right-click Gemini > Add error handler. If Gemini fails (quota, outage, bad key), the lead is not lost and the team replies by hand:

- **[19] Google Sheets > Add a Row**, sheet `Errors`: timestamp, flow `A`, module `Gemini`, error message, phone `'{{1.phone}}`, details `{{1.name}}, {{1.business}}`
- **[21] Gmail > Send an email** to the team. Subject `AI failed: reply to {{1.name}} by hand`, content with every lead field
- **[22] Skip**: the error is handled, the rest of the route does not run

### [11] Tools > Set multiple variables

| Variable | Value |
| --- | --- |
| `score` | `{{sum(5.rule_score; 10.result.challenge_rating)}}` |
| `tier` | `{{if(sum(5.rule_score; 10.result.challenge_rating) >= 70; "Hot"; if(sum(5.rule_score; 10.result.challenge_rating) >= 40; "Warm"; "Cold"))}}` |
| `review` | `{{if(10.result.is_spam; true; contains(10.result.summary; "AI_FAILED"))}}` |
| `next_action` | `{{if(sum(5.rule_score; 10.result.challenge_rating) >= 70; "Call within 2 hours"; if(sum(5.rule_score; 10.result.challenge_rating) >= 40; "Day 2 follow-up"; "Day 2 tip, then Nurture"))}}` |
| `next_action_date` | `{{formatDate(if(sum(5.rule_score; 10.result.challenge_rating) >= 70; addHours(now; 2); addDays(now; 2)); "YYYY-MM-DD HH:mm")}}` |
| `wa_link` | `https://wa.me/{{replace(1.phone; "+"; emptystring)}}?text={{encodeURL(10.result.whatsapp_text)}}` |

Tiers from the spec: **Hot 70+, Warm 40 to 69, Cold under 40.** Each formula repeats the sum because Make cannot use a variable inside the module that sets it.

### [12] Google Sheets > Add a Row

Sheet `Leads`, column headers as IDs: Yes.

| Column | Value |
| --- | --- |
| `lead_id` | empty (filled by [17]) |
| `created_at` | `{{formatDate(1.submitted_at; "YYYY-MM-DD HH:mm")}}` |
| `phone` | `'{{1.phone}}` (the `'` keeps the `+`; Sheets would read it as a number) |
| `name`, `email`, `business`, `industry`, `role`, `team_size`, `spend`, `challenge`, `timeline`, `locale`, `page`, `utm_*` | same field from [1] |
| `opt_in` | `{{1.whatsapp_opt_in}}` |
| `rule_score` | `{{5.rule_score}}` |
| `ai_rating` | `{{10.result.challenge_rating}}` |
| `score`, `tier`, `next_action`, `next_action_date` | from [11] |
| `ai_summary` | `{{10.result.summary}}` |
| `ai_reply` | `{{10.result.email_body}}` |
| `wa_link` | `{{if(1.whatsapp_opt_in; 11.wa_link; "No opt-in: email only")}}` |
| `status` | `New` |
| `owner` | `{{if(11.tier = "Hot"; "<Hot owner name>"; emptystring)}}` |
| `touch_count` | `0` |
| `is_simulated` | `{{1.is_simulated}}` |

### [13] Data store > Add/replace a record

Key `{{1.phone}}`, overwrite: Yes.

- `row_number`: `12. Row Number`
- `lead_id`: `IDEA-{{substring(toString(sum(10000; 12.rowNumber; -1)); 1; 5)}}` (row 2 becomes `IDEA-0001`)

### [14] Router

| Route | Filter |
| --- | --- |
| 1st `Reply to lead` | `10. Result: is_spam`, Boolean: Equal to, `false` |
| 2nd `Hot alert` | `11. tier` Text: Equal to `Hot` **and** `11. review` Boolean: Equal to `false` |
| 3rd | none |

Make runs routes top to bottom, so the CRM update runs after the emails.

**[15] Gmail > Send an email** (reply to the lead):

- To `{{1.email}}`, subject `{{10.result.email_subject}}`, body type Raw HTML
- Content: `<div dir="{{if(1.locale = "ar"; "rtl"; "ltr")}}">{{replace(10.result.email_body; newline; "<br>")}}</div>` (keeps line breaks; Arabic reads right to left)

**[16] Gmail > Send an email** (Hot alert): subject `Hot lead: {{1.business}} ({{11.score}} points)`, content with summary, name, phone, email, challenge, score, WhatsApp link and "Next action: call within 2 hours".

**[17] Google Sheets > Update a Row:** sheet `Leads`, row `{{12.rowNumber}}`:

- `lead_id`: `IDEA-{{substring(toString(sum(10000; 12.rowNumber; -1)); 1; 5)}}`
- `status`: `{{if(11.review; "Needs review"; "Contacted")}}`
- `touch_count`: `{{if(11.review; 0; 1)}}`
- `last_contact`: `{{if(11.review; emptystring; formatDate(now; "YYYY-MM-DD HH:mm"))}}`

**[18] Google Sheets > Add a Row:** sheet `Log`: timestamp, the same lead ID formula, flow `A`, action `captured`, details `{{11.tier}}, {{11.score}} points, status {{if(11.review; "Needs review"; "Contacted")}}`.

## Turn it on

Switch the scenario to **Active**, scheduling "Immediately as data arrives". Then submit the real form once, and run the scenarios in `automation/test-leads/README.md`.

## Lessons from the build

| Problem we hit | Fix |
| --- | --- |
| Filter picked `[bundle]` instead of a field | Expand the module in the mapping panel and pick the field itself (`2. Exists`) |
| Phone lost its `+` in the sheet | Write `'{{1.phone}}`; the apostrophe makes Sheets keep it as text |
| Dates showed as numbers (46316.28) | Format the date columns as Date time |
| Gemini rated test leads 2/10 | Test names said "Test", and the prompt rates tests 0 to 2. Test leads now use realistic names |
| Gemini was slow (4,000+ thinking tokens) | Thinking Level: Low |
| Resume could not show Gemini's fields | Gemini's output shape is dynamic. We replaced the fallback reply with an email to the team (decision 17) |
| After adding a Response Schema, every Gemini call failed (the error route caught it) | Removed the schema. JSON Output alone works |
| Alert emails landed in spam | New Gmail account. Mark as Not spam; a real domain fixes it long term |

## When something goes wrong

| Problem | Likely cause |
| --- | --- |
| Website says "Something went wrong" | Scenario is off, or `MAKE_WEBHOOK_URL` is wrong |
| Every lead takes the Duplicate path | Test phone still in the Data store. Delete its record |
| Lead ID shows `IDEA-0000` | [13] or [17] used the wrong module's row number |
| Arabic email is left-aligned | The `dir` wrapper in [15] is missing |
