

require('dotenv').config();

const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'appuser',
  password: process.env.DB_PASSWORD || '1234',
  database: process.env.DB_NAME || 'ippmis',
  port: process.env.DB_PORT || 5432,
});

module.exports = pool;