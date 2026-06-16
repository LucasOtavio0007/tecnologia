<template>
  <div class="suporte">

    <!-- ══ LAYERS ATMOSFÉRICOS ══ -->
    <div class="sup__grain" aria-hidden="true"></div>
    <div class="sup__bg-grid" aria-hidden="true"></div>
    <div class="sup__beam sup__beam--1" aria-hidden="true"></div>
    <div class="sup__beam sup__beam--2" aria-hidden="true"></div>
    <div class="sup__beam sup__beam--3" aria-hidden="true"></div>

    <!-- ══ HERO ══ -->
    <section class="sup__hero">
      <div class="sup__hero-kamon" aria-hidden="true">助</div>
      <div class="sup__realm-line" aria-hidden="true"></div>

      <!-- Linha editorial lateral -->
      <div class="sup__edge-line" aria-hidden="true">
        <span class="sup__edge-num">助</span>
      </div>

      <div class="sup__hero-inner">
        <div class="sup__hero-content">
          <div class="sup__breadcrumb">
            <router-link to="/" class="sup__bc-link">
              <span class="sup__bc-gem">◆</span> Início
            </router-link>
            <span class="sup__bc-sep">›</span>
            <span class="sup__bc-atual">Central de Ajuda</span>
          </div>

          <div class="sup__eyebrow">
            <span class="sup__ew-dot" aria-hidden="true"></span>
            <span>SUPORTE · NOIR &amp; OR ATELIER</span>
          </div>

          <h1 class="sup__titulo">
            <span class="sup__t-thin">CENTRAL</span>
            <span class="sup__t-gold">de Ajuda</span>
            <span class="sup__t-kanji" aria-hidden="true">支援 · 誠実</span>
          </h1>

          <div class="sup__sep" aria-hidden="true">
            <span class="sup__sep-line"></span>
            <span class="sup__sep-gem">◆</span>
            <span class="sup__sep-line sup__sep-line--r"></span>
          </div>

          <p class="sup__sub">
            Estamos aqui para garantir que sua experiência seja tão refinada quanto nossas peças.
          </p>
        </div>

        <!-- Stats -->
        <div class="sup__hero-stats">
          <div class="sup__stat">
            <span class="sup__stat-kanji" aria-hidden="true">速</span>
            <span class="sup__stat-num">24h</span>
            <span class="sup__stat-lbl">Resposta média</span>
          </div>
          <div class="sup__stat-sep" aria-hidden="true"></div>
          <div class="sup__stat">
            <span class="sup__stat-kanji" aria-hidden="true">満</span>
            <span class="sup__stat-num">98%</span>
            <span class="sup__stat-lbl">Satisfação</span>
          </div>
          <div class="sup__stat-sep" aria-hidden="true"></div>
          <div class="sup__stat">
            <span class="sup__stat-kanji" aria-hidden="true">極</span>
            <span class="sup__stat-num">VIP</span>
            <span class="sup__stat-lbl">Atendimento prioritário</span>
          </div>
        </div>
      </div>

      <!-- Status online -->
      <div class="sup__status-pill">
        <span class="sup__status-dot" :class="suporteOnline ? 'is-online' : 'is-offline'" aria-hidden="true"></span>
        <span>Suporte {{ suporteOnline ? 'Online' : 'Offline' }}</span>
        <span class="sup__status-hora">{{ horaAtual }} BRT</span>
      </div>
    </section>

    <!-- ══ TICKER ══ -->
    <div class="sup__ticker" aria-hidden="true">
      <div class="sup__ticker-track">
        <span v-for="n in 4" :key="n" class="sup__ticker-set">
          <span class="sup__t-item">支援 Suporte VIP</span><span class="sup__t-sep">◆</span>
          <span class="sup__t-item">Resposta em 24h</span><span class="sup__t-sep">◆</span>
          <span class="sup__t-item">保証 Garantia Vitalícia</span><span class="sup__t-sep">◆</span>
          <span class="sup__t-item">Atendimento Exclusivo</span><span class="sup__t-sep">◆</span>
          <span class="sup__t-item">誠実 Compromisso Total</span><span class="sup__t-sep">◆</span>
        </span>
      </div>
    </div>

    <!-- ══ BUSCA ══ -->
    <div class="sup__busca-wrap">
      <div class="sup__busca-inner">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
        </svg>
        <input
          v-model="busca"
          type="search"
          placeholder="探す · Buscar dúvidas frequentes..."
          class="sup__busca-input"
          @input="faqAberto = null"
          aria-label="Buscar dúvidas"
        />
        <button v-if="busca" @click="busca=''; faqAberto=null" class="sup__busca-clear" aria-label="Limpar busca">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- ══ CORPO PRINCIPAL ══ -->
    <div class="sup__layout">

      <!-- ══ SIDEBAR POLÍTICAS ══ -->
      <aside class="sup__sidebar">
        <div class="sup__sb-kamon" aria-hidden="true">誠</div>

        <div class="sup__sb-ornament" aria-hidden="true">
          <span class="sup__sb-line"></span>
          <span class="sup__sb-kanji">目</span>
          <span class="sup__sb-line sup__sb-line--r"></span>
        </div>

        <p class="sup__sb-lbl">
          <span class="sup__sb-lbl-kanji">案</span>Navegação
        </p>

        <nav class="sup__sb-nav" aria-label="Políticas">
          <router-link to="/suporte" class="sup__sb-link sup__sb-link--active">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            Central de Ajuda
          </router-link>
          <router-link to="/politica-entrega" class="sup__sb-link">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
            Entrega
          </router-link>
          <router-link to="/devolucoes" class="sup__sb-link">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.96"/></svg>
            Devoluções
          </router-link>
          <router-link to="/garantia" class="sup__sb-link">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            Garantia Vitalícia
          </router-link>
          <router-link to="/termos-custodia" class="sup__sb-link">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            Termos de Custódia
          </router-link>
          <router-link to="/politica-privacidade" class="sup__sb-link">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            Privacidade
          </router-link>
          <router-link to="/politica-cookies" class="sup__sb-link">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/></svg>
            Cookies
          </router-link>
        </nav>

        <div class="sup__sb-sep" aria-hidden="true">
          <span class="sup__sb-sep-line"></span>
          <span class="sup__sb-sep-kanji">誠</span>
          <span class="sup__sb-sep-line"></span>
        </div>

        <div class="sup__sb-status">
          <div class="sup__sb-status-dot" :class="suporteOnline ? 'is-online' : 'is-offline'"></div>
          <div>
            <p class="sup__sb-status-titulo">Suporte {{ suporteOnline ? 'Online' : 'Offline' }}</p>
            <p class="sup__sb-status-hora">{{ horaAtual }} BRT</p>
          </div>
        </div>

        <router-link to="/" class="sup__sb-voltar">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Voltar ao início
        </router-link>

        <div class="sup__sb-watermark" aria-hidden="true">The Art of Silent Power</div>
      </aside>

      <!-- ══ CONTEÚDO PRINCIPAL ══ -->
      <main class="sup__main">

        <!-- Categorias -->
        <div class="sup__cats" role="tablist" aria-label="Categorias de dúvidas">
          <button
            v-for="cat in categorias" :key="cat.id"
            :class="['sup__cat', { 'is-active': catAtiva === cat.id }]"
            @click="catAtiva = cat.id; faqAberto = null"
            role="tab"
            :aria-selected="catAtiva === cat.id"
          >
            <span class="sup__cat-fill" aria-hidden="true"></span>
            <span class="sup__cat-ico" v-html="cat.icone" aria-hidden="true"></span>
            <span class="sup__cat-txt">{{ cat.label }}</span>
          </button>
        </div>

        <!-- FAQ -->
        <div class="sup__faq">
          <div class="sup__faq-head" aria-hidden="true">
            <span class="sup__faq-kanji">問</span>
            <span class="sup__faq-lbl">Dúvidas Frequentes</span>
            <span class="sup__faq-count">{{ faqFiltrado.length }} questões</span>
          </div>

          <div v-if="!faqFiltrado.length" class="sup__faq-vazio">
            <div class="sup__vazio-ico" aria-hidden="true">
              <span class="sup__vazio-kanji">無</span>
            </div>
            <p class="sup__vazio-titulo">見つかりません · Nenhuma dúvida encontrada</p>
            <p class="sup__vazio-sub">para "{{ busca }}"</p>
          </div>

          <TransitionGroup name="faq-list" tag="div" class="sup__faq-lista">
            <div
              v-for="(item, idx) in faqFiltrado"
              :key="item.q"
              :class="['sup__faq-item', { 'is-open': faqAberto === idx }]"
            >
              <button
                class="sup__faq-q"
                @click="faqAberto = faqAberto === idx ? null : idx"
                :aria-expanded="faqAberto === idx"
              >
                <span class="sup__faq-num" aria-hidden="true">{{ String(idx+1).padStart(2,'0') }}</span>
                <span class="sup__faq-texto">{{ item.q }}</span>
                <svg
                  :class="['sup__faq-chevron', { 'is-open': faqAberto === idx }]"
                  width="12" height="12" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" aria-hidden="true"
                >
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </button>
              <transition name="faq-drop">
                <div v-if="faqAberto === idx" class="sup__faq-a">
                  <div class="sup__faq-a-bar" aria-hidden="true"></div>
                  <p>{{ item.a }}</p>
                  <div v-if="item.link" class="sup__faq-link-wrap">
                    <router-link :to="item.link.href" class="sup__faq-link">
                      {{ item.link.label }}
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12.5 5l7 7-7 7"/></svg>
                    </router-link>
                  </div>
                </div>
              </transition>
            </div>
          </TransitionGroup>
        </div>

        <!-- Divisor oriental -->
        <div class="sup__divider" aria-hidden="true">
          <span class="sup__div-line"></span>
          <span class="sup__div-gem">◆</span>
          <span class="sup__div-kanji">連</span>
          <span class="sup__div-gem">◆</span>
          <span class="sup__div-line sup__div-line--r"></span>
        </div>

        <!-- Canais de Atendimento -->
        <div class="sup__canais-head">
          <span class="sup__canais-kanji" aria-hidden="true">連</span>
          <h2 class="sup__canais-titulo">Canais de <em>Atendimento</em></h2>
        </div>

        <div class="sup__canais">
          <a href="https://wa.me/5531999999999" target="_blank" rel="noopener" class="sup__canal sup__canal--wpp">
            <span class="sup__canal-corner sup__canal-corner--tl" aria-hidden="true"></span>
            <span class="sup__canal-corner sup__canal-corner--br" aria-hidden="true"></span>
            <div class="sup__canal-ico">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.554 4.12 1.523 5.851L.057 23.929l6.283-1.455A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.979 9.979 0 0 1-5.153-1.432l-.371-.221-3.807.883.91-3.701-.244-.389A9.953 9.953 0 0 1 2 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z"/>
              </svg>
            </div>
            <div class="sup__canal-info">
              <span class="sup__canal-lbl">WhatsApp</span>
              <span class="sup__canal-desc">Resposta em até 2h nos dias úteis</span>
              <span class="sup__canal-val">+55 (31) 99999-9999</span>
            </div>
            <svg class="sup__canal-arr" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M12.5 5l7 7-7 7"/></svg>
          </a>

          <a href="mailto:contato@noiror.com.br" class="sup__canal sup__canal--email">
            <span class="sup__canal-corner sup__canal-corner--tl" aria-hidden="true"></span>
            <span class="sup__canal-corner sup__canal-corner--br" aria-hidden="true"></span>
            <div class="sup__canal-ico">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </div>
            <div class="sup__canal-info">
              <span class="sup__canal-lbl">E-mail</span>
              <span class="sup__canal-desc">Resposta em até 24h úteis</span>
              <span class="sup__canal-val">contato@noiror.com.br</span>
            </div>
            <svg class="sup__canal-arr" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M12.5 5l7 7-7 7"/></svg>
          </a>

          <div class="sup__canal sup__canal--horario">
            <span class="sup__canal-corner sup__canal-corner--tl" aria-hidden="true"></span>
            <span class="sup__canal-corner sup__canal-corner--br" aria-hidden="true"></span>
            <div class="sup__canal-ico">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <div class="sup__canal-info">
              <span class="sup__canal-lbl">Horário</span>
              <span class="sup__canal-desc">Seg–Sex: 9h às 18h</span>
              <span class="sup__canal-desc">Sábado: 10h às 14h (agendado)</span>
              <span class="sup__canal-desc sup__canal-desc--off">Dom e feriados — fechado</span>
            </div>
          </div>

          <div class="sup__canal sup__canal--local">
            <span class="sup__canal-corner sup__canal-corner--tl" aria-hidden="true"></span>
            <span class="sup__canal-corner sup__canal-corner--br" aria-hidden="true"></span>
            <div class="sup__canal-ico">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
            <div class="sup__canal-info">
              <span class="sup__canal-lbl">Atelier Presencial</span>
              <span class="sup__canal-desc">Visitas com agendamento prévio</span>
              <span class="sup__canal-val">Rua das Artes, 240 — Sabará, MG</span>
            </div>
          </div>
        </div>

        <!-- Garantia de excelência -->
        <div class="sup__garantia">
          <div class="sup__garantia-ico" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
          <div>
            <p class="sup__garantia-titulo">Compromisso com a Excelência</p>
            <p class="sup__garantia-desc">Todos os atendimentos são registrados e acompanhados até a resolução completa. Sua satisfação é nossa métrica mais importante.</p>
          </div>
          <span class="sup__garantia-kanji" aria-hidden="true">証</span>
        </div>

      </main>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const busca     = ref('')
const catAtiva  = ref('todos')
const faqAberto = ref(null)
const horaAtual = ref('')
let clockInterval = null

const suporteOnline = computed(() => {
  const h = parseInt(new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo', hour: 'numeric', hour12: false }))
  const d = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo', weekday: 'short' })
  if (d === 'sáb.') return h >= 10 && h < 14
  if (d === 'dom.') return false
  return h >= 9 && h < 18
})

const updateClock = () => {
  horaAtual.value = new Date().toLocaleTimeString('pt-BR', { timeZone: 'America/Sao_Paulo', hour: '2-digit', minute: '2-digit' })
}
onMounted(() => { updateClock(); clockInterval = setInterval(updateClock, 1000) })
onUnmounted(() => clearInterval(clockInterval))

const categorias = [
  { id: 'todos',     label: 'Todos',       icone: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>' },
  { id: 'pedidos',   label: 'Pedidos',     icone: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/></svg>' },
  { id: 'pagamento', label: 'Pagamento',   icone: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>' },
  { id: 'entrega',   label: 'Entrega',     icone: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/></svg>' },
  { id: 'produto',   label: 'Produto',     icone: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>' },
  { id: 'conta',     label: 'Minha Conta', icone: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>' },
]

const faqs = [
  { cat:'pedidos',   q:'Como acompanho meu pedido?',                a:'Após confirmação do pagamento, você receberá um e-mail com código de rastreamento. Também pode consultar em "Minha Conta → Meus Pedidos".', link:{ label:'Ver meus pedidos', href:'/configuracoes?secao=pedidos' } },
  { cat:'pedidos',   q:'Posso cancelar um pedido?',                 a:'Cancelamentos são aceitos em até 2 horas após confirmação do pagamento, desde que o pedido ainda não tenha sido despachado. Após esse prazo, aplica-se nossa Política de Devoluções.' },
  { cat:'pedidos',   q:'Meu pedido veio errado ou incompleto, o que faço?', a:'Entre em contato via WhatsApp ou e-mail com fotos do produto e número do pedido. Resolveremos em até 48h úteis com envio de substituição sem custo adicional.' },
  { cat:'pagamento', q:'Quais formas de pagamento são aceitas?',    a:'Aceitamos Pix (aprovação instantânea), cartão de crédito em até 12x, cartão de débito e boleto bancário com vencimento em 3 dias úteis. Todos os pagamentos são processados com segurança pelo Mercado Pago.' },
  { cat:'pagamento', q:'O pagamento via Pix é seguro?',             a:'Sim. Utilizamos chaves Pix corporativas registradas em CNPJ, com criptografia ponta a ponta. A confirmação é automática e instantânea após o pagamento.' },
  { cat:'pagamento', q:'Em até quantas parcelas posso parcelar?',   a:'Cartões de crédito aceitam parcelamento em até 12x sem juros. Pagamentos à vista via Pix têm desconto adicional de 5%.' },
  { cat:'entrega',   q:'Qual o prazo de entrega?',                  a:'Produtos do estoque são despachados em até 5 dias úteis. O prazo total varia de 5 a 10 dias para capitais e até 15 dias para localidades remotas.', link:{ label:'Ver política de entrega', href:'/politica-entrega' } },
  { cat:'entrega',   q:'O frete é gratuito?',                       a:'Clientes cadastrados têm frete VIP gratuito em todo o território nacional, sem valor mínimo. O benefício é aplicado automaticamente no checkout após o login.' },
  { cat:'entrega',   q:'Vocês entregam fora do Brasil?',            a:'Atualmente atendemos apenas o território nacional. Entregas internacionais estão em nosso roadmap e serão comunicadas via newsletter.' },
  { cat:'produto',   q:'O que cobre a Garantia Vitalícia?',         a:'A garantia cobre o revestimento em ouro e metais nobres contra oxidação ou desgaste prematuro durante todo o período de posse pelo comprador original.', link:{ label:'Ver garantia completa', href:'/garantia' } },
  { cat:'produto',   q:'Como devo cuidar do meu produto?',          a:'Evite contato com produtos químicos, perfumes e soluções de limpeza. Limpe com pano macio e seco. Guarde em local protegido de umidade e luz solar direta.' },
  { cat:'produto',   q:'Os produtos possuem certificado de autenticidade?', a:'Sim. Todos os produtos são acompanhados de certificado digital e físico com número de série único, atestando a originalidade do revestimento e dos materiais.' },
  { cat:'conta',     q:'Esqueci minha senha, como recupero?',       a:'Clique em "Entrar → Esqueceu a senha?" e informe seu e-mail. Você receberá um link de redefinição com validade de 1 hora.', link:{ label:'Redefinir senha', href:'/redefinir-senha' } },
  { cat:'conta',     q:'Como atualizo meus dados cadastrais?',      a:'Acesse "Minha Conta → Configurações" e atualize seus dados pessoais, endereço de entrega e preferências de comunicação.' },
  { cat:'conta',     q:'Como solicito a exclusão da minha conta?',  a:'Envie uma solicitação formal para contato@noiror.com.br com o assunto "Exclusão de Conta". Processaremos em até 15 dias úteis conforme a LGPD.' },
]

const faqFiltrado = computed(() => {
  let lista = catAtiva.value === 'todos' ? faqs : faqs.filter(f => f.cat === catAtiva.value)
  if (busca.value.trim().length > 1) {
    const q = busca.value.toLowerCase()
    lista = lista.filter(f => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q))
  }
  return lista
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Syne:wght@300;400;600;700;800&family=DM+Mono:wght@300;400&family=Noto+Serif+JP:wght@200;300;400&display=swap');

/* ══ TOKENS ══ */
.suporte {
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
@keyframes pulseGreen { 0%,100%{box-shadow:0 0 0 0 rgba(34,197,94,.3)} 50%{box-shadow:0 0 0 5px rgba(34,197,94,0)} }
@keyframes tickerMove { from{transform:translateX(0)} to{transform:translateX(-25%)} }
@keyframes realmGlow  { 0%,100%{opacity:.55} 50%{opacity:.85} }

/* ══ ATMOSFÉRICOS ══ */
.sup__grain {
  position:fixed; inset:0; z-index:0; pointer-events:none;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E");
}
.sup__bg-grid {
  position:fixed; inset:0; z-index:0; pointer-events:none;
  background-image:
    linear-gradient(rgba(200,168,75,.018) 1px, transparent 1px),
    linear-gradient(90deg, rgba(200,168,75,.018) 1px, transparent 1px);
  background-size: 80px 80px;
}
.sup__beam {
  position:fixed; top:-20%; width:1px; height:140%;
  background:linear-gradient(to bottom, transparent, rgba(200,168,75,.18), transparent);
  filter:blur(3px);
  animation:beamSway 14s ease-in-out infinite alternate;
  pointer-events:none; z-index:1;
}
.sup__beam--1 { left:18%; }
.sup__beam--2 { left:52%; filter:blur(5px); animation-delay:-6s; animation-direction:alternate-reverse; opacity:.6; }
.sup__beam--3 { left:79%; filter:blur(2px); animation-delay:-10s; opacity:.4; }

/* ══ HERO ══ */
.sup__hero {
  position:relative; z-index:2;
  padding: calc(var(--navbar-h, 72px) + 72px) 80px 0;
  border-bottom:.5px solid var(--hair);
  overflow:hidden;
  min-height: 560px;
  display:flex; flex-direction:column; justify-content:flex-end;
}

.sup__hero-kamon {
  position:absolute; right:80px; top:50%; transform:translateY(-45%);
  font-family:var(--f-jp); font-size:clamp(200px,28vw,360px); font-weight:200;
  color:transparent;
  -webkit-text-stroke:.5px rgba(200,168,75,.06);
  pointer-events:none; user-select:none; z-index:0; line-height:1;
  animation:kamonDrift 22s ease-in-out infinite;
}
.sup__realm-line {
  position:absolute; top:0; left:0; right:0; height:.5px; z-index:3;
  background:linear-gradient(90deg, transparent 5%, var(--or2) 20%, var(--or) 50%, var(--or2) 80%, transparent 95%);
  opacity:.65; animation:realmGlow 4s ease-in-out infinite;
}
.sup__edge-line {
  position:absolute; left:calc(6% - 1px); top:0; bottom:0; width:.5px;
  background:linear-gradient(to bottom, transparent, var(--hair) 20%, var(--hair) 80%, transparent);
  z-index:3; pointer-events:none;
}
.sup__edge-num {
  position:absolute; top:50%; left:50%; transform:translateX(-50%) translateY(-50%) rotate(-90deg);
  font-family:var(--f-jp); font-size:16px; color:var(--or); opacity:.18;
  letter-spacing:.1em;
}

.sup__hero-inner {
  position:relative; z-index:2;
  padding-left: calc(6% + 28px);
  padding-bottom: 60px;
}

.sup__breadcrumb {
  display:flex; align-items:center; gap:8px;
  font-family:var(--f-mono); font-size:8px; letter-spacing:.3em; text-transform:uppercase;
  color:var(--text3); margin-bottom:28px;
}
.sup__bc-link { color:var(--or); text-decoration:none; opacity:.7; display:flex; align-items:center; gap:6px; transition:opacity .2s; }
.sup__bc-link:hover { opacity:1; }
.sup__bc-gem { font-size:4px; }
.sup__bc-sep { color:var(--hair); }
.sup__bc-atual { color:var(--text2); }

.sup__eyebrow {
  display:flex; align-items:center; gap:10px; margin-bottom:22px;
  font-family:var(--f-mono); font-size:8px; letter-spacing:.52em; text-transform:uppercase;
  color:var(--or); opacity:.75;
}
.sup__ew-dot {
  width:5px; height:5px; border-radius:50%; background:var(--or); flex-shrink:0;
  animation:dotPulse 2.5s ease-in-out infinite;
}

.sup__titulo { display:flex; flex-direction:column; margin:0 0 18px; line-height:1; }
.sup__t-thin {
  font-family:var(--f-sans); font-size:clamp(1.4rem,3vw,2.8rem); font-weight:300;
  color:var(--text3); letter-spacing:-.01em; text-transform:uppercase; line-height:1; display:block;
}
.sup__t-gold {
  font-family:var(--f-serif); font-size:clamp(3.5rem,8vw,7.5rem); font-weight:300; font-style:italic;
  background:linear-gradient(135deg, var(--or) 0%, var(--or2) 55%, #FF7A20 100%);
  background-size:200% auto;
  -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent;
  animation:goldShine 6s linear infinite;
  line-height:.9; display:block;
}
.sup__t-kanji {
  font-family:var(--f-jp); font-size:clamp(.9rem,1.2vw,1.1rem); font-weight:200;
  letter-spacing:10px; color:var(--or); opacity:.18; margin-top:12px; display:block;
}

.sup__sep { display:flex; align-items:center; gap:10px; width:200px; margin:0 0 18px; }
.sup__sep-line { flex:1; height:.5px; background:linear-gradient(to right, var(--or), transparent); opacity:.4; }
.sup__sep-line--r { background:linear-gradient(to left, var(--or), transparent); }
.sup__sep-gem { font-size:5px; color:var(--or); opacity:.5; }

.sup__sub {
  font-family:var(--f-mono); font-size:9px; letter-spacing:2px; text-transform:uppercase;
  color:var(--text3); margin-bottom:32px; max-width:480px; line-height:1.7;
}

.sup__hero-stats {
  display:flex; align-items:center; gap:0;
  border-top:.5px solid var(--hair); padding-top:24px;
}
.sup__stat {
  display:flex; flex-direction:column; gap:5px; padding:0 32px; position:relative;
}
.sup__stat:first-child { padding-left:0; }
.sup__stat-kanji { position:absolute; top:-8px; right:8px; font-family:var(--f-jp); font-size:20px; font-weight:200; color:var(--or); opacity:.08; line-height:1; }
.sup__stat-num   { font-family:var(--f-serif); font-size:1.7rem; font-weight:300; color:var(--or); line-height:1; }
.sup__stat-lbl   { font-family:var(--f-mono); font-size:7px; letter-spacing:.3em; text-transform:uppercase; color:var(--text3); }
.sup__stat-sep   { width:.5px; height:44px; background:linear-gradient(to bottom, transparent, var(--hair), transparent); flex-shrink:0; }

.sup__status-pill {
  position:absolute; top:calc(var(--navbar-h, 72px) + 28px); right:80px; z-index:4;
  display:flex; align-items:center; gap:10px;
  background:rgba(9,9,15,.7); backdrop-filter:blur(10px);
  border:.5px solid var(--hair); padding:8px 16px;
  font-family:var(--f-mono); font-size:8px; letter-spacing:.2em; text-transform:uppercase; color:var(--text3);
}
.sup__status-dot { width:7px; height:7px; border-radius:50%; flex-shrink:0; }
.sup__status-dot.is-online  { background:#22c55e; animation:pulseGreen 2s ease-in-out infinite; }
.sup__status-dot.is-offline { background:rgba(255,255,255,.2); }
.sup__status-hora { color:var(--or); opacity:.6; }

/* ══ TICKER ══ */
.sup__ticker {
  position:relative; z-index:2;
  background:var(--deep); border-bottom:.5px solid var(--hair);
  height:30px; overflow:hidden;
}
.sup__ticker::before,.sup__ticker::after { content:''; position:absolute; top:0; bottom:0; width:60px; z-index:2; pointer-events:none; }
.sup__ticker::before { left:0; background:linear-gradient(to right, var(--deep), transparent); }
.sup__ticker::after  { right:0; background:linear-gradient(to left, var(--deep), transparent); }
.sup__ticker-track { display:flex; white-space:nowrap; animation:tickerMove 38s linear infinite; height:100%; align-items:center; }
.sup__ticker-set   { display:inline-flex; align-items:center; }
.sup__t-item { font-family:var(--f-mono); font-size:7.5px; letter-spacing:3px; text-transform:uppercase; color:var(--text3); padding:0 20px; height:30px; display:flex; align-items:center; }
.sup__t-sep  { color:var(--or); font-size:5px; opacity:.35; flex-shrink:0; padding:0 3px; }

/* ══ BUSCA ══ */
.sup__busca-wrap {
  position:relative; z-index:2;
  max-width:1360px; margin:0 auto; padding:0 80px;
  transform:translateY(-24px);
}
.sup__busca-inner {
  display:flex; align-items:center; gap:14px; padding:18px 24px;
  background:var(--surf); border:.5px solid var(--hair);
  box-shadow:0 8px 40px rgba(0,0,0,.4);
  position:relative;
}
.sup__busca-inner::before {
  content:''; position:absolute; top:0; left:0; right:0; height:.5px;
  background:linear-gradient(90deg, transparent, var(--or), transparent); opacity:.3;
}
.sup__busca-inner svg { color:var(--or); opacity:.5; flex-shrink:0; }
.sup__busca-input {
  flex:1; background:none; border:none; outline:none;
  font-family:var(--f-sans); font-size:14px; font-weight:300; color:var(--text);
  caret-color:var(--or);
}
.sup__busca-input::placeholder { color:var(--text3); }
.sup__busca-clear { background:none; border:none; color:var(--text3); cursor:pointer; padding:0 2px; transition:color .2s; }
.sup__busca-clear:hover { color:var(--or); }

/* ══ LAYOUT ══ */
.sup__layout {
  display:grid; grid-template-columns:240px 1fr;
  max-width:1360px; margin:0 auto; padding:0 80px 100px;
  position:relative; z-index:2; gap:0;
  padding-top:20px;
}

/* ══ SIDEBAR ══ */
.sup__sidebar {
  padding:28px 0 28px; border-right:.5px solid var(--hair);
  position:sticky; top:calc(var(--navbar-h, 72px) + 20px); align-self:start;
  max-height:calc(100vh - var(--navbar-h, 72px) - 40px); overflow-y:auto;
  scrollbar-width:none;
  display:flex; flex-direction:column; gap:0;
  padding-right:24px;
}
.sup__sidebar::-webkit-scrollbar { display:none; }

.sup__sb-kamon {
  position:absolute; bottom:60px; right:16px;
  font-family:var(--f-jp); font-size:44px; font-weight:200;
  color:var(--or); opacity:.04; pointer-events:none; z-index:0; line-height:1;
}

.sup__sb-ornament { display:flex; align-items:center; gap:10px; margin-bottom:20px; }
.sup__sb-line { flex:1; height:.5px; background:linear-gradient(90deg, var(--or), transparent); opacity:.18; }
.sup__sb-line--r { background:linear-gradient(270deg, var(--or), transparent); }
.sup__sb-kanji { font-family:var(--f-jp); font-size:13px; color:var(--or); opacity:.28; line-height:1; flex-shrink:0; }

.sup__sb-lbl {
  font-family:var(--f-mono); font-size:6px; letter-spacing:5px; text-transform:uppercase;
  color:var(--or); opacity:.6; margin-bottom:10px; display:flex; align-items:center; gap:7px;
}
.sup__sb-lbl-kanji { font-family:var(--f-jp); font-size:13px; font-weight:200; color:var(--or); opacity:.55; letter-spacing:0; line-height:1; }

.sup__sb-nav { display:flex; flex-direction:column; gap:1px; margin-bottom:20px; }
.sup__sb-link {
  display:flex; align-items:center; gap:9px; padding:9px 8px;
  font-family:var(--f-sans); font-size:12px; color:var(--text2); text-decoration:none;
  transition:all .2s; border:.5px solid transparent; position:relative;
}
.sup__sb-link::before {
  content:''; position:absolute; left:0; top:6px; bottom:6px; width:.5px;
  background:var(--or); opacity:0; transition:opacity .2s;
}
.sup__sb-link:hover { color:var(--or); padding-left:12px; }
.sup__sb-link:hover::before { opacity:.6; }
.sup__sb-link--active { color:var(--or); border-color:var(--hair); background:var(--gold3); }
.sup__sb-link--active::before { opacity:.8; }
.sup__sb-link svg { flex-shrink:0; opacity:.5; transition:opacity .2s; }
.sup__sb-link:hover svg,.sup__sb-link--active svg { opacity:1; }

.sup__sb-sep {
  display:flex; align-items:center; gap:10px; padding:14px 0; margin-bottom:14px;
}
.sup__sb-sep-line { flex:1; height:.5px; background:linear-gradient(90deg, transparent, rgba(200,168,75,.15)); }
.sup__sb-sep-kanji { font-family:var(--f-jp); font-size:11px; font-weight:200; color:var(--or); opacity:.28; flex-shrink:0; line-height:1; }

.sup__sb-status {
  display:flex; align-items:center; gap:10px; padding:12px;
  background:rgba(255,255,255,.03); border:.5px solid var(--hair); margin-bottom:16px;
}
.sup__sb-status-dot { width:8px; height:8px; border-radius:50%; flex-shrink:0; }
.sup__sb-status-dot.is-online  { background:#22c55e; animation:pulseGreen 2s ease-in-out infinite; }
.sup__sb-status-dot.is-offline { background:rgba(255,255,255,.2); }
.sup__sb-status-titulo { font-size:11px; font-weight:600; color:var(--text2); }
.sup__sb-status-hora   { font-family:var(--f-mono); font-size:10px; color:var(--or); opacity:.6; }

.sup__sb-voltar {
  display:inline-flex; align-items:center; gap:8px;
  font-family:var(--f-mono); font-size:8px; letter-spacing:.3em; text-transform:uppercase;
  color:var(--or); text-decoration:none; border:.5px solid var(--hair); padding:10px 14px;
  transition:all .2s; margin-bottom:16px;
}
.sup__sb-voltar:hover { border-color:var(--hairH); background:var(--gold3); }

.sup__sb-watermark {
  font-family:var(--f-serif); font-size:8px; font-style:italic;
  letter-spacing:.5em; text-transform:uppercase; color:var(--or); opacity:.07;
  text-align:center; margin-top:auto; padding-top:16px;
  pointer-events:none; user-select:none;
}

/* ══ MAIN ══ */
.sup__main {
  padding:0 0 0 48px;
  display:flex; flex-direction:column; gap:0;
}

/* Categorias */
.sup__cats {
  display:flex; gap:6px; flex-wrap:wrap; margin-bottom:32px;
}
.sup__cat {
  position:relative; overflow:hidden;
  display:inline-flex; align-items:center; gap:7px;
  padding:8px 16px;
  background:transparent; border:.5px solid var(--hair);
  font-family:var(--f-mono); font-size:8px; letter-spacing:.3em; text-transform:uppercase;
  color:var(--text3); cursor:pointer; transition:color .4s; z-index:0;
}
.sup__cat-fill {
  position:absolute; inset:0; transform:scaleX(0); transform-origin:left;
  background:var(--or); transition:transform .5s var(--ease); z-index:-1;
}
.sup__cat:hover .sup__cat-fill,
.sup__cat.is-active .sup__cat-fill { transform:scaleX(1); }
.sup__cat:hover,
.sup__cat.is-active { color:var(--void); border-color:var(--or); }
.sup__cat-ico { display:flex; align-items:center; }
.sup__cat-txt { line-height:1; }

/* FAQ */
.sup__faq { margin-bottom:48px; }
.sup__faq-head {
  display:flex; align-items:center; gap:12px; margin-bottom:20px;
  padding-bottom:14px; border-bottom:.5px solid var(--hair); position:relative;
}
.sup__faq-head::after {
  content:''; position:absolute; bottom:-1px; left:0; width:44px; height:1px;
  background:var(--or); opacity:.6;
}
.sup__faq-kanji { font-family:var(--f-jp); font-size:1.3rem; font-weight:200; color:var(--or); opacity:.15; line-height:1; }
.sup__faq-lbl   { font-family:var(--f-mono); font-size:7px; letter-spacing:.5em; text-transform:uppercase; color:var(--or); opacity:.6; }
.sup__faq-count { font-family:var(--f-mono); font-size:8px; color:var(--text3); margin-left:auto; }

.sup__faq-lista { display:flex; flex-direction:column; }
.sup__faq-item  { border-bottom:.5px solid rgba(255,255,255,.05); }
.sup__faq-item:first-child { border-top:.5px solid rgba(255,255,255,.05); }

.sup__faq-q {
  width:100%; display:flex; align-items:center; gap:16px;
  padding:18px 0; background:none; border:none; cursor:pointer; text-align:left;
  position:relative;
}
.sup__faq-q::before {
  content:''; position:absolute; left:-14px; top:14px; bottom:14px; width:.5px;
  background:var(--or); opacity:0; transition:opacity .3s;
}
.sup__faq-item.is-open .sup__faq-q::before,
.sup__faq-q:hover::before { opacity:.6; }

.sup__faq-num {
  font-family:var(--f-mono); font-size:10px; color:var(--or); opacity:.28;
  flex-shrink:0; min-width:28px;
}
.sup__faq-texto {
  flex:1; font-family:var(--f-sans); font-size:14px; color:var(--text2);
  letter-spacing:.01em; transition:color .2s; text-align:left;
}
.sup__faq-item.is-open .sup__faq-texto,
.sup__faq-q:hover .sup__faq-texto { color:var(--text); }

.sup__faq-chevron {
  color:var(--text3); flex-shrink:0;
  transition:transform .35s var(--ease), color .25s;
}
.sup__faq-chevron.is-open { transform:rotate(180deg); color:var(--or); }

.sup__faq-a { padding:0 0 22px 44px; overflow:hidden; }
.sup__faq-a-bar { width:24px; height:.5px; background:var(--or); opacity:.4; margin-bottom:12px; }
.sup__faq-a p   { font-family:var(--f-sans); font-size:13px; font-weight:300; color:var(--text3); line-height:1.9; }

.sup__faq-link-wrap { margin-top:12px; }
.sup__faq-link {
  display:inline-flex; align-items:center; gap:7px;
  font-family:var(--f-mono); font-size:8px; letter-spacing:.3em; text-transform:uppercase;
  color:var(--or); text-decoration:none; border-bottom:.5px solid rgba(200,168,75,.3);
  padding-bottom:2px; transition:all .2s;
}
.sup__faq-link:hover { gap:11px; border-color:var(--or); }

/* FAQ vazio */
.sup__faq-vazio {
  display:flex; flex-direction:column; align-items:center; justify-content:center;
  gap:12px; padding:72px 40px; text-align:center;
}
.sup__vazio-ico {
  width:64px; height:64px; border:.5px solid var(--hair);
  display:flex; align-items:center; justify-content:center;
  position:relative;
}
.sup__vazio-ico::before { content:''; position:absolute; top:-1px; left:-1px; width:10px; height:10px; border-top:.5px solid var(--or); border-left:.5px solid var(--or); }
.sup__vazio-ico::after  { content:''; position:absolute; bottom:-1px; right:-1px; width:10px; height:10px; border-bottom:.5px solid var(--or); border-right:.5px solid var(--or); }
.sup__vazio-kanji  { font-family:var(--f-jp); font-size:28px; color:var(--or); opacity:.35; line-height:1; }
.sup__vazio-titulo { font-family:var(--f-mono); font-size:9px; letter-spacing:.35em; text-transform:uppercase; color:var(--text3); }
.sup__vazio-sub    { font-size:13px; color:var(--text3); opacity:.55; }

/* Transições FAQ */
.faq-drop-enter-active,.faq-drop-leave-active { transition:opacity .3s, max-height .4s; overflow:hidden; }
.faq-drop-enter-from,.faq-drop-leave-to { opacity:0; max-height:0; }
.faq-drop-enter-to,.faq-drop-leave-from { opacity:1; max-height:400px; }
.faq-list-enter-active,.faq-list-leave-active { transition:opacity .25s, transform .3s; }
.faq-list-enter-from,.faq-list-leave-to { opacity:0; transform:translateY(-6px); }

/* ══ DIVISOR ══ */
.sup__divider {
  display:flex; align-items:center; gap:14px; margin:40px 0;
}
.sup__div-line { flex:1; height:.5px; background:linear-gradient(to right, transparent, rgba(200,168,75,.2)); }
.sup__div-line--r { background:linear-gradient(to left, transparent, rgba(200,168,75,.2)); }
.sup__div-gem   { font-size:5px; color:var(--or); opacity:.4; }
.sup__div-kanji { font-family:var(--f-jp); font-size:14px; font-weight:200; color:var(--or); opacity:.25; line-height:1; }

/* ══ CANAIS ══ */
.sup__canais-head {
  display:flex; align-items:center; gap:14px; margin-bottom:24px;
}
.sup__canais-kanji { font-family:var(--f-jp); font-size:1.3rem; font-weight:200; color:var(--or); opacity:.15; line-height:1; }
.sup__canais-titulo {
  font-family:var(--f-serif); font-size:1.7rem; font-weight:300; color:var(--text); margin:0;
}
.sup__canais-titulo em { font-style:italic; color:var(--or); }

.sup__canais { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:32px; }

.sup__canal {
  display:flex; align-items:flex-start; gap:16px; padding:22px 20px;
  background:var(--surf); border:.5px solid var(--hair);
  transition:all .3s; position:relative; overflow:hidden; text-decoration:none;
}
.sup__canal::before {
  content:''; position:absolute; top:0; left:0; right:0; height:.5px;
  background:linear-gradient(90deg, transparent, var(--or), transparent);
  opacity:0; transition:opacity .3s;
}
.sup__canal:hover::before { opacity:.5; }
.sup__canal:hover { border-color:var(--hairH); background:rgba(200,168,75,.02); }

.sup__canal-corner {
  position:absolute; width:10px; height:10px;
  border-color:rgba(200,168,75,0); border-style:solid;
  pointer-events:none; transition:border-color .3s;
}
.sup__canal-corner--tl { top:8px; left:8px; border-width:.5px 0 0 .5px; }
.sup__canal-corner--br { bottom:8px; right:8px; border-width:0 .5px .5px 0; }
.sup__canal:hover .sup__canal-corner { border-color:rgba(200,168,75,.3); }

.sup__canal-ico {
  width:44px; height:44px; flex-shrink:0; border:.5px solid var(--hair);
  background:rgba(200,168,75,.05); display:flex; align-items:center; justify-content:center;
  color:var(--or); opacity:.65; transition:opacity .25s;
}
.sup__canal:hover .sup__canal-ico { opacity:1; }
.sup__canal--wpp .sup__canal-ico { color:#25D366; }

.sup__canal-info { flex:1; display:flex; flex-direction:column; gap:4px; }
.sup__canal-lbl  { font-family:var(--f-mono); font-size:8px; letter-spacing:.4em; text-transform:uppercase; color:var(--or); opacity:.8; font-weight:600; }
.sup__canal-desc { font-family:var(--f-sans); font-size:11px; color:var(--text3); font-weight:300; line-height:1.5; }
.sup__canal-desc--off { opacity:.35; }
.sup__canal-val  { font-family:var(--f-mono); font-size:12px; color:var(--text2); margin-top:2px; }

.sup__canal-arr  { color:var(--text3); flex-shrink:0; align-self:center; transition:transform .2s, color .2s; }
.sup__canal:hover .sup__canal-arr { transform:translateX(3px); color:var(--or); }

/* ══ GARANTIA ══ */
.sup__garantia {
  display:flex; align-items:flex-start; gap:16px; padding:22px 24px;
  background:rgba(200,168,75,.03); border:.5px solid rgba(200,168,75,.15);
  border-left:2px solid rgba(200,168,75,.4); position:relative; overflow:hidden;
}
.sup__garantia-ico  { color:var(--or); opacity:.6; flex-shrink:0; margin-top:2px; }
.sup__garantia-titulo { font-family:var(--f-sans); font-size:12px; font-weight:600; letter-spacing:.05em; color:var(--text); margin-bottom:6px; }
.sup__garantia-desc   { font-family:var(--f-sans); font-size:12px; font-weight:300; color:var(--text3); line-height:1.8; }
.sup__garantia-kanji  {
  position:absolute; right:16px; bottom:-8px;
  font-family:var(--f-jp); font-size:52px; font-weight:200; color:var(--or); opacity:.05;
  pointer-events:none; line-height:1;
}

/* ══ RESPONSIVO ══ */
@media (max-width:1200px) {
  .sup__hero { padding:calc(var(--navbar-h, 72px) + 56px) 48px 0; }
  .sup__busca-wrap { padding:0 48px; }
  .sup__layout { padding:0 48px 80px; }
}
@media (max-width:900px) {
  .sup__hero { padding:calc(var(--navbar-h, 72px) + 40px) 24px 0; }
  .sup__hero-kamon { display:none; }
  .sup__edge-line  { display:none; }
  .sup__status-pill { right:24px; }
  .sup__busca-wrap { padding:0 24px; }
  .sup__layout { grid-template-columns:1fr; padding:0 24px 60px; }
  .sup__sidebar { position:static; max-height:none; padding-right:0; border-right:none; border-bottom:.5px solid var(--hair); padding-bottom:24px; margin-bottom:8px; }
  .sup__main { padding:24px 0 0; }
  .sup__canais { grid-template-columns:1fr; }
  .sup__hero-inner { padding-left:0; }
}
@media (max-width:600px) {
  .sup__hero { padding:calc(var(--navbar-h, 70px) + 28px) 16px 0; }
  .sup__busca-wrap { padding:0 16px; }
  .sup__layout { padding:0 16px 48px; }
  .sup__hero-stats { flex-direction:column; gap:16px; }
  .sup__stat-sep { display:none; }
  .sup__cats { gap:5px; }
  .sup__cat  { padding:7px 12px; font-size:7px; }
}
@media (prefers-reduced-motion: reduce) {
  .sup__t-gold,.sup__ticker-track,.sup__beam,
  .sup__hero-kamon,.sup__ew-dot { animation:none !important; }
}
</style>