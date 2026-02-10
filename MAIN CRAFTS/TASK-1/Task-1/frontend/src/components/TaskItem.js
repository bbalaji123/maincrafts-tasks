import React, { useState } from 'react';
import { motion } from 'framer-motion';

function TaskItem({ task, index, onToggle, onDelete }) {
  const [showActions, setShowActions] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  // Mock priority (since backend doesn't support it yet)
  const priority = task.priority || 'medium';
  
  const priorityColors = {
    low: 'bg-gray-100 text-gray-600 border-gray-200',
    medium: 'bg-blue-50 text-blue-600 border-blue-200',
    high: 'bg-red-50 text-red-600 border-red-200',
  };

  return (
    <motion.div 
      className={`group flex items-center gap-3 px-4 py-3 rounded-lg border border-transparent
                 hover:bg-gray-50 hover:border-gray-200 transition-all duration-150
                 ${task.completed ? 'opacity-60' : ''}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20, transition: { duration: 0.15 } }}
      transition={{ delay: index * 0.03 }}
      layout
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Checkbox */}
      <motion.div 
        className="flex-shrink-0"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <input
          type="checkbox"
          className="w-4 h-4 rounded border-gray-300 text-primary-600 
                   focus:ring-2 focus:ring-primary-500 focus:ring-offset-0
                   cursor-pointer transition-colors"
          checked={task.completed}
          onChange={() => onToggle(task._id)}
          id={`task-${task._id}`}
        />
      </motion.div>

      {/* Task Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className={`text-sm font-medium truncate
                        ${task.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}>
            {task.title}
          </h3>
        </div>
        
        {task.description && (
          <p className="text-xs text-gray-500 line-clamp-1">
            {task.description}
          </p>
        )}
      </div>

      {/* Badges & Actions */}
      <div className="flex items-center gap-2">
        {/* Date Badge */}
        <span className="hidden sm:inline-flex items-center px-2 py-1 text-xs font-medium 
                       text-gray-500 bg-gray-100 rounded-md">
          {formatDate(task.createdAt)}
        </span>

        {/* Priority Badge */}
        <span className={`hidden sm:inline-flex items-center px-2 py-1 text-xs font-medium 
                        rounded-md border ${priorityColors[priority]}`}>
          {priority.charAt(0).toUpperCase() + priority.slice(1)}
        </span>

        {/* Actions Menu */}
        <motion.button
          onClick={() => onDelete(task._id)}
          className={`p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 
                     rounded-md transition-all duration-150
                     ${showActions ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
          aria-label="Delete task"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </motion.button>
      </div>
    </motion.div>
  );
}

export default TaskItem;
