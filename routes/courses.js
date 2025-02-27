

const express = require('express');
const router = express.Router();

const {
  createCourse,
  deleteCourse,
  getAllCourse,
  updateCourse,
  getCourse,
} = require('../controllers/courses');


const upload = require('../middleware/upload');

/**
 * @swagger
 * /api/v1/courses:
 *   post:
 *     summary: Create a course
 *     description: Creates a course under the current user, who is a teacher.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the course
 *               description:
 *                 type: string
 *               pic:
 *                 type: string
 *                 format: binary
 *                 description: Course picture
 *               document:
 *                 type: string
 *                 format: binary
 *                 description: Course document
 *     responses:
 *       201:
 *         description: Course created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.route('/')
  .post(upload.fields([{ name: 'pic' }, { name: 'document' }]), createCourse)
  .get(getAllCourse);

/**
 * @swagger
 * /api/v1/courses/{id}:
 *   get:
 *     summary: Get course by ID
 *     description: Fetch details of a specific course.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course retrieved successfully
 *       404:
 *         description: Course not found
 *
 *   patch:
 *     summary: Update a course
 *     description: Updates the details of a specific course.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               pic:
 *                 type: string
 *                 format: binary
 *               document:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Course updated successfully
 *       400:
 *         description: Bad request
 *
 *   delete:
 *     summary: Delete a course
 *     description: Deletes a course by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course deleted successfully
 *       404:
 *         description: Course not found
 */
router.route('/:id')
  .get(getCourse)
  .delete(deleteCourse)
  .patch(upload.fields([{ name: 'pic' }, { name: 'document' }]), updateCourse);


module.exports = router;
