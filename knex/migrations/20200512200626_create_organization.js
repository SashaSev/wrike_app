// const knex = require("knex")


exports.up = function(knex) {
  return knex.schema.createTable("organization", (table => {
      table.increments();
      table.string("name").notNullable();
      table.string("status");
      table.timestamps(true,true)
  }))
};

exports.down = function(knex) {
      return knex.schema.dropTable("organization")
};
