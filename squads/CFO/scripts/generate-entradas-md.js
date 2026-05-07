const fs = require('fs');
const path = require('path');

const notas = JSON.parse(fs.readFileSync('notas.json', 'utf-8'));
const entradasDir = path.join(__dirname, '../estoque/entradas');

function cleanNome(nome) {
    return nome.split('\n')[0].trim();
}

function getFornecedorSlug(nome) {
    if (nome.includes('TENDA')) return 'tenda';
    if (nome.includes('TAUSTE')) return 'tauste';
    if (nome.includes('CASA DE CARNES')) return 'casa-de-carnes';
    return 'fornecedor';
}

function formatDate(dateStr) {
    // 25/04/2026 09:29:01 -> 2026-04-25
    const parts = dateStr.split(' ')[0].split('/');
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
}

notas.forEach((nota, index) => {
    const fornecedorStr = nota.data.emissor.nome;
    const slug = getFornecedorSlug(fornecedorStr);
    const dateFormatted = formatDate(nota.data.emissor.data_emissao);
    
    const fileName = `${dateFormatted}-${slug}-${index}.md`;
    const filePath = path.join(entradasDir, fileName);
    
    let mdContent = `# Entrada de Mercadoria - ${fornecedorStr} (${nota.data.emissor.data_emissao.split(' ')[0]})\n\n`;
    mdContent += `**Fornecedor:** ${fornecedorStr}\n`;
    mdContent += `**CNPJ:** ${nota.data.emissor.cnpj}\n`;
    mdContent += `**Data:** ${nota.data.emissor.data_emissao}\n`;
    mdContent += `**Valor Total:** R$ ${nota.data.totais.valor_total.toFixed(2).replace('.', ',')}\n`;
    mdContent += `**NFC-e:** [Consulta QRCode](${nota.url})\n\n`;
    
    mdContent += `## Itens Comprados\n\n`;
    mdContent += `| Item | Qtd Original | Un | Preço Unit. | Valor Total |\n`;
    mdContent += `| :--- | :--- | :--- | :--- | :--- |\n`;
    
    nota.data.items.forEach(item => {
        const itemName = cleanNome(item.nome);
        const precoUnit = (item.valor_total / item.quantidade).toFixed(2).replace('.', ',');
        const valorTotal = item.valor_total.toFixed(2).replace('.', ',');
        const qtd = item.quantidade.toFixed(3).replace('.', ',');
        mdContent += `| ${itemName} | ${qtd} | ${item.unidade} | R$ ${precoUnit} | R$ ${valorTotal} |\n`;
    });
    
    mdContent += `\n## Observações\n- Registrado via automação do agente Gerente Geral.\n`;
    
    fs.writeFileSync(filePath, mdContent);
    console.log(`Created ${filePath}`);
});
