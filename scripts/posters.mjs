// Renders scripts/posters/poster.html once per project into src/assets/work/<id>.webp.
// Needs a Chromium: set CHROME to its binary (plus LD_LIBRARY_PATH if it is missing libs).
import sharp from 'sharp';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const CHROME = process.env.CHROME ?? 'chromium';
const ids = process.argv.slice(2).length
  ? process.argv.slice(2)
  : ['vault', 'autoapplier', 'waitlist', 'rlpredictor', 'bellball'];
const page = 'file://' + resolve('scripts/posters/poster.html');
const scratch = mkdtempSync(join(tmpdir(), 'posters-'));
mkdirSync('src/assets/work', { recursive: true });

for (const id of ids) {
  const png = join(scratch, `${id}.png`);
  execFileSync(CHROME, [
    '--no-sandbox',
    '--hide-scrollbars',
    '--allow-file-access-from-files',
    '--window-size=1200,1800',
    '--virtual-time-budget=4000',
    `--screenshot=${png}`,
    `${page}#${id}`,
  ], { stdio: 'ignore' });
  await sharp(png).webp({ quality: 86 }).toFile(`src/assets/work/${id}.webp`);
  console.log(`src/assets/work/${id}.webp`);
}
