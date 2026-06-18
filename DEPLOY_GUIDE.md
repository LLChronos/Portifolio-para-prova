# 🚀 Guia de Deploy - Sistema de Autenticação

## 📋 Sumário

1. [Deploy Backend (Render)](#backend-render)
2. [Deploy Frontend (Vercel)](#frontend-vercel)
3. [Configuração Pós-Deploy](#pós-deploy)
4. [Troubleshooting](#troubleshooting)

---

## 🟢 Backend - Render.com

### Pré-requisitos
- Conta em [Render.com](https://render.com) (gratuita)
- Repositório Git com código (GitHub, GitLab, etc)

### Passo-a-Passo

#### 1. Conectar GitHub ao Render

1. Acesse [https://render.com](https://render.com)
2. Clique em **Sign Up** (ou login se já tem conta)
3. Escolha "Continue with GitHub"
4. Autorize Render a acessar seu GitHub

#### 2. Criar Web Service

1. No dashboard Render, clique em **+ New**
2. Selecione **Web Service**
3. Escolha o repositório `Portifolio-para-prova`
4. Clique em **Connect**

#### 3. Configurar Serviço

Na página de configuração, preencha:

| Campo | Valor |
|-------|-------|
| **Name** | `auth-system-backend` |
| **Environment** | `Node` |
| **Build Command** | `cd backend && npm install` |
| **Start Command** | `cd backend && npm start` |
| **Branch** | `main` (ou seu branch padrão) |

#### 4. Adicionar Variáveis de Ambiente

Clique em **Environment** e adicione:

```
NODE_ENV=production
PORT=5000
CORS_ORIGIN=https://seu-frontend.vercel.app
```

#### 5. Deploy

1. Clique em **Create Web Service**
2. Render começará a fazer build (pode levar 2-3 minutos)
3. Aguarde até ver: **Your service is live** ✅

#### 6. Obter URL

Na página do serviço, você verá:
```
Your service is live at: https://auth-system-backend.onrender.com
```

**Salve esta URL!** Você precisará para o frontend.

---

## 🔵 Frontend - Vercel.com

### Pré-requisitos
- Conta em [Vercel.com](https://vercel.com) (gratuita)
- Mesmo repositório Git

### Passo-a-Passo

#### 1. Conectar GitHub ao Vercel

1. Acesse [https://vercel.com](https://vercel.com)
2. Clique em **Sign Up** ou **Continue with GitHub**
3. Autorize Vercel a acessar seu GitHub

#### 2. Importar Projeto

1. Na dashboard, clique em **Add New**
2. Selecione **Project**
3. Procure por `Portifolio-para-prova`
4. Clique em **Import**

#### 3. Configurar Build

Vercel detectará que é um Vite project. Ajuste:

| Campo | Valor |
|-------|-------|
| **Framework** | `Vite` |
| **Root Directory** | `frontend` |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |

#### 4. Adicionar Variáveis de Ambiente

Clique em **Environment Variables** e adicione:

```
VITE_API_URL=https://auth-system-backend.onrender.com/api
```

(Substitua `auth-system-backend.onrender.com` pela URL que você obteve do Render)

#### 5. Deploy

1. Clique em **Deploy**
2. Vercel fará build (pode levar 1-2 minutos)
3. Aguarde até ver: **Congratulations!** ✅

#### 6. Obter URL

Após deploy bem-sucedido, você verá:
```
Your deployment is live at: https://portfolio-auth.vercel.app
```

---

## 🔧 Pós-Deploy

### Validar Deploy

1. **Frontend**: Abra https://seu-app.vercel.app
2. Clique em "Cadastro"
3. Preencha e clique em "Criar Conta"
4. Se aparecer "✅ Usuário criado", deploy funcionou!

### Validar Backend

```bash
# Terminal
curl https://seu-backend.onrender.com/health

# Resposta esperada:
# {"status":"healthy","timestamp":"...","environment":"production"}
```

### Testar Paginação

```bash
curl https://seu-backend.onrender.com/api/usuarios?page=1&limit=10
```

---

## 📝 Pós-Deploy - Próximos Passos

### 1. Atualizar README com Links de Deploy

Abra seu `README.md` e adicione no final:

```markdown
## 🌍 Links de Deploy

- **Frontend**: https://seu-app.vercel.app
- **Backend API**: https://seu-backend.onrender.com
- **Documentação**: /api/docs (em desenvolvimento)

### Status
- ✅ Frontend: Em operação
- ✅ Backend: Em operação
- ✅ Banco de dados: SQLite em produção
- ✅ Paginação: Funcionando
- ✅ React Context: Funcionando
```

### 2. Configurar Domain Custom (Opcional)

Ambas Vercel e Render permitem adicionar domínio próprio (Ex: meu-app.com)

Veja documentação deles para detalhes.

---

## 🐛 Troubleshooting

### Erro: "Backend Connection Failed"

**Problema**: Frontend não consegue conectar ao backend

**Solução**:
1. Verifique se `VITE_API_URL` está correto no Vercel
2. Confirme que backend está rodando no Render
3. Verifique CORS no backend `.env`: `CORS_ORIGIN` deve ser a URL do frontend

### Erro: "Deployment failed"

**Render**:
1. Verifique logs: Dashboard → Logs
2. Procure por mensagens de erro
3. Comum: npm install falhou → tente novamente

**Vercel**:
1. Verifique Build Logs
2. Procure por erros de compilação
3. Comum: Path incorreto para frontend

### Erro: "Database locked"

**Problema**: SQLite está em uso

**Solução**: No Render, reinicie o serviço
1. Dashboard → Seu serviço
2. Clique em **Manual Deploy**
3. Selecione **Redeploy**

### Frontend não vê usuários listados

**Problema**: Paginação não está funcionando

**Solução**:
1. Faça login no frontend
2. Abra DevTools (F12)
3. Vá para aba **Network**
4. Crie um novo usuário
5. Verifique requisição GET `/api/usuarios`
6. Se erro 401, token não está sendo enviado

### Senha salva como texto plano

**Problema**: Bcrypt não está funcionando

**Solução**:
1. Verifique se `bcrypt` está instalado: `npm list bcrypt`
2. Reinicie backend
3. Crie novo usuário
4. Verifique banco: Senhas devem começar com `$2b$`

---

## 📊 Monitoramento Pós-Deploy

### Verificar Saúde do Backend

```bash
# Weekly - Adicione ao seu calendário
curl -X GET https://seu-backend.onrender.com/health

# Resposta esperada:
{
  "status": "healthy",
  "timestamp": "2024-06-18T...",
  "environment": "production"
}
```

### Verificar Banco de Dados

1. No Render, vá para **Shell**
2. Execute:
```bash
sqlite3 usuarios.db "SELECT COUNT(*) FROM usuarios;"
```

---

## 💾 Backup do Banco de Dados

### Baixar Banco

1. No Render, vá para **Shell**
2. Execute:
```bash
cat usuarios.db > backup.db
```
3. Baixe via SFTP (se disponível)

### Restaurar Banco

1. No Shell do Render:
```bash
# Upload o arquivo backup.db

# Substitua o banco atual
rm usuarios.db
mv backup.db usuarios.db
```

---

## 🔐 Segurança em Produção

✅ **Implementado**:
- Validações no backend
- Senhas criptografadas com bcrypt
- CORS habilitado
- Variáveis de ambiente protegidas

❌ **NÃO implementado** (melhorias futuras):
- JWT tokens
- HTTPS (Vercel/Render já fazem)
- Rate limiting
- 2FA

---

## 📞 Suporte

### Render
- Docs: https://render.com/docs
- Status: https://status.render.com
- Email: support@render.com

### Vercel
- Docs: https://vercel.com/docs
- Status: https://www.vercel-status.com
- Email: support@vercel.com

---

## ✅ Checklist Final

Antes de considerar deploy completo:

- [ ] Frontend acessa URL do Render sem erro
- [ ] Cadastro funciona em produção
- [ ] Login funciona em produção
- [ ] Paginação mostra usuários
- [ ] Controles de paginação funcionam
- [ ] React Context mantém usuário logado
- [ ] Logout limpa dados
- [ ] Backend healthcheck responde
- [ ] Banco de dados persiste dados
- [ ] README atualizado com links

---

**Deploy completo! 🎉**

Seu aplicativo está rodando em produção. Estude o código, entenda os conceitos e boa sorte na prova!
