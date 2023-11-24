// controllers/todoController.js

const Todo = require('../models/todo');
const User = require('../models/user');

// Get all todos
exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get todos for a specific user
exports.getTodosByUserId = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const todos = await Todo.find({ user: req.params.userId });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a todo by ID
exports.getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.todoId);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create a new todo
exports.createTodo = async (req, res) => {
  const { title, description, userId } = req.body;

  // Basic validation
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const newTodo = await Todo.create({
      title,
      description,
      user: userId,
    });

    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a todo by ID
exports.updateTodoById = async (req, res) => {
  const { title, description, completed } = req.body;

  // Basic validation
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.todoId,
      { title, description, completed },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a todo by ID
exports.deleteTodoById = async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.todoId);

    if (!deletedTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.json(deletedTodo);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
