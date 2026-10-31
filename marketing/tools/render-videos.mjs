// Renders the funnel videos in marketing/videos/scripts.mjs to MP4 (1080 x 1920, 30fps).
//   1. Voice: one Egyptian Arabic clip per scene with edge-tts (Microsoft neural voices)
//   2. Timeline: each scene lasts as long as its voice line, plus a short pause
//   3. Frames: the scenes are HTML; Chrome draws every frame at an exact time
//   4. ffmpeg joins the frames and the voice into an MP4
// Run: npm run videos               (all)
//      npm run videos -- video-1-awareness
// Needs: Python package edge-tts (pip install edge-tts) and an internet connection for the voice.
import { chromium } from "playwright-core";
import ffmpegPath from "ffmpeg-static";
import { spawn, execFileSync } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { page, logo, colors } from "./brand.mjs";
import { scenes as layouts } from "./scenes.mjs";
import { videos } from "../videos/scripts.mjs";

const W = 1080, H = 1920, FPS = 30;
const PAD = 0.45;      // pause after each voice line
const LEAD = 0.15;     // voice starts this long after its scene
const chromePath = process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe";
const buildDir = fileURLToPath(new URL("./build/", import.meta.url));
const outDir = fileURLToPath(new URL("../videos/output/", import.meta.url));

const ffmpeg = (args, opts) => execFileSync(ffmpegPath, ["-hide_banner", "-loglevel", "error", ...args], opts);

function audioDuration(file) {
  let out = "";
  try {
    execFileSync(ffmpegPath, ["-hide_banner", "-i", file], { stdio: "pipe" });
  } catch (e) {
    out = e.stderr.toString();
  }
  const m = out.match(/Duration: (\d+):(\d+):([\d.]+)/);
  return +m[1] * 3600 + +m[2] * 60 + +m[3];
}

// Keep short Arabic prefixes on the same line as the English word after them.
const joinPrefixes = (s) => s.replace(/(^|[\s>])(الـ|لـ|بـ|و) (?=[A-Za-z0-9])/g, "$1$2\u00A0");

// Split a caption into short chunks timed by their length.
function captionChunks(text, start, dur) {
  const parts = text.split(/(?<=[،,.؟?!:])\s+/).reduce((acc, p) => {
    if (acc.length && acc[acc.length - 1].length < 16) acc[acc.length - 1] += " " + p;
    else acc.push(p);
    return acc;
  }, []);
  const total = parts.reduce((n, p) => n + p.length, 0);
  let t = start;
  return parts.map((p) => {
    const len = (p.length / total) * dur;
    const c = { text: p, start: t, end: t + len };
    t += len;
    return c;
  });
}

async function voiceFor(video) {
  const dir = `${buildDir}${video.id}/`;
  await mkdir(dir, { recursive: true });
  for (const [i, s] of video.scenes.entries()) {
    if (!s.say) continue;
    const hash = createHash("sha1").update(video.voice + s.say).digest("hex").slice(0, 8);
    const raw = `${dir}scene-${i + 1}-${hash}.mp3`;
    s.audio = raw.replace(".mp3", ".wav");
    if (!existsSync(raw)) {
      execFileSync("edge-tts", ["--voice", video.voice, "--rate=+6%", "--text", s.say, "--write-media", raw], { stdio: "inherit" });
    }
    // The voice service adds silence at both ends; cut it so scenes stay tight.
    if (!existsSync(s.audio)) {
      const cut = "silenceremove=start_periods=1:start_threshold=-45dB";
      ffmpeg(["-y", "-i", raw, "-af", `${cut},areverse,${cut},areverse`, "-ar", "48000", s.audio]);
    }
    s.voiceDur = audioDuration(s.audio);
  }
}

function timeline(video) {
  let t = 0;
  for (const s of video.scenes) {
    s.start = t;
    s.dur = s.voiceDur ? LEAD + s.voiceDur + PAD : s.hold ?? 2;
    t += s.dur;
  }
  return t;
}

function buildHtml(video) {
  const sceneHtml = video.scenes
    .map((s, i) => {
      const inner = joinPrefixes(layouts[s.kind](s.props, s.dur));
      return `<section class="scene ar" data-start="${s.start}" data-dur="${s.dur}" data-last="${i === video.scenes.length - 1}">${inner}</section>`;
    })
    .join("");
  const captions = video.scenes
    .filter((s) => s.caption)
    .flatMap((s) => captionChunks(joinPrefixes(s.caption), s.start + LEAD, s.voiceDur))
    .map((c) => `<div class="cap ar" data-start="${c.start}" data-end="${c.end}"><span>${c.text}</span></div>`)
    .join("");

  const css = `
    body { background: #fff; }
    .bg { position: absolute; border-radius: 58% 42% 46% 54% / 52% 48% 52% 48%; background: ${colors.brandSoft}; }
    .top { position: absolute; top: 110px; left: 0; right: 0; display: flex; justify-content: center; }
    .scene { position: absolute; inset: 0; opacity: 0; }
    .content { position: absolute; left: 80px; right: 80px; top: 270px; height: 1150px; }
    .cap { position: absolute; left: 70px; right: 70px; top: 1470px; display: flex; justify-content: center; opacity: 0; }
    .cap span { background: ${colors.ink}; color: #fff; font-size: 48px; font-weight: 700; line-height: 1.55; padding: 14px 34px;
                border-radius: 26px; text-align: center; box-decoration-break: clone; -webkit-box-decoration-break: clone; }
  `;
  const body = `
    <div class="bg" id="b1" style="width:760px;height:700px;right:-300px;top:-200px;opacity:.6"></div>
    <div class="bg" id="b2" style="width:620px;height:560px;left:-280px;bottom:120px;opacity:.5"></div>
    <div class="top">${logo({ size: 46 })}</div>
    ${sceneHtml}${captions}
    <script>${runtime}</script>`;
  return page(body, { css, width: W, height: H });
}

// Runs inside the page: seek(t) puts every element where it belongs at time t.
const runtime = `
const clamp = (x) => Math.max(0, Math.min(1, x));
const outCubic = (x) => 1 - Math.pow(1 - x, 3);
const outBack = (x) => { const c = 1.7; return 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2); };
const scenes = [...document.querySelectorAll('.scene')].map((el) => ({
  el, start: +el.dataset.start, dur: +el.dataset.dur, last: el.dataset.last === 'true',
  items: [...el.querySelectorAll('[data-anim]')].map((n) => ({ n, a: n.dataset.anim, at: +n.dataset.in,
    len: +(n.dataset.len || (n.dataset.anim === 'pop' ? 0.45 : 0.55)), times: (n.dataset.times || '').split(',').filter(Boolean).map(Number),
    to: +n.dataset.to, cdur: +(n.dataset.dur || 1) })),
}));
const caps = [...document.querySelectorAll('.cap')].map((el) => ({ el, s: +el.dataset.start, e: +el.dataset.end }));
const b1 = document.getElementById('b1'), b2 = document.getElementById('b2');
window.seek = (t) => {
  b1.style.transform = 'translate(' + Math.sin(t * 0.5) * 30 + 'px,' + Math.cos(t * 0.4) * 40 + 'px) rotate(' + t * 4 + 'deg)';
  b2.style.transform = 'translate(' + Math.cos(t * 0.45) * 30 + 'px,' + Math.sin(t * 0.5) * 30 + 'px) rotate(' + -t * 3 + 'deg)';
  for (const s of scenes) {
    const l = t - s.start;
    if (l < 0 || l >= s.dur) { s.el.style.opacity = 0; continue; }
    const enter = outCubic(clamp(l / 0.3));
    const exit = s.last ? 1 : clamp((s.dur - l) / 0.22);
    s.el.style.opacity = Math.min(enter, exit);
    s.el.style.transform = 'translateY(' + (1 - enter) * 40 + 'px) scale(' + (0.97 + 0.03 * exit) + ')';
    for (const it of s.items) {
      const p = clamp((l - it.at) / it.len), st = it.n.style;
      switch (it.a) {
        case 'fade': st.opacity = p; break;
        case 'up': st.opacity = p; st.transform = 'translateY(' + (1 - outCubic(p)) * 70 + 'px)'; break;
        case 'pop': st.opacity = clamp(p * 2.5); st.transform = 'scale(' + (0.55 + 0.45 * outBack(p)) + ')'; break;
        case 'wipe': st.opacity = clamp(p * 3); st.clipPath = 'inset(0 0 0 ' + (1 - outCubic(p)) * 100 + '%)'; break;
        case 'grow-x': st.transform = 'scaleX(' + outCubic(p) + ')'; break;
        case 'grow-y': st.transform = 'scaleY(' + outCubic(p) + ')'; break;
        case 'draw': { const path = it.n.querySelector('path'); path.style.strokeDasharray = 1; path.style.strokeDashoffset = 1 - outCubic(clamp((l - it.at) / 0.8)); break; }
        case 'count': { const q = outCubic(clamp((l - it.at) / it.cdur)); it.n.textContent = Math.round(it.to * q).toLocaleString('en'); break; }
        case 'tap': { let sc = 1; for (const tt of it.times) { const k = (l - tt) / 0.3; if (k >= 0 && k <= 1) sc = 1 - 0.1 * Math.sin(k * Math.PI); } st.transform = 'scale(' + sc + ')'; break; }
      }
    }
  }
  for (const c of caps) {
    const on = t >= c.s && t < c.e;
    c.el.style.opacity = on ? clamp((t - c.s) / 0.12) : 0;
  }
};
window.seek(0);
`;

async function renderVideo(browser, video) {
  console.log(`\n${video.id}: voice`);
  await voiceFor(video);
  const total = timeline(video);
  const dir = `${buildDir}${video.id}/`;
  const html = buildHtml(video);
  await writeFile(`${dir}preview.html`, html);

  // Voice track: every clip placed at its scene start.
  const clips = video.scenes.filter((s) => s.audio);
  const voicePath = `${dir}voice.wav`;
  ffmpeg([
    "-y",
    ...clips.flatMap((s) => ["-i", s.audio]),
    "-filter_complex",
    clips.map((s, i) => `[${i}]adelay=${Math.round((s.start + LEAD) * 1000)}:all=1[a${i}]`).join(";") +
      ";" + clips.map((_, i) => `[a${i}]`).join("") + `amix=inputs=${clips.length}:normalize=0,apad,atrim=0:${total.toFixed(3)}[out]`,
    "-map", "[out]", "-ar", "48000", voicePath,
  ]);

  console.log(`${video.id}: ${total.toFixed(1)}s, ${Math.ceil(total * FPS)} frames`);
  const p = await browser.newPage({ viewport: { width: W, height: H } });
  await p.setContent(html, { waitUntil: "networkidle" });
  await p.evaluate(() => document.fonts.ready);

  // --stills: one PNG near the end of each scene, to check layouts fast.
  if (stillsOnly) {
    for (const [i, s] of video.scenes.entries()) {
      await p.evaluate((t) => window.seek(t), s.start + s.dur * 0.85);
      await p.screenshot({ path: `${dir}still-${i + 1}.png` });
    }
    await p.close();
    console.log(`${video.id}: stills in ${dir}`);
    return;
  }

  await mkdir(outDir, { recursive: true });
  const outFile = `${outDir}${video.id}.mp4`;
  const enc = spawn(ffmpegPath, [
    "-hide_banner", "-loglevel", "error", "-y",
    "-f", "image2pipe", "-framerate", String(FPS), "-c:v", "mjpeg", "-i", "-",
    "-i", voicePath,
    "-c:v", "libx264", "-preset", "medium", "-crf", "20", "-pix_fmt", "yuv420p",
    "-c:a", "aac", "-b:a", "160k", "-movflags", "+faststart", "-shortest", outFile,
  ], { stdio: ["pipe", "inherit", "inherit"] });
  const done = new Promise((res, rej) => enc.on("close", (c) => (c === 0 ? res() : rej(new Error("ffmpeg " + c)))));

  const frames = Math.ceil(total * FPS);
  for (let f = 0; f < frames; f++) {
    await p.evaluate((t) => window.seek(t), f / FPS);
    const buf = await p.screenshot({ type: "jpeg", quality: 92 });
    if (!enc.stdin.write(buf)) await new Promise((r) => enc.stdin.once("drain", r));
    if (f % 150 === 0) process.stdout.write(`  frame ${f}/${frames}\r`);
  }
  enc.stdin.end();
  await done;
  await p.close();

  // Thumbnail (cover) from the hook, and the timing sheet for editors.
  ffmpeg(["-y", "-ss", "1.2", "-i", outFile, "-frames:v", "1", "-q:v", "2", `${outDir}${video.id}-cover.jpg`]);
  const srt = video.scenes
    .filter((s) => s.caption)
    .flatMap((s) => captionChunks(s.caption, s.start + LEAD, s.voiceDur))
    .map((c, i) => `${i + 1}\n${srtTime(c.start)} --> ${srtTime(c.end)}\n${c.text}\n`)
    .join("\n");
  await writeFile(`${outDir}${video.id}.srt`, srt);
  console.log(`${video.id}: saved ${outFile}`);
}

const srtTime = (t) => {
  const ms = Math.round(t * 1000);
  const p = (n, w = 2) => String(n).padStart(w, "0");
  return `${p(Math.floor(ms / 3600000))}:${p(Math.floor(ms / 60000) % 60)}:${p(Math.floor(ms / 1000) % 60)},${p(ms % 1000, 3)}`;
};

const stillsOnly = process.argv.includes("--stills");
const only = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const browser = await chromium.launch({ executablePath: chromePath });
for (const v of videos) if (!only.length || only.includes(v.id)) await renderVideo(browser, v);
await browser.close();
