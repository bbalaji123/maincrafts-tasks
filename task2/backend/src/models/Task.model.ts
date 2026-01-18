import { Schema, model, Document } from 'mongoose';

/**
 * Task Interface - Defines the structure of a Task document
 */
export interface ITask extends Document {
  text: string;
  completed: boolean;
  createdAt: Date;
}

/**
 * Task Schema - MongoDB schema definition with strict validation
 */
const taskSchema = new Schema<ITask>(
  {
    text: {
      type: String,
      required: [true, 'Task text is required'],
      trim: true,
      minlength: [1, 'Task text must not be empty'],
      maxlength: [500, 'Task text must not exceed 500 characters'],
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
    versionKey: false, // Removes __v field
  }
);

/**
 * Task Model - Mongoose model for database operations
 */
export const Task = model<ITask>('Task', taskSchema);
