import mongoose, { Schema, Document } from 'mongoose';
import { SuccessStory } from './schema';

export interface SuccessStoryDocument extends SuccessStory, Document {}

const SuccessStorySchema: Schema = new Schema({
  memberId: { type: String, trim: true },
  memberName: { type: String, required: true, trim: true },
  storyTitle: { type: String, required: true, trim: true },
  storyContent: { type: String, required: true, trim: true },
  imageUrl: { type: String, trim: true },
  videoUrl: { type: String, trim: true },
  dateAchieved: { type: Date },
  isFeatured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

SuccessStorySchema.index({ isFeatured: 1, createdAt: -1 }); // For fetching featured/recent stories

SuccessStorySchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

export const SuccessStoryModel = mongoose.model<SuccessStoryDocument>(
  'SuccessStory',
  SuccessStorySchema
);
