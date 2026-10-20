# IDEA Marketing Agency: graduation project repo

This repo holds the website and automation work for our DEPI "Advanced Marketing Automation with AI" graduation project. We are a team of 5. Submission is **Fri Oct 30, 2026**.

We build **DEPI Elite Project 2: Automated Lead Generation Engine with CRM and Reporting** for our own agency, **IDEA Marketing Agency**. The agency is real (we plan to launch it), so the project is also the agency's first funnel.

## The one-sentence version

An Egyptian SME owner clicks our ad, lands on one page and requests a **free SME Marketing Diagnostic**. A Make.com flow scores the lead with AI, saves it in a Google Sheets CRM, replies personally by email and WhatsApp link, alerts the team for hot leads, follows up on day 2 and day 5, and a Looker Studio dashboard shows everything.

## Read these before working

| File | What is in it |
| --- | --- |
| `docs/01-project-brief.md` | Assignment, grading rubric, required deliverables, team roles, schedule |
| `docs/02-business-and-offer.md` | Target audience, personas, services, positioning, competitors, example client |
| `docs/03-system-spec.md` | Frozen spec: form fields, lead scoring, CRM columns and stages, UTM dictionary, tracking events, follow-up logic, automation flows |
| `docs/04-landing-page-spec.md` | Landing page sections with example copy, course rules for landing pages, technical requirements |
| `docs/05-course-frameworks.md` | What the DEPI lectures (Sessions 1 to 20) teach. Graders look for these frameworks by name |
| `docs/06-system-design.md` | Architecture: how the site, Make, Gemini, CRM and dashboard connect |
| `docs/decisions.md` | Decisions log: what we chose and why. Add an entry for every new decision |
| `CONTRIBUTING.md` | Branches, commit messages, PR checklist |
| `docs/reference/` | Original PDFs: project guidelines, the teammate's strategy file, the team plan and role files |

## What this repo contains

```
/site            the agency website (Next.js). Read site/README.md first
/prototype       throwaway HTML design mockup, safe to delete
/automation      (planned) Make.com blueprints, AI prompts, test cases
/data            (planned) simulated leads generator + CSV (always labeled simulated)
/docs            project context
```

The site has two kinds of pages:
- **Website pages** in `site/src/app/(en)/(site)/` and `(ar)/ar/(site)/`: home (done), services, portfolio, team, blog. Normal menu.
- **Landing pages** in `site/src/app/(en)/(landing)/` and `(ar)/ar/(landing)/`: one per ad offer, starting with the free diagnostic. The rules below apply to these.
- Every page has an English / العربية switch in the header.

## Landing page rules (from the course, do not break)

- The landing page has **one goal**: book the free diagnostic. No navigation menu. The only links out are quiet ones: the logo and footer link to the home page (decision 11), WhatsApp and the privacy note.
- **One CTA text** everywhere: "Book my free diagnostic" in English, «عايز أعرف إيه اللي شغال» in Arabic. Repeated 3 to 5 times, sticky on mobile.
- Mobile first. About 80% of Egyptian traffic is mobile. Tap targets 44px+, body text 16px+.
- Speed: PageSpeed mobile over 80, hero image under 200KB in WebP, total page under 1.5MB.
- Form is **our own two-step form** (`site/src/components/landing/LeadForm.tsx`), sent to Make by a Server Action. It passes `utm_source`, `utm_medium`, `utm_campaign`, `utm_content` from the page URL. Missing UTMs save as `direct`.
- Tracking through **Google Tag Manager**: GA4 + Meta Pixel. Events: `PageView`, `Lead` / GA4 `generate_lead` on submit, `Contact` on WhatsApp click, custom `form_step2`. Exact casing. The site pushes `form_step2`, `generate_lead` and `contact` to `dataLayer` (`site/src/lib/tracking/events.ts`); GTM maps them to GA4 and Meta.
- WhatsApp button uses `https://wa.me/20XXXXXXXXXX?text=...` (number to be decided).
- Consent banner before tags fire (Egypt PDPL).
- **Never invent proof**: no fake testimonials, client logos, ratings or results. Only true claims.
- Every landing page exists in English and Arabic (`/ar/...`, `dir="rtl"`, Cairo font), one page per language, same design.
- Arabic voice: natural Egyptian Arabic with the English marketing words owners really use (Ads, Plan, Budget), written for the owner's real worry, not translated. Conversational headlines, clear and professional form and privacy text. In Arabic the offer is «كشف تسويقي ببلاش».
- No city or country names in copy (no Cairo, no Egypt). The offer is for any business.

## Tech choices

- Site: **Next.js 16 + React 19 + TypeScript + Tailwind CSS 4** in `/site`. This version has breaking changes: check `site/node_modules/next/dist/docs/` before using a Next.js API.
- Code rules (see `site/README.md`): text lives in `src/content/`, design in `src/components/`, brand tokens in `src/app/globals.css`. Pages only arrange sections. Server components by default, `"use client"` only when the browser is needed.
- CMS (planned): **Sanity**, so teammates edit text, team profiles, projects and landing pages without code. `src/content/` files are shaped like the future Sanity documents.
- Brand: pink `#FF2E93`, white, ink `#171717`. Fonts Outfit (headings), Inter (body), Caveat (handwriting). Logo is the "Idea Agency" wordmark with a 3-ray spark over the "a".
- Automation: Make.com (n8n is the alternative). AI: Gemini API, free tier (decision 12). CRM: Google Sheets. Dashboard: Looker Studio.

## Open decisions (ask before assuming)

- Final brand kit from the content teammate (current direction above is from the design concept)
- Team sign-off on: our own form (replaces Tally), email field in step 2 (see docs/decisions.md)
- Hosting: Vercel Pro, Netlify or Railway (Vercel free plan does not allow commercial use)
- WhatsApp number, agency email, domain
- Real team photos and names for the trust section

## Writing style for all copy and docs

- No em dashes or en dashes. Use commas, colons or full stops
- US spelling
- Short sentences, plain words, sounds human not AI written
