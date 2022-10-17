const mongoose = require('mongoose')

const CommentsSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  post_id: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Comments', CommentsSchema)
