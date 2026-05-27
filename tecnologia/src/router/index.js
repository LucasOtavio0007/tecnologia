
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'

// Importe das páginas existentes
import Home from '../views/Home.vue'
import Store from '../views/Store.vue'
import Produto from '../views/Produto.vue'
import Sobre from '../views/Sobre.vue'
import Contato from '../views/Contato.vue'
import RedefinirSenha from '../views/RedefinirSenha.vue'
import PedidoSucesso from '../views/PedidoSucesso.vue'
import Configuracoes from '../views/Configuracoes.vue'
import AdminDashboard from '../views/AdminDashboard.vue'
import Billing from '../views/Billing.vue'
import Suporte from '../views/Suporte.vue'
import Gamer from '../views/Gamer.vue'

// Políticas já existentes
import PoliticaEntrega from '../views/PoliticaEntrega.vue'
import Devolucoes from '../views/Devolucoes.vue'
import Garantia from '../views/Garantia.vue'
import TermosCustodia from '../views/TermosCustodia.vue'

// Políticas adicionais
import PoliticaPrivacidade from '../views/PoliticaPrivacidade.vue'
import PoliticaCookies from '../views/PoliticaCookies.vue'

const routes = [
  // Páginas principais
  { path: '/', component: Home },
  { path: '/loja', component: Store },
  { path: '/produto/:id', component: Produto, name: 'produto' },
  { path: '/sobre', component: Sobre },
  { path: '/contato', component: Contato },
  { path: '/redefinir-senha', component: RedefinirSenha },
  { path: '/pedido/:id', component: PedidoSucesso, name: 'pedido-sucesso' },
  { path: '/gamer', component: Gamer },

  // Rotas protegidas (autenticação)
  { path: '/configuracoes', component: Configuracoes, meta: { requiresAuth: true } },
  { path: '/admin', component: AdminDashboard, meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/billing', component: Billing, meta: { requiresAuth: true } },
  { path: '/suporte', component: Suporte, meta: { requiresAuth: true } },

  // Políticas (públicas, com hífen)
  { path: '/politica-entrega', component: PoliticaEntrega },
  { path: '/devolucoes', component: Devolucoes },
  { path: '/garantia', component: Garantia },
  { path: '/termos-custodia', component: TermosCustodia },
  { path: '/politica-privacidade', component: PoliticaPrivacidade },
  { path: '/politica-cookies', component: PoliticaCookies },

  // ===== ROTA CURINGA (DEVE FICAR POR ÚLTIMO) =====
  {
    path: '/:pathMatch(.*)*',
    redirect: (to) => {
      const cleanedPath = to.path
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
        .toLowerCase()

      if (cleanedPath && cleanedPath !== to.path) {
        return cleanedPath
      }

      return '/'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Guarda de autenticação
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  if (to.meta.requiresAuth && !token) {
    next('/')
    return
  }

  if (to.meta.requiresAdmin) {
    const auth = useAuthStore()
    if (!auth.isAdmin) {
      next('/')
      return
    }
  }

  next()
})

export default router
