import mongoose, { Schema, Document } from 'mongoose';
import { Trainer } from './schema';

export interface TrainerDocument extends Trainer, Document {}

const TrainerSchema: Schema = new Schema({
  name: { type: String, required: true, trim: true },
  specialty: { type: String, required: true, trim: true },
  bio: { type: String, trim: true },
  imageUrl: { type: String, trim: true },
  socialLinks: { type: Map, of: String },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

TrainerSchema.index({ name: 1 });
TrainerSchema.index({ specialty: 1 });

TrainerSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

export const TrainerModel = mongoose.model<TrainerDocument>('Trainer', TrainerSchema);
