import express from 'express';
import { StaffController } from '../controller/staff.controller.js';
import { JwtAuthGuard } from '../middleware/jwt-auth.guard.js';
import { AdminGuard } from '../middleware/admin.guard.js';

const router = express.Router();
const controller = new StaffController();

const body = [
  {
    full_name: 'Assad',
    phone: '+998939076215',
    email: 'asaddd@gmail.com',
    password: 'izzat1337',
    role: 'superadmin',
    is_active: 'true',
  },
];

router
  .post('/', JwtAuthGuard, AdminGuard, controller.create)
  .post('/signIn', controller.signIn)
  .post('/confirm', controller.confirmSigIn)
  .post('/token', controller.accessToken)
  .get('/', JwtAuthGuard, AdminGuard, controller.getAll)
  .get('/:id', JwtAuthGuard, AdminGuard, controller.getById)
  .put('/:id', JwtAuthGuard, AdminGuard, controller.uptade)
  .delete('/:id', JwtAuthGuard, AdminGuard, controller.delete);

export default router;
