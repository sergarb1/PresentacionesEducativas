// Build de una presentación como .html autoalojado: UN solo fichero con CSS, JS
// e imágenes inlineadas. Se abre con doble click (file://) en Chrome/Edge/Firefox,
// sin servidor y sin conexión (las tipografías Google se cargan si hay red y, si
// no, caen a las del sistema).
//
// Uso: node build-standalone.mjs <entrada.md> [--out <carpeta>]
//   ej: node build-standalone.mjs ud01-daw-lubuntu-apache-vhosts.md
//
// Por defecto sale en dist-standalone/<nombre-de-la-entrada>/index.html
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.dirname(fileURLToPath(import.meta.url))
const args = process.argv.slice(2)
let entry = null
let out = null
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--out') out = args[++i]
  else if (!entry) entry = args[i]
}
if (!entry) {
  console.error('Uso: node build-standalone.mjs <entrada.md> [--out <carpeta>]')
  process.exit(1)
}
const base = path.basename(entry).replace(/\.md$/, '')
const outDir = path.resolve(root, out ?? path.join('dist-standalone', base))

execFileSync('npx', ['slidev', 'build', entry, '--out', outDir, '--base', './', '--router-mode', 'hash'], {
  cwd: root,
  stdio: 'inherit',
  env: { ...process.env, STANDALONE: '1' },
})

// ── Inlinear imágenes públicas (CSS url() y new URL() del bundle JS) ─────────
const htmlPath = path.join(outDir, 'index.html')
let html = fs.readFileSync(htmlPath, 'utf8')
const imgDir = path.join(root, 'public', 'images')
let inlined = 0
const missing = []
for (const name of fs.readdirSync(imgDir)) {
  const mime = name.endsWith('.svg') ? 'image/svg+xml' : 'image/png'
  const data = `data:${mime};base64,${fs.readFileSync(path.join(imgDir, name)).toString('base64')}`
  const before = html
  html = html
    .replaceAll('new URL(`images/' + name + '`,import.meta.url).href', '`' + data + '`')
    .replaceAll('url(./images/' + name + ')', `url(${data})`)
    .replaceAll('"/images/' + name + '"', `"${data}"`)
    .replaceAll("'/images/" + name + "'", `'${data}'`)
  if (html !== before) inlined++
  // ¿Queda alguna referencia a esta imagen en algún formato no contemplado?
  if (html.includes('`images/' + name + '`') || html.includes('./images/' + name)
    || html.includes('"/images/' + name + '"') || html.includes("'/images/" + name + "'"))
    missing.push(name)
}
fs.writeFileSync(htmlPath, html)

// Si queda alguna referencia por el estilo, conservamos images/ (todo sigue
// relativo a index.html y el doble click funciona igualmente)
if (missing.length)
  console.warn(`⚠️ No se pudo inlinear: ${missing.join(', ')} → se conserva la carpeta images/`) 

// ── Limpieza: el build copia public/ entero; el standalone solo usa images/ ──
if (!missing.length) {
  for (const d of ['images', 'diagrams', 'libraries', 'vendor'])
    fs.rmSync(path.join(outDir, d), { recursive: true, force: true })
}
for (const f of ['404.html', '_redirects'])
  fs.rmSync(path.join(outDir, f), { force: true })

const kb = (fs.statSync(htmlPath).size / 1024).toFixed(0)
console.log(`\n✅ HTML autoalojado (doble click, file://): ${htmlPath}`)
console.log(`   ${kb} KB · ${inlined} imágenes inlineadas${missing.length ? ' · + carpeta images/' : ''}`)
