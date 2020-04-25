const response = require('supertest');
const app = require('../app');


describe('User Controller Test', () => {
  test('User can sign up with credentials', () => {
    const userDetails = {
      email: 'perezcatoc@gmail.com',
      password: 'perez2000',
    };

    const userToken = response(app).post('/api/signup')
      .send(userDetails)
      .expect(201);
    expect(userToken.body).toBe('string');
  });
});
