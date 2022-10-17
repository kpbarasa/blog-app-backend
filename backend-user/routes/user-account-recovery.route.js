const router = require('express').Router()

// MIDDLEWARE ====================================================================================================

const { auth } = require("../middleware/user-account-recovery.moddleware");

// CONTOLLERS ====================================================================================================
const userAccountRecovery = require('../controllers/user-account-recovery')


// Send password recovery email link
router.post('/recover/password', (userAccountRecovery.sendRecoveryEmail_link))

// Recive and update new password 
router.post('/passwordReset/:userId/:token', (userAccountRecovery.updateRecoveredPassword)) 




module.exports = router