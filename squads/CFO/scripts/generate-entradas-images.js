const fs = require('fs');
const path = require('path');

const entradasDir = path.join(__dirname, '../estoque/entradas');

const receipts = [
  {
    fornecedor: "PONTO DAS EMBALAGENS",
    cnpj: "35.806.275/0001-00",
    data: "22/04/2026 09:13:49",
    total: 5.00,
    items: [
      { nome: "MARMITEX FRACIONADA M - 10UN", qtd: 1, un: "UN", unit: 5.00, total: 5.00 }
    ],
    slug: "ponto-embalagens-8"
  },
  {
    fornecedor: "CASA DE CARNES M.G.V. LTDA",
    cnpj: "20.826.969/0001-23",
    data: "24/04/2026 08:40:15",
    total: 19.74,
    items: [
      { nome: "FRANGO A PASSARINHO KILO", qtd: 1.520, un: "KG", unit: 12.99, total: 19.74 }
    ],
    slug: "casa-carnes-9"
  },
  {
    fornecedor: "PONTO DAS EMBALAGENS",
    cnpj: "35.806.275/0001-00",
    data: "24/04/2026 08:44:55",
    total: 13.50,
    items: [
      { nome: "FITA ADESIVA 18X40 - SULAMERICANA", qtd: 1, un: "UN", unit: 3.40, total: 3.40 },
      { nome: "MARMITEX FRACIONADA G - 10UN", qtd: 1, un: "UN", unit: 6.70, total: 6.70 },
      { nome: "SALADINHA D645 C10 UNIDADES - TAMPA SEP", qtd: 1, un: "UN", unit: 3.40, total: 3.40 }
    ],
    slug: "ponto-embalagens-10"
  },
  {
    fornecedor: "PONTO DAS EMBALAGENS",
    cnpj: "35.806.275/0001-00",
    data: "20/04/2026 09:10:51",
    total: 11.80,
    items: [
      { nome: "MARMITEX FRACIONADA M - 10UN", qtd: 1, un: "UN", unit: 5.00, total: 5.00 },
      { nome: "FITA ADESIVA 18X40 - SULAMERICANA", qtd: 1, un: "UN", unit: 3.40, total: 3.40 },
      { nome: "SALADINHA D645 C10 UNIDADES - TAMPA SEP", qtd: 1, un: "UN", unit: 3.40, total: 3.40 }
    ],
    slug: "ponto-embalagens-11"
  },
  {
    fornecedor: "PONTO DAS EMBALAGENS",
    cnpj: "35.806.275/0001-00",
    data: "25/04/2026 09:41:10",
    total: 12.80,
    items: [
      { nome: "MARMITEX FRACIONADA P - 10UN", qtd: 1, un: "UN", unit: 4.80, total: 4.80 },
      { nome: "MARMITEX FRACIONADA M - 10UN", qtd: 1, un: "UN", unit: 5.00, total: 5.00 },
      { nome: "GELADINHO GOURMET G 5X24 C/ 40 UNIDADES", qtd: 1, un: "UN", unit: 3.00, total: 3.00 }
    ],
    slug: "ponto-embalagens-12"
  },
  {
    fornecedor: "CASA DE CARNES M.G.V. LTDA",
    cnpj: "20.826.969/0001-23",
    data: "21/04/2026 08:49:36",
    total: 30.04,
    items: [
      { nome: "TOUCINHO (TORRESMO) KILO", qtd: 1.582, un: "KG", unit: 18.99, total: 30.04 }
    ],
    slug: "casa-carnes-13"
  },
  {
    fornecedor: "PONTO DAS EMBALAGENS",
    cnpj: "35.806.275/0001-00",
    data: "22/04/2026 09:11:55",
    total: 11.60,
    items: [
      { nome: "SALADINHA D645 C10 UNIDADES - TAMPA SEP", qtd: 2, un: "UN", unit: 3.40, total: 6.80 },
      { nome: "MARMITEX FRACIONADA P - 10UN", qtd: 1, un: "UN", unit: 4.80, total: 4.80 }
    ],
    slug: "ponto-embalagens-14"
  },
  {
    fornecedor: "CASA DE CARNES M.G.V. LTDA",
    cnpj: "20.826.969/0001-23",
    data: "23/04/2026 08:46:18",
    total: 59.92,
    items: [
      { nome: "ACEM KILO", qtd: 0.552, un: "KG", unit: 38.99, total: 21.52 },
      { nome: "BISTECA SUINA KILO", qtd: 1.076, un: "KG", unit: 16.99, total: 18.28 },
      { nome: "CALABRESA KILO", qtd: 0.516, un: "KG", unit: 38.99, total: 20.12 }
    ],
    slug: "casa-carnes-15"
  },
  {
    fornecedor: "PONTO DAS EMBALAGENS",
    cnpj: "35.806.275/0001-00",
    data: "26/04/2026 11:27:20",
    total: 14.00,
    items: [
      { nome: "GELADINHO TRADICIONAL G 06X24 UNIDADE C/ 100", qtd: 1, un: "UN", unit: 3.00, total: 3.00 },
      { nome: "GELADINHO GOURMET G 5X24 C/ 40 UNIDADES", qtd: 1, un: "UN", unit: 3.00, total: 3.00 },
      { nome: "SALADINHA D645 C10 UNIDADES - TAMPA SEP", qtd: 1, un: "UN", unit: 3.40, total: 3.40 },
      { nome: "MARMITEX FRACIONADA P - 10UN", qtd: 1, un: "UN", unit: 4.80, total: 4.80 }
    ],
    slug: "ponto-embalagens-16",
    obs: "Valor total considerou um desconto de R$ 0,20 na nota."
  }
];

receipts.forEach(r => {
  const dateFormatted = r.data.split(' ')[0].split('/').reverse().join('-');
  const fileName = `${dateFormatted}-${r.slug}.md`;
  const filePath = path.join(entradasDir, fileName);

  let md = `# Entrada de Mercadoria - ${r.fornecedor} (${r.data.split(' ')[0]})\n\n`;
  md += `**Fornecedor:** ${r.fornecedor}\n`;
  md += `**CNPJ:** ${r.cnpj}\n`;
  md += `**Data:** ${r.data}\n`;
  md += `**Valor Total:** R$ ${r.total.toFixed(2).replace('.', ',')}\n`;
  md += `**NFC-e:** Lançamento via extração de imagem (Recibo sem valor fiscal / Cupom de Venda)\n\n`;
  
  md += `## Itens Comprados\n\n`;
  md += `| Item | Qtd Original | Un | Preço Unit. | Valor Total |\n`;
  md += `| :--- | :--- | :--- | :--- | :--- |\n`;
  
  r.items.forEach(item => {
    md += `| ${item.nome} | ${item.qtd.toFixed(3).replace('.', ',')} | ${item.un} | R$ ${item.unit.toFixed(2).replace('.', ',')} | R$ ${item.total.toFixed(2).replace('.', ',')} |\n`;
  });
  
  md += `\n## Observações\n- Registrado via leitura de imagem pelo agente Gerente Geral.\n`;
  if (r.obs) {
      md += `- ${r.obs}\n`;
  }
  
  fs.writeFileSync(filePath, md);
  console.log(`Created ${filePath}`);
});
