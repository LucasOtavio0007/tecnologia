import './assets/global.css'

import { createApp, watch } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index.js'
import { useAuthStore } from './stores/auth.js'
import { useSiteStore } from './stores/site.js'
import { useCartStore } from './stores/cart.js'
import i18n from './i18n'

// Normaliza locale inválido antes de qualquer coisa
function normalizeLocale(locale) {
  if (!locale) return 'pt-BR'
  if (locale.startsWith('pt')) return 'pt-BR'
  if (locale.startsWith('en')) return 'en'
  return 'pt-BR'
}
const rawLocale = localStorage.getItem('noir_locale')
localStorage.setItem('noir_locale', normalizeLocale(rawLocale))

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(i18n)

// Persiste o locale — sempre normalizado
watch(i18n.global.locale, (newLocale) => {
  const normalized = normalizeLocale(newLocale)
  localStorage.setItem('noir_locale', normalized)
  if (normalized !== newLocale) {
    i18n.global.locale.value = normalized
  }
})

if (import.meta.env.DEV) {
  window.__i18n = i18n
}

const auth = useAuthStore()
const site = useSiteStore()
const cart = useCartStore()

function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]:not([href="#"])')
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href').slice(1)
      const target = document.getElementById(targetId)
      if (target) {
        e.preventDefault()
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    })
  })
}

function setupGlobalClickOutside() {
  document.addEventListener('click', (event) => {
    const targets = document.querySelectorAll('.closable-on-click-outside')
    targets.forEach(el => {
      if (!el.contains(event.target)) {
        el.dispatchEvent(new CustomEvent('close-request', { detail: { target: el } }))
      }
    })
  })
}

let mounted = false

async function bootstrap() {
  // 1. Configurações do site (não depende de auth)
  site.fetchConfig().catch(() => {})

  // 2. Tenta restaurar sessão do usuário
  await auth.fetchMe()

  // 3. Só inicializa carrinho se estiver logado
  //    (agora fetchMe já terminou, token já está pronto)
  if (auth.isLogado) {
    await cart.init()
  }

  // 4. Monta a app
  if (!mounted) {
    mounted = true
    app.mount('#app')
    initSmoothScroll()
    setupGlobalClickOutside()
  }
}

bootstrap()