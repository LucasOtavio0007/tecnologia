```vue
<template>
  <div class="adm-usr">

    <!-- CARDS DE ESTATÍSTICAS -->
    <div class="adm-stats">
      <div class="stat-card">
        <div class="stat-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </div>
        <div class="stat-info">
          <span class="stat-num">{{ total }}</span>
          <span class="stat-label">{{ $t('usuarios') }}</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        </div>
        <div class="stat-info">
          <span class="stat-num">{{ adminsCount }}</span>
          <span class="stat-label">{{ $t('administradores') }}</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <rect x="3" y="4" width="18" height="16" rx="2"/>
            <line x1="8" y1="10" x2="16" y2="10"/>
          </svg>
        </div>
        <div class="stat-info">
          <span class="stat-num">{{ usuarios2fa }}</span>
          <span class="stat-label">{{ $t('2fa.ativo') }}</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
        </div>
        <div class="stat-info">
          <span class="stat-num">{{ thisMonth }}</span>
          <span class="stat-label">{{ $t('novos.este.mes') }}</span>
        </div>
      </div>
    </div>

    <!-- TOOLBAR -->
    <div class="adm-toolbar">
      <div class="adm-toolbar-esq">
        <h2 class="adm-titulo">{{ $t('usuarios') }}</h2>
      </div>
      <div class="adm-toolbar-dir">
        <div class="adm-search">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.3-4.3"/>
          </svg>
          <input v-model="busca" :placeholder="$t('buscar.por.nome.ou.email')" autocomplete="off" />
        </div>
      </div>
    </div>

    <!-- TABELA -->
    <div class="adm-tabela-wrap">
      <div v-if="loading" class="adm-loading"><span class="spinner-adm"></span></div>
      <table v-else class="adm-tabela">
        <thead>
          <tr>
            <th>{{ $t('usuario') }}</th>
            <th>{{ $t('e.mail') }}</th>
            <th>{{ $t('role') }}</th>
            <th>{{ $t('2fa') }}</th>
            <th>{{ $t('cadastro') }}</th>
            <th>{{ $t('acoes') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="!usuariosFiltrados.length">
            <td colspan="6" class="adm-vazio">{{ $t('nenhum.usuario.encontrado') }}</td>
          </tr>
          <tr v-for="u in usuariosPaginados" :key="u._id">
            <td>
              <div class="adm-usr-info">
                <div class="adm-usr-avatar">
                  <img v-if="u.avatar" :src="u.avatar" @error="e => e.target.style.display='none'" />
                  <span v-else>{{ (u.nome || 'U').charAt(0) }}</span>
                </div>
                <div>
                  <p class="adm-usr-nome">{{ u.nome }} {{ u.sobrenome }}</p>
                  <p class="adm-usr-provider">{{ u.provider || 'local' }}</p>
                </div>
              </div>
            </td>
            <td class="adm-email">{{ u.email }}</td>
            <td>
              <span :class="['adm-role', u.role === 'admin' ? 'adm-role--admin' : '']">
                {{ u.role === 'admin' ? 'ADMIN' : 'USER' }}
              </span>
            </td>
            <td>
              <span :class="['adm-2fa', u.twoFA ? 'adm-2fa--on' : '']">
                {{ u.twoFA ? '✓ ATIVO' : '✗ INATIVO' }}
              </span>
            </td>
            <td class="adm-data">{{ formatDate(u.criadoEm) }}</td>
            <td>
              <div class="adm-acoes">
                <button
                  class="adm-btn-acao"
                  :class="u.role === 'admin' ? 'adm-btn-acao--del' : 'adm-btn-acao--edit'"
                  @click="toggleAdmin(u)"
                  :title="u.role === 'admin' ? $t('admin.removerAdmin') : $t('admin.tornarAdmin')"
                  :disabled="u._id === meuId"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                </button>
                <button
                  class="adm-btn-acao adm-btn-acao--del"
                  @click="confirmarDeletar(u)"
                  :title="$t('deletar.usuario')"
                  :disabled="u._id === meuId"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6"/>
                    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                    <path d="M10 11v6M14 11v6"/>
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- PAGINAÇÃO -->
    <div v-if="totalPaginas > 1" class="adm-pag">
      <button class="adm-pag-btn" :disabled="pagina === 1" @click="pagina--">‹</button>
      <span class="adm-pag-info">{{ pagina }} / {{ totalPaginas }}</span>
      <button class="adm-pag-btn" :disabled="pagina === totalPaginas" @click="pagina++">›</button>
    </div>

    <!-- MODAL CONFIRMAR DELETE -->
    <transition name="fade">
      <div v-if="deletandoUser" class="adm-modal-overlay" @click.self="deletandoUser = null">
        <div class="adm-modal adm-modal--sm">
          <div class="adm-modal-header">
            <h3>{{ $t('excluir.usuario') }}</h3>
            <button @click="deletandoUser = null" class="adm-modal-close">✕</button>
          </div>
          <div class="adm-modal-body">
            <p class="modal-warning-text">
              {{ $t('tem.certeza.que.deseja.excluir') }} <strong>{{ deletandoUser.nome }}</strong>?
              {{ $t('todos.os.dados.do.usuario.serao.removidos.permanentemente') }}
            </p>
          </div>
          <div class="adm-modal-footer">
            <div class="adm-modal-btns">
              <button class="adm-btn-ghost" @click="deletandoUser = null">{{ $t('cancelar') }}</button>
              <button class="adm-btn-danger" @click="deletar" :disabled="deletando">
                <span v-if="!deletando">{{ $t('excluir') }}</span>
                <span v-else class="spinner-adm spinner-adm--sm"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- TOAST -->
    <transition name="toast">
      <div v-if="toast.show" :class="['adm-toast', `adm-toast--${toast.tipo}`]">
        {{ toast.msg }}
      </div>
    </transition>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth.js'
import api from '@/api.js'

const auth       = useAuthStore()
const loading    = ref(true)
const usuarios   = ref([])
const busca      = ref('')
const pagina     = ref(1)
const deletandoUser = ref(null)
const deletando  = ref(false)
const POR_PAGINA = 10

const toast = ref({ show: false, msg: '', tipo: 'ok' })

const meuId = computed(() => auth.user?._id)

onMounted(async () => {
  try {
    const { data } = await api.get('/usuarios?limit=500')
    usuarios.value = data.users || data || []
  } catch {
    usuarios.value = []
    mostrarToast('Erro ao carregar usuários.', 'erro')
  } finally {
    loading.value = false
  }
})

// ── estatísticas ─────────────────────────────────────────
const usuariosFiltrados = computed(() => {
  if (!busca.value.trim()) return usuarios.value
  const q = busca.value.toLowerCase()
  return usuarios.value.filter(u =>
    u.nome?.toLowerCase().includes(q) ||
    u.email?.toLowerCase().includes(q)
  )
})

const total        = computed(() => usuariosFiltrados.value.length)
const adminsCount  = computed(() => usuarios.value.filter(u => u.role === 'admin').length)
const usuarios2fa  = computed(() => usuarios.value.filter(u => u.twoFA).length)
const thisMonth    = computed(() => {
  const now = new Date()
  const start = new Date(now.getFullYear(), now.getMonth(), 1)
  return usuarios.value.filter(u => new Date(u.criadoEm) >= start).length
})

const totalPaginas = computed(() => Math.max(1, Math.ceil(total.value / POR_PAGINA)))
const usuariosPaginados = computed(() => {
  const s = (pagina.value - 1) * POR_PAGINA
  return usuariosFiltrados.value.slice(s, s + POR_PAGINA)
})

// ── helpers ──────────────────────────────────────────────
const formatDate = (d) => d ? new Date(d).toLocaleDateString('pt-BR', { day:'2-digit', month:'2-digit', year:'2-digit' }) : ''
function mostrarToast(msg, tipo = 'ok') {
  toast.value = { show: true, msg, tipo }
  setTimeout(() => { toast.value.show = false }, 3000)
}

// ── ações ────────────────────────────────────────────────
const toggleAdmin = async (u) => {
  const novoRole = u.role === 'admin' ? 'user' : 'admin'
  try {
    await api.patch(`/usuarios/${u._id}/role`, { role: novoRole })
    u.role = novoRole
    mostrarToast(`Usuário ${novoRole === 'admin' ? 'promovido a ADMIN' : 'rebaixado para USER'}`, 'ok')
  } catch (e) {
    mostrarToast(e.response?.data?.msg || 'Erro ao atualizar role.', 'erro')
  }
}

const confirmarDeletar = (u) => { deletandoUser.value = u }

const deletar = async () => {
  deletando.value = true
  try {
    await api.delete(`/usuarios/${deletandoUser.value._id}`)
    usuarios.value = usuarios.value.filter(u => u._id !== deletandoUser.value._id)
    mostrarToast('Usuário removido com sucesso.', 'ok')
    deletandoUser.value = null
  } catch (e) {
    mostrarToast(e.response?.data?.msg || 'Erro ao deletar.', 'erro')
  } finally {
    deletando.value = false
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;1,400&display=swap');

.adm-usr {
  font-family: 'Syne', sans-serif;
  padding: 24px;
  background: var(--cor-fundo);
  min-height: 100vh;
}

/* ========== CARDS DE ESTATÍSTICAS ========== */
.adm-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 32px;
}
.stat-card {
  background: var(--card-bg);
  border: 1px solid var(--cor-borda);
  border-radius: 20px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: all 0.3s;
}
.stat-card:hover {
  border-color: var(--cor-borda-hover);
  transform: translateY(-3px);
  box-shadow: var(--shadow-glow);
}
.stat-icon {
  width: 52px;
  height: 52px;
  background: var(--gold-10);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--cor-primaria);
}
.stat-info {
  display: flex;
  flex-direction: column;
}
.stat-num {
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  font-weight: 600;
  color: var(--cor-texto);
  line-height: 1;
}
.stat-label {
  font-size: 9px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--cor-texto-3);
  margin-top: 4px;
}

/* ========== TOOLBAR ========== */
.adm-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28px;
  flex-wrap: wrap;
  gap: 16px;
}
.adm-toolbar-esq {
  display: flex;
  align-items: center;
  gap: 12px;
}
.adm-titulo {
  font-family: 'Playfair Display', serif;
  font-size: 1.8rem;
  font-weight: 400;
  color: var(--cor-texto);
}
.adm-toolbar-dir {
  display: flex;
  align-items: center;
  gap: 12px;
}
.adm-search {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--input-bg);
  border: 1px solid var(--input-borda);
  border-radius: 40px;
  padding: 8px 18px;
  min-width: 260px;
  transition: all 0.2s;
}
.adm-search:focus-within {
  border-color: var(--input-borda-focus);
  box-shadow: 0 0 0 3px var(--gold-08);
}
.adm-search svg {
  color: var(--cor-primaria);
  opacity: 0.6;
  flex-shrink: 0;
}
.adm-search input {
  background: none;
  border: none;
  outline: none;
  color: var(--cor-texto);
  font-family: inherit;
  font-size: 12px;
  width: 100%;
}
.adm-search input::placeholder {
  color: var(--cor-texto-3);
}

/* ========== TABELA ========== */
.adm-tabela-wrap {
  background: var(--card-bg);
  border: 1px solid var(--cor-borda);
  border-radius: 20px;
  overflow-x: auto;
  backdrop-filter: blur(4px);
}
.adm-tabela {
  width: 100%;
  border-collapse: collapse;
}
.adm-tabela thead tr {
  border-bottom: 1px solid var(--cor-borda);
}
.adm-tabela th {
  padding: 16px 20px;
  font-size: 8px;
  letter-spacing: 4px;
  color: var(--cor-primaria);
  text-transform: uppercase;
  font-weight: 700;
  text-align: left;
  opacity: 0.8;
}
.adm-tabela td {
  padding: 14px 20px;
  border-bottom: 1px solid var(--cor-borda);
  vertical-align: middle;
}
.adm-tabela tbody tr:last-child td {
  border-bottom: none;
}
.adm-tabela tbody tr {
  transition: background 0.2s;
}
.adm-tabela tbody tr:hover {
  background: var(--gold-05);
}
.adm-vazio {
  text-align: center;
  color: var(--cor-texto-3);
  font-size: 13px;
  padding: 48px !important;
}

/* USUÁRIO INFO */
.adm-usr-info {
  display: flex;
  align-items: center;
  gap: 12px;
}
.adm-usr-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--grad-btn);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 700;
  color: #0A0A0A;
  flex-shrink: 0;
  overflow: hidden;
  border: 1px solid var(--cor-borda);
}
.adm-usr-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.adm-usr-nome {
  font-size: 13px;
  color: var(--cor-texto);
  font-weight: 600;
}
.adm-usr-provider {
  font-size: 9px;
  color: var(--cor-texto-3);
  letter-spacing: 1px;
  margin-top: 2px;
  text-transform: uppercase;
}
.adm-email {
  font-size: 12px;
  color: var(--cor-texto-3);
}

/* BADGES */
.adm-role {
  font-size: 9px;
  letter-spacing: 2px;
  padding: 4px 12px;
  border-radius: 30px;
  font-weight: 700;
  text-transform: uppercase;
  background: var(--gold-05);
  border: 1px solid var(--cor-borda);
  color: var(--cor-texto-3);
  display: inline-block;
}
.adm-role--admin {
  background: var(--gold-10);
  border-color: var(--cor-borda-hover);
  color: var(--cor-primaria);
}
.adm-2fa {
  font-size: 9px;
  letter-spacing: 1px;
  padding: 4px 12px;
  border-radius: 30px;
  font-weight: 700;
  text-transform: uppercase;
  background: rgba(231,76,60,0.08);
  border: 1px solid rgba(231,76,60,0.15);
  color: rgba(231,76,60,0.6);
  display: inline-block;
}
.adm-2fa--on {
  background: rgba(46,204,113,0.1);
  border-color: rgba(46,204,113,0.25);
  color: #2ecc71;
}
.adm-data {
  font-size: 11px;
  color: var(--cor-texto-3);
  white-space: nowrap;
}

/* AÇÕES */
.adm-acoes {
  display: flex;
  gap: 8px;
}
.adm-btn-acao {
  width: 34px;
  height: 34px;
  border-radius: 12px;
  border: 1px solid var(--cor-borda);
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}
.adm-btn-acao:disabled {
  opacity: 0.2;
  cursor: not-allowed;
}
.adm-btn-acao--edit {
  color: var(--cor-primaria);
}
.adm-btn-acao--edit:hover:not(:disabled) {
  background: var(--gold-10);
  border-color: var(--cor-borda-hover);
  transform: scale(1.05);
}
.adm-btn-acao--del {
  color: rgba(231,76,60,0.5);
}
.adm-btn-acao--del:hover:not(:disabled) {
  background: rgba(231,76,60,0.08);
  border-color: rgba(231,76,60,0.3);
  color: #e74c3c;
  transform: scale(1.05);
}

/* PAGINAÇÃO */
.adm-pag {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 28px;
}
.adm-pag-btn {
  width: 38px;
  height: 38px;
  border-radius: 12px;
  background: var(--gold-05);
  border: 1px solid var(--cor-borda);
  color: var(--cor-texto-2);
  cursor: pointer;
  transition: all 0.2s;
}
.adm-pag-btn:hover:not(:disabled) {
  border-color: var(--cor-borda-hover);
  color: var(--cor-primaria);
  transform: scale(1.03);
}
.adm-pag-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}
.adm-pag-info {
  font-size: 12px;
  color: var(--cor-texto-3);
  letter-spacing: 2px;
}

/* LOADING */
.adm-loading {
  display: flex;
  justify-content: center;
  padding: 60px;
}
.spinner-adm {
  width: 28px;
  height: 28px;
  border: 2px solid var(--gold-20);
  border-top-color: var(--cor-primaria);
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  display: inline-block;
}
.spinner-adm--sm {
  width: 16px;
  height: 16px;
  border-width: 2px;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}

/* MODAL */
.adm-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 9000;
  background: var(--overlay-bg);
  backdrop-filter: blur(20px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
.adm-modal {
  background: var(--cor-superficie);
  border: 1px solid var(--cor-borda-hover);
  border-radius: 24px;
  width: 100%;
  max-width: 680px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: var(--shadow-card), var(--shadow-glow);
  animation: modalIn 0.35s cubic-bezier(0.16,1,0.3,1);
}
@keyframes modalIn {
  from { opacity: 0; transform: scale(0.96) translateY(12px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}
.adm-modal--sm {
  max-width: 460px;
}
.adm-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 28px;
  border-bottom: 1px solid var(--cor-borda);
}
.adm-modal-header h3 {
  font-family: 'Playfair Display', serif;
  font-size: 1.4rem;
  font-weight: 400;
  color: var(--cor-texto);
}
.adm-modal-close {
  background: none;
  border: 1px solid var(--cor-borda);
  border-radius: 50%;
  width: 32px;
  height: 32px;
  color: var(--cor-texto-3);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}
.adm-modal-close:hover {
  border-color: var(--cor-primaria);
  color: var(--cor-primaria);
  transform: rotate(90deg);
}
.adm-modal-body {
  padding: 28px;
}
.modal-warning-text {
  color: var(--cor-texto-2);
  font-size: 14px;
  line-height: 1.6;
  text-align: center;
}
.modal-warning-text strong {
  color: var(--cor-texto);
}
.adm-modal-footer {
  padding: 20px 28px;
  border-top: 1px solid var(--cor-borda);
}
.adm-modal-btns {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}
.adm-btn-ghost {
  display: inline-flex;
  align-items: center;
  background: var(--gold-05);
  border: 1px solid var(--cor-borda);
  color: var(--cor-texto-2);
  font-family: inherit;
  font-size: 10px;
  letter-spacing: 2px;
  padding: 10px 24px;
  border-radius: 40px;
  cursor: pointer;
  transition: all 0.2s;
  text-transform: uppercase;
}
.adm-btn-ghost:hover {
  border-color: var(--cor-borda-hover);
}
.adm-btn-danger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background: rgba(231,76,60,0.1);
  border: 1px solid rgba(231,76,60,0.25);
  color: #e74c3c;
  font-family: inherit;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 2px;
  padding: 11px 28px;
  border-radius: 40px;
  cursor: pointer;
  transition: all 0.2s;
  text-transform: uppercase;
}
.adm-btn-danger:hover:not(:disabled) {
  background: rgba(231,76,60,0.2);
  transform: translateY(-1px);
}
.adm-btn-danger:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* TOAST */
.adm-toast {
  position: fixed;
  bottom: 32px;
  right: 32px;
  z-index: 10000;
  padding: 14px 24px;
  border-radius: 60px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1px;
  backdrop-filter: blur(12px);
  box-shadow: var(--shadow-glow);
}
.adm-toast--ok {
  background: rgba(46,204,113,0.15);
  border: 1px solid rgba(46,204,113,0.3);
  color: #2ecc71;
}
.adm-toast--erro {
  background: rgba(231,76,60,0.12);
  border: 1px solid rgba(231,76,60,0.3);
  color: #e74c3c;
}
.toast-enter-active,
.toast-leave-active {
  transition: all 0.35s cubic-bezier(0.19,1,0.22,1);
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(12px);
}

/* TRANSIÇÕES GERAIS */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* RESPONSIVO */
@media (max-width: 1000px) {
  .adm-stats {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
}
@media (max-width: 768px) {
  .adm-usr {
    padding: 16px;
  }
  .adm-stats {
    gap: 12px;
  }
  .adm-toolbar {
    flex-direction: column;
    align-items: stretch;
  }
  .adm-toolbar-dir {
    width: 100%;
  }
  .adm-search {
    width: 100%;
  }
}
@media (max-width: 500px) {
  .adm-stats {
    grid-template-columns: 1fr;
  }
}
</style>