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
})
