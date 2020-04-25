const express = require('express');

const {
  getMovies, createMovie, deleteMovie, getMovie, updateMovie, upload,
} = require('../controllers/MoviesController');

const { signUp, signIn, protect } = require('../controllers/UserController');


// User routes for
const router = express.Router();
router.post('/signup', signUp);
router.post('/signin', signIn);

// Movie Routes
router.use('/movies', protect);
router.get('/movies', getMovies)
  .post('/movies', upload.single('movie_cover'), createMovie);

router.get('/movies/:id', getMovie)
  .put('/movies/:id', updateMovie)
  .delete('/movies/:id', deleteMovie);

module.exports = router;
