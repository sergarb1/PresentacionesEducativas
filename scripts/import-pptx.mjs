#!/usr/bin/env node

/**
 * import-pptx.mjs
 * Convierte un PPTX a presentación Slidev y genera los 3 formatos:
 *   1. Web offline (HTML estático)
 *   2. PDF
 *   3. PPTX
 *
 * Uso:
 *   npm run import                          # usa input/entrada.pptx
 *   npm run import -- ruta/al/archivo.pptx  # ruta personalizada
 *
 * Genera en output/:
 *   slides.md          — fuente Slidev
 *   <nombre>/          — web offline (HTML)
 *   <nombre>.pdf       — PDF
 *   <nombre>.pptx      — PPTX
 */

import { readFile, mkdir, writeFile, cp } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, basename, extname, resolve } from 'node:path';
import { execSync } from 'node:child_process';
import { toMarkdown } from '@mdgate/pptx';

const ROOT = resolve(import.meta.dirname, '..');
const INPUT_DIR = join(ROOT, 'input');
const OUTPUT_DIR = join(ROOT, 'output');
const PUBLIC_IMG_DIR = join(ROOT, 'public', 'images');

// ── Args ──
const pptxArg = process.argv[2];
const pptxPath = pptxArg
  ? resolve(pptxArg)
  : join(INPUT_DIR, 'entrada.pptx');

if (!existsSync(pptxPath)) {
  console.error(`❌ No se encontró: ${pptxPath}`);
  console.error(`   Coloca el PPTX en input/ o pasa la ruta como argumento.`);
  process.exit(1);
}

const baseName = basename(pptxPath, extname(pptxPath));
console.log(`📄 Procesando: ${basename(pptxPath)}\n`);

// ── 1. Convertir texto a markdown ──
const bytes = new Uint8Array(await readFile(pptxPath));
const rawMarkdown = await toMarkdown(bytes);
console.log(`✅ Texto extraído (${rawMarkdown.length} caracteres)`);

// ── 2. Extraer imágenes del PPTX ──
await mkdir(PUBLIC_IMG_DIR, { recursive: true });
const images = [];

try {
  const tmpDir = join(OUTPUT_DIR, '.tmp_pptx');
  execSync(`unzip -o -q "${pptxPath}" -d "${tmpDir}"`, { stdio: 'pipe' });

  const mediaDir = join(tmpDir, 'ppt', 'media');
  if (existsSync(mediaDir)) {
    const { readdirSync } = await import('node:fs');
    for (const file of readdirSync(mediaDir)) {
      await cp(join(mediaDir, file), join(PUBLIC_IMG_DIR, file));
      images.push(file);
    }
    console.log(`🖼️  ${images.length} imágenes → public/images/`);
  }
  execSync(`rm -rf "${tmpDir}"`, { stdio: 'pipe' });
} catch (err) {
  console.warn(`⚠️  Imágenes: ${err.message}`);
}

// ── 3. Generar slides.md ──
const STYLES_DIR = join(ROOT, 'styles');
const cssFiles = ['variables.css', 'typography.css', 'components.css', 'layout.css'];
let googleFontsImport = '';
let inlinedCSS = '';
for (const f of cssFiles) {
  try {
    let css = await readFile(join(STYLES_DIR, f), 'utf-8');
    // Extract @import from typography.css to put at top
    const importMatch = css.match(/@import url\([^)]+\);?\s*/);
    if (importMatch) {
      googleFontsImport += importMatch[0];
      css = css.replace(importMatch[0], '');
    }
    inlinedCSS += css + '\n\n';
  } catch {}
}

const frontmatter = `---
theme: default
title: "${extractTitle(rawMarkdown)}"
info: "1º DAW — Desenvolupament d'Aplicacions Web"
author: "Sergi García Barea"
keywords: ""
exportFilename: "${baseName}"
layout: cover
background: /inicio.png
class: text-center
colorSchema: light
drawings:
  persist: false
transition: slide-left
mdc: true
---`;

const styleBlock = `
<style>
${googleFontsImport}
${inlinedCSS}
</style>`;

const endSlide = `---
layout: end
background: /final.png
---`;

await mkdir(OUTPUT_DIR, { recursive: true });
const outPath = join(OUTPUT_DIR, 'slides.md');
await writeFile(outPath, [frontmatter, styleBlock, '', convertToSlidevSlides(rawMarkdown, images), '', endSlide, ''].join('\n'), 'utf-8');
console.log(`📄 slides.md → ${outPath}`);

// ── Copiar public/ a output/public/ para que Slidev sirva las imágenes ──
const outputPublic = join(OUTPUT_DIR, 'public');
try {
  execSync(`rm -rf "${outputPublic}" && cp -r "${join(ROOT, 'public')}" "${outputPublic}"`, { stdio: 'pipe' });
  console.log(`📁 public/ → output/public/`);
} catch (err) {
  console.warn(`⚠️  Copiar public/: ${err.message}`);
}

// ── Copiar layouts/ a output/layouts/ para que Slidev los encuentre ──
const outputLayouts = join(OUTPUT_DIR, 'layouts');
const srcLayouts = join(ROOT, 'layouts');
if (existsSync(srcLayouts)) {
  try {
    execSync(`rm -rf "${outputLayouts}" && cp -r "${srcLayouts}" "${outputLayouts}"`, { stdio: 'pipe' });
    console.log(`📁 layouts/ → output/layouts/`);
  } catch (err) {
    console.warn(`⚠️  Copiar layouts/: ${err.message}`);
  }
}

// ── 4. Web offline (HTML estático) ──
console.log(`\n🌐 Generando web offline...`);
try {
  execSync(`npx slidev build "${outPath}" --base / --out "${baseName}"`, {
    cwd: ROOT, stdio: 'inherit'
  });
  // Mover de root/baseName a output/baseName si existe
  const builtDir = join(ROOT, baseName);
  const targetDir = join(OUTPUT_DIR, baseName);
  if (existsSync(builtDir) && builtDir !== targetDir) {
    execSync(`rm -rf "${targetDir}" && mv "${builtDir}" "${targetDir}"`, { stdio: 'pipe' });
  }
  console.log(`✅ Web offline → output/${baseName}/`);
} catch (err) {
  console.warn(`⚠️  Build: ${err.message}`);
}

// ── 5. PDF ──
console.log(`\n📑 Exportando PDF...`);
try {
  execSync(`npx slidev export "${outPath}" --output "${join(OUTPUT_DIR, baseName + '.pdf')}"`, {
    cwd: ROOT, stdio: 'inherit'
  });
  console.log(`✅ PDF → output/${baseName}.pdf`);
} catch (err) {
  console.warn(`⚠️  PDF: ${err.message}`);
}

// ── 6. PPTX ──
console.log(`\n📊 Exportando PPTX...`);
try {
  execSync(`npx slidev export "${outPath}" --format pptx --output "${join(OUTPUT_DIR, baseName + '.pptx')}"`, {
    cwd: ROOT, stdio: 'inherit'
  });
  console.log(`✅ PPTX → output/${baseName}.pptx`);
} catch (err) {
  console.warn(`⚠️  PPTX: ${err.message}`);
}

console.log(`\n🎉 ¡Todo listo! Revisa output/`);
console.log(`   🌐 Web:   output/${baseName}/index.html`);
console.log(`   📑 PDF:   output/${baseName}.pdf`);
console.log(`   📊 PPTX:  output/${baseName}.pptx`);

// ── Helpers ──

function extractTitle(md) {
  for (const line of md.split('\n')) {
    const t = line.trim();
    if (t.startsWith('# ')) return t.replace(/^#+\s*/, '').replace(/["']/g, '');
  }
  return 'Presentación importada';
}

function convertToSlidevSlides(md, imageFiles) {
  const slides = [];
  let current = [];
  for (const line of md.split('\n')) {
    if (/^-{3,}$/.test(line.trim()) || /^\*{3,}$/.test(line.trim())) {
      if (current.length > 0) { slides.push(current.join('\n')); current = []; }
    } else {
      current.push(line);
    }
  }
  if (current.length > 0) slides.push(current.join('\n'));

  return slides
    .filter(s => s.trim().length > 0)
    .map(slide => {
      let c = slide.trim();
      for (const img of imageFiles) {
        c = c.replace(new RegExp(`!\\[.*?\\]\\(.*?${escapeRegex(img)}.*?\\)`, 'gi'), `![](/images/${img})`);
      }
      return c;
    })
    .join('\n\n---\n\n');
}

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
