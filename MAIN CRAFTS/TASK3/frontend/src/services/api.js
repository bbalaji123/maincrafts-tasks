import axios from 'axios';

/**
 * Centralized API Service
 * All HTTP requests go through this service for consistency
 * Handles errors uniformly across the application
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const customError = {
      message: error.response?.data?.message || error.message || 'Something went wrong',
      status: error.response?.status,
      data: error.response?.data,
    };
    return Promise.reject(customError);
  }
);

/**
 * Task API Methods
 */
export const taskAPI = {
  /**
   * Get all tasks with optional filters
   * @param {Object} params - Query parameters (status, priority, sortBy, order)
   */
  getAllTasks: async (params = {}) => {
    const response = await apiClient.get('/tasks', { params });
    return response.data;
  },

  /**
   * Get single task by ID
   * @param {string} id - Task ID
   */
  getTaskById: async (id) => {
    const response = await apiClient.get(`/tasks/${id}`);
    return response.data;
  },

  /**
   * Create new task
   * @param {Object} taskData - Task data (title, description, status, priority)
   */
  createTask: async (taskData) => {
    const response = await apiClient.post('/tasks', taskData);
    return response.data;
  },

  /**
   * Update existing task
   * @param {string} id - Task ID
   * @param {Object} taskData - Updated task data
   */
  updateTask: async (id, taskData) => {
    const response = await apiClient.put(`/tasks/${id}`, taskData);
    return response.data;
  },

  /**
   * Delete task
   * @param {string} id - Task ID
   */
  deleteTask: async (id) => {
    const response = await apiClient.delete(`/tasks/${id}`);
    return response.data;
  },

  /**
   * Toggle task status (pending <-> completed)
   * @param {string} id - Task ID
   */
  toggleTaskStatus: async (id) => {
    const response = await apiClient.patch(`/tasks/${id}/toggle`);
    return response.data;
  },

  /**
   * Get task statistics
   */
  getTaskStats: async () => {
    const response = await apiClient.get('/tasks/stats');
    return response.data;
  },
};

export default apiClient;
