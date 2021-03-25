const { Pool } = require('pg')

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'tanaya@98',
    port: 5432,
    database: 'todo_app_db'
})

module.exports = pool