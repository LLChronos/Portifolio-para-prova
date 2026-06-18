/**
 * ============================================
 * COMPONENTE DE LISTA COM PAGINAÇÃO
 * ============================================
 * 
 * Features:
 * - Listar usuários do servidor
 * - Paginação: páginas, botões prev/next
 * - Controlar itens por página
 * - Carregamento e erro
 * - Integração com API
 */

import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './UserList.css';

export default function UserList() {
  // ============================================
  // ESTADO
  // ============================================

  /**
   * usuarios: Array de usuários da página atual
   */
  const [usuarios, setUsuarios] = useState([]);

  /**
   * paginacao: Informações de paginação do servidor
   * {
   *   paginaAtual: 1,
   *   itensPorPagina: 10,
   *   totalItens: 25,
   *   totalPaginas: 3,
   *   temProxima: true,
   *   temAnterior: false
   * }
   */
  const [paginacao, setPaginacao] = useState(null);

  /**
   * paginaAtual: Página que está sendo visualizada
   */
  const [paginaAtual, setPaginaAtual] = useState(1);

  /**
   * itensPorPagina: Quantidade de itens por página
   * Limites: 5, 10, 20, 50
   */
  const [itensPorPagina, setItensPorPagina] = useState(10);

  /**
   * carregando: Indicador de requisição em progresso
   */
  const [carregando, setCarregando] = useState(false);

  /**
   * erro: Mensagem de erro
   */
  const [erro, setErro] = useState(null);

  // ============================================
  // EFEITOS
  // ============================================

  /**
   * Buscar usuários quando página ou limite mudar
   * Dependências: [paginaAtual, itensPorPagina]
   */
  useEffect(() => {
    buscarUsuarios();
  }, [paginaAtual, itensPorPagina]);

  // ============================================
  // FUNÇÕES
  // ============================================

  /**
   * BUSCAR USUÁRIOS DO SERVIDOR
   * 
   * Query params:
   * - page: Página atual
   * - limit: Itens por página
   */
  const buscarUsuarios = async () => {
    setCarregando(true);
    setErro(null);

    try {
      const response = await api.get('/usuarios', {
        params: {
          page: paginaAtual,
          limit: itensPorPagina
        }
      });

      // Atualizar estado
      setUsuarios(response.data.data);
      setPaginacao(response.data.paginacao);

    } catch (err) {
      console.error('Erro ao buscar usuários:', err);
      setErro(err.response?.data?.error || 'Erro ao carregar usuários');
    } finally {
      setCarregando(false);
    }
  };

  /**
   * IR PARA PRÓXIMA PÁGINA
   */
  const proximaPagina = () => {
    if (paginacao?.temProxima) {
      setPaginaAtual(paginaAtual + 1);
    }
  };

  /**
   * IR PARA PÁGINA ANTERIOR
   */
  const paginaAnterior = () => {
    if (paginacao?.temAnterior) {
      setPaginaAtual(paginaAtual - 1);
    }
  };

  /**
   * MUDAR LIMITE DE ITENS
   * Reseta para página 1
   */
  const mudarItensPorPagina = (novoLimite) => {
    setItensPorPagina(novoLimite);
    setPaginaAtual(1);
  };

  /**
   * FORMATAR DATA
   */
  const formatarData = (data) => {
    return new Date(data).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // ============================================
  // RENDER
  // ============================================

  return (
    <div className="user-list-container">
      {/* ============ CABEÇALHO ============ */}
      <div className="list-header">
        <h2>👥 Usuários Cadastrados</h2>
        <p>Total: {paginacao?.totalItens || 0} usuários</p>
      </div>

      {/* ============ CONTROLES DE PAGINAÇÃO ============ */}
      {paginacao && (
        <div className="pagination-controls">
          {/* Seletor de itens por página */}
          <div className="items-per-page">
            <label>Itens por página:</label>
            <select 
              value={itensPorPagina} 
              onChange={(e) => mudarItensPorPagina(parseInt(e.target.value))}
              disabled={carregando}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>

          {/* Info de paginação */}
          <div className="pagination-info">
            Página {paginacao.paginaAtual} de {paginacao.totalPaginas}
          </div>
        </div>
      )}

      {/* ============ MENSAGEM DE ERRO ============ */}
      {erro && (
        <div className="alert alert-error">
          ❌ {erro}
        </div>
      )}

      {/* ============ CARREGANDO ============ */}
      {carregando && (
        <div className="loading">
          <p>⏳ Carregando usuários...</p>
        </div>
      )}

      {/* ============ LISTA DE USUÁRIOS ============ */}
      {!carregando && usuarios.length > 0 && (
        <div className="users-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Data de Criação</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.id}</td>
                  <td>{usuario.nome}</td>
                  <td>{usuario.email}</td>
                  <td>{formatarData(usuario.criadoEm)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ============ VAZIO ============ */}
      {!carregando && usuarios.length === 0 && !erro && (
        <div className="empty-state">
          <p>😴 Nenhum usuário cadastrado ainda</p>
        </div>
      )}

      {/* ============ BOTÕES DE PAGINAÇÃO ============ */}
      {paginacao && !carregando && (
        <div className="pagination-buttons">
          <button
            onClick={paginaAnterior}
            disabled={!paginacao.temAnterior}
            className="btn btn-secondary"
          >
            ← Anterior
          </button>

          <div className="page-indicator">
            Página {paginacao.paginaAtual} de {paginacao.totalPaginas}
          </div>

          <button
            onClick={proximaPagina}
            disabled={!paginacao.temProxima}
            className="btn btn-secondary"
          >
            Próxima →
          </button>
        </div>
      )}
    </div>
  );
}
