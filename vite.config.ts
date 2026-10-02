import { defineConfig } from "vite";
import dotenv from "dotenv";
import { fileURLToPath, URL } from "node:url";

dotenv.config();

export default defineConfig({
  server: {
    open: true,
    port: process.env.PORT || 3000,
  },
  preview: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
