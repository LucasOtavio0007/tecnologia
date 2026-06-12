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
  const isLoggedIn      = computed(() => !!token.value && !!user.value)
  const isLogado        = computed(() => !!token.value && !!user.value) // alias usado pelo Navbar
  const isAdmin         = computed(() => user.value?.role === 'admin')
  const isVip           = computed(() => ['vip', 'elite'].includes(user.value?.nivel))
  const nomeCompleto    = computed(() => {
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

  // === ACTIONS ===

  // Inicializa auth (chamado no App.vue)
  const init = async () => {
    if (!token.value) return
    setAuthHeader(token.value)
    try {
      await fetchProfile()
    } catch {
      logout()
    }
  }

  // Alias para init - usado no main.js
  const fetchMe = async () => {
    if (!token.value) return
    setAuthHeader(token.value)
    try {
      await fetchProfile()
    } catch {
      logout()
    }
  }

  // Login com e-mail e senha
  // CORRIGIDO: backend espera "password", não "senha"
  const login = async (email, senha) => {
    loading.value = true
    error.value   = null
    try {
      const { data } = await api.post('/auth/login', { email, password: senha })
      token.value = data.token
      user.value  = data.user
      setAuthHeader(data.token)
      return { ok: true }
    } catch (err) {
      error.value = err.response?.data?.message || err.response?.data?.msg || 'Erro ao fazer login'
      throw new Error(error.value)
    } finally {
      loading.value = false
    }
  }

  // Registro
  // CORRIGIDO: backend espera "password", não "senha"; e recebe nome/sobrenome separados
  const register = async (nome, sobrenome, email, senha) => {
    loading.value = true
    error.value   = null
    try {
      const { data } = await api.post('/auth/register', { nome, sobrenome, email, password: senha })
      token.value = data.token
      user.value  = data.user
      setAuthHeader(data.token)
      return { ok: true }
    } catch (err) {
      error.value = err.response?.data?.message || err.response?.data?.msg || 'Erro ao registrar'
      throw new Error(error.value)
    } finally {
      loading.value = false
    }
  }

  // Login com Google
  const loginGoogle = async (dadosGoogle) => {
    loading.value = true
    error.value   = null
    try {
      const { data } = await api.post('/auth/google', dadosGoogle)
      token.value = data.token
      user.value  = data.user
      setAuthHeader(data.token)
      return { ok: true }
    } catch (err) {
      error.value = err.response?.data?.message || err.response?.data?.msg || 'Erro ao autenticar com Google'
      throw new Error(error.value)
    } finally {
      loading.value = false
    }
  }

  // Logout
  const logout = () => {
    user.value  = null
    token.value = null
    setAuthHeader(null)
  }

  // Buscar perfil
  const fetchProfile = async () => {
    try {
      const { data } = await api.get('/usuarios/profile')
      user.value = data.user
      return { ok: true, user: data.user }
    } catch (err) {
      return { ok: false, msg: err.response?.data?.msg || 'Erro ao buscar perfil' }
    }
  }

  // Atualizar perfil
  const updateProfile = async (dados) => {
    loading.value = true
    try {
      const { data } = await api.patch('/usuarios/profile', dados)
      user.value = data.user
      return { ok: true, user: data.user }
    } catch (err) {
      return { ok: false, msg: err.response?.data?.msg || 'Erro ao atualizar perfil' }
    } finally {
      loading.value = false
    }
  }

  // Buscar meus dados (para checkout)
  const fetchMeusDados = async () => {
    try {
      const { data } = await api.get('/usuarios/meus-dados')
      return { ok: true, dados: data }
    } catch (err) {
      return { ok: false, msg: err.response?.data?.msg || 'Erro ao buscar dados' }
    }
  }

  // Atualizar meus dados
  const updateMeusDados = async (dados) => {
    loading.value = true
    try {
      const { data } = await api.patch('/usuarios/meus-dados', dados)
      user.value = data.user
      return { ok: true, user: data.user, dados: data.dados }
    } catch (err) {
      return { ok: false, msg: err.response?.data?.msg || 'Erro ao atualizar dados' }
    } finally {
      loading.value = false
    }
  }

  // Buscar endereço
  const fetchEndereco = async () => {
    try {
      const { data } = await api.get('/usuarios/endereco')
      return { ok: true, endereco: data }
    } catch (err) {
      return { ok: false, msg: err.response?.data?.msg || 'Erro ao buscar endereco' }
    }
  }

  // Atualizar endereço
  const updateEndereco = async (endereco) => {
    loading.value = true
    try {
      const { data } = await api.put('/usuarios/endereco', endereco)
      if (user.value) user.value = { ...user.value, ...data.endereco }
      return { ok: true, endereco: data.endereco }
    } catch (err) {
      return { ok: false, msg: err.response?.data?.msg || 'Erro ao atualizar endereco' }
    } finally {
      loading.value = false
    }
  }

  // Alterar senha
  const changePassword = async (senhaAtual, novaSenha, confirmarSenha) => {
    loading.value = true
    try {
      const { data } = await api.patch('/usuarios/password', { senhaAtual, novaSenha, confirmarSenha })
      return { ok: true, msg: data.msg }
    } catch (err) {
      return { ok: false, msg: err.response?.data?.msg || 'Erro ao alterar senha' }
    } finally {
      loading.value = false
    }
  }

  // Atualizar notificações
  const updateNotifications = async (notificacoes) => {
    try {
      const { data } = await api.patch('/usuarios/notifications', { notificacoes })
      if (user.value) user.value.notificacoes = data.notificacoes
      return { ok: true, notificacoes: data.notificacoes }
    } catch (err) {
      return { ok: false, msg: err.response?.data?.msg || 'Erro ao atualizar notificacoes' }
    }
  }

  // Toggle 2FA
  const toggle2FA = async (ativo) => {
    try {
      const { data } = await api.patch('/usuarios/2fa', { ativo })
      if (user.value) user.value.twoFA = data.twoFA
      return { ok: true, twoFA: data.twoFA, msg: data.msg }
    } catch (err) {
      return { ok: false, msg: err.response?.data?.msg || 'Erro ao atualizar 2FA' }
    }
  }

  // Buscar sessões
  const fetchSessions = async () => {
    try {
      const { data } = await api.get('/usuarios/sessions')
      return { ok: true, sessoes: data.sessoes }
    } catch (err) {
      return { ok: false, msg: err.response?.data?.msg || 'Erro ao buscar sessoes' }
    }
  }

  // Revogar sessão
  const revokeSession = async (id) => {
    try {
      const { data } = await api.delete(`/usuarios/sessions/${id}`)
      return { ok: true, msg: data.msg }
    } catch (err) {
      return { ok: false, msg: err.response?.data?.msg || 'Erro ao revogar sessao' }
    }
  }

  // Revogar todas as sessões
  const revokeAllSessions = async () => {
    try {
      const { data } = await api.delete('/usuarios/sessions')
      return { ok: true, msg: data.msg }
    } catch (err) {
      return { ok: false, msg: err.response?.data?.msg || 'Erro ao revogar sessoes' }
    }
  }

  return {
    // State
    user,
    token,
    loading,
    error,
    // Getters
    isLoggedIn,
    isLogado,        // ← alias usado pelo TheNavbar.vue
    isAdmin,
    isVip,
    nomeCompleto,
    enderecoCompleto,
    // Actions
    init,
    fetchMe,
    login,
    register,
    loginGoogle,     // ← novo: login com Google
    logout,
    fetchProfile,
    updateProfile,
    fetchMeusDados,
    updateMeusDados,
    fetchEndereco,
    updateEndereco,
    changePassword,
    updateNotifications,
    toggle2FA,
    fetchSessions,
    revokeSession,
    revokeAllSessions,
  }
})