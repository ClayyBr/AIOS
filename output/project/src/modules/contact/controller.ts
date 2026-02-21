import { Request, Response } from 'express';
import { pipe, TE } from '../../utils/fp';
import * as ContactService from './service';
import { CreateContactFormDTO } from './schema';
import { logger } from '../../utils/logger';

export const submitContactFormHandler = (req: Request, res: Response) =>
  pipe(
    ContactService.submitContactForm(req.body as CreateContactFormDTO),
    TE.match(
      (error) => {
        logger.error('Failed to submit contact form:', error);
        res.status(error.type === 'ValidationError' ? 400 : 500).json({ error });
      },
      (submission) =>
        res.status(201).json({ message: 'Contact form submitted successfully!', submission })
    )
  )();

export const getContactFormsHandler = (req: Request, res: Response) =>
  pipe(
    ContactService.getContactForms(),
    TE.match(
      (error) => {
        logger.error('Failed to retrieve contact forms:', error);
        res.status(500).json({ error });
      },
      (forms) => res.status(200).json(forms)
    )
  )();

export const getContactFormByIdHandler = (req: Request, res: Response) =>
  pipe(
    ContactService.getContactFormById(req.params.id),
    TE.match(
      (error) => {
        logger.error(`Failed to retrieve contact form with ID ${req.params.id}:`, error);
        res.status(error.type === 'NotFoundError' ? 404 : 500).json({ error });
      },
      (form) => res.status(200).json(form)
    )
  )();
