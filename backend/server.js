/**
 * ============================================
 * SERVIDOR EXPRESS - SISTEMA DE AUTENTICAÇÃO
 * ============================================
 * 
 * Configuração do servidor Express com:
 * - Middlewares (CORS, JSON)
 * - Banco de dados SQLite
 * - Rotas de autenticação e paginação
 * - Tratamento de erros
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initializeDatabase } from './src/database.js';
import routes from './src/routes.js';

// Carregar variáveis de ambiente
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ============================================
// MIDDLEWARES
// ============================================

/**
 * CORS: Permitir requisições do frontend
 * Segurança: Apenas localhost:3000 em desenvolvimento
 */
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

/**
 * Parser JSON: Converter body de requisições em JSON
 * Limite: 10MB para não sobrecarregar servidor
 */
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// ============================================
// INICIALIZAR BANCO DE DADOS
// ============================================

/**
 * Ao iniciar servidor:
 * 1. Conecta ao SQLite
 * 2. Cria tabela de usuários (se não existir)
 * 3. Adiciona índices para performance
 */
await initializeDatabase();
console.log('✅ Banco de dados inicializado com sucesso');

// ============================================
// ROTAS
// ============================================

/**
 * Prefixo /api para organizar endpoints
 * Exemplo: http://localhost:5000/api/register
 */
app.use('/api', routes);

/**
 * Health Check: Verificar se servidor está online
 * GET http://localhost:5000/health
 * Resposta: 200 OK {"status": "healthy"}
 */
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

/**
 * Rota raiz: Informações do servidor
 */
app.get('/', (req, res) => {
  res.status(200).json({
    message: '🔐 Sistema de Autenticação API',
    version: '1.0.0',
    endpoints: {
      register: 'POST /api/register',
      login: 'POST /api/login',
      listUsers: 'GET /api/usuarios?page=1&limit=10',
      health: 'GET /health'
    },
    documentation: '/api/docs (em breve)'
  });
});

// ============================================
// TRATAMENTO DE ERROS GLOBAL
// ============================================

/**
 * Middleware de erro: Captura exceções não tratadas
 * Responde com status 500 e mensagem de erro
 */
app.use((err, req, res, next) => {
  console.error('❌ Erro:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Erro interno do servidor',
    status: err.status || 500,
    timestamp: new Date().toISOString()
  });
});

/**
 * Rota 404: Endpoint não encontrado
 */
app.use((req, res) => {
  res.status(404).json({
    error: 'Endpoint não encontrado',
    path: req.path,
    method: req.method,
    status: 404
  });
});

// ============================================
// INICIAR SERVIDOR
// ============================================

app.listen(PORT, () => {
  console.log('');
  console.log('╔════════════════════════════════════════════════════╗');
  console.log('║                                                    ║');
  console.log('║   ✅ SERVIDOR INICIADO COM SUCESSO                ║');
  console.log('║                                                    ║');
  console.log(`║   📍 Porta: ${PORT}                                   ║`);
  console.log(`║   🌍 URL: http://localhost:${PORT}                  ║`);
  console.log('║   🔐 Sistema de Autenticação                       ║');
  console.log('║                                                    ║');
  console.log('╚════════════════════════════════════════════════════╝');
  console.log('');
  console.log('Endpoint de teste: http://localhost:' + PORT + '/health');
  console.log('');
});

export default app;
