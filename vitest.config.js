import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
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
