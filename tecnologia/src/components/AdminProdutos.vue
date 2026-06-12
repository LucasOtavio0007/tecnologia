<template>
  <div class="adm-prod">

    <!-- CABEÇALHO COM ESTATÍSTICAS -->
    <div class="adm-stats">
      <div class="stat-card">
        <div class="stat-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M20 7h-4.5M12 7h4M20 12h-8M12 12h4M20 17h-8M12 17h4"/>
            <rect x="2" y="3" width="20" height="18" rx="2"/>
          </svg>
        </div>
        <div class="stat-info"><span class="stat-num">{{ total }}</span><span class="stat-label">{{ $t('produtos') }}</span></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-3 3l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-3-3l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 3-3l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 3 3l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
        </div>
        <div class="stat-info"><span class="stat-num">{{ categoriasCount }}</span><span class="stat-label">{{ $t('categorias_1') }}</span></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <rect x="3" y="4" width="18" height="16" rx="2"/>
            <line x1="8" y1="10" x2="16" y2="10"/>
          </svg>
        </div>
        <div class="stat-info"><span class="stat-num">{{ emEstoque }}</span><span class="stat-label">{{ $t('em.estoque') }}</span></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        </div>
        <div class="stat-info"><span class="stat-num">{{ destaqueCount }}</span><span class="stat-label">{{ $t('destaques') }}</span></div>
      </div>
    </div>

    <!-- TOOLBAR -->
    <div class="adm-toolbar">
      <div class="adm-toolbar-esq">
        <h2 class="adm-titulo">{{ $t('produtos') }}</h2>
      </div>
      <div class="adm-toolbar-dir">
        <div class="adm-search">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
          <input v-model="busca" placeholder="Buscar produto..." autocomplete="off" />
        </div>
        <select v-model="filtroCategoria" class="adm-select">
          <option value="">{{ $t('todas.categorias') }}</option>
          <option v-for="c in CATEGORIAS" :key="c">{{ c }}</option>
        </select>
        <button class="btn-seed" @click="executarSeed" :disabled="seedando" title="Popular banco com produtos de exemplo">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
          {{ seedando ? 'IMPORTANDO...' : 'SEED' }}
        </button>
        <button class="btn-novo" @click="abrirNovo">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          {{ $t('novo.produto') }}
        </button>
      </div>
    </div>

    <!-- AVISO BANCO VAZIO -->
    <div v-if="!loading && !produtos.length" class="adm-aviso-vazio">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
        <path d="M16 10a4 4 0 0 1-8 0"/>
      </svg>
      <div>
        <p class="aviso-titulo">{{ $t('banco.de.produtos.vazio') }}</p>
        <p class="aviso-desc">{{ $t('clique.em') }} <strong>{{ $t('seed') }}</strong> {{ $t('para.importar.os.produtos.de.exemplo.ou.em') }} <strong>{{ $t('novo.produto') }}</strong> {{ $t('para.criar.manualmente') }}</p>
      </div>
      <button class="btn-seed" @click="executarSeed" :disabled="seedando">
        {{ seedando ? 'IMPORTANDO...' : '↑ IMPORTAR SEED' }}
      </button>
    </div>

    <!-- TABELA -->
    <div class="adm-tabela-wrap">
      <div v-if="loading" class="adm-loading">
        <span class="spinner-adm"></span>
      </div>
      <table v-else-if="produtos.length" class="adm-tabela">
        <thead>
          <tr>
            <th>{{ $t('produto') }}</th>
            <th>{{ $t('categoria') }}</th>
            <th>{{ $t('preco') }}</th>
            <th>{{ $t('estoque') }}</th>
            <th>{{ $t('status_2') }}</th>
            <th>{{ $t('acoes') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="!produtosFiltrados.length">
            <td colspan="6" class="adm-vazio">{{ $t('nenhum.produto.encontrado') }}</td>
          </tr>
          <tr v-for="p in produtosPaginados" :key="p._id">
            <td>
              <div class="adm-prod-info">
                <div class="adm-prod-img">
                  <img :src="p.imagem" :alt="p.nome" @error="e=>e.target.style.opacity='0'" />
                </div>
                <div>
                  <p class="adm-prod-nome">{{ p.nome }}</p>
                  <p class="adm-prod-marca">{{ p.marca }}</p>
                </div>
              </div>
            </td>
            <td><span class="adm-badge">{{ p.categoria }}</span></td>
            <td class="adm-preco">R$ {{ fmt(p.preco) }}</td>
            <td>
              <span :class="['adm-estoque', p.estoque > 0 ? 'adm-estoque--ok' : 'adm-estoque--no']">
                {{ p.estoque > 0 ? `${p.estoque} un.` : 'Esgotado' }}
              </span>
            </td>
            <td>
              <div class="adm-status-flags">
                <span v-if="p.destaque" class="adm-status adm-status--destaque">{{ $t('destaque_1') }}</span>
                <span v-if="p.novo" class="adm-status adm-status--novo">{{ $t('novo_1') }}</span>
                <span v-if="!p.destaque && !p.novo" class="adm-status">{{ $t('normal') }}</span>
              </div>
            </td>
            <td>
              <div class="adm-acoes">
                <button class="adm-btn-acao adm-btn-acao--edit" @click="abrirEditar(p)" title="Editar">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                </button>
                <button class="adm-btn-acao adm-btn-acao--del" @click="confirmarDeletar(p)" title="Deletar">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6"/>
                    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                    <path d="M10 11v6M14 11v6"/>
                    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
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
      <button class="adm-pag-btn" :disabled="pagina===1" @click="pagina--">‹</button>
      <span class="adm-pag-info">{{ pagina }} / {{ totalPaginas }}</span>
      <button class="adm-pag-btn" :disabled="pagina===totalPaginas" @click="pagina++">›</button>
    </div>

    <!-- MODAL FORM (CRIAR/EDITAR) -->
    <transition name="fade">
      <div v-if="modalAberto" class="adm-modal-overlay" @click.self="modalAberto=false">
        <div class="adm-modal">
          <div class="adm-modal-header">
            <h3>{{ editando ? 'Editar Produto' : 'Novo Produto' }}</h3>
            <button @click="modalAberto=false" class="adm-modal-close">✕</button>
          </div>
          <div class="adm-modal-body">
            <div class="adm-grid-2">
              <div class="adm-campo"><label>{{ $t('nome_2') }}</label><input v-model="form.nome" placeholder="Nome do produto" /></div>
              <div class="adm-campo"><label>{{ $t('marca') }}</label><input v-model="form.marca" placeholder="Apple, Samsung..." /></div>
              <div class="adm-campo">
                <label>{{ $t('categoria_1') }}</label>
                <select v-model="form.categoria" class="adm-select-field">
                  <option v-for="c in CATEGORIAS" :key="c" :value="c">{{ c }}</option>
                </select>
              </div>
              <div class="adm-campo"><label>{{ $t('preco.r') }}</label><input v-model.number="form.preco" type="number" min="0" step="0.01" placeholder="0.00" /></div>
              <div class="adm-campo"><label>{{ $t('estoque.unidades') }}</label><input v-model.number="form.estoque" type="number" min="0" placeholder="0" /></div>
              <div class="adm-campo"><label>{{ $t('parcelas') }}</label><input v-model.number="form.parcelas" type="number" min="1" max="24" placeholder="12" /></div>
              <div class="adm-campo adm-col-2"><label>{{ $t('descricao') }}</label><textarea v-model="form.descricao" rows="3" placeholder="Descrição do produto"></textarea></div>
              <div class="adm-campo adm-col-2"><label>{{ $t('url.da.imagem') }}</label><input v-model="form.imagem" placeholder="https://images.unsplash.com/..." /></div>
            </div>

            <div class="adm-toggles-row">
              <label class="adm-toggle-label">
                <div :class="['adm-tog', { on: form.destaque }]" @click="form.destaque = !form.destaque"><span class="adm-tog-thumb"></span></div>
                {{ $t('produto.destaque') }}
              </label>
              <label class="adm-toggle-label">
                <div :class="['adm-tog', { on: form.novo }]" @click="form.novo = !form.novo"><span class="adm-tog-thumb"></span></div>
                {{ $t('novo.lancamento') }}
              </label>
            </div>

            <!-- PREVIEW IMAGEM -->
            <div v-if="form.imagem" class="adm-img-preview">
              <img :src="form.imagem" alt="Preview" @error="e=>e.target.style.opacity='0'" />
            </div>
          </div>
          <div class="adm-modal-footer">
            <p v-if="erroForm" class="adm-erro">⚠ {{ erroForm }}</p>
            <div class="adm-modal-btns">
              <button class="adm-btn-ghost" @click="modalAberto=false">{{ $t('cancelar') }}</button>
              <button class="adm-btn-grad" @click="salvar" :disabled="salvando">
                <span v-if="!salvando">{{ editando ? 'SALVAR ALTERAÇÕES' : 'CRIAR PRODUTO' }}</span>
                <span v-else class="spinner-adm spinner-adm--sm"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- MODAL CONFIRMAR DELETE -->
    <transition name="fade">
      <div v-if="deletandoProduto" class="adm-modal-overlay" @click.self="deletandoProduto=null">
        <div class="adm-modal adm-modal--sm">
          <div class="adm-modal-header">
            <h3>{{ $t('confirmar.exclusao') }}</h3>
            <button @click="deletandoProduto=null" class="adm-modal-close">✕</button>
          </div>
          <div class="adm-modal-body">
            <p style="color:var(--cor-texto-2);font-size:14px;line-height:1.6">
              {{ $t('tem.certeza.que.deseja.excluir') }} <strong style="color:var(--cor-texto)">{{ deletandoProduto?.nome }}</strong>?
              {{ $t('esta.acao.nao.pode.ser.desfeita') }}
            </p>
          </div>
          <div class="adm-modal-footer">
            <div class="adm-modal-btns">
              <button class="adm-btn-ghost" @click="deletandoProduto=null">{{ $t('cancelar') }}</button>
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
import api from '@/api.js'

// ── constantes ────────────────────────────────────────────
const CATEGORIAS = ['COMPUTING', 'MOBILE', 'AUDIO', 'GAMING', 'VISUAL', 'VIRTUAL']

// ── estado ────────────────────────────────────────────────
const loading          = ref(true)
const salvando         = ref(false)
const deletando        = ref(false)
const seedando         = ref(false)
const modalAberto      = ref(false)
const editando         = ref(false)
const deletandoProduto = ref(null)
const busca            = ref('')
const filtroCategoria  = ref('')
const pagina           = ref(1)
const erroForm         = ref('')
const produtos         = ref([])
const POR_PAGINA       = 12

const toast = ref({ show: false, msg: '', tipo: 'ok' })

const formPadrao = () => ({
  nome: '', marca: '', categoria: 'COMPUTING', preco: 0,
  estoque: 10, parcelas: 12, descricao: '', imagem: '',
  destaque: false, novo: false,
})
const form = ref(formPadrao())

// ── lifecycle ─────────────────────────────────────────────
onMounted(buscarProdutos)

// ── api ───────────────────────────────────────────────────
async function buscarProdutos() {
  loading.value = true
  try {
    const { data } = await api.get('/produtos?limit=500')
    produtos.value = data.produtos || []
  } catch {
    produtos.value = []
  } finally {
    loading.value = false
  }
}

async function executarSeed() {
  seedando.value = true
  try {
    const { data } = await api.post('/produtos/seed')
    mostrarToast(data.msg || 'Seed executado!', 'ok')
    await buscarProdutos()
  } catch (e) {
    mostrarToast(e.response?.data?.msg || 'Erro ao executar seed.', 'erro')
  } finally {
    seedando.value = false
  }
}

// ── computed ──────────────────────────────────────────────
const produtosFiltrados = computed(() => {
  let lista = [...produtos.value]
  if (busca.value.trim()) {
    const q = busca.value.toLowerCase()
    lista = lista.filter(p =>
      p.nome?.toLowerCase().includes(q) ||
      p.marca?.toLowerCase().includes(q)
    )
  }
  if (filtroCategoria.value) {
    lista = lista.filter(p => p.categoria === filtroCategoria.value)
  }
  return lista
})

const total         = computed(() => produtosFiltrados.value.length)
const totalPaginas  = computed(() => Math.max(1, Math.ceil(total.value / POR_PAGINA)))
const produtosPaginados = computed(() => {
  const s = (pagina.value - 1) * POR_PAGINA
  return produtosFiltrados.value.slice(s, s + POR_PAGINA)
})

// Estatísticas
const categoriasCount = computed(() => new Set(produtos.value.map(p => p.categoria)).size)
const emEstoque = computed(() => produtos.value.filter(p => p.estoque > 0).length)
const destaqueCount = computed(() => produtos.value.filter(p => p.destaque).length)

// ── helpers ───────────────────────────────────────────────
const fmt = v => (v || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })

function mostrarToast(msg, tipo = 'ok') {
  toast.value = { show: true, msg, tipo }
  setTimeout(() => { toast.value.show = false }, 3000)
}

// ── modal form ────────────────────────────────────────────
function abrirNovo() {
  editando.value  = false
  form.value      = formPadrao()
  erroForm.value  = ''
  modalAberto.value = true
}

function abrirEditar(p) {
  editando.value  = true
  form.value      = { ...p }
  erroForm.value  = ''
  modalAberto.value = true
}

function confirmarDeletar(p) {
  deletandoProduto.value = p
}

async function salvar() {
  erroForm.value = ''
  if (!form.value.nome?.trim())  { erroForm.value = 'Nome obrigatório.'; return }
  if (!form.value.marca?.trim()) { erroForm.value = 'Marca obrigatória.'; return }
  if (!form.value.preco || form.value.preco <= 0) { erroForm.value = 'Preço inválido.'; return }

  salvando.value = true
  try {
    if (editando.value) {
      const { data } = await api.patch(`/produtos/${form.value._id}`, form.value)
      const idx = produtos.value.findIndex(p => p._id === form.value._id)
      if (idx !== -1) produtos.value[idx] = data.produto || data
      mostrarToast('Produto atualizado!')
    } else {
      const { data } = await api.post('/produtos', form.value)
      produtos.value.unshift(data.produto || data)
      mostrarToast('Produto criado!')
    }
    modalAberto.value = false
  } catch (e) {
    erroForm.value = e.response?.data?.msg || 'Erro ao salvar.'
  } finally {
    salvando.value = false
  }
}

async function deletar() {
  deletando.value = true
  try {
    await api.delete(`/produtos/${deletandoProduto.value._id}`)
    produtos.value = produtos.value.filter(p => p._id !== deletandoProduto.value._id)
    mostrarToast('Produto removido.', 'ok')
    deletandoProduto.value = null
  } catch (e) {
    mostrarToast(e.response?.data?.msg || 'Erro ao deletar.', 'erro')
  } finally {
    deletando.value = false
  }
}
</script>

<style scoped>
.adm-prod {
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
.btn-seed {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--gold-08);
  border: 1px solid var(--cor-borda-hover);
  border-radius: 40px;
  padding: 8px 18px;
  color: var(--cor-primaria);
  font-family: inherit;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.25s;
  text-transform: uppercase;
}
.btn-seed:hover:not(:disabled) {
  background: var(--gold-15);
}
.btn-seed:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.btn-novo {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--grad-btn);
  border: none;
  border-radius: 40px;
  padding: 8px 22px;
  color: #0A0A0A;
  font-family: inherit;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 2px;
  cursor: pointer;
  box-shadow: var(--shadow-btn);
  transition: all 0.25s;
  text-transform: uppercase;
}
.btn-novo:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-btn-hover);
}

/* ========== AVISO VAZIO ========== */
.adm-aviso-vazio {
  display: flex;
  align-items: center;
  gap: 20px;
  background: var(--gold-05);
  border: 1px solid var(--cor-borda-hover);
  border-radius: 16px;
  padding: 24px 28px;
  margin-bottom: 24px;
}
.adm-aviso-vazio svg {
  color: var(--cor-primaria);
  opacity: 0.5;
  flex-shrink: 0;
}
.aviso-titulo {
  font-size: 14px;
  font-weight: 600;
  color: var(--cor-texto);
  margin-bottom: 4px;
}
.aviso-desc {
  font-size: 12px;
  color: var(--cor-texto-3);
  line-height: 1.5;
}
.aviso-desc strong {
  color: var(--cor-primaria);
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

/* PRODUTO INFO */
.adm-prod-info {
  display: flex;
  align-items: center;
  gap: 12px;
}
.adm-prod-img {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: var(--cor-superficie-2);
  overflow: hidden;
  flex-shrink: 0;
  border: 1px solid var(--cor-borda);
}
.adm-prod-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.adm-prod-nome {
  font-size: 13px;
  color: var(--cor-texto);
  font-weight: 500;
  white-space: nowrap;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.adm-prod-marca {
  font-size: 10px;
  color: var(--cor-texto-3);
  margin-top: 2px;
  letter-spacing: 1px;
}

/* BADGES */
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
  font-size: 14px;
  color: var(--cor-texto);
  white-space: nowrap;
}
.adm-estoque {
  font-size: 9px;
  letter-spacing: 1px;
  padding: 4px 10px;
  border-radius: 30px;
  font-weight: 600;
  text-transform: uppercase;
  white-space: nowrap;
}
.adm-estoque--ok {
  background: rgba(46,204,113,0.1);
  border: 1px solid rgba(46,204,113,0.2);
  color: #2ecc71;
}
.adm-estoque--no {
  background: rgba(231,76,60,0.08);
  border: 1px solid rgba(231,76,60,0.2);
  color: #e74c3c;
}
.adm-status-flags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}
.adm-status {
  font-size: 8px;
  letter-spacing: 1px;
  padding: 4px 10px;
  border-radius: 30px;
  color: var(--cor-texto-3);
  background: var(--gold-05);
  border: 1px solid var(--cor-borda);
  text-transform: uppercase;
  white-space: nowrap;
}
.adm-status--destaque {
  background: var(--gold-10);
  border-color: var(--cor-borda-hover);
  color: var(--cor-primaria);
}
.adm-status--novo {
  background: rgba(59,130,246,0.1);
  border-color: rgba(59,130,246,0.3);
  color: #60a5fa;
}

/* AÇÕES */
.adm-acoes {
  display: flex;
  gap: 8px;
}
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
.adm-btn-acao--del {
  color: rgba(231,76,60,0.5);
}
.adm-btn-acao--del:hover {
  background: rgba(231,76,60,0.08);
  border-color: rgba(231,76,60,0.3);
  color: #e74c3c;
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
  max-width: 700px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 40px 80px rgba(0,0,0,0.6), var(--shadow-glow);
  animation: modalIn 0.35s cubic-bezier(0.16,1,0.3,1);
}
@keyframes modalIn {
  from { opacity: 0; transform: scale(0.96) translateY(12px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}
.adm-modal--sm {
  max-width: 440px;
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

/* FORMULÁRIO */
.adm-grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 20px;
}
.adm-col-2 {
  grid-column: span 2;
}
.adm-campo {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.adm-campo label {
  font-size: 8px;
  letter-spacing: 4px;
  color: var(--cor-primaria);
  text-transform: uppercase;
  opacity: 0.8;
  font-weight: 700;
}
.adm-campo input,
.adm-campo textarea,
.adm-select-field {
  background: var(--input-bg);
  border: 1px solid var(--input-borda);
  border-radius: 12px;
  padding: 12px 14px;
  color: var(--cor-texto);
  font-family: inherit;
  font-size: 13px;
  outline: none;
  transition: all 0.2s;
  width: 100%;
}
.adm-campo input:focus,
.adm-campo textarea:focus,
.adm-select-field:focus {
  border-color: var(--input-borda-focus);
  box-shadow: 0 0 0 3px var(--gold-08);
}
.adm-toggles-row {
  display: flex;
  gap: 32px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}
.adm-toggle-label {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  font-size: 12px;
  color: var(--cor-texto-2);
}
.adm-tog {
  width: 44px;
  height: 24px;
  border-radius: 40px;
  background: var(--gold-10);
  border: 1px solid var(--cor-borda);
  position: relative;
  transition: all 0.25s;
}
.adm-tog.on {
  background: var(--grad-suave);
  border-color: var(--cor-borda-hover);
}
.adm-tog-thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #fff;
  transition: transform 0.25s;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
}
.adm-tog.on .adm-tog-thumb {
  transform: translateX(20px);
}

/* PREVIEW IMAGEM */
.adm-img-preview {
  width: 100%;
  height: 160px;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid var(--cor-borda);
  background: var(--cor-superficie-2);
  margin-top: 16px;
}
.adm-img-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* BOTÕES MODAL */
.adm-modal-btns {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}
.adm-btn-grad {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--grad-btn);
  color: #0A0A0A;
  font-family: inherit;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 2px;
  padding: 12px 28px;
  border-radius: 40px;
  border: none;
  cursor: pointer;
  box-shadow: var(--shadow-btn);
  transition: all 0.25s;
  text-transform: uppercase;
}
.adm-btn-grad:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-btn-hover);
}
.adm-btn-grad:disabled {
  opacity: 0.4;
  cursor: not-allowed;
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
  padding: 11px 24px;
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
  background: rgba(231,76,60,0.1);
  border: 1px solid rgba(231,76,60,0.25);
  color: #e74c3c;
  font-family: inherit;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 2px;
  padding: 12px 28px;
  border-radius: 40px;
  cursor: pointer;
  transition: all 0.2s;
  text-transform: uppercase;
}
.adm-btn-danger:hover:not(:disabled) {
  background: rgba(231,76,60,0.2);
}
.adm-btn-danger:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.adm-erro {
  font-size: 11px;
  color: #e74c3c;
  background: rgba(231,76,60,0.07);
  border: 1px solid rgba(231,76,60,0.2);
  border-radius: 10px;
  padding: 8px 14px;
  margin-bottom: 16px;
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
@media (max-width: 900px) {
  .adm-stats {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 768px) {
  .adm-prod {
    padding: 16px;
  }
  .adm-grid-2 {
    grid-template-columns: 1fr;
  }
  .adm-col-2 {
    grid-column: auto;
  }
  .adm-toolbar {
    flex-direction: column;
    align-items: stretch;
  }
  .adm-toolbar-dir {
    width: 100%;
  }
  .adm-aviso-vazio {
    flex-direction: column;
    align-items: flex-start;
    text-align: center;
  }
  .adm-stats {
    gap: 12px;
  }
}
</style>