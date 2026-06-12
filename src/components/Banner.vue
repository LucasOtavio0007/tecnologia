<template>
  <section class="nb" aria-label="Hero — Coleção Noir & Or 2026" ref="sectionRef">

    <!-- ══ CAMADAS DE FUNDO ══ -->

    <!-- Vídeo -->
    <div class="nb__video-wrapper">
      <video
        ref="videoRef"
        autoplay muted loop playsinline preload="auto"
        :poster="posterUrl"
        class="nb__video"
        disableRemotePlayback
      >
        <source :src="videoUrl" type="video/mp4" />
      </video>
      <!-- Gradiente cinema -->
      <div class="nb__overlay-cinema"></div>
      <!-- Letterbox -->
      <div class="nb__letterbox nb__letterbox--top"></div>
      <div class="nb__letterbox nb__letterbox--bot"></div>
    </div>

    <!-- Canvas partículas procedurais (folhas + poeira + névoa) -->
    <canvas ref="canvasRef" class="nb__canvas" aria-hidden="true"></canvas>

    <!-- Textura washi -->
    <div class="nb__washi" aria-hidden="true"></div>

    <!-- Barra lacre topo realm-aware -->
    <div class="nb__topbar" aria-hidden="true"></div>

    <!-- Scanlines cinematográficas -->
    <div class="nb__scanline" aria-hidden="true"></div>

    <!-- Névoa de profundidade -->
    <div class="nb__fog nb__fog--1" aria-hidden="true"></div>
    <div class="nb__fog nb__fog--2" aria-hidden="true"></div>

    <!-- ══ ELEMENTOS DECORATIVOS ══ -->

    <!-- Kanji fantasma parallax -->
    <div class="nb__kanji-ghost nb__parallax" data-speed="0.03" aria-hidden="true">永</div>
    <div class="nb__kanji-sm nb__parallax" data-speed="0.06" aria-hidden="true">道</div>
    <div class="nb__kanji-far nb__parallax" data-speed="0.015" aria-hidden="true">武</div>

    <!-- Pinceladas -->
    <div class="nb__brush nb__brush--1" aria-hidden="true"></div>
    <div class="nb__brush nb__brush--2" aria-hidden="true"></div>
    <div class="nb__brush nb__brush--3" aria-hidden="true"></div>

    <!-- Hanko (selo) -->
    <svg class="nb__hanko nb__parallax" data-speed="0.04" viewBox="0 0 90 90" aria-hidden="true">
      <rect x="4" y="4" width="82" height="82" rx="6"
        fill="none" stroke="var(--nb-lacre-mid)" stroke-width="1.5"/>
      <text x="45" y="62" text-anchor="middle"
        font-family="'Noto Serif JP','Cormorant Garamond',serif"
        font-size="52" font-weight="200"
        fill="var(--nb-lacre-fill)">技</text>
    </svg>

    <!-- Linha editorial esquerda -->
    <div class="nb__edge-line" aria-hidden="true">
      <span class="nb__edge-num">01</span>
    </div>

    <!-- HUD direito -->
    <div class="nb__hud nb__hud--right" aria-hidden="true">
      <span class="nb__hud-label">ÉDITION · MMXXVI</span>
      <span class="nb__hud-sep"></span>
      <span class="nb__hud-coord">SS · 26</span>
    </div>

    <!-- Cursor luz (segue o mouse) -->
    <div class="nb__cursor-light" ref="cursorLightRef" aria-hidden="true"></div>

    <!-- ══ CONTEÚDO PRINCIPAL ══ -->
    <div class="nb__content" ref="contentRef">

      <!-- Kicker -->
      <div class="nb__kicker nb__r nb__r--1" aria-hidden="true">
        <span class="nb__kicker-num">00</span>
        <div class="nb__kicker-bar"></div>
      </div>

      <!-- Eyebrow -->
      <div class="nb__eyebrow nb__r nb__r--2">
        <span class="nb__ew-dot"></span>
        <span class="nb__ew-text">{{ $t('atelier edition de colecionador 2026') }}</span>
      </div>

      <!-- Título com parallax independente -->
      <h1 class="nb__titulo nb__r nb__r--3">
        <span class="nb__t-thin nb__parallax" data-speed="0.02">{{ $t('tecnologia') }}</span>
        <span class="nb__t-gold nb__parallax" data-speed="0.035">{{ $t('e imortal') }}</span>
      </h1>

      <!-- Separador -->
      <div class="nb__sep nb__r nb__r--4" aria-hidden="true">
        <span class="nb__sep-line"></span>
        <span class="nb__sep-gem"></span>
        <span class="nb__sep-line nb__sep-line--r"></span>
      </div>

      <!-- Descrição -->
      <p class="nb__desc nb__r nb__r--5">
        {{ $t('dispositivos de elite revestidos com metais nobres') }}<br/>
        {{ $t('onde o dourado encontra o silicio e o luxo encontra a inovacao') }}
      </p>

      <!-- CTAs -->
      <div class="nb__actions nb__r nb__r--6">
        <router-link to="/loja" class="nb__cta nb__cta--primary">
          <span class="nb__cta-fill" aria-hidden="true"></span>
          <span class="nb__cta-text">{{ $t('explorar colecao') }}</span>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="1.5" aria-hidden="true">
            <path d="M5 12h14M12.5 5l7 7-7 7"/>
          </svg>
        </router-link>
        <router-link to="/sobre" class="nb__cta nb__cta--ghost">
          <span class="nb__cta-fill" aria-hidden="true"></span>
          <span class="nb__cta-text">{{ $t('o atelier') }}</span>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="1.5" aria-hidden="true">
            <path d="M5 12h14M12.5 5l7 7-7 7"/>
          </svg>
        </router-link>
      </div>

      <!-- Stats rápidos -->
      <div class="nb__stats nb__r nb__r--7">
        <div class="nb__stat" v-for="s in stats" :key="s.label">
          <span class="nb__stat-num">{{ s.num }}</span>
          <span class="nb__stat-label">{{ s.label }}</span>
        </div>
        <div class="nb__stat-sep" aria-hidden="true"></div>
      </div>

    </div>

    <!-- Scroll indicator -->
    <div class="nb__scroll" aria-hidden="true">
      <div class="nb__scroll-track">
        <div class="nb__scroll-dot"></div>
      </div>
      <span class="nb__scroll-label">scroll</span>
    </div>

    <!-- SSL -->
    <div class="nb__ssl nb__r nb__r--8" aria-hidden="true">
      <span class="nb__ssl-dot"></span>
      <span>SSL 256-bit · Pagamento seguro</span>
    </div>

    <!-- Indicador realm atual -->
    <div class="nb__realm-badge" aria-hidden="true">
      <span class="nb__realm-dot"></span>
      <span class="nb__realm-name">{{ realmName }}</span>
    </div>

  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useSiteStore } from '@/stores/site.js'

const site = useSiteStore()

// ── Refs ──
const sectionRef    = ref(null)
const videoRef      = ref(null)
const canvasRef     = ref(null)
const contentRef    = ref(null)
const cursorLightRef = ref(null)

const videoUrl  = '/img/VID-20260305-WA0000.mp4'
const posterUrl = ''

// ── Stats ──
const stats = [
  { num: '2K+', label: 'Produtos Elite' },
  { num: '98%', label: 'Satisfação' },
  { num: '48h', label: 'Entrega VIP' },
]

// ── Realm ──
const realmName = computed(() => {
  const map = { escuro: 'Celestial', claro: 'Autumn', gamer: 'Ghost' }
  return map[site.tema] || 'Celestial'
})

// ── Partículas ──
let rafId        = null
let ctx          = null
let particles    = []
let mouseX       = 0
let mouseY       = 0
let scrollY_val  = 0

// Configuração realm-aware das partículas
const getParticleConfig = () => {
  const tema = site.tema
  if (tema === 'claro') {
    // Autumn: folhas cor âmbar/laranja
    return {
      colors: ['rgba(212,140,60,', 'rgba(180,100,40,', 'rgba(240,160,70,', 'rgba(160,80,30,'],
      count: 38,
      shapes: ['leaf', 'leaf', 'leaf', 'dot'],
      speedMult: 0.55,
    }
  } else if (tema === 'gamer') {
    // Ghost: brasas + cinzas
    return {
      colors: ['rgba(180,40,20,', 'rgba(220,80,30,', 'rgba(140,30,10,', 'rgba(200,60,20,'],
      count: 32,
      shapes: ['ember', 'ember', 'dot', 'dot'],
      speedMult: 0.7,
    }
  } else {
    // Celestial (escuro padrão): folhas sakura + poeira dourada
    return {
      colors: ['rgba(200,168,75,', 'rgba(245,166,35,', 'rgba(180,140,60,', 'rgba(220,190,100,'],
      count: 42,
      shapes: ['petal', 'petal', 'dot', 'dot', 'petal'],
      speedMult: 0.45,
    }
  }
}

const createParticle = (W, H) => {
  const cfg = getParticleConfig()
  const shape = cfg.shapes[Math.floor(Math.random() * cfg.shapes.length)]
  const color = cfg.colors[Math.floor(Math.random() * cfg.colors.length)]
  return {
    x:       Math.random() * W,
    y:       Math.random() * H - H,
    size:    Math.random() * 6 + 2,
    speedY:  (Math.random() * 0.6 + 0.15) * cfg.speedMult,
    speedX:  (Math.random() - 0.5) * 0.4,
    rot:     Math.random() * Math.PI * 2,
    rotSpeed:(Math.random() - 0.5) * 0.018,
    opacity: Math.random() * 0.45 + 0.08,
    opacitySpeed: (Math.random() - 0.5) * 0.003,
    shape,
    color,
    wobble:  Math.random() * Math.PI * 2,
    wobbleSpeed: Math.random() * 0.025 + 0.008,
    wobbleAmp: Math.random() * 1.4 + 0.3,
  }
}

const drawPetal = (ctx, p) => {
  ctx.save()
  ctx.translate(p.x, p.y)
  ctx.rotate(p.rot)
  ctx.globalAlpha = p.opacity
  ctx.beginPath()
  // Pétala de sakura simplificada
  ctx.ellipse(0, 0, p.size * 0.5, p.size * 1.4, 0, 0, Math.PI * 2)
  ctx.fillStyle = p.color + p.opacity + ')'
  ctx.fill()
  ctx.restore()
}

const drawLeaf = (ctx, p) => {
  ctx.save()
  ctx.translate(p.x, p.y)
  ctx.rotate(p.rot)
  ctx.globalAlpha = p.opacity
  ctx.beginPath()
  ctx.ellipse(0, 0, p.size * 0.4, p.size * 1.2, 0, 0, Math.PI * 2)
  ctx.fillStyle = p.color + p.opacity + ')'
  ctx.fill()
  // Nervura
  ctx.beginPath()
  ctx.moveTo(0, -p.size * 1.2)
  ctx.lineTo(0, p.size * 1.2)
  ctx.strokeStyle = p.color + (p.opacity * 0.5) + ')'
  ctx.lineWidth = 0.4
  ctx.stroke()
  ctx.restore()
}

const drawEmber = (ctx, p) => {
  ctx.save()
  ctx.translate(p.x, p.y)
  ctx.globalAlpha = p.opacity
  // Brasa: círculo com brilho
  const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size)
  grad.addColorStop(0, p.color + Math.min(p.opacity * 2, 1) + ')')
  grad.addColorStop(1, p.color + '0)')
  ctx.beginPath()
  ctx.arc(0, 0, p.size, 0, Math.PI * 2)
  ctx.fillStyle = grad
  ctx.fill()
  ctx.restore()
}

const drawDot = (ctx, p) => {
  ctx.save()
  ctx.translate(p.x, p.y)
  ctx.globalAlpha = p.opacity * 0.55
  ctx.beginPath()
  ctx.arc(0, 0, p.size * 0.35, 0, Math.PI * 2)
  ctx.fillStyle = p.color + p.opacity + ')'
  ctx.fill()
  ctx.restore()
}

const animateCanvas = () => {
  if (!ctx || !canvasRef.value) return
  const W = canvasRef.value.width
  const H = canvasRef.value.height

  ctx.clearRect(0, 0, W, H)

  const cfg = getParticleConfig()

  // Garante contagem correta de partículas
  while (particles.length < cfg.count) particles.push(createParticle(W, H))
  while (particles.length > cfg.count) particles.pop()

  particles.forEach((p, i) => {
    // Wobble horizontal + influência do vento leve
    p.wobble += p.wobbleSpeed
    p.x += p.speedX + Math.sin(p.wobble) * p.wobbleAmp
    p.y += p.speedY
    p.rot += p.rotSpeed
    p.opacity += p.opacitySpeed
    if (p.opacity > 0.55) { p.opacitySpeed = -Math.abs(p.opacitySpeed) }
    if (p.opacity < 0.04) { p.opacitySpeed = Math.abs(p.opacitySpeed) }

    // Reset ao sair da tela
    if (p.y > H + 20 || p.x < -30 || p.x > W + 30) {
      particles[i] = createParticle(W, H)
      particles[i].y = -20
    }

    // Desenha
    switch (p.shape) {
      case 'petal': drawPetal(ctx, p); break
      case 'leaf':  drawLeaf(ctx, p);  break
      case 'ember': drawEmber(ctx, p); break
      default:      drawDot(ctx, p);   break
    }
  })

  rafId = requestAnimationFrame(animateCanvas)
}

const initCanvas = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  ctx = canvas.getContext('2d')
  const resize = () => {
    canvas.width  = canvas.offsetWidth  || window.innerWidth
    canvas.height = canvas.offsetHeight || window.innerHeight
  }
  resize()
  window.addEventListener('resize', resize)

  const cfg = getParticleConfig()
  particles = Array.from({ length: cfg.count }, () => createParticle(canvas.width, canvas.height))
  // Distribui verticalmente no início
  particles.forEach(p => { p.y = Math.random() * canvas.height })

  animateCanvas()
  return () => window.removeEventListener('resize', resize)
}

// ── Parallax no scroll + mouse ──
const handleScroll = () => {
  scrollY_val = window.scrollY
  applyParallax()
}

const handleMouseMove = (e) => {
  mouseX = e.clientX / window.innerWidth  - 0.5
  mouseY = e.clientY / window.innerHeight - 0.5

  // Luz cursor
  if (cursorLightRef.value) {
    cursorLightRef.value.style.left = e.clientX + 'px'
    cursorLightRef.value.style.top  = e.clientY + 'px'
  }

  applyParallax()
}

const applyParallax = () => {
  if (!sectionRef.value) return
  const els = sectionRef.value.querySelectorAll('.nb__parallax')
  els.forEach(el => {
    const speed  = parseFloat(el.dataset.speed || '0.03')
    const tx     = mouseX * speed * 120
    const ty     = mouseY * speed * 80 + scrollY_val * speed * -0.6
    el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`
  })
}

// ── Vídeo ──
let canvasCleanup = null

onMounted(() => {
  // Vídeo
  const v = videoRef.value
  if (v) { v.muted = true; v.play().catch(() => {}) }

  // Canvas
  canvasCleanup = initCanvas()

  // Parallax
  window.addEventListener('mousemove', handleMouseMove, { passive: true })
  window.addEventListener('scroll',    handleScroll,    { passive: true })
})

onUnmounted(() => {
  if (rafId) cancelAnimationFrame(rafId)
  canvasCleanup?.()
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('scroll',    handleScroll)
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@200;300&display=swap');

/* ══ TOKENS ══ */
.nb {
  --or:      var(--cor-primaria,   #C8A84B);
  --or2:     var(--cor-secundaria, #F5D78E);
  --void:    var(--cor-fundo,      #05050c);
  --text:    var(--cor-texto,      rgba(237,232,224,0.92));
  --text2:   var(--cor-texto-2,    rgba(237,232,224,0.55));
  --text3:   var(--cor-texto-3,    rgba(237,232,224,0.28));
  --hair:    var(--cor-borda,      rgba(200,168,75,0.14));
  --hairH:   var(--cor-borda-h,    rgba(200,168,75,0.4));
  --ease:    var(--ease-out, cubic-bezier(0.16,1,0.30,1));
  --f-sans:  var(--font-sans,  'Syne', sans-serif);
  --f-serif: var(--font-serif, 'Playfair Display', serif);
  --grad:    var(--grad-texto);

  --nb-lacre:      var(--cor-acento, #C1121F);
  --nb-lacre-mid:  color-mix(in srgb, var(--nb-lacre) 55%, transparent);
  --nb-lacre-fill: color-mix(in srgb, var(--nb-lacre) 72%, transparent);

  position:        relative;
  width:           100%;
  height:          100vh;
  min-height:      680px;
  display:         flex;
  align-items:     center;
  justify-content: flex-start;
  overflow:        hidden;
  font-family:     var(--f-sans);
  background:      var(--void);
  cursor:          none; /* cursor custom */
}

/* ══ CURSOR LIGHT ══ */
.nb__cursor-light {
  position:      absolute;
  width:         320px;
  height:        320px;
  border-radius: 50%;
  background:    radial-gradient(circle, rgba(200,168,75,0.07) 0%, transparent 70%);
  pointer-events:none;
  transform:     translate(-50%, -50%);
  z-index:       20;
  transition:    left .12s ease, top .12s ease;
  mix-blend-mode:screen;
}

/* ══ VÍDEO ══ */
.nb__video-wrapper {
  position: absolute; inset: 0; z-index: 0; overflow: hidden;
}
.nb__video {
  position:   absolute; inset: 0; width: 100%; height: 100%;
  object-fit: cover; display: block;
  filter:     brightness(0.28) saturate(0.6);
  transform:  scale(1.04); /* leve zoom para parallax do video */
  transition: filter 1.2s ease;
}
.nb__overlay-cinema {
  position:   absolute; inset: 0;
  background:
    linear-gradient(to right,
      rgba(5,5,12,.94)  0%,
      rgba(5,5,12,.80) 38%,
      rgba(5,5,12,.38) 65%,
      rgba(5,5,12,.14) 100%
    ),
    linear-gradient(to bottom,
      rgba(5,5,12,.15) 0%,
      transparent 40%,
      transparent 60%,
      var(--cor-fundo, #05050c) 100%
    );
  pointer-events: none;
}
.nb__letterbox { position: absolute; left: 0; right: 0; z-index: 2; pointer-events: none; }
.nb__letterbox--top { top: 0; height: 6px; background: linear-gradient(to bottom, #000, transparent); }
.nb__letterbox--bot { bottom: 0; height: 8px; background: linear-gradient(to top, #000, transparent); }

/* ══ CANVAS PARTÍCULAS ══ */
.nb__canvas {
  position:       absolute;
  inset:          0;
  width:          100%;
  height:         100%;
  z-index:        3;
  pointer-events: none;
}

/* ══ WASHI ══ */
.nb__washi {
  position:      absolute; inset: 0; z-index: 1; pointer-events: none;
  background:
    repeating-linear-gradient(90deg, rgba(255,255,255,.010) 0, rgba(255,255,255,.010) 1px, transparent 1px, transparent 52px),
    repeating-linear-gradient( 0deg, rgba(255,255,255,.007) 0, rgba(255,255,255,.007) 1px, transparent 1px, transparent 40px);
}

/* ══ LACRE TOPO ══ */
.nb__topbar {
  position:   absolute; top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(to right,
    var(--nb-lacre) 0%,
    color-mix(in srgb, var(--nb-lacre) 45%, transparent) 35%,
    transparent 65%
  );
  z-index: 10;
}

/* ══ SCANLINES ══ */
.nb__scanline {
  position:       absolute; inset: 0; z-index: 2; pointer-events: none;
  background:     repeating-linear-gradient(to bottom, transparent 0, transparent 3px, rgba(0,0,0,.035) 3px, rgba(0,0,0,.035) 4px);
  opacity:        .25;
}

/* ══ NÉVOA CINEMATOGRÁFICA ══ */
.nb__fog {
  position:       absolute;
  pointer-events: none;
  z-index:        4;
  border-radius:  50%;
  filter:         blur(80px);
}
.nb__fog--1 {
  width:      60vw;
  height:     60vw;
  bottom:     -20vw;
  left:       -10vw;
  background: radial-gradient(circle, rgba(5,5,12,0.85) 0%, transparent 70%);
  animation:  fogDrift1 18s ease-in-out infinite;
}
.nb__fog--2 {
  width:      40vw;
  height:     40vw;
  top:        -10vw;
  right:      15vw;
  background: radial-gradient(circle, rgba(200,168,75,0.025) 0%, transparent 70%);
  animation:  fogDrift2 24s ease-in-out infinite;
}
@keyframes fogDrift1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-30px)} }
@keyframes fogDrift2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(20px,20px)} }

/* ══ KANJI FANTASMAS ══ */
.nb__kanji-ghost {
  position:       absolute; right: 6%; top: 50%; transform: translateY(-52%);
  font-family:    'Noto Serif JP', var(--f-serif), serif;
  font-size:      clamp(9rem,18vw,16rem);
  font-weight:    300; color: transparent;
  -webkit-text-stroke: .5px rgba(200,168,75,.05);
  pointer-events: none; user-select: none;
  z-index:        5; line-height: 1;
  animation:      kanjiPulse 11s ease-in-out infinite;
  will-change:    transform;
}
.nb__kanji-sm {
  position:       absolute; right: 26%; bottom: 11%;
  font-family:    'Noto Serif JP', var(--f-serif), serif;
  font-size:      clamp(1.4rem,2.5vw,2.4rem);
  font-weight:    300; color: transparent;
  -webkit-text-stroke: .5px color-mix(in srgb, var(--or) 10%, transparent);
  pointer-events: none; user-select: none; z-index: 5;
  animation:      kanjiPulse 14s ease-in-out infinite;
  will-change:    transform;
}
.nb__kanji-far {
  position:       absolute; left: 50%; top: 18%;
  font-family:    'Noto Serif JP', var(--f-serif), serif;
  font-size:      clamp(4rem,8vw,7rem);
  font-weight:    200; color: transparent;
  -webkit-text-stroke: .5px rgba(200,168,75,.028);
  pointer-events: none; user-select: none; z-index: 4;
  animation:      kanjiPulse 18s ease-in-out infinite reverse;
  will-change:    transform;
}
@keyframes kanjiPulse { 0%,100%{opacity:.65} 50%{opacity:1} }

/* ══ PINCELADAS ══ */
.nb__brush { position: absolute; pointer-events: none; z-index: 5; }
.nb__brush--1 {
  top: 19%; left: 8%; width: 38%; height: 2px;
  background: linear-gradient(to right, color-mix(in srgb,var(--or) 28%,transparent) 0%, transparent 100%);
  clip-path: polygon(0 30%,100% 0%,100% 100%,0% 70%);
  animation: brushIn .9s .3s var(--ease) both;
}
.nb__brush--2 {
  bottom: 23%; left: 8%; width: 22%; height: 1px;
  background: linear-gradient(to right, color-mix(in srgb,var(--or) 18%,transparent) 0%, transparent 100%);
  animation: brushIn .7s .7s var(--ease) both;
}
.nb__brush--3 {
  top: 42%; left: 7%; width: 4px; height: 18%;
  background: linear-gradient(to bottom, color-mix(in srgb,var(--or) 22%,transparent) 0%, transparent 100%);
  animation: brushInV .8s .5s var(--ease) both;
}
@keyframes brushIn  { from{transform:scaleX(0);transform-origin:left}  to{transform:scaleX(1);transform-origin:left} }
@keyframes brushInV { from{transform:scaleY(0);transform-origin:top}   to{transform:scaleY(1);transform-origin:top} }

/* ══ HANKO ══ */
.nb__hanko {
  position:       absolute; right: 13%; top: 50%;
  transform:      translateY(-54%) rotate(-4deg);
  width: 82px; height: 82px;
  pointer-events: none; opacity: .78; z-index: 6;
  animation:      nbReveal 1s .6s var(--ease) both;
  will-change:    transform;
}

/* ══ LINHA EDITORIAL ══ */
.nb__edge-line {
  position:  absolute; left: calc(12% - 1px); top: 0; bottom: 0; width: .5px;
  background:linear-gradient(to bottom, transparent 0%, var(--hairH) 22%, var(--hairH) 78%, transparent 100%);
  z-index: 5; pointer-events: none;
  animation: nbReveal .9s .2s var(--ease) both;
}
.nb__edge-num {
  position:  absolute; top: calc(var(--navbar-h,64px) + 36px);
  left: 50%; transform: translateX(-50%) rotate(-90deg);
  font-family: 'DM Mono','Courier New',monospace;
  font-size: 7px; letter-spacing: .3em;
  color: var(--or); opacity: .32; white-space: nowrap;
}

/* ══ HUD ══ */
.nb__hud {
  position:   absolute; top: 50%;
  display:    flex; flex-direction: column; align-items: center; gap: 8px;
  z-index:    5; pointer-events: none;
  animation:  nbReveal 1s 1.2s var(--ease) both;
}
.nb__hud--right { right: 28px; transform: translateY(-50%) rotate(90deg); }
.nb__hud-coord  { font-family:'DM Mono','Courier New',monospace; font-size:7px; letter-spacing:.28em; text-transform:uppercase; color:var(--or); opacity:.48; }
.nb__hud-label  { font-size:7px; letter-spacing:.52em; text-transform:uppercase; color:var(--text3); }
.nb__hud-sep    { width:18px; height:.5px; background:linear-gradient(90deg,transparent,var(--or),transparent); opacity:.32; }

/* ══ REVEALS ══ */
.nb__r { opacity: 0; transform: translateY(16px); }
.nb__r--1 { animation: nbReveal .7s  .05s var(--ease) forwards; }
.nb__r--2 { animation: nbReveal .8s  .20s var(--ease) forwards; }
.nb__r--3 { animation: nbReveal 1s   .35s var(--ease) forwards; }
.nb__r--4 { animation: nbReveal .7s  .55s var(--ease) forwards; }
.nb__r--5 { animation: nbReveal .8s  .70s var(--ease) forwards; }
.nb__r--6 { animation: nbReveal .8s  .86s var(--ease) forwards; }
.nb__r--7 { animation: nbReveal .7s 1.02s var(--ease) forwards; }
.nb__r--8 { animation: nbReveal .7s 1.15s var(--ease) forwards; }
@keyframes nbReveal {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ══ CONTEÚDO ══ */
.nb__content {
  position:     relative; z-index: 6;
  padding-left: calc(12% + 32px);
  padding-right:6%;
  padding-top:  calc(var(--navbar-h, 64px) / 2);
  padding-bottom:calc(var(--navbar-h, 64px) / 2);
  max-width:    700px;
  display:      flex; flex-direction: column; align-items: flex-start; text-align: left;
}

/* ══ KICKER ══ */
.nb__kicker { display:flex; flex-direction:column; align-items:flex-start; gap:7px; margin-bottom:24px; }
.nb__kicker-num { font-family:'DM Mono','Courier New',monospace; font-size:9px; letter-spacing:.3em; color:var(--or); opacity:.4; }
.nb__kicker-bar { width:.5px; height:40px; background:linear-gradient(to bottom, var(--or), transparent); opacity:.28; }

/* ══ EYEBROW ══ */
.nb__eyebrow { display:flex; align-items:center; gap:10px; margin-bottom:22px; }
.nb__ew-dot { width:5px; height:5px; border-radius:50%; background:var(--nb-lacre); opacity:.8; flex-shrink:0; animation: dotPulse 2.5s ease-in-out infinite; }
.nb__ew-text { font-size:8px; font-weight:600; letter-spacing:.52em; text-transform:uppercase; color:var(--or); opacity:.7; white-space:nowrap; }
@keyframes dotPulse { 0%,100%{box-shadow:0 0 0 0 rgba(193,18,31,0)} 50%{box-shadow:0 0 0 5px rgba(193,18,31,0)} }

/* ══ TÍTULO ══ */
.nb__titulo { display:flex; flex-direction:column; margin:0; line-height:1; }
.nb__t-thin {
  font-family: var(--f-sans);
  font-size:   clamp(1.7rem,4.6vw,4rem);
  font-weight: 300; color: var(--text2);
  letter-spacing: -.01em; text-transform: uppercase;
  line-height: 1; display: block;
  will-change: transform;
}
.nb__t-gold {
  font-family: var(--f-serif);
  font-size:   clamp(3.2rem,8.2vw,7rem);
  font-weight: 300; font-style: italic;
  color:       transparent;
  -webkit-text-stroke: 1px var(--or);
  background:  var(--grad-texto, linear-gradient(135deg,var(--or) 0%,var(--or2) 55%,var(--cor-acento,#FF7A20) 100%));
  background-size: 200% auto;
  -webkit-background-clip: text; background-clip: text;
  animation:   fillGold 2.2s .8s var(--ease) forwards, shineGold 6s 3s ease-in-out infinite alternate;
  opacity:     .82; line-height: .9; display: block;
  will-change: transform;
}
@keyframes fillGold {
  from { -webkit-text-fill-color: transparent; opacity: .5; }
  to   { -webkit-text-fill-color: var(--or);   opacity: .85; }
}
@keyframes shineGold {
  from { background-position: 0% center; }
  to   { background-position: 200% center; }
}

/* ══ SEPARADOR ══ */
.nb__sep { display:flex; align-items:center; gap:10px; width:180px; margin:20px 0 19px; }
.nb__sep-line { flex:1; height:.5px; background:linear-gradient(to right, var(--nb-lacre), transparent); opacity:.45; }
.nb__sep-line--r { background:linear-gradient(to left, var(--nb-lacre), transparent); }
.nb__sep-gem { width:5px; height:5px; flex-shrink:0; border:.5px solid color-mix(in srgb,var(--nb-lacre) 50%,transparent); transform:rotate(45deg); }

/* ══ DESC ══ */
.nb__desc {
  font-size:   clamp(.78rem,1.2vw,.88rem);
  font-weight: 300; letter-spacing: .04em; line-height: 1.95;
  color:       var(--text3); max-width: 420px; margin-bottom: 34px;
}

/* ══ CTAs ══ */
.nb__actions { display:flex; gap:10px; align-items:center; flex-wrap:wrap; justify-content:flex-start; margin-bottom:40px; }
.nb__cta {
  position:     relative; overflow: hidden;
  display:      inline-flex; align-items: center; gap: 10px;
  text-decoration: none;
  font-size:    8px; font-weight: 600; letter-spacing: .52em; text-transform: uppercase;
  padding:      13px 28px;
  transition:   color .45s var(--ease);
  cursor:       pointer; z-index: 7;
}
.nb__cta--primary { border: .5px solid var(--or); color: var(--or); }
.nb__cta--ghost   { border: .5px solid var(--hair); color: var(--text3); }
.nb__cta-fill {
  position: absolute; inset: 0; transform: scaleX(0);
  transform-origin: left; transition: transform .5s var(--ease); z-index: -1;
}
.nb__cta--primary .nb__cta-fill { background: var(--or); }
.nb__cta--primary:hover .nb__cta-fill { transform: scaleX(1); }
.nb__cta--primary:hover { color: var(--void); }
.nb__cta--ghost .nb__cta-fill { background: rgba(237,232,224,.06); }
.nb__cta--ghost:hover .nb__cta-fill { transform: scaleX(1); }
.nb__cta--ghost:hover { color: var(--text2); border-color: var(--hair); }
.nb__cta-text { position: relative; z-index: 1; }
.nb__cta svg  { position: relative; z-index: 1; flex-shrink: 0; transition: transform .3s var(--ease); }
.nb__cta:hover svg { transform: translateX(3px); }

/* ══ STATS ══ */
.nb__stats {
  display:     flex;
  align-items: center;
  gap:         28px;
  position:    relative;
}
.nb__stat { display:flex; flex-direction:column; gap:3px; }
.nb__stat-num {
  font-family: 'DM Mono','Courier New',monospace;
  font-size:   1.05rem; color: var(--or); opacity: .85;
  letter-spacing: .04em; line-height: 1;
}
.nb__stat-label {
  font-size:   7px; letter-spacing: .4em; text-transform: uppercase;
  color:       var(--text3); font-weight: 600;
}
.nb__stat-sep {
  position:   absolute; left: -20px; top: 0; bottom: 0; width: .5px;
  background: linear-gradient(to bottom, transparent, var(--hair), transparent);
  display:    none;
}

/* ══ SCROLL ══ */
.nb__scroll {
  position:   absolute; bottom: 28px; right: 40px;
  z-index:    5; pointer-events: none;
  display:    flex; flex-direction: column; align-items: center; gap: 6px;
  animation:  nbReveal .6s 1.8s var(--ease) both;
}
.nb__scroll-track { width:1px; height:42px; background:rgba(200,168,75,.10); position:relative; overflow:hidden; }
.nb__scroll-dot   { position:absolute; top:-6px; left:0; right:0; height:6px; background:var(--or); animation:scrollDown 2s ease-in-out infinite; }
@keyframes scrollDown { 0%{top:-6px;opacity:.8} 80%{top:42px;opacity:.5} 100%{top:42px;opacity:0} }
.nb__scroll-label { font-family:'DM Mono','Courier New',monospace; font-size:6px; letter-spacing:.4em; text-transform:uppercase; color:var(--or); opacity:.3; }

/* ══ SSL ══ */
.nb__ssl {
  position:   absolute; bottom: 20px; left: calc(12% + 32px);
  display:    flex; align-items: center; gap: 6px;
  font-size:  7px; letter-spacing: .2em; text-transform: uppercase;
  color:      var(--text3); z-index: 5;
}
.nb__ssl-dot { width:4px; height:4px; border-radius:50%; background:var(--nb-lacre); opacity:.48; flex-shrink:0; }

/* ══ REALM BADGE ══ */
.nb__realm-badge {
  position:     absolute; top: calc(var(--navbar-h,64px) + 16px); right: 60px;
  display:      flex; align-items: center; gap: 7px;
  font-family:  'DM Mono','Courier New',monospace;
  font-size:    7px; letter-spacing: .45em; text-transform: uppercase;
  color:        var(--or); opacity: .38; z-index: 6; pointer-events: none;
  animation:    nbReveal .6s 1.5s var(--ease) both;
}
.nb__realm-dot { width:5px; height:5px; border-radius:50%; background:var(--or); opacity:.7; animation: dotPulse 3s ease-in-out infinite; }
.nb__realm-name { letter-spacing: .4em; }

/* ══ PARALLAX — será override pelo JS ══ */
.nb__parallax { transition: transform .08s linear; will-change: transform; }

/* ══ RESPONSIVO ══ */
@media (max-width: 1024px) {
  .nb__content { padding-left: calc(10% + 24px); max-width: 580px; }
  .nb__edge-line { left: calc(10% - 1px); }
  .nb__ssl { left: calc(10% + 24px); }
}
@media (max-width: 768px) {
  .nb { cursor: auto; }
  .nb__cursor-light { display: none; }
  .nb__hud,
  .nb__edge-line,
  .nb__kanji-ghost,
  .nb__kanji-far,
  .nb__hanko { display: none; }
  .nb__content {
    padding-left: 20px; padding-right: 20px; max-width: 100%;
    padding-top: calc(var(--navbar-h,64px) + 40px); padding-bottom: 110px;
  }
  .nb__ssl     { left: 20px; }
  .nb__actions { flex-direction: column; width: 100%; max-width: 270px; }
  .nb__cta     { justify-content: center; width: 100%; }
  .nb__realm-badge { right: 20px; }
  .nb__stats { gap: 18px; }
}
@media (max-width: 480px) {
  .nb__content  { padding-left: 16px; padding-right: 16px; }
  .nb__ssl      { left: 16px; }
  .nb__realm-badge { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .nb__t-gold, .nb__scroll-dot, .nb__kanji-ghost, .nb__kanji-sm,
  .nb__fog--1, .nb__fog--2, .nb__ew-dot { animation: none !important; }
  .nb__r { opacity: 1; transform: none; animation: none !important; }
  .nb__parallax { transition: none !important; }
}
</style>