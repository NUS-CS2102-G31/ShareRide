require('dotenv').config();
const { Pool } = require('pg');

const isProduction = process.env.NODE_ENV === 'production';
console.log(process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD)

const connectionString = `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DATABASE}`;

console.log(`Database url: ${process.env.DATABASE_URL}`);

const pool = new Pool({
    connectionString: isProduction ? process.env.DATABASE_URL: connectionString,
    // connectionString: 'postgres://zdvpgnfmxmigkd:cafb20f7565e9445c71776b77bfb03887f3cd68388e7516dbd7e29e0a95498c5@ec2-54-225-242-183.compute-1.amazonaws.com:5432/d9d1h9pupubihg'
    ssl: false
});

module.exports = {
    pool
}