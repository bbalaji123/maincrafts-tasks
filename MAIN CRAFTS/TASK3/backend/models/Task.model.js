const mongoose = require('mongoose');

/**
 * Task Schema Definition
 * Implements proper validation, defaults, and timestamps
 */
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Task title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
      minlength: [1, 'Title cannot be empty']
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
      default: ''
    },
    status: {
      type: String,
      enum: {
        values: ['pending', 'completed'],
        message: 'Status must be either pending or completed'
      },
      default: 'pending'
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium'
    },
    isDeleted: {
      type: Boolean,
      default: false,
      select: false // Don't include in queries by default
    }
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
    toJSON: { 
      virtuals: true,
      transform: function(doc, ret) {
        delete ret.__v;
        return ret;
      }
    },
    toObject: { virtuals: true }
  }
);

// Indexes for performance optimization
taskSchema.index({ status: 1, createdAt: -1 });
taskSchema.index({ isDeleted: 1 });

// Virtual property for task age
taskSchema.virtual('age').get(function() {
  return Math.floor((Date.now() - this.createdAt) / (1000 * 60 * 60 * 24)); // Days since creation
});

// Query middleware - exclude soft-deleted tasks by default
taskSchema.pre(/^find/, function(next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// Instance method to soft delete
taskSchema.methods.softDelete = function() {
  this.isDeleted = true;
  return this.save();
};

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
