# ⚡ Quick Start - Iniciar em 2 Minutos

> Comandos rápidos para colocar a aplicação rodando

## 🚀 Opção 1: Script Automático (Mais Fácil)

### Linux / Mac
```bash
bash start.sh
```

### Windows (PowerShell)
```powershell
# Abra dois terminais (PowerShell ou CMD)

# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
cd frontend
npm run dev
```

---

## 📋 Opção 2: Comandos Manuais

### Terminal 1: Backend
```bash
cd backend
npm install      # Só primeira vez
npm start        # Inicia servidor
```

**Resposta esperada:**
```
✅ SERVIDOR INICIADO COM SUCESSO
📍 Porta: 5000
🌍 URL: http://localhost:5000
```

### Terminal 2: Frontend
```bash
cd frontend
npm install      # Só primeira vez
npm run dev      # Inicia com auto-open em http://localhost:3000
```

**Resposta esperada:**
```
VITE v4.5.0 ready in XXX ms
➜  Local: http://localhost:3000
```

---

## ✅ Verificar se Está Funcionando

### Testar Backend
```bash
# Em outro terminal, teste:
curl http://localhost:5000/health

# Resposta esperada:
# {"status":"healthy","timestamp":"...","environment":"development"}
```

### Testar Frontend
- Navegador abrirá automaticamente em `http://localhost:3000`
- Você verá formulário de cadastro/login

---

## 🧪 Testes Rápidos

### 1. Cadastrar
1. Clique em "📝 **Cadastro**"
2. Preencha com:
   - Nome: `João Silva`
   - Email: `joao@email.com`
   - Senha: `Senha123!`
   - Confirmar: `Senha123!`
3. Clique em "✓ **Criar Conta**"

### 2. Login
1. Clique em "🔑 **Login**"
2. Preencha:
   - Email: `joao@email.com`
   - Senha: `Senha123!`
3. Clique em "🔓 **Entrar**"

### 3. Paginação
- Você verá tabela de usuários
- Teste botões "Anterior" / "Próxima"
- Teste seletor de limite (5, 10, 20, 50)

---

## 🛑 Parar Aplicação

```bash
# Pressione em cada terminal:
Ctrl + C

# Ou mate os processos:
# (Windows)
taskkill /F /IM node.exe

# (Linux/Mac)
pkill -f "node"
```

---

## 🔧 Troubleshooting Rápido

### Porta 5000 já em uso
```bash
# Mude no backend/.env
PORT=5001

# E no frontend, acesse
http://localhost:3000
```

### Porta 3000 já em uso
Vite usará automaticamente a próxima porta disponível

### Erro: Cannot find module
```bash
rm -rf node_modules package-lock.json
npm install
```

### Backend não responde
```bash
# Verifique saúde
curl http://localhost:5000/health

# Reinicie
npm start
```

---

## 📚 Próximos Passos

- [ ] Testar cadastro/login
- [ ] Explorar paginação
- [ ] Ler [README.md](README.md)
- [ ] Ler [CODIGO_IMPORTANTE.md](CODIGO_IMPORTANTE.md)
- [ ] Fazer deploy com [DEPLOY_GUIDE.md](DEPLOY_GUIDE.md)

---

**Pronto! 🎉 Aplicação rodando localmente**
