//// app.js

// Importa a instância do aplicativo Express e a configuração
const { app } = require('./config');

// Importa as rotas relacionadas aos usuários
const usuarioRoutes = require('./routes/usuarioRoutes');

// Define o caminho base para as rotas de usuários e associa o roteador de usuários
app.use('/api/usuarios', usuarioRoutes);

// Configuração da porta para a execução do servidor
const PORT = process.env.PORT || 3000;

// Inicia o servidor Node.js na porta especificada
app.listen(PORT, () => {
  console.log(`Servidor Node.js em execução na porta ${PORT}`);
});
