import { chromium } from 'playwright-chromium';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await page.goto('http://localhost:3034/1', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(2500);
const res = await page.evaluate(async () => {
  const r = await fetch('/layouts/cover.vue');
  const t = await r.text();
  const m = t.match(/import \{ useSlideContext \} from "([^"]+)"/);
  const r2 = await fetch(m ? m[1] : '/nope');
  const t2 = await r2.text();
  return { importe: m && m[1], statusImport: r2.status, contieneFn: t2.includes('useSlideContext') };
});
console.log(JSON.stringify(res, null, 2));
await browser.close();
