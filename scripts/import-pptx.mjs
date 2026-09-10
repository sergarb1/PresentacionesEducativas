#!/usr/bin/env node

/**
 * import-pptx.mjs
 * Convierte un PPTX (NotebookLM, etc.) a presentación Slidev.
 *
 * Uso:
 *   npm run import                          # usa input/entrada.pptx
 *   npm run import -- ruta/al/archivo.pptx  # ruta personalizada
 *
 * Genera:
 *   output/slides.md          — presentación Slidev lista
 *   public/images/            — imágenes extraídas del PPTX
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

console.log(`📄 Procesando: ${basename(pptxPath)}`);

// ── 1. Convertir texto a markdown ──
const bytes = new Uint8Array(await readFile(pptxPath));
const result = await toMarkdown(bytes);
const rawMarkdown = result;

console.log(`✅ Texto extraído (${rawMarkdown.length} caracteres)`);

// ── 2. Extraer imágenes del PPTX (es un ZIP) ──
await mkdir(PUBLIC_IMG_DIR, { recursive: true });

const images = [];
try {
  // Descomprimir el PPTX para acceder a ppt/media/
  const tmpDir = join(OUTPUT_DIR, '.tmp_pptx');
  execSync(`unzip -o -q "${pptxPath}" -d "${tmpDir}"`, { stdio: 'pipe' });

  const mediaDir = join(tmpDir, 'ppt', 'media');
  if (existsSync(mediaDir)) {
    const { readdirSync } = await import('node:fs');
    const files = readdirSync(mediaDir);
    for (const file of files) {
      const src = join(mediaDir, file);
      const dest = join(PUBLIC_IMG_DIR, file);
      await cp(src, dest);
      images.push(file);
    }
    console.log(`🖼️  ${images.length} imágenes extraídas → public/images/`);
  } else {
    console.log(`ℹ️  No se encontraron imágenes embebidas en el PPTX.`);
  }

  // Limpiar temporal
  execSync(`rm -rf "${tmpDir}"`, { stdio: 'pipe' });
} catch (err) {
  console.warn(`⚠️  Error extrayendo imágenes: ${err.message}`);
}

// ── 3. Generar slides.md para Slidev ──
const frontmatter = `---
theme: default
title: "${extractTitle(rawMarkdown)}"
info: "Importado desde ${basename(pptxPath)}"
author: ""
keywords: ""
exportFilename: "${basename(pptxPath, extname(pptxPath))}"
layout: cover
background: /inicio.png
class: text-center
colorSchema: light
drawings:
  persist: false
transition: slide-left
mdc: true
---`;

const endSlide = `---
layout: end
background: /final.png
---`;

// Convertir el markdown extraído en diapositivas Slidev
const contentSlides = convertToSlidevSlides(rawMarkdown, images);

const fullMarkdown = [
  frontmatter,
  '',
  contentSlides,
  '',
  endSlide,
  '',
].join('\n');

await mkdir(OUTPUT_DIR, { recursive: true });
const outPath = join(OUTPUT_DIR, 'slides.md');
await writeFile(outPath, fullMarkdown, 'utf-8');

console.log(`\n🎉 Presentación generada:`);
console.log(`   📄 ${outPath}`);
if (images.length > 0) {
  console.log(`   🖼️  ${join(PUBLIC_IMG_DIR, '')}/ (${images.length} imágenes)`);
}
console.log(`\n   Para verla: npm run dev`);

// ── Funciones auxiliares ──

function extractTitle(md) {
  const lines = md.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('# ')) {
      return trimmed.replace(/^#+\s*/, '').replace(/["']/g, '');
    }
  }
  return 'Presentación importada';
}

function convertToSlidevSlides(md, imageFiles) {
  // Dividir por líneas horizontales que sean separadores de diapositiva
  const lines = md.split('\n');
  const slides = [];
  let currentSlide = [];

  for (const line of lines) {
    // Detectar separadores de diapositiva del PPTX
    if (/^-{3,}$/.test(line.trim()) || /^\*{3,}$/.test(line.trim())) {
      if (currentSlide.length > 0) {
        slides.push(currentSlide.join('\n'));
        currentSlide = [];
      }
    } else {
      currentSlide.push(line);
    }
  }
  if (currentSlide.length > 0) {
    slides.push(currentSlide.join('\n'));
  }

  // Filtrar diapositivas vacías y procesar
  const processed = slides
    .filter(s => s.trim().length > 0)
    .map((slide, i) => processSlide(slide, i, slides.length, imageFiles));

  return processed.join('\n\n---\n\n');
}

function processSlide(slide, index, total, imageFiles) {
  let content = slide.trim();

  // Reemplazar referencias a imágenes extraídas
  if (imageFiles.length > 0) {
    for (const img of imageFiles) {
      // El PPTX puede referenciar imágenes por nombre
      const patterns = [
        new RegExp(`!\\[.*?\\]\\(.*?${escapeRegex(img)}.*?\\)`, 'gi'),
        new RegExp(`!\\[.*?\\]\\(media/${escapeRegex(img)}\\)`, 'gi'),
      ];
      for (const pattern of patterns) {
        content = content.replace(pattern, `![](/images/${img})`);
      }
    }
  }

  // Detectar si es la primera diapositiva (título principal)
  if (index === 0) {
    // Ya tenemos el frontmatter cover, agregar el contenido
    return content;
  }

  // Agregar layout a diapositivas que tengan títulos
  if (/^#\s/.test(content)) {
    return content;
  }

  return content;
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
