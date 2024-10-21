const Blog = require('../models/blogs.model');

/** 
 * @desc Get specific blog
 * @route GET /api/blogs/:id
 * @access Private
 */

const getSpecificBlog = async(req, res, next) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findById(id)

    if (!blog) {
      res.status(404);
      throw new Error('Blog with given id not found')
    }

    return res.status(200).json(blog)

  } catch (err) {
    next(err)
  }
}

/** 
 * @desc Get all saved blogs
 * @route GET /api/blogs
 * @access Private
 */

const getAllBlogs = async (req, res, next) => {

  try {
    const blogs = await Blog.find()
    return res.status(200).json(blogs)
  } catch (err) {
    next(err)
  }
}

/** 
 * @desc Create new blog
 * @route POST /api/blogs
 * @access Private
 */

const createBlog = async (req, res, next) => {

  const { title, content } = req.body

  try {

    const blog = await Blog.create({
      author: req.user.id,
      title,
      content
    })

    return res.status(201).json(blog)

  } catch (err) {
    next(err)
  }

}

/** 
 * @desc Update blog using id
 * @route PUT /api/blogs/:id
 * @access Private
 */

const updateBlog = async (req, res, next) => {

  const { id } = req.params
  const { title, content } = req.body

  try {

    const blog = await Blog.findById(id)

    if (!blog) {
      res.status(404)
      throw new Error("Blog with given id not found")
    }

    if (blog.author.toString() !== req.user.id) {
      res.status(401)
      throw new Error("Unauthorized. Can only modify/delete your own blogs.")
    }

    await Blog.findByIdAndUpdate(id, { title, content }, { new: true })

    return res.status(200).json({
      message: "Updated blog successfully"
    })

  } catch (err) {
    next(err)
  }
}

/** 
 * @desc Delete blog using id
 * @route DELETE /api/blogs/:id
 * @access Private
 */

const deleteBlog = async (req, res, next) => {

  const { id } = req.params
  
  try {
    const blog = await Blog.findById(id)

    if (!blog) {
      res.status(404)
      throw new Error("Blog with given id not found")
    }

    if (blog.author.toString() !== req.user.id) {
      res.status(401)
      throw new Error("Unauthorized. Can only modify/delete your own blogs.")
    }

    await blog.deleteOne();

    return res.status(204).json({
      message: "Blog deleted successfully"
    })

  } catch (err) {
    next(err)
  }
}

module.exports = { getSpecificBlog, getAllBlogs, createBlog, updateBlog, deleteBlog }