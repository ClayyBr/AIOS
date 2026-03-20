/**
 * Scraper para Atacadão — Playwright (Headless Browser)
 * Site: atacadao.com.br
 *
 * O Atacadão exige CEP + seleção de loja para exibir preços.
 * Fluxo: "Informar Localização" → Digitar CEP → Selecionar loja (Taubaté) → Confirmar
 * Busca: /s?q={ingrediente}&sort=score_desc&page=0
 * Viewport mínimo: 1920x1080 (barra de busca fica oculta em resoluções menores)
 */
import type { ScraperModule } from "../types.js";
export declare function closeBrowserAtacadao(): Promise<void>;
declare const atacadaoScraper: ScraperModule;
export default atacadaoScraper;
//# sourceMappingURL=atacadao.d.ts.map