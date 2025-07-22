import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    historyApiFallback: true,
    port: 5173,
    host: "0.0.0.0",
    strictPort: true,
    allowedHosts: ["all", "14d220485165.ngrok-free.app"],
    origin: "https://14d220485165.ngrok-free.app",
  },
});
