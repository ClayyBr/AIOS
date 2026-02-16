const { execute } = require('./ytdlp-wrapper');

(async () => {
    try {
        console.log('Iniciando download solicitado pelo usuário...');
        const result = await execute({
            url: 'http://cohort.lendario.ai/aula',
            outputDir: './downloads'
        });
        console.log(result.message);
        console.log('Arquivo salvo em:', result.directory);
    } catch (error) {
        console.error('Falha no download:', error.message);
        process.exit(1);
    }
})();
