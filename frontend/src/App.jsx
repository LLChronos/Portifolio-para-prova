/**
 * ============================================
 * APLICAÇÃO PRINCIPAL - APP.JSX
 * ============================================
 * 
 * Componente raiz que:
 * - Envolve com AuthProvider (contexto)
 * - Renderiza interface principal
 * - Gerencia exibição baseado em autenticação
 */

import React from 'react';
import { useAuth } from './context/AuthContext';
import AuthForm from './components/AuthForm';
import UserList from './components/UserList';
import './App.css';

export default function App() {
  /**
   * Acessar contexto de autenticação
   * - usuario: Dados do usuário logado
   * - isAutenticado: Boolean de autenticação
   * - logout: Função para deslogar
   */
  const { usuario, isAutenticado, logout } = useAuth();

  // ============================================
  // RENDER
  // ============================================

  return (
    <div className="app">
      {/* ============ HEADER ============ */}
      <header className="app-header">
        <div className="header-content">
          <h1>🔐 Aplicação de Autenticação</h1>
          
          {/* Mostrar usuário se autenticado */}
          {isAutenticado && usuario && (
            <div className="user-info">
              <span>👤 {usuario.nome}</span>
              <button onClick={logout} className="btn btn-logout">
                Sair
              </button>
            </div>
          )}
        </div>
      </header>

      {/* ============ CONTEÚDO PRINCIPAL ============ */}
      <main className="app-main">
        {!isAutenticado ? (
          // NÃO AUTENTICADO: Mostrar formulário
          <section className="auth-section">
            <div className="section-content">
              <AuthForm />
            </div>
          </section>
        ) : (
          // AUTENTICADO: Mostrar lista de usuários
          <section className="dashboard-section">
            <div className="section-content">
              <div className="welcome-message">
                <h2>Bem-vindo, {usuario.nome}! 👋</h2>
                <p>Aqui você pode visualizar todos os usuários cadastrados no sistema.</p>
              </div>
              <UserList />
            </div>
          </section>
        )}
      </main>

      {/* ============ FOOTER ============ */}
      <footer className="app-footer">
        <p>
          🔐 Sistema de Autenticação com React + Express + SQLite
          <br />
          <small>Projeto Educacional para Prova Web</small>
        </p>
      </footer>
    </div>
  );
}
