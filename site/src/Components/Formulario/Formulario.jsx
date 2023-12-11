// Importa as bibliotecas e componentes necessários do React
import React, { useState, useEffect } from 'react';
import './Formulario.css'; // Importa um arquivo de estilo específico para este componente

// Declaração do componente funcional Formulario
const Formulario = ({ campos, onSubmit, itemSelecionado, onUpdate }) => {
  // Estado local para armazenar os dados do formulário
  const [dadosDoFormulario, setDadosDoFormulario] = useState({});

  // Função para lidar com a mudança nos campos do formulário
  const eventoChange = (campo, valor) => {
    setDadosDoFormulario({
      ...dadosDoFormulario,
      [campo]: valor,
    });
  };

  // Função para lidar com a submissão do formulário
  const eventoSubmit = (e) => {
    //e.preventDefault(); // Evita o comportamento padrão do formulário

    // Verifica se há um item selecionado para determinar se é uma atualização ou criação
    if (itemSelecionado) {
      onUpdate(dadosDoFormulario); // Chama a função onUpdate para atualizar um item existente
    } else {
      onSubmit(dadosDoFormulario); // Chama a função onSubmit para criar um novo item
    }
  };

  // Função para validar o campo de e-mail
  const validarEmail = () => {
    var email = dadosDoFormulario.email || '';
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(email)) {
      alert('Por favor, insira um e-mail válido.');
      return false; // Não envie o formulário
    }
    return true; // Envie o formulário
  };

  // Efeito que é acionado quando o itemSelecionado muda
  useEffect(() => {
    if (itemSelecionado) {
      // Se houver um item selecionado, preenche o formulário com seus dados
      setDadosDoFormulario(itemSelecionado.resultado[0]);
      console.log(dadosDoFormulario); // Log para verificar os dados do formulário (pode ser removido)
    }
  }, [itemSelecionado]);

  // Renderização do componente
  return (
    <form onSubmit={eventoSubmit}>
      {campos.map((campo) => (
        <div key={campo.nome} className='divForm'>
          {/* Rótulo do campo */}
          <label className='largura' htmlFor={campo.nome}>
            {campo.label}
          </label>
          
          {/* Input do formulário */}
          <input
            id={campo.nome}  // Adiciona um id associado ao campo de entrada
            type={campo.tipo}
            value={dadosDoFormulario[campo.nome] || ''}
            onChange={(e) => eventoChange(campo.nome, e.target.value)}
          />
        </div>
      ))}
      {/* Botão de envio do formulário */}
      <button type="submit" onClick={validarEmail}>
        Salvar
      </button>
    </form>
  );
};

// Exporta o componente para ser utilizado em outros lugares
export default Formulario;
