const express = require('express');
const router = express.Router();
const { getAllComments, getCommentById, createComment
    , updateComment, deleteComment, deleteCommentByTaskId } = require('../controllers/commentsController');
const { createCommentValidation, updateCommentValidation, validate } = require('../validators/commentsValidator');
const authenticateToken = require('../middleware/authentication');


router.get('/', authenticateToken, getAllComments);

router.get('/:commentId', authenticateToken, getCommentById);

router.post('/', authenticateToken, createCommentValidation, validate, createComment);

router.put('/:commentId', authenticateToken, updateCommentValidation, validate, updateComment);

router.delete('/:commentId', authenticateToken, deleteComment);

router.delete('/', authenticateToken, deleteCommentByTaskId);

module.exports = router;