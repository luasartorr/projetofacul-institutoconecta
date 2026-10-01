import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
    base: "/projetofacul-institutoconecta/",

    build: {
        outDir: "dist",
        emptyOutDir: true,
        minify: "esbuild",

        rollupOptions: {
            input: {
                inicio: resolve(__dirname, "index.html"),
                projetos: resolve(__dirname, "projetos.html"),
                cadastro: resolve(__dirname, "cadastro.html"),
                componentes: resolve(__dirname, "componentes.html")
            }
        }
    }
});
