

exports.up = function(knex) {
    return knex.schema.createTable("user_wrike", (table => {
        table.increments();
        table.string("wrike_id").notNullable();
        table.string("firstName").notNullable();
        table.string("lastName");
        table.timestamps(true,true)
    }))
};

exports.down = function(knex) {
    return knex.schema.dropTable("user_wrike")
};
