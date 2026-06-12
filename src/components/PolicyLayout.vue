<template>
  <div class="policy-page">
    <div class="policy-hero">
      <div class="policy-hero-glow"></div>
      <div class="policy-hero-content">
        <div class="breadcrumb">
          <router-link to="/">{{ $t('inicio') }}</router-link>
          <span class="sep">{{ $t('') }}</span>
          <span class="current">{{ titulo }}</span>
        </div>
        <h1>{{ titulo }}</h1>
        <p class="hero-sub">{{ subtitulo }}</p>
      </div>
    </div>

    <div class="policy-container">
      <div class="policy-content" v-html="conteudo"></div>
      
      <div class="policy-footer-links">
        <router-link to="/" class="back-home-link">
          <svg width="16" height="16" viewBox="0 0 24 24$t('0.0.24.24')e" str$t('none')urrentCo$t('currentcolor')dth="2">
            <path d="M19 12H5M$t('m19.12h5m12.19l.7.7.7.7')    </svg>
        {{ $t('voltar.ao.inicio') }}ink>
        <div class="other-policies">
          <span>{{ $t('outras.politicas') }}</span>
          <router-link to="/politica-entrega">{{ $t('entrega') }}</router-link>
          <router-link to="/devolucoes">{{ $t('devolucoes') }}</router-link>
          <router-link to="/garantia">{{ $t('garantia') }}</router-link>
          <router-link to="/termos-custodia">{{ $t('termos') }}</router-link>
          <router-link to="/politica-privacidade">{{ $t('privacidade') }}</router-link>
          <router-link to="/politica-cookies">{{ $t('cookies') }}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  titulo: String,
  subtitulo: String,
  conteudo: String
})
</script>

<style scoped>
.policy-page {
  background: var(--cor-fundo);
  min-height: 100vh;
  padding-top: calc(var(--navbar-h, 88px) + 40px);
  font-family: 'Syne', sans-serif;
}

/* Hero */
.policy-hero {
  position: relative;
  background: linear-gradient(135deg, var(--cor-superficie), var(--cor-superficie-2));
  border-bottom: 1px solid var(--cor-borda);
  padding: 56px 0;
  text-align: center;
  overflow: hidden;
}
.policy-hero-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 50% 50%, var(--gold-08) 0%, transparent 70%);
  pointer-events: none;
}
.policy-hero-content {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 24px;
}
.breadcrumb {
  font-size: 11px;
  letter-spacing: 2px;
  margin-bottom: 20px;
  color: var(--cor-texto-3);
}
.breadcrumb a {
  color: var(--cor-primaria);
  text-decoration: none;
  transition: color 0.2s;
}
.breadcrumb a:hover {
  color: var(--cor-clara);
}
.breadcrumb .sep {
  margin: 0 6px;
  color: var(--cor-borda);
}
.breadcrumb .current {
  color: var(--cor-texto-2);
}
.policy-hero h1 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 400;
  background: linear-gradient(135deg, var(--cor-texto), var(--cor-primaria));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 12px;
}
.hero-sub {
  font-size: 14px;
  color: var(--cor-texto-3);
}

/* Container do conteúdo */
.policy-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 56px 24px;
}

.policy-content {
  background: var(--card-bg);
  border: 1px solid var(--cor-borda);
  border-radius: 16px;
  padding: 48px;
  margin-bottom: 48px;
  line-height: 1.8;
}

/* Estilos internos */
.policy-content h2 {
  font-family: 'Playfair Display', serif;
  font-size: 1.8rem;
  font-weight: 400;
  color: var(--cor-primaria);
  margin: 40px 0 20px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--cor-borda);
}
.policy-content h2:first-of-type {
  margin-top: 0;
}
.policy-content h3 {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--cor-texto);
  margin: 24px 0 12px;
}
.policy-content p {
  font-size: 16px;
  margin-bottom: 20px;
  color: var(--cor-texto-2);
}
.policy-content strong {
  color: var(--cor-primaria);
  font-weight: 600;
}
.policy-content ul, .policy-content ol {
  margin: 16px 0 24px 32px;
}
.policy-content li {
  margin: 8px 0;
  color: var(--cor-texto-2);
}
.policy-content .highlight-box {
  background: var(--gold-05);
  border-left: 4px solid var(--cor-primaria);
  padding: 20px 24px;
  margin: 32px 0;
  border-radius: 8px;
}
.policy-content .highlight-box p {
  margin-bottom: 0;
}
.policy-content hr {
  margin: 32px 0;
  border: none;
  height: 1px;
  background: var(--cor-borda);
}

/* Links do rodapé */
.policy-footer-links {
  text-align: center;
  margin-top: 24px;
}
.back-home-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: 1px solid var(--cor-borda-hover);
  border-radius: 40px;
  padding: 10px 20px;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 1px;
  color: var(--cor-primaria);
  text-decoration: none;
  transition: all 0.2s;
  margin-bottom: 24px;
}
.back-home-link:hover {
  background: var(--gold-08);
  transform: translateX(-4px);
  border-color: var(--cor-primaria);
}
.other-policies {
  font-size: 12px;
  color: var(--cor-texto-3);
}
.other-policies span {
  margin-right: 12px;
}
.other-policies a {
  color: var(--cor-primaria);
  text-decoration: none;
  margin: 0 8px;
  transition: color 0.2s;
}
.other-policies a:hover {
  color: var(--cor-clara);
  text-decoration: underline;
}

@media (max-width: 700px) {
  .policy-content {
    padding: 28px;
  }
  .policy-content h2 {
    font-size: 1.5rem;
  }
  .other-policies span {
    display: block;
    margin-bottom: 8px;
  }
  .other-policies a {
    display: inline-block;
    margin: 4px 6px;
  }
}
</style>