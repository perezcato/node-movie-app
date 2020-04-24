const crypto = require('crypto');
const multer = require('multer');
const knex = require('../knex');
const movieValidator = require('../validators/movies.validate');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${process.cwd()}/movie-covers`);
  },
  filename: async (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    const filename = await crypto.createHmac('sha256', file.fieldname).update('movie').digest('hex');
    cb(null, `${filename}.${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) cb(null, true);
  else cb(new Error('Not an image'));
};

exports.upload = multer({
  storage,
  fileFilter,
});


exports.getMovies = async (req, res, next) => {
  try {
    res.status(200);
    const movies = await knex.select(
      'id',
      'title',
      'description',
      'cover',
      'imdb_rating',
      'release_date',
    ).from('movies');
    res.json({
      movies,
    });
  } catch (e) {
    res.status(500);
    next(e);
  }
};

exports.createMovie = async (req, res, next) => {
  try {
    const movieData = await movieValidator.validate(req.body);
    if (movieData.error) throw new Error(movieData.error);
    let movie;
    if (req.file) movie = { ...movieData.value, cover: `covers/${req.file.filename}` };
    else movie = { ...movieData.value};
    await knex('movies')
      .insert(movie);
    res.status(201);
    res.json({ message: 'movie added' });
  } catch (e) {
    next(e);
  }
};

exports.updateMovie = async (req, res, next) => {

};

exports.deleteMovie = async (req, res, next) => {
  try{
    const movieId = req.params.id;
    await knex('movies').where('id', movieId).del();
    res.status(204);
    res.send('');
    res.end();
  }catch (e) {
    next(e);
  }
};

exports.getMovie = async (req, res, next) => {
  try{
    const movieId = req.params.id;
    const movie = await knex('movies').where('id', movieId);
    res.status(200);
    res.json(movie);
  }catch (e) {
    next(e);
  }

};
