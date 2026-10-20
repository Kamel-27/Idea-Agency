# Idea Agency website

The agency website and its landing pages. Built with **Next.js 16**, **React 19**, **TypeScript** and **Tailwind CSS 4**.

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

## Folder map

```
site/src
├── app/                    ROUTES: every folder here is a URL
│   ├── layout.tsx          root layout: fonts, page title, <html> and <body>
│   ├── globals.css         design tokens (colors, fonts, shadows)
│   ├── icon.svg            the favicon
│   └── (site)/             normal pages, with header and footer
│       ├── layout.tsx      adds Header + Footer
│       └── page.tsx        home page "/"
│
├── components/             UI: how things look
│   ├── ui/                 small building blocks: Button, Container, Eyebrow
│   ├── brand/              Logo and Spark
│   ├── icons/              social media icons
│   ├── layout/             Header, SiteNav (menu), Footer
│   └── sections/home/      the home page sections: Hero, Services, DiagnosticCta
│
└── content/                TEXT: what things say
    ├── types.ts            shapes of the content (NavLink, Service)
    ├── site.ts             site name, menu, main button
    └── home.ts             home page text
```

## The 3 rules this code follows

**1. Content is separate from design.**
Text lives in `content/`. Components only decide how text looks. To change a headline you edit `content/home.ts` and never touch a component. Later, Sanity (the CMS) replaces these files, and the components do not change.

**2. Pages only arrange sections.**
`app/(site)/page.tsx` is a short list: `<Hero />`, `<Services />`, `<DiagnosticCta />`. To reorder the home page, reorder those lines.

**3. The brand is defined once.**
Colors, fonts and shadows are tokens in `globals.css`. Components use them through Tailwind classes such as `bg-brand`, `text-muted`, `shadow-card`. Never write `#FF2E93` inside a component.

## How a page is put together

```
URL "/"
 └─ app/layout.tsx            fonts + <html>
     └─ app/(site)/layout.tsx  Header + Footer
         └─ app/(site)/page.tsx
             ├─ Hero           reads content/home.ts → hero
             ├─ Services       reads content/home.ts → services
             └─ DiagnosticCta  reads content/home.ts → diagnosticCta
```

`(site)` is a **route group**. The brackets mean it does not appear in the URL. It exists so normal pages share the header and footer, while ad landing pages (a future `(landing)` group) get no menu. A landing page must have one goal and no links out.

## Server and client components

By default every component runs on the **server**: it becomes plain HTML, ships no JavaScript and loads fast.

A file that starts with `"use client"` runs in the **browser** too. Only use it when the component needs the browser, for example clicks, state or the current URL. Right now only `SiteNav.tsx` needs this, for the mobile menu and the active link.

## Common tasks

**Change text:** edit the matching file in `content/`.

**Change a brand color:** edit the token in `app/globals.css`.

**Add a section to the home page:**
1. Add its text to `content/home.ts`
2. Create `components/sections/home/MySection.tsx` that reads it
3. Add `<MySection />` in `app/(site)/page.tsx`

**Add a page, e.g. `/services`:** create `app/(site)/services/page.tsx`. It gets the header and footer automatically.

## Design tokens

| Token | Value | Tailwind class |
| --- | --- | --- |
| `brand` | `#FF2E93` | `bg-brand`, `text-brand`, `border-brand` |
| `brand-soft` | `#FFE3F0` | pink background for blobs and badges |
| `brand-tint` | `#FFF3F8` | very light pink for section backgrounds |
| `ink` | `#171717` | main text, dark banner |
| `muted` | `#5B5B66` | secondary text |
| `line` | `#EEEEF2` | borders |

Fonts: **Outfit** for headings (`font-display`), **Inter** for body text (`font-sans`), **Caveat** for handwriting (`font-script`).

## What is next

1. **Sanity CMS**: teammates edit text, team profiles and projects without code. Needs a free Sanity account first.
2. **Landing page system**: a `(landing)` route group plus reusable blocks, starting with the free diagnostic page.
3. **More pages**: Services, Portfolio, Team, Contact. Menu links to them show a 404 until they exist.
