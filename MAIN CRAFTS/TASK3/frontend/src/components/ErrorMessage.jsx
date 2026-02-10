import { AlertCircle } from 'lucide-react';

/**
 * ErrorMessage Component
 * Displays error messages with dismiss functionality
 */
const ErrorMessage = ({ message, onDismiss }) => {
  if (!message) return null;

  return (
    <div className="error-banner">
      <div className="error-content">
        <AlertCircle size={20} />
        <span>{message}</span>
      </div>
      {onDismiss && (
        <button onClick={onDismiss} className="error-dismiss">
          ×
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
