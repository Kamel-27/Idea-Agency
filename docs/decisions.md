# Decisions log

Every important choice, with the reason. Newest at the bottom. If a decision changes, add a new entry instead of editing the old one.

## 1. Build a real website, not a single HTML page
**Date:** Oct 20, 2026
**Decision:** The site is the agency's real website, with a landing page system inside it.
**Why:** The agency is real and will launch. It needs service pages, a portfolio for each team member and a way to make new landing pages per offer. A single HTML page cannot grow into that.

## 2. Next.js for the website
**Date:** Oct 20, 2026
**Decision:** Next.js 16 with React, TypeScript and Tailwind CSS.
**Why:** It handles static marketing pages (fast, good for PageSpeed) and server code (form handling, CMS) in one project. Kamel already works with React. Astro was faster for pure static pages, but it needed more glue for CMS editing and forms.

## 3. Sanity as the CMS
**Date:** Oct 20, 2026
**Decision:** Sanity, set up after the Oct 30 submission.
**Why:** Sanity hosts the content, so there is no database or CMS server to run. Its editor is the easiest for non-coders. Payload gives stricter per-person permissions, but the team does not need that. Until Sanity is set up, text lives in `site/src/content/`, already shaped like Sanity documents.

## 4. Landing pages built from blocks, Framer as the design lab
**Date:** Oct 20, 2026
**Decision:** Landing pages are built from ready sections with several design variants. New designs are tried in Framer first, then turned into new blocks.
**Why:** Blocks keep every page on brand and connected to tracking and the CRM, and they enforce the course rules (one CTA, no menu, fast). Framer keeps design freedom for experiments.

## 5. Claude API instead of Gemini (pending team agreement)
**Date:** Oct 20, 2026
**Decision:** Use the Claude API for lead rating, summaries and replies.
**Why:** The Max plan includes $100 of API credits each month, enough for thousands of leads. Make.com has a built-in Claude module. The frozen spec says Gemini, so the team must agree first.

## 6. Brand direction
**Date:** Oct 20, 2026
**Decision:** Hot pink `#FF2E93`, white and ink `#171717`. Outfit for headings, Inter for body, Caveat for handwriting. Wordmark logo with a 3-ray spark over the "a".
**Why:** Bold, modern and confident, from the design concept the team liked. The final brand kit may refine it.

## 7. Funnel first, portfolio later
**Date:** Oct 20, 2026
**Decision:** Build the diagnostic landing page, Make flows, CRM, tracking and dashboard before Oct 30. Sanity, portfolios and blog come after.
**Why:** The graduation grade is about the lead generation system. The rest matters for the agency but not for the grade.

## 8. Our own form instead of Tally
**Date:** Oct 20, 2026
**Decision:** The lead form is built in Next.js and sends leads to Make.com through a Server Action.
**Why:** It matches the brand, works in Arabic and English, and has no iframe, so tracking `form_step2` and `generate_lead` is simple and reliable. The Make webhook address stays secret on the server. Changes the frozen spec, so the team must agree.

## 9. Email added to step 2 of the form
**Date:** Oct 20, 2026
**Decision:** Step 2 asks for an email address.
**Why:** Flow A sends an email reply and follow-ups, but the frozen form had no email field. Step 1 stays at 3 fields (name, WhatsApp, business), as the course recommends.

## 10. English and Arabic landing pages from day one
**Date:** Oct 20, 2026
**Decision:** `/diagnostic` (English) and `/ar/diagnostic` (Arabic, right-to-left) share one design and differ only in their content files.
**Why:** Cairo SME owners often prefer Arabic, while some ads may run in English. Each language gets its own page, as the course requires, and the CRM receives the same answer codes from both.

## 11. Logo and footer link back to the website on landing pages
**Date:** Oct 21, 2026
**Decision:** On landing pages, the logo and a footer link ("Visit our website") open the home page. There is still no menu.
**Why:** Some visitors want to check who we are before they leave their details, and a real agency site builds trust. The two links are quiet (no button style), so the free diagnostic stays the only clear action. This is a small exception to the course's "no links out" rule; we track it and can remove it if it lowers conversions.

## 12. Gemini API instead of Claude
**Date:** Oct 21, 2026
**Decision:** Make.com uses the Gemini API (free tier) for the challenge rating, summary and replies. This replaces decision 5.
**Why:** Team choice. Gemini matches the original frozen spec and its free tier is enough for the project. The privacy note names Google Gemini.

## 13. Arabic copy rewritten in natural Egyptian Arabic
**Date:** Oct 21, 2026
**Decision:** The Arabic landing page was rewritten, not translated. The offer is called «مراجعة تسويقية مجانية» and the Arabic CTA is «عايز أعرف إيه اللي شغال». The hero gets 3 short points (20-minute call, 1-page plan, 48 hours) in both languages.
**Why:** The first Arabic draft read like English marketing copy in Egyptian words. The new copy speaks to the owner's real worry ("I spend on ads, but are they bringing customers?"), sells clarity instead of promises, and is honest that we are new. The CTA is in the owner's own voice; since it does not say "free", a "free, no obligation" line sits near the buttons.

## 14. «كشف تسويقي ببلاش», more English words, no city names
**Date:** Oct 21, 2026
**Decision:** In Arabic the free offer is «كشف تسويقي ببلاش» (like a doctor's check-up), replacing «مراجعة تسويقية مجانية». Arabic copy mixes in the English marketing words owners really use (Ads, Plan, Budget, Strategy). No page mentions Cairo or Egypt.
**Why:** «مراجعة تسويقية مجانية» was accurate but did not make people feel anything; «كشف» is instantly clear and matches the English "diagnostic". Egyptian business owners speak this mixed way. The offer works for any business, so naming a city only narrows it.

## 15. Arabic home page and a language switch in the website header
**Date:** Oct 21, 2026
**Decision:** The home page exists in Arabic at `/ar`, built from the same components as `/`. The website header has an English / العربية switch with a short (0.6 second) loading screen, like landing pages. The header keeps the English layout (logo on the left) in Arabic, while the Arabic menu items read right to left.
**Why:** Visitors should be able to read the whole site in their language. The fixed header layout keeps the brand consistent across languages.
