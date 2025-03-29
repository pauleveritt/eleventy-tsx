import { defineConfig } from "vitest/config";
import { resolve } from "node:path";

export default defineConfig({
  resolve: {
    alias: {
      "@components": resolve(__dirname, "./components"),
    },
  },
  test: {
    environment: "happy-dom",
    forceRerunTriggers: ["./{components,tests/stubs}/**/*"],
    include: ["./{_layouts,site,src,components,tests}/**/*.test.{ts,tsx}"],
    isolate: false,
    setupFiles: ["./setup.vitest.ts"],
    testTimeout: 15000,
  },
});
