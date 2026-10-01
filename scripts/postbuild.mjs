import {
    readdir,
    readFile,
    writeFile,
    stat
} from "node:fs/promises";

import {
    join,
    extname
} from "node:path";

import { minify } from "html-minifier-terser";
import sharp from "sharp";


const DIST = "dist";

const extensoesImagem = new Set([
    ".jpg",
    ".jpeg",
    ".png",
    ".webp"
]);

let totalAntesHTML = 0;
let totalDepoisHTML = 0;

let totalAntesImagens = 0;
let totalDepoisImagens = 0;


/* =========================================================
   UTILITÁRIOS
   ========================================================= */

function formatarBytes(bytes) {

    if (bytes < 1024) {
        return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
        return `${(bytes / 1024).toFixed(2)} KB`;
    }

    return `${(
        bytes /
        1024 /
        1024
    ).toFixed(2)} MB`;

}


function calcularReducao(
    antes,
    depois
) {

    if (!antes) {
        return 0;
    }

    return (
        ((antes - depois) / antes) *
        100
    );

}


async function listarArquivos(
    diretorio
) {

    const itens =
        await readdir(
            diretorio,
            {
                withFileTypes: true
            }
        );

    const arquivos = [];

    for (const item of itens) {

        const caminho =
            join(
                diretorio,
                item.name
            );

        if (item.isDirectory()) {

            arquivos.push(
                ...await listarArquivos(
                    caminho
                )
            );

        } else {

            arquivos.push(
                caminho
            );

        }

    }

    return arquivos;

}


/* =========================================================
   MINIFICAÇÃO HTML
   ========================================================= */

async function minificarHTML(
    caminho
) {

    const original =
        await readFile(
            caminho,
            "utf8"
        );

    const tamanhoAntes =
        Buffer.byteLength(
            original
        );

    const resultado =
        await minify(
            original,
            {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeEmptyAttributes: true,
                removeOptionalTags: false,
                sortAttributes: false,
                sortClassName: false,
                minifyCSS: true,
                minifyJS: true
            }
        );

    const tamanhoDepois =
        Buffer.byteLength(
            resultado
        );

    await writeFile(
        caminho,
        resultado,
        "utf8"
    );

    totalAntesHTML +=
        tamanhoAntes;

    totalDepoisHTML +=
        tamanhoDepois;

    console.log(
        `HTML: ${caminho}`
    );

    console.log(
        `  ${formatarBytes(tamanhoAntes)} → ${formatarBytes(tamanhoDepois)}`
    );

}


/* =========================================================
   OTIMIZAÇÃO DE IMAGENS
   ========================================================= */

async function otimizarImagem(
    caminho
) {

    const informacoes =
        await stat(
            caminho
        );

    const tamanhoAntes =
        informacoes.size;

    const extensao =
        extname(caminho)
            .toLowerCase();

    let pipeline =
        sharp(caminho)
            .rotate();

    const metadata =
        await pipeline.metadata();


    /*
     * Limita imagens muito grandes.
     * A interface do projeto possui largura
     * máxima próxima de 1320px.
     */

    if (
        metadata.width &&
        metadata.width > 1600
    ) {

        pipeline =
            pipeline.resize({
                width: 1600,
                withoutEnlargement: true
            });

    }


    switch (extensao) {

        case ".jpg":
        case ".jpeg":

            pipeline =
                pipeline.jpeg({
                    quality: 78,
                    mozjpeg: true
                });

            break;


        case ".png":

            pipeline =
                pipeline.png({
                    compressionLevel: 9,
                    adaptiveFiltering: true
                });

            break;


        case ".webp":

            pipeline =
                pipeline.webp({
                    quality: 76,
                    effort: 6
                });

            break;


        default:
            return;

    }


    const buffer =
        await pipeline
            .toBuffer();


    /*
     * Só substitui o original se a versão
     * otimizada realmente ficar menor.
     */

    if (
        buffer.length <
        tamanhoAntes
    ) {

        await writeFile(
            caminho,
            buffer
        );

        totalDepoisImagens +=
            buffer.length;

    } else {

        totalDepoisImagens +=
            tamanhoAntes;

    }


    totalAntesImagens +=
        tamanhoAntes;


    const tamanhoFinal =
        Math.min(
            tamanhoAntes,
            buffer.length
        );


    console.log(
        `Imagem: ${caminho}`
    );

    console.log(
        `  ${formatarBytes(tamanhoAntes)} → ${formatarBytes(tamanhoFinal)}`
    );

}


/* =========================================================
   EXECUÇÃO
   ========================================================= */

async function executar() {

    console.log(
        "\n=== OTIMIZAÇÃO DA BUILD ===\n"
    );


    const arquivos =
        await listarArquivos(
            DIST
        );


    const htmls =
        arquivos.filter(
            arquivo =>
                extname(arquivo)
                    .toLowerCase()
                === ".html"
        );


    const imagens =
        arquivos.filter(
            arquivo =>
                extensoesImagem.has(
                    extname(arquivo)
                        .toLowerCase()
                )
        );


    for (const html of htmls) {

        await minificarHTML(
            html
        );

    }


    for (const imagem of imagens) {

        await otimizarImagem(
            imagem
        );

    }


    const totalAntes =
        totalAntesHTML +
        totalAntesImagens;


    const totalDepois =
        totalDepoisHTML +
        totalDepoisImagens;


    const reducaoHTML =
        calcularReducao(
            totalAntesHTML,
            totalDepoisHTML
        );


    const reducaoImagens =
        calcularReducao(
            totalAntesImagens,
            totalDepoisImagens
        );


    const reducaoTotal =
        calcularReducao(
            totalAntes,
            totalDepois
        );


    const relatorio = `
RELATÓRIO DE OTIMIZAÇÃO
Instituto Conecta
==============================

HTML
Antes: ${formatarBytes(totalAntesHTML)}
Depois: ${formatarBytes(totalDepoisHTML)}
Redução: ${reducaoHTML.toFixed(2)}%

IMAGENS
Antes: ${formatarBytes(totalAntesImagens)}
Depois: ${formatarBytes(totalDepoisImagens)}
Redução: ${reducaoImagens.toFixed(2)}%

TOTAL ANALISADO
Antes: ${formatarBytes(totalAntes)}
Depois: ${formatarBytes(totalDepois)}
Redução: ${reducaoTotal.toFixed(2)}%

Observação:
CSS e JavaScript são minificados
automaticamente pelo Vite durante
a geração da build de produção.
`.trim();


    await writeFile(
        join(
            DIST,
            "build-report.txt"
        ),
        relatorio,
        "utf8"
    );


    console.log(
        "\n=============================="
    );

    console.log(relatorio);

    console.log(
        "==============================\n"
    );

}


executar()
    .catch(
        erro => {

            console.error(
                "Erro durante a otimização:",
                erro
            );

            process.exit(1);

        }
    );
