import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    historyApiFallback: true,
    port: 5173,
    host: '0.0.0.0',
    strictPort: true,
    allowedHosts: ['all', 'b79e-112-196-50-213.ngrok-free.app'],
    origin: 'https://b79e-112-196-50-213.ngrok-free.app',
  },
})
