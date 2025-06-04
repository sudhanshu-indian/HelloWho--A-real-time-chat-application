import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';

export default defineConfig({
  plugins: [react()],
  server: {
    middlewareMode: false, // needed for fallback setup
    fs: {
      strict: false
    }
  },
  build: {
    outDir: 'dist'
  },
  resolve: {
    alias: {
      util: 'rollup-plugin-node-polyfills/polyfills/util', // Correct alias for `util`
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis', // Define `global` for browser
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true, // Polyfill `Buffer`
          process: true, // Polyfill `process`
        }),
      ],
    },
  },
});
