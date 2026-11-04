import { viteSingleFile } from 'vite-plugin-singlefile'

// STANDALONE=1 → build de un único .html autoalojado (doble click, file://).
// Sin la variable, la config queda vacía y build/export van como siempre.
const standalone = process.env.STANDALONE === '1'

// Rolldown (vite 8) no permite manualChunks (lo inyecta Slidev) junto al
// codeSplitting:false que fuerza vite-plugin-singlefile para lograr un único
// chunk: lo eliminamos en este outputOptions, que va después del del plugin.
const stripManualChunks = () => ({
  name: 'standalone:strip-manual-chunks',
  outputOptions(out) {
    if (out && typeof out === 'object')
      delete out.manualChunks
  },
})

export default standalone
  ? {
      plugins: [viteSingleFile(), stripManualChunks()],
      build: {
        assetsInlineLimit: 100000000,
        cssCodeSplit: false,
      },
    }
  : {}
