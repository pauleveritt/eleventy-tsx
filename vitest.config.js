import { defineConfig } from "vitest/config";

export default defineConfig({
  esbuild: {
    jsx: "transform",
    jsxInject: "import { jsx } from 'jsx-async-runtime/jsx-runtime'",
    jsxFactory: "jsx",
    jsxImportSource: "jsx-async-runtime",
  },
  test: {
    environment: "happy-dom",
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
