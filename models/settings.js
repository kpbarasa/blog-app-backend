const mongoose = require('mongoose')

const MediaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  value: {
    type: mongoose.Schema.Types.ObjectId,
  },
  type: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('media', MediaSchema)
