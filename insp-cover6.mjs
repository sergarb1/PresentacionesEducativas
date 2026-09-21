import { chromium } from 'playwright-chromium';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await page.goto('http://localhost:3034/1', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(2500);
const res = await page.evaluate(async () => {
  const r = await fetch('/@slidev/client/context');
  return { status: r.status, tipo: r.headers.get('content-type'), inicio: (await r.text()).slice(0, 200) };
});
console.log(JSON.stringify(res, null, 2));
await browser.close();
