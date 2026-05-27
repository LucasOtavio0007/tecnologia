import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/api.js'

export const useProdutosStore = defineStore('produtos', () => {

  /* ── Estado ── */
  const todos    = ref([])
  const loading  = ref(false)
  const erro     = ref(null)
  const _fetched = ref(false)   // evita refetch desnecessário

  /* ── Fetch principal ── */
  async function fetchProdutos(params = {}, forcar = false) {
    // Se já buscou e não está forçando, não rebusca
    if (_fetched.value && !forcar && !Object.keys(params).length) return

    loading.value = true
    erro.value    = null

    try {
   const { data } = await api.get('/produtos', {
  params: Object.keys(params).length ? params : undefined
})

      // Aceita qualquer formato que a API retorne
      const lista =
        Array.isArray(data)            ? data            :   // array direto
        Array.isArray(data?.produtos)  ? data.produtos   :   // { produtos: [] }
        Array.isArray(data?.data)      ? data.data       :   // { data: [] }
        Array.isArray(data?.items)     ? data.items      :   // { items: [] }
        Array.isArray(data?.results)   ? data.results    :   // { results: [] }
        []

      // Normaliza campos que podem vir inconsistentes do backend
      todos.value = lista.map(normalizar)
      _fetched.value = true

    } catch (e) {
      erro.value = e?.response?.data?.mensagem
        || e?.response?.data?.message
        || e?.message
        || 'Erro ao carregar produtos'
      console.error('[ProdutosStore] fetchProdutos:', erro.value)
    } finally {
      loading.value = false
    }
  }

  /* ── Normalização de um produto vindo da API ── */
  function normalizar(p) {
    return {
      // IDs
      _id:  p._id  || p.id  || null,
      id:   p.id   || p._id || null,

      // Campos obrigatórios com fallback
      nome:       p.nome       || p.name        || '',
      marca:      p.marca      || p.brand       || '',
      descricao:  p.descricao  || p.description || '',
      categoria:  p.categoria  || p.category    || p.cat || 'Geral',
      preco:      Number(p.preco ?? p.price ?? 0),
      imagem:     p.imagem     || p.image       || p.foto || p.thumbnail || '',

      // Booleanos — aceita tanto boolean quanto 1/0/"true"/"false"
     estoque:  p.estoque != null ? Number(p.estoque) : (p.qtdEstoque ?? p.stockQty ?? p.quantity ?? p.qty ?? 0),
      limitada: toBool(p.limitada ?? p.limited     ?? p.edicaoLimitada ?? false),
      novo:     toBool(p.novo     ?? p.new         ?? p.isNew         ?? false),
      destaque: toBool(p.destaque ?? p.featured    ?? p.highlight     ?? false),

      // Galeria de imagens (array de URLs)
      imagens: normalizarImagens(p),

      // Cores — array de { nome, hex }
      cores: normalizarCores(p),

      // Armazenamento — array de strings, ex: ['128GB','256GB','512GB']
      storageOptions: normalizarStorage(p),

      // Specs — array de { k, v }
      specs: normalizarSpecs(p),

      // Campos extras preservados
      ...filtrarExtras(p),
    }
  }

  /* ── Helpers de normalização ── */

  function toBool(v) {
    if (typeof v === 'boolean') return v
    if (v === 1 || v === '1' || v === 'true' || v === 'sim') return true
    if (v === 0 || v === '0' || v === 'false' || v === 'nao' || v === 'não') return false
    return Boolean(v)
  }

  function normalizarImagens(p) {
    // Aceita: imagens[], images[], fotos[], gallery[], photos[]
    const candidatos = p.imagens || p.images || p.fotos || p.gallery || p.photos
    if (Array.isArray(candidatos) && candidatos.length) {
      return candidatos.map(img =>
        typeof img === 'string' ? img : (img?.url || img?.src || img?.href || '')
      ).filter(Boolean)
    }
    // Fallback: usa a imagem principal como único item
    const principal = p.imagem || p.image || p.foto || p.thumbnail || ''
    return principal ? [principal] : []
  }

  function normalizarCores(p) {
    const candidatos = p.cores || p.colors || p.variantes || p.variants
    if (!Array.isArray(candidatos) || !candidatos.length) return []

    return candidatos.map(c => {
      if (typeof c === 'string') return { nome: c, hex: '#888888' }
      return {
        nome: c.nome || c.name  || c.label || c.title || '',
        hex:  c.hex  || c.color || c.value || c.code  || '#888888',
        glow: c.glow || c.hex   || c.color || '#888888',
      }
    }).filter(c => c.nome)
  }

  function normalizarStorage(p) {
    const candidatos =
      p.storageOptions || p.storage_options ||
      p.armazenamento  || p.capacidades     ||
      p.opcoes         || p.options
    if (!Array.isArray(candidatos) || !candidatos.length) return []
    return candidatos.map(o => typeof o === 'string' ? o : String(o?.label || o?.value || o)).filter(Boolean)
  }

  function normalizarSpecs(p) {
    const candidatos = p.specs || p.especificacoes || p.specifications || p.caracteristicas
    if (!Array.isArray(candidatos) || !candidatos.length) return []

    return candidatos.map(s => {
      if (typeof s === 'object' && s !== null) {
        // formato { k, v } ou { key, value } ou { label, value } etc.
        return {
          k: s.k || s.key   || s.label  || s.nome  || '',
          v: s.v || s.value || s.valor  || s.dado  || '',
        }
      }
      return null
    }).filter(s => s && s.k && s.v)
  }

  // Preserva campos extras que não foram mapeados (tags, sku, etc.)
  const CAMPOS_MAPEADOS = new Set([
    '_id','id','nome','name','marca','brand','descricao','description',
    'categoria','category','cat','preco','price','imagem','image','foto',
    'thumbnail','estoque','inStock','disponivel','limitada','limited',
    'edicaoLimitada','novo','new','isNew','destaque','featured','highlight',
    'qtdEstoque','stockQty','quantity','qty','imagens','images','fotos',
    'gallery','photos','cores','colors','variantes','variants',
    'storageOptions','storage_options','armazenamento','capacidades',
    'opcoes','options','specs','especificacoes','specifications','caracteristicas',
  ])

  function filtrarExtras(p) {
    const extras = {}
    for (const k in p) {
      if (!CAMPOS_MAPEADOS.has(k)) extras[k] = p[k]
    }
    return extras
  }

  /* ── Buscar produto único (por ID) ── */
  async function fetchProduto(id) {
    // Primeiro tenta no cache local
    const local = getPorId(id)
    if (local) return local

    // Se não tiver, busca da API
    try {
      const { data } = await api.get(`/produtos/${id}`)
      const produto = normalizar(data?.produto || data)
      // Adiciona ao cache se ainda não estiver
      if (!todos.value.find(p => (p._id || p.id) === id)) {
        todos.value.push(produto)
      }
      return produto
    } catch (e) {
      console.error('[ProdutosStore] fetchProduto:', e)
      return null
    }
  }

  /* ── Recarregar forçado (ex: após cadastrar produto no admin) ── */
  async function recarregar() {
    _fetched.value = false
    await fetchProdutos({}, true)
  }

  /* ── Computed ── */
  const categorias = computed(() =>
    [...new Set(todos.value.map(p => p.categoria).filter(Boolean))].sort()
  )

  const destaques = computed(() =>
    todos.value.filter(p => p.destaque)
  )

  const emEstoque = computed(() =>
    todos.value.filter(p => p.estoque)
  )

  const limitadas = computed(() =>
    todos.value.filter(p => p.limitada)
  )

  const novidades = computed(() =>
    todos.value.filter(p => p.novo)
  )

  /* ── Getters ── */
  const getPorId = (id) =>
    todos.value.find(p => (p._id || p.id) === id) || null

  const getPorCategoria = (cat) =>
    todos.value.filter(p => p.categoria === cat)

  const buscar = (q) => {
    if (!q?.trim()) return todos.value
    const termo = q.toLowerCase().trim()
    return todos.value.filter(p =>
      p.nome?.toLowerCase().includes(termo)      ||
      p.marca?.toLowerCase().includes(termo)     ||
      p.categoria?.toLowerCase().includes(termo) ||
      p.descricao?.toLowerCase().includes(termo)
    )
  }

  /* ── Retorno público da store ── */
  return {
    // Estado
    todos,
    loading,
    erro,

    // Ações
    fetchProdutos,
    fetchProduto,
    recarregar,

    // Computed
    categorias,
    destaques,
    emEstoque,
    limitadas,
    novidades,

    // Getters
    getPorId,
    getPorCategoria,
    buscar,

    // Alias para compatibilidade com código existente
    getCat: getPorCategoria,
  }
})