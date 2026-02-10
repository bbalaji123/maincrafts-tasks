const Task = require('../models/Task.model');

/**
 * Task Controller
 * Implements all CRUD operations with proper error handling
 * Follows async/await pattern with try-catch blocks
 */

/**
 * @desc    Get all tasks with optional filtering
 * @route   GET /api/tasks?status=pending&priority=high
 * @access  Public
 */
exports.getAllTasks = async (req, res, next) => {
  try {
    const { status, priority, sortBy = 'createdAt', order = 'desc' } = req.query;
    
    // Build filter object
    const filter = {};
    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    // Build sort object
    const sortOrder = order === 'asc' ? 1 : -1;
    const sortOptions = { [sortBy]: sortOrder };

    const tasks = await Task.find(filter).sort(sortOptions);

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single task by ID
 * @route   GET /api/tasks/:id
 * @access  Public
 */
exports.getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    // Handle invalid ObjectId format
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }
    next(error);
  }
};

/**
 * @desc    Create new task
 * @route   POST /api/tasks
 * @access  Public
 */
exports.createTask = async (req, res, next) => {
  try {
    const { title, description, status, priority } = req.body;

    // Validate required fields
    if (!title || title.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Task title is required'
      });
    }

    const task = await Task.create({
      title: title.trim(),
      description: description?.trim() || '',
      status: status || 'pending',
      priority: priority || 'medium'
    });

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: task
    });
  } catch (error) {
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }
    next(error);
  }
};

/**
 * @desc    Update task
 * @route   PUT /api/tasks/:id
 * @access  Public
 */
exports.updateTask = async (req, res, next) => {
  try {
    const { title, description, status, priority } = req.body;

    // Find task first to check existence
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    // Update only provided fields
    if (title !== undefined) task.title = title.trim();
    if (description !== undefined) task.description = description.trim();
    if (status !== undefined) task.status = status;
    if (priority !== undefined) task.priority = priority;

    await task.save();

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: task
    });
  } catch (error) {
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }
    // Handle invalid ObjectId
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }
    next(error);
  }
};

/**
 * @desc    Delete task (hard delete)
 * @route   DELETE /api/tasks/:id
 * @access  Public
 */
exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      data: { id: req.params.id }
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }
    next(error);
  }
};

/**
 * @desc    Toggle task status (pending <-> completed)
 * @route   PATCH /api/tasks/:id/toggle
 * @access  Public
 */
exports.toggleTaskStatus = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    task.status = task.status === 'pending' ? 'completed' : 'pending';
    await task.save();

    res.status(200).json({
      success: true,
      message: 'Task status updated successfully',
      data: task
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }
    next(error);
  }
};

/**
 * @desc    Get task statistics
 * @route   GET /api/tasks/stats
 * @access  Public
 */
exports.getTaskStats = async (req, res, next) => {
  try {
    const stats = await Task.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const totalTasks = await Task.countDocuments();
    const pendingCount = stats.find(s => s._id === 'pending')?.count || 0;
    const completedCount = stats.find(s => s._id === 'completed')?.count || 0;

    res.status(200).json({
      success: true,
      data: {
        total: totalTasks,
        pending: pendingCount,
        completed: completedCount,
        completionRate: totalTasks > 0 ? ((completedCount / totalTasks) * 100).toFixed(1) : 0
      }
    });
  } catch (error) {
    next(error);
  }
};
