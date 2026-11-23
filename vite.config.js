import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 5173,
    allowedHosts: true,
  },
  preview: {
    host: "0.0.0.0",
    port: 4173,
    allowedHosts: true,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, "index.html"),
        privacidade: resolve(import.meta.dirname, "politica-de-privacidade.html"),
        termos: resolve(import.meta.dirname, "termos-de-uso.html"),
        obrigado: resolve(import.meta.dirname, "obrigado.html"),
        notfound: resolve(import.meta.dirname, "404.html"),
      },
    },
  },
});
