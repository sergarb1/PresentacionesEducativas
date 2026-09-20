// Comprueba el contraste WCAG de los tokens Shiki sobre su fondo real
// Uso: node check-contrast.mjs <url>
import { chromium } from 'playwright-chromium';

const url = process.argv[2];
if (!url) { console.error('Uso: node check-contrast.mjs <url>'); process.exit(1); }

const lum = (rgb) => {
  const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
  const [r, g, b] = rgb;
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};
const ratio = (c1, c2) => {
  const L1 = lum(c1), L2 = lum(c2);
  return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
};
const parse = (s) => (s.match(/\d+(\.\d+)?/g) || [0, 0, 0]).slice(0, 3).map(Number);

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(url + '?print', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(2500);
await page.evaluate(async () => { if (document.fonts?.ready) await document.fonts.ready; });
await page.waitForTimeout(500);

const report = await page.evaluate(() => {
  const out = [];
  for (const pre of document.querySelectorAll('.slidev-page pre')) {
    const bg = getComputedStyle(pre).backgroundColor;
    const spans = [...pre.querySelectorAll('span')].filter(s => s.textContent.trim());
    out.push({ bg, count: spans.length, colors: [...new Set(spans.map(s => getComputedStyle(s).color))].slice(0, 8), slide: pre.closest('.slidev-page')?.getAttribute('data-slidev-no') });
  }
  return out;
});

let worst = 21;
for (const block of report) {
  if (!block.colors.length) continue;
  const bg = parse(block.bg);
  const ratios = block.colors.map(c => ratio(parse(c), bg));
  const min = Math.min(...ratios);
  worst = Math.min(worst, min);
  if (min < 4.5) {
    console.log(`slide ${block.slide}: FALLO  min=${min.toFixed(2)}  bg=${block.bg}`);
    block.colors.forEach((c, i) => console.log(`   ${ratios[i].toFixed(2)}  ${c}`));
  }
}
console.log(worst >= 4.5 ? `\nOK: contraste minimo ${worst.toFixed(2)}:1 (>= 4.5 AA) en ${report.length} bloques` : `\nFALLO global: ${worst.toFixed(2)}:1`);
await browser.close();
process.exit(0);
