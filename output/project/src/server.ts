import express from 'express';
import helmetMiddleware from './middlewares/helmet';
import rateLimiterMiddleware from './middlewares/rateLimiter';
import { connectDB } from './utils/db';
import { AppError, errorHandlerMiddleware } from './middlewares/errorHandler';
import { router } from './routes';
import { pipe } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/lib/TaskEither';
import { config } from './config';

// Cria a aplicação Express
const app = express();

// Middlewares essenciais
app.use(express.json()); // Body parser para JSON
app.use(helmetMiddleware); // Segurança HTTP com Helmet
app.use(rateLimiterMiddleware); // Rate limiting para evitar abuso de API

// Define as rotas da aplicação
app.use('/api', router);

// Middleware de tratamento de erros global
app.use(errorHandlerMiddleware);

// Função para iniciar o servidor
const startServer = (): TE.TaskEither<AppError, void> =>
  pipe(
    TE.tryCatch(
      () => connectDB(config.mongoUri),
      (reason) =>
        new AppError(
          'DatabaseConnectionError',
          `Failed to connect to MongoDB: ${String(reason)}`,
          500
        )
    ),
    TE.chainW(() =>
      TE.tryCatch(
        () =>
          new Promise<void>((resolve, reject) => {
            app
              .listen(config.port, () => {
                console.log(`🚀 Server running on port ${config.port}`);
                resolve();
              })
              .on('error', (err) => {
                reject(err);
              });
          }),
        (reason) =>
          new AppError('ServerError', `Failed to start HTTP server: ${String(reason)}`, 500)
      )
    )
  );

// Exporta o app e a função de início do servidor
export { app, startServer };
