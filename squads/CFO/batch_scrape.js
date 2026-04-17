const scraper = require('./scripts/nfce-scraper.js');
const fs = require('fs');

const urls = [
    "https://www.nfce.fazenda.sp.gov.br/qrcode?p=35260420826969000123650010000026651745414959%7C3%7C1",
    "https://www.nfce.fazenda.sp.gov.br/qrcode?p=35260420826969000123650010000026701097604365%7C3%7C1",
    "https://www.nfce.fazenda.sp.gov.br/qrcode?p=35260410938144000147651060000534491762592857%7C3%7C1",
    "https://www.nfce.fazenda.sp.gov.br/NFCeConsultaPublica/Paginas/ConsultaQRCode.aspx?p=35260465897910001802650380000239459391577964%7C2%7C1%7C15%7C19.95%7C737677584b7a5444436e5067364c72347a5850357a386b394d4c6f3d%7C1%7C0FAA1E1699731EAF4DABE1290B2E027F96B129E2",
    "https://www.nfce.fazenda.sp.gov.br/qrcode?p=35260401157555001771652080000294141287525340|2|1|1|F6FB9A807D4050752F2448ECA0802986FA80F6B8",
    "https://www.nfce.fazenda.sp.gov.br/qrcode?p=35260410938144000147651130000157931115834054|3|1",
    "https://www.nfce.fazenda.sp.gov.br/NFCeConsultaPublica/Paginas/ConsultaQRCode.aspx?p=35260465897910001802650440000388219558738060|2|1|13|87.08|53795137345a6d392b4b323533544241582f5274616f6b745655733d|1|BB74B5DDF3A97BDD8790A85A73A2BACE3DACA5E5",
    "https://www.nfce.fazenda.sp.gov.br/NFCeConsultaPublica/Paginas/ConsultaQRCode.aspx?p=35260465897910001802650320000226131139435265|2|1|1|A469B400005DDDB2E5BF79074F5FFD37E2BC0685",
    "https://www.nfce.fazenda.sp.gov.br/qrcode?p=35260476430438012692650190000303071019315267|2|1|1|3B4C5CF2F3586A34F1CC0924BE5412987663FC56"
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
