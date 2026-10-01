import { defineConfig } from "vite";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
    base: "/projetofacul-institutoconecta/",

    build: {
        outDir: "dist",
        emptyOutDir: true,
        minify: "oxc",

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
