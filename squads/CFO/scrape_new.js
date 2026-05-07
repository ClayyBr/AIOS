const scraper = require('./scripts/nfce-scraper.js');
const fs = require('fs');

const urls = [
    "https://www.nfce.fazenda.sp.gov.br/NFCeConsultaPublica/Paginas/ConsultaQRCode.aspx?p=35260465897910001802650360000289781791453117%7C2%7C1%7C1%7CDDB564F4007C651AB9956F368D6DFA6DF602264B",
    "https://www.nfce.fazenda.sp.gov.br/qrcode?p=35260501157555001771652050000341361984826020%7C2%7C1%7C1%7CF54EB6569532147DD621A5423B1EC406CA0B91EC",
    "https://www.nfce.fazenda.sp.gov.br/qrcode?p=35260520826969000123650010000030761132597551%7C3%7C1"
];

async function run() {
    let results = [];
    if (fs.existsSync('nfce_results.json')) {
        results = JSON.parse(fs.readFileSync('nfce_results.json', 'utf8'));
    }

    for (let i = 0; i < urls.length; i++) {
        console.log(`Processing ${i + 1}/${urls.length}...`);
        try {
            const data = await scraper.scrapeNfce(urls[i]);
            results.push({ url: urls[i], status: 'success', data });
        } catch (err) {
            console.error(`Failed ${i + 1}: ${err.message}`);
            results.push({ url: urls[i], status: 'error', error: err.message });
        }
    }
    fs.writeFileSync('nfce_results.json', JSON.stringify(results, null, 2));
    console.log("Done. Results saved to nfce_results.json");
}

run();
