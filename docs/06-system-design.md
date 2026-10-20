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
              │  Gemini API  │  │ Google Sheets CRM │
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
| Website | Next.js in `site/` | Agency site + landing pages, captures UTMs | Home page and diagnostic pages (EN + AR) done |
| CMS | Sanity | Teammates edit text, portfolios, landing pages | Planned, after Oct 30 |
| Form | Our own Next.js form | Collects the lead, sends it to Make through a Server Action | Done, waiting for the Make webhook |
| Automation | Make.com | Runs the capture and follow-up flows | Planned |
| AI | Gemini API (free tier) | Rates the challenge text, writes summary and replies | Planned |
| CRM | Google Sheets | Single source of truth for leads | Planned |
| Email | Gmail | Instant reply and follow-ups | Planned |
| WhatsApp | wa.me links | AI writes the message, a teammate taps to send | Planned |
| Tracking | GTM, GA4, Meta Pixel | Page views, leads, WhatsApp clicks | Planned |
| Dashboard | Looker Studio | Leads by source, tier and stage | Planned |

## Website structure

```
site/src/app
├── (en)/                     English, <html lang="en">
│   ├── (site)/               website pages, with header and footer
│   │   └── page.tsx          /            home
│   └── (landing)/            ad landing pages, no menu, one goal
│       ├── diagnostic/       /diagnostic  free SME marketing diagnostic
│       ├── thank-you/        /thank-you   after the form
│       └── privacy/          /privacy
└── (ar)/                     Arabic, <html lang="ar" dir="rtl">
    └── ar/(landing)/         /ar/diagnostic, /ar/thank-you, /ar/privacy
```

Website pages have a menu, landing pages must not (course rule), so they use different layouts. Coming next: `/services`, `/work`, `/team`, `/blog`.

## Lead payload sent to Make

The form sends this JSON to the Make webhook (`MAKE_WEBHOOK_URL`):

```json
{
  "name": "Sara Ahmed",
  "phone": "+201012345678",
  "business": "Sara's Boutique",
  "email": "sara@example.com",
  "industry": "retail",
  "role": "owner",
  "team_size": "5-49",
  "spend": "over_20k",
  "challenge": "My Instagram ads get likes but no sales.",
  "timeline": "this_month",
  "whatsapp_opt_in": true,
  "utm_source": "meta",
  "utm_medium": "cpc",
  "utm_campaign": "leads_cairosme_2026-10",
  "utm_content": "video_negation_v1",
  "locale": "en",
  "page": "/diagnostic",
  "submitted_at": "2026-10-20T20:49:24.558Z",
  "is_simulated": false
}
```

Answer codes are the same in both languages. Missing UTMs arrive as `direct` (source) and `none` (the others). Make uses `locale` to reply in the lead's language.

## How a lead moves, step by step

1. Someone clicks an ad. The link carries `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`.
2. The landing page reads the UTMs from the URL when the form is sent. Missing UTMs become `direct`.
3. Our server checks the lead again and sends it to the Make.com webhook.
4. The page fires `generate_lead`, which GTM sends to GA4 (`generate_lead`) and Meta (`Lead`).
5. Make cleans the phone number to `+20` format and checks the CRM for a duplicate.
6. Make adds the rule score (90 points) and asks Gemini for the challenge rating (10 points), a summary and the replies.
7. Make saves the row, sends the Gmail reply, saves the wa.me link and alerts the team for Hot leads.
8. Every day Flow B sends the Day 2 and Day 5 follow-ups to leads still at Contacted.
9. Looker Studio reads the sheet and shows the numbers.

## Where secrets live

| Secret | Where | Never |
| --- | --- | --- |
| Gemini API key | Make.com connection only | In the repo or a chat |
| Make webhook URL | `site/.env.local` | In client-side code if avoidable |
| Sanity token | `site/.env.local` | In the repo |

`.env*` files are ignored by git.
