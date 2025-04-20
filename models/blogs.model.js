const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  title: {
    type: String,
    required: [true, 'Blog Title cannot be empty']
  },
  content: {
    type: String,
    required: [true, 'Blog Content cannot be empty']
  },
  category: {
    type: String,
    required: [true, 'Category cannot be empty']
  },
  tags: {
    type: [String],
    default: []
  }
}, 
{
  timestamps: true
})

module.exports = mongoose.model('Blogs', blogSchema)