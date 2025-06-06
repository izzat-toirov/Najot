import express from 'express';
import { CourseController } from '../controller/couse.controller.js';
import { JwtAuthGuard } from '../middleware/jwt-auth.guard.js';
import { AdminGuard } from '../middleware/admin.guard.js';
import { StudentGuard } from '../middleware/student.guard.js';

const router = express.Router();
const controller = new CourseController();

router
  .post('/', JwtAuthGuard, AdminGuard, controller.create)
  .post('/enroll/:id', JwtAuthGuard, StudentGuard, controller.enroll)
  .post('/token', controller.signIn)
  .get('/', JwtAuthGuard, AdminGuard, controller.getAll)
  .get('/:id', JwtAuthGuard, AdminGuard, controller.getById)
  .put('/:id', JwtAuthGuard, AdminGuard, controller.uptade)
  .delete('/:id', JwtAuthGuard, AdminGuard, controller.delete);

export default router;
