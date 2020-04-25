
exports.up = (knex) => knex.schema.table('movies', (table) => {
  table.foreign('user_id').references('id').inTable('users');
});

exports.down = (knex) => knex.Schema.table('movies', (table) => {
  table.dropForeign('user_id');
});
