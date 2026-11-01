import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { createServer } from 'node:net';
import { fileURLToPath } from 'node:url';
import { setTimeout as delay } from 'node:timers/promises';
import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = `${root}artifacts/browser-review`;
await mkdir(output, { recursive: true });

// Choose an available local port without disturbing a developer's existing server.
const reservation = createServer();
await new Promise((resolve, reject) => {
  reservation.once('error', reject);
  reservation.listen(0, '127.0.0.1', resolve);
});
const port = reservation.address().port;
await new Promise((resolve) => reservation.close(resolve));
const base = `http://127.0.0.1:${port}`;
let serverLog = '';
let serverExited = false;
const server = spawn(process.execPath, [
  'node_modules/astro/bin/astro.mjs', 'dev', '--ignore-lock',
  '--host', '127.0.0.1', '--port', String(port),
], { cwd: root, stdio: ['ignore', 'pipe', 'pipe'] });
const serverDone = new Promise((resolve) => server.once('close', resolve));
server.on('error', (error) => { serverLog += error.stack; serverExited = true; });
server.on('exit', () => { serverExited = true; });
for (const stream of [server.stdout, server.stderr]) {
  stream.on('data', (chunk) => { serverLog += chunk.toString(); });
}
let browser;
const results = [];
const errors = [];
const shutdown = () => server.kill('SIGTERM');
process.once('SIGINT', shutdown);
process.once('SIGTERM', shutdown);
try {
  const deadline = Date.now() + 45_000;
  let ready = false;
  while (Date.now() < deadline) {
    if (serverExited) throw new Error(`Astro exited during startup:\n${serverLog}`);
    try {
      const response = await fetch(base, { signal: AbortSignal.timeout(2000) });
      if (response.ok) { ready = true; break; }
    } catch { /* Wait for the server to bind and compile. */ }
    await delay(250);
  }
  if (!ready) throw new Error(`Astro did not become ready:\n${serverLog}`);
  browser = await chromium.launch({ headless: true });
  for (const device of [
    { name: 'desktop', width: 1440, height: 900 },
    { name: 'mobile', width: 390, height: 844 },
  ]) {
    const context = await browser.newContext({
      viewport: { width: device.width, height: device.height },
      isMobile: device.name === 'mobile', hasTouch: device.name === 'mobile',
    });
    const page = await context.newPage();
    page.on('pageerror', (error) => errors.push(`${device.name}: ${error.message}`));
    page.on('response', (response) => {
      if (response.status() >= 400 && response.url().startsWith(base)) {
        errors.push(`${device.name}: HTTP ${response.status()} ${response.url()}`);
      }
    });
    const capture = async (name) => {
      await page.screenshot({ path: `${output}/${device.name}-${name}.png` });
    };
    const visit = async (route) => {
      const response = await page.goto(`${base}${route}`);
      assert.equal(response.status(), 200, `${route} must load`);
      // A new desktop page starts with the pointer at (0, 0), over the hover menu.
      await page.mouse.move(device.width - 20, device.height - 20);
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(3000); // Let entrance animations settle before capture.
    };
    await visit('/');
    await capture('home');
    await page.locator('.spine-nav .tab').click();
    assert.equal(await page.locator('.spine-nav .tab').getAttribute('aria-expanded'), 'true');
    await page.waitForTimeout(500);
    await capture('menu');
    await page.locator('.spine-nav .tab').click();
    const scenes = await page.locator('[data-scene]').count();
    for (let i = 0; i < scenes; i++) {
      await page.locator('[data-scene]').nth(i).evaluate((el) => {
        window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY + 100);
      });
      await page.waitForTimeout(500);
      await capture(`about-${i + 1}`);
    }
    await visit('/work');
    await capture('work');
    const thumbs = page.locator('[data-thumb]');
    const projects = await thumbs.count();
    for (let i = 0; i < projects; i++) {
      await thumbs.nth(i).click();
      await page.waitForFunction((index) => document.querySelector(`[data-thumb="${index}"]`)?.getAttribute('aria-current') === 'true', i);
      await page.waitForTimeout(1200);
      await page.locator('.frame[data-front="1"]').click();
      await page.locator('dialog[open]').waitFor();
      await page.waitForTimeout(500);
      await capture(`project-${i + 1}`);
      await page.locator('[data-close]').click();
      await page.locator('dialog[open]').waitFor({ state: 'hidden' });
    }
    await visit('/contact');
    await capture('contact');
    assert.match(await page.locator('a.addr').getAttribute('href'), /^mailto:/);
    results.push({ viewport: device, pages: ['/', '/work', '/contact'], menu: 'passed', projectDialogs: projects, screenshots: 'captured' });
    await context.close();
  }
  assert.deepEqual(errors, [], 'Browser must have no uncaught JS errors or local HTTP failures');
  console.log(`Browser review check passed. Screenshots and results: ${output}`);
} catch (error) {
  errors.push(error.stack);
  console.error(error);
  process.exitCode = 1;
} finally {
  await browser?.close();
  shutdown();
  await serverDone;
  await writeFile(`${output}/server.log`, serverLog);
  await writeFile(`${output}/results.json`, JSON.stringify({ capturedAt: new Date().toISOString(), results, errors }, null, 2));
}
