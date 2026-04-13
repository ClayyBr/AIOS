/**
 * Cotação Final Polida — @comprador
 *
 * Busca em 3 mercados (Spani, Tenda, Atacadão) com:
 *   - Limpeza de nomes de produtos
 *   - Remoção de duplicatas
 *   - Remoção de itens inválidos (linhas de preço sem produto)
 *   - CSV polido, pronto para Excel
 */

import spaniScraper from "./scrapers/spani.js";
import tendaScraper from "./scrapers/tenda.js";
import atacadaoScraper from "./scrapers/atacadao.js";
import { closeBrowserSpani } from "./scrapers/spani.js";
import { closeBrowser } from "./scrapers/tenda.js";
import { closeBrowserAtacadao } from "./scrapers/atacadao.js";
import type { ResultadoBusca, ScraperModule } from "./types.js";
import * as fs from "node:fs";
import * as path from "node:path";

process.env.COMPRADOR_CEP = "12060360";

const INGREDIENTES = ["óleo de soja", "macarrão tipo espaguete", "creme de leite", "ketchup", "mostarda", "extrato de tomate", "molho de tomate", "arroz", "feijão"];
const scrapers: ScraperModule[] = [spaniScraper, tendaScraper, atacadaoScraper];

// ============================================================================
// Limpeza de Dados
// ============================================================================

/**
 * Limpa o nome do produto removendo lixo do DOM.
 */
function limparNome(nome: string): string {
    let limpo = nome;

    // Remover "Vendido por: Tenda" e variações
    limpo = limpo.replace(/Vendido por:\s*\w+/gi, "");
    // Remover "No Cartão Tenda" e variações
    limpo = limpo.replace(/No Cartão\s*\w*/gi, "");
    // Remover preços: "R$ XX,XX", "$ XX,XX", incluindo com sufixos (/un, /kg, un, kg)
    limpo = limpo.replace(/R?\$\s*\d{1,3}(?:\.\d{3})*,\d{2}\s*(?:\/?\w{1,5})?\s*/g, "");
    // Remover "a partir de X unidades"
    limpo = limpo.replace(/a\s*partir de\s*\d+\s*unidades?/gi, "");
    // Remover "una partir de" (colado, sem espaço)
    limpo = limpo.replace(/una?\s*partir de/gi, "");
    // Remover "Ver regras"
    limpo = limpo.replace(/Ver regras/gi, "");
    // Remover "Adicionar"
    limpo = limpo.replace(/Adicionar/gi, "");
    // Remover "+5+10+15" (botões de quantidade)
    limpo = limpo.replace(/\+\s*\d+/g, "");
    // Remover "Peso médio X kg/un Valor do kg:"
    limpo = limpo.replace(/Peso médio\s*[\d,.]+ \w+\/\w+\s*Valor do \w+:\s*/gi, "");
    // Remover /un /kg /500g soltos
    limpo = limpo.replace(/\/\s*(un|und|kg|g|ml|l|pct)\b/gi, "");
    // Remover espaços múltiplos e trim
    limpo = limpo.replace(/\s{2,}/g, " ").trim();

    return limpo;
}

/**
 * Verifica se uma entrada é um produto válido (não lixo do DOM).
 */
function ehProdutoValido(nome: string, preco: number): boolean {
    const nomeLimpo = limparNome(nome);

    // Nome muito curto
    if (nomeLimpo.length < 5) return false;

    // Nome é apenas um preço (ex: "R$ 18,90 /un" ou "$ 2,50")
    if (/^R?\$?\s*\d/.test(nomeLimpo)) return false;

    // Nome é apenas texto genérico de UI
    if (/^(un|und|kg|g|ml|l|pct|cx|cada|unidade)$/i.test(nomeLimpo)) return false;

    // Preço absurdo
    if (preco <= 0 || preco >= 50000) return false;

    return true;
}

/**
 * Verifica se o produto é relevante para o ingrediente buscado.
 * Pelo menos uma palavra-chave do ingrediente deve aparecer no nome.
 */
function ehRelevante(nomeProduto: string, ingrediente: string): boolean {
    const nomeNorm = nomeProduto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const termos = ingrediente.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(/\s+/);

    // Pelo menos uma das palavras do ingrediente deve aparecer no nome
    return termos.some((termo) => {
        if (termo.length < 3) return true; // Ignorar palavras muito curtas
        return nomeNorm.includes(termo);
    });
}

/**
 * Remove duplicatas por chave: (nome limpo + mercado).
 * Quando há duplicata, mantém a de menor preço.
 */
function removerDuplicatas(
    resultados: (ResultadoBusca & { ingredienteBuscado: string })[]
): (ResultadoBusca & { ingredienteBuscado: string })[] {
    const mapa = new Map<string, (ResultadoBusca & { ingredienteBuscado: string })>();

    for (const r of resultados) {
        const nomeLimpo = limparNome(r.nome);
        const chave = `${nomeLimpo.toLowerCase()}|${r.mercado.toLowerCase()}`;

        const existente = mapa.get(chave);
        if (!existente || r.preco < existente.preco) {
            mapa.set(chave, { ...r, nome: nomeLimpo });
        }
    }

    return Array.from(mapa.values());
}

// ============================================================================
// CSV Generation
// ============================================================================

function formatPreco(preco: number): string {
    return preco.toFixed(2).replace(".", ",");
}

function getTimestamp(): string {
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, "0");
    return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
}

function gerarCSV(
    resultados: (ResultadoBusca & { ingredienteBuscado: string })[],
    dataColeta: string
): string {
    const BOM = "\uFEFF";
    const SEP = ";";
    const header = [
        "Ingrediente Buscado",
        "Produto Encontrado",
        "Preço (R$)",
        "Unidade",
        "Mercado",
        "Link",
        "Data da Coleta",
    ].join(SEP);

    const rows = resultados.map((r) =>
        [
            `"${r.ingredienteBuscado}"`,
            `"${r.nome.replace(/"/g, '""')}"`,
            formatPreco(r.preco),
            r.unidade,
            r.mercado,
            r.link,
            dataColeta,
        ].join(SEP)
    );

    return BOM + header + "\n" + rows.join("\n") + "\n";
}

// ============================================================================
// Main
// ============================================================================

async function main() {
    console.log(`\n🛒 COTAÇÃO FINAL POLIDA — @comprador`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`📋 Ingredientes: ${INGREDIENTES.join(", ")}`);
    console.log(`🏪 Mercados: Spani, Tenda, Atacadão`);
    console.log(`📍 CEP: ${process.env.COMPRADOR_CEP}`);
    console.log(`📅 Data: ${new Date().toLocaleString("pt-BR")}\n`);

    const todosResultadosBrutos: (ResultadoBusca & { ingredienteBuscado: string })[] = [];
    const dataColeta = new Date().toISOString().replace("T", " ").slice(0, 19);

    for (const scraper of scrapers) {
        console.log(`\n🏪 ${scraper.nome}...`);

        for (const ingrediente of INGREDIENTES) {
            try {
                process.stdout.write(`  🔍 "${ingrediente}"... `);
                const resultados = await scraper.buscar(ingrediente);
                console.log(`${resultados.length} bruto(s)`);

                todosResultadosBrutos.push(
                    ...resultados.map((r) => ({ ...r, ingredienteBuscado: ingrediente }))
                );
            } catch (error) {
                const msg = error instanceof Error ? error.message : String(error);
                console.log(`❌ ${msg}`);
            }
        }
    }

    // Fechar todos os browsers
    await Promise.allSettled([closeBrowserSpani(), closeBrowser(), closeBrowserAtacadao()]);

    console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`📊 Resultados brutos: ${todosResultadosBrutos.length}`);

    // Limpar e filtrar
    const validos = todosResultadosBrutos.filter((r) => ehProdutoValido(r.nome, r.preco));
    console.log(`✂️  Após filtro de válidos: ${validos.length}`);

    // Filtrar por relevância (produto deve conter pelo menos uma palavra do ingrediente)
    const relevantes = validos.filter((r) => ehRelevante(r.nome, r.ingredienteBuscado));
    console.log(`🎯 Após filtro de relevância: ${relevantes.length}`);

    // Remover duplicatas
    const limpos = removerDuplicatas(relevantes);
    console.log(`🧹 Após remoção de duplicatas: ${limpos.length}`);

    // Ordenar por ingrediente → preço
    limpos.sort((a, b) => {
        if (a.ingredienteBuscado !== b.ingredienteBuscado) {
            return a.ingredienteBuscado.localeCompare(b.ingredienteBuscado);
        }
        return a.preco - b.preco;
    });

    if (limpos.length > 0) {
        const outputDir = path.resolve("../../squads/CFO/relatorios/cotacoes");
        fs.mkdirSync(outputDir, { recursive: true });

        const fileName = `Cotação-Mercearia.csv`;
        const csvPath = path.join(outputDir, fileName);
        const csvContent = gerarCSV(limpos, dataColeta);
        fs.writeFileSync(csvPath, csvContent, "utf-8");

        console.log(`\n💾 CSV salvo em: ${csvPath}`);
        console.log(`📏 Tamanho: ${csvContent.length} bytes`);
        console.log(`📋 Itens: ${limpos.length}`);

        // Preview por ingrediente
        for (const ingrediente of INGREDIENTES) {
            const itens = limpos.filter((r) => r.ingredienteBuscado === ingrediente);
            console.log(`\n🥩 "${ingrediente}" — ${itens.length} itens:`);
            for (const r of itens.slice(0, 5)) {
                console.log(`   ${r.mercado.padEnd(20)} ${r.nome.substring(0, 50).padEnd(52)} R$ ${formatPreco(r.preco)}`);
            }
            if (itens.length > 5) {
                console.log(`   ... e mais ${itens.length - 5}`);
            }
        }
    } else {
        console.log(`\n⚠️ Nenhum resultado válido.`);
    }

    console.log(`\n🏁 Cotação finalizada.`);
}

main().catch(async (err) => {
    console.error("Erro fatal:", err);
    await Promise.allSettled([closeBrowserSpani(), closeBrowser(), closeBrowserAtacadao()]);
    process.exit(1);
});
