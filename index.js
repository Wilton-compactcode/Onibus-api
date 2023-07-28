const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const clientesRouter = require('./controller/clietesController');


const app = express();
const PORT = 5000; // Defina a porta que deseja usar

// Middleware para permitir o uso do body parser para interpretar o corpo das requisições
app.use(express.json());

// Conexão com o MongoDB
//mongoose.connect('mongodb://127.0.0.1:27017/onibus', {
mongoose.connect('mongodb+srv://barrobranco:AOU104@onibus.xljsivj.mongodb.net/onibus?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Conexão com o MongoDB estabelecida.');
  })
  .catch((err) => {
    console.error('Erro ao conectar ao MongoDB:', err);
  });

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