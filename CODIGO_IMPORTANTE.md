# 📚 Código Importante - Guia de Estudo

> Guia rápido dos conceitos principais implementados no projeto

## ⭐ 1. React Context para Autenticação

### Arquivo: `frontend/src/context/AuthContext.jsx`

#### Criar Contexto
```jsx
import { createContext, useContext } from 'react';

// 1. Criar contexto
const AuthContext = createContext(null);

// 2. Provider que envolve a app
export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  // Funções de autenticação
  const login = async (email, senha) => {
    setCarregando(true);
    try {
      const response = await api.post('/login', { email, senha });
      setUsuario(response.data.usuario);
      localStorage.setItem('authToken', response.data.usuario.id);
    } finally {
      setCarregando(false);
    }
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout, carregando }}>
      {children}
    </AuthContext.Provider>
  );
}

// 3. Hook para usar em componentes
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve estar dentro de AuthProvider');
  }
  return context;
}
```

#### Usar em Componente
```jsx
import { useAuth } from '../context/AuthContext';

export default function MeuComponente() {
  const { usuario, isAutenticado, logout } = useAuth();

  if (!isAutenticado) {
    return <p>Não autenticado</p>;
  }

  return (
    <div>
      <p>Bem-vindo, {usuario.nome}</p>
      <button onClick={logout}>Sair</button>
    </div>
  );
}
```

#### Envolver App com Provider
```jsx
// main.jsx
import { AuthProvider } from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
```

**Conceitos-chave:**
- `createContext()`: Cria contexto vazio
- `Provider`: Componente que fornece valor
- `useContext()`: Hook para acessar valor
- Estado compartilhado globalmente
- Evita "prop drilling"

---

## ⭐ 2. Paginação no Backend

### Arquivo: `backend/src/database.js`

#### Função de Listagem com Paginação
```javascript
/**
 * Listar usuários com paginação
 * 
 * Como funciona:
 * - page=1, limit=10 → OFFSET 0 → itens 1-10
 * - page=2, limit=10 → OFFSET 10 → itens 11-20
 * - page=3, limit=5 → OFFSET 10 → itens 11-15
 */
export function listarUsuarios(page = 1, limit = 10) {
  return new Promise((resolve, reject) => {
    try {
      // Garantir valores válidos
      const page_num = Math.max(1, parseInt(page) || 1);
      const limit_num = Math.min(100, Math.max(1, parseInt(limit) || 10));
      
      // FÓRMULA DO OFFSET
      const offset = (page_num - 1) * limit_num;
      // Exemplo: page=2, limit=10 → offset = (2-1) * 10 = 10
      //         Isso pula os primeiros 10 registros

      // Contar total de registros
      db.get('SELECT COUNT(*) as total FROM usuarios', (err, countResult) => {
        if (err) return reject(err);
        
        const total = countResult.total;

        // Buscar usuários com LIMIT e OFFSET
        db.all(
          'SELECT id, nome, email, criadoEm FROM usuarios ORDER BY criadoEm DESC LIMIT ? OFFSET ?',
          [limit_num, offset],  // LIMIT 10 OFFSET 10
          (err, usuarios) => {
            if (err) return reject(err);

            // Retornar dados + metadados
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
      reject(erro);
    }
  });
}
```

#### Endpoint da API
```javascript
// backend/src/routes.js
router.get('/usuarios', async (req, res) => {
  try {
    const { page, limit } = req.query;
    const resultado = await listarUsuarios(page, limit);
    res.status(200).json(resultado);
  } catch (erro) {
    res.status(erro.status || 500).json({
      error: erro.message
    });
  }
});
```

**Conceitos-chave:**
- `LIMIT X`: Pega apenas X registros
- `OFFSET Y`: Pula Y registros e começa daí
- `Math.ceil()`: Arredonda para cima (total de páginas)
- `temProxima` e `temAnterior`: Controlar botões

---

## ⭐ 3. Paginação no Frontend

### Arquivo: `frontend/src/components/UserList.jsx`

#### Componente com Estado de Paginação
```jsx
import { useState, useEffect } from 'react';
import api from '../services/api';

export default function UserList() {
  // Estado
  const [usuarios, setUsuarios] = useState([]);
  const [paginacao, setPaginacao] = useState(null);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [itensPorPagina, setItensPorPagina] = useState(10);
  const [carregando, setCarregando] = useState(false);

  // Buscar quando página ou limite mudar
  useEffect(() => {
    buscarUsuarios();
  }, [paginaAtual, itensPorPagina]);

  const buscarUsuarios = async () => {
    setCarregando(true);
    try {
      // Enviar query params
      const response = await api.get('/usuarios', {
        params: {
          page: paginaAtual,
          limit: itensPorPagina
        }
      });

      setUsuarios(response.data.data);
      setPaginacao(response.data.paginacao);
    } catch (err) {
      console.error('Erro:', err);
    } finally {
      setCarregando(false);
    }
  };

  const proximaPagina = () => {
    if (paginacao?.temProxima) {
      setPaginaAtual(paginaAtual + 1);  // Trigger useEffect
    }
  };

  const paginaAnterior = () => {
    if (paginacao?.temAnterior) {
      setPaginaAtual(paginaAtual - 1);  // Trigger useEffect
    }
  };

  const mudarItensPorPagina = (novoLimite) => {
    setItensPorPagina(novoLimite);
    setPaginaAtual(1);  // Voltar à página 1
  };

  // Renderizar tabela...
}
```

**Conceitos-chave:**
- `useEffect`: Dispara quando página/limite mudam
- `params`: Query string no GET (`?page=1&limit=10`)
- Botões disabled quando não há próxima/anterior
- Seletor de limite reseta para página 1

---

## ⭐ 4. Integração: Usar Context em Componente de Paginação

```jsx
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

export default function Dashboard() {
  const { usuario, isAutenticado } = useAuth();
  const [usuarios, setUsuarios] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    // Só buscar se autenticado
    if (isAutenticado) {
      buscarUsuarios();
    }
  }, [page, isAutenticado]);

  const buscarUsuarios = async () => {
    try {
      const response = await api.get('/usuarios', {
        params: { page }
      });
      setUsuarios(response.data.data);
    } catch (err) {
      if (err.response?.status === 401) {
        // Não autenticado, fazer logout
        logout();
      }
    }
  };

  if (!isAutenticado) {
    return <p>Por favor, faça login</p>;
  }

  return (
    <div>
      <h1>Olá, {usuario.nome}</h1>
      <table>
        {/* Renderizar usuários */}
      </table>
      <button onClick={() => setPage(page - 1)}>Anterior</button>
      <button onClick={() => setPage(page + 1)}>Próxima</button>
    </div>
  );
}
```

---

## ⭐ 5. Criptografia com Bcrypt

### Arquivo: `backend/src/database.js`

#### Criptografar Senha
```javascript
import bcrypt from 'bcrypt';

export async function criptografarSenha(senhaPlana) {
  const SALT_ROUNDS = 10;
  // SALT_ROUNDS = número de iterações
  // Mais alto = mais seguro mas mais lento
  // 10 = padrão recomendado
  
  const senhaHash = await bcrypt.hash(senhaPlana, SALT_ROUNDS);
  
  // Resultado: "$2b$10$abc123xyz..." (nunca revela a senha original)
  return senhaHash;
}
```

#### Comparar Senha (Login)
```javascript
export async function compararSenha(senhaPlana, senhaHash) {
  // Compara sem descriptografar
  // bcrypt.compare() faz:
  // 1. Hash a senha plana com o salt do banco
  // 2. Compara com o hash armazenado
  // 3. Retorna true/false
  
  const senhaValida = await bcrypt.compare(senhaPlana, senhaHash);
  return senhaValida;
}
```

#### Uso no Fluxo
```javascript
// CADASTRO
export async function criarUsuario(nome, email, senha) {
  // 1. Validar
  // 2. Verificar se email existe
  // 3. Criptografar senha
  const senhaHash = await criptografarSenha(senha);
  
  // 4. Salvar no banco com hash (não a senha original!)
  db.run(
    'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
    [nome, email, senhaHash],  // senha = hash
    ...
  );
}

// LOGIN
export async function autenticarUsuario(email, senha) {
  // 1. Buscar usuário por email
  const usuario = db.get('SELECT * FROM usuarios WHERE email = ?', [email]);
  
  // 2. Comparar senha
  const senhaValida = await compararSenha(senha, usuario.senha);
  
  if (!senhaValida) {
    throw new Error('Senha incorreta');
  }
  
  // 3. Retornar usuário se correto
  return usuario;
}
```

**Conceitos-chave:**
- Bcrypt é unidirecional (não pode descriptografar)
- Salt é aleatório (mesma senha = hashes diferentes)
- `bcrypt.compare()` faz validação segura
- Nunca armazenar senha em texto plano

---

## ⭐ 6. SQL com Prepared Statements

### Segurança contra SQL Injection

```javascript
// ❌ ERRADO - SQL Injection vulnerável
const email = "' OR '1'='1";
const query = `SELECT * FROM usuarios WHERE email = '${email}'`;
// Resultado: SELECT * FROM usuarios WHERE email = '' OR '1'='1'
// Retorna TODOS os usuários!

// ✅ CORRETO - Prepared Statement
const email = "' OR '1'='1";
const query = 'SELECT * FROM usuarios WHERE email = ?';
db.get(query, [email]);  // ? é placeholder, email é parametrizado
// O SQLite escapa caracteres especiais automaticamente
```

**Conceitos-chave:**
- Usar `?` como placeholder
- Passar valores em array separado
- SQLite automaticamente escapa caracteres

---

## ⭐ 7. React Hook Form

### Arquivo: `frontend/src/components/AuthForm.jsx`

```jsx
import { useForm } from 'react-hook-form';

export default function AuthForm() {
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm({
    mode: 'onBlur',  // Validar ao sair do campo
    defaultValues: {
      email: '',
      senha: ''
    }
  });

  const senhaValue = watch('senha');  // Monitorar valor em tempo real

  const onSubmit = async (dados) => {
    // dados = { email, senha }
    // Já foi validado pelo React Hook Form!
    try {
      const response = await api.post('/login', dados);
      console.log('Login bem-sucedido!', response.data);
    } catch (err) {
      console.error('Erro:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Campo Email */}
      <input
        {...register('email', {
          required: 'Email é obrigatório',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Email inválido'
          }
        })}
      />
      {errors.email && <span>{errors.email.message}</span>}

      {/* Campo Senha */}
      <input
        type="password"
        {...register('senha', {
          required: 'Senha é obrigatória',
          minLength: { value: 8, message: 'Mín 8 caracteres' }
        })}
      />
      {errors.senha && <span>{errors.senha.message}</span>}

      {/* Campo Confirmação com Comparação */}
      <input
        type="password"
        {...register('confirmaSenha', {
          validate: (value) => value === senhaValue || 'Senhas não conferem'
        })}
      />
      {errors.confirmaSenha && <span>{errors.confirmaSenha.message}</span>}

      <button type="submit">Enviar</button>
    </form>
  );
}
```

**Conceitos-chave:**
- `register()`: Vincula campo ao form
- `handleSubmit()`: Valida antes de chamar função
- `watch()`: Monitora valor em tempo real
- `formState.errors`: Erros de validação
- Validações podem ser síncronas ou assíncronas

---

## ⭐ 8. Axios com Interceptadores

### Arquivo: `frontend/src/services/api.js`

```jsx
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 5000
});

// INTERCEPTADOR DE REQUISIÇÃO
api.interceptors.request.use(
  (config) => {
    // ANTES de enviar requisição
    // Adicionar token
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    console.log('📤 Enviando:', config.method, config.url);
    return config;
  },
  (error) => {
    console.error('Erro na requisição:', error);
    return Promise.reject(error);
  }
);

// INTERCEPTADOR DE RESPOSTA
api.interceptors.response.use(
  (response) => {
    // DEPOIS de receber resposta bem-sucedida
    console.log('✅ Resposta:', response.status);
    return response;
  },
  (error) => {
    // DEPOIS de receber erro
    console.error('❌ Erro:', error.response?.status);
    
    // Se 401 (não autenticado), limpar token
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      // Redirecionar para login (opcional)
    }
    
    return Promise.reject(error);
  }
);

export default api;
```

**Conceitos-chave:**
- `interceptors.request`: Modificar requisição antes de enviar
- `interceptors.response`: Tratar resposta/erro
- Token no header `Authorization`
- 401 significa não autenticado

---

## 🎯 Fluxo Completo: Login com Context + Paginação

```
1. Usuário acessa app
   ↓
2. Vê formulário (não autenticado)
   ↓
3. Clica em "Login"
   ↓
4. useAuth().login() é chamado
   ↓
5. api.post('/login') envia dados
   ↓
6. Backend valida e retorna usuário
   ↓
7. setUsuario(usuario) atualiza Context
   ↓
8. isAutenticado = true
   ↓
9. App renderiza Dashboard
   ↓
10. UserList mostra com GET /api/usuarios?page=1&limit=10
   ↓
11. Backend retorna dados + paginacao
   ↓
12. Frontend exibe tabela + controles de paginação
   ↓
13. Usuário clica "Próxima"
   ↓
14. page estado muda → useEffect acionado
   ↓
15. Nova requisição com page=2
   ↓
16. Novo conjunto de usuários exibido
```

---

## 📖 Termos Importantes

| Termo | Significado |
|-------|------------|
| **Context** | Armazena estado global (sem props) |
| **Provider** | Componente que fornece contexto |
| **Hook** | Função que conecta ao contexto/estado |
| **Paginação** | Dividir resultados em páginas |
| **Offset** | Quantos registros pular |
| **LIMIT** | Quantos registros retornar |
| **Bcrypt** | Algoritmo de criptografia de senha |
| **Salt** | Valor aleatório no bcrypt |
| **Interceptador** | Middleware que modifica requisição/resposta |
| **Prepared Statement** | Proteção contra SQL Injection |

---

## ✅ Checklist de Conceitos

- [ ] Entendo como `createContext()` funciona
- [ ] Entendo como `useContext()` acessa o valor
- [ ] Entendo fórmula do OFFSET: `(page - 1) * limit`
- [ ] Entendo `LIMIT X OFFSET Y` no SQL
- [ ] Entendo que bcrypt é unidirecional
- [ ] Entendo `bcrypt.compare()` para login
- [ ] Entendo `register()` e `handleSubmit()` do React Hook Form
- [ ] Entendo interceptadores do Axios
- [ ] Entendo prepared statements com `?`
- [ ] Conseguo traçar um fluxo de login até listagem paginada

---

**Estude este documento enquanto revisa o código! 📚**
