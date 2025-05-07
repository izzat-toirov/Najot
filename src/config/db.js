import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('DB connect');
  } catch (error) {
    console.log(`Error db ${error}`);
  }
};
