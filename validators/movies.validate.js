const Schema = require('validate.js');

const moviesValidate = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
  },
  imdb_rating: {
    type: Number,
  },
  release_data: {
    type: Date,
  },
});

module.exports = moviesValidate;
