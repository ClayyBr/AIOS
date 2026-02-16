const https = require('https');
const { program } = require('commander');

program
    .option('-k, --key <key>', 'Gemini API Key')
    .parse(process.argv);

const options = program.opts();
let key = options.key;

if (!key) {
    console.error('Por favor forneça a chave: node diagnose-gemini.js --key "SUA_KEY"');
    process.exit(1);
}

// Remove quotes just in case
key = key.replace(/^"|"$/g, '').trim();

const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;

console.log(`\n🔍 Diagnosticando API Key...`);
console.log(`Connecting to: https://generativelanguage.googleapis.com/v1beta/models`);

https.get(url, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        console.log(`\nStatus Code: ${res.statusCode}`);
        try {
            const json = JSON.parse(data);
            if (json.error) {
                console.error('❌ ERRO DA API:');
                console.error(JSON.stringify(json.error, null, 2));

                if (json.error.message.includes('API key not valid')) {
                    console.log('\n--> SUA CHAVE É INVÁLIDA.');
                }
                if (json.error.message.includes('Generative Language API has not been used')) {
                    console.log('\n--> A API NÃO ESTÁ ATIVADA NO SEU PROJETO GOOGLE CLOUD.');
                    console.log('    Acesse o link console.developers.google.com exibido no erro acima e ative a API.');
                }
            } else if (json.models) {
                console.log('✅ SUCESSO! Modelos disponíveis para sua conta:');
                json.models.forEach(m => {
                    console.log(`   - ${m.name.replace('models/', '')} (${m.supportedGenerationMethods.join(', ')})`);
                });
            } else {
                console.log('Resposta inesperada:', data);
            }
        } catch (e) {
            console.error('Erro ao parsear resposta:', e);
            console.log('Raw data:', data);
        }
    });

}).on('error', (err) => {
    console.error('Erro de conexão:', err.message);
});
