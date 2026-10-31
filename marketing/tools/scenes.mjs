// Motion layouts for the videos. Each one turns a scene's props into HTML.
// Animation is declared with data attributes and played by the timeline in
// render-videos.mjs:  data-anim="up|pop|fade|wipe|grow-x|grow-y|draw|count|tap|float"
//                     data-in="seconds after the scene starts"
// `d` is the scene length in seconds, so layouts can spread their beats over the voice.
import { colors, logo, spark, planCard } from "./brand.mjs";

const A = (anim, at, extra = "") => `data-anim="${anim}" data-in="${at.toFixed(2)}" ${extra}`;
// Beat i of n, spread over the first `share` of the scene.
const beat = (d, i, n, start = 0.25, share = 0.7) => start + (i * (d * share - start)) / Math.max(n, 1);

const icon = {
  heart: `<path d="M50 84 C20 62 10 46 10 32 a20 20 0 0 1 40 -6 a20 20 0 0 1 40 6 c0 14 -10 30 -40 52z"/>`,
  chat: `<path d="M14 20 h72 a6 6 0 0 1 6 6 v40 a6 6 0 0 1 -6 6 h-44 l-18 14 v-14 h-10 a6 6 0 0 1 -6 -6 v-40 a6 6 0 0 1 6 -6z"/>`,
  cart: `<path d="M8 16 h14 l10 46 h46 l10 -32 h-60"/><circle cx="38" cy="80" r="6"/><circle cx="72" cy="80" r="6"/>`,
  phone: `<rect x="28" y="8" width="44" height="84" rx="10"/><path d="M44 78 h12"/>`,
  eye: `<path d="M6 50 C22 22 78 22 94 50 C78 78 22 78 6 50z"/><circle cx="50" cy="50" r="13"/>`,
  chart: `<path d="M12 86 h76"/><path d="M24 74 v-20"/><path d="M44 74 v-36"/><path d="M64 74 v-28"/><path d="M84 74 v-52"/>`,
  check: `<path d="M22 52 l18 18 l38 -40"/>`,
  clock: `<circle cx="50" cy="50" r="38"/><path d="M50 28 v24 l16 10"/>`,
  save: `<path d="M26 10 h48 a4 4 0 0 1 4 4 v76 l-28 -18 l-28 18 v-76 a4 4 0 0 1 4 -4z"/>`,
};
const svgIcon = (name, size, color = colors.brand, stroke = 8) =>
  `<svg viewBox="0 0 100 100" width="${size}" height="${size}" fill="none" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round">${icon[name]}</svg>`;

const hand = (size = 150) => `<svg viewBox="0 0 100 100" width="${size}" height="${size}">
  <path d="M38 14 a7 7 0 0 1 14 0 v30 l20 4 a10 10 0 0 1 8 12 l-6 26 a10 10 0 0 1 -10 8 h-24 a10 10 0 0 1 -8 -4 l-16 -22 a7 7 0 0 1 10 -10 l12 10z"
    fill="#fff" stroke="${colors.ink}" stroke-width="4" stroke-linejoin="round"/></svg>`;

const badge = (text, at) =>
  `<div ${A("pop", at)} style="display:inline-block;background:${colors.ink};color:#fff;border-radius:999px;padding:10px 34px;font-size:40px;font-weight:800">${text}</div>`;

const center = (inner, gap = 48) =>
  `<div class="content" style="display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:${gap}px">${inner}</div>`;

export const scenes = {
  hook({ lines, pink = -1, sub }, d) {
    const n = lines.length;
    return center(`
      <div style="position:relative">
        <div ${A("pop", 0)} style="position:absolute;inset:-120px -80px;border-radius:50%;background:${colors.brandSoft};z-index:-1"></div>
        ${lines
          .map(
            (l, i) =>
              `<div ${A("pop", 0.08 + i * 0.22)} style="font-size:${n > 2 ? 100 : 108}px;font-weight:900;line-height:1.3;white-space:nowrap;${i === pink ? `color:${colors.brand}` : ""}">${l}</div>`
          )
          .join("")}
        <div ${A("pop", 0.15)} style="position:absolute;top:-110px;left:-60px">${spark({ size: 150 })}</div>
      </div>
      ${sub ? `<div ${A("up", 0.15 + n * 0.22)} style="font-size:54px;font-weight:700;color:${colors.muted}">${sub}</div>` : ""}`);
  },

  boost({ spent }, d) {
    const taps = [0.6, d * 0.35, d * 0.6].map((t) => t.toFixed(2)).join(",");
    return center(`
      <div ${A("up", 0)} class="card" style="width:820px;padding:36px;text-align:right">
        <div style="display:flex;align-items:center;gap:22px">
          <div style="width:84px;height:84px;border-radius:50%;background:${colors.brandSoft}"></div>
          <div><div style="font-size:38px;font-weight:800">البيزنس بتاعك</div><div style="font-size:28px;color:${colors.muted}">Sponsored</div></div>
        </div>
        <div style="margin-top:28px;height:420px;border-radius:18px;background:linear-gradient(135deg,${colors.brandSoft},${colors.brandTint});display:grid;place-items:center">
          ${svgIcon("cart", 180, colors.brand, 6)}
        </div>
        <div style="margin-top:28px;display:flex;justify-content:space-between;align-items:center">
          <div style="font-size:30px;color:${colors.muted}">❤ 👍 💬</div>
          <div style="position:relative">
            <div ${A("tap", 0, `data-times="${taps}"`)} class="btn" style="font-size:40px;padding:18px 48px">Boost post</div>
            <div ${A("tap", 0, `data-times="${taps}"`)} style="position:absolute;left:-70px;top:40px">${hand(140)}</div>
          </div>
        </div>
      </div>
      <div ${A("pop", 0.5)} class="card" style="padding:22px 44px;display:flex;align-items:center;gap:20px;font-size:44px;font-weight:800">
        اتصرف: <span ${A("count", 0.5, `data-to="${spent}" data-dur="${(d * 0.8).toFixed(2)}"`)} class="pink" dir="ltr">0</span> جنيه
        <span style="font-size:28px;color:${colors.muted};font-weight:600">(مثال)</span>
      </div>`, 44);
  },

  metrics({ items }, d) {
    const trendColor = { up: "#16A34A", low: colors.brand, flat: colors.muted };
    const trendIcon = { up: "↑", low: "↓", flat: "—" };
    return center(`
      ${items
        .map(
          (m, i) => `<div ${A("up", beat(d, i, items.length))} class="card" style="width:860px;display:flex;align-items:center;gap:36px;padding:36px 44px">
          <div style="width:130px;height:130px;border-radius:32px;background:${colors.brandTint};display:grid;place-items:center">${svgIcon(m.icon, 86)}</div>
          <div style="flex:1;text-align:right"><div style="font-size:40px;font-weight:700;color:${colors.muted}">${m.label}</div>
            <div style="font-size:76px;font-weight:900;line-height:1.1">${
              m.text ?? `<span ${A("count", beat(d, i, items.length), `data-to="${m.to}" data-dur="1.2"`)} dir="ltr">0</span>`
            }</div></div>
          <div style="font-size:90px;font-weight:900;color:${trendColor[m.trend]}">${trendIcon[m.trend]}</div>
        </div>`
        )
        .join("")}
      <div ${A("fade", 0.5)} style="font-size:30px;color:${colors.muted}">أرقام مثال للتوضيح</div>`, 36);
  },

  compare({ title, left, right }, d) {
    const box = (b, hot, at) => `<div ${A("pop", at)} style="width:410px;padding:44px 30px;border-radius:28px;${
      hot ? `background:${colors.brand};color:#fff;box-shadow:0 18px 40px rgb(255 46 147/.35)` : `background:#fff;box-shadow:0 18px 40px rgb(23 23 23/.08)`
    }">
        <div style="font-size:52px;font-weight:900">${b.tag}</div>
        <div style="margin:22px auto;width:90px;height:6px;border-radius:9px;background:${hot ? "#fff" : colors.line}"></div>
        <div style="font-size:42px;font-weight:700;line-height:1.4">${b.text}</div></div>`;
    return center(`
      <div ${A("up", 0)} style="font-size:84px;font-weight:900;line-height:1.3">${title}</div>
      <div style="display:flex;gap:40px;align-items:center">${box(right, true, d * 0.45)}${box(left, false, d * 0.25)}</div>`, 70);
  },

  list({ title, items }, d) {
    return center(`
      <div ${A("up", 0)} style="font-size:80px;font-weight:900;align-self:stretch;text-align:right">${title}</div>
      <div style="display:grid;gap:34px;align-self:stretch">
      ${items
        .map(
          (t, i) => `<div ${A("wipe", beat(d, i, items.length, 0.4))} class="card" style="display:flex;align-items:center;gap:30px;padding:34px 40px;text-align:right">
          <span style="flex-shrink:0;width:96px;height:96px;border-radius:50%;background:${colors.brand};display:grid;place-items:center">${svgIcon("check", 60, "#fff", 12)}</span>
          <span style="font-size:50px;font-weight:800">${t}</span></div>`
        )
        .join("")}</div>`, 56);
  },

  statement({ lines, pink = -1, sub }, d) {
    return center(`
      <div>${lines
        .map((l, i) => `<div ${A("pop", i * 0.35)} style="font-size:100px;font-weight:900;line-height:1.35;${i === pink ? `color:${colors.brand}` : ""}">${l}</div>`)
        .join("")}</div>
      ${sub ? `<div ${A("up", d * 0.45)} style="font-size:50px;font-weight:700;color:${colors.muted}">${sub}</div>` : ""}
      <div ${A("draw", 0.5)} style="width:520px"><svg viewBox="0 0 120 14" width="520" height="60"><path pathLength="1" d="M4 10 C40 2, 80 2, 116 6" stroke="${colors.brand}" stroke-width="3" fill="none" stroke-linecap="round"/></svg></div>`, 50);
  },

  formula({ badge: b, title, parts, example }, d) {
    const t0 = d * 0.25;
    return center(`
      ${badge(b, 0)}
      <div ${A("up", 0.2)} style="font-size:100px;font-weight:900">${title}</div>
      <div ${A("pop", t0)} style="display:flex;align-items:center;gap:26px">
        <div class="card" style="padding:30px 36px;font-size:48px;font-weight:800">${parts[0]}</div>
        <div style="font-size:84px;font-weight:900;color:${colors.brand}">${parts[1]}</div>
        <div class="card" style="padding:30px 36px;font-size:48px;font-weight:800">${parts[2]}</div>
      </div>
      <div ${A("up", d * 0.55)} style="background:${colors.brandTint};border:3px dashed ${colors.brand};border-radius:28px;padding:30px 44px">
        <div style="font-size:34px;font-weight:700;color:${colors.muted}">مثال</div>
        <div dir="ltr" class="display" style="font-size:72px;font-weight:800">${example.a.toLocaleString("en")} ÷ ${example.b} = <span class="pink" ${A(
          "count",
          d * 0.62,
          `data-to="${example.result}" data-dur="0.8"`
        )}>0</span></div>
        <div style="font-size:40px;font-weight:700">${example.unit}</div>
      </div>`, 44);
  },

  dots({ badge: b, title, total, hit, note }, d) {
    return center(`
      ${badge(b, 0)}
      <div ${A("up", 0.2)} style="font-size:88px;font-weight:900">${title}</div>
      <div style="display:grid;grid-template-columns:repeat(5,150px);gap:30px" dir="rtl">
        ${Array.from({ length: total }, (_, i) => {
          const isHit = i < hit;
          return `<div ${A("pop", 0.5 + i * 0.12)} style="position:relative;width:150px;height:150px;border-radius:36px;background:#fff;box-shadow:0 12px 30px rgb(23 23 23/.08);display:grid;place-items:center">
            ${svgIcon("chat", 84, colors.line, 9)}
            ${isHit ? `<div ${A("fade", d * 0.45 + i * 0.3)} style="position:absolute;inset:0;border-radius:36px;background:${colors.brand};display:grid;place-items:center">${svgIcon("cart", 84, "#fff", 9)}</div>` : ""}
          </div>`;
        }).join("")}
      </div>
      <div ${A("up", d * 0.55)} style="font-size:46px;font-weight:800;color:${colors.brand}">${note}</div>`, 50);
  },

  chat({ badge: b, title, incoming, wait, reply, lost }, d) {
    const bubble = (t, mine, at, extra = "") => `<div ${A("up", at)} style="align-self:${mine ? "flex-start" : "flex-end"};max-width:560px;padding:22px 30px;border-radius:30px;font-size:40px;font-weight:600;${
      mine ? `background:${colors.brand};color:#fff;border-bottom-left-radius:8px` : `background:#fff;border-bottom-right-radius:8px;box-shadow:0 8px 20px rgb(23 23 23/.06)`
    };${extra}">${t}</div>`;
    return center(`
      ${badge(b, 0)}
      <div ${A("up", 0.2)} style="font-size:88px;font-weight:900">${title}</div>
      <div ${A("up", 0.35)} style="width:700px;border-radius:56px;background:${colors.line};padding:40px 34px;display:flex;flex-direction:column;gap:20px;text-align:right">
        ${incoming.map((t, i) => bubble(t, false, 0.6 + i * 0.5)).join("")}
        <div ${A("pop", d * 0.4)} style="align-self:center;display:flex;align-items:center;gap:14px;font-size:36px;font-weight:700;color:${colors.muted}">${svgIcon("clock", 54, colors.muted, 8)} ${wait}</div>
        ${bubble(reply, true, d * 0.55, "opacity:.6")}
      </div>
      <div ${A("pop", d * 0.68)} style="font-size:52px;font-weight:900;color:${colors.brand}">${lost}</div>`, 40);
  },

  plan({ head, title, rows, footer, save }, d) {
    return center(`
      <div ${A("up", 0)} style="font-size:84px;font-weight:900;color:${colors.brand}">${head}</div>
      <div ${A("pop", 0.3)} style="transform-origin:center">
        <div style="zoom:1.9">${planCard({ title, rows, footer, width: 440 })}</div>
      </div>
      ${save ? `<div ${A("pop", d * 0.6)} class="card" style="display:flex;align-items:center;gap:18px;padding:20px 40px;font-size:44px;font-weight:800">${svgIcon("save", 60)} ${save}</div>` : ""}`, 56);
  },

  offer({ eyebrow, title, items }, d) {
    return center(`
      <div ${A("up", 0)} style="font-size:44px;font-weight:700;color:${colors.muted}">${eyebrow}</div>
      <div ${A("pop", 0.25)} style="font-size:112px;font-weight:900;color:${colors.brand};line-height:1.2">${title}</div>
      <div style="display:grid;gap:28px;align-self:stretch">
      ${items
        .map(
          (it, i) => `<div ${A("wipe", beat(d, i, items.length, d * 0.3, 0.8))} class="card" style="display:flex;align-items:center;gap:30px;padding:30px 40px;text-align:right">
            <span style="flex-shrink:0;width:100px;height:100px;border-radius:28px;background:${colors.brandTint};display:grid;place-items:center">${svgIcon(it.icon, 66)}</span>
            <span style="font-size:50px;font-weight:800">${it.text}</span></div>`
        )
        .join("")}</div>`, 44);
  },

  badges({ title, items }, d) {
    return center(`
      <div ${A("up", 0)} style="font-size:88px;font-weight:900">${title}</div>
      <div style="display:grid;gap:30px">
        ${items
          .map(
            (t, i) => `<div ${A("pop", beat(d, i, items.length, d * 0.35, 0.85))} style="display:flex;align-items:center;justify-content:center;gap:24px;padding:30px 70px;border-radius:999px;background:${
              i === 0 ? colors.brand : "#fff"
            };color:${i === 0 ? "#fff" : colors.ink};box-shadow:0 14px 34px rgb(23 23 23/.1);font-size:60px;font-weight:900">
            ${svgIcon("check", 64, i === 0 ? "#fff" : colors.brand, 12)} ${t}</div>`
          )
          .join("")}
      </div>`, 60);
  },

  cta({ button, fields, note }, d) {
    const taps = [d * 0.3, d * 0.62].map((t) => t.toFixed(2)).join(",");
    return center(`
      <div ${A("up", 0)} class="card" style="width:820px;padding:44px;text-align:right;display:grid;gap:22px">
        <div style="display:flex;justify-content:space-between;align-items:center"><span style="font-size:40px;font-weight:900">بياناتك</span><span style="font-size:30px;color:${colors.muted}">خطوة 1 من 2</span></div>
        <div style="height:10px;border-radius:9px;background:${colors.line}"><div ${A("grow-x", d * 0.15, 'data-len="1.4"')} style="height:100%;width:50%;border-radius:9px;background:${colors.brand};transform-origin:right;margin-left:auto"></div></div>
        ${fields
          .map(
            (f, i) => `<div ${A("up", 0.4 + i * 0.25)}><div style="font-size:30px;font-weight:700;margin-bottom:10px">${f}</div>
            <div style="height:86px;border-radius:18px;border:2px solid ${colors.line};padding:0 24px;display:flex;align-items:center"><div ${A("grow-x", 0.9 + i * 0.45, 'data-len="0.5"')} style="height:12px;width:${
              [55, 40, 62][i % 3]
            }%;border-radius:9px;background:${colors.line};transform-origin:right"></div></div></div>`
          )
          .join("")}
      </div>
      <div style="position:relative">
        <div ${A("tap", 0, `data-times="${taps}"`)} class="btn" style="font-size:58px;padding:34px 70px">${button}</div>
        <div ${A("tap", 0, `data-times="${taps}"`)} style="position:absolute;left:-80px;top:60px">${hand(150)}</div>
      </div>
      <div ${A("fade", 0.6)} style="font-size:40px;font-weight:700;color:${colors.muted}">${note}</div>`, 50);
  },

  end({ line, action, button }, d) {
    return center(`
      <div ${A("pop", 0)} style="position:relative;transform-origin:center">${logo({ size: 150 })}</div>
      <div ${A("up", 0.35)} style="font-size:58px;font-weight:800">${line}</div>
      ${action ? `<div ${A("pop", 0.7)} class="btn" style="font-size:52px;padding:26px 70px">${action}</div>` : ""}
      ${button ? `<div ${A("tap", 0, `data-times="${(d * 0.5).toFixed(2)}"`)}><div ${A("pop", 0.6)} class="btn" style="font-size:54px;padding:30px 64px">${button}</div></div>` : ""}`, 60);
  },
};
