/**
 * Scraper para Assaí Atacadista
 * Site: assai.com.br (não possui e-commerce próprio, usa Cornershop/Rappi)
 *
 * Estratégia: Fallback via Google Search genérico para "assaí preço {ingrediente}"
 * (não filtra por domínio, pois o Assaí não tem busca pública de produtos)
 */
import type { ScraperModule } from "../types.js";
declare const assaiScraper: ScraperModule;
export default assaiScraper;
//# sourceMappingURL=assai.d.ts.map