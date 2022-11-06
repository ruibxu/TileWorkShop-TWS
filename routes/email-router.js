const express = require('express')
const router = express.Router()
const EmailController = require('../controllers/email-controller')

router.put('/comfirmEmail', EmailController.sendComfrimEmail)
router.put('/passwordReset', EmailController.sendPasswordResetEmail)



module.exports = router