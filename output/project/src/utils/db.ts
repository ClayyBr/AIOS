import { MongoClient, Db } from 'mongodb';
import { pipe } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/lib/TaskEither';
import { AppError } from '../middlewares/errorHandler';

let client: MongoClient | null = null;
let db: Db | null = null;

// Conecta ao banco de dados MongoDB
export const connectDB = (uri: string): TE.TaskEither<AppError, Db> =>
  pipe(
    TE.tryCatch(
      async () => {
        if (db && client && client.isConnected()) {
          console.log('✅ Already connected to MongoDB.');
          return db;
        }
        client = await MongoClient.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // Adicionar retryWrites: true, w: 'majority' se o cluster for replicado
        } as any); // Type assertion needed for newer driver versions
        db = client.db(); // Usa o nome do DB da URI ou pode especificar aqui
        console.log('✅ Connected to MongoDB.');
        return db;
      },
      (reason) => new AppError('DatabaseConnectionError', `Failed to connect to MongoDB: ${String(reason)}`, 500)
    )
  );

// Retorna a instância do DB
export const getDB = (): TE.TaskEither<AppError, Db> =>
  pipe(
    TE.fromNullable(new AppError('DatabaseNotConnected', 'MongoDB database not connected.', 500))(db)
  );

// Fecha a conexão com o banco de dados
export const closeDB = (): TE.TaskEither<AppError, void> =>
  pipe(
    TE.tryCatch(
      async () => {
        if (client) {
          await client.close();
          client = null;
          db = null;
          console.log('⛔ MongoDB connection closed.');
        }
      },
      (reason) => new AppError('DatabaseCloseError', `Failed to close MongoDB connection: ${String(reason)}`, 500)
    )
  );
