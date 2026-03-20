/**
 * Tipos compartilhados do MCP Comprador
 */
/**
 * Resultado de busca para um único produto encontrado em um mercado.
 */
export interface ResultadoBusca {
    /** Nome do produto como exibido no site */
    nome: string;
    /** Preço em reais (ex: 24.90) */
    preco: number;
    /** Unidade/embalagem (ex: "5kg", "1kg", "900ml", "und") */
    unidade: string;
    /** Nome do mercado */
    mercado: string;
    /** URL direta para o produto no site */
    link: string;
}
/**
 * Resultado completo de uma busca por mercado.
 */
export interface ResultadoMercado {
    mercado: string;
    sucesso: boolean;
    resultados: ResultadoBusca[];
    erro?: string;
}
/**
 * Resposta final da tool MCP.
 */
export interface RespostaFinal {
    success: boolean;
    csv_path: string;
    total_itens: number;
    mercados_consultados: string[];
    mercados_com_erro: string[];
    erros: Array<{
        mercado: string;
        erro: string;
    }>;
    timestamp: string;
}
/**
 * Interface que cada módulo de scraper deve implementar.
 */
export interface ScraperModule {
    /** Nome do mercado */
    nome: string;
    /** Busca um ingrediente no site do mercado */
    buscar(ingrediente: string): Promise<ResultadoBusca[]>;
}
//# sourceMappingURL=types.d.ts.map