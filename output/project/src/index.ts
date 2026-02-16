import { startServer } from './server';
import { pipe } from 'fp-ts/lib/function';
import * as E from 'fp-ts/lib/Either';
import { AppError } from './middlewares/errorHandler';

// Inicia o servidor e trata erros de inicialização
pipe(
  startServer(),
  E.match(
    (error: AppError) => {
      console.error(`❌ Application failed to start: [${error.name}] ${error.message}`);
      process.exit(1); // Sai com código de erro
    },
    () => console.log('✅ Application started successfully.')
  )
);

// Tratamento de sinais de interrupção (Ctrl+C, etc.)
process.on('SIGINT', () => {
  console.log('🚨 SIGINT received. Shutting down gracefully...');
  // Aqui você pode adicionar lógica para fechar conexões de DB, etc.
  // closeDB().then(() => process.exit(0)); // Exemplo com closeDB, se necessário
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('🚨 SIGTERM received. Shutting down gracefully...');
  process.exit(0);
});

// Tratamento de exceções não capturadas
process.on('uncaughtException', (err) => {
  console.error('💥 Uncaught Exception:', err.message, err.stack);
  // Em produção, você pode querer registrar isso e tentar uma saída graciosa
  process.exit(1);
});

// Tratamento de rejeições de Promises não tratadas
process.on('unhandledRejection', (reason, promise) => {
  console.error('💥 Unhandled Rejection at:', promise, 'reason:', reason);
  // Em produção, você pode querer registrar isso e tentar uma saída graciosa
  process.exit(1);
});
