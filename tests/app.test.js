const response = require('supertest');
const app = require('../app');


test('should be able to get to the root route', async () => {
  await response(app).get('/api/movies')
    .expect(200);
});

test('should return a list of all movies from the database', async () => {
  const movies = await response(app).get('/api/movies').expect(200);
  expect(movies.body).not.toBeNull();
});

test('should be able to create a new movie in the database', async () => {
  //const movies = await response(app).post('/api/movies')
});
