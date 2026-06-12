import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/api.js'

export const useProdutosStore = defineStore('produtos', () => {
  const todos    = ref([])
  const loading  = ref(false)

  async function fetchProdutos(params = {}) {
    loading.value = true
    try {
      const { data } = await api.get('/produtos', { params })
      todos.value = data.produtos
    } finally { loading.value = false }
  }

  const destaques  = computed(() => todos.value.filter(p => p.destaque))
  const getCat     = (cat) => todos.value.filter(p => p.categoria === cat)
  const categorias = computed(() => [...new Set(todos.value.map(p => p.categoria))].sort())

  return { todos, loading, destaques, categorias, fetchProdutos, getCat }
})