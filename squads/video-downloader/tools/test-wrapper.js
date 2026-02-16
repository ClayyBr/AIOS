const { execute } = require('./ytdlp-wrapper');

(async () => {
    try {
        console.log('Testing video download...');
        // URL de teste segura (ex: vídeo curto ou domínio público)
        // Usando um vídeo de exemplo do youtube (Rick Astley - Never Gonna Give You Up é um clássico para testes de URL, mas grande)
        // Vamos usar um vídeo curto de teste se possível, ou apenas verificar se o comando é montado corretamente.
        // Como o wrapper executa de fato, vamos tentar capturar o erro de 'yt-dlp not found' que é o esperado se não estiver instalado.

        await execute({ url: 'https://www.youtube.com/watch?v=jNQXAC9IVRw' }); // Me at the zoo
        console.log('Test executed successfully (unexpected if yt-dlp is missing)');
    } catch (error) {
        console.log('Test finished with error (expected):');
        console.error(error.message);
    }
})();
