// Captura una diapositiva: node screenshot.mjs <url> <no> [salida.png]
import { chromium } from 'playwright-chromium';

const url = process.argv[2];
const no = process.argv[3];
const out = process.argv[4] || `/tmp/slide-${no}.png`;
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await page.goto(`${url.replace(/\/+$/, '')}/${no}`, { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(2000);
await page.evaluate(async () => { if (document.fonts?.ready) await document.fonts.ready; });
await page.waitForTimeout(500);
await page.screenshot({ path: out });
console.log('Guardada en', out);
await browser.close();
