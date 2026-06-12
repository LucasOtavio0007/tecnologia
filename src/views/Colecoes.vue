<template>
  <main class="col-page">

    <!-- HERO -->
    <section class="col-hero">
      <div class="col-hero-orb"></div>
      <div class="col-hero-orb col-hero-orb--2"></div>
      <div class="col-hero-content">
        <div class="col-hero-tag animate-up">
          <span class="tag-line"></span>
          <span>{{ $t('archive.selection.editions.limitees.2026') }}</span>
          <span class="tag-line"></span>
        </div>
        <h1 class="col-hero-titulo animate-up delay-1">{{ $t('as.pecas.que.definem') }}<br/><em>{{ $t('o.luxo.tecnologico') }}</em></h1>
        <p class="col-hero-sub animate-up delay-2">{{ $t('cada.colecao.e.limitada.numerada.e.nunca.sera.reproduzida') }}</p>
        <div class="col-hero-actions animate-up delay-3">
          <a href="#colecoes" class="col-hero-btn-primary">
            {{ $t('explorar.colecoes') }}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <router-link to="/loja" class="col-hero-btn-ghost">{{ $t('ver.produtos') }}</router-link>
        </div>
        <div class="col-hero-stats animate-up delay-3">
          <div class="col-stat"><span class="col-stat-num">{{ colecoes.length }}</span><span class="col-stat-label">{{ $t('colecoes') }}</span></div>
          <div class="col-stat-div"></div>
          <div class="col-stat"><span class="col-stat-num">{{ totalPecas }}</span><span class="col-stat-label">{{ $t('pecas.produzidas') }}</span></div>
          <div class="col-stat-div"></div>
          <div class="col-stat"><span class="col-stat-num">{{ colecoes.filter(c=>c.esgotado).length }}</span><span class="col-stat-label">{{ $t('esgotadas') }}</span></div>
        </div>
      </div>
      <div class="col-hero-scroll">
        <div class="scroll-mouse"><div class="scroll-wheel"></div></div>
        <span>{{ $t('role') }}</span>
      </div>
    </section>

    <!-- PILARES -->
    <section class="col-pilares">
      <div class="col-pilares-inner">
        <div v-for="p in pilares" :key="p.titulo" class="col-pilar">
          <div class="col-pilar-icon" v-html="p.icon"></div>
          <h4 class="col-pilar-titulo">{{ p.titulo }}</h4>
          <p class="col-pilar-desc">{{ p.desc }}</p>
        </div>
      </div>
    </section>

    <!-- PRESTÍGIO -->
    <section class="col-prestigio">
      <div class="col-prestigio-inner">
        <div class="col-prestigio-linha"></div>
        <blockquote class="col-prestigio-texto">
          {{ $t('menos.de') }} <em>1%</em> {{ $t('dos.clientes.possuem') }}<br/>{{ $t('uma.peca.noir.or') }}
        </blockquote>
        <div class="col-prestigio-linha"></div>
      </div>
    </section>

    <!-- FILTROS + GRID -->
    <section class="col-grid-sec" id="colecoes">
      <div class="col-grid-header">
        <div class="col-grid-header-inner">
          <div>
            <span class="eyebrow">{{ $t('arquivo.de.colecoes') }}</span>
            <p class="col-grid-guia">{{ $t('explore.cada.capitulo.e.descubra.o.nivel.de.exclusividade.de.cada.obra') }}</p>
          </div>
        </div>
      </div>

      <!-- FILTROS -->
      <div class="col-filtros">
        <div class="col-filtros-inner">
          <button v-for="f in filtros" :key="f.id" :class="['col-filtro-btn',{ativo:filtroAtivo===f.id}]" @click="filtroAtivo=f.id">
            <span v-html="f.icon"></span>
            {{ f.label }}
            <span class="col-filtro-count">{{ contagem(f.id) }}</span>
          </button>
        </div>
      </div>

      <transition-group name="col-list" class="col-grid">
        <article v-for="col in colecoesFiltradas" :key="col.id" class="col-card" @click="abrirModal(col)">
          <div class="col-card-media">
            <img :src="col.imagem" :alt="col.nome" class="col-card-img" />
            <div class="col-card-overlay">
              <div class="col-card-overlay-content">
                <p class="col-card-overlay-desc">{{ col.descricao }}</p>
                <div class="col-card-overlay-footer">
                  <span class="col-card-ver">{{ $t('descobrir.historia') }}</span>
                  <span class="col-card-unidades">{{ col.unidades }} unidades</span>
                </div>
              </div>
            </div>
            <div class="col-card-badges">
              <span v-if="col.esgotado"      class="col-badge col-badge--esgotado">{{ $t('esgotado') }}</span>
              <span v-else-if="col.novo"     class="col-badge col-badge--novo">{{ $t('novo.2026') }}</span>
              <span v-else-if="col.limitado" class="col-badge col-badge--limitado">{{ $t('serie.limitada') }}</span>
            </div>
            <div class="col-card-num">{{ String(col.id).padStart(2,'0') }} / {{ String(colecoes.length).padStart(2,'0') }}</div>
            <div class="col-card-ano">{{ col.ano }}</div>
          </div>
          <div class="col-card-info">
            <div class="col-card-info-top">
              <span class="col-card-cat">{{ col.categoria }}</span>
              <span class="col-card-tag">{{ col.tag }}</span>
            </div>
            <h3 class="col-card-nome">{{ col.nome }}</h3>
            <p class="col-card-teaser">{{ col.teaser }}</p>
            <div class="col-card-meta">
              <span class="col-card-meta-item">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                {{ col.unidades }} unidades
              </span>
              <span class="col-card-meta-sep">·</span>
              <span class="col-card-meta-item">{{ col.materia }}</span>
            </div>
          </div>
        </article>
      </transition-group>

      <div v-if="!colecoesFiltradas.length" class="col-vazio">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--gold-30)" stroke-width="1">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <p>{{ $t('nenhuma.colecao.encontrada') }}</p>
      </div>
    </section>

    <!-- CTA FINAL -->
    <section class="col-cta">
      <div class="col-cta-inner">
        <div class="col-cta-left">
          <span class="eyebrow">{{ $t('private.commission') }}</span>
          <h2 class="col-cta-titulo">{{ $t('nao.achou.o.que') }}<br/><em>{{ $t('procura') }}</em></h2>
          <p class="col-cta-desc">{{ $t('criamos.pecas.sob.encomenda.com.especificacoes.exclusivas.metal.textura.gravacao.e.embalagem.personalizados.para.voce') }}</p>
        </div>
        <div class="col-cta-right">
          <router-link to="/loja" class="col-cta-btn col-cta-btn--gold">
            {{ $t('ver.produtos.disponiveis') }}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </router-link>
          <router-link to="/contato" class="col-cta-btn col-cta-btn--ghost">
            {{ $t('criar.minha.peca') }}
          </router-link>
          <p class="col-cta-nota">{{ $t('prazo.medio.30.a.90.dias.producao.unica.numerada') }}</p>
        </div>
      </div>
    </section>

    <!-- MODAL EDITORIAL -->
    <teleport to="body">
      <transition name="fade">
        <div v-if="modalAberto && colecaoModal" class="col-modal-overlay" @click.self="modalAberto=false">
          <div class="col-modal">
            <button class="col-modal-close" @click="modalAberto=false">✕</button>

            <div class="col-modal-hero" :style="{backgroundImage:`url(${colecaoModal.imagem})`}">
              <div class="col-modal-hero-overlay"></div>
              <div class="col-modal-hero-content">
                <span class="col-card-cat">{{ colecaoModal.categoria }}</span>
                <h2 class="col-modal-titulo">{{ colecaoModal.nome }}</h2>
                <p class="col-modal-subtag">{{ colecaoModal.tag }} &nbsp;·&nbsp; {{ colecaoModal.ano }}</p>
              </div>
            </div>

            <div class="col-modal-body">

              <!-- HISTÓRIA -->
              <div class="col-modal-section">
                <span class="col-modal-section-label">{{ $t('historia.da.colecao') }}</span>
                <p class="col-modal-text">{{ colecaoModal.historia }}</p>
              </div>

              <div class="col-modal-divider"></div>

              <!-- PROCESSO -->
              <div class="col-modal-section">
                <span class="col-modal-section-label">{{ $t('processo.de.criacao') }}</span>
                <div class="col-modal-processo-grid">
                  <div v-for="p in colecaoModal.processo" :key="p.label" class="col-modal-processo-item">
                    <span class="col-modal-processo-label">{{ p.label }}</span>
                    <span class="col-modal-processo-valor">{{ p.valor }}</span>
                  </div>
                </div>
              </div>

              <div class="col-modal-divider"></div>

              <!-- EXCLUSIVIDADE -->
              <div class="col-modal-section">
                <span class="col-modal-section-label">{{ $t('exclusividade') }}</span>
                <div class="col-modal-excl-grid">
                  <div class="col-modal-excl-item">
                    <span class="col-modal-excl-num">{{ String(colecaoModal.id).padStart(2,'0') }}</span>
                    <span class="col-modal-excl-label">{{ $t('n.da.colecao') }}</span>
                  </div>
                  <div class="col-modal-excl-item">
                    <span class="col-modal-excl-num">{{ colecaoModal.unidades }}</span>
                    <span class="col-modal-excl-label">{{ $t('unidades.totais') }}</span>
                  </div>
                  <div class="col-modal-excl-item">
                    <span class="col-modal-excl-num">{{ colecaoModal.unidades - colecaoModal.vendidos }}</span>
                    <span class="col-modal-excl-label">{{ $t('ainda.disponiveis') }}</span>
                  </div>
                  <div class="col-modal-excl-item">
                    <span :class="['col-modal-excl-status', colecaoModal.esgotado ? 'esgotado' : 'ativo']">
                      {{ colecaoModal.esgotado ? 'ENCERRADA' : 'ATIVA' }}
                    </span>
                    <span class="col-modal-excl-label">{{ $t('status_1') }}</span>
                  </div>
                </div>
                <div v-if="!colecaoModal.esgotado" class="col-modal-prog">
                  <div class="col-card-prog-track"><div class="col-card-prog-fill" :style="{width:(colecaoModal.vendidos/colecaoModal.unidades*100)+'%'}"></div></div>
                  <span class="col-card-prog-label"><strong>{{ colecaoModal.unidades - colecaoModal.vendidos }}</strong> de {{ colecaoModal.unidades }} {{ $t('pecas.ainda.disponiveis') }}</span>
                </div>
              </div>

              <!-- CTAs -->
              <div class="col-modal-btns">
                <router-link :to="`/loja?colecao=${colecaoModal.id}`" class="col-modal-btn-gold" @click="modalAberto=false">
                  {{ $t('ver.produtos.desta.colecao') }}
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </router-link>
                <router-link to="/contato" class="col-modal-btn-ghost" @click="modalAberto=false">
                  {{ $t('falar.com.consultor') }}
                </router-link>
              </div>

            </div>
          </div>
        </div>
      </transition>
    </teleport>

  </main>
</template>

<script setup>
import { ref, computed } from 'vue'

const filtroAtivo  = ref('TODAS')
const modalAberto  = ref(false)
const colecaoModal = ref(null)

const pilares = [
  {
    titulo: 'Produção Limitada',
    desc: 'Nenhuma coleção ultrapassa 50 unidades. Cada peça é numerada individualmente e acompanhada de certificado de autenticidade.',
    icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--cor-primaria)" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>'
  },
  {
    titulo: 'Materiais Premium',
    desc: 'Utilizamos exclusivamente ouro 18k e 24k, titânio aeroespacial, resinas especiais e acabamentos artesanais aplicados à mão.',
    icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--cor-primaria)" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'
  },
  {
    titulo: 'Design Exclusivo',
    desc: 'Cada coleção nasce de um conceito único, desenvolvido internamente pelo atelier. Não existe outra igual no mundo.',
    icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--cor-primaria)" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>'
  },
]

const filtros = [
  { id:'TODAS',     label:'Todas',     icon:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>' },
  { id:'COMPUTING', label:'Computing', icon:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>' },
  { id:'MOBILE',    label:'Mobile',    icon:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>' },
  { id:'AUDIO',     label:'Audio',     icon:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>' },
  { id:'GAMING',    label:'Gaming',    icon:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><circle cx="15" cy="11" r="1" fill="currentColor"/><circle cx="17" cy="13" r="1" fill="currentColor"/><path d="M5 8h14l1 8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2L5 8z"/></svg>' },
  { id:'VISUAL',    label:'Visual',    icon:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>' },
]

const colecoes = [
  {
    id:1, nome:'Gold Noir I — MacBook', categoria:'COMPUTING', tag:'24K GOLD', ano:'2022',
    unidades:10, vendidos:10, esgotado:true, novo:false, limitado:true,
    imagem:'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80',
    descricao:'A primeira e mais icônica coleção da Noir & Or.',
    teaser:'O ponto de partida. Dez máquinas que inauguraram uma era.',
    materia:'Ouro 24K',
    historia:'Em 2022, a Noir & Or nasceu com uma pergunta simples: e se a tecnologia pudesse ser tratada como joalheria? Gold Noir I foi a resposta. Apenas dez MacBook Pro foram selecionados, desmontados folha por folha, e revestidos manualmente com ouro 24K em processo artesanal de cinco semanas. Cada peça tem um número gravado no interior da estrutura — invisível ao olho, mas presente para sempre.',
    processo:[
      { label:'MATERIAL',      valor:'Ouro 24K puro' },
      { label:'TEMPO',         valor:'5 semanas / unidade' },
      { label:'INSPIRAÇÃO',    valor:'Joalheria suíça' },
      { label:'TÉCNICA',       valor:'Aplicação manual folha a folha' },
    ]
  },
  {
    id:2, nome:'Obsidian iPhone Series', categoria:'MOBILE', tag:'TITÂNIO + OURO', ano:'2023',
    unidades:50, vendidos:42, esgotado:false, novo:false, limitado:true,
    imagem:'https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=800&q=80',
    descricao:'iPhone 16 Pro em titânio negro com filamentos metálicos embutidos no chassis.',
    teaser:'O preto que guarda ouro. Uma contradição deliberada.',
    materia:'Titânio + Ouro 18K',
    historia:'Obsidian nasceu da tensão entre o preto absoluto e o dourado intenso. O titânio aeroespacial, famoso por sua dureza incomparável, foi tratado com oxidação controlada para atingir um negro profundo. Sobre essa superfície, filamentos de ouro 18K foram aplicados em padrão geométrico exclusivo — visíveis apenas quando a luz incide em ângulo preciso. Uma peça que muda conforme você a move.',
    processo:[
      { label:'MATERIAL',      valor:'Titânio aeroespacial + Ouro 18K' },
      { label:'TEMPO',         valor:'3 semanas / unidade' },
      { label:'INSPIRAÇÃO',    valor:'Arquitetura japonesa' },
      { label:'TÉCNICA',       valor:'Oxidação controlada + filigrana' },
    ]
  },
  {
    id:3, nome:'Aureum Audio Collection', categoria:'AUDIO', tag:'SÉRIE COMPLETA', ano:'2024',
    unidades:30, vendidos:18, esgotado:false, novo:false, limitado:true,
    imagem:'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    descricao:'Fones e headphones revestidos com acabamento fosco exclusivo.',
    teaser:'Para quem ouve diferente — e quer que todos percebam.',
    materia:'Ouro 18K fosco',
    historia:'A Aureum Collection partiu de uma crença: o som de alta fidelidade merece uma forma de alta fidelidade. Os fones foram desconstruídos, cada componente externo recebeu camadas de ouro 18K em acabamento fosco — diferente do brilho clássico, o mate cria uma profundidade visual única que não envelhece. A série inclui AirPods Max, Sony WH-1000XM5 e Bang & Olufsen Beoplay H95.',
    processo:[
      { label:'MATERIAL',      valor:'Ouro 18K fosco' },
      { label:'TEMPO',         valor:'2 semanas / unidade' },
      { label:'INSPIRAÇÃO',    valor:'Design escandinavo' },
      { label:'TÉCNICA',       valor:'PVD + banho galvânico' },
    ]
  },
  {
    id:4, nome:'Console Noir Or Edition', categoria:'GAMING', tag:'OURO 18K', ano:'2024',
    unidades:20, vendidos:19, esgotado:false, novo:false, limitado:true,
    imagem:'https://images.unsplash.com/photo-1605902711622-cfb43c4437b5?w=800&q=80',
    descricao:'PS5 e Xbox Series X em edição única com revestimento artesanal.',
    teaser:'Quando o jogo vira arte — e a arte vira coleção.',
    materia:'Ouro 18K + laca preta',
    historia:'Noir Or Edition desafiou um paradigma: o console gamer sempre foi associado ao plástico agressivo, ao RGB frenético. Aqui, cada PS5 e Xbox Series X foi revestido em preto absoluto com painéis em ouro 18K. As ventilações foram redesenhadas em padrão art-déco. O resultado é um objeto que dialoga tanto com uma galeria de arte quanto com a sala de estar mais exigente.',
    processo:[
      { label:'MATERIAL',      valor:'Ouro 18K + laca automotiva' },
      { label:'TEMPO',         valor:'4 semanas / unidade' },
      { label:'INSPIRAÇÃO',    valor:'Art déco dos anos 1930' },
      { label:'TÉCNICA',       valor:'Gravação a laser + banho manual' },
    ]
  },
  {
    id:5, nome:'Vision Spatial Or', categoria:'COMPUTING', tag:'EDIÇÃO ESPECIAL', ano:'2025',
    unidades:15, vendidos:11, esgotado:false, novo:false, limitado:true,
    imagem:'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=800&q=80',
    descricao:'Apple Vision Pro com armação premium e lentes anti-reflexo.',
    teaser:'O futuro tem textura. E a textura é dourada.',
    materia:'Ouro 24K + titânio',
    historia:'Vision Spatial Or representa o ponto mais ousado da Noir & Or: revestir o primeiro computador espacial da Apple. A armação externa em alumínio foi substituída por titânio e coberta em ouro 24K. As lentes receberam coating anti-reflexo de grau óptico. A faixa de tecido foi substituída por couro de grão nobre com costura em fio de ouro. Uma visão do futuro, com a alma do passado.',
    processo:[
      { label:'MATERIAL',      valor:'Ouro 24K + couro premium' },
      { label:'TEMPO',         valor:'6 semanas / unidade' },
      { label:'INSPIRAÇÃO',    valor:'Alta-costura parisiense' },
      { label:'TÉCNICA',       valor:'Substituição estrutural + banho PVD' },
    ]
  },
  {
    id:6, nome:'Noir Display — 8K OLED', categoria:'VISUAL', tag:'ÚNICO NO BRASIL', ano:'2025',
    unidades:5, vendidos:4, esgotado:false, novo:false, limitado:true,
    imagem:'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&q=80',
    descricao:'Samsung OLED 8K 85" com moldura esculpida em ouro.',
    teaser:'Cinco. Apenas cinco. No Brasil inteiro.',
    materia:'Ouro 24K + mármore Calacatta',
    historia:'Cinco unidades. Esse é o número total da Noir Display. A moldura de um Samsung OLED 8K de 85 polegadas foi substituída por peça esculpida em mármore Calacatta com inserções em ouro 24K — cada moldura diferente da outra, pois segue as veias naturais do mármore. Um objeto de decoração que por acaso também exibe imagens em 8K. Já está nas residências dos clientes mais seletos do Brasil.',
    processo:[
      { label:'MATERIAL',      valor:'Mármore Calacatta + Ouro 24K' },
      { label:'TEMPO',         valor:'8 semanas / unidade' },
      { label:'INSPIRAÇÃO',    valor:'Palazzos venezianos' },
      { label:'TÉCNICA',       valor:'Escultura manual + incrustação' },
    ]
  },
  {
    id:7, nome:'Or Fold — Galaxy Collection', categoria:'MOBILE', tag:'NOVO 2026', ano:'2026',
    unidades:25, vendidos:3, esgotado:false, novo:true, limitado:false,
    imagem:'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=800&q=80',
    descricao:'Galaxy Z Fold 6 dobrável. Primeira coleção com tela flexível revestida.',
    teaser:'Dobrar o futuro — com ouro nas dobras.',
    materia:'Ouro 18K + safira sintética',
    historia:'Or Fold representa um salto técnico sem precedentes: revestir um smartphone dobrável. O mecanismo de dobradiça — parte mais delicada do Galaxy Z Fold 6 — foi substituído por peça em aço cirúrgico polido. O chassi recebeu ouro 18K em aplicação ultra-fina para não interferir na dobra. A tela externa ganhou proteção em safira sintética. Nossas 25 unidades marcam o início de uma nova era no ateliê.',
    processo:[
      { label:'MATERIAL',      valor:'Ouro 18K + safira sintética' },
      { label:'TEMPO',         valor:'4 semanas / unidade' },
      { label:'INSPIRAÇÃO',    valor:'Origami japonês' },
      { label:'TÉCNICA',       valor:'Microcamadas + reforço estrutural' },
    ]
  },
  {
    id:8, nome:'Atelier iPad — Or Edition', categoria:'COMPUTING', tag:'NOVO 2026', ano:'2026',
    unidades:20, vendidos:6, esgotado:false, novo:true, limitado:false,
    imagem:'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80',
    descricao:'iPad Pro M4 com Apple Pencil Pro em acabamento exclusivo.',
    teaser:'O ateliê cabe na palma da mão. Literalmente.',
    materia:'Ouro 18K + alumínio anodizado',
    historia:'Atelier iPad nasceu de um paradoxo poético: o iPad Pro é o dispositivo criativo definitivo — usado por artistas, arquitetos, designers. E se o próprio objeto se tornasse uma obra? O chassis de alumínio foi anodizado em preto profundo e recebeu gravação a laser com padrão de grade milimétrica, referência às pranchetas de desenho técnico. A Apple Pencil Pro foi recoberta em ouro 18K com grip em couro artesanal.',
    processo:[
      { label:'MATERIAL',      valor:'Ouro 18K + couro artesanal' },
      { label:'TEMPO',         valor:'3 semanas / conjunto' },
      { label:'INSPIRAÇÃO',    valor:'Instrumentos de arquitetura clássica' },
      { label:'TÉCNICA',       valor:'Anodização + gravação laser + banho' },
    ]
  },
]

const colecoesFiltradas = computed(() =>
  filtroAtivo.value === 'TODAS' ? colecoes : colecoes.filter(c => c.categoria === filtroAtivo.value)
)
const totalPecas = computed(() => colecoes.reduce((s,c) => s + c.unidades, 0))
const contagem   = (id) => id === 'TODAS' ? colecoes.length : colecoes.filter(c => c.categoria === id).length
const abrirModal = (col) => { colecaoModal.value = col; modalAberto.value = true }
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;1,400;1,700&display=swap');

/* ─── BASE ─── */
.col-page { background:var(--cor-fundo); color:var(--cor-texto); font-family:'Syne',sans-serif; padding-top:var(--navbar-h,88px); }
.eyebrow { font-size:8px; letter-spacing:6px; text-transform:uppercase; font-weight:700; display:block; margin-bottom:14px; background:var(--grad-texto); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }

/* ─── HERO ─── */
.col-hero { position:relative; padding:80px 80px 80px; overflow:hidden; border-bottom:1px solid var(--cor-borda); min-height:68vh; display:flex; flex-direction:column; justify-content:center; }
.col-hero-orb { position:absolute; width:560px; height:560px; border-radius:50%; background:radial-gradient(circle,var(--gold-08) 0%,transparent 70%); top:-120px; right:-120px; pointer-events:none; filter:blur(80px); }
.col-hero-orb--2 { width:300px; height:300px; top:auto; right:auto; bottom:-80px; left:-60px; opacity:.5; }
.col-hero-content { position:relative; z-index:2; max-width:860px; }
.col-hero-tag { display:flex; align-items:center; gap:16px; margin-bottom:28px; font-size:8px; letter-spacing:6px; color:var(--cor-primaria); text-transform:uppercase; font-weight:700; }
.tag-line { flex:1; max-width:40px; height:1px; background:var(--cor-primaria); opacity:.5; }
.col-hero-titulo { font-family:'Playfair Display',serif; font-size:clamp(3rem,7vw,8rem); font-weight:400; line-height:.9; color:var(--cor-texto); margin-bottom:24px; }
.col-hero-titulo em { font-style:italic; background:var(--grad-texto); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
.col-hero-sub { font-size:15px; color:var(--cor-texto-3); max-width:500px; line-height:1.65; margin-bottom:40px; }
.col-hero-actions { display:flex; align-items:center; gap:16px; margin-bottom:52px; flex-wrap:wrap; }
.col-hero-btn-primary { display:inline-flex; align-items:center; gap:10px; background:var(--grad-btn); color:#0A0A0A; font-family:'Syne',sans-serif; font-size:10px; font-weight:700; letter-spacing:3px; padding:15px 32px; border-radius:2px; text-decoration:none; box-shadow:var(--shadow-btn); transition:transform .25s,box-shadow .25s; text-transform:uppercase; }
.col-hero-btn-primary:hover { transform:translateY(-2px); box-shadow:var(--shadow-btn-hover); }
.col-hero-btn-ghost { display:inline-flex; align-items:center; gap:10px; background:transparent; border:1px solid var(--cor-borda-hover); color:var(--cor-primaria); font-family:'Syne',sans-serif; font-size:10px; font-weight:700; letter-spacing:3px; padding:14px 32px; border-radius:2px; text-decoration:none; transition:all .25s; text-transform:uppercase; }
.col-hero-btn-ghost:hover { background:var(--gold-05); border-color:var(--cor-primaria); }
.col-hero-stats { display:flex; align-items:center; gap:28px; }
.col-stat { display:flex; flex-direction:column; gap:3px; }
.col-stat-num { font-family:'Playfair Display',serif; font-size:2rem; color:var(--cor-texto); font-weight:400; line-height:1; }
.col-stat-label { font-size:8px; letter-spacing:3px; color:var(--cor-texto-3); text-transform:uppercase; }
.col-stat-div { width:1px; height:32px; background:var(--cor-borda); }
.col-hero-scroll { position:absolute; bottom:32px; left:80px; display:flex; align-items:center; gap:10px; z-index:2; }
.scroll-mouse { width:18px; height:30px; border:1px solid var(--cor-borda-hover); border-radius:20px; display:flex; justify-content:center; }
.scroll-wheel { width:2px; height:5px; background:var(--cor-primaria); margin-top:7px; animation:scrollDown 2s infinite; }
@keyframes scrollDown { 0%{opacity:0;transform:translateY(0)} 100%{opacity:1;transform:translateY(8px)} }
.col-hero-scroll span { font-size:7px; letter-spacing:5px; color:var(--cor-texto-3); text-transform:uppercase; }
.animate-up { opacity:0; animation:fadeUp 1.2s cubic-bezier(.2,1,.3,1) forwards; }
.delay-1{animation-delay:.2s}.delay-2{animation-delay:.4s}.delay-3{animation-delay:.6s}
@keyframes fadeUp { from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)} }

/* ─── PILARES ─── */
.col-pilares { border-bottom:1px solid var(--cor-borda); padding:64px 80px; background:var(--cor-superficie); }
.col-pilares-inner { max-width:1400px; margin:0 auto; display:grid; grid-template-columns:repeat(3,1fr); gap:48px; }
.col-pilar { display:flex; flex-direction:column; gap:12px; }
.col-pilar-icon { width:40px; height:40px; border-radius:50%; background:var(--gold-05); border:1px solid var(--cor-borda); display:flex; align-items:center; justify-content:center; }
.col-pilar-titulo { font-size:11px; letter-spacing:2px; font-weight:700; color:var(--cor-texto); text-transform:uppercase; margin-top:4px; }
.col-pilar-desc { font-size:13px; color:var(--cor-texto-3); line-height:1.7; }

/* ─── PRESTÍGIO ─── */
.col-prestigio { padding:80px 80px; border-bottom:1px solid var(--cor-borda); }
.col-prestigio-inner { max-width:900px; margin:0 auto; display:flex; align-items:center; gap:40px; }
.col-prestigio-linha { flex:1; height:1px; background:linear-gradient(90deg, transparent, var(--cor-borda), transparent); }
.col-prestigio-texto { font-family:'Playfair Display',serif; font-size:clamp(1.4rem,2.5vw,2.2rem); font-weight:400; color:var(--cor-texto-2); line-height:1.4; text-align:center; font-style:normal; white-space:nowrap; }
.col-prestigio-texto em { font-style:italic; background:var(--grad-texto); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }

/* ─── GRID HEADER ─── */
.col-grid-header { padding:56px 80px 0; }
.col-grid-header-inner { max-width:1400px; margin:0 auto; padding-bottom:32px; border-bottom:1px solid var(--cor-borda); }
.col-grid-guia { font-size:13px; color:var(--cor-texto-3); line-height:1.6; max-width:520px; margin-top:4px; }

/* ─── FILTROS ─── */
.col-filtros { padding:0 80px; border-bottom:1px solid var(--cor-borda); }
.col-filtros-inner { max-width:1400px; margin:0 auto; display:flex; gap:0; overflow-x:auto; scrollbar-width:none; }
.col-filtros-inner::-webkit-scrollbar{display:none}
.col-filtro-btn { background:none; border:none; border-bottom:2px solid transparent; color:var(--cor-texto-3); font-family:'Syne',sans-serif; font-size:9px; letter-spacing:3px; padding:16px 20px; cursor:pointer; transition:all .25s; white-space:nowrap; margin-bottom:-1px; display:flex; align-items:center; gap:7px; text-transform:uppercase; font-weight:600; }
.col-filtro-btn:hover { color:var(--cor-texto-2); }
.col-filtro-btn.ativo { color:var(--cor-primaria); border-bottom-color:var(--cor-primaria); }
.col-filtro-count { background:var(--gold-10); border:1px solid var(--cor-borda); color:var(--cor-primaria); font-size:8px; padding:1px 6px; border-radius:10px; letter-spacing:0; }

/* ─── GRID DE CARDS ─── */
.col-grid-sec { padding-bottom:80px; }
.col-grid { max-width:1400px; margin:0 auto; padding:48px 80px 0; display:grid; grid-template-columns:repeat(3,1fr); gap:20px; align-items:start; }
.col-card { cursor:pointer; border-radius:var(--border-radius); overflow:hidden; background:var(--card-bg); border:1px solid var(--cor-borda); transition:border-color .3s,transform .45s cubic-bezier(.2,1,.3,1),box-shadow .3s; }
.col-card:hover { border-color:var(--cor-borda-hover); transform:translateY(-5px); box-shadow:var(--shadow-glow); }
.col-card-media { position:relative; aspect-ratio:4/3; overflow:hidden; }
.col-card-img { width:100%; height:100%; object-fit:cover; transition:transform .7s cubic-bezier(.2,1,.3,1); }
.col-card:hover .col-card-img { transform:scale(1.05); }
.col-card-overlay { position:absolute; inset:0; background:linear-gradient(to top,rgba(0,0,0,.88) 0%,rgba(0,0,0,.4) 50%,transparent 100%); opacity:0; transition:opacity .35s; display:flex; align-items:flex-end; padding:24px; }
.col-card:hover .col-card-overlay { opacity:1; }
.col-card-overlay-content { width:100%; }
.col-card-overlay-desc { font-size:12px; color:rgba(255,255,255,.6); line-height:1.6; margin-bottom:16px; display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden; }
.col-card-overlay-footer { display:flex; align-items:center; justify-content:space-between; }
.col-card-ver { font-size:9px; letter-spacing:3px; color:var(--cor-primaria); font-weight:600; border-bottom:1px solid var(--gold-30); padding-bottom:2px; }
.col-card-unidades { font-size:9px; color:rgba(255,255,255,.25); }
.col-card-badges { position:absolute; top:14px; left:14px; display:flex; gap:6px; z-index:2; }
.col-badge { font-size:7px; letter-spacing:2px; padding:4px 10px; border-radius:2px; font-weight:700; text-transform:uppercase; }
.col-badge--esgotado { background:rgba(0,0,0,.6); border:1px solid var(--cor-borda); color:var(--cor-texto-3); }
.col-badge--novo { background:var(--grad-btn); color:#0A0A0A; }
.col-badge--limitado { background:var(--gold-10); border:1px solid var(--cor-borda-hover); color:var(--cor-primaria); }
.col-card-num { position:absolute; top:14px; right:14px; font-size:8px; letter-spacing:2px; color:rgba(255,255,255,.18); z-index:2; }
.col-card-ano { position:absolute; bottom:14px; right:14px; font-family:'Playfair Display',serif; font-size:2.5rem; color:var(--gold-10); font-style:italic; line-height:1; z-index:1; }
.col-card-info { padding:22px 24px; }
.col-card-info-top { display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; }
.col-card-cat { font-size:7px; letter-spacing:4px; color:var(--cor-primaria); text-transform:uppercase; font-weight:700; }
.col-card-tag { font-size:8px; color:var(--cor-texto-3); }
.col-card-nome { font-family:'Playfair Display',serif; font-size:1.2rem; font-weight:400; color:var(--cor-texto); margin-bottom:8px; line-height:1.2; }
.col-card-teaser { font-size:12px; color:var(--cor-texto-3); line-height:1.6; margin-bottom:14px; font-style:italic; }
.col-card-meta { display:flex; align-items:center; gap:8px; }
.col-card-meta-item { display:flex; align-items:center; gap:5px; font-size:10px; color:var(--cor-texto-3); }
.col-card-meta-sep { color:var(--cor-borda); font-size:10px; }

.col-card-prog { margin-top:8px; }
.col-card-prog-track { height:1px; background:var(--cor-borda); border-radius:1px; margin-bottom:6px; overflow:hidden; }
.col-card-prog-fill { height:100%; background:var(--grad-btn); border-radius:1px; transition:width .8s; }
.col-card-prog-label { font-size:9px; color:var(--cor-texto-3); }
.col-card-prog-label strong { color:var(--cor-primaria); }

.col-vazio { grid-column:1/-1; display:flex; flex-direction:column; align-items:center; gap:14px; padding:60px; color:var(--cor-texto-3); font-size:14px; }
.col-list-enter-active,.col-list-leave-active { transition:all .4s cubic-bezier(.2,1,.3,1); }
.col-list-enter-from { opacity:0; transform:translateY(20px); }
.col-list-leave-to { opacity:0; transform:scale(.95); }

/* ─── CTA FINAL ─── */
.col-cta { padding:80px; background:var(--cor-superficie); border-top:1px solid var(--cor-borda); }
.col-cta-inner { max-width:1400px; margin:0 auto; display:flex; justify-content:space-between; align-items:center; gap:60px; flex-wrap:wrap; }
.col-cta-titulo { font-family:'Playfair Display',serif; font-size:clamp(2rem,4vw,4rem); font-weight:400; color:var(--cor-texto); line-height:.95; margin-bottom:16px; }
.col-cta-titulo em { font-style:italic; background:var(--grad-texto); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
.col-cta-desc { font-size:14px; color:var(--cor-texto-3); line-height:1.7; max-width:480px; }
.col-cta-right { flex-shrink:0; display:flex; flex-direction:column; align-items:center; gap:12px; }
.col-cta-btn { display:inline-flex; align-items:center; justify-content:center; gap:10px; font-family:'Syne',sans-serif; font-size:10px; font-weight:700; letter-spacing:3px; padding:16px 36px; border-radius:2px; text-decoration:none; transition:transform .25s,box-shadow .25s,background .25s,color .25s; text-transform:uppercase; min-width:280px; }
.col-cta-btn--gold { background:var(--grad-btn); color:#0A0A0A; box-shadow:var(--shadow-btn); }
.col-cta-btn--gold:hover { transform:translateY(-2px); box-shadow:var(--shadow-btn-hover); }
.col-cta-btn--ghost { background:transparent; border:1px solid var(--cor-borda-hover); color:var(--cor-primaria); }
.col-cta-btn--ghost:hover { background:var(--gold-05); border-color:var(--cor-primaria); }
.col-cta-nota { font-size:10px; color:var(--cor-texto-3); text-align:center; }

/* ─── MODAL EDITORIAL ─── */
.col-modal-overlay { position:fixed; inset:0; z-index:9500; background:var(--overlay-bg); backdrop-filter:blur(16px); display:flex; align-items:center; justify-content:center; padding:24px; overflow-y:auto; }
.col-modal { background:var(--cor-superficie); border:1px solid var(--cor-borda); border-radius:var(--border-radius); overflow:hidden; position:relative; max-width:720px; width:100%; max-height:90vh; overflow-y:auto; box-shadow:var(--shadow-card),var(--shadow-glow); animation:popIn .38s cubic-bezier(.19,1,.22,1); }
@keyframes popIn { from{opacity:0;transform:scale(.96) translateY(14px)} }
.col-modal-close { position:absolute; top:14px; right:14px; z-index:10; width:30px; height:30px; border-radius:2px; background:rgba(0,0,0,.5); border:1px solid rgba(255,255,255,.15); color:rgba(255,255,255,.7); cursor:pointer; font-size:11px; display:flex; align-items:center; justify-content:center; transition:all .2s; backdrop-filter:blur(4px); }
.col-modal-close:hover { background:rgba(0,0,0,.8); color:#fff; transform:rotate(90deg); }

/* Hero do modal */
.col-modal-hero { position:relative; height:260px; background-size:cover; background-position:center; }
.col-modal-hero-overlay { position:absolute; inset:0; background:linear-gradient(to top, rgba(0,0,0,.92) 0%, rgba(0,0,0,.4) 55%, transparent 100%); }
.col-modal-hero-content { position:absolute; bottom:0; left:0; right:0; padding:28px 32px; }
.col-modal-titulo { font-family:'Playfair Display',serif; font-size:clamp(1.6rem,3vw,2.2rem); font-weight:400; color:#fff; line-height:1.1; margin:6px 0 4px; }
.col-modal-subtag { font-size:10px; letter-spacing:3px; color:rgba(255,255,255,.4); text-transform:uppercase; }

/* Body do modal */
.col-modal-body { padding:32px; display:flex; flex-direction:column; gap:0; }
.col-modal-section { padding:24px 0; }
.col-modal-section-label { font-size:7px; letter-spacing:5px; text-transform:uppercase; font-weight:700; color:var(--cor-primaria); display:block; margin-bottom:14px; opacity:.85; }
.col-modal-text { font-size:13.5px; color:var(--cor-texto-2); line-height:1.85; }
.col-modal-divider { height:1px; background:var(--cor-borda); }

/* Processo */
.col-modal-processo-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:12px; }
.col-modal-processo-item { background:var(--gold-05); border:1px solid var(--cor-borda); border-radius:2px; padding:14px 16px; }
.col-modal-processo-label { display:block; font-size:7px; letter-spacing:3px; color:var(--cor-texto-3); text-transform:uppercase; margin-bottom:5px; }
.col-modal-processo-valor { font-size:13px; color:var(--cor-texto); font-weight:500; }

/* Exclusividade */
.col-modal-excl-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:10px; margin-bottom:16px; }
.col-modal-excl-item { background:var(--card-bg); border:1px solid var(--cor-borda); border-radius:2px; padding:14px 12px; text-align:center; display:flex; flex-direction:column; align-items:center; gap:5px; }
.col-modal-excl-num { font-family:'Playfair Display',serif; font-size:1.6rem; color:var(--cor-texto); font-weight:400; line-height:1; }
.col-modal-excl-label { font-size:8px; letter-spacing:2px; color:var(--cor-texto-3); text-transform:uppercase; }
.col-modal-excl-status { font-size:9px; letter-spacing:2px; font-weight:700; text-transform:uppercase; padding:3px 8px; border-radius:2px; }
.col-modal-excl-status.ativo { color:var(--cor-primaria); background:var(--gold-08); }
.col-modal-excl-status.esgotado { color:var(--cor-texto-3); background:var(--gold-05); }
.col-modal-prog { margin-top:4px; }

/* Botões do modal */
.col-modal-btns { display:flex; flex-direction:column; gap:10px; padding-top:24px; }
.col-modal-btn-gold { display:inline-flex; align-items:center; justify-content:center; gap:8px; background:var(--grad-btn); color:#0A0A0A; font-family:'Syne',sans-serif; font-size:9px; font-weight:700; letter-spacing:3px; padding:14px 24px; border-radius:2px; text-decoration:none; box-shadow:var(--shadow-btn); transition:transform .25s,box-shadow .25s; text-transform:uppercase; }
.col-modal-btn-gold:hover { transform:translateY(-1px); box-shadow:var(--shadow-btn-hover); }
.col-modal-btn-ghost { display:inline-flex; align-items:center; justify-content:center; background:transparent; border:1px solid var(--cor-borda); color:var(--cor-texto-2); font-family:'Syne',sans-serif; font-size:9px; letter-spacing:3px; padding:13px 24px; border-radius:2px; text-decoration:none; transition:all .25s; text-transform:uppercase; }
.col-modal-btn-ghost:hover { border-color:var(--cor-borda-hover); color:var(--cor-primaria); }

.fade-enter-active,.fade-leave-active { transition:opacity .32s; }
.fade-enter-from,.fade-leave-to { opacity:0; }

/* ─── RESPONSIVIDADE ─── */
@media(max-width:1100px) {
  .col-hero,.col-cta,.col-pilares,.col-prestigio,.col-grid-header { padding-left:40px; padding-right:40px; }
  .col-filtros { padding:0 40px; }
  .col-grid { padding:48px 40px 0; grid-template-columns:repeat(2,1fr); }
  .col-pilares-inner { grid-template-columns:1fr 1fr; }
  .col-cta-inner { flex-direction:column; align-items:flex-start; }
}
@media(max-width:700px) {
  .col-hero,.col-cta,.col-pilares,.col-prestigio,.col-grid-header { padding-left:20px; padding-right:20px; }
  .col-filtros { padding:0 20px; }
  .col-grid { padding:32px 20px 0; grid-template-columns:1fr; }
  .col-pilares-inner { grid-template-columns:1fr; gap:32px; }
  .col-hero-scroll { left:20px; }
  .col-prestigio-texto { white-space:normal; font-size:1.3rem; }
  .col-modal-excl-grid { grid-template-columns:repeat(2,1fr); }
  .col-modal-processo-grid { grid-template-columns:1fr; }
  .col-modal-body { padding:20px; }
  .col-modal-hero { height:200px; }
  .col-modal-hero-content { padding:20px; }
  .col-hero-actions { flex-direction:column; align-items:flex-start; }
  .col-cta-btn { min-width:unset; width:100%; }
}
</style>