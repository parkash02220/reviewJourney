import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    historyApiFallback: true,
    port: 5173,
    host: '0.0.0.0',
    strictPort: true,
    allowedHosts: ['all', '43128958fc4b.ngrok-free.app'],
    origin: 'https://43128958fc4b.ngrok-free.app',
  },
})
