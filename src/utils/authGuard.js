// src/utils/authGuard.js
// Utilitário global de autenticação — padrão empresa
// Uso: precisaAuth(() => minhaAcao())

import { useAuthStore } from '@/stores/auth.js'

/**
 * Verifica autenticação e executa callback se logado.
 * Se não logado: dispara toast + abre modal de login.
 *
 * @param {Function} callback   - Ação a executar se autenticado
 * @param {Object}   opcoes
 * @param {string}   opcoes.mensagem  - Mensagem do toast (opcional)
 * @param {string}   opcoes.titulo    - Título do toast (opcional)
 * @returns {boolean} true se autenticado
 */
export function precisaAuth (callback = null, opcoes = {}) {
  const auth = useAuthStore()

  if (auth.isLogado || auth.user) {
    if (typeof callback === 'function') callback()
    return true
  }

  // Mensagem padrão ou customizada
  const mensagem = opcoes.mensagem || 'Você precisa estar logado para continuar.'
  const titulo   = opcoes.titulo   || 'Acesso restrito'

  // Dispara toast de aviso
  window.dispatchEvent(new CustomEvent('toast', {
    detail: { tipo: 'aviso', titulo, mensagem }
  }))

  // Abre modal de login após um frame (garante que o toast aparece primeiro)
  requestAnimationFrame(() => {
    window.dispatchEvent(new CustomEvent('abrir-modal-auth', { detail: 'login' }))
  })

  return false
}

/**
 * Versão async — aguarda login e executa callback.
 * Útil para fluxos como: clicou em "Comprar" → fez login → continua.
 *
 * @param {Function} callback
 * @param {Object}   opcoes
 */
export function precisaAuthAsync (callback, opcoes = {}) {
  const auth = useAuthStore()

  if (auth.isLogado || auth.user) {
    return Promise.resolve(callback?.())
  }

  return new Promise((resolve) => {
    precisaAuth(null, opcoes)

    // Escuta login bem-sucedido para executar a ação pendente
    const onLogin = () => {
      window.removeEventListener('auth-login-success', onLogin)
      resolve(callback?.())
    }
    window.addEventListener('auth-login-success', onLogin, { once: true })
  })
}

/**
 * Verifica apenas — sem abrir modal.
 * Útil para esconder/mostrar elementos na UI.
 */
export function estaLogado () {
  const auth = useAuthStore()
  return !!(auth.isLogado || auth.user)
}