// Derives an alpha matte from the backlit silhouette portraits (dark subject on a bright seamless).
// Background = bright pixels flood-filled from the frame edge; edge pixels get a soft ramp
// and are un-mixed from the backdrop so no light halo survives on a dark page.
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const OUT = 'src/assets/portraits';
mkdirSync(OUT, { recursive: true });

const jobs = [
  { src: 'photos/7d9ed59f-1206-43a5-b6d4-a1a4b923c511.png', out: 'profile-up', height: 1600 },
  { src: 'photos/threequarters.png', out: 'three-quarter', height: 1600 },
];

const HI = 200; // at or above: backdrop
const LO = 120; // at or below: subject
const EDGE = 165; // above this, a backdrop-connected pixel is fully transparent

for (const job of jobs) {
  const { data, info } = await sharp(job.src)
    .resize({ height: job.height })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;
  const n = w * h;
  const lum = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    lum[i] = 0.2126 * data[i * 3] + 0.7152 * data[i * 3 + 1] + 0.0722 * data[i * 3 + 2];
  }

  // Flood fill the backdrop from every edge pixel brighter than LO.
  const bg = new Uint8Array(n);
  const stack = [];
  const seed = (i) => { if (!bg[i] && lum[i] > LO) { bg[i] = 1; stack.push(i); } };
  for (let x = 0; x < w; x++) { seed(x); seed((h - 1) * w + x); }
  for (let y = 0; y < h; y++) { seed(y * w); seed(y * w + w - 1); }
  while (stack.length) {
    const i = stack.pop();
    const x = i % w, y = (i / w) | 0;
    if (x > 0) seed(i - 1);
    if (x < w - 1) seed(i + 1);
    if (y > 0) seed(i - w);
    if (y < h - 1) seed(i + w);
  }

  // Backdrop brightness per row (the seamless falls off toward the bottom).
  const rowBg = new Float32Array(h);
  for (let y = 0; y < h; y++) {
    let s = 0, c = 0;
    for (let x = 0; x < w; x++) { const i = y * w + x; if (bg[i] && lum[i] >= HI) { s += lum[i]; c++; } }
    rowBg[y] = c ? s / c : 235;
  }

  const out = Buffer.alloc(n * 4);
  for (let i = 0; i < n; i++) {
    const y = (i / w) | 0;
    let a = 1;
    if (bg[i]) {
      // Ramp only across the narrow band at the subject's edge; any brighter backdrop is fully clear,
      // even where the seamless falls off into vignette.
      a = Math.max(0, Math.min(1, (EDGE - lum[i]) / (EDGE - LO)));
      a = a * a * (3 - 2 * a);
    }
    for (let c = 0; c < 3; c++) {
      const v = data[i * 3 + c];
      // Un-mix the backdrop from partially covered pixels.
      const fg = a > 0.02 ? (v - (1 - a) * rowBg[y]) / a : 0;
      out[i * 4 + c] = Math.max(0, Math.min(255, Math.round(fg)));
    }
    out[i * 4 + 3] = Math.round(a * 255);
  }

  await sharp(out, { raw: { width: w, height: h, channels: 4 } })
    .webp({ quality: 88, alphaQuality: 100 })
    .toFile(`${OUT}/${job.out}.webp`);
  console.log(`${job.out}.webp ${w}x${h}`);
}

await sharp('photos/frontface.png').resize({ height: 1400 }).webp({ quality: 86 }).toFile(`${OUT}/front.webp`);
console.log('front.webp');
