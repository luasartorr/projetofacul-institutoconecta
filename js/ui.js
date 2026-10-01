import {
    validarElemento,
    validarFormulario,
    iniciarMascaras
} from "./validacoes.js";


import {
    salvarCadastro,
    obterUltimoCadastro,
    salvarAreaPreferida,
    obterAreaPreferida
} from "./storage.js";


const app =
    document.querySelector(
        "#app"
    );


let temporizadorToast;


/* =====================================================
   INICIALIZAÇÃO
   ===================================================== */

export function iniciarEventos() {

    app.addEventListener(
        "click",
        tratarClique
    );


    app.addEventListener(
        "input",
        tratarInput
    );


    app.addEventListener(
        "change",
        tratarChange
    );


    app.addEventListener(
        "submit",
        tratarSubmit
    );


    app.addEventListener(
        "reset",
        tratarReset
    );


    document.addEventListener(
        "keydown",
        tratarTeclado
    );

}


/* =====================================================
   APÓS RENDERIZAÇÃO
   ===================================================== */

export function aposRenderizacao(
    rota
) {

    if (
        rota === "cadastro"
    ) {

        iniciarMascaras();

        restaurarAreaPreferida();

    }

}


/* =====================================================
   CLICK
   ===================================================== */

function tratarClique(
    event
) {

    const elemento =
        event.target.closest(
            "[data-acao]"
        );


    if (!elemento) {
        return;
    }


    const acao =
        elemento.dataset.acao;


    if (
        acao ===
        "abrir-modal-doacao"
    ) {

        abrirModal(
            "#modal-doacao"
        );

    }


    if (
        acao ===
        "fechar-modal"
    ) {

        fecharModal(
            elemento.closest(
                ".modal"
            )
        );

    }

}


/* =====================================================
   INPUT
   ===================================================== */

function tratarInput(
    event
) {

    const campo =
        event.target;


    if (
        !campo.matches(
            "input, textarea"
        )
    ) {

        return;

    }


    if (
        campo.required
    ) {

        validarElemento(
            campo
        );

    }

}


/* =====================================================
   CHANGE
   ===================================================== */

function tratarChange(
    event
) {

    const campo =
        event.target;


    if (
        campo.matches(
            "select, input[type='checkbox'], input[type='date']"
        )
    ) {

        validarElemento(
            campo
        );

    }


    if (
        campo.id === "area"
    ) {

        salvarAreaPreferida(
            campo.value
        );

    }

}


/* =====================================================
   SUBMIT
   ===================================================== */

function tratarSubmit(
    event
) {

    const form =
        event.target;


    if (
        form.id !==
        "formCadastro"
    ) {

        return;

    }


    event.preventDefault();


    const formularioValido =
        validarFormulario(
            form
        );


    if (
        !formularioValido
    ) {

        exibirToast(
            "Revise os campos indicados.",
            "erro"
        );


        const primeiroErro =
            form.querySelector(
                ".campo-erro"
            );


        primeiroErro
            ?.focus();


        return;

    }


    const formData =
        new FormData(
            form
        );


    const dados = {

        nome:
            String(
                formData.get(
                    "nome"
                ) || ""
            ).trim(),

        email:
            String(
                formData.get(
                    "email"
                ) || ""
            ).trim(),

        telefone:
            String(
                formData.get(
                    "telefone"
                ) || ""
            ).trim(),

        cidade:
            String(
                formData.get(
                    "cidade"
                ) || ""
            ).trim(),

        estado:
            String(
                formData.get(
                    "estado"
                ) || ""
            ),

        area:
            String(
                formData.get(
                    "area"
                ) || ""
            ),

        mensagem:
            String(
                formData.get(
                    "mensagem"
                ) || ""
            ).trim()

    };


    salvarCadastro(
        dados
    );


    console.log(
        "Cadastro salvo:",
        obterUltimoCadastro()
    );


    exibirToast(
        "Cadastro realizado com sucesso!",
        "sucesso"
    );


    form.reset();


    limparEstadosFormulario(
        form
    );


    abrirModal(
        "#modal-sucesso"
    );

}


/* =====================================================
   RESET
   ===================================================== */

function tratarReset(
    event
) {

    if (
        event.target.id
        !== "formCadastro"
    ) {

        return;

    }


    requestAnimationFrame(
        () => {

            limparEstadosFormulario(
                event.target
            );


            exibirToast(
                "Formulário limpo."
            );

        }
    );

}


/* =====================================================
   MODAL
   ===================================================== */

export function abrirModal(
    seletor
) {

    const modal =
        document.querySelector(
            seletor
        );


    if (!modal) {
        return;
    }


    modal.classList.add(
        "ativo"
    );


    modal.setAttribute(
        "aria-hidden",
        "false"
    );


    const fechar =
        modal.querySelector(
            ".modal-fechar"
        );


    fechar?.focus();

}


export function fecharModal(
    modal
) {

    if (!modal) {
        return;
    }


    modal.classList.remove(
        "ativo"
    );


    modal.setAttribute(
        "aria-hidden",
        "true"
    );

}


/* =====================================================
   ESC FECHA MODAL
   ===================================================== */

function tratarTeclado(
    event
) {

    if (
        event.key !==
        "Escape"
    ) {

        return;

    }


    const modalAtivo =
        document.querySelector(
            ".modal.ativo"
        );


    if (
        modalAtivo
    ) {

        fecharModal(
            modalAtivo
        );

    }

}


/* =====================================================
   TOAST
   ===================================================== */

export function exibirToast(
    mensagem,
    tipo = "normal"
) {

    let toast =
        document.querySelector(
            "#toast-global"
        );


    if (!toast) {

        toast =
            document.createElement(
                "aside"
            );


        toast.id =
            "toast-global";


        toast.setAttribute(
            "role",
            "status"
        );


        toast.setAttribute(
            "aria-live",
            "polite"
        );


        document.body
            .appendChild(
                toast
            );

    }


    toast.className =
        "toast";


    if (
        tipo === "sucesso"
    ) {

        toast.classList.add(
            "toast-sucesso"
        );

    }


    if (
        tipo === "erro"
    ) {

        toast.classList.add(
            "toast-erro"
        );

    }


    toast.textContent =
        mensagem;


    toast.hidden =
        false;


    clearTimeout(
        temporizadorToast
    );


    temporizadorToast =
        setTimeout(
            () => {

                toast.hidden =
                    true;

            },
            3500
        );

}


/* =====================================================
   LIMPEZA DOS ESTADOS
   ===================================================== */

function limparEstadosFormulario(
    form
) {

    form.querySelectorAll(
        ".campo-erro, .campo-sucesso"
    )
    .forEach(
        campo => {

            campo.classList.remove(
                "campo-erro",
                "campo-sucesso"
            );


            campo.removeAttribute(
                "aria-invalid"
            );

        }
    );


    form.querySelectorAll(
        '[id^="erro-"]'
    )
    .forEach(
        aviso => {

            aviso.textContent =
                "";


            aviso.classList.remove(
                "mensagem-erro"
            );

        }
    );

}


/* =====================================================
   PREFERÊNCIA DA ÁREA
   ===================================================== */

function restaurarAreaPreferida() {

    const area =
        document.querySelector(
            "#area"
        );


    if (!area) {
        return;
    }


    const preferencia =
        obterAreaPreferida();


    if (!preferencia) {
        return;
    }


    const existe =
        Array
            .from(
                area.options
            )
            .some(
                option =>
                    option.value
                    === preferencia
            );


    if (existe) {

        area.value =
            preferencia;

    }

}