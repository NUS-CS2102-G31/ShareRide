require('dotenv').config();

const { Pool } = require('pg');

const isProduction = process.env.NODE_ENV == 'production';
console.log(isProduction)
const connectionString = `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DATABASE}`;

const pool = new Pool({
    connectionString: isProduction ? process.env.DATABASE_URL: connectionString,
    // ssl: isProduction
});

module.exports = {
    pool
}