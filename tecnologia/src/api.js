import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true,
  timeout: 60000,
})

// Seta o token imediatamente se já existir no localStorage
const _token = localStorage.getItem('token')
if (_token) api.defaults.headers.common['Authorization'] = `Bearer ${_token}`
// Rotas que podem retornar 401 sem significar sessão expirada
const ROTAS_401_IGNORADAS = [
  '/carrinho',
]

// Rotas opcionais: 404 esperado quando não implementadas, não loga erro
const ROTAS_OPCIONAIS = [
  '/usuarios/log',
  '/suporte/tickets/meus',
]

// ─── REQUEST ─────────────────────────────────────────────────────────────────
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// ─── RESPONSE ────────────────────────────────────────────────────────────────
let disparandoLogout = false
let refreshPromise   = null

api.interceptors.response.use(
  response => response,
  async error => {
    const status   = error.response?.status
    const url      = error.config?.url || ''
    const original = error.config

    const rotaIgnorada = ROTAS_401_IGNORADAS.some(r => url.includes(r))
    const rotaAuth     = url.includes('/auth/')
    const rotaOpcional = ROTAS_OPCIONAIS.some(r => url.includes(r))

    if (status === 401 && !rotaIgnorada && !rotaAuth && !original._retry) {
      original._retry = true

      if (!refreshPromise) {
        refreshPromise = api.post('/auth/refresh')
          .then(({ data }) => {
            const novoToken = data.token
            localStorage.setItem('token', novoToken)
            api.defaults.headers.common['Authorization'] = `Bearer ${novoToken}`
            return novoToken
          })
          .catch(() => {
            if (!disparandoLogout) {
              disparandoLogout = true
              localStorage.removeItem('token')
              delete api.defaults.headers.common['Authorization']
              window.dispatchEvent(new CustomEvent('auth:expirado'))
              console.warn('🔒 [API] Sessão expirada:', url)
              setTimeout(() => { disparandoLogout = false }, 2000)
            }
            return Promise.reject(error)
          })
          .finally(() => { refreshPromise = null })
      }

      try {
        const novoToken = await refreshPromise
        original.headers['Authorization'] = `Bearer ${novoToken}`
        return api(original)
      } catch {
        return Promise.reject(error)
      }
    }

    // Só loga erros de rotas não-opcionais e não-401
    if (status && status !== 401 && !rotaOpcional) {
      console.error('🚨 [API] Erro na requisição:', url, status)
    }

    return Promise.reject(error)
  }
)

export default api