# Flow A: lead capture (build guide)

This is the live demo flow. A lead submits the form on the website, and within a minute they are scored, saved in the CRM, answered by email, and Hot leads alert the team.

Follow the steps in order. Module numbers in Make may differ from the numbers here: when a formula says `1.phone`, pick the field from the webhook module in Make's mapping panel instead of typing it.

## The whole flow

```
[1] Webhook ─► [2] Check phone in Data store ─► Router
                                                 │
     ┌───────────── Duplicate (phone exists) ────┤
     │  [3] Get the record (row number)          │
     │  [4] Update the CRM row: "submitted again"│
     │  [5] Log ─► stop                          │
     │                                           │
     └───────────── New lead ────────────────────┘
        [6]  Rule score (90 points)
        [7]  Gemini ─╳─ error ► [7a] Errors tab ► [7b] Resume with fallback
        [8]  Clean the AI text
        [9]  Parse the JSON
        [10] Total score, tier, status, next action, wa.me link
        [11] Add the CRM row
        [12] Save phone + row in the Data store
        [13] Router
             ├─ Not spam ─────────► [14] Gmail reply to the lead
             ├─ Hot and not spam ─► [15] Gmail alert to the team
             └─ Always ───────────► [16] Update the row (lead_id, status) ► [17] Log
```

About **15 operations per lead**. The Make free plan has 1,000 operations a month, enough for testing, the 12 scenarios and the demo.

## Before you start

1. **Google Sheet.** Create a sheet called `Idea Agency CRM` with 5 tabs: `Leads`, `Settings`, `Templates`, `Log`, `Errors`. Paste the matching header row from `automation/crm/*.csv` into row 1 of each tab (open the CSV, copy the first line, paste, then Data > Split text to columns). Fill in `Settings` (team email, Hot owner).
2. **Gemini API key.** Google AI Studio > Get API key. Keep it in Make only.
3. **Make account.** Sign up with the agency Google account. In Settings, set the timezone to your local time.
4. **Data store.** Make > Data stores > Add data store, name `Idea leads index`, with this structure:

   | Field | Type |
   | --- | --- |
   | `lead_id` | Text |
   | `row_number` | Number |

   The **key** of each record is the phone number. This is how Flow A finds duplicates: a Data store lookup always answers yes or no, while a Google Sheets search stops the flow when it finds nothing.

5. **New scenario** called `Flow A: Lead capture`.

## [1] Webhooks > Custom webhook

- Add a webhook called `website-leads`. Copy its URL.
- Put the URL in `site/.env.local` as `MAKE_WEBHOOK_URL=...` and restart `npm run dev`.
- Click **Redetermine data structure**, then send one test lead so Make learns the fields:

  ```bash
  node automation/scripts/send-test-lead.mjs automation/test-leads/01-hot-owner-high-spend.json
  ```

## [2] Data store > Check the existence of a record

- Data store: `Idea leads index`
- Key: `1.phone`

## Router after [2]

Two routes. Click the line of each route to set its filter.

| Route | Label | Filter |
| --- | --- | --- |
| Top | Duplicate | `2.Exists` is equal to `true` (Boolean operators) |
| Bottom | New lead | Mark as **fallback route** (runs when the other route does not) |

## Duplicate route

**[3] Data store > Get a record:** key `1.phone`.

**[4] Google Sheets > Update a row:** sheet `Leads`, row number `3.row_number`. Fill only:

- `next_action`: `Submitted the form again`
- `next_action_date`: `{{formatDate(now; "YYYY-MM-DD HH:mm")}}`

**[5] Google Sheets > Add a row:** sheet `Log`:

- `timestamp`: `{{formatDate(now; "YYYY-MM-DD HH:mm")}}`
- `lead_id`: `3.lead_id`
- `flow`: `A`
- `action`: `duplicate`
- `details`: `{{1.phone}} sent the form again`

The route ends here.

## New lead route

### [6] Tools > Set variable: rule score

Name `rule_score`, value (one line):

```text
{{switch(1.spend; "none"; 0; "under_5k"; 10; "5k_20k"; 25; "over_20k"; 30; 0) + switch(1.timeline; "this_month"; 25; "within_3_months"; 15; "just_exploring"; 5; 0) + switch(1.role; "owner"; 20; "marketing_manager"; 15; "employee"; 5; 0) + switch(1.team_size; "1-4"; 5; "5-49"; 15; "50+"; 10; 0)}}
```

These are the frozen scoring rules from `docs/03-system-spec.md`: spend 30, timeline 25, role 20, team size 15. Maximum 90.

### [7] Google Gemini AI > Generate a response

(The module may be called "Create a completion" in your Make version.)

- Connection: your Gemini API key
- Model: the current **Flash** model (fast, and on the free tier)
- Prompt / user message: the full prompt from `automation/prompts/gemini-lead-scoring.md`, with each `{{...}}` mapped to the webhook field
- If the module has a response format or MIME type option, choose **JSON**

**Error handler** (this is test scenario 10): right-click module [7] > Add error handler > **Resume**. Before the Resume, add:

- **[7a] Google Sheets > Add a row**, sheet `Errors`:
  - `timestamp`: `{{formatDate(now; "YYYY-MM-DD HH:mm")}}`
  - `flow`: `A`, `module`: `Gemini`
  - `error`: the error message from the handler
  - `phone`: `1.phone`
- **[7b] Resume**: set the text output to this fallback JSON:

  ```json
  {"challenge_rating": 0, "is_spam": false, "ai_failed": true, "summary": "AI failed, check this lead by hand", "email_subject": "", "email_body": "", "whatsapp_text": ""}
  ```

  Empty email fields make steps [14] and [10] use the template replies below.

### [8] Tools > Set variable: clean AI text

Name `ai_json`. Removes code fences, in case Gemini wraps the JSON in them:

```text
{{trim(replace(replace(7.text; "```json"; emptystring); "```"; emptystring))}}
```

### [9] JSON > Parse JSON

- JSON string: `8.ai_json`
- Data structure: click **Add > Generator**, paste the example output from the prompt file and add `"ai_failed": false` to it. Make builds the structure for you.

### [10] Tools > Set multiple variables

| Variable | Value |
| --- | --- |
| `ai_rating` | `{{ifempty(9.challenge_rating; 0)}}` |
| `score` | `{{6.rule_score + ifempty(9.challenge_rating; 0)}}` |
| `review` | `{{if(9.is_spam; true; if(9.ai_failed; true; false))}}` |
| `wa_link_full` | `https://wa.me/{{replace(1.phone; "+"; emptystring)}}?text={{encodeURL(ifempty(9.whatsapp_text; if(1.locale = "ar"; "أهلًا، معاك Idea Agency. شكرًا إنك طلبت الكشف التسويقي اللي ببلاش. إمتى يناسبك نعمل Call لمدة 20 دقيقة؟"; "Hi, this is Idea Agency. Thanks for requesting the free marketing diagnostic. When is a good time for a 20-minute call?")))}}` |

Make cannot use a variable in the same module where it is set, so tier and next action come in a second **Set multiple variables** module right after:

| Variable | Value |
| --- | --- |
| `tier` | `{{if(10.score >= 70; "Hot"; if(10.score >= 40; "Warm"; "Cold"))}}` |
| `next_action` | `{{switch(if(10.score >= 70; "Hot"; if(10.score >= 40; "Warm"; "Cold")); "Hot"; "Call within 2 hours"; "Warm"; "Day 2 follow-up"; "Cold"; "Day 2 tip, then Nurture")}}` |
| `next_action_date` | `{{formatDate(if(10.score >= 70; addHours(now; 2); addDays(now; 2)); "YYYY-MM-DD HH:mm")}}` |

Tiers from the spec: **Hot 70+, Warm 40 to 69, Cold under 40.**

### [11] Google Sheets > Add a row

Sheet `Leads`. Map every column:

| Column | Value |
| --- | --- |
| `lead_id` | leave empty (filled in step 16) |
| `created_at` | `{{formatDate(1.submitted_at; "YYYY-MM-DD HH:mm")}}` |
| `name`, `phone`, `email`, `business`, `industry`, `role`, `team_size`, `spend`, `challenge`, `timeline`, `locale`, `page`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_content` | the same field from [1] |
| `opt_in` | `1.whatsapp_opt_in` |
| `rule_score` | `6.rule_score` |
| `ai_rating` | `10.ai_rating` |
| `score` | `10.score` |
| `tier` | the `tier` from the second variables module |
| `ai_summary` | `9.summary` |
| `ai_reply` | `9.email_body` |
| `wa_link` | `{{if(1.whatsapp_opt_in; 10.wa_link_full; "No opt-in: email only")}}` |
| `status` | `New` |
| `owner` | `{{if(tier = "Hot"; "<Hot owner name>"; emptystring)}}` |
| `next_action`, `next_action_date` | from the second variables module |
| `touch_count` | `0` |
| `is_simulated` | `1.is_simulated` |

### [12] Data store > Add/replace a record

- Key: `1.phone`
- `row_number`: `11.Row number` (from step 11's output)
- `lead_id`: `IDEA-{{substring(toString(10000 + 11.Row number - 1); 1; 5)}}`

The lead ID formula turns row 2 into `IDEA-0001`, row 3 into `IDEA-0002`, and so on (row 1 is the header).

### [13] Router with 3 routes

| Route | Filter |
| --- | --- |
| Reply to lead | `10.review` is equal to `false` (Boolean) |
| Team alert | `tier` equal to `Hot` **and** `10.review` equal to `false` |
| Update CRM | no filter |

Make runs the routes from top to bottom, so the CRM update runs last.

### [14] Gmail > Send an email (reply to the lead)

- To: `1.email`
- Subject:

  ```text
  {{ifempty(9.email_subject; if(1.locale = "ar"; "طلبك وصلنا"; "We got your request"))}}
  ```

- Content (HTML):

  ```text
  <div dir="{{if(1.locale = "ar"; "rtl"; "ltr")}}">{{replace(replace(ifempty(9.email_body; if(1.locale = "ar"; "أهلًا {name}، شكرًا إنك طلبت كشف تسويقي ببلاش. هنكلمك على واتساب خلال يوم عمل واحد عشان نحدد معاد Call لمدة 20 دقيقة. فريق Idea Agency"; "Hi {name}, thanks for requesting a free marketing diagnostic. We will message you on WhatsApp within one working day to book a 20-minute call. Idea Agency team")); "{name}"; 1.name); newline; "<br>")}}</div>
  ```

  How it works: use Gemini's email if there is one; otherwise use the template in the lead's language, put their name in place of `{name}`, and turn line breaks into `<br>` for the HTML email.

### [15] Gmail > Send an email (Hot lead alert)

- To: the team alert email from `Settings`
- Subject: `Hot lead: {{1.business}} ({{10.score}} points)`
- Content:

  ```text
  {{9.summary}}<br><br>
  Name: {{1.name}}<br>
  Phone: {{1.phone}}<br>
  Challenge: {{1.challenge}}<br>
  WhatsApp: {{if(1.whatsapp_opt_in; 10.wa_link_full; "No opt-in, use email")}}<br><br>
  Next action: call within 2 hours.
  ```

### [16] Google Sheets > Update a row

Sheet `Leads`, row number `11.Row number`:

| Column | Value |
| --- | --- |
| `lead_id` | `IDEA-{{substring(toString(10000 + 11.Row number - 1); 1; 5)}}` |
| `status` | `{{if(10.review; "Needs review"; "Contacted")}}` |
| `touch_count` | `{{if(10.review; 0; 1)}}` |
| `last_contact` | `{{if(10.review; emptystring; formatDate(now; "YYYY-MM-DD HH:mm"))}}` |

### [17] Google Sheets > Add a row (Log)

- `timestamp`: `{{formatDate(now; "YYYY-MM-DD HH:mm")}}`
- `lead_id`: same formula as step 16
- `flow`: `A`, `action`: `captured`
- `details`: `{{tier}}, {{10.score}} points, status {{if(10.review; "Needs review"; "Contacted")}}`

## Turn it on

1. Save, then switch the scenario **ON** (Scheduling: immediately as data arrives).
2. Send the first test lead:

   ```bash
   node automation/scripts/send-test-lead.mjs automation/test-leads/01-hot-owner-high-spend.json
   ```

3. Check the run in Make's history, the new row in `Leads`, the email, and the Hot alert.
4. Run all scenarios in `automation/test-leads/README.md` and take a screenshot of each result for the testing report.

## When something goes wrong

| Problem | Likely cause |
| --- | --- |
| Website says "Something went wrong" | Scenario is off, or `MAKE_WEBHOOK_URL` is wrong. Check Make's webhook queue |
| Flow stops after [2] | The Router filter uses the wrong operator. `Exists` must be compared as a Boolean |
| Parse JSON fails | Gemini returned text around the JSON. Check step [8] and that the prompt still says "Return only valid JSON" |
| Arabic email shows left-aligned | The `dir` wrapper in step [14] is missing |
| Lead ID shows `IDEA-0000` | Step [12] or [16] used the wrong module's row number |
