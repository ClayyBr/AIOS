import { Request, Response } from 'express';
import { pipe, TE } from '../../utils/fp';
import * as SuccessStoryService from './service';
import { CreateSuccessStoryDTO, UpdateSuccessStoryDTO } from './schema';
import { logger } from '../../utils/logger';

export const createSuccessStoryHandler = (req: Request, res: Response) =>
  pipe(
    SuccessStoryService.createSuccessStory(req.body as CreateSuccessStoryDTO),
    TE.match(
      (error) => {
        logger.error('Failed to create success story:', error);
        res.status(error.type === 'ValidationError' ? 400 : 500).json({ error });
      },
      (story) => res.status(201).json(story)
    )
  )();

export const getSuccessStoriesHandler = (req: Request, res: Response) =>
  pipe(
    SuccessStoryService.getSuccessStories(req.query.featured === 'true'),
    TE.match(
      (error) => {
        logger.error('Failed to retrieve success stories:', error);
        res.status(500).json({ error });
      },
      (stories) => res.status(200).json(stories)
    )
  )();

export const getSuccessStoryByIdHandler = (req: Request, res: Response) =>
  pipe(
    SuccessStoryService.getSuccessStoryById(req.params.id),
    TE.match(
      (error) => {
        logger.error(`Failed to retrieve success story with ID ${req.params.id}:`, error);
        res.status(error.type === 'NotFoundError' ? 404 : 500).json({ error });
      },
      (story) => res.status(200).json(story)
    )
  )();

export const updateSuccessStoryHandler = (req: Request, res: Response) =>
  pipe(
    SuccessStoryService.updateSuccessStory(req.params.id, req.body as UpdateSuccessStoryDTO),
    TE.match(
      (error) => {
        logger.error(`Failed to update success story with ID ${req.params.id}:`, error);
        res.status(error.type === 'ValidationError' || error.type === 'NotFoundError' ? 400 : 500).json({ error });
      },
      (story) => res.status(200).json(story)
    )
  )();

export const deleteSuccessStoryHandler = (req: Request, res: Response) =>
  pipe(
    SuccessStoryService.deleteSuccessStory(req.params.id),
    TE.match(
      (error) => {
        logger.error(`Failed to delete success story with ID ${req.params.id}:`, error);
        res.status(error.type === 'NotFoundError' ? 404 : 500).json({ error });
      },
      (result) => res.status(200).json(result)
    )
  )();
