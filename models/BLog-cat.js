const mongoose = require('mongoose')

const BlogCategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('BlogCategory', BlogCategorySchema)
