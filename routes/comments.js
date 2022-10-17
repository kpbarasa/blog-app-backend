const express = require('express')
const router = express.Router()

// AUTH MIDDLEWARE  ==========================================================================================
const JWTAuth = require('../backend-user/middleware/auth.middleware')

// MODELS  ===================================================================================================
const Comments_Repo = require('../models/Comments')
const { responseFormat, responseFormat_error } = require('../utils/response-format')

// ROUTES ====================================================================================================
// @desc    Process new comment
// @route   Post comments/post
router.post('/post', JWTAuth, async (req, res) => {
  try {

    if (!req.body) {
      return console.log("No files were uploaded.");
    }
    

    const { post_id, comment } = req.body

    // CHECK IF COMMENT ALREADY EXISTS 
    const commentExists = await Comments_Repo.findOne({ comment: comment })

    if (commentExists) throw "comment already exists"

    const commentBody = { user: "6336983cdba2c49274874032", post_id, comment }

    console.log(commentBody);

    await Comments_Repo.create(commentBody)

    res.json(
      responseFormat(
        res_status = "succes",
        message = "comment " + comment + " successfuly added",
      )
    )

    // res.redirect('/dashboard')

  } catch (err) {

    console.error(err)
    // res.render('error/500')

  }
})

// @desc    Show all coments
// @route   GET comments/get
router.get('/get', async (req, res) => {
  try {
    const comments = await Comments_Repo.find({ status: 'public' })
      .populate('comment')
      .sort({ createdAt: 'desc' })
      .lean()

    res.json({
      comments
    })

    // res.render('posts/index', {
    //   posts,
    // })
  } catch (err) {
    console.error(err)
    // res.render('error/500')
  }
})

// @desc    Show comments filter post ID
// @route   GET comments/get/comment/:id
router.get('/get/comment/:id', JWTAuth, async (req, res) => {
  try {

    let comments = await Comments_Repo.find({ post_id: req.params.id }).populate('post_id').lean()

    if (!comments) throw "no comments available";
    res.json({ comments })

  } catch (err) {
    console.error(err)
    // res.render('error/404')
  }
})

// @desc    Show comments filter User ID
// @route   GET comments/get/user/:id
router.get('/get/user/:id', JWTAuth, async (req, res) => {
  try {

    let comments = await Comments_Repo.find({ user: req.params.id }).populate('post_id').lean()

    if (!comments) throw "no comments available";
    res.json({ comments })

  } catch (error) {
    responseFormat_error(
      res_status = "fail",
      error
    )
  }
})

// @desc    Edit comment
// @route   Post comments/update/:id
// router.get('/update/:id', JWTAuth, async (req, res) => {
//   try {
//     const post = await Comments_Repo.findOne({
//       _id: req.params.id,
//     }).lean()

//     if (!post) {
//       return res.render('error/404')
//     }

//     if (post.user != req.user.id) {
//       res.redirect('/posts')
//     } else {
//       res.render('posts/edit', {
//         post,
//       })
//     }
//   } catch (err) {
//     console.error(err)
//     return res.render('error/500')
//   }
// })

// @desc    Process delete category
// @route   POST comments/delete/:id
router.delete('/delete/:id', JWTAuth, async (req, res) => {
  try {


    let Comment = await Comments_Repo.findById(req.params.id).lean()

    if (!Comment) {
      throw " Post not found";
    }

    if (Comment._id != req.params.id) {
      throw " Post not found";
    } else {

      await Comments_Repo.deleteOne({ _id: req.params.id })

      res.json(
        responseFormat(
          res_status = "success",
          message = "Category  " + Comment.Comment + " successfuly deleted"
        )
      )
    }

  } catch (err) {

    console.error(err)
    // res.render('error/500')

  }
})


module.exports = router