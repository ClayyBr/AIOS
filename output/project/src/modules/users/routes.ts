import { Router } from 'express';
import * as UserController from './controller';

const router = Router();

router.post('/', UserController.createUserHandler);
router.get('/', UserController.getUsersHandler);
router.get('/:id', UserController.getUserByIdHandler);

export { router };
