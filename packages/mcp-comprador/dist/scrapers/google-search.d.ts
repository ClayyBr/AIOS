/**
 * Scraper Genérico via Google Search
 *
 * Usado como fallback para mercados cujos sites são carregados via JavaScript
 * (VTEX, React, etc.) e não retornam conteúdo via HTTP simples.
 *
 * Estratégia: Busca no Google por "{ingrediente} site:{dominio}" ou
 * "{ingrediente} preço {mercado}" e extrai informações dos snippets.
 */
import type { ResultadoBusca } from "../types.js";
/**
 * Busca preços de um ingrediente em um mercado específico usando Google Search.
 *
 * @param ingrediente - Nome do ingrediente (ex: "frango sasami")
 * @param mercado - Nome do mercado (ex: "Atacadão")
 * @param dominio - Domínio do site (ex: "atacadao.com.br") — opcional
 */
export declare function buscarViaGoogle(ingrediente: string, mercado: string, dominio?: string): Promise<ResultadoBusca[]>;
//# sourceMappingURL=google-search.d.ts.map