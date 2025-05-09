import express from 'express';
import { GroupController } from '../controller/group.controller.js';
import { AdminGuard } from '../middleware/admin.guard.js';
import { JwtAuthGuard } from '../middleware/jwt-auth.guard.js';

const router = express.Router();
const controller = new GroupController();

/**
 * @swagger
 * tags:
 *   name: Groups
 *   description: API for managing groups
 */

/**
 * @swagger
 * /groups/token:
 *   post:
 *     summary: Sign in to get JWT token
 *     tags: [Groups]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully signed in
 *       401:
 *         description: Unauthorized
 */
router.post('/token', controller.signIn);

/**
 * @swagger
 * /groups:
 *   post:
 *     summary: Create a new group
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - group_type
 *             properties:
 *               name:
 *                 type: string
 *               group_type:
 *                 type: string
 *     responses:
 *       201:
 *         description: Group created
 *       400:
 *         description: Invalid input
 */
router.post('/', JwtAuthGuard, AdminGuard, controller.create);

/**
 * @swagger
 * /groups:
 *   get:
 *     summary: Get all groups
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of groups
 */
router.get('/', JwtAuthGuard, AdminGuard, controller.getAll);

/**
 * @swagger
 * /groups/{id}:
 *   get:
 *     summary: Get a group by ID
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Group found
 *       404:
 *         description: Group not found
 */
router.get('/:id', JwtAuthGuard, AdminGuard, controller.getById);

/**
 * @swagger
 * /groups/{id}:
 *   put:
 *     summary: Update a group
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               group_type:
 *                 type: string
 *     responses:
 *       200:
 *         description: Group updated
 *       404:
 *         description: Group not found
 */
router.put('/:id', JwtAuthGuard, AdminGuard, controller.uptade);

/**
 * @swagger
 * /groups/{id}:
 *   delete:
 *     summary: Delete a group
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Group deleted
 *       404:
 *         description: Group not found
 */
router.delete('/:id', JwtAuthGuard, AdminGuard, controller.delete);

export default router;
