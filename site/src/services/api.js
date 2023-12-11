
// DEFINE OS METODOS ASSINCRONOS PARA INTERAGIR COM A API 

// Definição da URL da API
const API_URL = 'http://localhost:3000/api';

// Objeto que contém métodos para interagir com a API
const api = {

    // Método assíncrono para gravar um novo usuário na API
    async gravarUsuario(dadosDoFormulario) {
        // Chama a API para salvar um novo usuário usando o método POST
        const resposta = await fetch(`${API_URL}/usuarios/salvar-usuario`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dadosDoFormulario),
        });

        // Verifica se a resposta da API indica sucesso
        if (!resposta.ok) {
            // Em caso de erro, lança uma exceção com uma mensagem específica
            throw new Error('Erro ao gravar o usuário');
        }
    },

    // Método assíncrono para listar todos os usuários da API
    async listarUsuarios() {
        
         // Chama a API para listar um novo usuário usando o método POST
        const resposta = await fetch(`${API_URL}/usuarios/listar-usuarios`);

        // Verifica se a resposta da API indica sucesso
        if (!resposta.ok) {
            // Em caso de erro, lança uma exceção com uma mensagem específica
            throw new Error('Erro ao carregar os usuários');
        }

        // Retorna os dados obtidos da API como JSON
        return resposta.json();
    },
    
    // Método assíncrono para buscar um usuário específico por ID na API, utilizado no editar usuario
    async buscarUsuarioPorId(id) {
        // Chama a API para buscar um usuário pelo ID
        const resposta = await fetch(`${API_URL}/usuarios/listar-usuarios/${id}`);

        // Verifica se a resposta da API indica sucesso
        if (!resposta.ok) {
            // Em caso de erro, lança uma exceção com uma mensagem específica
            throw new Error('Erro ao carregar o usuário');
        }

        // Retorna os dados obtidos da API como JSON
        return resposta.json();
    },

    // Método assíncrono para excluir um usuário específico por ID na API
    async excluirUsuario(id) {
        // Chama a API para excluir um usuário pelo ID usando o método DELETE
        const resposta = await fetch(`${API_URL}/usuarios/excluir-usuario/${id}`, {
            method: 'DELETE',
        });

        // Verifica se a resposta da API indica sucesso
        if (!resposta.ok) {
            // Em caso de erro, lança uma exceção com uma mensagem específica
            throw new Error('Erro ao excluir o usuário');
        }
    },

    // Método assíncrono para atualizar um usuário existente na API
    async atualizarUsuario(dadosDoFormulario) {
        // Chama a API para atualizar um usuário usando o método PUT
        const resposta = await fetch(`${API_URL}/usuarios/atualizar-usuario`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dadosDoFormulario),
        });

        // Verifica se a resposta da API indica sucesso
        if (!resposta.ok) {
            // Em caso de erro, lança uma exceção com uma mensagem específica
            throw new Error('Erro ao atualizar o usuário');
        }
    },

    // Adicione aqui outras chamadas de API conforme necessário

};

// Exporta o objeto 'api' para ser utilizado em outros lugares
export default api;
