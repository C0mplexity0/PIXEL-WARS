import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      "@pixel-wars/core": path.resolve(__dirname, "../pixel-wars-core/src"), // Using this method instead of a workspace dependency ensures that changes to the core package apply to the client without rebuilding
    },
  },
});
