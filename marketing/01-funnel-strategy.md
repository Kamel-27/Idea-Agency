# 01 Full-funnel social media strategy

How a business owner who has never heard of us becomes a booked free diagnostic, and then a client. Every stage has one job, one kind of content, one CTA and one number we watch.

Frameworks used (by course name): 5-stage Customer Decision Journey (S1), StoryBrand with the customer as hero (S7), 4 content pillars (S6), PAS, AIDA and HVPC (S5), 3-stage video funnel and HMPC (S10), offer by temperature (S14), platform jobs, cold / warm / hot routing and retargeting tiers (S20), AARRR (S19), UTM dictionary (S16).

## Funnel brief (Session 19 template)

> My funnel takes **Meta (Facebook + Instagram) and LinkedIn traffic** to the **free diagnostic landing page** (`/ar/diagnostic`, `/diagnostic`) and converts on the **two-step form** (`generate_lead`). The biggest expected leak is **cold viewers who do not know us yet and do not trust a new agency**. The first fix is **awareness videos that teach something useful with no ask, then retargeting the people who watched with the offer**.

## The journey at a glance

| Stage (CDJ) | Temperature | What the owner thinks | Our job | Content | CTA | Platform job (S20) | KPI |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Awareness | Cold | "I boost posts. Sales are flat. That is just the market." | Name the problem. Teach. No ask. | Video 1 (about 30s), Educate posts, carousels | None, or "follow / save" | Meta Reels + Feed (TikTok later) | ThruPlay rate, 3s hook rate, reach |
| Consideration | Warm | "Maybe my money is leaking. How would I check?" | Show how to check, show we think clearly | Video 2 (60 to 90s), checklist carousel, team posts | Soft: "save this" / "see how the diagnostic works" | Meta retargeting of video viewers and page engagers, LinkedIn | Landing page CTR, saves, profile visits |
| Decision | Hot | "Is it really free? Is it for me? Who are they?" | Remove risk, answer objections | Video 3 (30 to 45s), offer post, FAQ story | Hard: «عايز أعرف إيه اللي شغال» | Hot retargeting (landing page visitors who did not submit), Google Search later | Form start rate, `form_step2`, `generate_lead`, CPL |
| Conversion | Lead | "I asked. Will they answer?" | Fast personal reply | Flow A: AI rating, email, WhatsApp link, team alert | Book the 20-minute call | Email + WhatsApp | Time to first reply, call booked rate |
| Post-purchase | Client path | "Was that useful? What next?" | Deliver the 1-page plan, then offer the next step | Flow B day 2 and day 5, the plan PDF | Strategy Blueprint, then Retainer | Email = nurture, WhatsApp = closing | Diagnostic done, proposal sent, won |

Routing rule (S20): cold sees **why this exists**, warm sees **why this is for you**, hot sees **why now**.

## StoryBrand script (the story every post tells)

- **Character:** a business owner who already spends on marketing.
- **Problem:** external, sales are flat while ad spend goes up. Internal, "I do not know what is working, and I feel I am wasting money." Philosophical, an owner should not have to guess where their money goes.
- **Guide (us):** empathy, "we know how it feels to boost a post and hope." Authority, a trained team using a clear, written method. We never claim results we do not have.
- **Plan (3 steps):** tell us about your business (1 minute form), 20-minute call, your 1-page plan within 48 hours.
- **Direct CTA:** «عايز أعرف إيه اللي شغال» / "Book my free diagnostic".
- **Transitional CTA:** save the checklist, follow the page.
- **Success:** you know what works, where the money leaks, and what to do in the next 30 days.
- **Failure (avoid):** another month of boosting and guessing.

The customer is the hero. Captions say "you" more than "we".

## Content pillars (S6) for the agency pages

| Pillar | Share | What it looks like for us | CTA |
| --- | --- | --- | --- |
| Educate | 50% | Why boosting every post wastes money, 3 numbers to check every week, how to read cost per message, landing page vs Facebook page, follow-up speed | Save |
| Convert | 25% | The free diagnostic offer, what the 1-page plan contains, FAQ ("is it really free?") | DM / link |
| Engage | 15% | Polls ("what do you boost more: offers or posts?"), "comment the word KASHF and we send the checklist" | Comment |
| Inspire | 10% | Behind the scenes of the team, why we started, what we learned building our own funnel | Share |

## Hook library (S5, S10). Max 8 words, Egyptian Arabic

| Pattern | Hook |
| --- | --- |
| Negation | متعملش Boost لبوستك الجاي قبل ما تشوف ده |
| Surprising Question | فلوس الإعلانات بتروح فين بالظبط؟ |
| Direct Address | لو بتصرف على Ads وما فيش Sales، اسمعني |
| Number | 3 أرقام لازم تبصلها كل أسبوع |
| Money Reveal | الـ Boost ده ممكن يكون أغلى إعلان عندك |
| Reframe | المشكلة مش في الإعلان، المشكلة بعده |
| Curiosity Gap | الغلطة اللي بتخلي الرسايل ما تتحولش لـ Sales |
| Pattern Break | (Sound of a cash register, then silence) |

Rule: the hook appears on screen in the first 1.5 seconds and is also said in the first sentence of the voiceover.

## The three videos we made

All three are 9:16 (1080 x 1920), Egyptian Arabic voiceover, on-screen captions (most people watch muted), brand colors and fonts from the website. Files and storyboard: [videos/README.md](videos/README.md).

| # | Stage | Length | Formula | Hook | CTA | `utm_content` |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Awareness | about 32s | HMPC, no CTA | Negation: «متعملش Boost لبوستك الجاي قبل ما تشوف ده» | Follow only | `video_negation_v1` |
| 2 | Consideration | about 63s | PAS, soft CTA | Number: «3 أرقام لازم تبصلها كل أسبوع» | Save + "see how the diagnostic works" | `video_number_v1` |
| 3 | Decision | about 40s | HVPC, hard CTA | Direct Address: «بتصرف على الـ Ads ومش عارف إيه اللي شغال؟» | «عايز أعرف إيه اللي شغال» | `video_offer_v1` |

## Paid plan (Meta first)

Budget split from S20: **60% awareness, 30% retargeting, 10% testing**. Example with a 6,000 EGP test month (an assumption, not a fixed budget):

| Campaign | Objective | Audience | Creative | Budget |
| --- | --- | --- | --- | --- |
| A. Awareness | Video views (ThruPlay) | Cold: business owners and page admins, interests in small business, Facebook ads, ecommerce. Age 25 to 55. Arabic | Video 1 + Educate carousels | 3,600 EGP |
| B. Retargeting | Leads (website, `Lead` event) | Warm: 50%+ viewers of Video 1 or 2 (30 days), page engagers (60 days) | Video 2, then Video 3 | 1,800 EGP |
| C. Testing | Leads | One new hook or audience per week (S13 single-variable rule) | Hook variants of Video 3 | 600 EGP |

Rules: kill an ad set after 14 days without improvement, auto-pause at 3x target CPA for 3 days (S4), scale winners 20% a week (S16). Unified landing page while budget is under 10K EGP a month (S20), sources split by UTMs.

### Retargeting tiers (S20) with frequency caps

| Tier | Who | Window | Message | Cap |
| --- | --- | --- | --- | --- |
| 1 Cold-engaged | Watched 50%+ of an awareness video | 30 days | Video 2: how to check your numbers | 2 per week |
| 2 Warm | Video 2 viewers, page and profile engagers | 30 days | Video 3: the free diagnostic | 3 per week |
| 3 Hot | Landing page visitors who did not submit (`PageView` without `Lead`) | 14 days | Objection ads: "really free?", "1-page plan, yours to keep" | 4 per week |
| 4 Leads | Submitted the form | Exclude from all ads | Handled by Flow A and Flow B, not ads | 0 |

Note: Meta needs 1,000+ people for a custom audience (S16). Until then, retarget video viewers only.

## UTM links for every placement

Dictionary from `docs/03-system-spec.md`. Campaign: `leads_cairosme_2026-10`.

| Placement | Link |
| --- | --- |
| Meta ad, Video 1 | `/ar/diagnostic?utm_source=meta&utm_medium=cpc&utm_campaign=leads_cairosme_2026-10&utm_content=video_negation_v1` |
| Meta ad, Video 2 | `...&utm_content=video_number_v1` |
| Meta ad, Video 3 | `...&utm_content=video_offer_v1` |
| Instagram bio | `/ar/diagnostic?utm_source=meta&utm_medium=social&utm_campaign=leads_cairosme_2026-10&utm_content=ig_bio` |
| Facebook page button | `...utm_source=meta&utm_medium=social...&utm_content=fb_button` |
| LinkedIn page | `/diagnostic?utm_source=linkedin&utm_medium=social&utm_campaign=leads_cairosme_2026-10&utm_content=li_page` |
| WhatsApp status | `...utm_source=whatsapp&utm_medium=social...&utm_content=wa_status` |

TikTok is not in the UTM dictionary yet (max 5 sources rule). We made its profile assets, but TikTok links stay off until the team decides on a source name. See the decisions log.

## After the lead: conversion to client

This is where the automation takes over (`automation/`):

1. **Minute 0, Flow A:** the lead gets an AI-personalized email and a WhatsApp link in their language. Hot leads alert the team.
2. **Within 1 working day:** a teammate calls, books the 20-minute diagnostic.
3. **Day 2 and Day 5, Flow B:** follow-ups if there is no reply. After day 5, Nurture.
4. **Within 48h of the call:** the 1-page plan. It is theirs even if they never work with us (reciprocity, not pressure).
5. **Offer ladder (S14):** free diagnostic, then the Strategy Blueprint, then the monthly Retainer. Leads who are not ready stay in Nurture and see Educate content.

Email nurtures, WhatsApp closes (S20).

## Two-week organic calendar (launch)

Post 5 times a week on Facebook + Instagram, 2 times on LinkedIn (English or Arabic). Stories daily.

| Day | Pillar | Format | Topic | CTA |
| --- | --- | --- | --- | --- |
| 1 | Inspire | Post 1 (pinned) | Who we are: "Idea Agency, from strategy to measurable action" | Follow |
| 2 | Convert | Post 2 (pinned) | The free diagnostic: what you get | Link in bio |
| 3 | Educate | Video 1 | Do not boost your next post before you see this | Save |
| 4 | Educate | Post 3 (pinned) | How it works in 3 steps | Link in bio |
| 5 | Engage | Story poll | "What do you boost more: offers or normal posts?" | Vote |
| 8 | Educate | Video 2 | 3 numbers to check every week | Save |
| 9 | Educate | Carousel (to make) | Cost per message: how to read it in Ads Manager | Save |
| 10 | Engage | Post (to make) | "Comment KASHF and we send the weekly checklist" | Comment |
| 11 | Convert | Video 3 | The free diagnostic, hard CTA | Link |
| 12 | Inspire | Post (to make) | Behind the scenes: building our own funnel, honestly | Share |

## KPIs per stage (AARRR, S19)

Five numbers, one dashboard, weekly review.

| Letter | KPI | Target to start (assumption, review after 2 weeks) |
| --- | --- | --- |
| Acquisition | Landing page CTR from ads | 1% or more |
| Activation | Form submit rate (`generate_lead` / `PageView`) | 10% or more |
| Retention | Leads who reply or book within 5 days | 30% or more |
| Revenue | Diagnostic to Strategy Blueprint | Track, no target yet |
| Referral | Diagnostics that come from referrals | Track, no target yet |

Plus for video: 3-second hook rate over 30%, and retention: under 50% means a weak hook, over 70% is strong (S10).

## Honesty rules (from CLAUDE.md, apply to every post)

- No fake testimonials, client logos, ratings, results or follower counts.
- No numbers we cannot source. "A trained team of 5" is true; "100+ clients" is not.
- No city or country names in copy.
- The voiceover in our videos is an AI voice. If a teammate records a real voice later, replace it; real voices build more trust.
