import express from 'express';
import { Homework_Controller } from '../controller/homework.controller.js';
import { TeacherGuard } from '../middleware/teacher.guard.js';
import { JwtAuthGuard } from '../middleware/jwt-auth.guard.js';
import { HomeworkGuard } from '../middleware/homework.guard.js';

const router = express.Router();
const controller = new Homework_Controller();

router
  .post('/', JwtAuthGuard, TeacherGuard, controller.create)
  .post('/token', controller.signIn)
  .get('/', JwtAuthGuard, HomeworkGuard, controller.getAll)
  .get('/:id', JwtAuthGuard, HomeworkGuard, controller.getById)
  .put('/:id', JwtAuthGuard, TeacherGuard, controller.uptade)
  .delete('/:id', JwtAuthGuard, TeacherGuard, controller.delete);

export default router;
