import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");

  return {
    define: {
      "import.meta.env": env,
    },
    plugins: [
      react(),
      svgr({
        include: "**/*.svg?react",
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "/src/styles/global.scss" as *;`,
        },
      },
    },
  };
});
