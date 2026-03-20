const fs = require('fs');
const path = require('path');

const csvDir = path.resolve(__dirname, '../../squads/CFO/relatorios/cotacoes');
const files = fs.readdirSync(csvDir).filter(f => f.startsWith('cotacao-2') && f.endsWith('.csv')).sort();
const latestCsv = files[files.length - 1];
const csvPath = path.join(csvDir, latestCsv);

console.log('Processando:', csvPath);

const csv = fs.readFileSync(csvPath, 'utf-8');
const lines = csv.split('\n');
const header = lines[0];
const dataLines = lines.slice(1).filter(l => l.trim());

function cleanName(raw) {
    let n = raw;

    // === Estratégia: cortar nome no limite peso/unidade ===
    // Nomes de produto terminam com "100g", "1kg", "500ml" etc.
    // Usamos a PRIMEIRA ocorrência de peso que aparece após pelo menos 10 chars
    // de nome (para pular pesos no início como "6kg Pacote...")
    const weightRegex = /(\d+\s*(?:kg|g|ml|l))/gi;
    let firstValidMatch = null;
    let m;
    while ((m = weightRegex.exec(n)) !== null) {
        // Só considerar se tem pelo menos 10 chars de nome antes
        if (m.index >= 10) {
            firstValidMatch = m;
            break; // Pegar o PRIMEIRO que está após o nome
        }
    }
    if (firstValidMatch && firstValidMatch.index !== undefined) {
        const endOfWeight = firstValidMatch.index + firstValidMatch[0].length;
        const after = n.substring(endOfWeight).trim();
        // Se tem algo depois e não começa com espaço + letra maiúscula (parte do nome)
        if (after && after.length > 2 && !/^\s+[A-ZÁÉÍÓÚÂÊÎÔÛÃÕÇ]/.test(after)) {
            n = n.substring(0, endOfWeight);
        }
    }

    // === Remoções de fallback ===
    n = n.replace(/Vendido por:\s*\w+/gi, '');
    n = n.replace(/No Cart[aã]o[\s\S]*/gi, '');
    n = n.replace(/a\s*partir de \d+[\s\S]*/gi, '');
    n = n.replace(/R?\$\s*\d{1,3}(?:\.\d{3})*,\d{2}[\s\S]*/g, '');
    n = n.replace(/Ver regras/gi, '');
    n = n.replace(/Adicionar[\s\S]*/gi, '');
    n = n.replace(/\+\s*\d+/g, '');
    n = n.replace(/Peso m[eé]dio[\s\S]*/gi, '');
    n = n.replace(/\bregras?\b/gi, '');
    n = n.replace(/\bcionar?\b/gi, '');
    n = n.replace(/\bonar\b/gi, '');
    n = n.replace(/\bdo \w+:\s*/gi, '');
    n = n.replace(/\/\s*(un|und|kg|g|ml|l|pct)\b/gi, '');
    n = n.replace(/\buna?\s*$/gi, '');
    n = n.replace(/\s+\d{1,2}\s*$/, '');
    n = n.replace(/[,;.\s]+$/, '');
    n = n.replace(/\s{2,}/g, ' ').trim();

    return n;
}

const cleanedLines = [];
const seen = new Set();

for (const line of dataLines) {
    const parts = line.split(';');
    if (parts.length < 7) continue;

    // Clean product name (2nd field, quoted)
    let productName = parts[1].replace(/^"|"$/g, '').replace(/""/g, '"');
    productName = cleanName(productName);

    if (!productName || productName.length < 5) continue;
    if (/^\d/.test(productName)) continue;

    // Dedup by clean name + market
    const key = productName.toLowerCase() + '|' + parts[4].toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);

    parts[1] = '"' + productName.replace(/"/g, '""') + '"';
    cleanedLines.push(parts.join(';'));
}

const BOM = '\uFEFF';
const output = BOM + header + '\n' + cleanedLines.join('\n') + '\n';
const outPath = path.join(csvDir, 'cotacao-final-polida.csv');
fs.writeFileSync(outPath, output, 'utf-8');

console.log('\n✅ Resultado:');
console.log('  Itens antes: ' + dataLines.length);
console.log('  Itens depois: ' + cleanedLines.length);
console.log('  Removidos: ' + (dataLines.length - cleanedLines.length));
console.log('  Arquivo: ' + outPath);

// Preview por ingrediente
const ingredientes = ['acém', 'frango sasami', 'linguiça toscana'];
for (const ing of ingredientes) {
    const itens = cleanedLines.filter(l => l.startsWith('"' + ing + '"'));
    console.log('\n🥩 "' + ing + '" — ' + itens.length + ' itens:');
    for (const item of itens.slice(0, 4)) {
        const p = item.split(';');
        const nome = p[1].replace(/^"|"$/g, '');
        const preco = p[2];
        const mercado = p[4];
        console.log('  ' + mercado.padEnd(22) + nome.substring(0, 55).padEnd(57) + 'R$ ' + preco);
    }
    if (itens.length > 4) console.log('  ... e mais ' + (itens.length - 4));
}
