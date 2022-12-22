import { defineConfig } from "vite";

export default defineConfig({
  server: {
    root: "index.html",
    open: "index.html",
  },
  esbuild: {
    // define: {
    //   this:"window"
    // },
  },
});
