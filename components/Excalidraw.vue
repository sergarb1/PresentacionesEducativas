<template>
  <p v-if="loading">Loading Excalidraw...</p>
  <p v-else-if="errorMessage">{{ errorMessage }}</p>
  <div v-else-if="svg" :class="$attrs.class" v-html="svg"></div>
</template>

<script setup lang="ts">
/**
 * Override local del componente de slidev-addon-excalidraw.
 *
 * Diferencia clave respecto al addon original: el módulo de exportación de
 * Excalidraw se carga primero desde el vendor local (/vendor/excalidraw/,
 * versionado en el repo) y solo si no está disponible se recurre al CDN
 * (esm.sh). Así las diapositivas renderizan sin conexión y no dependen de
 * bloqueadores ni proxies corporativos.
 */
import { onMounted, ref } from 'vue'

interface ExcalidrawAppState {
  exportWithDarkMode?: boolean
  exportBackground?: boolean
  viewBackgroundColor?: string
  [key: string]: unknown
}

interface ExcalidrawScene {
  elements?: unknown[]
  appState?: ExcalidrawAppState
  files?: Record<string, unknown> | null
}

interface ExcalidrawModule {
  exportToSvg: (scene: {
    elements: readonly unknown[]
    appState: ExcalidrawAppState
    files: Record<string, unknown> | null
  }) => Promise<SVGSVGElement>
}

declare global {
  interface Window {
    EXCALIDRAW_ASSET_PATH?: string | string[]
  }
}

const EXCALIDRAW_VERSION = '0.18.0'
// Vendor local: bundle autocontenido + fuentes en public/vendor/excalidraw/
// La URL se calcula en runtime (no literal en el import) para que Vite no la
// pre-procese: el navegador la sirve como archivo estático de public/.
const LOCAL_MODULE_PATH = 'vendor/excalidraw/excalidraw.bundle.mjs'
const LOCAL_ASSET_PATH = `${import.meta.env.BASE_URL}vendor/excalidraw/`
// Respaldo: el comportamiento original del addon (CDN)
const CDN_MODULE_URL = `https://esm.sh/@excalidraw/excalidraw@${EXCALIDRAW_VERSION}?bundle&exports=exportToSvg`
const CDN_ASSET_PATH = `https://esm.sh/@excalidraw/excalidraw@${EXCALIDRAW_VERSION}/dist/prod/`

let excalidrawModulePromise: Promise<ExcalidrawModule> | null = null

const loading = ref(false)
const errorMessage = ref<string | null>(null)
const svg = ref<string | null>(null)

const props = withDefaults(defineProps<{
  drawFilePath: string
  darkMode?: boolean
  background?: boolean
}>(), {
  darkMode: false,
  background: false,
})

onMounted(async () => {
  loading.value = true
  errorMessage.value = null

  try {
    const { exportToSvg } = await loadExcalidrawModule()
    const drawData = await loadDrawFile(props.drawFilePath)
    const svgElement = await exportToSvg({
      elements: drawData.elements ?? [],
      appState: {
        ...(drawData.appState ?? {}),
        exportWithDarkMode: props.darkMode,
        exportBackground: props.background,
        viewBackgroundColor: drawData.appState?.viewBackgroundColor ?? '#ffffff',
      },
      files: drawData.files ?? null,
    })

    svgElement.style.maxWidth = '100%'
    svgElement.style.height = 'auto'

    // Namespace all IDs to avoid collisions when same file renders on multiple slides
    let svgString = svgElement.outerHTML
    const uniqueSuffix = Math.random().toString(36).substring(2, 9)

    svgString = svgString.replace(/id="([^"]+)"/g, `id="$1-${uniqueSuffix}"`)
    svgString = svgString.replace(/url\(#([^)]+)\)/g, `url(#$1-${uniqueSuffix})`)
    svgString = svgString.replace(/href="#([^"]+)"/g, `href="#$1-${uniqueSuffix}"`)

    svg.value = svgString
  } catch (error) {
    console.error('Failed to load JSON or export to SVG', error)
    errorMessage.value = 'Failed to render Excalidraw.'
  } finally {
    loading.value = false
  }
})

async function loadExcalidrawModule() {
  if (!window.EXCALIDRAW_ASSET_PATH)
    window.EXCALIDRAW_ASSET_PATH = LOCAL_ASSET_PATH

  if (!excalidrawModulePromise) {
    const localUrl = new URL(LOCAL_MODULE_PATH, window.location.origin + import.meta.env.BASE_URL).href
    excalidrawModulePromise = import(
      /* @vite-ignore */
      localUrl
    ).then((mod) => mod as ExcalidrawModule).catch((localError) => {
      console.warn('Vendor local de Excalidraw no disponible; recurriendo al CDN', localError)
      window.EXCALIDRAW_ASSET_PATH = CDN_ASSET_PATH
      return import(
        /* @vite-ignore */
        CDN_MODULE_URL
      ) as Promise<ExcalidrawModule>
    })

    excalidrawModulePromise = excalidrawModulePromise.catch((error) => {
      excalidrawModulePromise = null
      throw error
    })
  }

  return excalidrawModulePromise
}

async function loadDrawFile(path: string): Promise<ExcalidrawScene> {
  const url = new URL(path, window.location.origin + import.meta.env.BASE_URL).href
  const response = await fetch(url)

  if (!response.ok)
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`)

  return response.json()
}
</script>
