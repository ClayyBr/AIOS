const { scrapeNfce } = require('./nfce-scraper');
const fs = require('fs');

const urls = [
    "https://www.nfce.fazenda.sp.gov.br/qrcode?p=35260401157555001771651090000961621685410741|2|1|1|3A6E2305971B25B252854C598183C065ACCA4BDB",
    "https://www.nfce.fazenda.sp.gov.br/NFCeConsultaPublica/Paginas/ConsultaQRCode.aspx?p=35260465897910001802650460000369201246007317|2|1|1|FAEBCAE8A185166B25F803E7269D2350E971703D",
    "https://www.nfce.fazenda.sp.gov.br/qrcode?p=35260401157555001771652040000208261338792869|2|1|1|7E7D070934D64E0A33496EFFB5B2FFCCBED1B5E9",
    "https://www.nfce.fazenda.sp.gov.br/qrcode?p=35260420826969000123650010000027371873122951|3|1",
    "https://www.nfce.fazenda.sp.gov.br/NFCeConsultaPublica/Paginas/ConsultaQRCode.aspx?p=35260465897910001802650150000285731423203100|2|1|1|B4C522F1E9E73299E016B7F4D8E69E169EE23599",
    "https://www.nfce.fazenda.sp.gov.br/NFCeConsultaPublica/Paginas/ConsultaQRCode.aspx?p=35260465897910001802650450000396761482587140|2|1|1|FCC77C22BABFA07E31487E449E204E8717F0D6B4"
];

async function run() {
    const results = [];
    for (const url of urls) {
        try {
            console.log("Scraping:", url);
            const data = await scrapeNfce(url);
            results.push({ url, data });
        } catch (e) {
            console.error("Error scraping", url, e);
        }
    }
    fs.writeFileSync('notas.json', JSON.stringify(results, null, 2));
    console.log("Done. Wrote to notas.json");
}

run();
