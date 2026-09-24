import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  base: '/Laila-Estetica-Lp-React-Ts/',
  server: {
    watch: {
      usePolling: true,
    },
  },
})
