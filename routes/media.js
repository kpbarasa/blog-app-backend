const express = require('express')
const moment = require('moment')
const router = express.Router()
const mongoose = require('mongoose')
const fs = require('fs')

// MIDDLEWARE ================================================================================================
const JWTAuth = require('../backend-user/middleware/auth.middleware')

// MODELS ====================================================================================================
const Blog_Media = require('../models/media')

// UTILITY FUNCTIONS =========================================================================================
const { responseFormat_error } = require('../utils/response-format')

// ROUTES ====================================================================================================
// POST MEDIA
// @desc    Get post video
// @route   GET /media/video/get/:id
router.get('/get/:id', JWTAuth, async (req, res) => {
  try {

    const media = await Blog_Media.findOne({ _id: req.params.id, media_type: "video" })
      .populate('value')
      .sort({ value: 'desc' })
      .lean()

    res.json({
      media
    })

  } catch (error) {

    res.json(
      responseFormat_error(
        res_status = "fail",
        error
      )
    )

  }
})

// @desc    Get post gallery
// @route   GET /media/gallery/get/:id
router.get('/gallery/get/:id', JWTAuth, async (req, res) => {
  try {

    const media = await Blog_Media.find({ Blog_Media: req.params.id, media_type: "gallery" })
      .populate('value')
      .sort({ value: 'desc' })
      .lean()

    res.json({
      media
    })

  } catch (error) {

    res.json(
      responseFormat_error(
        res_status = "fail",
        error
      )
    )

  }
})

// @desc    Get post image
// @route   GET /media/img/get/:id
router.get('/img/get/:id', JWTAuth, async (req, res) => {
  try {

    const media = await Blog_Media.find({ _id: req.params.id, media_type: "image" })
      .populate('value')
      .sort({ createdAt: 'desc' })
      .lean()

    res.json({
      media
    })

  } catch (error) {

    res.json(
      responseFormat_error(
        res_status = "fail",
        error
      )
    )

  }
})

module.exports = router
