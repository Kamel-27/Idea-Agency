# 06 System design

How every part of the lead generation engine connects. The business rules (form fields, scoring, CRM columns) are in `03-system-spec.md`. This file is about the architecture.

## The big picture

```
                 ┌────────────────────────────┐
  Ad + UTM link  │  Website (Next.js)          │
 ───────────────>│  /diagnostic landing page   │
                 │  form + UTM capture         │
                 └─────────────┬──────────────┘
                               │ lead submitted
                               ▼
                 ┌────────────────────────────┐
                 │  Make.com Flow A (capture)  │
                 │  clean, dedupe, rule score  │
                 └──────┬──────────────┬──────┘
                        │              │
                        ▼              ▼
              ┌──────────────┐  ┌──────────────────┐
              │  Claude API  │  │ Google Sheets CRM │
              │ rate, summary│─>│  one row per lead │
              │ email, WA msg│  └────────┬─────────┘
              └──────────────┘           │
                        │                ├──> Looker Studio dashboard
                        ▼                │
        Gmail reply + wa.me link         │
        Hot lead: team alert             │
                                         ▼
                 ┌────────────────────────────┐
                 │  Make.com Flow B (daily)    │
                 │  Day 2 and Day 5 follow-ups │
                 └────────────────────────────┘

  Every page: Google Tag Manager → GA4 + Meta Pixel (after consent)
```

## The parts

| Part | Tool | Job | Status |
| --- | --- | --- | --- |
| Website | Next.js in `site/` | Agency site + landing pages, captures UTMs | Home page done |
| CMS | Sanity | Teammates edit text, portfolios, landing pages | Planned, after Oct 30 |
| Form | Tally or our own form | Collects the lead, sends it to Make | Open decision |
| Automation | Make.com | Runs the capture and follow-up flows | Planned |
| AI | Claude API | Rates the challenge text, writes summary and replies | Planned |
| CRM | Google Sheets | Single source of truth for leads | Planned |
| Email | Gmail | Instant reply and follow-ups | Planned |
| WhatsApp | wa.me links | AI writes the message, a teammate taps to send | Planned |
| Tracking | GTM, GA4, Meta Pixel | Page views, leads, WhatsApp clicks | Planned |
| Dashboard | Looker Studio | Leads by source, tier and stage | Planned |

## Website structure

```
site/src/app
├── (site)/          website pages, with header and footer
│   ├── page.tsx     /            home
│   ├── services/    /services    (coming)
│   ├── work/        /work        portfolio (coming)
│   ├── team/        /team        team profiles (coming)
│   └── blog/        /blog        (later)
└── (landing)/       ad landing pages, no menu, one goal (coming)
    ├── diagnostic/  /diagnostic  free SME marketing diagnostic
    └── thank-you/   /thank-you   after the form
```

Two groups, because the course rules differ: website pages have a menu, landing pages must not.

## How a lead moves, step by step

1. Someone clicks an ad. The link carries `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`.
2. The landing page reads the UTMs from the URL and puts them in hidden form fields. Missing UTMs become `direct`.
3. The visitor submits the form. GTM fires `Lead` (Meta) and `generate_lead` (GA4).
4. The form sends the lead to the Make.com webhook.
5. Make cleans the phone number to `+20` format and checks the CRM for a duplicate.
6. Make adds the rule score (90 points) and asks Claude for the challenge rating (10 points), a summary and the replies.
7. Make saves the row, sends the Gmail reply, saves the wa.me link and alerts the team for Hot leads.
8. Every day Flow B sends the Day 2 and Day 5 follow-ups to leads still at Contacted.
9. Looker Studio reads the sheet and shows the numbers.

## Where secrets live

| Secret | Where | Never |
| --- | --- | --- |
| Claude API key | Make.com connection, or `site/.env.local` | In the repo or a chat |
| Make webhook URL | `site/.env.local` | In client-side code if avoidable |
| Sanity token | `site/.env.local` | In the repo |

`.env*` files are ignored by git.
