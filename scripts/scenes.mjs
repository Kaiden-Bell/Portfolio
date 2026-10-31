// Converts the supplied scene photographs (photos/) to web-ready webp in src/assets/scenes.
// Photographs supplied by Kaiden Bell; resized only, not retouched.
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const OUT = 'src/assets/scenes';
mkdirSync(OUT, { recursive: true });

const jobs = [
  { src: 'photos/chair.png', out: 'chair' },
  { src: 'photos/facing-away.png', out: 'facing-away' },
];

for (const job of jobs) {
  await sharp(job.src).webp({ quality: 86 }).toFile(`${OUT}/${job.out}.webp`);
  console.log(`${OUT}/${job.out}.webp`);
}
