const express = require('express')
const moment = require('moment')
const router = express.Router() 

// MODELS ====================================================================================================
const Blog_Settings = require('../models/settings')

// UTILITY FUNCTIONS =========================================================================================
const { responseFormat, responseFormat_error } = require('../utils/response-format')

// ROUTES ====================================================================================================
// @desc    Process add posts
// @route   POST /posts
router.post('/new', async (req, res) => {
  try {

    const { title, value, type } = req.body 

    // CHECK IF POST ALREADY EXISTS 
    const Blog_Settings = await Blog_Repo.findOne({ title: title })

    

    await Blog_Settings.create(req.body)

      res.json(
        responseFormat(
          res_status = "succes",
          message = title + " Setting added successfuly",
          data_title = title,
          user_id = user,
        )
      )

  } catch (error) {
    responseFormat_error(
      res_status = "fail",
      error
    )
  }
})

// @desc    Show all posts
// @route   GET /posts
router.get('/get', async (req, res) => {
  try {
    const posts = await Blog_Settings.find({ status: 'public' })
      .populate('title')
      .sort({ title: 'desc' })
      .lean()

    res.json({
      posts
    })

  } catch (error) {

    responseFormat_error(
      res_status = "fail",
      error
    )

  }
})

// @desc    Show single posts
// @route   GET /posts/:id
router.get('/get/:id', async (req, res) => {
  try {

    let post = await Blog_Settings.findById(req.params.id).populate('title').lean()

    res.json({
      post
    })

  } catch (error) {

    responseFormat_error(
      res_status = "fail",
      error
    )
  }
})

// @desc    Update post
// @route   PUT /posts/update/:id
router.post('/update/:id', async (req, res) => {
  try {
    let settings = await Blog_Repo.findById(req.params.id).lean()

    const { title, value, type } = req.body 

    const bodyUpdated = { title, value, type }

    if (!settings) throw "blog post not found !"

    settings = await Blog_Settings.findOneAndUpdate({ _id: req.params.id }, bodyUpdated, {
      new: true,
      runValidators: true,
    })

    res.json(
      responseFormat(
        res_status = "succes",
        message = title + " Setting added successfuly",
        data_title = req.body.title,
        user_id = req.body.user,
      )
    )
  } catch (error) {
    responseFormat_error(
      res_status = "fail",
      error
    )
  }
})

// @desc    Delete post
// @route   DELETE /posts/delete/:id
router.delete('/delete/:id', async (req, res) => {
  try {
    let setting = await Blog_Settings.findById(req.params.id).lean()

    if (!setting) throw "blog post not found !"

    // Delete blog post 
    await Blog_Settings.remove({ _id: req.params.id })

  } catch (error) {
    responseFormat_error(
      res_status = "fail",
      error
    )
  }
})


module.exports = router
