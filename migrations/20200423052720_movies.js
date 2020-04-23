
exports.up = (knex) => knex.schema.createTable('movies', (table) => {
  table.increments('id');
  table.string('title').notNullable();
  table.string('description').notNullable();
  table.string('cover').nullable();
  table.decimal('imdb_rating').nullable();
  table.date('release_data').nullable();
  table.timestamps();
});

exports.down = (knex) => knex.schema.dropTableIfExists('movies');
