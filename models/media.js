const mongoose = require('mongoose')

const MediaSchema = new mongoose.Schema({
  value: {
    type: String, 
    trim: true,
    // unique: true 
  },
  media_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  media_type: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('media', MediaSchema)
