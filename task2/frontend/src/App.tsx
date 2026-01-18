import React, { useState, useEffect } from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import { Task, fetchTasks, createTask, updateTask, deleteTask, toggleTaskCompletion } from './services/api';
import './styles/global.css';

/**
 * Main App Component
 * Orchestrates the to-do list application
 */
const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAddingTask, setIsAddingTask] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Load tasks on component mount
   */
  useEffect(() => {
    loadTasks();
  }, []);

  /**
   * Fetch tasks from API
   */
  const loadTasks = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const fetchedTasks = await fetchTasks();
      setTasks(fetchedTasks);
    } catch (err) {
      setError('Failed to load tasks. Please check your connection.');
      console.error('Error loading tasks:', err);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Add a new task
   */
  const handleAddTask = async (text: string): Promise<void> => {
    setIsAddingTask(true);
    setError(null);

    try {
      const newTask = await createTask(text);
      
      if (newTask) {
        // Add new task to the beginning of the list
        setTasks((prevTasks) => [newTask, ...prevTasks]);
      } else {
        setError('Failed to create task. Please try again.');
      }
    } catch (err) {
      setError('An error occurred while creating the task.');
      console.error('Error adding task:', err);
    } finally {
      setIsAddingTask(false);
    }
  };

  /**
   * Update an existing task
   */
  const handleUpdateTask = async (id: string, text: string): Promise<void> => {
    try {
      const updatedTask = await updateTask(id, text);
      
      if (updatedTask) {
        // Update the task in the list
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task._id === id ? updatedTask : task))
        );
      } else {
        setError('Failed to update task. Please try again.');
      }
    } catch (err) {
      setError('An error occurred while updating the task.');
      console.error('Error updating task:', err);
    }
  };

  /**
   * Delete a task
   */
  const handleDeleteTask = async (id: string): Promise<void> => {
    try {
      const success = await deleteTask(id);
      
      if (success) {
        // Remove the task from the list
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
      } else {
        setError('Failed to delete task. Please try again.');
      }
    } catch (err) {
      setError('An error occurred while deleting the task.');
      console.error('Error deleting task:', err);
    }
  };

  /**
   * Toggle task completion
   */
  const handleToggleComplete = async (id: string): Promise<void> => {
    try {
      const updatedTask = await toggleTaskCompletion(id);
      
      if (updatedTask) {
        // Update the task in the list
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task._id === id ? updatedTask : task))
        );
      } else {
        setError('Failed to update task status. Please try again.');
      }
    } catch (err) {
      setError('An error occurred while updating the task.');
      console.error('Error toggling task:', err);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <header className="app-header">
          <div className="header-content">
            <h1 className="app-title">To-Do List</h1>
            <p className="app-subtitle">Stay organized, stay productive</p>
          </div>
        </header>

        <main className="app-main">
          <TaskInput onAddTask={handleAddTask} isLoading={isAddingTask} />
          <TaskList 
            tasks={tasks} 
            isLoading={isLoading} 
            error={error}
            onDeleteTask={handleDeleteTask}
            onUpdateTask={handleUpdateTask}
            onToggleComplete={handleToggleComplete}
          />
        </main>

        <footer className="app-footer">
          <p>Built with MERN Stack + TypeScript</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
