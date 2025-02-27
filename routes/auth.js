const express = require('express');
const router = express.Router();
const { register, login, getAllUsers, deleteUser } = require('../controllers/auth');

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account.
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
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/register', register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     description: Authenticates a user and returns a token.
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
 *         description: Successfully logged in
 *       401:
 *         description: Unauthorized
 */
router.post('/login', login);

/**
 * @swagger
 * /auth/getAllUsers:
 *   get:
 *     summary: Get all users
 *     description: Retrieves a list of all registered users.
 *     responses:
 *       200:
 *         description: A list of users
 */
router.get('/getAllUsers', getAllUsers);

/**
 * @swagger
 * /auth/deleteUser/{id}:
 *   delete:
 *     summary: Delete a user
 *     description: Removes a user by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.route('/deleteUser/:id').delete(deleteUser);

module.exports = router;
