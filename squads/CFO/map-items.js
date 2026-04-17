const fs = require('fs');
const path = require('path');
const r = require('./nfce_results.json');
const yaml = require('js-yaml');

const posPath = path.join(__dirname, 'estoque/inventario/posicao-atual.yaml');
let posicao = yaml.load(fs.readFileSync(posPath, 'utf8'));
const knownItems = posicao.itens || [];

const items = r.filter(x=>x.status==='success').flatMap(x=>x.data.items);

function cleanName(n) {
    return n.split(/\n/)[0].trim().replace(/\s+/g, ' ');
}

const cleanedItems = items.map(i => ({
    ...i,
    clean_nome: cleanName(i.nome)
}));

// Basic heuristic mapper
function findMatch(name) {
    const n = name.toLowerCase();
    for (const item of knownItems) {
        const kn = item.nome.toLowerCase();
        // exact match
        if (kn === n) return item.id;
    }
    for (const item of knownItems) {
        const kn = item.nome.toLowerCase();
        // partial match
        if (n.includes('frango') && n.includes('passarinho') && kn.includes('passarinho')) return item.id;
        if (n.includes('leite') && n.includes('lider') && kn.includes('lider')) return item.id;
        if (n.includes('acem') && kn.includes('acem') && !kn.includes('osso')) return item.id;
        if (n.includes('toucinho') && kn.includes('toucinho')) return item.id;
        if (n.includes('bacon') && kn.includes('bacon')) return item.id;
        if (n.includes('coca cola') && !n.includes('zero') && kn.includes('coca-cola')) return item.id;
        if (n.includes('feijao carioca') && kn.includes('feijão carioca')) return item.id;
        if (n.includes('feijao preto') && kn.includes('feijão preto')) return item.id;
        if (n.includes('limao') && kn.includes('limão')) return item.id;
        if (n.includes('cebola') && kn.includes('cebola') && !kn.includes('cebolinha')) return item.id;
        if (n.includes('tomate salada') && kn.includes('tomate salada')) return item.id;
        if (n.includes('alho') && kn.includes('alho') && !kn.includes('triturado')) return 'alho-roxo';
        if (n.includes('pernil') && n.includes('s/osso') && kn.includes('pernil') && kn.includes('osso')) return item.id;
        if (n.includes('bisteca') && kn.includes('bisteca')) return item.id;
        if (n.includes('file fgo') && kn.includes('frango cg/peito')) return 'frango-peito';
        if (n.includes('p peito s/osso') && kn.includes('frango cg/peito')) return 'frango-peito';
        if (n.includes('agua mineral s gas') && kn.includes('lindoya')) return item.id; // assume lindoya or lobato
        if (n.includes('agua sanit') && kn.includes('água sanitária')) return item.id;
        if (n.includes('ketch') && kn.includes('ketchup')) return item.id;
        if (n.includes('peito adoro') && kn.includes('frango resf/peito')) return item.id; // frango peito
        if (n.includes('coxao mole') && kn.includes('coxão mole')) return item.id;
        if (n.includes('coxao') && kn.includes('coxão duro')) return 'coxao-duro'; // fallback for bife coxao mole if not exists
    }
    return null;
}

const mapResult = {};
const unmapped = [];

cleanedItems.forEach(i => {
    if (!mapResult[i.clean_nome]) {
        const m = findMatch(i.clean_nome);
        if (m) {
            mapResult[i.clean_nome] = m;
        } else {
            unmapped.push(i.clean_nome);
        }
    }
});

fs.writeFileSync('auto_map.json', JSON.stringify({mapped: mapResult, unmapped: [...new Set(unmapped)]}, null, 2));
console.log("Mapped items:", Object.keys(mapResult).length);
console.log("Unmapped items:", [...new Set(unmapped)].length);
