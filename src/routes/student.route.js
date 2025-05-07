import express from 'express';
import { StudentController } from '../controller/student.controller.js';

const router = express.Router();
const controller = new StudentController();

router
  .post('/', controller.create)
  .post('/token', controller.signIn)
  .get('/', controller.getAll)
  .get('/:id', controller.getById)
  .put('/:id', controller.uptade)
  .delete('/:id', controller.delete);

export default router;
