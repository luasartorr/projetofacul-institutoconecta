export const regex = {

    cpf:
        /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,

    telefone:
        /^\(\d{2}\) \d{5}-\d{4}$/,

    cep:
        /^\d{5}-\d{3}$/,

    email:
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/

};


function obterMensagem(
    campo
) {

    return document.querySelector(
        `#erro-${campo.id}`
    );

}


export function validarCampo(
    campo,
    valido,
    mensagem = ""
) {

    const aviso =
        obterMensagem(
            campo
        );


    campo.classList.toggle(
        "campo-erro",
        !valido
    );


    campo.classList.toggle(
        "campo-sucesso",
        valido
    );


    campo.setAttribute(
        "aria-invalid",
        String(!valido)
    );


    if (aviso) {

        aviso.textContent =
            valido
                ? ""
                : mensagem;


        aviso.classList.toggle(
            "mensagem-erro",
            !valido
        );

    }


    return valido;

}


function validarNome(
    campo
) {

    return validarCampo(

        campo,

        campo.value
            .trim()
            .length >= 3,

        "Informe seu nome completo."

    );

}


function validarEmail(
    campo
) {

    return validarCampo(

        campo,

        regex.email.test(
            campo.value.trim()
        ),

        "Informe um e-mail válido."

    );

}


function validarCPF(
    campo
) {

    return validarCampo(

        campo,

        regex.cpf.test(
            campo.value
        ),

        "Use o formato 000.000.000-00."

    );

}


function validarTelefone(
    campo
) {

    return validarCampo(

        campo,

        regex.telefone.test(
            campo.value
        ),

        "Use o formato (00) 00000-0000."

    );

}


function validarCEP(
    campo
) {

    return validarCampo(

        campo,

        regex.cep.test(
            campo.value
        ),

        "Use o formato 00000-000."

    );

}


function validarObrigatorio(
    campo
) {

    return validarCampo(

        campo,

        campo.value
            .trim() !== "",

        "Este campo é obrigatório."

    );

}


function validarSelect(
    campo
) {

    return validarCampo(

        campo,

        campo.value !== "",

        "Selecione uma opção."

    );

}


function validarTermos(
    campo
) {

    return validarCampo(

        campo,

        campo.checked,

        "É necessário aceitar os termos."

    );

}


export function validarElemento(
    campo
) {

    switch (campo.id) {

        case "nome":
            return validarNome(
                campo
            );


        case "email":
            return validarEmail(
                campo
            );


        case "cpf":
            return validarCPF(
                campo
            );


        case "telefone":
            return validarTelefone(
                campo
            );


        case "cep":
            return validarCEP(
                campo
            );


        case "estado":
        case "area":
            return validarSelect(
                campo
            );


        case "termos":
            return validarTermos(
                campo
            );


        case "nascimento":
        case "endereco":
        case "numero":
        case "bairro":
        case "cidade":
            return validarObrigatorio(
                campo
            );


        default:
            return true;

    }

}


export function validarFormulario(
    form
) {

    const campos =
        form.querySelectorAll(
            "[required]"
        );


    let valido = true;


    campos.forEach(
        campo => {

            if (
                !validarElemento(
                    campo
                )
            ) {

                valido = false;

            }

        }
    );


    return valido;

}


/* =====================================================
   IMASK
   ===================================================== */

let mascaras = [];


export function iniciarMascaras() {

    destruirMascaras();


    if (
        typeof window.IMask
        !== "function"
    ) {

        console.warn(
            "Biblioteca IMask não carregada."
        );

        return;

    }


    const cpf =
        document.querySelector(
            "#cpf"
        );

    const telefone =
        document.querySelector(
            "#telefone"
        );

    const cep =
        document.querySelector(
            "#cep"
        );


    if (cpf) {

        mascaras.push(

            window.IMask(
                cpf,
                {
                    mask:
                        "000.000.000-00"
                }
            )

        );

    }


    if (telefone) {

        mascaras.push(

            window.IMask(
                telefone,
                {
                    mask:
                        "(00) 00000-0000"
                }
            )

        );

    }


    if (cep) {

        mascaras.push(

            window.IMask(
                cep,
                {
                    mask:
                        "00000-000"
                }
            )

        );

    }

}


function destruirMascaras() {

    mascaras.forEach(
        mascara => {

            mascara.destroy();

        }
    );


    mascaras = [];

}