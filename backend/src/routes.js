/**
 * ============================================
 * ROTAS DA API - ENDPOINTS
 * ============================================
 * 
 * Endpoints disponíveis:
 * - POST /api/register - Cadastro de usuário
 * - POST /api/login - Autenticação
 * - GET /api/usuarios - Listar com paginação
 * - GET /api/usuarios/:id - Obter um usuário
 * - DELETE /api/usuarios/:id - Deletar usuário
 */

import express from 'express';
import {
  criarUsuario,
  autenticarUsuario,
  listarUsuarios,
  obterUsuarioPorId,
  deletarUsuario
} from './database.js';

const router = express.Router();

// ============================================
// POST /api/register - CADASTRO
// ============================================

/**
 * Criar novo usuário
 * 
 * Body esperado:
 * {
 *   "nome": "João Silva",
 *   "email": "joao@email.com",
 *   "senha": "Senha123!",
 *   "confirmaSenha": "Senha123!"
 * }
 * 
 * Validações:
 * - Nome: 3+ caracteres, apenas letras
 * - Email: Formato válido, único
 * - Senha: 8+ caracteres, maiúscula, minúscula, número, caractere especial
 * - Confirmação: Deve combinar com a senha
 * 
 * Respostas:
 * - 201: Usuário criado com sucesso
 * - 400: Validação falhou
 * - 409: Email já cadastrado
 * - 500: Erro no servidor
 */
router.post('/register', async (req, res) => {
  try {
    const { nome, email, senha, confirmaSenha } = req.body;

    // Validar campos obrigatórios
    if (!nome || !email || !senha || !confirmaSenha) {
      return res.status(400).json({
        error: 'Todos os campos são obrigatórios',
        fields: { nome, email, senha, confirmaSenha }
      });
    }

    // Validar se as senhas conferem
    if (senha !== confirmaSenha) {
      return res.status(400).json({
        error: 'As senhas não conferem'
      });
    }

    // Criar usuário no banco
    const novoUsuario = await criarUsuario(nome, email, senha);
    
    res.status(201).json({
      success: true,
      message: novoUsuario.message,
      usuario: {
        id: novoUsuario.id,
        nome: novoUsuario.nome,
        email: novoUsuario.email
      }
    });

  } catch (erro) {
    console.error('Erro no registro:', erro);
    res.status(erro.status || 500).json({
      error: erro.message || 'Erro ao criar usuário'
    });
  }
});

// ============================================
// POST /api/login - AUTENTICAÇÃO
// ============================================

/**
 * Fazer login de usuário
 * 
 * Body esperado:
 * {
 *   "email": "joao@email.com",
 *   "senha": "Senha123!"
 * }
 * 
 * Respostas:
 * - 200: Login bem-sucedido
 * - 400: Email inválido
 * - 401: Email ou senha incorretos
 * - 500: Erro no servidor
 */
router.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Validar campos obrigatórios
    if (!email || !senha) {
      return res.status(400).json({
        error: 'Email e senha são obrigatórios'
      });
    }

    // Autenticar usuário
    const usuario = await autenticarUsuario(email, senha);

    res.status(200).json({
      success: true,
      message: usuario.message,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        criadoEm: usuario.criadoEm
      }
    });

  } catch (erro) {
    console.error('Erro no login:', erro);
    res.status(erro.status || 500).json({
      error: erro.message || 'Erro ao fazer login'
    });
  }
});

// ============================================
// GET /api/usuarios - LISTAR COM PAGINAÇÃO
// ============================================

/**
 * Listar usuários com paginação
 * 
 * Query parameters:
 * - page: Número da página (padrão: 1)
 * - limit: Itens por página (padrão: 10, máximo: 100)
 * 
 * Exemplo:
 * GET /api/usuarios?page=1&limit=10
 * GET /api/usuarios?page=2&limit=5
 * 
 * Resposta:
 * {
 *   "data": [
 *     { "id": 1, "nome": "João", "email": "joao@email.com", "criadoEm": "..." },
 *     { "id": 2, "nome": "Maria", "email": "maria@email.com", "criadoEm": "..." }
 *   ],
 *   "paginacao": {
 *     "paginaAtual": 1,
 *     "itensPorPagina": 10,
 *     "totalItens": 25,
 *     "totalPaginas": 3,
 *     "temProxima": true,
 *     "temAnterior": false
 *   }
 * }
 */
router.get('/usuarios', async (req, res) => {
  try {
    const { page, limit } = req.query;
    const resultado = await listarUsuarios(page, limit);
    res.status(200).json(resultado);
  } catch (erro) {
    console.error('Erro ao listar usuários:', erro);
    res.status(erro.status || 500).json({
      error: erro.message || 'Erro ao listar usuários'
    });
  }
});

// ============================================
// GET /api/usuarios/:id - OBTER UM USUÁRIO
// ============================================

/**
 * Obter dados de um usuário específico
 * 
 * Parâmetro de rota:
 * - id: ID do usuário
 * 
 * Exemplo:
 * GET /api/usuarios/1
 * 
 * Respostas:
 * - 200: Usuário encontrado
 * - 404: Usuário não encontrado
 * - 500: Erro no servidor
 */
router.get('/usuarios/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await obterUsuarioPorId(id);
    res.status(200).json({
      success: true,
      usuario
    });
  } catch (erro) {
    console.error('Erro ao obter usuário:', erro);
    res.status(erro.status || 500).json({
      error: erro.message || 'Erro ao obter usuário'
    });
  }
});

// ============================================
// DELETE /api/usuarios/:id - DELETAR USUÁRIO
// ============================================

/**
 * Deletar um usuário
 * 
 * Parâmetro de rota:
 * - id: ID do usuário a deletar
 * 
 * Exemplo:
 * DELETE /api/usuarios/1
 * 
 * Respostas:
 * - 200: Usuário deletado
 * - 404: Usuário não encontrado
 * - 500: Erro no servidor
 */
router.delete('/usuarios/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await deletarUsuario(id);
    res.status(200).json({
      success: true,
      message: resultado.message
    });
  } catch (erro) {
    console.error('Erro ao deletar usuário:', erro);
    res.status(erro.status || 500).json({
      error: erro.message || 'Erro ao deletar usuário'
    });
  }
});

export default router;
