const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

const mongodbUri = process.env.MONGODB_URI;

// Conectar-se ao banco de dados usando a URL da variável de ambiente
mongoose.connect(mongodbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
.then(() => {
  console.log('Conectado ao MongoDB.');
})
.catch((error) => {
  console.error('Erro ao conectar ao MongoDB:', error);
});
