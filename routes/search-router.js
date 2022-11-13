const express = require('express')
const router = express.Router()
const auth = require('../auth/authManager')
const SearchController = require('../controllers/search-controller')

router.get('/username/map', SearchController.getUsernameByIds)
router.get('/viewable/:type', SearchController.getViewableProjects)
router.get('/editable/:type', SearchController.getEditableProjects)
router.get('/favorite/:type', SearchController.getFavoriteProjects)
router.get('/name/:type', SearchController.searchProject)
router.get('/user', SearchController.searchUsers)
router.get('/user/:type', SearchController.searchProjectByUsers)
router.put('/search/:type', SearchController.searchProjects2)
router.get('/new/:id', SearchController.getWhatsNew)



module.exports = router