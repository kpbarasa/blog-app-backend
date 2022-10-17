const passport = require('passport')
const router = require('express').Router()

// MIDDLEWARE ====================================================================================================
const { catchErrors } = require("../handlers/errorHandler");
const { ensureAuth, ensureGuest } = require('../middleware/auth-session.middleware')

// CONTOLLERS ====================================================================================================
const userAuthAccessController = require('../controllers/user-account-access.controller')
const userAccountRecovery = require('../controllers/user-account-recovery.controller')


// Register user 
router.post('/register', (userAuthAccessController.register))

// Log in user  
// @controller   /controllers/user-auth-access.controller: {POST login}
router.post('/login', (userAuthAccessController.login)) //Log in user normal

// Log out user  
// @controller   /controllers/user-auth-access.controller: {POST logout}
router.get('/logout', (userAuthAccessController.loginGoogle)) //Logout user google

// router.post('/login/google', ())



// @desc    Auth with Google
// @route   GET /auth/google
router.get('/login/google', passport.authenticate('google', { scope: ['profile'] }))

// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {userAuthAccessController.login}
)



// Send password recovery email link
router.post('/recover/password', (userAccountRecovery.sendRecoveryEmail_link))

// Recive and update new password 
router.post('/passwordReset/:userId/:token', (userAccountRecovery.updateRecoveredPassword)) 

module.exports = router