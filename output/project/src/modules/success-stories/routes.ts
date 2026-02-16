import { Router } from 'express';
import * as SuccessStoryController from './controller';

const router = Router();

router.post('/', SuccessStoryController.createSuccessStoryHandler);
router.get('/', SuccessStoryController.getSuccessStoriesHandler);
router.get('/:id', SuccessStoryController.getSuccessStoryByIdHandler);
router.patch('/:id', SuccessStoryController.updateSuccessStoryHandler);
router.delete('/:id', SuccessStoryController.deleteSuccessStoryHandler);

export { router };
