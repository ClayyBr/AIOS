const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

/**
 * Tentativa via Axios/Cheerio (No-Browser)
 * Muito mais rápido, mas pode ser bloqueado por Cloudflare ou Captcha
 */
async function parseWithAxios(url) {
    const { data } = await axios.get(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
            'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7'
        },
        timeout: 10000
    });
    
    if (data.includes('g-recaptcha') || data.includes('<title>Just a moment...</title>')) {
        throw new Error('Blocked by anti-bot');
    }
    
    return parseHtml(data);
}

/**
 * Tentativa via Puppeteer Otimizado
 * Bloqueia recursos visuais para carregar mais rápido
 */
async function parseWithPuppeteer(url) {
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    try {
        const page = await browser.newPage();
        await page.setRequestInterception(true);
        page.on('request', request => {
            const resourceType = request.resourceType();
            if (['image', 'stylesheet', 'font', 'media'].includes(resourceType)) {
                request.abort();
            } else {
                request.continue();
            }
        });
        
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
        const html = await page.content();
        
        return parseHtml(html);
    } finally {
        await browser.close();
    }
}

/**
 * Lógica do Parser unificada (Cheerio API jQuery)
 */
function parseHtml(html) {
    const $ = cheerio.load(html);
    const data = { emissor: {}, items: [], totais: {} };

    // Capturar Emissor e CNPJ
    const emissorNome = $('#u20').text().trim() || $('.txtTopo').text().trim();
    if (emissorNome) data.emissor.nome = emissorNome;

    const cnpjText = $('.text:contains("CNPJ")').text();
    if (cnpjText) data.emissor.cnpj = cnpjText.replace(/[^0-9]/g, '');

    // Capturar Data de Emissão
    $('ul > li').each((i, el) => {
        const text = $(el).text();
        if (text.includes('Emissão:')) {
            const regex = /Emissão:\s*(.*?\d{2}:\d{2}:\d{2})/;
            const match = text.match(regex);
            if (match) data.emissor.data_emissao = match[1].trim();
        }
    });

    // Capturar Valor Total
    const totalText = $('.txtMax').text().replace('R$', '').trim();
    if (totalText) {
        data.totais.valor_total = parseFloat(totalText.replace(',', '.'));
    }

    // Forma de Pagamento
    $('label').each((i, el) => {
        const text = $(el).text();
        if (text.includes('Forma de pagamento') || text.includes('Valor pago')) {
            const tx = $(el).parent().find('.tx').text().trim();
            if(tx) data.totais.forma_pagamento = tx;
        }
    });

    // Capturar Itens
    $('table#tabResult tr').each((i, el) => {
        const nome = $(el).find('.txtTit').text().trim();
        if (!nome) return;
        
        const qStr = $(el).find('.Rqtd').text().replace(/[^\d,]/g, '').replace(',','.') || "1";
        const unStr = $(el).find('.RUN').text().replace('UN:', '').trim() || "UN";
        const vlUStr = $(el).find('.RvlUnit').text().replace(/[^\d,.]/g, '').replace(',','.') || "0";
        const vlTStr = $(el).find('.valor').text().replace(/[^\d,]/g, '').replace(',','.') || "0";

        data.items.push({
            nome,
            quantidade: parseFloat(qStr),
            unidade: unStr,
            valor_unitario: parseFloat(vlUStr),
            valor_total: parseFloat(vlTStr)
        });
    });

    return data;
}

async function scrapeNfce(url) {
    try {
        // Tenta Axios primeiro (MUITO mais rápido)
        return await parseWithAxios(url);
    } catch (e) {
        // Se a SEFAZ barrar ou der timeout, fazemos fallback pro Puppeteer isolado otimizado
        return await parseWithPuppeteer(url);
    }
}

module.exports = { scrapeNfce, parseHtml, parseWithPuppeteer, parseWithAxios };

// Se chamado por CLI via `node nfce-scraper.js <url>`
if (require.main === module) {
    const url = process.argv[2];
    if (!url) {
        console.error(JSON.stringify({ error: "URL da NFC-e não fornecida" }));
        process.exit(1);
    }
    
    scrapeNfce(url).then(result => {
        console.log(JSON.stringify(result, null, 2));
    }).catch(err => {
        console.error(JSON.stringify({ error: err.message }));
        process.exit(1);
    });
}
