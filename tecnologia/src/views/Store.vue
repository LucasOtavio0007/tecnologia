<template>
  <main class="store" ref="storeRef">

    <!-- ══ FUNDO GLOBAL — mesmo DNA do footer ══ -->
    <div class="store__bg" aria-hidden="true">
      <!-- Kamons de fundo como no footer -->
      <div class="store__kamon store__kamon--1" aria-hidden="true">蒐</div>
      <div class="store__kamon store__kamon--2" aria-hidden="true">金</div>
      <div class="store__kamon store__kamon--3" aria-hidden="true">集</div>
      <!-- Realm line igual ao footer -->
      <div class="store__realm-line" aria-hidden="true"></div>
      <!-- Washi grid igual ao hero banner -->
      <div class="store__washi" aria-hidden="true"></div>
      <!-- Fog cinematográfica -->
      <div class="store__fog store__fog--1" aria-hidden="true"></div>
      <div class="store__fog store__fog--2" aria-hidden="true"></div>
    </div>

    <!-- ══ HERO ══ -->
    <section class="store__hero" ref="heroRef">

      <!-- Linha editorial esquerda — igual ao banner -->
      <div class="store__edge-line" aria-hidden="true">
        <span class="store__edge-num">01</span>
      </div>

      <!-- HUD direito — igual ao banner -->
      <div class="store__hud" aria-hidden="true">
        <span class="store__hud-label">COLLECTION · MMXXVI</span>
        <span class="store__hud-sep"></span>
        <span class="store__hud-coord">NOIR · OR</span>
      </div>

      <div class="store__hero-inner">
        <div class="store__hero-left" ref="heroContent">

          <!-- Kicker -->
          <div class="store__kicker" ref="heroKicker">
            <span class="store__kicker-num">01</span>
            <div class="store__kicker-bar"></div>
          </div>

          <!-- Eyebrow — igual ao banner -->
          <div class="store__eyebrow" ref="heroEyebrow">
            <span class="store__ew-dot"></span>
            <span class="store__ew-text">Atelier · Édition de Colecionador 2026</span>
          </div>

          <!-- Título -->
          <h1 class="store__titulo" ref="heroTitulo">
            <span class="store__t-thin">THE</span>
            <span class="store__t-gold">STORE</span>
            <span class="store__t-kanji" aria-hidden="true">漆黒と黄金</span>
          </h1>

          <!-- Sep — igual ao banner -->
          <div class="store__sep" aria-hidden="true">
            <span class="store__sep-line"></span>
            <span class="store__sep-gem"></span>
            <span class="store__sep-line store__sep-line--r"></span>
          </div>

          <p class="store__sub" ref="heroSub">
            {{ totalGeral }} peças exclusivas · edições limitadas · tecnologia de elite
          </p>

          <!-- Filtros rápidos — como nb-links -->
          <div class="store__hero-cats" ref="heroCatsRef">
            <button
              v-for="cat in heroCatsList" :key="cat"
              :class="['store__hero-cat', { 'is-active': categoriasAtivas.includes(cat) }]"
              @click="toggleCat(cat); pagina=1"
            >
              <span class="store__hero-cat-fill" aria-hidden="true"></span>
              <span class="store__hero-cat-text">{{ cat }}</span>
            </button>
          </div>
        </div>

        <!-- Stats — como nb__stats -->
        <div class="store__hero-right" ref="heroRight">
          <!-- Hanko decorativo — igual ao banner -->
          <svg class="store__hanko" viewBox="0 0 90 90" aria-hidden="true">
            <rect x="4" y="4" width="82" height="82" rx="6"
              fill="none" stroke="var(--lacre-mid)" stroke-width="1.5"/>
            <text x="45" y="62" text-anchor="middle"
              font-family="'Noto Serif JP',serif"
              font-size="52" font-weight="200"
              fill="var(--lacre-fill)">品</text>
          </svg>

          <div class="store__stats">
            <div class="store__stat" v-for="s in heroStats" :key="s.label">
              <span class="store__stat-idx" aria-hidden="true">{{ s.idx }}</span>
              <span class="store__stat-kanji" aria-hidden="true">{{ s.kanji }}</span>
              <span class="store__stat-num">{{ s.val }}</span>
              <span class="store__stat-label">{{ s.label }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Strip como drawer__ornament mas mais rico -->
      <div class="store__strip" ref="heroStrip">
        <div class="store__strip-item" v-for="s in heroStripData" :key="s.title">
          <div class="store__strip-icon" v-html="s.icon"></div>
          <div class="store__strip-body">
            <p class="store__strip-title">{{ s.title }}</p>
            <p class="store__strip-sub">{{ s.sub }}</p>
          </div>
          <span class="store__strip-kanji" aria-hidden="true">{{ s.kanji }}</span>
        </div>
      </div>
    </section>

    <!-- ══ TICKER — mesmo padrão ══ -->
    <div class="store__ticker" aria-hidden="true">
      <div class="store__ticker-track">
        <span v-for="n in 4" :key="n" class="store__ticker-set">
          <span class="store__t-item">黄金 Ouro 24K</span><span class="store__t-sep">✦</span>
          <span class="store__t-item">チタン Titânio G5</span><span class="store__t-sep">✦</span>
          <span class="store__t-item">限定版 Edição Limitada</span><span class="store__t-sep">✦</span>
          <span class="store__t-item">無料配送 Frete VIP</span><span class="store__t-sep">✦</span>
          <span class="store__t-item">分割払 12× Sem Juros</span><span class="store__t-sep">✦</span>
          <span class="store__t-item">永久保証 Garantia Vitalícia</span><span class="store__t-sep">✦</span>
        </span>
      </div>
    </div>

    <!-- ══ TOOLBAR — estilo navbar ══ -->
    <div class="store__toolbar" ref="toolbarRef" :class="{ 'is-scrolled': scrolled }">
      <div class="store__toolbar-border" aria-hidden="true"></div>
      <div class="store__toolbar-inner">

        <div class="store__search-wrap" :class="{ 'is-focus': searchFocused }">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input
            v-model="busca"
            placeholder="探す · Buscar na coleção..."
            @input="pagina=1"
            @focus="searchFocused=true"
            @blur="searchFocused=false"
            autocomplete="off"
          />
          <button v-if="busca" @click="busca='';pagina=1" class="store__search-clear" aria-label="Limpar">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>

        <!-- Chips de categoria ativos -->
        <div v-if="categoriasAtivas.length" class="store__chips">
          <button v-for="cat in categoriasAtivas" :key="cat" class="store__chip" @click="toggleCat(cat)">
            {{ cat }}<svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>

        <div class="store__toolbar-right">
          <span class="store__toolbar-count">{{ produtosFiltrados.length }} 件</span>

          <select v-model="ordenacao" class="store__toolbar-select" aria-label="Ordenar">
            <option value="relevancia">— 並び替え</option>
            <option value="menor">Menor preço</option>
            <option value="maior">Maior preço</option>
            <option value="nome">Nome A‑Z</option>
            <option value="novo">Mais recentes</option>
          </select>

          <button v-if="temFiltros" class="store__toolbar-limpar" @click="limparFiltros">
            絞込解除
          </button>

          <div class="store__view-toggle">
            <button :class="{ 'is-active': viewMode==='grid' }" @click="viewMode='grid'" aria-label="Grid">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
            </button>
            <button :class="{ 'is-active': viewMode==='list' }" @click="viewMode='list'" aria-label="Lista">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="18" y2="12"/><line x1="8" y1="18" x2="15" y2="18"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ══ LAYOUT PRINCIPAL ══ -->
    <div class="store__layout">

      <!-- ══ SIDEBAR — estilo drawer ══ -->
      <aside
        class="store__sidebar"
        ref="sidebarEl"
        :class="{ 'is-open': sidebarOpen }"
        :style="sidebarStyle"
      >
        <!-- Kamon como no drawer -->
        <div class="store__sb-kamon" aria-hidden="true">目録</div>

        <button class="store__sb-close-m" @click="sidebarOpen=false">閉じる ✕</button>

        <!-- Ornamento de topo como drawer__ornament -->
        <div class="store__sb-ornament" aria-hidden="true">
          <span class="store__sb-orn-line"></span>
          <span class="store__sb-orn-kanji">目</span>
          <span class="store__sb-orn-line store__sb-orn-line--r"></span>
        </div>

        <!-- Categorias -->
        <div class="store__sb-sec">
          <p class="store__sb-lbl">
            <span class="store__sb-lbl-kanji">品</span>Categorias
          </p>
          <div class="store__sb-cats">
            <button
              v-for="cat in todasCategorias" :key="cat"
              :class="['store__sb-cat', { 'is-active': categoriasAtivas.includes(cat) }]"
              @click="toggleCat(cat); pagina=1"
            >
              <span class="store__sb-cat-check">{{ categoriasAtivas.includes(cat) ? '◆' : '◇' }}</span>
              <span>{{ cat }}</span>
              <span class="store__sb-cat-n">{{ contarCat(cat) }}</span>
            </button>
          </div>
        </div>

        <!-- Sep igual ao drawer footer-ornament -->
        <div class="store__sb-sep" aria-hidden="true">
          <span class="store__sb-sep-line"></span>
          <span class="store__sb-sep-kanji">価</span>
          <span class="store__sb-sep-line store__sb-sep-line--r"></span>
        </div>

        <!-- Faixa de preço -->
        <div class="store__sb-sec">
          <p class="store__sb-lbl">
            <span class="store__sb-lbl-kanji">価</span>Faixa de preço
          </p>
          <div class="store__sb-preco-vals">
            <span>R$ {{ fmt(filtroPreco[0]) }}</span>
            <span>R$ {{ fmt(filtroPreco[1]) }}</span>
          </div>
          <div class="store__sb-ranges">
            <input type="range" min="0" max="500000" step="1000"
              v-model.number="filtroPreco[0]" class="store__sb-range"
              @input="clampPreco" aria-label="Preço mínimo"/>
            <input type="range" min="0" max="500000" step="1000"
              v-model.number="filtroPreco[1]" class="store__sb-range"
              @input="clampPreco" aria-label="Preço máximo"/>
          </div>
          <button class="store__sb-apply" @click="pagina=1">適用 · Aplicar</button>
        </div>

        <div class="store__sb-sep" aria-hidden="true">
          <span class="store__sb-sep-line"></span>
          <span class="store__sb-sep-kanji">在</span>
          <span class="store__sb-sep-line store__sb-sep-line--r"></span>
        </div>

        <!-- Disponibilidade -->
        <div class="store__sb-sec">
          <p class="store__sb-lbl">
            <span class="store__sb-lbl-kanji">在</span>Disponibilidade
          </p>
          <label class="store__sb-toggle-row" @click="apenasEstoque=!apenasEstoque">
            <div :class="['store__sb-toggle', { 'is-on': apenasEstoque }]">
              <div class="store__sb-toggle-thumb"></div>
            </div>
            <span>Apenas em estoque</span>
          </label>
        </div>

        <div class="store__sb-sep" aria-hidden="true">
          <span class="store__sb-sep-line"></span>
          <span class="store__sb-sep-kanji">後</span>
          <span class="store__sb-sep-line store__sb-sep-line--r"></span>
        </div>

        <!-- Wishlist -->
        <div class="store__sb-sec">
          <p class="store__sb-lbl">
            <span class="store__sb-lbl-kanji">愛</span>Wishlist
            <span class="store__sb-count" v-if="wishlist.length">{{ wishlist.length }}</span>
          </p>
          <div v-if="!wishlist.length" class="store__sb-empty">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            <p>お気に入り · Favoritos aqui</p>
          </div>
          <div v-else class="store__sb-wl">
            <div v-for="id in wishlist" :key="id" class="store__sb-wl-item"
              @click="abrirModal(getProdutoById(id))">
              <div class="store__sb-wl-img">
                <img v-if="getProdutoById(id)?.imagem" :src="getProdutoById(id).imagem" :alt="getProdutoById(id)?.nome" @error="e=>e.target.style.display='none'"/>
                <span class="store__sb-wl-fb">{{ (getProdutoById(id)?.nome||'?').charAt(0) }}</span>
              </div>
              <div class="store__sb-wl-info">
                <p class="store__sb-wl-nome">{{ getProdutoById(id)?.nome }}</p>
                <p class="store__sb-wl-preco">R$ {{ fmt(getProdutoById(id)?.preco) }}</p>
              </div>
              <button class="store__sb-wl-x" @click.stop="toggleWishlist(id)" aria-label="Remover">
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>
          </div>
        </div>

        <button v-if="temFiltros" class="store__sb-limpar" @click="limparFiltros">
          全てクリア · Limpar filtros
        </button>

        <!-- Footer da sidebar com watermark — como pref-watermark -->
        <div class="store__sb-watermark" aria-hidden="true">The Art of Silent Power</div>
      </aside>

      <div class="store__sb-overlay"
        :class="{ 'is-vis': sidebarOpen }"
        @click="sidebarOpen=false"></div>

      <!-- ══ CATÁLOGO ══ -->
      <div class="store__catalogo">

        <button class="store__btn-filtros-m" @click="sidebarOpen=true">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="6" y1="12" x2="18" y2="12"/><line x1="9" y1="18" x2="15" y2="18"/></svg>
          絞込 · Filtros
          <span v-if="temFiltros" class="store__btn-filtros-badge">!</span>
        </button>

        <!-- Erro -->
        <div v-if="produtosStore.erro && !loading" class="store__cat-erro">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <p>{{ produtosStore.erro }}</p>
          <button class="store__sb-apply" @click="produtosStore.recarregar()">再試行 · Tentar novamente</button>
        </div>

        <!-- Skeleton — como no drawer -->
        <div v-else-if="loading" :class="['store__grid', viewMode==='grid' ? 'store__grid--grid' : 'store__grid--list']">
          <div v-for="n in 8" :key="n" class="store__card store__card--skel">
            <div class="store__skel-img"></div>
            <div class="store__card-info">
              <div class="store__sk-line store__sk-line--sm"></div>
              <div class="store__sk-line"></div>
              <div class="store__sk-line store__sk-line--xs"></div>
            </div>
          </div>
        </div>

        <!-- Vazio -->
        <div v-else-if="!produtosPaginados.length" class="store__cat-vazio">
          <!-- Igual ao drawer vazio -->
          <div class="store__vazio-ico" aria-hidden="true">
            <span class="store__vazio-kanji">無</span>
          </div>
          <p class="store__vazio-titulo">見つかりません · Nenhuma peça</p>
          <p class="store__vazio-sub">Tente ajustar os filtros ou a busca</p>
          <button class="store__sb-limpar" @click="limparFiltros">絞込解除 · Limpar</button>
        </div>

        <!-- Grid -->
        <transition name="view-sw" mode="out-in">
          <div v-if="!loading && produtosPaginados.length" :key="viewMode"
            :class="['store__grid', viewMode==='grid' ? 'store__grid--grid' : 'store__grid--list']">

            <div
              v-for="(p, i) in produtosPaginados" :key="p._id||p.id"
              :class="[
                'store__card',
                { 'store__card--list': viewMode==='list' },
                { 'store__card--esgotado': !p.estoque }
              ]"
              :style="{ '--card-delay': `${i*50}ms` }"
              :ref="el => { if(el) cardRefs[i]=el }"
              @click="abrirModal(p)"
             @keydown.enter="abrirModal(p)"
            >
              <!-- Cantos decorativos — como no drawer__vazio__ico -->
              <span class="store__card-corner store__card-corner--tl" aria-hidden="true"></span>
              <span class="store__card-corner store__card-corner--br" aria-hidden="true"></span>

              <!-- Numeração sequencial — como di__num -->
              <div class="store__card-num" aria-hidden="true">{{ String(i + 1 + (pagina-1)*POR_PAGINA).padStart(2,'0') }}</div>

              <!-- Imagem -->
              <div class="store__card-img-wrap">
                <div class="store__card-fallback" aria-hidden="true">
                  <span class="store__card-fb-letra">{{ (p.nome||'?').charAt(0) }}</span>
                  <span class="store__card-fb-kanji">{{ p._kanji || '品' }}</span>
                  <span class="store__card-fb-cat">{{ p.categoria }}</span>
                </div>
                <img v-if="p.imagem" :src="p.imagem" :alt="p.nome"
                  class="store__card-img" loading="lazy"
                  @error="e=>e.target.style.display='none'"/>

                <!-- Overlay igual ao drawer -->
                <div class="store__card-overlay">
                  <span class="store__card-overlay-txt">見る · Ver detalhes</span>
                </div>

                <!-- Badges — estilo nb-cart__badge -->
                <span v-if="p.limitada" class="store__badge store__badge--ltd">◆ 限定</span>
                <span v-else-if="p.novo && p.estoque" class="store__badge store__badge--novo">新</span>
                <span v-if="!p.estoque" class="store__badge store__badge--esgo">売切</span>
                <div v-if="p.estoque && p.qtdEstoque && p.qtdEstoque <= 5" class="store__card-urgencia">
                  残り{{ p.qtdEstoque }}個
                </div>

                <!-- Ações rápidas — como nb-icon -->
                <div class="store__card-quick">
                  <button
                    class="store__quick-btn"
                    :class="{ 'is-active': wishlist.includes(p._id||p.id) }"
                    @click.stop="toggleWishlist(p._id||p.id)"
                    :aria-label="wishlist.includes(p._id||p.id) ? 'Remover favorito' : 'Favoritar'"
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24"
                      :fill="wishlist.includes(p._id||p.id) ? 'currentColor' : 'none'"
                      stroke="currentColor" stroke-width="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                  </button>
                  <button
                    class="store__quick-btn"
                    :class="{ 'is-active': isSaved(p._id||p.id) }"
                    @click.stop="toggleSaved(p)"
                    :aria-label="isSaved(p._id||p.id) ? 'Remover' : 'Salvar para depois'"
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24"
                      :fill="isSaved(p._id||p.id) ? 'currentColor' : 'none'"
                      stroke="currentColor" stroke-width="2">
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                    </svg>
                  </button>
                </div>

                <!-- Shine tilt -->
                <div class="store__card-shine" :ref="el => { if(el) shineRefs[i]=el }"></div>
              </div>

              <!-- Info — estilo di__info -->
              <div class="store__card-info">
                <span class="store__card-cat">{{ p.categoria }}</span>
                <p class="store__card-marca">{{ p.marca }}</p>
                <p class="store__card-nome">{{ p.nome }}</p>
                <p v-if="viewMode==='list'" class="store__card-desc">{{ p.descricao }}</p>

                <!-- Swatches em list mode -->
                <div v-if="viewMode==='list' && p.cores?.length" class="store__card-cores">
                  <span v-for="cor in p.cores.slice(0,5)" :key="cor.nome"
                    class="store__card-swatch" :style="{ background: cor.hex }"
                    :title="cor.nome"></span>
                  <span v-if="p.cores.length > 5" class="store__card-swatch-more">+{{ p.cores.length - 5 }}</span>
                </div>

                <!-- Bottom — como di__foot -->
                <div class="store__card-bottom">
                  <div class="store__card-preco-wrap">
                    <p class="store__card-preco">R$ {{ fmt(p.preco) }}</p>
                    <p class="store__card-parcela">12× R$ {{ fmt(Math.ceil(p.preco/12)) }}</p>
                  </div>
                  <button
                    class="store__card-add"
                    :class="{ 'is-added': addedIds.includes(p._id||p.id) }"
                    :disabled="!p.estoque"
                    @click.stop="addToCart(p)"
                    :aria-label="`Adicionar ${p.nome}`"
                  >
                    <span class="store__card-add-fill" aria-hidden="true"></span>
                    <svg v-if="!addedIds.includes(p._id||p.id)" width="13" height="13"
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                      <line x1="3" y1="6" x2="21" y2="6"/>
                      <path d="M16 10a4 4 0 0 1-8 0"/>
                    </svg>
                    <svg v-else width="13" height="13" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" stroke-width="2.5">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </transition>

        <!-- Ornamento de separação antes da paginação — como footer sep -->
        <div v-if="totalPaginas > 1" class="store__pag-sep" aria-hidden="true">
          <span class="store__pag-sep-line"></span>
          <span class="store__pag-sep-kanji">頁</span>
          <span class="store__pag-sep-line store__pag-sep-line--r"></span>
        </div>

        <!-- Paginação — estilo nb-link -->
        <div v-if="totalPaginas > 1" class="store__paginacao">
          <button class="store__pag-btn store__pag-btn--arrow"
            :disabled="pagina===1" @click="irPag(pagina-1)" aria-label="Anterior">‹</button>
          <template v-for="p in paginasVisiveis" :key="p">
            <span v-if="p === '...'" class="store__pag-ellipsis">···</span>
            <button v-else :class="['store__pag-btn', { 'is-active': pagina===p }]" @click="irPag(p)">{{ p }}</button>
          </template>
          <button class="store__pag-btn store__pag-btn--arrow"
            :disabled="pagina===totalPaginas" @click="irPag(pagina+1)" aria-label="Próxima">›</button>
        </div>

        <p class="store__pag-info">
          ページ {{ pagina }} / {{ totalPaginas||1 }} · {{ produtosFiltrados.length }} 件
        </p>
      </div>
    </div>

    <!-- ══ TOAST — idêntico ao sistema global ══ -->
    <teleport to="body">
      <transition name="toast-slide">
        <div v-if="toast.visivel" :class="['store-toast', `store-toast--${toast.tipo}`]" role="status" aria-live="polite">
          <div class="store-toast__icon" aria-hidden="true">
            <svg v-if="toast.tipo==='success'" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            <svg v-else width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/></svg>
          </div>
          <span class="store-toast__msg">{{ toast.msg }}</span>
          <button class="store-toast__close" @click="toast.visivel=false" aria-label="Fechar">
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
          <div class="store-toast__progress" :style="{ animationDuration: '2800ms' }"></div>
        </div>
      </transition>
    </teleport>

    <!-- ══ MODAL PRODUTO ══ -->
    <teleport to="body">
      <transition name="modal-fade">
        <div v-if="modalAberto && produtoModal"
          class="store__modal-bg" @click.self="fecharModal"
          role="dialog" :aria-label="produtoModal.nome" aria-modal="true">

          <button class="store__modal-close-fixed" @click="fecharModal" aria-label="Fechar">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>

          <div class="store__modal" ref="modalEl">
            <!-- Kamon watermark como no drawer -->
            <div class="store__modal-kamon" aria-hidden="true">商</div>
            <!-- Realm line como no footer -->
            <div class="store__modal-realm-line" aria-hidden="true"></div>

            <!-- Cantos decorativos -->
            <span class="store__mc store__mc--tl"></span>
            <span class="store__mc store__mc--tr"></span>
            <span class="store__mc store__mc--bl"></span>
            <span class="store__mc store__mc--br"></span>

            <div class="store__modal-layout">

              <!-- Col imagem -->
              <div class="store__modal-img-col">
                <div class="store__modal-viewer">
                  <!-- Fallback estilo di__img -->
                  <div class="store__modal-fallback" aria-hidden="true">
                    <span class="store__mf-letra">{{ (produtoModal.nome||'?').charAt(0) }}</span>
                    <span class="store__mf-kanji">{{ produtoModal._kanji || '品' }}</span>
                    <span class="store__mf-cat">{{ produtoModal.categoria }}</span>
                  </div>

                  <transition name="img-fade">
                    <img :key="anguloAtivo"
                      :src="imagemAtiva"
                      :alt="`${produtoModal.nome} — ângulo ${anguloAtivo+1}`"
                      class="store__modal-img"
                      :class="{ 'is-zoom': zoomAtivo }"
                      @click="zoomAtivo=!zoomAtivo"
                      @error="e=>e.target.style.display='none'"/>
                  </transition>

                  <div class="store__modal-glow"
                    :style="{ background: `radial-gradient(circle at 55% 40%, ${modalBgColor}18 0%, transparent 65%)` }"
                    aria-hidden="true"></div>

                  <div class="store__modal-zoom-hint" v-if="imagemAtiva && !zoomAtivo" aria-hidden="true">
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M11 8v6M8 11h6"/></svg>
                    拡大 · Ampliar
                  </div>

                  <!-- Badges no modal -->
                  <div class="store__modal-badges">
                    <span v-if="produtoModal.limitada" class="store__modal-badge store__modal-badge--ltd">◆ 限定 Limited Edition</span>
                    <span v-else-if="produtoModal.novo && produtoModal.estoque" class="store__modal-badge store__modal-badge--novo">◆ 新 Novo</span>
                    <span v-if="!produtoModal.estoque" class="store__modal-badge store__modal-badge--esgo">売切 Esgotado</span>
                  </div>
                </div>

                <!-- Thumbnails -->
                <div class="store__modal-thumbs" v-if="angulos.length > 1">
                  <button v-for="(ang, idx) in angulos" :key="idx"
                    :class="['store__modal-thumb', { 'is-active': anguloAtivo===idx }]"
                    @click="anguloAtivo=idx; zoomAtivo=false"
                    :aria-label="`Ângulo ${idx+1}`">
                    <img v-if="ang" :src="ang" :alt="`Ângulo ${idx+1}`" @error="e=>e.target.style.display='none'"/>
                    <span v-else class="store__modal-thumb-fb">{{ idx+1 }}</span>
                  </button>
                </div>
              </div>

              <!-- Col info -->
              <div class="store__modal-info" ref="modalInfoEl">

                <!-- Ornament de topo -->
                <div class="store__modal-ornament" aria-hidden="true">
                  <span class="store__mo-line"></span>
                  <span class="store__mo-kanji">{{ produtoModal._kanji || '至高' }}</span>
                  <span class="store__mo-line store__mo-line--r"></span>
                </div>

                <!-- Eyebrow -->
                <div class="store__modal-eyebrow">
                  <span class="store__mey-dot"></span>
                  <span class="store__mey-txt">{{ produtoModal.categoria }}</span>
                  <span class="store__mey-dot"></span>
                </div>

                <h2 class="store__modal-titulo">{{ produtoModal.nome }}</h2>
                <p class="store__modal-marca">por <strong>{{ produtoModal.marca }}</strong></p>

                <!-- Divider estilo drawer footer -->
                <div class="store__modal-divider" aria-hidden="true">
                  <span class="store__md-line"></span>
                  <span class="store__md-gem">✦</span>
                  <span class="store__md-line store__md-line--r"></span>
                </div>

                <p class="store__modal-desc">{{ produtoModal.descricao }}</p>

                <!-- Specs estilo dt-row -->
                <div class="store__modal-specs" v-if="(produtoModal.specs||[]).length">
                  <div class="store__specs-hd">
                    <span class="store__specs-kanji">仕</span>
                    <span>Especificações</span>
                    <span class="store__specs-line" aria-hidden="true"></span>
                  </div>
                  <div class="store__specs-list">
                    <div v-for="s in (produtoModal.specs||[])" :key="s.k" class="store__spec-row">
                      <span class="store__spec-k">{{ s.k }}</span>
                      <span class="store__spec-dots" aria-hidden="true"></span>
                      <span class="store__spec-v">{{ s.v }}</span>
                    </div>
                  </div>
                </div>

                <!-- Quantidade -->
                <div class="store__modal-qty-wrap">
                  <p class="store__modal-opt-lbl">数量 · Quantidade</p>
                  <div class="store__modal-qty">
                    <button class="store__qty-btn"
                      @click="qtd=Math.max(1,qtd-1)" :disabled="qtd<=1" aria-label="Diminuir">−</button>
                    <span class="store__qty-val" aria-live="polite">{{ qtd }}</span>
                    <button class="store__qty-btn"
                      @click="qtd=Math.min(produtoModal.qtdEstoque||99,qtd+1)"
                      :disabled="qtd>=(produtoModal.qtdEstoque||99)" aria-label="Aumentar">+</button>
                  </div>
                </div>

                <!-- Seletor de cor -->
                <div class="store__modal-variant" v-if="coresDisponiveis.length">
                  <p class="store__modal-opt-lbl">
                    色 · Cor
                    <em class="store__modal-sel">{{ corSelecionada }}</em>
                  </p>
                  <div class="store__modal-swatches">
                    <button v-for="cor in coresDisponiveis" :key="cor.nome"
                      :class="['store__modal-swatch', { 'is-active': corSelecionada===cor.nome }]"
                      :style="{ '--sw-color': cor.hex, background: cor.hex }"
                      @click="selecionarCor(cor)"
                      :title="cor.nome"
                      :aria-label="`Cor: ${cor.nome}`">
                    </button>
                  </div>
                </div>

                <!-- Storage -->
                <div class="store__modal-variant" v-if="storageOpcoes.length">
                  <p class="store__modal-opt-lbl">容量 · Armazenamento</p>
                  <div class="store__modal-storage">
                    <button v-for="opt in storageOpcoes" :key="opt.label"
                      :class="['store__modal-storage-btn', { 'is-active': storageSelecionado?.label===opt.label }]"
                      @click="selecionarStorage(opt)">
                      {{ opt.label }}
                      <span v-if="opt.preco && opt.preco !== produtoModal.preco" class="store__storage-diff">
                        {{ opt.preco > produtoModal.preco ? '+' : '' }}R$ {{ fmt(opt.preco - produtoModal.preco) }}
                      </span>
                    </button>
                  </div>
                </div>

                <!-- Preço — estilo dt-row--total -->
                <div class="store__modal-preco-wrap">
                  <div class="store__modal-preco-hd">
                    <span class="store__mp-kanji" aria-hidden="true">価</span>
                    <span class="store__mp-lbl">Valor total</span>
                    <span class="store__mp-line" aria-hidden="true"></span>
                  </div>
                  <p class="store__modal-preco">
                    <span class="store__mp-rs">R$</span>
                    <em>{{ fmt(precoFinal * qtd) }}</em>
                  </p>
                  <p class="store__modal-parcela">
                    12× R$ {{ fmt(Math.ceil(precoFinal * qtd / 12)) }}
                    <span>無利子 · sem juros</span>
                  </p>
                </div>

                <!-- Ações — estilo drawer checkout + nb-icon -->
                <div class="store__modal-actions">
                  <button
                    class="store__modal-add"
                    :class="{ 'is-added': addedIds.includes(produtoModal._id||produtoModal.id) }"
                    :disabled="!produtoModal.estoque"
                    @click="addToCart(produtoModal)"
                  >
                    <span class="store__modal-add-fill" aria-hidden="true"></span>
                    <span v-if="!produtoModal.estoque">売切 · Esgotado</span>
                    <span v-else-if="addedIds.includes(produtoModal._id||produtoModal.id)">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                      完了 · Adicionado
                    </span>
                    <span v-else>◆ 購入 · Adicionar ao Atelier</span>
                  </button>

                  <button v-if="!produtoModal.estoque" class="store__modal-notify"
                    @click="notifyMe(produtoModal)">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                    入荷通知 · Avise-me
                  </button>

                  <button class="store__modal-icon-btn"
                    :class="{ 'is-active': isSaved(produtoModal._id||produtoModal.id) }"
                    @click="toggleSaved(produtoModal)" aria-label="Salvar para depois">
                    <svg width="14" height="14" viewBox="0 0 24 24"
                      :fill="isSaved(produtoModal._id||produtoModal.id) ? 'currentColor' : 'none'"
                      stroke="currentColor" stroke-width="2">
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                    </svg>
                  </button>

                  <button class="store__modal-icon-btn"
                    :class="{ 'is-active': wishlist.includes(produtoModal._id||produtoModal.id) }"
                    @click="toggleWishlist(produtoModal._id||produtoModal.id)" aria-label="Favoritar">
                    <svg width="15" height="15" viewBox="0 0 24 24"
                      :fill="wishlist.includes(produtoModal._id||produtoModal.id) ? 'currentColor' : 'none'"
                      stroke="currentColor" stroke-width="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                  </button>
                </div>

                <!-- Relacionados -->
                <div class="store__modal-rel" v-if="produtosRelacionados.length">
                  <div class="store__modal-rel-hd">
                    <span class="store__rel-kanji">関連</span>
                    <span>Você também pode gostar</span>
                    <span class="store__rel-line" aria-hidden="true"></span>
                  </div>
                  <div class="store__modal-rel-grid">
                    <div v-for="rel in produtosRelacionados" :key="rel._id||rel.id"
                      class="store__modal-rel-card"
                      @click="abrirModal(rel)" role="button"
                      :aria-label="`Ver ${rel.nome}`" tabindex="0"
                      @keydown.enter="abrirModal(rel)">
                      <div class="store__rel-img">
                        <div class="store__rel-fb" aria-hidden="true">{{ (rel.nome||'?').charAt(0) }}</div>
                        <img v-if="rel.imagem" :src="rel.imagem" :alt="rel.nome" @error="e=>e.target.style.display='none'"/>
                      </div>
                      <div class="store__rel-info">
                        <p class="store__rel-nome">{{ rel.nome }}</p>
                        <p class="store__rel-preco">R$ {{ fmt(rel.preco) }}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Footer note — como drawer__seguro -->
                <div class="store__modal-footer-note">
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  <span class="store__fn-kanji" aria-hidden="true">証</span>
                  番号付き · Edição numerada · Certificado incluso
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>

      <!-- Notify modal -->
      <transition name="modal-fade">
        <div v-if="notifyModal" class="store__modal-bg store__modal-bg--sm"
          @click.self="notifyModal=false"
          role="dialog" aria-label="Aviso de disponibilidade" aria-modal="true">
          <div class="store__notify-modal">
            <span class="store__mc store__mc--tl"></span>
            <span class="store__mc store__mc--tr"></span>
            <span class="store__mc store__mc--bl"></span>
            <span class="store__mc store__mc--br"></span>
            <div class="store__notify-kamon" aria-hidden="true">通</div>
            <button class="store__notify-close" @click="notifyModal=false" aria-label="Fechar">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
            <p class="store__notify-eyebrow">入荷通知 · Notificação</p>
            <h3 class="store__notify-titulo">在庫通知を受け取る</h3>
            <p class="store__notify-sub">Produto: <strong>{{ notifyProduto?.nome }}</strong></p>
            <div class="store__notify-field">
              <label class="store__notify-label">メール · E-mail</label>
              <div class="store__notify-linha" :class="{ 'is-focus': notifyFocus }">
                <input v-model="notifyEmail" type="email" placeholder="seu@email.com"
                  @focus="notifyFocus=true" @blur="notifyFocus=false"
                  @keydown.enter="enviarNotify"/>
              </div>
            </div>
            <button class="store__notify-btn" @click="enviarNotify"
              :disabled="!notifyEmail.includes('@') || notifySent">
              <span class="store__notify-btn-fill" aria-hidden="true"></span>
              <span v-if="!notifySent">◆ 確認 · Confirmar</span>
              <span v-else>✓ 登録完了 · Registrado!</span>
            </button>
            <p class="store__notify-legal">入荷時にお知らせします · Avisaremos quando disponível.</p>
          </div>
        </div>
      </transition>
    </teleport>

  </main>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import api from '@/api.js'
import { useRoute } from 'vue-router'
import { useProdutosStore } from '@/stores/produtos.js'
import { useAuthStore }     from '@/stores/auth.js'
import { useCartStore }     from '@/stores/cart.js'
import { gsap }             from 'gsap'
import { ScrollTrigger }    from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const route         = useRoute()
const produtosStore = useProdutosStore()
const auth          = useAuthStore()
const cart          = useCartStore()

/* ── Refs DOM ── */
const storeRef    = ref(null)
const toolbarRef  = ref(null)
const heroRef     = ref(null)
const heroContent = ref(null)
const heroKicker  = ref(null)
const heroEyebrow = ref(null)
const heroTitulo  = ref(null)
const heroSub     = ref(null)
const heroCatsRef = ref(null)
const heroRight   = ref(null)
const heroStrip   = ref(null)
const sidebarEl   = ref(null)
const modalEl     = ref(null)
const modalInfoEl = ref(null)
const cardRefs    = ref({})
const shineRefs   = ref({})

/* ── Estado ── */
const loading          = ref(true)
const busca            = ref('')
const categoriasAtivas = ref([])
const filtroPreco = ref([0, 5000000])
const apenasEstoque    = ref(false)
const ordenacao        = ref('relevancia')
const viewMode         = ref('grid')
const wishlist         = ref([])
const savedItems       = ref([])
const addedIds         = ref([])
const pagina           = ref(1)
const POR_PAGINA       = 8

const scrolled      = ref(false)
const sidebarOpen   = ref(false)
const searchFocused = ref(false)
const toolbarHeight = ref(52)

/* Modal produto */
const modalAberto        = ref(false)
const produtoModal       = ref(null)
const anguloAtivo        = ref(0)
const corSelecionada     = ref('')
const modalBgColor       = ref('#C8A96E')
const storageSelecionado = ref(null)
const qtd                = ref(1)
const zoomAtivo          = ref(false)

/* Notify */
const notifyModal   = ref(false)
const notifyProduto = ref(null)
const notifyEmail   = ref('')
const notifySent    = ref(false)
const notifyFocus   = ref(false)

/* Toast */
const toast = ref({ visivel: false, msg: '', tipo: 'success' })
let toastTimer = null

/* ── Dados estáticos ── */
const heroCatsList = ['Smartphones', 'Laptops', 'Acessórios', 'Edições Limitadas']

const heroStripData = [
  { title: 'Autenticidade Garantida', sub: 'Certificado de origem', kanji: '真',
    icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>` },
  { title: 'Envio VIP Gratuito', sub: 'Entrega prioritária', kanji: '速',
    icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>` },
  { title: 'Atendimento 24h', sub: 'Concierge exclusivo', kanji: '誠',
    icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>` },
  { title: 'Programa Black', sub: 'Acesso antecipado', kanji: '極',
    icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>` },
]

const coresBase = [
  { nome: 'Preto Onyx',  hex: '#0A0A0A' },
  { nome: 'Prata',       hex: '#C0C0C0' },
  { nome: 'Dourado 24K', hex: '#C8A96E' },
  { nome: 'Rose Gold',   hex: '#B76E79' },
]

/* ── Sidebar style ── */
const sidebarStyle = computed(() => {
  const navH = getComputedStyle(document.documentElement).getPropertyValue('--navbar-h').trim() || '72px'
  return {
    top:      `calc(${navH} + ${toolbarHeight.value}px)`,
    height:   `calc(100vh - ${navH} - ${toolbarHeight.value}px)`,
    overflowY:'auto', overflowX:'hidden',
  }
})

/* ── Computed: dados da store ── */
const todos = computed(() => produtosStore.todos.filter(p => p.categoria !== 'GAMING'))
const totalGeral      = computed(() => todos.value.length)
const todasCategorias = computed(() =>
  [...new Set(todos.value.map(p => p.categoria).filter(Boolean))].sort()
)
const heroStats = computed(() => [
  { idx: '01', label: 'Peças em catálogo',   val: totalGeral.value, kanji: '品' },
  { idx: '02', label: 'Edições limitadas',   val: todos.value.filter(p=>p.limitada).length||0, kanji: '限' },
  { idx: '03', label: 'Membros VIP ativos',  val: '1.2k+', kanji: '客' },
])

/* ── Filtros ── */
const produtosFiltrados = computed(() => {
  let lista = [...todos.value]
  if (busca.value.trim()) {
    const q = busca.value.toLowerCase().trim()
    lista = lista.filter(p =>
      p.nome?.toLowerCase().includes(q) ||
      p.marca?.toLowerCase().includes(q) ||
      p.categoria?.toLowerCase().includes(q) ||
      p.descricao?.toLowerCase().includes(q)
    )
  }
  if (categoriasAtivas.value.length)
    lista = lista.filter(p => categoriasAtivas.value.includes(p.categoria))
  lista = lista.filter(p => p.preco >= filtroPreco.value[0] && p.preco <= filtroPreco.value[1])
  if (apenasEstoque.value) lista = lista.filter(p => p.estoque)
  switch (ordenacao.value) {
    case 'menor': lista.sort((a,b)=>a.preco-b.preco); break
    case 'maior': lista.sort((a,b)=>b.preco-a.preco); break
    case 'nome':  lista.sort((a,b)=>a.nome.localeCompare(b.nome,'pt-BR')); break
    case 'novo':  lista.sort((a,b)=>(b.novo?1:0)-(a.novo?1:0)); break
  }
  return lista
})

const totalPaginas    = computed(() => Math.max(1, Math.ceil(produtosFiltrados.value.length / POR_PAGINA)))
const produtosPaginados = computed(() => {
  const s = (pagina.value-1)*POR_PAGINA
  return produtosFiltrados.value.slice(s, s+POR_PAGINA)
})
const temFiltros = computed(() =>
  busca.value || categoriasAtivas.value.length || apenasEstoque.value ||
  filtroPreco.value[0] > 0 || filtroPreco.value[1] < 5000000
)
const paginasVisiveis = computed(() => {
  const t = totalPaginas.value, c = pagina.value
  if (t <= 7) return Array.from({length:t},(_,i)=>i+1)
  const pages = new Set([1,t,c,c-1,c+1].filter(p=>p>=1&&p<=t))
  const sorted = [...pages].sort((a,b)=>a-b)
  const result = []; let prev = null
  for (const p of sorted) { if (prev && p-prev>1) result.push('...'); result.push(p); prev=p }
  return result
})

/* ── Modal computed ── */
const angulos = computed(() => {
  if (!produtoModal.value) return []
  const imgs = produtoModal.value.imagens
  if (Array.isArray(imgs) && imgs.length>1) return imgs.slice(0,4)
  const base = produtoModal.value.imagem
  return base ? [base,base,base,base] : [null,null,null,null]
})
const imagemAtiva = computed(() => angulos.value[anguloAtivo.value] || produtoModal.value?.imagem)
const coresDisponiveis = computed(() => {
  if (!produtoModal.value) return []
  return produtoModal.value.cores?.length ? produtoModal.value.cores : coresBase
})
const storageOpcoes = computed(() => {
  if (!produtoModal.value) return []
  const opts = produtoModal.value.storageOptions
  if (!opts?.length) return []
  return opts.map(opt => typeof opt==='string' ? {label:opt, preco:produtoModal.value.preco} : {label:opt.label||opt, preco:opt.preco||produtoModal.value.preco})
})
const precoFinal = computed(() => storageSelecionado.value?.preco || produtoModal.value?.preco || 0)
const produtosRelacionados = computed(() => {
  if (!produtoModal.value) return []
  return todos.value.filter(p => p.categoria===produtoModal.value.categoria && (p._id||p.id)!==(produtoModal.value._id||produtoModal.value.id)).slice(0,3)
})

/* ── Persistência ── */
function salvarWishlist() { try { localStorage.setItem('noir_wishlist', JSON.stringify(wishlist.value)) } catch {} }
function carregarWishlist() { try { const r=localStorage.getItem('noir_wishlist'); if(r) wishlist.value=JSON.parse(r) } catch {} }
function salvarSaved() {
  try {
    localStorage.setItem('noir_saved', JSON.stringify(savedItems.value))
    window.dispatchEvent(new CustomEvent('saved-items-updated', {detail: savedItems.value}))
  } catch {}
}
function carregarSaved() { try { const r=localStorage.getItem('noir_saved'); if(r) savedItems.value=JSON.parse(r) } catch {} }
watch(wishlist, salvarWishlist, {deep:true})
watch(savedItems, salvarSaved, {deep:true})

/* ── Watchers ── */
watch(()=>route.query.q, q=>{if(q){busca.value=String(q);pagina.value=1}})
watch(()=>route.query.cat, cat=>{if(cat){categoriasAtivas.value=[String(cat)];pagina.value=1}})
watch([busca,categoriasAtivas,filtroPreco,apenasEstoque,ordenacao],()=>{pagina.value=1})
watch(produtosPaginados, async()=>{
  cardRefs.value={}
  await nextTick()
  initTilt()
})

/* ── Utilitários ── */
const fmt = v => (v||0).toLocaleString('pt-BR',{minimumFractionDigits:2})
const contarCat = cat => todos.value.filter(p=>p.categoria===cat).length
const getProdutoById = id => todos.value.find(p=>(p._id||p.id)===id)||null
const isSaved = id => savedItems.value.some(s=>(s._id||s.id)===id)

/* ── Toast ── */
function mostrarToast(msg, tipo='success') {
  clearTimeout(toastTimer)
  toast.value = {visivel:true, msg, tipo}
  toastTimer = setTimeout(()=>{toast.value.visivel=false}, 2800)
}

/* ── Filtros ── */
function toggleCat(cat) {
  const i = categoriasAtivas.value.indexOf(cat)
  if (i===-1) categoriasAtivas.value.push(cat)
  else categoriasAtivas.value.splice(i,1)
}
function clampPreco() {
  if (filtroPreco.value[0] > filtroPreco.value[1]-500)
    filtroPreco.value[0] = filtroPreco.value[1]-500
}
function limparFiltros() {
  busca.value=''; categoriasAtivas.value=[]; filtroPreco.value=[0,5000000]
  apenasEstoque.value=false; ordenacao.value='relevancia'; pagina.value=1
}
function irPag(p) {
  pagina.value=p
  nextTick(()=>{ storeRef.value?.querySelector('.store__catalogo')?.scrollIntoView({behavior:'smooth',block:'start'}) })
}

/* ── Wishlist/Saved ── */
function toggleWishlist(id) {
  const i=wishlist.value.indexOf(id)
  if (i===-1) { wishlist.value.push(id); mostrarToast('お気に入り追加 ♥') }
  else { wishlist.value.splice(i,1); mostrarToast('Removido dos favoritos','info') }
}
function toggleSaved(p) {
  if (!p) return
  const key=p._id||p.id
  if (isSaved(key)) { savedItems.value=savedItems.value.filter(s=>(s._id||s.id)!==key); mostrarToast('Removido das compras futuras','info') }
  else { savedItems.value=[...savedItems.value,{...p}]; mostrarToast('後で買う · Salvo para depois ◆') }
}

/* ── Carrinho ── */
function addToCart(p) {
  if (!p?.estoque) return
  if (!auth.isLogado) {
    window.dispatchEvent(new CustomEvent('abrir-modal-auth', { detail: 'login' }))
    return
  }
  const key = p._id || p.id
  if (addedIds.value.includes(key)) return
  const quantidade = modalAberto.value ? qtd.value : 1

  const itemComVariante = {
    ...p,
    corNome: corSelecionada.value       || p.cores?.[0]?.nome || '',
    corHex:  modalBgColor.value         || p.cores?.[0]?.hex  || '',
    storage: storageSelecionado.value?.label || '',
    preco:   storageSelecionado.value?.preco || p.preco,
  }

  for (let i = 0; i < quantidade; i++) cart.adicionar(itemComVariante)
  addedIds.value.push(key)
  mostrarToast(`${p.nome} — ${itemComVariante.corNome || 'adicionado'} ◆`)
  setTimeout(() => { window.dispatchEvent(new CustomEvent('abrir-carrinho')) }, 300)
  if (modalAberto.value) setTimeout(() => fecharModal(), 750)
  setTimeout(() => { addedIds.value = addedIds.value.filter(id => id !== key) }, 2500)
}

/* ── Modal ── */
function abrirModal(p) {
  if (!p) return
  produtoModal.value=p; anguloAtivo.value=0; zoomAtivo.value=false
  corSelecionada.value=p.cores?.[0]?.nome||'Preto Onyx'
  modalBgColor.value=p.cores?.[0]?.hex||'#C8A96E'
  qtd.value=1
  const opts=p.storageOptions
  storageSelecionado.value = opts?.length ? (typeof opts[0]==='string' ? {label:opts[0],preco:p.preco} : {label:opts[0].label||opts[0],preco:opts[0].preco||p.preco}) : null
  modalAberto.value=true
  document.body.style.overflow='hidden'
  nextTick(()=>animarModal())
}
function fecharModal() {
  if (!modalEl.value) { modalAberto.value=false; document.body.style.overflow=''; return }
  gsap.to(modalEl.value, {opacity:0, scale:.96, y:16, duration:.3, ease:'power2.in', onComplete:()=>{ modalAberto.value=false; zoomAtivo.value=false; document.body.style.overflow='' }})
}
function selecionarCor(cor) { corSelecionada.value=cor.nome; modalBgColor.value=cor.hex }
function selecionarStorage(opt) { storageSelecionado.value=opt }

/* ── Notify ── */
function notifyMe(p) { notifyProduto.value=p; notifyEmail.value=auth.user?.email||''; notifySent.value=false; notifyModal.value=true }
async function enviarNotify() {
  if (!notifyEmail.value.includes('@')) return
  try { await fetch('/api/notify-me',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:notifyEmail.value,produtoId:notifyProduto.value?._id||notifyProduto.value?.id})}) } catch {}
  notifySent.value=true; mostrarToast('入荷時に通知します ◆')
  setTimeout(()=>{notifyModal.value=false},2200)
}

/* ── GSAP ── */
function animarHero() {
  const tl = gsap.timeline({delay:.1})
  if (heroKicker.value) tl.fromTo(heroKicker.value,{opacity:0,x:-20},{opacity:1,x:0,duration:.7,ease:'power3.out'})
  if (heroEyebrow.value) tl.fromTo(heroEyebrow.value,{opacity:0,x:-30},{opacity:1,x:0,duration:.8,ease:'power3.out'},'-=.4')
  if (heroTitulo.value) {
    const lines=heroTitulo.value.querySelectorAll('.store__t-thin,.store__t-gold,.store__t-kanji')
    tl.fromTo(lines,{opacity:0,y:60,skewY:2},{opacity:1,y:0,skewY:0,duration:1.1,stagger:.12,ease:'expo.out'},'-=.4')
  }
  if (heroSub.value) tl.fromTo(heroSub.value,{opacity:0,y:20},{opacity:1,y:0,duration:.7,ease:'power2.out'},'-=.5')
  if (heroCatsRef.value) {
    const btns=heroCatsRef.value.querySelectorAll('.store__hero-cat')
    tl.fromTo(btns,{opacity:0,y:14,scale:.97},{opacity:1,y:0,scale:1,duration:.6,stagger:.08,ease:'back.out(1.5)'},'-=.4')
  }
  if (heroRight.value) {
    const stats=heroRight.value.querySelectorAll('.store__stat')
    tl.fromTo(stats,{opacity:0,x:30},{opacity:1,x:0,duration:.7,stagger:.1,ease:'power3.out'},'-=.8')
  }
  if (heroStrip.value) {
    const items=heroStrip.value.querySelectorAll('.store__strip-item')
    tl.fromTo(items,{opacity:0,y:18},{opacity:1,y:0,duration:.6,stagger:.1,ease:'power2.out'},'-=.5')
  }
}

function animarModal() {
  if (!modalEl.value) return
  gsap.fromTo(modalEl.value,{opacity:0,scale:.93,y:36},{opacity:1,scale:1,y:0,duration:.65,ease:'expo.out'})
  if (modalInfoEl.value) {
    gsap.fromTo([...modalInfoEl.value.children],{opacity:0,y:22},{opacity:1,y:0,duration:.5,stagger:.055,ease:'power2.out',delay:.2})
  }
}

function initTilt() {
  nextTick(()=>{
    Object.entries(cardRefs.value).forEach(([idx,el])=>{
      if (!el||el._tiltBound) return
      el._tiltBound=true
      el.addEventListener('mousemove',e=>{
        const rect=el.getBoundingClientRect()
        const dx=(e.clientX-rect.left-rect.width/2)/(rect.width/2)
        const dy=(e.clientY-rect.top-rect.height/2)/(rect.height/2)
        gsap.to(el,{rotateX:-dy*7,rotateY:dx*7,transformPerspective:900,duration:.3,ease:'power1.out',overwrite:'auto'})
        const shine=shineRefs.value[idx]
        if (shine) {
          const angle=Math.atan2(dy,dx)*(180/Math.PI)
          gsap.to(shine,{opacity:1,background:`linear-gradient(${angle}deg,transparent 40%,rgba(255,255,255,0.055) 50%,transparent 60%)`,duration:.3})
        }
      })
      el.addEventListener('mouseleave',()=>{
        gsap.to(el,{rotateX:0,rotateY:0,duration:.6,ease:'elastic.out(1,.5)',overwrite:'auto'})
        const shine=shineRefs.value[idx]
        if (shine) gsap.to(shine,{opacity:0,duration:.4})
      })
    })
  })
}

/* ── Scroll ── */
const onScroll=()=>{ scrolled.value=window.scrollY>60 }
function handleKeydown(e) {
  if (e.key!=='Escape') return
  if (zoomAtivo.value){zoomAtivo.value=false;return}
  if (modalAberto.value){fecharModal();return}
  if (notifyModal.value){notifyModal.value=false;return}
  if (sidebarOpen.value){sidebarOpen.value=false;return}
  if (modalAberto.value && angulos.value.length>1) {
    if (e.key==='ArrowRight') anguloAtivo.value=(anguloAtivo.value+1)%angulos.value.length
    if (e.key==='ArrowLeft') anguloAtivo.value=(anguloAtivo.value-1+angulos.value.length)%angulos.value.length
  }
}
const measureToolbar=()=>{ if(toolbarRef.value) toolbarHeight.value=toolbarRef.value.offsetHeight }

onMounted(async()=>{
  if (!cart.synced) cart.init()
  await produtosStore.recarregar()
  loading.value=false
  if (route.query.q) busca.value=String(route.query.q)
  if (route.query.cat) categoriasAtivas.value=[String(route.query.cat)]
  carregarWishlist(); carregarSaved()
  window.addEventListener('scroll',onScroll,{passive:true})
  window.addEventListener('resize',measureToolbar,{passive:true})
  window.addEventListener('keydown',handleKeydown)
  window.addEventListener('saved-items-updated',e=>{ if(e.detail) savedItems.value=e.detail })
  await nextTick()
  measureToolbar(); initTilt(); animarHero()
  ScrollTrigger.create({start:60,onUpdate:self=>{scrolled.value=self.progress>0}})
})

onBeforeUnmount(()=>{
  window.removeEventListener('scroll',onScroll)
  window.removeEventListener('resize',measureToolbar)
  window.removeEventListener('keydown',handleKeydown)
  clearTimeout(toastTimer)
  ScrollTrigger.getAll().forEach(t=>t.kill())
  document.body.style.overflow=''
})
</script>

<style scoped>

/* ══════════════════════════════════════
   TOKENS — 100% alinhados com navbar/footer
══════════════════════════════════════ */
.store {
  --or:      var(--cor-primaria,   #F5A623);
  --or2:     var(--cor-secundaria, #F5D78E);
  --void:    var(--or-void,        #06060d);
  --deep:    var(--or-deep,        #09090f);
  --surf:    var(--or-surface,     #0c0c18);
  --silk:    var(--or-silk,        #ede8e0);
  --silk2:   var(--or-silk-2,      rgba(237,232,224,0.50));
  --silk3:   var(--or-silk-3,      rgba(237,232,224,0.22));
  --silk4:   var(--or-silk-4,      rgba(237,232,224,0.10));
  --hair:    var(--or-hair,        rgba(245,166,35,0.12));
  --hair2:   var(--or-hair-2,      rgba(237,232,224,0.07));
  --gold3:   var(--or-gold-3,      rgba(245,166,35,0.06));
  --ease:    var(--or-easing,      cubic-bezier(0.16,1,0.30,1));
  --f-sans:  var(--font-sans,  'Syne',sans-serif);
  --f-serif: var(--font-serif, 'Playfair Display',serif);
  --f-mono:  var(--or-font-num,'DM Mono','Courier New',monospace);
  --f-jp:    'Noto Serif JP',serif;

  --lacre:     var(--cor-acento, #C1121F);
  --lacre-mid: color-mix(in srgb, var(--lacre) 50%, transparent);
  --lacre-fill:color-mix(in srgb, var(--lacre) 68%, transparent);

  background:    var(--void);
  color:         var(--silk);
  font-family:   var(--f-sans);
  min-height:    100vh;
  position:      relative;
  overflow-x:    hidden;
}

/* ══ FUNDO GLOBAL — DNA do footer ══ */
.store__bg { position:fixed; inset:0; pointer-events:none; z-index:0; overflow:hidden; }

/* Kamons — igual ao footer __kamon */
.store__kamon {
  position:absolute;
  font-family:var(--f-jp);
  font-weight:200;
  color:var(--or);
  pointer-events:none;
  user-select:none;
  line-height:1;
}
.store__kamon--1 { font-size:clamp(200px,28vw,380px); bottom:-80px; right:-60px; opacity:.022; animation:kamonDrift 22s ease-in-out infinite; }
.store__kamon--2 { font-size:clamp(120px,16vw,220px); top:10%; left:-40px; opacity:.016; animation:kamonDrift 28s ease-in-out infinite reverse; }
.store__kamon--3 { font-size:clamp(80px,10vw,140px); top:42%; left:42%; opacity:.012; animation:kamonDrift 18s ease-in-out infinite; }
@keyframes kamonDrift { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-20px) rotate(1deg)} }

/* Realm line — idêntica ao footer */
.store__realm-line {
  position:absolute; top:0; left:0; right:0; height:.5px;
  background:linear-gradient(90deg, transparent 0%, transparent 6%, var(--or2,.6) 20%, var(--or) 50%, var(--or2,.6) 80%, transparent 94%, transparent 100%);
  opacity:.65;
}

/* Washi — igual ao banner */
.store__washi {
  position:absolute; inset:0; opacity:.8;
  background:
    repeating-linear-gradient(90deg,rgba(255,255,255,.008) 0,rgba(255,255,255,.008) 1px,transparent 1px,transparent 54px),
    repeating-linear-gradient(0deg,rgba(255,255,255,.006) 0,rgba(255,255,255,.006) 1px,transparent 1px,transparent 42px);
}

/* Fog */
.store__fog { position:absolute; pointer-events:none; border-radius:50%; filter:blur(90px); }
.store__fog--1 { width:70vw; height:70vw; bottom:-30vw; left:-15vw; background:radial-gradient(circle,rgba(6,6,13,.9) 0%,transparent 70%); animation:fogDrift1 20s ease-in-out infinite; }
.store__fog--2 { width:45vw; height:45vw; top:-12vw; right:10vw; background:radial-gradient(circle,rgba(245,166,35,.018) 0%,transparent 70%); animation:fogDrift2 26s ease-in-out infinite; }
@keyframes fogDrift1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-24px)} }
@keyframes fogDrift2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(16px,16px)} }

/* ══ HERO ══ */
.store__hero {
  position:relative; z-index:2;
  padding:calc(var(--navbar-h,72px) + 64px) 80px 0;
  border-bottom:.5px solid var(--hair2);
  overflow:hidden;
}

/* Linha editorial — igual ao banner */
.store__edge-line {
  position:absolute; left:calc(6% - 1px); top:0; bottom:0; width:.5px;
  background:linear-gradient(to bottom,transparent 0%,var(--hair) 22%,var(--hair) 78%,transparent 100%);
  z-index:3; pointer-events:none;
}
.store__edge-num {
  position:absolute; top:calc(var(--navbar-h,72px)+40px);
  left:50%; transform:translateX(-50%) rotate(-90deg);
  font-family:var(--f-mono); font-size:7px; letter-spacing:.3em;
  color:var(--or); opacity:.32; white-space:nowrap;
}

/* HUD direito — igual ao banner */
.store__hud {
  position:absolute; right:28px; top:50%;
  display:flex; flex-direction:column; align-items:center; gap:8px;
  transform:translateY(-50%) rotate(90deg);
  z-index:3; pointer-events:none;
}
.store__hud-label { font-size:7px; letter-spacing:.52em; text-transform:uppercase; color:var(--silk4); }
.store__hud-sep   { width:18px; height:.5px; background:linear-gradient(90deg,transparent,var(--or),transparent); opacity:.32; }
.store__hud-coord { font-family:var(--f-mono); font-size:7px; letter-spacing:.28em; text-transform:uppercase; color:var(--or); opacity:.48; }

.store__hero-inner {
  display:grid; grid-template-columns:1fr 320px; gap:64px; align-items:center;
  padding-left:calc(6% + 28px);
}

/* Kicker */
.store__kicker { display:flex; flex-direction:column; align-items:flex-start; gap:7px; margin-bottom:22px; }
.store__kicker-num { font-family:var(--f-mono); font-size:9px; letter-spacing:.3em; color:var(--or); opacity:.4; }
.store__kicker-bar { width:.5px; height:38px; background:linear-gradient(to bottom,var(--or),transparent); opacity:.28; }

/* Eyebrow — igual ao banner */
.store__eyebrow { display:flex; align-items:center; gap:10px; margin-bottom:22px; }
.store__ew-dot  { width:5px; height:5px; border-radius:50%; background:var(--lacre); opacity:.8; flex-shrink:0; animation:dotPulse 2.5s ease-in-out infinite; }
.store__ew-text { font-size:8px; font-weight:600; letter-spacing:.52em; text-transform:uppercase; color:var(--or); opacity:.7; }
@keyframes dotPulse { 0%,100%{box-shadow:0 0 0 0 rgba(193,18,31,0)} 50%{box-shadow:0 0 0 5px rgba(193,18,31,0)} }

/* Título — igual ao banner */
.store__titulo { display:flex; flex-direction:column; margin:0; line-height:1; margin-bottom:20px; }
.store__t-thin {
  font-family:var(--f-sans);
  font-size:clamp(1.4rem,3.5vw,3rem);
  font-weight:300; color:var(--silk3); letter-spacing:-.01em;
  text-transform:uppercase; line-height:1; display:block;
}
.store__t-gold {
  font-family:var(--f-serif);
  font-size:clamp(3.5rem,9vw,8rem);
  font-weight:300; font-style:italic;
  background:var(--grad-texto, linear-gradient(135deg,var(--or) 0%,var(--or2) 55%,#FF7A20 100%));
  background-size:200% auto;
  -webkit-background-clip:text; background-clip:text;
  -webkit-text-fill-color:transparent;
  animation:goldShine 6s linear infinite;
  line-height:.9; display:block;
}
@keyframes goldShine { from{background-position:0% center} to{background-position:200% center} }

.store__t-kanji {
  font-family:var(--f-jp); font-weight:200;
  font-size:clamp(.9rem,1.4vw,1.3rem);
  letter-spacing:10px; color:var(--or); opacity:.18;
  margin-top:10px; display:block;
}

/* Sep — igual ao banner */
.store__sep { display:flex; align-items:center; gap:10px; width:200px; margin:0 0 18px; }
.store__sep-line { flex:1; height:.5px; background:linear-gradient(to right,var(--lacre),transparent); opacity:.45; }
.store__sep-line--r { background:linear-gradient(to left,var(--lacre),transparent); }
.store__sep-gem { width:5px; height:5px; flex-shrink:0; border:.5px solid color-mix(in srgb,var(--lacre) 50%,transparent); transform:rotate(45deg); }

.store__sub {
  font-family:var(--f-mono); font-size:9px; letter-spacing:2px;
  color:var(--silk4); text-transform:uppercase; margin-bottom:24px;
}

/* Hero cats — estilo nb-link com fill */
.store__hero-cats { display:flex; flex-wrap:wrap; gap:7px; }
.store__hero-cat {
  position:relative; overflow:hidden;
  background:transparent; border:.5px solid var(--hair2);
  padding:8px 16px;
  font-family:var(--f-mono); font-size:8px; letter-spacing:3px; text-transform:uppercase;
  color:var(--silk3); cursor:pointer; transition:color .45s; z-index:0;
}
.store__hero-cat-fill {
  position:absolute; inset:0; transform:scaleX(0); transform-origin:left;
  background:var(--or); transition:transform .5s var(--ease); z-index:-1;
}
.store__hero-cat:hover .store__hero-cat-fill,
.store__hero-cat.is-active .store__hero-cat-fill { transform:scaleX(1); }
.store__hero-cat:hover,
.store__hero-cat.is-active { color:var(--void); border-color:var(--or); }

/* Stats — igual ao banner nb__stats */
.store__hero-right { display:flex; flex-direction:column; gap:4px; position:relative; }
.store__hanko {
  position:absolute; right:-16px; top:-24px;
  width:78px; height:78px;
  opacity:.65; pointer-events:none;
}
.store__stats { display:flex; flex-direction:column; gap:5px; margin-top:16px; }
.store__stat {
  background:rgba(245,166,35,.025); border:.5px solid var(--hair2);
  padding:12px 14px; position:relative; overflow:hidden;
  transition:border-color .25s,background .25s;
}
.store__stat:hover { border-color:var(--hair); background:var(--gold3); }
.store__stat::before { content:''; position:absolute; left:0; top:0; bottom:0; width:.5px; background:linear-gradient(to bottom,var(--or),transparent); opacity:0; transition:opacity .25s; }
.store__stat:hover::before { opacity:1; }
.store__stat-idx   { position:absolute; top:7px; right:8px; font-family:var(--f-mono); font-size:6px; color:var(--or); opacity:.2; }
.store__stat-kanji { position:absolute; bottom:5px; right:8px; font-family:var(--f-jp); font-size:20px; font-weight:200; color:var(--or); opacity:.06; line-height:1; }
.store__stat-num   { display:block; font-family:var(--f-serif); font-size:1.6rem; font-weight:300; font-style:italic; color:var(--or); }
.store__stat-label { display:block; font-family:var(--f-mono); font-size:6.5px; letter-spacing:3px; text-transform:uppercase; color:var(--silk4); margin-top:2px; }

/* Strip — como drawer__ornament mas full-width */
.store__strip {
  display:grid; grid-template-columns:repeat(4,1fr);
  border-top:.5px solid var(--hair2); margin:40px -80px 0; padding:0 80px;
  position:relative; z-index:2;
}
.store__strip::before {
  content:''; position:absolute; top:0; left:0; right:0; height:.5px;
  background:linear-gradient(90deg,transparent,var(--or2) 20%,var(--or) 50%,var(--or2) 80%,transparent);
  opacity:.3;
}
.store__strip-item {
  display:flex; align-items:center; gap:11px;
  padding:16px 20px 16px 0; margin-right:20px;
  border-right:.5px solid var(--hair2); position:relative;
}
.store__strip-item:last-child { border-right:none; padding-right:0; margin-right:0; }
.store__strip-icon {
  width:32px; height:32px; border:.5px solid var(--hair2);
  display:flex; align-items:center; justify-content:center;
  color:var(--or); flex-shrink:0; transition:all .25s;
}
.store__strip-item:hover .store__strip-icon { border-color:var(--hair); background:var(--gold3); }
.store__strip-title { font-size:10px; font-weight:600; color:var(--silk2); letter-spacing:.5px; margin-bottom:2px; }
.store__strip-sub   { font-family:var(--f-mono); font-size:7.5px; color:var(--silk4); letter-spacing:1px; }
.store__strip-kanji { position:absolute; right:10px; top:50%; transform:translateY(-50%); font-family:var(--f-jp); font-size:24px; font-weight:200; color:var(--or); opacity:.06; pointer-events:none; transition:opacity .3s; }
.store__strip-item:hover .store__strip-kanji { opacity:.14; }

/* ══ TICKER — mesmo padrão do original ══ */
.store__ticker {
  background:var(--deep); border-bottom:.5px solid var(--hair2);
  height:28px; display:flex; align-items:center; overflow:hidden;
  position:relative; z-index:10;
}
.store__ticker::before,.store__ticker::after { content:''; position:absolute; top:0; bottom:0; width:60px; z-index:2; pointer-events:none; }
.store__ticker::before { left:0; background:linear-gradient(to right,var(--deep),transparent); }
.store__ticker::after  { right:0; background:linear-gradient(to left,var(--deep),transparent); }
.store__ticker-track { display:flex; white-space:nowrap; animation:tickerMove 42s linear infinite; }
.store__ticker-set   { display:inline-flex; align-items:center; }
.store__t-item { font-family:var(--f-mono); font-size:7.5px; letter-spacing:3px; text-transform:uppercase; color:var(--silk4); padding:0 20px; height:28px; display:flex; align-items:center; flex-shrink:0; border-right:.5px solid var(--hair2); }
.store__t-sep  { color:var(--or); font-size:5px; opacity:.35; flex-shrink:0; padding:0 3px; }
@keyframes tickerMove { from{transform:translateX(0)} to{transform:translateX(-25%)} }

/* ══ TOOLBAR — estilo navbar ══ */
.store__toolbar {
  position:sticky; top:0; z-index:50;
  background:rgba(9,9,15,.94); backdrop-filter:blur(20px);
  border-bottom:.5px solid var(--hair2);
  transition:box-shadow .3s,border-color .3s;
  overflow:hidden;
}
.store__toolbar-border {
  position:absolute; top:0; left:0; right:0; height:.5px;
  background:linear-gradient(90deg,transparent,var(--or2) 20%,var(--or) 50%,var(--or2) 80%,transparent);
  opacity:.35; pointer-events:none;
}
.store__toolbar.is-scrolled { box-shadow:0 4px 28px rgba(0,0,0,.22); border-bottom-color:var(--hair); }
.store__toolbar-inner {
  max-width:1600px; margin:0 auto; padding:10px 26px;
  display:flex; align-items:center; gap:10px; flex-wrap:wrap;
}

.store__search-wrap {
  display:flex; align-items:center; gap:8px;
  background:rgba(255,255,255,.025); border:.5px solid var(--hair2);
  padding:8px 12px; min-width:190px; flex:1; max-width:300px;
  transition:border-color .25s,box-shadow .25s;
}
.store__search-wrap.is-focus { border-color:var(--hair); box-shadow:0 0 0 3px rgba(245,166,35,.04); }
.store__search-wrap svg { color:var(--or); flex-shrink:0; opacity:.5; }
.store__search-wrap input { background:none; border:none; outline:none; color:var(--silk); font-family:var(--f-mono); font-size:10px; width:100%; letter-spacing:.05em; }
.store__search-wrap input::placeholder { color:var(--silk4); }
.store__search-clear { background:none; border:none; color:var(--silk4); cursor:pointer; padding:0 2px; transition:color .2s; }
.store__search-clear:hover { color:var(--or); }

.store__chips { display:flex; gap:5px; flex-wrap:wrap; }
.store__chip {
  display:flex; align-items:center; gap:6px;
  background:var(--gold3); border:.5px solid var(--hair);
  padding:4px 10px; font-family:var(--f-mono); font-size:7px;
  letter-spacing:2px; color:var(--or); cursor:pointer; transition:all .2s;
}
.store__chip:hover { background:rgba(245,166,35,.12); }

.store__toolbar-right { display:flex; align-items:center; gap:10px; margin-left:auto; }
.store__toolbar-count { font-family:var(--f-mono); font-size:8px; letter-spacing:2px; color:var(--silk4); white-space:nowrap; }
.store__toolbar-select { background:rgba(255,255,255,.025); border:.5px solid var(--hair2); padding:7px 10px; color:var(--silk3); font-family:var(--f-mono); font-size:9px; cursor:pointer; outline:none; transition:border-color .2s; }
.store__toolbar-select:focus { border-color:var(--hair); }
.store__toolbar-limpar { background:none; border:.5px solid var(--hair2); padding:7px 12px; font-family:var(--f-mono); font-size:7px; letter-spacing:2px; color:var(--silk4); cursor:pointer; transition:all .2s; }
.store__toolbar-limpar:hover { border-color:var(--hair); color:var(--or); }

.store__view-toggle { display:flex; gap:2px; }
.store__view-toggle button { width:30px; height:30px; background:transparent; border:.5px solid var(--hair2); color:var(--silk4); cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all .2s; }
.store__view-toggle button:hover { border-color:var(--hair); color:var(--silk3); }
.store__view-toggle button.is-active { border-color:var(--hair); color:var(--or); background:var(--gold3); }

/* ══ LAYOUT ══ */
.store__layout {
  display:grid; grid-template-columns:230px 1fr;
  max-width:1600px; margin:0 auto; min-height:70vh;
  position:relative; z-index:2;
}

/* ══ SIDEBAR — estilo drawer ══ */
.store__sidebar {
  background:var(--deep); border-right:.5px solid var(--hair2);
  padding:0; position:sticky;
  display:flex; flex-direction:column;
  transition:transform .35s var(--ease);
  scrollbar-width:thin; scrollbar-color:rgba(245,166,35,.12) transparent;
  overflow:hidden;
}
.store__sidebar::-webkit-scrollbar { width:3px; }
.store__sidebar::-webkit-scrollbar-thumb { background:rgba(245,166,35,.15); border-radius:2px; }

/* Kamon like drawer-kamon */
.store__sb-kamon {
  position:absolute; bottom:80px; right:10px;
  font-family:var(--f-jp); font-size:44px; font-weight:200;
  color:var(--or); opacity:.038; pointer-events:none; z-index:0; line-height:1;
}

/* Watermark como pref-watermark */
.store__sb-watermark {
  text-align:center; padding:12px 16px 16px; margin-top:auto;
  font-family:var(--f-serif); font-size:8px; font-style:italic;
  letter-spacing:.5em; text-transform:uppercase; line-height:1.7;
  color:var(--or); opacity:.09; pointer-events:none; user-select:none;
  position:relative; z-index:1;
}

.store__sb-close-m { display:none; background:none; border:none; color:var(--silk4); font-family:var(--f-mono); font-size:8px; letter-spacing:3px; cursor:pointer; padding:14px 16px 0; text-align:left; }
.store__sb-overlay { display:none; position:fixed; inset:0; background:rgba(0,0,0,.78); z-index:98; opacity:0; transition:opacity .3s; backdrop-filter:blur(6px); }
.store__sb-overlay.is-vis { display:block; opacity:1; }

/* Ornamento da sidebar — como drawer__ornament */
.store__sb-ornament { display:flex; align-items:center; gap:10px; padding:16px 16px 10px; position:relative; z-index:1; }
.store__sb-orn-line { flex:1; height:.5px; background:linear-gradient(90deg,var(--or),transparent); opacity:.18; }
.store__sb-orn-line--r { background:linear-gradient(270deg,var(--or),transparent); }
.store__sb-orn-kanji { font-family:var(--f-jp); font-size:13px; color:var(--or); opacity:.28; line-height:1; flex-shrink:0; }

.store__sb-sec { padding:0 16px; position:relative; z-index:1; flex-shrink:0; }
.store__sb-lbl {
  font-family:var(--f-mono); font-size:6px; letter-spacing:5px; color:var(--or);
  margin-bottom:10px; display:flex; align-items:center; gap:7px;
  text-transform:uppercase; opacity:.7;
}
.store__sb-lbl-kanji { font-family:var(--f-jp); font-size:13px; font-weight:200; color:var(--or); opacity:.6; letter-spacing:0; line-height:1; }
.store__sb-count { font-family:var(--f-mono); font-size:8px; color:var(--silk4); margin-left:5px; }

/* Sep como footer ft__sep */
.store__sb-sep { display:flex; align-items:center; gap:10px; padding:12px 16px; position:relative; z-index:1; }
.store__sb-sep-line { flex:1; height:.5px; background:linear-gradient(90deg,transparent,rgba(245,166,35,.18)); }
.store__sb-sep-line--r { background:linear-gradient(to left,transparent,rgba(245,166,35,.18)); }
.store__sb-sep-kanji { font-family:var(--f-jp); font-size:11px; font-weight:200; color:var(--or); opacity:.28; flex-shrink:0; line-height:1; }

.store__sb-cats { display:flex; flex-direction:column; gap:1px; }
.store__sb-cat {
  display:flex; align-items:center; justify-content:space-between; gap:7px;
  background:none; border:.5px solid transparent; padding:7px 8px;
  cursor:pointer; width:100%; font-family:var(--f-sans); font-size:10.5px;
  color:var(--silk3); transition:all .2s; position:relative;
}
.store__sb-cat::before { content:''; position:absolute; left:0; top:6px; bottom:6px; width:.5px; background:var(--or); opacity:0; transition:opacity .2s; }
.store__sb-cat:hover { background:var(--gold3); color:var(--silk2); padding-left:12px; }
.store__sb-cat:hover::before { opacity:.6; }
.store__sb-cat.is-active { background:var(--gold3); border-color:var(--hair); color:var(--or); }
.store__sb-cat.is-active::before { opacity:.8; }
.store__sb-cat-check { font-size:5px; color:var(--or); opacity:.4; flex-shrink:0; }
.store__sb-cat.is-active .store__sb-cat-check { opacity:1; }
.store__sb-cat-n { font-family:var(--f-mono); font-size:8px; color:var(--silk4); margin-left:auto; }

.store__sb-preco-vals { display:flex; justify-content:space-between; font-family:var(--f-mono); font-size:9px; color:var(--silk4); margin-bottom:8px; }
.store__sb-ranges { display:flex; flex-direction:column; gap:4px; margin-bottom:10px; }
.store__sb-range { width:100%; height:2px; -webkit-appearance:none; background:rgba(245,166,35,.15); border-radius:2px; cursor:pointer; accent-color:var(--or); }
.store__sb-range::-webkit-slider-thumb { -webkit-appearance:none; width:12px; height:12px; border-radius:50%; background:var(--or); cursor:pointer; border:2px solid var(--void); box-shadow:0 0 6px rgba(245,166,35,.25); }

.store__sb-toggle-row { display:flex; align-items:center; gap:9px; cursor:pointer; }
.store__sb-toggle { width:32px; height:18px; border-radius:18px; background:rgba(245,166,35,.06); border:.5px solid var(--hair2); position:relative; transition:background .2s; flex-shrink:0; }
.store__sb-toggle.is-on { background:var(--or); border-color:var(--or); }
.store__sb-toggle-thumb { position:absolute; top:2px; left:2px; width:12px; height:12px; border-radius:50%; background:var(--void); transition:left .2s var(--ease); box-shadow:0 1px 4px rgba(0,0,0,.3); }
.store__sb-toggle.is-on .store__sb-toggle-thumb { left:16px; }
.store__sb-toggle-row span { font-size:10px; color:var(--silk3); }

/* Apply button — como drawer checkout */
.store__sb-apply {
  position:relative; overflow:hidden;
  background:transparent; border:.5px solid var(--or); border-radius:0;
  font-family:var(--f-mono); font-size:7px; letter-spacing:3px; text-transform:uppercase;
  color:var(--or); padding:9px; cursor:pointer; width:100%; margin-top:10px;
  transition:color .45s; z-index:0;
}
.store__sb-apply::before { content:''; position:absolute; inset:0; background:var(--or); transform:scaleX(0); transform-origin:left; transition:transform .5s var(--ease); z-index:-1; }
.store__sb-apply:hover::before { transform:scaleX(1); }
.store__sb-apply:hover { color:var(--void); }

.store__sb-limpar { background:none; border:.5px solid var(--hair2); padding:7px; font-family:var(--f-mono); font-size:6px; letter-spacing:3px; color:var(--silk4); cursor:pointer; width:calc(100% - 32px); margin:10px 16px 16px; transition:all .2s; text-transform:uppercase; display:block; }
.store__sb-limpar:hover { border-color:var(--hair); color:var(--or); }

.store__sb-empty { display:flex; flex-direction:column; align-items:center; gap:5px; padding:12px 0; color:var(--silk4); font-size:9px; opacity:.5; text-align:center; }
.store__sb-wl { display:flex; flex-direction:column; gap:3px; }
.store__sb-wl-item { display:flex; align-items:center; gap:7px; padding:5px 6px; border:.5px solid transparent; transition:all .2s; cursor:pointer; }
.store__sb-wl-item:hover { background:var(--gold3); border-color:var(--hair2); }
.store__sb-wl-img { width:28px; height:28px; flex-shrink:0; background:var(--void); border:.5px solid var(--hair2); position:relative; overflow:hidden; display:flex; align-items:center; justify-content:center; }
.store__sb-wl-img img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; z-index:2; }
.store__sb-wl-fb { font-family:var(--f-serif); font-size:.8rem; font-style:italic; color:var(--or); opacity:.3; z-index:1; }
.store__sb-wl-info { flex:1; overflow:hidden; }
.store__sb-wl-nome { font-size:9px; color:var(--silk3); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.store__sb-wl-preco { font-family:var(--f-serif); font-size:9px; color:var(--or); margin-top:1px; }
.store__sb-wl-x { background:none; border:none; color:var(--silk4); cursor:pointer; font-size:9px; padding:2px; transition:color .2s; }
.store__sb-wl-x:hover { color:#ef4444; }

/* ══ CATÁLOGO ══ */
.store__catalogo { padding:24px 28px; overflow-x:hidden; position:relative; z-index:2; }

.store__btn-filtros-m { display:none; align-items:center; gap:7px; background:var(--deep); border:.5px solid var(--hair2); padding:9px 14px; font-family:var(--f-mono); font-size:8px; letter-spacing:3px; color:var(--silk3); cursor:pointer; margin-bottom:18px; transition:all .2s; position:relative; }
.store__btn-filtros-m:hover { border-color:var(--hair); color:var(--or); }
.store__btn-filtros-badge { position:absolute; top:-4px; right:-4px; width:10px; height:10px; background:var(--or); border-radius:50%; border:1px solid var(--void); }

.store__cat-erro { display:flex; flex-direction:column; align-items:center; gap:14px; padding:72px 0; font-size:12px; color:rgba(239,68,68,.7); text-align:center; }

/* Vazio — estilo drawer__vazio */
.store__cat-vazio { display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; padding:80px 40px; text-align:center; }
.store__vazio-ico { width:64px; height:64px; border:.5px solid var(--hair2); display:flex; align-items:center; justify-content:center; position:relative; }
.store__vazio-ico::before { content:''; position:absolute; top:-1px; left:-1px; width:10px; height:10px; border-top:.5px solid var(--or); border-left:.5px solid var(--or); }
.store__vazio-ico::after  { content:''; position:absolute; bottom:-1px; right:-1px; width:10px; height:10px; border-bottom:.5px solid var(--or); border-right:.5px solid var(--or); }
.store__vazio-kanji { font-family:var(--f-jp); font-size:28px; color:var(--or); opacity:.35; line-height:1; }
.store__vazio-titulo { font-family:var(--f-sans); font-size:9px; font-weight:400; letter-spacing:.4em; text-transform:uppercase; color:var(--silk3); }
.store__vazio-sub    { font-family:var(--f-sans); font-size:11px; font-weight:300; color:var(--silk4); line-height:1.7; max-width:200px; }

/* ══ GRID ══ */
.store__grid--grid {
  display:grid; grid-template-columns:repeat(auto-fill,minmax(220px,1fr));
  gap:0; border-top:.5px solid var(--hair2); border-left:.5px solid var(--hair2);
}
.store__grid--list { display:flex; flex-direction:column; gap:0; border-top:.5px solid var(--hair2); }

/* ══ CARD — DNA do drawer di + estilo próprio ══ */
.store__card {
  background:var(--deep); border-right:.5px solid var(--hair2); border-bottom:.5px solid var(--hair2);
  overflow:hidden; cursor:pointer; display:flex; flex-direction:column; position:relative;
  transform:translateY(12px); opacity:0;
  animation:cardReveal .7s var(--card-delay, 0ms) var(--ease) forwards;
  transition:border-color .3s,box-shadow .35s,background .3s;
  transform-style:preserve-3d; will-change:transform;
}
@keyframes cardReveal { to{opacity:1;transform:translateY(0)} }

.store__card:hover {
  background:rgba(245,166,35,.018);
  box-shadow:0 8px 32px rgba(245,166,35,.055),0 2px 8px rgba(0,0,0,.22);
  border-color:var(--hair);
}
.store__card--esgotado { opacity:.6; }
.store__card--list { flex-direction:row; }
.store__card--list .store__card-img-wrap { width:190px; flex-shrink:0; aspect-ratio:auto; height:auto; }
.store__card--list .store__card-info     { padding:20px 24px; }

/* Cantos decorativos — como drawer__vazio__ico */
.store__card-corner { position:absolute; z-index:5; width:10px; height:10px; border-color:rgba(245,166,35,0); border-style:solid; pointer-events:none; transition:border-color .3s; }
.store__card-corner--tl { top:6px; left:6px; border-width:1px 0 0 1px; }
.store__card-corner--br { bottom:6px; right:6px; border-width:0 1px 1px 0; }
.store__card:hover .store__card-corner { border-color:rgba(245,166,35,.3); }

/* Número — como di__num */
.store__card-num { position:absolute; top:8px; left:10px; z-index:4; font-family:var(--f-jp); font-size:11px; color:var(--or); opacity:.22; line-height:1; pointer-events:none; transition:opacity .3s; }
.store__card:hover .store__card-num { opacity:.45; }

/* Imagem */
.store__card-img-wrap { position:relative; aspect-ratio:4/3; overflow:hidden; flex-shrink:0; }
.store__card-fallback {
  position:absolute; inset:0; z-index:0;
  display:flex; flex-direction:column; align-items:center; justify-content:center; gap:6px;
  background:linear-gradient(135deg,var(--deep) 0%,rgba(245,166,35,.025) 100%);
  pointer-events:none;
}
.store__card-fb-letra { font-family:var(--f-serif); font-size:2.2rem; font-style:italic; font-weight:300; color:var(--or); opacity:.22; line-height:1; }
.store__card-fb-kanji { font-family:var(--f-jp); font-size:.9rem; font-weight:200; color:var(--or); opacity:.12; letter-spacing:2px; }
.store__card-fb-cat   { font-family:var(--f-mono); font-size:5px; letter-spacing:4px; text-transform:uppercase; color:var(--silk4); }

.store__card-img { position:absolute; inset:0; z-index:1; width:100%; height:100%; object-fit:cover; object-position:center top; display:block; transition:transform .7s var(--ease); }
.store__card:hover .store__card-img { transform:scale(1.055); }

.store__card-shine { position:absolute; inset:0; z-index:4; pointer-events:none; opacity:0; }
.store__card-overlay { position:absolute; inset:0; background:rgba(0,0,0,.5); z-index:3; display:flex; align-items:center; justify-content:center; opacity:0; transition:opacity .35s; }
.store__card:hover .store__card-overlay { opacity:1; }
.store__card-overlay-txt { font-family:var(--f-mono); font-size:7px; letter-spacing:5px; color:var(--or); text-transform:uppercase; transform:translateY(6px); transition:transform .35s; }
.store__card:hover .store__card-overlay-txt { transform:translateY(0); }

.store__card-urgencia { position:absolute; bottom:8px; left:8px; z-index:4; font-family:var(--f-mono); font-size:6px; letter-spacing:1.5px; text-transform:uppercase; background:rgba(0,0,0,.75); border:.5px solid rgba(239,68,68,.4); color:rgba(239,68,68,.85); padding:3px 8px; }

/* Badges — estilo nb-cart__badge mas para produto */
.store__badge { position:absolute; top:10px; left:10px; z-index:4; font-family:var(--f-mono); font-size:6px; font-weight:700; letter-spacing:2px; padding:3px 8px; text-transform:uppercase; }
.store__badge--ltd,.store__badge--novo { background:var(--or); color:var(--void); }
.store__badge--esgo { background:rgba(0,0,0,.7); border:.5px solid var(--hair2); color:var(--silk4); }

/* Quick actions */
.store__card-quick { position:absolute; top:10px; right:10px; z-index:4; display:flex; flex-direction:column; gap:4px; opacity:0; transform:translateX(6px); transition:opacity .25s,transform .25s; }
.store__card:hover .store__card-quick { opacity:1; transform:translateX(0); }
.store__quick-btn { width:26px; height:26px; background:rgba(0,0,0,.6); backdrop-filter:blur(5px); border:.5px solid var(--hair2); display:flex; align-items:center; justify-content:center; cursor:pointer; transition:all .25s; color:var(--or); }
.store__quick-btn:hover,.store__quick-btn.is-active { border-color:var(--hair); background:var(--gold3); transform:scale(1.08); }

/* Card info */
.store__card-info { padding:14px 16px 16px; display:flex; flex-direction:column; gap:2px; flex:1; }
/* Cat — como di__cat */
.store__card-cat   { font-size:7px; letter-spacing:.5em; text-transform:uppercase; color:var(--or); opacity:.6; font-family:var(--f-mono); }
.store__card-marca { font-family:var(--f-mono); font-size:6.5px; letter-spacing:3px; color:var(--or); text-transform:uppercase; opacity:.55; }
.store__card-nome  { font-size:12.5px; font-weight:500; color:var(--silk); line-height:1.4; min-height:2.8em; flex:1; }
.store__card-desc  { font-size:10px; color:var(--silk4); line-height:1.7; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; margin:5px 0; }
.store__card-cores { display:flex; align-items:center; gap:4px; margin:5px 0; }
.store__card-swatch { width:10px; height:10px; border-radius:50%; border:.5px solid rgba(255,255,255,.12); }
.store__card-swatch-more { font-family:var(--f-mono); font-size:7px; color:var(--silk4); }

/* Bottom — como di__foot */
.store__card-bottom { display:flex; align-items:flex-end; justify-content:space-between; margin-top:auto; padding-top:10px; border-top:.5px solid var(--hair2); }
.store__card-preco  { font-family:var(--f-serif); font-size:1.1rem; color:var(--silk); font-weight:300; }
.store__card-parcela { font-family:var(--f-mono); font-size:7.5px; color:var(--silk4); margin-top:2px; }

/* Add button — estilo drawer checkout compacto */
.store__card-add {
  position:relative; overflow:hidden;
  width:34px; height:34px; flex-shrink:0;
  background:transparent; border:.5px solid var(--hair2);
  color:var(--or); cursor:pointer; display:flex; align-items:center; justify-content:center;
  transition:color .45s; z-index:0;
}
.store__card-add-fill { position:absolute; inset:0; background:var(--or); transform:scale(0); transform-origin:center; border-radius:50%; transition:transform .4s var(--ease); z-index:-1; }
.store__card-add:hover:not(:disabled) .store__card-add-fill,
.store__card-add.is-added .store__card-add-fill { transform:scale(1.5); border-radius:0; }
.store__card-add:hover:not(:disabled),
.store__card-add.is-added { color:var(--void); border-color:var(--or); }
.store__card-add:disabled { opacity:.28; cursor:not-allowed; }
.store__card-add svg { position:relative; z-index:1; }

/* Skeleton */
.store__card--skel { pointer-events:none; animation:none !important; opacity:1 !important; transform:none !important; border-right:.5px solid var(--hair2); border-bottom:.5px solid var(--hair2); }
.store__skel-img { aspect-ratio:4/3; background:linear-gradient(90deg,rgba(245,166,35,.04) 25%,rgba(245,166,35,.07) 50%,rgba(245,166,35,.04) 75%); background-size:200% 100%; animation:shimmerSkel 1.8s infinite; }
.store__sk-line { height:8px; border-radius:1px; margin-bottom:7px; background:linear-gradient(90deg,rgba(245,166,35,.04) 25%,rgba(245,166,35,.07) 50%,rgba(245,166,35,.04) 75%); background-size:200% 100%; animation:shimmerSkel 1.8s infinite; }
.store__sk-line--sm { width:50%; }
.store__sk-line--xs { width:30%; }
@keyframes shimmerSkel { from{background-position:0% 50%} to{background-position:200% 50%} }

/* ══ PAGINAÇÃO — estilo nb-link ══ */
.store__pag-sep { display:flex; align-items:center; gap:16px; margin:44px 0 24px; }
.store__pag-sep-line { flex:1; height:.5px; background:linear-gradient(90deg,transparent,rgba(245,166,35,.18)); }
.store__pag-sep-line--r { background:linear-gradient(to left,transparent,rgba(245,166,35,.18)); }
.store__pag-sep-kanji { font-family:var(--f-jp); font-size:11px; font-weight:200; color:var(--or); opacity:.28; flex-shrink:0; line-height:1; }

.store__paginacao { display:flex; justify-content:center; align-items:center; gap:5px; margin-bottom:12px; }
.store__pag-btn { width:36px; height:36px; background:transparent; border:.5px solid var(--hair2); color:var(--silk4); cursor:pointer; font-family:var(--f-mono); font-size:10px; display:flex; align-items:center; justify-content:center; transition:all .25s; position:relative; overflow:hidden; }
.store__pag-btn::before { content:''; position:absolute; inset:0; background:var(--or); transform:scaleX(0); transform-origin:left; transition:transform .4s var(--ease); z-index:-1; }
.store__pag-btn:hover:not(:disabled)::before { transform:scaleX(1); }
.store__pag-btn:hover:not(:disabled) { color:var(--void); border-color:var(--or); }
.store__pag-btn.is-active { background:var(--gold3); border-color:var(--hair); color:var(--or); }
.store__pag-btn--arrow { font-size:14px; }
.store__pag-btn:disabled { opacity:.18; cursor:not-allowed; }
.store__pag-ellipsis { font-family:var(--f-mono); font-size:10px; color:var(--silk4); padding:0 4px; }
.store__pag-info { text-align:center; margin-top:8px; font-family:var(--f-mono); font-size:7px; letter-spacing:3px; color:var(--silk4); }

/* ══ TOAST — igual ao sistema global ══ */
.store-toast {
  position:fixed; bottom:24px; right:24px; z-index:99999;
  display:flex; align-items:center; gap:10px;
  min-width:260px; max-width:320px;
  background:var(--deep); border:.5px solid var(--hair);
  padding:13px 14px; overflow:hidden;
  box-shadow:0 12px 36px rgba(0,0,0,.55);
}
.store-toast::before { content:''; position:absolute; top:0; left:0; right:0; height:.5px; background:linear-gradient(90deg,transparent,var(--toast-accent,var(--or)),transparent); opacity:.7; }
.store-toast--success { --toast-accent:#22c55e; }
.store-toast--info    { --toast-accent:var(--or); }
.store-toast--error   { --toast-accent:#ef4444; }
.store-toast__icon { width:22px; height:22px; border-radius:50%; display:flex; align-items:center; justify-content:center; background:color-mix(in srgb,var(--toast-accent,var(--or)) 14%,transparent); color:var(--toast-accent,var(--or)); flex-shrink:0; }
.store-toast__msg { flex:1; font-family:var(--f-mono); font-size:9px; letter-spacing:2px; color:var(--silk3); line-height:1.5; }
.store-toast__close { background:none; border:none; color:var(--silk4); cursor:pointer; display:flex; align-items:center; justify-content:center; transition:color .2s; }
.store-toast__close:hover { color:var(--or); }
.store-toast__progress { position:absolute; bottom:0; left:0; height:1px; background:var(--toast-accent,var(--or)); opacity:.45; width:100%; transform-origin:left; animation:toastProgress linear 1 forwards; }
@keyframes toastProgress { from{transform:scaleX(1)} to{transform:scaleX(0)} }
.toast-slide-enter-active { transition:opacity .3s,transform .4s var(--ease); }
.toast-slide-leave-active { transition:opacity .25s,transform .3s; }
.toast-slide-enter-from,.toast-slide-leave-to { opacity:0; transform:translateX(20px) scale(.96); }

/* ══ MODAL — DNA do auth-modal ══ */
.store__modal-bg {
  position:fixed; inset:0; z-index:9000;
  background:rgba(0,0,0,.86); backdrop-filter:blur(22px);
  display:flex; align-items:center; justify-content:center; padding:18px;
}
.store__modal-bg--sm { }
.modal-fade-enter-active,.modal-fade-leave-active { transition:opacity .3s; }
.modal-fade-enter-from,.modal-fade-leave-to { opacity:0; }

.store__modal {
  background:var(--deep); border:.5px solid var(--hair);
  position:relative; max-width:1000px; width:100%; max-height:92vh;
  overflow-y:auto;
  box-shadow:0 0 0 1px rgba(245,166,35,.04),0 60px 120px rgba(0,0,0,.65);
  scrollbar-width:thin; scrollbar-color:rgba(245,166,35,.12) transparent;
}

/* Kamon watermark — como no drawer */
.store__modal-kamon { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); font-family:var(--f-jp); font-size:200px; font-weight:200; color:var(--or); opacity:.016; pointer-events:none; z-index:0; user-select:none; line-height:1; }

/* Realm line — como no footer */
.store__modal-realm-line { position:absolute; top:0; left:0; right:0; height:.5px; background:linear-gradient(90deg,transparent,var(--or2) 20%,var(--or) 50%,var(--or2) 80%,transparent); opacity:.7; z-index:2; }

/* Cantos — como auth-modal */
.store__mc { position:absolute; z-index:10; width:20px; height:20px; border-color:rgba(245,166,35,.25); border-style:solid; pointer-events:none; transition:border-color .4s; }
.store__mc--tl { top:10px; left:10px; border-width:1.5px 0 0 1.5px; }
.store__mc--tr { top:10px; right:10px; border-width:1.5px 1.5px 0 0; }
.store__mc--bl { bottom:10px; left:10px; border-width:0 0 1.5px 1.5px; }
.store__mc--br { bottom:10px; right:10px; border-width:0 1.5px 1.5px 0; }
.store__modal:hover .store__mc { border-color:rgba(245,166,35,.42); }

.store__modal-close-fixed { position:fixed; top:18px; right:18px; z-index:9100; width:36px; height:36px; border-radius:50%; background:rgba(9,9,15,.92); backdrop-filter:blur(8px); border:.5px solid rgba(245,166,35,.22); color:var(--silk); cursor:pointer; font-size:13px; display:flex; align-items:center; justify-content:center; transition:all .25s; }
.store__modal-close-fixed:hover { background:var(--gold3); color:var(--or); border-color:var(--or); transform:scale(1.07) rotate(90deg); }

.store__modal-layout { display:grid; grid-template-columns:50% 50%; position:relative; z-index:1; min-height:520px; }

/* Col imagem */
.store__modal-img-col { display:flex; flex-direction:column; background:rgba(0,0,0,.14); border-right:.5px solid rgba(245,166,35,.06); }
.store__modal-viewer  { position:relative; flex:1; min-height:320px; overflow:hidden; background:var(--void); }
.store__modal-fallback { position:absolute; inset:0; z-index:1; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:10px; background:linear-gradient(135deg,var(--void) 0%,rgba(245,166,35,.02) 100%); pointer-events:none; }
.store__mf-letra { font-family:var(--f-serif); font-size:4rem; font-style:italic; font-weight:300; color:var(--or); opacity:.16; }
.store__mf-kanji { font-family:var(--f-jp); font-size:1.1rem; font-weight:200; color:var(--or); opacity:.12; letter-spacing:6px; }
.store__mf-cat   { font-family:var(--f-mono); font-size:7px; letter-spacing:5px; text-transform:uppercase; color:var(--or); opacity:.2; }
.store__modal-img { position:absolute; inset:0; z-index:2; width:100%; height:100%; object-fit:contain; padding:14px; box-sizing:border-box; transition:transform .8s var(--ease); cursor:zoom-in; }
.store__modal-img.is-zoom { transform:scale(1.8); cursor:zoom-out; z-index:5; }
.store__modal-glow { position:absolute; inset:0; pointer-events:none; z-index:3; transition:background .6s; }
.store__modal-zoom-hint { position:absolute; bottom:10px; right:10px; z-index:6; font-family:var(--f-mono); font-size:7px; letter-spacing:2px; color:var(--silk4); background:rgba(0,0,0,.55); padding:3px 8px; display:flex; align-items:center; gap:4px; opacity:.6; pointer-events:none; }
.store__modal-badges { position:absolute; top:12px; left:12px; z-index:6; display:flex; flex-direction:column; gap:4px; }
.store__modal-badge { font-family:var(--f-mono); font-size:6px; font-weight:700; letter-spacing:2.5px; text-transform:uppercase; padding:3px 8px; display:inline-flex; align-items:center; gap:4px; }
.store__modal-badge--ltd,.store__modal-badge--novo { background:var(--or); color:var(--void); }
.store__modal-badge--esgo { background:rgba(0,0,0,.75); border:.5px solid var(--hair2); color:var(--silk4); }

.store__modal-thumbs { display:flex; gap:4px; padding:8px 10px 10px; border-top:.5px solid rgba(245,166,35,.06); background:rgba(0,0,0,.1); flex-wrap:wrap; }
.store__modal-thumb { width:54px; flex-shrink:0; border:.5px solid var(--hair2); background:var(--void); cursor:pointer; display:flex; flex-direction:column; align-items:center; overflow:hidden; transition:all .25s; padding:0; }
.store__modal-thumb:hover { border-color:var(--hair); }
.store__modal-thumb.is-active { border-color:var(--or); box-shadow:0 0 0 1px rgba(245,166,35,.18); }
.store__modal-thumb img { width:100%; height:38px; object-fit:cover; display:block; }
.store__modal-thumb-fb { width:100%; height:38px; display:flex; align-items:center; justify-content:center; font-family:var(--f-serif); font-size:.9rem; font-style:italic; color:var(--or); opacity:.3; }

/* Col info */
.store__modal-info { padding:32px 28px 24px; display:flex; flex-direction:column; background:var(--deep); position:relative; overflow:hidden; }

/* Ornamento — como drawer__ornament */
.store__modal-ornament { display:flex; align-items:center; gap:10px; margin-bottom:18px; }
.store__mo-line { flex:1; height:.5px; background:linear-gradient(90deg,var(--or),transparent); opacity:.2; }
.store__mo-line--r { background:linear-gradient(270deg,var(--or),transparent); }
.store__mo-kanji { font-family:var(--f-jp); font-size:14px; color:var(--or); opacity:.25; line-height:1; flex-shrink:0; }

/* Eyebrow como banner */
.store__modal-eyebrow { display:flex; align-items:center; gap:8px; margin-bottom:10px; }
.store__mey-dot { width:4px; height:4px; border-radius:50%; background:var(--lacre); opacity:.75; flex-shrink:0; }
.store__mey-txt { font-size:7px; letter-spacing:6px; font-weight:700; text-transform:uppercase; background:linear-gradient(135deg,var(--or),var(--or2)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }

.store__modal-titulo { font-family:var(--f-serif); font-size:clamp(1.4rem,2vw,1.9rem); font-weight:300; color:var(--silk); line-height:1.1; margin-bottom:5px; }
.store__modal-marca  { font-family:var(--f-mono); font-size:8px; letter-spacing:3px; color:var(--silk4); text-transform:uppercase; }
.store__modal-marca strong { color:var(--silk3); font-weight:400; }

/* Divider — como ft__sep */
.store__modal-divider { display:flex; align-items:center; gap:10px; margin:16px 0; }
.store__md-line { flex:1; height:.5px; background:linear-gradient(90deg,transparent,rgba(245,166,35,.2)); }
.store__md-line--r { background:linear-gradient(to left,transparent,rgba(245,166,35,.2)); }
.store__md-gem { font-size:6px; color:rgba(245,166,35,.3); }

.store__modal-desc { font-size:11.5px; color:var(--silk4); line-height:1.9; margin-bottom:18px; font-weight:300; }

/* Specs — como store spec rows (dt-row) */
.store__modal-specs  { margin-bottom:18px; }
.store__specs-hd { font-family:var(--f-mono); font-size:6px; letter-spacing:5px; text-transform:uppercase; color:var(--or); opacity:.6; margin-bottom:10px; display:flex; align-items:center; gap:7px; }
.store__specs-hd::after { content:''; flex:1; height:.5px; background:linear-gradient(to right,rgba(245,166,35,.2),transparent); }
.store__specs-kanji { font-family:var(--f-jp); font-size:13px; font-weight:200; color:var(--or); opacity:.65; letter-spacing:0; line-height:1; }
.store__specs-list { display:flex; flex-direction:column; }
.store__spec-row { display:flex; align-items:baseline; gap:7px; padding:7px 0; border-bottom:.5px solid rgba(245,166,35,.05); transition:background .2s,padding-left .2s; }
.store__spec-row:first-child { border-top:.5px solid rgba(245,166,35,.05); }
.store__spec-row:hover { background:rgba(245,166,35,.02); padding-left:5px; }
.store__spec-k    { font-family:var(--f-mono); font-size:7px; letter-spacing:2px; text-transform:uppercase; color:var(--or); opacity:.65; white-space:nowrap; flex-shrink:0; width:85px; }
.store__spec-dots { flex:1; height:.5px; min-width:10px; background:repeating-linear-gradient(90deg,rgba(245,166,35,.12) 0,rgba(245,166,35,.12) 2px,transparent 2px,transparent 5px); margin-bottom:1px; }
.store__spec-v    { font-size:11px; color:var(--silk3); text-align:right; }

/* Quantidade */
.store__modal-qty-wrap { margin-bottom:16px; }
.store__modal-opt-lbl { font-family:var(--f-mono); font-size:6px; letter-spacing:4px; text-transform:uppercase; color:var(--or); opacity:.68; margin-bottom:10px; display:flex; align-items:center; gap:8px; }
.store__modal-sel  { font-style:normal; color:var(--silk3); font-size:7px; letter-spacing:2px; opacity:.8; }
.store__modal-qty  { display:flex; align-items:center; border:.5px solid var(--hair2); width:fit-content; }
.store__qty-btn { background:none; border:none; color:var(--silk3); width:28px; height:28px; cursor:pointer; font-size:16px; display:flex; align-items:center; justify-content:center; transition:all .25s; line-height:1; }
.store__qty-btn:hover:not(:disabled) { background:var(--or); color:var(--void); }
.store__qty-btn:disabled { opacity:.2; cursor:not-allowed; }
.store__qty-val { font-family:var(--f-mono); font-size:11px; color:var(--silk); min-width:36px; height:28px; display:flex; align-items:center; justify-content:center; border-left:.5px solid var(--hair2); border-right:.5px solid var(--hair2); letter-spacing:.1em; }

/* Variantes */
.store__modal-variant { margin-bottom:16px; padding-top:14px; border-top:.5px solid rgba(245,166,35,.06); }
.store__modal-swatches { display:flex; gap:8px; flex-wrap:wrap; }
.store__modal-swatch { width:22px; height:22px; border-radius:50%; border:1.5px solid transparent; cursor:pointer; transition:transform .25s,box-shadow .25s,border-color .25s; }
.store__modal-swatch:hover { transform:scale(1.15); }
.store__modal-swatch.is-active { border-color:var(--or); box-shadow:0 0 0 2px rgba(0,0,0,.5),0 0 10px var(--sw-color,var(--or)); transform:scale(1.08); }
.store__modal-storage { display:flex; gap:6px; flex-wrap:wrap; }
.store__modal-storage-btn { background:none; border:.5px solid var(--hair2); padding:6px 12px; font-family:var(--f-mono); font-size:8px; color:var(--silk3); cursor:pointer; transition:all .25s; display:flex; align-items:center; gap:6px; }
.store__modal-storage-btn:hover,.store__modal-storage-btn.is-active { border-color:var(--hair); color:var(--or); background:var(--gold3); }
.store__storage-diff { font-size:7px; color:var(--or); opacity:.7; }

/* Preço — como dt-row--total */
.store__modal-preco-wrap { margin-bottom:20px; padding:16px 0; border-top:.5px solid rgba(245,166,35,.06); }
.store__modal-preco-hd { display:flex; align-items:center; gap:7px; margin-bottom:7px; }
.store__mp-kanji { font-family:var(--f-jp); font-size:16px; font-weight:200; color:var(--or); opacity:.5; line-height:1; }
.store__mp-lbl   { font-family:var(--f-mono); font-size:6px; letter-spacing:5px; text-transform:uppercase; color:var(--or); opacity:.6; white-space:nowrap; }
.store__mp-line  { flex:1; height:.5px; background:linear-gradient(to right,rgba(245,166,35,.2),transparent); }
.store__modal-preco { font-family:var(--f-serif); font-size:clamp(1.7rem,3vw,2.4rem); font-weight:300; color:var(--silk); line-height:1; display:flex; align-items:baseline; gap:7px; }
.store__mp-rs    { font-family:var(--f-mono); font-size:.65em; color:var(--silk4); letter-spacing:2px; }
.store__modal-preco em { font-style:italic; background:linear-gradient(135deg,var(--or) 0%,var(--or2) 55%,#FF7A20 100%); background-size:200% auto; -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent; animation:goldShine 5s linear infinite; }
.store__modal-parcela { font-family:var(--f-mono); font-size:9px; color:var(--silk4); margin-top:4px; display:flex; gap:7px; flex-wrap:wrap; }
.store__modal-parcela span { color:rgba(245,166,35,.35); }

/* Ações — estilo drawer checkout */
.store__modal-actions { display:flex; gap:8px; margin-bottom:16px; flex-wrap:wrap; }
.store__modal-add {
  flex:1; min-width:160px; position:relative; overflow:hidden;
  background:transparent; border:.5px solid var(--or); border-radius:0;
  font-family:var(--f-mono); font-size:7.5px; font-weight:700; letter-spacing:3.5px;
  color:var(--or); padding:13px 18px; cursor:pointer;
  display:flex; align-items:center; justify-content:center; gap:8px;
  transition:color .45s; z-index:0; text-transform:uppercase;
}
.store__modal-add-fill { position:absolute; inset:0; background:var(--or); transform:scaleX(0); transform-origin:left; transition:transform .55s var(--ease); z-index:-1; }
.store__modal-add:hover:not(:disabled) .store__modal-add-fill { transform:scaleX(1); }
.store__modal-add:hover:not(:disabled) { color:var(--void); }
.store__modal-add:disabled { opacity:.28; cursor:not-allowed; }
.store__modal-add.is-added { border-color:var(--hair); color:var(--silk3); }
.store__modal-add.is-added .store__modal-add-fill { transform:none; background:transparent; }

.store__modal-notify { flex-basis:100%; display:flex; align-items:center; justify-content:center; gap:8px; background:rgba(239,68,68,.05); border:.5px solid rgba(239,68,68,.28); color:rgba(239,68,68,.75); font-family:var(--f-mono); font-size:7px; letter-spacing:3px; text-transform:uppercase; padding:10px; cursor:pointer; transition:all .25s; }
.store__modal-notify:hover { background:rgba(239,68,68,.09); border-color:rgba(239,68,68,.5); }

.store__modal-icon-btn { width:42px; flex-shrink:0; background:var(--gold3); border:.5px solid var(--hair2); display:flex; align-items:center; justify-content:center; cursor:pointer; transition:all .25s; color:var(--or); }
.store__modal-icon-btn:hover,.store__modal-icon-btn.is-active { border-color:var(--hair); background:rgba(245,166,35,.1); transform:scale(1.05); }

/* Relacionados */
.store__modal-rel { margin-top:20px; padding-top:16px; border-top:.5px solid rgba(245,166,35,.06); }
.store__modal-rel-hd { font-family:var(--f-mono); font-size:6px; letter-spacing:5px; text-transform:uppercase; color:var(--or); opacity:.58; margin-bottom:12px; display:flex; align-items:center; gap:7px; }
.store__rel-kanji { font-family:var(--f-jp); font-size:11px; font-weight:200; color:var(--or); opacity:.65; letter-spacing:0; line-height:1; }
.store__rel-line   { flex:1; height:.5px; background:linear-gradient(to right,rgba(245,166,35,.18),transparent); }
.store__modal-rel-grid { display:grid; grid-template-columns:repeat(3,1fr); border-left:.5px solid var(--hair2); border-top:.5px solid var(--hair2); }
.store__modal-rel-card { border-right:.5px solid var(--hair2); border-bottom:.5px solid var(--hair2); cursor:pointer; transition:background .25s; overflow:hidden; }
.store__modal-rel-card:hover { background:var(--gold3); }
.store__rel-img  { height:68px; background:var(--void); position:relative; overflow:hidden; }
.store__rel-fb   { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; font-family:var(--f-serif); font-size:1.8rem; font-style:italic; font-weight:300; color:var(--or); opacity:.2; }
.store__rel-img img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; z-index:2; transition:transform .5s; }
.store__modal-rel-card:hover .store__rel-img img { transform:scale(1.06); }
.store__rel-info  { padding:7px 10px; }
.store__rel-nome  { font-size:9px; color:var(--silk3); line-height:1.3; margin-bottom:3px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.store__rel-preco { font-family:var(--f-serif); font-size:11px; color:var(--or); }

.store__modal-footer-note { display:flex; align-items:center; justify-content:center; gap:8px; padding-top:14px; border-top:.5px solid var(--hair2); font-family:var(--f-mono); font-size:6px; letter-spacing:3px; color:var(--silk4); text-transform:uppercase; margin-top:auto; }
.store__modal-footer-note svg { color:var(--or); opacity:.35; flex-shrink:0; }
.store__fn-kanji { font-family:var(--f-jp); font-size:12px; font-weight:200; color:var(--or); opacity:.32; letter-spacing:0; line-height:1; }

/* ══ NOTIFY MODAL ══ */
.store__notify-modal { background:var(--deep); border:.5px solid var(--hair); max-width:360px; width:100%; padding:38px 30px; position:relative; display:flex; flex-direction:column; align-items:center; gap:12px; text-align:center; box-shadow:0 40px 80px rgba(0,0,0,.6); overflow:hidden; }
.store__notify-kamon { position:absolute; bottom:-20px; right:-10px; font-family:var(--f-jp); font-size:90px; font-weight:200; color:var(--or); opacity:.04; pointer-events:none; line-height:1; }
.store__notify-close { position:absolute; top:12px; right:12px; width:26px; height:26px; background:none; border:.5px solid var(--hair2); display:flex; align-items:center; justify-content:center; color:var(--silk4); cursor:pointer; transition:all .25s; }
.store__notify-close:hover { border-color:var(--or); color:var(--or); transform:rotate(90deg); }
.store__notify-eyebrow { font-family:var(--f-mono); font-size:7px; letter-spacing:5px; text-transform:uppercase; color:var(--or); opacity:.6; }
.store__notify-titulo  { font-family:var(--f-jp); font-size:1.1rem; font-weight:200; color:var(--silk); letter-spacing:3px; margin:0; }
.store__notify-sub     { font-size:11px; color:var(--silk4); margin:0; }
.store__notify-sub strong { color:var(--silk3); font-weight:400; }
.store__notify-field   { width:100%; }
.store__notify-label   { display:block; font-family:var(--f-mono); font-size:6px; letter-spacing:5px; text-transform:uppercase; color:var(--or); opacity:.6; margin-bottom:7px; text-align:left; }
.store__notify-linha { border-bottom:.5px solid var(--hair2); transition:border-color .3s; padding-bottom:2px; position:relative; }
.store__notify-linha::after { content:''; position:absolute; bottom:-1px; left:50%; transform:translateX(-50%); width:0; height:1.5px; background:var(--or); transition:width .4s var(--ease); }
.store__notify-linha.is-focus::after { width:100%; }
.store__notify-linha.is-focus { border-bottom-color:transparent; }
.store__notify-linha input { width:100%; background:transparent; border:none; outline:none; font-family:var(--f-sans); font-size:13px; font-weight:300; color:var(--silk); caret-color:var(--or); padding:8px 0; -webkit-text-fill-color:var(--silk); }
.store__notify-linha input::placeholder { color:var(--silk4); font-size:12px; }
.store__notify-btn { width:100%; position:relative; overflow:hidden; background:transparent; border:.5px solid var(--or); color:var(--or); font-family:var(--f-mono); font-size:7px; font-weight:700; letter-spacing:4px; text-transform:uppercase; padding:13px; cursor:pointer; transition:color .45s; z-index:0; }
.store__notify-btn-fill { position:absolute; inset:0; background:var(--or); transform:scaleX(0); transform-origin:left; transition:transform .55s var(--ease); z-index:-1; }
.store__notify-btn:hover:not(:disabled) .store__notify-btn-fill { transform:scaleX(1); }
.store__notify-btn:hover:not(:disabled) { color:var(--void); }
.store__notify-btn:disabled { opacity:.25; cursor:not-allowed; }
.store__notify-legal { font-size:8px; color:var(--silk4); line-height:1.6; margin:0; }

/* ══ TRANSIÇÕES ══ */
.view-sw-enter-active,.view-sw-leave-active { transition:opacity .3s,transform .3s; }
.view-sw-enter-from,.view-sw-leave-to { opacity:0; transform:translateY(7px); }
.img-fade-enter-active,.img-fade-leave-active { transition:opacity .28s,transform .28s; }
.img-fade-enter-from,.img-fade-leave-to { opacity:0; transform:scale(.97); }

/* ══ RESPONSIVO ══ */
@media (max-width:1100px) {
  .store__hero { padding:calc(var(--navbar-h,72px)+44px) 44px 0; }
  .store__hero-inner { grid-template-columns:1fr 260px; gap:40px; padding-left:calc(6%+24px); }
  .store__strip { margin:0 -44px; padding:0 44px; }
}
@media (max-width:900px) {
  .store__hero-inner { grid-template-columns:1fr; }
  .store__hero-right { display:none; }
  .store__modal-layout { grid-template-columns:1fr; }
  .store__modal-img-col { border-right:none; border-bottom:.5px solid rgba(245,166,35,.06); }
  .store__modal-viewer { min-height:260px; }
  .store__modal-info { padding:22px 18px 20px; }
  .store__modal-rel-grid { grid-template-columns:repeat(3,1fr); }
  .store__hud,.store__edge-line { display:none; }
}
@media (max-width:768px) {
  .store__sidebar {
    position:fixed !important; top:0 !important; left:0 !important; bottom:0 !important;
    width:290px; z-index:99; transform:translateX(-100%);
    padding:0; height:100vh !important; overflow-y:auto !important;
  }
  .store__sidebar.is-open { transform:translateX(0); }
  .store__sb-close-m { display:block; }
  .store__sb-overlay { display:block; }
  .store__layout { grid-template-columns:1fr; }
  .store__btn-filtros-m { display:flex; }
  .store__hero { padding:calc(var(--navbar-h,70px)+30px) 22px 0; }
  .store__strip { grid-template-columns:repeat(2,1fr); margin:0 -22px; padding:0 22px; }
  .store__strip-item:nth-child(2) { border-right:none; }
  .store__strip-item:nth-child(3) { border-top:.5px solid var(--hair2); }
  .store__toolbar-inner { padding:9px 14px; }
  .store__catalogo { padding:18px; }
  .store__modal-rel-grid { grid-template-columns:1fr 1fr; }
}
@media (max-width:480px) {
  .store__hero { padding:calc(var(--navbar-h,70px)+24px) 16px 0; }
  .store__hero-inner { padding-left:0; }
  .store__edge-line { display:none; }
  .store__strip { grid-template-columns:1fr 1fr; }
  .store__grid--grid { grid-template-columns:repeat(2,1fr); }
  .store__modal-rel-grid { grid-template-columns:1fr; }
}
@media (prefers-reduced-motion:reduce) {
  .store__t-gold,.store__modal-preco em,.store__ticker-track,.store__kamon,
  .store__fog--1,.store__fog--2,.store__ew-dot { animation:none !important; }
  .store__card { animation:none !important; opacity:1 !important; transform:none !important; }
}
</style>