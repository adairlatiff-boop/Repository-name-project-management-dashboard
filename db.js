


const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ippmis',
  password: '1234', // usa a tua password correta
  port: 5432,
});

module.exports = pool;