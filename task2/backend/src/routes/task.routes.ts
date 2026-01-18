import { Router } from 'express';
import { createTask, getAllTasks, getTaskById, updateTask, deleteTask, toggleTaskCompletion } from '../controllers/task.controller';

const router = Router();

/**
 * Task Routes
 * Base path: /api/tasks
 */

// POST /api/tasks - Create a new task
router.post('/', createTask);

// GET /api/tasks - Get all tasks
router.get('/', getAllTasks);

// GET /api/tasks/:id - Get a single task by ID
router.get('/:id', getTaskById);

// PUT /api/tasks/:id - Update a task
router.put('/:id', updateTask);

// PATCH /api/tasks/:id/toggle - Toggle task completion
router.patch('/:id/toggle', toggleTaskCompletion);

// DELETE /api/tasks/:id - Delete a task
router.delete('/:id', deleteTask);

export default router;
