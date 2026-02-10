import { Check, CheckCircle2, Clock, Pencil, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

/**
 * TaskItem Component
 * Displays individual task with actions (edit, delete, toggle status)
 */
const TaskItem = ({ task, onToggle, onEdit, onDelete }) => {
  const priorityColors = {
    low: '#10b981',
    medium: '#f59e0b',
    high: '#ef4444'
  };

  const priorityEmojis = {
    low: '🟢',
    medium: '🟡',
    high: '🔴'
  };

  const handleToggle = async () => {
    await onToggle(task._id);
  };

  const handleEdit = () => {
    onEdit(task);
  };

  const handleDelete = () => {
    onDelete(task);
  };

  const timeAgo = formatDistanceToNow(new Date(task.createdAt), { addSuffix: true });

  return (
    <div className={`task-item ${task.status === 'completed' ? 'completed' : ''}`}>
      <div className="task-checkbox">
        <button
          onClick={handleToggle}
          className="checkbox-btn"
          aria-label={`Mark task as ${task.status === 'completed' ? 'pending' : 'completed'}`}
        >
          {task.status === 'completed' ? (
            <CheckCircle2 size={24} className="icon-completed" />
          ) : (
            <div className="checkbox-empty"></div>
          )}
        </button>
      </div>

      <div className="task-content">
        <div className="task-header">
          <h3 className="task-title">{task.title}</h3>
          <div className="task-badges">
            <span 
              className="priority-badge"
              style={{ backgroundColor: `${priorityColors[task.priority]}20`, color: priorityColors[task.priority] }}
            >
              {priorityEmojis[task.priority]} {task.priority}
            </span>
            <span className="status-badge">
              {task.status === 'completed' ? (
                <>
                  <Check size={14} /> Completed
                </>
              ) : (
                <>
                  <Clock size={14} /> Pending
                </>
              )}
            </span>
          </div>
        </div>

        {task.description && (
          <p className="task-description">{task.description}</p>
        )}

        <div className="task-footer">
          <span className="task-time">Created {timeAgo}</span>
          <div className="task-actions">
            <button
              onClick={handleEdit}
              className="action-btn edit"
              aria-label="Edit task"
              title="Edit task"
            >
              <Pencil size={16} />
            </button>
            <button
              onClick={handleDelete}
              className="action-btn delete"
              aria-label="Delete task"
              title="Delete task"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
