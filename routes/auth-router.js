const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/auth-controller')

router.post('/register', AuthController.registerUser)
router.post('/login', AuthController.loginUser)
router.get('/logout', AuthController.logoutUser)
router.get('/loggedIn', AuthController.getLoggedIn)
router.put('/forgetPassword', AuthController.forgetPassword)
router.put('/changePassword', AuthController.changePassword)
router.put('/updateAccount/:id', AuthController.updateAccount)
router.put('/verifyAccount/:id', AuthController.verifyAccount)


module.exports = router