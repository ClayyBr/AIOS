const fs = require('fs');
const path = require('path');
const results = require('./nfce_results.json');

const entradasDir = path.join(__dirname, 'estoque', 'entradas');
if (!fs.existsSync(entradasDir)) fs.mkdirSync(entradasDir, { recursive: true });

function formatName(name) {
    if (!name) return 'desconhecido';
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

results.forEach((r, i) => {
    if (r.status !== 'success') return;
    
    const d = r.data;
    const items = d.items || [];
    
    // extrair data e hora
    const dt = d.emissor.data_emissao || "14/04/2026 12:00:00"; 
    const dateParts = dt.split(' ')[0].split('/');
    let dtStr = "2026-04-14"; // fallback
    if (dateParts.length === 3) {
        dtStr = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
    }
    
    const nomeFornecedor = formatName(d.emissor.nome);
    const fileName = `${dtStr}-${nomeFornecedor}-${i+1}.md`; // added index to avoid overwrite on same day
    const filePath = path.join(entradasDir, fileName);
    
    const total = (d.totais.valor_total || 0).toFixed(2).replace('.', ',');
    
    let md = `# Registro de Entrada (Compra) — ${d.emissor.data_emissao || dtStr}\n\n`;
    md += `**Fornecedor:** ${d.emissor.nome || 'Desconhecido'}\n`;
    md += `**CNPJ:** ${d.emissor.cnpj || 'Desconhecido'}\n`;
    md += `**Data de Emissão:** ${d.emissor.data_emissao || dtStr}\n`;
    md += `**Valor Total:** R$ ${total}\n\n`;
    
    md += `## Itens Comprados\n\n`;
    md += `| Item NFC-e | Descrição no Sistema | Qtd | Un | Valor Unit. (R$) | Total (R$) |\n`;
    md += `|------------|----------------------|-----|----|------------------|------------|\n`;
    
    let sum = 0;
    items.forEach(item => {
        const quantidade = item.quantidade || 0;
        const valor_unitario = item.valor_unitario || 0;
        const valor_total = item.valor_total || 0;
        
        const q = quantidade.toFixed(3).replace('.', ',');
        const u = valor_unitario.toFixed(2).replace('.', ',');
        const t = valor_total.toFixed(2).replace('.', ',');
        md += `| ${item.nome} | PENDENTE: ${item.nome} | ${q} | ${item.unidade || 'UN'} | ${u} | ${t} |\n`;
        sum += valor_total;
    });
    
    md += `| **TOTAL** | | | | | **${sum.toFixed(2).replace('.', ',')}** |\n\n`;
    
    md += `## Impactos no Estoque\n\n`;
    md += `- **[PENDENTE]** Revisar descrições e impacto.\n`;
    md += `\n---\n*Processado via script em ${new Date().toLocaleDateString('pt-BR')}*\n`;

    fs.writeFileSync(filePath, md);
    console.log(`Created ${filePath}`);
});
