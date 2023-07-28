const router = require('express').Router();
const { Client } = require('pg');

// Conexão com o banco de dados PostgreSQL
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Conexão com o PostgreSQL
client.connect()
  .then(() => {
    console.log('Conectado ao PostgreSQL com sucesso!');
    createTableIfNotExists();
  })
  .catch(err => {
    console.error('Erro ao conectar ao PostgreSQL:', err);
  });

// Função para criar a tabela "items" se ela não existir
const createTableIfNotExists = async () => {
  try {
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
    console.log('Tabela "items" criada ou já existente.');
  } catch (err) {
    console.error('Erro ao criar a tabela "items":', err);
  }
};

// Listar todos os itens
router.get('/items', async (req, res) => {
  try {
    const queryResult = await client.query('SELECT * FROM items');
    const items = queryResult.rows;
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao obter os itens.' });
  }
});

// Obter um item específico pelo ID
router.get('/items/:id', async (req, res) => {
  try {
    const itemId = req.params.id;
    const queryResult = await client.query('SELECT * FROM items WHERE id = $1', [itemId]);
    const item = queryResult.rows[0];

    if (!item) {
      res.status(404).json({ message: 'Item não encontrado.' });
    } else {
      res.json(item);
    }
  } catch (err) {
    res.status(500).json({ message: 'Erro ao obter o item.' });
  }
});

// Excluir um item pelo ID
router.delete('/items/:id', async (req, res) => {
  try {
    const itemId = req.params.id;
    const deleteQuery = 'DELETE FROM items WHERE id = $1';
    await client.query(deleteQuery, [itemId]);
    res.json({ message: 'Item excluído com sucesso.' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao excluir o item.' });
  }
});

// Criar um novo item
router.post('/items', async (req, res) => {
  const { name, rg, days, event, observation } = req.body;
  const insertQuery = `
    INSERT INTO items (name, rg, days, event, observation)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;

  try {
    const queryResult = await client.query(insertQuery, [name, rg, days, event, observation]);
    const savedItem = queryResult.rows[0];
    res.json(savedItem);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao salvar o item.' });
  }
});

// Atualizar um item pelo ID
router.patch('/items/:id', async (req, res) => {
  const itemId = req.params.id;
  const { name, rg, days, event, observation } = req.body;
  const updateQuery = `
    UPDATE items
    SET name = $1, rg = $2, days = $3, event = $4, observation = $5
    WHERE id = $6
    RETURNING *
  `;

  try {
    const queryResult = await client.query(updateQuery, [name, rg, days, event, observation, itemId]);
    const updatedItem = queryResult.rows[0];

    if (!updatedItem) {
      res.status(404).json({ message: 'Item não encontrado.' });
    } else {
      res.json(updatedItem);
    }
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar o item.' });
  }
});

module.exports = router;
