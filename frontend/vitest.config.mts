import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// `.mts` so Vite loads this as ESM — a `.ts` config gets loaded as CommonJS
// and warns about the ESM syntax below.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Mirrors the `@/*` alias in tsconfig.json.
      "@": import.meta.dirname,
      // next/font is a build-time SWC transform, not a runtime module — see the
      // header comment in the stub for why importing it here throws.
      "next/font/google": `${import.meta.dirname}/tests/mocks/next-font-google.ts`,
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    include: ["tests/**/*.test.{ts,tsx}"],
  },
});
