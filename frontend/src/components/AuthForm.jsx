/**
 * ============================================
 * COMPONENTE DE FORMULÁRIO DE AUTENTICAÇÃO
 * ============================================
 * 
 * Features:
 * - Abas: Cadastro e Login
 * - React Hook Form para gerenciamento
 * - Validações em tempo real
 * - Mensagens de erro/sucesso
 * - Integração com AuthContext
 */

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import './AuthForm.css';

export default function AuthForm() {
  // ============================================
  // ESTADO E CONTEXTO
  // ============================================

  /**
   * aba: "register" | "login"
   * Controla qual formulário mostrar
   */
  const [aba, setAba] = useState('register');

  /**
   * Pegar funções do contexto de autenticação
   */
  const { register: registrarUsuario, login: fazerLogin, carregando, erro, sucesso, limparMensagens } = useAuth();

  /**
   * React Hook Form
   * Métodos:
   * - register: Registrar input no form
   * - handleSubmit: Processar envio
   * - formState.errors: Erros de validação
   * - reset: Limpar formulário
   */
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm({
    mode: 'onBlur', // Validar ao sair do campo
    defaultValues: {
      nome: '',
      email: '',
      senha: '',
      confirmaSenha: ''
    }
  });

  /**
   * watch("senha"): Monitorar valor do campo senha
   * Usado para comparar com confirmaSenha em tempo real
   */
  const senhaValue = watch('senha');

  // ============================================
  // EFEITOS
  // ============================================

  /**
   * Limpar mensagens quando trocar de aba
   */
  useEffect(() => {
    limparMensagens();
    reset();
  }, [aba, limparMensagens, reset]);

  // ============================================
  // HANDLERS
  // ============================================

  /**
   * Enviar formulário de CADASTRO
   */
  const onSubmitRegister = async (dados) => {
    try {
      await registrarUsuario(dados.nome, dados.email, dados.senha, dados.confirmaSenha);
      reset();
      setTimeout(() => setAba('login'), 1500);
    } catch (err) {
      console.error('Erro no cadastro:', err);
    }
  };

  /**
   * Enviar formulário de LOGIN
   */
  const onSubmitLogin = async (dados) => {
    try {
      await fazerLogin(dados.email, dados.senha);
      reset();
    } catch (err) {
      console.error('Erro no login:', err);
    }
  };

  // ============================================
  // RENDER
  // ============================================

  return (
    <div className="auth-container">
      {/* ============ CABEÇALHO ============ */}
      <div className="auth-header">
        <h1>🔐 Sistema de Autenticação</h1>
        <p>Cadastro e Login com Segurança</p>
      </div>

      {/* ============ ABAS ============ */}
      <div className="auth-tabs">
        <button
          className={`tab ${aba === 'register' ? 'active' : ''}`}
          onClick={() => setAba('register')}
        >
          📝 Cadastro
        </button>
        <button
          className={`tab ${aba === 'login' ? 'active' : ''}`}
          onClick={() => setAba('login')}
        >
          🔑 Login
        </button>
      </div>

      {/* ============ MENSAGENS ============ */}
      {erro && (
        <div className="alert alert-error">
          ❌ {erro}
        </div>
      )}
      {sucesso && (
        <div className="alert alert-success">
          ✅ {sucesso}
        </div>
      )}

      {/* ============ FORMULÁRIO DE CADASTRO ============ */}
      {aba === 'register' && (
        <form onSubmit={handleSubmit(onSubmitRegister)} className="auth-form">
          <h2>Criar Nova Conta</h2>

          {/* Campo: Nome */}
          <div className="form-group">
            <label htmlFor="nome">Nome Completo</label>
            <input
              id="nome"
              type="text"
              placeholder="Ex: João Silva"
              {...register('nome', {
                required: 'Nome é obrigatório',
                minLength: { value: 3, message: 'Nome deve ter no mínimo 3 caracteres' },
                pattern: { value: /^[a-zA-Z\s]+$/, message: 'Nome deve conter apenas letras' }
              })}
              disabled={carregando}
            />
            {errors.nome && <span className="error">{errors.nome.message}</span>}
          </div>

          {/* Campo: Email */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Ex: joao@email.com"
              {...register('email', {
                required: 'Email é obrigatório',
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email inválido' }
              })}
              disabled={carregando}
            />
            {errors.email && <span className="error">{errors.email.message}</span>}
          </div>

          {/* Campo: Senha */}
          <div className="form-group">
            <label htmlFor="senha-register">Senha</label>
            <input
              id="senha-register"
              type="password"
              placeholder="Ex: Senha123!"
              {...register('senha', {
                required: 'Senha é obrigatória',
                minLength: { value: 8, message: 'Senha deve ter no mínimo 8 caracteres' },
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])/,
                  message: 'Senha deve conter maiúscula, minúscula, número e caractere especial (!@#$%^&*)'
                }
              })}
              disabled={carregando}
            />
            {errors.senha && <span className="error">{errors.senha.message}</span>}
          </div>

          {/* Campo: Confirmar Senha */}
          <div className="form-group">
            <label htmlFor="confirmaSenha">Confirmar Senha</label>
            <input
              id="confirmaSenha"
              type="password"
              placeholder="Repita sua senha"
              {...register('confirmaSenha', {
                required: 'Confirmação de senha é obrigatória',
                validate: (value) => value === senhaValue || 'As senhas não conferem'
              })}
              disabled={carregando}
            />
            {errors.confirmaSenha && <span className="error">{errors.confirmaSenha.message}</span>}
          </div>

          {/* Botão Submit */}
          <button type="submit" disabled={carregando} className="btn btn-primary">
            {carregando ? '⏳ Criando conta...' : '✓ Criar Conta'}
          </button>
        </form>
      )}

      {/* ============ FORMULÁRIO DE LOGIN ============ */}
      {aba === 'login' && (
        <form onSubmit={handleSubmit(onSubmitLogin)} className="auth-form">
          <h2>Fazer Login</h2>

          {/* Campo: Email */}
          <div className="form-group">
            <label htmlFor="email-login">Email</label>
            <input
              id="email-login"
              type="email"
              placeholder="Ex: joao@email.com"
              {...register('email', {
                required: 'Email é obrigatório',
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email inválido' }
              })}
              disabled={carregando}
            />
            {errors.email && <span className="error">{errors.email.message}</span>}
          </div>

          {/* Campo: Senha */}
          <div className="form-group">
            <label htmlFor="senha-login">Senha</label>
            <input
              id="senha-login"
              type="password"
              placeholder="Ex: Senha123!"
              {...register('senha', {
                required: 'Senha é obrigatória'
              })}
              disabled={carregando}
            />
            {errors.senha && <span className="error">{errors.senha.message}</span>}
          </div>

          {/* Botão Submit */}
          <button type="submit" disabled={carregando} className="btn btn-primary">
            {carregando ? '⏳ Entrando...' : '🔓 Entrar'}
          </button>
        </form>
      )}
    </div>
  );
}
