# Social media pages: setup kit

Everything to open the agency pages so they look like the website: same pink `#FF2E93`, ink `#171717`, Outfit and Cairo fonts, the spark logo and the hero laptop. All images are in [assets/](assets/). To change one, edit `marketing/tools/render-images.mjs` and run `npm run images` in `marketing/tools`.

## Which pages and why

| Platform | Role in the funnel | Language | Priority |
| --- | --- | --- | --- |
| Facebook page | Ads account home, Messenger, retargeting audiences (page engagers) | Arabic | Launch now |
| Instagram | Reels (awareness), stories, link in bio | Arabic | Launch now |
| LinkedIn company page | Persona 2 (marketing managers), trust for team profiles | English | Launch now |
| TikTok | Organic awareness reach for Reels | Arabic | Reserve the handle, post later (no UTM source yet) |

Handle: use the same one everywhere, for example `@ideaagency.eg` or `@idea.agency` (check what is free, then put it in `docs/decisions.md`).

## Images

| File | Size | Use |
| --- | --- | --- |
| `profile-ink.png` | 1080 x 1080 | **Main profile picture** on every platform (circle safe) |
| `profile-pink.png`, `profile-white.png` | 1080 x 1080 | Alternatives (events, dark mode, campaigns) |
| `facebook-cover.png` | 1640 x 856 | Facebook cover. Text sits in the center so desktop and mobile crops both work |
| `linkedin-company-cover.png` | 2256 x 382 (1128 x 191 at 2x) | LinkedIn company page cover |
| `linkedin-personal-banner.png` | 1584 x 396 | Each teammate's personal LinkedIn banner ("Team member at Idea Agency") |
| `post-1-intro.png`, `post-2-offer.png`, `post-3-steps.png` | 1080 x 1350 (4:5) | The 3 pinned posts on Instagram and Facebook: who we are, the offer, how it works |
| `highlight-*.png` | 1080 x 1920 | Instagram story highlight covers: diagnostic, services, steps, FAQ, team |

## Bios (copy and paste)

**Instagram (Arabic, 150 characters max)**
```
Digital Marketing Agency ✦
من الـ Strategy لحد نتيجة تقدر تقيسها
كشف تسويقي ببلاش للبيزنس بتاعك 👇
```
Link in bio: `https://<domain>/ar/diagnostic?utm_source=meta&utm_medium=social&utm_campaign=leads_cairosme_2026-10&utm_content=ig_bio`

**Facebook page**
- Name: Idea Agency
- Category: Marketing Agency
- Intro: `بنساعدك تكبّر البيزنس بتاعك أونلاين بـ Strategy واضحة، وقرارات مبنية على الأرقام، و Content بيوصل للناس الصح. ابدأ بكشف تسويقي ببلاش.`
- Action button: "Sign up" or "Learn more", link `.../ar/diagnostic?utm_source=meta&utm_medium=social&utm_campaign=leads_cairosme_2026-10&utm_content=fb_button`
- Messenger greeting: `أهلًا بيك في Idea Agency! لو حابب تعرف إيه اللي شغال في التسويق بتاعك، اعمل الكشف التسويقي ببلاش من هنا: <link>`

**LinkedIn company page (English)**
- Tagline: `From marketing strategy to measurable action.`
- About: `Idea Agency is a digital marketing and web agency for small and medium businesses. We combine clear strategy, data-driven decisions and content that connects. Start with a free marketing diagnostic: a 20-minute call and a 1-page plan within 48 hours.`
- Button: Visit website, `.../diagnostic?utm_source=linkedin&utm_medium=social&utm_campaign=leads_cairosme_2026-10&utm_content=li_page`

**TikTok (when we start)**: same bio as Instagram, profile picture `profile-ink.png`.

## Setup checklist

1. Create the pages from the **agency Google account** (decision 16), not personal accounts. Add every teammate as admin.
2. Upload the profile picture and covers. Check on a phone that nothing important is cropped.
3. Paste the bios and links (with UTMs, so the dashboard knows the source).
4. Post the 3 pinned posts in this order: offer, steps, intro (Instagram shows the newest first), then pin them.
5. Upload the highlight covers with one story each: diagnostic, services, steps, FAQ, team.
6. Connect Instagram to the Facebook page in Meta Business Suite, so one Pixel and one ad account cover both.
7. Turn on the Messenger and Instagram DM auto-reply with the diagnostic link.
8. Every teammate adds `linkedin-personal-banner.png` and "Idea Agency" as their current position.

Honesty check before posting: no follower counts, reviews, client logos or results we do not have.
