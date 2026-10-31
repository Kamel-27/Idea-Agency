# 07 Tracking plan: UTMs, events and KPIs

Deliverable 4 (Performance and Tracking System). It answers three questions: where did each lead come from, what did they do on the page, and which numbers tell us the funnel works.

Course frameworks used: Session 15 (Tracking, Pixels and Events), Session 16 (Traffic, UTM and Attribution), Session 19 (AARRR, one KPI per stage).

## 1. What a UTM is

A UTM is extra text at the end of a link. It does not change the page. It tells us which post, ad or message sent the visitor:

```
https://idea-agency.vercel.app/ar/diagnostic?utm_source=meta&utm_medium=social&utm_campaign=leads_cairosme_2026-10&utm_content=ig_bio
                                            └ where ┘        └ how ┘           └ which campaign ┘                  └ which post ┘
```

The website reads these tags when a visitor submits the form and saves them in the CRM (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`). A visitor with no tags is saved as `direct`.

## 2. UTM dictionary (lowercase, underscores, only these words)

| Part | Allowed values |
| --- | --- |
| `utm_source` | `meta`, `linkedin`, `google`, `whatsapp`, `email` |
| `utm_medium` | `cpc` (paid ad), `social` (organic post), `referral` (shared link), `email` |
| `utm_campaign` | `leads_cairosme_2026-10` (one campaign for the launch month) |
| `utm_content` | names the post or ad, e.g. `video_negation_v1`, `carousel_audit_v1`, `ig_bio` |

Rules (Session 16): lowercase, no spaces, never invent a new word outside this list. A new creative only adds a new `utm_content` value.

## 3. Ready links: use the right one wherever the page is shared

Base pages: Arabic `https://idea-agency.vercel.app/ar/diagnostic`, English `https://idea-agency.vercel.app/diagnostic`.

| Where it is posted | Add this after the page address |
| --- | --- |
| Instagram bio | `?utm_source=meta&utm_medium=social&utm_campaign=leads_cairosme_2026-10&utm_content=ig_bio` |
| Instagram post or reel | `?utm_source=meta&utm_medium=social&utm_campaign=leads_cairosme_2026-10&utm_content=ig_<post_name>` |
| Facebook page post | `?utm_source=meta&utm_medium=social&utm_campaign=leads_cairosme_2026-10&utm_content=fb_<post_name>` |
| Meta paid ad | `?utm_source=meta&utm_medium=cpc&utm_campaign=leads_cairosme_2026-10&utm_content=<ad_name>` |
| LinkedIn post | `?utm_source=linkedin&utm_medium=social&utm_campaign=leads_cairosme_2026-10&utm_content=li_<post_name>` |
| WhatsApp status or group | `?utm_source=whatsapp&utm_medium=referral&utm_campaign=leads_cairosme_2026-10&utm_content=wa_share` |
| Email signature | `?utm_source=email&utm_medium=email&utm_campaign=leads_cairosme_2026-10&utm_content=signature` |

Replace `<post_name>` or `<ad_name>` with the creative's short name, e.g. `video_negation_v1`. Keep a list of every link used in the UTM sheet in Drive (folder 4).

**How to check a link works:** open it, submit the form with a test name, and check that the new CRM row shows the same source, medium and content.

## 4. Conversion event map

The site sends these events to `window.dataLayer` (`site/src/lib/tracking/events.ts`). Google Tag Manager forwards them to GA4 and the Meta Pixel after the visitor accepts cookies.

| Visitor action | Site event | GA4 event | Meta event | Funnel stage |
| --- | --- | --- | --- | --- |
| Opens any page | (automatic) | `page_view` | `PageView` | Awareness |
| Finishes form step 1 | `form_step2` | `form_step2` | `form_step2` (custom) | Consideration |
| Submits the form | `generate_lead` | `generate_lead` | `Lead` | Conversion |
| Clicks WhatsApp | `contact` | `contact` | `Contact` | Conversion |

`generate_lead` also carries the UTM values and the page language (`locale`).

**Status:** the events are built and verified in the browser (the dataLayer shows `form_step2` and `generate_lead` with UTMs). Installing the GTM container, GA4 and the Pixel is the next step once the agency accounts exist; validate with GTM Preview, GA4 DebugView and Meta Test Events.

## 5. Attribution

Last-click attribution: each lead is credited to the UTM of the visit where they submitted the form. Data-driven attribution needs about 600 conversions a month (Session 16), which a new agency will not have. When a lead comes back with a new UTM, Flow A writes the new source in the `Log` tab, so we can still see second touches.

## 6. KPIs: one per funnel stage (AARRR, Session 19)

| Stage | KPI | Formula | Target for launch month |
| --- | --- | --- | --- |
| Acquisition | Landing page visitors by source | GA4 `page_view` by `utm_source` | Baseline in week 1 |
| Activation | Form start rate | `form_step2` / visitors | 20%+ |
| Conversion | Lead conversion rate | leads / visitors | 8 to 10%+ |
| Quality | Qualified lead rate | (Hot + Warm) / all leads | 50%+ |
| Speed | First response time | `last_contact` minus `created_at` | Under 5 minutes (automatic) |
| Revenue path | Diagnostics booked | status `Diagnostic Booked` / leads | 30%+ |
| Cost | Cost per lead | ad spend / leads, by source | Under 35 EGP (Session 4 example) |

Targets are planning assumptions for the first month, not results. They are reviewed after 7 days of real data.

## 7. Weekly reporting logic

Every Monday (Session 13 and 19: "five numbers, one dashboard, weekly review"):

1. Open the dashboard and find the **worst** KPI against its target.
2. Change **one** thing that affects it (headline, ad creative, audience or follow-up text).
3. Wait 7 days, compare, keep or revert. Kill an ad after 14 days without leads.
