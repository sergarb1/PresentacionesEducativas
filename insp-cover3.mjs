import { chromium } from 'playwright-chromium';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await page.goto('http://localhost:3034/1', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(2500);
// ¿Qué módulos sirve el dev server para el layout cover del proyecto?
const res = await page.evaluate(async () => {
  const r = await fetch('/layouts/cover.vue', { headers: { accept: '*/*' } });
  const t = await r.text();
  return { status: r.status, tipo: r.headers.get('content-type'), inicio: t.slice(0, 300) };
});
console.log(JSON.stringify(res, null, 2));
await browser.close();
