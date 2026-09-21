import { chromium } from 'playwright-chromium';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await page.goto('http://localhost:3034/1', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(2500);
// Prueba rutas alternativas para el módulo de contexto
const res = await page.evaluate(async () => {
  const rutas = [
    '/@fs' + location.origin + '/node_modules/@slidev/client/context.ts',
    '/node_modules/@slidev/client/context.ts',
  ];
  const out = [];
  for (const ruta of ['/node_modules/@slidev/client/context.ts']) {
    const r = await fetch(ruta);
    const t = await r.text();
    out.push({ ruta, status: r.status, es JS: r.headers.get('content-type').includes('javascript'), tiene: t.includes('export function useSlideContext') || t.includes('useSlideContext') });
  }
  return out;
});
console.log(JSON.stringify(res, null, 2));
await browser.close();
