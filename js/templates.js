const projetos = [

    {
        id: "alimentacao",

        titulo:
            "Alimento para Todos",

        categoria:
            "Alimentação",

        classeBadge:
            "badge-alimentacao",

        imagem:
            "../imagens/projeto-alimentos.webp",

        alt:
            "Voluntários organizando alimentos para doação",

        legenda:
            "Campanha Alimento para Todos",

        descricao:
            "O projeto arrecada e distribui alimentos para famílias em situação de vulnerabilidade."
    },


    {
        id: "educacao",

        titulo:
            "Educação que Transforma",

        categoria:
            "Educação",

        classeBadge:
            "badge-educacao",

        imagem:
            "../imagens/projeto-educacao.webp",

        alt:
            "Voluntário auxiliando estudante durante atividade educacional",

        legenda:
            "Projeto Educação que Transforma",

        descricao:
            "Oferecemos reforço escolar, inclusão digital e atividades de capacitação profissional."
    },


    {
        id: "animais",

        titulo:
            "Amigos de Quatro Patas",

        categoria:
            "Proteção animal",

        classeBadge:
            "badge-animais",

        imagem:
            "../imagens/projeto-animais.webp",

        alt:
            "Cachorro resgatado aguardando adoção responsável",

        legenda:
            "Projeto Amigos de Quatro Patas",

        descricao:
            "Atuamos no resgate, tratamento e adoção responsável de animais."
    }

];


function criarCardsProjetos() {

    return projetos
        .map(
            projeto => `

                <article
                    id="${projeto.id}"
                    class="card col-4"
                >

                    <span
                        class="
                            badge
                            ${projeto.classeBadge}
                        "
                    >
                        ${projeto.categoria}
                    </span>

                    <h3>
                        ${projeto.titulo}
                    </h3>

                    <figure>

                        <img
                            src="${projeto.imagem}"
                            alt="${projeto.alt}"
                        >

                        <figcaption>
                            ${projeto.legenda}
                        </figcaption>

                    </figure>

                    <p>
                        ${projeto.descricao}
                    </p>

                </article>

            `
        )
        .join("");

}


function templateInicio() {

    return `

        <section class="hero">

            <h1>
                Instituto Conecta
            </h1>

            <picture>

                <source
                    srcset="../imagens/banner.webp"
                    type="image/webp"
                >

                <img
                    src="../imagens/banner.jpg"
                    alt="Voluntários do Instituto Conecta participando de uma ação social"
                >

            </picture>

            <h2>
                Conectando pessoas,
                transformando comunidades
            </h2>

            <p>
                Somos uma organização sem fins
                lucrativos dedicada ao
                desenvolvimento de projetos
                sociais nas áreas de educação,
                combate à fome e proteção animal.
            </p>

            <a
                href="#cadastro"
                class="botao"
            >
                Quero ser voluntário
            </a>

        </section>


        <section>

            <h2>
                Quem somos
            </h2>

            <p>
                Nosso objetivo é aproximar
                voluntários, doadores e
                comunidades, criando
                oportunidades e promovendo
                transformação social.
            </p>

        </section>


        <section>

            <h2>
                Nossas iniciativas
            </h2>

            <div class="grid">

                ${criarCardsProjetos()}

            </div>

        </section>


        <section
            class="chamada-voluntariado"
        >

            <div>

                <h2>
                    Faça parte dessa
                    transformação
                </h2>

                <p>
                    Doe seu tempo e seus
                    conhecimentos para ajudar
                    nossas iniciativas.
                </p>

            </div>

            <a
                href="#cadastro"
                class="botao"
            >
                Quero participar
            </a>

        </section>


        <section id="contato">

            <h2>
                Entre em contato
            </h2>

            <address>

                <p>
                    E-mail:

                    <a
                        href="mailto:contato@institutoconecta.org"
                    >
                        contato@institutoconecta.org
                    </a>
                </p>

                <p>
                    Telefone:

                    <a
                        href="tel:+554133334444"
                    >
                        (41) 3333-4444
                    </a>
                </p>

                <p>
                    Curitiba - Paraná
                </p>

            </address>

        </section>

    `;

}


function templateProjetos() {

    return `

        <section>

            <h1>
                Nossos projetos
            </h1>

            <p>
                Conheça algumas iniciativas
                desenvolvidas pelo Instituto
                Conecta e descubra como
                participar.
            </p>

        </section>


        <section>

            <h2>
                Projetos sociais
            </h2>

            <div class="grid">

                ${criarCardsProjetos()}

            </div>

        </section>


        <section>

            <h2>
                Faça uma doação
            </h2>

            <p>
                As contribuições ajudam na
                manutenção dos projetos e
                na ampliação do atendimento
                às comunidades.
            </p>

            <button
                type="button"
                class="botao"
                data-acao="abrir-modal-doacao"
            >
                Quero contribuir
            </button>

        </section>


        <section>

            <h2>
                Seja voluntário
            </h2>

            <p>
                Existem diversas maneiras
                de colaborar:
            </p>

            <ul>

                <li>
                    Participação em campanhas
                    de arrecadação
                </li>

                <li>
                    Apoio em atividades
                    educacionais
                </li>

                <li>
                    Auxílio em eventos e
                    ações sociais
                </li>

                <li>
                    Apoio às campanhas de
                    proteção animal
                </li>

            </ul>

            <a
                href="#cadastro"
                class="botao"
            >
                Cadastrar como voluntário
            </a>

        </section>


        <section
            id="modal-doacao"
            class="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="titulo-modal-doacao"
            aria-hidden="true"
        >

            <div class="modal-conteudo">

                <button
                    type="button"
                    class="modal-fechar"
                    data-acao="fechar-modal"
                    aria-label="Fechar"
                >
                    ×
                </button>

                <h2 id="titulo-modal-doacao">
                    Apoie o Instituto Conecta
                </h2>

                <p>
                    Sua contribuição ajuda
                    na continuidade dos
                    projetos sociais.
                </p>

                <a
                    href="mailto:contato@institutoconecta.org"
                    class="botao"
                >
                    Entrar em contato
                </a>

            </div>

        </section>

    `;

}


function templateCadastro() {

    return `

        <section>

            <h1>
                Cadastro de voluntário
            </h1>

            <p>
                Preencha o formulário
                abaixo para participar
                das iniciativas do
                Instituto Conecta.
            </p>


            <div
                class="alerta alerta-aviso"
                role="note"
            >
                Os campos obrigatórios
                devem ser preenchidos
                corretamente.
            </div>


            <form id="formCadastro">


                <fieldset>

                    <legend>
                        Dados pessoais
                    </legend>


                    <label for="nome">
                        Nome completo
                    </label>

                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        minlength="3"
                        autocomplete="name"
                        required
                    >

                    <small
                        id="erro-nome"
                        aria-live="polite"
                    ></small>


                    <label for="nascimento">
                        Data de nascimento
                    </label>

                    <input
                        type="date"
                        id="nascimento"
                        name="nascimento"
                        required
                    >

                    <small
                        id="erro-nascimento"
                        aria-live="polite"
                    ></small>


                    <label for="cpf">
                        CPF
                    </label>

                    <input
                        type="text"
                        id="cpf"
                        name="cpf"
                        inputmode="numeric"
                        maxlength="14"
                        placeholder="000.000.000-00"
                        pattern="\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}"
                        required
                    >

                    <small
                        id="erro-cpf"
                        aria-live="polite"
                    ></small>


                    <label for="email">
                        E-mail
                    </label>

                    <input
                        type="email"
                        id="email"
                        name="email"
                        autocomplete="email"
                        placeholder="nome@exemplo.com"
                        required
                    >

                    <small
                        id="erro-email"
                        aria-live="polite"
                    ></small>


                    <label for="telefone">
                        Telefone
                    </label>

                    <input
                        type="tel"
                        id="telefone"
                        name="telefone"
                        inputmode="numeric"
                        maxlength="15"
                        placeholder="(00) 00000-0000"
                        pattern="\\(\\d{2}\\) \\d{5}-\\d{4}"
                        required
                    >

                    <small
                        id="erro-telefone"
                        aria-live="polite"
                    ></small>

                </fieldset>


                <fieldset>

                    <legend>
                        Endereço
                    </legend>


                    <label for="cep">
                        CEP
                    </label>

                    <input
                        type="text"
                        id="cep"
                        name="cep"
                        inputmode="numeric"
                        maxlength="9"
                        placeholder="00000-000"
                        pattern="\\d{5}-\\d{3}"
                        required
                    >

                    <small
                        id="erro-cep"
                        aria-live="polite"
                    ></small>


                    <label for="endereco">
                        Endereço
                    </label>

                    <input
                        type="text"
                        id="endereco"
                        name="endereco"
                        required
                    >

                    <small
                        id="erro-endereco"
                        aria-live="polite"
                    ></small>


                    <label for="numero">
                        Número
                    </label>

                    <input
                        type="text"
                        id="numero"
                        name="numero"
                        required
                    >

                    <small
                        id="erro-numero"
                        aria-live="polite"
                    ></small>


                    <label for="bairro">
                        Bairro
                    </label>

                    <input
                        type="text"
                        id="bairro"
                        name="bairro"
                        required
                    >

                    <small
                        id="erro-bairro"
                        aria-live="polite"
                    ></small>


                    <label for="cidade">
                        Cidade
                    </label>

                    <input
                        type="text"
                        id="cidade"
                        name="cidade"
                        required
                    >

                    <small
                        id="erro-cidade"
                        aria-live="polite"
                    ></small>


                    <label for="estado">
                        Estado
                    </label>

                    <select
                        id="estado"
                        name="estado"
                        required
                    >

                        <option value="">
                            Selecione
                        </option>

                        <option value="PR">
                            Paraná
                        </option>

                        <option value="SP">
                            São Paulo
                        </option>

                        <option value="RJ">
                            Rio de Janeiro
                        </option>

                    </select>

                    <small
                        id="erro-estado"
                        aria-live="polite"
                    ></small>

                </fieldset>


                <fieldset>

                    <legend>
                        Voluntariado
                    </legend>


                    <label for="area">
                        Área de interesse
                    </label>

                    <select
                        id="area"
                        name="area"
                        required
                    >

                        <option value="">
                            Selecione
                        </option>

                        <option value="educacao">
                            Educação
                        </option>

                        <option value="alimentacao">
                            Alimentação
                        </option>

                        <option value="animais">
                            Proteção animal
                        </option>

                        <option value="administrativo">
                            Apoio administrativo
                        </option>

                    </select>

                    <small
                        id="erro-area"
                        aria-live="polite"
                    ></small>


                    <label for="mensagem">
                        Conte um pouco sobre você
                    </label>

                    <textarea
                        id="mensagem"
                        name="mensagem"
                        rows="5"
                        maxlength="500"
                        placeholder="Conte sobre suas experiências ou motivações."
                    ></textarea>


                    <label>

                        <input
                            type="checkbox"
                            id="termos"
                            name="termos"
                            required
                        >

                        Concordo com o
                        tratamento dos meus
                        dados para fins de
                        cadastro.

                    </label>

                    <small
                        id="erro-termos"
                        aria-live="polite"
                    ></small>

                </fieldset>


                <div class="acoes">

                    <button
                        type="submit"
                    >
                        Enviar cadastro
                    </button>

                    <button
                        type="reset"
                        class="botao-secundario"
                    >
                        Limpar formulário
                    </button>

                </div>

            </form>

        </section>


        <section
            id="modal-sucesso"
            class="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="titulo-modal-sucesso"
            aria-hidden="true"
        >

            <div class="modal-conteudo">

                <button
                    type="button"
                    class="modal-fechar"
                    data-acao="fechar-modal"
                    aria-label="Fechar"
                >
                    ×
                </button>

                <h2 id="titulo-modal-sucesso">
                    Cadastro realizado!
                </h2>

                <p>
                    Obrigado pelo interesse
                    em colaborar com o
                    Instituto Conecta.
                </p>

                <a
                    href="#projetos"
                    class="botao"
                >
                    Conhecer projetos
                </a>

            </div>

        </section>

    `;

}


const templates = {
    inicio:
        templateInicio,

    projetos:
        templateProjetos,

    cadastro:
        templateCadastro
};


export function obterTemplate(
    rota
) {

    const template =
        templates[rota] ||
        templates.inicio;

    return template();

}