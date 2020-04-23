const response = require('supertest');
const app = require('../app');


test('should be able to get to the root route', async () => {
  await response(app).get('/api/movies')
    .expect(200);
});

test('should return a list of all movies from the database', async () => {
  const movies = await response(app).get('/api/movies').expect(200);
  expect(movies.body).not.toBeNull();
  console.log(movies.body);
});
