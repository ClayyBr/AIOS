import { ContactFormModel, ContactFormDocument } from './model';
import { CreateContactFormDTO, contactFormSchema } from './schema';
import { pipe, TE, E, AppError, tryCatchTE } from '../../utils/fp';
import { logger } from '../../utils/logger';

export const submitContactForm = (dto: CreateContactFormDTO): TE.TaskEither<AppError, ContactFormDocument> =>
  pipe(
    E.tryCatch(
      () => contactFormSchema.parse(dto),
      (reason) => ({ type: 'ValidationError', message: 'Invalid contact form data provided.', details: reason })
    ),
    TE.fromEither,
    TE.chainW(validatedData =>
      tryCatchTE(
        () => new ContactFormModel(validatedData).save(),
        'DatabaseError'
      )
    )
    // Potentially add TE.chainW here to send an email notification
  );

export const getContactForms = (): TE.TaskEither<AppError, ContactFormDocument[]> =>
  tryCatchTE(
    () => ContactFormModel.find({}).sort({ createdAt: -1 }).exec(),
    'DatabaseError'
  );

export const getContactFormById = (id: string): TE.TaskEither<AppError, ContactFormDocument> =>
  tryCatchTE(
    async () => {
      const form = await ContactFormModel.findById(id).exec();
      if (!form) {
        return Promise.reject(new Error('Contact form submission not found.'));
      }
      return form;
    },
    'NotFoundError'
  );
