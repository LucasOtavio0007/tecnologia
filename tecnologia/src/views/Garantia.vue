<template>
  <div class="garantia">

    <!-- ══ LAYERS ATMOSFÉRICOS ══ -->
    <div class="gar__grain"   aria-hidden="true"></div>
    <div class="gar__bg-grid" aria-hidden="true"></div>
    <div class="gar__beam gar__beam--1" aria-hidden="true"></div>
    <div class="gar__beam gar__beam--2" aria-hidden="true"></div>
    <div class="gar__beam gar__beam--3" aria-hidden="true"></div>

    <!-- ══ HERO ══ -->
    <section class="gar__hero">
      <div class="gar__hero-kamon" aria-hidden="true">保</div>
      <div class="gar__realm-line" aria-hidden="true"></div>

      <div class="gar__edge-line" aria-hidden="true">
        <span class="gar__edge-num">保</span>
      </div>

      <div class="gar__hero-inner">
        <div class="gar__hero-content">
          <div class="gar__breadcrumb">
            <router-link to="/" class="gar__bc-link">
              <span class="gar__bc-gem">◆</span> Início
            </router-link>
            <span class="gar__bc-sep">›</span>
            <span class="gar__bc-atual">Garantia Vitalícia</span>
          </div>

          <div class="gar__eyebrow">
            <span class="gar__ew-dot" aria-hidden="true"></span>
            <span>GARANTIA · NOIR &amp; OR ATELIER</span>
          </div>

          <h1 class="gar__titulo">
            <span class="gar__t-thin">PROTEÇÃO</span>
            <span class="gar__t-gold">Vitalícia</span>
            <span class="gar__t-kanji" aria-hidden="true">永久保証 · 誠実</span>
          </h1>

          <div class="gar__sep" aria-hidden="true">
            <span class="gar__sep-line"></span>
            <span class="gar__sep-gem">◆</span>
            <span class="gar__sep-line gar__sep-line--r"></span>
          </div>

          <p class="gar__sub">
            Uma promessa que dura tanto quanto a sua peça — para sempre.
          </p>
        </div>

        <!-- Stats -->
        <div class="gar__hero-stats">
          <div class="gar__stat">
            <span class="gar__stat-kanji" aria-hidden="true">永</span>
            <span class="gar__stat-num">∞</span>
            <span class="gar__stat-lbl">Cobertura vitalícia</span>
          </div>
          <div class="gar__stat-sep" aria-hidden="true"></div>
          <div class="gar__stat">
            <span class="gar__stat-kanji" aria-hidden="true">金</span>
            <span class="gar__stat-num">Ouro</span>
            <span class="gar__stat-lbl">Revestimento garantido</span>
          </div>
          <div class="gar__stat-sep" aria-hidden="true"></div>
          <div class="gar__stat">
            <span class="gar__stat-kanji" aria-hidden="true">証</span>
            <span class="gar__stat-num">100%</span>
            <span class="gar__stat-lbl">Original comprador</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ══ TICKER ══ -->
    <div class="gar__ticker" aria-hidden="true">
      <div class="gar__ticker-track">
        <span v-for="n in 4" :key="n" class="gar__ticker-set">
          <span class="gar__t-item">永久保証 Garantia Vitalícia</span><span class="gar__t-sep">◆</span>
          <span class="gar__t-item">Revestimento em Ouro</span><span class="gar__t-sep">◆</span>
          <span class="gar__t-item">誠実 Compromisso Total</span><span class="gar__t-sep">◆</span>
          <span class="gar__t-item">Proteção para Sempre</span><span class="gar__t-sep">◆</span>
          <span class="gar__t-item">証 Certificado Autêntico</span><span class="gar__t-sep">◆</span>
        </span>
      </div>
    </div>

    <!-- ══ CORPO PRINCIPAL ══ -->
    <div class="gar__layout">

      <!-- ══ SIDEBAR ══ -->
      <aside class="gar__sidebar">
        <div class="gar__sb-kamon" aria-hidden="true">誠</div>

        <div class="gar__sb-ornament" aria-hidden="true">
          <span class="gar__sb-line"></span>
          <span class="gar__sb-kanji">目</span>
          <span class="gar__sb-line gar__sb-line--r"></span>
        </div>

        <p class="gar__sb-lbl">
          <span class="gar__sb-lbl-kanji">案</span>Navegação
        </p>

        <nav class="gar__sb-nav" aria-label="Políticas">
          <router-link to="/suporte" class="gar__sb-link">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            Central de Ajuda
          </router-link>
          <router-link to="/politica-entrega" class="gar__sb-link">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
            Entrega
          </router-link>
          <router-link to="/devolucoes" class="gar__sb-link">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.96"/></svg>
            Devoluções
          </router-link>
          <router-link to="/garantia" class="gar__sb-link gar__sb-link--active">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            Garantia Vitalícia
          </router-link>
          <router-link to="/termos-custodia" class="gar__sb-link">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            Termos de Custódia
          </router-link>
          <router-link to="/politica-privacidade" class="gar__sb-link">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            Privacidade
          </router-link>
          <router-link to="/politica-cookies" class="gar__sb-link">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/></svg>
            Cookies
          </router-link>
        </nav>

        <div class="gar__sb-sep" aria-hidden="true">
          <span class="gar__sb-sep-line"></span>
          <span class="gar__sb-sep-kanji">誠</span>
          <span class="gar__sb-sep-line"></span>
        </div>

        <router-link to="/" class="gar__sb-voltar">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Voltar ao início
        </router-link>

        <div class="gar__sb-watermark" aria-hidden="true">The Art of Silent Power</div>
      </aside>

      <!-- ══ CONTEÚDO PRINCIPAL ══ -->
      <main class="gar__main">

        <!-- Seções da garantia -->
        <div class="gar__secoes">

          <div
            v-for="(secao, idx) in secoes"
            :key="secao.id"
            :class="['gar__secao', { 'is-open': secaoAberta === idx }]"
          >
            <button
              class="gar__secao-header"
              @click="secaoAberta = secaoAberta === idx ? null : idx"
              :aria-expanded="secaoAberta === idx"
            >
              <span class="gar__secao-num" aria-hidden="true">{{ String(idx+1).padStart(2,'0') }}</span>
              <span class="gar__secao-ico" v-html="secao.icone" aria-hidden="true"></span>
              <span class="gar__secao-titulo">{{ secao.titulo }}</span>
              <span class="gar__secao-kanji" aria-hidden="true">{{ secao.kanji }}</span>
              <svg
                :class="['gar__secao-chevron', { 'is-open': secaoAberta === idx }]"
                width="12" height="12" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" aria-hidden="true"
              >
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </button>
            <transition name="secao-drop">
              <div v-if="secaoAberta === idx" class="gar__secao-body">
                <div class="gar__secao-body-bar" aria-hidden="true"></div>
                <p>{{ secao.conteudo }}</p>
                <ul v-if="secao.lista" class="gar__secao-lista">
                  <li v-for="item in secao.lista" :key="item" class="gar__secao-item">
                    <span class="gar__secao-item-gem" aria-hidden="true">◆</span>
                    {{ item }}
                  </li>
                </ul>
              </div>
            </transition>
          </div>

        </div>

        <!-- Divisor oriental -->
        <div class="gar__divider" aria-hidden="true">
          <span class="gar__div-line"></span>
          <span class="gar__div-gem">◆</span>
          <span class="gar__div-kanji">証</span>
          <span class="gar__div-gem">◆</span>
          <span class="gar__div-line gar__div-line--r"></span>
        </div>

        <!-- Como acionar -->
        <div class="gar__acionar-head">
          <span class="gar__acionar-kanji" aria-hidden="true">動</span>
          <h2 class="gar__acionar-titulo">Como <em>Acionar</em></h2>
        </div>

        <div class="gar__steps">
          <div v-for="(step, i) in passos" :key="step.label" class="gar__step">
            <div class="gar__step-num" aria-hidden="true">{{ String(i+1).padStart(2,'0') }}</div>
            <div class="gar__step-ico" v-html="step.icone" aria-hidden="true"></div>
            <div class="gar__step-info">
              <span class="gar__step-lbl">{{ step.label }}</span>
              <span class="gar__step-desc">{{ step.desc }}</span>
            </div>
            <div v-if="i < passos.length - 1" class="gar__step-arrow" aria-hidden="true">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12.5 5l7 7-7 7"/></svg>
            </div>
          </div>
        </div>

        <!-- Canais para acionar -->
        <div class="gar__canais">
          <a href="https://wa.me/5531999999999" target="_blank" rel="noopener" class="gar__canal gar__canal--wpp">
            <span class="gar__canal-corner gar__canal-corner--tl" aria-hidden="true"></span>
            <span class="gar__canal-corner gar__canal-corner--br" aria-hidden="true"></span>
            <div class="gar__canal-ico">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.554 4.12 1.523 5.851L.057 23.929l6.283-1.455A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.979 9.979 0 0 1-5.153-1.432l-.371-.221-3.807.883.91-3.701-.244-.389A9.953 9.953 0 0 1 2 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z"/>
              </svg>
            </div>
            <div class="gar__canal-info">
              <span class="gar__canal-lbl">WhatsApp</span>
              <span class="gar__canal-desc">Abertura de chamado em até 2h úteis</span>
              <span class="gar__canal-val">+55 (31) 99999-9999</span>
            </div>
            <svg class="gar__canal-arr" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M12.5 5l7 7-7 7"/></svg>
          </a>

          <a href="mailto:garantia@noiror.com.br" class="gar__canal gar__canal--email">
            <span class="gar__canal-corner gar__canal-corner--tl" aria-hidden="true"></span>
            <span class="gar__canal-corner gar__canal-corner--br" aria-hidden="true"></span>
            <div class="gar__canal-ico">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </div>
            <div class="gar__canal-info">
              <span class="gar__canal-lbl">E-mail Garantia</span>
              <span class="gar__canal-desc">Resposta e análise em até 48h úteis</span>
              <span class="gar__canal-val">garantia@noiror.com.br</span>
            </div>
            <svg class="gar__canal-arr" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M12.5 5l7 7-7 7"/></svg>
          </a>
        </div>

        <!-- Selo de compromisso -->
        <div class="gar__selo">
          <div class="gar__selo-ico" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <polyline points="9 12 11 14 15 10"/>
            </svg>
          </div>
          <div>
            <p class="gar__selo-titulo">Garantia vinculada ao comprador original</p>
            <p class="gar__selo-desc">A proteção é pessoal e intransferível. O revestimento em ouro e metais nobres está coberto contra oxidação e desgaste prematuro enquanto a peça permanecer com você.</p>
          </div>
          <span class="gar__selo-kanji" aria-hidden="true">永</span>
        </div>

      </main>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const secaoAberta = ref(0)

const secoes = [
  {
    id: 'cobertura',
    titulo: 'O que está coberto',
    kanji: '覆',
    icone: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    conteudo: 'A Garantia Vitalícia cobre exclusivamente o revestimento em ouro e metais nobres contra oxidação ou desgaste prematuro durante todo o período de posse do produto pelo comprador original.',
    lista: [
      'Oxidação do revestimento em ouro 18k e superiores',
      'Desgaste prematuro de metais nobres (prata, ouro branco, ouro rosê)',
      'Defeitos de acabamento identificados após a entrega',
      'Falhas no processo de banho galvânico',
    ]
  },
  {
    id: 'excecoes',
    titulo: 'Exclusões da cobertura',
    kanji: '除',
    icone: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
    conteudo: 'Não estão cobertos pela garantia os danos decorrentes de uso inadequado, acidentes ou desgaste natural de componentes não metálicos.',
    lista: [
      'Quedas, impactos físicos e amassados mecânicos',
      'Modificações não autorizadas pelo atelier',
      'Desgaste natural de componentes eletrônicos e baterias',
      'Contato com produtos químicos, perfumes ou soluções abrasivas',
      'Arranhões decorrentes de uso cotidiano normal',
    ]
  },
  {
    id: 'transferibilidade',
    titulo: 'Transferibilidade',
    kanji: '譲',
    icone: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    conteudo: 'A garantia é vinculada ao comprador original e não é transferível a terceiros em nenhuma hipótese, incluindo revenda, doação ou herança. Para validar a cobertura, é necessário apresentar comprovante de compra original.',
    lista: null
  },
]

const passos = [
  {
    label: 'Contato',
    desc: 'WhatsApp ou e-mail com número do pedido',
    icone: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
  },
  {
    label: 'Fotos',
    desc: 'Envie registros claros do defeito identificado',
    icone: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>',
  },
  {
    label: 'Análise',
    desc: 'Avaliação técnica em até 48h úteis',
    icone: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
  },
  {
    label: 'Reparo',
    desc: 'Restauração ou substituição sem custo',
    icone: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>',
  },
]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Syne:wght@300;400;600;700;800&family=DM+Mono:wght@300;400&family=Noto+Serif+JP:wght@200;300;400&display=swap');

/* ══ TOKENS ══ */
.garantia {
  --or:    var(--cor-primaria,   #C8A84B);
  --or2:   var(--cor-secundaria, #F5D78E);
  --void:  var(--cor-fundo,      #05050c);
  --deep:  #09090f;
  --surf:  var(--cor-superficie, #0d0d18);
  --text:  var(--cor-texto,      rgba(237,232,224,0.92));
  --text2: var(--cor-texto-2,    rgba(237,232,224,0.55));
  --text3: var(--cor-texto-3,    rgba(237,232,224,0.28));
  --hair:  var(--cor-borda,      rgba(200,168,75,0.14));
  --hairH: var(--cor-borda-hover,rgba(200,168,75,0.40));
  --gold3: rgba(200,168,75,0.06);
  --ease:  cubic-bezier(0.16,1,0.30,1);
  --f-sans:  'Syne', sans-serif;
  --f-serif: 'Cormorant Garamond', serif;
  --f-mono:  'DM Mono', monospace;
  --f-jp:    'Noto Serif JP', serif;

  background: var(--void);
  color: var(--text);
  font-family: var(--f-sans);
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
  padding-top: var(--navbar-h, 72px);
}

/* ══ KEYFRAMES ══ */
@keyframes goldShine  { from{background-position:0% center} to{background-position:200% center} }
@keyframes beamSway   { from{transform:skewX(-5deg) translateX(-20px)} to{transform:skewX(5deg) translateX(20px)} }
@keyframes kamonDrift { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-18px) rotate(1deg)} }
@keyframes dotPulse   { 0%,100%{box-shadow:0 0 0 0 rgba(200,168,75,0)} 50%{box-shadow:0 0 0 6px rgba(200,168,75,0)} }
@keyframes tickerMove { from{transform:translateX(0)} to{transform:translateX(-25%)} }
@keyframes realmGlow  { 0%,100%{opacity:.55} 50%{opacity:.85} }

/* ══ ATMOSFÉRICOS ══ */
.gar__grain {
  position:fixed; inset:0; z-index:0; pointer-events:none;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E");
}
.gar__bg-grid {
  position:fixed; inset:0; z-index:0; pointer-events:none;
  background-image:
    linear-gradient(rgba(200,168,75,.018) 1px, transparent 1px),
    linear-gradient(90deg, rgba(200,168,75,.018) 1px, transparent 1px);
  background-size: 80px 80px;
}
.gar__beam {
  position:fixed; top:-20%; width:1px; height:140%;
  background:linear-gradient(to bottom, transparent, rgba(200,168,75,.18), transparent);
  filter:blur(3px);
  animation:beamSway 14s ease-in-out infinite alternate;
  pointer-events:none; z-index:1;
}
.gar__beam--1 { left:18%; }
.gar__beam--2 { left:52%; filter:blur(5px); animation-delay:-6s; animation-direction:alternate-reverse; opacity:.6; }
.gar__beam--3 { left:79%; filter:blur(2px); animation-delay:-10s; opacity:.4; }

/* ══ HERO ══ */
.gar__hero {
  position:relative; z-index:2;
  padding: calc(var(--navbar-h, 72px) + 72px) 80px 0;
  border-bottom:.5px solid var(--hair);
  overflow:hidden;
  min-height: 520px;
  display:flex; flex-direction:column; justify-content:flex-end;
}
.gar__hero-kamon {
  position:absolute; right:80px; top:50%; transform:translateY(-45%);
  font-family:var(--f-jp); font-size:clamp(200px,28vw,360px); font-weight:200;
  color:transparent;
  -webkit-text-stroke:.5px rgba(200,168,75,.06);
  pointer-events:none; user-select:none; z-index:0; line-height:1;
  animation:kamonDrift 22s ease-in-out infinite;
}
.gar__realm-line {
  position:absolute; top:0; left:0; right:0; height:.5px; z-index:3;
  background:linear-gradient(90deg, transparent 5%, var(--or2) 20%, var(--or) 50%, var(--or2) 80%, transparent 95%);
  opacity:.65; animation:realmGlow 4s ease-in-out infinite;
}
.gar__edge-line {
  position:absolute; left:calc(6% - 1px); top:0; bottom:0; width:.5px;
  background:linear-gradient(to bottom, transparent, var(--hair) 20%, var(--hair) 80%, transparent);
  z-index:3; pointer-events:none;
}
.gar__edge-num {
  position:absolute; top:50%; left:50%; transform:translateX(-50%) translateY(-50%) rotate(-90deg);
  font-family:var(--f-jp); font-size:16px; color:var(--or); opacity:.18; letter-spacing:.1em;
}
.gar__hero-inner {
  position:relative; z-index:2;
  padding-left:calc(6% + 28px);
  padding-bottom:60px;
}
.gar__breadcrumb {
  display:flex; align-items:center; gap:8px;
  font-family:var(--f-mono); font-size:8px; letter-spacing:.3em; text-transform:uppercase;
  color:var(--text3); margin-bottom:28px;
}
.gar__bc-link { color:var(--or); text-decoration:none; opacity:.7; display:flex; align-items:center; gap:6px; transition:opacity .2s; }
.gar__bc-link:hover { opacity:1; }
.gar__bc-gem { font-size:4px; }
.gar__bc-sep { color:var(--hair); }
.gar__bc-atual { color:var(--text2); }
.gar__eyebrow {
  display:flex; align-items:center; gap:10px; margin-bottom:22px;
  font-family:var(--f-mono); font-size:8px; letter-spacing:.52em; text-transform:uppercase;
  color:var(--or); opacity:.75;
}
.gar__ew-dot {
  width:5px; height:5px; border-radius:50%; background:var(--or); flex-shrink:0;
  animation:dotPulse 2.5s ease-in-out infinite;
}
.gar__titulo { display:flex; flex-direction:column; margin:0 0 18px; line-height:1; }
.gar__t-thin {
  font-family:var(--f-sans); font-size:clamp(1.4rem,3vw,2.8rem); font-weight:300;
  color:var(--text3); letter-spacing:-.01em; text-transform:uppercase; line-height:1; display:block;
}
.gar__t-gold {
  font-family:var(--f-serif); font-size:clamp(3.5rem,8vw,7.5rem); font-weight:300; font-style:italic;
  background:linear-gradient(135deg, var(--or) 0%, var(--or2) 55%, #FF7A20 100%);
  background-size:200% auto;
  -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent;
  animation:goldShine 6s linear infinite;
  line-height:.9; display:block;
}
.gar__t-kanji {
  font-family:var(--f-jp); font-size:clamp(.9rem,1.2vw,1.1rem); font-weight:200;
  letter-spacing:10px; color:var(--or); opacity:.18; margin-top:12px; display:block;
}
.gar__sep { display:flex; align-items:center; gap:10px; width:200px; margin:0 0 18px; }
.gar__sep-line { flex:1; height:.5px; background:linear-gradient(to right, var(--or), transparent); opacity:.4; }
.gar__sep-line--r { background:linear-gradient(to left, var(--or), transparent); }
.gar__sep-gem { font-size:5px; color:var(--or); opacity:.5; }
.gar__sub {
  font-family:var(--f-mono); font-size:9px; letter-spacing:2px; text-transform:uppercase;
  color:var(--text3); margin-bottom:32px; max-width:480px; line-height:1.7;
}
.gar__hero-stats {
  display:flex; align-items:center; gap:0;
  border-top:.5px solid var(--hair); padding-top:24px;
}
.gar__stat { display:flex; flex-direction:column; gap:5px; padding:0 32px; position:relative; }
.gar__stat:first-child { padding-left:0; }
.gar__stat-kanji { position:absolute; top:-8px; right:8px; font-family:var(--f-jp); font-size:20px; font-weight:200; color:var(--or); opacity:.08; line-height:1; }
.gar__stat-num   { font-family:var(--f-serif); font-size:1.7rem; font-weight:300; color:var(--or); line-height:1; }
.gar__stat-lbl   { font-family:var(--f-mono); font-size:7px; letter-spacing:.3em; text-transform:uppercase; color:var(--text3); }
.gar__stat-sep   { width:.5px; height:44px; background:linear-gradient(to bottom, transparent, var(--hair), transparent); flex-shrink:0; }

/* ══ TICKER ══ */
.gar__ticker {
  position:relative; z-index:2;
  background:var(--deep); border-bottom:.5px solid var(--hair);
  height:30px; overflow:hidden;
}
.gar__ticker::before,.gar__ticker::after { content:''; position:absolute; top:0; bottom:0; width:60px; z-index:2; pointer-events:none; }
.gar__ticker::before { left:0; background:linear-gradient(to right, var(--deep), transparent); }
.gar__ticker::after  { right:0; background:linear-gradient(to left, var(--deep), transparent); }
.gar__ticker-track { display:flex; white-space:nowrap; animation:tickerMove 38s linear infinite; height:100%; align-items:center; }
.gar__ticker-set   { display:inline-flex; align-items:center; }
.gar__t-item { font-family:var(--f-mono); font-size:7.5px; letter-spacing:3px; text-transform:uppercase; color:var(--text3); padding:0 20px; height:30px; display:flex; align-items:center; }
.gar__t-sep  { color:var(--or); font-size:5px; opacity:.35; flex-shrink:0; padding:0 3px; }

/* ══ LAYOUT ══ */
.gar__layout {
  display:grid; grid-template-columns:240px 1fr;
  max-width:1360px; margin:0 auto; padding:20px 80px 100px;
  position:relative; z-index:2; gap:0;
}

/* ══ SIDEBAR ══ */
.gar__sidebar {
  padding:28px 24px 28px 0; border-right:.5px solid var(--hair);
  position:sticky; top:calc(var(--navbar-h, 72px) + 20px); align-self:start;
  max-height:calc(100vh - var(--navbar-h, 72px) - 40px); overflow-y:auto;
  scrollbar-width:none;
  display:flex; flex-direction:column;
}
.gar__sidebar::-webkit-scrollbar { display:none; }
.gar__sb-kamon {
  position:absolute; bottom:60px; right:16px;
  font-family:var(--f-jp); font-size:44px; font-weight:200;
  color:var(--or); opacity:.04; pointer-events:none; z-index:0; line-height:1;
}
.gar__sb-ornament { display:flex; align-items:center; gap:10px; margin-bottom:20px; }
.gar__sb-line { flex:1; height:.5px; background:linear-gradient(90deg, var(--or), transparent); opacity:.18; }
.gar__sb-line--r { background:linear-gradient(270deg, var(--or), transparent); }
.gar__sb-kanji { font-family:var(--f-jp); font-size:13px; color:var(--or); opacity:.28; line-height:1; flex-shrink:0; }
.gar__sb-lbl {
  font-family:var(--f-mono); font-size:6px; letter-spacing:5px; text-transform:uppercase;
  color:var(--or); opacity:.6; margin-bottom:10px; display:flex; align-items:center; gap:7px;
}
.gar__sb-lbl-kanji { font-family:var(--f-jp); font-size:13px; font-weight:200; color:var(--or); opacity:.55; letter-spacing:0; line-height:1; }
.gar__sb-nav { display:flex; flex-direction:column; gap:1px; margin-bottom:20px; }
.gar__sb-link {
  display:flex; align-items:center; gap:9px; padding:9px 8px;
  font-family:var(--f-sans); font-size:12px; color:var(--text2); text-decoration:none;
  transition:all .2s; border:.5px solid transparent; position:relative;
}
.gar__sb-link::before {
  content:''; position:absolute; left:0; top:6px; bottom:6px; width:.5px;
  background:var(--or); opacity:0; transition:opacity .2s;
}
.gar__sb-link:hover { color:var(--or); padding-left:12px; }
.gar__sb-link:hover::before { opacity:.6; }
.gar__sb-link--active { color:var(--or); border-color:var(--hair); background:var(--gold3); }
.gar__sb-link--active::before { opacity:.8; }
.gar__sb-link svg { flex-shrink:0; opacity:.5; transition:opacity .2s; }
.gar__sb-link:hover svg,.gar__sb-link--active svg { opacity:1; }
.gar__sb-sep {
  display:flex; align-items:center; gap:10px; padding:14px 0; margin-bottom:14px;
}
.gar__sb-sep-line { flex:1; height:.5px; background:linear-gradient(90deg, transparent, rgba(200,168,75,.15)); }
.gar__sb-sep-kanji { font-family:var(--f-jp); font-size:11px; font-weight:200; color:var(--or); opacity:.28; flex-shrink:0; line-height:1; }
.gar__sb-voltar {
  display:inline-flex; align-items:center; gap:8px;
  font-family:var(--f-mono); font-size:8px; letter-spacing:.3em; text-transform:uppercase;
  color:var(--or); text-decoration:none; border:.5px solid var(--hair); padding:10px 14px;
  transition:all .2s; margin-bottom:16px;
}
.gar__sb-voltar:hover { border-color:var(--hairH); background:var(--gold3); }
.gar__sb-watermark {
  font-family:var(--f-serif); font-size:8px; font-style:italic;
  letter-spacing:.5em; text-transform:uppercase; color:var(--or); opacity:.07;
  text-align:center; margin-top:auto; padding-top:16px;
  pointer-events:none; user-select:none;
}

/* ══ MAIN ══ */
.gar__main {
  padding:0 0 0 48px;
  display:flex; flex-direction:column; gap:0;
}

/* Seções acordeão */
.gar__secoes { margin-bottom:48px; }
.gar__secao  { border-bottom:.5px solid rgba(255,255,255,.05); }
.gar__secao:first-child { border-top:.5px solid rgba(255,255,255,.05); }

.gar__secao-header {
  width:100%; display:flex; align-items:center; gap:14px;
  padding:20px 0; background:none; border:none; cursor:pointer; text-align:left;
  position:relative;
}
.gar__secao-header::before {
  content:''; position:absolute; left:-14px; top:14px; bottom:14px; width:.5px;
  background:var(--or); opacity:0; transition:opacity .3s;
}
.gar__secao.is-open .gar__secao-header::before,
.gar__secao-header:hover::before { opacity:.6; }

.gar__secao-num {
  font-family:var(--f-mono); font-size:10px; color:var(--or); opacity:.28; flex-shrink:0; min-width:28px;
}
.gar__secao-ico { display:flex; align-items:center; color:var(--or); opacity:.5; flex-shrink:0; }
.gar__secao.is-open .gar__secao-ico { opacity:1; }

.gar__secao-titulo {
  flex:1; font-family:var(--f-sans); font-size:14px; color:var(--text2);
  letter-spacing:.01em; transition:color .2s; text-align:left;
}
.gar__secao.is-open .gar__secao-titulo,
.gar__secao-header:hover .gar__secao-titulo { color:var(--text); }

.gar__secao-kanji {
  font-family:var(--f-jp); font-size:1.1rem; font-weight:200; color:var(--or); opacity:.08; line-height:1;
  transition:opacity .2s;
}
.gar__secao.is-open .gar__secao-kanji { opacity:.18; }

.gar__secao-chevron {
  color:var(--text3); flex-shrink:0;
  transition:transform .35s var(--ease), color .25s;
}
.gar__secao-chevron.is-open { transform:rotate(180deg); color:var(--or); }

.gar__secao-body { padding:0 0 24px 42px; overflow:hidden; }
.gar__secao-body-bar { width:24px; height:.5px; background:var(--or); opacity:.4; margin-bottom:12px; }
.gar__secao-body p { font-family:var(--f-sans); font-size:13px; font-weight:300; color:var(--text3); line-height:1.9; margin-bottom:16px; }

.gar__secao-lista { list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:10px; }
.gar__secao-item  { display:flex; align-items:flex-start; gap:10px; font-size:12px; color:var(--text3); font-weight:300; line-height:1.6; }
.gar__secao-item-gem { font-size:5px; color:var(--or); opacity:.5; margin-top:5px; flex-shrink:0; }

/* Transições */
.secao-drop-enter-active,.secao-drop-leave-active { transition:opacity .3s, max-height .4s; overflow:hidden; }
.secao-drop-enter-from,.secao-drop-leave-to { opacity:0; max-height:0; }
.secao-drop-enter-to,.secao-drop-leave-from { opacity:1; max-height:500px; }

/* ══ DIVISOR ══ */
.gar__divider {
  display:flex; align-items:center; gap:14px; margin:40px 0;
}
.gar__div-line { flex:1; height:.5px; background:linear-gradient(to right, transparent, rgba(200,168,75,.2)); }
.gar__div-line--r { background:linear-gradient(to left, transparent, rgba(200,168,75,.2)); }
.gar__div-gem   { font-size:5px; color:var(--or); opacity:.4; }
.gar__div-kanji { font-family:var(--f-jp); font-size:14px; font-weight:200; color:var(--or); opacity:.25; line-height:1; }

/* ══ COMO ACIONAR ══ */
.gar__acionar-head {
  display:flex; align-items:center; gap:14px; margin-bottom:28px;
}
.gar__acionar-kanji { font-family:var(--f-jp); font-size:1.3rem; font-weight:200; color:var(--or); opacity:.15; line-height:1; }
.gar__acionar-titulo {
  font-family:var(--f-serif); font-size:1.7rem; font-weight:300; color:var(--text); margin:0;
}
.gar__acionar-titulo em { font-style:italic; color:var(--or); }

.gar__steps {
  display:flex; align-items:stretch; gap:0; margin-bottom:28px;
  border:.5px solid var(--hair); overflow:hidden;
}
.gar__step {
  flex:1; display:flex; flex-direction:column; align-items:center; gap:10px;
  padding:24px 16px; position:relative; text-align:center;
  background:var(--surf); transition:background .25s;
}
.gar__step:hover { background:rgba(200,168,75,.03); }
.gar__step + .gar__step { border-left:.5px solid var(--hair); }

.gar__step-num {
  font-family:var(--f-mono); font-size:9px; color:var(--or); opacity:.25; line-height:1;
}
.gar__step-ico { color:var(--or); opacity:.6; }
.gar__step:hover .gar__step-ico { opacity:1; }
.gar__step-lbl  { font-family:var(--f-mono); font-size:8px; letter-spacing:.3em; text-transform:uppercase; color:var(--or); opacity:.8; }
.gar__step-desc { font-family:var(--f-sans); font-size:11px; font-weight:300; color:var(--text3); line-height:1.5; }

.gar__step-arrow {
  position:absolute; right:-8px; top:50%; transform:translateY(-50%);
  color:var(--or); opacity:.2; z-index:1;
}

/* ══ CANAIS ══ */
.gar__canais { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:32px; }

.gar__canal {
  display:flex; align-items:flex-start; gap:16px; padding:22px 20px;
  background:var(--surf); border:.5px solid var(--hair);
  transition:all .3s; position:relative; overflow:hidden; text-decoration:none;
}
.gar__canal::before {
  content:''; position:absolute; top:0; left:0; right:0; height:.5px;
  background:linear-gradient(90deg, transparent, var(--or), transparent);
  opacity:0; transition:opacity .3s;
}
.gar__canal:hover::before { opacity:.5; }
.gar__canal:hover { border-color:var(--hairH); background:rgba(200,168,75,.02); }

.gar__canal-corner {
  position:absolute; width:10px; height:10px;
  border-color:rgba(200,168,75,0); border-style:solid;
  pointer-events:none; transition:border-color .3s;
}
.gar__canal-corner--tl { top:8px; left:8px; border-width:.5px 0 0 .5px; }
.gar__canal-corner--br { bottom:8px; right:8px; border-width:0 .5px .5px 0; }
.gar__canal:hover .gar__canal-corner { border-color:rgba(200,168,75,.3); }

.gar__canal-ico {
  width:44px; height:44px; flex-shrink:0; border:.5px solid var(--hair);
  background:rgba(200,168,75,.05); display:flex; align-items:center; justify-content:center;
  color:var(--or); opacity:.65; transition:opacity .25s;
}
.gar__canal:hover .gar__canal-ico { opacity:1; }
.gar__canal--wpp .gar__canal-ico { color:#25D366; }

.gar__canal-info { flex:1; display:flex; flex-direction:column; gap:4px; }
.gar__canal-lbl  { font-family:var(--f-mono); font-size:8px; letter-spacing:.4em; text-transform:uppercase; color:var(--or); opacity:.8; font-weight:600; }
.gar__canal-desc { font-family:var(--f-sans); font-size:11px; color:var(--text3); font-weight:300; line-height:1.5; }
.gar__canal-val  { font-family:var(--f-mono); font-size:12px; color:var(--text2); margin-top:2px; }

.gar__canal-arr { color:var(--text3); flex-shrink:0; align-self:center; transition:transform .2s, color .2s; }
.gar__canal:hover .gar__canal-arr { transform:translateX(3px); color:var(--or); }

/* ══ SELO ══ */
.gar__selo {
  display:flex; align-items:flex-start; gap:16px; padding:22px 24px;
  background:rgba(200,168,75,.03); border:.5px solid rgba(200,168,75,.15);
  border-left:2px solid rgba(200,168,75,.4); position:relative; overflow:hidden;
}
.gar__selo-ico  { color:var(--or); opacity:.6; flex-shrink:0; margin-top:2px; }
.gar__selo-titulo { font-family:var(--f-sans); font-size:12px; font-weight:600; letter-spacing:.05em; color:var(--text); margin-bottom:6px; }
.gar__selo-desc   { font-family:var(--f-sans); font-size:12px; font-weight:300; color:var(--text3); line-height:1.8; }
.gar__selo-kanji  {
  position:absolute; right:16px; bottom:-8px;
  font-family:var(--f-jp); font-size:52px; font-weight:200; color:var(--or); opacity:.05;
  pointer-events:none; line-height:1;
}

/* ══ RESPONSIVO ══ */
@media (max-width:1200px) {
  .gar__hero   { padding:calc(var(--navbar-h, 72px) + 56px) 48px 0; }
  .gar__layout { padding:20px 48px 80px; }
}
@media (max-width:900px) {
  .gar__hero   { padding:calc(var(--navbar-h, 72px) + 40px) 24px 0; }
  .gar__hero-kamon { display:none; }
  .gar__edge-line  { display:none; }
  .gar__layout { grid-template-columns:1fr; padding:20px 24px 60px; }
  .gar__sidebar { position:static; max-height:none; padding-right:0; border-right:none; border-bottom:.5px solid var(--hair); padding-bottom:24px; margin-bottom:8px; }
  .gar__main   { padding:24px 0 0; }
  .gar__canais { grid-template-columns:1fr; }
  .gar__hero-inner { padding-left:0; }
  .gar__steps  { flex-direction:column; }
  .gar__step + .gar__step { border-left:none; border-top:.5px solid var(--hair); }
  .gar__step-arrow { display:none; }
}
@media (max-width:600px) {
  .gar__hero   { padding:calc(var(--navbar-h, 70px) + 28px) 16px 0; }
  .gar__layout { padding:16px 16px 48px; }
  .gar__hero-stats { flex-direction:column; gap:16px; }
  .gar__stat-sep { display:none; }
}
@media (prefers-reduced-motion: reduce) {
  .gar__t-gold,.gar__ticker-track,.gar__beam,
  .gar__hero-kamon,.gar__ew-dot { animation:none !important; }
}
</style>