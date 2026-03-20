#!/usr/bin/env node

/**
 * MCP Server: Comprador
 *
 * Servidor MCP para pesquisa de preços de ingredientes em supermercados
 * atacadistas da região do Vale do Paraíba — SP.
 *
 * Tool exposta: buscar_precos_ingredientes
 *   - Recebe lista de ingredientes + mercados (opcional)
 *   - Executa busca em paralelo nos sites dos atacadistas
 *   - Gera arquivo CSV comparativo
 *   - Retorna path do CSV + resumo dos resultados
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import * as fs from "node:fs";
import * as path from "node:path";
import type { ResultadoBusca, ResultadoMercado, ScraperModule } from "./types.js";

// Importar scrapers (apenas mercados ativos na região)
import spaniScraper from "./scrapers/spani.js";
import tendaScraper from "./scrapers/tenda.js";
import atacadaoScraper from "./scrapers/atacadao.js";

// ============================================================================
// Constants
// ============================================================================

const SQUAD_DIR = "squads/CFO";
const OUTPUT_DIR_NAME = "relatorios/cotacoes";

const MERCADOS_DISPONIVEIS = [
    "spani",
    "tenda",
    "atacadao",
] as const;

const SCRAPERS: Record<string, ScraperModule> = {
    spani: spaniScraper,
    tenda: tendaScraper,
    atacadao: atacadaoScraper,
};

// ============================================================================
// Helpers
// ============================================================================

/**
 * Resolve o diretório de output relativo ao CWD do projeto.
 */
function resolveOutputDir(): string {
    const cwd = process.cwd();

    const candidates = [
        path.join(cwd, SQUAD_DIR, OUTPUT_DIR_NAME),
        path.join(cwd, OUTPUT_DIR_NAME),
    ];

    for (const candidate of candidates) {
        if (fs.existsSync(path.dirname(candidate))) {
            return candidate;
        }
    }

    return path.join(cwd, SQUAD_DIR, OUTPUT_DIR_NAME);
}

/**
 * Gera timestamp para nome de arquivo.
 */
function getTimestamp(): string {
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, "0");
    return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
}

/**
 * Formata número para formato brasileiro (vírgula decimal).
 */
function formatPreco(preco: number): string {
    return preco.toFixed(2).replace(".", ",");
}

/**
 * Gera conteúdo CSV a partir dos resultados.
 * Usa UTF-8 com BOM para compatibilidade com Excel PT-BR.
 */
function gerarCSV(resultados: ResultadoBusca[], dataColeta: string): string {
    const BOM = "\uFEFF";
    const SEPARATOR = ";"; // Ponto-e-vírgula é o padrão brasileiro no Excel
    const header = [
        "Ingrediente",
        "Preço (R$)",
        "Unidade",
        "Mercado",
        "Link",
        "Data da Coleta",
    ].join(SEPARATOR);

    const rows = resultados.map((r) =>
        [
            `"${r.nome.replace(/"/g, '""')}"`,
            formatPreco(r.preco),
            r.unidade,
            r.mercado,
            r.link,
            dataColeta,
        ].join(SEPARATOR)
    );

    return BOM + header + "\n" + rows.join("\n") + "\n";
}

/**
 * Delay entre buscas (rate limiting).
 */
function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// ============================================================================
// MCP Server Setup
// ============================================================================

const server = new McpServer({
    name: "comprador",
    version: "1.0.0",
});

// ============================================================================
// Tool: buscar_precos_ingredientes
// ============================================================================

server.tool(
    "buscar_precos_ingredientes",
    "Pesquisa preços de ingredientes em supermercados atacadistas da região do Vale do Paraíba — SP. " +
    "Busca em 3 mercados (Spani, Tenda, Atacadão) via headless browser com CEP regional. " +
    "Gera um arquivo CSV comparativo salvo em squads/CFO/relatorios/cotacoes/.",
    {
        ingredientes: z
            .array(z.string().min(2, "Ingrediente deve ter pelo menos 2 caracteres"))
            .min(1, "Informe pelo menos 1 ingrediente")
            .max(30, "Máximo de 30 ingredientes por busca")
            .describe(
                "Lista de ingredientes a pesquisar. " +
                "Exemplo: ['arroz 5kg', 'feijão carioca 1kg', 'óleo de soja 900ml']"
            ),
        mercados: z
            .array(z.enum(MERCADOS_DISPONIVEIS))
            .optional()
            .describe(
                "Mercados específicos para consultar (opcional — default: todos). " +
                "Opções: spani, tenda, atacadao"
            ),
    },
    async ({ ingredientes, mercados }) => {
        const mercadosSelecionados = mercados && mercados.length > 0
            ? mercados
            : [...MERCADOS_DISPONIVEIS];

        const dataColeta = new Date().toISOString().replace("T", " ").slice(0, 19);
        const todosResultados: ResultadoBusca[] = [];
        const resultadosPorMercado: ResultadoMercado[] = [];

        // Buscar em cada mercado (paralelo por mercado)
        const buscasPorMercado = mercadosSelecionados.map(async (mercadoKey) => {
            const scraper = SCRAPERS[mercadoKey];
            if (!scraper) {
                return {
                    mercado: mercadoKey,
                    sucesso: false,
                    resultados: [],
                    erro: `Scraper não encontrado para: ${mercadoKey}`,
                } as ResultadoMercado;
            }

            const resultadosMercado: ResultadoBusca[] = [];

            // Buscar cada ingrediente sequencialmente dentro do mesmo mercado
            // (para não sobrecarregar com requests simultâneos ao mesmo domínio)
            for (const ingrediente of ingredientes) {
                try {
                    const resultados = await scraper.buscar(ingrediente);
                    resultadosMercado.push(...resultados);
                } catch (error) {
                    // Ingrediente específico falhou, continua com os demais
                    console.error(
                        `[${scraper.nome}] Erro ao buscar "${ingrediente}":`,
                        error instanceof Error ? error.message : error
                    );
                }

                // Rate limiting: esperar 1s entre buscas no mesmo domínio
                await delay(1000);
            }

            return {
                mercado: scraper.nome,
                sucesso: true,
                resultados: resultadosMercado,
            } as ResultadoMercado;
        });

        // Executar todas as buscas em paralelo (cada mercado em paralelo)
        const resultadosMercados = await Promise.allSettled(buscasPorMercado);

        const mercadosComErro: Array<{ mercado: string; erro: string }> = [];

        for (const resultado of resultadosMercados) {
            if (resultado.status === "fulfilled") {
                const r = resultado.value;
                resultadosPorMercado.push(r);
                if (r.sucesso) {
                    todosResultados.push(...r.resultados);
                } else if (r.erro) {
                    mercadosComErro.push({ mercado: r.mercado, erro: r.erro });
                }
            } else {
                mercadosComErro.push({
                    mercado: "desconhecido",
                    erro: resultado.reason instanceof Error
                        ? resultado.reason.message
                        : String(resultado.reason),
                });
            }
        }

        // Gerar CSV
        let csvPath = "";
        if (todosResultados.length > 0) {
            const csvContent = gerarCSV(todosResultados, dataColeta);
            const outputDir = resolveOutputDir();
            fs.mkdirSync(outputDir, { recursive: true });

            const fileName = `cotacao-${getTimestamp()}.csv`;
            csvPath = path.join(outputDir, fileName);
            fs.writeFileSync(csvPath, csvContent, "utf-8");
        }

        // Montar resposta
        const resposta = {
            success: todosResultados.length > 0,
            csv_path: csvPath,
            total_itens: todosResultados.length,
            ingredientes_buscados: ingredientes,
            mercados_consultados: resultadosPorMercado
                .filter((r) => r.sucesso)
                .map((r) => r.mercado),
            mercados_com_erro: mercadosComErro.map((e) => e.mercado),
            erros: mercadosComErro,
            resumo_por_mercado: resultadosPorMercado.map((r) => ({
                mercado: r.mercado,
                itens_encontrados: r.resultados.length,
                sucesso: r.sucesso,
            })),
            timestamp: dataColeta,
            mensagem: todosResultados.length > 0
                ? `Encontrados ${todosResultados.length} resultados em ${resultadosPorMercado.filter((r) => r.sucesso).length} mercados. CSV salvo em: ${csvPath}`
                : "Nenhum resultado encontrado. Os sites podem estar indisponíveis ou com estrutura diferente da esperada. " +
                  "Tente novamente ou verifique os termos de busca.",
        };

        return {
            content: [
                {
                    type: "text" as const,
                    text: JSON.stringify(resposta, null, 2),
                },
            ],
        };
    }
);

// ============================================================================
// Start Server
// ============================================================================

async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("MCP Server Comprador rodando via stdio...");
    console.error(
        `Mercados disponíveis: ${Object.values(SCRAPERS).map((s) => s.nome).join(", ")}`
    );
}

main().catch((error) => {
    console.error("Erro fatal ao iniciar MCP Server Comprador:", error);
    process.exit(1);
});
