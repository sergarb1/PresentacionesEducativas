// Mide cada .slidev-page y marca las que desbordan su propio lienzo (contenido cortado)
// Uso: node measure.mjs <url>   (ej: http://localhost:3030)
//
// Nota: en Slidev 52 la vista ?print no está disponible en el dev server
// (__SLIDEV_FEATURE_PRINT__ solo en export/build) y con ?print todas las
// diapositivas menos la actual quedan con display:none, lo que daba siempre
// "0 desbordamientos" (falso negativo). Esta versión carga directamente la
// ruta /N de cada diapositiva y mide la visible.
import { chromium } from 'playwright-chromium';

const url = process.argv[2];
if (!url) {
  console.error('Uso: node measure.mjs <url>');
  process.exit(1);
}
const base = url.replace(/\/+$/, '');

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

// Descubre el total de diapositivas recorriendo hasta que /N no exista
const rows = [];
for (let n = 1; ; n++) {
  await page.goto(`${base}/${n}`, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(900);
  await page.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready;
  });
  const row = await page.evaluate((esperada) => {
    const vis = [...document.querySelectorAll('.slidev-page')].filter((e) => {
      const cs = getComputedStyle(e);
      return cs.display !== 'none' && e.getBoundingClientRect().height > 50;
    });
    const el = vis.find((e) => e.getAttribute('data-slidev-no') === String(esperada)) || vis[0];
    if (!el) return null;
    const pr = el.getBoundingClientRect();
    const H = pr.height; // alto real del lienzo escalado a la ventana
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
    return { n: Number(el.getAttribute('data-slidev-no')), title, overflow: Math.round(overflow), isCover, culprit, visible: vis.length };
  }, n);
  if (!row) break; // no hay diapositiva: fin
  rows.push(row);
  if (row.visible === 0) break;
  // Seguridad: si el deck acaba, la ruta /n+1 redirige a una existente y row.n se repite
  if (rows.filter((r) => r.n === row.n).length > 1) { rows.pop(); break; }
}

for (const r of rows) {
  if (!r.isCover && r.overflow > 1) console.log(`slide ${String(r.n).padStart(3)}  +${String(r.overflow).padStart(4)}px  ${r.title}  [${r.culprit}]`);
}
const bad = rows.filter((r) => !r.isCover && r.overflow > 1).length;
console.log(`\n${bad} diapositivas desbordan de ${rows.length}`);
await browser.close();
process.exit(0);
