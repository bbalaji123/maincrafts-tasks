import { ListTodo } from 'lucide-react';

/**
 * EmptyState Component
 * Displayed when no tasks are available
 */
const EmptyState = () => {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        <ListTodo size={64} />
      </div>
      <h3 className="empty-title">No tasks found</h3>
      <p className="empty-description">
        Create your first task to get started with your productivity journey! 🚀
      </p>
    </div>
  );
};

export default EmptyState;
