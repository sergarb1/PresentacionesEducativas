# Presentaciones Educativas

Presentacions educatives per a FP creades amb **Slidev 52**, en valencià i amb un disseny Flat / Swiss Modernism clar, professional i accessible.

La primera diapositiva utilitza la imatge corporativa `fondo.png`; l'última utilitza `fondoFin.png`. La resta manté un fons clar i una jerarquia tipogràfica pensada per a la projecció en 16:9.

## Requisits

- [Node.js](https://nodejs.org/) 20 o superior
- `npm` (inclòs amb Node.js)

## Inici ràpid

```bash
git clone https://github.com/sergarb1/PresentacionesEducativas.git
cd PresentacionesEducativas
npm install
npm run dev -- ud01-prg-pensament-computacional-bloc-01.md
```

Tots els scripts són genèrics: després de `--` indica sempre l'entrada de l'arrel que vols processar.

```bash
npm run dev -- ud01-psp-python-basico-tipos-colecciones.md
npm run build -- ud01-psp-python-basico-flujo-funciones.md --out dist/python-flujo
```

## Estructura

```text
.
├── ud01-prg-*.md           # Entrades Slidev de Programació
├── ud01-psp-*.md           # Entrades Slidev de Serveis i Processos
├── input/                  # Markdown font local (no versionat)
│   ├── ud01-prg-*.md
│   └── ud01-psp-*.md
├── layouts/
│   ├── cover.vue           # Portada amb fondo.png i logo CEEDCV
│   └── closing.vue         # Tancament amb fondoFin.png i logos
├── styles/index.css        # Tema i components compartits
├── public/images/          # Imatges corporatives
└── output/                 # Exportacions generades (no versionades)
```

Les entrades de l'arrel importen el contingut local de `input/`. És important usar-les en els scripts de Slidev perquè el framework carregue `styles/` i `layouts/`. Tant `input/` com `output/` estan exclosos de Git per mantindre privats els materials docents i les exportacions.

## Crear o editar diapositives

Els fitxers Markdown de `input/` són el contingut editable local. Cada diapositiva se separa amb `---`.

```markdown
---

## Títol de la diapositiva
### Subtítol o context

<div class="info">
  Missatge rellevant per a l'alumnat.
</div>
```

Per a una presentació nova, usa el patró `udXX-modul-tema.md`: per exemple, `ud01-prg-estructures-control.md`. Crea el contingut a `input/` i una entrada amb el mateix nom a l'arrel:

```markdown
---
src: ./input/ud01-prg-estructures-control.md
---
```

El contingut ha d'usar `layout: cover` només en portada i `layout: closing` només al final.

## Components disponibles

| Finalitat | Classes |
| --- | --- |
| Avisos | `.warning`, `.info`, `.success` |
| Processos | `.step`, `.step-number`, `.step-content` |
| Graelles | `.features-grid`, `.feature-item`, `.feature-icon` |
| Comparacions | `.comparison-grid`, `.comparison-item`, `.good`, `.bad` |
| Codi | `.code-card`, `.terminal` |
| Activitats | `.question-card`, `.answer-card` |
| Dues columnes | `.two-cols` |

Tots els estils estan centralitzats en `styles/index.css`.

## Comandes

| Comanda | Descripció |
| --- | --- |
| `npm run dev -- entrada.md` | Obri una presentació en desenvolupament |
| `npm run build -- entrada.md --out dist/nom` | Genera una web estàtica per publicar o servir offline |
| `npm run export -- entrada.md --format pdf --output output/nom.pdf` | Exporta a PDF |
| `npm run export -- entrada.md --format pptx --output output/nom.pptx` | Exporta a PowerPoint |
| `npm run export -- entrada.md --format png --output output/nom` | Exporta una imatge PNG per diapositiva |
| `npm run export -- entrada.md --format md --output output/nom.md` | Exporta a Markdown |
| `npm run format -- entrada.md` | Formata el Markdown de Slidev |

Per a PDF, PNG i PPTX, Slidev usa Chromium mitjançant Playwright. Si és la primera instal·lació, `npm install` descarrega el navegador necessari. La compilació HTML crea una carpeta estàtica; per obrir-la sense internet, conserva tota la carpeta i servix-la amb un servidor local.

## Disseny i imatges corporatives

- Resolució: 1920×1080, format 16:9.
- Tipografies: Inter per al text i JetBrains Mono per al codi.
- Color accent: blau `#2563EB`.
- Escala tipogràfica: 18 px de base; portada amb títol de 2.6 rem per a no saturar la composició.
- `public/images/fondo.png`: només portada.
- `public/images/fondoFin.png`: només tancament.
- No uses les imatges corporatives com a fons en diapositives intermèdies.
- **Contrast en blocs de codi**: Fons oscurs (#1E293B) amb text clar (#E2E8F0). Evitar colors intermedis. Usa `.code-card` o blocs markdown amb Shiki.

## Llicència

[CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
