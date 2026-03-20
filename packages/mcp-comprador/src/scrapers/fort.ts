/**
 * Scraper para Fort Atacadista
 * Site: fortatacadista.com.br / deliveryfort.com.br (JS-rendered)
 *
 * Estratégia: Fallback via Google Search com site:fortatacadista.com.br
 */

import { buscarViaGoogle } from "./google-search.js";
import type { ResultadoBusca, ScraperModule } from "../types.js";

const MERCADO = "Fort Atacadista";
const DOMINIO = "fortatacadista.com.br";

async function buscar(ingrediente: string): Promise<ResultadoBusca[]> {
    return buscarViaGoogle(ingrediente, MERCADO, DOMINIO);
}

const fortScraper: ScraperModule = {
    nome: MERCADO,
    buscar,
};

export default fortScraper;
