// src/stores/auth.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/api'

export const useAuthStore = defineStore('auth', () => {
  // === STATE ===
  const user    = ref(null)
  const token   = ref(localStorage.getItem('token') || null)
  const loading = ref(false)
  const error   = ref(null)

  // === GETTERS ===
  const isLoggedIn       = computed(() => !!token.value && !!user.value)
  const isLogado         = computed(() => !!token.value && !!user.value)
 const isAdmin = computed(() => user.value?.role === 'admin' || user.value?.isAdmin === true)
  const isVip            = computed(() => ['vip', 'elite'].includes(user.value?.nivel))
  const nomeCompleto     = computed(() => {
    if (!user.value) return ''
    return `${user.value.nome} ${user.value.sobrenome || ''}`.trim()
  })
  const enderecoCompleto = computed(() => user.value?.enderecoCompleto || '')

  // === HELPERS ===
  const setAuthHeader = (t) => {
    if (t) {
      api.defaults.headers.common['Authorization'] = `Bearer ${t}`
      localStorage.setItem('token', t)
    } else {
      delete api.defaults.headers.common['Authorization']
      localStorage.removeItem('token')
    }
  }

  const initCart = async () => {
    try {
      const { useCartStore } = await import('@/stores/cart.js')
      const cart = useCartStore()
      await cart.init()
    } catch (e) {
      console.warn('[Auth] Erro ao iniciar carrinho:', e.message)
    }
  }

  // === ACTIONS ===
const init = async () => {
  if (!token.value) return
  setAuthHeader(token.value)  // ← garante que o header está setado ANTES do fetch
  try {
    await fetchProfile()
  } catch {
    user.value  = null
    token.value = null
    setAuthHeader(null)
  }
}
  const fetchMe = async () => {
    if (!token.value) return
    setAuthHeader(token.value)
    try {
      await fetchProfile()
    } catch {
      user.value  = null
      token.value = null
      setAuthHeader(null)
    }
  }

  const login = async (email, senha) => {
    loading.value = true
    error.value   = null
    try {
      const { data } = await api.post('/auth/login', { email, senha })
      token.value = data.token
      user.value  = data.usuario
      setAuthHeader(data.token)
      await initCart()
      return { ok: true }
    } catch (err) {
      error.value = err.response?.data?.erro || err.response?.data?.msg || 'Erro ao fazer login'
      throw new Error(error.value)
    } finally {
      loading.value = false
    }
  }

  const register = async (nome, sobrenome, email, senha) => {
    loading.value = true
    error.value   = null
    try {
      const { data } = await api.post('/auth/cadastro', { nome, sobrenome, email, senha })
      token.value = data.token
      user.value  = data.usuario
      setAuthHeader(data.token)
      await initCart()
      return { ok: true }
    } catch (err) {
      error.value = err.response?.data?.erro || err.response?.data?.msg || 'Erro ao registrar'
      throw new Error(error.value)
    } finally {
      loading.value = false
    }
  }

  const loginGoogle = async (dadosGoogle) => {
    loading.value = true
    error.value   = null
    try {
      const { data } = await api.post('/auth/google', dadosGoogle)
      token.value = data.token
      user.value  = data.usuario
      setAuthHeader(data.token)
      await initCart()
      return { ok: true }
    } catch (err) {
      error.value = err.response?.data?.erro || err.response?.data?.msg || 'Erro ao autenticar com Google'
      throw new Error(error.value)
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    if (token.value) {
      try {
        await api.post('/auth/logout')
      } catch {
        // ignora — limpa local de qualquer forma
      }
    }
    user.value  = null
    token.value = null
    setAuthHeader(null)
  }

  const fetchProfile = async () => {
    try {
      const { data } = await api.get('/auth/me')
      user.value = data
      return { ok: true, user: data }
    } catch (err) {
      if (err.response?.status === 401) throw err
      return { ok: false, msg: err.response?.data?.erro || 'Erro ao buscar perfil' }
    }
  }

  const updateProfile = async (dados) => {
    loading.value = true
    try {
      const { data } = await api.patch('/usuarios/profile', dados)
      user.value = data.user
      return { ok: true, user: data.user }
    } catch (err) {
      return { ok: false, msg: err.response?.data?.erro || err.response?.data?.msg || 'Erro ao atualizar perfil' }
    } finally {
      loading.value = false
    }
  }

  const fetchMeusDados = async () => {
    try {
      const { data } = await api.get('/usuarios/meus-dados')
      return { ok: true, dados: data }
    } catch (err) {
      return { ok: false, msg: err.response?.data?.erro || err.response?.data?.msg || 'Erro ao buscar dados' }
    }
  }

  const updateMeusDados = async (dados) => {
    loading.value = true
    try {
      const { data } = await api.patch('/usuarios/meus-dados', dados)
      user.value = data.user
      return { ok: true, user: data.user, dados: data.dados }
    } catch (err) {
      return { ok: false, msg: err.response?.data?.erro || err.response?.data?.msg || 'Erro ao atualizar dados' }
    } finally {
      loading.value = false
    }
  }

  const fetchEndereco = async () => {
    try {
      const { data } = await api.get('/usuarios/endereco')
      return { ok: true, endereco: data }
    } catch (err) {
      return { ok: false, msg: err.response?.data?.erro || err.response?.data?.msg || 'Erro ao buscar endereco' }
    }
  }

  const updateEndereco = async (endereco) => {
    loading.value = true
    try {
      const { data } = await api.put('/usuarios/endereco', endereco)
      if (user.value) user.value = { ...user.value, ...data.endereco }
      return { ok: true, endereco: data.endereco }
    } catch (err) {
      return { ok: false, msg: err.response?.data?.erro || err.response?.data?.msg || 'Erro ao atualizar endereco' }
    } finally {
      loading.value = false
    }
  }

  const changePassword = async (senhaAtual, novaSenha, confirmarSenha) => {
    loading.value = true
    try {
      const { data } = await api.patch('/usuarios/password', { senhaAtual, novaSenha, confirmarSenha })
      return { ok: true, msg: data.msg }
    } catch (err) {
      return { ok: false, msg: err.response?.data?.erro || err.response?.data?.msg || 'Erro ao alterar senha' }
    } finally {
      loading.value = false
    }
  }

  const updateNotifications = async (notificacoes) => {
    try {
      const { data } = await api.patch('/usuarios/notifications', { notificacoes })
      if (user.value) user.value.notificacoes = data.notificacoes
      return { ok: true, notificacoes: data.notificacoes }
    } catch (err) {
      return { ok: false, msg: err.response?.data?.erro || err.response?.data?.msg || 'Erro ao atualizar notificacoes' }
    }
  }

  const toggle2FA = async (ativo) => {
    try {
      const { data } = await api.patch('/usuarios/2fa', { ativo })
      if (user.value) user.value.twoFA = data.twoFA
      return { ok: true, twoFA: data.twoFA, msg: data.msg }
    } catch (err) {
      return { ok: false, msg: err.response?.data?.erro || err.response?.data?.msg || 'Erro ao atualizar 2FA' }
    }
  }

  const fetchSessions = async () => {
    try {
      const { data } = await api.get('/usuarios/sessions')
      return { ok: true, sessoes: data.sessoes }
    } catch (err) {
      return { ok: false, msg: err.response?.data?.erro || err.response?.data?.msg || 'Erro ao buscar sessoes' }
    }
  }

  const revokeSession = async (id) => {
    try {
      const { data } = await api.delete(`/usuarios/sessions/${id}`)
      return { ok: true, msg: data.msg }
    } catch (err) {
      return { ok: false, msg: err.response?.data?.erro || err.response?.data?.msg || 'Erro ao revogar sessao' }
    }
  }

  const revokeAllSessions = async () => {
    try {
      const { data } = await api.delete('/usuarios/sessions')
      return { ok: true, msg: data.msg }
    } catch (err) {
      return { ok: false, msg: err.response?.data?.erro || err.response?.data?.msg || 'Erro ao revogar sessoes' }
    }
  }

  return {
    user, token, loading, error,
    isLoggedIn, isLogado, isAdmin, isVip, nomeCompleto, enderecoCompleto,
    init, fetchMe, login, register, loginGoogle, logout, fetchProfile,
    updateProfile, fetchMeusDados, updateMeusDados, fetchEndereco,
    updateEndereco, changePassword, updateNotifications, toggle2FA,
    fetchSessions, revokeSession, revokeAllSessions,
  }
})