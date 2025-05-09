import express from 'express';
import { Enrollment_Controller } from '../controller/enrollment.controller.js';
import { JwtAuthGuard } from '../middleware/jwt-auth.guard.js';
import { AdminGuard } from '../middleware/admin.guard.js';

const router = express.Router();
const controller = new Enrollment_Controller();

router
  .post('/', JwtAuthGuard, AdminGuard, controller.create)
  .post('/token', controller.signIn)
  .get('/', JwtAuthGuard, AdminGuard, controller.getAll)
  .get('/:id', JwtAuthGuard, AdminGuard, controller.getById)
  .put('/:id', JwtAuthGuard, AdminGuard, controller.uptade)
  .delete('/:id', JwtAuthGuard, AdminGuard, controller.delete);

export default router;
