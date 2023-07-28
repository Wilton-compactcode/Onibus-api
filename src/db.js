require('dotenv').config();
const router = require('express').Router();
const { Client } = require('pg');

// Conexão com o banco de dados PostgreSQL
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});



module.exports = router;
