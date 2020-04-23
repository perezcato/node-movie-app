const Joi = require('@hapi/joi');

const movieValidator = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  cover: Joi.string(),
  imdb_rating: Joi.number(),
  release_date: Joi.date().iso(),
});

module.exports = movieValidator;
