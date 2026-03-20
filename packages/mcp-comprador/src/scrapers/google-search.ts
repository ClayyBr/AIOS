/**
 * Scraper Genérico via Google Search
 *
 * Usado como fallback para mercados cujos sites são carregados via JavaScript
 * (VTEX, React, etc.) e não retornam conteúdo via HTTP simples.
 *
 * Estratégia: Busca no Google por "{ingrediente} site:{dominio}" ou
 * "{ingrediente} preço {mercado}" e extrai informações dos snippets.
 */

import axios from "axios";
import * as cheerio from "cheerio";
import type { ResultadoBusca } from "../types.js";

const USER_AGENT =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

/**
 * Busca preços de um ingrediente em um mercado específico usando Google Search.
 *
 * @param ingrediente - Nome do ingrediente (ex: "frango sasami")
 * @param mercado - Nome do mercado (ex: "Atacadão")
 * @param dominio - Domínio do site (ex: "atacadao.com.br") — opcional
 */
export async function buscarViaGoogle(
    ingrediente: string,
    mercado: string,
    dominio?: string
): Promise<ResultadoBusca[]> {
    const resultados: ResultadoBusca[] = [];

    // Montar query de busca
    const query = dominio
        ? `${ingrediente} preço site:${dominio}`
        : `${ingrediente} preço ${mercado} atacado`;

    try {
        const response = await axios.get("https://www.google.com/search", {
            params: {
                q: query,
                hl: "pt-BR",
                gl: "br",
                num: 10,
            },
            headers: {
                "User-Agent": USER_AGENT,
                "Accept": "text/html,application/xhtml+xml",
                "Accept-Language": "pt-BR,pt;q=0.9",
            },
            timeout: 15000,
        });

        const $ = cheerio.load(response.data);

        // Buscar nos resultados do Google por snippets com preços
        $(".g, [data-hveid]").each((_i, el) => {
            const textoCompleto = $(el).text();
            const link = $(el).find("a").first().attr("href") || "";

            // Filtrar apenas resultados do domínio do mercado (se fornecido)
            if (dominio && !link.includes(dominio)) return;

            // Extrair preços do formato R$ XX,XX ou R$XX,XX
            const precosMatch = textoCompleto.match(/R\$\s*(\d{1,3}(?:\.\d{3})*,\d{2})/g);
            if (!precosMatch || precosMatch.length === 0) return;

            // Extrair título/nome do produto
            const titulo = $(el).find("h3").first().text().trim() || textoCompleto.slice(0, 80).trim();
            if (!titulo) return;

            for (const precoStr of precosMatch.slice(0, 1)) { // Pegar o primeiro preço
                const preco = parsePrecoGoogle(precoStr);
                if (preco > 0 && preco < 10000) { // Filtrar preços absurdos
                    resultados.push({
                        nome: titulo.slice(0, 120),
                        preco,
                        unidade: extrairUnidade(titulo),
                        mercado,
                        link: link.startsWith("/url?") ? extrairUrlGoogle(link) : link,
                    });
                }
            }
        });

        // Google Shopping results (se disponíveis no HTML)
        $('[data-sh-prd], .sh-dgr__content, .commercial-unit-desktop-rhs').each((_i, el) => {
            const nome = $(el).find('.sh-np__product-title, .translate-content, h3, h4').first().text().trim();
            const precoStr = $(el).find('.sh-np__price, .a8Pemb, .kHxwFf').first().text().trim();
            const link = $(el).find('a').first().attr('href') || '';

            if (nome && precoStr) {
                const preco = parsePrecoGoogle(precoStr);
                if (preco > 0 && preco < 10000) {
                    resultados.push({
                        nome: nome.slice(0, 120),
                        preco,
                        unidade: extrairUnidade(nome),
                        mercado: `${mercado} (Google Shopping)`,
                        link: link.startsWith('/') ? `https://www.google.com${link}` : link,
                    });
                }
            }
        });

    } catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        throw new Error(`Erro na busca Google para ${mercado}: ${msg}`);
    }

    return resultados;
}

function parsePrecoGoogle(texto: string): number {
    const limpo = texto
        .replace(/R\$\s*/g, "")
        .replace(/\./g, "")
        .replace(",", ".")
        .replace(/[^\d.]/g, "")
        .trim();
    return parseFloat(limpo) || 0;
}

function extrairUnidade(nome: string): string {
    const match = nome.match(/(\d+\s*(?:kg|g|ml|l|un|und|pct|cx|lt|dz))/i);
    return match ? match[1].trim().toLowerCase() : "und";
}

function extrairUrlGoogle(url: string): string {
    try {
        const match = url.match(/[?&]q=([^&]+)/);
        if (match) return decodeURIComponent(match[1]);
    } catch { /* ignore */ }
    return url;
}
