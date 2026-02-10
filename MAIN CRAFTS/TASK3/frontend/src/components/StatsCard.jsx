import { CheckCircle2, Clock, ListTodo, TrendingUp } from 'lucide-react';

/**
 * StatsCard Component
 * Displays task statistics in card format
 */
const StatsCard = ({ stats }) => {
  const cards = [
    {
      icon: <ListTodo size={24} />,
      label: 'Total Tasks',
      value: stats.total,
      color: '#3b82f6',
      bg: '#dbeafe'
    },
    {
      icon: <Clock size={24} />,
      label: 'Pending',
      value: stats.pending,
      color: '#f59e0b',
      bg: '#fef3c7'
    },
    {
      icon: <CheckCircle2 size={24} />,
      label: 'Completed',
      value: stats.completed,
      color: '#10b981',
      bg: '#d1fae5'
    },
    {
      icon: <TrendingUp size={24} />,
      label: 'Progress',
      value: `${stats.completionRate}%`,
      color: '#8b5cf6',
      bg: '#ede9fe'
    }
  ];

  return (
    <div className="stats-grid">
      {cards.map((card, index) => (
        <div key={index} className="stat-card" style={{ borderColor: card.color }}>
          <div className="stat-icon" style={{ backgroundColor: card.bg, color: card.color }}>
            {card.icon}
          </div>
          <div className="stat-content">
            <p className="stat-label">{card.label}</p>
            <p className="stat-value">{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCard;
