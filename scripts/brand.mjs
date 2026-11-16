// Renders the site's brand assets into public/: the social card (og.png) and the favicons.
// Set in the real Archivo, so it runs Playwright's Chromium like scripts/browser-review.mjs.
// Re-run with `npm run brand` after changing the name, role, palette or portrait.
import { chromium } from 'playwright';
import sharp from 'sharp';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const url = (p) => pathToFileURL(resolve(p)).href;
const font = url('node_modules/@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2');
const portrait = url('src/assets/portraits/three-quarter.webp');

// Hex equivalents of the --charcoal, --bone and --gold tokens in src/styles/global.css.
const charcoal = '#1a1815';
const bone = '#f3eee4';
const gold = '#e7b140';

const base = `
  @font-face { font-family: Archivo; src: url(${font}) format('woff2'); font-weight: 100 900; font-stretch: 62% 125%; }
  * { box-sizing: border-box; margin: 0; }
  html, body { width: 100%; height: 100%; }
  body { font-family: Archivo, sans-serif; -webkit-font-smoothing: antialiased; }
  .heavy { font-weight: 900; font-stretch: 62%; text-transform: uppercase; }
  .mark { background: linear-gradient(${gold}, ${gold}) no-repeat 0 86% / 100% 0.3em; }
`;

const og = `<!doctype html><style>${base}
  body { position: relative; overflow: hidden; background: radial-gradient(80% 70% at 60% 55%, #faf7f0, transparent 75%), ${bone}; color: ${charcoal}; }
  .spine { position: absolute; inset: 0 auto 0 0; width: 56px; background: ${charcoal}; }
  h1 { position: absolute; left: 92px; top: 34px; font-size: 238px; line-height: 0.8; letter-spacing: -0.02em; white-space: nowrap; }
  img { position: absolute; z-index: 1; right: -40px; bottom: 0; height: 600px; }
  .lead { position: absolute; left: 92px; bottom: 136px; font-size: 60px; line-height: 0.88; }
  .role { position: absolute; left: 92px; bottom: 56px; width: 560px; padding-top: 14px; border-top: 3px solid ${charcoal}; font-size: 22px; font-weight: 600; line-height: 1.3; }
  .url { position: absolute; left: 28px; bottom: 36px; writing-mode: vertical-rl; rotate: 180deg; color: ${bone}; font-size: 15px; font-weight: 800; font-stretch: 112%; letter-spacing: 0.14em; text-transform: uppercase; }
</style>
<div class="spine"></div>
<h1 class="heavy">Kaiden Bell</h1>
<img src="${portrait}" alt="">
<p class="lead heavy">From the register<br>to the <span class="mark">REST API.</span></p>
<p class="role">Full-stack &amp; hardware systems engineer · Computer Science &amp; Engineering, University of Nevada, Reno</p>
<p class="url">kaidenbell.me</p>`;

const icon = `<!doctype html><style>${base}
  body { display: grid; place-items: center; background: ${charcoal}; color: ${bone}; }
  p { font-size: 400px; line-height: 0.8; letter-spacing: -0.03em; padding-top: 0.06em; }
  .mark { background-size: 100% 0.2em; background-position: 0 82%; }
</style>
<p class="heavy"><span class="mark">KB</span></p>`;

const scratch = mkdtempSync(join(tmpdir(), 'brand-'));
const browser = await chromium.launch({ headless: true });

async function shoot(html, width, height) {
  const file = join(scratch, `${width}x${height}.html`);
  writeFileSync(file, html);
  const page = await browser.newPage({ viewport: { width, height } });
  await page.goto(pathToFileURL(file).href);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForLoadState('networkidle');
  const png = await page.screenshot({ type: 'png' });
  await page.close();
  return png;
}

try {
  const card = await shoot(og, 1200, 630);
  await sharp(card).png({ compressionLevel: 9, palette: false }).toFile('public/og.png');
  console.log('public/og.png');

  const big = await shoot(icon, 512, 512);
  await sharp(big).png().toFile('public/favicon.png');
  await sharp(big).resize(180).png().toFile('public/apple-touch-icon.png');
  const small = await sharp(big).resize(32).png().toBuffer();
  writeFileSync('public/favicon.ico', pngToIco(small, 32));
  console.log('public/favicon.png, public/apple-touch-icon.png, public/favicon.ico');
} finally {
  await browser.close();
}

// An .ico holding a single PNG image, which every current browser accepts.
function pngToIco(png, size) {
  const header = Buffer.alloc(22);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(1, 4); // image count
  header.writeUInt8(size, 6);
  header.writeUInt8(size, 7);
  header.writeUInt8(0, 8); // palette
  header.writeUInt8(0, 9); // reserved
  header.writeUInt16LE(1, 10); // colour planes
  header.writeUInt16LE(32, 12); // bits per pixel
  header.writeUInt32LE(png.length, 14);
  header.writeUInt32LE(22, 18); // offset to image data
  return Buffer.concat([header, png]);
}
