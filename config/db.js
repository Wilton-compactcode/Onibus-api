// Arquivo de conexão com MongoDB usando o mongoose
// O código de conexão será inserido diretamente no arquivo principal da sua aplicação

// Não é mais necessário esse arquivo para a conexão com o MongoDB

// Caso queira configurar alguma outra opção para o mongoose, você pode fazer diretamente no arquivo principal da aplicação.
// Exemplo:
mongoose.connect('mongodb://localhost:27017/onibus', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});
