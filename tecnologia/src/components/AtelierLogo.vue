<template>
  <div class="atelier-wrap" :class="{ visible: visivel }" role="img" :aria-label="$t ? $t('atelier.noir.or') : 'Noir & Or'">
    <div class="atelier-container" @mouseenter="hover = true" @mouseleave="hover = false">
      <div class="atelier-glow"></div>
      <div class="atelier-ring atelier-ring--outer"></div>
      <div class="atelier-ring atelier-ring--inner"></div>
      <div class="atelier-logo" :class="{ hover }">
        <img
          v-if="!erroImagem"
          :src="logoSrc"
          :alt="$t ? $t('noir.or') : 'Noir & Or'"
          @error="erroImagem = true"
        />
        <span v-else class="atelier-fallback">N &amp; O</span>
      </div>
      <div class="atelier-particles">
        <span
          v-for="n in 8"
          :key="n"
          class="atelier-particle"
          :style="getParticleStyle(n)"
        ></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useSiteStore } from '@/stores/site.js'

const site = useSiteStore()

const hover     = ref(false)
const visivel   = ref(false)
const erroImagem = ref(false)

// Troca automaticamente a logo com o tema
const logoSrc = computed(() =>
  site.tema === 'claro' ? '/logo-light.png' : '/logo-dark.png'
)

onMounted(() => {
  setTimeout(() => { visivel.value = true }, 400)
})

const getParticleStyle = (index) => {
  const delays  = [0, 1.2, 2.4, 3.6, 4.8, 6, 7.2, 8.4]
  const sizes   = [4, 3, 3, 2, 4, 2, 3, 4]
  const origins = [
    '38px 0', '-38px 0', '0 38px', '28px 28px',
    '-28px 28px', '28px -28px', '-28px -28px', '38px -38px'
  ]
  return {
    animationDelay: `${delays[index - 1]}s`,
    width:  `${sizes[index - 1]}px`,
    height: `${sizes[index - 1]}px`,
    transformOrigin: origins[index - 1]
  }
}
</script>

<style scoped>
.atelier-wrap {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: scale(0.85);
  transition:
    opacity   0.8s cubic-bezier(0.19, 1, 0.22, 1),
    transform 0.8s cubic-bezier(0.19, 1, 0.22, 1);
}
.atelier-wrap.visible {
  opacity: 1;
  transform: scale(1);
}

.atelier-container {
  position: relative;
  width: 96px;
  height: 96px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

/* ── GLOW ── */
.atelier-glow {
  position: absolute;
  inset: -16px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--accent-fill-20, rgba(255,122,32,0.20)) 0%, transparent 75%);
  animation: glowPulse 3s ease-in-out infinite;
  pointer-events: none;
}
@keyframes glowPulse {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50%      { opacity: 1;   transform: scale(1.12); }
}

/* ── ANÉIS ── */
.atelier-ring {
  position: absolute;
  border-radius: 50%;
  border: 1px solid;
  pointer-events: none;
  transition: border-color 0.3s;
}
.atelier-ring--outer {
  inset: -12px;
  border-color: var(--accent-fill-20, rgba(255,122,32,0.20));
  animation: rotateOuter 16s linear infinite;
}
.atelier-ring--inner {
  inset: -6px;
  border-color: var(--gold-30, rgba(212,175,55,0.35));
  animation: rotateInner 10s linear infinite reverse;
}
@keyframes rotateOuter { to { transform: rotate(360deg); } }
@keyframes rotateInner { to { transform: rotate(360deg); } }

/* ── LOGO CENTRAL ── */
.atelier-logo {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: var(--cor-superficie);
  border: 1px solid var(--cor-borda-h);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  z-index: 2;
  transition:
    transform    0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow   0.4s ease,
    border-color 0.3s;
  box-shadow: 0 4px 20px var(--accent-fill-15, rgba(255,122,32,0.15));
}
.atelier-logo.hover {
  transform: scale(1.1);
  box-shadow: 0 8px 32px var(--accent-fill-20, rgba(255,122,32,0.25));
  border-color: var(--cor-primaria);
}

.atelier-logo img {
  width: 70%;
  height: 70%;
  object-fit: contain;
  transition: transform 0.3s;
}
.atelier-logo.hover img {
  transform: scale(1.04);
}

/* Fallback textual */
.atelier-fallback {
  font-family: 'Playfair Display', serif;
  font-size: 1.3rem;
  font-weight: 700;
  font-style: italic;
  background: var(--grad-texto);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 1px;
}

/* ── PARTÍCULAS ── */
.atelier-particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.atelier-particle {
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  background: var(--cor-primaria);
  animation: orbitParticle 8s linear infinite;
  opacity: 0;
}
@keyframes orbitParticle {
  0%   { opacity: 0;   transform: rotate(0deg)   translateX(42px) scale(0); }
  15%  { opacity: 0.8; }
  70%  { opacity: 0.3; }
  100% { opacity: 0;   transform: rotate(360deg) translateX(42px) scale(0); }
}

/* ── RESPONSIVO ── */
@media (max-width: 768px) {
  .atelier-container { width: 80px; height: 80px; }
  .atelier-logo { width: 58px; height: 58px; }
  .atelier-fallback { font-size: 1rem; }
}
</style>