/**
 * Scraper para Assaí Atacadista
 * Site: assai.com.br (não possui e-commerce próprio, usa Cornershop/Rappi)
 *
 * Estratégia: Fallback via Google Search genérico para "assaí preço {ingrediente}"
 * (não filtra por domínio, pois o Assaí não tem busca pública de produtos)
 */
import { buscarViaGoogle } from "./google-search.js";
const MERCADO = "Assaí Atacadista";
async function buscar(ingrediente) {
    // Sem domínio específico, busca genérica no Google com nome do mercado
    return buscarViaGoogle(ingrediente, MERCADO);
}
const assaiScraper = {
    nome: MERCADO,
    buscar,
};
export default assaiScraper;
//# sourceMappingURL=assai.js.map