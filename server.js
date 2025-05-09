import { config } from 'dotenv';
import { connectDB } from './src/config/db.js';
import logger from './src/utils/logger/logger.js';
import app from './src/app.js';

config();
const PORT = +process.env.PORT || 5000;

connectDB();

process.on('uncaughtException', (err) => {
  logger.error(`Uncaught Exception: ${err.message}`);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  logger.error(`Unhandled Rejection: ${reason}`);
});

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
