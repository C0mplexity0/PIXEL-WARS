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
});
