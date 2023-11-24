// test/userController.test.js

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app'); // Assuming your app instance is exported from app.js
const User = require('../../models/user');

chai.use(chaiHttp);
const expect = chai.expect;

describe('User API Tests', () => {
  // Clear the User collection before each test
  beforeEach(async () => {
    await User.deleteMany({});
  });

  it('should get all users', async () => {
    const res = await chai.request(app).get('/users');
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
  });

  it('should create a new user', async () => {
    const newUser = { username: 'testuser', password: 'testpassword' };
    const res = await chai.request(app).post('/users').send(newUser);
    expect(res).to.have.status(201);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('username', 'testuser');
  });

  it('should get a user by ID', async () => {
    const user = new User({ username: 'testuser', password: 'testpassword' });
    await user.save();

    const res = await chai.request(app).get(`/users/${user._id}`);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('username', 'testuser');
  });

  it('should update a user by ID', async () => {
    const user = new User({ username: 'testuser', password: 'testpassword' });
    await user.save();

    const updatedUserData = { username: 'updateduser', password: 'updatedpassword' };
    const res = await chai.request(app).put(`/users/${user._id}`).send(updatedUserData);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('username', 'updateduser');
  });

  it('should delete a user by ID', async () => {
    const user = new User({ username: 'testuser', password: 'testpassword' });
    await user.save();

    const res = await chai.request(app).delete(`/users/${user._id}`);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('username', 'testuser');
  });
});
