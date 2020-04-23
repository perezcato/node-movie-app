const express = require('express');
const knex = require('knex');

const router = express.Router();

/* GET home page. */
router.get('/movies', async (req, res, next) => {
  try {
    res.status(200);
    const movies = await knex.select(
      'id',
      'title',
      'description',
      'cover',
      'imdb_rating',
      'release_data',
    ).from('movies');
    res.json({
      movies,
    });
  } catch (e) {
    res.status(500);
    next(e);
  }
});

module.exports = router;
