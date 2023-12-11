//interage diretamente com o banco de dados para executar as operações CRUD relacionadas aos usuários.

const { connection } = require('../config');

class UsuarioModel {
  static salvarUsuario(nome, email, senha, anoNascimento, callback) {
    const query = 'INSERT INTO user (nome, email, senha, anoNascimento) VALUES (?, ?, ?, ?)';
    connection.query(query, [nome, email, senha, anoNascimento], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  }

  static buscarUsuarioPorId(id, callback) {
    const query = 'SELECT * FROM user WHERE id = ?';
    connection.query(query, [id], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      if (results.length === 0) {
        return callback(null, null); // Usuario não encontrado
      }
      callback(null, results[0]);
    });
  }
  // Outros métodos, como atualizarUsuario, excluirUsuario, listarUsuario, etc.
  static atualizarUsuario(id, nome, email, senha, anoNascimento, callback) {
    const query = 'UPDATE user SET nome=?, email=?, senha=?, anoNascimento=? WHERE id=?';
    connection.query(query, [nome, email, senha, anoNascimento, id], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  }

  static excluirUsuario(id, callback) {
    const query = 'DELETE FROM user WHERE id=?';
    connection.query(query, [id], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  }
  
  static listarUsuarioId(id, callback) {
    const query = 'SELECT * FROM user WHERE id=?';
    connection.query(query, [id], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  }

  static listarUsuarios(callback) {
    const query = 'SELECT * FROM user';
    connection.query(query, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  }
  

}

module.exports = UsuarioModel;
