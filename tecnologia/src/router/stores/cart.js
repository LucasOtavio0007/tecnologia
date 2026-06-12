import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/api.js'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])
  const loading = ref(false)
  
  // Pagamento
  const metodoPagamento = ref('pix')
  const parcelasCartao = ref(1)
  const descontoPixPercentual = 0.05 // 5% de desconto para Pix

  /* ── Computed ── */
  const totalItens = computed(() => items.value.reduce((s, i) => s + i.qty, 0))
  const subtotal = computed(() => items.value.reduce((s, i) => s + i.preco * i.qty, 0))
  
  const desconto = computed(() => {
    if (metodoPagamento.value === 'pix') {
      return subtotal.value * descontoPixPercentual
    }
    return 0
  })
  
  const totalFinal = computed(() => subtotal.value - desconto.value)
  
  const fmt = (v) => (v || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })
  const subtotalFmt = computed(() => fmt(subtotal.value))
  const descontoFmt = computed(() => fmt(desconto.value))
  const totalFinalFmt = computed(() => fmt(totalFinal.value))

  /* ── Ações ── */
  function adicionar(produto) {
    const key = produto._id || produto.id
    const ex = items.value.find(i => (i._id || i.id) === key)
    if (ex) {
      ex.qty++
    } else {
      items.value.push({ ...produto, qty: 1 })
    }
    sincronizarBackend()
  }

  function alterarQty(id, delta) {
    const item = items.value.find(i => (i._id || i.id) === id)
    if (!item) return
    item.qty += delta
    if (item.qty <= 0) remover(id)
    else sincronizarBackend()
  }

  function remover(id) {
    items.value = items.value.filter(i => (i._id || i.id) !== id)
    sincronizarBackend()
  }

  function limpar() {
    items.value = []
  }

  async function init() {
    try {
      const { data } = await api.get('/carrinho')
      items.value = data.items || []
    } catch { /* não logado ou erro */ }
  }

  let syncTimer = null
  function sincronizarBackend() {
    clearTimeout(syncTimer)
    syncTimer = setTimeout(async () => {
      try {
        await api.put('/carrinho', { items: items.value })
      } catch { /* silencioso */ }
    }, 800)
  }

  function setMetodoPagamento(metodo) {
    metodoPagamento.value = metodo
    if (metodo !== 'cartao') parcelasCartao.value = 1
  }

  function setParcelas(parcelas) {
    parcelasCartao.value = parcelas
  }

  return {
    items, loading,
    metodoPagamento, parcelasCartao,
    totalItens, subtotal, desconto, totalFinal,
    subtotalFmt, descontoFmt, totalFinalFmt,
    fmt,
    adicionar, alterarQty, remover, limpar, init,
    setMetodoPagamento, setParcelas
  }
})