import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default ({ mode }) => {
  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": "/src",
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
};
