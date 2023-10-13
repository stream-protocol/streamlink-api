// db.js
const { Pool } = require('pg');
const { DATABASE_URL } = require('../config'); // You should store your database URL in a config file

const pool = new Pool({
    connectionString: DATABASE_URL,
});

pool.connect()
    .then(() => {
        console.log('Connected to PostgreSQL');
    })
    .catch((err) => {
        console.error('Error connecting to PostgreSQL:', err);
    });

module.exports = pool;