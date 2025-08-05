import mongoose, { Schema, Document } from 'mongoose'

export interface IMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export interface IChat extends Document {
  userId?: mongoose.Types.ObjectId
  sessionId: string
  messages: IMessage[]
  createdAt: Date
  updatedAt: Date
  isActive: boolean
}

const MessageSchema = new Schema<IMessage>({
  role: {
    type: String,
    enum: ['user', 'assistant'],
    required: true
  },
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
})

const ChatSchema = new Schema<IChat>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  sessionId: {
    type: String,
    required: true,
    index: true
  },
  messages: [MessageSchema],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

// Create indexes for better query performance
ChatSchema.index({ sessionId: 1 })
ChatSchema.index({ userId: 1 })
ChatSchema.index({ createdAt: -1 })
ChatSchema.index({ isActive: 1 })

// Prevent mongoose from creating the model multiple times
export const Chat = mongoose.models.Chat || mongoose.model<IChat>('Chat', ChatSchema) 