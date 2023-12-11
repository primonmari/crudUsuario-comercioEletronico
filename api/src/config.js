// Importação das bibliotecas necessárias
const express = require('express'); // Express.js para criar a aplicação web
const mysql = require('mysql2'); // Módulo MySQL2 para comunicação com o banco de dados MySQL
const bodyParser = require('body-parser'); // Middleware para processar dados do corpo da requisição
const cors = require('cors'); // Middleware para habilitar o CORS (Cross-Origin Resource Sharing)

// Criação da instância da aplicação Express
const app = express();

// Configuração da conexão com o banco de dados MySQL
const connection = mysql.createConnection({
  host: 'localhost', // Endereço do servidor MySQL
  user: 'root', // Usuário do banco de dados
  password: '', // Senha do banco de dados
  database: 'sistema', // Nome do banco de dados
});

// Conexão ao banco de dados MySQL
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conexão ao banco de dados MySQL estabelecida');
});

// Configuração do middleware CORS
app.use(cors());

// Configuração dos middlewares para processamento de dados do corpo da requisição
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Exportação das instâncias da aplicação e da conexão para uso em outros arquivos
module.exports = { app, connection };
