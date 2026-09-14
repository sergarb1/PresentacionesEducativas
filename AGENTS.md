# AGENTS.md — Presentaciones Educativas Slidev

## Configuración del proyecto

- **Framework**: Slidev 52.x (@slidev/cli + @slidev/theme-default)
- **Estilo**: Flat Design / Swiss Modernism, light mode, net, professional
- **Tipografia**: Inter (800/700/600/500/400) + JetBrains Mono per a codi
- **Idioma**: castellà per defecte, valencià per a contingut educatiu
- **FP**: prioritzar procediments, eines, casos professionals
- **Resolució**: 1920×1080 (Full HD, 16:9)

## Regles permanents

### Imatges corporatives
- `public/images/fondo.png` → SOLO fons de la primera diapositiva (mitjançant `layout: cover` a `layouts/cover.vue`)
- `public/images/fondoFin.png` → SOLO fons de l'última diapositiva (mitjançant `layout: closing` a `layouts/closing.vue`)
- `public/images/logoCEEDCV.png` → Logo institucional en portada (position: absolute, top-left)
- `public/images/logoCCBYSA.png` → Logo Creative Commons en tancament (centrat)
- Les diapositives intermèdies NUNCA utilitzen estes imatges com a fons

### Disseny
- Light mode per defecte (#FFFFFF, #F8F9FA)
- Contrast WCAG AAA: text principal #1A1A2E sobre fons clar
- Una idea per diapositiva (`---`)
- Combinar tipus: concepte, codi, terminal, diagrama, activitat, taula, etc.
- Un sol color accent per presentació (#2563EB per defecte)
- Escala tipogràfica moderada: base de 18 px; títol de portada de 2.6 rem. No augmentar-la sense revisar la composició.
- Taules amb cantonades redones (`border-radius: 12px`) i capçalera blava
- Cap element pot superar la mida de la diapositiva (sense desbordaments)

### Components i Estils
Tots els estils compartits es defineixen a `styles/index.css`:
- `.warning` / `.info` / `.success` — caixes d'avís
- `.step` / `.step-number` / `.step-content` — processos numerats
- `.features-grid` / `.feature-item` / `.feature-icon` — graella de característiques
- `.comparison-grid` / `.comparison-item` (.good / .bad) — comparació correcte/incorrecte
- `.code-card` — bloc de codi estil targeta amb capçalera i botons
- `.terminal` — simulació de terminal amb prompts
- `.question-card` / `.question-icon` / `.answer-card` — targetes de preguntes i solucions
- `.badge` (`.badge-blue`, `.badge-purple`, `.badge-teal`, `.badge-orange`, `.badge-pink`, `.badge-green`)
- `.two-cols` — maquetació en 2 columnes

### Contingut Markdown
- Els Markdown font viuen a `input/`; `slides/` només conserva HTML heretat o material pendent de convertir.
- Les entrades de l'arrel importen el Markdown de `input/` perquè Slidev carregue els estils i layouts compartits.
- Nomenclatura obligatòria: `udXX-modul-tema.md`, amb el mòdul en minúscules (`ud01-prg-...`, `ud01-psp-...`). L'entrada de l'arrel i el Markdown d'`input/` han de compartir el mateix nom.
- No executar Slidev directament contra un fitxer d'`input/`: usa sempre l'entrada de l'arrel corresponent o `slides.md`.
- Els fitxers Markdown d'`input/` són material docent local i no es versionen; els HTML heretats tampoc.
- Separador de diapositives: `---`.
- Frontmatter YAML per a configuració general de la presentació o de cada diapositiva.
- Codi amb blocs tancats de markdown (```java) o targetes `.code-card`.

## Comandos

```bash
npm run dev -- ud01-prg-pensament-computacional-bloc-01.md
npm run build -- ud01-psp-python-basico-flujo-funciones.md --out dist/python-flujo
npm run export -- ud01-psp-python-basico-tipos-colecciones.md --format pdf --output output/python.pdf
npm run export -- ud01-psp-python-basico-tipos-colecciones.md --format pptx --output output/python.pptx
npm run export -- ud01-psp-python-basico-tipos-colecciones.md --format png --output output/python
```

`npm run build` genera una web estàtica; `npm run export` admet els formats `pdf`, `png`, `pptx` i `md`. Si Chromium no pot iniciar-se dins del sandbox, PDF, PNG i PPTX necessiten executar-se fora d'este.

## Estructura

```
Presentaciones/
├── styles/
│   └── index.css               # Estils compartits (variables + components + layouts)
├── layouts/
│   ├── cover.vue               # Layout de portada (fons fondo.png + logo CEEDCV + autor)
│   └── closing.vue             # Layout de tancament (fons fondoFin.png + logos centrats)
├── public/
│   └── images/
│       ├── fondo.png           # Fons de portada
│       ├── fondoFin.png        # Fons de tancament
│       ├── logoCCBYSA.png      # Logo Creative Commons
│       └── logoCEEDCV.png      # Logo Generalitat Valenciana / CEEDCV
├── input/                      # Markdown font local (ignorat per Git)
│   └── udXX-modul-tema.md
├── slides/                     # HTML heretat / material a convertir
├── udXX-modul-tema.md          # Entrada Slidev que importa input/udXX-modul-tema.md
├── slides.md                   # Presentació principal / índex
├── output/                     # Exportacions generades (ignorat per Git)
├── package.json
├── .gitignore
├── AGENTS.md                   # Aquest fitxer
├── README.md
└── LICENSE
```

## Plantilla Slidev (Nova Presentació)

```markdown
---
theme: default
title: "Unitat XX — Títol Unitat"
author: Sergi García Barea
layout: cover
fonts:
  sans: 'Inter'
  mono: 'JetBrains Mono'
drawings:
  persist: false
transition: slide-left
mdc: false
---

# Unitat XX — Títol Unitat<br>Bloc XX

## 1r CFGS DAW · Programació

---
---

## Títol Diapositiva
### Subtítol o context

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content">Primer pas del procés.</div>
</div>

<div class="info">
  Caixa d'informació destacada.
</div>

---
layout: closing
---
```
