import { Filter, ArrowUpDown } from 'lucide-react';

/**
 * FilterBar Component
 * Provides filtering and sorting controls for tasks
 */
const FilterBar = ({ filters, onFilterChange, stats }) => {
  const handleFilterChange = (key, value) => {
    onFilterChange({ [key]: value });
  };

  return (
    <div className="filter-bar">
      <div className="filter-group">
        <Filter size={18} />
        <label htmlFor="status-filter" className="filter-label">Status:</label>
        <select
          id="status-filter"
          value={filters.status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          className="filter-select"
        >
          <option value="all">All ({stats.total})</option>
          <option value="pending">Pending ({stats.pending})</option>
          <option value="completed">Completed ({stats.completed})</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="priority-filter" className="filter-label">Priority:</label>
        <select
          id="priority-filter"
          value={filters.priority}
          onChange={(e) => handleFilterChange('priority', e.target.value)}
          className="filter-select"
        >
          <option value="all">All</option>
          <option value="high">🔴 High</option>
          <option value="medium">🟡 Medium</option>
          <option value="low">🟢 Low</option>
        </select>
      </div>

      <div className="filter-group">
        <ArrowUpDown size={18} />
        <label htmlFor="sort-filter" className="filter-label">Sort by:</label>
        <select
          id="sort-filter"
          value={filters.sortBy}
          onChange={(e) => handleFilterChange('sortBy', e.target.value)}
          className="filter-select"
        >
          <option value="createdAt">Date Created</option>
          <option value="updatedAt">Last Updated</option>
          <option value="title">Title</option>
          <option value="priority">Priority</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="order-filter" className="filter-label">Order:</label>
        <select
          id="order-filter"
          value={filters.order}
          onChange={(e) => handleFilterChange('order', e.target.value)}
          className="filter-select"
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>

      {stats.total > 0 && (
        <div className="completion-rate">
          <span className="completion-label">Completion:</span>
          <span className="completion-value">{stats.completionRate}%</span>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
