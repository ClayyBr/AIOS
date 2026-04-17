const fs = require('fs');
const path = require('path');
const { scrapeNfce } = require('./nfce-scraper');

async function processInBatches(urls, batchSize = 3) {
    const results = [];
    for (let i = 0; i < urls.length; i += batchSize) {
        const batch = urls.slice(i, i + batchSize);
        console.log(`[Batch] Processando lote ${i / batchSize + 1} de ${Math.ceil(urls.length / batchSize)} com ${batch.length} notas...`);
        const batchPromises = batch.map(async url => {
            try {
                const data = await scrapeNfce(url);
                return { url, data, status: 'success' };
            } catch (error) {
                return { url, error: error.message, status: 'error' };
            }
        });
        const batchResults = await Promise.all(batchPromises);
        results.push(...batchResults);
    }
    return results;
}

(async () => {
    const args = process.argv.slice(2);
    if (args.length === 0) {
        console.error("Uso: node processar-notas.js <arquivo_com_links.txt> ou <url1> <url2>");
        process.exit(1);
    }

    let urls = [];
    
    // Verifica se o argumento é um arquivo .txt
    if (args.length === 1 && args[0].endsWith('.txt')) {
        const filePath = path.resolve(args[0]);
        if (!fs.existsSync(filePath)) {
            console.error(`Erro: Arquivo não encontrado: ${filePath}`);
            process.exit(1);
        }
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        urls = fileContent.split('\n').map(l => l.trim()).filter(l => l.startsWith('http'));
    } else {
        // Assume que as URLs foram passadas como argumentos separadas por espaço
        urls = args.filter(l => l.startsWith('http'));
    }

    if (urls.length === 0) {
         console.warn("Aviso: Nenhuma URL http(s) válida foi detectada na entrada.");
         process.exit(0);
    }

    console.log(`\n🚀 Iniciando Extração Lote Rápida | ${urls.length} URLs carregadas\n`);
    const t0 = Date.now();
    const results = await processInBatches(urls, 5); // Limite de 5 requests concorrentes
    const t1 = Date.now();

    // Salva o relatório consolidado na pasta de estoques/saidas
    const dateStr = new Date().toISOString().split('T')[0];
    const outDir = path.join(__dirname, '..', 'estoque', 'saidas');
    if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir, { recursive: true });
    }
    
    const outFile = path.join(outDir, `${dateStr}-extracao-nfce.json`);
    fs.writeFileSync(outFile, JSON.stringify(results, null, 2), 'utf-8');
    
    const successes = results.filter(r => r.status === 'success').length;
    const tempoMg = ((t1 - t0) / 1000).toFixed(2);
    
    console.log(`\n✅ Extração Concluída em ${tempoMg}s`);
    console.log(`- Taxa de Sucesso: ${successes} / ${urls.length}`);
    console.log(`- Arquivo Exportado: ${outFile}\n`);
})();
