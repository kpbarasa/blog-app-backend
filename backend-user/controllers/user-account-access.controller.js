var session = require('express-session')
const moment = require('moment');
// const user = mongoose.model("User");
const sha256 = require("js-sha256");
const jwt = require("jwt-then");
const userDataModel = require('../../models/User')


// @desc    Register user 
// @route   POST /register
// @Model   /models/user.data.model 
exports.register = async (req, res) => {
  console.log(req.body);
  const { firstName, lastName, email, password } = req.body;
  console.log(password);

  const emailRegex = /@gmail.com|@yahoo.com|@hotmail.com|@live.com/;

  if (!emailRegex.test(email)) throw "Email is not supported from your domain.";
  if (password.length < 6) throw "Password must be atleast 6 characters long.";

  const userExists = await userDataModel.findOne({
    email,
    password: sha256(password + process.env.SALT),
  });

  if (userExists) throw "User with same email already exits.";

  const userData = new userDataModel({
    firstName,
    lastName,
    email,
    password: sha256(password + process.env.SALT),
    googleId: 0
  });

  await userData.save();

  res.json({
    message: "User [" + firstName + "] registered successfully!",
  });
};

// @desc    Log in  
// @route   POST /login
// @Model   /models/user.data.model 
exports.login = async (req, res, next) => {
  try {
    console.log(req.body);

    const { email, password } = req.body;
    console.log(email, password);

    const userData = await userDataModel.findOne({
      email,
      password: sha256(password + process.env.SALT),
    });

    console.log(userData);

    if (!userData) throw new Error("throw Email and Password did not match.");

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
        message: "User logged in successfully!",
        token,
      });

  } catch (Err) {

    let errMsg = Err;
    
    res.json({
      code: 404,
      error: errMsg.toString()
    });

  }

};

// @desc    Log in google 
// @route   POST /:userId/:token
// @Model   /models/user.data.model 
exports.loginGoogle = async (req, res) => {

  try {

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
        message: "User logged in successfully!",
        session:{session},
        token,
      });

    } catch (Err) {

      let errMsg = Err;
      
      res.json({
        code: 404,
        error: errMsg.toString()
      });

    }

};


// @desc    Log out user
// @route   POST /:userId/:token
exports.logout = async (req, res) => {

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

};


