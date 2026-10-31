// Brand building blocks shared by the image and video templates.
// Same tokens, fonts and logo as the website (site/src/app/globals.css,
// site/src/components/brand). Change a color here, re-render, done.

export const colors = {
  brand: "#FF2E93",
  brandSoft: "#FFE3F0",
  brandTint: "#FFF3F8",
  ink: "#171717",
  muted: "#5B5B66",
  line: "#EEEEF2",
  white: "#FFFFFF",
};

const fontsHref =
  "https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&family=Caveat:wght@600;700&family=Inter:wght@400;500;600&family=Outfit:wght@300;400;600;700;800&display=block";

export const baseCss = `
  :root {
    --brand: ${colors.brand}; --brand-soft: ${colors.brandSoft}; --brand-tint: ${colors.brandTint};
    --ink: ${colors.ink}; --muted: ${colors.muted}; --line: ${colors.line};
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: 100%; height: 100%; overflow: hidden; }
  body { background: #fff; color: var(--ink); font-family: Inter, Cairo, sans-serif; -webkit-font-smoothing: antialiased; }
  .display { font-family: Outfit, Cairo, sans-serif; }
  .ar { font-family: Cairo, sans-serif; direction: rtl; }
  .script { font-family: Caveat, cursive; }
  .pink { color: var(--brand); }
  .blob { position: absolute; background: var(--brand-soft); border-radius: 58% 42% 46% 54% / 52% 48% 52% 48%; }
  .card { background: #fff; border-radius: 18px; box-shadow: 0 18px 40px rgb(23 23 23 / 0.08); }
  .btn { display: inline-flex; align-items: center; gap: .5em; background: var(--brand); color: #fff; border-radius: 999px;
         font-weight: 700; box-shadow: 0 10px 24px rgb(255 46 147 / 0.35); white-space: nowrap; }
  .eyebrow { color: var(--brand); font-weight: 600; letter-spacing: .25em; text-transform: uppercase; }
  .ar .eyebrow, .eyebrow.ar { letter-spacing: 0; }
`;

export function page(body, { css = "", width, height }) {
  return `<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${fontsHref}">
<style>${baseCss} html, body { width: ${width}px; height: ${height}px; } ${css}</style>
</head><body>${body}</body></html>`;
}

// The 3-ray spark (site/src/components/brand/Spark.tsx).
export function spark({ size = 70, color = colors.brand, style = "", cls = "" } = {}) {
  return `<svg class="${cls}" viewBox="0 0 70 70" width="${size}" height="${size}" style="${style}" aria-hidden="true">
    <g stroke="${color}" stroke-width="8" stroke-linecap="round" fill="none">
      <line x1="5" y1="40" x2="9" y2="19"/><line x1="21" y1="49" x2="37" y2="33"/><line x1="30" y1="65" x2="51" y2="61"/>
    </g></svg>`;
}

// The "Idea Agency" wordmark (site/src/components/brand/Logo.tsx). Sized in em.
export function logo({ size = 64, color = colors.ink, sparkColor = colors.brand, style = "" } = {}) {
  return `<span dir="ltr" style="display:inline-flex;align-items:baseline;gap:.32em;font-family:Outfit,sans-serif;line-height:1;font-size:${size}px;color:${color};${style}">
    <span style="font-weight:700;letter-spacing:-.02em">Ide<span style="position:relative">a${spark({
      color: sparkColor,
      style: "position:absolute;top:-.12em;left:62%;width:.6em;height:.6em",
    })}</span></span><span style="font-weight:300">Agency</span></span>`;
}

// The app icon mark (site/src/app/icon.svg): a stem with the spark over it.
export function mark({ size = 64, bg = colors.ink, stem = "#FFFFFF", rays = colors.brand, radius = 16 } = {}) {
  return `<svg viewBox="0 0 64 64" width="${size}" height="${size}" aria-hidden="true">
    ${bg ? `<rect width="64" height="64" rx="${radius}" fill="${bg}"/>` : ""}
    <rect x="23" y="27" width="11" height="27" rx="5.5" fill="${stem}"/>
    <g stroke="${rays}" stroke-width="6" stroke-linecap="round">
      <line x1="25" y1="18" x2="22" y2="7"/><line x1="34" y1="19" x2="43" y2="10"/><line x1="38" y1="26" x2="50" y2="25"/>
    </g></svg>`;
}

// The hero laptop from the home page (HeroVisual.tsx), drawn in plain HTML.
// `scale` 1 is about 560px wide.
export function laptop({ lines = ["Better Marketing", "Bigger Opportunities"], scale = 1 } = {}) {
  return `<div style="position:relative;width:560px;height:480px;transform:scale(${scale});transform-origin:top left">
    <div class="blob" style="inset:20px 0 0 40px"></div>
    <div style="position:absolute;left:0;right:0;bottom:34px;height:20px;border-radius:10px;background:linear-gradient(#fafafb,#f1f1f4)"></div>
    <div style="position:absolute;left:20%;right:12%;bottom:52px">
      <div style="border-radius:16px 16px 4px 4px;background:#1d1d1f;padding:12px;box-shadow:0 24px 50px rgb(23 23 23/.18);transform:perspective(1200px) rotateY(-10deg);transform-origin:left">
        <div style="aspect-ratio:16/10;border-radius:6px;background:#fff;display:grid;place-items:center;text-align:center">
          <div><p dir="ltr" class="script pink" style="transform:rotate(-6deg);font-size:34px;line-height:1.1;font-weight:700">${lines
            .map((l) => `<span style="display:block">${l}</span>`)
            .join("")}</p>
          <svg width="120" height="14" viewBox="0 0 120 14" style="margin-top:8px"><path d="M4 10 C40 2, 80 2, 116 6" stroke="${colors.brand}" stroke-width="3" fill="none" stroke-linecap="round"/></svg></div>
        </div>
      </div>
      <div style="position:relative;margin:0 -7%;height:16px;border-radius:2px 2px 14px 14px;background:linear-gradient(#e9e9ed,#c8c8cf)"></div>
    </div>
    <div class="card" style="position:absolute;top:40px;left:4%;padding:14px 18px">
      <svg viewBox="0 0 110 56" width="110" height="56" fill="none" stroke="${colors.brand}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 48 L30 28 L48 38 L72 16 L100 8"/><path d="M86 6 L100 8 L98 22"/></svg>
    </div>
    <div class="card" style="position:absolute;right:0;bottom:88px;height:74px;padding:14px 18px;display:flex;align-items:flex-end;gap:6px">
      <i style="height:30%;width:10px;border-radius:9px;background:${colors.brand};opacity:.25"></i>
      <i style="height:60%;width:10px;border-radius:9px;background:${colors.brand}"></i>
      <i style="height:100%;width:10px;border-radius:9px;background:${colors.brand}"></i>
    </div>
    ${spark({ size: 70, style: "position:absolute;top:0;right:0" })}
  </div>`;
}

// The 1-page plan card from the landing page (PlanCard.tsx).
export function planCard({ title, rows, footer, dir = "rtl", width = 440 }) {
  return `<div class="card ${dir === "rtl" ? "ar" : ""}" dir="${dir}" style="width:${width}px;padding:32px;transform:rotate(-2deg)">
    <p style="font-size:22px;font-weight:700">${title}</p>
    <div style="margin-top:4px;height:4px;width:56px;border-radius:9px;background:${colors.brand}"></div>
    <ul style="list-style:none;margin-top:24px;display:grid;gap:20px">
      ${rows
        .map(
          (r, i) => `<li style="display:flex;gap:16px">
        <span style="display:grid;place-items:center;flex-shrink:0;width:32px;height:32px;border-radius:50%;background:${colors.brandSoft};color:${colors.brand};font:700 15px Outfit,sans-serif">${i + 1}</span>
        <div style="flex:1"><p style="font-weight:600;font-size:17px">${r}</p>
          <div style="margin-top:8px;height:8px;border-radius:9px;background:${colors.line}"></div>
          <div style="margin-top:6px;height:8px;width:75%;border-radius:9px;background:${colors.line}"></div></div></li>`
        )
        .join("")}
    </ul>
    <p style="margin-top:24px;border-top:1px solid ${colors.line};padding-top:16px;font-size:15px;font-weight:600;color:${colors.brand}">${footer}</p>
  </div>`;
}

// Join a short Arabic prefix to the English word after it, like the site does.
export const nb = " ";
