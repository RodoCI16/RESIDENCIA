// server/db.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error al conectar a PostgreSQL:', err.stack);
  }
  console.log('Conexión exitosa a la base de datos h_mazahua en PostgreSQL');
  release();
});

module.exports = pool;