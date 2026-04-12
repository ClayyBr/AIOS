const puppeteer = require('puppeteer');

(async () => {
    const url = process.argv[2];
    if (!url) {
        console.error(JSON.stringify({ error: "URL da NFC-e não fornecida" }));
        process.exit(1);
    }

    try {
        const browser = await puppeteer.launch({
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();
        
        await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
        
        const result = await page.evaluate(() => {
            const data = { emissor: {}, items: [], totais: {} };

            // Capturar Emissor e CNPJ
            const emissor = document.querySelector('#u20') || document.querySelector('.txtTopo');
            if (emissor) data.emissor.nome = emissor.textContent.trim();
            
            const cnpjDiv = document.querySelector('.text');
            if (cnpjDiv && cnpjDiv.textContent.includes('CNPJ')) {
                data.emissor.cnpj = cnpjDiv.textContent.replace(/[^0-9]/g, '');
            }

            // Capturar Data de Emissão
            const listaInfos = document.querySelectorAll('ul > li');
            listaInfos.forEach(li => {
                if (li.textContent.includes('Emissão:')) {
                    const texto = li.textContent;
                    const regex = /Emissão:\s*(.*?\d{2}:\d{2}:\d{2})/;
                    const match = texto.match(regex);
                    if (match) data.emissor.data_emissao = match[1].trim();
                }
            });

            // Capturar Valor Total
            const total = document.querySelector('.txtMax');
            if (total) {
                 const tVal = total.textContent.replace('R$', '').trim();
                 data.totais.valor_total = parseFloat(tVal.replace(',','.'));
            }

            // Forma de agamento
            const linhaPagamento = Array.from(document.querySelectorAll('label')).find(l => l.textContent.includes('Forma de pagamento') || l.textContent.includes('Valor pago'));
            if(linhaPagamento) {
                 const parent = linhaPagamento.parentElement;
                 if(parent) {
                      const tx = parent.querySelector('.tx');
                      if(tx) data.totais.forma_pagamento = tx.textContent.trim();
                 }
            }

            // Capturar Itens
            const itemRows = document.querySelectorAll('table#tabResult tr');
            itemRows.forEach(row => {
                const nameNode = row.querySelector('.txtTit');
                if (!nameNode) return;
                
                const nome = nameNode.textContent.trim();
                
                const qtdeNode = row.querySelector('.Rqtd');
                const unNode = row.querySelector('.RUN');
                const vlUnitNode = row.querySelector('.RvlUnit');
                const vlTotalNode = row.querySelector('.valor');
                
                let qStr = qtdeNode ? qtdeNode.textContent.replace(/[^\d,]/g, '').replace(',','.') : "1";
                let unStr = unNode ? unNode.textContent.replace('UN:', '').trim() : "UN";
                let vlUStr = vlUnitNode ? vlUnitNode.textContent.replace(/[^\d,.]/g, '').replace(',','.') : "0";
                let vlTStr = vlTotalNode ? vlTotalNode.textContent.replace(/[^\d,]/g, '').replace(',','.') : "0";

                data.items.push({
                    nome: nome,
                    quantidade: parseFloat(qStr),
                    unidade: unStr,
                    valor_unitario: parseFloat(vlUStr),
                    valor_total: parseFloat(vlTStr)
                });
            });

            return data;
        });

        console.log(JSON.stringify(result, null, 2));
        await browser.close();

    } catch (error) {
        console.error(JSON.stringify({ error: error.message }));
        process.exit(1);
    }
})();
