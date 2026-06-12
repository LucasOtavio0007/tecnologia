import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/api.js'

export const useCartStore = defineStore('cart', () => {
  const items   = ref([])
  const loading = ref(false)

  const totalItens       = computed(() => items.value.reduce((s, i) => s + i.qty, 0))
  const totalBruto       = computed(() => items.value.reduce((s, i) => s + i.preco * i.qty, 0))
  const totalLiquido     = computed(() => totalBruto.value)
  const fmt              = (v) => (v || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })
  const totalBrutoFmt    = computed(() => fmt(totalBruto.value))
  const totalLiquidoFmt  = computed(() => fmt(totalLiquido.value))
  const desconto         = computed(() => 0)
  const descontoValorFmt = computed(() => fmt(0))

  function adicionar(produto) {
    const existente = items.value.find(
      i => (i._id || i.id) === (produto._id || produto.id)
        && i.corNome === (produto.corNome || '')
        && i.storage === (produto.storage || '')
    )
    if (existente) {
      existente.qty += 1
    } else {
      items.value.push({
        ...produto,
        qty:     1,
        corNome: produto.corNome || '',
        corHex:  produto.corHex  || '',
        storage: produto.storage || '',
      })
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
    clearTimeout(syncTimer)
    sincronizarBackend()
  }

 async function init() {
  const token = localStorage.getItem('token')
  if (!token) return
  try {
    const { data } = await api.get('/carrinho')
    items.value = data.items || []
  } catch { }
}

let syncTimer = null
function sincronizarBackend() {
  clearTimeout(syncTimer)
  syncTimer = setTimeout(async () => {
    const token = localStorage.getItem('token')
    if (!token) return
    try {
      await api.put('/carrinho', { items: items.value })
    } catch { }
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