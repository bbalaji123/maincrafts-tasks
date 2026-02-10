import { useState } from 'react';
import { Plus } from 'lucide-react';

/**
 * TaskForm Component
 * Handles task creation with validation and priority/status selection
 */
const TaskForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    status: 'pending'
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Task title is required';
    } else if (formData.title.length > 200) {
      newErrors.title = 'Title cannot exceed 200 characters';
    }

    if (formData.description.length > 1000) {
      newErrors.description = 'Description cannot exceed 1000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const result = await onSubmit(formData);
    
    if (result.success) {
      // Reset form on success
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        status: 'pending'
      });
      setErrors({});
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-group">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="What needs to be done? ✨"
          className={`form-input ${errors.title ? 'error' : ''}`}
          disabled={loading}
          maxLength={200}
        />
        {errors.title && <span className="error-message">{errors.title}</span>}
      </div>

      <div className="form-group">
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Add details or notes (optional)"
          className={`form-textarea ${errors.description ? 'error' : ''}`}
          disabled={loading}
          rows={3}
          maxLength={1000}
        />
        {errors.description && <span className="error-message">{errors.description}</span>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="priority" className="form-label">Priority</label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="form-select"
            disabled={loading}
          >
            <option value="low">🟢 Low</option>
            <option value="medium">🟡 Medium</option>
            <option value="high">🔴 High</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="status" className="form-label">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="form-select"
            disabled={loading}
          >
            <option value="pending">⏳ Pending</option>
            <option value="completed">✅ Completed</option>
          </select>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading || !formData.title.trim()}
        >
          <Plus size={20} />
          <span>{loading ? 'Adding...' : 'Add Task'}</span>
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
