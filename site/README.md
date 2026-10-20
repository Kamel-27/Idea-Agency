# Idea Agency website

The agency website and its landing pages, in English and Arabic. Built with **Next.js 16**, **React 19**, **TypeScript** and **Tailwind CSS 4**.

## Run it

```bash
cd site
npm install
npm run dev
```

Open http://localhost:3000. Pages reload when you save a file.

| Command | What it does |
| --- | --- |
| `npm run dev` | Local development server |
| `npm run build` | Production build. Run it before pushing: it catches type and build errors |
| `npm run lint` | Checks code style and common mistakes |

### Environment variables

Copy `.env.example` to `.env.local`. Without `MAKE_WEBHOOK_URL`, the form still works in development: each lead is printed in the terminal instead of being sent to Make.

## Pages

| URL | What |
| --- | --- |
| `/` | Home page |
| `/diagnostic`, `/ar/diagnostic` | Free diagnostic landing page (ads send people here) |
| `/thank-you`, `/ar/thank-you` | After the form is sent |
| `/privacy`, `/ar/privacy` | Privacy note for the form |

Test the UTM capture with a link like `/diagnostic?utm_source=meta&utm_medium=cpc&utm_campaign=leads_cairosme_2026-10&utm_content=video_negation_v1`.

## Folder map

```
site/src
├── app/                          ROUTES: every folder here is a URL
│   ├── globals.css               design tokens (colors, fonts, shadows)
│   ├── icon.svg                  the favicon
│   ├── global-not-found.tsx      404 page
│   ├── (en)/                     English pages
│   │   ├── layout.tsx            <html lang="en">
│   │   ├── (site)/               website pages, with header and footer
│   │   └── (landing)/            landing pages: no menu, one goal
│   │       ├── diagnostic/  thank-you/  privacy/
│   └── (ar)/                     Arabic pages
│       ├── layout.tsx            <html lang="ar" dir="rtl">
│       └── ar/(landing)/         /ar/diagnostic, /ar/thank-you, /ar/privacy
│
├── components/                   UI: how things look
│   ├── ui/                       Button, Container, Eyebrow, SectionHeading
│   ├── brand/                    Logo and Spark
│   ├── icons/                    social media icons
│   ├── forms/                    form controls: text, select, choice chips, checkbox
│   ├── layout/                   website Header, SiteNav (menu), Footer
│   ├── sections/home/            home page sections
│   └── landing/                  landing pages: shell, DiagnosticPage, LeadForm, ...
│
├── content/                      TEXT: what things say
│   ├── site.ts                   site name, menu, WhatsApp number
│   ├── home.ts                   home page text
│   └── landing/                  landing page text
│       ├── types.ts              the shape every translation must follow
│       ├── diagnostic.en.ts      English diagnostic page
│       ├── diagnostic.ar.ts      Arabic diagnostic page
│       ├── shared.ts             thank-you page, footer, WhatsApp text
│       └── privacy.ts            privacy note
│
└── lib/                          LOGIC: no UI here
    ├── fonts.ts                  all fonts
    ├── whatsapp.ts               builds wa.me links
    ├── leads/
    │   ├── fields.ts             form answer codes (what Make and the CRM receive)
    │   ├── validation.ts         form rules, used by browser AND server
    │   └── submitLead.ts         Server Action: sends the lead to Make
    └── tracking/
        ├── events.ts             tracking events for Google Tag Manager
        └── utm.ts                reads and cleans UTM tags
```

## The rules this code follows

**1. Content is separate from design.**
Text lives in `content/`. Components only decide how text looks. To change a headline you edit a content file and never touch a component. Later, Sanity (the CMS) replaces these files, and the components do not change.

**2. Pages only arrange sections.**
A page file is a short list of sections. To reorder a page, reorder those lines.

**3. The brand is defined once.**
Colors, fonts and shadows are tokens in `globals.css`. Components use them through Tailwind classes such as `bg-brand`, `text-muted`, `shadow-card`. Never write `#FF2E93` inside a component.

**4. Logic lives in `lib/`, not in components.**
Validation, tracking and sending leads are plain TypeScript functions. Components call them. This makes the logic easy to read and to test on its own.

**5. One design, many languages.**
Landing components take their text as a `content` prop. The English and Arabic pages use the same component with different content. `content/landing/types.ts` makes TypeScript complain if a translation is missing a field.

## How a page is put together

```
URL "/diagnostic"
 └─ app/(en)/layout.tsx                    <html lang="en">, fonts
     └─ app/(en)/(landing)/layout.tsx       LandingShell: logo, footer, WhatsApp button
         └─ app/(en)/(landing)/diagnostic/page.tsx
             └─ <DiagnosticPage content={diagnosticEn} />
                 ├─ hero, problem, steps, value, trust, faq
                 └─ <LeadForm />            the only client component on the page
```

Folders in brackets like `(en)` and `(landing)` are **route groups**: they organize files and share layouts, but do not appear in the URL.

**Why two root layouts?** Arabic needs `<html lang="ar" dir="rtl">` and a different font, and only a root layout controls `<html>`. Moving between English and Arabic pages does a full page load. That is fine, since visitors rarely switch.

## How the lead form works

```
Visitor fills step 1 (name, WhatsApp, business)
  → validateLead() in the browser          shows errors right away
  → step 2 opens                           tracking event: form_step2
Visitor fills step 2 and submits
  → submitLead()  Server Action            runs on OUR server, not in the browser
       1. honeypot check (spam)
       2. validateLead() again             never trust the browser
       3. phone → +20 format, UTMs cleaned, missing source → "direct"
       4. POST to MAKE_WEBHOOK_URL         Make scores the lead, saves it, replies
  → tracking event: generate_lead
  → redirect to /thank-you
```

The answer options (role, spend, ...) are sent as fixed codes like `over_20k`, never as the translated words. So Make and the CRM get the same data from both languages.

## Right-to-left (Arabic) tips

- Use **start / end** instead of left / right: `ps-4` not `pl-4`, `end-4` not `right-4`. They flip automatically in Arabic.
- Use `rtl:` for anything that must flip by hand, for example arrows: `rtl:rotate-180`.
- No letter spacing on Arabic text (it breaks the joined letters): add `rtl:tracking-normal`.
- Phone numbers and emails stay left-to-right: `dir="ltr"` on those inputs.
- The logo always stays left-to-right.

## Server and client components

By default every component runs on the **server**: it becomes plain HTML, ships no JavaScript and loads fast.

A file that starts with `"use client"` runs in the **browser** too. Only use it when the component needs the browser: clicks, state, the current URL. Client components here: `SiteNav` (mobile menu), `LeadForm` (the form), `WhatsAppButton` (click tracking).

## Common tasks

**Change text:** edit the matching file in `content/`.

**Change a brand color:** edit the token in `app/globals.css`.

**Set the WhatsApp number:** `whatsappNumber` in `content/site.ts`. The WhatsApp buttons appear once it is set.

**Add a section to the home page:**
1. Add its text to `content/home.ts`
2. Create `components/sections/home/MySection.tsx` that reads it
3. Add `<MySection />` in `app/(en)/(site)/page.tsx`

**Add a website page, e.g. `/services`:** create `app/(en)/(site)/services/page.tsx`. It gets the header and footer automatically.

**Add a new landing page for another offer:** copy `content/landing/diagnostic.en.ts` with new text, then add a route under `app/(en)/(landing)/`. Reusable landing blocks come with Sanity.

## Design tokens

| Token | Value | Tailwind class |
| --- | --- | --- |
| `brand` | `#FF2E93` | `bg-brand`, `text-brand`, `border-brand` |
| `brand-soft` | `#FFE3F0` | pink background for blobs and badges |
| `brand-tint` | `#FFF3F8` | very light pink for section backgrounds |
| `ink` | `#171717` | main text, dark sections |
| `muted` | `#5B5B66` | secondary text |
| `line` | `#EEEEF2` | borders |

Fonts: **Outfit** for headings (`font-display`), **Inter** for body text (`font-sans`), **Caveat** for handwriting (`font-script`). Arabic pages use **Cairo** for all three.

## What is next

1. **Google Tag Manager + consent banner**: the events already go to `dataLayer`, GTM forwards them to GA4 and the Meta Pixel.
2. **Make.com Flow A**: receive the webhook, score with Claude, save to Google Sheets, reply.
3. **Sanity CMS**: teammates edit text, profiles, projects and landing pages without code.
4. **More website pages**: Services, Portfolio, Team, Contact. Menu links to them show the 404 page until they exist.
