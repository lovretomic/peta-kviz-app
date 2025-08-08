import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
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
