// Renders every social media image to marketing/social/assets/.
// Run: npm run images   (uses the installed Chrome, no download)
import { chromium } from "playwright-core";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { colors, logo, mark, spark, laptop, planCard, page, nb } from "./brand.mjs";

const outDir = fileURLToPath(new URL("../social/assets/", import.meta.url));
const chromePath = process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe";

const cta = "عايز أعرف إيه اللي شغال";

// ---------- Profile pictures (1080 x 1080, safe inside the circle crop) ----------

const profile = (bg, stem, rays) => ({
  width: 1080,
  height: 1080,
  html: `<div style="width:100%;height:100%;background:${bg};display:grid;place-items:center">
    <div style="transform:translate(-50px,10px)">${mark({ size: 800, bg: null, stem, rays })}</div></div>`,
});

// ---------- Covers ----------

const facebookCover = {
  // Desktop shows the middle 1640 x 624 band, mobile crops the sides. Keep text in the center.
  width: 1640,
  height: 856,
  html: `<div style="position:relative;width:100%;height:100%;background:#fff;overflow:hidden">
    <div class="blob" style="width:900px;height:820px;right:-260px;top:-300px;opacity:.55"></div>
    <div class="blob" style="width:380px;height:340px;left:-120px;bottom:-140px;opacity:.7"></div>
    <div style="position:absolute;left:300px;top:190px">${laptop({ scale: 0.95 })}</div>
    <div class="ar" style="position:absolute;right:300px;top:220px;width:560px;text-align:right">
      <p class="eyebrow ar" style="font-size:22px">Digital Marketing Agency</p>
      <h1 style="margin-top:14px;font-size:62px;line-height:1.25;font-weight:800">حوّل فكرتك<br><span class="pink">لـ${nb}Growth حقيقي</span></h1>
      <p style="margin-top:18px;font-size:25px;line-height:1.6;color:${colors.muted}">من الـ${nb}Strategy لحد نتيجة تقدر تقيسها</p>
      <div style="margin-top:26px">${logo({ size: 38 })}</div>
    </div>
  </div>`,
};

const linkedinCompany = {
  // LinkedIn page cover 1128 x 191 (rendered at 2x). The logo covers the bottom left.
  width: 1128,
  height: 191,
  scale: 2,
  html: `<div style="position:relative;width:100%;height:100%;background:${colors.ink};overflow:hidden">
    <div style="position:absolute;width:420px;height:420px;border-radius:50%;background:${colors.brand};opacity:.16;right:-90px;top:-150px"></div>
    ${spark({ size: 60, style: "position:absolute;right:58px;top:28px" })}
    <div style="position:absolute;left:330px;top:50%;transform:translateY(-50%)">
      <p class="display" style="color:#fff;font-size:34px;font-weight:700;line-height:1.15">From marketing strategy<br>to <span class="pink">measurable action</span></p>
    </div>
    <div style="position:absolute;right:150px;bottom:30px">${logo({ size: 24, color: "#fff" })}</div>
  </div>`,
};

const linkedinPersonal = {
  // For each teammate's personal profile, 1584 x 396. Profile photo covers the bottom left.
  width: 1584,
  height: 396,
  html: `<div style="position:relative;width:100%;height:100%;background:#fff;overflow:hidden">
    <div class="blob" style="width:760px;height:640px;right:-200px;top:-240px"></div>
    ${spark({ size: 90, style: "position:absolute;right:120px;top:60px" })}
    <div style="position:absolute;left:520px;top:50%;transform:translateY(-50%)">
      <p class="eyebrow display" style="font-size:16px">Team member at</p>
      <div style="margin-top:12px">${logo({ size: 64 })}</div>
      <p class="display" style="margin-top:18px;font-size:28px;font-weight:600">From marketing strategy to <span class="pink">measurable action</span></p>
    </div>
  </div>`,
};

// ---------- Instagram story highlight covers (1080 x 1920, icon in the center circle) ----------

const icons = {
  diagnostic: `<circle cx="44" cy="44" r="26"/><path d="M63 63 L84 84"/><path d="M32 46 l8 8 l16 -18"/>`,
  services: `<rect x="12" y="12" width="32" height="32" rx="8"/><rect x="56" y="12" width="32" height="32" rx="8"/><rect x="12" y="56" width="32" height="32" rx="8"/><rect x="56" y="56" width="32" height="32" rx="16"/>`,
  steps: `<path d="M12 80 h24 v-22 h24 v-22 h28"/><path d="M76 24 l12 12 l-12 12"/>`,
  faq: `<circle cx="50" cy="50" r="38"/><path d="M38 40 a12 12 0 1 1 18 10 c-4 3 -6 5 -6 10"/><circle cx="50" cy="72" r="2" fill="#fff"/>`,
  team: `<circle cx="34" cy="36" r="13"/><circle cx="68" cy="36" r="13"/><path d="M12 82 c0 -16 10 -24 22 -24 s22 8 22 24"/><path d="M50 82 c0 -16 8 -24 18 -24 s20 8 20 24"/>`,
};
const highlight = (name) => ({
  width: 1080,
  height: 1920,
  html: `<div style="width:100%;height:100%;background:${colors.brand};display:grid;place-items:center">
    <svg viewBox="0 0 100 100" width="420" height="420" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round">${icons[name]}</svg>
  </div>`,
});

// ---------- Pinned posts (1080 x 1350, 4:5) ----------

const postFrame = (inner, bg = "#fff") => `<div class="ar" style="position:relative;width:100%;height:100%;background:${bg};overflow:hidden;padding:96px 88px">
  ${inner}
  <div style="position:absolute;left:88px;bottom:72px">${logo({ size: 40, color: bg === colors.ink ? "#fff" : colors.ink })}</div>
</div>`;

const postIntro = {
  width: 1080,
  height: 1350,
  html: postFrame(`
    <div class="blob" style="width:720px;height:640px;left:-220px;top:520px"></div>
    <p class="eyebrow ar" style="font-size:30px">إحنا Idea Agency</p>
    <h1 style="margin-top:22px;font-size:100px;line-height:1.2;font-weight:900">حوّل فكرتك<br><span class="pink">لـ${nb}Growth حقيقي</span></h1>
    <p style="margin-top:28px;font-size:36px;line-height:1.6;color:${colors.muted};max-width:820px">بنساعدك تكبّر البيزنس بتاعك أونلاين بـ${nb}Strategy واضحة، وقرارات مبنية على الأرقام.</p>
    <div style="position:relative;margin-top:56px;display:grid;gap:22px">
      ${["Marketing Strategy", `Ads و${nb}Content`, `Websites و${nb}Landing Pages`]
        .map(
          (s) => `<div class="card" style="display:flex;align-items:center;gap:22px;padding:24px 30px;width:fit-content">
          ${spark({ size: 40 })}<span style="font-size:36px;font-weight:700">${s}</span></div>`
        )
        .join("")}
    </div>`),
};

const postOffer = {
  width: 1080,
  height: 1350,
  html: postFrame(`
    <p class="eyebrow ar" style="font-size:30px">كشف تسويقي ببلاش</p>
    <h1 style="margin-top:20px;font-size:76px;line-height:1.3;font-weight:900">بتصرف على الإعلانات، بس <span class="pink">مش عارف إيه اللي بيجيبلك عملاء؟</span></h1>
    <div style="margin-top:72px;display:flex;gap:36px;align-items:flex-start">
      <ul style="list-style:none;display:grid;gap:26px;flex:1;padding-top:16px">
        ${[`Call ببلاش لمدة 20 دقيقة`, `Plan واضحة في صفحة واحدة`, `الـ${nb}Plan توصلك خلال 48 ساعة`]
          .map(
            (h) => `<li style="display:flex;gap:16px;align-items:center;font-size:30px;font-weight:700;white-space:nowrap">
            <span style="display:grid;place-items:center;width:52px;height:52px;border-radius:50%;background:${colors.brandSoft};color:${colors.brand};flex-shrink:0;font-size:30px">✓</span>${h}</li>`
          )
          .join("")}
      </ul>
      <div style="position:relative;width:360px;flex-shrink:0;margin-top:10px">
        <div class="blob" style="inset:-30px"></div>
        <div style="position:relative">${planCard({
          title: `الـ${nb}Plan بتاعتك`,
          rows: ["إيه اللي شغال", "فلوسك بتروح فين", "أولوياتك في 30 يوم"],
          footer: "توصلك خلال 48 ساعة",
          width: 360,
        })}</div>
      </div>
    </div>
    <div style="position:absolute;right:88px;bottom:72px" class="btn"><span style="font-size:36px;padding:22px 44px">${cta}</span></div>
  `),
};

const postSteps = {
  width: 1080,
  height: 1350,
  html: postFrame(`
    <p class="eyebrow ar" style="font-size:30px">إزاي بنشتغل</p>
    <h1 style="margin-top:20px;font-size:84px;line-height:1.25;font-weight:900">3 خطوات بسيطة<br><span class="pink">عشان تعرف تبدأ منين</span></h1>
    <div style="margin-top:64px;display:grid;gap:30px">
      ${[
        ["احكيلنا عن البيزنس بتاعك", "الفورم بياخد دقيقة."],
        ["Call لمدة 20 دقيقة", `نبص سوا على الـ${nb}Pages والـ${nb}Ads والأرقام.`],
        ["تستلم Plan واضحة", "أهم 3 حاجات محتاجة تتصلح، وتعمل إيه في الـ30 يوم الجايين."],
      ]
        .map(
          ([t, d], i) => `<div class="card" style="display:flex;gap:28px;align-items:center;padding:30px 34px">
          <span class="display" style="display:grid;place-items:center;flex-shrink:0;width:84px;height:84px;border-radius:50%;background:${colors.brand};color:#fff;font-size:44px;font-weight:800">${i + 1}</span>
          <div><p style="font-size:40px;font-weight:800">${t}</p><p style="margin-top:4px;font-size:29px;color:${colors.muted}">${d}</p></div></div>`
        )
        .join("")}
    </div>
    <p style="position:absolute;right:88px;bottom:80px;font-size:28px;font-weight:700;color:${colors.brand}">ببلاش ومن غير أي التزام</p>
  `, colors.brandTint),
};

const assets = {
  "profile-ink": profile(colors.ink, "#fff", colors.brand),
  "profile-pink": profile(colors.brand, "#fff", colors.ink),
  "profile-white": profile("#fff", colors.ink, colors.brand),
  "facebook-cover": facebookCover,
  "linkedin-company-cover": linkedinCompany,
  "linkedin-personal-banner": linkedinPersonal,
  "post-1-intro": postIntro,
  "post-2-offer": postOffer,
  "post-3-steps": postSteps,
  ...Object.fromEntries(Object.keys(icons).map((n) => [`highlight-${n}`, highlight(n)])),
};

const only = process.argv.slice(2);
await mkdir(outDir, { recursive: true });
const browser = await chromium.launch({ executablePath: chromePath });
for (const [name, a] of Object.entries(assets)) {
  if (only.length && !only.includes(name)) continue;
  const p = await browser.newPage({ viewport: { width: a.width, height: a.height }, deviceScaleFactor: a.scale ?? 1 });
  await p.setContent(page(a.html, a), { waitUntil: "networkidle" });
  await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path: `${outDir}${name}.png` });
  await p.close();
  console.log("rendered", name);
}
await browser.close();
