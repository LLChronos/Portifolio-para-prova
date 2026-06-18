/**
 * ============================================
 * TESTE DE ENDPOINTS - EXEMPLOS DE REQUISIÇÕES
 * ============================================
 * 
 * Use este arquivo para testar a API do backend
 * 
 * Opções:
 * 1. Copie comandos curl para terminal
 * 2. Use Postman (aplicativo para testar APIs)
 * 3. Use o frontend React (mais fácil)
 */

// ============================================
// 1. VERIFICAR SE SERVIDOR ESTÁ ATIVO
// ============================================

/**
 * curl http://localhost:5000/health
 * 
 * Resposta esperada:
 * {
 *   "message": "Servidor funcionando corretamente!",
 *   "status": "online",
 *   "timestamp": "2024-01-15T10:30:00Z"
 * }
 */

// ============================================
// 2. REGISTRAR NOVO USUÁRIO (POST)
// ============================================

/**
 * curl -X POST http://localhost:5000/api/register \
 *   -H "Content-Type: application/json" \
 *   -d '{
 *     "nome": "João Silva",
 *     "email": "joao@email.com",
 *     "senha": "Senha123!",
 *     "confirmaSenha": "Senha123!"
 *   }'
 * 
 * Resposta esperada (201):
 * {
 *   "success": true,
 *   "message": "Usuário cadastrado com sucesso!",
 *   "usuario": {
 *     "id": 1,
 *     "nome": "João Silva",
 *     "email": "joao@email.com",
 *     "data_criacao": "2024-01-15T10:30:00Z"
 *   }
 * }
 * 
 * Se tentar com email duplicado (409):
 * {
 *   "error": "Conflito",
 *   "message": "Este email já está cadastrado no sistema"
 * }
 */

// ============================================
// 3. FAZER LOGIN (POST)
// ============================================

/**
 * curl -X POST http://localhost:5000/api/login \
 *   -H "Content-Type: application/json" \
 *   -d '{
 *     "email": "joao@email.com",
 *     "senha": "Senha123!"
 *   }'
 * 
 * Resposta esperada (200):
 * {
 *   "success": true,
 *   "message": "Login realizado com sucesso!",
 *   "usuario": {
 *     "id": 1,
 *     "nome": "João Silva",
 *     "email": "joao@email.com",
 *     "data_criacao": "2024-01-15T10:30:00Z"
 *   }
 * }
 * 
 * Se senha errada (401):
 * {
 *   "error": "Autenticação falhou",
 *   "message": "Email ou senha incorretos"
 * }
 */

// ============================================
// 4. LISTAR TODOS OS USUÁRIOS (GET)
// ============================================

/**
 * curl http://localhost:5000/api/usuarios
 * 
 * Resposta esperada (200):
 * {
 *   "success": true,
 *   "quantidade": 2,
 *   "usuarios": [
 *     {
 *       "id": 1,
 *       "nome": "João Silva",
 *       "email": "joao@email.com",
 *       "data_criacao": "2024-01-15T10:30:00Z"
 *     },
 *     {
 *       "id": 2,
 *       "nome": "Maria Santos",
 *       "email": "maria@email.com",
 *       "data_criacao": "2024-01-16T09:15:00Z"
 *     }
 *   ]
 * }
 */

// ============================================
// 5. TESTES COM DADOS INVÁLIDOS
// ============================================

/**
 * TESTE 1: Email vazio (400)
 * curl -X POST http://localhost:5000/api/register \
 *   -H "Content-Type: application/json" \
 *   -d '{
 *     "nome": "João",
 *     "email": "",
 *     "senha": "Senha123!",
 *     "confirmaSenha": "Senha123!"
 *   }'
 * 
 * Resposta:
 * {
 *   "error": "Erro de validação",
 *   "message": "Todos os campos são obrigatórios"
 * }
 */

/**
 * TESTE 2: Email inválido (400)
 * curl -X POST http://localhost:5000/api/register \
 *   -H "Content-Type: application/json" \
 *   -d '{
 *     "nome": "João",
 *     "email": "email-invalido",
 *     "senha": "Senha123!",
 *     "confirmaSenha": "Senha123!"
 *   }'
 * 
 * Resposta:
 * {
 *   "error": "Erro de validação",
 *   "message": "Email inválido. Formato esperado: usuario@dominio.com"
 * }
 */

/**
 * TESTE 3: Senha fraca (400)
 * curl -X POST http://localhost:5000/api/register \
 *   -H "Content-Type: application/json" \
 *   -d '{
 *     "nome": "João",
 *     "email": "joao@email.com",
 *     "senha": "123",
 *     "confirmaSenha": "123"
 *   }'
 * 
 * Resposta:
 * {
 *   "error": "Erro de validação",
 *   "message": "Senha deve ter no mínimo 8 caracteres"
 * }
 */

/**
 * TESTE 4: Senhas não conferem (400)
 * curl -X POST http://localhost:5000/api/register \
 *   -H "Content-Type: application/json" \
 *   -d '{
 *     "nome": "João",
 *     "email": "joao@email.com",
 *     "senha": "Senha123!",
 *     "confirmaSenha": "SenhaErrada123!"
 *   }'
 * 
 * Resposta:
 * {
 *   "error": "Erro de validação",
 *   "message": "As senhas não conferem"
 * }
 */

// ============================================
// 6. TESTAR COM JAVASCRIPT/FETCH
// ============================================

/**
 * No console do navegador, execute:
 * 
 * // POST - Registrar
 * fetch('http://localhost:5000/api/register', {
 *   method: 'POST',
 *   headers: {
 *     'Content-Type': 'application/json'
 *   },
 *   body: JSON.stringify({
 *     nome: 'João Silva',
 *     email: 'joao@email.com',
 *     senha: 'Senha123!',
 *     confirmaSenha: 'Senha123!'
 *   })
 * })
 *   .then(res => res.json())
 *   .then(data => console.log(data))
 *   .catch(err => console.error(err));
 */

/**
 * // POST - Login
 * fetch('http://localhost:5000/api/login', {
 *   method: 'POST',
 *   headers: {
 *     'Content-Type': 'application/json'
 *   },
 *   body: JSON.stringify({
 *     email: 'joao@email.com',
 *     senha: 'Senha123!'
 *   })
 * })
 *   .then(res => res.json())
 *   .then(data => console.log(data))
 *   .catch(err => console.error(err));
 */

/**
 * // GET - Listar usuários
 * fetch('http://localhost:5000/api/usuarios')
 *   .then(res => res.json())
 *   .then(data => console.log(data))
 *   .catch(err => console.error(err));
 */

// ============================================
// 7. USANDO POSTMAN (INTERFACE GRÁFICA)
// ============================================

/**
 * 1. Baixe Postman: https://www.postman.com/downloads/
 * 
 * 2. Crie uma nova requisição:
 *    - Clique em "+ New"
 *    - Selecione "HTTP Request"
 * 
 * 3. Para POST /api/register:
 *    - Method: POST
 *    - URL: http://localhost:5000/api/register
 *    - Aba "Body" → raw → JSON
 *    - Cole o JSON:
 *      {
 *        "nome": "João Silva",
 *        "email": "joao@email.com",
 *        "senha": "Senha123!",
 *        "confirmaSenha": "Senha123!"
 *      }
 *    - Clique em "Send"
 * 
 * 4. Veja a resposta (status + body)
 */

// ============================================
// 8. SEQUÊNCIA DE TESTES RECOMENDADA
// ============================================

/**
 * 1. Verificar saúde do servidor
 *    curl http://localhost:5000/health
 * 
 * 2. Registrar primeiro usuário
 *    curl -X POST http://localhost:5000/api/register \
 *      -H "Content-Type: application/json" \
 *      -d '{"nome":"João","email":"joao@email.com",...}'
 * 
 * 3. Tentar registrar com mesmo email (erro 409)
 *    (usar mesmos dados)
 * 
 * 4. Fazer login com credenciais corretas
 *    curl -X POST http://localhost:5000/api/login \
 *      -H "Content-Type: application/json" \
 *      -d '{"email":"joao@email.com","senha":"Senha123!"}'
 * 
 * 5. Fazer login com senha errada (erro 401)
 *    (usar email correto + senha errada)
 * 
 * 6. Listar todos os usuários
 *    curl http://localhost:5000/api/usuarios
 * 
 * 7. Registrar segundo usuário
 * 
 * 8. Verificar se dois usuários aparecem na listagem
 */

console.log('📝 Teste de endpoints carregado!');
console.log('Use os comandos curl acima ou o frontend React para testar a API.');
