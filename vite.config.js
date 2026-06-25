import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vitest config lives here too (test: {...}).
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.js'],
    css: false,
  },
})
