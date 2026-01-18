import React, { useState } from 'react';
import { Task } from '../services/api';

interface TaskItemProps {
  task: Task;
  onDelete: (id: string) => Promise<void>;
  onUpdate: (id: string, text: string) => Promise<void>;
  onToggleComplete: (id: string) => Promise<void>;
}

/**
 * TaskItem Component
 * Displays a single task in a clean card layout with edit and delete functionality
 */
const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete, onUpdate, onToggleComplete }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>(task.text);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [isToggling, setIsToggling] = useState<boolean>(false);

  /**
   * Format date to readable format
   */
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInHours * 60);
      return diffInMinutes <= 1 ? 'Just now' : `${diffInMinutes} minutes ago`;
    } else if (diffInHours < 24) {
      const hours = Math.floor(diffInHours);
      return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
      });
    }
  };

  /**
   * Handle task deletion
   */
  const handleDelete = async (): Promise<void> => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setIsDeleting(true);
      await onDelete(task._id);
    }
  };

  /**
   * Handle edit mode toggle
   */
  const handleEdit = (): void => {
    setIsEditing(true);
    setEditText(task.text);
  };

  /**
   * Handle save edited task
   */
  const handleSave = async (): Promise<void> => {
    if (editText.trim() && editText.trim() !== task.text) {
      setIsUpdating(true);
      await onUpdate(task._id, editText.trim());
      setIsUpdating(false);
      setIsEditing(false);
    } else if (editText.trim() === task.text) {
      setIsEditing(false);
    }
  };

  /**
   * Handle cancel edit
   */
  const handleCancel = (): void => {
    setIsEditing(false);
    setEditText(task.text);
  };

  /**
   * Handle key press in edit mode
   */
  const handleKeyPress = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  /**
   * Handle completion toggle
   */
  const handleToggle = async (): Promise<void> => {
    setIsToggling(true);
    await onToggleComplete(task._id);
    setIsToggling(false);
  };

  return (
    <div className={`task-item ${isDeleting ? 'deleting' : ''} ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <button 
          className={`task-icon ${isToggling ? 'toggling' : ''}`}
          onClick={handleToggle}
          disabled={isDeleting || isToggling}
          title={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {task.completed ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="8" fill="currentColor" stroke="currentColor" strokeWidth="2"/>
              <path d="M6 10l2.5 2.5L14 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2"/>
            </svg>
          )}
        </button>
        <div className="task-text-wrapper">
          {isEditing ? (
            <div className="task-edit-wrapper">
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={handleKeyPress}
                className="task-edit-input"
                autoFocus
                disabled={isUpdating}
              />
              <div className="task-edit-actions">
                <button
                  onClick={handleSave}
                  className="btn-save"
                  disabled={isUpdating || !editText.trim()}
                >
                  {isUpdating ? '...' : 'Save'}
                </button>
                <button
                  onClick={handleCancel}
                  className="btn-cancel"
                  disabled={isUpdating}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <p className="task-text">{task.text}</p>
              <span className="task-timestamp">{formatDate(task.createdAt)}</span>
            </>
          )}
        </div>
      </div>
      {!isEditing && (
        <div className="task-actions">
          <button
            onClick={handleEdit}
            className="btn-edit"
            title="Edit task"
            disabled={isDeleting}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </button>
          <button
            onClick={handleDelete}
            className="btn-delete"
            title="Delete task"
            disabled={isDeleting}
          >
            {isDeleting ? (
              <span className="loading-spinner-small"></span>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                <line x1="10" y1="11" x2="10" y2="17"/>
                <line x1="14" y1="11" x2="14" y2="17"/>
              </svg>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
