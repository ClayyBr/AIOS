const fs = require('fs');
const path = require('path');
const r = require('./nfce_results.json');
const mapData = require('./auto_map.json');
const yaml = require('js-yaml');

const posPath = path.join(__dirname, 'estoque/inventario/posicao-atual.yaml');
const yamlStr = fs.readFileSync(posPath, 'utf8');
const lines = yamlStr.split('\n');

const mappedItems = mapData.mapped; // { "FRANGO A PASSARINHO KILO": "frango-peito", ... }
const allScrapedItems = r.filter(x=>x.status==='success').flatMap(x=>x.data.items).map(i => ({
    ...i,
    clean_nome: i.nome.split(/\n/)[0].trim().replace(/\s+/g, ' ')
}));

// Group by clean_nome to see total added quantity and value
const grouped = {};
for (const item of allScrapedItems) {
    if (!grouped[item.clean_nome]) {
        grouped[item.clean_nome] = { nome: item.clean_nome, quantidade: 0, valor_total: 0 };
    }
    grouped[item.clean_nome].quantidade += item.quantidade;
    grouped[item.clean_nome].valor_total += item.valor_total;
}

// Map inventory IDs over grouped items
const updatesById = {};
for (const name in grouped) {
    const matchedId = mappedItems[name];
    if (matchedId) {
        if (!updatesById[matchedId]) updatesById[matchedId] = { q: 0, v: 0, newPreco: 0 };
        updatesById[matchedId].q += grouped[name].quantidade;
        updatesById[matchedId].v += grouped[name].valor_total;
        
        // just an approximation for unit price: total_val / total_q
        updatesById[matchedId].newPreco = grouped[name].valor_total / grouped[name].quantidade;
    }
}

// Now parse the YAML to update it (using a naive regex/line based approach is risky, let's use js-yaml and write it back).
// But js-yaml might lose comments. Since posicao-atual.yaml has comments, we can do surgical regex replacement in `yamlStr` or just use js-yaml.
// Looking at posicao-atual.yaml, it has a few `#` comments. Replacing them with js-yaml dump is acceptable as long as we keep the structure.
// Actually, surgical replacement is safer for preserving order and comments.

let updatedYamlStr = yamlStr;

for (const id in updatesById) {
    const upd = updatesById[id];
    
    // Find item block
    const idRegex = new RegExp(`- id: "${id}"[\\s\\S]*?(?=\\n  - id|$)`);
    const match = updatedYamlStr.match(idRegex);
    if (match) {
        let block = match[0];
        
        // Extract current q and v
        const qMatch = block.match(/quantidade:\s*([\d.]+)/);
        const vMatch = block.match(/valor_em_estoque:\s*([\d.]+)/);
        const cmpMatch = block.match(/custo_medio_ponderado:\s*([\d.]+)/);
        
        const currQ = qMatch ? parseFloat(qMatch[1]) : 0;
        const currV = vMatch ? parseFloat(vMatch[1]) : 0;
        const currCmp = cmpMatch ? parseFloat(cmpMatch[1]) : 0;
        
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
        
        if (block.includes('ultimo_preco:')) {
             block = block.replace(/ultimo_preco:\s*[\d.]+/, `ultimo_preco: ${upd.newPreco.toFixed(2)}`);
        } else {
             block += `\n    ultimo_preco: ${upd.newPreco.toFixed(2)}`;
        }
        
        updatedYamlStr = updatedYamlStr.replace(match[0], block);
    }
}

fs.writeFileSync(posPath, updatedYamlStr);
console.log("Updated elements: ", Object.keys(updatesById).length);
