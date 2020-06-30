const mysql = require('mysql');
const { promisify } = require('util');
const { DB_HOST, DB_USER, DB_PASS } = require('./index.config');

const database = {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: 'UbimedV2'
};

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if (err) throw err;
    if (connection) {
        console.log(`Conectado a base de datos Host ${database.host}`);
    }
});

pool.query = promisify(pool.query); // pasar de callbacks a promesas

module.exports = {
    pool
}
