/// <reference types="vitest" />
import { defineConfig } from "vite";

export default defineConfig({
  test: {
    environment: "jsdom", // ini yang bikin localStorage tersedia saat test
    globals: true, // biar gak perlu import describe/it/expect manual
  },
});
