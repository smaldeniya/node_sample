// tests/unit/todoController.test.js

const chai = require('chai');
const sinon = require('sinon');
const TodoController = require('../../controllers/todoController');
const Todo = require('../../models/todo');
const User = require('../../models/user');

const expect = chai.expect;

describe('Todo Controller Tests', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should handle errors when getting all todos', async () => {
    const error = new Error('Internal Server Error');
    const findStub = sinon.stub(Todo, 'find').rejects(error);
    const req = {};
    const res = {
      json: sinon.stub(),
      status: sinon.stub().returnsThis(),
    };

    await TodoController.getAllTodos(req, res);

    expect(findStub.calledOnce).to.be.true;
    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWith({ error: 'Internal Server Error' })).to.be.true;
  });

  it('should handle errors when creating a new todo', async () => {
    const error = new Error('Internal Server Error');
    const createStub = sinon.stub(Todo, 'create').rejects(error);
    const req = { body: { title: 'Test Todo', userId: 'someuserid' } };
    const res = {
      json: sinon.stub(),
      status: sinon.stub().returnsThis(),
    };

    await TodoController.createTodo(req, res);

    expect(createStub.calledOnce).to.be.false;
    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWith({ error: 'Internal Server Error' })).to.be.true;
  });

  it('should handle errors when getting a todo by ID', async () => {
    const error = new Error('Internal Server Error');
    const findByIdStub = sinon.stub(Todo, 'findById').rejects(error);
    const req = { params: { todoId: 'sometodoid' } };
    const res = {
      json: sinon.stub(),
      status: sinon.stub().returnsThis(),
    };

    await TodoController.getTodoById(req, res);

    expect(findByIdStub.calledOnce).to.be.true;
    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWith({ error: 'Internal Server Error' })).to.be.true;
  });

  // Add more tests for other CRUD operations and edge cases
});
