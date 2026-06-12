<template>
  <main class="reset-page">
    <div class="reset-orb reset-orb--1"></div>
    <div class="reset-orb reset-orb--2"></div>

    <div class="reset-card">
      <div class="reset-brand">{{ $t('n.amp.o') }}</div>

      <!-- SOLICITAR -->
      <div v-if="!tokenNaUrl && !enviado">
        <h1 class="reset-titulo">{{ $t('recuperar') }}<br/><em>{{ $t('senha') }}</em></h1>
        <p class="reset-sub">{{ $t('informe.seu.e.mail.e.enviaremos.as.instrucoes.para.redefinir.sua.senha') }}</p>
        <div class="reset-campo">
          <label>{{ $t('e.mail') }}</label>
          <div class="reset-field">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            <input v-model="email" type="email" placeholder="seu@email.com" @keyup.enter="solicitar" autocomplete="off" />
          </div>
        </div>
        <p v-if="erro" class="reset-erro">⚠ {{ erro }}</p>
        <button class="btn-reset" @click="solicitar" :disabled="loading">
          <span v-if="!loading">{{ $t('enviar.instrucoes') }}</span>
          <span v-else class="spinner"></span>
        </button>
        <router-link to="/" class="reset-voltar">{{ $t('voltar.ao.inicio') }}</router-link>
      </div>

      <!-- ENVIADO -->
      <div v-if="enviado && !tokenNaUrl" class="reset-sucesso">
        <div class="reset-sucesso-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
        </div>
        <h2 class="reset-titulo" style="font-size:2rem">{{ $t('e.mail.enviado') }}</h2>
        <p class="reset-sub">{{ $t('verifique.sua.caixa.de.entrada.o.link.expira.em.1.hora') }}</p>
        <router-link to="/" class="btn-reset" style="text-align:center;text-decoration:none;display:block">{{ $t('voltar.ao.inicio_1') }}</router-link>
      </div>

      <!-- NOVA SENHA -->
      <div v-if="tokenNaUrl && !redefinido">
        <h1 class="reset-titulo">{{ $t('nova') }}<br/><em>{{ $t('senha') }}</em></h1>
        <p class="reset-sub">{{ $t('escolha.uma.senha.forte.com.no.minimo.8.caracteres') }}</p>
        <div class="reset-campo">
          <label>{{ $t('nova.senha') }}</label>
          <div class="reset-field">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <rect x="3" y="11" width="18" height="11" rx="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            <input v-model="novaSenha" :type="verSenha ? 'text' : 'password'" placeholder="Mínimo 8 caracteres" @keyup.enter="redefinir" autocomplete="new-password" />
            <button class="reset-eye" @click="verSenha = !verSenha">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </button>
          </div>
        </div>
        <div v-if="novaSenha" class="reset-forca">
          <div class="forca-barras">
            <div v-for="i in 4" :key="i" class="forca-seg" :style="{background: i<=forcaSenha.n ? forcaSenha.cor : 'var(--viola-08)'}"></div>
          </div>
          <span :style="{color: forcaSenha.cor}">{{ forcaSenha.label }}</span>
        </div>
        <p v-if="erro" class="reset-erro">⚠ {{ erro }}</p>
        <button class="btn-reset" @click="redefinir" :disabled="loading">
          <span v-if="!loading">{{ $t('redefinir.senha') }}</span>
          <span v-else class="spinner"></span>
        </button>
      </div>

      <!-- REDEFINIDO -->
      <div v-if="redefinido" class="reset-sucesso">
        <div class="reset-sucesso-icon reset-sucesso-icon--ok">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <h2 class="reset-titulo" style="font-size:2rem">{{ $t('senha.redefinida') }}</h2>
        <p class="reset-sub">{{ $t('sua.nova.senha.foi.salva.com.sucesso') }}</p>
        <router-link to="/" class="btn-reset" style="text-align:center;text-decoration:none;display:block">{{ $t('ir.para.o.site') }}</router-link>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/api.js'

const route      = useRoute()
const email      = ref('')
const novaSenha  = ref('')
const verSenha   = ref(false)
const loading    = ref(false)
const erro       = ref('')
const enviado    = ref(false)
const redefinido = ref(false)
const tokenNaUrl = ref('')

onMounted(() => {
  tokenNaUrl.value = route.query.token || ''
})

const forcaSenha = computed(() => {
  const s = novaSenha.value; let n = 0
  if(s.length>=8) n++; if(/[A-Z]/.test(s)) n++
  if(/[0-9]/.test(s)) n++; if(/[^A-Za-z0-9]/.test(s)) n++
  return [{},{n:1,label:'Fraca',cor:'#e74c3c'},{n:2,label:'Razoável',cor:'#f39c12'},{n:3,label:'Forte',cor:'#2ecc71'},{n:4,label:'Muito forte',cor:'#6C63FF'}][n]||{n:1,label:'Fraca',cor:'#e74c3c'}
})

const solicitar = async () => {
  erro.value = ''
  if (!email.value.includes('@')) { erro.value = 'E-mail inválido.'; return }
  loading.value = true
  try {
    await api.post('/auth/forgot-password', { email: email.value })
    enviado.value = true
  } catch (e) { erro.value = e.response?.data?.msg || 'Erro ao enviar e-mail.' }
  finally { loading.value = false }
}

const redefinir = async () => {
  erro.value = ''
  if (novaSenha.value.length < 8) { erro.value = 'Senha deve ter mínimo 8 caracteres.'; return }
  loading.value = true
  try {
    await api.post('/auth/reset-password', { token: tokenNaUrl.value, novaSenha: novaSenha.value })
    redefinido.value = true
  } catch (e) { erro.value = e.response?.data?.msg || 'Token inválido ou expirado.' }
  finally { loading.value = false }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;1,400&display=swap');

.reset-page {
  min-height: 100vh;
  background: var(--cor-fundo);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  position: relative;
  overflow: hidden;
  font-family: 'Syne', sans-serif;
}
.reset-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
}
.reset-orb--1 { width: 400px; height: 400px; background: var(--viola-08); top: -100px; right: -100px; }
.reset-orb--2 { width: 300px; height: 300px; background: rgba(59,130,246,0.06); bottom: -80px; left: -80px; }

.reset-card {
  background: var(--cor-superficie);
  border: 1px solid var(--cor-borda);
  border-radius: 20px;
  padding: 52px 44px;
  width: 100%;
  max-width: 440px;
  position: relative;
  z-index: 2;
  box-shadow: var(--shadow-card);
}
.reset-brand {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  font-style: italic;
  letter-spacing: 5px;
  background: var(--grad-texto);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 28px;
}
.reset-titulo {
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  font-weight: 400;
  color: var(--cor-texto);
  line-height: 1.1;
  margin-bottom: 14px;
}
.reset-titulo em {
  font-style: italic;
  background: var(--grad-texto);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.reset-sub { font-size: 13px; color: var(--cor-texto-3); line-height: 1.7; margin-bottom: 28px; }

.reset-campo { display: flex; flex-direction: column; gap: 7px; margin-bottom: 14px; }
.reset-campo label { font-size: 7px; letter-spacing: 4px; color: var(--cor-primaria); text-transform: uppercase; opacity: 0.8; font-weight: 700; }
.reset-field { display: flex; align-items: center; gap: 9px; background: var(--input-bg); border: 1px solid var(--input-borda); border-radius: 10px; padding: 12px 14px; transition: border-color 0.25s, box-shadow 0.25s; }
.reset-field:focus-within { border-color: var(--input-borda-focus); box-shadow: 0 0 0 3px var(--viola-08); }
.reset-field svg { opacity: 0.4; flex-shrink: 0; color: var(--cor-primaria); }
.reset-field input { flex: 1; background: none; border: none; outline: none; font-family: 'Syne', sans-serif; font-size: 13px; color: var(--cor-texto); min-width: 0; }
.reset-field input::placeholder { color: var(--cor-texto-3); }
.reset-eye { background: none; border: none; color: var(--cor-texto-3); cursor: pointer; flex-shrink: 0; transition: color 0.2s; }
.reset-eye:hover { color: var(--cor-primaria); }

.reset-forca { display: flex; align-items: center; gap: 8px; margin-bottom: 14px; }
.forca-barras { display: flex; gap: 4px; flex: 1; }
.forca-seg { height: 3px; flex: 1; border-radius: 2px; transition: background 0.4s; }
.reset-forca span { font-size: 9px; white-space: nowrap; }

.reset-erro { font-size: 11px; color: #e74c3c; background: rgba(231,76,60,0.07); border: 1px solid rgba(231,76,60,0.2); border-radius: 8px; padding: 8px 12px; margin-bottom: 14px; }
.btn-reset {
  width: 100%; background: var(--grad-btn); border: none; border-radius: 12px;
  color: #fff; font-family: 'Syne', sans-serif; font-size: 10px; font-weight: 700;
  letter-spacing: 3px; text-transform: uppercase; padding: 15px;
  cursor: pointer; min-height: 48px; display: flex; align-items: center; justify-content: center;
  box-shadow: var(--shadow-btn); transition: transform 0.3s, box-shadow 0.3s; margin-bottom: 16px;
}
.btn-reset:hover:not(:disabled) { transform: translateY(-1px); box-shadow: var(--shadow-btn-hover); }
.btn-reset:disabled { opacity: 0.5; cursor: not-allowed; }
.reset-voltar { display: block; text-align: center; font-size: 11px; color: var(--cor-texto-3); text-decoration: none; transition: color 0.25s; letter-spacing: 1px; }
.reset-voltar:hover { color: var(--cor-primaria); }

.reset-sucesso { display: flex; flex-direction: column; align-items: center; gap: 16px; text-align: center; }
.reset-sucesso-icon { width: 64px; height: 64px; border-radius: 50%; background: var(--viola-10); border: 1px solid var(--cor-borda-hover); display: flex; align-items: center; justify-content: center; color: var(--cor-primaria); }
.reset-sucesso-icon--ok { background: rgba(46,204,113,0.1); border-color: rgba(46,204,113,0.3); color: #2ecc71; }

.spinner { width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.2); border-top-color: #fff; border-radius: 50%; animation: spin 0.7s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
</style>
