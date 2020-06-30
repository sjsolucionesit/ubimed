const path = require('path');
require('dotenv').config({
    path: path.join(__dirname, '../../.env')
})

module.exports = {
    PORT: process.env.PORT,
    API_MATCH: process.env.API_MATCH,
    DB_HOST: process.env.DB_HOST,
    DB_USER:process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    PORT_CREATE_USER: process.env.PORT_CREATE_USER
}