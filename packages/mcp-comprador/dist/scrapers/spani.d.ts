/**
 * Scraper para Spani Atacadista — Playwright (Headless Browser)
 * Site: spanionline.com.br
 *
 * Descobertas da calibração:
 *   - Param de busca é "termo" (não "q"): /busca?termo=sassami
 *   - CEP button: button[title='Entrega ou Retirada']
 *   - CEP input: input#cep
 *   - Fluxo: Entrega ou Retirada → Receber em Casa → Informar CEP → Verificar
 *   - Produto nome: texto dentro dos cards grid
 *   - Produto preço: formato "R$ XX,XX/un"
 *   - Custom elements: vip-produto-preco, vip-produto-preco-valor
 */
import type { ScraperModule } from "../types.js";
export declare function closeBrowserSpani(): Promise<void>;
declare const spaniScraper: ScraperModule;
export default spaniScraper;
//# sourceMappingURL=spani.d.ts.map