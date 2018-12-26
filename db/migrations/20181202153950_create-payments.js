exports.up = async function(knex) {
  await knex.schema.createTable('payments', table => {
    table.increments('id');
    table.timestamp('date');
    table.decimal('amount');
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTable('payments');
};
