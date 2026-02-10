const express = require('express');
const router = express.Router();
const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskStatus,
  getTaskStats
} = require('../controllers/task.controller');

/**
 * Task Routes
 * RESTful API endpoint definitions
 */

// Stats route must come before /:id to avoid conflicts
router.get('/stats', getTaskStats);

// CRUD routes
router.route('/')
  .get(getAllTasks)
  .post(createTask);

router.route('/:id')
  .get(getTaskById)
  .put(updateTask)
  .delete(deleteTask);

// Additional functionality
router.patch('/:id/toggle', toggleTaskStatus);

module.exports = router;
