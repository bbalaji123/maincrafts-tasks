import React, { useState } from 'react';

interface TaskInputProps {
  onAddTask: (text: string) => Promise<void>;
  isLoading: boolean;
}

/**
 * TaskInput Component
 * Handles user input for creating new tasks
 */
const TaskInput: React.FC<TaskInputProps> = ({ onAddTask, isLoading }) => {
  const [taskText, setTaskText] = useState<string>('');
  const [error, setError] = useState<string>('');

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    
    // Validation
    if (!taskText.trim()) {
      setError('Task cannot be empty');
      return;
    }

    if (taskText.trim().length > 500) {
      setError('Task is too long (max 500 characters)');
      return;
    }

    setError('');

    try {
      await onAddTask(taskText.trim());
      setTaskText(''); // Clear input on success
    } catch (err) {
      setError('Failed to add task. Please try again.');
    }
  };

  /**
   * Handle input change
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTaskText(e.target.value);
    if (error) setError(''); // Clear error on typing
  };

  return (
    <div className="task-input-container">
      <form onSubmit={handleSubmit} className="task-input-form">
        <div className="input-wrapper">
          <input
            type="text"
            value={taskText}
            onChange={handleChange}
            placeholder="What needs to be done?"
            className="task-input"
            disabled={isLoading}
            maxLength={500}
          />
          <button
            type="submit"
            className="add-button"
            disabled={isLoading || !taskText.trim()}
          >
            {isLoading ? (
              <span className="loading-spinner"></span>
            ) : (
              '+ Add'
            )}
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default TaskInput;
