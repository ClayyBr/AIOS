/**
 * QA Test Script — Teste funcional do MCP Comprador
 * 
 * Testa diretamente a lógica de scraping sem precisar do protocolo MCP.
 * Ingrediente de teste: "frango sasami"
 */

import spaniScraper from "./scrapers/spani.js";
import tendaScraper from "./scrapers/tenda.js";
import atacadaoScraper from "./scrapers/atacadao.js";
import assaiScraper from "./scrapers/assai.js";
import fortScraper from "./scrapers/fort.js";

const INGREDIENTE = "frango sasami";
const scrapers = [spaniScraper, tendaScraper, atacadaoScraper, assaiScraper, fortScraper];

async function runTest() {
    console.log(`\n✅ QA Test — @comprador MCP Server`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`🔍 Ingrediente: "${INGREDIENTE}"`);
    console.log(`📅 Data: ${new Date().toISOString()}\n`);

    let totalResultados = 0;
    let mercadosSucesso = 0;
    let mercadosErro = 0;

    for (const scraper of scrapers) {
        console.log(`\n🏪 Testando: ${scraper.nome}...`);
        try {
            const resultados = await scraper.buscar(INGREDIENTE);
            if (resultados.length > 0) {
                console.log(`  ✅ ${resultados.length} resultado(s) encontrado(s):`);
                for (const r of resultados.slice(0, 3)) { // Mostrar até 3
                    console.log(`    - ${r.nome} | R$ ${r.preco.toFixed(2).replace('.', ',')} | ${r.unidade} | ${r.link.slice(0, 60)}...`);
                }
                if (resultados.length > 3) {
                    console.log(`    ... e mais ${resultados.length - 3} resultado(s)`);
                }
                totalResultados += resultados.length;
                mercadosSucesso++;
            } else {
                console.log(`  ⚠️ 0 resultados — site pode não ter o produto ou seletores CSS precisam de ajuste`);
                mercadosSucesso++; // Conexão funcionou, só não achou
            }
        } catch (error) {
            const msg = error instanceof Error ? error.message : String(error);
            console.log(`  ❌ ERRO: ${msg}`);
            mercadosErro++;
        }
    }

    console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`📊 RESUMO DO TESTE:`);
    console.log(`  Total de resultados: ${totalResultados}`);
    console.log(`  Mercados com sucesso: ${mercadosSucesso}/${scrapers.length}`);
    console.log(`  Mercados com erro: ${mercadosErro}/${scrapers.length}`);
    console.log(`\n🏁 Teste finalizado.`);
}

runTest().catch((err) => {
    console.error("Erro fatal no teste:", err);
    process.exit(1);
});
