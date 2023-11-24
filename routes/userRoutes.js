// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Get all users
router.get('/', userController.getAllUsers);

// Get a user by ID
router.get('/:userId', userController.getUserById);

// Create a new user
router.post('/', userController.createUser);

// Update a user by ID
router.put('/:userId', userController.updateUserById);

// Delete a user by ID
router.delete('/:userId', userController.deleteUserById);

module.exports = router;
