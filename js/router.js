import {
    obterTemplate
} from "./templates.js";

import {
    aposRenderizacao
} from "./ui.js";


const app =
    document.querySelector("#app");


function obterRota() {

    const hash =
        window.location.hash
            .replace("#", "")
            .trim();

    return hash || "inicio";

}


function atualizarNavegacao(
    rota
) {

    document
        .querySelectorAll(
            'nav a[href^="#"]'
        )
        .forEach(link => {

            const destino =
                link
                    .getAttribute("href")
                    .replace("#", "")
                    .split("/")[0];

            if (
                destino === rota
            ) {

                link.setAttribute(
                    "aria-current",
                    "page"
                );

            } else {

                link.removeAttribute(
                    "aria-current"
                );

            }

        });

}


export function renderizar() {

    const rotaCompleta =
        obterRota();

    const [
        pagina,
        detalhe
    ] =
        rotaCompleta.split("/");


    const paginasValidas = [
        "inicio",
        "projetos",
        "cadastro"
    ];


    const rota =
        paginasValidas.includes(
            pagina
        )
            ? pagina
            : "inicio";


    app.innerHTML =
        obterTemplate(rota);


    atualizarNavegacao(
        rota
    );


    aposRenderizacao(
        rota
    );


    if (
        rota === "projetos" &&
        detalhe
    ) {

        requestAnimationFrame(
            () => {

                const elemento =
                    document
                        .querySelector(
                            `#${detalhe}`
                        );

                elemento
                    ?.scrollIntoView({
                        behavior:
                            "smooth",

                        block:
                            "start"
                    });

            }
        );

    } else {

        window.scrollTo({
            top: 0,

            behavior:
                "smooth"
        });

    }


    app.focus({
        preventScroll: true
    });

}


export function iniciarRouter() {

    window.addEventListener(
        "hashchange",
        renderizar
    );


    renderizar();

}