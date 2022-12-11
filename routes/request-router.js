const express = require('express')
const router = express.Router()
const auth = require('../auth/authManager')
const RequestController = require('../controllers/request-controller')

router.post('/sendRequest', RequestController.createRequest)
router.put('/deleteRequest', RequestController.deleteRequest)
router.put('/getRequest', RequestController.getRequest)
router.put('/getRequestbyId/:id', RequestController.getRequestById)
module.exports = router