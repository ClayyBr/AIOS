/**
 * Scraper para Atacadão — Playwright (Headless Browser)
 * Site: atacadao.com.br
 *
 * O Atacadão exige CEP + seleção de loja para exibir preços.
 * Fluxo: "Informar Localização" → Digitar CEP → Selecionar loja (Taubaté) → Confirmar
 * Busca: /s?q={ingrediente}&sort=score_desc&page=0
 * Viewport mínimo: 1920x1080 (barra de busca fica oculta em resoluções menores)
 */

import { chromium, type Browser, type Page } from "playwright";
import type { ResultadoBusca, ScraperModule } from "../types.js";

const BASE_URL = "https://www.atacadao.com.br";
const MERCADO = "Atacadão";
const CEP = process.env.COMPRADOR_CEP || "12060360";

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
        // Atacadão precisa de viewport maior para mostrar a barra de busca
        await pageInstance.setViewportSize({ width: 1920, height: 1080 });
        cepDefinido = false;
    }
    return pageInstance;
}

async function definirCep(page: Page): Promise<void> {
    if (cepDefinido) return;

    try {
        await page.goto(BASE_URL, { waitUntil: "domcontentloaded", timeout: 30000 });
        await page.waitForTimeout(3000);

        // Fechar banner de cookies
        try {
            const cookieBtn = page.locator('button:has-text("Aceitar"), button:has-text("CONCORDO"), button[id*="cookie"]').first();
            await cookieBtn.click({ timeout: 3000 });
            await page.waitForTimeout(500);
        } catch { /* sem banner */ }

        // Clicar em "Informar Localização" ou no seletor de CEP
        try {
            const locBtn = page.locator('button:has-text("Informar Localização"), button:has-text("Informar"), [class*="regionalization"], [data-testid*="location"]').first();
            await locBtn.click({ timeout: 5000 });
            await page.waitForTimeout(2000);
        } catch {
            // Tentar link de localização no header
            try {
                await page.click('text="Informar Localização"', { timeout: 3000 });
                await page.waitForTimeout(2000);
            } catch { /* continua */ }
        }

        // Preencher CEP no modal
        const cepInput = page.locator('input[placeholder*="CEP"], input[name*="cep"], input[type="tel"], input[inputmode="numeric"]').first();
        try {
            await cepInput.waitFor({ timeout: 5000 });
            await cepInput.fill(CEP);
            await page.waitForTimeout(1000);

            // Pressionar Enter ou clicar em buscar
            await page.keyboard.press("Enter");
            await page.waitForTimeout(3000);

            // Selecionar a primeira loja disponível (Loja Taubaté)
            try {
                const lojaCard = page.locator('[class*="store"], [class*="loja"], [data-testid*="store"]').first();
                await lojaCard.click({ timeout: 3000 });
                await page.waitForTimeout(1000);
            } catch { /* pode ter seleção automática */ }

            // Clicar em Confirmar
            try {
                const confirmarBtn = page.locator('button:has-text("Confirmar"), button:has-text("Selecionar"), button[type="submit"]').first();
                await confirmarBtn.click({ timeout: 3000 });
                await page.waitForTimeout(2000);
            } catch { /* pode não precisar confirmar */ }

            cepDefinido = true;
        } catch {
            // Fallback: definir via localStorage/cookie
            await page.evaluate((cep) => {
                localStorage.setItem("cep", cep);
                localStorage.setItem("postalCode", cep);
                document.cookie = `cep=${cep}; path=/`;
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

        // Navegar para a busca — Atacadão usa /s?q= (não /busca?q=)
        const searchUrl = `${BASE_URL}/s?q=${encodeURIComponent(ingrediente)}&sort=score_desc&page=0`;
        await page.goto(searchUrl, { waitUntil: "networkidle", timeout: 30000 });
        await page.waitForTimeout(4000);

        // Extrair dados do DOM renderizado
        const produtos = await page.evaluate(() => {
            const items: Array<{ nome: string; preco: number; link: string }> = [];

            // Estratégia 1: Cards de produto do Atacadão
            const productCards = document.querySelectorAll(
                'section[class*="product"], div[class*="product-card"], [class*="ProductCard"], [data-testid*="product"], article'
            );

            productCards.forEach((card) => {
                const nomeEl = card.querySelector('h3 a, h2 a, [class*="name"], [class*="Name"], [class*="title"]');
                const nome = nomeEl?.textContent?.trim() || "";

                // Preço — pegar do texto do card
                const textoCard = card.textContent || "";
                const precoMatch = textoCard.match(/R\$\s*(\d{1,3}(?:\.\d{3})*,\d{2})/);
                const precoNum = precoMatch
                    ? parseFloat(precoMatch[1].replace(/\./g, "").replace(",", "."))
                    : 0;

                const linkEl = card.querySelector('a[href]');
                const link = (linkEl as HTMLAnchorElement)?.href || "";

                if (nome && nome.length > 3 && precoNum > 0 && precoNum < 10000) {
                    if (!items.some((i) => i.nome === nome)) {
                        items.push({ nome, preco: precoNum, link });
                    }
                }
            });

            // Estratégia 2: Links de produto com preço no contexto pai
            if (items.length === 0) {
                const allLinks = document.querySelectorAll('a[href*="/"]');
                allLinks.forEach((a) => {
                    const nome = a.textContent?.trim() || "";
                    if (!nome || nome.length < 5 || nome.length > 200) return;

                    let parent = a.parentElement;
                    for (let i = 0; i < 6 && parent; i++) {
                        const texto = parent.textContent || "";
                        const precoMatch = texto.match(/R\$\s*(\d{1,3}(?:\.\d{3})*,\d{2})/);
                        if (precoMatch) {
                            const preco = parseFloat(precoMatch[1].replace(/\./g, "").replace(",", "."));
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

        for (const p of produtos) {
            resultados.push({
                nome: p.nome,
                preco: p.preco,
                unidade: extrairUnidade(p.nome),
                mercado: MERCADO,
                link: p.link || searchUrl,
            });
        }
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

export async function closeBrowserAtacadao(): Promise<void> {
    if (browserInstance) {
        await browserInstance.close();
        browserInstance = null;
        pageInstance = null;
        cepDefinido = false;
    }
}

const atacadaoScraper: ScraperModule = {
    nome: MERCADO,
    buscar,
};

export default atacadaoScraper;
