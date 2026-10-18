// Verifica un diagrama del lienzo Excalidraw con Chromium real (fonts + emoji fidedignas).
// Uso: node verify-excalidraw.mjs <salida.png> [ancho] [alto]
// Requiere: lienzo con el diagrama cargado en http://127.0.0.1:3000
import { chromium } from 'playwright-chromium';

const out = process.argv[2] || `${process.env.TEMP}/excali-verify.png`;
const w = Number(process.argv[3] || 1200);
const h = Number(process.argv[4] || 700);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: w, height: h } });
const url = process.env.EXPRESS_SERVER_URL || 'http://127.0.0.1:3000';
await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(2000);
await page.evaluate(async () => { if (document.fonts?.ready) await document.fonts.ready; });
// Zoom-to-fit para encuadrar todo el contenido (atajo: Ctrl+Shift+1 en Excalidraw)
await page.keyboard.press('Control+Shift+1');
await page.waitForTimeout(800);
await page.screenshot({ path: out });
console.log('OK', out);
await browser.close();
