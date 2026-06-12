<template>
  <div class="adm-ped">

    <!-- CARDS DE ESTATÍSTICAS -->
    <div class="adm-stats">
      <div class="stat-card">
        <div class="stat-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M3 6h18v12H3z"/>
            <path d="M8 12h8"/>
          </svg>
        </div>
        <div class="stat-info">
          <span class="stat-num">{{ total }}</span>
          <span class="stat-label">{{ $t('pedidos') }}</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 6v6l4 2"/>
          </svg>
        </div>
        <div class="stat-info">
          <span class="stat-num">{{ pendentesCount }}</span>
          <span class="stat-label">{{ $t('pendentes') }}</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <div class="stat-info">
          <span class="stat-num">{{ aprovadosCount }}</span>
          <span class="stat-label">{{ $t('aprovados') }}</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M20 12H4M12 4v16"/>
          </svg>
        </div>
        <div class="stat-info">
          <span class="stat-num">{{ canceladosCount }}</span>
          <span class="stat-label">{{ $t('cancelados') }}</span>
        </div>
      </div>
    </div>

    <!-- TOOLBAR -->
    <div class="adm-toolbar">
      <div class="adm-toolbar-esq">
        <h2 class="adm-titulo">{{ $t('pedidos') }}</h2>
      </div>
      <div class="adm-toolbar-dir">
        <select v-model="filtroStatus" class="adm-select">
          <option value="">{{ $t('todos.os.status') }}</option>
          <option value="pendente">{{ $t('pendente') }}</option>
          <option value="aprovado">{{ $t('aprovado') }}</option>
          <option value="enviado">{{ $t('enviado') }}</option>
          <option value="entregue">{{ $t('entregue') }}</option>
          <option value="cancelado">{{ $t('cancelado') }}</option>
        </select>
        <div class="adm-search">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.3-4.3"/>
          </svg>
          <input v-model="busca" :placeholder="$t('buscar.por.id.ou.cliente')" autocomplete="off" />
        </div>
      </div>
    </div>

    <!-- TABELA -->
    <div class="adm-tabela-wrap">
      <div v-if="loading" class="adm-loading"><span class="spinner-adm"></span></div>
      <table v-else class="adm-tabela">
        <thead>
          <tr>
            <th>{{ $t('pedido') }}</th>
            <th>{{ $t('cliente') }}</th>
            <th>{{ $t('itens') }}</th>
            <th>{{ $t('total') }}</th>
            <th>{{ $t('pagamento') }}</th>
            <th>{{ $t('status') }}</th>
            <th>{{ $t('cancelamento') }}</th>
            <th>{{ $t('data') }}</th>
            <th>{{ $t('acoes') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="!pedidosFiltrados.length">
            <td colspan="9" class="adm-vazio">{{ $t('nenhum.pedido.encontrado') }}</td>
          </tr>
          <tr v-for="p in pedidosPaginados" :key="p._id">
            <td><span class="adm-id">#{{ p._id.slice(-8).toUpperCase() }}</span></td>
            <td>
              <p class="adm-cliente-nome">{{ p.cliente?.nome || 'N/A' }}</p>
              <p class="adm-cliente-email">{{ p.cliente?.email || '' }}</p>
            </td>
            <td><span class="adm-badge">{{ p.itens?.length || 0 }} item(s)</span></td>
            <td class="adm-preco">R$ {{ fmt(p.total) }}</td>
            <td><span class="adm-badge">{{ (p.pagamento?.metodo || '').toUpperCase() }}</span></td>
            <td>
              <select
                :value="p.status"
                @change="atualizarStatus(p, $event.target.value)"
                :class="['adm-status-sel', `adm-status-sel--${p.status}`]"
              >
                <option value="pendente">{{ $t('pendente') }}</option>
                <option value="aprovado">{{ $t('aprovado') }}</option>
                <option value="enviado">{{ $t('enviado') }}</option>
                <option value="entregue">{{ $t('entregue') }}</option>
                <option value="cancelado">{{ $t('cancelado') }}</option>
              </select>
            </td>
            <td>
              <div v-if="p.solicitacaoCancelamento?.solicitado && p.solicitacaoCancelamento.status === 'pendente'" class="adm-cancel-actions">
                <button class="adm-btn-approve" @click="processarCancelamento(p, true)" :title="$t('aprovar.cancelamento')">{{ $t('aprovar') }}</button>
                <button class="adm-btn-reject" @click="processarCancelamento(p, false)" :title="$t('recusar.cancelamento')">{{ $t('recusar') }}</button>
              </div>
              <span v-else-if="p.solicitacaoCancelamento?.status === 'aprovado'" class="adm-cancel-status aprovado">{{ $t('cancelado') }}</span>
              <span v-else-if="p.solicitacaoCancelamento?.status === 'recusado'" class="adm-cancel-status recusado">{{ $t('cancelamento.recusado') }}</span>
              <span v-else class="adm-cancel-status nenhum">—</span>
            </td>
            <td class="adm-data">{{ formatDate(p.criadoEm) }}</td>
            <td>
              <button class="adm-btn-acao adm-btn-acao--edit" @click="verDetalhe(p)" :title="$t('ver.detalhes')">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </button>
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

    <!-- MODAL DETALHE -->
    <transition name="fade">
      <div v-if="detalhe" class="adm-modal-overlay" @click.self="detalhe = null">
        <div class="adm-modal">
          <div class="adm-modal-header">
            <h3>Pedido #{{ detalhe._id.slice(-8).toUpperCase() }}</h3>
            <button @click="detalhe = null" class="adm-modal-close">✕</button>
          </div>
          <div class="adm-modal-body">
            <div class="adm-detalhe-grid">
              <div class="adm-detalhe-sec">
                <p class="adm-detalhe-label">{{ $t('cliente') }}</p>
                <p class="adm-detalhe-val">{{ detalhe.cliente?.nome }}</p>
                <p class="adm-detalhe-val adm-detalhe-val--sub">{{ detalhe.cliente?.email }}</p>
                <p class="adm-detalhe-val adm-detalhe-val--sub">{{ detalhe.cliente?.telefone }}</p>
              </div>
              <div class="adm-detalhe-sec">
                <p class="adm-detalhe-label">{{ $t('entrega') }}</p>
                <p class="adm-detalhe-val">{{ detalhe.entrega?.endereco }}</p>
                <p class="adm-detalhe-val adm-detalhe-val--sub">{{ detalhe.entrega?.cidade }} - {{ detalhe.entrega?.estado }}</p>
                <p class="adm-detalhe-val adm-detalhe-val--sub">CEP: {{ detalhe.entrega?.cep }}</p>
              </div>
              <div class="adm-detalhe-sec">
                <p class="adm-detalhe-label">{{ $t('pagamento') }}</p>
                <p class="adm-detalhe-val">{{ (detalhe.pagamento?.metodo || '').toUpperCase() }}</p>
                <p v-if="detalhe.pagamento?.parcelas > 1" class="adm-detalhe-val adm-detalhe-val--sub">
                  {{ detalhe.pagamento.parcelas }}x sem juros
                </p>
              </div>
              <div class="adm-detalhe-sec">
                <p class="adm-detalhe-label">{{ $t('data') }}</p>
                <p class="adm-detalhe-val">{{ formatDate(detalhe.criadoEm) }}</p>
              </div>
            </div>

            <!-- Seção de cancelamento -->
            <div v-if="detalhe.solicitacaoCancelamento?.solicitado" class="adm-detalhe-cancel">
              <p class="adm-detalhe-label">{{ $t('solicitacao.de.cancelamento') }}</p>
              <div class="adm-cancel-info">
                <p><strong>{{ $t('motivo') }}:</strong> {{ detalhe.solicitacaoCancelamento.motivo }}</p>
                <p><strong>{{ $t('data.da.solicitacao') }}:</strong> {{ formatDate(detalhe.solicitacaoCancelamento.dataSolicitacao) }}</p>
                <p>
                  <strong>{{ $t('status') }}:</strong>
                  <span :class="['adm-cancel-status-badge', detalhe.solicitacaoCancelamento.status]">
                    {{
                      detalhe.solicitacaoCancelamento.status === 'pendente' ? 'Pendente' :
                      detalhe.solicitacaoCancelamento.status === 'aprovado' ? 'Aprovado' : 'Recusado'
                    }}
                  </span>
                </p>
                <p v-if="detalhe.solicitacaoCancelamento.observacaoAdmin">
                  <strong>{{ $t('observacao.do.admin') }}:</strong> {{ detalhe.solicitacaoCancelamento.observacaoAdmin }}
                </p>
              </div>
            </div>

            <div class="adm-detalhe-itens">
              <p class="adm-detalhe-label" style="margin-bottom:10px">{{ $t('itens') }}</p>
              <div v-for="item in detalhe.itens" :key="item._id" class="adm-detalhe-item">
                <img
                  :src="item.produto?.imagem || item.imagem"
                  class="adm-detalhe-img"
                  @error="e => e.target.style.opacity = '0'"
                />
                <div class="adm-detalhe-item-info">
                  <p class="adm-detalhe-val">{{ item.produto?.nome || item.nome }}</p>
                  <p class="adm-detalhe-val adm-detalhe-val--sub">Qty: {{ item.qty }}</p>
                </div>
                <p class="adm-preco">R$ {{ fmt((item.produto?.preco || item.preco || 0) * item.qty) }}</p>
              </div>
            </div>

            <div class="adm-detalhe-total">
              <span>{{ $t('total') }}</span>
              <span class="adm-preco">R$ {{ fmt(detalhe.total) }}</span>
            </div>
          </div>
          <div class="adm-modal-footer">
            <div class="adm-modal-btns">
              <button class="adm-btn-ghost" @click="detalhe = null">{{ $t('fechar') }}</button>
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
import api from '@/api.js'

const loading     = ref(true)
const pedidos     = ref([])
const filtroStatus = ref('')
const busca       = ref('')
const pagina      = ref(1)
const detalhe     = ref(null)
const POR_PAGINA  = 10
const toast       = ref({ show: false, msg: '', tipo: 'ok' })

onMounted(async () => {
  await carregarPedidos()
})

const carregarPedidos = async () => {
  loading.value = true
  try {
    const { data } = await api.get('/pedidos?limit=200')
    pedidos.value = data.pedidos || data || []
  } catch { pedidos.value = [] }
  finally { loading.value = false }
}

const pedidosFiltrados = computed(() => {
  let lista = [...pedidos.value]
  if (filtroStatus.value) lista = lista.filter(p => p.status === filtroStatus.value)
  if (busca.value.trim()) {
    const q = busca.value.toLowerCase()
    lista = lista.filter(p => p._id.includes(q) || p.cliente?.nome?.toLowerCase().includes(q) || p.cliente?.email?.toLowerCase().includes(q))
  }
  return lista
})

const total        = computed(() => pedidosFiltrados.value.length)
const totalPaginas = computed(() => Math.max(1, Math.ceil(pedidosFiltrados.value.length / POR_PAGINA)))
const pedidosPaginados = computed(() => {
  const s = (pagina.value - 1) * POR_PAGINA
  return pedidosFiltrados.value.slice(s, s + POR_PAGINA)
})

// Estatísticas
const pendentesCount = computed(() => pedidos.value.filter(p => p.status === 'pendente').length)
const aprovadosCount = computed(() => pedidos.value.filter(p => p.status === 'aprovado').length)
const canceladosCount = computed(() => pedidos.value.filter(p => p.status === 'cancelado').length)

const fmt = (v) => (v||0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })
const formatDate = (d) => d ? new Date(d).toLocaleDateString('pt-BR', { day:'2-digit', month:'2-digit', year:'2-digit', hour:'2-digit', minute:'2-digit' }) : ''
const verDetalhe = (p) => { detalhe.value = p }

const atualizarStatus = async (pedido, novoStatus) => {
  try {
    await api.patch(`/pedidos/${pedido._id}/status`, { status: novoStatus })
    pedido.status = novoStatus
    mostrarToast(`Status atualizado para ${novoStatus}`, 'ok')
  } catch (e) { 
    mostrarToast(e.response?.data?.msg || 'Erro ao atualizar status.', 'erro')
  }
}

const processarCancelamento = async (pedido, aprovado) => {
  const observacao = aprovado ? null : prompt('Motivo da recusa (opcional):')
  try {
    await api.patch(`/pedidos/${pedido._id}/processar-cancelamento`, { aprovado, observacao })
    await carregarPedidos() // recarrega a lista
    mostrarToast(aprovado ? 'Cancelamento aprovado' : 'Cancelamento recusado', 'ok')
  } catch (e) {
    mostrarToast(e.response?.data?.msg || 'Erro ao processar cancelamento.', 'erro')
  }
}

function mostrarToast(msg, tipo = 'ok') {
  toast.value = { show: true, msg, tipo }
  setTimeout(() => { toast.value.show = false }, 3000)
}
</script>

<style scoped>
/* ========== BASE ========== */
.adm-ped {
  font-family: 'Syne', sans-serif;
  padding: 24px;
  background: var(--cor-fundo);
  min-height: 100vh;
}

/* ========== CARDS ESTATÍSTICAS ========== */
.adm-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 32px;
}
.stat-card {
  background: var(--card-bg);
  border: 1px solid var(--cor-borda);
  border-radius: 16px;
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
  width: 48px;
  height: 48px;
  background: var(--gold-10);
  border-radius: 14px;
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
  font-size: 1.8rem;
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
  flex-wrap: wrap;
}
.adm-search {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--input-bg);
  border: 1px solid var(--input-borda);
  border-radius: 40px;
  padding: 8px 16px;
  min-width: 220px;
  transition: all 0.2s;
}
.adm-search:focus-within {
  border-color: var(--input-borda-focus);
  box-shadow: 0 0 0 3px var(--gold-08);
}
.adm-search svg {
  color: var(--cor-primaria);
  opacity: 0.6;
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
.adm-select {
  background: var(--input-bg);
  border: 1px solid var(--input-borda);
  border-radius: 40px;
  padding: 8px 16px;
  color: var(--cor-texto-2);
  font-family: inherit;
  font-size: 11px;
  outline: none;
  cursor: pointer;
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
.adm-id {
  font-family: monospace;
  font-size: 11px;
  font-weight: 600;
  color: var(--cor-primaria);
  background: var(--gold-08);
  padding: 4px 8px;
  border-radius: 6px;
}
.adm-cliente-nome {
  font-size: 13px;
  color: var(--cor-texto);
  font-weight: 500;
}
.adm-cliente-email {
  font-size: 10px;
  color: var(--cor-texto-3);
  margin-top: 2px;
}
.adm-badge {
  font-size: 9px;
  letter-spacing: 2px;
  color: var(--cor-primaria);
  background: var(--gold-10);
  border: 1px solid var(--cor-borda);
  padding: 4px 12px;
  border-radius: 30px;
  white-space: nowrap;
  text-transform: uppercase;
}
.adm-preco {
  font-family: 'Playfair Display', serif;
  font-size: 13px;
  color: var(--cor-texto);
  white-space: nowrap;
}
.adm-data {
  font-size: 11px;
  color: var(--cor-texto-3);
  white-space: nowrap;
}
.adm-status-sel {
  padding: 6px 12px;
  border-radius: 30px;
  border: 1px solid var(--cor-borda);
  background: var(--input-bg);
  font-family: inherit;
  font-size: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.adm-status-sel--pendente { color: #f39c12; border-color: rgba(243,156,18,0.4); background: rgba(243,156,18,0.05); }
.adm-status-sel--aprovado { color: #2ecc71; border-color: rgba(46,204,113,0.4); background: rgba(46,204,113,0.05); }
.adm-status-sel--enviado { color: #3498db; border-color: rgba(52,152,219,0.4); background: rgba(52,152,219,0.05); }
.adm-status-sel--entregue { color: #1abc9c; border-color: rgba(26,188,156,0.4); background: rgba(26,188,156,0.05); }
.adm-status-sel--cancelado { color: #e74c3c; border-color: rgba(231,76,60,0.4); background: rgba(231,76,60,0.05); }

/* AÇÕES CANCELAMENTO */
.adm-cancel-actions {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}
.adm-btn-approve {
  background: rgba(46,204,113,0.1);
  border: 1px solid rgba(46,204,113,0.3);
  color: #2ecc71;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 9px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.adm-btn-approve:hover {
  background: rgba(46,204,113,0.2);
  transform: scale(1.02);
}
.adm-btn-reject {
  background: rgba(231,76,60,0.1);
  border: 1px solid rgba(231,76,60,0.3);
  color: #e74c3c;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 9px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.adm-btn-reject:hover {
  background: rgba(231,76,60,0.2);
  transform: scale(1.02);
}
.adm-cancel-status {
  font-size: 10px;
  padding: 4px 10px;
  border-radius: 20px;
  font-weight: 600;
  display: inline-block;
}
.adm-cancel-status.aprovado {
  background: rgba(46,204,113,0.1);
  color: #2ecc71;
  border: 1px solid rgba(46,204,113,0.3);
}
.adm-cancel-status.recusado {
  background: rgba(231,76,60,0.1);
  color: #e74c3c;
  border: 1px solid rgba(231,76,60,0.3);
}
.adm-cancel-status.nenhum {
  background: var(--gold-05);
  color: var(--cor-texto-3);
  border: 1px solid var(--cor-borda);
}

/* AÇÕES BOTÕES */
.adm-btn-acao {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  border: 1px solid var(--cor-borda);
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}
.adm-btn-acao--edit {
  color: var(--cor-primaria);
}
.adm-btn-acao--edit:hover {
  background: var(--gold-10);
  border-color: var(--cor-borda-hover);
}

/* PAGINAÇÃO */
.adm-pag {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 24px;
}
.adm-pag-btn {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: var(--gold-05);
  border: 1px solid var(--cor-borda);
  color: var(--cor-texto-2);
  cursor: pointer;
  transition: all 0.2s;
}
.adm-pag-btn:hover:not(:disabled) {
  border-color: var(--cor-borda-hover);
  color: var(--cor-primaria);
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
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 40px 80px rgba(0,0,0,0.6), var(--shadow-glow);
  animation: modalIn 0.35s cubic-bezier(0.16,1,0.3,1);
}
@keyframes modalIn {
  from { opacity: 0; transform: scale(0.96) translateY(12px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
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
  padding: 10px 22px;
  border-radius: 40px;
  cursor: pointer;
  transition: all 0.2s;
  text-transform: uppercase;
}
.adm-btn-ghost:hover {
  border-color: var(--cor-borda-hover);
}

/* DETALHE */
.adm-detalhe-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-bottom: 28px;
}
.adm-detalhe-sec {
  margin-bottom: 12px;
}
.adm-detalhe-label {
  font-size: 8px;
  letter-spacing: 4px;
  color: var(--cor-primaria);
  text-transform: uppercase;
  margin-bottom: 8px;
  font-weight: 700;
  opacity: 0.8;
}
.adm-detalhe-val {
  font-size: 13px;
  color: var(--cor-texto-2);
  line-height: 1.5;
}
.adm-detalhe-val--sub {
  font-size: 11px;
  color: var(--cor-texto-3);
}
.adm-detalhe-cancel {
  background: var(--gold-05);
  border: 1px solid var(--cor-borda);
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 24px;
}
.adm-cancel-info p {
  margin: 6px 0;
  font-size: 12px;
  color: var(--cor-texto-2);
}
.adm-cancel-info strong {
  color: var(--cor-primaria);
}
.adm-cancel-status-badge {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 20px;
  font-size: 10px;
  font-weight: 600;
}
.adm-cancel-status-badge.pendente {
  background: var(--gold-10);
  color: var(--cor-primaria);
  border: 1px solid var(--cor-borda-hover);
}
.adm-cancel-status-badge.aprovado {
  background: rgba(46,204,113,0.1);
  color: #2ecc71;
  border: 1px solid rgba(46,204,113,0.3);
}
.adm-cancel-status-badge.recusado {
  background: rgba(231,76,60,0.1);
  color: #e74c3c;
  border: 1px solid rgba(231,76,60,0.3);
}
.adm-detalhe-itens {
  margin-bottom: 20px;
}
.adm-detalhe-item {
  display: flex;
  align-items: center;
  gap: 16px;
  border-bottom: 1px solid var(--cor-borda);
  padding: 12px 0;
}
.adm-detalhe-img {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  object-fit: cover;
  background: var(--cor-superficie-2);
  border: 1px solid var(--cor-borda);
}
.adm-detalhe-item-info {
  flex: 1;
}
.adm-detalhe-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  font-size: 16px;
  font-weight: 700;
  color: var(--cor-texto);
  border-top: 1px solid var(--cor-borda);
}

/* TOAST */
.adm-toast {
  position: fixed;
  bottom: 32px;
  right: 32px;
  z-index: 10000;
  padding: 12px 24px;
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

/* TRANSIÇÕES */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* RESPONSIVO */
@media (max-width: 900px) {
  .adm-stats {
    grid-template-columns: repeat(2, 1fr);
  }
  .adm-detalhe-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
@media (max-width: 768px) {
  .adm-ped {
    padding: 16px;
  }
  .adm-toolbar {
    flex-direction: column;
    align-items: stretch;
  }
  .adm-toolbar-dir {
    width: 100%;
  }
  .adm-stats {
    gap: 12px;
  }
}
</style>