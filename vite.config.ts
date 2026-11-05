import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// URL da API: usa variável de ambiente em produção (definida no workflow),
// cai para localhost em desenvolvimento local.
const API_TARGET =
  process.env.VITE_API_URL ?? 'http://localhost:8080'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: API_TARGET,
        changeOrigin: true,
      },
    },
  },
  build: {
    // Garante que o React Router funcione com refresh direto na URL
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
})
