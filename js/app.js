import {
    iniciarRouter
} from "./router.js";

import {
    iniciarEventos
} from "./ui.js";


document.addEventListener(
    "DOMContentLoaded",
    () => {

        iniciarEventos();

        iniciarRouter();

    }
);