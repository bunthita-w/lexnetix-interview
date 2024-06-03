const express = require('express');
const router = express.Router();
const { createUser, signIn, updateUser, deleteUser, getUserById, getAllUsers, getMyProfile, updateMyProfile } = require('../controllers/usersController');
const { createUserValidation, signInValidation, updateUserValidation, validate } = require('../validators/usersValidator');
const authenticateToken = require('../middleware/authentication');

router.post('/signin', signInValidation, validate, signIn);

router.get('/me', authenticateToken, getMyProfile);

router.put('/me', authenticateToken, updateUserValidation, validate, updateMyProfile);

router.get('/', authenticateToken, getAllUsers);

router.get('/:userId', authenticateToken, getUserById);

router.post('/', authenticateToken, createUserValidation, validate, createUser);

router.put('/:userId', authenticateToken, updateUserValidation, validate, updateUser);

router.delete('/:userId', authenticateToken, deleteUser);

module.exports = router;