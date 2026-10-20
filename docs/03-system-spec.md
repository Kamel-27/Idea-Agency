# 03 System spec (frozen Oct 18, change only with the whole team)

## Flow

```
Ad + UTM link -> Landing page -> Two-step Tally form -> Make.com Flow A
Flow A -> Gemini (score, summary, reply) -> Google Sheets CRM row -> Gmail reply + WhatsApp link -> team alert if Hot -> status Contacted
Flow B (daily) -> Day 2 and Day 5 follow-ups -> Nurture after Day 5
Flow C (weekly, optional) -> stats + AI insight email to the team
GTM + GA4 + Meta Pixel on the page; Looker Studio dashboard reads the CRM sheet
```

## Tool stack

| Part | Tool |
| --- | --- |
| Landing page | Static HTML on GitHub Pages or Netlify (this repo) |
| Form | Tally embed: hidden fields for UTMs, webhook to Make |
| Automation | Make.com (n8n alternative) |
| AI | Gemini API free tier (or OpenAI) |
| CRM | Google Sheets (connects natively to Looker Studio; Airtable would need a paid connector) |
| Email | Gmail (agency account) |
| WhatsApp | Simulation: AI writes the message, the flow saves a wa.me click-to-chat link in the CRM, a team member taps it to send |
| Tracking | Google Tag Manager, GA4, Meta Pixel |
| Dashboard | Looker Studio |

## Form (two steps, step 1 stays at 3 fields)

- **Step 1:** name, WhatsApp number, business name
- **Step 2:** industry (dropdown), role (owner / marketing manager / employee), team size (1 to 4 / 5 to 49 / 50+), monthly marketing spend (none / under 5,000 EGP / 5,000 to 20,000 EGP / over 20,000 EGP), biggest marketing challenge (free text), when do you want to start (this month / within 3 months / just exploring), WhatsApp opt-in tick box
- **Hidden:** utm_source, utm_medium, utm_campaign, utm_content

## Lead scoring (100 points)

| Signal | Values | Max |
| --- | --- | --- |
| Monthly spend | none 0, under 5,000 EGP 10, 5,000 to 20,000 EGP 25, over 20,000 EGP 30 | 30 |
| Timeline | this month 25, within 3 months 15, just exploring 5 | 25 |
| Role | owner 20, marketing manager 15, employee 5 | 20 |
| Team size | 1 to 4 = 5, 5 to 49 = 15, 50+ = 10 | 15 |
| AI rating of the challenge text | 0 to 10 | 10 |

Tiers: **Hot** 70+, **Warm** 40 to 69, **Cold** under 40. Rules live in the flow so the score is explainable; only 10 points come from AI.

## CRM (Google Sheets)

**Tabs:** Leads, Settings (score rules, owners, links), Templates (follow-up messages), Log (every automation action), Errors.

**Leads columns:** lead_id (IDEA-0001), created_at, name, phone, business, industry, role, team_size, spend, challenge, timeline, opt_in, utm_source, utm_medium, utm_campaign, utm_content, score, tier, ai_summary, ai_reply, status, owner, next_action, next_action_date, touch_count, last_contact, lost_reason, is_simulated.

**Stages:** New, Contacted, Engaged, Diagnostic Booked, Diagnostic Done, Proposal Sent, Won, Lost, Nurture (plus Needs review for errors).

**Status rules**
- Every new lead: AI reply within minutes, New becomes Contacted
- Hot: owner assigned, team alert, next action "call within 2 hours"
- Warm: three-step follow-up runs automatically
- Cold: one helpful email, then Nurture
- Any reply or booking stops the sequence. No reply after the third touch moves to Nurture

## Follow-up sequence

| Step | Hot | Warm | Cold |
| --- | --- | --- | --- |
| Day 0, instant | Thanks, we call within 2 hours, booking link | Thanks, what the diagnostic covers, booking link | Thanks, one useful tip on their challenge, booking link |
| Day 2 | Only if no call yet: reminder + link | Proof: sample diagnostic + short story of a similar business | Free checklist or tip |
| Day 5 | Personal note from the lead owner | Last call: limited weekly slots (only if true) | Move to Nurture |

Email under 120 words with a Curiosity, Benefit or Urgency subject. WhatsApp under 60 words, one link. Email nurtures, WhatsApp closes (Session 20). WhatsApp only with opt-in.

## Make.com flows

**Flow A, capture (live demo):** 1 Tally webhook. 2 Clean data, phone to +20 format. 3 Search CRM by phone; duplicate updates the row, logs, stops. 4 Rule score (90 pts). 5 Gemini returns JSON. 6 On AI failure use template reply and status Needs review. 7 Total score + tier. 8 Add row. 9 Gmail reply. 10 Build wa.me link with URL-encoded text, save in row. 11 Hot only: team alert with summary + WhatsApp link. 12 Status Contacted, last_contact, touch_count = 1.

**Flow B, daily 10:00:** Contacted leads 2 days old (touch 1) or 5 days old (touch 2) get the next message, AI-personalized from the template; touch_count + 1; Log. After Day 5 with no change, Nurture. Leads whose status is no longer Contacted get nothing.

**Flow C, weekly (optional):** Monday counts by source, tier, stage; Gemini writes 5 lines of insight; email to the team.

**Gemini prompt draft:** You are the intake assistant of IDEA Marketing Agency in Cairo. Read this lead: [fields]. Return JSON only: {"challenge_rating": 0 to 10, "summary": one sentence for the sales team, "email_subject", "email_body", "whatsapp_text"}. Rules: reply in the language the lead used (Egyptian Arabic or English), mention their challenge in their own words, one CTA with the booking link, email under 90 words, WhatsApp under 50 words, never mention prices, never promise results.

## UTM dictionary (lowercase, underscores, only these words)

- Sources: meta, linkedin, google, whatsapp, email (missing = direct)
- Mediums: cpc, social, referral, email
- Campaign: leads_cairosme_2026-10
- Content: names the creative, e.g. video_negation_v1, carousel_audit_v1

Example: `?utm_source=meta&utm_medium=cpc&utm_campaign=leads_cairosme_2026-10&utm_content=video_negation_v1`

## Tracking events

| Action | Meta | GA4 | Trigger |
| --- | --- | --- | --- |
| Page load | PageView | page_view | All pages |
| Form submitted | Lead | generate_lead | Tally submit message from iframe |
| WhatsApp click | Contact | contact (custom) | Click on wa.me link |
| Step 2 opened | form_step2 (custom) | form_step2 | Tally page change |

Parameters: currency EGP where relevant, utm values. Validate with GTM Preview, Meta Test Events, GA4 DebugView, and keep screenshots.

## Dashboard (Looker Studio)

Scorecards: total leads, qualified lead rate, diagnostics booked, average response time. Charts: leads by source, by tier, pipeline by stage, weekly trend, cost per lead by source (joined with the planned budget). Filters: date, source, tier. Weekly logic: review the worst number first, change one thing a week, wait 7 days.

## Test scenarios (minimum 12)

1 Hot owner, high spend, this month. 2 Cold student, no budget. 3 Warm manager. 4 Duplicate phone. 5 Missing/invalid phone. 6 Arabic challenge text gets Arabic reply. 7 English text gets English reply. 8 Spam text, low rating, Needs review. 9 No WhatsApp opt-in, email only. 10 AI failure, template reply + Errors entry. 11 No UTM saved as direct. 12 Lead replies, status Engaged, Flow B stops.

## Simulated data

40 to 60 leads over 4 weeks with a realistic mix of sources, tiers and stages, `is_simulated = TRUE`, written straight into the sheet by script (not through Make, to save operations).
