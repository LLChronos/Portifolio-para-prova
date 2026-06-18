/**
 * ============================================
 * PONTO DE ENTRADA - MAIN.JSX
 * ============================================
 * 
 * Este arquivo:
 * 1. Renderiza React na DOM
 * 2. Envolve App com AuthProvider
 * 3. Aplica estilos globais
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
)
