import { Router } from 'express';
import { handleRegisterUser } from './controller';

const identityRouter = Router();

// Rota para registro de novo usuário
identityRouter.post('/register', handleRegisterUser);

// Outras rotas de identidade, se houver (ex: login, profile, password reset)
// identityRouter.post('/login', handleLoginUser);

export { identityRouter };
