import { chromium } from 'playwright-chromium'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } })
const base = process.argv[2] || 'http://localhost:3030'
const total = Number(process.argv[3] || 33)
await page.goto(base, { waitUntil: 'networkidle' })
for (let i = 1; i <= total; i++) {
  await page.goto(`${base}/${i}`, { waitUntil: 'networkidle' }).catch(() => {})
  await page.waitForTimeout(400)
  const info = await page.evaluate(() => {
    const root = [...document.querySelectorAll('.slidev-layout')].find(el => {
      const r = el.getBoundingClientRect()
      return r.width > 500 && r.height > 300
    }) || document.querySelector('.slidev-layout')
    if (!root) return { layout: 'none', chars: 0 }
    const isClosing = !!root.querySelector('.slidev-layout.closing') || root.className.includes('closing')
    const isCover = root.className.includes('cover')
    const text = (root.innerText || '').replace(/\s+/g, ' ').trim()
    return { layout: root.className.split(' ').slice(0, 3).join(' '), isCover, isClosing, chars: text.length, sample: text.slice(0, 50) }
  })
  if (info.chars < 40 && !info.isCover && !info.isClosing) {
    console.log(`slide ${i}: VACÍA/SOSA — layout=[${info.layout}] chars=${info.chars} sample="${info.sample}"`)
  } else if (info.chars < 40) {
    console.log(`slide ${i}: (corporativa ${info.isCover ? 'cover' : 'closing'}, ok)`)
  }
}
console.log('fin del barrido')
await browser.close()
