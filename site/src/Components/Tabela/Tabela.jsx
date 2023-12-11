import './Tabela.css';

// Importação das bibliotecas e componentes necessários do React
// Importação dos estilos específicos para este componente
const Tabela = ({ dados, onExcluirItem, onEditarItem, colunas, listaForm }) => {
  return (
    // Estrutura da tabela em HTML
    <table>
      {/* Cabeçalho da tabela */}
      <thead>
        <tr>
          {/* Mapeia as colunas para criar os cabeçalhos da tabela */}
          {colunas.map((coluna) => (
            <th key={coluna}>
              {/* Verifica se a coluna é 'anoNascimento' e ajusta a label */}
              {coluna === 'anoNascimento' ? 'Ano de Nascimento' : listaForm.find(item => item.nome === coluna)?.label || coluna}
            </th>
          ))}
          {/* Adiciona uma coluna extra para as ações (Excluir e Editar) */}
          <th>Ações</th>
        </tr>
      </thead>
      {/* Corpo da tabela */}
      <tbody>
        {/* Mapeia os dados para criar as linhas da tabela */}
        {dados.map((item) => (
          <tr key={item.id}>
            {/* Mapeia as colunas para criar as células da tabela */}
            {colunas.map((coluna) => (
              <td key={`${item.id}-${coluna}`}>{item[coluna]}</td>
            ))}
            {/* Coluna de ações (Excluir e Editar) */}
            <td>
              {/* Botão de Excluir que chama a função onExcluirItem quando clicado */}
              <button className="buttonEstilizado" onClick={() => onExcluirItem(item.id)}>Excluir</button>
              {/* Botão de Editar que chama a função onEditarItem quando clicado */}
              <button className="buttonEstilizado" onClick={() => onEditarItem(item.id)}>Editar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// Exporta o componente para ser utilizado em outros lugares
export default Tabela;
