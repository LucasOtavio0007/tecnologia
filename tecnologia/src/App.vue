<template>
  <div id="app">
    <TheNavbar />
    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <TheFooter />
    <CheckoutModal />
    <UserModal />
    <ChatIA />
    <!-- remova o <div id="modals"> daqui -->
  </div>
</template>

<script setup>
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'
import { useCartStore } from '@/stores/cart.js'
import { useSiteStore } from '@/stores/site.js'
import { useI18n } from 'vue-i18n'
import TheNavbar     from '@/components/TheNavbar.vue'
import TheFooter     from '@/components/TheFooter.vue'
import CheckoutModal from '@/components/CheckoutModal.vue'
import UserModal     from '@/components/UserModal.vue'
import ChatIA        from '@/components/ChatIA.vue'

const auth      = useAuthStore()
const cart      = useCartStore()
const siteStore = useSiteStore()
const route     = useRoute()
const { locale } = useI18n()

// ─── Gamer mode ───────────────────────────────────────────────────────────────
watch(() => route.path, (path) => {
  document.body.classList.toggle('gamer-mode', path === '/gamer')
}, { immediate: true })

// ─── Tamanho da fonte ─────────────────────────────────────────────────────────
watch(() => siteStore.fonte, (fonte) => {
  document.documentElement.style.fontSize =
    fonte === 'pequena' ? '14px' : fonte === 'grande' ? '18px' : '16px'
}, { immediate: true })

// ─── Lang da <html> ───────────────────────────────────────────────────────────
watch(locale, (newLocale) => {
  document.documentElement.setAttribute('lang', newLocale === 'pt-BR' ? 'pt-BR' : 'en')
}, { immediate: true })

// ─── Sessão expirada (disparado pelo api.js no interceptor 401) ───────────────
onMounted(() => {
  window.addEventListener('auth:expirado', () => {
    auth.logout()
    cart.limpar()
  })
})

// ─── Inicialização principal ──────────────────────────────────────────────────
// Ordem garantida: config → auth → cart (cart só init se já logado via token salvo)
onMounted(async () => {
  await siteStore.fetchConfig()
  await auth.fetchMe()             // seta header Authorization se há token salvo

  if (auth.isLogado) {
    await cart.init()              // token já está no axios neste ponto
  }
})

// ─── REMOVIDO: beforeunload com logout ───────────────────────────────────────
// Causava logout em todo refresh/F5, apagando o token e gerando 401 no carrinho
</script>

<style>
@import '@/assets/global.css';
</style>