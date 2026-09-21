import { chromium } from 'playwright-chromium';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
const errores = [];
page.on('pageerror', (e) => errores.push(String(e).slice(0, 200)));
page.on('console', (m) => { if (m.type() === 'error') errores.push(m.text().slice(0, 200)); });
await page.goto('http://localhost:3034/1', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(3000);
const info = await page.evaluate(() => ({
  tieneCoverAuthor: !!document.querySelector('.cover-author'),
  textoAutor: document.querySelector('.cover-author p')?.textContent?.trim(),
  clasesLayout: document.querySelector('.slidev-page-1 .slidev-layout')?.className,
}));
console.log(JSON.stringify({ ...info, errores: errores.slice(0, 4) }, null, 2));
await browser.close();
