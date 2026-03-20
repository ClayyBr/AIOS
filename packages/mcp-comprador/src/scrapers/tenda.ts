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

import { chromium, type Browser, type Page } from "playwright";
import type { ResultadoBusca, ScraperModule } from "../types.js";

const BASE_URL = "https://www.tendaatacado.com.br";
const MERCADO = "Tenda Atacado";
const CEP = process.env.COMPRADOR_CEP || "12060360";

// Cache do browser para reusar entre buscas
let browserInstance: Browser | null = null;
let pageInstance: Page | null = null;
let cepDefinido = false;

async function getBrowser(): Promise<Browser> {
    if (!browserInstance || !browserInstance.isConnected()) {
        browserInstance = await chromium.launch({
            headless: true,
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
        });
        cepDefinido = false;
        pageInstance = null;
    }
    return browserInstance;
}

async function getPage(): Promise<Page> {
    const browser = await getBrowser();
    if (!pageInstance || pageInstance.isClosed()) {
        pageInstance = await browser.newPage();
        await pageInstance.setViewportSize({ width: 1366, height: 768 });
        cepDefinido = false;
    }
    return pageInstance;
}

async function definirCep(page: Page): Promise<void> {
    if (cepDefinido) return;

    try {
        // Navegar para a home
        await page.goto(BASE_URL, { waitUntil: "domcontentloaded", timeout: 30000 });

        // Fechar banner de cookies se existir
        try {
            const cookieBtn = page.locator('button:has-text("CONCORDO"), button:has-text("Aceitar"), button:has-text("Fechar")').first();
            await cookieBtn.click({ timeout: 3000 });
        } catch { /* banner pode não existir */ }

        // Aguardar um pouco para o modal de CEP aparecer
        await page.waitForTimeout(2000);

        // Procurar campo de CEP — pode ser input, modal, ou sidebar
        const cepInput = page.locator('input[placeholder*="CEP"], input[name*="cep"], input[id*="cep"], input[type="tel"]').first();

        try {
            await cepInput.waitFor({ timeout: 5000 });
            await cepInput.fill(CEP);

            // Clicar em enviar/OK
            const submitBtn = page.locator('button:has-text("Enviar"), button:has-text("OK"), button:has-text("Confirmar"), button[type="submit"]').first();
            await submitBtn.click({ timeout: 3000 });
            await page.waitForTimeout(2000);
            cepDefinido = true;
        } catch {
            // Se não encontrou campo de CEP diretamente, tenta buscar via localStorage/cookie
            await page.evaluate((cep) => {
                localStorage.setItem("cep", cep);
                localStorage.setItem("postalCode", cep);
                document.cookie = `cep=${cep}; path=/`;
                document.cookie = `postalCode=${cep}; path=/`;
            }, CEP);
            cepDefinido = true;
        }
    } catch (error) {
        console.error(`[${MERCADO}] Erro ao definir CEP:`, error instanceof Error ? error.message : error);
    }
}

async function buscar(ingrediente: string): Promise<ResultadoBusca[]> {
    const resultados: ResultadoBusca[] = [];

    try {
        const page = await getPage();
        await definirCep(page);

        // Interceptar chamadas de API para capturar dados JSON com preços
        const apiResponses: any[] = [];
        page.on("response", async (response) => {
            const url = response.url();
            if (
                (url.includes("/api/") || url.includes("/search") || url.includes("/product")) &&
                response.status() === 200
            ) {
                try {
                    const contentType = response.headers()["content-type"] || "";
                    if (contentType.includes("json")) {
                        const json = await response.json();
                        apiResponses.push(json);
                    }
                } catch { /* ignore parse errors */ }
            }
        });

        // Navegar para a busca
        const searchUrl = `${BASE_URL}/busca?q=${encodeURIComponent(ingrediente)}`;
        await page.goto(searchUrl, { waitUntil: "networkidle", timeout: 30000 });

        // Aguardar a página renderizar os produtos
        await page.waitForTimeout(3000);

        // Tentar extrair dados do DOM renderizado
        const produtos = await page.evaluate(() => {
            const items: Array<{
                nome: string;
                preco: number;
                link: string;
            }> = [];

            // Estratégia 1: Procurar por containers de produto
            // O Tenda usa classes customizadas, então buscamos por padrões visuais
            const productCards = document.querySelectorAll(
                '[class*="product"], [class*="Product"], [class*="item"], [class*="shelf"], [data-testid*="product"]'
            );

            productCards.forEach((card) => {
                // Nome do produto
                const nomeEl = card.querySelector(
                    'h2, h3, a[href*="/produto/"], [class*="name"], [class*="Name"], [class*="title"], [class*="Title"]'
                );
                const nome = nomeEl?.textContent?.trim() || "";

                // Preço — procurar por padrão R$ XX,XX
                const textoCard = card.textContent || "";
                const precoMatch = textoCard.match(/R\$\s*(\d{1,3}(?:\.\d{3})*,\d{2})/);
                const precoNum = precoMatch
                    ? parseFloat(precoMatch[1].replace(/\./g, "").replace(",", "."))
                    : 0;

                // Link do produto
                const linkEl = card.querySelector('a[href*="/produto/"]');
                const link = (linkEl as HTMLAnchorElement)?.href || "";

                if (nome && nome.length > 3 && precoNum > 0 && precoNum < 10000) {
                    // Evitar duplicatas
                    if (!items.some((i) => i.nome === nome)) {
                        items.push({ nome, preco: precoNum, link });
                    }
                }
            });

            // Estratégia 2: Se não encontrou com cards, buscar diretamente pares de nome+preço
            if (items.length === 0) {
                const links = document.querySelectorAll('a[href*="/produto/"]');
                links.forEach((a) => {
                    const nome = a.textContent?.trim() || "";
                    if (!nome || nome.length < 5) return;

                    // Procurar preço no contexto visual (siblings/parent)
                    let parent = a.parentElement;
                    for (let i = 0; i < 6 && parent; i++) {
                        const texto = parent.textContent || "";
                        const precoMatch = texto.match(/R\$\s*(\d{1,3}(?:\.\d{3})*,\d{2})/);
                        if (precoMatch) {
                            const preco = parseFloat(
                                precoMatch[1].replace(/\./g, "").replace(",", ".")
                            );
                            if (preco > 0 && preco < 10000 && !items.some((i) => i.nome === nome)) {
                                items.push({
                                    nome,
                                    preco,
                                    link: (a as HTMLAnchorElement).href,
                                });
                                break;
                            }
                        }
                        parent = parent.parentElement;
                    }
                });
            }

            return items;
        });

        // Converter para ResultadoBusca
        for (const p of produtos) {
            resultados.push({
                nome: p.nome,
                preco: p.preco,
                unidade: extrairUnidade(p.nome),
                mercado: MERCADO,
                link: p.link || searchUrl,
            });
        }

        // Se capturamos dados via API, tentar extrair preços de lá também
        if (resultados.length === 0 && apiResponses.length > 0) {
            for (const data of apiResponses) {
                try {
                    const products = data.products || data.items || data.data?.products || [];
                    if (Array.isArray(products)) {
                        for (const prod of products) {
                            const nome = prod.productName || prod.name || prod.title || "";
                            const preco =
                                prod.priceRange?.sellingPrice?.lowPrice ||
                                prod.items?.[0]?.sellers?.[0]?.commertialOffer?.Price ||
                                prod.price ||
                                prod.sellingPrice ||
                                0;
                            const link = prod.link || prod.url || prod.slug || "";

                            if (nome && preco > 0) {
                                resultados.push({
                                    nome,
                                    preco,
                                    unidade: extrairUnidade(nome),
                                    mercado: MERCADO,
                                    link: link.startsWith("http") ? link : `${BASE_URL}${link}`,
                                });
                            }
                        }
                    }
                } catch { /* ignore malformed api responses */ }
            }
        }

        // Limpar listeners de response
        page.removeAllListeners("response");

    } catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        throw new Error(`Erro ao buscar no ${MERCADO}: ${msg}`);
    }

    return resultados;
}

function extrairUnidade(nome: string): string {
    const match = nome.match(/(\d+\s*(?:kg|g|ml|l|un|und|pct|cx|lt|dz))/i);
    return match ? match[1].trim().toLowerCase() : "und";
}

/**
 * Fechar o browser ao finalizar.
 */
export async function closeBrowser(): Promise<void> {
    if (browserInstance) {
        await browserInstance.close();
        browserInstance = null;
        pageInstance = null;
        cepDefinido = false;
    }
}

const tendaScraper: ScraperModule = {
    nome: MERCADO,
    buscar,
};

export default tendaScraper;
