const User = require("../../models/User");
// const mongoose = require('mongoose')
// const {User} = mongoose.model("User");
// const Token = require("../models/token");
const sendEmail = require("../utils/send-emails");
const crypto = require("crypto");
const jwt = require("jwt-then");
const sha256 = require("js-sha256");
const Joi = require("joi");


// @desc    Send password recovery email link
// @route   POST /recover/password
const sendRecoveryEmail_link = async (req, res) => {
    try {

        const schema = Joi.object({ email: Joi.string().email().required() });

        const { error } = schema.validate(req.body);

        if (error) throw new Error(error.details[0].message);

        const userData = await User.findOne({ email: req.body.email });
        if (!userData) throw new Error("user with given email doesn't exist");

        // let token = await Token.findOne({ userId: userData._id });
        // if (!token) {
        //     token = await new Token({
        //         userId: userData._id,
        //         token: crypto.randomBytes(32).toString("hex"),
        //     }).save();
        // }

        let token = crypto.randomBytes(32).toString("hex");
        console.log(token);

        const link = `${process.env.BASE_URL}/password-reset/${userData._id}/${token}`;

        sendEmail(userData.email, "Password reset", link, "recovery", token.toString());

        res.send("password reset link sent to your email account");

    } catch (error) {

        let errMsg = Err;
        
        res.json({
          code: 400,
          error: errMsg.toString()
        });
  
    }
};

// @desc    Recive and update new password 
// @route   POST /:userId/:token
// @Model   /models/user.data.model 
const updateRecoveredPassword = async (req, res) => {
    try {
        let userId = req.params.userId;
        let tempToken = req.params.token;

        const schema = Joi.object({ password: Joi.string().required() });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = await User.findById(req.params.userId);

        if (!user) throw new Error('invalid link or expired');

        // const token = await Token.findOne({
        //     userId: user._id,
        //     token: req.params.token,
        // });
        // if (!token) return res.status(400).send("Invalid link or expired");

        user.password = req.body.password;
        // await user.save();
        // await token.delete();

        await User.findOne({userId: user._id})
        .then(updtUser => { 

          updtUser.password = sha256(user.password  + process.env.SALT),
  
          updtUser.save()

        })

        res.send("password reset sucessfully.");

    } catch (error) {

        let errMsg = Err;
        
        res.json({
          code: 400,
          error: errMsg.toString()
        });
  
    }
};

module.exports = { updateRecoveredPassword, sendRecoveryEmail_link };