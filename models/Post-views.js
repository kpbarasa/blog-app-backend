const mongoose = require('mongoose')

const PostViewSchema = new mongoose.Schema({
  post_id: {
    type: String,
    required: true,
  },
  view_count: {
    type: Number,
    required: true,
  },
  like_count: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('PostViews', PostViewSchema)
