const router = require('express').Router();
const { Client } = require('pg');

// Conexão com o banco de dados PostgreSQL
const client = new Client({
  connectionString: process.env.DATABASE_URL, // Defina a variável de ambiente DATABASE_URL com a URL de conexão do PostgreSQL
  ssl: {
    rejectUnauthorized: false,
  },
});

// Conexão com o PostgreSQL e criação da tabela "items" (caso ela não exista)
(async () => {
  try {
    await client.connect();
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS items (
        id SERIAL PRIMARY KEY,
        name VARCHAR(200) NOT NULL,
        rg VARCHAR(15) NOT NULL,
        days VARCHAR(200) NOT NULL,
        event VARCHAR(100) NOT NULL,
        observation VARCHAR(200) NULL
      )
    `;
    await client.query(createTableQuery);
  } catch (err) {
    console.error('Erro ao conectar ao PostgreSQL ou criar a tabela:', err);
  }
})();

// ... (restante do código)

module.exports = router;
