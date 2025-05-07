import express from 'express';
import { GroupController } from '../controller/group.controller.js';
import { AdminGuard } from '../middleware/admin.guard.js';
import { JwtAuthGuard } from '../middleware/jwt-auth.guard.js';

const router = express.Router();
const controller = new GroupController();

router
  .post('/token', controller.signIn)
  .post('/', JwtAuthGuard, AdminGuard, controller.create)
  .get('/', JwtAuthGuard, AdminGuard, controller.getAll)
  .get('/:id', JwtAuthGuard, AdminGuard, controller.getById)
  .put('/:id', JwtAuthGuard, AdminGuard, controller.uptade)
  .delete('/:id', JwtAuthGuard, AdminGuard, controller.delete);

export default router;
