# 🔐 Sistema de Autenticação com React, Node.js e SQLite

> Aplicação educacional completa com **Paginação** e **React Context API**

[![Status](https://img.shields.io/badge/Status-Pronto%20para%20Deploy-brightgreen)]()
[![Node.js](https://img.shields.io/badge/Node.js-16%2B-green)]()
[![React](https://img.shields.io/badge/React-18.2-blue)]()
[![Features](https://img.shields.io/badge/Features-Paginação%20|%20Context%20|%20Validações-orange)]()

## 📋 Descrição Geral

Este é um **projeto educacional COMPLETO** com sistema de autenticação, paginação e gerenciamento de estado global com React Context API.

Inclui:
- ✅ Backend com Express.js e SQLite
- ✅ Frontend com React e React Hook Form
- ✅ **Paginação de usuários** (página, limite, controles)
- ✅ **React Context API** para autenticação global
- ✅ Validação rigorosa (frontend + backend)
- ✅ Criptografia de senhas com bcrypt
- ✅ Integração HTTP com Axios
- ✅ Tratamento de erros abrangente
- ✅ Comentários explicativos em todo código
- ✅ Material de apoio para aprender conceitos

## 🎯 Requisitos Atendidos

✅ **Banco de Dados**: SQLite com persistência  
✅ **Gerenciamento de Formulário**: React Hook Form  
✅ **Validação**: Frontend (UX) + Backend (Segurança)  
✅ **Tratamento de Exceções**: Mensagens descritivas  
✅ **Requisições HTTP**: Axios com interceptadores  
✅ **NOVO - Paginação**: Listagem com página, limite, controles  
✅ **NOVO - React Context**: Autenticação global  
✅ **NOVO - Deploy**: Pronto para Vercel + Render  
✅ **Didático**: Comentários em todos os arquivos

## 🏗️ Estrutura do Projeto

```
Portifolio-para-prova/
│
├── backend/                                    # API REST
│   ├── src/
│   │   ├── database.js           # SQLite + CRUD + bcrypt + Validações
│   │   ├── routes.js             # Endpoints (register, login, usuarios com paginação)
│   │   └── ...
│   ├── server.js                 # Servidor Express
│   ├── package.json
│   ├── .env                      # Variáveis de ambiente
│   ├── usuarios.db               # Banco (auto-criado)
│   └── .gitignore
│
├── frontend/                                   # Aplicação React
│   ├── src/
│   │   ├── components/
│   │   │   ├── AuthForm.jsx      # Cadastro + Login (React Hook Form)
│   │   │   ├── AuthForm.css
│   │   │   ├── UserList.jsx      # Listagem com PAGINAÇÃO ⭐
│   │   │   └── UserList.css
│   │   ├── context/
│   │   │   └── AuthContext.jsx   # Contexto global de autenticação ⭐
│   │   ├── services/
│   │   │   └── api.js            # Cliente Axios com interceptadores
│   │   ├── App.jsx               # Componente raiz
│   │   ├── App.css
│   │   ├── main.jsx              # Entrada com AuthProvider
│   │   └── index.css             # Estilos globais
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── .gitignore
│
├── README.md                                   # Este arquivo
├── GUIA_ESTUDOS.js                            # Material para prova
├── GUIA_RAPIDO.js                             # Início em 5 min
├── TESTE_ENDPOINTS.md                         # Exemplos de API
└── .gitignore
```

### ⭐ Arquivos Novos/Melhorados

1. **AuthContext.jsx** - React Context para autenticação global
   - Centraliza estado de usuário, token, carregamento, erro, sucesso
   - Hook `useAuth()` para usar em qualquer componente
   - Funções: register, login, logout, limparMensagens

2. **UserList.jsx** - Listagem com PAGINAÇÃO
   - GET /api/usuarios?page=1&limit=10
   - Controles: Anterior, Próxima, Seletor de limite (5, 10, 20, 50)
   - Mostra: Total de itens, página atual, total de páginas

3. **database.js** - Backend com paginação
   - Função `listarUsuarios(page, limit)` com OFFSET
   - Calcula automaticamente offset = (page - 1) * limit
   - Retorna dados + metadados de paginação
    │   └── App.css
    ├── index.html
    ├── vite.config.js
    ├── package.json
    ├── .gitignore
    └── README.md
```

## 🚀 Como Executar Localmente

### Pré-requisitos
- **Node.js 16+** ([Baixe aqui](https://nodejs.org/))
- **npm** (incluso com Node.js)

### Passo 1: Instalar Dependências do Backend

```bash
cd backend
npm install
```

**Dependências:**
- `express` - Framework web
- `sqlite3` - Banco de dados
- `bcrypt` - Criptografia de senha
- `cors` - Permitir requisições
- `dotenv` - Variáveis de ambiente

### Passo 2: Iniciar o Backend

```bash
# Na pasta backend
npm start

# Você verá:
# ✅ SERVIDOR INICIADO COM SUCESSO
# 📍 Porta: 5000
# 🌍 URL: http://localhost:5000
```

### Passo 3: Instalar Dependências do Frontend (novo terminal)

```bash
cd frontend
npm install
```

**Dependências:**
- `react` - Framework UI
- `react-hook-form` - Gerenciamento de formulários
- `axios` - Cliente HTTP
- `vite` - Bundler rápido

### Passo 4: Iniciar o Frontend (novo terminal)

```bash
# Na pasta frontend
npm run dev

# Abrirá automaticamente em http://localhost:3000
```

**✅ Pronto!** Você tem:
- Backend em `http://localhost:5000`
- Frontend em `http://localhost:3000`
npm start

# Ou com auto-reload em desenvolvimento
npm run dev
```

## 🧪 Testando a Aplicação

### 1. **Criar uma Conta**

1. Clique na aba "📝 **Cadastro**"
2. Preencha:
   - **Nome**: João Silva (min 3 caracteres, apenas letras)
   - **Email**: joao@email.com (formato válido)
   - **Senha**: `Senha123!` (maiúscula, minúscula, número, caractere especial)
   - **Confirmar Senha**: `Senha123!`
3. Clique em "✓ **Criar Conta**"
4. Receberá confirmação ✅

### 2. **Fazer Login**

1. Clique na aba "🔑 **Login**"
2. Preencha:
   - **Email**: joao@email.com
   - **Senha**: Senha123!
3. Clique em "🔓 **Entrar**"
4. Será redirecionado para o **Dashboard**

### 3. **Visualizar Lista com Paginação** ⭐

Após fazer login, você verá:
- ✅ Tabela de usuários cadastrados
- ✅ **Controles de paginação**:
  - Botões: **Anterior** | **Próxima**
  - Seletor: 5, 10, 20, 50 itens por página
  - Info: Página X de Y, Total de itens
- ✅ Colunas: ID, Nome, Email, Data de Criação

### 4. **Testar Validações**

**Frontend:**
- Nome com menos de 3 caracteres
- Email sem @ ou domínio inválido
- Senhas não conferem
- Senha fraca

**Backend:**
- Email já cadastrado → 409
- Email/senha incorretos → 401
- Dados inválidos → 400

## ⭐ NOVAS FEATURES: Paginação e React Context

### 1. **Paginação de Usuários**

#### Backend Endpoint
```bash
GET /api/usuarios?page=1&limit=10
```

**Resposta:**
```json
{
  "data": [
    { "id": 1, "nome": "João", "email": "joao@email.com", "criadoEm": "..." },
    { "id": 2, "nome": "Maria", "email": "maria@email.com", "criadoEm": "..." }
  ],
  "paginacao": {
    "paginaAtual": 1,
    "itensPorPagina": 10,
    "totalItens": 25,
    "totalPaginas": 3,
    "temProxima": true,
    "temAnterior": false
  }
}
```

#### Frontend - Componente UserList.jsx
```jsx
// Usar paginação:
const [page, setPage] = useState(1);
const [limit, setLimit] = useState(10);

// Fazer requisição
const response = await api.get('/usuarios', {
  params: { page, limit }
});

// Acessar dados
const usuarios = response.data.data;
const paginacao = response.data.paginacao;
```

**Como funciona o OFFSET:**
- Página 1, Limite 10 → OFFSET 0 → Usuários 1-10
- Página 2, Limite 10 → OFFSET 10 → Usuários 11-20
- Página 3, Limite 5 → OFFSET 10 → Usuários 11-15

### 2. **React Context API para Autenticação** ⭐

#### O que é Context API?
- Solução nativa do React para estado global
- Evita "prop drilling" (passar props por vários níveis)
- Compartilha dados entre componentes distantes

#### Estrutura
```jsx
// main.jsx - Envolver aplicação
<AuthProvider>
  <App />
</AuthProvider>

// Em qualquer componente
const { usuario, isAutenticado, login, logout } = useAuth();
```

#### Estado Gerenciado
```javascript
{
  usuario: { id, nome, email, criadoEm },      // Dados do usuário
  token: "token-de-sessao",                     // Token de autenticação
  carregando: false,                             // Durante requisição
  erro: null,                                    // Mensagens de erro
  sucesso: null,                                 // Mensagens de sucesso
  isAutenticado: true,                           // Boolean de auth
  
  // Funções
  register(nome, email, senha, confirmaSenha),  // Cadastrar
  login(email, senha),                           // Fazer login
  logout(),                                      // Sair
  limparMensagens()                              // Limpar alertas
}
```

#### Fluxo
```
AuthForm (não autenticado)
    ↓
useAuth() → login()
    ↓
Backend valida
    ↓
setUsuario() → Context atualiza
    ↓
UserList (autenticado, mostra dashboard)
```

## 📚 Conceitos Aprendidos

### 1. REST API
- HTTP Methods: GET, POST, PUT, DELETE
- Status codes: 200, 201, 400, 401, 409, 500
- Endpoints RESTful

### 2. Banco de Dados Relacional
- SQLite: Banco leve
- Tabelas com constraints
- Índices para performance

### 3. Criptografia
- **bcrypt**: Hash seguro
- **Salt**: Valor aleatório
- Comparação segura

### 4. Validação em Camadas
- Frontend: UX rápida
- Backend: Segurança real

### 5. React Hooks & Context ⭐
- `useState`: Estado local
- `useContext`: Estado global
- `useCallback`: Memoizar funções
- Context API: Compartilhar estado

### 6. Paginação ⭐
- LIMIT e OFFSET em SQL
- Cálculo: `offset = (página - 1) * limite`
- Metadados: total, páginas, próxima/anterior

### 7. Tratamento de Erro
- Try/catch
- Status codes descritivos
- Mensagens claras

## 🌍 Deploy em Produção

### Backend Deploy (Render.com)

1. Acesse [https://render.com](https://render.com)
2. Conecte conta GitHub
3. Crie **Web Service**
4. Configure:
   - **Start Command**: `npm start`
   - **Environment**: Node
5. Deploy! 🚀

**URL**: `https://seu-app.onrender.com`

### Frontend Deploy (Vercel.com)

1. Acesse [https://vercel.com](https://vercel.com)
2. Importe repositório
3. Configure:
   - **Framework**: Vite
   - **Build**: `npm run build`
   - **Output**: `dist`
   - **Root**: `frontend`
4. Adicione variable: `VITE_API_URL=https://seu-backend.onrender.com/api`
5. Deploy! 🚀

**URL**: `https://seu-app.vercel.app`

## 📝 Resumo de Features

| Feature | Status | Arquivo |
|---------|--------|---------|
| Cadastro | ✅ Implementado | AuthForm.jsx |
| Login | ✅ Implementado | AuthForm.jsx |
| **Paginação** | ✅ **NOVO** | UserList.jsx, routes.js |
| **React Context** | ✅ **NOVO** | AuthContext.jsx |
| Validações | ✅ Implementado | Ambos |
| Criptografia | ✅ Implementado | database.js |
| Deploy | ✅ Pronto | Docs acima |

## 🎓 Estude Estes Arquivos

Para aprender cada conceito:

1. **Paginação** → Abra `database.js` e `routes.js`
   - Veja função `listarUsuarios(page, limit)`
   - Entenda cálculo de offset
   
2. **React Context** → Abra `AuthContext.jsx`
   - Veja `createContext()`
   - Entenda hook `useAuth()`
   - Trace as funções `login`, `register`, `logout`

3. **Componente com Context** → Abra `App.jsx`
   - Veja como usar `useAuth()`
   - Renderização condicional

4. **Listagem Paginada** → Abra `UserList.jsx`
   - Veja uso de Context
   - useEffect para requisição
   - Componentes de paginação
