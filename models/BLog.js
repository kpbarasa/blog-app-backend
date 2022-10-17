const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema({
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true 
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  body: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  status: {
    type: String,
    default: 'public',
    enum: ['public', 'private'],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  featured_image: {
    type: mongoose.Schema.Types.ObjectId,
    type: String
  }
}, 
{timestamps: true}
)

module.exports = mongoose.model('Blog', BlogSchema)
