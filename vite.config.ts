import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react(), tsconfigPaths()],
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/utils/test/setup.ts",
      coverage: {
        provider: "c8",
        include: ["src/**/*.{js,ts}"],
        exclude: ["src/**/__mocks__/**"],
      },
    },
    build: {
      rollupOptions: {
        plugins: [
          mode === "analyze" &&
            visualizer({
              open: true,
              filename: "dist/stats.html",
              gzipSize: true,
              brotliSize: true,
            }),
        ],
        output: {
          manualChunks: undefined,
        },
      },
      emptyOutDir: true,
    },
  };
});
