const express = require('express')
const router = express.Router()
const EmailController = require('../controllers/email-controller')

router.post('/confirmEmail/:id', EmailController.sendConfirmEmail)
router.post('/passwordReset/:id', EmailController.sendPasswordResetEmail)



module.exports = router