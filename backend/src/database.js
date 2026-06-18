/**
 * ============================================
 * GERENCIAMENTO DE BANCO DE DADOS - SQLite
 * ============================================
 * 
 * Funções para:
 * - Conectar ao SQLite
 * - Criar tabelas
 * - CRUD de usuários
 * - Criptografia com bcrypt
 * - Validações
 */

import sqlite3 from 'sqlite3';
import bcrypt from 'bcrypt';
import path from 'path';
import { fileURLToPath } from 'url';

// Obter caminho da pasta atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Caminho do banco de dados
 * Padrão: ./usuarios.db (na raiz do backend)
 */
const DB_PATH = process.env.DB_PATH || path.join(__dirname, '../usuarios.db');

/**
 * Criar conexão com SQLite
 * verbose(): Ativa logs detalhados de queries
 */
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('❌ Erro ao conectar ao banco de dados:', err);
    process.exit(1);
  } else {
    console.log('✅ Conectado ao banco de dados SQLite');
  }
});

// ============================================
// INICIALIZAR BANCO DE DADOS
// ============================================

/**
 * Criar tabela de usuários (se não existir)
 * 
 * Estrutura:
 * - id: Identificador único (PRIMARY KEY)
 * - nome: Nome do usuário (obrigatório)
 * - email: Email único (UNIQUE)
 * - senha: Senha criptografada com bcrypt
 * - criadoEm: Data de criação (auto timestamp)
 * 
 * Constraints:
 * - NOT NULL: Campos obrigatórios
 * - UNIQUE: Email não pode se repetir
 */
export async function initializeDatabase() {
  return new Promise((resolve, reject) => {
    // Ativar foreign keys
    db.run('PRAGMA foreign_keys = ON');

    // Criar tabela
    db.run(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        senha TEXT NOT NULL,
        criadoEm DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `, (err) => {
      if (err) {
        console.error('❌ Erro ao criar tabela:', err);
        reject(err);
      } else {
        console.log('✅ Tabela de usuários verificada/criada');
        
        // Criar índice para melhorar performance nas buscas por email
        db.run(`
          CREATE INDEX IF NOT EXISTS idx_email ON usuarios(email)
        `, (err) => {
          if (err) console.error('Erro ao criar índice:', err);
          resolve();
        });
      }
    });
  });
}

// ============================================
// VALIDAÇÕES
// ============================================

/**
 * Validar formato de email
 * Padrão: algo@dominio.com
 */
export function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Validar força da senha
 * Requisitos:
 * - Mínimo 8 caracteres
 * - Deve conter: maiúscula, minúscula, número, caractere especial
 */
export function validarSenha(senha) {
  if (!senha || senha.length < 8) {
    return { válida: false, mensagem: 'Senha deve ter no mínimo 8 caracteres' };
  }
  if (!/[A-Z]/.test(senha)) {
    return { válida: false, mensagem: 'Senha deve conter pelo menos uma letra maiúscula' };
  }
  if (!/[a-z]/.test(senha)) {
    return { válida: false, mensagem: 'Senha deve conter pelo menos uma letra minúscula' };
  }
  if (!/[0-9]/.test(senha)) {
    return { válida: false, mensagem: 'Senha deve conter pelo menos um número' };
  }
  if (!/[!@#$%^&*]/.test(senha)) {
    return { válida: false, mensagem: 'Senha deve conter pelo menos um caractere especial (!@#$%^&*)' };
  }
  return { válida: true };
}

/**
 * Validar nome de usuário
 * Requisitos:
 * - Mínimo 3 caracteres
 * - Apenas letras, números e espaços
 */
export function validarNome(nome) {
  if (!nome || nome.length < 3) {
    return { válida: false, mensagem: 'Nome deve ter no mínimo 3 caracteres' };
  }
  if (!/^[a-zA-Z\s]+$/.test(nome)) {
    return { válida: false, mensagem: 'Nome deve conter apenas letras e espaços' };
  }
  return { válida: true };
}

// ============================================
// CRIPTOGRAFIA DE SENHA
// ============================================

/**
 * Criptografar senha com bcrypt
 * 
 * O que é bcrypt?
 * - Algoritmo de hash seguro para senhas
 * - Salt: Valor aleatório adicionado à senha
 * - Rounds: Número de iterações (10 é padrão)
 * - Resultado: Não pode ser descriptografado (apenas comparado)
 * 
 * Exemplo:
 * - Entrada: "Senha123!"
 * - Saída: "$2b$10$abc123xyz..." (hash único)
 * 
 * Cada execução gera um hash diferente (por causa do salt aleatório)
 * Mas bcrypt.compare() consegue validar a senha original
 */
export async function criptografarSenha(senhaPlana) {
  const SALT_ROUNDS = 10;
  try {
    const senhaHash = await bcrypt.hash(senhaPlana, SALT_ROUNDS);
    return senhaHash;
  } catch (erro) {
    throw new Error('Erro ao criptografar senha: ' + erro.message);
  }
}

/**
 * Comparar senha plana com hash (para login)
 * 
 * Exemplo:
 * - Entrada do usuário: "Senha123!"
 * - Hash no banco: "$2b$10$abc123xyz..."
 * - bcrypt.compare() retorna: true/false
 */
export async function compararSenha(senhaPlana, senhaHash) {
  try {
    return await bcrypt.compare(senhaPlana, senhaHash);
  } catch (erro) {
    throw new Error('Erro ao comparar senha: ' + erro.message);
  }
}

// ============================================
// OPERAÇÕES CRUD - USUÁRIOS
// ============================================

/**
 * CRIAR USUÁRIO (Cadastro)
 * 
 * Passos:
 * 1. Validar dados de entrada
 * 2. Verificar se email já existe
 * 3. Criptografar senha
 * 4. Inserir no banco de dados
 */
export function criarUsuario(nome, email, senha) {
  return new Promise(async (resolve, reject) => {
    try {
      // Validações
      const validacaoNome = validarNome(nome);
      if (!validacaoNome.válida) {
        return reject({
          status: 400,
          message: validacaoNome.mensagem
        });
      }

      const validacaoEmail = validarEmail(email);
      if (!validacaoEmail) {
        return reject({
          status: 400,
          message: 'Email inválido'
        });
      }

      const validacaoSenha = validarSenha(senha);
      if (!validacaoSenha.válida) {
        return reject({
          status: 400,
          message: validacaoSenha.mensagem
        });
      }

      // Verificar se email já existe
      db.get('SELECT email FROM usuarios WHERE email = ?', [email], async (err, row) => {
        if (err) {
          return reject({
            status: 500,
            message: 'Erro ao verificar email: ' + err.message
          });
        }

        if (row) {
          return reject({
            status: 409,
            message: 'Email já cadastrado'
          });
        }

        // Criptografar senha
        const senhaHash = await criptografarSenha(senha);

        // Inserir no banco
        db.run(
          'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
          [nome, email, senhaHash],
          function (err) {
            if (err) {
              return reject({
                status: 500,
                message: 'Erro ao criar usuário: ' + err.message
              });
            }
            resolve({
              id: this.lastID,
              nome,
              email,
              message: '✅ Usuário criado com sucesso'
            });
          }
        );
      });
    } catch (erro) {
      reject({
        status: 500,
        message: 'Erro: ' + erro.message
      });
    }
  });
}

/**
 * AUTENTICAR USUÁRIO (Login)
 * 
 * Passos:
 * 1. Buscar usuário por email
 * 2. Comparar senha plana com hash
 * 3. Retornar usuário se correto
 */
export function autenticarUsuario(email, senha) {
  return new Promise(async (resolve, reject) => {
    try {
      if (!validarEmail(email)) {
        return reject({
          status: 400,
          message: 'Email inválido'
        });
      }

      // Buscar usuário
      db.get('SELECT * FROM usuarios WHERE email = ?', [email], async (err, usuario) => {
        if (err) {
          return reject({
            status: 500,
            message: 'Erro ao buscar usuário: ' + err.message
          });
        }

        if (!usuario) {
          return reject({
            status: 401,
            message: 'Email ou senha incorretos'
          });
        }

        // Comparar senha
        const senhaValida = await compararSenha(senha, usuario.senha);
        if (!senhaValida) {
          return reject({
            status: 401,
            message: 'Email ou senha incorretos'
          });
        }

        // Retornar usuário (sem a senha)
        resolve({
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
          criadoEm: usuario.criadoEm,
          message: '✅ Login realizado com sucesso'
        });
      });
    } catch (erro) {
      reject({
        status: 500,
        message: 'Erro: ' + erro.message
      });
    }
  });
}

/**
 * LISTAR USUÁRIOS COM PAGINAÇÃO
 * 
 * Parâmetros:
 * - page: Número da página (começa em 1)
 * - limit: Quantidade de usuários por página (padrão: 10)
 * 
 * Cálculos:
 * - offset = (page - 1) * limit
 * - LIMIT limit OFFSET offset = pula X registros e pega os próximos Y
 * 
 * Exemplo:
 * - page=1, limit=10 → LIMIT 10 OFFSET 0 (usuários 1-10)
 * - page=2, limit=10 → LIMIT 10 OFFSET 10 (usuários 11-20)
 * - page=3, limit=5 → LIMIT 5 OFFSET 10 (usuários 11-15)
 */
export function listarUsuarios(page = 1, limit = 10) {
  return new Promise((resolve, reject) => {
    try {
      const page_num = Math.max(1, parseInt(page) || 1);
      const limit_num = Math.min(100, Math.max(1, parseInt(limit) || 10));
      const offset = (page_num - 1) * limit_num;

      // Contar total de usuários
      db.get('SELECT COUNT(*) as total FROM usuarios', async (err, countResult) => {
        if (err) {
          return reject({
            status: 500,
            message: 'Erro ao contar usuários: ' + err.message
          });
        }

        const total = countResult.total;

        // Buscar usuários com paginação
        db.all(
          'SELECT id, nome, email, criadoEm FROM usuarios ORDER BY criadoEm DESC LIMIT ? OFFSET ?',
          [limit_num, offset],
          (err, usuarios) => {
            if (err) {
              return reject({
                status: 500,
                message: 'Erro ao listar usuários: ' + err.message
              });
            }

            resolve({
              data: usuarios,
              paginacao: {
                paginaAtual: page_num,
                itensPorPagina: limit_num,
                totalItens: total,
                totalPaginas: Math.ceil(total / limit_num),
                temProxima: offset + limit_num < total,
                temAnterior: page_num > 1
              }
            });
          }
        );
      });
    } catch (erro) {
      reject({
        status: 500,
        message: 'Erro: ' + erro.message
      });
    }
  });
}

/**
 * OBTER USUÁRIO POR ID
 */
export function obterUsuarioPorId(id) {
  return new Promise((resolve, reject) => {
    db.get('SELECT id, nome, email, criadoEm FROM usuarios WHERE id = ?', [id], (err, usuario) => {
      if (err) {
        return reject({
          status: 500,
          message: 'Erro ao buscar usuário: ' + err.message
        });
      }
      if (!usuario) {
        return reject({
          status: 404,
          message: 'Usuário não encontrado'
        });
      }
      resolve(usuario);
    });
  });
}

/**
 * DELETAR USUÁRIO
 */
export function deletarUsuario(id) {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM usuarios WHERE id = ?', [id], function (err) {
      if (err) {
        return reject({
          status: 500,
          message: 'Erro ao deletar usuário: ' + err.message
        });
      }
      if (this.changes === 0) {
        return reject({
          status: 404,
          message: 'Usuário não encontrado'
        });
      }
      resolve({
        message: '✅ Usuário deletado com sucesso'
      });
    });
  });
}

export default db;
