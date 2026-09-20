// Mide cada .slidev-page y marca las que desbordan su propio lienzo (contenido cortado)
// Uso: node measure.mjs <url>   (ej: http://localhost:3030)
import { chromium } from 'playwright-chromium';

const url = process.argv[2];
if (!url) {
  console.error('Uso: node measure.mjs <url>');
  process.exit(1);
}

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(url + '?print', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(2500);
await page.evaluate(async () => {
  if (document.fonts?.ready) await document.fonts.ready;
  window.scrollTo(0, document.body.scrollHeight);
});
await page.waitForTimeout(800);

const rows = await page.evaluate(() => {
  return [...document.querySelectorAll('.slidev-page')].map((el) => {
    const n = Number(el.getAttribute('data-slidev-no') || '?');
    const pr = el.getBoundingClientRect();
    const H = pr.height; // alto real de la página (980x551 sin escala)
    let overflow = 0;
    let culprit = '';
    for (const c of el.querySelectorAll('*')) {
      const r = c.getBoundingClientRect();
      if (r.height > 0 && r.bottom - pr.top > H) {
        const o = r.bottom - pr.top - H;
        if (o > overflow) {
          overflow = o;
          culprit = (c.className && String(c.className).slice(0, 50)) || c.tagName;
        }
      }
    }
    const isCover = !!el.querySelector('.slidev-layout.cover, .slidev-layout.closing');
    const title = el.querySelector('h2')?.textContent.trim().slice(0, 55) || el.querySelector('h1')?.textContent.trim().slice(0, 55) || '(sin título)';
    return { n, title, overflow: Math.round(overflow), isCover, culprit };
  });
});

for (const r of rows) {
  if (!r.isCover && r.overflow > 1) console.log(`slide ${String(r.n).padStart(3)}  +${String(r.overflow).padStart(4)}px  ${r.title}  [${r.culprit}]`);
}
const bad = rows.filter((r) => !r.isCover && r.overflow > 1).length;
console.log(`\n${bad} diapositivas desbordan de ${rows.length}`);
await browser.close();
process.exit(0);
