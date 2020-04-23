
exports.up = (knex) => knex.schema.createTable('movies', (table) => {
  table.increments('id');
  table.string('title').notNullable();
  table.string('description').notNullable();
  table.string('cover').nullable();
  table.integer('imdb_rating').nullable();
  table.string('release_date').nullable();
  table.timestamps(true, true);
});

exports.down = (knex) => knex.schema.dropTableIfExists('movies');
