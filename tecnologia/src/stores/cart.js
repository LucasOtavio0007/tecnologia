import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/api.js'

export const useCartStore = defineStore('cart', () => {
  const items  = ref([])
  const loading = ref(false)

  /* ── Computed ── */
  const totalItens    = computed(() => items.value.reduce((s, i) => s + i.qty, 0))
  const totalBruto    = computed(() => items.value.reduce((s, i) => s + i.preco * i.qty, 0))
  const totalLiquido  = computed(() => totalBruto.value)
  const fmt           = (v) => (v || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })
  const totalBrutoFmt   = computed(() => fmt(totalBruto.value))
  const totalLiquidoFmt = computed(() => fmt(totalLiquido.value))
  const desconto      = computed(() => 0)
  const descontoValorFmt = computed(() => fmt(0))

  /* ── Adicionar item ── */
  function adicionar(produto) {
    const key = produto._id || produto.id
    const ex  = items.value.find(i => (i._id || i.id) === key)
    if (ex) {
      ex.qty++
    } else {
      items.value.push({ ...produto, qty: 1 })
    }
    sincronizarBackend()
  }

  /* ── Alterar quantidade ── */
  function alterarQty(id, delta) {
    const item = items.value.find(i => (i._id || i.id) === id)
    if (!item) return
    item.qty += delta
    if (item.qty <= 0) remover(id)
    else sincronizarBackend()
  }

  /* ── Remover item ── */
  function remover(id) {
    items.value = items.value.filter(i => (i._id || i.id) !== id)
    sincronizarBackend()
  }

  /* ── Limpar carrinho ── */
  function limpar() {
    items.value = []
  }

  /* ── Inicializar (carregar do backend) ── */
  async function init() {
    try {
      const { data } = await api.get('/carrinho')
      items.value = data.items || []
    } catch { /* não logado ou erro */ }
  }

  /* ── Sincronizar com backend (debounced) ── */
  let syncTimer = null
  function sincronizarBackend() {
    clearTimeout(syncTimer)
    syncTimer = setTimeout(async () => {
      try {
        await api.put('/carrinho', { items: items.value })
      } catch { /* silencioso */ }
    }, 800)
  }

  return {
    items, loading,
    totalItens, totalBruto, totalLiquido,
    totalBrutoFmt, totalLiquidoFmt,
    desconto, descontoValorFmt,
    fmt,
    adicionar, alterarQty, remover, limpar, init, sincronizarBackend,
  }
})