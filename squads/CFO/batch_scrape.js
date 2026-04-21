const scraper = require('./scripts/nfce-scraper.js');
const fs = require('fs');

const urls = [
    "https://www.nfce.fazenda.sp.gov.br/qrcode?p=35260420826969000123650010000026851499922704%7C3%7C1",
    "https://www.nfce.fazenda.sp.gov.br/NFCeConsultaPublica/Paginas/ConsultaQRCode.aspx?p=35260465897910001802650450000398289310057958%7C2%7C1%7C17%7C21.81%7C684836617447485571796c30543058526e74773154384a6f6657303d%7C1%7C30C3A6B7B7F64A1A9687D4F1C69D374FB36DCCFE",
    "https://www.nfce.fazenda.sp.gov.br/qrcode?p=35260420826969000123650010000027001441097407%7C3%7C1",
    "https://www.nfce.fazenda.sp.gov.br/qrcode?p=35260410938144000147651130000159851447510216%7C3%7C1",
    "https://www.nfce.fazenda.sp.gov.br/qrcode?p=35260410938144000147651070000230691504089415%7C3%7C1",
    "https://www.nfce.fazenda.sp.gov.br/qrcode?p=35260401157555001771652060000279121824297350%7C2%7C1%7C1%7C9F0FA918E4006825A9FEE12E562FEAC4A2531749"
];

async function run() {
    const results = [];
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
