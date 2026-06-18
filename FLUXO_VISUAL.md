# 🔄 Fluxo Visual da Aplicação

## 🎬 Cenário: Novo Usuário

```
┌─────────────────────────────────────────────────────────────┐
│  1️⃣  USUÁRIO ENTRA NO APP                                    │
└─────────────────────────────────────────────────────────────┘
                             │
                             ▼
       ┌────────────────────────────────────────────┐
       │  App.jsx                                   │
       │  useAuth() → isAutenticado = false         │
       └────────────────────────────────────────────┘
                             │
                             ▼
       ┌────────────────────────────────────────────┐
       │  AuthForm.jsx                              │
       │  Mostra: 📝 Cadastro | 🔑 Login            │
       └────────────────────────────────────────────┘
                             │
                    ┌────────┴────────┐
                    │                 │
                    ▼                 ▼
         ┌────────────────┐  ┌───────────────┐
         │  CADASTRO      │  │  LOGIN        │
         └────────────────┘  └───────────────┘
```

---

## 📝 Fluxo: CADASTRO

```
┌─────────────────────────────────────────────────────────────┐
│  2️⃣  USUÁRIO PREENCHE FORMULÁRIO DE CADASTRO                 │
│  Nome: "João Silva"                                         │
│  Email: "joao@email.com"                                    │
│  Senha: "Senha123!"                                         │
│  Confirmar: "Senha123!"                                     │
└─────────────────────────────────────────────────────────────┘
                             │
                             ▼
       ┌────────────────────────────────────────────┐
       │  AuthForm.jsx → React Hook Form            │
       │  ✓ Valida nome (3+ chars, só letras)      │
       │  ✓ Valida email (regex)                    │
       │  ✓ Valida senha (8+, maiúsc, etc)         │
       │  ✓ Compara password === confirmPassword    │
       └────────────────────────────────────────────┘
                             │
              [Validação PASSOU? Sim]
                             │
                             ▼
       ┌────────────────────────────────────────────┐
       │  api.js → api.post('/api/register')        │
       │  Envia JSON com dados                      │
       └────────────────────────────────────────────┘
                             │
         [Vai para Backend]  │
                             ▼
       ┌────────────────────────────────────────────┐
       │  routes.js → POST /api/register            │
       │  ✓ Valida novamente (backend)              │
       │  ✓ Verifica se email já existe              │
       │  → Sim? Retorna 409 (Conflict)             │
       │  → Não? Continua...                        │
       └────────────────────────────────────────────┘
                             │
                             ▼
       ┌────────────────────────────────────────────┐
       │  database.js                               │
       │  1. Valida novamente (3 camadas!)          │
       │  2. criptografarSenha(senha)               │
       │     → bcrypt.hash("Senha123!", 10)         │
       │     → "$2b$10$..." (hash com salt)         │
       │  3. INSERT INTO usuarios VALUES (...)       │
       └────────────────────────────────────────────┘
                             │
              [Sucesso 201?]  │
                             ▼
       ┌────────────────────────────────────────────┐
       │  API Retorna:                              │
       │  {                                         │
       │    "id": 1,                                │
       │    "nome": "João Silva",                   │
       │    "email": "joao@email.com",              │
       │    "criadoEm": "2026-06-18T10:30:00Z"     │
       │  }                                         │
       └────────────────────────────────────────────┘
                             │
                             ▼
       ┌────────────────────────────────────────────┐
       │  AuthContext.jsx → setSuccesso()           │
       │  Mostra mensagem: ✅ Conta criada!         │
       │  Usuario temporariamente setado            │
       └────────────────────────────────────────────┘
                             │
                             ▼
       ┌────────────────────────────────────────────┐
       │  Redireciona para Login após 2s            │
       │  (Usuário precisa fazer login)             │
       └────────────────────────────────────────────┘
```

---

## 🔑 Fluxo: LOGIN

```
┌─────────────────────────────────────────────────────────────┐
│  3️⃣  USUÁRIO FAZ LOGIN                                       │
│  Email: "joao@email.com"                                    │
│  Senha: "Senha123!"                                         │
└─────────────────────────────────────────────────────────────┘
                             │
                             ▼
       ┌────────────────────────────────────────────┐
       │  AuthForm.jsx → React Hook Form            │
       │  ✓ Valida email                            │
       │  ✓ Valida senha                            │
       └────────────────────────────────────────────┘
                             │
                             ▼
       ┌────────────────────────────────────────────┐
       │  api.js → api.post('/api/login')           │
       │  Envia: {email, senha}                     │
       └────────────────────────────────────────────┘
                             │
         [Vai para Backend]  │
                             ▼
       ┌────────────────────────────────────────────┐
       │  routes.js → POST /api/login               │
       │  chamada autenticarUsuario(email, senha)   │
       └────────────────────────────────────────────┘
                             │
                             ▼
       ┌────────────────────────────────────────────┐
       │  database.js → autenticarUsuario()         │
       │  1. SELECT * FROM usuarios WHERE email=?  │
       │  2. Encontrou? Não? → Retorna null         │
       │  3. Encontrou? Sim → continua              │
       │  4. compararSenha("Senha123!", hash)       │
       │     → bcrypt.compare()                     │
       │     → "Senha123!" combina com "$2b$10..."?│
       │     → Sim? ✅ Login bem-sucedido!         │
       │     → Não? ❌ Senha incorreta              │
       └────────────────────────────────────────────┘
                             │
              [Login OK?]     │
                ┌────────────┴────────────┐
                │                         │
              SIM                       NÃO
                │                         │
                ▼                         ▼
       ┌──────────────┐        ┌──────────────────┐
       │ Retorna 200  │        │ Retorna 401      │
       │ com usuario  │        │ "Não autorizado" │
       │ e token      │        └──────────────────┘
       └──────────────┘                  │
                │                        ▼
                │              AuthContext.jsx
                │              setErro("Senha incorreta")
                │
                ▼
       ┌────────────────────────────────────────────┐
       │  api.js → Response Interceptor             │
       │  Salva token no localStorage               │
       │  localStorage.setItem('authToken', token)  │
       └────────────────────────────────────────────┘
                             │
                             ▼
       ┌────────────────────────────────────────────┐
       │  AuthContext.jsx                           │
       │  setUsuario(usuarioDoBackend)              │
       │  setToken(token)                           │
       │  setCarregando(false)                      │
       │  isAutenticado = true ✅                   │
       └────────────────────────────────────────────┘
                             │
                             ▼
       ┌────────────────────────────────────────────┐
       │  App.jsx rende-renderiza                   │
       │  isAutenticado = true → Mostra Dashboard   │
       │  ✅ Bem-vindo, João Silva!                 │
       │  <UserList />                              │
       └────────────────────────────────────────────┘
```

---

## 📊 Fluxo: PAGINAÇÃO (Dashboard)

```
┌─────────────────────────────────────────────────────────────┐
│  4️⃣  DASHBOARD COM TABELA DE USUÁRIOS                        │
│  Mostra 10 usuários por página (padrão)                      │
└─────────────────────────────────────────────────────────────┘
                             │
                             ▼
       ┌────────────────────────────────────────────┐
       │  UserList.jsx carrega                      │
       │  useEffect(() => {                         │
       │    buscarUsuarios()                        │
       │  }, [paginaAtual, itensPorPagina])         │
       └────────────────────────────────────────────┘
                             │
                             ▼
       ┌────────────────────────────────────────────┐
       │  api.js → api.get('/api/usuarios')         │
       │  Query params: ?page=1&limit=10            │
       │  Headers: Authorization: Bearer [token]    │
       └────────────────────────────────────────────┘
                             │
         [Vai para Backend]  │
                             ▼
       ┌────────────────────────────────────────────┐
       │  routes.js → GET /api/usuarios             │
       │  Extrai: page=1, limit=10                  │
       │  Chama: listarUsuarios(1, 10)              │
       └────────────────────────────────────────────┘
                             │
                             ▼
       ┌────────────────────────────────────────────┐
       │  database.js → listarUsuarios(page, limit) │
       │  Calcula: offset = (1-1)*10 = 0            │
       │  SELECT * FROM usuarios                    │
       │    LIMIT 10                                │
       │    OFFSET 0                                │
       │  [Retorna usuários 1-10]                   │
       │                                            │
       │  COUNT(*) → 47 usuários no total           │
       │  totalPaginas = 47 / 10 = 5 (arredonda)   │
       │  temProxima = 1 < 5 ? true                 │
       │  temAnterior = 1 > 1 ? false               │
       └────────────────────────────────────────────┘
                             │
                             ▼
       ┌────────────────────────────────────────────┐
       │  API Retorna:                              │
       │  {                                         │
       │    "data": [                               │
       │      {id: 1, nome: "João", email: "..."},  │
       │      {id: 2, nome: "Maria", email: "..."},│
       │      ... (8 mais)                          │
       │    ],                                      │
       │    "paginacao": {                          │
       │      "paginaAtual": 1,                     │
       │      "itensPorPagina": 10,                 │
       │      "totalItens": 47,                     │
       │      "totalPaginas": 5,                    │
       │      "temProxima": true,                   │
       │      "temAnterior": false                  │
       │    }                                       │
       │  }                                         │
       └────────────────────────────────────────────┘
                             │
                             ▼
       ┌────────────────────────────────────────────┐
       │  UserList.jsx renderiza                    │
       │  Tabela com 10 usuários                    │
       │  Botões:                                   │
       │  [Anterior (desabilitado)]                 │
       │  Página 1 de 5                             │
       │  [Próxima (habilitado)]                    │
       │  Limite: [5, 10, 20, 50]                   │
       └────────────────────────────────────────────┘

┌──────────────────────────────────┐
│  USUÁRIO CLICA "PRÓXIMA"        │
└──────────────────────────────────┘
        │
        ▼
    setPaginaAtual(2)
        │
        ▼
    useEffect é disparado novamente
        │
        ▼
    api.get('/api/usuarios?page=2&limit=10')
        │
        ▼
    Backend calcula: offset = (2-1)*10 = 10
        │
        ▼
    SELECT * LIMIT 10 OFFSET 10
    [Retorna usuários 11-20]
        │
        ▼
    Tabela agora mostra:
    Usuários 11-20
    Página 2 de 5
    [Anterior (habilitado)]
    [Próxima (habilitado)]
```

---

## 🔄 Fluxo: MUDA LIMITE

```
┌─────────────────────────────────────────────────────────────┐
│  USUÁRIO MUDA LIMITE DE 10 PARA 20                           │
└─────────────────────────────────────────────────────────────┘
                             │
        Clica no selector: [10] → [20]
                             │
                             ▼
    setItensPorPagina(20)
    setPaginaAtual(1) [volta para página 1]
                             │
                             ▼
    useEffect disparado
                             │
                             ▼
    api.get('/api/usuarios?page=1&limit=20')
                             │
                             ▼
    Backend: offset = (1-1)*20 = 0
    SELECT * LIMIT 20 OFFSET 0
    [Retorna usuários 1-20]
                             │
                             ▼
    totalPaginas = 47 / 20 = 3 (arredonda)
    temProxima = true
    temAnterior = false
                             │
                             ▼
    Tabela renderiza 20 usuários
    Página 1 de 3
```

---

## 🔑 Context Global

```
┌──────────────────────────────────────────────────────┐
│  AuthContext.jsx                                     │
│  ┌────────────────────────────────────────────────┐  │
│  │ Estado Global:                                 │  │
│  │ • usuario = {id, nome, email, criadoEm}       │  │
│  │ • token = "eyJhbGc..." (JWT ou ID)            │  │
│  │ • carregando = true/false                      │  │
│  │ • erro = "mensagem de erro"                    │  │
│  │ • sucesso = "mensagem de sucesso"              │  │
│  │ • isAutenticado = usuario !== null             │  │
│  └────────────────────────────────────────────────┘  │
│                                                      │
│  Funções:                                            │
│  • register(nome, email, senha, confirmaSenha)      │
│  • login(email, senha)                              │
│  • logout()                                         │
│  • limparMensagens()                                │
└──────────────────────────────────────────────────────┘
        │
        └─ Acessível de QUALQUER componente via useAuth()
        │
        ├─→ AuthForm.jsx
        ├─→ App.jsx
        ├─→ UserList.jsx
        └─→ Qualquer componente filho
```

---

## 🛡️ Camadas de Segurança

```
┌────────────────────────────────────────────────────────┐
│  1️⃣  FRONTEND VALIDATION (React Hook Form)             │
│  Regex: email, senha, nome                            │
│  Watch: confirmação de senha em tempo real            │
└────────────────────────────────────────────────────────┘
        │
        ▼
┌────────────────────────────────────────────────────────┐
│  2️⃣  AXIOS INTERCEPTOR (Token)                         │
│  Adiciona: Authorization: Bearer [token]               │
│  Trata 401: Limpa token e logout                       │
└────────────────────────────────────────────────────────┘
        │
        ▼
┌────────────────────────────────────────────────────────┐
│  3️⃣  BACKEND VALIDATION (routes.js)                    │
│  Verificação novamente de todos campos                 │
│  Retorna 400 se inválido                              │
└────────────────────────────────────────────────────────┘
        │
        ▼
┌────────────────────────────────────────────────────────┐
│  4️⃣  BANCO DE DADOS VALIDATION (database.js)           │
│  Terceira validação                                   │
│  Constraints SQL (UNIQUE, NOT NULL, etc)              │
│  Prepared statements (proteção SQL Injection)         │
└────────────────────────────────────────────────────────┘
        │
        ▼
┌────────────────────────────────────────────────────────┐
│  5️⃣  CRIPTOGRAFIA (bcrypt)                             │
│  bcrypt.hash(senha, 10)                               │
│  Armazena: $2b$10$... (nunca senha plana!)           │
│  bcrypt.compare(plana, hash) para verificar           │
└────────────────────────────────────────────────────────┘
```

---

## 📁 Fluxo de Arquivos

```
REQUEST:
┌──────────┐
│ Frontend │
└──────────┘
    │
    ├─→ App.jsx
    ├─→ AuthForm.jsx (ou UserList.jsx)
    ├─→ api.js (Axios)
    │
    └─→ NETWORK REQUEST →
        
BACKEND:
                ┌──────────────────────┐
                │  server.js           │
                │  (Express app)       │
                └──────────────────────┘
                    │
                    ├─→ CORS middleware
                    ├─→ JSON parser middleware
                    │
                    └─→ routes.js
                        │
                        ├─→ POST /register
                        ├─→ POST /login
                        ├─→ GET /usuarios
                        │
                        └─→ database.js
                            │
                            ├─→ initializeDatabase()
                            ├─→ validarEmail()
                            ├─→ criptografarSenha()
                            ├─→ autenticarUsuario()
                            ├─→ listarUsuarios() ← PAGINAÇÃO
                            │
                            └─→ SQLite DB
                                (usuarios.db)
                                    │
                                    └─→ usuarios table

RESPONSE:
        JSON {
            data: [...],
            paginacao: {...}
        }
        │
        └─→ NETWORK ←
            │
            ├─→ Axios Response Interceptor
            ├─→ AuthContext update
            │
            └─→ React re-render
                │
                ├─→ App.jsx
                ├─→ UserList.jsx
                │
                └─→ HTML atualizado
```

---

## 🎯 Resumo Visual

```
USUÁRIO NAÃ AUTENTICADO
        │
        ▼
    Vê: AuthForm
        ├─ Cadastro
        └─ Login

USUÁRIO AUTENTICADO
        │
        ├─ Salvo em Context
        ├─ Token em localStorage
        │
        ▼
    Vê: Dashboard
        ├─ Bem-vindo!
        │
        └─ UserList
            ├─ Tabela
            ├─ Paginação
            └─ Logout botão

PAGINAÇÃO FUNCIONA
        │
        ├─ Page 1, Limit 10 (padrão)
        ├─ Botões: Anterior/Próxima
        ├─ Seletor: 5, 10, 20, 50
        │
        └─ Backend: OFFSET = (page-1)*limit
```

---

**Este fluxo mostra EXATAMENTE como a aplicação funciona de ponta a ponta!**
