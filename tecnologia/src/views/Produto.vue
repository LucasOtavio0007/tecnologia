<template>
  <main class="produto-page" v-if="produto">

    <!-- ══ LAYERS DECORATIVOS (herdados da store) ══ -->
    <div class="pp__grain"     aria-hidden="true"></div>
    <div class="pp__seigaiha"  aria-hidden="true">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="sei-pp" x="0" y="0" width="40" height="30" patternUnits="userSpaceOnUse">
            <path d="M20 0 Q40 10 20 20 Q0 10 20 0Z" fill="none" stroke="rgba(200,168,75,0.04)" stroke-width="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#sei-pp)"/>
      </svg>
    </div>
    <div class="pp__beam pp__beam--1" aria-hidden="true"></div>
    <div class="pp__beam pp__beam--2" aria-hidden="true"></div>

    <!-- ══ BREADCRUMB ══ -->
    <div class="pp__breadcrumb">
      <div class="pp__breadcrumb-inner">
        <router-link to="/loja" class="pp__bc-link">
          <span class="pp__bc-gem">◆</span> Loja
        </router-link>
        <span class="pp__bc-sep">›</span>
        <span class="pp__bc-cat">{{ produto.categoria }}</span>
        <span class="pp__bc-sep">›</span>
        <span class="pp__bc-atual">{{ produto.nome }}</span>
      </div>
    </div>

    <!-- ══ INNER ══ -->
    <div class="pp__inner">

      <!-- ══ GALERIA ══ -->
      <div class="pp__galeria">
        <div class="pp__img-principal">
          <!-- Kanji decorativo no canto -->
          <div class="pp__img-kanji" aria-hidden="true">{{ produto.categoria?.[0] || '品' }}</div>
          <!-- Seigaiha de fundo -->
          <div class="pp__img-seigaiha" aria-hidden="true"></div>
          <img :src="imgAtiva" :alt="produto.nome" class="pp__img" @error="e => e.target.style.opacity='0'" />
          <div class="pp__img-shine" aria-hidden="true"></div>
          <div class="pp__img-glow" aria-hidden="true"></div>
          <span v-if="produto.limitada" class="pp__badge pp__badge--limited">Limited</span>
          <span v-else-if="produto.novo && produto.estoque" class="pp__badge pp__badge--novo">Novo</span>
          <span v-if="!produto.estoque" class="pp__badge pp__badge--esgotado">Esgotado</span>
        </div>

        <div v-if="todasImagens.length > 1" class="pp__thumbs">
          <button
            v-for="(img, i) in todasImagens" :key="i"
            :class="['pp__thumb', { ativo: imgAtiva === img }]"
            @click="imgAtiva = img"
            :aria-label="`Vista ${i + 1}`"
          >
            <img :src="img" :alt="`Vista ${i + 1}`" @error="e => e.target.style.opacity='0'" />
            <div class="pp__thumb-overlay" aria-hidden="true"></div>
          </button>
        </div>

        <!-- Mon decorativo abaixo das thumbs -->
        <div class="pp__galeria-footer" aria-hidden="true">
          <span class="pp__gf-line"></span>
          <svg viewBox="0 0 40 40" width="22" height="22">
            <circle cx="20" cy="20" r="17" fill="none" stroke="rgba(200,168,75,0.25)" stroke-width="0.5"/>
            <circle cx="20" cy="20" r="3" fill="rgba(200,168,75,0.3)"/>
            <path d="M20 6 L21 12 L20 11 L19 12 Z" fill="rgba(200,168,75,0.3)"/>
            <path d="M20 34 L21 28 L20 29 L19 28 Z" fill="rgba(200,168,75,0.3)"/>
            <path d="M6 20 L12 19 L11 20 L12 21 Z" fill="rgba(200,168,75,0.3)"/>
            <path d="M34 20 L28 19 L29 20 L28 21 Z" fill="rgba(200,168,75,0.3)"/>
          </svg>
          <span class="pp__gf-line pp__gf-line--r"></span>
        </div>
      </div>

      <!-- ══ INFO ══ -->
      <div class="pp__info" :class="{ 'pp__info--visible': infoVisible }">

        <!-- Mon decorativo -->
        <div class="pp__mon" aria-hidden="true">
          <svg viewBox="0 0 40 40" width="20" height="20">
            <circle cx="20" cy="20" r="17" fill="none" stroke="rgba(200,168,75,0.3)" stroke-width="0.5"/>
            <circle cx="20" cy="20" r="2" fill="rgba(200,168,75,0.35)"/>
          </svg>
        </div>

        <!-- Eyebrow -->
        <div class="pp__eyebrow">
          <span class="pp__eyebrow-line"></span>
          <span class="pp__eyebrow-kanji">品質</span>
          {{ produto.categoria }}
        </div>

        <h1 class="pp__nome">{{ produto.nome }}</h1>

        <p class="pp__marca">
          <span class="pp__marca-gem">◆</span>
          por {{ produto.marca }}
        </p>

        <!-- Avaliação -->
        <div class="pp__rating">
          <span v-for="n in 5" :key="n" :class="['pp__star', n <= 4 ? 'pp__star--on' : '']">★</span>
          <span class="pp__rating-txt">4.8 · 124 avaliações</span>
        </div>

        <!-- Divisor -->
        <div class="pp__divider" aria-hidden="true">
          <span class="pp__div-line"></span>
          <span class="pp__div-char">永</span>
          <span class="pp__div-line pp__div-line--r"></span>
        </div>

        <!-- Preço -->
        <div class="pp__preco-wrap">
          <div class="pp__preco-top">
            <p class="pp__preco">R$ {{ fmt(precoAtual) }}</p>
            <span v-if="produto.limitada" class="pp__preco-badge">
              <span aria-hidden="true">◆</span> Edição Limitada
            </span>
          </div>
          <p class="pp__parcela">12x de R$ {{ fmt(Math.ceil(precoAtual / 12)) }} <span>sem juros</span></p>
          <p class="pp__pix">
            ou R$ {{ fmt(Math.ceil(precoAtual * 0.95)) }} no PIX
            <span class="pp__pix-off">5% OFF</span>
          </p>
        </div>

        <!-- Variações de cor -->
        <div v-if="cores.length" class="pp__variacao">
          <p class="pp__var-label">
            <span class="pp__var-gem">◆</span>
            Cor — <strong>{{ corAtiva }}</strong>
          </p>
          <div class="pp__cores">
            <button
              v-for="cor in cores" :key="cor.nome"
              :class="['pp__cor-btn', { ativo: corAtiva === cor.nome }]"
              :style="{ '--swatch': cor.hex, background: cor.hex }"
              :title="cor.nome"
              @click="corAtiva = cor.nome"
              :aria-label="`Cor: ${cor.nome}`"
            ></button>
          </div>
        </div>

        <!-- Variações de armazenamento -->
        <div v-if="armazenamentos.length" class="pp__variacao">
          <p class="pp__var-label">
            <span class="pp__var-gem">◆</span>
            Armazenamento
          </p>
          <div class="pp__storages">
            <button
              v-for="s in armazenamentos" :key="s.capacidade"
              :class="['pp__storage-btn', { ativo: storageAtivo === s.capacidade }]"
              @click="storageAtivo = s.capacidade; precoAtual = s.preco"
            >{{ s.capacidade }}</button>
          </div>
        </div>

        <!-- Quantidade -->
        <div class="pp__variacao">
          <p class="pp__var-label">
            <span class="pp__var-gem">◆</span>
            Quantidade
          </p>
          <div class="pp__qty">
            <button @click="qty = Math.max(1, qty - 1)" aria-label="Diminuir">−</button>
            <span>{{ qty }}</span>
            <button @click="qty++" aria-label="Aumentar">+</button>
          </div>
        </div>

        <!-- Botões -->
        <div class="pp__btns">
          <button
            class="pp__btn-cart"
            :class="{ added: adicionado }"
            :disabled="!produto.estoque"
            @click="addToCart"
          >
            <svg v-if="!adicionado" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            <span v-if="!produto.estoque">Esgotado</span>
            <span v-else-if="adicionado">Adicionado ao Atelier</span>
            <span v-else>+ Adicionar ao Atelier</span>
          </button>

          <button
            class="pp__btn-wl"
            :class="{ ativo: naWishlist }"
            @click="naWishlist = !naWishlist"
            :aria-label="naWishlist ? 'Remover dos favoritos' : 'Adicionar aos favoritos'"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" :fill="naWishlist ? 'var(--pp-gold)' : 'none'" stroke="var(--pp-gold)" stroke-width="2" aria-hidden="true">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
        </div>

        <!-- Garantias -->
        <div class="pp__garantias">
          <div v-for="g in garantias" :key="g.label" class="pp__garantia">
            <span class="pp__gar-icon" v-html="g.icon" aria-hidden="true"></span>
            <span>{{ g.label }}</span>
          </div>
        </div>

        <!-- Especificações -->
        <div class="pp__specs">
          <button class="pp__specs-toggle" @click="specsAberto = !specsAberto">
            <span class="pp__specs-gem">◆</span>
            Especificações
            <svg :class="['pp__specs-arrow', { rotated: specsAberto }]" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>
          <transition name="specs-slide">
            <div v-if="specsAberto" class="pp__specs-lista">
              <div v-for="s in (produto.specs || [])" :key="s.k" class="pp__spec-row">
                <span class="pp__spec-k">{{ s.k }}</span>
                <span class="pp__spec-v">{{ s.v }}</span>
              </div>
              <div class="pp__spec-row">
                <span class="pp__spec-k">Material</span>
                <span class="pp__spec-v">{{ produto.material || 'Ouro 24k / Titânio' }}</span>
              </div>
            </div>
          </transition>
        </div>

      </div>
    </div>

    <!-- ══ DIVISOR ORIENTAL ══ -->
    <div class="pp__oriental-divider" aria-hidden="true">
      <div class="pp__od-line"></div>
      <div class="pp__od-mon">永</div>
      <div class="pp__od-line pp__od-line--r"></div>
    </div>

    <!-- ══ DESCRIÇÃO ══ -->
    <section class="pp__desc-sec">
      <div class="pp__desc-inner">
        <div class="pp__desc-eyebrow">
          <span class="pp__desc-eyebrow-line"></span>
          <span class="pp__desc-eyebrow-kanji">物語</span>
          Sobre este produto
        </div>
        <h2 class="pp__desc-titulo">{{ produto.nome }}</h2>
        <p class="pp__desc-txt">{{ produto.descricao }}</p>
      </div>
    </section>

    <!-- ══ RECOMENDAÇÕES ══ -->
    <ProdutosRelacionados
      v-if="produto._id"
      :produto-id="produto._id"
      :limit="6"
      @produto-click="irParaProduto"
    />

  </main>

  <!-- LOADING -->
  <div v-else-if="loading" class="pp__loading">
    <div class="pp__spinner-wrap">
      <svg viewBox="0 0 40 40" width="48" height="48" class="pp__spinner-mon">
        <circle cx="20" cy="20" r="17" fill="none" stroke="rgba(200,168,75,0.2)" stroke-width="0.5"/>
        <circle cx="20" cy="20" r="3" fill="rgba(200,168,75,0.4)"/>
        <path d="M20 6 L21 12 L20 11 L19 12 Z" fill="rgba(200,168,75,0.4)"/>
        <path d="M20 34 L21 28 L20 29 L19 28 Z" fill="rgba(200,168,75,0.4)"/>
      </svg>
      <span class="pp__spinner"></span>
    </div>
    <p class="pp__loading-txt">Carregando</p>
  </div>

  <!-- NÃO ENCONTRADO -->
  <div v-else class="pp__nao-encontrado">
    <div class="pp__nf-mon" aria-hidden="true">◈</div>
    <p class="pp__nf-txt">Produto não encontrado</p>
    <router-link to="/loja" class="pp__btn-voltar">
      <span>◆</span> Voltar à Loja
    </router-link>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/api.js'
import ProdutosRelacionados from '@/components/ProdutosRelacionados.vue'

const route  = useRoute()
const router = useRouter()

const produto        = ref(null)
const loading        = ref(true)
const imgAtiva       = ref('')
const corAtiva       = ref('')
const storageAtivo   = ref('')
const precoAtual     = ref(0)
const qty            = ref(1)
const adicionado     = ref(false)
const naWishlist     = ref(false)
const specsAberto    = ref(true)
const infoVisible    = ref(false)

const registrarVisualizacao = async () => {
  if (!produto.value?._id) return
  try {
    await api.post('/visualizacoes', { produtoId: produto.value._id })
  } catch (e) {
    console.warn('Erro ao registrar visualização:', e)
  }
}

const irParaProduto = (p) => {
  if (!p?._id) return
  router.push(`/produto/${p._id}`)
}

onMounted(async () => {
  try {
    const { data } = await api.get(`/produtos/${route.params.id}`)
    produto.value    = data.produto || data
    imgAtiva.value   = produto.value.imagem
    precoAtual.value = produto.value.preco
    if (cores.value.length)          corAtiva.value    = cores.value[0].nome
    if (armazenamentos.value.length) storageAtivo.value = armazenamentos.value[0].capacidade
    await registrarVisualizacao()
    await nextTick()
    setTimeout(() => { infoVisible.value = true }, 80)
  } catch {
    produto.value = null
  } finally {
    loading.value = false
  }
})

const todasImagens   = computed(() => produto.value?.imagens?.length ? produto.value.imagens : [produto.value?.imagem].filter(Boolean))
const cores          = computed(() => produto.value?.cores          || [])
const armazenamentos = computed(() => produto.value?.armazenamentos || [])

const garantias = [
  {
    label: 'Garantia vitalícia no revestimento',
    icon: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>'
  },
  {
    label: 'Frete VIP gratuito',
    icon: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>'
  },
  {
    label: 'Entrega expressa 24h SP/RJ',
    icon: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>'
  },
  {
    label: 'Certificado de autenticidade',
    icon: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 12l2 2 4-4"/><path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z"/></svg>'
  },
]

const fmt = v => (v || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })

const addToCart = () => {
  if (!produto.value?.estoque) return
  window.dispatchEvent(new CustomEvent('add-to-cart', {
    detail: { ...produto.value, qty: qty.value, preco: precoAtual.value }
  }))
  adicionado.value = true
  setTimeout(() => { adicionado.value = false }, 2500)
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Syne:wght@400;500;600;700;800&family=DM+Mono:wght@300;400&display=swap');

/* ══ TOKENS ══════════════════════════════════════════════════════════ */
.produto-page,
.pp__loading,
.pp__nao-encontrado {
  --pp-gold:   var(--cor-primaria,   #C8A84B);
  --pp-gold2:  var(--cor-secundaria, #F5D78E);
  --pp-void:   var(--cor-fundo,      #05050c);
  --pp-surf:   var(--cor-superficie, #0d0d18);
  --pp-text:   var(--cor-texto,      rgba(237,232,224,0.92));
  --pp-text2:  var(--cor-texto-2,    rgba(237,232,224,0.55));
  --pp-text3:  var(--cor-texto-3,    rgba(237,232,224,0.28));
  --pp-hair:   var(--cor-borda,      rgba(200,168,75,0.14));
  --pp-hairH:  var(--cor-borda-hover,rgba(200,168,75,0.40));
  --ease:      cubic-bezier(0.16,1,0.30,1);
}

/* ══ BASE ═════════════════════════════════════════════════════════════ */
.produto-page {
  background: var(--pp-void);
  color: var(--pp-text);
  font-family: 'Syne', var(--font-sans, sans-serif);
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
  padding-top: var(--navbar-h, 72px);
}

/* ══ KEYFRAMES ═══════════════════════════════════════════════════════ */
@keyframes beamSway   { from{transform:skewX(-5deg) translateX(-20px)} to{transform:skewX(5deg) translateX(20px)} }
@keyframes goldShine  { from{background-position:0% center} to{background-position:200% center} }
@keyframes shinePass  { to{background-position:200% 0} }
@keyframes monSpin    { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
@keyframes fadeUp     { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
@keyframes ppSpinner  { to{transform:rotate(360deg)} }
@keyframes glowPulse  { 0%,100%{opacity:.4;transform:scale(1)} 50%{opacity:.75;transform:scale(1.12)} }

/* ══ LAYERS DECORATIVOS ══════════════════════════════════════════════ */
.pp__grain {
  position: fixed; inset: 0; z-index: 0; pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E");
}
.pp__seigaiha {
  position: fixed; inset: 0; z-index: 0; pointer-events: none; overflow: hidden;
}
.pp__beam {
  position: fixed; top: -20%; width: 1px; height: 140%;
  background: linear-gradient(to bottom, transparent, rgba(200,168,75,.18), transparent);
  filter: blur(3px); animation: beamSway 14s ease-in-out infinite alternate;
  pointer-events: none; z-index: 1;
}
.pp__beam--1 { left: 20%; }
.pp__beam--2 { left: 75%; filter: blur(5px); animation-delay: -6s; animation-direction: alternate-reverse; opacity: .5; }

/* ══ BREADCRUMB ══════════════════════════════════════════════════════ */
.pp__breadcrumb {
  position: relative; z-index: 5;
  border-bottom: .5px solid var(--pp-hair);
  background: rgba(5,5,12,.7);
  backdrop-filter: blur(12px);
}
.pp__breadcrumb-inner {
  max-width: 1380px; margin: 0 auto; padding: 12px 48px;
  display: flex; align-items: center; gap: 8px;
  font-family: 'DM Mono', monospace; font-size: 8px;
  letter-spacing: 2px; text-transform: uppercase;
}
.pp__bc-link {
  color: var(--pp-gold); text-decoration: none; opacity: .7;
  display: flex; align-items: center; gap: 6px;
  transition: opacity .2s;
}
.pp__bc-link:hover { opacity: 1; }
.pp__bc-gem   { font-size: 4px; }
.pp__bc-sep   { color: var(--pp-text3); }
.pp__bc-cat   { color: var(--pp-text3); }
.pp__bc-atual { color: var(--pp-text2); }

/* ══ INNER GRID ══════════════════════════════════════════════════════ */
.pp__inner {
  max-width: 1380px; margin: 0 auto;
  padding: 56px 48px 64px;
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 72px; align-items: start;
  position: relative; z-index: 2;
}

/* ══ GALERIA ═════════════════════════════════════════════════════════ */
.pp__galeria {
  position: sticky;
  top: calc(var(--navbar-h, 72px) + 20px);
  display: flex; flex-direction: column; gap: 12px;
}

.pp__img-principal {
  position: relative; aspect-ratio: 1/1;
  overflow: hidden;
  background: var(--pp-surf);
  border: .5px solid var(--pp-hair);
}
.pp__img-principal::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: .5px;
  background: linear-gradient(90deg, transparent, var(--pp-gold), transparent);
  opacity: .3; z-index: 3;
}
.pp__img-seigaiha {
  position: absolute; inset: 0; z-index: 1; pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='30'%3E%3Cpath d='M20 0 Q40 10 20 20 Q0 10 20 0Z' fill='none' stroke='rgba(200,168,75,0.035)' stroke-width='0.5'/%3E%3C/svg%3E");
  background-size: 40px 30px;
}
.pp__img-kanji {
  position: absolute; bottom: 14px; right: 14px; z-index: 4;
  font-family: 'Cormorant Garamond', serif; font-size: 3rem; font-weight: 300; font-style: italic;
  color: transparent; -webkit-text-stroke: .5px rgba(200,168,75,.16);
  pointer-events: none;
}
.pp__img {
  width: 100%; height: 100%; object-fit: cover; display: block;
  position: relative; z-index: 2;
  transition: transform .7s var(--ease);
}
.pp__img-principal:hover .pp__img { transform: scale(1.04); }

.pp__img-shine {
  position: absolute; inset: 0; z-index: 5; pointer-events: none;
  background: linear-gradient(105deg, transparent 40%, rgba(200,168,75,.07) 50%, transparent 60%);
  background-size: 200% 100%; background-position: -100% 0;
}
.pp__img-principal:hover .pp__img-shine { animation: shinePass .8s ease forwards; }

.pp__img-glow {
  position: absolute; bottom: -40px; left: 50%; transform: translateX(-50%);
  width: 60%; height: 80px; z-index: 1; pointer-events: none;
  background: radial-gradient(ellipse, rgba(200,168,75,.12) 0%, transparent 70%);
  filter: blur(20px);
  animation: glowPulse 6s ease-in-out infinite;
}

/* Badges */
.pp__badge {
  position: absolute; top: 14px; left: 14px; z-index: 6;
  font-family: 'DM Mono', monospace; font-size: 7px; font-weight: 700;
  letter-spacing: 3px; padding: 4px 10px; border-radius: 1px; text-transform: uppercase;
}
.pp__badge--limited,
.pp__badge--novo    { background: linear-gradient(135deg, var(--pp-gold), var(--pp-gold2)); color: #0A0A0A; }
.pp__badge--esgotado { background: rgba(0,0,0,.7); border: .5px solid var(--pp-hair); color: var(--pp-text3); }

/* Thumbs */
.pp__thumbs {
  display: flex; gap: 6px; overflow-x: auto;
  scrollbar-width: none;
}
.pp__thumbs::-webkit-scrollbar { display: none; }
.pp__thumb {
  width: 68px; height: 68px; flex-shrink: 0; overflow: hidden; cursor: pointer;
  border: .5px solid var(--pp-hair); background: var(--pp-surf);
  position: relative; transition: border-color .25s;
}
.pp__thumb.ativo { border-color: var(--pp-hairH); }
.pp__thumb img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .4s var(--ease); }
.pp__thumb:hover img { transform: scale(1.06); }
.pp__thumb-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(135deg, transparent 60%, rgba(200,168,75,.08));
  pointer-events: none;
}

/* Galeria footer */
.pp__galeria-footer {
  display: flex; align-items: center; gap: 12px;
  padding-top: 4px;
}
.pp__gf-line { flex: 1; height: .5px; background: linear-gradient(to right, transparent, var(--pp-hairH)); }
.pp__gf-line--r { background: linear-gradient(to left, transparent, var(--pp-hairH)); }

/* ══ INFO ════════════════════════════════════════════════════════════ */
.pp__info {
  display: flex; flex-direction: column; gap: 22px;
  opacity: 0; transform: translateY(24px);
  transition: opacity .8s ease, transform .8s ease;
}
.pp__info--visible { opacity: 1; transform: translateY(0); }

.pp__mon { opacity: .5; }

/* Eyebrow */
.pp__eyebrow {
  font-family: 'DM Mono', monospace;
  font-size: 8px; letter-spacing: 6px; font-weight: 400;
  text-transform: uppercase; color: var(--pp-gold); opacity: .8;
  display: flex; align-items: center; gap: 10px;
}
.pp__eyebrow-line {
  display: block; width: 30px; height: 1px;
  background: linear-gradient(to right, var(--pp-gold), transparent); flex-shrink: 0;
}
.pp__eyebrow-kanji { font-family: 'Cormorant Garamond', serif; font-size: 1rem; font-style: italic; opacity: .4; }

/* Nome */
.pp__nome {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2rem, 3.5vw, 3.2rem); font-weight: 300;
  line-height: 1.05; color: var(--pp-text);
  letter-spacing: -.5px; margin: 0;
}

/* Marca */
.pp__marca {
  font-family: 'DM Mono', monospace;
  font-size: 9px; letter-spacing: 3px; text-transform: uppercase;
  color: var(--pp-text3);
  display: flex; align-items: center; gap: 8px;
}
.pp__marca-gem { font-size: 4px; color: var(--pp-gold); opacity: .5; }

/* Rating */
.pp__rating {
  display: flex; align-items: center; gap: 4px;
}
.pp__star { font-size: 12px; color: var(--pp-hair); }
.pp__star--on { color: var(--pp-gold); }
.pp__rating-txt {
  font-family: 'DM Mono', monospace; font-size: 9px;
  color: var(--pp-text3); margin-left: 8px; letter-spacing: 1px;
}

/* Divisor */
.pp__divider { display: flex; align-items: center; gap: 12px; }
.pp__div-line { flex: 1; max-width: 60px; height: .5px; background: linear-gradient(to right, transparent, var(--pp-hairH)); }
.pp__div-line--r { background: linear-gradient(to left, transparent, var(--pp-hairH)); }
.pp__div-char { font-family: 'Cormorant Garamond', serif; font-size: .95rem; font-style: italic; color: var(--pp-gold); opacity: .35; }

/* Preço */
.pp__preco-wrap {
  background: var(--pp-surf); border: .5px solid var(--pp-hair);
  padding: 20px 22px;
  position: relative; overflow: hidden;
}
.pp__preco-wrap::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: .5px;
  background: linear-gradient(90deg, var(--pp-gold), transparent); opacity: .4;
}
.pp__preco-top {
  display: flex; align-items: center; gap: 14px; margin-bottom: 6px;
}
.pp__preco {
  font-family: 'Cormorant Garamond', serif;
  font-size: 2.4rem; font-weight: 300; line-height: 1; color: var(--pp-text);
  background: linear-gradient(135deg, #E8E0C8 0%, #D4AF37 40%, #F5E6A3 70%, #C8A84B 100%);
  background-size: 200% auto;
  -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
  animation: goldShine 6s linear infinite;
}
.pp__preco-badge {
  font-family: 'DM Mono', monospace; font-size: 7px; font-weight: 700;
  letter-spacing: 3px; text-transform: uppercase;
  padding: 4px 10px; border-radius: 1px;
  background: linear-gradient(135deg, var(--pp-gold), var(--pp-gold2));
  color: #0A0A0A;
  display: flex; align-items: center; gap: 5px;
}
.pp__parcela {
  font-family: 'DM Mono', monospace; font-size: 10px;
  color: var(--pp-text3); margin-bottom: 4px;
}
.pp__parcela span { color: var(--pp-text3); opacity: .6; }
.pp__pix {
  font-family: 'DM Mono', monospace; font-size: 10px; color: var(--pp-text3);
  display: flex; align-items: center; gap: 8px;
}
.pp__pix-off {
  background: rgba(46,204,113,.12); border: .5px solid rgba(46,204,113,.2);
  color: #2ecc71; font-size: 8px; padding: 2px 8px; border-radius: 1px; letter-spacing: 1px;
}

/* Variações */
.pp__variacao { display: flex; flex-direction: column; gap: 10px; }
.pp__var-label {
  font-family: 'DM Mono', monospace; font-size: 8px; letter-spacing: 4px;
  color: var(--pp-text3); text-transform: uppercase;
  display: flex; align-items: center; gap: 8px;
}
.pp__var-label strong { color: var(--pp-gold); font-weight: 400; }
.pp__var-gem { font-size: 4px; color: var(--pp-gold); opacity: .5; }

.pp__cores { display: flex; gap: 8px; flex-wrap: wrap; }
.pp__cor-btn {
  width: 26px; height: 26px; border-radius: 50%;
  border: 2px solid transparent; cursor: pointer; transition: all .25s;
}
.pp__cor-btn:hover { transform: scale(1.12); }
.pp__cor-btn.ativo {
  border-color: var(--pp-gold);
  box-shadow: 0 0 10px var(--swatch, var(--pp-gold));
  transform: scale(1.1);
}

.pp__storages { display: flex; gap: 6px; flex-wrap: wrap; }
.pp__storage-btn {
  background: none; border: .5px solid var(--pp-hair); border-radius: 1px;
  padding: 8px 16px; font-family: 'DM Mono', monospace; font-size: 10px;
  color: var(--pp-text2); cursor: pointer; transition: all .2s;
}
.pp__storage-btn:hover { border-color: var(--pp-hairH); color: var(--pp-text); }
.pp__storage-btn.ativo { border-color: var(--pp-hairH); color: var(--pp-gold); background: rgba(200,168,75,.07); }

/* Quantidade */
.pp__qty {
  display: flex; align-items: center; gap: 0;
  border: .5px solid var(--pp-hair); width: fit-content;
}
.pp__qty button {
  width: 36px; height: 36px; background: none; border: none;
  color: var(--pp-text3); cursor: pointer; font-size: 16px;
  display: flex; align-items: center; justify-content: center;
  transition: all .2s; font-family: 'DM Mono', monospace;
}
.pp__qty button:hover { background: rgba(200,168,75,.07); color: var(--pp-gold); }
.pp__qty span {
  min-width: 44px; text-align: center;
  font-family: 'DM Mono', monospace; font-size: 13px; color: var(--pp-text);
  border-left: .5px solid var(--pp-hair); border-right: .5px solid var(--pp-hair);
  line-height: 36px;
}

/* Botões */
.pp__btns { display: flex; gap: 10px; }
.pp__btn-cart {
  flex: 1;
  background: linear-gradient(135deg, var(--pp-gold), var(--pp-gold2)); color: #0A0A0A;
  font-family: 'DM Mono', monospace; font-size: 9px; font-weight: 700; letter-spacing: 4px;
  padding: 16px; border-radius: 1px; border: none; cursor: pointer;
  box-shadow: 0 0 20px rgba(200,168,75,.2);
  transition: transform .25s, box-shadow .25s;
  text-transform: uppercase;
  display: flex; align-items: center; justify-content: center; gap: 9px;
}
.pp__btn-cart:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 0 32px rgba(200,168,75,.35);
}
.pp__btn-cart:disabled { opacity: .3; cursor: not-allowed; }
.pp__btn-cart.added {
  background: rgba(200,168,75,.1); color: var(--pp-gold);
  border: .5px solid var(--pp-hairH); box-shadow: none;
}

.pp__btn-wl {
  width: 52px; height: 52px; flex-shrink: 0; border-radius: 1px;
  background: rgba(200,168,75,.06); border: .5px solid var(--pp-hair);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: all .25s;
}
.pp__btn-wl.ativo,
.pp__btn-wl:hover { border-color: var(--pp-hairH); background: rgba(200,168,75,.12); transform: scale(1.06); }

/* Garantias */
.pp__garantias {
  display: grid; grid-template-columns: 1fr 1fr; gap: 6px;
}
.pp__garantia {
  display: flex; align-items: center; gap: 10px;
  padding: 10px 12px; border: .5px solid var(--pp-hair); background: var(--pp-surf);
  font-size: 10px; color: var(--pp-text3); transition: border-color .25s;
  position: relative; overflow: hidden;
}
.pp__garantia::before {
  content: ''; position: absolute; top: 0; left: 0; bottom: 0; width: 2px;
  background: linear-gradient(to bottom, var(--pp-gold), transparent);
  opacity: 0; transition: opacity .25s;
}
.pp__garantia:hover { border-color: var(--pp-hairH); }
.pp__garantia:hover::before { opacity: 1; }
.pp__gar-icon { color: var(--pp-gold); flex-shrink: 0; opacity: .75; }

/* Specs */
.pp__specs { border-top: .5px solid var(--pp-hair); }
.pp__specs-toggle {
  display: flex; align-items: center; gap: 9px; width: 100%;
  background: none; border: none; padding: 16px 0;
  font-family: 'DM Mono', monospace; font-size: 8px; letter-spacing: 4px;
  color: var(--pp-text2); cursor: pointer; text-transform: uppercase;
  transition: color .2s;
}
.pp__specs-toggle:hover { color: var(--pp-gold); }
.pp__specs-gem { font-size: 4px; color: var(--pp-gold); opacity: .5; }
.pp__specs-arrow { margin-left: auto; transition: transform .3s; color: var(--pp-text3); }
.pp__specs-arrow.rotated { transform: rotate(180deg); }

.pp__specs-lista { padding-bottom: 12px; }
.pp__spec-row {
  display: flex; justify-content: space-between; align-items: center;
  padding: 11px 0; border-bottom: .5px solid var(--pp-hair);
  transition: background .2s;
}
.pp__spec-row:last-child { border-bottom: none; }
.pp__spec-row:hover { background: rgba(200,168,75,.02); }
.pp__spec-k {
  font-family: 'DM Mono', monospace; font-size: 8px; letter-spacing: 3px;
  color: var(--pp-gold); text-transform: uppercase; opacity: .75;
}
.pp__spec-v { font-size: 12px; color: var(--pp-text2); text-align: right; max-width: 55%; }

.specs-slide-enter-active,
.specs-slide-leave-active { transition: opacity .25s, max-height .3s; max-height: 600px; overflow: hidden; }
.specs-slide-enter-from,
.specs-slide-leave-to { opacity: 0; max-height: 0; }

/* ══ DIVISOR ORIENTAL ════════════════════════════════════════════════ */
.pp__oriental-divider {
  position: relative; display: flex; align-items: center; justify-content: center;
  padding: 40px 0; z-index: 2;
  border-top: .5px solid var(--pp-hair); border-bottom: .5px solid var(--pp-hair);
  background: var(--pp-void);
}
.pp__od-line { flex: 1; max-width: 200px; height: .5px; background: linear-gradient(to right, transparent, var(--pp-hairH)); }
.pp__od-line--r { background: linear-gradient(to left, transparent, var(--pp-hairH)); }
.pp__od-mon {
  width: 52px; height: 52px; border-radius: 50%; margin: 0 20px;
  border: .5px solid var(--pp-hairH);
  display: flex; align-items: center; justify-content: center;
  font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; font-style: italic;
  color: var(--pp-gold); opacity: .55; position: relative;
}
.pp__od-mon::before { content: ''; position: absolute; inset: 4px; border-radius: 50%; border: .5px solid var(--pp-hair); }

/* ══ DESCRIÇÃO ═══════════════════════════════════════════════════════ */
.pp__desc-sec {
  position: relative; z-index: 2;
  padding: 64px 0;
  background: linear-gradient(to bottom, transparent, rgba(200,168,75,.018));
  border-bottom: .5px solid var(--pp-hair);
}
.pp__desc-inner { max-width: 1380px; margin: 0 auto; padding: 0 48px; }

.pp__desc-eyebrow {
  font-family: 'DM Mono', monospace;
  font-size: 8px; letter-spacing: 6px; font-weight: 400;
  text-transform: uppercase; color: var(--pp-gold); opacity: .75;
  display: flex; align-items: center; gap: 12px; margin-bottom: 20px;
}
.pp__desc-eyebrow-line {
  display: block; width: 30px; height: 1px;
  background: linear-gradient(to right, var(--pp-gold), transparent); flex-shrink: 0;
}
.pp__desc-eyebrow-kanji { font-family: 'Cormorant Garamond', serif; font-size: 1rem; font-style: italic; opacity: .4; }

.pp__desc-titulo {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(1.8rem, 3vw, 2.8rem); font-weight: 300;
  color: var(--pp-text); margin-bottom: 20px; line-height: 1.15;
}
.pp__desc-txt {
  font-size: 14px; color: var(--pp-text3); line-height: 1.9;
  max-width: 680px; letter-spacing: .2px;
}

/* ══ LOADING ═════════════════════════════════════════════════════════ */
.pp__loading {
  min-height: 70vh; display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 16px;
  background: var(--pp-void);
}
.pp__spinner-wrap { position: relative; width: 48px; height: 48px; }
.pp__spinner-mon { position: absolute; inset: 0; animation: monSpin 8s linear infinite; }
.pp__spinner {
  position: absolute; inset: 4px; border-radius: 50%;
  border: 1px solid transparent;
  border-top-color: var(--pp-gold);
  animation: ppSpinner .8s linear infinite;
}
.pp__loading-txt {
  font-family: 'DM Mono', monospace; font-size: 8px; letter-spacing: 5px;
  text-transform: uppercase; color: var(--pp-text3);
}

/* ══ NÃO ENCONTRADO ══════════════════════════════════════════════════ */
.pp__nao-encontrado {
  min-height: 70vh; display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 18px;
  background: var(--pp-void); padding-top: var(--navbar-h, 72px);
}
.pp__nf-mon {
  font-size: 2.5rem; color: var(--pp-gold); opacity: .25;
  font-family: 'Cormorant Garamond', serif;
}
.pp__nf-txt {
  font-family: 'DM Mono', monospace; font-size: 9px;
  letter-spacing: 5px; text-transform: uppercase; color: var(--pp-text3);
}
.pp__btn-voltar {
  display: flex; align-items: center; gap: 8px;
  font-family: 'DM Mono', monospace; font-size: 8px; letter-spacing: 4px;
  text-transform: uppercase; color: var(--pp-gold); text-decoration: none;
  border: .5px solid var(--pp-hairH); padding: 12px 24px; border-radius: 1px;
  transition: all .25s;
}
.pp__btn-voltar:hover { background: rgba(200,168,75,.07); box-shadow: 0 0 16px rgba(200,168,75,.1); }

/* ══ RESPONSIVO ══════════════════════════════════════════════════════ */
@media (max-width: 1024px) {
  .pp__inner { grid-template-columns: 1fr; gap: 40px; padding: 40px 32px 52px; }
  .pp__galeria { position: static; }
  .pp__breadcrumb-inner { padding: 12px 32px; }
  .pp__desc-inner { padding: 0 32px; }
}
@media (max-width: 640px) {
  .pp__inner { padding: 28px 20px 40px; }
  .pp__breadcrumb-inner { padding: 10px 20px; }
  .pp__desc-inner { padding: 0 20px; }
  .pp__garantias { grid-template-columns: 1fr; }
  .pp__preco { font-size: 2rem; }
  .pp__nome  { font-size: clamp(1.8rem, 8vw, 2.4rem); }
}
@media (prefers-reduced-motion: reduce) {
  .pp__beam, .pp__spinner-mon, .pp__preco { animation: none !important; }
  .pp__info { transition: none; }
}
</style>