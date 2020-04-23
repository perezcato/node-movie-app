
const env = process.env.APP_ENV || 'development';
const knex = require('./knexfile')[env];

module.exports = require('knex')(knex);
