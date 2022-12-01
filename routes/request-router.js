const express = require('express')
const router = express.Router()
const auth = require('../auth/authManager')
const RequestController = require('../controllers/request-controller')

router.post('/sendRequest', RequestController.createRequest)
router.delete('/deleteRequest', RequestController.deleteRequest)
router.put('/getRequest', RequestController.getRequest)
module.exports = router