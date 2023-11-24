// test/todoController.test.js

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app'); // Assuming your app instance is exported from app.js
const Todo = require('../../models/todo');
const User = require('../../models/user');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Todo API Tests', () => {
  // Clear the Todo and User collections before each test
  beforeEach(async () => {
    await Todo.deleteMany({});
    await User.deleteMany({});
  });

  it('should get all todos', async () => {
    const res = await chai.request(app).get('/todos');
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
  });

  it('should create a new todo', async () => {
    const user = new User({ username: 'testuser', password: 'testpassword' });
    await user.save();

    const newTodo = { title: 'Test Todo', description: 'This is a test todo', userId: user._id };
    const res = await chai.request(app).post('/todos').send(newTodo);
    expect(res).to.have.status(201);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('title', 'Test Todo');
  });

  it('should get a todo by ID', async () => {
    const user = new User({ username: 'testuser', password: 'testpassword' });
    await user.save();

    const todo = new Todo({ title: 'Test Todo', description: 'This is a test todo', user: user._id });
    await todo.save();

    const res = await chai.request(app).get(`/todos/${todo._id}`);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('title', 'Test Todo');
  });

  it('should update a todo by ID', async () => {
    const user = new User({ username: 'testuser', password: 'testpassword' });
    await user.save();

    const todo = new Todo({ title: 'Test Todo', description: 'This is a test todo', user: user._id });
    await todo.save();

    const updatedTodoData = { title: 'Updated Todo', description: 'This is an updated todo' };
    const res = await chai.request(app).put(`/todos/${todo._id}`).send(updatedTodoData);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('title', 'Updated Todo');
  });

  it('should delete a todo by ID', async () => {
    const user = new User({ username: 'testuser', password: 'testpassword' });
    await user.save();

    const todo = new Todo({ title: 'Test Todo', description: 'This is a test todo', user: user._id });
    await todo.save();

    const res = await chai.request(app).delete(`/todos/${todo._id}`);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('title', 'Test Todo');
  });
});
