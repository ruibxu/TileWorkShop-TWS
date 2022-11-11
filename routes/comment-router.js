const express = require('express')
const router = express.Router()
const auth = require('../auth/authManager')
const CommentController = require('../controllers/comment-controller')

//Queries
router.get('/comment/:id', CommentController.getCommentById)
router.get('/comments/:id', CommentController.getCommentsByLink)

//mutations
router.post('/comment', auth.verify, CommentController.createComment)
router.put('/comment/:id', auth.verify, CommentController.updateComment)
router.delete('/comment/:id', auth.verify, CommentController.deleteComment)

router.put('/comment/community/:id', auth.verify, CommentController.updateCommentCommunity)

module.exports = router