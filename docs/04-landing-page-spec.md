# 04 Landing page spec

One page, one goal: request the free diagnostic. Paid traffic lands here (course rule: paid in = landing page, organic in = website). No menu, no links out except WhatsApp and privacy.

## Sections with example copy (draft, the funnel teammate finalizes wording)

**1. Hero (above the fold: headline, subheadline, one trust signal, visual, CTA)**
- Headline: "Find out which part of your marketing brings customers, before you spend another pound."
- Subheadline (12 to 18 words, one number, adds how or who-for): "A free 20-minute marketing diagnostic for Cairo businesses, with a 1-page action plan in 48 hours."
- CTA button: **Book my free diagnostic**
- Floating WhatsApp button

**2. Problem**
"You boost posts, pay a freelancer, try a new ad every month. Some months sales go up, some months they do not, and you do not know why."

**3. How it works (StoryBrand 3-step plan)**
1. Fill the short form (1 minute)
2. We call you for 20 minutes and look at your page, ads and numbers
3. You get a 1-page plan: what is working, what is wasting money, what to do in the next 30 days

**4. What you get (value stack)**
- A review of your social media pages and ads
- The 3 biggest places you are losing money or customers
- A 30-day action plan you can follow yourself or with anyone
- Free, no obligation

**5. Why trust us**
The team, DEPI training, a picture of a sample 1-page plan. Real reviews only if we have them. Team photo if available.

**6. FAQ**
- Is it really free? Yes.
- Do I have to hire you after? No, the plan is yours.
- Who is it for? Businesses already spending on marketing.
- What happens to my data? Link to privacy note.

**7. Closing CTA + form**
Tally two-step form (see docs/03-system-spec.md), risk reversal line, privacy link, WhatsApp opt-in tick box.

**Thank-you page:** "Thanks [name]. We will contact you on WhatsApp within [X] hours. Want to pick a time now?" + booking link + what the diagnostic covers.

## Course rules for the page (Sessions 17 and 18)

- 7-section skeleton: Hero, Social proof, Problem, Solution, Features, Testimonials, Closing CTA (+ FAQ or risk reversal)
- 5 elements above the fold: headline, subheadline, one trust signal, hero image or video, primary CTA
- Headline formulas: Problem to Solution; Big Promise "[Outcome] in [timeframe], even if [objection]"; Social Proof; Question + Answer; or "[Outcome] for [Audience] [Differentiator]". Clear beats clever. Must pass the 5-second test
- Message match: the headline uses the same words as the ads
- Benefits over features ("so you can...")
- One primary CTA repeated 3 to 5 times with identical wording; placements: above the fold, after the hero, after benefits, after proof, bottom, sticky on mobile. Secondary actions as quiet text links
- Egypt trust elements: WhatsApp button, founder/team photo, reviews (only real), SSL. (COD and money-back do not apply to a free service; use "free, no obligation" as risk reversal)
- Friction: short forms. Cut "how did you hear about us", UTMs answer that
- Mistakes to avoid: auto-rotating carousels, equal-weight CTAs, autoplay video, fake stock photos, walls of text
- Mobile: 44px tap targets, 16px minimum body text, stacked layout
- Speed: first paint under 2s on 3G, page under 1.5MB, LCP under 3s, hero under 200KB WebP, PageSpeed mobile 80+
- Wireframe in Figma at 390x844 (mobile) and 1440x900 (desktop)
- Arabic: dir="rtl", Cairo / Tajawal / IBM Plex Sans Arabic, a separate page per language
- Publishing checks: HTTPS, custom domain if possible, title, favicon, OG image, 404 page, test on a real phone
- Every page fires: PageView + UTM capture, Lead on submit, custom click events for WhatsApp/phone, and a test lead is verified before any traffic

## Design direction (until the brand kit arrives)

- Fonts: Cairo (Arabic) + Inter (English), the course's "Bilingual Egypt" pair
- 5-color palette roles: Primary, Secondary, Neutral light, Neutral dark, Accent; 60-30-10 rule; text contrast 4.5:1 minimum
- Clean, confident, consultative (Sage archetype fits a diagnostic offer). Real photos over stock
- Type scale: H1 32 to 44, H2 20 to 28, body 16, caption 12

## Audit the page will be graded with (10 points, 0 to 2 each)

Headline match, single CTA, social proof above the fold, mobile speed, friction count, trust elements, WhatsApp, form fields, plus two service-page points (clear "what you get", privacy/consent). Keep a Conversion Baseline note: 5-second test result, mobile score, hero copy, CTA, expected weekly visitors.
