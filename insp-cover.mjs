import { chromium } from 'playwright-chromium';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await page.goto('http://localhost:3034/1', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(2500);
const info = await page.evaluate(() => {
  const layout = document.querySelector('.slidev-page-1 .slidev-layout');
  const author = document.querySelector('.cover-author p, [class*=author]');
  return {
    clasesLayout: layout?.className,
    tieneCoverAuthor: !!document.querySelector('.cover-author'),
    textoAutor: author?.textContent?.trim(),
  };
});
console.log(JSON.stringify(info, null, 2));
await browser.close();
