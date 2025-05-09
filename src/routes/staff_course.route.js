import express from 'express';
import { Staff_CourseController } from '../controller/staff_couse.controller.js';

const router = express.Router();
const controller = new Staff_CourseController();

router
  .post('/', controller.create)
  .post('/token', controller.signIn)
  .get('/', controller.getAll)
  .get('/:id', controller.getById)
  .put('/:id', controller.uptade)
  .delete('/:id', controller.delete);

export default router;
