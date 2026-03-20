/**
 * Scraper para Fort Atacadista
 * Site: fortatacadista.com.br / deliveryfort.com.br (JS-rendered)
 *
 * Estratégia: Fallback via Google Search com site:fortatacadista.com.br
 */
import { buscarViaGoogle } from "./google-search.js";
const MERCADO = "Fort Atacadista";
const DOMINIO = "fortatacadista.com.br";
async function buscar(ingrediente) {
    return buscarViaGoogle(ingrediente, MERCADO, DOMINIO);
}
const fortScraper = {
    nome: MERCADO,
    buscar,
};
export default fortScraper;
//# sourceMappingURL=fort.js.map