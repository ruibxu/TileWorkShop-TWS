//considering deleting this file
const express = require('express')
const router = express.Router()
const auth = require('../auth/authManager')
const CommunityController = require('../controllers/shared-functions')

//Queries
router.get('/community', auth.verify, CommunityController.getCommunitiesByIds)

//mutations
router.put('/community/:id', auth.verify, CommunityController.updateCommunity)

module.exports = router