const { check, validationResult } = require('express-validator');

exports.createUserValidation = [
    check('username').notEmpty().withMessage('Username is required'),
    check('password').notEmpty().withMessage('Password is required'),
    check('email').notEmpty().withMessage('Email is required'),
    check('email').isEmail().withMessage('Must be a valid email')
]

exports.signInValidation = [
    check('email').notEmpty().withMessage('Email is required'),
    check('email').isEmail().withMessage('Must be a valid email'),
    check('password').notEmpty().withMessage('Password is required')
]

exports.updateUserValidation = [
    check('username').notEmpty().withMessage('Username is required')
]

exports.validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
};