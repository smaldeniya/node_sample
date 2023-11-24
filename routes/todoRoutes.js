// routes/todoRoutes.js

const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

// Get all todos
router.get('/', todoController.getAllTodos);

// Get todos for a specific user
router.get('/user/:userId', todoController.getTodosByUserId);

// Get a todo by ID
router.get('/:todoId', todoController.getTodoById);

// Create a new todo
router.post('/', todoController.createTodo);

// Update a todo by ID
router.put('/:todoId', todoController.updateTodoById);

// Delete a todo by ID
router.delete('/:todoId', todoController.deleteTodoById);

module.exports = router;
