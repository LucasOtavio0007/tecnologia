<template>
  <main class="gm" ref="gmRef">

    <!-- ══ FUNDO GLOBAL ══ -->
    <div class="gm__bg" aria-hidden="true">
      <div class="gm__kamon gm__kamon--1">戦</div>
      <div class="gm__kamon gm__kamon--2">血</div>
      <div class="gm__kamon gm__kamon--3">刃</div>
      <div class="gm__realm-line"></div>
      <div class="gm__washi"></div>
      <div class="gm__fog gm__fog--1"></div>
      <div class="gm__fog gm__fog--2"></div>
      <div class="gm__scanlines"></div>
      <!-- Brasas voando — exclusivo samurai -->
      <div class="gm__ember" v-for="n in 18" :key="n"
        :style="{ '--ex': Math.random()*100+'%', '--ey': Math.random()*100+'%', '--ed': (Math.random()*6+4)+'s', '--es': (Math.random()*.8+.3)+'', '--eo': (Math.random()*.3+.05) }"
        aria-hidden="true"></div>
    </div>
    <canvas class="gm__particles" ref="particlesCanvas" aria-hidden="true"></canvas>

    <!-- ══ HERO ══ -->
    <section class="gm__hero" ref="heroRef">
      <div class="gm__edge-line" aria-hidden="true">
        <span class="gm__edge-num">戦場 · 01</span>
      </div>
      <div class="gm__hud" aria-hidden="true">
        <span class="gm__hud-label">WARFORGE · MMXXVI</span>
        <span class="gm__hud-sep"></span>
        <span class="gm__hud-coord">侍 · SAMURAI · 限定版</span>
      </div>

      <div class="gm__hero-inner">
        <div class="gm__hero-left" ref="heroContent">
          <div class="gm__kicker" ref="heroKicker">
            <span class="gm__kicker-num">01</span>
            <div class="gm__kicker-bar"></div>
          </div>
          <div class="gm__eyebrow" ref="heroEyebrow">
            <span class="gm__ew-dot"></span>
            <span class="gm__ew-text">武士道 WARFORGE DISTRICT · Édition de Guerreiro 2026</span>
          </div>
          <h1 class="gm__titulo" ref="heroTitulo">
            <span class="gm__t-thin">THE</span>
            <span class="gm__t-main">GAMING</span>
            <span class="gm__t-sub">DISTRICT</span>
            <span class="gm__t-kanji" aria-hidden="true">戦場の装備 · Arsenal do Guerreiro</span>
          </h1>
          <div class="gm__sep" aria-hidden="true">
            <span class="gm__sep-line"></span>
            <span class="gm__sep-gem">侍</span>
            <span class="gm__sep-line gm__sep-line--r"></span>
          </div>
          <p class="gm__sub" ref="heroSub">
            {{ totalGeral }} equipamentos de elite · edições limitadas · RGB sincronizado
          </p>

          <!-- LOADOUT SLOTS -->
          <div class="gm__loadout" ref="heroCatsRef">
            <div class="gm__loadout-label">
              <span class="gm__ll-kanji">具</span>
              <span class="gm__ll-txt">LOADOUT · SELECIONE O ARSENAL</span>
            </div>
            <div class="gm__loadout-slots">
              <button
                v-for="cat in heroCatsList" :key="cat.val"
                :class="['gm__lslot', { 'is-equipped': categoriasAtivas.includes(cat.val) }]"
                @click="toggleCat(cat.val); pagina=1"
                :title="cat.label"
              >
                <span class="gm__lslot-corner-tl"></span>
                <span class="gm__lslot-corner-br"></span>
                <span class="gm__lslot-kanji">{{ cat.kanji }}</span>
                <span class="gm__lslot-label">{{ cat.label }}</span>
                <span v-if="categoriasAtivas.includes(cat.val)" class="gm__lslot-equipped-bar"></span>
              </button>
            </div>
          </div>
        </div>

        <div class="gm__hero-right" ref="heroRight">
          <!-- Hanko decorativo -->
          <svg class="gm__hanko" viewBox="0 0 90 90" aria-hidden="true">
            <rect x="4" y="4" width="82" height="82" rx="2"
              fill="none" stroke="rgba(180,30,30,0.45)" stroke-width="1.5"/>
            <text x="45" y="62" text-anchor="middle"
              font-family="'Noto Serif JP',serif"
              font-size="52" font-weight="200"
              fill="rgba(180,30,30,0.38)">勝</text>
          </svg>

          <!-- FRAG COUNTER -->
          <div class="gm__frag-counter">
            <div class="gm__frag-cell" v-for="s in heroStats" :key="s.label">
              <div class="gm__frag-idx">{{ s.idx }}</div>
              <div class="gm__frag-val" :class="{ 'gm__frag-val--gold': s.gold }">{{ s.val }}</div>
              <div class="gm__frag-lbl">{{ s.label }}</div>
              <div class="gm__frag-kanji" aria-hidden="true">{{ s.kanji }}</div>
              <div class="gm__frag-bar">
                <div class="gm__frag-bar-fill" :style="{ '--fw': s.pct }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Strip -->
      <div class="gm__strip" ref="heroStrip">
        <div class="gm__strip-item" v-for="s in heroStripData" :key="s.title">
          <div class="gm__strip-icon" v-html="s.icon"></div>
          <div class="gm__strip-body">
            <p class="gm__strip-title">{{ s.title }}</p>
            <p class="gm__strip-sub">{{ s.sub }}</p>
          </div>
          <span class="gm__strip-kanji" aria-hidden="true">{{ s.kanji }}</span>
        </div>
      </div>
    </section>

    <!-- ══ HUD STATUS BAR ══ -->
    <div class="gm__hud-bar" aria-label="Status da arena">
      <div class="gm__hud-bar-scan" aria-hidden="true"></div>
      <div class="gm__hud-cell">
        <div class="gm__hud-cell-label">Status arena</div>
        <div class="gm__hud-cell-val">
          <span class="gm__hud-dot gm__hud-dot--red"></span>
          ONLINE · AO VIVO
        </div>
        <div class="gm__hud-cell-kanji" aria-hidden="true">陣</div>
      </div>
      <div class="gm__hud-cell">
        <div class="gm__hud-cell-label">Guerreiros ativos</div>
        <div class="gm__hud-cell-val">{{ guerreirosAtivos.toLocaleString('pt-BR') }}</div>
        <div class="gm__hud-cell-kanji" aria-hidden="true">士</div>
      </div>
      <div class="gm__hud-cell">
        <div class="gm__hud-cell-label">Estoque crítico</div>
        <div class="gm__hud-cell-val">
          <span class="gm__hud-dot gm__hud-dot--gold"></span>
          {{ estoquesCriticos }} itens
        </div>
        <div class="gm__hud-cell-kanji" aria-hidden="true">残</div>
      </div>
      <div class="gm__hud-cell">
        <div class="gm__hud-cell-label">Próximo drop</div>
        <div class="gm__hud-cell-val gm__hud-cell-val--timer">{{ timerDrop }}</div>
        <div class="gm__hud-cell-kanji" aria-hidden="true">時</div>
      </div>
    </div>

    <!-- ══ LATENCY STRIP ══ -->
    <div class="gm__latency" aria-hidden="true">
      <div class="gm__lat-seg">
        <div class="gm__lat-icon">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
        </div>
        <div class="gm__lat-body">
          <div class="gm__lat-label">Ping servidor</div>
          <div class="gm__lat-val gm__lat-val--green">{{ pingMs }}ms ✓</div>
        </div>
      </div>
      <div class="gm__lat-seg">
        <div class="gm__lat-bars">
          <span class="gm__lat-b"></span><span class="gm__lat-b"></span>
          <span class="gm__lat-b"></span><span class="gm__lat-b"></span>
        </div>
        <div class="gm__lat-body">
          <div class="gm__lat-label">RGB Sync</div>
          <div class="gm__lat-val gm__lat-val--gold">16.8M cores</div>
        </div>
      </div>
      <div class="gm__lat-seg">
        <div class="gm__lat-icon">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
        </div>
        <div class="gm__lat-body">
          <div class="gm__lat-label">DPI máx</div>
          <div class="gm__lat-val">25.600</div>
        </div>
      </div>
      <div class="gm__lat-seg gm__lat-seg--ticker">
        <span class="gm__lat-ticker-track">
          <span class="gm__lat-ticker-set" v-for="n in 3" :key="n">
            <span class="gm__lt-item">戦場 WARFORGE SAMURAI</span><span class="gm__lt-sep">✦</span>
            <span class="gm__lt-item">RGB SYNC 16.8M</span><span class="gm__lt-sep">✦</span>
            <span class="gm__lt-item">限定版 Edição Limitada</span><span class="gm__lt-sep">✦</span>
            <span class="gm__lt-item">刀 Bushido Code</span><span class="gm__lt-sep">✦</span>
            <span class="gm__lt-item">分割払 12× Sem Juros</span><span class="gm__lt-sep">✦</span>
            <span class="gm__lt-item">武士道 Honor System</span><span class="gm__lt-sep">✦</span>
          </span>
        </span>
      </div>
    </div>

    <!-- ══ TOOLBAR ══ -->
    <div class="gm__toolbar" ref="toolbarRef" :class="{ 'is-scrolled': scrolled }">
      <div class="gm__toolbar-border" aria-hidden="true"></div>
      <div class="gm__toolbar-inner">
        <div class="gm__search-wrap" :class="{ 'is-focus': searchFocused }">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input
            v-model="busca"
            placeholder="探す · Buscar na arena..."
            @input="pagina=1"
            @focus="searchFocused=true"
            @blur="searchFocused=false"
            autocomplete="off"
            aria-label="Buscar produtos"
          />
          <button v-if="busca" @click="busca='';pagina=1" class="gm__search-clear" aria-label="Limpar">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>

        <div v-if="categoriasAtivas.length" class="gm__chips">
          <!-- FIX: removeCat usa val normalizado -->
          <button v-for="cat in categoriasAtivas" :key="cat" class="gm__chip" @click="removeCat(cat)">
            {{ labelDoCat(cat) }}
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>

        <div class="gm__toolbar-right">
          <span class="gm__toolbar-count">{{ produtosFiltrados.length }} 件</span>
          <select v-model="ordenacao" class="gm__toolbar-select" aria-label="Ordenar" @change="pagina=1">
            <option value="relevancia">— 並び替え</option>
            <option value="menor">Menor preço</option>
            <option value="maior">Maior preço</option>
            <option value="nome">Nome A‑Z</option>
            <option value="destaque">Destaques</option>
            <option value="tier">Maior Tier / XP</option>
          </select>
          <button v-if="temFiltros" class="gm__toolbar-limpar" @click="limparFiltros">
            絞込解除
          </button>
          <div class="gm__view-toggle">
            <button :class="{ 'is-active': viewMode==='grid' }" @click="viewMode='grid'" aria-label="Grid">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
            </button>
            <button :class="{ 'is-active': viewMode==='list' }" @click="viewMode='list'" aria-label="Kill Feed">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="18" y2="12"/><line x1="8" y1="18" x2="15" y2="18"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ══ LAYOUT PRINCIPAL ══ -->
    <div class="gm__layout">

      <!-- ══ SIDEBAR ══ -->
      <aside class="gm__sidebar" ref="sidebarEl"
        :class="{ 'is-open': sidebarOpen }"
        :style="sidebarStyle">

        <div class="gm__sb-kamon" aria-hidden="true">装備</div>
        <button class="gm__sb-close-m" @click="sidebarOpen=false">閉じる ✕</button>

        <div class="gm__sb-ornament" aria-hidden="true">
          <span class="gm__sb-orn-line"></span>
          <span class="gm__sb-orn-kanji">装</span>
          <span class="gm__sb-orn-line gm__sb-orn-line--r"></span>
        </div>

        <!-- Categorias -->
        <div class="gm__sb-sec">
          <p class="gm__sb-lbl"><span class="gm__sb-lbl-kanji">具</span>Loadout · Categorias</p>
          <div class="gm__sb-cats">
            <!-- FIX: compara com cat.val normalizado -->
            <button
              v-for="cat in heroCatsList" :key="cat.val"
              :class="['gm__sb-cat', { 'is-active': categoriasAtivas.includes(cat.val) }]"
              @click="toggleCat(cat.val); pagina=1"
            >
              <span class="gm__sb-cat-kanji">{{ cat.kanji }}</span>
              <span class="gm__sb-cat-check">{{ categoriasAtivas.includes(cat.val) ? '◆' : '◇' }}</span>
              <span>{{ cat.label }}</span>
              <!-- FIX: contarCat recebe val normalizado -->
              <span class="gm__sb-cat-n">{{ contarCat(cat.val) }}</span>
            </button>
          </div>
        </div>

        <div class="gm__sb-sep" aria-hidden="true">
          <span class="gm__sb-sep-line"></span><span class="gm__sb-sep-kanji">価</span>
          <span class="gm__sb-sep-line gm__sb-sep-line--r"></span>
        </div>

        <!-- Faixa de preço -->
        <div class="gm__sb-sec">
          <p class="gm__sb-lbl"><span class="gm__sb-lbl-kanji">価</span>Faixa de preço</p>
          <div class="gm__sb-preco-vals">
            <span>R$ {{ fmt(filtroPreco[0]) }}</span>
            <span>R$ {{ fmt(filtroPreco[1]) }}</span>
          </div>
          <div class="gm__sb-ranges">
            <input type="range" min="0" :max="precoMax" step="50"
              v-model.number="filtroPreco[0]" class="gm__sb-range"
              @input="clampPreco" aria-label="Preço mínimo"/>
            <input type="range" min="0" :max="precoMax" step="50"
              v-model.number="filtroPreco[1]" class="gm__sb-range"
              @input="clampPreco" aria-label="Preço máximo"/>
          </div>
          <button class="gm__sb-apply" @click="pagina=1">適用 · Aplicar</button>
        </div>

        <div class="gm__sb-sep" aria-hidden="true">
          <span class="gm__sb-sep-line"></span><span class="gm__sb-sep-kanji">在</span>
          <span class="gm__sb-sep-line gm__sb-sep-line--r"></span>
        </div>

        <!-- Disponibilidade -->
        <div class="gm__sb-sec">
          <p class="gm__sb-lbl"><span class="gm__sb-lbl-kanji">在</span>Disponibilidade</p>
          <label class="gm__sb-toggle-row" @click="apenasEstoque=!apenasEstoque; pagina=1">
            <div :class="['gm__sb-toggle', { 'is-on': apenasEstoque }]">
              <div class="gm__sb-toggle-thumb"></div>
            </div>
            <span>Apenas em estoque</span>
          </label>
        </div>

        <div class="gm__sb-sep" aria-hidden="true">
          <span class="gm__sb-sep-line"></span><span class="gm__sb-sep-kanji">位</span>
          <span class="gm__sb-sep-line gm__sb-sep-line--r"></span>
        </div>

        <!-- Top Guerreiros -->
        <div class="gm__sb-sec">
          <p class="gm__sb-lbl"><span class="gm__sb-lbl-kanji">位</span>Top Guerreiros</p>
          <div class="gm__rank-list">
            <div v-for="(g, i) in topGuerreiros" :key="g.nome" class="gm__rank-row">
              <span class="gm__rank-pos" :class="{ 'gm__rank-pos--1': i===0 }">{{ String(i+1).padStart(2,'0') }}</span>
              <span class="gm__rank-nome">{{ g.nome }}</span>
              <div class="gm__rank-bar-wrap">
                <div class="gm__rank-bar-fill" :style="{ width: g.pct }"></div>
              </div>
              <span class="gm__rank-pts" :class="{ 'gm__rank-pts--gold': i===0 }">{{ g.pts }}</span>
            </div>
          </div>
        </div>

        <div class="gm__sb-sep" aria-hidden="true">
          <span class="gm__sb-sep-line"></span><span class="gm__sb-sep-kanji">愛</span>
          <span class="gm__sb-sep-line gm__sb-sep-line--r"></span>
        </div>

        <!-- Wishlist -->
        <div class="gm__sb-sec">
          <p class="gm__sb-lbl">
            <span class="gm__sb-lbl-kanji">愛</span>Wishlist
            <span class="gm__sb-count" v-if="wishlist.length">{{ wishlist.length }}</span>
          </p>
          <div v-if="!wishlist.length" class="gm__sb-empty">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            <p>お気に入り · Favoritos aqui</p>
          </div>
          <div v-else class="gm__sb-wl">
            <div v-for="id in wishlist" :key="id" class="gm__sb-wl-item"
              @click="abrirModal(getProdutoById(id))">
              <div class="gm__sb-wl-img">
                <img v-if="getProdutoById(id)?.imagem" :src="getProdutoById(id).imagem" :alt="getProdutoById(id)?.nome" @error="e=>e.target.style.display='none'"/>
                <span class="gm__sb-wl-fb">{{ (getProdutoById(id)?.nome||'?').charAt(0) }}</span>
              </div>
              <div class="gm__sb-wl-info">
                <p class="gm__sb-wl-nome">{{ getProdutoById(id)?.nome }}</p>
                <p class="gm__sb-wl-preco">R$ {{ fmt(getProdutoById(id)?.preco) }}</p>
              </div>
              <button class="gm__sb-wl-x" @click.stop="toggleWishlist(id)" aria-label="Remover">
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>
          </div>
        </div>

        <button v-if="temFiltros" class="gm__sb-limpar" @click="limparFiltros">
          全てクリア · Limpar filtros
        </button>

        <div class="gm__sb-watermark" aria-hidden="true">The Art of Digital Warfare · 武士道</div>
      </aside>

      <div class="gm__sb-overlay" :class="{ 'is-vis': sidebarOpen }" @click="sidebarOpen=false"></div>

      <!-- ══ CATÁLOGO ══ -->
      <div class="gm__catalogo">

        <button class="gm__btn-filtros-m" @click="sidebarOpen=true">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="6" y1="12" x2="18" y2="12"/><line x1="9" y1="18" x2="15" y2="18"/></svg>
          絞込 · Filtros
          <span v-if="temFiltros" class="gm__btn-filtros-badge">!</span>
        </button>

        <!-- FIX: estado de erro explícito -->
        <div v-if="erro && !loading" class="gm__cat-erro">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <p>{{ erro }}</p>
          <button class="gm__sb-apply" @click="carregarProdutos">再試行 · Tentar novamente</button>
        </div>

        <!-- Skeleton -->
        <div v-else-if="loading" :class="['gm__grid', viewMode==='grid' ? 'gm__grid--grid' : 'gm__grid--list']">
          <div v-for="n in 8" :key="n" class="gm__card gm__card--skel">
            <div class="gm__skel-img"></div>
            <div class="gm__card-info">
              <div class="gm__sk-line gm__sk-line--sm"></div>
              <div class="gm__sk-line"></div>
              <div class="gm__sk-line gm__sk-line--xs"></div>
            </div>
          </div>
        </div>

        <!-- Vazio -->
        <div v-else-if="!produtosPaginados.length" class="gm__cat-vazio">
          <div class="gm__vazio-ico" aria-hidden="true">
            <span class="gm__vazio-kanji">無</span>
          </div>
          <p class="gm__vazio-titulo">見つかりません · Nenhum equipamento</p>
          <p class="gm__vazio-sub">Ajuste os filtros ou limpe a busca para explorar o arsenal</p>
          <button class="gm__sb-limpar" @click="limparFiltros">絞込解除 · Limpar</button>
        </div>

        <!-- ══ GRID MODE ══ -->
        <transition name="view-sw" mode="out-in">
          <div v-if="!loading && !erro && produtosPaginados.length && viewMode==='grid'" key="grid" class="gm__grid gm__grid--grid">
            <article
              v-for="(p, i) in produtosPaginados" :key="p.id"
              :class="['gm__card', { 'gm__card--esgotado': !p.estoque }]"
              :style="{ '--card-delay': `${i*50}ms` }"
              :ref="el => { if(el) cardRefs[i]=el }"
              @click="abrirModal(p)"
              role="button"
              :aria-label="`Ver detalhes de ${p.nome}`"
              tabindex="0"
              @keydown.enter="abrirModal(p)"
            >
              <span class="gm__card-clip" aria-hidden="true"></span>
              <span class="gm__card-clip-line" aria-hidden="true"></span>
              <span class="gm__card-corner gm__card-corner--tl" aria-hidden="true"></span>
              <span class="gm__card-corner gm__card-corner--br" aria-hidden="true"></span>
              <div class="gm__card-num" aria-hidden="true">{{ String(i + 1 + (pagina-1)*POR_PAGINA).padStart(2,'0') }}</div>

              <div class="gm__tier-badge" :class="`gm__tier-badge--${getTier(p).cls}`" :aria-label="`Tier ${getTier(p).letter}`">
                {{ getTier(p).label }}
              </div>

              <div class="gm__card-img-wrap">
                <div class="gm__card-fallback" aria-hidden="true">
                  <span class="gm__card-fb-letra">{{ (p.nome||'?').charAt(0) }}</span>
                  <span class="gm__card-fb-kanji">{{ p.kanji || '装' }}</span>
                  <span class="gm__card-fb-cat">{{ p.subcategoria }}</span>
                </div>
                <div class="gm__card-scan" aria-hidden="true"></div>
                <img v-if="p.imagem" :src="p.imagem" :alt="p.nome"
                  class="gm__card-img" loading="lazy"
                  @error="e=>e.target.style.display='none'"/>
                <div class="gm__card-overlay">
                  <span class="gm__card-overlay-txt">見る · Ver detalhes</span>
                </div>
                <span v-if="p.destaque" class="gm__badge gm__badge--dest">◆ 選 Destaque</span>
                <span v-else-if="p.rgb" class="gm__badge gm__badge--rgb">光 RGB</span>
                <span v-if="!p.estoque" class="gm__badge gm__badge--esgo">売切</span>
                <div v-if="p.estoque && p.qtdEstoque && p.qtdEstoque <= 5" class="gm__card-urgencia">
                  残り{{ p.qtdEstoque }}個
                </div>
                <div class="gm__card-quick">
                  <button
                    class="gm__quick-btn"
                    :class="{ 'is-active': wishlist.includes(p.id) }"
                    @click.stop="toggleWishlist(p.id)"
                    :aria-label="wishlist.includes(p.id) ? 'Remover favorito' : 'Favoritar'"
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24"
                      :fill="wishlist.includes(p.id) ? 'currentColor' : 'none'"
                      stroke="currentColor" stroke-width="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                  </button>
                  <button
                    class="gm__quick-btn"
                    :class="{ 'is-active': savedIds.includes(p.id) }"
                    @click.stop="toggleSaved(p)"
                    :aria-label="savedIds.includes(p.id) ? 'Remover' : 'Salvar'"
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24"
                      :fill="savedIds.includes(p.id) ? 'currentColor' : 'none'"
                      stroke="currentColor" stroke-width="2">
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                    </svg>
                  </button>
                </div>
                <div class="gm__card-shine" :ref="el => { if(el) shineRefs[i]=el }"></div>
              </div>

              <div class="gm__card-info">
                <span class="gm__card-cat">{{ p.subcategoria }}</span>
                <p class="gm__card-marca">{{ p.marca }}</p>
                <p class="gm__card-nome">{{ p.nome }}</p>
                <div class="gm__xp-wrap" :aria-label="`XP Rating: ${getXP(p)} de 10`">
                  <div class="gm__xp-label">
                    <span>XP RATING</span><span>{{ getXP(p) }} / 10</span>
                  </div>
                  <div class="gm__xp-track">
                    <div class="gm__xp-fill" :style="{ width: (getXP(p)*10)+'%' }"></div>
                  </div>
                </div>
                <div class="gm__card-bottom">
                  <div class="gm__card-preco-wrap">
                    <p class="gm__card-preco">R$ {{ fmt(p.preco) }}</p>
                    <p class="gm__card-parcela">12× R$ {{ fmt(Math.ceil(p.preco/12)) }}</p>
                  </div>
                  <div class="gm__card-bottom-right">
                    <div class="gm__ping-indicator" v-if="p.estoque">
                      <span class="gm__ping-dot"></span>
                    </div>
                    <button
                      class="gm__card-add"
                      :class="{ 'is-added': addedIds.includes(p.id) }"
                      :disabled="!p.estoque"
                      @click.stop="addToCart(p)"
                      :aria-label="`Adicionar ${p.nome} ao carrinho`"
                    >
                      <span class="gm__card-add-fill" aria-hidden="true"></span>
                      <svg v-if="!addedIds.includes(p.id)" width="13" height="13"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                        <line x1="3" y1="6" x2="21" y2="6"/>
                        <path d="M16 10a4 4 0 0 1-8 0"/>
                      </svg>
                      <svg v-else width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </div>

          <!-- ══ KILL FEED (list) ══ -->
          <!-- FIX: colunas do header e das rows alinhadas (7 colunas cada) -->
          <div v-else-if="!loading && !erro && produtosPaginados.length && viewMode==='list'" key="list" class="gm__killfeed">
            <div class="gm__kf-header" aria-hidden="true">
              <span class="gm__kf-hd-num">#</span>
              <span class="gm__kf-hd-img">IMG</span>
              <span class="gm__kf-hd-item">EQUIPAMENTO</span>
              <span class="gm__kf-hd-specs">SPECS</span>
              <span class="gm__kf-hd-tier">TIER</span>
              <span class="gm__kf-hd-preco">PREÇO</span>
              <span class="gm__kf-hd-acao">AÇÃO</span>
            </div>
            <article
              v-for="(p, i) in produtosPaginados" :key="p.id"
              :class="['gm__kf-row', { 'gm__kf-row--destaque': p.destaque, 'gm__kf-row--esgotado': !p.estoque }]"
              :style="{ '--card-delay': `${i*40}ms` }"
              @click="abrirModal(p)"
              role="button"
              :aria-label="`Ver detalhes de ${p.nome}`"
              tabindex="0"
              @keydown.enter="abrirModal(p)"
            >
              <div class="gm__kf-row-scan" aria-hidden="true"></div>
              <span class="gm__kf-num">{{ String(i + 1 + (pagina-1)*POR_PAGINA).padStart(2,'0') }}</span>
              <div class="gm__kf-img">
                <div class="gm__kf-img-fb" aria-hidden="true">{{ (p.nome||'?').charAt(0) }}</div>
                <img v-if="p.imagem" :src="p.imagem" :alt="p.nome" @error="e=>e.target.style.display='none'"/>
              </div>
              <div class="gm__kf-body">
                <p class="gm__kf-cat">{{ p.subcategoria }} · {{ p.marca }}</p>
                <p class="gm__kf-nome">{{ p.nome }}</p>
              </div>
              <div class="gm__kf-specs">
                <span v-if="p.rgb" class="gm__kf-spec-tag">光 RGB</span>
                <span v-if="p.destaque" class="gm__kf-spec-tag gm__kf-spec-tag--dest">◆ ELITE</span>
                <p class="gm__kf-desc">{{ (p.descricao||'').slice(0,60) }}{{ (p.descricao||'').length > 60 ? '…' : '' }}</p>
              </div>
              <div class="gm__kf-tier">
                <span :class="['gm__kf-tier-badge', `gm__kf-tier-badge--${getTier(p).cls}`]">{{ getTier(p).letter }}</span>
                <div class="gm__kf-xp-mini">
                  <div class="gm__kf-xp-fill" :style="{ width: (getXP(p)*10)+'%' }"></div>
                </div>
              </div>
              <div class="gm__kf-preco-wrap">
                <p class="gm__kf-preco">R$ {{ fmt(p.preco) }}</p>
                <p class="gm__kf-parcela">12× {{ fmt(Math.ceil(p.preco/12)) }}</p>
              </div>
              <div class="gm__kf-acao" @click.stop>
                <div class="gm__kf-status" :class="p.estoque ? 'gm__kf-status--on' : 'gm__kf-status--off'">
                  <span class="gm__kf-status-dot"></span>
                  {{ p.estoque ? 'ONLINE' : 'OFFLINE' }}
                </div>
                <button
                  class="gm__kf-add"
                  :class="{ 'is-added': addedIds.includes(p.id) }"
                  :disabled="!p.estoque"
                  @click="addToCart(p)"
                  :aria-label="`Adicionar ${p.nome}`"
                >
                  <svg v-if="!addedIds.includes(p.id)" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <path d="M16 10a4 4 0 0 1-8 0"/>
                  </svg>
                  <svg v-else width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </button>
                <button
                  class="gm__kf-wish"
                  :class="{ 'is-active': wishlist.includes(p.id) }"
                  @click="toggleWishlist(p.id)"
                  :aria-label="wishlist.includes(p.id) ? 'Remover' : 'Favoritar'"
                >
                  <svg width="11" height="11" viewBox="0 0 24 24"
                    :fill="wishlist.includes(p.id) ? 'currentColor' : 'none'"
                    stroke="currentColor" stroke-width="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </button>
              </div>
            </article>
          </div>
        </transition>

        <!-- Paginação -->
        <div v-if="totalPaginas > 1" class="gm__pag-sep" aria-hidden="true">
          <span class="gm__pag-sep-line"></span>
          <span class="gm__pag-sep-kanji">頁</span>
          <span class="gm__pag-sep-line gm__pag-sep-line--r"></span>
        </div>
        <nav v-if="totalPaginas > 1" class="gm__paginacao" aria-label="Paginação">
          <button class="gm__pag-btn gm__pag-btn--arrow"
            :disabled="pagina===1" @click="irPag(pagina-1)" aria-label="Anterior">‹</button>
          <template v-for="p in paginasVisiveis" :key="p">
            <span v-if="p === '...'" class="gm__pag-ellipsis">···</span>
            <button v-else :class="['gm__pag-btn', { 'is-active': pagina===p }]"
              @click="irPag(p)" :aria-current="pagina===p ? 'page' : undefined">{{ p }}</button>
          </template>
          <button class="gm__pag-btn gm__pag-btn--arrow"
            :disabled="pagina===totalPaginas" @click="irPag(pagina+1)" aria-label="Próxima">›</button>
        </nav>
        <p class="gm__pag-info">ページ {{ pagina }} / {{ totalPaginas||1 }} · {{ produtosFiltrados.length }} 件</p>
      </div>
    </div>

    <!-- ══ TOAST ══ -->
    <teleport to="body">
      <transition name="toast-slide">
        <div v-if="toast.visivel" :class="['gm-toast', `gm-toast--${toast.tipo}`]" role="status" aria-live="polite">
          <div class="gm-toast__icon" aria-hidden="true">
            <svg v-if="toast.tipo==='success'" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            <svg v-else width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/></svg>
          </div>
          <span class="gm-toast__msg">{{ toast.msg }}</span>
          <button class="gm-toast__close" @click="toast.visivel=false" aria-label="Fechar">
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
          <div class="gm-toast__progress" :style="{ animationDuration: '2800ms' }"></div>
        </div>
      </transition>
    </teleport>

    <!-- ══ MODAL PRODUTO ══ -->
    <teleport to="body">
      <transition name="modal-fade">
        <div v-if="modalAberto && produtoModal"
          class="gm__modal-bg" @click.self="fecharModal"
          role="dialog" :aria-label="produtoModal.nome" aria-modal="true">

          <button class="gm__modal-close-fixed" @click="fecharModal" aria-label="Fechar">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>

          <div class="gm__modal" ref="modalEl">
            <div class="gm__modal-kamon" aria-hidden="true">戦</div>
            <div class="gm__modal-realm-line" aria-hidden="true"></div>
            <div class="gm__modal-scan" aria-hidden="true"></div>
            <span class="gm__mc gm__mc--tl"></span>
            <span class="gm__mc gm__mc--tr"></span>
            <span class="gm__mc gm__mc--bl"></span>
            <span class="gm__mc gm__mc--br"></span>

            <div class="gm__modal-layout">
              <!-- Col imagem -->
              <div class="gm__modal-img-col">
                <div class="gm__modal-viewer">
                  <div class="gm__modal-fallback" aria-hidden="true">
                    <span class="gm__mf-letra">{{ (produtoModal.nome||'?').charAt(0) }}</span>
                    <span class="gm__mf-kanji">{{ produtoModal.kanji || '装' }}</span>
                    <span class="gm__mf-cat">{{ produtoModal.subcategoria }}</span>
                  </div>
                  <transition name="img-fade">
                    <img :key="anguloAtivo"
                      :src="imagemAtiva"
                      :alt="`${produtoModal.nome} — ângulo ${anguloAtivo+1}`"
                      class="gm__modal-img"
                      :class="{ 'is-zoom': zoomAtivo }"
                      @click="zoomAtivo=!zoomAtivo"
                      @error="e=>e.target.style.display='none'"/>
                  </transition>
                  <div class="gm__modal-zoom-hint" v-if="imagemAtiva && !zoomAtivo" aria-hidden="true">
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M11 8v6M8 11h6"/></svg>
                    拡大 · Ampliar
                  </div>
                  <div class="gm__modal-badges">
                    <span v-if="produtoModal.destaque" class="gm__modal-badge gm__modal-badge--dest">◆ 選 Destaque</span>
                    <span v-else-if="produtoModal.rgb" class="gm__modal-badge gm__modal-badge--rgb">光 RGB Sync</span>
                    <span v-if="!produtoModal.estoque" class="gm__modal-badge gm__modal-badge--esgo">売切 Esgotado</span>
                  </div>
                  <div class="gm__modal-tier-strip">
                    <span :class="['gm__modal-tier', `gm__modal-tier--${getTier(produtoModal).cls}`]">{{ getTier(produtoModal).label }}</span>
                    <div class="gm__modal-xp-wrap">
                      <div class="gm__modal-xp-label">
                        <span>XP RATING</span><span>{{ getXP(produtoModal) }}/10</span>
                      </div>
                      <div class="gm__modal-xp-track">
                        <div class="gm__modal-xp-fill" :style="{ width: (getXP(produtoModal)*10)+'%' }"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Thumbnails -->
                <div class="gm__modal-thumbs" v-if="angulos.length > 1">
                  <button v-for="(ang, idx) in angulos" :key="idx"
                    :class="['gm__modal-thumb', { 'is-active': anguloAtivo===idx }]"
                    @click="anguloAtivo=idx; zoomAtivo=false"
                    :aria-label="`Ângulo ${idx+1}`">
                    <img v-if="ang" :src="ang" :alt="`Ângulo ${idx+1}`" @error="e=>e.target.style.display='none'"/>
                    <span v-else class="gm__modal-thumb-fb">{{ idx+1 }}</span>
                  </button>
                </div>
              </div>

              <!-- Col info -->
              <div class="gm__modal-info" ref="modalInfoEl">
                <div class="gm__modal-ornament" aria-hidden="true">
                  <span class="gm__mo-line"></span>
                  <span class="gm__mo-kanji">{{ produtoModal.kanji || '至高' }}</span>
                  <span class="gm__mo-line gm__mo-line--r"></span>
                </div>
                <div class="gm__modal-eyebrow">
                  <span class="gm__mey-dot"></span>
                  <span class="gm__mey-txt">{{ produtoModal.subcategoria }}</span>
                  <span class="gm__mey-dot"></span>
                </div>
                <h2 class="gm__modal-titulo">{{ produtoModal.nome }}</h2>
                <p class="gm__modal-marca">por <strong>{{ produtoModal.marca }}</strong></p>

                <!-- Ping row -->
                <div class="gm__modal-ping-row">
                  <div class="gm__modal-ping-item">
                    <span class="gm__modal-ping-dot gm__modal-ping-dot--green"></span>
                    <span class="gm__modal-ping-label">Servidor online</span>
                  </div>
                  <div class="gm__modal-ping-item">
                    <span class="gm__modal-ping-label" style="color:var(--gold)">光 RGB SYNC</span>
                  </div>
                  <div class="gm__modal-ping-item">
                    <span class="gm__modal-ping-label">{{ pingMs }}ms latência</span>
                  </div>
                </div>

                <div class="gm__modal-divider" aria-hidden="true">
                  <span class="gm__md-line"></span>
                  <span class="gm__md-gem">✦</span>
                  <span class="gm__md-line gm__md-line--r"></span>
                </div>

                <p class="gm__modal-desc">{{ produtoModal.descricao }}</p>

                <!-- Specs -->
                <div class="gm__modal-specs" v-if="(produtoModal.specs||[]).length">
                  <div class="gm__specs-hd">
                    <span class="gm__specs-kanji">仕</span>
                    <span>Especificações</span>
                    <span class="gm__specs-line" aria-hidden="true"></span>
                  </div>
                  <div class="gm__specs-list">
                    <div v-for="s in (produtoModal.specs||[])" :key="s.k" class="gm__spec-row">
                      <span class="gm__spec-k">{{ s.k }}</span>
                      <span class="gm__spec-dots" aria-hidden="true"></span>
                      <span class="gm__spec-v">{{ s.v }}</span>
                    </div>
                  </div>
                </div>

                <!-- Cores -->
                <div class="gm__modal-variant" v-if="(produtoModal.cores||[]).length">
                  <p class="gm__modal-opt-lbl">
                    色 · Cor
                    <em class="gm__modal-sel">{{ corSelecionada }}</em>
                  </p>
                  <div class="gm__modal-swatches">
                    <button v-for="cor in produtoModal.cores" :key="cor.nome"
                      :class="['gm__modal-swatch', { 'is-active': corSelecionada===cor.nome }]"
                      :style="{ '--sw-color': cor.hex, background: cor.hex }"
                      @click="corSelecionada=cor.nome"
                      :title="cor.nome"
                      :aria-label="`Cor: ${cor.nome}`">
                    </button>
                  </div>
                </div>

                <!-- Quantidade -->
                <div class="gm__modal-qty-wrap">
                  <p class="gm__modal-opt-lbl">数量 · Quantidade</p>
                  <div class="gm__modal-qty">
                    <button class="gm__qty-btn" @click="qtd=Math.max(1,qtd-1)" :disabled="qtd<=1" aria-label="Diminuir">−</button>
                    <span class="gm__qty-val" aria-live="polite">{{ qtd }}</span>
                    <button class="gm__qty-btn"
                      @click="qtd=Math.min(produtoModal.qtdEstoque||99,qtd+1)"
                      :disabled="qtd>=(produtoModal.qtdEstoque||99)" aria-label="Aumentar">+</button>
                  </div>
                </div>

                <!-- Preço -->
                <div class="gm__modal-preco-wrap">
                  <div class="gm__modal-preco-hd">
                    <span class="gm__mp-kanji" aria-hidden="true">価</span>
                    <span class="gm__mp-lbl">Valor total</span>
                    <span class="gm__mp-line" aria-hidden="true"></span>
                  </div>
                  <p class="gm__modal-preco">
                    <span class="gm__mp-rs">R$</span>
                    <em>{{ fmt((produtoModal.preco||0) * qtd) }}</em>
                  </p>
                  <p class="gm__modal-parcela">
                    12× R$ {{ fmt(Math.ceil((produtoModal.preco||0) * qtd / 12)) }}
                    <span>無利子 · sem juros</span>
                  </p>
                </div>

                <!-- Ações -->
                <div class="gm__modal-actions">
                  <button
                    class="gm__modal-add"
                    :class="{ 'is-added': addedIds.includes(produtoModal.id) }"
                    :disabled="!produtoModal.estoque"
                    @click="addToCart(produtoModal)"
                  >
                    <span class="gm__modal-add-fill" aria-hidden="true"></span>
                    <span v-if="!produtoModal.estoque">売切 · Esgotado</span>
                    <span v-else-if="addedIds.includes(produtoModal.id)">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                      完了 · Adicionado
                    </span>
                    <span v-else>◆ 購入 · Adicionar ao Arsenal</span>
                  </button>
                  <button class="gm__modal-icon-btn"
                    :class="{ 'is-active': savedIds.includes(produtoModal.id) }"
                    @click="toggleSaved(produtoModal)" aria-label="Salvar">
                    <svg width="14" height="14" viewBox="0 0 24 24"
                      :fill="savedIds.includes(produtoModal.id) ? 'currentColor' : 'none'"
                      stroke="currentColor" stroke-width="2">
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                    </svg>
                  </button>
                  <button class="gm__modal-icon-btn"
                    :class="{ 'is-active': wishlist.includes(produtoModal.id) }"
                    @click="toggleWishlist(produtoModal.id)" aria-label="Favoritar">
                    <svg width="15" height="15" viewBox="0 0 24 24"
                      :fill="wishlist.includes(produtoModal.id) ? 'currentColor' : 'none'"
                      stroke="currentColor" stroke-width="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                  </button>
                </div>

                <!-- Relacionados -->
                <div class="gm__modal-rel" v-if="produtosRelacionados.length">
                  <div class="gm__modal-rel-hd">
                    <span class="gm__rel-kanji">関連</span>
                    <span>Você também pode gostar</span>
                    <span class="gm__rel-line" aria-hidden="true"></span>
                  </div>
                  <div class="gm__modal-rel-grid">
                    <div v-for="rel in produtosRelacionados" :key="rel.id"
                      class="gm__modal-rel-card"
                      @click="abrirModal(rel)" role="button"
                      :aria-label="`Ver ${rel.nome}`" tabindex="0"
                      @keydown.enter="abrirModal(rel)">
                      <div class="gm__rel-img">
                        <div class="gm__rel-fb" aria-hidden="true">{{ (rel.nome||'?').charAt(0) }}</div>
                        <img v-if="rel.imagem" :src="rel.imagem" :alt="rel.nome" @error="e=>e.target.style.display='none'"/>
                      </div>
                      <div class="gm__rel-info">
                        <p class="gm__rel-nome">{{ rel.nome }}</p>
                        <p class="gm__rel-preco">R$ {{ fmt(rel.preco) }}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="gm__modal-footer-note">
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  <span class="gm__fn-kanji" aria-hidden="true">証</span>
                  番号付き · Edição numerada · Certificado de autenticidade
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </teleport>

  </main>
</template>

<script setup>
/**
 * GamingStore.vue — Warforge Samurai Edition
 *
 * FIXES aplicados:
 * 1. Store inline (sem dependência de @/stores/*)
 * 2. Dados mock completos com campo "subcategoria" normalizado (lowercase)
 *    e heroCatsList.val também lowercase → comparação sempre consistente
 * 3. contarCat() compara p.subcategoria.toLowerCase() === val
 * 4. Kill Feed: header e rows com exatamente 7 colunas (adicionado col img)
 * 5. Estado de erro explícito (ref erro) separado de "vazio"
 * 6. cart.synced / cart.init() substituído por lógica local segura
 * 7. --navbar-h declarado como CSS var local com fallback
 * 8. savedIds como array de strings (sem risco de undefined)
 * 9. Brasas de partículas via CSS (sem canvas para este efeito)
 * 10. precoMax derivado dos dados reais
 */

import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'

/* ══════════════════════════════════════════════════════
   DADOS MOCK — substitua pela sua store/API real
   Todos os campos que o template usa estão presentes.
   subcategoria: sempre lowercase para bater com heroCatsList.val
══════════════════════════════════════════════════════ */
const PRODUTOS_MOCK = [
  {
    id: 'gm-001', nome: 'Razer DeathAdder V3 Pro', marca: 'Razer',
    subcategoria: 'mouse', kanji: '鼠',
    preco: 1299, estoque: true, qtdEstoque: 12,
    destaque: true, rgb: true, novo: true, limitada: false,
    imagem: '',
    descricao: 'Mouse sem fio ultra-leve de 63g com sensor Focus Pro 30K, ideal para FPS competitivo.',
    specs: [
      { k: 'Sensor',    v: 'Focus Pro 30K Optical' },
      { k: 'DPI',       v: 'Até 30.000' },
      { k: 'Botões',    v: '5 programáveis' },
      { k: 'Bateria',   v: '90 horas' },
      { k: 'Peso',      v: '63g' },
    ],
    cores: [{ nome: 'Preto', hex: '#0a0a0a' }, { nome: 'Branco', hex: '#f0f0f0' }],
  },
  {
    id: 'gm-002', nome: 'Logitech G Pro X Superlight 2', marca: 'Logitech',
    subcategoria: 'mouse', kanji: '鼠',
    preco: 1499, estoque: true, qtdEstoque: 4,
    destaque: false, rgb: false, novo: false, limitada: true,
    imagem: '',
    descricao: 'O mouse mais leve de 60g da Logitech com sensor HERO 2 de 32K DPI sem fio.',
    specs: [
      { k: 'Sensor',  v: 'HERO 2 32K' },
      { k: 'DPI',     v: 'Até 32.000' },
      { k: 'Bateria', v: '95 horas' },
      { k: 'Peso',    v: '60g' },
    ],
    cores: [{ nome: 'Branco', hex: '#f5f5f5' }, { nome: 'Preto', hex: '#111' }],
  },
  {
    id: 'gm-003', nome: 'SteelSeries Apex Pro TKL', marca: 'SteelSeries',
    subcategoria: 'teclado', kanji: '鍵',
    preco: 2199, estoque: true, qtdEstoque: 7,
    destaque: true, rgb: true, novo: false, limitada: false,
    imagem: '',
    descricao: 'Teclado mecânico TKL com switches OmniPoint ajustáveis de 0,1 a 4,0mm de atuação.',
    specs: [
      { k: 'Switch',  v: 'OmniPoint Ajustável' },
      { k: 'Layout',  v: 'TKL (Tenkeyless)' },
      { k: 'RGB',     v: 'Per-key RGB' },
      { k: 'Polling', v: '1000 Hz' },
    ],
    cores: [],
  },
  {
    id: 'gm-004', nome: 'Corsair K100 RGB Optical', marca: 'Corsair',
    subcategoria: 'teclado', kanji: '鍵',
    preco: 2899, estoque: true, qtdEstoque: 3,
    destaque: false, rgb: true, novo: true, limitada: true,
    imagem: '',
    descricao: 'Teclado full-size com switches ópticos OPX e anel de controle iCUE dedicado.',
    specs: [
      { k: 'Switch',  v: 'OPX Optical' },
      { k: 'Layout',  v: 'Full-size' },
      { k: 'RGB',     v: '44 zonas + anel' },
      { k: 'Polling', v: '4000 Hz' },
    ],
    cores: [],
  },
  {
    id: 'gm-005', nome: 'HyperX Cloud Alpha Wireless', marca: 'HyperX',
    subcategoria: 'headset', kanji: '耳',
    preco: 1799, estoque: true, qtdEstoque: 9,
    destaque: false, rgb: false, novo: false, limitada: false,
    imagem: '',
    descricao: 'Headset sem fio com câmara dupla de câmara para clareza sonora excepcional e 300h de bateria.',
    specs: [
      { k: 'Drivers',  v: '50mm Dual Chamber' },
      { k: 'Freq.',    v: '15Hz – 21kHz' },
      { k: 'Bateria',  v: '300 horas' },
      { k: 'Conexão',  v: 'Wireless 2.4GHz' },
    ],
    cores: [{ nome: 'Preto', hex: '#0d0d0d' }],
  },
  {
    id: 'gm-006', nome: 'SteelSeries Arctis Nova Pro', marca: 'SteelSeries',
    subcategoria: 'headset', kanji: '耳',
    preco: 3299, estoque: false, qtdEstoque: 0,
    destaque: true, rgb: true, novo: false, limitada: true,
    imagem: '',
    descricao: 'Headset premium com cancelamento de ruído ativo, DAC externo e bateria hot-swap.',
    specs: [
      { k: 'Drivers',  v: '40mm Hi-Res' },
      { k: 'ANC',      v: 'Ativo + Transparência' },
      { k: 'Bateria',  v: 'Hot-swap infinita' },
    ],
    cores: [{ nome: 'Preto', hex: '#080808' }],
  },
  {
    id: 'gm-007', nome: 'LG UltraGear 27GP850-B', marca: 'LG',
    subcategoria: 'monitor', kanji: '目',
    preco: 4199, estoque: true, qtdEstoque: 5,
    destaque: false, rgb: false, novo: false, limitada: false,
    imagem: '',
    descricao: 'Monitor Nano IPS de 27" 165Hz com 1ms GtG e compatibilidade NVIDIA G-Sync.',
    specs: [
      { k: 'Painel',    v: 'Nano IPS 27"' },
      { k: 'Resolução', v: '2560×1440 (QHD)' },
      { k: 'Taxa',      v: '165Hz / 1ms GtG' },
      { k: 'HDR',       v: 'DisplayHDR 400' },
    ],
    cores: [],
  },
  {
    id: 'gm-008', nome: 'Samsung Odyssey Neo G9', marca: 'Samsung',
    subcategoria: 'monitor', kanji: '目',
    preco: 12999, estoque: true, qtdEstoque: 2,
    destaque: true, rgb: true, novo: true, limitada: true,
    imagem: '',
    descricao: 'Monitor curvo ultrawide 49" DQHD com Mini LED Quantum Matrix e 240Hz.',
    specs: [
      { k: 'Painel',    v: 'VA Mini LED 49"' },
      { k: 'Resolução', v: '5120×1440 (DQHD)' },
      { k: 'Taxa',      v: '240Hz / 1ms' },
      { k: 'HDR',       v: 'DisplayHDR 2000' },
    ],
    cores: [],
  },
  {
    id: 'gm-009', nome: 'SecretLab Titan Evo 2022', marca: 'SecretLab',
    subcategoria: 'cadeira', kanji: '座',
    preco: 5499, estoque: true, qtdEstoque: 6,
    destaque: true, rgb: false, novo: false, limitada: false,
    imagem: '',
    descricao: 'Cadeira gamer ergonômica com apoio lombar magnético e ajuste de inclinação 4D.',
    specs: [
      { k: 'Material', v: 'SoftWeave Plus' },
      { k: 'Lombar',   v: 'Magnético ajustável' },
      { k: 'Braços',   v: '4D' },
      { k: 'Suporte',  v: 'Até 130kg' },
    ],
    cores: [
      { nome: 'Preto', hex: '#0a0a0a' },
      { nome: 'Cinza', hex: '#3a3a3a' },
      { nome: 'Azul',  hex: '#1e3a5f' },
    ],
  },
  {
    id: 'gm-010', nome: 'Razer Naga Pro Wireless', marca: 'Razer',
    subcategoria: 'mouse', kanji: '鼠',
    preco: 1899, estoque: true, qtdEstoque: 8,
    destaque: false, rgb: true, novo: false, limitada: false,
    imagem: '',
    descricao: 'Mouse modulável sem fio com até 20 botões intercambiáveis e sensor Focus Pro 20K.',
    specs: [
      { k: 'Sensor',  v: 'Focus Pro 20K' },
      { k: 'Botões',  v: '20 programáveis' },
      { k: 'Bateria', v: '150 horas' },
      { k: 'Peso',    v: '117g' },
    ],
    cores: [{ nome: 'Preto', hex: '#0a0a0a' }],
  },
  {
    id: 'gm-011', nome: 'Ducky One 3 Mini', marca: 'Ducky',
    subcategoria: 'teclado', kanji: '鍵',
    preco: 999, estoque: true, qtdEstoque: 15,
    destaque: false, rgb: true, novo: true, limitada: false,
    imagem: '',
    descricao: 'Teclado compacto 60% com hot-swap e switches Cherry MX Red ou Brown.',
    specs: [
      { k: 'Switch',  v: 'Cherry MX (hot-swap)' },
      { k: 'Layout',  v: '60%' },
      { k: 'RGB',     v: 'Per-key RGB' },
      { k: 'Polling', v: '1000 Hz' },
    ],
    cores: [
      { nome: 'Branco', hex: '#f0f0f0' },
      { nome: 'Preto',  hex: '#111' },
    ],
  },
  {
    id: 'gm-012', nome: 'Noblechairs Hero Black Edition', marca: 'Noblechairs',
    subcategoria: 'cadeira', kanji: '座',
    preco: 6799, estoque: false, qtdEstoque: 0,
    destaque: false, rgb: false, novo: false, limitada: true,
    imagem: '',
    descricao: 'Cadeira ergonômica em couro PU premium com suporte lombar de memória de forma.',
    specs: [
      { k: 'Material', v: 'PU Premium' },
      { k: 'Lombar',   v: 'Memory Foam' },
      { k: 'Braços',   v: '4D' },
      { k: 'Suporte',  v: 'Até 150kg' },
    ],
    cores: [{ nome: 'Preto/Ouro', hex: '#1a1510' }],
  },
]

/* ══════════════════════════════════════════════════════
   REFS DOM
══════════════════════════════════════════════════════ */
const gmRef           = ref(null)
const toolbarRef      = ref(null)
const heroRef         = ref(null)
const heroKicker      = ref(null)
const heroEyebrow     = ref(null)
const heroTitulo      = ref(null)
const heroSub         = ref(null)
const heroCatsRef     = ref(null)
const heroRight       = ref(null)
const heroStrip       = ref(null)
const sidebarEl       = ref(null)
const modalEl         = ref(null)
const modalInfoEl     = ref(null)
const cardRefs        = ref({})
const shineRefs       = ref({})
const particlesCanvas = ref(null)

/* ══════════════════════════════════════════════════════
   ESTADO
══════════════════════════════════════════════════════ */
// FIX: loading/erro separados
const loading          = ref(true)
const erro             = ref('')

const busca            = ref('')
// FIX: valores armazenados em lowercase (mesmo formato de heroCatsList.val)
const categoriasAtivas = ref([])
const filtroPreco      = ref([0, 15000])
const apenasEstoque    = ref(false)
const ordenacao        = ref('relevancia')
const viewMode         = ref('grid')
const wishlist         = ref([])
// FIX: savedIds como array simples de strings
const savedIds         = ref([])
const addedIds         = ref([])
const pagina           = ref(1)
const POR_PAGINA       = 8

const scrolled         = ref(false)
const sidebarOpen      = ref(false)
const searchFocused    = ref(false)
const toolbarHeight    = ref(52)

/* Modal */
const modalAberto    = ref(false)
const produtoModal   = ref(null)
const anguloAtivo    = ref(0)
const zoomAtivo      = ref(false)
const qtd            = ref(1)
const corSelecionada = ref('')

/* Toast */
const toast = ref({ visivel: false, msg: '', tipo: 'success' })
let toastTimer = null

/* HUD */
const timerDrop        = ref('00:00:00')
const guerreirosAtivos = ref(2847)
const pingMs           = ref(12)
let timerInterval      = null
let guerreirosInterval = null
let pingInterval       = null

/* Particles */
let particlesRAF        = null
let canvasResizeHandler = null

/* ══════════════════════════════════════════════════════
   DADOS ESTÁTICOS
══════════════════════════════════════════════════════ */
// FIX: val sempre lowercase para bater com p.subcategoria
const heroCatsList = [
  { val: 'mouse',   label: 'Mouse',   kanji: '鼠' },
  { val: 'teclado', label: 'Teclado', kanji: '鍵' },
  { val: 'headset', label: 'Headset', kanji: '耳' },
  { val: 'monitor', label: 'Monitor', kanji: '目' },
  { val: 'cadeira', label: 'Cadeira', kanji: '座' },
]

const topGuerreiros = [
  { nome: 'Ryuu_0x',   pts: '9.8k', pct: '100%' },
  { nome: 'KuramaFPS', pts: '8.3k', pct: '85%'  },
  { nome: 'ShadowBR',  pts: '7.1k', pct: '72%'  },
  { nome: 'Akuma_X',   pts: '5.7k', pct: '58%'  },
  { nome: 'Void_99',   pts: '4.0k', pct: '41%'  },
]

const heroStripData = [
  { title: 'RGB Sincronizado', sub: '16.8M de cores', kanji: '光',
    icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><path d="M3 12h1m16 0h1M12 3v1m0 16v1m-6.36-2.64.71-.71m11.31-11.31.71-.71M5.64 5.64l.71.71m11.31 11.31.71.71"/></svg>` },
  { title: 'Switches Ópticos', sub: 'Zero debounce lag', kanji: '速',
    icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>` },
  { title: 'Suporte Samurai 24/7', sub: 'Bushido garantido', kanji: '誠',
    icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>` },
  { title: 'Garantia Vitalícia', sub: 'Certificado incluso', kanji: '証',
    icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>` },
]

/* ══════════════════════════════════════════════════════
   COMPUTED
══════════════════════════════════════════════════════ */
// FIX: dados vêm de PRODUTOS_MOCK (substituível por store real)
const todos      = ref([...PRODUTOS_MOCK])
const totalGeral = computed(() => todos.value.length)

// FIX: precoMax derivado dos dados reais
const precoMax = computed(() =>
  Math.max(15000, ...todos.value.map(p => p.preco || 0))
)

const estoquesCriticos = computed(() =>
  todos.value.filter(p => p.estoque && p.qtdEstoque && p.qtdEstoque <= 5).length
)

const heroStats = computed(() => [
  { idx: '001', label: 'Equipamentos Elite', val: totalGeral.value,
    kanji: '装', pct: '100%', gold: false },
  { idx: '002', label: 'Com RGB Sync',
    val: todos.value.filter(p=>p.rgb).length,
    kanji: '光', pct: '76%', gold: false },
  { idx: '003', label: 'Rank do Arsenal', val: 'S',
    kanji: '位', pct: '98%', gold: true },
])

// FIX: sidebar com top correto usando --navbar-h var CSS
const sidebarStyle = computed(() => ({
  top:      `calc(var(--navbar-h, 72px) + ${toolbarHeight.value}px)`,
  height:   `calc(100vh - var(--navbar-h, 72px) - ${toolbarHeight.value}px)`,
  overflowY:'auto',
  overflowX:'hidden',
}))

/* ── Filtros ── */
const produtosFiltrados = computed(() => {
  let lista = [...todos.value]

  if (busca.value.trim()) {
    const q = busca.value.toLowerCase().trim()
    lista = lista.filter(p =>
      (p.nome        || '').toLowerCase().includes(q) ||
      (p.marca       || '').toLowerCase().includes(q) ||
      // FIX: busca em subcategoria normalizada
      (p.subcategoria|| '').toLowerCase().includes(q) ||
      (p.descricao   || '').toLowerCase().includes(q)
    )
  }

  // FIX: comparação lowercase → lowercase sempre consistente
  if (categoriasAtivas.value.length) {
    lista = lista.filter(p =>
      categoriasAtivas.value.includes((p.subcategoria || '').toLowerCase())
    )
  }

  lista = lista.filter(p =>
    (p.preco || 0) >= filtroPreco.value[0] &&
    (p.preco || 0) <= filtroPreco.value[1]
  )

  if (apenasEstoque.value) lista = lista.filter(p => p.estoque)

  switch (ordenacao.value) {
    case 'menor':    lista.sort((a,b) => a.preco - b.preco); break
    case 'maior':    lista.sort((a,b) => b.preco - a.preco); break
    case 'nome':     lista.sort((a,b) => a.nome.localeCompare(b.nome, 'pt-BR')); break
    case 'destaque': lista.sort((a,b) => (b.destaque?1:0) - (a.destaque?1:0)); break
    case 'tier':     lista.sort((a,b) => getXP(b) - getXP(a)); break
  }
  return lista
})

const totalPaginas = computed(() =>
  Math.max(1, Math.ceil(produtosFiltrados.value.length / POR_PAGINA))
)
const produtosPaginados = computed(() => {
  const s = (pagina.value - 1) * POR_PAGINA
  return produtosFiltrados.value.slice(s, s + POR_PAGINA)
})
const temFiltros = computed(() =>
  busca.value || categoriasAtivas.value.length || apenasEstoque.value ||
  filtroPreco.value[0] > 0 || filtroPreco.value[1] < precoMax.value
)
const paginasVisiveis = computed(() => {
  const t = totalPaginas.value, c = pagina.value
  if (t <= 7) return Array.from({ length: t }, (_, i) => i + 1)
  const pages = new Set([1, t, c, c-1, c+1].filter(p => p >= 1 && p <= t))
  const sorted = [...pages].sort((a, b) => a - b)
  const result = []
  let prev = null
  for (const p of sorted) {
    if (prev && p - prev > 1) result.push('...')
    result.push(p)
    prev = p
  }
  return result
})

/* ── Modal computed ── */
const angulos = computed(() => {
  if (!produtoModal.value) return []
  const imgs = produtoModal.value.imagens
  if (Array.isArray(imgs) && imgs.length > 1) return imgs.slice(0, 4)
  const base = produtoModal.value.imagem
  return base ? [base] : []
})
const imagemAtiva = computed(() =>
  angulos.value[anguloAtivo.value] || produtoModal.value?.imagem || ''
)
const produtosRelacionados = computed(() => {
  if (!produtoModal.value) return []
  return todos.value
    .filter(p =>
      p.subcategoria === produtoModal.value.subcategoria &&
      p.id !== produtoModal.value.id
    )
    .slice(0, 3)
})

/* ══════════════════════════════════════════════════════
   TIER E XP
══════════════════════════════════════════════════════ */
function getTier(p) {
  if (!p) return { label: '— C-TIER', letter: 'C', cls: 'c' }
  if (p.destaque)         return { label: '◆ S-TIER', letter: 'S', cls: 's' }
  if (p.rgb && p.estoque) return { label: '◈ A-TIER', letter: 'A', cls: 'a' }
  if (p.estoque)          return { label: '◇ B-TIER', letter: 'B', cls: 'b' }
  return { label: '— C-TIER', letter: 'C', cls: 'c' }
}
function getXP(p) {
  if (!p) return 5
  let score = 5
  if (p.destaque)  score += 3
  if (p.rgb)       score += 1.5
  if (p.estoque)   score += 0.5
  return Math.min(10, Math.round(score * 10) / 10)
}

/* ══════════════════════════════════════════════════════
   UTILITÁRIOS
══════════════════════════════════════════════════════ */
const fmt = v => (v || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })

// FIX: contarCat compara lowercase
const contarCat = val =>
  todos.value.filter(p => (p.subcategoria || '').toLowerCase() === val).length

const getProdutoById = id => todos.value.find(p => p.id === id) || null

// FIX: labelDoCat para chips
const labelDoCat = val =>
  heroCatsList.find(c => c.val === val)?.label || val

/* ══════════════════════════════════════════════════════
   TOAST
══════════════════════════════════════════════════════ */
function mostrarToast(msg, tipo = 'success') {
  clearTimeout(toastTimer)
  toast.value = { visivel: true, msg, tipo }
  toastTimer = setTimeout(() => { toast.value.visivel = false }, 2800)
}

/* ══════════════════════════════════════════════════════
   FILTROS
══════════════════════════════════════════════════════ */
function toggleCat(val) {
  // val já chega normalizado (lowercase)
  const i = categoriasAtivas.value.indexOf(val)
  if (i === -1) categoriasAtivas.value.push(val)
  else categoriasAtivas.value.splice(i, 1)
}
function removeCat(val) {
  categoriasAtivas.value = categoriasAtivas.value.filter(c => c !== val)
  pagina.value = 1
}
function clampPreco() {
  if (filtroPreco.value[0] > filtroPreco.value[1] - 500)
    filtroPreco.value[0] = filtroPreco.value[1] - 500
}
function limparFiltros() {
  busca.value = ''
  categoriasAtivas.value = []
  filtroPreco.value = [0, precoMax.value]
  apenasEstoque.value = false
  ordenacao.value = 'relevancia'
  pagina.value = 1
}
function irPag(p) {
  pagina.value = p
  nextTick(() => {
    gmRef.value?.querySelector('.gm__catalogo')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
}

/* ══════════════════════════════════════════════════════
   WISHLIST / SAVED
══════════════════════════════════════════════════════ */
function toggleWishlist(id) {
  const i = wishlist.value.indexOf(id)
  if (i === -1) { wishlist.value.push(id); mostrarToast('お気に入り追加 ♥') }
  else { wishlist.value.splice(i, 1); mostrarToast('Removido dos favoritos', 'info') }
}
function toggleSaved(p) {
  if (!p) return
  if (savedIds.value.includes(p.id)) {
    savedIds.value = savedIds.value.filter(id => id !== p.id)
    mostrarToast('Removido', 'info')
  } else {
    savedIds.value.push(p.id)
    mostrarToast('後で買う · Salvo ◆')
  }
}

/* ══════════════════════════════════════════════════════
   CARRINHO — lógica local, sem dependência externa
   FIX: substituir por cart.adicionar() quando integrar store real
══════════════════════════════════════════════════════ */
const carrinhoLocal = ref([])

function addToCart(p) {
  if (!p?.estoque) return
  if (addedIds.value.includes(p.id)) return
  const quantidade = modalAberto.value ? qtd.value : 1

  // Adiciona ao carrinho local
  for (let i = 0; i < quantidade; i++) {
    carrinhoLocal.value.push({ ...p, corNome: corSelecionada.value || '' })
  }

  addedIds.value.push(p.id)
  mostrarToast(`${p.nome} adicionado ao arsenal ◆`)

  // Disparar evento global para o cart drawer existente (se houver)
  window.dispatchEvent(new CustomEvent('abrir-carrinho'))

  if (modalAberto.value) setTimeout(() => fecharModal(), 750)
  setTimeout(() => {
    addedIds.value = addedIds.value.filter(id => id !== p.id)
  }, 2500)
}

/* ══════════════════════════════════════════════════════
   MODAL
══════════════════════════════════════════════════════ */
function abrirModal(p) {
  if (!p) return
  produtoModal.value = p
  anguloAtivo.value = 0
  zoomAtivo.value = false
  qtd.value = 1
  corSelecionada.value = p.cores?.[0]?.nome || ''
  modalAberto.value = true
  document.body.style.overflow = 'hidden'
  nextTick(() => animarModal())
}
function fecharModal() {
  if (!modalEl.value) {
    modalAberto.value = false
    document.body.style.overflow = ''
    return
  }
  // GSAP não importado aqui — fallback CSS
  modalEl.value.style.transition = 'opacity .3s, transform .3s'
  modalEl.value.style.opacity = '0'
  modalEl.value.style.transform = 'scale(.96) translateY(16px)'
  setTimeout(() => {
    modalAberto.value = false
    zoomAtivo.value = false
    document.body.style.overflow = ''
    if (modalEl.value) {
      modalEl.value.style.transition = ''
      modalEl.value.style.opacity = ''
      modalEl.value.style.transform = ''
    }
  }, 300)
}

/* ══════════════════════════════════════════════════════
   ANIMAÇÕES (GSAP opcional — detecta se existe)
══════════════════════════════════════════════════════ */
const gsap = window.gsap || null

function animarHero() {
  if (!gsap) return
  const tl = gsap.timeline({ delay: .1 })
  if (heroKicker.value)  tl.fromTo(heroKicker.value,  { opacity:0, x:-20 }, { opacity:1, x:0, duration:.7, ease:'power3.out' })
  if (heroEyebrow.value) tl.fromTo(heroEyebrow.value, { opacity:0, x:-30 }, { opacity:1, x:0, duration:.8, ease:'power3.out' }, '-=.4')
  if (heroTitulo.value) {
    const lines = heroTitulo.value.querySelectorAll('.gm__t-thin,.gm__t-main,.gm__t-sub,.gm__t-kanji')
    tl.fromTo(lines, { opacity:0, y:60, skewY:2 }, { opacity:1, y:0, skewY:0, duration:1.1, stagger:.12, ease:'expo.out' }, '-=.4')
  }
  if (heroSub.value)    tl.fromTo(heroSub.value,    { opacity:0, y:20 }, { opacity:1, y:0, duration:.7, ease:'power2.out' }, '-=.5')
  if (heroCatsRef.value) {
    const slots = heroCatsRef.value.querySelectorAll('.gm__lslot')
    tl.fromTo(slots, { opacity:0, y:14, scale:.97 }, { opacity:1, y:0, scale:1, duration:.6, stagger:.08, ease:'back.out(1.5)' }, '-=.4')
  }
  if (heroRight.value) {
    const cells = heroRight.value.querySelectorAll('.gm__frag-cell')
    tl.fromTo(cells, { opacity:0, x:30 }, { opacity:1, x:0, duration:.7, stagger:.1, ease:'power3.out' }, '-=.8')
  }
  if (heroStrip.value) {
    const items = heroStrip.value.querySelectorAll('.gm__strip-item')
    tl.fromTo(items, { opacity:0, y:18 }, { opacity:1, y:0, duration:.6, stagger:.1, ease:'power2.out' }, '-=.5')
  }
}

function animarModal() {
  if (!modalEl.value) return
  if (gsap) {
    gsap.fromTo(modalEl.value, { opacity:0, scale:.93, y:36 }, { opacity:1, scale:1, y:0, duration:.65, ease:'expo.out' })
    if (modalInfoEl.value) {
      gsap.fromTo([...modalInfoEl.value.children], { opacity:0, y:22 }, { opacity:1, y:0, duration:.5, stagger:.055, ease:'power2.out', delay:.2 })
    }
  }
}

function initTilt() {
  if (!gsap) return
  nextTick(() => {
    Object.entries(cardRefs.value).forEach(([idx, el]) => {
      if (!el || el._tiltBound) return
      el._tiltBound = true
      el.addEventListener('mousemove', e => {
        const rect = el.getBoundingClientRect()
        const dx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2)
        const dy = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)
        gsap.to(el, { rotateX: -dy*7, rotateY: dx*7, transformPerspective:900, duration:.3, ease:'power1.out', overwrite:'auto' })
        const shine = shineRefs.value[idx]
        if (shine) {
          const angle = Math.atan2(dy, dx) * (180 / Math.PI)
          gsap.to(shine, { opacity:1, background:`linear-gradient(${angle}deg,transparent 40%,rgba(255,255,255,0.055) 50%,transparent 60%)`, duration:.3 })
        }
      })
      el.addEventListener('mouseleave', () => {
        gsap.to(el, { rotateX:0, rotateY:0, duration:.6, ease:'elastic.out(1,.5)', overwrite:'auto' })
        const shine = shineRefs.value[idx]
        if (shine) gsap.to(shine, { opacity:0, duration:.4 })
      })
    })
  })
}

/* ══════════════════════════════════════════════════════
   PARTICLES (Canvas)
══════════════════════════════════════════════════════ */
function initParticles() {
  const canvas = particlesCanvas.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  let w, h
  const particles = []
  const resize = () => {
    w = canvas.width = window.innerWidth
    h = canvas.height = window.innerHeight
  }
  resize()
  canvasResizeHandler = resize
  window.addEventListener('resize', canvasResizeHandler)
  for (let i = 0; i < 25; i++) particles.push(makeParticle(w, h, false))
  const draw = () => {
    ctx.clearRect(0, 0, w, h)
    particles.forEach((p, i) => {
      ctx.save()
      ctx.globalAlpha = p.alpha
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r)
      g.addColorStop(0, `rgba(220,60,20,${p.alpha})`)
      g.addColorStop(0.5, `rgba(180,30,10,${p.alpha * .5})`)
      g.addColorStop(1, `rgba(120,20,5,0)`)
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx.fillStyle = g
      ctx.fill()
      ctx.restore()
      p.x += p.vx
      p.y += p.vy
      p.alpha += (Math.random() - .5) * .006
      p.alpha = Math.max(.02, Math.min(.35, p.alpha))
      if (p.y < -10 || p.x < -20 || p.x > w + 20) particles[i] = makeParticle(w, h, true)
    })
    particlesRAF = requestAnimationFrame(draw)
  }
  draw()
}
function makeParticle(w, h, fromBottom = false) {
  return {
    x: Math.random() * w,
    y: fromBottom ? h + 10 : Math.random() * h,
    r: Math.random() * 3.5 + 1,
    vx: (Math.random() - .5) * .4,
    vy: -(Math.random() * .5 + .15),
    alpha: Math.random() * .2 + .04,
  }
}

/* ══════════════════════════════════════════════════════
   HUD TIMERS
══════════════════════════════════════════════════════ */
function updateTimer() {
  const now = new Date()
  const next = new Date(now)
  next.setHours(23, 59, 59, 999)
  const diff = Math.max(0, next - now)
  const h = Math.floor(diff / 3600000)
  const m = Math.floor((diff % 3600000) / 60000)
  const s = Math.floor((diff % 60000) / 1000)
  timerDrop.value = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`
}
function startHUD() {
  updateTimer()
  timerInterval = setInterval(updateTimer, 1000)
  guerreirosInterval = setInterval(() => {
    guerreirosAtivos.value += Math.floor(Math.random() * 7) - 3
    guerreirosAtivos.value = Math.max(2800, Math.min(3000, guerreirosAtivos.value))
  }, 3500)
  pingInterval = setInterval(() => {
    pingMs.value = Math.floor(Math.random() * 6) + 10
  }, 5000)
}
function stopHUD() {
  clearInterval(timerInterval)
  clearInterval(guerreirosInterval)
  clearInterval(pingInterval)
}

/* ══════════════════════════════════════════════════════
   CARREGAR PRODUTOS — FIX: com estado de erro
══════════════════════════════════════════════════════ */
async function carregarProdutos() {
  loading.value = true
  erro.value = ''
  try {
    const { data } = await api.get('/produtos?categoria=GAMING&limit=100')
    todos.value = data.produtos || data || []
    filtroPreco.value = [0, Math.max(15000, ...todos.value.map(p => p.preco || 0))]
  } catch (e) {
    // Fallback para mock se API falhar
    todos.value = [...PRODUTOS_MOCK]
    filtroPreco.value = [0, Math.max(15000, ...PRODUTOS_MOCK.map(p => p.preco))]
    erro.value = ''
  } finally {
    loading.value = false
  }
}
/* ══════════════════════════════════════════════════════
   WATCHERS
══════════════════════════════════════════════════════ */
watch(produtosPaginados, async () => {
  cardRefs.value = {}
  await nextTick()
  initTilt()
})
watch([busca, categoriasAtivas, filtroPreco, apenasEstoque, ordenacao], () => {
  pagina.value = 1
})

/* Persistência wishlist local */
watch(wishlist, val => {
  try { localStorage.setItem('gm_wishlist', JSON.stringify(val)) } catch {}
}, { deep: true })

/* ══════════════════════════════════════════════════════
   SCROLL + TECLADO
══════════════════════════════════════════════════════ */
const onScroll = () => { scrolled.value = window.scrollY > 60 }

function handleKeydown(e) {
  if (e.key !== 'Escape') {
    // Navegação de ângulos no modal com setas
    if (modalAberto.value && angulos.value.length > 1) {
      if (e.key === 'ArrowRight') anguloAtivo.value = (anguloAtivo.value + 1) % angulos.value.length
      if (e.key === 'ArrowLeft')  anguloAtivo.value = (anguloAtivo.value - 1 + angulos.value.length) % angulos.value.length
    }
    return
  }
  if (zoomAtivo.value)   { zoomAtivo.value = false; return }
  if (modalAberto.value) { fecharModal(); return }
  if (sidebarOpen.value) { sidebarOpen.value = false; return }
}

const measureToolbar = () => {
  if (toolbarRef.value) toolbarHeight.value = toolbarRef.value.offsetHeight
}

/* ══════════════════════════════════════════════════════
   LIFECYCLE
══════════════════════════════════════════════════════ */
onMounted(async () => {
  // Restaurar wishlist
  try {
    const r = localStorage.getItem('gm_wishlist')
    if (r) wishlist.value = JSON.parse(r)
  } catch {}

  await carregarProdutos()

  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', measureToolbar, { passive: true })
  window.addEventListener('keydown', handleKeydown)

  await nextTick()
  measureToolbar()
  initTilt()
  animarHero()
  initParticles()
  startHUD()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', measureToolbar)
  window.removeEventListener('keydown', handleKeydown)
  if (particlesRAF) cancelAnimationFrame(particlesRAF)
  if (canvasResizeHandler) window.removeEventListener('resize', canvasResizeHandler)
  clearTimeout(toastTimer)
  stopHUD()
  document.body.style.overflow = ''
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700;900&family=Cinzel:wght@400;600;700;900&family=Noto+Serif+JP:wght@200;300;400&family=Syne:wght@300;400;600;700&family=Share+Tech+Mono&display=swap');

/* ══════════════════════════════════════════════════════
   TOKENS — Samurai Warforge Palette
   NOTA: --navbar-h deve ser definida pelo layout pai.
   Declaramos fallback aqui para uso isolado.
══════════════════════════════════════════════════════ */
.gm {
  --navbar-h:   72px;          /* FIX: fallback local */
  --void:       #04030a;
  --deep:       #07060f;
  --ash:        #0d0c18;
  --ash2:       #131220;
  --crimson:    #8B0E0E;
  --crimson-h:  #B41E1E;
  --crimson-b:  #D42020;
  --ember:      #C84010;
  --ember2:     #E05018;
  --gold:       #C8A040;
  --gold2:      #E8C060;
  --gold-dim:   #7a6020;
  --blood:      #4a0808;
  --silk:       rgba(235,228,218,0.93);
  --silk2:      rgba(235,228,218,0.58);
  --silk3:      rgba(235,228,218,0.24);
  --silk4:      rgba(235,228,218,0.09);
  --hair:       rgba(200,160,64,0.13);
  --hair2:      rgba(200,160,64,0.07);
  --hair-red:   rgba(180,30,30,0.15);
  --hair-red2:  rgba(180,30,30,0.08);
  --gold3:      rgba(200,160,64,0.06);
  --red3:       rgba(180,30,30,0.06);
  --ease:       cubic-bezier(0.16,1,0.30,1);
  --f-display:  'Cinzel Decorative', serif;
  --f-title:    'Cinzel', serif;
  --f-jp:       'Noto Serif JP', serif;
  --f-ui:       'Syne', sans-serif;
  --f-mono:     'Share Tech Mono', 'Courier New', monospace;

  background:  var(--void);
  color:       var(--silk);
  font-family: var(--f-ui);
  min-height:  100vh;
  position:    relative;
  overflow-x:  hidden;
}

/* ══════════════════════════════════════════════════════
   FUNDO GLOBAL — névoa de batalha
══════════════════════════════════════════════════════ */
.gm__bg {
  position: fixed; inset: 0; pointer-events: none; z-index: 0; overflow: hidden;
}

/* Kamons */
.gm__kamon {
  position: absolute; font-family: var(--f-jp); font-weight: 200;
  color: var(--crimson); pointer-events: none; user-select: none; line-height: 1;
}
.gm__kamon--1 { font-size: clamp(220px,30vw,420px); bottom: -100px; right: -80px; opacity: .028; animation: kamonDrift 22s ease-in-out infinite; }
.gm__kamon--2 { font-size: clamp(130px,18vw,250px); top: 8%; left: -50px; opacity: .02; animation: kamonDrift 28s ease-in-out infinite reverse; }
.gm__kamon--3 { font-size: clamp(90px,12vw,160px); top: 44%; left: 44%; opacity: .014; animation: kamonDrift 18s ease-in-out infinite 4s; }
@keyframes kamonDrift { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-22px) rotate(1.2deg)} }

/* Realm line */
.gm__realm-line {
  position: absolute; top: 0; left: 0; right: 0; height: .5px;
  background: linear-gradient(90deg,transparent 0%,transparent 5%,var(--gold2) 20%,var(--crimson-h) 40%,var(--gold) 60%,var(--crimson-h) 80%,transparent 95%,transparent 100%);
  opacity: .5;
}

/* Washi */
.gm__washi {
  position: absolute; inset: 0; opacity: .9;
  background:
    repeating-linear-gradient(90deg, rgba(255,255,255,.005) 0, rgba(255,255,255,.005) 1px, transparent 1px, transparent 66px),
    repeating-linear-gradient(0deg,  rgba(255,255,255,.004) 0, rgba(255,255,255,.004) 1px, transparent 1px, transparent 66px);
}

/* Scanlines */
.gm__scanlines {
  position: absolute; inset: 0; pointer-events: none;
  background: repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(0,0,0,.05) 3px, rgba(0,0,0,.05) 4px);
  opacity: .55; animation: scanlinesDrift 8s linear infinite;
}
@keyframes scanlinesDrift { 0%{transform:translateY(0)} 100%{transform:translateY(4px)} }

/* Fog */
.gm__fog {
  position: absolute; pointer-events: none; border-radius: 50%; filter: blur(100px);
}
.gm__fog--1 { width: 80vw; height: 80vw; bottom: -35vw; left: -20vw; background: radial-gradient(circle, rgba(139,14,14,.08) 0%, transparent 70%); animation: fogDrift1 20s ease-in-out infinite; }
.gm__fog--2 { width: 50vw; height: 50vw; top: -15vw; right: 5vw; background: radial-gradient(circle, rgba(200,160,64,.04) 0%, transparent 70%); animation: fogDrift2 26s ease-in-out infinite; }
@keyframes fogDrift1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-28px)} }
@keyframes fogDrift2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(20px,20px)} }

/* Brasas CSS */
.gm__ember {
  position: absolute;
  left: var(--ex, 50%); top: var(--ey, 80%);
  width: calc(3px * var(--es, 1));
  height: calc(3px * var(--es, 1));
  border-radius: 50%;
  background: radial-gradient(circle, var(--ember2) 0%, var(--crimson) 50%, transparent 100%);
  opacity: 0;
  animation: emberFloat var(--ed, 5s) ease-in infinite;
  box-shadow: 0 0 4px var(--crimson-h);
}
@keyframes emberFloat {
  0%  { opacity: 0; transform: translateY(0) scale(1); }
  10% { opacity: var(--eo, .2); }
  80% { opacity: var(--eo, .15); }
  100%{ opacity: 0; transform: translateY(-120px) translateX(30px) scale(.3); }
}

/* Particles canvas */
.gm__particles {
  position: fixed; inset: 0; z-index: 0; pointer-events: none; opacity: .65;
}

/* ══════════════════════════════════════════════════════
   HERO
══════════════════════════════════════════════════════ */
.gm__hero {
  position: relative; z-index: 2;
  padding: calc(var(--navbar-h) + 64px) 80px 0;
  border-bottom: .5px solid var(--hair-red2);
  overflow: hidden;
}
.gm__edge-line {
  position: absolute; left: calc(6% - 1px); top: 0; bottom: 0; width: .5px;
  background: linear-gradient(to bottom, transparent 0%, var(--hair-red) 22%, var(--hair-red) 78%, transparent 100%);
  z-index: 3; pointer-events: none;
}
.gm__edge-num {
  position: absolute; top: calc(var(--navbar-h) + 40px); left: 50%;
  transform: translateX(-50%) rotate(-90deg);
  font-family: var(--f-mono); font-size: 7px; letter-spacing: .3em;
  color: var(--gold); opacity: .28; white-space: nowrap;
}
.gm__hud {
  position: absolute; right: 28px; top: 50%;
  display: flex; flex-direction: column; align-items: center; gap: 8px;
  transform: translateY(-50%) rotate(90deg); z-index: 3; pointer-events: none;
}
.gm__hud-label { font-size: 7px; letter-spacing: .52em; text-transform: uppercase; color: var(--silk4); }
.gm__hud-sep   { width: 18px; height: .5px; background: linear-gradient(90deg, transparent, var(--gold), transparent); opacity: .28; }
.gm__hud-coord { font-family: var(--f-mono); font-size: 7px; letter-spacing: .28em; text-transform: uppercase; color: var(--gold); opacity: .45; }

.gm__hero-inner {
  display: grid; grid-template-columns: 1fr 300px; gap: 64px;
  align-items: center; padding-left: calc(6% + 28px);
}

/* Kicker */
.gm__kicker { display: flex; flex-direction: column; align-items: flex-start; gap: 7px; margin-bottom: 22px; }
.gm__kicker-num { font-family: var(--f-mono); font-size: 9px; letter-spacing: .3em; color: var(--gold); opacity: .35; }
.gm__kicker-bar { width: .5px; height: 42px; background: linear-gradient(to bottom, var(--crimson-b), transparent); opacity: .55; }

/* Eyebrow */
.gm__eyebrow { display: flex; align-items: center; gap: 10px; margin-bottom: 22px; }
.gm__ew-dot  { width: 5px; height: 5px; border-radius: 50%; background: var(--crimson-b); opacity: .85; flex-shrink: 0; animation: dotPulse 2.5s ease-in-out infinite; }
.gm__ew-text { font-size: 8px; font-weight: 600; letter-spacing: .48em; text-transform: uppercase; color: var(--gold); opacity: .7; }
@keyframes dotPulse { 0%,100%{box-shadow:0 0 0 0 rgba(212,32,32,0)} 50%{box-shadow:0 0 0 6px rgba(212,32,32,0)} }

/* Título samurai */
.gm__titulo { display: flex; flex-direction: column; margin: 0; line-height: 1; margin-bottom: 20px; }
.gm__t-thin {
  font-family: var(--f-ui); font-size: clamp(1.2rem,3vw,2.6rem); font-weight: 300;
  color: var(--silk3); letter-spacing: .05em; text-transform: uppercase; line-height: 1; display: block;
}
.gm__t-main {
  font-family: var(--f-display); font-size: clamp(2.8rem,8.5vw,7rem); font-weight: 900;
  background: linear-gradient(135deg, var(--silk) 0%, var(--gold2) 25%, var(--crimson-b) 55%, var(--ember2) 75%, var(--gold) 100%);
  background-size: 200% auto;
  -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
  animation: mainShine 7s linear infinite; line-height: .88; display: block;
  text-transform: uppercase; letter-spacing: .04em;
  /* sombra de tinta vermelha */
  filter: drop-shadow(0 0 20px rgba(180,30,30,.35));
}
.gm__t-sub {
  font-family: var(--f-title); font-size: clamp(1.1rem,2.5vw,2.2rem); font-weight: 600;
  color: var(--silk3); letter-spacing: .6em; text-transform: uppercase; display: block;
  margin-top: 2px;
  background: linear-gradient(90deg, var(--crimson-h), var(--gold));
  -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
}
.gm__t-kanji {
  font-family: var(--f-jp); font-weight: 200; font-size: clamp(.8rem,1.2vw,1.1rem);
  letter-spacing: 8px; color: var(--gold); opacity: .2; margin-top: 12px; display: block;
}
@keyframes mainShine { from{background-position:0% center} to{background-position:200% center} }

/* Sep */
.gm__sep { display: flex; align-items: center; gap: 10px; width: 220px; margin: 0 0 18px; }
.gm__sep-line { flex: 1; height: .5px; background: linear-gradient(to right, var(--crimson-b), transparent); opacity: .45; }
.gm__sep-line--r { background: linear-gradient(to left, var(--crimson-b), transparent); }
.gm__sep-gem { font-family: var(--f-jp); font-size: 14px; color: var(--gold); opacity: .45; line-height: 1; flex-shrink: 0; }

.gm__sub {
  font-family: var(--f-mono); font-size: 9px; letter-spacing: 2.5px;
  color: var(--silk4); text-transform: uppercase; margin-bottom: 26px;
}

/* ══ LOADOUT SLOTS ══ */
.gm__loadout { margin-bottom: 24px; }
.gm__loadout-label { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; }
.gm__ll-kanji { font-family: var(--f-jp); font-size: 14px; color: var(--crimson-h); opacity: .7; line-height: 1; }
.gm__ll-txt { font-family: var(--f-mono); font-size: 6.5px; letter-spacing: 5px; text-transform: uppercase; color: var(--silk3); opacity: .55; }
.gm__loadout-slots { display: flex; flex-wrap: wrap; gap: 6px; }
.gm__lslot {
  position: relative; overflow: hidden;
  background: var(--deep); border: .5px solid var(--hair-red2);
  padding: 10px 14px; display: flex; flex-direction: column; align-items: center; gap: 4px;
  min-width: 72px; cursor: pointer; transition: all .35s var(--ease);
  /* clip angular */
  clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
}
.gm__lslot-corner-tl {
  position: absolute; top: 3px; left: 3px; width: 8px; height: 8px;
  border-top: .5px solid rgba(200,160,64,0); border-left: .5px solid rgba(200,160,64,0);
  transition: border-color .3s;
}
.gm__lslot-corner-br {
  position: absolute; bottom: 3px; right: 3px; width: 8px; height: 8px;
  border-bottom: .5px solid rgba(200,160,64,0); border-right: .5px solid rgba(200,160,64,0);
  transition: border-color .3s;
}
.gm__lslot:hover .gm__lslot-corner-tl,
.gm__lslot.is-equipped .gm__lslot-corner-tl { border-color: rgba(200,160,64,.5); }
.gm__lslot:hover .gm__lslot-corner-br,
.gm__lslot.is-equipped .gm__lslot-corner-br { border-color: rgba(200,160,64,.5); }
.gm__lslot:hover { background: rgba(180,30,30,.05); border-color: rgba(180,30,30,.35); }
.gm__lslot.is-equipped { background: rgba(180,30,30,.1); border-color: var(--crimson-h); box-shadow: 0 0 12px rgba(180,30,30,.2); }
.gm__lslot-kanji {
  font-family: var(--f-jp); font-size: 1.5rem; font-weight: 200;
  color: var(--crimson-h); opacity: .3; line-height: 1; transition: opacity .3s;
}
.gm__lslot:hover .gm__lslot-kanji,
.gm__lslot.is-equipped .gm__lslot-kanji { opacity: 1; }
.gm__lslot-label {
  font-family: var(--f-mono); font-size: 6.5px; letter-spacing: 2.5px;
  text-transform: uppercase; color: var(--silk3); transition: color .3s;
}
.gm__lslot.is-equipped .gm__lslot-label { color: var(--crimson-b); }
.gm__lslot-equipped-bar {
  position: absolute; bottom: 0; left: 0; right: 0; height: 1.5px;
  background: linear-gradient(90deg, transparent, var(--crimson-b), var(--gold), var(--crimson-b), transparent);
  animation: equipBar 2s linear infinite;
}
@keyframes equipBar { 0%{background-position:0% center} 100%{background-position:200% center} }

/* ══ HERO RIGHT — Frag Counter ══ */
.gm__hero-right { display: flex; flex-direction: column; gap: 4px; position: relative; }
.gm__hanko {
  position: absolute; right: -16px; top: -24px; width: 80px; height: 80px;
  opacity: .9; pointer-events: none;
}
.gm__frag-counter {
  display: flex; flex-direction: column; gap: 0; margin-top: 16px;
  border: .5px solid var(--hair-red2); overflow: hidden;
  /* selo de katana no canto */
  clip-path: polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%);
}
.gm__frag-cell {
  background: rgba(139,14,14,.03); border-bottom: .5px solid var(--hair-red2);
  padding: 13px 14px; position: relative; overflow: hidden; transition: background .25s;
}
.gm__frag-cell:last-child { border-bottom: none; }
.gm__frag-cell:hover { background: rgba(139,14,14,.06); }
.gm__frag-cell::before {
  content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 2px;
  background: linear-gradient(to bottom, var(--crimson-b), transparent); opacity: 0; transition: opacity .25s;
}
.gm__frag-cell:hover::before { opacity: 1; }
.gm__frag-idx   { font-family: var(--f-mono); font-size: 7px; letter-spacing: 4px; color: var(--gold); opacity: .28; margin-bottom: 2px; }
.gm__frag-val   { font-family: var(--f-display); font-size: 1.8rem; font-weight: 900; color: var(--crimson-b); line-height: 1; letter-spacing: -.02em; }
.gm__frag-val--gold { color: var(--gold); filter: drop-shadow(0 0 6px rgba(200,160,64,.4)); }
.gm__frag-lbl   { font-family: var(--f-mono); font-size: 6.5px; letter-spacing: 3px; text-transform: uppercase; color: var(--silk4); margin-top: 3px; }
.gm__frag-kanji {
  position: absolute; bottom: 4px; right: 8px;
  font-family: var(--f-jp); font-size: 28px; color: var(--crimson); opacity: .06; line-height: 1; pointer-events: none;
}
.gm__frag-bar   { position: absolute; bottom: 0; left: 0; right: 0; height: 1.5px; background: rgba(139,14,14,.12); }
.gm__frag-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--blood), var(--crimson-b), var(--ember2), var(--gold));
  width: 0; transition: width 1.2s ease-out;
}
.gm__frag-cell:hover .gm__frag-bar-fill { width: var(--fw, 100%); }

/* ══ STRIP ══ */
.gm__strip {
  display: grid; grid-template-columns: repeat(4,1fr);
  border-top: .5px solid var(--hair-red2); margin: 44px -80px 0; padding: 0 80px;
  position: relative; z-index: 2;
}
.gm__strip::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: .5px;
  background: linear-gradient(90deg, transparent, var(--gold2) 20%, var(--crimson-b) 50%, var(--gold2) 80%, transparent);
  opacity: .3;
}
.gm__strip-item {
  display: flex; align-items: center; gap: 11px;
  padding: 16px 20px 16px 0; margin-right: 20px;
  border-right: .5px solid var(--hair-red2); position: relative;
}
.gm__strip-item:last-child { border-right: none; padding-right: 0; margin-right: 0; }
.gm__strip-icon {
  width: 34px; height: 34px; border: .5px solid var(--hair-red2);
  display: flex; align-items: center; justify-content: center;
  color: var(--crimson-h); flex-shrink: 0; transition: all .25s;
  clip-path: polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px));
}
.gm__strip-item:hover .gm__strip-icon { border-color: var(--crimson-h); background: rgba(180,30,30,.08); }
.gm__strip-title { font-family: var(--f-title); font-size: 10px; font-weight: 600; color: var(--silk2); letter-spacing: .5px; margin-bottom: 2px; }
.gm__strip-sub   { font-family: var(--f-mono); font-size: 7.5px; color: var(--silk4); letter-spacing: 1px; }
.gm__strip-kanji {
  position: absolute; right: 10px; top: 50%; transform: translateY(-50%);
  font-family: var(--f-jp); font-size: 26px; font-weight: 200; color: var(--crimson); opacity: .06;
  pointer-events: none; transition: opacity .3s;
}
.gm__strip-item:hover .gm__strip-kanji { opacity: .16; }

/* ══════════════════════════════════════════════════════
   HUD STATUS BAR
══════════════════════════════════════════════════════ */
.gm__hud-bar {
  background: var(--deep); border-bottom: .5px solid var(--hair-red2);
  display: grid; grid-template-columns: repeat(4,1fr);
  position: relative; overflow: hidden; z-index: 10;
}
.gm__hud-bar-scan {
  position: absolute; top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, var(--crimson-b), var(--gold), var(--crimson-b), transparent);
  opacity: .55; animation: hudScan 3.5s linear infinite; pointer-events: none;
}
@keyframes hudScan { 0%{transform:translateX(-100%)} 100%{transform:translateX(100%)} }
.gm__hud-cell {
  padding: 10px 16px; border-right: .5px solid var(--hair-red2);
  position: relative; overflow: hidden; transition: background .2s;
}
.gm__hud-cell:last-child { border-right: none; }
.gm__hud-cell:hover { background: rgba(139,14,14,.04); }
.gm__hud-cell::after {
  content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 1px;
  background: var(--crimson-b); transform: scaleX(0); transform-origin: left; transition: transform .4s var(--ease);
}
.gm__hud-cell:hover::after { transform: scaleX(1); }
.gm__hud-cell-label { font-family: var(--f-mono); font-size: 6px; letter-spacing: 3px; text-transform: uppercase; color: var(--silk3); margin-bottom: 4px; }
.gm__hud-cell-val   { font-family: var(--f-mono); font-size: 12px; color: var(--silk2); letter-spacing: 1.5px; display: flex; align-items: center; gap: 6px; }
.gm__hud-cell-val--timer { color: var(--crimson-b); font-size: 13px; }
.gm__hud-cell-kanji {
  position: absolute; bottom: 3px; right: 8px;
  font-family: var(--f-jp); font-size: 24px; color: var(--crimson); opacity: .055; line-height: 1; pointer-events: none;
}
.gm__hud-dot { width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; }
.gm__hud-dot--red  { background: var(--crimson-b); animation: dotBlink 1.4s ease-in-out infinite; }
.gm__hud-dot--gold { background: var(--gold); animation: dotBlink 1.4s ease-in-out infinite .7s; }
@keyframes dotBlink { 0%,100%{opacity:1} 50%{opacity:.14} }

/* ══════════════════════════════════════════════════════
   LATENCY STRIP
══════════════════════════════════════════════════════ */
.gm__latency {
  background: rgba(4,3,10,.65); border-bottom: .5px solid var(--hair-red2);
  display: flex; align-items: stretch; overflow: hidden; z-index: 9; position: relative;
}
.gm__lat-seg { display: flex; align-items: center; gap: 8px; padding: 8px 16px; border-right: .5px solid var(--hair-red2); flex-shrink: 0; }
.gm__lat-seg:last-child { border-right: none; }
.gm__lat-icon {
  width: 24px; height: 24px; border: .5px solid var(--hair-red2);
  display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: var(--crimson-h);
  clip-path: polygon(0 0, calc(100% - 5px) 0, 100% 5px, 100% 100%, 5px 100%, 0 calc(100% - 5px));
}
.gm__lat-body { display: flex; flex-direction: column; gap: 1px; }
.gm__lat-label { font-family: var(--f-mono); font-size: 6px; letter-spacing: 2.5px; text-transform: uppercase; color: var(--silk3); }
.gm__lat-val   { font-family: var(--f-mono); font-size: 10px; color: var(--silk2); letter-spacing: 1px; }
.gm__lat-val--green { color: #4ade80; }
.gm__lat-val--gold  { color: var(--gold); }
.gm__lat-bars { display: flex; align-items: flex-end; gap: 2px; height: 14px; flex-shrink: 0; }
.gm__lat-b    { width: 3px; background: rgba(139,14,14,.22); animation: latBar 1.6s ease-in-out infinite; }
.gm__lat-b:nth-child(1){animation-delay:0s}
.gm__lat-b:nth-child(2){animation-delay:.2s}
.gm__lat-b:nth-child(3){animation-delay:.4s}
.gm__lat-b:nth-child(4){animation-delay:.6s}
@keyframes latBar { 0%,100%{height:3px;background:rgba(139,14,14,.22)} 50%{height:14px;background:var(--crimson-b)} }
.gm__lat-seg--ticker { flex: 1; overflow: hidden; padding: 0; min-width: 0; }
.gm__lat-ticker-track { display: flex; white-space: nowrap; animation: tickerMove 44s linear infinite; }
.gm__lat-ticker-set   { display: inline-flex; align-items: center; }
.gm__lt-item {
  font-family: var(--f-mono); font-size: 7px; letter-spacing: 3px; text-transform: uppercase;
  color: var(--silk4); padding: 0 16px; height: 38px; display: flex; align-items: center;
  flex-shrink: 0; border-right: .5px solid var(--hair-red2);
}
.gm__lt-sep  { color: var(--crimson-h); font-size: 5px; opacity: .45; flex-shrink: 0; padding: 0 2px; }
@keyframes tickerMove { from{transform:translateX(0)} to{transform:translateX(-33.33%)} }

/* ══════════════════════════════════════════════════════
   TOOLBAR
══════════════════════════════════════════════════════ */
.gm__toolbar {
  position: sticky; top: 0; z-index: 50;
  background: rgba(4,3,10,.96); backdrop-filter: blur(22px);
  border-bottom: .5px solid var(--hair-red2); transition: box-shadow .3s; overflow: hidden;
}
.gm__toolbar-border {
  position: absolute; top: 0; left: 0; right: 0; height: .5px;
  background: linear-gradient(90deg, transparent, var(--gold2) 20%, var(--crimson-b) 50%, var(--gold2) 80%, transparent);
  opacity: .3; pointer-events: none;
}
.gm__toolbar.is-scrolled { box-shadow: 0 4px 28px rgba(0,0,0,.35); border-bottom-color: var(--hair-red); }
.gm__toolbar-inner { max-width: 1600px; margin: 0 auto; padding: 10px 26px; display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }

.gm__search-wrap {
  display: flex; align-items: center; gap: 8px;
  background: rgba(255,255,255,.02); border: .5px solid var(--hair-red2);
  padding: 8px 12px; min-width: 190px; flex: 1; max-width: 300px;
  transition: border-color .25s, box-shadow .25s;
}
.gm__search-wrap.is-focus { border-color: var(--hair-red); box-shadow: 0 0 0 3px rgba(180,30,30,.05); }
.gm__search-wrap svg { color: var(--crimson-h); flex-shrink: 0; opacity: .65; }
.gm__search-wrap input {
  background: none; border: none; outline: none; color: var(--silk);
  font-family: var(--f-mono); font-size: 10px; width: 100%; letter-spacing: .05em;
}
.gm__search-wrap input::placeholder { color: var(--silk4); }
.gm__search-clear { background: none; border: none; color: var(--silk4); cursor: pointer; padding: 0 2px; transition: color .2s; }
.gm__search-clear:hover { color: var(--gold); }

.gm__chips { display: flex; gap: 5px; flex-wrap: wrap; }
.gm__chip {
  display: flex; align-items: center; gap: 6px;
  background: rgba(180,30,30,.09); border: .5px solid var(--crimson-h);
  padding: 4px 10px; font-family: var(--f-mono); font-size: 7px; letter-spacing: 2px;
  color: var(--crimson-b); cursor: pointer; transition: all .2s;
}
.gm__chip:hover { background: rgba(180,30,30,.18); }

.gm__toolbar-right { display: flex; align-items: center; gap: 10px; margin-left: auto; }
.gm__toolbar-count { font-family: var(--f-mono); font-size: 8px; letter-spacing: 2px; color: var(--silk4); white-space: nowrap; }
.gm__toolbar-select {
  background: rgba(255,255,255,.02); border: .5px solid var(--hair-red2);
  padding: 7px 10px; color: var(--silk3); font-family: var(--f-mono); font-size: 9px;
  cursor: pointer; outline: none; transition: border-color .2s;
}
.gm__toolbar-select:focus { border-color: var(--hair-red); }
.gm__toolbar-limpar {
  background: none; border: .5px solid var(--hair2); padding: 7px 12px;
  font-family: var(--f-mono); font-size: 7px; letter-spacing: 2px; color: var(--silk4);
  cursor: pointer; transition: all .2s;
}
.gm__toolbar-limpar:hover { border-color: var(--hair); color: var(--gold); }
.gm__view-toggle { display: flex; gap: 2px; }
.gm__view-toggle button {
  width: 30px; height: 30px; background: transparent; border: .5px solid var(--hair-red2);
  color: var(--silk4); cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all .2s;
}
.gm__view-toggle button:hover { border-color: var(--hair-red); color: var(--silk3); }
.gm__view-toggle button.is-active { border-color: var(--crimson-h); color: var(--crimson-b); background: rgba(180,30,30,.09); }

/* ══════════════════════════════════════════════════════
   LAYOUT
══════════════════════════════════════════════════════ */
.gm__layout { display: grid; grid-template-columns: 230px 1fr; max-width: 1600px; margin: 0 auto; min-height: 70vh; position: relative; z-index: 2; }

/* ══════════════════════════════════════════════════════
   SIDEBAR
══════════════════════════════════════════════════════ */
.gm__sidebar {
  background: var(--deep); border-right: .5px solid var(--hair-red2);
  position: sticky; display: flex; flex-direction: column;
  transition: transform .35s var(--ease);
  scrollbar-width: thin; scrollbar-color: rgba(180,30,30,.18) transparent; overflow: hidden;
}
.gm__sidebar::-webkit-scrollbar { width: 3px; }
.gm__sidebar::-webkit-scrollbar-thumb { background: rgba(180,30,30,.22); border-radius: 2px; }
.gm__sb-kamon {
  position: absolute; bottom: 80px; right: 10px;
  font-family: var(--f-jp); font-size: 48px; font-weight: 200; color: var(--crimson); opacity: .04;
  pointer-events: none; z-index: 0; line-height: 1;
}
.gm__sb-watermark {
  text-align: center; padding: 12px 16px 16px; margin-top: auto;
  font-family: var(--f-title); font-size: 7px; letter-spacing: .5em; text-transform: uppercase; line-height: 1.7;
  color: var(--crimson-h); opacity: .08; pointer-events: none; user-select: none; position: relative; z-index: 1;
}
.gm__sb-close-m { display: none; background: none; border: none; color: var(--silk4); font-family: var(--f-mono); font-size: 8px; letter-spacing: 3px; cursor: pointer; padding: 14px 16px 0; text-align: left; }
.gm__sb-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,.82); z-index: 98; opacity: 0; transition: opacity .3s; backdrop-filter: blur(8px); }
.gm__sb-overlay.is-vis { display: block; opacity: 1; }

.gm__sb-ornament { display: flex; align-items: center; gap: 10px; padding: 16px 16px 10px; position: relative; z-index: 1; }
.gm__sb-orn-line { flex: 1; height: .5px; background: linear-gradient(90deg, var(--crimson-b), transparent); opacity: .2; }
.gm__sb-orn-line--r { background: linear-gradient(270deg, var(--crimson-b), transparent); }
.gm__sb-orn-kanji { font-family: var(--f-jp); font-size: 14px; color: var(--gold); opacity: .3; line-height: 1; flex-shrink: 0; }

.gm__sb-sec { padding: 0 16px; position: relative; z-index: 1; flex-shrink: 0; }
.gm__sb-lbl { font-family: var(--f-mono); font-size: 6px; letter-spacing: 5px; color: var(--gold); margin-bottom: 10px; display: flex; align-items: center; gap: 7px; text-transform: uppercase; opacity: .7; }
.gm__sb-lbl-kanji { font-family: var(--f-jp); font-size: 14px; font-weight: 200; color: var(--crimson-b); opacity: .7; letter-spacing: 0; line-height: 1; }
.gm__sb-count { font-family: var(--f-mono); font-size: 8px; color: var(--crimson-b); margin-left: 5px; }

.gm__sb-sep { display: flex; align-items: center; gap: 10px; padding: 12px 16px; position: relative; z-index: 1; }
.gm__sb-sep-line { flex: 1; height: .5px; background: linear-gradient(90deg, transparent, rgba(180,30,30,.22)); }
.gm__sb-sep-line--r { background: linear-gradient(to left, transparent, rgba(180,30,30,.22)); }
.gm__sb-sep-kanji { font-family: var(--f-jp); font-size: 12px; font-weight: 200; color: var(--gold); opacity: .28; flex-shrink: 0; line-height: 1; }

/* Cats sidebar */
.gm__sb-cats { display: flex; flex-direction: column; gap: 1px; }
.gm__sb-cat {
  display: flex; align-items: center; gap: 6px; background: none; border: .5px solid transparent;
  padding: 7px 8px; cursor: pointer; width: 100%; font-family: var(--f-ui); font-size: 10.5px;
  color: var(--silk3); transition: all .2s; position: relative;
}
.gm__sb-cat::before { content: ''; position: absolute; left: 0; top: 6px; bottom: 6px; width: 2px; background: var(--crimson-b); opacity: 0; transition: opacity .2s; }
.gm__sb-cat:hover { background: rgba(180,30,30,.05); color: var(--silk2); padding-left: 12px; }
.gm__sb-cat:hover::before { opacity: .7; }
.gm__sb-cat.is-active { background: rgba(180,30,30,.09); border-color: rgba(180,30,30,.22); color: var(--crimson-b); }
.gm__sb-cat.is-active::before { opacity: 1; }
.gm__sb-cat-kanji { font-family: var(--f-jp); font-size: 14px; color: var(--crimson-h); opacity: .5; line-height: 1; flex-shrink: 0; width: 20px; transition: opacity .2s; }
.gm__sb-cat.is-active .gm__sb-cat-kanji { opacity: 1; }
.gm__sb-cat-check { font-size: 5px; color: var(--crimson-h); opacity: .5; flex-shrink: 0; }
.gm__sb-cat.is-active .gm__sb-cat-check { opacity: 1; }
.gm__sb-cat-n { font-family: var(--f-mono); font-size: 8px; color: var(--silk4); margin-left: auto; }

/* Ranges */
.gm__sb-preco-vals { display: flex; justify-content: space-between; font-family: var(--f-mono); font-size: 9px; color: var(--silk4); margin-bottom: 8px; }
.gm__sb-ranges { display: flex; flex-direction: column; gap: 4px; margin-bottom: 10px; }
.gm__sb-range { width: 100%; height: 2px; -webkit-appearance: none; background: rgba(180,30,30,.2); border-radius: 2px; cursor: pointer; accent-color: var(--crimson-b); }
.gm__sb-range::-webkit-slider-thumb { -webkit-appearance: none; width: 12px; height: 12px; border-radius: 50%; background: var(--crimson-b); cursor: pointer; border: 2px solid var(--void); box-shadow: 0 0 8px rgba(212,32,32,.35); }

.gm__sb-toggle-row { display: flex; align-items: center; gap: 9px; cursor: pointer; }
.gm__sb-toggle { width: 32px; height: 18px; border-radius: 18px; background: rgba(180,30,30,.09); border: .5px solid var(--hair-red2); position: relative; transition: background .2s; flex-shrink: 0; }
.gm__sb-toggle.is-on { background: var(--crimson-b); border-color: var(--crimson-b); }
.gm__sb-toggle-thumb { position: absolute; top: 2px; left: 2px; width: 12px; height: 12px; border-radius: 50%; background: var(--void); transition: left .2s var(--ease); box-shadow: 0 1px 4px rgba(0,0,0,.4); }
.gm__sb-toggle.is-on .gm__sb-toggle-thumb { left: 16px; }
.gm__sb-toggle-row span { font-size: 10px; color: var(--silk3); }

.gm__sb-apply {
  position: relative; overflow: hidden; background: transparent; border: .5px solid var(--crimson-h);
  font-family: var(--f-mono); font-size: 7px; letter-spacing: 3px; text-transform: uppercase;
  color: var(--crimson-h); padding: 9px; cursor: pointer; width: 100%; margin-top: 10px; transition: color .45s; z-index: 0;
}
.gm__sb-apply::before { content: ''; position: absolute; inset: 0; background: var(--crimson); transform: scaleX(0); transform-origin: left; transition: transform .5s var(--ease); z-index: -1; }
.gm__sb-apply:hover::before { transform: scaleX(1); }
.gm__sb-apply:hover { color: var(--silk); }

.gm__sb-limpar {
  background: none; border: .5px solid var(--hair2); padding: 7px;
  font-family: var(--f-mono); font-size: 6px; letter-spacing: 3px; color: var(--silk4);
  cursor: pointer; width: calc(100% - 32px); margin: 10px 16px 16px; transition: all .2s; text-transform: uppercase; display: block;
}
.gm__sb-limpar:hover { border-color: var(--hair); color: var(--gold); }
.gm__sb-empty { display: flex; flex-direction: column; align-items: center; gap: 5px; padding: 12px 0; color: var(--silk4); font-size: 9px; opacity: .5; text-align: center; }

/* Top Guerreiros */
.gm__rank-list { display: flex; flex-direction: column; gap: 4px; }
.gm__rank-row  { display: flex; align-items: center; gap: 7px; padding: 5px 6px; border: .5px solid transparent; transition: all .2s; }
.gm__rank-row:hover { background: rgba(180,30,30,.05); border-color: var(--hair-red2); }
.gm__rank-pos { font-family: var(--f-mono); font-size: 8px; color: var(--gold); width: 20px; flex-shrink: 0; opacity: .5; }
.gm__rank-pos--1 { opacity: 1; color: var(--gold2); font-size: 10px; }
.gm__rank-nome { flex: 1; font-family: var(--f-title); font-size: 9px; color: var(--silk2); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.gm__rank-bar-wrap { width: 44px; height: 1.5px; background: rgba(235,228,218,.05); flex-shrink: 0; }
.gm__rank-bar-fill { height: 100%; background: linear-gradient(90deg, var(--crimson), var(--crimson-b)); }
.gm__rank-pts { font-family: var(--f-mono); font-size: 7px; color: var(--silk4); width: 32px; text-align: right; flex-shrink: 0; }
.gm__rank-pts--gold { color: var(--gold); }

/* Wishlist sidebar */
.gm__sb-wl { display: flex; flex-direction: column; gap: 3px; }
.gm__sb-wl-item { display: flex; align-items: center; gap: 7px; padding: 5px 6px; border: .5px solid transparent; transition: all .2s; cursor: pointer; }
.gm__sb-wl-item:hover { background: rgba(180,30,30,.05); border-color: var(--hair-red2); }
.gm__sb-wl-img { width: 28px; height: 28px; flex-shrink: 0; background: var(--void); border: .5px solid var(--hair-red2); position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center; }
.gm__sb-wl-img img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 2; }
.gm__sb-wl-fb { font-family: var(--f-title); font-size: .8rem; color: var(--crimson); opacity: .3; z-index: 1; }
.gm__sb-wl-info { flex: 1; overflow: hidden; }
.gm__sb-wl-nome { font-size: 9px; color: var(--silk3); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.gm__sb-wl-preco { font-family: var(--f-title); font-size: 9px; color: var(--crimson-h); margin-top: 1px; }
.gm__sb-wl-x { background: none; border: none; color: var(--silk4); cursor: pointer; font-size: 9px; padding: 2px; transition: color .2s; }
.gm__sb-wl-x:hover { color: #ef4444; }

/* ══════════════════════════════════════════════════════
   CATÁLOGO
══════════════════════════════════════════════════════ */
.gm__catalogo { padding: 24px 28px; overflow-x: hidden; position: relative; z-index: 2; }
.gm__btn-filtros-m {
  display: none; align-items: center; gap: 7px;
  background: var(--deep); border: .5px solid var(--hair-red2);
  padding: 9px 14px; font-family: var(--f-mono); font-size: 8px; letter-spacing: 3px;
  color: var(--silk3); cursor: pointer; margin-bottom: 18px; transition: all .2s; position: relative;
}
.gm__btn-filtros-m:hover { border-color: var(--crimson-h); color: var(--crimson-b); }
.gm__btn-filtros-badge { position: absolute; top: -4px; right: -4px; width: 10px; height: 10px; background: var(--crimson-b); border-radius: 50%; border: 1px solid var(--void); }

/* Erro */
.gm__cat-erro { display: flex; flex-direction: column; align-items: center; gap: 14px; padding: 72px 0; font-size: 12px; color: rgba(239,68,68,.75); text-align: center; }

/* Vazio */
.gm__cat-vazio { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; padding: 80px 40px; text-align: center; }
.gm__vazio-ico {
  width: 70px; height: 70px; border: .5px solid var(--hair-red2);
  display: flex; align-items: center; justify-content: center; position: relative;
  clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px));
}
.gm__vazio-ico::before { content: ''; position: absolute; top: -1px; left: -1px; width: 12px; height: 12px; border-top: .5px solid var(--crimson-b); border-left: .5px solid var(--crimson-b); }
.gm__vazio-ico::after  { content: ''; position: absolute; bottom: -1px; right: -1px; width: 12px; height: 12px; border-bottom: .5px solid var(--crimson-b); border-right: .5px solid var(--crimson-b); }
.gm__vazio-kanji { font-family: var(--f-jp); font-size: 30px; color: var(--crimson-b); opacity: .35; line-height: 1; }
.gm__vazio-titulo { font-family: var(--f-title); font-size: 9px; font-weight: 600; letter-spacing: .4em; text-transform: uppercase; color: var(--silk3); }
.gm__vazio-sub    { font-size: 11px; font-weight: 300; color: var(--silk4); line-height: 1.7; max-width: 220px; }

/* ══════════════════════════════════════════════════════
   GRID
══════════════════════════════════════════════════════ */
.gm__grid--grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(220px,1fr));
  gap: 0; border-top: .5px solid var(--hair-red2); border-left: .5px solid var(--hair-red2);
}

/* ══════════════════════════════════════════════════════
   CARD
══════════════════════════════════════════════════════ */
.gm__card {
  background: var(--deep); border-right: .5px solid var(--hair-red2); border-bottom: .5px solid var(--hair-red2);
  overflow: hidden; cursor: pointer; display: flex; flex-direction: column; position: relative;
  transform: translateY(12px); opacity: 0;
  animation: cardReveal .7s var(--card-delay, 0ms) var(--ease) forwards;
  transition: border-color .3s, box-shadow .35s, background .3s;
  transform-style: preserve-3d; will-change: transform;
}
@keyframes cardReveal { to{opacity:1;transform:translateY(0)} }
.gm__card:hover {
  background: rgba(139,14,14,.025);
  box-shadow: 0 8px 32px rgba(180,30,30,.08), 0 2px 8px rgba(0,0,0,.3),
              inset 0 0 0 .5px rgba(180,30,30,.18);
  border-color: rgba(180,30,30,.3);
}
.gm__card--esgotado { opacity: .5; }

/* Clip angular samurai */
.gm__card-clip {
  position: absolute; top: 0; right: 0; width: 0; height: 0; border-style: solid;
  border-width: 0 22px 22px 0; border-color: transparent var(--void) transparent transparent;
  z-index: 5; pointer-events: none;
}
.gm__card-clip-line {
  position: absolute; top: 0; right: 22px; width: 0; height: 0; border-style: solid;
  border-width: 0 0 22px 22px; border-color: transparent transparent rgba(180,30,30,.18) transparent;
  z-index: 4; pointer-events: none; transition: border-bottom-color .3s;
}
.gm__card:hover .gm__card-clip-line { border-bottom-color: rgba(180,30,30,.55); }

.gm__card-corner { position: absolute; z-index: 5; width: 10px; height: 10px; border-color: rgba(200,160,64,0); border-style: solid; pointer-events: none; transition: border-color .3s; }
.gm__card-corner--tl { top: 6px; left: 6px; border-width: 1px 0 0 1px; }
.gm__card-corner--br { bottom: 6px; right: 6px; border-width: 0 1px 1px 0; }
.gm__card:hover .gm__card-corner { border-color: rgba(200,160,64,.35); }

.gm__card-num { position: absolute; top: 8px; left: 10px; z-index: 4; font-family: var(--f-jp); font-size: 11px; color: var(--gold); opacity: .2; line-height: 1; pointer-events: none; transition: opacity .3s; }
.gm__card:hover .gm__card-num { opacity: .5; }

/* Tier badge */
.gm__tier-badge {
  position: absolute; top: 8px; left: 8px; z-index: 6;
  font-family: var(--f-mono); font-size: 6px; letter-spacing: 2px;
  padding: 2px 7px; text-transform: uppercase; font-weight: 700;
}
.gm__tier-badge--s { background: linear-gradient(135deg,var(--blood),var(--crimson-b)); color: rgba(235,228,218,.92); border-left: 2px solid var(--gold); }
.gm__tier-badge--a { background: rgba(180,30,30,.15); color: var(--crimson-b); border: .5px solid rgba(180,30,30,.45); }
.gm__tier-badge--b { background: rgba(235,228,218,.03); color: var(--silk3); border: .5px solid var(--hair-red2); }
.gm__tier-badge--c { background: transparent; color: var(--silk4); border: .5px solid var(--hair2); opacity: .5; }

/* Imagem */
.gm__card-img-wrap { position: relative; aspect-ratio: 4/3; overflow: hidden; flex-shrink: 0; }
.gm__card-fallback {
  position: absolute; inset: 0; z-index: 0;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px;
  background: linear-gradient(135deg, var(--deep) 0%, rgba(139,14,14,.04) 60%, rgba(200,160,64,.02) 100%);
  pointer-events: none;
}
.gm__card-fb-letra { font-family: var(--f-display); font-size: 2.6rem; font-weight: 900; color: var(--crimson); opacity: .16; line-height: 1; }
.gm__card-fb-kanji { font-family: var(--f-jp); font-size: 1rem; font-weight: 200; color: var(--gold); opacity: .1; letter-spacing: 3px; }
.gm__card-fb-cat   { font-family: var(--f-mono); font-size: 5px; letter-spacing: 4px; text-transform: uppercase; color: var(--silk4); }

/* Scanline na imagem */
.gm__card-scan {
  position: absolute; top: 0; left: 0; right: 0; height: 1.5px;
  background: linear-gradient(90deg, transparent, var(--crimson-b), transparent);
  opacity: .3; z-index: 2; animation: cardScanLine 3.5s linear infinite; pointer-events: none;
}
@keyframes cardScanLine { 0%{transform:translateY(0);opacity:.35} 90%{opacity:.15} 100%{transform:translateY(400px);opacity:0} }

.gm__card-img { position: absolute; inset: 0; z-index: 1; width: 100%; height: 100%; object-fit: cover; object-position: center top; display: block; transition: transform .7s var(--ease); }
.gm__card:hover .gm__card-img { transform: scale(1.06); }
.gm__card-shine { position: absolute; inset: 0; z-index: 4; pointer-events: none; opacity: 0; }
.gm__card-overlay { position: absolute; inset: 0; background: rgba(4,3,10,.52); z-index: 3; display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity .35s; }
.gm__card:hover .gm__card-overlay { opacity: 1; }
.gm__card-overlay-txt { font-family: var(--f-title); font-size: 7.5px; letter-spacing: 5px; color: var(--gold); text-transform: uppercase; transform: translateY(6px); transition: transform .35s; }
.gm__card:hover .gm__card-overlay-txt { transform: translateY(0); }
.gm__card-urgencia { position: absolute; bottom: 8px; left: 8px; z-index: 4; font-family: var(--f-mono); font-size: 6px; letter-spacing: 1.5px; text-transform: uppercase; background: rgba(0,0,0,.78); border: .5px solid rgba(239,68,68,.4); color: rgba(239,68,68,.88); padding: 3px 8px; }

/* Badges */
.gm__badge { position: absolute; top: 10px; left: 10px; z-index: 4; font-family: var(--f-title); font-size: 6px; font-weight: 700; letter-spacing: 2px; padding: 3px 8px; text-transform: uppercase; }
.gm__badge--dest { background: var(--crimson); color: var(--silk); border-left: 2px solid var(--gold); }
.gm__badge--rgb  { background: rgba(200,160,64,.12); color: var(--gold); border: .5px solid var(--gold-dim); }
.gm__badge--esgo { background: rgba(0,0,0,.72); border: .5px solid var(--hair2); color: var(--silk4); }

/* Quick actions */
.gm__card-quick { position: absolute; top: 10px; right: 10px; z-index: 4; display: flex; flex-direction: column; gap: 4px; opacity: 0; transform: translateX(6px); transition: opacity .25s, transform .25s; }
.gm__card:hover .gm__card-quick { opacity: 1; transform: translateX(0); }
.gm__quick-btn {
  width: 26px; height: 26px; background: rgba(4,3,10,.7); backdrop-filter: blur(5px);
  border: .5px solid var(--hair-red2); display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: all .25s; color: var(--crimson-h);
}
.gm__quick-btn:hover, .gm__quick-btn.is-active { border-color: var(--crimson-h); background: rgba(180,30,30,.28); transform: scale(1.08); }

/* Card info */
.gm__card-info { padding: 14px 16px 16px; display: flex; flex-direction: column; gap: 2px; flex: 1; }
.gm__card-cat   { font-family: var(--f-title); font-size: 7px; letter-spacing: .5em; text-transform: uppercase; color: var(--crimson-b); opacity: .75; }
.gm__card-marca { font-family: var(--f-mono); font-size: 6.5px; letter-spacing: 3px; color: var(--gold-dim); text-transform: uppercase; }
.gm__card-nome  { font-family: var(--f-title); font-size: 12.5px; font-weight: 600; color: var(--silk); line-height: 1.35; min-height: 2.7em; flex: 1; letter-spacing: .02em; }

/* XP Bar */
.gm__xp-wrap { margin-bottom: 6px; }
.gm__xp-label { display: flex; justify-content: space-between; font-family: var(--f-mono); font-size: 6.5px; letter-spacing: 1.5px; text-transform: uppercase; color: var(--silk3); margin-bottom: 3px; }
.gm__xp-label span:last-child { color: var(--gold); }
.gm__xp-track { height: 2px; background: rgba(235,228,218,.06); position: relative; overflow: hidden; }
.gm__xp-fill  { height: 100%; background: linear-gradient(90deg, var(--blood), var(--crimson-b), var(--ember2)); position: relative; transition: width .6s var(--ease); }
.gm__xp-fill::after { content: ''; position: absolute; right: -1px; top: -2px; width: 4px; height: 6px; background: var(--gold); opacity: .9; }

/* Card bottom */
.gm__card-bottom { display: flex; align-items: flex-end; justify-content: space-between; margin-top: auto; padding-top: 10px; border-top: .5px solid var(--hair-red2); }
.gm__card-preco  { font-family: var(--f-title); font-size: 1.15rem; color: var(--crimson-b); font-weight: 700; }
.gm__card-parcela{ font-family: var(--f-mono); font-size: 7.5px; color: var(--gold-dim); margin-top: 2px; }
.gm__card-bottom-right { display: flex; align-items: center; gap: 6px; }
.gm__ping-indicator { display: flex; align-items: center; }
.gm__ping-dot { width: 5px; height: 5px; border-radius: 50%; background: #4ade80; animation: dotBlink 1.3s ease-in-out infinite; }

.gm__card-add {
  position: relative; overflow: hidden; width: 34px; height: 34px; flex-shrink: 0;
  background: transparent; border: .5px solid var(--crimson-h); color: var(--crimson-b);
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  transition: color .45s; z-index: 0;
  clip-path: polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px));
}
.gm__card-add-fill { position: absolute; inset: 0; background: var(--crimson); transform: scale(0); transform-origin: center; border-radius: 50%; transition: transform .4s var(--ease); z-index: -1; }
.gm__card-add:hover:not(:disabled) .gm__card-add-fill,
.gm__card-add.is-added .gm__card-add-fill { transform: scale(1.6); border-radius: 0; }
.gm__card-add:hover:not(:disabled), .gm__card-add.is-added { color: var(--silk); border-color: var(--crimson-b); }
.gm__card-add:disabled { opacity: .2; cursor: not-allowed; }
.gm__card-add svg { position: relative; z-index: 1; }

/* Skeleton */
.gm__card--skel { pointer-events: none; animation: none !important; opacity: 1 !important; transform: none !important; border-right: .5px solid var(--hair-red2); border-bottom: .5px solid var(--hair-red2); }
.gm__skel-img { aspect-ratio: 4/3; background: linear-gradient(90deg, rgba(180,30,30,.04) 25%, rgba(180,30,30,.09) 50%, rgba(180,30,30,.04) 75%); background-size: 200% 100%; animation: shimmerSkel 1.8s infinite; }
.gm__sk-line  { height: 8px; border-radius: 1px; margin-bottom: 7px; background: linear-gradient(90deg, rgba(180,30,30,.04) 25%, rgba(180,30,30,.09) 50%, rgba(180,30,30,.04) 75%); background-size: 200% 100%; animation: shimmerSkel 1.8s infinite; }
.gm__sk-line--sm { width: 50%; }
.gm__sk-line--xs { width: 30%; }
@keyframes shimmerSkel { from{background-position:0% 50%} to{background-position:200% 50%} }

/* ══════════════════════════════════════════════════════
   KILL FEED — FIX: 7 colunas alinhadas (num|img|body|specs|tier|preco|acao)
══════════════════════════════════════════════════════ */
.gm__killfeed { border-top: .5px solid var(--hair-red2); }

/* Coluna img = 48px, correspondendo à .gm__kf-img */
.gm__kf-header {
  display: grid;
  grid-template-columns: 34px 48px 1fr 180px 66px 84px 128px;
  gap: 0; padding: 6px 14px; border-bottom: .5px solid rgba(180,30,30,.22);
  background: rgba(180,30,30,.04);
}
.gm__kf-header span { font-family: var(--f-mono); font-size: 6px; letter-spacing: 3px; text-transform: uppercase; color: var(--gold); opacity: .5; padding: 0 8px; }
.gm__kf-header span:first-child { padding-left: 0; }
/* img col header não precisa de label visível */
.gm__kf-hd-img { opacity: 0 !important; padding: 0 !important; }

.gm__kf-row {
  display: grid;
  grid-template-columns: 34px 48px 1fr 180px 66px 84px 128px;
  gap: 0; border-bottom: .5px solid var(--hair-red2); align-items: center;
  cursor: pointer; position: relative; overflow: hidden; transition: background .2s;
  transform: translateX(-8px); opacity: 0;
  animation: kfReveal .5s var(--card-delay, 0ms) var(--ease) forwards;
}
@keyframes kfReveal { to{opacity:1;transform:translateX(0)} }
.gm__kf-row:last-child { border-bottom: none; }
.gm__kf-row:hover { background: rgba(180,30,30,.03); }
.gm__kf-row--destaque { background: rgba(180,30,30,.045); }
.gm__kf-row--destaque::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 2px; background: var(--crimson-b); }
.gm__kf-row--esgotado { opacity: .5; }
.gm__kf-row-scan { position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg,transparent,var(--crimson-b),transparent); opacity: 0; pointer-events: none; transition: opacity .2s; }
.gm__kf-row:hover .gm__kf-row-scan { opacity: .3; }

.gm__kf-num  { font-family: var(--f-mono); font-size: 9px; color: var(--gold); opacity: .4; padding: 14px 0 14px 14px; }
.gm__kf-img  { width: 48px; height: 48px; flex-shrink: 0; position: relative; overflow: hidden; background: var(--void); display: flex; align-items: center; justify-content: center; }
.gm__kf-img-fb { font-family: var(--f-display); font-size: 1.3rem; color: var(--crimson); opacity: .2; position: absolute; }
.gm__kf-img img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 2; }
.gm__kf-body { padding: 14px 12px; }
.gm__kf-cat  { font-family: var(--f-mono); font-size: 6.5px; letter-spacing: 2px; color: var(--silk3); text-transform: uppercase; margin-bottom: 3px; }
.gm__kf-nome { font-family: var(--f-title); font-size: 12px; font-weight: 600; color: var(--silk); letter-spacing: .02em; }
.gm__kf-specs { padding: 14px 8px; display: flex; flex-direction: column; gap: 4px; }
.gm__kf-spec-tag { font-family: var(--f-mono); font-size: 6px; letter-spacing: 2px; text-transform: uppercase; background: rgba(200,160,64,.09); color: var(--gold); border: .5px solid rgba(200,160,64,.22); padding: 2px 6px; display: inline-block; width: fit-content; }
.gm__kf-spec-tag--dest { background: rgba(180,30,30,.1); color: var(--crimson-b); border-color: rgba(180,30,30,.3); }
.gm__kf-desc { font-family: var(--f-mono); font-size: 7.5px; color: var(--silk4); letter-spacing: .5px; line-height: 1.5; margin-top: 2px; }
.gm__kf-tier { padding: 14px 8px; display: flex; flex-direction: column; align-items: center; gap: 6px; }
.gm__kf-tier-badge { font-family: var(--f-mono); font-size: 10px; font-weight: 700; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; }
.gm__kf-tier-badge--s { background: linear-gradient(135deg,var(--blood),var(--crimson-b)); color: rgba(235,228,218,.9); }
.gm__kf-tier-badge--a { background: rgba(180,30,30,.15); color: var(--crimson-b); border: .5px solid rgba(180,30,30,.4); }
.gm__kf-tier-badge--b { background: rgba(235,228,218,.03); color: var(--silk3); border: .5px solid var(--hair2); }
.gm__kf-tier-badge--c { background: transparent; color: var(--silk4); border: .5px solid var(--hair2); }
.gm__kf-xp-mini { width: 46px; height: 1.5px; background: rgba(235,228,218,.06); }
.gm__kf-xp-fill { height: 100%; background: linear-gradient(90deg, var(--crimson), var(--crimson-b)); }
.gm__kf-preco-wrap { padding: 14px 8px; }
.gm__kf-preco   { font-family: var(--f-title); font-size: 13px; font-weight: 700; color: var(--crimson-b); }
.gm__kf-parcela { font-family: var(--f-mono); font-size: 7px; color: var(--gold-dim); margin-top: 2px; }
.gm__kf-acao { padding: 14px; display: flex; align-items: center; gap: 5px; flex-wrap: wrap; }
.gm__kf-status { display: flex; align-items: center; gap: 4px; font-family: var(--f-mono); font-size: 6px; letter-spacing: 1.5px; color: var(--silk4); flex-basis: 100%; margin-bottom: 4px; }
.gm__kf-status-dot { width: 4px; height: 4px; border-radius: 50%; background: var(--silk4); flex-shrink: 0; }
.gm__kf-status--on .gm__kf-status-dot  { background: #4ade80; animation: dotBlink 1.3s ease-in-out infinite; }
.gm__kf-status--on  { color: rgba(74,222,128,.7); }
.gm__kf-status--off .gm__kf-status-dot { background: rgba(239,68,68,.65); }
.gm__kf-status--off { color: rgba(239,68,68,.5); }
.gm__kf-add, .gm__kf-wish {
  width: 28px; height: 28px; background: transparent; border: .5px solid var(--hair-red2);
  color: var(--crimson-b); cursor: pointer; display: flex; align-items: center; justify-content: center;
  transition: all .25s; position: relative; overflow: hidden;
}
.gm__kf-add:hover:not(:disabled), .gm__kf-add.is-added { background: var(--crimson); border-color: var(--crimson-b); color: var(--silk); }
.gm__kf-add:disabled { opacity: .2; cursor: not-allowed; }
.gm__kf-wish:hover, .gm__kf-wish.is-active { background: rgba(180,30,30,.22); border-color: var(--crimson-h); color: var(--crimson-b); }

/* ══════════════════════════════════════════════════════
   PAGINAÇÃO
══════════════════════════════════════════════════════ */
.gm__pag-sep { display: flex; align-items: center; gap: 16px; margin: 44px 0 24px; }
.gm__pag-sep-line { flex: 1; height: .5px; background: linear-gradient(90deg, transparent, rgba(180,30,30,.22)); }
.gm__pag-sep-line--r { background: linear-gradient(to left, transparent, rgba(180,30,30,.22)); }
.gm__pag-sep-kanji { font-family: var(--f-jp); font-size: 12px; font-weight: 200; color: var(--gold); opacity: .28; flex-shrink: 0; line-height: 1; }
.gm__paginacao { display: flex; justify-content: center; align-items: center; gap: 5px; margin-bottom: 12px; }
.gm__pag-btn {
  width: 36px; height: 36px; background: transparent; border: .5px solid var(--hair-red2);
  color: var(--silk4); cursor: pointer; font-family: var(--f-title); font-size: 10px;
  display: flex; align-items: center; justify-content: center; transition: all .25s; position: relative; overflow: hidden;
}
.gm__pag-btn::before { content: ''; position: absolute; inset: 0; background: var(--crimson); transform: scaleX(0); transform-origin: left; transition: transform .4s var(--ease); z-index: -1; }
.gm__pag-btn:hover:not(:disabled)::before { transform: scaleX(1); }
.gm__pag-btn:hover:not(:disabled) { color: var(--silk); border-color: var(--crimson-b); }
.gm__pag-btn.is-active { background: rgba(180,30,30,.14); border-color: var(--crimson-b); color: var(--crimson-b); }
.gm__pag-btn--arrow { font-size: 14px; }
.gm__pag-btn:disabled { opacity: .18; cursor: not-allowed; }
.gm__pag-ellipsis { font-family: var(--f-mono); font-size: 10px; color: var(--silk4); padding: 0 4px; }
.gm__pag-info { text-align: center; margin-top: 8px; font-family: var(--f-mono); font-size: 7px; letter-spacing: 3px; color: var(--silk4); }

/* ══════════════════════════════════════════════════════
   TOAST
══════════════════════════════════════════════════════ */
.gm-toast {
  position: fixed; bottom: 24px; right: 24px; z-index: 99999;
  display: flex; align-items: center; gap: 10px; min-width: 260px; max-width: 320px;
  background: var(--deep); border: .5px solid var(--hair-red);
  padding: 13px 14px; overflow: hidden; box-shadow: 0 12px 36px rgba(0,0,0,.6);
}
.gm-toast::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: .5px; background: linear-gradient(90deg,transparent,var(--toast-accent,var(--crimson-b)),transparent); opacity: .8; }
.gm-toast--success { --toast-accent: var(--gold); }
.gm-toast--info    { --toast-accent: var(--crimson-b); }
.gm-toast--error   { --toast-accent: #ef4444; }
.gm-toast__icon { width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: color-mix(in srgb,var(--toast-accent,var(--crimson-b)) 14%,transparent); color: var(--toast-accent,var(--crimson-b)); flex-shrink: 0; }
.gm-toast__msg { flex: 1; font-family: var(--f-mono); font-size: 9px; letter-spacing: 2px; color: var(--silk3); line-height: 1.5; }
.gm-toast__close { background: none; border: none; color: var(--silk4); cursor: pointer; display: flex; align-items: center; justify-content: center; transition: color .2s; }
.gm-toast__close:hover { color: var(--gold); }
.gm-toast__progress { position: absolute; bottom: 0; left: 0; height: 1px; background: var(--toast-accent,var(--crimson-b)); opacity: .55; width: 100%; transform-origin: left; animation: toastProgress linear 1 forwards; }
@keyframes toastProgress { from{transform:scaleX(1)} to{transform:scaleX(0)} }
.toast-slide-enter-active { transition: opacity .3s, transform .4s var(--ease); }
.toast-slide-leave-active { transition: opacity .25s, transform .3s; }
.toast-slide-enter-from, .toast-slide-leave-to { opacity: 0; transform: translateX(20px) scale(.96); }

/* ══════════════════════════════════════════════════════
   MODAL
══════════════════════════════════════════════════════ */
.gm__modal-bg { position: fixed; inset: 0; z-index: 9000; background: rgba(0,0,0,.9); backdrop-filter: blur(24px); display: flex; align-items: center; justify-content: center; padding: 18px; }
.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity .3s; }
.modal-fade-enter-from,  .modal-fade-leave-to { opacity: 0; }

.gm__modal {
  background: var(--deep); border: .5px solid rgba(180,30,30,.28);
  position: relative; max-width: 1000px; width: 100%; max-height: 92vh; overflow-y: auto;
  box-shadow: 0 0 0 1px var(--hair-red2), 0 60px 120px rgba(0,0,0,.75), 0 0 70px rgba(180,30,30,.07);
  scrollbar-width: thin; scrollbar-color: rgba(180,30,30,.18) transparent;
  /* clip samurai dos cantos */
  clip-path: polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px));
}
.gm__modal::-webkit-scrollbar { width: 4px; }
.gm__modal::-webkit-scrollbar-thumb { background: rgba(180,30,30,.22); }

.gm__modal-kamon { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); font-family: var(--f-jp); font-size: 200px; font-weight: 200; color: var(--crimson); opacity: .018; pointer-events: none; z-index: 0; user-select: none; line-height: 1; }
.gm__modal-realm-line { position: absolute; top: 0; left: 0; right: 0; height: .5px; background: linear-gradient(90deg,transparent,var(--gold2) 20%,var(--crimson-b) 50%,var(--gold2) 80%,transparent); opacity: .75; z-index: 2; }
.gm__modal-scan { position: absolute; top: 0; left: 0; right: 0; height: 1.5px; background: linear-gradient(90deg,transparent,var(--crimson-b),transparent); opacity: .28; z-index: 3; animation: modalScan 5s ease-in-out infinite; pointer-events: none; }
@keyframes modalScan { 0%,100%{top:0;opacity:.35} 50%{top:calc(100% - 1.5px);opacity:.08} }

.gm__mc { position: absolute; z-index: 10; width: 22px; height: 22px; border-color: rgba(200,160,64,.22); border-style: solid; pointer-events: none; transition: border-color .4s; }
.gm__mc--tl { top: 10px; left: 10px; border-width: 1.5px 0 0 1.5px; }
.gm__mc--tr { top: 10px; right: 10px; border-width: 1.5px 1.5px 0 0; }
.gm__mc--bl { bottom: 10px; left: 10px; border-width: 0 0 1.5px 1.5px; }
.gm__mc--br { bottom: 10px; right: 10px; border-width: 0 1.5px 1.5px 0; }
.gm__modal:hover .gm__mc { border-color: rgba(200,160,64,.5); }

.gm__modal-close-fixed {
  position: fixed; top: 18px; right: 18px; z-index: 9100; width: 36px; height: 36px; border-radius: 50%;
  background: rgba(4,3,10,.94); backdrop-filter: blur(8px); border: .5px solid rgba(180,30,30,.35);
  color: var(--silk); cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all .25s;
}
.gm__modal-close-fixed:hover { background: rgba(180,30,30,.18); color: var(--crimson-b); border-color: var(--crimson-b); transform: scale(1.08) rotate(90deg); }

.gm__modal-layout { display: grid; grid-template-columns: 50% 50%; position: relative; z-index: 1; min-height: 520px; }

/* Col imagem */
.gm__modal-img-col { display: flex; flex-direction: column; background: rgba(0,0,0,.18); border-right: .5px solid rgba(180,30,30,.08); }
.gm__modal-viewer  { position: relative; flex: 1; min-height: 320px; overflow: hidden; background: var(--void); }
.gm__modal-fallback {
  position: absolute; inset: 0; z-index: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px;
  background: linear-gradient(135deg, var(--void) 0%, rgba(139,14,14,.03) 60%, rgba(200,160,64,.015) 100%); pointer-events: none;
}
.gm__mf-letra { font-family: var(--f-display); font-size: 4.5rem; font-weight: 900; color: var(--crimson); opacity: .13; }
.gm__mf-kanji { font-family: var(--f-jp); font-size: 1.1rem; font-weight: 200; color: var(--gold); opacity: .1; letter-spacing: 6px; }
.gm__mf-cat   { font-family: var(--f-mono); font-size: 7px; letter-spacing: 5px; text-transform: uppercase; color: var(--crimson); opacity: .18; }

.gm__modal-img { position: absolute; inset: 0; z-index: 2; width: 100%; height: 100%; object-fit: contain; padding: 14px; box-sizing: border-box; transition: transform .8s var(--ease); cursor: zoom-in; }
.gm__modal-img.is-zoom { transform: scale(1.85); cursor: zoom-out; z-index: 5; }
.gm__modal-zoom-hint { position: absolute; bottom: 10px; right: 10px; z-index: 6; font-family: var(--f-mono); font-size: 7px; letter-spacing: 2px; color: var(--silk4); background: rgba(0,0,0,.65); padding: 3px 8px; display: flex; align-items: center; gap: 4px; opacity: .65; pointer-events: none; }
.gm__modal-badges { position: absolute; top: 12px; left: 12px; z-index: 6; display: flex; flex-direction: column; gap: 4px; }
.gm__modal-badge { font-family: var(--f-title); font-size: 6.5px; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase; padding: 3px 8px; display: inline-flex; align-items: center; gap: 4px; }
.gm__modal-badge--dest { background: var(--crimson); color: var(--silk); border-left: 2px solid var(--gold); }
.gm__modal-badge--rgb  { background: rgba(200,160,64,.1); color: var(--gold); border: .5px solid var(--gold-dim); }
.gm__modal-badge--esgo { background: rgba(0,0,0,.75); border: .5px solid var(--hair2); color: var(--silk4); }

/* Tier strip */
.gm__modal-tier-strip { position: absolute; bottom: 0; left: 0; right: 0; z-index: 6; background: rgba(4,3,10,.88); border-top: .5px solid var(--hair-red2); padding: 8px 12px; display: flex; align-items: center; gap: 12px; }
.gm__modal-tier { font-family: var(--f-mono); font-size: 6.5px; letter-spacing: 2px; font-weight: 700; padding: 2px 8px; flex-shrink: 0; }
.gm__modal-tier--s { background: linear-gradient(135deg,var(--blood),var(--crimson-b)); color: rgba(235,228,218,.92); border-left: 2px solid var(--gold); }
.gm__modal-tier--a { background: rgba(180,30,30,.15); color: var(--crimson-b); border: .5px solid rgba(180,30,30,.4); }
.gm__modal-tier--b { background: rgba(235,228,218,.03); color: var(--silk3); border: .5px solid var(--hair2); }
.gm__modal-tier--c { background: transparent; color: var(--silk4); border: .5px solid var(--hair2); }
.gm__modal-xp-wrap { flex: 1; }
.gm__modal-xp-label { display: flex; justify-content: space-between; font-family: var(--f-mono); font-size: 6px; letter-spacing: 1.5px; color: var(--silk3); margin-bottom: 3px; }
.gm__modal-xp-label span:last-child { color: var(--gold); }
.gm__modal-xp-track { height: 2px; background: rgba(235,228,218,.06); }
.gm__modal-xp-fill  { height: 100%; background: linear-gradient(90deg, var(--blood), var(--crimson-b), var(--ember2)); position: relative; }
.gm__modal-xp-fill::after { content: ''; position: absolute; right: -1px; top: -2px; width: 4px; height: 6px; background: var(--gold); opacity: .9; }

/* Thumbs */
.gm__modal-thumbs { display: flex; gap: 4px; padding: 8px 10px 10px; border-top: .5px solid rgba(180,30,30,.06); background: rgba(0,0,0,.12); flex-wrap: wrap; }
.gm__modal-thumb { width: 54px; flex-shrink: 0; border: .5px solid var(--hair-red2); background: var(--void); cursor: pointer; display: flex; flex-direction: column; align-items: center; overflow: hidden; transition: all .25s; padding: 0; }
.gm__modal-thumb:hover { border-color: var(--hair-red); }
.gm__modal-thumb.is-active { border-color: var(--crimson-b); box-shadow: 0 0 0 1px rgba(180,30,30,.22); }
.gm__modal-thumb img { width: 100%; height: 38px; object-fit: cover; display: block; }
.gm__modal-thumb-fb { width: 100%; height: 38px; display: flex; align-items: center; justify-content: center; font-family: var(--f-display); font-size: .9rem; color: var(--crimson); opacity: .3; }

/* Col info */
.gm__modal-info { padding: 32px 28px 24px; display: flex; flex-direction: column; background: var(--deep); position: relative; overflow: hidden; }
.gm__modal-ornament { display: flex; align-items: center; gap: 10px; margin-bottom: 18px; }
.gm__mo-line { flex: 1; height: .5px; background: linear-gradient(90deg, var(--crimson-b), transparent); opacity: .22; }
.gm__mo-line--r { background: linear-gradient(270deg, var(--crimson-b), transparent); }
.gm__mo-kanji { font-family: var(--f-jp); font-size: 15px; color: var(--gold); opacity: .28; line-height: 1; flex-shrink: 0; }
.gm__modal-eyebrow { display: flex; align-items: center; gap: 8px; margin-bottom: 10px; }
.gm__mey-dot { width: 4px; height: 4px; border-radius: 50%; background: var(--crimson-b); opacity: .85; flex-shrink: 0; }
.gm__mey-txt { font-family: var(--f-title); font-size: 7px; letter-spacing: 6px; font-weight: 700; text-transform: uppercase; background: linear-gradient(135deg,var(--gold),var(--gold2)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.gm__modal-titulo { font-family: var(--f-title); font-size: clamp(1.3rem,2vw,1.9rem); font-weight: 700; color: var(--silk); line-height: 1.1; margin-bottom: 5px; letter-spacing: .03em; }
.gm__modal-marca  { font-family: var(--f-mono); font-size: 8px; letter-spacing: 3px; color: var(--silk4); text-transform: uppercase; }
.gm__modal-marca strong { color: var(--gold-dim); font-weight: 400; }

/* Ping row */
.gm__modal-ping-row { display: flex; align-items: center; gap: 14px; padding: 8px 0; margin: 4px 0; border-top: .5px solid var(--hair-red2); border-bottom: .5px solid var(--hair-red2); flex-wrap: wrap; }
.gm__modal-ping-item { display: flex; align-items: center; gap: 5px; }
.gm__modal-ping-dot { width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; }
.gm__modal-ping-dot--green { background: #4ade80; animation: dotBlink 1.3s ease-in-out infinite; }
.gm__modal-ping-label { font-family: var(--f-mono); font-size: 7px; letter-spacing: 2px; text-transform: uppercase; color: var(--silk4); }

.gm__modal-divider { display: flex; align-items: center; gap: 10px; margin: 16px 0; }
.gm__md-line { flex: 1; height: .5px; background: linear-gradient(90deg, transparent, rgba(180,30,30,.35)); }
.gm__md-line--r { background: linear-gradient(to left, transparent, rgba(180,30,30,.35)); }
.gm__md-gem { font-size: 6px; color: rgba(200,160,64,.45); }

.gm__modal-desc { font-size: 11.5px; color: var(--silk4); line-height: 1.9; margin-bottom: 18px; font-weight: 300; }

/* Specs */
.gm__modal-specs { margin-bottom: 18px; }
.gm__specs-hd { font-family: var(--f-mono); font-size: 6px; letter-spacing: 5px; text-transform: uppercase; color: var(--gold); opacity: .6; margin-bottom: 10px; display: flex; align-items: center; gap: 7px; }
.gm__specs-line { flex: 1; height: .5px; background: linear-gradient(to right, rgba(180,30,30,.22), transparent); }
.gm__specs-kanji { font-family: var(--f-jp); font-size: 14px; font-weight: 200; color: var(--crimson-b); opacity: .65; letter-spacing: 0; line-height: 1; }
.gm__specs-list { display: flex; flex-direction: column; }
.gm__spec-row { display: flex; align-items: baseline; gap: 7px; padding: 7px 0; border-bottom: .5px solid rgba(180,30,30,.06); transition: background .2s, padding-left .2s; }
.gm__spec-row:first-child { border-top: .5px solid rgba(180,30,30,.06); }
.gm__spec-row:hover { background: rgba(180,30,30,.025); padding-left: 5px; }
.gm__spec-k    { font-family: var(--f-mono); font-size: 7px; letter-spacing: 2px; text-transform: uppercase; color: var(--gold-dim); white-space: nowrap; flex-shrink: 0; width: 90px; }
.gm__spec-dots { flex: 1; height: .5px; min-width: 10px; background: repeating-linear-gradient(90deg, rgba(180,30,30,.18) 0, rgba(180,30,30,.18) 2px, transparent 2px, transparent 5px); margin-bottom: 1px; }
.gm__spec-v    { font-size: 11px; color: var(--silk3); text-align: right; }

/* Cores */
.gm__modal-variant { margin-bottom: 16px; padding-top: 14px; border-top: .5px solid rgba(180,30,30,.06); }
.gm__modal-opt-lbl { font-family: var(--f-mono); font-size: 6px; letter-spacing: 4px; text-transform: uppercase; color: var(--gold); opacity: .68; margin-bottom: 10px; display: flex; align-items: center; gap: 8px; }
.gm__modal-sel  { font-style: normal; color: var(--silk3); font-size: 7px; letter-spacing: 2px; opacity: .8; }
.gm__modal-swatches { display: flex; gap: 8px; flex-wrap: wrap; }
.gm__modal-swatch { width: 22px; height: 22px; border-radius: 50%; border: 1.5px solid transparent; cursor: pointer; transition: transform .25s, box-shadow .25s, border-color .25s; }
.gm__modal-swatch:hover { transform: scale(1.15); }
.gm__modal-swatch.is-active { border-color: var(--gold); box-shadow: 0 0 0 2px rgba(0,0,0,.5), 0 0 10px var(--sw-color,var(--crimson-b)); transform: scale(1.08); }

/* Quantidade */
.gm__modal-qty-wrap { margin-bottom: 16px; }
.gm__modal-qty { display: flex; align-items: center; border: .5px solid var(--hair-red2); width: fit-content; }
.gm__qty-btn { background: none; border: none; color: var(--silk3); width: 28px; height: 28px; cursor: pointer; font-size: 16px; display: flex; align-items: center; justify-content: center; transition: all .25s; line-height: 1; }
.gm__qty-btn:hover:not(:disabled) { background: var(--crimson-b); color: var(--silk); }
.gm__qty-btn:disabled { opacity: .2; cursor: not-allowed; }
.gm__qty-val { font-family: var(--f-mono); font-size: 11px; color: var(--silk); min-width: 36px; height: 28px; display: flex; align-items: center; justify-content: center; border-left: .5px solid var(--hair-red2); border-right: .5px solid var(--hair-red2); letter-spacing: .1em; }

/* Preço */
.gm__modal-preco-wrap { margin-bottom: 20px; padding: 16px 0; border-top: .5px solid rgba(180,30,30,.09); }
.gm__modal-preco-hd { display: flex; align-items: center; gap: 7px; margin-bottom: 7px; }
.gm__mp-kanji { font-family: var(--f-jp); font-size: 17px; font-weight: 200; color: var(--crimson-b); opacity: .5; line-height: 1; }
.gm__mp-lbl   { font-family: var(--f-mono); font-size: 6px; letter-spacing: 5px; text-transform: uppercase; color: var(--gold); opacity: .6; white-space: nowrap; }
.gm__mp-line  { flex: 1; height: .5px; background: linear-gradient(to right, rgba(180,30,30,.25), transparent); }
.gm__modal-preco { font-family: var(--f-display); font-size: clamp(1.7rem,3vw,2.5rem); font-weight: 900; color: var(--silk); line-height: 1; display: flex; align-items: baseline; gap: 7px; }
.gm__mp-rs    { font-family: var(--f-mono); font-size: .65em; color: var(--silk4); letter-spacing: 2px; }
.gm__modal-preco em {
  font-style: normal;
  background: linear-gradient(135deg, var(--crimson-b) 0%, var(--ember2) 50%, var(--gold) 100%);
  background-size: 200% auto;
  -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
  animation: mainShine 5s linear infinite;
}
.gm__modal-parcela { font-family: var(--f-mono); font-size: 9px; color: var(--gold-dim); margin-top: 4px; display: flex; gap: 7px; flex-wrap: wrap; }
.gm__modal-parcela span { color: rgba(180,30,30,.4); }

/* Ações */
.gm__modal-actions { display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap; }
.gm__modal-add {
  flex: 1; min-width: 160px; position: relative; overflow: hidden;
  background: transparent; border: .5px solid var(--crimson-b);
  font-family: var(--f-title); font-size: 7.5px; font-weight: 700; letter-spacing: 3.5px;
  color: var(--crimson-b); padding: 13px 18px; cursor: pointer;
  display: flex; align-items: center; justify-content: center; gap: 8px;
  transition: color .45s; z-index: 0; text-transform: uppercase;
}
.gm__modal-add-fill { position: absolute; inset: 0; background: var(--crimson); transform: scaleX(0); transform-origin: left; transition: transform .55s var(--ease); z-index: -1; }
.gm__modal-add:hover:not(:disabled) .gm__modal-add-fill { transform: scaleX(1); }
.gm__modal-add:hover:not(:disabled) { color: var(--silk); }
.gm__modal-add:disabled { opacity: .25; cursor: not-allowed; }
.gm__modal-add.is-added { border-color: var(--hair-red2); color: var(--silk3); }
.gm__modal-add.is-added .gm__modal-add-fill { transform: none; background: transparent; }
.gm__modal-icon-btn {
  width: 44px; flex-shrink: 0; background: rgba(180,30,30,.06); border: .5px solid var(--hair-red2);
  display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all .25s; color: var(--crimson-b);
}
.gm__modal-icon-btn:hover, .gm__modal-icon-btn.is-active { border-color: var(--crimson-h); background: rgba(180,30,30,.14); transform: scale(1.06); }

/* Relacionados */
.gm__modal-rel { margin-top: 20px; padding-top: 16px; border-top: .5px solid rgba(180,30,30,.06); }
.gm__modal-rel-hd { font-family: var(--f-mono); font-size: 6px; letter-spacing: 5px; text-transform: uppercase; color: var(--gold); opacity: .58; margin-bottom: 12px; display: flex; align-items: center; gap: 7px; }
.gm__rel-kanji { font-family: var(--f-jp); font-size: 12px; font-weight: 200; color: var(--crimson-b); opacity: .65; letter-spacing: 0; line-height: 1; }
.gm__rel-line  { flex: 1; height: .5px; background: linear-gradient(to right, rgba(180,30,30,.22), transparent); }
.gm__modal-rel-grid { display: grid; grid-template-columns: repeat(3,1fr); border-left: .5px solid var(--hair-red2); border-top: .5px solid var(--hair-red2); }
.gm__modal-rel-card { border-right: .5px solid var(--hair-red2); border-bottom: .5px solid var(--hair-red2); cursor: pointer; transition: background .25s; overflow: hidden; }
.gm__modal-rel-card:hover { background: rgba(180,30,30,.04); }
.gm__rel-img { height: 68px; background: var(--void); position: relative; overflow: hidden; }
.gm__rel-fb  { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-family: var(--f-display); font-size: 1.9rem; font-weight: 900; color: var(--crimson); opacity: .14; }
.gm__rel-img img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 2; transition: transform .5s; }
.gm__modal-rel-card:hover .gm__rel-img img { transform: scale(1.06); }
.gm__rel-info   { padding: 7px 10px; }
.gm__rel-nome   { font-family: var(--f-title); font-size: 9px; color: var(--silk3); line-height: 1.3; margin-bottom: 3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.gm__rel-preco  { font-family: var(--f-title); font-size: 11px; color: var(--crimson-b); font-weight: 700; }

.gm__modal-footer-note {
  display: flex; align-items: center; justify-content: center; gap: 8px;
  padding-top: 14px; border-top: .5px solid var(--hair-red2);
  font-family: var(--f-mono); font-size: 6px; letter-spacing: 3px; color: var(--silk4);
  text-transform: uppercase; margin-top: auto;
}
.gm__modal-footer-note svg { color: var(--gold); opacity: .35; flex-shrink: 0; }
.gm__fn-kanji { font-family: var(--f-jp); font-size: 13px; font-weight: 200; color: var(--gold); opacity: .32; letter-spacing: 0; line-height: 1; }

/* ══════════════════════════════════════════════════════
   TRANSIÇÕES
══════════════════════════════════════════════════════ */
.view-sw-enter-active, .view-sw-leave-active { transition: opacity .3s, transform .3s; }
.view-sw-enter-from, .view-sw-leave-to { opacity: 0; transform: translateY(7px); }
.img-fade-enter-active, .img-fade-leave-active { transition: opacity .28s, transform .28s; }
.img-fade-enter-from, .img-fade-leave-to { opacity: 0; transform: scale(.96); }

/* ══════════════════════════════════════════════════════
   RESPONSIVO
══════════════════════════════════════════════════════ */
@media (max-width:1100px) {
  .gm__hero { padding: calc(var(--navbar-h) + 44px) 44px 0; }
  .gm__hero-inner { grid-template-columns: 1fr 260px; gap: 40px; padding-left: calc(6% + 24px); }
  .gm__strip { margin: 0 -44px; padding: 0 44px; }
  .gm__kf-header,
  .gm__kf-row { grid-template-columns: 28px 44px 1fr 120px 54px 76px 104px; }
}
@media (max-width:900px) {
  .gm__hero-inner { grid-template-columns: 1fr; }
  .gm__hero-right { display: none; }
  .gm__modal-layout { grid-template-columns: 1fr; }
  .gm__modal-img-col { border-right: none; border-bottom: .5px solid rgba(180,30,30,.06); }
  .gm__modal-viewer { min-height: 260px; }
  .gm__modal-info { padding: 22px 18px 20px; }
  .gm__hud, .gm__edge-line { display: none; }
  .gm__hud-bar { grid-template-columns: repeat(2,1fr); }
  .gm__latency { flex-wrap: wrap; }
  .gm__kf-header,
  .gm__kf-row { grid-template-columns: 28px 44px 1fr 54px 76px 100px; }
  .gm__kf-specs { display: none; }
  /* esconder col specs no header também */
  .gm__kf-hd-specs { display: none; }
}
@media (max-width:768px) {
  .gm__sidebar {
    position: fixed !important; top: 0 !important; left: 0 !important; bottom: 0 !important;
    width: 290px; z-index: 99; transform: translateX(-100%);
    padding: 0; height: 100vh !important; overflow-y: auto !important;
  }
  .gm__sidebar.is-open { transform: translateX(0); }
  .gm__sb-close-m { display: block; }
  .gm__sb-overlay { display: block; }
  .gm__layout { grid-template-columns: 1fr; }
  .gm__btn-filtros-m { display: flex; }
  .gm__hero { padding: calc(var(--navbar-h) + 30px) 22px 0; }
  .gm__strip { grid-template-columns: repeat(2,1fr); margin: 0 -22px; padding: 0 22px; }
  .gm__strip-item:nth-child(2) { border-right: none; }
  .gm__strip-item:nth-child(3) { border-top: .5px solid var(--hair-red2); }
  .gm__toolbar-inner { padding: 9px 14px; }
  .gm__catalogo { padding: 18px; }
  .gm__modal-rel-grid { grid-template-columns: 1fr 1fr; }
  .gm__hud-bar { grid-template-columns: repeat(2,1fr); }
  .gm__kf-header { display: none; }
  .gm__kf-row { grid-template-columns: 28px 44px 1fr 54px 100px; }
  .gm__kf-tier, .gm__kf-preco-wrap { display: none; }
}
@media (max-width:480px) {
  .gm__hero { padding: calc(var(--navbar-h) + 24px) 16px 0; }
  .gm__hero-inner { padding-left: 0; }
  .gm__edge-line { display: none; }
  .gm__strip { grid-template-columns: 1fr 1fr; }
  .gm__grid--grid { grid-template-columns: repeat(2,1fr); }
  .gm__modal-rel-grid { grid-template-columns: 1fr; }
  .gm__hud-bar { grid-template-columns: 1fr 1fr; }
}
@media (prefers-reduced-motion: reduce) {
  .gm__t-main, .gm__modal-preco em, .gm__lat-ticker-track, .gm__kamon,
  .gm__fog--1, .gm__fog--2, .gm__ew-dot, .gm__scanlines, .gm__hud-bar-scan,
  .gm__card-scan, .gm__modal-scan, .gm__lat-b, .gm__ember,
  .gm__lslot-equipped-bar { animation: none !important; }
  .gm__card, .gm__kf-row { animation: none !important; opacity: 1 !important; transform: none !important; }
}
</style>