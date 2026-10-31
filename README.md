# IDEA Agency: Automated Lead Generation Engine with CRM and Reporting

DEPI **Advanced Marketing Automation with AI** graduation project. **Elite Project 2.**

🌐 **Live website:** [idea-agency.vercel.app](https://idea-agency.vercel.app) · 📁 **[All deliverables (Google Drive)](https://drive.google.com/drive/folders/1Mol7H_FLCazJjskIOBGygjB00-ouTKyC?usp=sharing)** · Landing page: [Arabic](https://idea-agency.vercel.app/ar/diagnostic) · [English](https://idea-agency.vercel.app/diagnostic)

---

## 1. Project Name

**IDEA Agency: Automated Lead Generation Engine with CRM and Reporting**

## 2. Project Idea

IDEA Agency is a real digital marketing and web agency we are launching. This project is its first working funnel.

Small and medium business owners spend money on ads and freelancers but do not know what is working. We offer them a **free marketing diagnostic** (in Arabic «كشف تسويقي ببلاش»): a 20-minute call and a 1-page action plan.

The engine turns an ad click into a qualified, answered lead in under a minute:

```
Ad or post (UTM link)
  → Landing page, Arabic and English (two-step qualification form)
  → Make.com Flow A: rule score (90 pts) + Gemini AI rating (10 pts) → Hot / Warm / Cold
  → Google Sheets CRM row with source, stage, priority and next action
  → Personal AI-written email reply + ready WhatsApp link
  → Instant team alert for Hot leads
  → Make.com Flow B: Day 2 and Day 5 follow-ups, then Nurture
  → Dashboard with weekly reporting logic
```

Built-in safety: duplicate leads are detected, and if the AI fails, the lead is saved and the team is alerted to reply by hand.

## 3. Team Members

| Name | Role |
| --- | --- |
| Esraa Elsayed Shafeeq Omar | Strategy and Project Management |
| Heba Saleh Kamel Othman | Content and Creative |
| Reham Raafat Hassan Kobro | Social Media and Video |
| Aya Mohamed Add Al Azim Salama | Performance and Tracking |
| Kamel Mustafa Kamel El Tahan | Web Development and Automation |

## 4. Work Plan

| Dates | Phase | Output | Status |
| --- | --- | --- | --- |
| Oct 15 to 18 | Research and planning | Strategy file, personas, competitors, offer, frozen system spec | ✅ Done |
| Oct 19 to 23 | Build | Website and landing pages (AR + EN), lead form, CRM, Make.com Flow A, Gemini prompt | ✅ Done |
| Oct 24 to 29 | Content and creative | Brand kit, voice, pillars, hooks, calendar, posts, ad concepts, scripts, 3 videos, social media accounts | ✅ Done |
| Oct 29 to 31 | Connect and test | Live deployment ✅, tracking plan ✅, testing scenarios ✅, Flow B follow-ups ✅, dashboard | 🔄 Finishing |
| Oct 31 | Document and present | Testing report ✅, final documentation, presentation deck | 🔄 Finishing |

## 5. Roles and Responsibilities

| Member | Responsibilities | Deliverables |
| --- | --- | --- |
| **Esraa** | Market research, personas, competitor analysis, positioning, offer, budget assumptions. Project timeline and coordination. Final documentation file | Strategy File, Final Documentation |
| **Heba** | Brand voice, content pillars, hook library, 30-day content calendar, sample posts, ad concepts, video scripts and storyboards, visual direction, brand kit | Content and Creative System (9 documents) |
| **Reham** | Facebook, Instagram and LinkedIn pages, publishing posts and videos with UTM links, presentation deck | Social media launch, Presentation Deck |
| **Aya** | Campaign objectives, traffic plan, UTM structure, conversion event map, KPI targets, dashboard and weekly reporting | Performance and Tracking System, Dashboard |
| **Kamel** | Website and landing pages, two-step form, Make.com Flows A and B, Google Sheets CRM, Gemini AI prompt, testing, live demo | Funnel and Conversion System (build), Automation and AI Workflow System |

## 6. KPIs

**Funnel KPIs** (one per stage, AARRR):

| Stage | KPI | Target, launch month |
| --- | --- | --- |
| Acquisition | Landing page visitors by source (UTM) | Baseline in week 1 |
| Activation | Form start rate (`form_step2` / visitors) | 20%+ |
| Conversion | Lead conversion rate (leads / visitors) | 8 to 10%+ |
| Quality | Qualified lead rate ((Hot + Warm) / leads) | 50%+ |
| Speed | First response time | Under 5 minutes (automatic) |
| Revenue path | Diagnostics booked / leads | 30%+ |
| Cost | Cost per lead, by source | Under 35 EGP |

**System KPIs** (measured in testing):

| KPI | Result |
| --- | --- |
| Lead to reply email | Under 1 minute |
| Leads with a source recorded | 100% (missing UTM saved as `direct`) |
| Leads lost when the AI fails | 0 (saved to the Errors tab, team alerted) |
| Test scenarios | 14 defined, see the testing report |

Targets are planning assumptions, reviewed weekly with the dashboard. Full plan: [docs/07-tracking-plan.md](docs/07-tracking-plan.md).

## 7. Instructor

**Andrew Atef**

## 8. Project Files

**Google Drive (all deliverables):** [IDEA Agency - DEPI Graduation Project](https://drive.google.com/drive/folders/1Mol7H_FLCazJjskIOBGygjB00-ouTKyC?usp=sharing)

| Deliverable | Where |
| --- | --- |
| 1. Strategy File | Google Drive, folder 1 |
| 2. Content and Creative System | Google Drive, folder 2 (9 documents, social media posts and videos) |
| 3. Funnel and Conversion System | [Live landing page](https://idea-agency.vercel.app/ar/diagnostic) · [site/](site/) (website code) |
| 4. Performance and Tracking System | [docs/07-tracking-plan.md](docs/07-tracking-plan.md) (UTMs, event map, KPIs) · Dashboard: Google Drive, folder 4 |
| 5. Automation and AI Workflow System | [automation/](automation/) (Make.com flows, Gemini prompt, CRM structure, test leads) · [docs/06-system-design.md](docs/06-system-design.md) (architecture) · [docs/08-testing-report.md](docs/08-testing-report.md) |
| 6. Documentation and Presentation | Google Drive, folder 6 (final report PDF, presentation deck) |
| Decisions and reasons | [docs/decisions.md](docs/decisions.md) |

## Repository structure

```
site/         the website and landing pages (Next.js, TypeScript, Tailwind CSS)
automation/   Make.com flow guides, Gemini prompt, CRM headers, test leads
docs/         brief, business and offer, system spec, design, tracking plan, testing report, decisions
```

**Tools:** Next.js · Vercel · Make.com · Google Gemini · Google Sheets · Gmail · Looker Studio · GTM / GA4 / Meta Pixel (planned)
