import app from './app';
import { connectDB, disconnectDB } from './config/db';

const PORT = process.env.PORT || 5000;

/**
 * Start Server
 * Initialize database connection and start Express server
 */
const startServer = async (): Promise<void> => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Start Express server
    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📝 API Documentation: http://localhost:${PORT}/`);
      console.log(`⚡ Environment: ${process.env.NODE_ENV || 'development'}`);
    });

    // Graceful shutdown handler
    const gracefulShutdown = async (signal: string): Promise<void> => {
      console.log(`\n${signal} received. Closing server gracefully...`);
      
      server.close(async () => {
        console.log('✅ HTTP server closed');
        await disconnectDB();
        process.exit(0);
      });

      // Force shutdown after 10 seconds
      setTimeout(() => {
        console.error('⚠️  Forcing shutdown after timeout');
        process.exit(1);
      }, 10000);
    };

    // Listen for termination signals
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();
