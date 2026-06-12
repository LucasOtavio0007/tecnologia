<template>
  <main class="billing">
    <div class="billing__inner">
      <div class="billing__header">
        <span class="eyebrow">{{ $t('noir.or.saas') }}</span>
        <h1 class="billing__titulo">{{ $t('planos') }}<em>{{ $t('assinatura') }}</em></h1>
        <p class="billing__sub">{{ $t('escolha.o.plano.ideal.para.o.seu.negocio') }}</p>
      </div>

      <!-- STATUS ATUAL -->
      <div v-if="statusAtual" class="billing__status-card">
        <div class="billing__status-info">
          <div class="billing__status-dot" :class="`billing__status-dot--${statusAtual.status}`"></div>
          <div>
            <p class="billing__status-plano">{{ $t('plano') }} <strong>{{ statusAtual.plano?.toUpperCase() }}</strong></p>
            <p class="billing__status-desc">
              <span v-if="statusAtual.trial?.ativo">Trial até {{ formatDate(statusAtual.trial.expira) }}</span>
              <span v-else-if="statusAtual.status==='active'">{{ $t('assinatura.ativa') }}</span>
              <span v-else-if="statusAtual.status==='past_due'">{{ $t('pagamento.pendente') }}</span>
              <span v-else-if="statusAtual.status==='canceled'">{{ $t('assinatura.cancelada') }}</span>
            </p>
          </div>
        </div>
        <div class="billing__status-limites">
          <div v-for="(val, key) in statusAtual.limites" :key="key" class="billing__limite">
            <span class="billing__limite-label">{{ key }}</span>
            <span class="billing__limite-val">{{ val === 9999 ? '∞' : val }}</span>
          </div>
        </div>
        <div v-if="statusAtual.plano !== 'free'" class="billing__status-acoes">
          <button class="billing__btn-portal" @click="abrirPortal" :disabled="carregando">
            <span v-if="!carregando">{{ $t('gerenciar.assinatura') }}</span>
            <span v-else class="spinner"></span>
          </button>
        </div>
      </div>

      <!-- SUCESSO / CANCELAMENTO -->
      <transition name="fade">
        <div v-if="msgSucesso" class="billing__msg billing__msg--sucesso">
          {{ $t('assinatura.ativada.com.sucesso.bem.vindo.ao.plano') }} {{ planoAtivado?.toUpperCase() }}.
        </div>
        <div v-else-if="msgCancelado" class="billing__msg billing__msg--info">
          {{ $t('checkout.cancelado.voce.pode.assinar.a.qualquer.momento') }}
        </div>
      </transition>

      <!-- PLANOS -->
      <div class="billing__planos">
        <div v-for="plano in planos" :key="plano.id" :class="['billing__plano', { 'billing__plano--destaque': plano.destaque, 'billing__plano--atual': statusAtual?.plano === plano.id }]">
          <div v-if="plano.destaque" class="billing__plano-tag">{{ $t('mais.popular') }}</div>
          <div v-if="statusAtual?.plano === plano.id" class="billing__plano-tag billing__plano-tag--atual">{{ $t('seu.plano') }}</div>
          <h3 class="billing__plano-nome">{{ plano.nome }}</h3>
          <div class="billing__plano-valor">
            <span v-if="plano.valor === 0" class="billing__plano-preco">{{ $t('gratuito_1') }}</span>
            <span v-else class="billing__plano-preco">R$ {{ fmt(plano.valor) }}<small>{{ $t('mes') }}</small></span>
          </div>
          <p class="billing__plano-desc">{{ plano.desc }}</p>
          <ul class="billing__plano-features">
            <li v-for="f in plano.features" :key="f">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--cor-primaria)" stroke-width="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              {{ f }}
            </li>
          </ul>
          <button
            class="billing__plano-btn"
            :disabled="statusAtual?.plano === plano.id || carregando"
            @click="assinar(plano.id)"
          >
            <span v-if="carregandoPlano === plano.id" class="spinner spinner--dark"></span>
            <span v-else-if="statusAtual?.plano === plano.id">{{ $t('plano.atual') }}</span>
            <span v-else-if="plano.id === 'free'">{{ $t('comecar.gratis') }}</span>
            <span v-else>{{ $t('assinar.agora') }}</span>
          </button>
        </div>
      </div>

      <!-- FAQ -->
      <div class="billing__faq">
        <h2 class="billing__faq-titulo">{{ $t('perguntas.frequentes_1') }}</h2>
        <div class="billing__faq-lista">
          <div v-for="(f, i) in faq" :key="i" class="billing__faq-item" @click="faqAberto=faqAberto===i?null:i">
            <div class="billing__faq-p">
              {{ f.p }}
              <svg :class="['billing__chevron',{open:faqAberto===i}]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </div>
            <transition name="faq-slide">
              <p v-if="faqAberto===i" class="billing__faq-r">{{ f.r }}</p>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/api.js'

const route          = useRoute()
const planos         = ref([])
const statusAtual    = ref(null)
const carregando     = ref(false)
const carregandoPlano = ref(null)
const msgSucesso     = ref(false)
const msgCancelado   = ref(false)
const planoAtivado   = ref(null)
const faqAberto      = ref(null)

const faq = [
  { p: 'Posso cancelar a qualquer momento?',          r: 'Sim. Você pode cancelar pelo portal de billing. O acesso continua até o fim do período pago.' },
  { p: 'O trial precisa de cartão de crédito?',       r: 'Não. Os 14 dias de trial são completamente gratuitos, sem necessidade de cartão.' },
  { p: 'Posso fazer upgrade ou downgrade de plano?',  r: 'Sim. O valor é ajustado proporcionalmente ao período restante.' },
  { p: 'Quais formas de pagamento são aceitas?',      r: 'Aceitamos todos os cartões de crédito internacionais via Stripe.' },
  { p: 'Meus dados ficam seguros?',                   r: 'Sim. Cada tenant tem seus dados completamente isolados. Usamos criptografia de ponta a ponta.' },
]

onMounted(async () => {
  // Verifica retorno do Stripe
  if (route.query.success) { msgSucesso.value = true; setTimeout(() => msgSucesso.value = false, 5000) }
  if (route.query.canceled){ msgCancelado.value = true; setTimeout(() => msgCancelado.value = false, 5000) }
  await Promise.all([carregarPlanos(), carregarStatus()])
})

const carregarPlanos = async () => {
  const { data } = await api.get('/billing/planos')
  planos.value = data.planos
}

const carregarStatus = async () => {
  try {
    const { data } = await api.get('/billing/status')
    statusAtual.value = data
  } catch {}
}

const assinar = async (planoId) => {
  if (planoId === 'free') return
  carregandoPlano.value = planoId
  try {
    const { data } = await api.post('/billing/checkout', { plano: planoId })
    window.location.href = data.url
  } catch (e) {
    alert(e.response?.data?.msg || 'Erro ao iniciar checkout.')
  } finally {
    carregandoPlano.value = null
  }
}

const abrirPortal = async () => {
  carregando.value = true
  try {
    const { data } = await api.post('/billing/portal')
    window.location.href = data.url
  } catch (e) {
    alert(e.response?.data?.msg || 'Erro ao abrir portal.')
  } finally {
    carregando.value = false
  }
}

const fmt = (v) => ((v||0)/100).toLocaleString('pt-BR', { minimumFractionDigits: 2 })
const formatDate = (d) => new Date(d).toLocaleDateString('pt-BR')
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;1,400&display=swap');

.billing { background: var(--cor-fundo); color: var(--cor-texto); font-family: 'Syne', sans-serif; min-height: 100vh; padding-top: var(--navbar-h, 88px); }
.billing__inner { max-width: 1200px; margin: 0 auto; padding: 60px 60px 100px; }
.eyebrow { font-size: 9px; letter-spacing: 7px; font-weight: 700; text-transform: uppercase; display: block; margin-bottom: 14px; background: var(--grad-texto); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.billing__header { text-align: center; margin-bottom: 52px; }
.billing__titulo { font-family: 'Playfair Display', serif; font-size: clamp(2.5rem, 5vw, 4.5rem); font-weight: 400; color: var(--cor-texto); margin: 8px 0; }
.billing__titulo em { font-style: italic; background: var(--grad-texto); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.billing__sub { font-size: 14px; color: var(--cor-texto-3); }

/* STATUS */
.billing__status-card { background: var(--card-bg); border: 1px solid var(--cor-borda); border-radius: var(--border-radius); padding: 24px 28px; margin-bottom: 40px; display: flex; align-items: center; gap: 24px; flex-wrap: wrap; }
.billing__status-info { display: flex; align-items: center; gap: 12px; flex: 1; }
.billing__status-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
.billing__status-dot--active   { background: #2ecc71; box-shadow: 0 0 8px rgba(46,204,113,0.6); }
.billing__status-dot--trialing { background: var(--cor-primaria); box-shadow: 0 0 8px var(--gold-50); }
.billing__status-dot--past_due { background: #e74c3c; }
.billing__status-dot--canceled { background: var(--cor-texto-3); }
.billing__status-plano { font-size: 14px; color: var(--cor-texto); }
.billing__status-plano strong { color: var(--cor-primaria); }
.billing__status-desc { font-size: 12px; color: var(--cor-texto-3); margin-top: 2px; }
.billing__status-limites { display: flex; gap: 20px; flex-wrap: wrap; }
.billing__limite { display: flex; flex-direction: column; align-items: center; gap: 2px; }
.billing__limite-label { font-size: 8px; letter-spacing: 2px; color: var(--cor-texto-3); text-transform: uppercase; }
.billing__limite-val { font-family: 'Playfair Display', serif; font-size: 1.2rem; color: var(--cor-primaria); font-weight: 400; }
.billing__btn-portal { background: var(--gold-08); border: 1px solid var(--cor-borda-hover); border-radius: 2px; padding: 10px 20px; color: var(--cor-primaria); font-family: 'Syne', sans-serif; font-size: 9px; font-weight: 700; letter-spacing: 2px; cursor: pointer; transition: all 0.25s; text-transform: uppercase; display: flex; align-items: center; gap: 8px; min-height: 38px; }
.billing__btn-portal:hover:not(:disabled) { background: var(--gold-15); }
.billing__btn-portal:disabled { opacity: 0.4; cursor: not-allowed; }

/* MSG */
.billing__msg { padding: 14px 20px; border-radius: 2px; font-size: 13px; margin-bottom: 28px; }
.billing__msg--sucesso { background: rgba(46,204,113,0.1); border: 1px solid rgba(46,204,113,0.3); color: #2ecc71; }
.billing__msg--info    { background: var(--gold-08); border: 1px solid var(--cor-borda-hover); color: var(--cor-primaria); }

/* PLANOS */
.billing__planos { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 72px; }
.billing__plano { position: relative; background: var(--card-bg); border: 1px solid var(--cor-borda); border-radius: var(--border-radius); padding: 36px 28px; display: flex; flex-direction: column; gap: 16px; transition: border-color 0.3s, transform 0.4s, box-shadow 0.3s; }
.billing__plano:hover { border-color: var(--cor-borda-hover); transform: translateY(-4px); box-shadow: var(--shadow-glow); }
.billing__plano--destaque { border-color: var(--cor-borda-hover); box-shadow: var(--shadow-glow); }
.billing__plano--atual { border-color: var(--cor-primaria); }
.billing__plano-tag { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: var(--grad-btn); color: #0A0A0A; font-size: 8px; font-weight: 700; letter-spacing: 2px; padding: 4px 16px; border-radius: 20px; white-space: nowrap; text-transform: uppercase; }
.billing__plano-tag--atual { background: var(--gold-15); color: var(--cor-primaria); border: 1px solid var(--cor-borda-hover); }
.billing__plano-nome { font-family: 'Playfair Display', serif; font-size: 1.8rem; font-weight: 400; color: var(--cor-texto); }
.billing__plano-preco { font-family: 'Playfair Display', serif; font-size: 2.5rem; color: var(--cor-texto); font-weight: 400; }
.billing__plano-preco small { font-family: 'Syne', sans-serif; font-size: 12px; color: var(--cor-texto-3); }
.billing__plano-desc { font-size: 12px; color: var(--cor-texto-3); }
.billing__plano-features { list-style: none; display: flex; flex-direction: column; gap: 10px; flex: 1; }
.billing__plano-features li { display: flex; align-items: center; gap: 9px; font-size: 12px; color: var(--cor-texto-2); }
.billing__plano-btn { position: relative; overflow: hidden; padding: 13px; background: var(--grad-btn); color: #0A0A0A; font-family: 'Syne', sans-serif; font-size: 9px; font-weight: 700; letter-spacing: 2.5px; border: none; border-radius: 2px; cursor: pointer; box-shadow: var(--shadow-btn); transition: transform 0.3s, box-shadow 0.3s; text-transform: uppercase; display: flex; align-items: center; justify-content: center; min-height: 44px; margin-top: auto; }
.billing__plano-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: var(--shadow-btn-hover); }
.billing__plano-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; background: var(--gold-10); color: var(--cor-primaria); box-shadow: none; border: 1px solid var(--cor-borda-hover); }

/* FAQ */
.billing__faq { max-width: 680px; margin: 0 auto; }
.billing__faq-titulo { font-family: 'Playfair Display', serif; font-size: 2rem; font-weight: 400; color: var(--cor-texto); margin-bottom: 28px; text-align: center; }
.billing__faq-item { border-bottom: 1px solid var(--cor-borda); cursor: pointer; }
.billing__faq-p { display: flex; justify-content: space-between; align-items: center; padding: 18px 0; font-size: 14px; color: var(--cor-texto-2); transition: color 0.25s; }
.billing__faq-item:hover .billing__faq-p { color: var(--cor-primaria); }
.billing__chevron { transition: transform 0.3s; flex-shrink: 0; }
.billing__chevron.open { transform: rotate(180deg); }
.billing__faq-r { font-size: 13px; color: var(--cor-texto-3); line-height: 1.7; padding-bottom: 18px; }
.faq-slide-enter-active,.faq-slide-leave-active{transition:opacity .25s,max-height .3s;max-height:200px;overflow:hidden}
.faq-slide-enter-from,.faq-slide-leave-to{opacity:0;max-height:0}

.spinner { width: 16px; height: 16px; border: 2px solid rgba(212,175,55,0.2); border-top-color: var(--cor-primaria); border-radius: 50%; animation: spin 0.7s linear infinite; }
.spinner--dark { border-color: rgba(0,0,0,0.2); border-top-color: #0A0A0A; }
@keyframes spin { to { transform: rotate(360deg); } }
.fade-enter-active,.fade-leave-active{transition:opacity .3s}
.fade-enter-from,.fade-leave-to{opacity:0}

@media(max-width:900px){.billing__planos{grid-template-columns:1fr}.billing__inner{padding:40px 24px 80px}.billing__status-card{flex-direction:column;align-items:flex-start}}
</style>