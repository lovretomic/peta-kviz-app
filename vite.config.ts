import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    react(),
    svgr({
      include: "**/*.svg?react",
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "/src/styles/_colors.scss";
          @import "/src/styles/_fonts.scss";
          @import "/src/styles/_breakpoints.scss";
        `,
      },
    },
  },
});
