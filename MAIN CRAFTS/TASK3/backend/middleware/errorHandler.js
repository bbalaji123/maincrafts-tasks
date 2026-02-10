/**
 * Centralized Error Handling Middleware
 * Catches all errors and sends consistent error responses
 */

const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.stack);

  // Default error response
  let error = {
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  };

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    error.message = Object.values(err.errors)
      .map(e => e.message)
      .join(', ');
    return res.status(400).json(error);
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    error.message = 'Duplicate field value entered';
    return res.status(400).json(error);
  }

  // Mongoose cast error (invalid ObjectId)
  if (err.name === 'CastError') {
    error.message = 'Resource not found';
    return res.status(404).json(error);
  }

  // Default 500 error
  res.status(err.statusCode || 500).json(error);
};

/**
 * 404 Not Found Handler
 * Catches requests to undefined routes
 */
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404).json({
    success: false,
    message: error.message
  });
};

module.exports = { errorHandler, notFound };
