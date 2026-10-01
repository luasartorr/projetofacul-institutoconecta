import {
    iniciarRouter
} from "./router.js";

import {
    iniciarEventos
} from "./ui.js";

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const app =
            document.querySelector("#app");

        /*
         * A versão atual publicada utiliza páginas HTML
         * independentes. A estrutura de SPA permanece
         * disponível, mas só é inicializada quando existe
         * o container #app.
         */
        if (!app) {
            return;
        }

        iniciarEventos();
        iniciarRouter();
    }
);
