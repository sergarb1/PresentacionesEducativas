// Detalle de elementos que desbordan en una diapositiva dada
// Uso: node debug-overflow.mjs <url> <no-slide>
import { chromium } from 'playwright-chromium';

const url = process.argv[2];
const no = process.argv[3];
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await page.goto(`${url.replace(/\/+$/, '')}/${no}`, { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(1500);
await page.evaluate(async () => { if (document.fonts?.ready) await document.fonts.ready; });
await page.waitForTimeout(400);

const detail = await page.evaluate(() => {
  const el = [...document.querySelectorAll('.slidev-page')].find((e) => {
    const cs = getComputedStyle(e);
    return cs.display !== 'none' && e.getBoundingClientRect().height > 50;
  });
  const pr = el.getBoundingClientRect();
  const H = pr.height;
  const hijos = [...el.querySelectorAll('*')]
    .filter((c) => { const r = c.getBoundingClientRect(); return r.height > 0 && r.bottom - pr.top > H; })
    .slice(0, 12)
    .map((c) => ({
      tag: c.tagName, cls: String(c.className).slice(0, 60),
      bottom: Math.round(c.getBoundingClientRect().bottom - pr.top),
      exceso: Math.round(c.getBoundingClientRect().bottom - pr.top - H),
      h: Math.round(c.getBoundingClientRect().height),
      texto: (c.textContent || '').trim().slice(0, 40),
    }));
  return { H: Math.round(H), scrollH: el.scrollHeight, hijos };
});
console.log(JSON.stringify(detail, null, 2));
await browser.close();
