/**
 * ============================================
 * SERVIÇO DE API - AXIOS
 * ============================================
 * 
 * O que é Axios?
 * - Cliente HTTP para fazer requisições
 * - Alternativa ao Fetch API (mais simples)
 * - Suporte a interceptadores
 * - Converte JSON automaticamente
 * 
 * Como funciona:
 * - api.post('/rota', dados)
 * - api.get('/rota')
 * - Interceptadores para adicionar headers, etc
 */

import axios from 'axios';

/**
 * Criar instância do Axios
 * 
 * baseURL: URL base da API
 * timeout: Tempo máximo de espera (5 segundos)
 * headers: Headers enviados em toda requisição
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * INTERCEPTADOR DE REQUISIÇÃO
 * 
 * Executado ANTES de enviar a requisição
 * Usado para:
 * - Adicionar token de autenticação
 * - Adicionar headers customizados
 * - Log de requisições
 */
api.interceptors.request.use(
  (config) => {
    // Adicionar token ao header Authorization
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log('📤 Requisição:', config.method.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('❌ Erro na requisição:', error);
    return Promise.reject(error);
  }
);

/**
 * INTERCEPTADOR DE RESPOSTA
 * 
 * Executado DEPOIS de receber a resposta
 * Usado para:
 * - Validar status de autenticação
 * - Tratar erros globais
 * - Log de respostas
 */
api.interceptors.response.use(
  (response) => {
    console.log('✅ Resposta:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('❌ Erro na resposta:', error.response?.status, error.response?.data);

    // Se 401 (não autenticado), limpar localStorage
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
    }

    return Promise.reject(error);
  }
);

export default api;
