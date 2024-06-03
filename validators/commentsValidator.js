const { check, validationResult } = require('express-validator');

exports.createCommentValidation = [
    check('taskId').notEmpty().withMessage('Task is required'),
    check('comment').notEmpty().withMessage('Comment is required')
];

exports.updateCommentValidation = [
    check('comment').notEmpty().withMessage('Comment is required')
];

exports.validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
};