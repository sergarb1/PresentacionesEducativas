// Uso: node measure-export.mjs <url>   — mide cada diapositiva en la vista de exportación
// (en la que no hay transform de escala de presentador), equivalente al PDF final.
import { chromium } from 'playwright-chromium';

const url = process.argv[2];
if (!url) { console.error('Uso: node measure-export.mjs <url>'); process.exit(1); }
const base = url.replace(/\/+$/, '');

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

const rows = [];
for (let n = 1; ; n++) {
  await page.goto(`${base}/export/${n}`, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(900);
  await page.evaluate(async () => { if (document.fonts?.ready) await document.fonts.ready; });
  const row = await page.evaluate((esperada) => {
    const vis = [...document.querySelectorAll('.slidev-page')].filter((e) => {
      const cs = getComputedStyle(e);
      return cs.display !== 'none' && e.getBoundingClientRect().height > 50;
    });
    const el = vis.find((e) => e.getAttribute('data-slidev-no') === String(esperada)) || vis[0];
    if (!el) return null;
    const pr = el.getBoundingClientRect();
    const H = pr.height;
    let overflow = 0;
    let culprit = '';
    for (const c of el.querySelectorAll('*')) {
      const r = c.getBoundingClientRect();
      if (r.height > 0 && r.bottom - pr.top > H) {
        const o = r.bottom - pr.top - H;
        if (o > overflow) { overflow = o; culprit = (c.className && String(c.className).slice(0, 50)) || c.tagName; }
      }
    }
    const isCover = !!el.querySelector('.slidev-layout.cover, .slidev-layout.closing');
    const title = el.querySelector('h2')?.textContent.trim().slice(0, 55) || el.querySelector('h1')?.textContent.trim().slice(0, 55) || '(sin título)';
    return { n: Number(el.getAttribute('data-slidev-no')), title, overflow: Math.round(overflow), isCover, culprit, visible: vis.length };
  }, n);
  if (!row) break;
  rows.push(row);
  if (row.visible === 0) break;
  if (rows.filter((r) => r.n === row.n).length > 1) { rows.pop(); break; }
}

for (const r of rows) {
  if (!r.isCover && r.overflow > 1) console.log(`slide ${String(r.n).padStart(3)}  +${String(r.overflow).padStart(4)}px  ${r.title}  [${r.culprit}]`);
}
const bad = rows.filter((r) => !r.isCover && r.overflow > 1).length;
console.log(`\n${bad} diapositivas desbordan de ${rows.length}`);
await browser.close();
process.exit(0);
