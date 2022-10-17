const express = require('express')
const passport = require('passport')
const router = express.Router()
const dotenv = require('dotenv')
const moment = require('moment');
const jwt = require("jwt-then");
require("dotenv").config(); 

// MIDDLEWARE ================================================================================================
const { catchErrors } = require("../handlers/errorHandler"); 
const JWTAuth = require('../backend-user/middleware/auth.middleware')

// MODELS ====================================================================================================
const User_Repo = require('../models/User')
const userDataModel = require('../models/User')

// UTILITY FUNCTIONS =========================================================================================
const { responseFormat_error } = require('../utils/response-format')

// ROUTES ====================================================================================================
// Load config
dotenv.config({ path: './config/config.env' })

// @desc    Auth with Google
// @route   GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
  async (req, res) => {

    const { googleId, displayName, firstName, lastName, createdAt } = req.user;

    const userData = await userDataModel.findOne({
      googleId,
      createdAt
    }); if (!userData) throw new Error("throw Email and Password did not match.");

    const token = await jwt.sign({ id: userData.id }, process.env.SECRET);

    // Create session 
    today = new Date(),
      session = req.session,
      session.sessId = userData.id,
      session.userId = userData.id,
      session.token = token,
      session.sessionStart = moment().format(),
      session.sessionEnd = 00,

      res.json({
        status: "success",
        message: "User logged in successfully session started @" + session.sessionStart + " !",
      });

  }
)

// @desc    Google auth callback
// @route   GET /auth/user
router.get('/user', async (req, res) => {

  try {

    const userData = await User_Repo.findOne({ _id: req.session.userId })
  
    if(!userData) throw "Error user not found"
  
    res.json(
      { userName: userData.displayName, fname: userData.firstName , lname: userData.lastName , image: userData.image , date: userData.createdAt  }
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

  // @desc    Logout user
  // @route   /auth/logout
  router.get('/logout', (req, res) => {

    req.logout(function (err) {

      try {

        // Clear session 
        today = new Date(),
          session = req.session,
          session.sessId = "",
          session.userId = "",
          session.token = "",
          session.sessionStart = "",
          session.sessionEnd = moment().format(),

          res.json({
            message: "Logged out successfully!"
          });

      } catch (error) {

        let errMsg = Err;

        res.json({
          code: 404,
          error: errMsg.toString()
        });

      }
    });

  })

  // @desc    Get user data
  // @route   GET /user
  router.get('/get/user/:id', JWTAuth, async (req, res) => {
    try {
      console.log(req.params.id);
      const userID = req.params.id;

      const userData = await User_Repo.findOne({ _id: userID })

      if (!userData) throw "User not found"

      res.json({
        userData
      })

    } catch (err) {
      console.error(err)
      // res.render('error/500')
    }
  })

  module.exports = router
