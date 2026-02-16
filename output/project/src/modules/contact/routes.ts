import { Router } from 'express';
import * as ContactController from './controller';

const router = Router();

router.post('/', ContactController.submitContactFormHandler);
router.get('/', ContactController.getContactFormsHandler);
router.get('/:id', ContactController.getContactFormByIdHandler);

export { router };
