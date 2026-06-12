<template>
  <footer class="ft">

    <!-- KAMON DE FUNDO — igual ao drawer-kamon e sb-kamon -->
    <div class="ft__kamon" aria-hidden="true">黒</div>
    <div class="ft__kamon ft__kamon--2" aria-hidden="true">金</div>

    <!-- LINHA MA SUPERIOR — realm-aware, igual à navbar progress -->
    <div class="ft__realm-line" aria-hidden="true"></div>

    <div class="ft__inner">

      <!-- ══ COL 1: BRAND ══ -->
      <div class="ft__brand">
        <router-link to="/" class="ft__logo" aria-label="Noir & Or — Início">
          <img
            :src="logoSrc"
            alt="Noir & Or"
            @error="e => e.target.style.display = 'none'"
          />
        </router-link>

        <!-- Slogan -->
        <p class="ft__slogan">{{ slogan }}</p>

        <!-- Ornament — igual ao drawer__ornament -->
        <div class="ft__ornament" aria-hidden="true">
          <span class="ft__orn-line"></span>
          <span class="ft__orn-kanji">黒金</span>
          <span class="ft__orn-line ft__orn-line--r"></span>
        </div>

        <!-- Sociais — enso, igual ao nb-icon -->
        <div class="ft__sociais">
          <a
            v-for="s in sociais" :key="s.label"
            :href="s.href"
            class="ft__social nb-icon"
            :aria-label="s.label"
            target="_blank" rel="noopener noreferrer"
          >
            <span v-html="s.icon"></span>
          </a>
        </div>

        <!-- Selos — estilo nb-drop-clock -->
        <div class="ft__selos">
          <div class="ft__selo">
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            <span>SSL 256-bit</span>
          </div>
          <span class="ft__dot-sep" aria-hidden="true">·</span>
          <div class="ft__selo">
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <rect x="3" y="11" width="18" height="11" rx="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            <span>Dados protegidos</span>
          </div>
          <span class="ft__dot-sep" aria-hidden="true">·</span>
          <div class="ft__selo">
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            <span>Compra segura</span>
          </div>
        </div>
      </div>

      <!-- ══ COL 2: NAVEGAÇÃO ══ -->
      <div class="ft__col">
        <h4 class="ft__col-titulo">
          <span class="ft__titulo-kanji" aria-hidden="true">道</span>
          Navegação
        </h4>
        <nav class="ft__links" aria-label="Navegação do rodapé">
          <router-link to="/loja" class="ft__link">
            <span class="ft__link-num" aria-hidden="true">一</span>
            Loja online
          </router-link>
          <router-link to="/colecoes" class="ft__link">
            <span class="ft__link-num" aria-hidden="true">二</span>
            Coleções
          </router-link>
          <router-link to="/sobre" class="ft__link">
            <span class="ft__link-num" aria-hidden="true">三</span>
            O Atelier
          </router-link>
          <router-link to="/contato" class="ft__link">
            <span class="ft__link-num" aria-hidden="true">四</span>
            Concierge
          </router-link>
          <router-link to="/billing" class="ft__link">
            <span class="ft__link-num" aria-hidden="true">五</span>
            Planos &amp; Assinaturas
          </router-link>
        </nav>
      </div>

      <!-- ══ COL 3: SUPORTE ══ -->
      <div class="ft__col">
        <h4 class="ft__col-titulo">
          <span class="ft__titulo-kanji" aria-hidden="true">助</span>
          Suporte
        </h4>
        <nav class="ft__links" aria-label="Links de suporte">
          <router-link to="/suporte" class="ft__link">
            <span class="ft__link-num" aria-hidden="true">一</span>
            Central de ajuda
          </router-link>
          <router-link to="/politica-entrega" class="ft__link">
            <span class="ft__link-num" aria-hidden="true">二</span>
            Política de entrega
          </router-link>
          <router-link to="/devolucoes" class="ft__link">
            <span class="ft__link-num" aria-hidden="true">三</span>
            Devoluções
          </router-link>
          <router-link to="/garantia" class="ft__link">
            <span class="ft__link-num" aria-hidden="true">四</span>
            Garantia vitalícia
          </router-link>
          <router-link to="/termos-custodia" class="ft__link">
            <span class="ft__link-num" aria-hidden="true">五</span>
            Termos de custódia
          </router-link>
          <router-link to="/politica-privacidade" class="ft__link">
            <span class="ft__link-num" aria-hidden="true">六</span>
            Privacidade
          </router-link>
          <router-link to="/politica-cookies" class="ft__link">
            <span class="ft__link-num" aria-hidden="true">七</span>
            Cookies
          </router-link>
        </nav>
      </div>

      <!-- ══ COL 4: CONTATO ══ -->
      <div class="ft__col">
        <h4 class="ft__col-titulo">
          <span class="ft__titulo-kanji" aria-hidden="true">連</span>
          Contato
        </h4>

        <div class="ft__contact">
          <div class="ft__ci">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <span>Rua das Artes, 240 — Sabará, MG</span>
          </div>
          <div class="ft__ci">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.38 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16.16 16.16 0 0 0 6.6 6.6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2z"/>
            </svg>
            <span>+55 (31) 99999-9999</span>
          </div>
          <div class="ft__ci">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            <span>contato@noiror.com.br</span>
          </div>
        </div>

        <!-- WhatsApp CTA — destaque próprio como prometido -->
        <a
          :href="whatsappHref"
          class="ft__whatsapp"
          target="_blank" rel="noopener noreferrer"
          aria-label="Falar no WhatsApp"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.554 4.12 1.523 5.851L.057 23.929l6.283-1.455A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.979 9.979 0 0 1-5.153-1.432l-.371-.221-3.807.883.91-3.701-.244-.389A9.953 9.953 0 0 1 2 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z"/>
          </svg>
          <span>Falar no WhatsApp</span>
          <svg class="ft__whatsapp-arr" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M5 12h14M12.5 5l7 7-7 7"/>
          </svg>
        </a>

        <!-- Horário — estilo nb-drop-clock -->
        <div class="ft__hours">
          <div class="ft__hours-head">
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            <span class="ft__hours-label">Atendimento</span>
            <span class="ft__clock">{{ brasiliaTime }} BRT</span>
          </div>
          <p>Segunda a sexta — 9h às 18h</p>
          <p>Sábado — 10h às 14h (agendamento)</p>
          <p>Domingo e feriados — fechado</p>
        </div>
      </div>

      <!-- ══ COL 5: NEWSLETTER ══ -->
      <div class="ft__newsletter">
        <h4 class="ft__col-titulo">
          <span class="ft__titulo-kanji" aria-hidden="true">縁</span>
          Acesso Exclusivo
        </h4>
        <p class="ft__nl-desc">
          Receba lançamentos, edições limitadas e convites para eventos exclusivos.
        </p>

        <!-- Input no padrão af-linha da modal auth -->
        <div class="ft__nl-campo">
          <label for="ft-email" class="ft__nl-label">E-mail</label>
          <div
            class="ft__nl-linha"
            :class="{ 'is-focus': nlFocus, 'is-filled': email.length > 0, 'is-erro': nlErro }"
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="ft__nl-ico" aria-hidden="true">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            <input
              id="ft-email"
              v-model="email"
              type="email"
              name="newsletter-email"
              placeholder="seu@email.com"
              autocomplete="email"
              :disabled="inscrito"
              @focus="nlFocus = true; nlErro = false"
              @blur="nlFocus = false"
              @keyup.enter="assinar"
            />
            <!-- Botão — mesmo padrão do af-submit mas compacto -->
            <button
              @click="assinar"
              class="ft__nl-btn"
              :disabled="inscrito || nlLoading"
              aria-label="Assinar newsletter"
            >
              <span v-if="nlLoading" class="or-spinner-sm" aria-hidden="true"></span>
              <svg v-else width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M5 12h14M12.5 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
          <transition name="ft-fade">
            <p v-if="nlErro" class="ft__nl-erro" role="alert">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              Informe um e-mail válido.
            </p>
          </transition>
        </div>

        <transition name="ft-fade">
          <p v-if="inscrito" class="ft__nl-ok" role="status">
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            Inscrição confirmada — bem-vindo ao círculo
          </p>
        </transition>

        <p class="ft__nl-notice">Prometemos não enviar spam. Cancelamento a qualquer momento.</p>

        <!-- Pagamentos -->
        <div class="ft__pagamentos">
          <p class="ft__pag-label">
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
              <line x1="1" y1="10" x2="23" y2="10"/>
            </svg>
            Meios de pagamento
          </p>
          <div class="ft__pag-badges">
            <span class="ft__pag-badge">Pix</span>
            <span class="ft__pag-badge">Cartão</span>
            <span class="ft__pag-badge">Boleto</span>
            <span class="ft__pag-badge">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              Mercado Pago
            </span>
          </div>
        </div>
      </div>

    </div>

    <!-- ══ SEPARADOR — drawer__footer-ornament ══ -->
    <div class="ft__divider-wrap">
      <div class="ft__sep">
        <span class="ft__sep-line"></span>
        <span class="ft__sep-kanji" aria-hidden="true">金</span>
        <span class="ft__sep-line ft__sep-line--r"></span>
      </div>
    </div>

    <!-- ══ BOTTOM — estilo sb__copy + legal ══ -->
    <div class="ft__bottom">
      <div class="ft__bottom-left">
        <p class="ft__copy">
          © {{ ano }} Noir &amp; Or · Atelier &nbsp;
          <span class="ft__copy-kanji" aria-hidden="true">黒と金</span>
          &nbsp; Todos os direitos reservados · Sabará, MG · Brasil
        </p>
        <!-- CNPJ — obrigatório legalmente -->
        <p class="ft__cnpj">
          <span>CNPJ</span> 00.000.000/0001-00 &nbsp;·&nbsp;
          <span>Razão Social</span> Noir &amp; Or Comércio de Artigos de Luxo Ltda.
        </p>
      </div>
      <nav class="ft__legal" aria-label="Links legais">
        <router-link to="/termos-custodia" class="ft__legal-link">Termos</router-link>
        <span class="ft__legal-dot" aria-hidden="true"></span>
        <router-link to="/politica-privacidade" class="ft__legal-link">Privacidade</router-link>
        <span class="ft__legal-dot" aria-hidden="true"></span>
        <router-link to="/politica-cookies" class="ft__legal-link">Cookies</router-link>
        <span class="ft__legal-dot" aria-hidden="true"></span>
        <router-link to="/contato" class="ft__legal-link">Fale conosco</router-link>
      </nav>
    </div>

  </footer>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useSiteStore } from '@/stores/site.js'

const site      = useSiteStore()
const email     = ref('')
const inscrito  = ref(false)
const nlFocus   = ref(false)
const nlErro    = ref(false)
const nlLoading = ref(false)
const ano       = new Date().getFullYear()

/* ── Relógio Brasília — mesmo padrão da navbar ── */
const brasiliaTime = ref('')
let clockInterval  = null

const updateClock = () => {
  brasiliaTime.value = new Date().toLocaleTimeString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    hour: '2-digit',
    minute: '2-digit',
  })
}

onMounted(() => {
  updateClock()
  clockInterval = setInterval(updateClock, 1000)
})
onUnmounted(() => clearInterval(clockInterval))

/* ── Logo realm-aware ── */
const logoSrc = computed(() =>
  site.tema === 'claro' ? '/logo-light.png' : '/logo-dark.png'
)

const slogan = computed(() =>
  site.config?.slogan || 'A fusão definitiva entre o metal nobre e a vanguarda tecnológica.'
)

const redes = computed(() => site.config?.redes || {})

const whatsappHref = computed(() => {
  const num = (site.config?.whatsapp || '').replace(/\D/g, '')
  return num ? `https://wa.me/${num}` : '#'
})

/* ── Sociais ── */
const sociais = computed(() => [
  {
    label: 'Instagram',
    href: redes.value.instagram ? `https://instagram.com/${redes.value.instagram}` : '#',
    icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 1c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V6c0-1.66 1.34-3 3-3h10zm-5 3.5a5 5 0 100 10 5 5 0 000-10zm0 1.5a3.5 3.5 0 110 7 3.5 3.5 0 010-7zm4.75-.25a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z"/></svg>',
  },
  {
    label: 'YouTube',
    href: redes.value.youtube ? `https://youtube.com/${redes.value.youtube}` : '#',
    icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.87.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z"/></svg>',
  },
  {
    label: 'X',
    href: redes.value.twitter ? `https://x.com/${redes.value.twitter}` : '#',
    icon: '<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
  },
  {
    label: 'WhatsApp',
    href: whatsappHref.value,
    icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.554 4.12 1.523 5.851L.057 23.929l6.283-1.455A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.979 9.979 0 0 1-5.153-1.432l-.371-.221-3.807.883.91-3.701-.244-.389A9.953 9.953 0 0 1 2 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z"/></svg>',
  },
])

/* ── Newsletter ── */
const assinar = async () => {
  nlErro.value = false
  if (!email.value || !email.value.includes('@')) {
    nlErro.value = true
    return
  }
  nlLoading.value = true
  await new Promise(r => setTimeout(r, 800)) // simula request
  nlLoading.value = false
  inscrito.value  = true
  email.value     = ''
  setTimeout(() => { inscrito.value = false }, 4000)
}
</script>

<style scoped>
/* ═══════════════════════════════════════════════
   NOIR & OR — FOOTER
   Alinhado 100% com o sistema visual da navbar:
   • Mesmas variáveis CSS (--or-*)
   • Mesmos padrões de kanji, ornamentos, links
   • Realm-aware via --cor-primaria
═══════════════════════════════════════════════ */

/* ════ BASE ════ */
.ft {
  position: relative;
  font-family: var(--font-sans);
  background: var(--or-deep, #09090f);
  overflow: hidden;
}

/* ════ KAMONS DE FUNDO — igual ao drawer-kamon / sb-kamon ════ */
.ft__kamon {
  position: absolute;
  font-family: 'Noto Serif JP', 'Yu Mincho', 'Hiragino Mincho Pro', serif;
  font-size: 320px;
  font-weight: 300;
  color: var(--or-gold, #F5A623);
  opacity: 0.025;
  pointer-events: none;
  z-index: 0;
  line-height: 1;
  user-select: none;
  bottom: -60px;
  right: -40px;
}
.ft__kamon--2 {
  font-size: 180px;
  top: 40px;
  left: -30px;
  right: auto;
  bottom: auto;
  opacity: 0.018;
}

/* ════ LINHA MA — realm-aware, igual à nb-progress ════ */
.ft__realm-line {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 0.5px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    transparent 6%,
    var(--cor-secundaria, rgba(212,175,55,0.6)) 20%,
    var(--cor-primaria, #F5A623) 50%,
    var(--cor-secundaria, rgba(212,175,55,0.6)) 80%,
    transparent 94%,
    transparent 100%
  );
  opacity: 0.65;
  z-index: 1;
  pointer-events: none;
}

/* ════ GRID INTERNO ════ */
.ft__inner {
  max-width: 1400px;
  margin: 0 auto;
  padding: 72px 64px 56px;
  display: grid;
  grid-template-columns: 1.2fr 0.8fr 0.9fr 1.1fr 1.3fr;
  gap: 56px;
  position: relative;
  z-index: 2;
}

/* ════ BRAND ════ */
.ft__logo {
  display: inline-block;
  margin-bottom: 20px;
}
.ft__logo img {
  height: 38px;
  width: auto;
  object-fit: contain;
  transition: opacity .35s;
}
.ft__logo:hover img { opacity: 0.72; }

.ft__slogan {
  font-size: 11.5px;
  color: var(--or-silk-2, rgba(237,232,224,0.50));
  line-height: 2;
  max-width: 228px;
  margin-bottom: 20px;
  font-weight: 300;
  letter-spacing: 0.05em;
}

/* Ornament — drawer__ornament */
.ft__ornament {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}
.ft__orn-line {
  flex: 1;
  height: 0.5px;
  background: linear-gradient(90deg, var(--or-gold, #F5A623), transparent);
  opacity: 0.2;
}
.ft__orn-line--r {
  background: linear-gradient(270deg, var(--or-gold, #F5A623), transparent);
}
.ft__orn-kanji {
  font-family: 'Noto Serif JP', 'Yu Mincho', serif;
  font-size: 9px;
  color: var(--or-gold, #F5A623);
  opacity: 0.28;
  letter-spacing: 0.2em;
  line-height: 1;
  flex-shrink: 0;
}

/* Sociais — nb-icon enso */
.ft__sociais {
  display: flex;
  gap: 7px;
  margin-bottom: 22px;
}
.ft__social {
  /* herda .nb-icon da global */
  width: 32px !important;
  height: 32px !important;
  border: 0.5px solid var(--or-hair-2, rgba(237,232,224,0.07));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--or-silk-3, rgba(237,232,224,0.22));
  text-decoration: none;
  transition: all 0.4s cubic-bezier(.16,1,.3,1);
  background: none;
}
.ft__social:hover {
  background: var(--or-gold-3, rgba(245,166,35,0.06));
  border-color: var(--or-gold, #F5A623);
  color: var(--or-gold, #F5A623);
  transform: translateY(-2px) scale(1.06);
}

/* Selos — nb-drop-clock */
.ft__selos {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  font-size: 7.5px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--or-silk-4, rgba(237,232,224,0.10));
}
.ft__selo {
  display: flex;
  align-items: center;
  gap: 5px;
}
.ft__selo svg {
  color: var(--or-gold, #F5A623);
  opacity: 0.35;
  flex-shrink: 0;
}
.ft__dot-sep {
  color: var(--or-hair-2, rgba(237,232,224,0.07));
  font-size: 12px;
  line-height: 1;
}

/* ════ COLUNAS ════ */
.ft__col {
  display: flex;
  flex-direction: column;
}

/* Título — sb__grupo-label */
.ft__col-titulo {
  display: flex;
  align-items: baseline;
  gap: 9px;
  font-family: var(--font-sans);
  font-size: 7px;
  letter-spacing: 0.5em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--or-gold, #F5A623);
  opacity: 0.75;
  margin-bottom: 22px;
  position: relative;
}

/* Kanji fantasma — igual ao sb__grupo-label span */
.ft__titulo-kanji {
  font-family: 'Noto Serif JP', 'Yu Mincho', 'Hiragino Mincho Pro', serif;
  font-size: 18px;
  font-weight: 300;
  color: var(--or-gold, #F5A623);
  opacity: 0.15;
  letter-spacing: 0;
  line-height: 1;
  transform: translateY(1px);
  display: inline-block;
  transition: opacity 0.3s;
  flex-shrink: 0;
}
.ft__col:hover .ft__titulo-kanji,
.ft__newsletter:hover .ft__titulo-kanji {
  opacity: 0.30;
}

/* Links — sb__link com barra lateral ::before */
.ft__links {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.ft__link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 0 8px 0;
  font-family: var(--font-sans);
  font-size: 12px;
  font-weight: 300;
  color: var(--or-silk-2, rgba(237,232,224,0.50));
  text-decoration: none;
  letter-spacing: 0.04em;
  position: relative;
  transition: color .25s, padding-left .25s;
}
/* Barra lateral dourada — sb__link::before */
.ft__link::before {
  content: '';
  position: absolute;
  left: 0;
  top: 8px;
  bottom: 8px;
  width: 0.5px;
  background: var(--or-gold, #F5A623);
  opacity: 0;
  transition: opacity .25s;
}
.ft__link:hover {
  color: var(--or-silk, #ede8e0);
  padding-left: 12px;
}
.ft__link:hover::before {
  opacity: 0.65;
}
.ft__link.router-link-exact-active {
  color: var(--or-gold, #F5A623);
  opacity: 0.9;
}
.ft__link.router-link-exact-active::before {
  opacity: 0.5;
}

/* Número de ordem — sb__link-num */
.ft__link-num {
  font-family: 'Noto Serif JP', serif;
  font-size: 11px;
  color: var(--or-gold, #F5A623);
  opacity: 0.22;
  line-height: 1;
  flex-shrink: 0;
  width: 16px;
  text-align: center;
  transition: opacity .25s;
}
.ft__link:hover .ft__link-num {
  opacity: 0.5;
}

/* ════ CONTATO — ft__ci estilo nb-drop-clock ════ */
.ft__contact {
  display: flex;
  flex-direction: column;
  gap: 13px;
  margin-bottom: 18px;
}
.ft__ci {
  display: flex;
  align-items: flex-start;
  gap: 11px;
  font-size: 11.5px;
  color: var(--or-silk-2, rgba(237,232,224,0.50));
  line-height: 1.6;
  font-weight: 300;
}
.ft__ci svg {
  flex-shrink: 0;
  margin-top: 1px;
  color: var(--or-gold, #F5A623);
  opacity: 0.4;
}

/* WhatsApp CTA — destaque próprio, padrão drawer__vazio__cta */
.ft__whatsapp {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 0.5px solid var(--or-gold, #F5A623);
  padding: 9px 16px;
  font-family: var(--font-sans);
  font-size: 8px;
  font-weight: 400;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: var(--or-gold, #F5A623);
  text-decoration: none;
  margin-bottom: 18px;
  position: relative;
  overflow: hidden;
  transition: color .45s;
  z-index: 0;
}
.ft__whatsapp::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--or-gold, #F5A623);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform .5s cubic-bezier(.16,1,.3,1);
  z-index: -1;
}
.ft__whatsapp:hover::before { transform: scaleX(1); }
.ft__whatsapp:hover { color: var(--or-void, #06060d); }
.ft__whatsapp-arr {
  margin-left: auto;
  flex-shrink: 0;
  transition: transform .3s;
}
.ft__whatsapp:hover .ft__whatsapp-arr {
  transform: translateX(3px);
}

/* Horário — nb-drop-clock */
.ft__hours-head {
  display: flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 10px;
}
.ft__hours-head svg {
  color: var(--or-gold, #F5A623);
  opacity: 0.45;
  flex-shrink: 0;
}
.ft__hours-label {
  font-family: var(--font-sans);
  font-size: 7px;
  letter-spacing: 0.44em;
  text-transform: uppercase;
  color: var(--or-silk-3, rgba(237,232,224,0.22));
  font-weight: 600;
}
.ft__clock {
  font-family: 'DM Mono', 'Courier New', monospace;
  font-size: 10px;
  color: var(--or-gold, #F5A623);
  margin-left: auto;
  letter-spacing: 0.08em;
  opacity: 0.7;
}
.ft__hours p {
  font-size: 11px;
  color: var(--or-silk-3, rgba(237,232,224,0.22));
  margin-bottom: 5px;
  line-height: 1.7;
  font-weight: 300;
  letter-spacing: 0.02em;
}

/* ════ NEWSLETTER ════ */
.ft__newsletter {
  display: flex;
  flex-direction: column;
}
.ft__nl-desc {
  font-size: 12px;
  color: var(--or-silk-2, rgba(237,232,224,0.50));
  line-height: 1.85;
  margin-bottom: 18px;
  font-weight: 300;
  letter-spacing: 0.03em;
}

/* Campo — padrão af-campo / af-linha da modal auth */
.ft__nl-campo {
  margin-bottom: 12px;
}
.ft__nl-label {
  display: block;
  font-family: var(--font-sans);
  font-size: 7px;
  font-weight: 400;
  letter-spacing: 0.55em;
  text-transform: uppercase;
  color: var(--or-gold, #F5A623);
  opacity: 0.7;
  margin-bottom: 8px;
}

/* af-linha */
.ft__nl-linha {
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 0.5px solid var(--or-hair-2, rgba(237,232,224,0.07));
  transition: border-color .4s;
  padding-bottom: 2px;
  position: relative;
}
.ft__nl-linha::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 1.5px;
  background: var(--or-gold, #F5A623);
  transition: width .45s cubic-bezier(.16,1,.3,1);
}
.ft__nl-linha.is-focus::after { width: 100%; }
.ft__nl-linha.is-focus { border-bottom-color: transparent; }
.ft__nl-linha.is-erro { border-bottom-color: rgba(239,68,68,.5) !important; }
.ft__nl-linha.is-erro::after { background: transparent !important; }

.ft__nl-ico {
  color: var(--or-gold, #F5A623);
  opacity: 0.35;
  flex-shrink: 0;
}

.ft__nl-linha input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  font-family: var(--font-sans);
  font-size: 12px;
  font-weight: 300;
  color: var(--or-silk, #ede8e0);
  caret-color: var(--or-gold, #F5A623);
  padding: 7px 0;
  -webkit-text-fill-color: var(--or-silk, #ede8e0);
  transition: background-color 9999s ease-in-out 0s;
}
.ft__nl-linha input:-webkit-autofill,
.ft__nl-linha input:-webkit-autofill:hover,
.ft__nl-linha input:-webkit-autofill:focus {
  -webkit-text-fill-color: var(--or-gold, #F5A623) !important;
  -webkit-box-shadow: 0 0 0 1000px var(--or-deep, #09090f) inset !important;
  box-shadow: 0 0 0 1000px var(--or-deep, #09090f) inset !important;
  caret-color: var(--or-gold, #F5A623);
  transition: background-color 9999s ease-in-out 0s;
}
.ft__nl-linha input::placeholder {
  color: var(--or-silk-4, rgba(237,232,224,0.10));
  font-size: 11px;
  letter-spacing: 0.08em;
}
.ft__nl-linha input:disabled { opacity: 0.4; cursor: not-allowed; }

/* Botão envio — af-submit compacto, enso */
.ft__nl-btn {
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  background: transparent;
  border: 0.5px solid rgba(245,166,35, 0.35);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--or-gold, #F5A623);
  cursor: pointer;
  transition: background .4s, border-color .4s, transform .3s;
  position: relative;
  overflow: hidden;
}
.ft__nl-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--or-gold, #F5A623);
  border-radius: 50%;
  transform: scale(0);
  transform-origin: center;
  transition: transform .4s cubic-bezier(.16,1,.3,1);
  z-index: 0;
}
.ft__nl-btn:hover::before { transform: scale(1); }
.ft__nl-btn:hover { color: var(--or-void, #06060d); border-color: var(--or-gold, #F5A623); }
.ft__nl-btn:disabled { opacity: 0.3; cursor: not-allowed; }
.ft__nl-btn svg { position: relative; z-index: 1; }

/* Feedback */
.ft__nl-erro {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 9px;
  letter-spacing: 0.1em;
  color: rgba(239,68,68,.8);
  margin-top: 6px;
}
.ft__nl-erro svg { flex-shrink: 0; }

.ft__nl-ok {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 8.5px;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--or-gold, #F5A623);
  margin-bottom: 8px;
  opacity: 0.85;
}
.ft__nl-notice {
  font-size: 9px;
  color: var(--or-silk-4, rgba(237,232,224,0.10));
  letter-spacing: 0.07em;
  line-height: 1.7;
  font-weight: 300;
  margin-bottom: 20px;
}

/* ── Pagamentos ── */
.ft__pagamentos {
  border-top: 0.5px solid var(--or-hair-2, rgba(237,232,224,0.07));
  padding-top: 16px;
  margin-top: auto;
}
.ft__pag-label {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 7px;
  letter-spacing: 0.45em;
  text-transform: uppercase;
  color: var(--or-silk-3, rgba(237,232,224,0.22));
  margin-bottom: 10px;
}
.ft__pag-label svg {
  color: var(--or-gold, #F5A623);
  opacity: 0.35;
  flex-shrink: 0;
}
.ft__pag-badges {
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
}
.ft__pag-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  border: 0.5px solid var(--or-hair-2, rgba(237,232,224,0.07));
  padding: 4px 8px;
  font-family: var(--font-sans);
  font-size: 7.5px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--or-silk-3, rgba(237,232,224,0.22));
  transition: border-color .25s, color .25s;
}
.ft__pag-badge:hover {
  border-color: var(--or-gold, #F5A623);
  color: var(--or-gold, #F5A623);
}
.ft__pag-badge svg {
  color: var(--or-gold, #F5A623);
  opacity: 0.5;
}

/* ════ SEPARADOR — drawer__footer-ornament ════ */
.ft__divider-wrap {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 64px;
  position: relative;
  z-index: 2;
}
.ft__sep {
  display: flex;
  align-items: center;
  gap: 16px;
}
.ft__sep-line {
  flex: 1;
  height: 0.5px;
  background: linear-gradient(90deg, transparent, rgba(245,166,35,0.2));
}
.ft__sep-line--r {
  background: linear-gradient(270deg, transparent, rgba(245,166,35,0.2));
}
.ft__sep-kanji {
  font-family: 'Noto Serif JP', 'Yu Mincho', serif;
  font-size: 11px;
  font-weight: 300;
  color: var(--or-gold, #F5A623);
  opacity: 0.28;
  flex-shrink: 0;
  letter-spacing: 0;
  line-height: 1;
}

/* ════ BOTTOM — sb__copy + legal ════ */
.ft__bottom {
  max-width: 1400px;
  margin: 0 auto;
  padding: 18px 64px 32px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 12px;
  position: relative;
  z-index: 2;
}
.ft__bottom-left {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.ft__copy {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-sans);
  font-size: 7.5px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--or-silk-4, rgba(237,232,224,0.10));
}
.ft__copy-kanji {
  font-family: 'Noto Serif JP', serif;
  font-size: 11px;
  letter-spacing: 0.1em;
  color: var(--or-gold, #F5A623);
  opacity: 0.2;
}

/* CNPJ — obrigatório legal */
.ft__cnpj {
  font-family: var(--font-sans);
  font-size: 7px;
  letter-spacing: 0.14em;
  color: var(--or-silk-4, rgba(237,232,224,0.10));
  line-height: 1.6;
}
.ft__cnpj span {
  font-family: 'DM Mono', 'Courier New', monospace;
  color: var(--or-gold, #F5A623);
  opacity: 0.35;
  font-size: 6.5px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
}

.ft__legal {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
}
.ft__legal-link {
  font-family: var(--font-sans);
  font-size: 7.5px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--or-silk-4, rgba(237,232,224,0.10));
  text-decoration: none;
  transition: color .25s, letter-spacing .25s;
}
.ft__legal-link:hover {
  color: var(--or-gold, #F5A623);
  letter-spacing: 0.3em;
}
.ft__legal-dot {
  width: 2px;
  height: 2px;
  border-radius: 50%;
  background: var(--or-hair-2, rgba(237,232,224,0.07));
  flex-shrink: 0;
}

/* ════ TRANSIÇÕES ════ */
.ft-fade-enter-active,
.ft-fade-leave-active { transition: opacity .4s; }
.ft-fade-enter-from,
.ft-fade-leave-to { opacity: 0; }

/* ════ SPINNER — mesmo da navbar ════ */
.or-spinner-sm {
  width: 10px;
  height: 10px;
  border: 1px solid rgba(245,166,35,.25);
  border-top-color: var(--or-gold, #F5A623);
  border-radius: 50%;
  animation: or-spin .8s linear infinite;
  flex-shrink: 0;
}
@keyframes or-spin { to { transform: rotate(360deg); } }

/* ════ RESPONSIVO ════ */
@media (max-width: 1200px) {
  .ft__inner {
    grid-template-columns: 1fr 1fr;
    gap: 44px 36px;
    padding: 56px 44px 48px;
  }
  .ft__newsletter {
    grid-column: span 2;
  }
  .ft__divider-wrap,
  .ft__bottom {
    padding-left: 44px;
    padding-right: 44px;
  }
}

@media (max-width: 900px) {
  .ft__inner {
    grid-template-columns: 1fr 1fr;
  }
  .ft__brand {
    grid-column: span 2;
  }
  .ft__newsletter {
    grid-column: span 2;
  }
}

@media (max-width: 768px) {
  .ft__inner {
    grid-template-columns: 1fr;
    gap: 36px;
    padding: 44px 28px 36px;
  }
  .ft__brand,
  .ft__newsletter { grid-column: auto; }
  .ft__slogan { max-width: 100%; }
  .ft__bottom {
    flex-direction: column;
    align-items: flex-start;
    padding: 16px 28px 28px;
  }
  .ft__legal { justify-content: flex-start; }
  .ft__divider-wrap { padding: 0 28px; }
}

@media (max-width: 480px) {
  .ft__inner { padding: 36px 20px 28px; }
  .ft__bottom { padding: 14px 20px 24px; }
  .ft__divider-wrap { padding: 0 20px; }
  .ft__copy { flex-wrap: wrap; }
}
</style>