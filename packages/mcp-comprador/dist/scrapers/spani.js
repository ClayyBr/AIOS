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
import { chromium } from "playwright";
const BASE_URL = "https://www.spanionline.com.br";
const MERCADO = "Spani Atacadista";
const CEP = process.env.COMPRADOR_CEP || "12060360";
let browserInstance = null;
let pageInstance = null;
let cepDefinido = false;
async function getBrowser() {
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
async function getPage() {
    const browser = await getBrowser();
    if (!pageInstance || pageInstance.isClosed()) {
        pageInstance = await browser.newPage();
        await pageInstance.setViewportSize({ width: 1366, height: 768 });
        cepDefinido = false;
    }
    return pageInstance;
}
async function definirCep(page) {
    if (cepDefinido)
        return;
    try {
        await page.goto(BASE_URL, { waitUntil: "domcontentloaded", timeout: 30000 });
        await page.waitForTimeout(3000);
        // 1. Fechar banner de cookies ("continuar e fechar")
        try {
            const cookieBtn = page.locator('button:has-text("continuar e fechar"), button:has-text("Aceitar"), button:has-text("CONCORDO")').first();
            await cookieBtn.click({ timeout: 3000 });
            await page.waitForTimeout(500);
        }
        catch { /* sem banner */ }
        // 2. Clicar no botão de localização: "Entrega ou Retirada"
        try {
            const locBtn = page.locator("button[title='Entrega ou Retirada'], button:has-text('Entrega ou Retirada')").first();
            await locBtn.click({ timeout: 5000 });
            await page.waitForTimeout(1500);
        }
        catch (e) {
            console.error(`[${MERCADO}] Não encontrou botão de localização:`, e instanceof Error ? e.message : e);
        }
        // 3. Clicar em "Receber em Casa"
        try {
            const receberBtn = page.locator("div[role='radio']:has-text('Receber em Casa'), button:has-text('Receber em Casa'), text='Receber em Casa'").first();
            await receberBtn.click({ timeout: 3000 });
            await page.waitForTimeout(1000);
        }
        catch { /* pode já estar selecionado */ }
        // 4. Clicar em "Informar um CEP"
        try {
            const informarBtn = page.locator("button[title='Informar um CEP para entrega'], button:has-text('Informar um CEP'), text='Informar um CEP'").first();
            await informarBtn.click({ timeout: 3000 });
            await page.waitForTimeout(1000);
        }
        catch { /* campo pode já estar visível */ }
        // 5. Preencher campo CEP (input#cep)
        const cepInput = page.locator("input#cep, input[id='cep'], input[placeholder*='CEP'], input[name*='cep']").first();
        try {
            await cepInput.waitFor({ timeout: 5000 });
            await cepInput.clear();
            await cepInput.fill(CEP);
            await page.waitForTimeout(500);
            // 6. Clicar em "Verificar Disponibilidade"
            const verificarBtn = page.locator("button:has-text('Verificar Disponibilidade'), button:has-text('Verificar')").first();
            await verificarBtn.click({ timeout: 3000 });
            await page.waitForTimeout(3000);
            // Verificar se o CEP foi aceito (header deve mostrar endereço)
            const headerTexto = await page.locator("header").first().textContent();
            if (headerTexto && (headerTexto.includes("Entregar") || headerTexto.includes("endereço"))) {
                cepDefinido = true;
            }
            else {
                // Tentar fechar qualquer modal de confirmação
                try {
                    const fecharBtn = page.locator("button:has-text('Fechar'), button:has-text('OK'), button:has-text('Confirmar')").first();
                    await fecharBtn.click({ timeout: 2000 });
                    await page.waitForTimeout(1000);
                }
                catch { /* sem modal */ }
                cepDefinido = true;
            }
        }
        catch (e) {
            console.error(`[${MERCADO}] Erro no input de CEP:`, e instanceof Error ? e.message : e);
            // Fallback: tentar via localStorage
            await page.evaluate((cep) => {
                localStorage.setItem("cep", cep);
                localStorage.setItem("postalCode", cep);
            }, CEP);
            cepDefinido = true;
        }
    }
    catch (error) {
        console.error(`[${MERCADO}] Erro geral ao definir CEP:`, error instanceof Error ? error.message : error);
    }
}
async function buscar(ingrediente) {
    const resultados = [];
    try {
        const page = await getPage();
        await definirCep(page);
        // IMPORTANTE: O Spani usa "termo" como query param, NÃO "q"
        const searchUrl = `${BASE_URL}/busca?termo=${encodeURIComponent(ingrediente)}`;
        await page.goto(searchUrl, { waitUntil: "networkidle", timeout: 30000 });
        await page.waitForTimeout(5000); // SPA precisa de mais tempo
        // Extrair dados do DOM
        const produtos = await page.evaluate(() => {
            const items = [];
            // Buscar TODOS os textos que contêm preço no formato "R$ XX,XX"
            // e estão próximos de links de produto
            const allText = document.body.innerText;
            // Estratégia 1: Procurar por links de produto (/produto/) e preços no contexto
            const produtoLinks = document.querySelectorAll('a[href*="/produto/"]');
            const nomesProcessados = new Set();
            produtoLinks.forEach((linkEl) => {
                const nome = linkEl.textContent?.trim() || "";
                if (!nome || nome.length < 5 || nomesProcessados.has(nome))
                    return;
                // Subir no DOM para encontrar o card do produto
                let container = linkEl.parentElement;
                for (let i = 0; i < 8 && container; i++) {
                    const texto = container.textContent || "";
                    const precoMatch = texto.match(/R\$\s*(\d{1,3}(?:\.\d{3})*,\d{2})/);
                    if (precoMatch) {
                        const preco = parseFloat(precoMatch[1].replace(/\./g, "").replace(",", "."));
                        if (preco > 0 && preco < 50000) {
                            nomesProcessados.add(nome);
                            items.push({
                                nome,
                                preco,
                                link: linkEl.href || "",
                            });
                            break;
                        }
                    }
                    container = container.parentElement;
                }
            });
            // Estratégia 2: Custom elements do Spani (vip-produto-preco-valor)
            if (items.length === 0) {
                // Coletar todos os blocos de texto visíveis que parecem ser produtos
                const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
                const textos = [];
                while (walker.nextNode()) {
                    const node = walker.currentNode;
                    const texto = node.textContent?.trim() || "";
                    if (texto.length > 3) {
                        const range = document.createRange();
                        range.selectNode(node);
                        try {
                            textos.push({ texto, rect: range.getBoundingClientRect() });
                        }
                        catch {
                            textos.push({ texto, rect: null });
                        }
                    }
                }
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
    }
    catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        throw new Error(`Erro ao buscar no ${MERCADO}: ${msg}`);
    }
    return resultados;
}
function extrairUnidade(nome) {
    const match = nome.match(/(\d+\s*(?:kg|g|ml|l|un|und|pct|cx|lt|dz))/i);
    return match ? match[1].trim().toLowerCase() : "und";
}
export async function closeBrowserSpani() {
    if (browserInstance) {
        await browserInstance.close();
        browserInstance = null;
        pageInstance = null;
        cepDefinido = false;
    }
}
const spaniScraper = {
    nome: MERCADO,
    buscar,
};
export default spaniScraper;
//# sourceMappingURL=spani.js.map