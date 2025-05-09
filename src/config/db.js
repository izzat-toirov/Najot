import mongoose from 'mongoose';
import logger from "../utils/logger/logger.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    logger.info('MongoDB connected successfully');
  } catch (error) {
    logger.error(`MongoDB connection error: ${error.message}`);
  }
};
