import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/api.js'

export const useSiteStore = defineStore('site', () => {
  const config = ref(null)

  // Normaliza valor antigo do localStorage
  const temaStorage = localStorage.getItem('noir_tema') || 'escuro'
  const temaNormalizado = (temaStorage === 'tema-claro' || temaStorage === 'claro') ? 'claro' : 'escuro'

  const tema  = ref(temaNormalizado)
  const fonte = ref(localStorage.getItem('noir_fonte') || 'normal')

  function aplicarTema(t) {
    // Remove todas as classes de tema possíveis
    document.body.classList.remove('light-mode', 'tema-claro', 'tema-escuro')

    if (t === 'claro') {
      document.body.classList.add('light-mode')
      document.body.classList.remove('grain', 'gold-bezel')
    } else {
      document.body.classList.add('gold-bezel')
    }
  }

  function aplicarFonte(f) {
    const map = { pequena: '14px', normal: '16px', grande: '18px' }
    document.documentElement.style.fontSize = map[f] || '16px'
  }

  function applyCSSVars(cfg) {
    if (!cfg?.aparencia) return
    const a = cfg.aparencia
    const r = document.documentElement.style
    if (a.navbarAltura) r.setProperty('--navbar-h', a.navbarAltura + 'px')
    if (a.navbarBlur)   r.setProperty('--navbar-blur', a.navbarBlur + 'px')
    if (a.borderRadius) r.setProperty('--border-radius', a.borderRadius + 'px')
  }

  function toggleTema() {
    tema.value = tema.value === 'escuro' ? 'claro' : 'escuro'
    localStorage.setItem('noir_tema', tema.value)
    aplicarTema(tema.value)
  }

  function setFonte(f) {
    fonte.value = f
    localStorage.setItem('noir_fonte', f)
    aplicarFonte(f)
  }

  async function fetchConfig() {
    try {
      const { data } = await api.get('/config')
      config.value = data.config
      applyCSSVars(data.config)
    } catch {
      console.log('Config backend indisponível.')
    }
    aplicarTema(tema.value)
    aplicarFonte(fonte.value)
  }

  async function saveConfig(payload) {
    const { data } = await api.put('/config', payload)
    config.value = data.config
  }

  async function saveAparencia(ap) {
    const { data } = await api.put('/config/aparencia', { aparencia: ap })
    config.value = data.config
    applyCSSVars(data.config)
  }

  return {
    config, tema, fonte,
    fetchConfig, saveConfig, saveAparencia,
    applyCSSVars, toggleTema, setFonte,
  }
})