const { check, validationResult } = require('express-validator');

exports.createTaskValidation = [
    check('title').notEmpty().withMessage('Title is required'),
    check('description').notEmpty().withMessage('Description is required'),
    check('status').isIn(['pending', 'in_progress', 'completed']).withMessage('Status must be one of the following: pending, in_progress, completed'),
    check('priority').isIn(['low', 'medium', 'high']).withMessage('Priority must be one of the following: low, medium, high'),
    check('dueDate').notEmpty().withMessage('Due Date is required')
];

exports.updateTaskValidation = [
    check('title').optional().notEmpty().withMessage('Title is required'),
    check('description').optional().notEmpty().withMessage('Description is required'),
    check('status').optional().isIn(['pending', 'in_progress', 'completed']).withMessage('Status must be one of the following: pending, in_progress, completed'),
    check('priority').optional().isIn(['low', 'medium', 'high']).withMessage('Priority must be one of the following: low, medium, high'),
    check('dueDate').optional().notEmpty().withMessage('Due Date is required')
];

exports.validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
};