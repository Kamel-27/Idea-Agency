# Funnel videos (Egyptian Arabic, motion graphics, voiceover)

Three 9:16 videos, one per funnel stage (Session 10: 3-stage video funnel). They are made from code, so every change is a text edit and a re-render, and they always use the website's colors, fonts and logo.

| Video | Stage | Length | Hook pattern | CTA | Ad `utm_content` |
| --- | --- | --- | --- | --- | --- |
| `video-1-awareness.mp4` | Awareness, cold | ~32s | Negation | Follow only | `video_negation_v1` |
| `video-2-consideration.mp4` | Consideration, warm | ~63s | Number | Soft: save + link in bio | `video_number_v1` |
| `video-3-conversion.mp4` | Decision, hot | ~40s | Direct Address | Hard: «عايز أعرف إيه اللي شغال» | `video_offer_v1` |

Each video in [output/](output/) comes with:
- `*.mp4`: 1080 x 1920, 30fps, H.264 + AAC. Ready for Reels, Stories, TikTok and Meta ads
- `*-cover.jpg`: a frame from the hook, for the Reel cover
- `*.srt`: the captions as a subtitle file (captions are also burned in, because most people watch muted)

## Storyboard

The scripts live in [scripts.mjs](scripts.mjs): what the voice says, what the captions show, and which motion layout each scene uses.

**Video 1, awareness: "Do not boost your next post before you see this"** (HMPC, no sales CTA)
1. Hook: «متعملش Boost لبوستك الجاي» pops in with the spark.
2. A sponsored post card. A hand taps "Boost post" three times while a spend counter rises (labeled example).
3. Three metric cards: Likes go up, messages stay low, sales stay flat.
4. Reframe: «المشكلة مش في الإعلان». Boost brings engagement, an ad with one goal brings customers.
5. What an ad that sells has: one goal, a clear offer, an easy way to reach you.
6. Logo end card: «تابعنا».

**Video 2, consideration: "3 numbers to check every week"** (PAS, soft CTA)
1. Hook: «3 أرقام لازم تبصلها كل أسبوع».
2. Problem: Likes and Reach are not Sales.
3. Number 1: cost per message (spend ÷ messages, with a labeled example).
4. Number 2: how many messages became sales (10 chat icons, 2 turn into carts).
5. Number 3: reply speed (a chat waits 3 hours, the customer buys elsewhere).
6. Agitate: «مش شايف الأرقام؟ يبقى بتصرف وانت مغمّض».
7. Solution: the free diagnostic and the 1-page plan. «احفظ الفيديو», link in bio.
8. Logo end card.

**Video 3, decision: "The free marketing diagnostic"** (HVPC, hard CTA)
1. Hook: «بتصرف على الـ Ads ومش عارف إيه اللي شغال؟»
2. Value: «كشف تسويقي ببلاش», 20-minute call, we look at your pages, ads and numbers.
3. The 1-page plan within 48 hours.
4. Honest proof: we are a new team, no promised numbers. Free, no obligation, the plan is yours.
5. CTA: the two-step form fills in, the hand taps «عايز أعرف إيه اللي شغال».
6. End card with the CTA button.

## The voice

The voiceover is Microsoft's Egyptian Arabic neural voices (`ar-EG-ShakirNeural` for videos 1 and 3, `ar-EG-SalmaNeural` for video 2) through the free `edge-tts` tool. It is an AI voice. For the real launch, a teammate can record the same lines on a phone (window light, quiet room, Session 11 audio checklist) and we swap the audio. A real Egyptian voice will build more trust.

Background music is not included: add a royalty-free track in CapCut at about 15% volume under the voice.

## Change or re-render

```bash
cd marketing/tools
npm install
pip install edge-tts
npm run videos -- --stills          # quick: one PNG per scene in tools/build/
npm run videos                      # all three MP4s
npm run videos -- video-3-conversion  # just one
```

Edit text in `scripts.mjs`, layouts in `tools/scenes.mjs`, colors and logo in `tools/brand.mjs`. Keep `say` (spelled for the voice, English words in Arabic letters) and `caption` (what people read) saying the same thing. Uses the installed Chrome; set `CHROME_PATH` if it lives somewhere else.
