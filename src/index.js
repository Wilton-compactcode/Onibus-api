const express = require('express');
const db = require('./db.js');
const clientesRouter = require('./clietesController');

const app = express();
const PORT = 443; // Defina a porta que deseja usar

// Middleware para permitir o uso do body parser para interpretar o corpo das requisições
app.use(express.json());

// Rotas
app.use('/api', clientesRouter); // Prefixo "/api" para todas as rotas definidas em clientesController

// Rota de teste
app.get('/', (req, res) => {
  res.send('API funcionando corretamente.');
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
