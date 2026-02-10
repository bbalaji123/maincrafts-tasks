/**
 * Request Logging Middleware
 * Logs all incoming requests with method, URL, and timestamp
 */
const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
};

module.exports = requestLogger;
