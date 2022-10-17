const mongoose = require('mongoose')

const SysSettingsSchema = new mongoose.Schema({
  post_id: {
    type: String,
    required: true,
  },
  sys_title: {
    type: String,
    required: true,
  },
  sys_footer_text: {
    type: String,
    required: true,
  },
  sys_contacts_email: {
    type: String,
    required: true,
  },
  sys_contacts_phone_no: {
    type: Number,
    required: true,
  },
  sys_contacts_phone_no_alt: {
    type: Number,
    required: true,
  },
  fb_url: {
    type: String,
    required: true,
  },
  behance_url: {
    type: String,
    required: true,
  },
  twitter_url: {
    type: String,
    required: true,
  },
  instagram_url: {
    type: String,
    required: true,
  },
  pinterest_url: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('SysSettings', SysSettingsSchema)
