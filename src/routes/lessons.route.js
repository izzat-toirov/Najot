import express from 'express';
import { LessonsController } from '../controller/lessons_of_courses.controller.js';
import { TeacherGuard } from '../middleware/teacher.guard.js';
import { AdminGuard } from '../middleware/admin.guard.js';
import { JwtAuthGuard } from '../middleware/jwt-auth.guard.js';

const router = express.Router();
const controller = new LessonsController();

router
  .post('/', JwtAuthGuard, TeacherGuard, controller.create)
  .post('/token', controller.signIn)
  .get('/', JwtAuthGuard, TeacherGuard, controller.getAll)
  .get('/:id', JwtAuthGuard, TeacherGuard, controller.getById)
  .put('/:id', JwtAuthGuard, AdminGuard, controller.uptade)
  .delete('/:id', JwtAuthGuard, AdminGuard, controller.delete);

export default router;
