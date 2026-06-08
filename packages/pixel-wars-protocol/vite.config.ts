import { defineConfig } from "vite";
import path from "path";
import dts from "unplugin-dts/vite";

// https://vite.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(import.meta.dirname, "src/index.ts"),
      name: "PixelWarsProtocol",
      fileName: "index",
    },
  },
  plugins: [dts()],
  resolve: {
    alias: {
      "@pixel-wars/client": path.resolve(__dirname, "../pixel-wars-client/src"), // Using this method instead of a workspace dependency ensures that changes to the core package apply to the client without rebuilding
      "@pixel-wars/core": path.resolve(__dirname, "../pixel-wars-core/src"),
      "@pixel-wars/utils": path.resolve(__dirname, "../pixel-wars-core/src"),
    },
  },
});
