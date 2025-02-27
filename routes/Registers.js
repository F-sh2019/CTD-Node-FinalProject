const express = require('express');
const router = express.Router();

const {
  createRegister,
  deleteRegister,
  getAllRegister,
  updateRegister,
  getRegister,
} = require('../controllers/registers');

/**
 * @swagger
 * /registers:
 *   post:
 *     summary: Create a new registration
 *     description: Register a student for a course
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentId:
 *                 type: string
 *                 description: The ID of the student
 *               courseId:
 *                 type: string
 *                 description: The ID of the course
 *     responses:
 *       201:
 *         description: Successfully registered
 *       400:
 *         description: Bad request
 *   get:
 *     summary: Get all registrations
 *     description: Retrieve a list of all registrations
 *     responses:
 *       200:
 *         description: Successfully retrieved
 *       401:
 *         description: Unauthorized
 */
router.route('/').post(createRegister).get(getAllRegister);

/**
 * @swagger
 * /registers/{id}:
 *   get:
 *     summary: Get a single registration
 *     description: Retrieve details of a registration by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Registration ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved
 *       404:
 *         description: Not found
 *   patch:
 *     summary: Update a registration
 *     description: Modify an existing registration
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Registration ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: New status of the registration
 *     responses:
 *       200:
 *         description: Successfully updated
 *       400:
 *         description: Bad request
 *   delete:
 *     summary: Delete a registration
 *     description: Remove a registration by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Registration ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted
 *       404:
 *         description: Not found
 */
router.route('/:id').get(getRegister).delete(deleteRegister).patch(updateRegister);

module.exports = router;
