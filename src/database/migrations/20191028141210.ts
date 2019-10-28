import Knex from 'knex';

export const up = (knex: Knex) => {
  return knex.schema.createTable('t_routes', table => {
    table.uuid('id').primary();
    table.string('operating_airline', 2).notNullable();
    table
      .string('from', 3)
      .notNullable()
      .index();
    table
      .string('to', 3)
      .notNullable()
      .index();
    table.string('code_shares').nullable();
  });
};

export const down = (knex: Knex) => {
  return knex.schema.dropTableIfExists('t_routes');
};

export const config = {
  enableTransactions: false,
};
