import TaskItem from './TaskItem';
import EmptyState from './EmptyState';

/**
 * TaskList Component
 * Renders list of tasks with empty state handling
 */
const TaskList = ({ tasks, loading, onToggle, onEdit, onDelete }) => {
  if (loading) {
    return (
      <div className="task-list">
        {[1, 2, 3].map((n) => (
          <div key={n} className="task-skeleton">
            <div className="skeleton-circle"></div>
            <div className="skeleton-content">
              <div className="skeleton-line"></div>
              <div className="skeleton-line short"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;
