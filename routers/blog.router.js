const express = require('express')
const router = express.Router()
const { getSpecificBlog, getAllBlogs, createBlog, updateBlog, deleteBlog } = require('../controllers/blog.controller');
const { protect } = require('../middlewares/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Blogs
 *   description: API for managing Blogs
 */

/**
 * @swagger
 *  paths:
 *   /api/blogs/{id}:
 *    get:
 *     components:
 *      securitySchemes:
 *        bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 *     security:
 *      - bearerAuth: []
 *     tags: [Blogs]
 *     summary: Get a specific blog
 *     description: Get a blog using the given id from the database
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Id of the blog
 *        schema:
 *          type: string
 *     responses:
 *      200:
 *        description: Retrieves blog with given id
 *      401:
 *        description: Unauthorized access
 *      404:
 *        description: Not Found error
 *      500:
 *        description: Other error
 */
router.get('/:id', getSpecificBlog)

/**
 * @swagger
 *  paths:
 *   /api/blogs:
 *    get:
 *     components:
 *      securitySchemes:
 *        bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 *     security:
 *      - bearerAuth: []
 *     tags: [Blogs]
 *     summary: Get all blogs
 *     description: Get all blogs from database
 *     responses:
 *      200:
 *        description: Retrieves all saved blogs
 *      401:
 *        description: Unauthorized access
 *      500:
 *        description: Other error
 */
router.get('/', getAllBlogs)

/**
 * @swagger
 *  paths:
 *   /api/blogs:
 *    post:
 *     components:
 *      securitySchemes:
 *        bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 *     security:
 *      - bearerAuth: []
 *     tags: [Blogs]
 *     summary: Create new blogs
 *     description: Add a new blog
 *     requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *         type: object
 *         properties:
 *          title:
 *           type: string
 *           description: title of the blog
 *           example: Sample title
 *          content: 
 *           type: string
 *           description: Content of the blog
 *           example: This is a new blog created 
 *     responses:
 *      201:
 *        description: Saves new blog into the DB
 *      401:
 *        description: Unauthorized access
 *      500:
 *        description: Other error
 */
router.post('/', protect, createBlog)

/**
 * @swagger
 *  paths:
 *   /api/blogs/{id}:
 *    put:
 *     components:
 *      securitySchemes:
 *        bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 *     security:
 *      - bearerAuth: []
 *     tags: [Blogs]
 *     summary: Update a specific blog
 *     description: Update a blog using the given id
 *     requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *         type: object
 *         properties:
 *          title:
 *           type: string
 *           description: title of the blog
 *           example: Updated title
 *          content: 
 *           type: string
 *           description: Content of the blog
 *           example: Updated blog content
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Id of the blog
 *        schema:
 *          type: string
 *     responses:
 *      200:
 *        description: Updates blog with given id
 *      401:
 *        description: Unauthorized access
 *      404:
 *        description: Not Found error
 *      500:
 *        description: Other error
 */
router.put('/:id', protect, updateBlog)

/**
 * @swagger
 *  paths:
 *   /api/blogs/{id}:
 *    delete:
 *     components:
 *      securitySchemes:
 *        bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 *     security:
 *      - bearerAuth: []
 *     tags: [Blogs]
 *     summary: Delete a specific blog
 *     description: Delete a blog using the given id
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Id of the blog
 *        schema:
 *          type: string
 *     responses:
 *      204:
 *        description: Retrieves blog with given id
 *      401:
 *        description: Unauthorized access
 *      404:
 *        description: Not Found error
 *      500:
 *        description: Other error
 */
router.delete('/:id', protect, deleteBlog)

module.exports = router;