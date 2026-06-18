/**
 * ============================================
 * GUIA DE ESTUDOS - SISTEMA DE AUTENTICAÇÃO
 * ============================================
 * 
 * Material de apoio para prova sobre:
 * - Desenvolvimento Web
 * - Banco de Dados
 * - APIs REST
 * - Validação de Dados
 * - Autenticação e Autorização
 */

// ============================================
// 1. O QUÊ É UMA API REST?
// ============================================

/**
 * REST = Representational State Transfer
 * 
 * Princípios:
 * - Usa HTTP para comunicação
 * - Stateless (sem memória entre requisições)
 * - Recursos identificados por URLs
 * - Operações via métodos HTTP
 * 
 * Métodos HTTP:
 * GET    - Obter dados (ler)
 * POST   - Criar dados (escrever)
 * PUT    - Atualizar dados (reescrever tudo)
 * PATCH  - Atualizar parcial
 * DELETE - Deletar dados
 * 
 * Exemplo:
 * GET  /api/usuarios      → Listar usuários
 * POST /api/usuarios      → Criar usuário
 * GET  /api/usuarios/1    → Obter usuário com ID 1
 * PUT  /api/usuarios/1    → Atualizar usuário 1
 * DELETE /api/usuarios/1  → Deletar usuário 1
 */

// ============================================
// 2. CICLO DE VIDA DE UMA REQUISIÇÃO HTTP
// ============================================

/**
 * Cliente (Frontend)               Servidor (Backend)
 *    |                                  |
 *    |---1. Prepara requisição--------->|
 *    |   (URL, método, headers, body)   |
 *    |                                  |
 *    |                          2. Recebe
 *    |                          3. Processa
 *    |                          4. Valida
 *    |                          5. Executa
 *    |                          6. Prepara resposta
 *    |                                  |
 *    |<--7. Resposta HTTP--------------|
 *    |   (status, headers, body)        |
 *    |                                  |
 *    | 8. Processa resposta
 *    | 9. Atualiza interface
 * 
 * Exemplo de Requisição POST /api/register:
 * 
 * REQUEST:
 * POST /api/register HTTP/1.1
 * Host: localhost:5000
 * Content-Type: application/json
 * 
 * {
 *   "nome": "João Silva",
 *   "email": "joao@email.com",
 *   "senha": "Senha123!",
 *   "confirmaSenha": "Senha123!"
 * }
 * 
 * RESPONSE:
 * HTTP/1.1 201 Created
 * Content-Type: application/json
 * 
 * {
 *   "success": true,
 *   "message": "Usuário cadastrado com sucesso!",
 *   "usuario": {
 *     "id": 1,
 *     "nome": "João Silva",
 *     "email": "joao@email.com"
 *   }
 * }
 */

// ============================================
// 3. STATUS CODES HTTP
// ============================================

/**
 * 2xx - Sucesso
 * 200 OK            - Requisição bem-sucedida
 * 201 Created       - Recurso criado com sucesso
 * 204 No Content    - Sucesso, mas sem conteúdo na resposta
 * 
 * 3xx - Redirecionamento
 * 301 Moved         - Recurso movido permanentemente
 * 302 Found         - Redirecionamento temporário
 * 
 * 4xx - Erro do cliente
 * 400 Bad Request   - Dados inválidos
 * 401 Unauthorized  - Não autenticado
 * 403 Forbidden     - Autenticado mas sem permissão
 * 404 Not Found     - Recurso não existe
 * 409 Conflict      - Conflito (ex: email já existe)
 * 
 * 5xx - Erro do servidor
 * 500 Server Error  - Erro interno não especificado
 * 503 Unavailable   - Servidor temporariamente indisponível
 * 
 * Quando usar:
 * - Use 201 quando cria um novo recurso (POST)
 * - Use 400 quando o cliente envia dados inválidos
 * - Use 401 quando credenciais estão erradas
 * - Use 409 quando há conflito (email duplicado)
 * - Use 500 quando há erro não previsto
 */

// ============================================
// 4. BANCO DE DADOS - SQLite
// ============================================

/**
 * SQLite - Banco de dados SQL embutido
 * 
 * Características:
 * - Sem servidor, arquivo local (.db)
 * - SQL completo (SELECT, INSERT, UPDATE, DELETE)
 * - Leve, ideal para aprendizado
 * - Não recomendado para grandes aplicações (use PostgreSQL)
 * 
 * Tabela: usuarios
 * ┌────┬──────────────┬──────────────────┬──────────────┬──────────────┬──────────────┐
 * │ id │ nome         │ email            │ senha        │ data_criacao │ data_atual   │
 * ├────┼──────────────┼──────────────────┼──────────────┼──────────────┼──────────────┤
 * │ 1  │ João Silva   │ joao@email.com   │ hash...      │ 2024-01-15   │ 2024-01-15   │
 * │ 2  │ Maria Santos │ maria@email.com  │ hash...      │ 2024-01-16   │ 2024-01-16   │
 * └────┴──────────────┴──────────────────┴──────────────┴──────────────┴──────────────┘
 * 
 * SQL para criar tabela:
 * CREATE TABLE usuarios (
 *   id INTEGER PRIMARY KEY AUTOINCREMENT,
 *   nome TEXT NOT NULL,
 *   email TEXT NOT NULL UNIQUE,
 *   senha TEXT NOT NULL,
 *   data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
 *   data_atualizacao DATETIME DEFAULT CURRENT_TIMESTAMP
 * );
 * 
 * PRIMARY KEY - Chave primária, identifica único
 * NOT NULL - Campo obrigatório
 * UNIQUE - Não pode repetir (ex: email único)
 * DEFAULT - Valor padrão se não informado
 * AUTOINCREMENT - Incrementa automaticamente
 */

// ============================================
// 5. VALIDAÇÃO DE DADOS
// ============================================

/**
 * Por que validar?
 * - Segurança: Previne ataques (SQL Injection, XSS)
 * - Integridade: Garante dados corretos
 * - UX: Feedback rápido ao usuário
 * 
 * DUAS CAMADAS DE VALIDAÇÃO:
 * 
 * 1. Frontend (React Hook Form)
 * - Feedback imediato enquanto digita
 * - Melhor experiência do usuário
 * - NÃO é seguro (pode ser burlado)
 * 
 * Exemplo:
 * <input {...register('email', {
 *   required: 'Email obrigatório',
 *   pattern: {
 *     value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
 *     message: 'Email inválido'
 *   }
 * })} />
 * 
 * 2. Backend (Express)
 * - Validação rigorosa
 * - REALMENTE segura
 * - SEMPRE necessária
 * 
 * Exemplo:
 * function validarEmail(email) {
 *   const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 *   return regexEmail.test(email);
 * }
 * 
 * Regras de email:
 * - Deve conter @
 * - Deve conter domínio
 * - Deve conter extensão (.com, .br, etc)
 * 
 * Regras de senha (forte):
 * ✓ Mínimo 8 caracteres
 * ✓ Pelo menos uma maiúscula
 * ✓ Pelo menos uma minúscula
 * ✓ Pelo menos um número
 * ✓ Pelo menos um caractere especial
 * 
 * Regex da senha forte:
 * /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{8,}$/
 * 
 * Explicação:
 * (?=.*[a-z])   - Lookahead: verifica se tem minúscula
 * (?=.*[A-Z])   - Lookahead: verifica se tem maiúscula
 * (?=.*\d)      - Lookahead: verifica se tem número
 * (?=.*[@$...]) - Lookahead: verifica se tem caractere especial
 * [a-zA-Z...]{8,} - Mínimo 8 caracteres
 */

// ============================================
// 6. CRIPTOGRAFIA DE SENHA COM BCRYPT
// ============================================

/**
 * O QUÊ NÃO FAZER:
 * ❌ Armazenar senha em texto plano
 * ❌ Usar MD5 ou SHA1 (quebrados)
 * ❌ Usar cifra reversível
 * 
 * O QUÊ FAZER:
 * ✅ Usar bcrypt (ou Argon2)
 * 
 * Como bcrypt funciona:
 * 
 * 1. HASHING (criação):
 *    Senha em texto plano: "Senha123!"
 *    ↓ (bcrypt com salt e múltiplas iterações)
 *    Hash: $2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36DRcx76
 * 
 * 2. VERIFICAÇÃO (login):
 *    Senha digitada: "Senha123!"
 *    Hash armazenado: $2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36DRcx76
 *    ↓ (bcrypt.compare)
 *    Resultado: true (senhas correspondem)
 * 
 * Por que é seguro:
 * - Unidirecional (não pode descriptografar)
 * - Salt (valor aleatório previne dicionário)
 * - Lento (10 rounds = ~100ms por hash)
 * - Tempo aumenta conforme computadores ficam rápidos
 * 
 * Exemplo de código:
 * 
 * // Criação
 * const senha = "Senha123!";
 * const senhaHash = await bcrypt.hash(senha, 10); // 10 rounds
 * // senhaHash ≈ $2b$10$...
 * db.run('INSERT INTO usuarios (senha) VALUES (?)', [senhaHash]);
 * 
 * // Verificação (login)
 * const senhaDigitada = "Senha123!";
 * const senhaArmazenada = // buscar do banco
 * const match = await bcrypt.compare(senhaDigitada, senhaArmazenada);
 * if (match) {
 *   // Senha correta!
 * } else {
 *   // Senha incorreta!
 * }
 */

// ============================================
// 7. SQL INJECTION - O QUE É E COMO PREVENIR
// ============================================

/**
 * SQL Injection é um ataque onde o usuário malicioso
 * envia código SQL em lugar de dados
 * 
 * EXEMPLO VULNERÁVEL:
 * 
 * // ❌ NÃO FAZER ISSO!
 * const email = req.body.email; // "' OR '1'='1"
 * const sql = `SELECT * FROM usuarios WHERE email = '${email}'`;
 * // Resultado: SELECT * FROM usuarios WHERE email = '' OR '1'='1'
 * // Isso retorna TODOS os usuários!
 * 
 * SOLUÇÃO - USAR PLACEHOLDERS:
 * 
 * // ✅ FAZER ASSIM!
 * const email = req.body.email;
 * const sql = 'SELECT * FROM usuarios WHERE email = ?';
 * db.get(sql, [email], callback);
 * // O ? é um placeholder seguro
 * // O email é passado separadamente e escapado automaticamente
 * 
 * COMO FUNCIONA:
 * 1. SQL é preparado com placeholders
 * 2. Valores são escapados (caracteres especiais neutralizados)
 * 3. SQL + valores são combinados de forma segura
 * 4. Impossível injetar código SQL
 * 
 * REGRA DE OURO:
 * NUNCA concatenar strings em SQL!
 * SEMPRE usar placeholders (?, :param, etc)
 */

// ============================================
// 8. REQUISIÇÕES HTTP COM AXIOS
// ============================================

/**
 * Axios é um cliente HTTP moderno
 * 
 * Características:
 * - Baseado em Promises
 * - Suporta async/await
 * - Interceptadores
 * - Timeout automático
 * - Melhor tratamento de erro
 * 
 * Exemplo básico:
 * 
 * import axios from 'axios';
 * 
 * // GET
 * const response = await axios.get('http://api.com/usuarios');
 * console.log(response.data);
 * 
 * // POST
 * const response = await axios.post('http://api.com/register', {
 *   nome: 'João',
 *   email: 'joao@email.com',
 *   senha: 'Senha123!'
 * });
 * 
 * // Tratamento de erro
 * try {
 *   const response = await axios.post('/register', data);
 *   console.log(response.data);
 * } catch (error) {
 *   // error.response → resposta HTTP com erro
 *   // error.message → mensagem de erro
 *   // error.code → código do erro
 *   
 *   if (error.response?.status === 409) {
 *     console.log('Email já existe');
 *   } else if (error.message === 'Network Error') {
 *     console.log('Servidor desligado');
 *   }
 * }
 * 
 * Diferença GET vs POST:
 * GET  - Sem body, dados na URL
 * POST - Com body, dados no JSON
 * 
 * axios.get('/usuarios?page=1')           // Query string
 * axios.post('/usuarios', { nome: '...' }) // Body JSON
 */

// ============================================
// 9. REACT HOOK FORM
// ============================================

/**
 * React Hook Form simplifica gerenciamento de formulários
 * 
 * Características:
 * - Validação integrada
 * - Performance otimizada
 * - Pequeno bundle size
 * - Fácil de usar
 * 
 * Estrutura básica:
 * 
 * import { useForm } from 'react-hook-form';
 * 
 * export default function Formulario() {
 *   const { 
 *     register,      // Registra campos
 *     handleSubmit,  // Valida e chama função
 *     formState,     // Estado do formulário
 *     watch          // Observa valores
 *   } = useForm();
 * 
 *   const onSubmit = (data) => {
 *     // data já foi validado!
 *     console.log(data);
 *   };
 * 
 *   return (
 *     <form onSubmit={handleSubmit(onSubmit)}>
 *       <input {...register('email', {
 *         required: 'Email obrigatório',
 *         pattern: {
 *           value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
 *           message: 'Email inválido'
 *         }
 *       })} />
 *       {formState.errors.email && (
 *         <span>{formState.errors.email.message}</span>
 *       )}
 *       <button type="submit">Enviar</button>
 *     </form>
 *   );
 * }
 * 
 * FLUXO:
 * 1. Usuário digita no input
 * 2. Input está registrado com register()
 * 3. Usuário clica em submit
 * 4. handleSubmit valida todos os campos
 * 5. Se válido, chama onSubmit(data)
 * 6. Se inválido, preenche formState.errors
 * 
 * Vantagens sobre state manual:
 * ❌ useState para cada campo
 * ✅ Apenas um useForm() para todos
 * 
 * ❌ Validação manual em cada campo
 * ✅ Validação declarativa no register
 * 
 * ❌ Re-render em cada mudança
 * ✅ Re-render apenas de campos necessários
 */

// ============================================
// 10. FLUXO COMPLETO: DO CADASTRO AO LOGIN
// ============================================

/**
 * CADASTRO (Register):
 * 
 * 1. Usuário preenche formulário
 *    Nome: "João Silva"
 *    Email: "joao@email.com"
 *    Senha: "Senha123!"
 *    Confirma: "Senha123!"
 * 
 * 2. Frontend valida com React Hook Form
 *    ✓ Nome ≥ 3 caracteres
 *    ✓ Email válido
 *    ✓ Senha forte
 *    ✓ Senhas conferem
 * 
 * 3. Frontend faz POST /api/register com Axios
 *    {
 *      "nome": "João Silva",
 *      "email": "joao@email.com",
 *      "senha": "Senha123!",
 *      "confirmaSenha": "Senha123!"
 *    }
 * 
 * 4. Backend recebe e valida NOVAMENTE
 *    ✓ Campos preenchidos
 *    ✓ Email válido
 *    ✓ Senha forte
 *    ✓ Email não duplicado
 * 
 * 5. Backend criptografa senha com bcrypt
 *    bcrypt.hash("Senha123!", 10)
 *    → $2b$10$N9qo8uLOickgx2ZMRZoMyeIj...
 * 
 * 6. Backend insere no SQLite
 *    INSERT INTO usuarios (nome, email, senha)
 *    VALUES ('João Silva', 'joao@email.com', '$2b$10$...')
 * 
 * 7. Backend retorna 201 Created
 *    {
 *      "success": true,
 *      "message": "Usuário cadastrado com sucesso!",
 *      "usuario": {
 *        "id": 1,
 *        "nome": "João Silva",
 *        "email": "joao@email.com"
 *      }
 *    }
 * 
 * 8. Frontend mostra mensagem de sucesso
 * 
 * ============================================
 * 
 * LOGIN (Login):
 * 
 * 1. Usuário preenche formulário
 *    Email: "joao@email.com"
 *    Senha: "Senha123!"
 * 
 * 2. Frontend valida
 *    ✓ Email preenchido
 *    ✓ Senha preenchida
 * 
 * 3. Frontend faz POST /api/login
 *    {
 *      "email": "joao@email.com",
 *      "senha": "Senha123!"
 *    }
 * 
 * 4. Backend busca usuário por email
 *    SELECT * FROM usuarios WHERE email = 'joao@email.com'
 *    → Encontrou: { id: 1, nome: '...', email: '...', senha: '$2b$10$...' }
 * 
 * 5. Backend compara senha com bcrypt.compare
 *    bcrypt.compare('Senha123!', '$2b$10$...')
 *    → true (senhas correspondem!)
 * 
 * 6. Backend retorna 200 OK
 *    {
 *      "success": true,
 *      "message": "Login realizado com sucesso!",
 *      "usuario": {
 *        "id": 1,
 *        "nome": "João Silva",
 *        "email": "joao@email.com"
 *      }
 *    }
 * 
 * 7. Frontend salva usuário em localStorage
 *    localStorage.setItem('usuario', JSON.stringify(usuario))
 * 
 * 8. Frontend mostra mensagem de sucesso
 *    "Bem-vindo, João Silva!"
 */

// ============================================
// 11. ERROS COMUNS E COMO EVITAR
// ============================================

/**
 * ❌ Erro: Armazenar senha em texto plano
 * ✅ Solução: Usar bcrypt (ou Argon2)
 * 
 * ❌ Erro: Validar apenas no frontend
 * ✅ Solução: Validar também no backend
 * 
 * ❌ Erro: Não tratar erros de requisição
 * ✅ Solução: Usar try/catch com Axios
 * 
 * ❌ Erro: Usar concatenação em SQL
 * ✅ Solução: Usar placeholders (?)
 * 
 * ❌ Erro: Retornar dados sensíveis (senha, token)
 * ✅ Solução: Filtrar dados na resposta
 * 
 * ❌ Erro: Não validar tipo de dado
 * ✅ Solução: Verificar typeof no backend
 * 
 * ❌ Erro: Não limitar tamanho de requisição
 * ✅ Solução: Definir limite (express.json({ limit }))
 * 
 * ❌ Erro: CORS desabilitado
 * ✅ Solução: Usar middleware cors()
 * 
 * ❌ Erro: Não desabilitar botão durante requisição
 * ✅ Solução: Usar loading state
 * 
 * ❌ Erro: Não limpar formulário após sucesso
 * ✅ Solução: Usar reset() do React Hook Form
 */

// ============================================
// 12. PERGUNTAS PARA AUTOTESTE
// ============================================

/**
 * 1. O que significa REST?
 *    R: Representational State Transfer
 * 
 * 2. Qual é a diferença entre GET e POST?
 *    R: GET obtém dados, POST cria dados
 * 
 * 3. Por que validar no backend?
 *    R: Segurança, o frontend pode ser burlado
 * 
 * 4. Como bcrypt funciona?
 *    R: Hash unidirecional com salt, impossível descriptografar
 * 
 * 5. O que é SQL Injection?
 *    R: Ataque onde código SQL é injetado via inputs
 * 
 * 6. Como prevenir SQL Injection?
 *    R: Usar placeholders (?) em queries SQL
 * 
 * 7. Qual status HTTP usar para criar recurso?
 *    R: 201 Created
 * 
 * 8. Qual status usar quando email já existe?
 *    R: 409 Conflict
 * 
 * 9. O que é React Hook Form?
 *    R: Biblioteca para gerenciar formulários no React
 * 
 * 10. Como usar Axios para fazer POST?
 *     R: axios.post('/url', { dados })
 * 
 * 11. Por que usar try/catch com Axios?
 *     R: Para tratar erros de rede e resposta
 * 
 * 12. Onde armazenar informações após login?
 *     R: localStorage ou sessionStorage
 */

console.log('📚 Guia de estudos carregado!');
console.log('Leia este arquivo antes de fazer a prova.');
