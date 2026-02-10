import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * MongoDB Connection Configuration
 * Establishes connection to MongoDB Atlas using Mongoose
 */
export const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    const conn = await mongoose.connect(mongoURI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`❌ MongoDB Connection Error: ${error.message}`);
    } else {
      console.error('❌ MongoDB Connection Error:', error);
    }
    process.exit(1);
  }
};

/**
 * Graceful shutdown handler for MongoDB connection
 */
export const disconnectDB = async (): Promise<void> => {
  try {
    await mongoose.connection.close();
    console.log('✅ MongoDB connection closed gracefully');
  } catch (error) {
    if (error instanceof Error) {
      console.error(`❌ Error closing MongoDB connection: ${error.message}`);
    }
  }
};
