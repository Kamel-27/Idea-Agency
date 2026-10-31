# Automation (Make.com)

Everything that happens after a lead submits the form: scoring, CRM, replies, follow-ups and reports. Built in **Make.com** with **Gemini** (AI), **Google Sheets** (CRM) and **Gmail**.

Make scenarios live in your Make account, not in this repo. This folder holds what is needed to build, test and explain them.

## The flows

| Flow | When it runs | What it does | Guide | Status |
| --- | --- | --- | --- | --- |
| **A. Capture** | Each new lead (webhook) | Dedupe, score, AI reply, CRM row, email, Hot alert | [flow-a-capture.md](flow-a-capture.md) | Built and tested |
| **B. Follow-up** | Every day at 10:00 | Day 2 and Day 5 messages, then Nurture | [flow-b-followups.md](flow-b-followups.md) | Built and tested |
| **C. Weekly report** | Mondays | Counts by source, tier, stage + AI insight email | coming | Optional |

## Folder map

```
automation/
├── README.md                     this file
├── flow-a-capture.md             build guide for Flow A, module by module
├── prompts/
│   └── gemini-lead-scoring.md    the Gemini prompt (Role, Task, Constraints, Output)
├── crm/                          header rows for each Google Sheet tab
│   ├── leads.csv
│   ├── settings.csv
│   ├── templates.csv             fallback replies when the AI fails
│   ├── log.csv
│   └── errors.csv
├── test-leads/                   the 12 test scenarios as JSON + expected results
└── scripts/
    └── send-test-lead.mjs        sends a test lead to the webhook
```

## Accounts (all on the agency Google account)

| Tool | Used for | Secret stays in |
| --- | --- | --- |
| Make.com | Runs the flows | Make |
| Google Sheets | The CRM | Google |
| Gemini API (Google AI Studio) | Rating and replies | Make connection only |
| Gmail | Replies and alerts | Make connection only |

The only secret in this repo's world is the webhook URL, and it lives in `site/.env.local`, which git ignores.

## CRM columns

The `Leads` tab follows `docs/03-system-spec.md`, plus 6 columns the spec did not have:

| Column | Why |
| --- | --- |
| `email` | The form asks for email (decision 9) and Flow A replies by email |
| `locale` | Reply in the lead's language (`en` or `ar`) |
| `page` | Which landing page the lead came from |
| `wa_link` | Ready-made WhatsApp click-to-chat link for the team |
| `rule_score`, `ai_rating` | Show how the total score was made: 90 points from rules, 10 from AI |

## Order of work

1. Create the Google Sheet and paste the headers from `crm/`
2. Build Flow A with `flow-a-capture.md`
3. Run the 12 tests in `test-leads/` and screenshot each result
4. Connect the website: put the webhook URL in `site/.env.local`, submit the real form once
5. Flow B (follow-ups), then the simulated data and the Looker Studio dashboard
