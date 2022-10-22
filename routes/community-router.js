const express = require('express')
const router = express.Router()
const auth = require('../auth')
const CommunityController = require('../controllers/community-controller')

//Queries
router.get('/community', auth.verify, CommunityController.getCommunitiesByIds)

//mutations
router.post('/community/', CommunityController.createCommunity)
router.put('/community/:id', auth.verify, CommunityController.updateCommunity)
router.delete('/community/:id', CommunityController.deleteCommunity)

module.exports = router