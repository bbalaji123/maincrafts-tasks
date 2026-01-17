import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './App.css';

const API_URL = 'http://localhost:5000/api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/tasks`);
      const data = await response.json();
      
      if (data.success) {
        setTasks(data.data);
        setError(null);
      } else {
        setError('Failed to fetch tasks');
      }
    } catch (err) {
      setError('Unable to connect to server. Please ensure the backend is running.');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (taskData) => {
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setTasks([data.data, ...tasks]);
        return true;
      }
      return false;
    } catch (err) {
      console.error('Add task error:', err);
      return false;
    }
  };

  const toggleTask = async (id) => {
    const task = tasks.find(t => t._id === id);
    if (!task) return;

    try {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: !task.completed }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setTasks(tasks.map(t => t._id === id ? data.data : t));
      }
    } catch (err) {
      console.error('Toggle task error:', err);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      
      if (data.success) {
        setTasks(tasks.filter(t => t._id !== id));
      }
    } catch (err) {
      console.error('Delete task error:', err);
    }
  };

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div className="min-h-screen py-6 px-4 sm:px-6 lg:px-8">
      {/* Pattern Overlay */}
      <div className="pattern-overlay"></div>
      
      {/* Floating Symbols */}
      <div className="floating-symbols">
        <span className="symbol" style={{ top: '10%' }}>★</span>
        <span className="symbol" style={{ top: '20%' }}>✓</span>
        <span className="symbol" style={{ top: '30%' }}>◆</span>
        <span className="symbol" style={{ top: '40%' }}>●</span>
        <span className="symbol" style={{ top: '50%' }}>▸</span>
      </div>

      <motion.div 
        className="max-w-4xl mx-auto app-decorator"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <motion.header 
          className="mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-3 mb-2">
            {/* Icon */}
            <motion.div 
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 shadow-lg shadow-primary-500/30"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </motion.div>
            
            {/* Title */}
            <div className="flex-1">
              <motion.h1 
                className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-primary-800 to-primary-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                Task Manager
              </motion.h1>
              <motion.p
                className="text-sm text-gray-500 mt-0.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Organize your work efficiently
              </motion.p>
            </div>
          </div>
        </motion.header>

        {/* Main Container */}
        <motion.div 
          className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          {/* Quick Add Form */}
          <div className="border-b border-gray-100 bg-gray-50/50 p-4">
            <TaskForm onAddTask={addTask} />
          </div>

          {/* Error Message */}
          {error && (
            <motion.div 
              className="mx-4 mt-4 p-3 bg-red-50 border border-red-200 rounded-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <p className="text-sm text-red-600">{error}</p>
            </motion.div>
          )}

          {/* Task List */}
          <div className="p-4">
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                <p className="mt-3 text-sm text-gray-500">Loading tasks...</p>
              </div>
            ) : (
              <TaskList
                tasks={tasks}
                onToggleTask={toggleTask}
                onDeleteTask={deleteTask}
              />
            )}
          </div>

          {/* Footer Stats */}
          {tasks.length > 0 && (
            <motion.div 
              className="border-t border-gray-100 px-4 py-3 bg-gray-50/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{tasks.length} total {tasks.length === 1 ? 'task' : 'tasks'}</span>
                <span>{completedCount} completed</span>
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default App;
