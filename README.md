# Sistema de Autenticação - Desenvolvimento Web

## 📋 Descrição Geral

Este é um **projeto educacional completo** de um sistema de cadastro e autenticação de usuários.

Inclui:
- ✅ Backend com Express.js e SQLite
- ✅ Frontend com React e React Hook Form
- ✅ Validação rigorosa (frontend + backend)
- ✅ Criptografia de senhas com bcrypt
- ✅ Integração HTTP com Axios
- ✅ Tratamento de erros abrangente
- ✅ Comentários explicativos em todo código
- ✅ Material de apoio para aprender conceitos

## 🎯 Requisitos Atendidos

✅ **Banco de Dados**: SQLite com persistência de usuários  
✅ **Gerenciamento de Formulário**: React Hook Form  
✅ **Campos**: Nome, Email, Senha, Confirmação de Senha  
✅ **Validação**: Frontend (UX) + Backend (Segurança)  
✅ **Tratamento de Exceções**: Mensagens descritivas  
✅ **Requisições HTTP**: Axios com POST method  
✅ **Didático**: Comentários em todos os arquivos  

## 🏗️ Estrutura do Projeto

```
desenvolvimento web/
├── backend/                    # API REST com Express
│   ├── src/
│   ├── server.js              # Servidor principal
│   ├── database.js            # Gerenciamento SQLite
│   ├── routes.js              # Endpoints da API
│   ├── package.json
│   ├── .env.example
│   ├── .env                   # Variáveis de ambiente
│   ├── usuarios.db            # Banco de dados (criado automaticamente)
│   └── README.md
│
└── frontend/                  # Aplicação React
    ├── src/
    │   ├── components/
    │   │   ├── AuthForm.jsx   # Formulário com React Hook Form
    │   │   └── AuthForm.css   # Estilos
    │   ├── services/
    │   │   └── api.js         # Cliente Axios
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── App.css
    ├── index.html
    ├── vite.config.js
    ├── package.json
    ├── .gitignore
    └── README.md
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js 16+ instalado
- npm ou yarn
- Um editor de código (VS Code recomendado)

### Passo 1: Instalar Dependências do Backend

```bash
# Navegar para a pasta backend
cd backend

# Instalar dependências
npm install
```

**Dependências instaladas:**
- `express` - Framework web
- `sqlite3` - Banco de dados
- `bcrypt` - Criptografia de senha
- `cors` - Comunicação entre frontends
- `dotenv` - Variáveis de ambiente
- `nodemon` - Auto-reload em desenvolvimento

### Passo 2: Instalar Dependências do Frontend

```bash
# Navegar para a pasta frontend
cd ../frontend

# Instalar dependências
npm install
```

**Dependências instaladas:**
- `react` - Framework UI
- `react-dom` - Renderização React
- `react-hook-form` - Gerenciamento de formulário
- `axios` - Cliente HTTP
- `vite` - Bundler rápido

### Passo 3: Iniciar o Backend

```bash
# Na pasta backend
npm start

# Ou com auto-reload em desenvolvimento
npm run dev
```

**Você verá:**
```
✅ Servidor iniciado com sucesso!
📍 Escutando na porta: 5000
🌍 URL: http://localhost:5000
📊 Verificar saúde: http://localhost:5000/health
✅ Conectado ao banco de dados SQLite
✅ Tabela de usuários verificada/criada com sucesso
```

### Passo 4: Iniciar o Frontend (em outro terminal)

```bash
# Na pasta frontend
npm run dev
```

**O navegador abrirá automaticamente em:**
```
http://localhost:3000
```

## 🧪 Testando o Sistema

### 1. Criar uma Conta

1. Clique na aba "📝 Cadastro"
2. Preencha os campos:
   - **Nome**: João Silva (mínimo 3 caracteres, apenas letras)
   - **Email**: joao@email.com (formato válido)
   - **Senha**: Senha123! (maiúscula, minúscula, número, especial, 8+ caracteres)
   - **Confirmar Senha**: Senha123!
3. Clique em "✓ Criar Conta"
4. Você receberá uma mensagem de sucesso ✅

### 2. Fazer Login

1. Clique na aba "🔑 Login"
2. Preencha:
   - **Email**: joao@email.com (mesmo do cadastro)
   - **Senha**: Senha123!
3. Clique em "🔓 Entrar"
4. Você receberá uma mensagem de sucesso ✅

### 3. Testar Validações

**Exemplos de erros que serão capturados:**

**Frontend:**
- Nome com menos de 3 caracteres
- Email inválido (ex: "email123")
- Senhas não conferem
- Senha fraca (sem maiúscula, número, etc)

**Backend:**
- Email já cadastrado
- Email ou senha incorretos no login
- Dados em formato inválido

## 📚 Conceitos Aprendidos

### 1. REST API
- **GET** - Obter dados
- **POST** - Criar dados
- **PUT** - Atualizar dados
- **DELETE** - Deletar dados

### 2. Banco de Dados Relacional
- **SQLite** - Banco leve, ideal para aprendizado
- **Queries SQL** - Selecionar, inserir, atualizar, deletar
- **Integridade de dados** - UNIQUE, NOT NULL
- **Segurança** - Prepared statements contra SQL Injection

### 3. Criptografia
- **bcrypt** - Algoritmo de hash de senha
- **Salt** - Valor aleatório para aumentar segurança
- **Comparação segura** - Verificar senha sem descriptografar

### 4. Validação de Dados
- **Frontend** - React Hook Form para UX rápida
- **Backend** - Validação rigorosa para segurança
- **Regex** - Padrões para validar formato

### 5. Requisições HTTP
- **Status codes** - 200, 201, 400, 401, 409, 500
- **Headers** - Content-Type, Authorization
- **Interceptadores** - Pré/pós-processamento
- **Tratamento de erro** - try/catch com Axios

### 6. React
- **Componentes** - Blocos reutilizáveis
- **Hooks** - useState, useForm, etc
- **Props** - Passar dados entre componentes
- **State** - Dados que mudam na interface

### 7. React Hook Form
- **useForm()** - Gerenciar estado do formulário
- **register** - Registrar campos
- **handleSubmit** - Validar antes de enviar
- **formState.errors** - Erros de validação

## 📖 Estrutura de Resposta da API

### Sucesso (201)
```json
{
  "success": true,
  "message": "Usuário cadastrado com sucesso!",
  "usuario": {
    "id": 1,
    "nome": "João Silva",
    "email": "joao@email.com",
    "data_criacao": "2024-01-15T10:30:00Z"
  }
}
```

### Erro de Validação (400)
```json
{
  "error": "Erro de validação",
  "message": "Email inválido. Formato esperado: usuario@dominio.com"
}
```

### Erro de Autenticação (401)
```json
{
  "error": "Autenticação falhou",
  "message": "Email ou senha incorretos"
}
```

### Conflito (409)
```json
{
  "error": "Conflito",
  "message": "Este email já está cadastrado no sistema"
}
```

## 🐛 Debugging

### Ver Banco de Dados

```bash
# No backend, instale sqlite3 globalmente
npm install -g sqlite3

# Abra o banco
sqlite3 backend/usuarios.db

# Comandos úteis
.tables                    # Ver tabelas
SELECT * FROM usuarios;   # Ver todos usuários
.exit                     # Sair
```

### Ver Requisições HTTP

1. **DevTools (F12)** → Aba Network
2. **Console** - Ver logs das requisições
3. **Backend** - Logs no terminal

### Verificar Saúde do Backend

```bash
curl http://localhost:5000/health
```

### Listar Usuários Cadastrados

```bash
curl http://localhost:5000/api/usuarios
```

## 🔒 Segurança

### Implementado
✅ **Criptografia de Senha** - bcrypt com salt  
✅ **Validação Backend** - Nunca confiar só no frontend  
✅ **SQL Injection Prevention** - Prepared statements  
✅ **CORS** - Controlar acesso de origem  
✅ **Error Handling** - Mensagens genéricas para atacantes  

### NÃO implementado (escopo futuro)
- ❌ JWT Tokens
- ❌ Refresh Tokens
- ❌ Rate Limiting
- ❌ HTTPS/SSL
- ❌ 2FA (Two-Factor Auth)

## 📝 Arquivo por Arquivo

### Backend

| Arquivo | Responsabilidade |
|---------|------------------|
| `server.js` | Inicializa Express, middlewares, rotas |
| `database.js` | Conexão SQLite, funções CRUD, criptografia |
| `routes.js` | Endpoints /register e /login |

### Frontend

| Arquivo | Responsabilidade |
|---------|------------------|
| `main.jsx` | Ponto de entrada React |
| `App.jsx` | Componente raiz |
| `AuthForm.jsx` | Formulário com React Hook Form |
| `api.js` | Cliente Axios com interceptadores |

## 🎓 Material de Apoio para Prova

### Pontos-chave para memorizar

1. **Ciclo de uma requisição HTTP:**
   - Cliente faz requisição
   - Servidor processa
   - Servidor responde com status e dados
   - Cliente trata resposta

2. **Validação em camadas:**
   - Frontend: Feedback rápido ao usuário
   - Backend: Segurança real

3. **Bcrypt:**
   - Hash unidirecional (não pode recuperar senha original)
   - Salt previne ataques de dicionário
   - Mais rounds = mais seguro mas mais lento

4. **React Hook Form:**
   - useForm() cria gerenciador de formulário
   - register() vincula campos
   - handleSubmit() valida antes de chamar função

5. **Axios:**
   - Wrapper moderno sobre XMLHttpRequest
   - Interceptadores para pré/pós-processamento
   - Trata erros de forma clara

6. **SQLite:**
   - Banco de dados relacional leve
   - Stored em arquivo .db
   - Perfeito para prototipagem

## ❓ Perguntas Frequentes

**P: Como resetar o banco de dados?**  
R: Delete o arquivo `backend/usuarios.db` e reinicie o servidor. O banco será criado automaticamente.

**P: Como salvar o token JWT para manter usuário logado?**  
R: O backend precisaria gerar um JWT, o frontend salvaria em localStorage, e incluiria em requisições futuras.

**P: Como validar email no backend?**  
R: Você pode enviar um email de confirmação com um código único.

**P: Como resetar a senha?**  
R: Gerar um token de reset, enviar por email, validar token, permitir novo login.

## 📞 Suporte para Aprendizado

Cada arquivo contém comentários explicativos:
- O QUÊ cada linha faz
- POR QUÊ está sendo feito assim
- COMO funciona o conceito

Leia os comentários enquanto estuda o código!

## 🎯 Próximos Passos

Após dominar este projeto, você pode:

1. Adicionar JWT Tokens
2. Implementar Recuperação de Senha
3. Adicionar Perfil de Usuário
4. Implementar Autorização (Roles/Permissions)
5. Deploy em servidor real (Vercel, Heroku, etc)
6. Adicionar testes automatizados

---

**Criado como material educacional para aprendizado de desenvolvimento web.**
