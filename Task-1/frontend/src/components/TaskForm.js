import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      return;
    }

    setIsSubmitting(true);
    const success = await onAddTask({
      title: title.trim(),
      description: description.trim(),
    });

    if (success) {
      setTitle('');
      setDescription('');
      setIsExpanded(false);
    }
    setIsSubmitting(false);
  };

  const handleTitleFocus = () => {
    setIsExpanded(true);
  };

  const handleCancel = () => {
    if (!title.trim() && !description.trim()) {
      setIsExpanded(false);
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit}
      className="space-y-3"
      layout
    >
      {/* Title Input */}
      <div className="relative">
        <input
          type="text"
          className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg 
                   focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                   transition-all duration-150 placeholder:text-gray-400"
          placeholder="Quick add task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onFocus={handleTitleFocus}
          disabled={isSubmitting}
          maxLength={100}
        />
      </div>

      {/* Expanded Form */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.15 }}
            className="space-y-3"
          >
            {/* Description Textarea */}
            <textarea
              className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                       transition-all duration-150 resize-none placeholder:text-gray-400"
              placeholder="Description (optional)..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onBlur={handleCancel}
              disabled={isSubmitting}
              rows={2}
              maxLength={500}
            />

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <motion.button
                type="submit"
                disabled={isSubmitting || !title.trim()}
                className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg
                         hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                         disabled:opacity-50 disabled:cursor-not-allowed
                         transition-colors duration-150"
                whileHover={{ scale: !isSubmitting && title.trim() ? 1.02 : 1 }}
                whileTap={{ scale: !isSubmitting && title.trim() ? 0.98 : 1 }}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Adding...
                  </span>
                ) : (
                  'Add Task'
                )}
              </motion.button>

              <button
                type="button"
                onClick={() => {
                  setTitle('');
                  setDescription('');
                  setIsExpanded(false);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900
                         transition-colors duration-150"
                disabled={isSubmitting}
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.form>
  );
}

export default TaskForm;
