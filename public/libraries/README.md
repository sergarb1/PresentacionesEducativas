# Librerías de Excalidraw — catálogo local

Ficheros `.excalidrawlib` descargados del catálogo oficial
(<https://libraries.excalidraw.com>), tema light, listos para usar en los
diagramas del proyecto (redes, programación, algoritmos y estructura de datos).

## Catálogo

| Fichero | Items | Formato | Autor | Uso principal |
|---|---:|---|---|---|
| `network-topology-icons.excalidrawlib` | 10 | v2 | dwelle | **Redes**: router, switch, hub, firewall, VPN, servidor, cliente, ordenadores 3D |
| `algorithms-data-structures-arrays-matrices-trees.excalidrawlib` | 22 | v2 | intradeus | **Algoritmos / EDA**: arrays (numerados), listas enlazadas, tablas hash, árboles, rotaciones, NIL |
| `decision-flow-control.excalidrawlib` | 8 | v1 | aretecode | **Flujo de control**: rombos de condición sí/no para diagramas de decisión |
| `software-architecture.excalidrawlib` | 7 | v1 | youritjang | Arquitectura software: caché, BD, cliente/servidor, pipeline |
| `uml-er.excalidrawlib` | 21 | v1 | BjoernKW | UML y diagramas ER: clases, relaciones, cardinalidad |
| `programming-icons.excalidrawlib` | 65 | v2 | xxxdeveloper | Iconos de lenguajes y tipos de fichero (java, python, js, sql, css…) |
| `it-logos.excalidrawlib` | 31 | v2 | pclainchard | Logos IT: Docker, Kubernetes, GitLab, Python, React… |
| `graphs.excalidrawlib` | 12 | v1 | jakubpawlina | Grafos clásicos (Petersen, bipartitos…) |
| `stick-figures.excalidrawlib` | 9 | v2 | youritjang | Personajes para actores y escenas |

Fuente de cada librería: `https://libraries.excalidraw.com/libraries/<autor>/<nombre>.excalidrawlib`
(catálogo completo en `https://libraries.excalidraw.com/libraries.json`).

## Cómo usarlas

**Desde el agente (canvas de mcp-excalidraw-server)** — el canvas no carga
`.excalidrawlib` directamente; usar el helper `scripts/lib-add.mjs`:

```bash
# 1. Ver el catálogo de una librería (índices, tamaños, etiquetas)
node scripts/lib-add.mjs --list public/libraries/network-topology-icons.excalidrawlib

# 2. Insertar items concretos en el lienzo (ej.: router=8, firewall=4, cliente=9)
node scripts/lib-add.mjs public/libraries/network-topology-icons.excalidrawlib 8 4 9 \
  | npx -y mcp-excalidraw-server add -
```

El helper normaliza cada item (escala a `--width` px de ancho, 220 por defecto;
regenera ids, grupos, bindings de flechas y textos ligados) y los coloca en fila;
luego se recolocan con `update` / `arrange` como cualquier otro elemento.

**Desde el navegador** (excalidraw.com o el canvas local `http://127.0.0.1:3000`):
menú de librería → «Open» / importar el fichero, o arrastrar el `.excalidrawlib`
al lienzo. Los items se fusionan en la librería persistente del navegador.

## Mantenimiento

```bash
# Descargar o actualizar una librería
curl -fsSL -o public/libraries/<nombre>.excalidrawlib \
  https://libraries.excalidraw.com/libraries/<autor>/<nombre>.excalidrawlib

# Validar tras descargar (debe listar los items; soporta v1 y v2)
node scripts/lib-add.mjs --list public/libraries/<nombre>.excalidrawlib
```

Licencias: las librerías del catálogo oficial se publican para su reutilización
(guidelines en el repo `excalidraw/excalidraw-libraries`); respeta la atribución
del autor en material público.
