const express = require('express');
const router = express.Router()
const { registerUser, loginUser, getUser } = require('../controllers/user.controller');
const { protect } = require('../middlewares/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API for managing user registration and authentication
 */


/**
 * @swagger
 *  paths:
 *   /api/user/register:
 *    post:
 *     components:
 *      securitySchemes:
 *        bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 *     security:
 *      - bearerAuth: []
 *     tags: [Auth]
 *     summary: Register new user
 *     description: Registers a new user
 *     requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *         type: object
 *         properties:
 *          name:
 *           type: string
 *           description: Name of the user
 *           example: User name
 *          email: 
 *           type: string
 *           description: Email id of the user
 *           example: user1@email.com
 *          password: 
 *           type: string
 *           description: Password of the user
 *           example: string
 *     responses:
 *      201:
 *        description: Successfully registers new user
 *      400:
 *        description: User with given email id already exists
 *      401:
 *        description: Unauthorized access
 *      500:
 *        description: Other error
 */
router.post('/register', registerUser);

/**
 * @swagger
 *  paths:
 *   /api/user/login:
 *    post:
 *     components:
 *      securitySchemes:
 *        bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 *     security:
 *      - bearerAuth: []
 *     tags: [Auth]
 *     summary: Authenticates user
 *     description: Login for existing users
 *     requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *         type: object
 *         properties:
 *          email: 
 *           type: string
 *           description: Email id of the user
 *           example: user1@email.com
 *          password: 
 *           type: string
 *           description: Password of the user
 *           example: string
 *     responses:
 *      201:
 *        description: Successfully logged in user
 *      404:
 *        description: User with given email id not found
 *      401:
 *        description: Unauthorized access
 *      500:
 *        description: Other error
 */
router.post('/login', loginUser);

/**
 * @swagger
 *  paths:
 *   /api/user:
 *    get:
 *     components:
 *      securitySchemes:
 *        bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 *     security:
 *      - bearerAuth: []
 *     tags: [Auth]
 *     summary: Get user information
 *     description: Retrieves logged in user's information
 *     responses:
 *      200:
 *        description: Successfully retrieves user information
 *      401:
 *        description: Unauthorized access
 *      500:
 *        description: Other error
 */
router.get('/', protect, getUser)

module.exports = router;