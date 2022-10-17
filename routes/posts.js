const express = require('express')
const router = express.Router()
const mongoose = require('mongoose') 

// AUTH MIDDLEWARE ============================================================================================
const JWTAuth = require('../backend-user/middleware/auth.middleware')

// MODELS  ====================================================================================================
const Blog_Repo = require('../models/Blog')
const Blog_Category = require('../models/BLog-cat')
const Blog_Views = require('../models/Post-views')
const Blog_Comments = require('../models/Comments')
const Blog_Media = require('../models/media')

// UTILITY FUNCTIONS ==========================================================================================
const { responseFormat, responseFormat_error } = require('../utils/response-format')
const { uploadImages, uploadGallery, uploadVideos, deleteUploadImages, deleteUploadVideos } = require('../utils/upload-media')

// ROUTES ====================================================================================================
// BLOG POST VIEW COUNTER
// @desc    Couunt post views
// @route   GET /posts/:id
router.get('/count/:id', JWTAuth, async (req, res) => {
  try {
    let post = await Blog_Views.findOne({ post_id: req.params.id }).lean()

    if (!post) throw "blog post not found !"

    const view_count = post.view_count + 1

    const bodyUpdated = { post_id: post.post_id, view_count, like_count: post.like_count }

    await Blog_Views.findOneAndUpdate({ _id: req.params.id }, bodyUpdated, {
      new: true,
      runValidators: true,
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

// BLOG POST RESET VIEW COUNT 
// @desc    Resete Count post views
// @route   GET /posts/:id
router.get('/count/reset/:id', async (req, res) => {
  try {
    let post = await Blog_Views.findOne({ post_id: req.params.id }).lean()

    if (!post) throw "blog post not found !"

    const view_count = 0

    const bodyUpdated = { post_id: post.post_id, view_count, like_count: post.like_count }

    await Blog_Views.findOneAndUpdate({ _id: req.params.id }, bodyUpdated, {
      new: true,
      runValidators: true,
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

// @desc    Add new posts
// @route   POST /posts/new
router.post('/new', async (req, res) => {
  try {

    if (!req.body) {
      return console.log("No files were uploaded.")
    }

    const { title, body, category, status, file, gallery, video, setFeaturedImg } = req.body // Request body
    console.log(video, setFeaturedImg);
    const post_id = new mongoose.mongo.ObjectId()
    const user = "630d8a50d47e86b6ff35e6bd"

    // CHECK IF POST ALREADY EXISTS 
    const blogTitleExists = await Blog_Repo.findOne({ title: title })

    if (blogTitleExists)  throw "title already exists"

    // PROCESS IMAGE START
    const post_image = await uploadImages(file, post_id, setFeaturedImg)
    // // PROCESS IMAGE END 

    // // // PROCESS GALLERRY START
    const post_gallery = await uploadGallery(gallery, post_id, setFeaturedImg)
    // // // PROCESS GALLERRY END 

    // // PROCESS VIDEO START
    const post_video = await uploadVideos(video, post_id, setFeaturedImg)
    // // PROCESS VIDEO END


    // // PROCESS FEATURED IMAGE START
    var featured_image = setFeaturedImg === "featured_video" ? post_video : "" || setFeaturedImg === "featured_img" ? post_image : "" || setFeaturedImg === "featured_gallery" ? post_gallery : ""

    const newBlogPost = { // UPLOAD BLOG  OBJECT
      post_id,
      title,
      body,
      category,
      status,
      user,
      featured_image
    }

    await Blog_Repo.create(newBlogPost) // SAVE TO DATABASE 

    res.json( // RESPONSE AFTER SAVE TO DB 
      responseFormat(
        res_status = "succes",
        message = "Post " + title + " successfuly added",
        data_title = title,
        user_id = user,
      )
    )


  } catch (error) {
    console.log(error);
    res.json(
      responseFormat_error(
        res_status = "fail",
        error
      )
    )
  }
})

// @desc    Get all posts
// @route   GET /posts
router.get('/get', async (req, res) => {
  try {
    const posts = await Blog_Repo.find({ status: 'public' })
      .populate('user')
      .sort({ createdAt: 'desc' })
      .lean()

    res.json({
      posts
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

// @desc    Get  post
// @route   GET /posts/:id
router.get('/get/:id', async (req, res) => {
  try {

    let post = await Blog_Repo.findById(req.params.id).populate('user').lean()

    res.json({
      post
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

// @desc    Update post
// @route   PUT /posts/update/:id
router.post('/update/:id', async (req, res) => {
  try {

    if (!req.body) {
      return console.log("No files were uploaded.")
    }
  
    const { title, body, category, status, file, gallery, video, setFeaturedImg } = req.body // Request body
    console.log(req.body );
    
    const post_id = new mongoose.mongo.ObjectId()
    const user = "630d8a50d47e86b6ff35e6bd"

    // CHECK IF POST ALREADY EXISTS 
    const blogPost = await Blog_Repo.findOne({ _id: req.params.id })

    if (!blogPost)  throw "Blog post does not exists"

    // // PROCESS IMAGE START
    const post_image = await uploadImages(file, post_id, setFeaturedImg)
    // // PROCESS IMAGE END 

    // // PROCESS GALLERRY START
    const post_gallery = await uploadGallery(gallery, post_id, setFeaturedImg)
    // // PROCESS GALLERRY END 

    // // PROCESS VIDEO START
    const post_video = await uploadVideos(video, post_id, setFeaturedImg)
    // // PROCESS VIDEO END


    // // PROCESS FEATURED IMAGE START
    var featured_image = setFeaturedImg === "featured_video" ? post_video : "" || setFeaturedImg === "featured_img" ? post_image : "" || setFeaturedImg === "featured_gallery" ? post_gallery : ""

    const UpdateBlogPost_Body = { // // UPLOAD BLOG  OBJECT
      title: title === '' ? blogPost.title : title,
      body: body === '' ? blogPost.body : body,
      category: category === '' ? blogPost.category : category,
      status: status === '' ? blogPost.status : status, 
      featured_image: featured_image === '' ? blogPost.featured_image : featured_image
    }

    await Blog_Repo.findOneAndUpdate({ _id: req.params.id }, UpdateBlogPost_Body, { // // UPDATE BLOG POST
      new: true,
      runValidators: true,
    })

    res.json(
      responseFormat(
        res_status = "succes",
        message = "Post " + req.body.title + " successfuly updated",
        data_title = req.body.title,
        user_id = req.body.user,
      )
    )

  } catch (error) {
    res.json(
      responseFormat_error(
        res_status = "fail",
        error
      )
    )
  }
})

// @desc    Delete post
// @route   DELETE /posts/delete/:id
router.delete('/delete/:id', async (req, res) => {
  try {
    // Check for blog posts
    let post = await Blog_Repo.findById(req.params.id).lean()
    if (!post) throw "blog post not found !"

    // DELETE POST COMMENTS
    let comments = await Comments_Repo.find({ post_id: req.params.id }) // CHECK FOR COMMENTS
    if (comments) await Blog_Comments.remove({ post_id: req.params.id }) // DELETE COMMENTS

    deleteUploadImages(post._id) // DELETE POST IMAGES 

    deleteUploadVideos(post._id) // DELETE POST VIDEOS

    await Blog_Repo.remove({ _id: req.params.id }) // Delete blog post 

    res.json(
      responseFormat(
        res_status = "succes",
        message = "Post " + post.title + " successfuly Deleted",
        data_title = post.title, 
      )
    )

  } catch (error) {
    res.json(
      responseFormat_error(
        res_status = "fail",
        error
      )
    )
  }
})

// @desc    User posts
// @route   GET /posts/user/:userId
router.get('/user/:userId', async (req, res) => {
  try {
    const posts = await Blog_Repo.find({
      user: req.params.userId
    })
      .populate('user')
      .lean()

    res.json({
      posts
    })

  } catch (err) {
    res.json(
      responseFormat_error(
        res_status = "fail",
        error
      )
    )
  }
})

// @desc    Search posts
// @route   POST /posts
router.post('/search/', async (req, res) => {
  try {
    if (!req.body) {
      return console.log("No files were uploaded.")
    }
    console.log(req.body)
    const { filter, category } = req.body
    var regex = new RegExp(filter, 'i')

    if (category) {
      const blogPosts = await Blog_Repo.find({ title: regex, category: category })
        .populate('title')
        .sort({ createdAt: 'desc' })
        .lean()

      res.json({
        blogPosts,
        filter,
        posts_length: blogPosts.length,
      })

    }
    else {
      const blogPosts = await Blog_Repo.find({ title: regex })
        .populate('title')
        .sort({ createdAt: 'desc' })
        .lean()

      res.json({
        blogPosts,
        filter,
        posts_length: blogPosts.length,

      })

    }

  } catch (error) {
    res.json(
      responseFormat_error(
        res_status = "fail",
        error
      )
    )
  }
})

// POST CATEGORIES ===================================================================================================
// @desc    Show all categories
// @route   GET /get/cats
router.get('/cats/get', async (req, res) => {
  try {
    const categories = await Blog_Category.find()
      .populate('title')
      .sort({ createdAt: 'desc' })
      .lean()

    res.json({
      categories
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


// @desc    Show all categories
// @route   GET /get/cats
router.get('/cats/get/:id', async (req, res) => {
  try {

    if (!req.params.id) throw "empty search"

    const category = await Blog_Category.findOne({ _id: req.params.id })

    if (category === null) throw "no categories found"

    res.json({
      category
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

// @desc    Process add new category
// @route   POST /new/cat
router.post('/new/cat', async (req, res) => {
  try {

    if (!req.body) throw console.log("No files were uploaded.")

    const { title } = req.body

    // CHECK IF POST ALREADY EXISTS 
    const catTitleExists = await Blog_Category.find({ title: title })

    if (catTitleExists.length !== 0) throw "title already exists"

    await Blog_Category.create(req.body)

    res.json(
      responseFormat(
        res_status = "success",
        message = "Category  " + title + " successfuly created",
        data_title = title
      )
    )

  } catch (error) {
    res.json(
      responseFormat_error(
        res_status = "fail",
        error
      )
    )

  }
})

// @desc    Process update category
// @route   POST /update/cat/:id
router.post('/update/cat/:id', async (req, res) => {
  try {

    if (!req.body) throw console.log("No files were uploaded.")

    const { title } = req.body

    let post = await Blog_Category.findById(req.params.id).lean()

    // CHECK IF CATEGORY ALREADY EXISTS 
    if (post === []) throw "title does not exist."

    await Blog_Category.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    })

    res.json(
      responseFormat(
        res_status = "success",
        message = "Category  " + title + " successfuly created",
        data_title = title,
      )
    )

  } catch (error) {
    res.json(
      responseFormat_error(
        res_status = "fail",
        error
      )
    )

  }
})


// @desc    Process delete category
// @route   POST /delete/cat/:id
router.delete('/delete/cat/:id', async (req, res) => {
  try {

    if (!req.params.id) throw "n request parameteres"

    let post = await Blog_Category.findById(req.params.id).lean()

    if (!post) throw " Post not found"

    if (post._id != req.params.id) {

      throw " Post not found"

    } else {

      await Blog_Category.deleteOne({ _id: req.params.id })

      res.json(
        responseFormat(
          res_status = "success",
          message = "Category  " + post.title + " successfuly deleted",
          data_title = post.title
        )
      )
    }

  } catch (error) {
    res.json(
      responseFormat_error(
        res_status = "fail",
        error
      )
    )

  }
})

// POST MEDIA ===========================================================================================================
// @desc    Get post video
// @route   GET /video/get/:id'
router.get('/video/get/:id', async (req, res) => {
  try {

    const media = await Blog_Media.findOne({ Blog_Media: req.params.id, media_type: "video" })
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
// @route   GET /gallery/get/:id
router.get('/gallery/get/:id', async (req, res) => {
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
// @route   GET /img/get/:id
router.get('/img/get/:id', async (req, res) => {
  try {

    const media = await Blog_Media.findOne({ Blog_Media: req.params.id, media_type: "image" })
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
