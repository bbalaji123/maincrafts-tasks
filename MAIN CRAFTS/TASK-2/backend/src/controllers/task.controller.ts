import { Request, Response } from 'express';
import { Task } from '../models/Task.model';

/**
 * @route   POST /api/tasks
 * @desc    Create a new task
 * @access  Public
 */
export const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { text } = req.body;

    // Validate input
    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      res.status(400).json({
        success: false,
        message: 'Task text is required and must be a non-empty string',
      });
      return;
    }

    // Create new task
    const task = await Task.create({ text: text.trim() });

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: task,
    });
  } catch (error) {
    console.error('Error creating task:', error);
    
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: 'Failed to create task',
        error: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'An unknown error occurred',
      });
    }
  }
};

/**
 * @route   GET /api/tasks
 * @desc    Get all tasks
 * @access  Public
 */
export const getAllTasks = async (_req: Request, res: Response): Promise<void> => {
  try {
    // Fetch all tasks, sorted by creation date (newest first)
    const tasks = await Task.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch tasks',
        error: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'An unknown error occurred',
      });
    }
  }
};

/**
 * @route   GET /api/tasks/:id
 * @desc    Get a single task by ID
 * @access  Public
 */
export const getTaskById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) {
      res.status(404).json({
        success: false,
        message: 'Task not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    console.error('Error fetching task:', error);
    
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch task',
        error: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'An unknown error occurred',
      });
    }
  }
};

/**
 * @route   PUT /api/tasks/:id
 * @desc    Update a task
 * @access  Public
 */
export const updateTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    // Validate input
    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      res.status(400).json({
        success: false,
        message: 'Task text is required and must be a non-empty string',
      });
      return;
    }

    // Update task
    const task = await Task.findByIdAndUpdate(
      id,
      { text: text.trim() },
      { new: true, runValidators: true }
    );

    if (!task) {
      res.status(404).json({
        success: false,
        message: 'Task not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: task,
    });
  } catch (error) {
    console.error('Error updating task:', error);
    
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: 'Failed to update task',
        error: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'An unknown error occurred',
      });
    }
  }
};

/**
 * @route   DELETE /api/tasks/:id
 * @desc    Delete a task
 * @access  Public
 */
export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      res.status(404).json({
        success: false,
        message: 'Task not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      data: task,
    });
  } catch (error) {
    console.error('Error deleting task:', error);
    
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: 'Failed to delete task',
        error: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'An unknown error occurred',
      });
    }
  }
};

/**
 * @route   PATCH /api/tasks/:id/toggle
 * @desc    Toggle task completion status
 * @access  Public
 */
export const toggleTaskCompletion = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) {
      res.status(404).json({
        success: false,
        message: 'Task not found',
      });
      return;
    }

    // Toggle the completed status
    task.completed = !task.completed;
    await task.save();

    res.status(200).json({
      success: true,
      message: `Task marked as ${task.completed ? 'completed' : 'incomplete'}`,
      data: task,
    });
  } catch (error) {
    console.error('Error toggling task completion:', error);
    
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: 'Failed to toggle task completion',
        error: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'An unknown error occurred',
      });
    }
  }
};
