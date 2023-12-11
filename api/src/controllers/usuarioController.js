// atua como uma camada intermediária entre as rotas/endpoints da aplicação e o modelo

const UsuarioModel = require('../models/usuarioModel');

const salvarUsuario = (req, res) => {
  const { nome, email, senha, anoNascimento} = req.body;


  // Chame o método salvarUsuario do modelo
  UsuarioModel.salvarUsuario(nome, email, senha, anoNascimento, (err, resultado) => {
    if (err) {
      console.error('Erro ao salvar o Usuario:', err);
      return res.status(500).json({ error: 'Erro ao salvar o Usuario' });
    }
    res.status(200).json({ message: 'Usuario salvo com sucesso', resultado });
  });
};


const atualizarUsuario = (req, res) => {
  const { id, nome, email, senha, anoNascimento } = req.body;

  UsuarioModel.atualizarUsuario(id, nome, email, senha, anoNascimento, (err, resultado) => {
    if (err) {
      console.error('Erro ao atualizar o usuario:', err);
      return res.status(500).json({ error: 'Erro ao atualizar o usuario' });
    }
    res.status(200).json({ message: 'usuario atualizado com sucesso', resultado });
  });
};
const excluirUsuario = (req, res) => {
  const { id } = req.params;

  UsuarioModel.excluirUsuario(id, (err, resultado) => {
    if (err) {
      console.error('Erro ao excluir o usuario:', err);
      return res.status(500).json({ error: 'Erro ao excluir o usuario' });
    }
    res.status(200).json({ message: 'usuario excluído com sucesso', resultado });
  });
};

const listarUsuarioId = (req, res) => {
  const { id } = req.params;

  UsuarioModel.listarUsuarioId(id, (err, resultado) => {
    if (err) {
      console.error('Erro ao Buscar o Usuario:', err);
      return res.status(500).json({ error: 'Erro ao Buscar o Usuario' });
    }
    res.status(200).json({ message: 'Usuario encontrado', resultado });
  });
};

const listarUsuarios = (req, res) => {
  UsuarioModel.listarUsuarios((err, resultados) => {
    if (err) {
      console.error('Erro ao listar os Usuarios:', err);
      return res.status(500).json({ error: 'Erro ao listar os Usuario' });
    }
    res.status(200).json(resultados);
  });
};

module.exports = { salvarUsuario, atualizarUsuario, excluirUsuario, listarUsuarios, listarUsuarioId };

