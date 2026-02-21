import { Db, Collection } from 'mongodb';
import { pipe } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/lib/TaskEither';
import { AppError } from '../../middlewares/errorHandler';
import { User, userPublicSchema } from './schema'; // Importa User para tipagem
import { getDB } from '../../utils/db'; // Para obter a instância do DB

// Função para obter a coleção de usuários
const getUsersCollection = (dbInstance: Db): Collection<User> =>
  dbInstance.collection<User>('users');

// Encontra um usuário pelo email
export const findUserByEmail = (email: string): TE.TaskEither<AppError, User | null> =>
  pipe(
    getDB(),
    TE.chain((dbInstance) =>
      TE.tryCatch(
        async () => {
          const collection = getUsersCollection(dbInstance);
          return collection.findOne({ email });
        },
        (reason) =>
          new AppError('DatabaseError', `Failed to find user by email: ${String(reason)}`, 500)
      )
    )
  );

// Cria um novo usuário
export const createUser = (
  userData: Omit<User, '_id' | 'createdAt' | 'updatedAt'>
): TE.TaskEither<AppError, User> =>
  pipe(
    getDB(),
    TE.chain((dbInstance) =>
      TE.tryCatch(
        async () => {
          const collection = getUsersCollection(dbInstance);
          const now = new Date();
          const userToInsert: User = {
            ...userData,
            _id: '', // Será preenchido pelo driver ou pelo mongo
            createdAt: now,
            updatedAt: now,
            status: 'pending', // Exemplo: usuário recém-criado pode ter status pendente
          };
          const result = await collection.insertOne(userToInsert);
          // Retorna o documento inserido com o _id gerado
          return { ...userToInsert, _id: result.insertedId.toHexString() };
        },
        (reason) => new AppError('DatabaseError', `Failed to create user: ${String(reason)}`, 500)
      )
    )
  );

// Retorna a versão pública de um usuário
export const mapUserToPublic = (user: User): User => userPublicSchema.parse(user);
