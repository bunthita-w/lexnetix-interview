const express = require('express');
const router = express.Router();
const { getAllTasks, getTaskById, createTask, updateTask, deleteTask } = require('../controllers/tasksController');
const { createTaskValidation, updateTaskValidation, validate } = require('../validators/tasksValidator');
const authenticateToken = require('../middleware/authentication');

router.get('/', authenticateToken, getAllTasks);

router.get('/:taskId', authenticateToken, getTaskById);

router.post('/', authenticateToken, createTaskValidation, validate, createTask);

router.put('/:taskId', authenticateToken, updateTaskValidation, validate, updateTask);

router.delete('/:taskId', authenticateToken, deleteTask);

module.exports = router;