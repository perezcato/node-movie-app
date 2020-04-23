const express = require('express');

const {
  getMovies, createMovie, deleteMovie, getMovie, updateMovie, upload,
} = require('../controllers/MoviesController');


const router = express.Router();

router.get('/movies', getMovies);
router.post('/movies', upload.single('movie_cover'), createMovie);
router.get('/movies/:id', getMovie);
router.put('/movies/:id', updateMovie);
router.delete('/movies/:id', deleteMovie);

module.exports = router;
