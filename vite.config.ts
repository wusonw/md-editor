import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ["vue"],
      dts: "src/auto-import.dts",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
