#!/bin/bash
# ============================================
# SCRIPT DE INICIALIZAÇÃO RÁPIDA (Linux/Mac)
# ============================================
# 
# Uso: bash start.sh
# Inicia backend e frontend automaticamente

echo "🚀 Iniciando Sistema de Autenticação..."

# Iniciar backend em background
echo "📦 Iniciando Backend na porta 5000..."
cd backend
npm install
npm run dev &
BACKEND_PID=$!

# Aguardar um pouco para backend iniciar
sleep 3

# Iniciar frontend
echo "⚛️  Iniciando Frontend na porta 3000..."
cd ../frontend
npm install
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Sistema iniciado!"
echo "📍 Backend: http://localhost:5000"
echo "📍 Frontend: http://localhost:3000"
echo ""
echo "Pressione Ctrl+C para parar tudo"

# Aguardar encerramento
wait
