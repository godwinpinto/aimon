import { crx } from "@crxjs/vite-plugin";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { resolve } from "path";
import { defineConfig } from "vite";
import manifest from "./manifest.json";

const srcDir = resolve(__dirname, "src");
const outDir=resolve(__dirname,"dist");
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [svelte(), crx({ manifest})],
    build: {
        outDir,
        emptyOutDir:true,
        rollupOptions: {
          input: {
            options: resolve(__dirname, 'src/options/options.html'),
          },
        },
    },
     resolve: {
        alias: {
            src: srcDir,
        },
    },
 });


