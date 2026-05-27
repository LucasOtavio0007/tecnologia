<template>
  <div v-if="produtos.length" class="recomendacoes">
    <h3 class="recomendacoes__titulo">Quem viu este produto, também viu</h3>
    <div class="recomendacoes__grid">
      <div
        v-for="prod in produtos"
        :key="prod._id"
        class="produto-card"
        @click="$emit('produto-click', prod)"
      >
        <div class="produto-card__imagem">
          <img :src="prod.imagem" :alt="prod.nome" loading="lazy" />
          <div v-if="!prod.estoque" class="produto-card__badge esgotado">ESGOTADO</div>
          <div v-else-if="prod.novo" class="produto-card__badge novo">NOVO</div>
        </div>
        <div class="produto-card__info">
          <p class="produto-card__categoria">{{ prod.categoria }}</p>
          <h4 class="produto-card__nome">{{ prod.nome }}</h4>
          <p class="produto-card__preco">R$ {{ fmt(prod.preco) }}</p>
          <p class="produto-card__parcela">12x R$ {{ fmt(Math.ceil(prod.preco / 12)) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import api from '@/api.js'

const props = defineProps({
  produtoId: { type: String, required: true },
  limit: { type: Number, default: 6 }
})

const emit = defineEmits(['produto-click'])
const produtos = ref([])

const fmt = (v) => (v || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })

const carregarRecomendacoes = async () => {
  if (!props.produtoId) return
  try {
    const { data } = await api.get(`/recomendacoes/${props.produtoId}?limit=${props.limit}`)
    produtos.value = data.recomendacoes || []
  } catch (error) {
    console.error('Erro ao carregar recomendações:', error)
  }
}

watch(() => props.produtoId, carregarRecomendacoes, { immediate: true })
</script>

<style scoped>
.recomendacoes {
  max-width: 1200px;
  margin: 60px auto;
  padding: 0 40px;
}
.recomendacoes__titulo {
  font-family: 'Playfair Display', serif;
  font-size: 1.4rem;
  font-weight: 400;
  margin-bottom: 24px;
  letter-spacing: 1px;
  color: var(--cor-texto);
}
.recomendacoes__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 24px;
}
.produto-card {
  background: var(--card-bg);
  border: 1px solid var(--cor-borda);
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.25s, box-shadow 0.25s;
}
.produto-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  border-color: var(--cor-primaria);
}
.produto-card__imagem {
  position: relative;
  aspect-ratio: 1 / 1;
  background: var(--cor-superficie-2);
}
.produto-card__imagem img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.produto-card__badge {
  position: absolute;
  top: 8px;
  left: 8px;
  font-size: 7px;
  font-weight: 700;
  letter-spacing: 2px;
  padding: 4px 8px;
  border-radius: 20px;
  text-transform: uppercase;
}
.produto-card__badge.novo {
  background: var(--grad-btn);
  color: #0A0A0A;
}
.produto-card__badge.esgotado {
  background: rgba(0,0,0,0.7);
  border: 1px solid var(--cor-borda);
  color: var(--cor-texto-3);
}
.produto-card__info {
  padding: 12px;
}
.produto-card__categoria {
  font-size: 7px;
  letter-spacing: 3px;
  color: var(--cor-primaria);
  margin-bottom: 4px;
}
.produto-card__nome {
  font-size: 12px;
  font-weight: 600;
  color: var(--cor-texto);
  margin-bottom: 6px;
  line-height: 1.4;
  min-height: 2.8em;
}
.produto-card__preco {
  font-family: 'Playfair Display', serif;
  font-size: 1.1rem;
  font-weight: 400;
  color: var(--cor-texto);
}
.produto-card__parcela {
  font-size: 9px;
  color: var(--cor-texto-3);
}
@media (max-width: 768px) {
  .recomendacoes {
    padding: 0 20px;
  }
  .recomendacoes__grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
}
</style>