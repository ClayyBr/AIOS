import mongoose, { Schema, Document } from 'mongoose';
import { ContactForm } from './schema';

export interface ContactFormDocument extends ContactForm, Document {}

const ContactFormSchema: Schema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  phone: { type: String, trim: true },
  subject: { type: String, trim: true },
  message: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now },
});

ContactFormSchema.index({ email: 1 });

export const ContactFormModel = mongoose.model<ContactFormDocument>(
  'ContactForm',
  ContactFormSchema
);
