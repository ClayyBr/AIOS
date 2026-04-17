const fs = require('fs');
const path = require('path');
const r = require('./nfce_results.json');
const yaml = require('js-yaml');

const posPath = path.join(__dirname, 'estoque/inventario/posicao-atual.yaml');
let yamlStr = fs.readFileSync(posPath, 'utf8');

// 1. Remove Nota 7 line and update inventory value
yamlStr = yamlStr.replace('    - "2026-04-13 Tauste (R$ 87,08)"\n', '');
// The stock value previously added was for ALL items including nota 7. Oh wait, my script `update-inventory.js` only added quantities and values for MAPPED items.
// Did ANY of Nota 7's items get mapped? 
// Let's check map-items logic for Nota 7.
// Nota 7 items: 'LEITE LETTI INT A2', 'IOG SERRAMAR CEN MEL', 'PAO MINEIRO', 'MINI BOLO PANCO BAUN', 'PRES SEARA S/C GRA', 'QJO MUSSAREL GRANEL', 'CAFE 3 COR TRAD VAC'. None of these were mapped by my naive logic!
// Therefore, the 87.08 wasn't actually fully added to the "itens" array value. But `valor_total_estoque` was manually increased by me on line 22!
// I need to fix `valor_total_estoque: 2464.47` -> 2464.47 - 87.08 = 2377.39
yamlStr = yamlStr.replace(/valor_total_estoque: 2464\.47/, 'valor_total_estoque: 2377.39');

// And remove Nota 7 file
const mdPath = path.join(__dirname, 'estoque/entradas/2026-04-13-tauste-supermercados-ltda-7.md');
if (fs.existsSync(mdPath)) {
    fs.unlinkSync(mdPath);
    console.log("Deleted Nota 7: " + mdPath);
}

// 2. Perform second-pass mapping for the remaining unmapped legitimate items
const secondPassMap = {
    'ACEM KILO': 'acem-sem-osso',
    'DA TERRINHA/FARINHA MAND.GROSSA 1kg': 'farinha-mandioca-kisabor',
    'REFRI ANTARCTICA GUARANA': 'refrigerante-antarctica-guarana', // Though unit might be different (CX vs UN)
    'REF ANTARCTICA 350ML': 'refrigerante-antarctica-guarana',
    'ARROZ FANTASTICO G.NOBRES 2kg.TP1': 'arroz-branco',
    'BATATA LUDI MIX 2KG': 'batata-lavada',
    // New items we'll just ignore for now, or we could add them dynamically. To keep it safe, we'll map them explicitly or leave them.
};

const allScrapedItems = r.filter(x=>x.status==='success').flatMap(x=>x.data.items).map(i => ({
    ...i,
    clean_nome: i.nome.split(/\n/)[0].trim().replace(/\s+/g, ' ')
}));

// Group by clean_nome
const grouped = {};
for (const item of allScrapedItems) {
    if (!grouped[item.clean_nome]) {
        grouped[item.clean_nome] = { quantidade: 0, valor_total: 0 };
    }
    grouped[item.clean_nome].quantidade += item.quantidade;
    grouped[item.clean_nome].valor_total += item.valor_total;
}

const updatesById = {};
for (const name in grouped) {
    if (secondPassMap[name]) {
        const id = secondPassMap[name];
        if (!updatesById[id]) updatesById[id] = { q: 0, v: 0 };
        updatesById[id].q += grouped[name].quantidade;
        updatesById[id].v += grouped[name].valor_total;
    }
}

for (const id in updatesById) {
    const upd = updatesById[id];
    
    // Some logic requires converting quantity depending on unit (e.g. 2kg bag = 2.0 kg quantity, but NFCe says 1 UN).
    // ARROZ FANTASTICO 2kg.TP1 -> qty 1 means 2kg.
    if (id === 'arroz-branco') upd.q *= 2; 
    if (id === 'batata-lavada') upd.q *= 2;
    if (id === 'farinha-mandioca-kisabor') upd.q *= 1; // 1kg
    
    const idRegex = new RegExp(`- id: "${id}"[\\s\\S]*?(?=\\n  - id|$)`);
    const match = yamlStr.match(idRegex);
    if (match) {
        let block = match[0];
        
        const qMatch = block.match(/quantidade:\s*([\d.]+)/);
        const vMatch = block.match(/valor_em_estoque:\s*([\d.]+)/);
        const currQ = qMatch ? parseFloat(qMatch[1]) : 0;
        const currV = vMatch ? parseFloat(vMatch[1]) : 0;
        
        const newQ = currQ + upd.q;
        const newV = currV + upd.v;
        const newCmp = newV / (newQ === 0 ? 1 : newQ);
        
        block = block.replace(/quantidade:\s*[\d.]+/, `quantidade: ${newQ.toFixed(3)}`);
        if (block.includes('valor_em_estoque:')) {
            block = block.replace(/valor_em_estoque:\s*[\d.]+/, `valor_em_estoque: ${newV.toFixed(2)}`);
        } else {
            block = block.replace(/(quantidade:.*)/, `$1\n    valor_em_estoque: ${newV.toFixed(2)}`);
        }
        if (block.includes('custo_medio_ponderado:')) {
            block = block.replace(/custo_medio_ponderado:\s*[\d.]+/, `custo_medio_ponderado: ${newCmp.toFixed(2)}`);
        } else {
             block = block.replace(/(quantidade:.*)/, `$1\n    custo_medio_ponderado: ${newCmp.toFixed(2)}`);
        }
        
        const newPreco = upd.v / upd.q;
        if (block.includes('ultimo_preco:')) {
             block = block.replace(/ultimo_preco:\s*[\d.]+/, `ultimo_preco: ${newPreco.toFixed(2)}`);
        } else {
             block += `\n    ultimo_preco: ${newPreco.toFixed(2)}`;
        }
        
        yamlStr = yamlStr.replace(match[0], block);
        console.log(`Updated ${id} with +${upd.q} units`);
    }
}

fs.writeFileSync(posPath, yamlStr);
console.log("posicao-atual.yaml updated.");
