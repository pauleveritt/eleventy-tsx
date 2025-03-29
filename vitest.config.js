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
    include: [
      "./components/**/*.test.{ts,tsx}",
      "./_layouts/**/*.test.{ts,tsx}",
      "./tests/*.test.{ts,tsx}",
    ],
    isolate: false,
    setupFiles: ["./setup.vitest.ts"],
    testTimeout: 15000,
  },
});
