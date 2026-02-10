import React from 'react';
import { Task } from '../services/api';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  onDeleteTask: (id: string) => Promise<void>;
  onUpdateTask: (id: string, text: string) => Promise<void>;
  onToggleComplete: (id: string) => Promise<void>;
}

/**
 * TaskList Component
 * Displays list of tasks with loading and error states
 */
const TaskList: React.FC<TaskListProps> = ({ tasks, isLoading, error, onDeleteTask, onUpdateTask, onToggleComplete }) => {
  /**
   * Render loading state
   */
  if (isLoading && tasks.length === 0) {
    return (
      <div className="task-list-state">
        <div className="loading-spinner-large"></div>
        <p className="state-message">Loading tasks...</p>
      </div>
    );
  }

  /**
   * Render error state
   */
  if (error) {
    return (
      <div className="task-list-state">
        <div className="error-icon">⚠️</div>
        <p className="state-message error">{error}</p>
        <p className="state-hint">Please make sure the backend server is running</p>
      </div>
    );
  }

  /**
   * Render empty state
   */
  if (tasks.length === 0) {
    return (
      <div className="task-list-state">
        <div className="empty-icon">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
            <path d="M32 20v24M20 32h24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.3"/>
          </svg>
        </div>
        <p className="state-message">No tasks yet</p>
        <p className="state-hint">Add your first task to get started</p>
      </div>
    );
  }

  /**
   * Render task list
   */
  return (
    <div className="task-list">
      <div className="task-list-header">
       
        
      </div>
      <div className="task-items">
        {tasks.map((task) => (
          <TaskItem 
            key={task._id} 
            task={task} 
            onDelete={onDeleteTask}
            onUpdate={onUpdateTask}
            onToggleComplete={onToggleComplete}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
