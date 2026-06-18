@echo off
REM ============================================
REM SCRIPT DE INICIALIZAÇÃO RÁPIDA (Windows)
REM ============================================
REM 
REM Uso: start.bat
REM Inicia backend e frontend em janelas separadas

echo.
echo 🚀 Iniciando Sistema de Autenticação...
echo.

REM Abrir backend em nova janela
echo 📦 Iniciando Backend na porta 5000...
start "Backend - Sistema de Autenticação" cmd /k "cd backend && npm install && npm run dev"

REM Aguardar um pouco para backend iniciar
timeout /t 3 /nobreak

REM Abrir frontend em nova janela
echo ⚛️  Iniciando Frontend na porta 3000...
start "Frontend - Sistema de Autenticação" cmd /k "cd frontend && npm install && npm run dev"

echo.
echo ✅ Sistema iniciado em duas janelas!
echo.
echo 📍 Backend: http://localhost:5000
echo 📍 Frontend: http://localhost:3000
echo.
echo Feche as janelas para parar o sistema
echo.
