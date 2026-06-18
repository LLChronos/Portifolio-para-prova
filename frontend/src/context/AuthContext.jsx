/**
 * ============================================
 * CONTEXTO DE AUTENTICAÇÃO - React Context API
 * ============================================
 * 
 * O que é React Context?
 * - Solução nativa do React para passar dados entre componentes
 * - Evita "prop drilling" (passar props por vários níveis)
 * - Gerenciador de estado global para autenticação
 * 
 * Como funciona?
 * 1. AuthContext.Provider envolve a aplicação
 * 2. useAuth() acessa o contexto em qualquer componente
 * 3. Estado é compartilhado globalmente
 * 
 * Estado gerenciado:
 * - usuario: Dados do usuário autenticado
 * - token: Token de sessão
 * - carregando: Enquanto faz requisições
 * - erro: Mensagens de erro
 * - isAutenticado: Boolean do status de autenticação
 */

import React, { createContext, useContext, useState, useCallback } from 'react';
import api from '../services/api';

/**
 * Criar contexto
 * null como valor padrão (será atualizado pelo Provider)
 */
const AuthContext = createContext(null);

/**
 * PROVIDER DO CONTEXTO
 * 
 * Envolver toda a aplicação com:
 * <AuthProvider>
 *   <App />
 * </AuthProvider>
 */
export function AuthProvider({ children }) {
  // ============================================
  // ESTADO
  // ============================================

  /**
   * usuario: Informações do usuário logado
   * {
   *   id: 1,
   *   nome: "João",
   *   email: "joao@email.com",
   *   criadoEm: "2024-01-01..."
   * }
   */
  const [usuario, setUsuario] = useState(null);

  /**
   * token: JWT ou identificador de sessão
   * (opcional - para implementação futura)
   */
  const [token, setToken] = useState(localStorage.getItem('authToken') || null);

  /**
   * carregando: Indicador de requisição em progresso
   * Usado para desabilitar botões durante a requisição
   */
  const [carregando, setCarregando] = useState(false);

  /**
   * erro: Mensagem de erro da última operação
   */
  const [erro, setErro] = useState(null);

  /**
   * sucesso: Mensagem de sucesso
   */
  const [sucesso, setSucesso] = useState(null);

  // ============================================
  // FUNÇÕES DE AUTENTICAÇÃO
  // ============================================

  /**
   * REGISTER - Criar novo usuário
   * 
   * Fluxo:
   * 1. Enviar dados ao backend
   * 2. Backend criptografa senha e salva
   * 3. Retorna usuário criado
   * 4. Guardar no localStorage (opcional)
   */
  const register = useCallback(async (nome, email, senha, confirmaSenha) => {
    setCarregando(true);
    setErro(null);
    setSucesso(null);

    try {
      // Validação no frontend
      if (senha !== confirmaSenha) {
        throw new Error('As senhas não conferem');
      }

      // Requisição ao backend
      const response = await api.post('/register', {
        nome,
        email,
        senha,
        confirmaSenha
      });

      // Salvar informações
      setUsuario(response.data.usuario);
      setToken(response.data.usuario.id); // ou usar JWT real
      localStorage.setItem('authToken', response.data.usuario.id);
      setSucesso('Usuário criado com sucesso! Faça login para continuar.');

      return response.data;
    } catch (err) {
      const mensagem = err.response?.data?.error || err.message;
      setErro(mensagem);
      throw err;
    } finally {
      setCarregando(false);
    }
  }, []);

  /**
   * LOGIN - Autenticar usuário
   * 
   * Fluxo:
   * 1. Enviar email e senha
   * 2. Backend compara com bcrypt
   * 3. Retorna usuário se correto
   * 4. Guardar token de sessão
   */
  const login = useCallback(async (email, senha) => {
    setCarregando(true);
    setErro(null);
    setSucesso(null);

    try {
      // Requisição ao backend
      const response = await api.post('/login', {
        email,
        senha
      });

      // Salvar informações
      setUsuario(response.data.usuario);
      setToken(response.data.usuario.id);
      localStorage.setItem('authToken', response.data.usuario.id);
      setSucesso('Login realizado com sucesso!');

      return response.data;
    } catch (err) {
      const mensagem = err.response?.data?.error || err.message;
      setErro(mensagem);
      throw err;
    } finally {
      setCarregando(false);
    }
  }, []);

  /**
   * LOGOUT - Sair da sessão
   * 
   * Fluxo:
   * 1. Limpar usuário do estado
   * 2. Limpar token
   * 3. Limpar localStorage
   */
  const logout = useCallback(() => {
    setUsuario(null);
    setToken(null);
    localStorage.removeItem('authToken');
    setSucesso('Deslogado com sucesso');
  }, []);

  /**
   * LIMPAR MENSAGENS
   * Útil para fechar alertas após alguns segundos
   */
  const limparMensagens = useCallback(() => {
    setErro(null);
    setSucesso(null);
  }, []);

  // ============================================
  // VALOR DO CONTEXTO
  // ============================================

  /**
   * Tudo que será disponível para componentes
   * que usarem useAuth()
   */
  const value = {
    // Estado
    usuario,
    token,
    carregando,
    erro,
    sucesso,
    isAutenticado: !!usuario,

    // Funções
    register,
    login,
    logout,
    limparMensagens
  };

  // ============================================
  // RENDER
  // ============================================

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * HOOK PARA USAR O CONTEXTO
 * 
 * Em qualquer componente:
 * const { usuario, login, logout } = useAuth();
 */
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error(
      'useAuth deve ser usado dentro de AuthProvider. ' +
      'Certifique-se de envolver sua aplicação com <AuthProvider>'
    );
  }

  return context;
}
