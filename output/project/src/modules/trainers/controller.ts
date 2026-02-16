import { Request, Response } from 'express';
import { pipe, TE } from '../../utils/fp';
import * as TrainerService from './service';
import { CreateTrainerDTO, UpdateTrainerDTO } from './schema';
import { logger } from '../../utils/logger';

export const createTrainerHandler = (req: Request, res: Response) =>
  pipe(
    TrainerService.createTrainer(req.body as CreateTrainerDTO),
    TE.match(
      (error) => {
        logger.error('Failed to create trainer:', error);
        res.status(error.type === 'ValidationError' ? 400 : 500).json({ error });
      },
      (trainer) => res.status(201).json(trainer)
    )
  )();

export const getTrainersHandler = (req: Request, res: Response) =>
  pipe(
    TrainerService.getTrainers(),
    TE.match(
      (error) => {
        logger.error('Failed to retrieve trainers:', error);
        res.status(500).json({ error });
      },
      (trainers) => res.status(200).json(trainers)
    )
  )();

export const getTrainerByIdHandler = (req: Request, res: Response) =>
  pipe(
    TrainerService.getTrainerById(req.params.id),
    TE.match(
      (error) => {
        logger.error(`Failed to retrieve trainer with ID ${req.params.id}:`, error);
        res.status(error.type === 'NotFoundError' ? 404 : 500).json({ error });
      },
      (trainer) => res.status(200).json(trainer)
    )
  )();

export const updateTrainerHandler = (req: Request, res: Response) =>
  pipe(
    TrainerService.updateTrainer(req.params.id, req.body as UpdateTrainerDTO),
    TE.match(
      (error) => {
        logger.error(`Failed to update trainer with ID ${req.params.id}:`, error);
        res.status(error.type === 'ValidationError' || error.type === 'NotFoundError' ? 400 : 500).json({ error });
      },
      (trainer) => res.status(200).json(trainer)
    )
  )();

export const deleteTrainerHandler = (req: Request, res: Response) =>
  pipe(
    TrainerService.deleteTrainer(req.params.id),
    TE.match(
      (error) => {
        logger.error(`Failed to delete trainer with ID ${req.params.id}:`, error);
        res.status(error.type === 'NotFoundError' ? 404 : 500).json({ error });
      },
      (result) => res.status(200).json(result)
    )
  )();
