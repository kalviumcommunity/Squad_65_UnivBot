import mongoose, { Schema, Document } from 'mongoose'

export interface IUser extends Document {
  email: string
  name: string
  studentId?: string
  createdAt: Date
  updatedAt: Date
  lastActive: Date
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  studentId: {
    type: String,
    trim: true
  },
  lastActive: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
})

// Create index for better query performance (removed duplicate)
UserSchema.index({ studentId: 1 })

// Prevent mongoose from creating the model multiple times
export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema) 