const express = require('express')
const router = express.Router()
const { getSpecificBlog, getAllBlogs, createBlog, updateBlog, deleteBlog } = require('../controllers/blog.controller');

// Retrieve blog using id
router.get('/:id', getSpecificBlog)

// Get all blogs
router.get('/', getAllBlogs)

// Create blog
router.post('/', createBlog)

// Update blog using id
router.put('/:id', updateBlog)

// Delete blog using id
router.delete('/:id', deleteBlog)

module.exports = router;