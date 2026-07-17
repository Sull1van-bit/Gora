import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Required for Capacitor: use relative paths so native apps can load assets
  base: './',
  build: {
    outDir: 'dist',
  },
  server: {
    proxy: {
      '/api/jakpost': {
        target: 'https://jakpost.vercel.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/jakpost/, '/api')
      }
    }
  }
})

