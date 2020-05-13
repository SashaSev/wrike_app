module.exports = {
    development: {
        client:"mysql",
        connection: {
            host : '127.0.0.1',
            user : 'root',
            password : '',
            database : 'test',
            charset: 'utf8'
        },
        migrations: {
            directory: './migrations',
        },
        seeds: {
            directory: __dirname + './knex/seeds'
        }
    }
}