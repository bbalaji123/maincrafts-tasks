import axios, { AxiosInstance, AxiosError } from 'axios';

/**
 * API Configuration
 * Base URL for backend API
 */
const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Axios instance with default configuration
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

/**
 * Task Interface - Matches backend Task model
 */
export interface Task {
  _id: string;
  text: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * API Response Interface
 */
interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  count?: number;
  error?: string;
}

/**
 * Fetch all tasks from backend
 * @returns Promise with array of tasks
 */
export const fetchTasks = async (): Promise<Task[]> => {
  try {
    const response = await apiClient.get<ApiResponse<Task[]>>('/tasks');
    return response.data.data || [];
  } catch (error) {
    handleApiError(error, 'Failed to fetch tasks');
    return [];
  }
};

/**
 * Create a new task
 * @param text - Task text content
 * @returns Promise with created task
 */
export const createTask = async (text: string): Promise<Task | null> => {
  try {
    const response = await apiClient.post<ApiResponse<Task>>('/tasks', { text });
    return response.data.data || null;
  } catch (error) {
    handleApiError(error, 'Failed to create task');
    return null;
  }
};

/**
 * Update an existing task
 * @param id - Task ID
 * @param text - Updated task text
 * @returns Promise with updated task
 */
export const updateTask = async (id: string, text: string): Promise<Task | null> => {
  try {
    const response = await apiClient.put<ApiResponse<Task>>(`/tasks/${id}`, { text });
    return response.data.data || null;
  } catch (error) {
    handleApiError(error, 'Failed to update task');
    return null;
  }
};

/**
 * Delete a task
 * @param id - Task ID
 * @returns Promise with boolean indicating success
 */
export const deleteTask = async (id: string): Promise<boolean> => {
  try {
    await apiClient.delete(`/tasks/${id}`);
    return true;
  } catch (error) {
    handleApiError(error, 'Failed to delete task');
    return false;
  }
};

/**
 * Toggle task completion status
 * @param id - Task ID
 * @returns Promise with updated task
 */
export const toggleTaskCompletion = async (id: string): Promise<Task | null> => {
  try {
    const response = await apiClient.patch<ApiResponse<Task>>(`/tasks/${id}/toggle`);
    return response.data.data || null;
  } catch (error) {
    handleApiError(error, 'Failed to toggle task completion');
    return null;
  }
};

/**
 * Handle API errors consistently
 * @param error - Error object from axios
 * @param defaultMessage - Default error message
 */
const handleApiError = (error: unknown, defaultMessage: string): void => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiResponse<never>>;
    
    if (axiosError.response) {
      // Server responded with error
      console.error(`API Error: ${axiosError.response.data.message || defaultMessage}`);
    } else if (axiosError.request) {
      // Request made but no response
      console.error('Network Error: Unable to reach server. Please check if backend is running.');
    } else {
      // Error in request setup
      console.error(`Request Error: ${axiosError.message}`);
    }
  } else {
    console.error(defaultMessage, error);
  }
};
