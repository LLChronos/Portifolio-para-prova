/**
 * ============================================
 * GUIA RÁPIDO - COMEÇAR EM 5 MINUTOS
 * ============================================
 * 
 * Siga este guia passo-a-passo para ter o projeto rodando
 */

// ============================================
// PASSO 1: VERIFICAR PRÉ-REQUISITOS
// ============================================

/**
 * Você precisa ter instalado:
 * 1. Node.js (versão 16+)
 *    - Baixe em: https://nodejs.org/
 *    - Recomendado: Versão LTS (Long Term Support)
 * 
 * Verificar instalação:
 * $ node --version    → v18.0.0 (ou superior)
 * $ npm --version     → 9.0.0 (ou superior)
 * 
 * Se vir versões, você está pronto! ✅
 * Se não funcionar, instale Node.js novamente.
 */

// ============================================
// PASSO 2: ABRIR EM VS CODE
// ============================================

/**
 * 1. Abra VS Code
 * 2. Abra a pasta: desenvolvimento web
 *    File → Open Folder → Selecione a pasta
 * 
 * Você deve ver esta estrutura:
 * desenvolvimento web/
 * ├── backend/
 * ├── frontend/
 * ├── README.md
 * └── start.bat
 */

// ============================================
// PASSO 3: INICIAR RÁPIDO (WINDOWS)
// ============================================

/**
 * Opção 1 - Clique duplo (MAIS FÁCIL):
 * 1. No Explorer, double-click em: start.bat
 * 2. Duas janelas de terminal abrirão
 * 3. Aguarde 30 segundos enquanto npm instala
 * 4. O navegador abrirá em http://localhost:3000
 * 
 * Opção 2 - Terminal manual:
 * 1. Abra um terminal PowerShell
 * 2. Navegue para a pasta: cd "c:\Users\...\desenvolvimento web"
 * 3. Execute: .\start.bat
 */

// ============================================
// PASSO 4: INICIAR MANUAL (Linux/Mac ou controle total)
// ============================================

/**
 * Terminal 1 - Backend:
 * 
 * $ cd backend
 * $ npm install
 * $ npm run dev
 * 
 * Você deve ver:
 * ✅ Servidor iniciado com sucesso!
 * 📍 Escutando na porta: 5000
 * 🌍 URL: http://localhost:5000
 */

/**
 * Terminal 2 - Frontend:
 * 
 * $ cd frontend
 * $ npm install
 * $ npm run dev
 * 
 * O navegador abrirá automaticamente em http://localhost:3000
 * Você deve ver a tela de login/cadastro
 */

// ============================================
// PASSO 5: TESTAR O SISTEMA
// ============================================

/**
 * 1. Criar Conta:
 *    - Clique em "📝 Cadastro"
 *    - Nome: João Silva
 *    - Email: joao@email.com
 *    - Senha: Senha123!
 *    - Confirmar: Senha123!
 *    - Clique em "✓ Criar Conta"
 *    - Deve aparecer mensagem ✅ de sucesso
 * 
 * 2. Fazer Login:
 *    - Clique em "🔑 Login"
 *    - Email: joao@email.com
 *    - Senha: Senha123!
 *    - Clique em "🔓 Entrar"
 *    - Deve aparecer mensagem ✅ de sucesso
 */

// ============================================
// PASSO 6: EXPLORAR O CÓDIGO
// ============================================

/**
 * Backend:
 * - backend/server.js      → Servidor principal
 * - backend/routes.js      → Endpoints /register e /login
 * - backend/database.js    → SQLite e criptografia
 * 
 * Frontend:
 * - frontend/src/components/AuthForm.jsx  → Formulário com React Hook Form
 * - frontend/src/services/api.js          → Axios para requisições HTTP
 * 
 * Todos os arquivos têm comentários explicativos! 💡
 */

// ============================================
// PASSO 7: DOCUMENTAÇÃO
// ============================================

/**
 * Leia estes arquivos para entender tudo:
 * 
 * 1. README.md → Visão geral do projeto
 * 2. backend/README.md → Detalhes do backend
 * 3. frontend/README.md → Detalhes do frontend
 * 4. GUIA_ESTUDOS.js → Conceitos para a prova
 * 5. TESTE_ENDPOINTS.md → Como testar a API
 */

// ============================================
// PASSO 8: PROBLEMASCOMUNS
// ============================================

/**
 * ❌ Problema: "comando npm não encontrado"
 * ✅ Solução: Instale Node.js
 * 
 * ❌ Problema: "port 5000 already in use"
 * ✅ Solução: Outra aplicação usa porta 5000
 *    - Edite backend/.env e mude para PORT=5001
 * 
 * ❌ Problema: "CORS error"
 * ✅ Solução: Backend e frontend devem estar rodando
 *    - Backend em http://localhost:5000
 *    - Frontend em http://localhost:3000
 * 
 * ❌ Problema: Banco de dados vazio/corrompido
 * ✅ Solução: Delete arquivo backend/usuarios.db
 *    - Será recriado automaticamente ao iniciar
 * 
 * ❌ Problema: "Cannot find module"
 * ✅ Solução: Execute npm install novamente
 *    - Rm -rf node_modules (Linux/Mac)
 *    - rmdir /s /q node_modules (Windows)
 *    - Depois: npm install
 */

// ============================================
// RESUMO DE COMANDOS
// ============================================

/**
 * Windows - Start rápido:
 * $ .\start.bat
 * 
 * Linux/Mac - Start rápido:
 * $ bash start.sh
 * 
 * Backend - Instalação:
 * $ cd backend
 * $ npm install
 * 
 * Backend - Executar:
 * $ npm run dev
 * 
 * Frontend - Instalação:
 * $ cd frontend
 * $ npm install
 * 
 * Frontend - Executar:
 * $ npm run dev
 * 
 * Frontend - Build:
 * $ npm run build
 */

// ============================================
// PRÓXIMOS PASSOS
// ============================================

/**
 * Depois que estiver funcionando:
 * 
 * 1. Leia todos os comentários no código
 * 2. Estude o guia de conceitos (GUIA_ESTUDOS.js)
 * 3. Teste todos os endpoints (TESTE_ENDPOINTS.md)
 * 4. Tente modificar:
 *    - Adicione novo campo de telefone
 *    - Implemente reset de senha
 *    - Adicione validação de CPF
 * 5. Faça perguntas e experimenta!
 */

console.log('🚀 Você está pronto para começar!');
console.log('Execute: npm start (backend) e npm run dev (frontend)');
