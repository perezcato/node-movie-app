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
  const createMovies = await response(app).post('/api/movies').send({
    title: 'the movie',
    description: 'description',
    imdb_rating: 31,
    release_date: '2020-12-03 00:00:00.000',
  }).expect(201);
  expect(createMovies.body).toStrictEqual({ message: 'movie added' });
});

test('deletes from the database', async () => {
  const deleteMovie = await response(app).delete('/api/movies/3').expect(204);
});
