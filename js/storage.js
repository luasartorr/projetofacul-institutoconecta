const CHAVE_CADASTROS =
    "institutoConectaCadastros";

const CHAVE_AREA =
    "institutoConectaAreaPreferida";


export function obterCadastros() {

    try {

        const valor =
            localStorage.getItem(
                CHAVE_CADASTROS
            );


        if (!valor) {
            return [];
        }


        const dados =
            JSON.parse(
                valor
            );


        return Array.isArray(
            dados
        )
            ? dados
            : [];

    } catch (erro) {

        console.error(
            "Erro ao recuperar cadastros:",
            erro
        );


        return [];

    }

}


export function salvarCadastro(
    dados
) {

    const cadastros =
        obterCadastros();


    const cadastro = {

        id:
            Date.now(),

        nome:
            dados.nome,

        email:
            dados.email,

        telefone:
            dados.telefone,

        cidade:
            dados.cidade,

        estado:
            dados.estado,

        area:
            dados.area,

        mensagem:
            dados.mensagem || "",

        criadoEm:
            new Date()
                .toISOString()

    };


    cadastros.push(
        cadastro
    );


    localStorage.setItem(

        CHAVE_CADASTROS,

        JSON.stringify(
            cadastros
        )

    );


    return cadastro;

}


export function obterUltimoCadastro() {

    const cadastros =
        obterCadastros();


    return (
        cadastros.at(-1)
        || null
    );

}


export function salvarAreaPreferida(
    area
) {

    localStorage.setItem(
        CHAVE_AREA,
        area
    );

}


export function obterAreaPreferida() {

    return localStorage.getItem(
        CHAVE_AREA
    );

}


export function removerCadastro(
    id
) {

    const cadastros =
        obterCadastros();


    const atualizados =
        cadastros.filter(
            cadastro =>
                cadastro.id
                !== id
        );


    localStorage.setItem(

        CHAVE_CADASTROS,

        JSON.stringify(
            atualizados
        )

    );

}


export function limparCadastros() {

    localStorage.removeItem(
        CHAVE_CADASTROS
    );

}