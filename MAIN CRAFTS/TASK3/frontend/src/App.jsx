import { useState } from 'react';
import { ListChecks, RefreshCw } from 'lucide-react';
import { useTasks } from './hooks/useTasks';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterBar from './components/FilterBar';
import StatsCard from './components/StatsCard';
import EditTaskModal from './components/EditTaskModal';
import ConfirmDialog from './components/ConfirmDialog';
import ErrorMessage from './components/ErrorMessage';
import './App.css';

/**
 * Main App Component
 * Orchestrates all task management functionality
 */
function App() {
  const {
    tasks,
    stats,
    loading,
    error,
    filters,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
    updateFilters,
    clearError,
    refreshTasks,
  } = useTasks();

  const [editingTask, setEditingTask] = useState(null);
  const [deletingTask, setDeletingTask] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [refreshMessage, setRefreshMessage] = useState('');

  // Handle task creation
  const handleCreateTask = async (taskData) => {
    const result = await createTask(taskData);
    return result;
  };

  // Handle task update
  const handleUpdateTask = async (id, taskData) => {
    const result = await updateTask(id, taskData);
    return result;
  };

  // Handle task deletion with confirmation
  const handleDeleteTask = (task) => {
    setDeletingTask(task);
  };

  const confirmDelete = async () => {
    if (!deletingTask) return;

    setIsDeleting(true);
    await deleteTask(deletingTask._id);
    setIsDeleting(false);
    setDeletingTask(null);
  };

  const cancelDelete = () => {
    if (!isDeleting) {
      setDeletingTask(null);
    }
  };

  // Handle status toggle
  const handleToggleStatus = async (id) => {
    await toggleTaskStatus(id);
  };

  // Handle edit dialog
  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  const closeEditModal = () => {
    setEditingTask(null);
  };

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    updateFilters(newFilters);
  };

  // Handle refresh
  const handleRefresh = async () => {
    setRefreshMessage('');
    await refreshTasks();
    
    // Show success message briefly
    setRefreshMessage('✅ Tasks refreshed successfully!');
    setTimeout(() => {
      setRefreshMessage('');
    }, 3000); // Clear after 3 seconds
  };

  return (
    <div className="app">
      {/* Background Image */}
      <div className="app-background"></div>

      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <div className="header-title">
            <ListChecks size={32} />
            <h1>Advanced Task Manager</h1>
          </div>
          <button 
            onClick={handleRefresh}
            className="refresh-btn"
            disabled={loading}
            aria-label="Refresh tasks"
            title="Refresh tasks"
          >
            <RefreshCw size={20} className={loading ? 'spin' : ''} />
          </button>
        </div>
        <p className="header-subtitle">
          Production-grade MERN Stack application with advanced features ⚡
        </p>
      </header>

      {/* Main Content */}
      <main className="app-main">
        <div className="container">
          {/* Error Message */}
          {error && <ErrorMessage message={error} onDismiss={clearError} />}

          {/* Success Message for Refresh */}
          {refreshMessage && (
            <div className="success-banner">
              <div className="success-content">
                <span>{refreshMessage}</span>
              </div>
            </div>
          )}

          {/* Statistics Cards */}
          <StatsCard stats={stats} />

          {/* Task Form */}
          <section className="section">
            <h2 className="section-title">✨ Create New Task</h2>
            <TaskForm onSubmit={handleCreateTask} loading={loading} />
          </section>

          {/* Filter Bar */}
          <section className="section">
            <h2 className="section-title">📋 Task List</h2>
            <FilterBar 
              filters={filters} 
              onFilterChange={handleFilterChange}
              stats={stats}
            />
            
            {/* Task List */}
            <TaskList
              tasks={tasks}
              loading={loading}
              onToggle={handleToggleStatus}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
            />
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>
          Built with 💜 using MERN Stack | React + Node.js + Express + MongoDB
        </p>
      </footer>

      {/* Modals */}
      <EditTaskModal
        task={editingTask}
        onClose={closeEditModal}
        onSave={handleUpdateTask}
      />

      <ConfirmDialog
        isOpen={!!deletingTask}
        title="Delete Task?"
        message={`Are you sure you want to delete "${deletingTask?.title}"? This action cannot be undone.`}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        loading={isDeleting}
      />
    </div>
  );
}

export default App;
