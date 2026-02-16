import { Router } from 'express';
import * as TrainerController from './controller';

const router = Router();

router.post('/', TrainerController.createTrainerHandler);
router.get('/', TrainerController.getTrainersHandler);
router.get('/:id', TrainerController.getTrainerByIdHandler);
router.patch('/:id', TrainerController.updateTrainerHandler);
router.delete('/:id', TrainerController.deleteTrainerHandler);

export { router };
