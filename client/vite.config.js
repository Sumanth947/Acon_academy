// client/vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // so you can import like `import Foo from '@/components/Foo'`
      '@': path.resolve(__dirname, 'src'),
    },
    // file extensions to try when resolving imports
    extensions: ['.js', '.jsx', '.json'],
  },
  server: {
    port: 3000,
    open: true,
  },
  optimizeDeps: {
    // force these into Vite’s pre‐bundle step :contentReference[oaicite:0]{index=0}
    include: [
      'react-router-dom',
      'lucide-react',
      '@shadcn/ui',
    ],
    // if you had CJS‐only packages you wanted to skip, list them here
    exclude: [],
    // if you really want to bust the cache on every start:
    // force: true,
  },
  build: {
    // target modern browsers; adjust if you need IE11, etc.
    target: ['es2020'],
    sourcemap: true,
  },
})
