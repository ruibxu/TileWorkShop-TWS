const express = require('express')
const router = express.Router()
const EmailController = require('../controllers/email-controller')

router.put('/comfirmEmail/:id', EmailController.sendComfrimEmail)
router.put('/passwordReset/:id', EmailController.sendPasswordResetEmail)



module.exports = router