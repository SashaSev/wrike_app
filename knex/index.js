const knex = require('knex');
const knexFile = require('./knexfile').development;
const db = knex(knexFile);

exports.insertData = (tableName, data) => {

    return db(tableName)
        .insert(data);
}