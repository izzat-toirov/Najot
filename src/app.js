import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';
import GroupController from './routes/group.route.js';
import StaffController from './routes/staff.route.js';
import StudentController from './routes/student.route.js';
import CourseController from './routes/course.route.js';
import Staff_CourseController from './routes/staff_course.route.js';
import LessonsController from './routes/lessons.route.js';
import Homework_Controller from './routes/homewrok.route.js';
import Enrollment_Controller from './routes/enrollment.route.js';
import Payment_Controller from './routes/payment.route.js';
import logger from './utils/logger/logger.js';
import upload from './utils/multer.js';
import { swaggerSpec, swaggerUi } from './docs/swagger.js';

config();

const app = express();
const PORT = +process.env.PORT;
connectDB();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const rootDir = path.resolve(__dirname, '..');

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Image is required' });

  res.send({
    url: `http://localhost:${PORT}/uploads/${req.file.filename}`,
  });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/groups', GroupController);
app.use('/staff', StaffController);
app.use('/students', StudentController);
app.use('/course', CourseController);
app.use('/staff_course', Staff_CourseController);
app.use('/lessons', LessonsController);
app.use('/homework', Homework_Controller);
app.use('/enrollment', Enrollment_Controller);
app.use('/payment', Payment_Controller);

process.on('uncaughtException', (err) => {
  if (err) console.log(`Uncaught exception: ${err}`);
  process.exit(1);
});

process.on('unhandledRejection', (reasion, promise) => {
  console.log(`Unhandled rejection: ${reasion}`);
});

app.use((err, req, res, next) => {
  if (err) {
    return res
      .status(500)
      .json({ error: err.message || 'Internal server error' });
  } else {
    return next();
  }
});

app.listen(PORT, logger.info(`Server running on port ${PORT}`));
