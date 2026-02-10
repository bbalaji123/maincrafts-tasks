import { useState, useEffect, useCallback } from 'react';
import { taskAPI } from '../services/api';

/**
 * Custom Hook for Task Management
 * Provides all task-related operations with state management
 * Implements optimistic UI updates for better UX
 */
export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, completed: 0, completionRate: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    sortBy: 'createdAt',
    order: 'desc'
  });

  /**
   * Fetch tasks from API with current filters
   */
  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params = {};
      if (filters.status !== 'all') params.status = filters.status;
      if (filters.priority !== 'all') params.priority = filters.priority;
      params.sortBy = filters.sortBy;
      params.order = filters.order;

      const response = await taskAPI.getAllTasks(params);
      setTasks(response.data || []);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  /**
   * Fetch task statistics
   */
  const fetchStats = useCallback(async () => {
    try {
      const response = await taskAPI.getTaskStats();
      setStats(response.data);
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  }, []);

  /**
   * Create a new task (with optimistic update)
   */
  const createTask = async (taskData) => {
    try {
      const response = await taskAPI.createTask(taskData);
      
      // Optimistic update - add to local state immediately
      setTasks(prev => [response.data, ...prev]);
      
      // Refresh stats
      await fetchStats();
      
      return { success: true, data: response.data };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  /**
   * Update a task (with optimistic update)
   */
  const updateTask = async (id, taskData) => {
    // Store previous state for rollback
    const previousTasks = [...tasks];

    try {
      // Optimistic update - update local state immediately
      setTasks(prev =>
        prev.map(task => (task._id === id ? { ...task, ...taskData } : task))
      );

      const response = await taskAPI.updateTask(id, taskData);
      
      // Update with server response
      setTasks(prev =>
        prev.map(task => (task._id === id ? response.data : task))
      );

      return { success: true, data: response.data };
    } catch (err) {
      // Rollback on error
      setTasks(previousTasks);
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  /**
   * Delete a task (with optimistic update)
   */
  const deleteTask = async (id) => {
    const previousTasks = [...tasks];

    try {
      // Optimistic update - remove from local state immediately
      setTasks(prev => prev.filter(task => task._id !== id));

      await taskAPI.deleteTask(id);
      
      // Refresh stats
      await fetchStats();

      return { success: true };
    } catch (err) {
      // Rollback on error
      setTasks(previousTasks);
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  /**
   * Toggle task status (with optimistic update)
   */
  const toggleTaskStatus = async (id) => {
    const previousTasks = [...tasks];

    try {
      // Optimistic update
      setTasks(prev =>
        prev.map(task =>
          task._id === id
            ? { ...task, status: task.status === 'pending' ? 'completed' : 'pending' }
            : task
        )
      );

      const response = await taskAPI.toggleTaskStatus(id);

      // Update with server response
      setTasks(prev =>
        prev.map(task => (task._id === id ? response.data : task))
      );

      // Refresh stats
      await fetchStats();

      return { success: true, data: response.data };
    } catch (err) {
      // Rollback on error
      setTasks(previousTasks);
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  /**
   * Update filters
   */
  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  /**
   * Clear error state
   */
  const clearError = () => {
    setError(null);
  };

  /**
   * Refresh both tasks and statistics
   * Used by the refresh button
   */
  const refreshAll = async () => {
    await fetchTasks();
    await fetchStats();
  };

  // Fetch tasks when filters change
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Fetch stats on initial load
  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    tasks,
    stats,
    loading,
    error,
    filters,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
    updateFilters,
    clearError,
    refreshTasks: refreshAll,
  };
};
