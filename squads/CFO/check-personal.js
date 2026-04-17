const f=require('./nfce_results.json');
const itemsToLookFor = ['IOG SERRAMAR', 'MINI BOLO', 'PAO MINEIRO', 'LEITE LETTI INT A2', 'PRES SEARA', 'QJO MUSSAREL', 'CR LEITE NESTLE', 'CAFE 3 COR', 'DA TERRINHA/FARINHA', 'AGUA MINERAL C GAS'];

f.filter(x=>x.status==='success').forEach((n, idx) => {
    const hasPersonal = n.data.items.filter(i => itemsToLookFor.some(k => i.nome.includes(k)));
    if (hasPersonal.length > 0) {
        console.log(`\nNota ${idx+1} - Fornecedor: ${n.data.emissor.nome.trim()} - Emitida em: ${n.data.emissor.data_emissao || ''}`);
        console.log(`URL: ${n.url}`);
        console.log("Itens Misturados:");
        hasPersonal.forEach(p => console.log(`  - ${p.nome.split('\\n')[0].trim()}`));
    }
});
