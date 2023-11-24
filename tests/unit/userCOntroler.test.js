// tests/unit/userController.test.js

const chai = require('chai');
const sinon = require('sinon');
const UserController = require('../../controllers/userController');
const User = require('../../models/user');

const expect = chai.expect;

describe('User Controller Tests', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should handle errors when getting all users', async () => {
    const error = new Error('Internal Server Error');
    const findStub = sinon.stub(User, 'find').rejects(error);
    const req = {};
    const res = {
      json: sinon.stub(),
      status: sinon.stub().returnsThis(),
    };

    await UserController.getAllUsers(req, res);

    expect(findStub.calledOnce).to.be.true;
    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWith({ error: 'Internal Server Error' })).to.be.true;
  });

  it('should handle errors when creating a new user', async () => {
    const error = new Error('Internal Server Error');
    const createStub = sinon.stub(User, 'create').rejects(error);
    const req = { body: { username: 'testuser', password: 'testpassword' } };
    const res = {
      json: sinon.stub(),
      status: sinon.stub().returnsThis(),
    };

    await UserController.createUser(req, res);

    expect(createStub.calledOnce).to.be.true;
    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWith({ error: 'Internal Server Error' })).to.be.true;
  });

  // Add more tests for other CRUD operations and edge cases
});
