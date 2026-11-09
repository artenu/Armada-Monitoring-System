import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 1000, // Menaikkan toleransi chunk limit ke 1000 kB
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            // Pisahkan React & React Router ke chunk tersendiri
            if (
              id.includes("react") ||
              id.includes("react-dom") ||
              id.includes("react-router-dom")
            ) {
              return "vendor-react";
            }
            // Pisahkan icon Lucide ke chunk tersendiri
            if (id.includes("lucide-react")) {
              return "vendor-icons";
            }
            // Library pihak ketiga lainnya
            return "vendor";
          }
        },
      },
    },
  },
});
