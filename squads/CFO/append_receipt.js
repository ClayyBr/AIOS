const fs = require('fs');

const receipt = {
  url: "photo_receipt_ponto_embalagens_0205",
  status: "success",
  data: {
    emissor: {
      nome: "PONTO DAS EMBALAGENS",
      cnpj: "35806275000100",
      data_emissao: "02/05/2026 08:43:21"
    },
    items: [
      { nome: "SALADINHA D645 C10 UNIDADES - TAMPA SEP", quantidade: 1, unidade: "UN", valor_unitario: 3.40, valor_total: 3.40 },
      { nome: "GARFO/ FACA REFEICAO - 50 UNID PEROLA", quantidade: 2, unidade: "UN", valor_unitario: 10.00, valor_total: 20.00 },
      { nome: "MARMITEX FRACIONADA P - 10UN", quantidade: 1, unidade: "UN", valor_unitario: 5.50, valor_total: 5.50 },
      { nome: "FITA ADESIVA 18X40 - SULAMERICANA", quantidade: 1, unidade: "UN", valor_unitario: 3.40, valor_total: 3.40 }
    ],
    totais: {
      valor_total: 32.30,
      forma_pagamento: "Pagamento Instantâneo (PIX)"
    }
  }
};

const results = JSON.parse(fs.readFileSync('nfce_results.json', 'utf8'));
results.push(receipt);
fs.writeFileSync('nfce_results.json', JSON.stringify(results, null, 2));
console.log("Receipt appended successfully.");
