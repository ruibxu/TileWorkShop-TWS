const express = require('express')
const router = express.Router()
const auth = require('../auth')
const CommentController = require('../controllers/comment-controller')

//Queries
router.get('/comment/:id', auth.verify, CommentController.getCommentById)
router.get('/comments/:id', auth.verify, CommentController.getCommentsByLink)

//mutations
router.post('/comment', auth.verify, CommentController.createComment)
router.put('/comment/:id', auth.verify, CommentController.updateComment)
router.delete('/comment/:id', auth.verify, CommentController.deleteComment)

module.exports = router