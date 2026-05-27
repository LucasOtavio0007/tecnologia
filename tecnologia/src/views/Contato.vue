<template>
  <main class="contato">

    <!-- ══ FUNDO — pegada do footer ══ -->
    <div class="ct-bg" aria-hidden="true">
      <div class="ct-bg__kamon ct-bg__kamon--1">黒</div>
      <div class="ct-bg__kamon ct-bg__kamon--2">金</div>
      <div class="ct-bg__kamon ct-bg__kamon--3">連</div>
      <div class="ct-bg__realm-line"></div>
      <div class="ct-bg__grid"></div>
      <div class="ct-bg__beam ct-bg__beam--1"></div>
      <div class="ct-bg__beam ct-bg__beam--2"></div>
      <div class="ct-bg__grain"></div>
    </div>

    <!-- ══ CANTOS ORNAMENTAIS ══ -->
    <div class="ct-corner ct-corner--tl" aria-hidden="true"></div>
    <div class="ct-corner ct-corner--tr" aria-hidden="true"></div>
    <div class="ct-corner ct-corner--bl" aria-hidden="true"></div>
    <div class="ct-corner ct-corner--br" aria-hidden="true"></div>

    <!-- ══ BARRAS LATERAIS ══ -->
    <div class="ct-sidebar ct-sidebar--l" aria-hidden="true"></div>
    <div class="ct-sidebar ct-sidebar--r" aria-hidden="true"></div>

    <!-- ══ NÚMERO EDITORIAL ══ -->
    <div class="ct-editorial" aria-hidden="true">2026</div>

    <!-- ══ HERO ══ -->
    <section class="ct-hero">
      <div class="ct-hero__mon" aria-hidden="true">
        <svg viewBox="0 0 80 80" width="52" height="52">
          <circle cx="40" cy="40" r="36" fill="none" stroke="rgba(200,168,75,0.25)" stroke-width="0.5"/>
          <circle cx="40" cy="40" r="27" fill="none" stroke="rgba(200,168,75,0.14)" stroke-width="0.5"/>
          <path d="M40 10 L43.5 28 L40 25 L36.5 28 Z" fill="rgba(200,168,75,0.45)"/>
          <path d="M40 70 L43.5 52 L40 55 L36.5 52 Z" fill="rgba(200,168,75,0.45)"/>
          <path d="M10 40 L28 36.5 L25 40 L28 43.5 Z" fill="rgba(200,168,75,0.45)"/>
          <path d="M70 40 L52 36.5 L55 40 L52 43.5 Z" fill="rgba(200,168,75,0.45)"/>
          <circle cx="40" cy="40" r="5"  fill="none" stroke="rgba(200,168,75,0.5)" stroke-width="0.5"/>
          <circle cx="40" cy="40" r="2"  fill="rgba(200,168,75,0.55)"/>
        </svg>
      </div>
      <div class="ct-hero__kanji" aria-hidden="true">連絡<br/>の美</div>

      <div class="ct-hero__content">
        <div class="ct-hero__eyebrow">
          <span class="ct-hero__eyebrow-line" aria-hidden="true"></span>
          <span class="ct-hero__eyebrow-kanji" aria-hidden="true">黄金</span>
          <span class="eyebrow">Atendimento Exclusivo</span>
        </div>
        <h1 class="ct-titulo">
          <span class="ct-titulo__sup">Fale com</span>
          <em class="ct-titulo__em">nossos<br/>consultores</em>
        </h1>
        <p class="ct-sub">
          <span class="ct-sub__gem" aria-hidden="true">◆</span>
          Disponíveis 24h para clientes VIP · Tempo médio de resposta 2 horas
        </p>

        <!-- ══ CONFIANÇA HERO ══ -->
        <div class="ct-trust-strip">
          <div class="ct-trust-item" v-for="t in trust" :key="t.label">
            <div class="ct-trust-item__icon" v-html="t.icon" aria-hidden="true"></div>
            <div>
              <span class="ct-trust-item__val">{{ t.val }}</span>
              <span class="ct-trust-item__label">{{ t.label }}</span>
            </div>
          </div>
        </div>

        <!-- ══ REDES SOCIAIS ══ -->
        <div class="ct-sociais">
          <a v-for="s in sociais" :key="s.label" :href="s.href"
             class="ct-social" :aria-label="s.label"
             target="_blank" rel="noopener noreferrer">
            <span v-html="s.icon"></span>
          </a>
        </div>

        <div class="ct-hero__divider" aria-hidden="true">
          <span class="cthd__line"></span>
          <span class="cthd__char">永</span>
          <span class="cthd__line cthd__line--r"></span>
        </div>
      </div>
    </section>

    <!-- ══ CANAIS ══ -->
    <section class="ct-canais">
      <div class="ct-wrap">
        <div class="ct-section-hd">
          <span class="ct-sec-gem" aria-hidden="true">◆</span>
          <span class="eyebrow">Canais de Atendimento</span>
          <span class="ct-sec-line" aria-hidden="true"></span>
        </div>
        <div class="ct-canais__grid">
          <div v-for="c in canais" :key="c.titulo" class="ct-canal">
            <span class="ct-canal__corner ct-canal__corner--tl" aria-hidden="true"></span>
            <span class="ct-canal__corner ct-canal__corner--br" aria-hidden="true"></span>
            <div class="ct-canal__glow" aria-hidden="true"></div>
            <div class="ct-canal__kanji" aria-hidden="true">{{ c.kanji }}</div>
            <div class="ct-canal__icon" v-html="c.icon" aria-hidden="true"></div>
            <h3 class="ct-canal__titulo">{{ c.titulo }}</h3>
            <p class="ct-canal__desc">{{ c.desc }}</p>
            <span class="ct-canal__valor">{{ c.valor }}</span>
            <span class="ct-canal__tempo">{{ c.tempo }}</span>
            <!-- CTA direto WhatsApp -->
            <a v-if="c.href" :href="c.href" class="ct-canal__cta"
               target="_blank" rel="noopener noreferrer">
              Iniciar conversa
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <div class="ct-canal__line" aria-hidden="true"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══ DIVISOR ORIENTAL ══ -->
    <div class="ct-divider-or" aria-hidden="true">
      <div class="ctdo__line"></div>
      <div class="ctdo__mon">品</div>
      <div class="ctdo__line ctdo__line--r"></div>
    </div>

    <!-- ══ FORMULÁRIO + INFORMAÇÕES ══ -->
    <section class="ct-form-sec">
      <div class="ct-wrap ct-form-inner">

        <!-- Info lateral esquerda -->
        <div class="ct-info">
          <div class="ct-info__eyebrow">
            <span class="ct-info__ey-line" aria-hidden="true"></span>
            <span class="eyebrow">NOIR & OR · Atelier</span>
          </div>
          <h2 class="ct-info__titulo">
            <span>Venha nos</span>
            <em>visitar</em>
          </h2>

          <div class="ct-info__divider" aria-hidden="true">
            <span class="ctid__line"></span>
            <span class="ctid__char">護</span>
            <span class="ctid__line ctid__line--r"></span>
          </div>

          <div class="ct-info__rows">
            <div class="ct-info__row" v-for="row in infoRows" :key="row.label">
              <div class="ct-info__icon" v-html="row.icon" aria-hidden="true"></div>
              <div>
                <p class="ct-info__label">{{ row.label }}</p>
                <p v-for="val in row.vals" :key="val" class="ct-info__val">{{ val }}</p>
              </div>
            </div>
          </div>

          <!-- ══ HORÁRIO VISUAL ══ -->
          <div class="ct-horario">
            <div class="ct-horario__head">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              <span class="ct-horario__label">Horário de Funcionamento</span>
              <span class="ct-horario__clock">{{ brasiliaTime }} BRT</span>
            </div>
            <div class="ct-horario__grid">
              <div v-for="d in diasSemana" :key="d.dia" class="ct-horario__dia"
                   :class="{ hoje: d.hoje, fechado: d.fechado }">
                <span class="ct-horario__dia-nome">{{ d.dia }}</span>
                <span class="ct-horario__dia-hrs">{{ d.hrs }}</span>
                <span v-if="d.hoje" class="ct-horario__hoje-tag">hoje</span>
              </div>
            </div>
          </div>

          <div class="ct-info__badge">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            <span><span aria-hidden="true">◆</span> Atendimento VIP 24h para clientes cadastrados</span>
          </div>

          <div class="ct-info__kanji" aria-hidden="true">専</div>
        </div>

        <!-- Card formulário -->
        <div class="ct-form-card">
          <span class="ctfc__corner ctfc__corner--tl" aria-hidden="true"></span>
          <span class="ctfc__corner ctfc__corner--tr" aria-hidden="true"></span>
          <span class="ctfc__corner ctfc__corner--bl" aria-hidden="true"></span>
          <span class="ctfc__corner ctfc__corner--br" aria-hidden="true"></span>

          <div class="ct-section-hd ct-section-hd--left">
            <span class="ct-sec-gem" aria-hidden="true">◆</span>
            <span class="eyebrow">Envie uma Mensagem</span>
          </div>
          <h3 class="ct-form-titulo">Nos conte o que precisa</h3>

          <transition name="ct-fade-scale" mode="out-in">
            <div v-if="enviado" key="sucesso" class="ct-sucesso">
              <div class="ct-sucesso__mon" aria-hidden="true">
                <svg viewBox="0 0 80 80" width="80" height="80">
                  <circle cx="40" cy="40" r="36" fill="none" stroke="rgba(200,168,75,0.22)" stroke-width="0.5"/>
                  <circle cx="40" cy="40" r="28" fill="none" stroke="rgba(200,168,75,0.12)" stroke-width="0.5"/>
                  <circle cx="40" cy="40" r="20" fill="rgba(200,168,75,0.06)"/>
                </svg>
                <div class="ct-sucesso__check">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
              </div>
              <h3 class="ct-sucesso__titulo">Mensagem enviada</h3>
              <p class="ct-sucesso__sub">
                <span aria-hidden="true">◆</span>
                Nossa equipe retornará em até 2 horas
              </p>
              <p class="ct-sucesso__email-hint">Um e-mail de confirmação foi enviado para <em>{{ ultimoEmail }}</em></p>
              <button @click="enviado=false" class="ct-btn-nova">
                <span aria-hidden="true">◆</span> Enviar outra mensagem
              </button>
            </div>

            <div v-else key="form" class="ct-form-campos">
              <div class="ct-duplo">
                <div class="ct-campo">
                  <label for="ct-nome">Nome</label>
                  <input id="ct-nome" v-model="form.nome" placeholder="Seu nome" autocomplete="given-name"
                    @blur="validarCampo('nome')" :class="{ erro: erros.nome }"/>
                  <span v-if="erros.nome" class="ct-campo-erro">{{ erros.nome }}</span>
                </div>
                <div class="ct-campo">
                  <label for="ct-sobrenome">Sobrenome</label>
                  <input id="ct-sobrenome" v-model="form.sobrenome" placeholder="Sobrenome" autocomplete="family-name"/>
                </div>
              </div>
              <div class="ct-duplo">
                <div class="ct-campo">
                  <label for="ct-email">E-mail</label>
                  <input id="ct-email" v-model="form.email" type="email" placeholder="seu@email.com" autocomplete="email"
                    @blur="validarCampo('email')" :class="{ erro: erros.email }"/>
                  <span v-if="erros.email" class="ct-campo-erro">{{ erros.email }}</span>
                </div>
                <div class="ct-campo">
                  <label for="ct-telefone">Telefone</label>
                  <input id="ct-telefone" v-model="form.telefone" type="tel" placeholder="(31) 9 9999-9999" autocomplete="tel"/>
                </div>
              </div>
              <div class="ct-campo">
                <label for="ct-assunto">Assunto</label>
                <div class="ct-select-wrap">
                  <select id="ct-assunto" v-model="form.assunto" class="ct-select"
                    @blur="validarCampo('assunto')" :class="{ erro: erros.assunto }">
                    <option value="" disabled>Selecione um assunto</option>
                    <option>Consulta de produto</option>
                    <option>Encomenda personalizada</option>
                    <option>Dúvida sobre pedido</option>
                    <option>Parceria comercial</option>
                    <option>Outro</option>
                  </select>
                  <svg class="ct-select-arrow" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </div>
                <span v-if="erros.assunto" class="ct-campo-erro">{{ erros.assunto }}</span>
              </div>
              <div class="ct-campo">
                <label for="ct-mensagem">Mensagem</label>
                <textarea id="ct-mensagem" v-model="form.mensagem" placeholder="Descreva sua necessidade" rows="4"
                  @blur="validarCampo('mensagem')" :class="{ erro: erros.mensagem }"></textarea>
                <span v-if="erros.mensagem" class="ct-campo-erro">{{ erros.mensagem }}</span>
              </div>

              <transition name="ct-err">
                <p v-if="erroForm" class="ct-erro">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  {{ erroForm }}
                </p>
              </transition>

              <button class="ct-btn-enviar" @click="enviar" :disabled="loading" :aria-disabled="loading">
                <span class="ct-btn-enviar__shimmer" aria-hidden="true"></span>
                <span v-if="!loading" class="ct-btn-enviar__inner">
                  <span aria-hidden="true">◆</span>
                  Enviar Mensagem
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </span>
                <span v-else class="spinner" aria-label="Enviando…"></span>
              </button>
            </div>
          </transition>
        </div>
      </div>
    </section>

    <!-- ══ DIVISOR ORIENTAL 2 ══ -->
    <div class="ct-divider-or" aria-hidden="true">
      <div class="ctdo__line"></div>
      <div class="ctdo__mon">所</div>
      <div class="ctdo__line ctdo__line--r"></div>
    </div>

    <!-- ══ ATELIER + MAPA ══ -->
    <section class="ct-atelier">
      <div class="ct-wrap ct-atelier__inner">

        <!-- Foto do atelier -->
        <div class="ct-atelier__foto-wrap">
          <div class="ct-atelier__foto">
            <!-- overlay dourado sobre a imagem -->
            <div class="ct-atelier__foto-overlay" aria-hidden="true"></div>
            <!-- Placeholder — substitua por <img> quando tiver a foto -->
            <div class="ct-atelier__placeholder" aria-hidden="true">
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="rgba(200,168,75,0.35)" stroke-width="0.8">
                <rect x="3" y="3" width="18" height="18" rx="1"/><circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
              <span>Foto do Atelier</span>
            </div>
            <!-- Cantos ornamentais -->
            <span class="ct-atelier__fc ct-atelier__fc--tl" aria-hidden="true"></span>
            <span class="ct-atelier__fc ct-atelier__fc--br" aria-hidden="true"></span>
          </div>
          <!-- Badge sobre a foto -->
          <div class="ct-atelier__badge">
            <span aria-hidden="true">◆</span> Visitas com agendamento · Seg–Sáb
          </div>
        </div>

        <!-- Mapa estilizado -->
        <div class="ct-mapa-wrap">
          <div class="ct-section-hd">
            <span class="ct-sec-gem" aria-hidden="true">◆</span>
            <span class="eyebrow">Localização</span>
          </div>
          <h2 class="ct-atelier__titulo">
            <span>Nosso</span>
            <em>Atelier</em>
          </h2>
          <p class="ct-atelier__desc">
            Localizado no coração histórico de Sabará, MG, nosso espaço une a arquitetura colonial mineira ao ambiente refinado de uma joalheria contemporânea.
          </p>

          <!-- Frame do Google Maps dark mode -->
          <div class="ct-mapa">
            <span class="ct-mapa__corner ct-mapa__corner--tl" aria-hidden="true"></span>
            <span class="ct-mapa__corner ct-mapa__corner--br" aria-hidden="true"></span>
            <iframe
              title="Localização do Atelier Noir & Or em Sabará, MG"
              src="https://maps.google.com/maps?q=Sabar%C3%A1,MG,Brasil&t=&z=14&ie=UTF8&iwloc=&output=embed"
              class="ct-mapa__iframe"
              loading="lazy"
              allowfullscreen
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
            <div class="ct-mapa__overlay" aria-hidden="true"></div>
          </div>

          <a href="https://maps.google.com/?q=Sabará,MG" target="_blank" rel="noopener noreferrer" class="ct-mapa__cta">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
            Abrir no Google Maps
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </section>

    <!-- ══ FAQ ══ -->
    <section class="ct-faq">
      <div class="ct-wrap">
        <div class="ct-faq__hd">
          <div class="ct-section-hd">
            <span class="ct-sec-gem" aria-hidden="true">◆</span>
            <span class="eyebrow">Perguntas Frequentes</span>
            <span class="ct-sec-line" aria-hidden="true"></span>
          </div>
          <h2 class="ct-faq__titulo">Tire suas <em>dúvidas</em></h2>
        </div>
        <div class="ct-faq__lista">
          <div
            v-for="(f, i) in faq" :key="i"
            class="ct-faq__item"
            :class="{ active: faqAberto === i }"
            @click="faqAberto = faqAberto === i ? null : i"
            role="button" tabindex="0"
            :aria-expanded="faqAberto === i"
            @keyup.enter="faqAberto = faqAberto === i ? null : i"
            @keyup.space.prevent="faqAberto = faqAberto === i ? null : i"
          >
            <div class="ct-faq__pergunta">
              <span class="ct-faq__bullet" :class="{ active: faqAberto === i }" aria-hidden="true">◆</span>
              <span>{{ f.p }}</span>
              <div class="ct-faq__chevron" :class="{ open: faqAberto === i }" aria-hidden="true">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </div>
            </div>
            <transition name="faq-slide">
              <div v-if="faqAberto === i" class="ct-faq__resp">
                <span class="ct-faq__resp-bar" aria-hidden="true"></span>
                {{ f.r }}
              </div>
            </transition>
          </div>
        </div>
      </div>
    </section>

  </main>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

/* ── Estado ── */
const enviado    = ref(false)
const loading    = ref(false)
const erroForm   = ref('')
const faqAberto  = ref(null)
const ultimoEmail = ref('')
const form = ref({ nome:'', sobrenome:'', email:'', telefone:'', assunto:'', mensagem:'' })
const erros = ref({ nome:'', email:'', assunto:'', mensagem:'' })

/* ── Relógio BRT ── */
const brasiliaTime = ref('')
let clockInterval = null
const updateClock = () => {
  brasiliaTime.value = new Date().toLocaleTimeString('pt-BR', {
    timeZone: 'America/Sao_Paulo', hour:'2-digit', minute:'2-digit'
  })
}
onMounted(() => { updateClock(); clockInterval = setInterval(updateClock, 1000) })
onUnmounted(() => clearInterval(clockInterval))

/* ── Dia da semana atual ── */
const diaSemanaAtual = new Date().toLocaleDateString('pt-BR', { timeZone:'America/Sao_Paulo', weekday:'short' }).replace('.','')

const diasSemana = computed(() => [
  { dia:'Seg', hrs:'9h–18h',  fechado:false },
  { dia:'Ter', hrs:'9h–18h',  fechado:false },
  { dia:'Qua', hrs:'9h–18h',  fechado:false },
  { dia:'Qui', hrs:'9h–18h',  fechado:false },
  { dia:'Sex', hrs:'9h–18h',  fechado:false },
  { dia:'Sáb', hrs:'10h–14h', fechado:false },
  { dia:'Dom', hrs:'Fechado',  fechado:true  },
].map(d => ({
  ...d,
  hoje: d.dia.toLowerCase().startsWith(diaSemanaAtual.toLowerCase().slice(0,3))
})))

/* ── Trust indicators ── */
const trust = [
  {
    val: '+500',
    label: 'clientes atendidos',
    icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(200,168,75,0.7)" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  },
  {
    val: '8 anos',
    label: 'no mercado',
    icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(200,168,75,0.7)" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  },
  {
    val: '100%',
    label: 'garantia vitalícia',
    icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(200,168,75,0.7)" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  },
  {
    val: '⌀ 2h',
    label: 'tempo de resposta',
    icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(200,168,75,0.7)" stroke-width="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12"/><path d="M1 1l22 22"/></svg>',
  },
]

/* ── Redes sociais ── */
const sociais = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/noiror',
    icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 1c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V6c0-1.66 1.34-3 3-3h10zm-5 3.5a5 5 0 100 10 5 5 0 000-10zm0 1.5a3.5 3.5 0 110 7 3.5 3.5 0 010-7zm4.75-.25a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z"/></svg>',
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/5531999999999',
    icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.554 4.12 1.523 5.851L.057 23.929l6.283-1.455A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.979 9.979 0 0 1-5.153-1.432l-.371-.221-3.807.883.91-3.701-.244-.389A9.953 9.953 0 0 1 2 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z"/></svg>',
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com/@noiror',
    icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.87.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z"/></svg>',
  },
  {
    label: 'Pinterest',
    href: 'https://pinterest.com/noiror',
    icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>',
  },
]

/* ── Canais ── */
const canais = [
  {
    kanji: '話',
    titulo: 'WhatsApp VIP',
    desc:   'Atendimento imediato para clientes cadastrados',
    valor:  '+55 (31) 9 9999-9999',
    tempo:  'Resposta imediata',
    href:   'https://wa.me/5531999999999?text=Olá,%20gostaria%20de%20atendimento%20VIP',
    icon:   '<svg width="26" height="26" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.554 4.12 1.523 5.851L.057 23.929l6.283-1.455A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.979 9.979 0 0 1-5.153-1.432l-.371-.221-3.807.883.91-3.701-.244-.389A9.953 9.953 0 0 1 2 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z"/></svg>',
  },
  {
    kanji: '文',
    titulo: 'E-mail',
    desc:   'Respondemos em até 2 horas úteis',
    valor:  'contato@noiror.com.br',
    tempo:  'Até 2 horas úteis',
    href:   'mailto:contato@noiror.com.br',
    icon:   '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="rgba(200,168,75,0.8)" stroke-width="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
  },
  {
    kanji: '声',
    titulo: 'Telefone',
    desc:   'Seg–Sex das 9h às 18h',
    valor:  '(31) 3333-3333',
    tempo:  'Horário comercial',
    href:   'tel:+553133333333',
    icon:   '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="rgba(200,168,75,0.8)" stroke-width="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.38 2 2 0 0 1 3.64 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
  },
  {
    kanji: '所',
    titulo: 'Atelier',
    desc:   'Visitas com agendamento prévio',
    valor:  'Sabará, MG',
    tempo:  'Seg–Sáb (agendamento)',
    href:   'https://maps.google.com/?q=Sabará,MG',
    icon:   '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="rgba(200,168,75,0.8)" stroke-width="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  },
]

/* ── Info rows ── */
const infoRows = [
  {
    label: 'Endereço',
    vals:  ['Rua das Artes, 240', 'Sabará, MG'],
    icon:  '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(200,168,75,0.75)" stroke-width="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  },
  {
    label: 'Telefone',
    vals:  ['+55 (31) 9 9999-9999'],
    icon:  '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(200,168,75,0.75)" stroke-width="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.38 2 2 0 0 1 3.64 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
  },
  {
    label: 'E-mail',
    vals:  ['contato@noiror.com.br'],
    icon:  '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(200,168,75,0.75)" stroke-width="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
  },
]

/* ── FAQ ── */
const faq = [
  { p:'Qual o prazo de entrega?',                   r:'Para produtos em estoque o prazo é de 5 a 10 dias úteis. Peças sob encomenda levam de 30 a 90 dias.' },
  { p:'A peça mantém a garantia original?',         r:'Sim. Nosso processo não viola vedações internas. A garantia do fabricante é mantida. Adicionamos garantia vitalícia no revestimento.' },
  { p:'Posso encomendar um produto personalizado?', r:'Sim! Aceitamos encomendas com especificações personalizadas: tipo de metal, textura, gravação a laser e embalagem especial.' },
  { p:'Qual a diferença entre ouro 18k e 24k?',    r:'O ouro 24k é puro (99,9%), oferece a cor mais intensa. O 18k contém 75% de ouro e é mais resistente ao desgaste.' },
  { p:'Fazem envio internacional?',                 r:'Atualmente atendemos apenas o Brasil. Envio internacional está previsto para 2026.' },
]

/* ── Validação inline ── */
const validarCampo = (campo) => {
  erros.value[campo] = ''
  if (campo === 'nome'     && !form.value.nome.trim())         erros.value.nome     = 'Informe seu nome.'
  if (campo === 'email'    && !form.value.email.includes('@')) erros.value.email    = 'E-mail inválido.'
  if (campo === 'assunto'  && !form.value.assunto)             erros.value.assunto  = 'Selecione um assunto.'
  if (campo === 'mensagem' && !form.value.mensagem.trim())     erros.value.mensagem = 'Escreva sua mensagem.'
}

/* ── Envio ── */
const enviar = async () => {
  erroForm.value = ''
  validarCampo('nome'); validarCampo('email'); validarCampo('assunto'); validarCampo('mensagem')
  if (Object.values(erros.value).some(e => e)) { erroForm.value = 'Corrija os campos destacados.'; return }
  loading.value = true
  ultimoEmail.value = form.value.email
  await new Promise(r => setTimeout(r, 900))
  loading.value = false
  enviado.value = true
  form.value = { nome:'', sobrenome:'', email:'', telefone:'', assunto:'', mensagem:'' }
  erros.value  = { nome:'', email:'', assunto:'', mensagem:'' }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Syne:wght@400;500;600;700;800&family=DM+Mono:wght@300;400&display=swap');

/* ══ TOKENS — alinhados ao footer ══ */
.contato {
  --ct-gold:   #C8A84B;
  --ct-gold2:  #F5D78E;
  --ct-void:   #09090f;
  --ct-deep:   #09090f;
  --ct-surf:   #0d0d14;
  --ct-surf2:  #111118;
  --ct-text:   rgba(237,232,224,0.92);
  --ct-text2:  rgba(237,232,224,0.50);
  --ct-text3:  rgba(237,232,224,0.22);
  --ct-text4:  rgba(237,232,224,0.10);
  --ct-hair:   rgba(237,232,224,0.07);
  --ct-hairH:  rgba(200,168,75,0.38);
  --ct-gold3:  rgba(200,168,75,0.06);
  --ease:      cubic-bezier(0.16,1,0.30,1);

  background:  var(--ct-deep);
  color:       var(--ct-text);
  font-family: 'Syne', sans-serif;
  padding-top: var(--navbar-h, 88px);
  min-height:  100vh;
  position:    relative;
  overflow-x:  hidden;
}

/* ══ KEYFRAMES ══ */
@keyframes beamSway    { from{transform:skewX(-5deg) translateX(-20px)} to{transform:skewX(5deg) translateX(20px)} }
@keyframes kanjiPulse  { 0%,100%{opacity:.025} 50%{opacity:.05} }
@keyframes monSpin     { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
@keyframes cornerGlow  { from{border-color:rgba(200,168,75,.08)} to{border-color:rgba(200,168,75,.28)} }
@keyframes goldShine   { from{background-position:0% center} to{background-position:200% center} }
@keyframes lineExpand  { to{width:160px} }
@keyframes shimmerPass { 0%{left:-100%} 65%,100%{left:130%} }
@keyframes heroFadeIn  { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
@keyframes errShake    { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-4px)} 75%{transform:translateX(4px)} }
@keyframes spin        { to{transform:rotate(360deg)} }
@keyframes trustIn     { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }

/* ══ FUNDO — pegada do footer ══ */
.ct-bg {
  position: fixed; inset: 0; z-index: 0; pointer-events: none;
  background: var(--ct-deep);
}

/* Kamons grandes — igual ao footer */
.ct-bg__kamon {
  position: absolute;
  font-family: 'Noto Serif JP', 'Yu Mincho', 'Hiragino Mincho Pro', serif;
  font-weight: 300; color: var(--ct-gold);
  pointer-events: none; user-select: none; line-height: 1;
  animation: kanjiPulse 9s ease-in-out infinite;
}
.ct-bg__kamon--1 {
  font-size: clamp(200px, 28vw, 380px);
  bottom: -80px; right: -50px;
  opacity: .025;
}
.ct-bg__kamon--2 {
  font-size: clamp(120px, 18vw, 220px);
  top: 60px; left: -40px;
  opacity: .018;
  animation-delay: -3s;
}
.ct-bg__kamon--3 {
  font-size: clamp(80px, 12vw, 140px);
  top: 40%; right: 8%;
  opacity: .012;
  animation-delay: -6s;
}

/* Linha realm — igual ao footer */
.ct-bg__realm-line {
  position: absolute; top: 0; left: 0; right: 0; height: .5px;
  background: linear-gradient(
    90deg,
    transparent 0%, transparent 6%,
    rgba(200,168,75,.5) 20%,
    var(--ct-gold) 50%,
    rgba(200,168,75,.5) 80%,
    transparent 94%, transparent 100%
  );
  opacity: .55;
}

/* Grid sutil */
.ct-bg__grid {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(237,232,224,.018) 1px, transparent 1px),
    linear-gradient(90deg, rgba(237,232,224,.018) 1px, transparent 1px);
  background-size: 64px 64px;
  mask-image: radial-gradient(ellipse 100% 80% at 50% 30%, black 20%, transparent 100%);
}

/* Beams */
.ct-bg__beam {
  position: absolute; top: -20%; width: 1px; height: 140%;
  background: linear-gradient(to bottom, transparent, rgba(200,168,75,.14), transparent);
  filter: blur(3px);
  animation: beamSway 13s ease-in-out infinite alternate;
}
.ct-bg__beam--1 { left: 18%; }
.ct-bg__beam--2 { left: 72%; filter:blur(5px); animation-delay:-6s; animation-direction:alternate-reverse; opacity:.5; }

/* Grain */
.ct-bg__grain {
  position: absolute; inset: 0; opacity: .018;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
}

/* ══ CANTOS ══ */
.ct-corner {
  position: fixed; z-index: 3; width: 22px; height: 22px;
  border-color: rgba(200,168,75,.12); border-style: solid;
  pointer-events: none; animation: cornerGlow 4s infinite alternate;
}
.ct-corner--tl { top:18px; left:18px;  border-width:1px 0 0 1px; }
.ct-corner--tr { top:18px; right:18px; border-width:1px 1px 0 0; }
.ct-corner--bl { bottom:18px; left:18px;  border-width:0 0 1px 1px; }
.ct-corner--br { bottom:18px; right:18px; border-width:0 1px 1px 0; }

/* ══ BARRAS LATERAIS ══ */
.ct-sidebar {
  position: fixed; top:0; bottom:0; z-index:2;
  width:.5px; pointer-events:none;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(200,168,75,.14) 20%,
    rgba(200,168,75,.28) 50%,
    rgba(200,168,75,.14) 80%,
    transparent 100%
  );
}
.ct-sidebar--l { left:52px; }
.ct-sidebar--r { right:52px; }

/* ══ EDITORIAL NUMBER ══ */
.ct-editorial {
  position: fixed; bottom:-2%; right:5%; z-index:1;
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(110px,16vw,200px); font-weight:300;
  color:transparent; -webkit-text-stroke:1px rgba(200,168,75,.04);
  pointer-events:none; user-select:none; line-height:1;
}

/* ══ WRAP ══ */
.ct-wrap { max-width:1380px; margin:0 auto; padding:0 80px; }

/* ══ EYEBROW ══ */
.eyebrow {
  font-size:9px; letter-spacing:7px; font-weight:700;
  text-transform:uppercase; display:inline-block;
  background:linear-gradient(135deg,var(--ct-gold),var(--ct-gold2));
  -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
}

/* ══ SECTION HEADER ══ */
.ct-section-hd { display:flex; align-items:center; gap:12px; margin-bottom:36px; }
.ct-section-hd--left { margin-bottom:8px; }
.ct-sec-gem { font-size:5px; color:var(--ct-gold); opacity:.5; flex-shrink:0; }
.ct-sec-line { flex:1; height:.5px; background:linear-gradient(to right,rgba(200,168,75,.2),transparent); }

/* ══ HERO ══ */
.ct-hero {
  position:relative; z-index:2;
  padding:88px 80px 72px;
  border-bottom:.5px solid var(--ct-hair);
  overflow:hidden;
}
.ct-hero__mon {
  position:absolute; top:88px; right:80px;
  animation:monSpin 28s linear infinite; opacity:.6;
  pointer-events:none; z-index:1;
}
.ct-hero__kanji {
  position:absolute; right:5%; top:50%; transform:translateY(-60%);
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(2rem,4vw,3.5rem); font-weight:300;
  color:transparent; -webkit-text-stroke:.5px rgba(200,168,75,.07);
  letter-spacing:.2em; writing-mode:vertical-rl;
  pointer-events:none; z-index:1;
  animation:kanjiPulse 8s ease-in-out infinite;
}
.ct-hero__content {
  position:relative; z-index:2; max-width:820px;
  animation:heroFadeIn .8s cubic-bezier(.22,1,.36,1) both;
}
.ct-hero__eyebrow { display:flex; align-items:center; gap:12px; margin-bottom:24px; }
.ct-hero__eyebrow-line {
  display:block; width:38px; height:.5px;
  background:linear-gradient(to right,transparent,rgba(200,168,75,.4));
  flex-shrink:0;
}
.ct-hero__eyebrow-kanji {
  font-family:'Cormorant Garamond',serif;
  font-size:1.05rem; font-style:italic; color:var(--ct-gold); opacity:.35;
}

/* Título */
.ct-titulo { font-family:'Cormorant Garamond',serif; line-height:.92; margin-bottom:22px; }
.ct-titulo__sup {
  display:block;
  font-size:clamp(1.5rem,3vw,2.4rem); font-weight:500;
  color:var(--ct-text2); letter-spacing:8px;
  font-family:'Syne',sans-serif; text-transform:uppercase;
  margin-bottom:8px;
}
.ct-titulo__em {
  display:block; font-style:italic;
  font-size:clamp(4rem,9vw,8.5rem); font-weight:300;
  background:linear-gradient(135deg,#E8E0C8 0%,#D4AF37 40%,#F5E6A3 70%,#C8A84B 100%);
  background-size:200% auto;
  -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent;
  animation:goldShine 6s linear infinite;
  line-height:.95;
}
.ct-sub {
  font-family:'DM Mono',monospace; font-size:9px; letter-spacing:2.5px;
  color:var(--ct-text3); text-transform:uppercase; margin-bottom:28px;
  display:flex; align-items:center; gap:12px;
}
.ct-sub__gem { font-size:5px; color:var(--ct-gold); opacity:.5; flex-shrink:0; }

/* ══ TRUST STRIP ══ */
.ct-trust-strip {
  display:flex; gap:24px; flex-wrap:wrap;
  margin-bottom:24px;
  padding:18px 20px;
  background:rgba(200,168,75,.03);
  border:.5px solid var(--ct-hair);
  animation:trustIn .8s .4s cubic-bezier(.22,1,.36,1) both;
}
.ct-trust-item {
  display:flex; align-items:center; gap:10px;
  flex:1; min-width:120px;
}
.ct-trust-item__icon { flex-shrink:0; }
.ct-trust-item__val {
  display:block;
  font-family:'Cormorant Garamond',serif; font-size:1.1rem; font-style:italic;
  color:var(--ct-gold); line-height:1;
}
.ct-trust-item__label {
  display:block; font-family:'DM Mono',monospace;
  font-size:7px; letter-spacing:2px; text-transform:uppercase;
  color:var(--ct-text3); margin-top:2px;
}

/* ══ REDES SOCIAIS ══ */
.ct-sociais { display:flex; gap:8px; margin-bottom:28px; }
.ct-social {
  width:32px; height:32px; border-radius:50%;
  border:.5px solid var(--ct-hair);
  display:flex; align-items:center; justify-content:center;
  color:var(--ct-text3); text-decoration:none;
  transition:all .4s var(--ease);
  background:none;
}
.ct-social:hover {
  background:var(--ct-gold3); border-color:var(--ct-gold);
  color:var(--ct-gold); transform:translateY(-2px) scale(1.06);
}

/* Divisor hero */
.ct-hero__divider { display:flex; align-items:center; gap:14px; }
.cthd__line {
  display:block; width:0; height:.5px;
  background:linear-gradient(to right,rgba(200,168,75,.5),transparent);
  animation:lineExpand 1.2s .9s cubic-bezier(.16,1,.3,1) forwards;
}
.cthd__line--r { background:linear-gradient(to left,rgba(200,168,75,.25),transparent); animation-delay:1.1s; }
.cthd__char { font-family:'Cormorant Garamond',serif; font-size:.95rem; font-style:italic; color:var(--ct-gold); opacity:.35; }

/* ══ CANAIS ══ */
.ct-canais { padding:64px 0; border-bottom:.5px solid var(--ct-hair); position:relative; z-index:2; }
.ct-canais__grid {
  display:grid; grid-template-columns:repeat(4,1fr); gap:0;
  border-left:.5px solid var(--ct-hair); border-top:.5px solid var(--ct-hair);
}
.ct-canal {
  padding:36px 28px 28px;
  border-right:.5px solid var(--ct-hair); border-bottom:.5px solid var(--ct-hair);
  position:relative; overflow:hidden;
  background:var(--ct-surf); transition:background .4s;
  display:flex; flex-direction:column;
}
.ct-canal:hover { background:rgba(200,168,75,.02); }
.ct-canal::before {
  content:''; position:absolute; top:0; left:0; right:0; height:.5px;
  background:linear-gradient(90deg,var(--ct-gold),transparent);
  opacity:0; transition:opacity .5s;
}
.ct-canal:hover::before { opacity:.4; }
.ct-canal__corner {
  position:absolute; width:14px; height:14px;
  border-color:rgba(200,168,75,.18); border-style:solid;
  pointer-events:none; opacity:0; transition:opacity .3s;
}
.ct-canal:hover .ct-canal__corner { opacity:1; }
.ct-canal__corner--tl { top:8px; left:8px;  border-width:.5px 0 0 .5px; }
.ct-canal__corner--br { bottom:8px; right:8px; border-width:0 .5px .5px 0; }
.ct-canal__glow {
  position:absolute; bottom:-50px; left:50%; transform:translateX(-50%);
  width:120px; height:120px; border-radius:50%;
  background:radial-gradient(circle,rgba(200,168,75,.08),transparent 70%);
  opacity:0; transition:opacity .5s; pointer-events:none;
}
.ct-canal:hover .ct-canal__glow { opacity:1; }
.ct-canal__kanji {
  position:absolute; right:10px; top:6px;
  font-family:'Cormorant Garamond',serif;
  font-size:2.8rem; font-weight:300; font-style:italic;
  color:var(--ct-gold); opacity:.05; pointer-events:none;
  animation:kanjiPulse 7s ease-in-out infinite; transition:opacity .4s;
}
.ct-canal:hover .ct-canal__kanji { opacity:.12; }
.ct-canal__icon { margin-bottom:18px; opacity:.75; transition:opacity .3s,transform .4s var(--ease); }
.ct-canal:hover .ct-canal__icon { opacity:1; transform:scale(1.06); }
.ct-canal__titulo {
  font-family:'Syne',sans-serif; font-size:10px; font-weight:700;
  letter-spacing:.22em; text-transform:uppercase; color:var(--ct-text); margin:0 0 8px;
}
.ct-canal__desc { font-size:11px; color:var(--ct-text3); line-height:1.75; margin:0 0 10px; }
.ct-canal__valor {
  font-family:'Cormorant Garamond',serif;
  font-size:1rem; font-style:italic; color:var(--ct-gold); display:block;
}
.ct-canal__tempo {
  font-family:'DM Mono',monospace; font-size:7.5px;
  letter-spacing:2px; text-transform:uppercase;
  color:var(--ct-text4); margin-top:4px; margin-bottom:14px;
}
.ct-canal__cta {
  display:inline-flex; align-items:center; gap:6px; margin-top:auto;
  font-family:'DM Mono',monospace; font-size:7.5px;
  letter-spacing:2.5px; text-transform:uppercase;
  color:var(--ct-gold); text-decoration:none; opacity:.6;
  transition:opacity .25s,gap .25s;
}
.ct-canal:hover .ct-canal__cta { opacity:1; gap:10px; }
.ct-canal__line {
  position:absolute; bottom:0; left:0;
  width:0; height:.5px;
  background:linear-gradient(to right,var(--ct-gold),transparent);
  transition:width .5s var(--ease);
}
.ct-canal:hover .ct-canal__line { width:100%; }

/* ══ DIVISOR ORIENTAL ══ */
.ct-divider-or {
  position:relative; display:flex; align-items:center; justify-content:center;
  padding:40px 0; background:var(--ct-deep); z-index:2;
  border-top:.5px solid var(--ct-hair); border-bottom:.5px solid var(--ct-hair);
}
.ctdo__line { flex:1; max-width:160px; height:.5px; background:linear-gradient(to right,transparent,rgba(200,168,75,.2)); }
.ctdo__line--r { background:linear-gradient(to left,transparent,rgba(200,168,75,.2)); }
.ctdo__mon {
  width:46px; height:46px; border-radius:50%;
  border:.5px solid rgba(200,168,75,.2);
  display:flex; align-items:center; justify-content:center;
  font-family:'Cormorant Garamond',serif; font-size:1.15rem; font-style:italic;
  color:var(--ct-gold); opacity:.5; margin:0 20px; position:relative;
}
.ctdo__mon::before { content:''; position:absolute; inset:4px; border-radius:50%; border:.5px solid var(--ct-hair); }

/* ══ FORMULÁRIO ══ */
.ct-form-sec { padding:72px 0; position:relative; z-index:2; }
.ct-form-inner { display:grid; grid-template-columns:1fr 1.55fr; gap:80px; align-items:start; }

/* Info lateral */
.ct-info { position:relative; }
.ct-info__eyebrow { display:flex; align-items:center; gap:10px; margin-bottom:12px; }
.ct-info__ey-line {
  display:block; width:28px; height:.5px;
  background:linear-gradient(to right,transparent,rgba(200,168,75,.4));
  flex-shrink:0;
}
.ct-info__titulo {
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(2.2rem,4vw,3.6rem); font-weight:300;
  line-height:1; margin:0 0 20px; color:var(--ct-text);
}
.ct-info__titulo span { display:block; }
.ct-info__titulo em {
  display:block; font-style:italic;
  background:linear-gradient(135deg,var(--ct-gold),var(--ct-gold2));
  -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
}
.ct-info__divider { display:flex; align-items:center; gap:10px; margin-bottom:28px; }
.ctid__line { flex:1; max-width:44px; height:.5px; background:linear-gradient(to right,transparent,rgba(200,168,75,.2)); }
.ctid__line--r { max-width:none; flex:1; background:linear-gradient(to left,transparent,rgba(200,168,75,.2)); }
.ctid__char { font-family:'Cormorant Garamond',serif; font-size:.9rem; font-style:italic; color:var(--ct-gold); opacity:.35; }

.ct-info__rows { display:flex; flex-direction:column; gap:0; margin-bottom:20px; }
.ct-info__row {
  display:flex; gap:14px; align-items:flex-start;
  padding:16px 0; border-bottom:.5px solid var(--ct-hair);
  transition:padding-left .25s;
}
.ct-info__row:first-child { border-top:.5px solid var(--ct-hair); }
.ct-info__row:hover { padding-left:6px; }
.ct-info__icon {
  flex-shrink:0; width:30px; height:30px;
  background:rgba(200,168,75,.04); border:.5px solid var(--ct-hair);
  display:flex; align-items:center; justify-content:center;
  transition:border-color .25s,background .25s;
}
.ct-info__row:hover .ct-info__icon { border-color:var(--ct-hairH); background:rgba(200,168,75,.08); }
.ct-info__label {
  font-family:'DM Mono',monospace; font-size:7px; letter-spacing:4px;
  text-transform:uppercase; color:var(--ct-gold); opacity:.65; margin-bottom:4px;
}
.ct-info__val { font-size:12px; color:var(--ct-text2); line-height:1.65; }

/* ══ HORÁRIO VISUAL ══ */
.ct-horario {
  margin-bottom:20px;
  padding:16px;
  background:rgba(200,168,75,.03);
  border:.5px solid var(--ct-hair);
}
.ct-horario__head {
  display:flex; align-items:center; gap:7px; margin-bottom:12px;
}
.ct-horario__head svg { color:var(--ct-gold); opacity:.45; flex-shrink:0; }
.ct-horario__label {
  font-family:'DM Mono',monospace; font-size:7px;
  letter-spacing:.44em; text-transform:uppercase;
  color:var(--ct-text3); font-weight:600;
}
.ct-horario__clock {
  font-family:'DM Mono',monospace; font-size:10px;
  color:var(--ct-gold); margin-left:auto; letter-spacing:.08em; opacity:.7;
}
.ct-horario__grid {
  display:grid; grid-template-columns:repeat(7,1fr); gap:3px;
}
.ct-horario__dia {
  display:flex; flex-direction:column; align-items:center;
  padding:8px 4px;
  border:.5px solid var(--ct-hair);
  position:relative; transition:border-color .25s;
  text-align:center;
}
.ct-horario__dia.hoje {
  border-color:rgba(200,168,75,.3);
  background:rgba(200,168,75,.05);
}
.ct-horario__dia.fechado { opacity:.4; }
.ct-horario__dia-nome {
  font-family:'DM Mono',monospace; font-size:7px;
  letter-spacing:1px; text-transform:uppercase;
  color:var(--ct-text3); margin-bottom:4px;
}
.ct-horario__dia.hoje .ct-horario__dia-nome { color:var(--ct-gold); opacity:.8; }
.ct-horario__dia-hrs {
  font-size:8px; color:var(--ct-text3); line-height:1.3;
}
.ct-horario__hoje-tag {
  position:absolute; top:-1px; left:50%; transform:translateX(-50%);
  font-family:'DM Mono',monospace; font-size:6px; letter-spacing:1px;
  background:var(--ct-gold); color:#09090f;
  padding:1px 4px; white-space:nowrap;
}

.ct-info__badge {
  display:flex; align-items:center; gap:10px; padding:11px 14px;
  background:rgba(200,168,75,.03); border:.5px solid var(--ct-hair);
  color:var(--ct-text4); font-family:'DM Mono',monospace; font-size:8px; letter-spacing:1.5px;
}
.ct-info__badge svg { color:var(--ct-gold); flex-shrink:0; }
.ct-info__kanji {
  position:absolute; right:-10px; top:50%; transform:translateY(-50%);
  font-family:'Cormorant Garamond',serif;
  font-size:5rem; font-weight:300; font-style:italic;
  color:transparent; -webkit-text-stroke:.5px rgba(200,168,75,.06);
  pointer-events:none; animation:kanjiPulse 9s ease-in-out infinite;
  writing-mode:vertical-rl; line-height:1;
}

/* Card form */
.ct-form-card {
  background:var(--ct-surf); border:.5px solid var(--ct-hair);
  padding:44px; position:relative; overflow:hidden;
  transition:border-color .3s;
}
.ct-form-card:hover { border-color:rgba(200,168,75,.18); }
.ct-form-card::before {
  content:''; position:absolute; top:-80px; right:-80px;
  width:220px; height:220px; border-radius:50%;
  background:radial-gradient(circle,rgba(200,168,75,.04) 0%,transparent 70%);
  pointer-events:none;
}
.ctfc__corner {
  position:absolute; width:16px; height:16px;
  border-color:rgba(200,168,75,.18); border-style:solid; pointer-events:none;
}
.ctfc__corner--tl { top:10px; left:10px;  border-width:.5px 0 0 .5px; }
.ctfc__corner--tr { top:10px; right:10px; border-width:.5px .5px 0 0; }
.ctfc__corner--bl { bottom:10px; left:10px;  border-width:0 0 .5px .5px; }
.ctfc__corner--br { bottom:10px; right:10px; border-width:0 .5px .5px 0; }

.ct-form-titulo {
  font-family:'Cormorant Garamond',serif;
  font-size:1.7rem; font-weight:300; font-style:italic;
  color:var(--ct-text); margin:8px 0 28px;
}
.ct-form-campos { display:flex; flex-direction:column; gap:18px; }
.ct-duplo { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
.ct-campo { display:flex; flex-direction:column; gap:7px; }
.ct-campo label {
  font-family:'DM Mono',monospace; font-size:7px; letter-spacing:4px;
  text-transform:uppercase; color:var(--ct-gold); opacity:.65;
}
.ct-campo input,
.ct-select,
.ct-campo textarea {
  background:rgba(255,255,255,.02); border:.5px solid var(--ct-hair);
  padding:11px 14px;
  color:var(--ct-text); font-family:'Syne',sans-serif; font-size:12.5px;
  outline:none; transition:border-color .25s,box-shadow .25s; width:100%;
}
.ct-campo input::placeholder,
.ct-campo textarea::placeholder { color:var(--ct-text4); }
.ct-campo input:focus,
.ct-select:focus,
.ct-campo textarea:focus {
  border-color:var(--ct-hairH);
  box-shadow:0 0 0 3px rgba(200,168,75,.06);
}
.ct-campo input.erro,
.ct-select.erro,
.ct-campo textarea.erro {
  border-color:rgba(224,90,90,.35);
}
.ct-campo-erro {
  font-family:'DM Mono',monospace; font-size:9px; color:#e05a5a;
  letter-spacing:.5px;
}
.ct-campo textarea { resize:vertical; min-height:100px; }
.ct-select-wrap { position:relative; }
.ct-select { appearance:none; cursor:pointer; padding-right:38px; }
.ct-select-arrow {
  position:absolute; right:13px; top:50%; transform:translateY(-50%);
  pointer-events:none; color:var(--ct-gold); opacity:.5; transition:transform .2s;
}
.ct-select:focus + .ct-select-arrow { transform:translateY(-50%) rotate(180deg); }

.ct-erro {
  font-family:'DM Mono',monospace; font-size:10px; letter-spacing:.5px;
  color:#e05a5a; background:rgba(224,90,90,.05); border:.5px solid rgba(224,90,90,.18);
  padding:8px 12px;
  display:flex; align-items:center; gap:8px;
  animation:errShake .3s;
}
.ct-err-enter-active,.ct-err-leave-active { transition:opacity .2s; }
.ct-err-enter-from,.ct-err-leave-to { opacity:0; }

/* Botão enviar */
.ct-btn-enviar {
  display:flex; align-items:center; justify-content:center;
  width:100%; padding:15px;
  background:linear-gradient(135deg,#BF953F 0%,#FCF6BA 40%,#B38728 70%,#FBF5B7 100%);
  background-size:200% auto;
  border:none; cursor:pointer;
  color:#09090f; font-family:'DM Mono',monospace;
  font-size:8.5px; font-weight:700; letter-spacing:4px; text-transform:uppercase;
  box-shadow:0 0 24px rgba(200,168,75,.15);
  position:relative; overflow:hidden;
  transition:background-position .5s,transform .25s,box-shadow .25s;
}
.ct-btn-enviar__shimmer {
  position:absolute; top:0; bottom:0; width:60%;
  background:linear-gradient(90deg,transparent,rgba(255,255,255,.2),transparent);
  transform:skewX(-15deg);
  animation:shimmerPass 4s ease-in-out infinite;
  pointer-events:none;
}
.ct-btn-enviar__inner { display:flex; align-items:center; gap:9px; position:relative; z-index:1; }
.ct-btn-enviar:hover:not(:disabled) {
  background-position:right center;
  transform:translateY(-2px); box-shadow:0 0 36px rgba(200,168,75,.3);
}
.ct-btn-enviar:disabled { opacity:.35; cursor:not-allowed; }
.spinner {
  width:16px; height:16px; border-radius:50%;
  border:2px solid rgba(10,10,10,.2); border-top-color:#09090f;
  animation:spin .7s linear infinite;
}

/* ══ SUCESSO ══ */
.ct-sucesso {
  display:flex; flex-direction:column; align-items:center;
  gap:14px; padding:44px 16px; text-align:center;
}
.ct-sucesso__mon {
  position:relative; width:80px; height:80px;
  display:flex; align-items:center; justify-content:center;
  animation:monSpin 20s linear infinite;
}
.ct-sucesso__check {
  position:absolute; inset:0;
  display:flex; align-items:center; justify-content:center;
  color:var(--ct-gold);
}
.ct-sucesso__titulo {
  font-family:'Cormorant Garamond',serif;
  font-size:1.7rem; font-weight:300; font-style:italic; color:var(--ct-text);
}
.ct-sucesso__sub {
  font-family:'DM Mono',monospace; font-size:9px; letter-spacing:2px;
  color:var(--ct-text3); text-transform:uppercase;
  display:flex; align-items:center; gap:8px;
}
.ct-sucesso__email-hint {
  font-size:11px; color:var(--ct-text3); line-height:1.7;
}
.ct-sucesso__email-hint em { color:var(--ct-gold); font-style:normal; }
.ct-btn-nova {
  background:none; border:.5px solid var(--ct-hairH);
  padding:10px 26px; color:var(--ct-gold);
  font-family:'DM Mono',monospace; font-size:8px; letter-spacing:3px;
  text-transform:uppercase; cursor:pointer; margin-top:6px;
  display:flex; align-items:center; gap:8px;
  transition:all .25s;
}
.ct-btn-nova:hover {
  background:rgba(200,168,75,.07);
  transform:translateY(-2px); box-shadow:0 0 16px rgba(200,168,75,.12);
}

/* Transições form */
.ct-fade-scale-enter-active,.ct-fade-scale-leave-active { transition:opacity .3s,transform .3s; }
.ct-fade-scale-enter-from { opacity:0; transform:scale(.97) translateY(8px); }
.ct-fade-scale-leave-to   { opacity:0; transform:scale(.97) translateY(-8px); }

/* ══ SEÇÃO ATELIER + MAPA ══ */
.ct-atelier { padding:72px 0; position:relative; z-index:2; }
.ct-atelier__inner {
  display:grid; grid-template-columns:1fr 1fr; gap:64px; align-items:start;
}

/* Foto */
.ct-atelier__foto-wrap { position:relative; }
.ct-atelier__foto {
  position:relative; overflow:hidden;
  border:.5px solid var(--ct-hair);
  aspect-ratio:4/3;
  background:var(--ct-surf);
  transition:border-color .3s;
}
.ct-atelier__foto:hover { border-color:rgba(200,168,75,.22); }
.ct-atelier__foto-overlay {
  position:absolute; inset:0; z-index:2; pointer-events:none;
  background:linear-gradient(
    135deg,
    rgba(9,9,15,.55) 0%,
    rgba(9,9,15,.15) 50%,
    rgba(200,168,75,.08) 100%
  );
}
.ct-atelier__img {
  width:100%; height:100%; object-fit:cover;
  display:block; transition:transform .8s var(--ease);
}
.ct-atelier__foto:hover .ct-atelier__img { transform:scale(1.03); }
.ct-atelier__placeholder {
  position:absolute; inset:0; z-index:1;
  display:flex; flex-direction:column; align-items:center; justify-content:center;
  gap:12px;
  color:var(--ct-text4);
  font-family:'DM Mono',monospace; font-size:8px; letter-spacing:3px; text-transform:uppercase;
}
.ct-atelier__fc {
  position:absolute; z-index:3; width:20px; height:20px;
  border-color:rgba(200,168,75,.25); border-style:solid; pointer-events:none;
}
.ct-atelier__fc--tl { top:12px; left:12px; border-width:.5px 0 0 .5px; }
.ct-atelier__fc--br { bottom:12px; right:12px; border-width:0 .5px .5px 0; }
.ct-atelier__badge {
  position:absolute; bottom:-1px; left:0;
  font-family:'DM Mono',monospace; font-size:7.5px;
  letter-spacing:2.5px; text-transform:uppercase;
  color:var(--ct-gold); background:var(--ct-deep);
  border:.5px solid rgba(200,168,75,.2);
  padding:7px 14px;
  display:flex; align-items:center; gap:6px;
  z-index:10;
}

/* Mapa */
.ct-atelier__titulo {
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(2rem,3.5vw,3.2rem); font-weight:300;
  line-height:1.05; margin:0 0 16px;
}
.ct-atelier__titulo span { display:block; color:var(--ct-text2); }
.ct-atelier__titulo em {
  display:block; font-style:italic;
  background:linear-gradient(135deg,var(--ct-gold),var(--ct-gold2));
  -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
}
.ct-atelier__desc {
  font-size:12.5px; color:var(--ct-text2); line-height:1.9;
  margin-bottom:24px; max-width:480px;
}
.ct-mapa { position:relative; border:.5px solid var(--ct-hair); overflow:hidden; }
.ct-mapa__corner {
  position:absolute; z-index:3; width:16px; height:16px;
  border-color:rgba(200,168,75,.22); border-style:solid; pointer-events:none;
}
.ct-mapa__corner--tl { top:8px; left:8px;  border-width:.5px 0 0 .5px; }
.ct-mapa__corner--br { bottom:8px; right:8px; border-width:0 .5px .5px 0; }
.ct-mapa__iframe {
  width:100%; height:280px; border:none; display:block;
  filter:invert(1) hue-rotate(180deg) saturate(.6) brightness(.85);
}
.ct-mapa__overlay {
  position:absolute; inset:0; pointer-events:none; z-index:2;
  background:linear-gradient(
    to bottom,
    rgba(9,9,15,.3) 0%,
    transparent 30%,
    transparent 70%,
    rgba(9,9,15,.4) 100%
  );
}
.ct-mapa__cta {
  display:inline-flex; align-items:center; gap:8px; margin-top:14px;
  font-family:'DM Mono',monospace; font-size:7.5px;
  letter-spacing:3px; text-transform:uppercase;
  color:var(--ct-gold); text-decoration:none; opacity:.65;
  transition:opacity .25s,gap .25s;
}
.ct-mapa__cta:hover { opacity:1; gap:12px; }

/* ══ FAQ ══ */
.ct-faq { padding:72px 0; border-top:.5px solid var(--ct-hair); position:relative; z-index:2; }
.ct-faq__hd { margin-bottom:44px; }
.ct-faq__titulo {
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(2rem,3.5vw,3.2rem); font-weight:300;
  color:var(--ct-text); margin:8px 0 0;
}
.ct-faq__titulo em { font-style:italic; color:var(--ct-gold); }
.ct-faq__lista { max-width:820px; }
.ct-faq__item {
  border-bottom:.5px solid var(--ct-hair); cursor:pointer;
  transition:border-color .25s; outline:none;
}
.ct-faq__item:first-child { border-top:.5px solid var(--ct-hair); }
.ct-faq__item.active { border-color:rgba(200,168,75,.2); }
.ct-faq__item:focus-visible { box-shadow:0 0 0 2px rgba(200,168,75,.3); }
.ct-faq__pergunta {
  display:flex; align-items:center; gap:14px; padding:20px 0;
  font-size:13.5px; color:var(--ct-text2); transition:color .2s;
}
.ct-faq__item:hover .ct-faq__pergunta,
.ct-faq__item.active .ct-faq__pergunta { color:var(--ct-text); }
.ct-faq__bullet { font-size:5px; color:var(--ct-gold); opacity:.3; flex-shrink:0; transition:opacity .25s; }
.ct-faq__bullet.active { opacity:1; }
.ct-faq__item:hover .ct-faq__bullet { opacity:.55; }
.ct-faq__chevron {
  margin-left:auto; flex-shrink:0; width:26px; height:26px;
  border:.5px solid var(--ct-hair);
  display:flex; align-items:center; justify-content:center;
  color:var(--ct-text3); transition:all .25s;
}
.ct-faq__chevron.open { transform:rotate(180deg); border-color:rgba(200,168,75,.25); color:var(--ct-gold); background:rgba(200,168,75,.05); }
.ct-faq__item:hover .ct-faq__chevron { border-color:rgba(200,168,75,.2); }
.ct-faq__resp {
  display:flex; gap:14px; align-items:flex-start;
  font-size:12.5px; color:var(--ct-text3); line-height:1.85;
  padding-bottom:20px;
}
.ct-faq__resp-bar {
  display:block; flex-shrink:0; margin-top:6px;
  width:.5px; min-height:36px;
  background:linear-gradient(to bottom,var(--ct-gold),transparent); opacity:.3;
}
.faq-slide-enter-active,.faq-slide-leave-active {
  transition:opacity .25s,max-height .32s cubic-bezier(.22,1,.36,1);
  max-height:240px; overflow:hidden;
}
.faq-slide-enter-from,.faq-slide-leave-to { opacity:0; max-height:0; }

/* ══ RESPONSIVO ══ */
@media (max-width:1200px) {
  .ct-wrap { padding:0 48px; }
  .ct-hero  { padding:72px 48px 60px; }
}
@media (max-width:1024px) {
  .ct-canais__grid { grid-template-columns:repeat(2,1fr); }
  .ct-form-inner   { grid-template-columns:1fr; gap:52px; }
  .ct-atelier__inner { grid-template-columns:1fr; gap:44px; }
  .ct-info__kanji  { display:none; }
}
@media (max-width:768px) {
  .ct-wrap { padding:0 24px; }
  .ct-hero { padding:52px 24px; }
  .ct-hero__kanji { display:none; }
  .ct-hero__mon   { right:24px; }
  .ct-canais__grid { grid-template-columns:1fr; }
  .ct-form-card   { padding:28px 20px; }
  .ct-duplo       { grid-template-columns:1fr; }
  .ct-sidebar     { display:none; }
  .ct-editorial   { display:none; }
  .ct-horario__grid { grid-template-columns:repeat(4,1fr); }
  .ct-trust-strip  { gap:16px; }
}
@media (max-width:480px) {
  .ct-form-card { padding:22px 16px; }
  .ct-horario__grid { grid-template-columns:repeat(3,1fr); }
  .ct-trust-strip { flex-direction:column; gap:12px; }
}
@media (prefers-reduced-motion:reduce) {
  .ct-bg__beam,.ct-hero__mon,.ct-hero__kanji,
  .ct-canal__kanji,.ct-info__kanji,.ct-bg__kamon { animation:none !important; }
}
</style>