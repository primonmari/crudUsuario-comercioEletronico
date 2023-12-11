// CadastroUsuario.jsx

// Importação das bibliotecas e componentes necessários do React
// Importação dos estilos específicos para este componente
import React, { useState, useEffect } from 'react';
import './CadastroUsuarios.css';
import Formulario from '../../components/Formulario';
import api from '../../services/api';
import Tabela from '../../Components/Tabela';
import './CadastroUsuarios.css';

// Definição do componente funcional CadastroUsuario
const CadastroUsuario = () => {
  // Estados locais do componente utilizando hooks
  const [mensagem, setMensagem] = useState(''); // Estado para mensagens de feedback
  const [usuarios, setUsuarios] = useState([]); // Estado para armazenar a lista de usuários
  const [itemSelecionado, setItemSelecionado] = useState(null); // Estado para armazenar um item selecionado da tabela
  const [confirmarSenha, setConfirmarSenha] = useState(''); // Estado para a confirmação de senha

  // Função para validar senhas, compara valor e tipo 
  const validarSenhas = (senha, confirmarSenha) => {
    return senha === confirmarSenha;
  };

  // Estrutura do formulário (campos) e das colunas da tabela
  const listaForm = [
    { nome: 'nome', label: 'Nome', tipo: 'text' },
    { nome: 'email', label: 'E-Mail', tipo: 'email' },
    { nome: 'anoNascimento', label: 'Ano de Nascimento', tipo: 'number' },
    { nome: 'senha', label: 'Senha', tipo: 'password' },
    { nome: 'confirmarSenha', label: 'Confirmar Senha', tipo: 'password' },
  ];

  // Colunas que a tabela irá ter
  const colunasUsuarios = ['id', 'nome', 'email', 'senha', 'anoNascimento'];

  // Função assíncrona para enviar um formulário e gravar um novo usuário
  const enviarFormulario = async (dadosDoFormulario) => {
    //extrai as propriedades senha e confirmarSenha do objeto dadosDoFormulario, enquanto o restante das propriedades é 
    //agrupado no objeto outrosDados
    const { senha, confirmarSenha, ...outrosDados } = dadosDoFormulario;
    //Se retornar false (as senhas não são iguais), o operador ! negará esse valor, tornando-o true. 
    //o bloco de código dentro do if será executado, exibindo a mensagem "As senhas não são iguais" 
    //e interrompendo a execução da função com return. 
    //Se retornar true (senhas iguais), o bloco de código dentro do if não será executado.
    if (!validarSenhas(senha, confirmarSenha)) {
      setMensagem('As senhas não são iguais');
      alert('As senhas não são iguais');
      return;
    }

    try {// bloco de exceções (erros).
      await api.gravarUsuario({ ...outrosDados, senha });
      setMensagem('Usuário cadastrado com sucesso');
    } catch (error) { //trata a exceção
      console.error('Erro ao cadastrar o usuário:', error.message);
      setMensagem('Erro ao cadastrar o usuário');
      alert('Erro ao cadastrar o usuário');
    }
  };

  // Função assíncrona para editar um formulário e atualizar um usuário existente
  const editarFormulario = async (dadosDoFormulario) => {
    //extrai as propriedades senha e confirmarSenha do objeto dadosDoFormulario, enquanto o restante das propriedades é 
    //agrupado no objeto outrosDados
    const { senha, confirmarSenha, ...outrosDados } = dadosDoFormulario;

    if (!validarSenhas(senha, confirmarSenha)) {
      setMensagem('As senhas não são iguais');
      alert('As senhas não são iguais');
      return;
    }

    try {
      await api.atualizarUsuario({ ...outrosDados, senha });
      setMensagem('Usuário editado com sucesso');
    } catch (error) {
      console.error('Erro ao editar o usuário:', error.message);
      setMensagem('Erro ao editar o usuário');
    }
  };

  // Efeito que roda uma vez ao montar o componente, carregando os usuários
  useEffect(() => {
    const carregarUsuarios = async () => {
      try {
        const dados = await api.listarUsuarios();
        setUsuarios(dados);
      } catch (error) {
        console.error('Erro ao carregar os usuários:', error.message);
      }
    };

    carregarUsuarios();
  }, []);

  //// Função assíncrona para excluir um usuário pelo ID
const excluirUsuario = async (id) => {
  try {
    // Chama a API para excluir o usuário com o ID fornecido
    await api.excluirUsuario(id);

    // Atualiza a lista de usuários localmente removendo o usuário excluído
    const novaLista = usuarios.filter((usuario) => usuario.id !== id);
    setUsuarios(novaLista);
  } catch (error) {
    // Em caso de erro, registra uma mensagem de erro no console
    console.error('Erro ao excluir o usuário:', error.message);
  }
};

// Função assíncrona para carregar dados do usuário pelo ID para edição
const editarUsuario = async (id) => {
  try {
    // Chama a API para buscar os dados do usuário pelo ID fornecido
    const usuarioSelecionado = await api.buscarUsuarioPorId(id);

    // Atualiza o estado do item selecionado com os dados do usuário buscado
    setItemSelecionado(usuarioSelecionado);
  } catch (error) {
    // Em caso de erro, registra uma mensagem de erro no console
    console.error('Erro ao carregar dados do usuário para edição:', error.message);
  }
};

  return (
    <div className="classeCSS">
      <h1>Cadastro de Usuários</h1>
      <Formulario
        campos={listaForm}
        onSubmit={enviarFormulario}
        itemSelecionado={itemSelecionado}
        onUpdate={editarFormulario}
      />
      {mensagem && <p>{mensagem}</p>}
      
      <h2>Usuários Cadastrados</h2>
      <Tabela
        dados={usuarios}
        onExcluirItem={excluirUsuario}
        onEditarItem={editarUsuario}
        colunas={colunasUsuarios}
        listaForm={listaForm}
      />
    </div>
  );
};

export default CadastroUsuario;
