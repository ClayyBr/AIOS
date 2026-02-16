import mongoose, { Schema, Document } from 'mongoose';
import { User } from './schema';

export interface UserDocument extends User, Document {}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  phone: { type: String, trim: true },
  message: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

UserSchema.index({ email: 1 }); // Optimize email lookup

// Update `updatedAt` on save
UserSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

export const UserModel = mongoose.model<UserDocument>('User', UserSchema);
