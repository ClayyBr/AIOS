/**
 * Scraper para Tenda Atacado — Playwright (Headless Browser)
 *
 * O site do Tenda (tendaatacado.com.br) é um Next.js customizado
 * que exige CEP para exibir preços regionais. Não possui API pública
 * acessível diretamente, então usamos headless browser.
 *
 * Estratégia:
 * 1. Navega ao site
 * 2. Intercepta requests de rede para capturar chamadas de API com dados reais
 * 3. Define o CEP para preços da região
 * 4. Busca o ingrediente
 * 5. Extrai nomes e preços do DOM renderizado
 */
import type { ScraperModule } from "../types.js";
/**
 * Fechar o browser ao finalizar.
 */
export declare function closeBrowser(): Promise<void>;
declare const tendaScraper: ScraperModule;
export default tendaScraper;
//# sourceMappingURL=tenda.d.ts.map