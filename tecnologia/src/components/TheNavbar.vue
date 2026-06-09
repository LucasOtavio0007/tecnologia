<template>
  <div class="navbar-root">

    <!-- SCROLL PROGRESS — realm-aware -->
    <div class="nb-progress" :style="{ transform: `scaleX(${scrollProgress / 100})` }" aria-hidden="true"></div>

    <!-- TOAST SYSTEM -->
<teleport to="body">
  <transition-group name="toast" tag="ul" class="toast-container" aria-live="polite" aria-atomic="false" :css="false" @enter="onToastEnter" @leave="onToastLeave">
    <li v-for="t in toasts" :key="t.id" :class="['toast', `toast--${t.type}`]" role="alert">
      <div class="toast__icon" aria-hidden="true">
        <svg v-if="t.type === 'success'" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        <svg v-else-if="t.type === 'error'" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        <svg v-else width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
      </div>
      <div class="toast__body">
        <span class="toast__title">{{ t.title }}</span>
        <span v-if="t.msg" class="toast__msg">{{ t.msg }}</span>
      </div>
      <button class="toast__close" @click="removeToast(t.id)" aria-label="Fechar">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </button>
      <div class="toast__progress" :style="{ animationDuration: t.duration + 'ms' }"></div>
    </li>
  </transition-group>
</teleport>

    <!-- NAVBAR -->
    <header
      :class="['navbar', { 'navbar--scrolled': scrolled }, { 'navbar--hidden': scrollHide }]"
      role="banner"
    >
      <div class="navbar__inner">

        <!-- ── ESQUERDA ── -->
        <div class="navbar__left">
          <button
            class="nb-burger"
            :class="{ 'is-open': sidebarOpen }"
            @click="sidebarOpen = !sidebarOpen"
            :aria-label="sidebarOpen ? 'Fechar menu' : 'Abrir menu'"
            :aria-expanded="sidebarOpen"
            aria-controls="sidebar-menu"
          >
            <span class="nb-burger__bar nb-burger__bar--1"></span>
            <span class="nb-burger__bar nb-burger__bar--2"></span>
            <span class="nb-burger__bar nb-burger__bar--3"></span>
          </button>

          <nav class="nb-links" aria-label="Navegação principal">
            <router-link
              v-for="l in allLinks" :key="l.to" :to="l.to"
              class="nb-link"
              :class="{ 'nb-link--gamer': l.label === 'Gamer' }"
              :aria-current="$route.path === l.to ? 'page' : undefined"
            >
              <span v-if="l.label === 'Gamer'" class="nb-link--gamer__ico" aria-hidden="true">巴</span>
              {{ l.label }}
            </router-link>
          </nav>
        </div>

        <!-- ── CENTRO: logo ── -->
        <router-link to="/" class="nb-logo" aria-label="Noir & Or — Página inicial">
          <img
            v-if="logoImgOk"
            :src="logoSrc"
            :alt="logoAlt"
            class="nb-logo__img"
            @error="logoImgOk = false"
          />
          <template v-else>
            <div class="nb-logo__mark" aria-hidden="true"></div>
            <span class="nb-logo__text">Noir<em>&amp;</em>Or</span>
          </template>
        </router-link>

        <!-- ── DIREITA ── -->
        <div class="nb-right">

          <!-- BUSCA -->
          <div class="nb-search-wrap" :class="{ 'is-open': searchOpen }">
            <button
              class="nb-icon"
              :class="{ 'is-active': searchOpen }"
              @click="toggleSearch"
              aria-label="Buscar produtos"
              :aria-expanded="searchOpen"
              aria-controls="search-panel"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </button>
            <transition name="search-drop">
              <div v-if="searchOpen" id="search-panel" class="nb-search-panel" role="search">
                <div class="or-panel-kamon" aria-hidden="true">家紋</div>
                <div class="or-panel-border" aria-hidden="true"></div>
                <div class="nb-search-field">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                  <input
                    ref="searchInput"
                    v-model="searchQuery"
                    type="search"
                    placeholder="探す — Buscar na coleção..."
                    aria-label="Campo de busca"
                    autocomplete="off"
                    @input="onSearchInput"
                    @keydown.escape="closeSearch"
                    @keydown.enter="irParaBusca"
                    @keydown.up.prevent="searchNavUp"
                    @keydown.down.prevent="searchNavDown"
                  />
                  <button v-if="searchQuery" class="search-clear" @click="clearSearch" aria-label="Limpar busca">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                  </button>
                </div>
                <div class="nb-search-label" aria-hidden="true">
                  <span class="search-kanji">品揃え</span>
                  <span class="search-label-text">Coleção Noir &amp; Or</span>
                </div>

                <!-- Skeleton loading -->
                <div v-if="searchLoading" class="nb-search-skeletons" aria-hidden="true">
                  <div v-for="i in 3" :key="i" class="search-skeleton">
                    <div class="sk-img"></div>
                    <div class="sk-lines">
                      <div class="sk-line sk-line--name"></div>
                      <div class="sk-line sk-line--price"></div>
                    </div>
                  </div>
                </div>

                <div v-else-if="searchResults.length" class="nb-search-results" role="listbox" aria-label="Resultados da busca">
                  <button
                    v-for="(prod, idx) in searchResults"
                    :key="prod._id || prod.id"
                    class="search-result"
                    :class="{ 'is-focused': searchFocusIdx === idx }"
                    role="option"
                    @click="irParaProduto(prod._id || prod.id)"
                    @mouseenter="searchFocusIdx = idx"
                  >
                    <div class="search-result__img">
                      <img v-if="prod.imagem" :src="prod.imagem" :alt="prod.nome" loading="lazy" />
                      <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                    </div>
                    <div class="search-result__info">
                      <span class="search-result__nome">{{ prod.nome }}</span>
                      <span class="search-result__preco">R$ {{ fmt(prod.preco) }}</span>
                    </div>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>
                  </button>
                </div>
                <p v-else-if="searchQuery.length >= 2 && !searchLoading" class="search-empty" role="status">
                  <span class="search-empty-kanji" aria-hidden="true">無</span>
                  Nenhum resultado para "{{ searchQuery }}"
                </p>
                <div class="nb-search-footer" aria-hidden="true">
                  <span>↑↓</span> navegar &nbsp;·&nbsp; <span>↵</span> buscar &nbsp;·&nbsp; <span>esc</span> fechar
                </div>
              </div>
            </transition>
          </div>

          <!-- CARRINHO -->
          <button
            class="nb-icon nb-cart"
            @click="abrirCarrinho"
            aria-label="Carrinho de compras"
            :aria-describedby="totalItens > 0 ? 'cart-count' : undefined"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            <span
              v-if="auth.isLogado && totalItens > 0"
              id="cart-count"
              class="nb-cart__badge"
              :class="{ 'is-bounce': cartBounce }"
              :aria-label="`${totalItens} itens no carrinho`"
            >{{ totalItens > 9 ? '9+' : totalItens }}</span>
          </button>

          <!-- PREFERÊNCIAS -->
          <div class="nb-acess-wrap">
            <button
              class="nb-icon"
              :class="{ 'is-active': acessOpen }"
              @click="acessOpen = !acessOpen"
              aria-label="Preferências de exibição"
              :aria-expanded="acessOpen"
              aria-controls="pref-panel"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
              </svg>
            </button>
          </div>

          <div class="nb-sep" aria-hidden="true"></div>

          <!-- LOGADO -->
          <div v-if="auth.isLogado" class="nb-user-area">
            <div class="nb-user-wrap" ref="userDropRef">
              <button
                class="nb-user"
                @click="userDropOpen = !userDropOpen"
                :aria-expanded="userDropOpen"
                aria-controls="user-dropdown"
                aria-label="Menu da conta"
              >
                <div class="nb-avatar" aria-hidden="true">
                  <img
                    v-if="auth.user?.avatar"
                    :src="auth.user.avatar"
                    alt=""
                    referrerpolicy="no-referrer"
                    @error="e => e.target.style.display = 'none'"
                  />
                  <span v-else>{{ inicialNome }}</span>
                </div>
                <div class="nb-user__info">
                  <span class="nb-user__nome">{{ primeiroNome }}</span>
                  <span v-if="auth.user?.vip" class="nb-user__vip">◆ {{ auth.user.vip }}</span>
                </div>
                <svg
                  class="nb-user__chevron"
                  :class="{ 'is-open': userDropOpen }"
                  width="10" height="10" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" stroke-width="2.5"
                  aria-hidden="true"
                >
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </button>

              <transition name="drop-down">
                <div
                  v-if="userDropOpen"
                  id="user-dropdown"
                  class="nb-user-drop"
                  role="menu"
                  aria-label="Opções da conta"
                  @keydown.escape="userDropOpen = false"
                >
                  <div class="nb-drop-head">
                    <div class="nb-drop-avatar" aria-hidden="true">
                      <img
                        v-if="auth.user?.avatar"
                        :src="auth.user.avatar"
                        alt=""
                        referrerpolicy="no-referrer"
                        @error="e => e.target.style.display = 'none'"
                      />
                      <span v-else>{{ inicialNome }}</span>
                    </div>
                    <div>
                      <p class="nb-drop-nome">{{ auth.user?.nome || 'Usuário' }}</p>
                      <p class="nb-drop-email">{{ auth.user?.email || '' }}</p>
                      <span v-if="auth.user?.vip" class="nb-drop-vip">◆ {{ auth.user.vip }}</span>
                    </div>
                  </div>

                  <!-- Horário Brasília -->
                  <div class="nb-drop-clock" aria-label="Horário de Brasília">
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    <span class="nb-drop-clock__label">Brasília</span>
                    <span class="nb-drop-clock__time">{{ brasiliaTime }}</span>
                  </div>

                  <div class="nb-drop-sep" role="separator"></div>

                  <button class="nb-drop-item" role="menuitem" @click="irParaConta">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    Minha Conta
                  </button>

                  <button class="nb-drop-item" role="menuitem" @click="userDropOpen = false; cartOpen = true">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                    Meu Carrinho
                    <span v-if="totalItens > 0" class="nb-drop-badge">{{ totalItens }}</span>
                  </button>

                  <button class="nb-drop-item nb-drop-item--saved" role="menuitem" @click="abrirComprasFuturas">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                    Compras Futuras
                    <span v-if="savedItems.length > 0" class="nb-drop-badge nb-drop-badge--saved">{{ savedItems.length }}</span>
                  </button>

                  <router-link
                    v-if="auth.isAdmin"
                    to="/admin"
                    class="nb-drop-item nb-drop-item--admin"
                    role="menuitem"
                    @click="userDropOpen = false"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>
                    Painel Admin
                  </router-link>

                  <div class="nb-drop-sep" role="separator"></div>

                  <button class="nb-drop-item nb-drop-item--sair" role="menuitem" @click="fazerLogout">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                    Sair da conta
                  </button>
                </div>
              </transition>
            </div>
          </div>

          <!-- DESLOGADO -->
          <div v-else class="nb-auth">
            <button class="nb-entrar" @click="openModal('login')">Entrar</button>
            <button class="nb-cadastrar" @click="openModal('cadastro')">Cadastrar</button>
          </div>
        </div>

      </div>
    </header>

    <!-- ════════════ TELEPORTS ════════════ -->
    <teleport to="body">

      <!-- ── PREFERÊNCIAS ── -->
      <transition name="pref-drop">
        <div
          v-if="acessOpen"
          id="pref-panel"
          class="pref-panel"
          role="dialog"
          aria-label="Preferências de exibição"
          @click.stop
        >
          <div class="or-panel-kamon or-panel-kamon--pref" aria-hidden="true">設定</div>
          <div class="or-panel-border" aria-hidden="true"></div>
          <header class="pref-header">
            <div class="pref-header-inner">
              <span class="pref-kanji" aria-hidden="true">好</span>
              <span class="pref-title">Preferências</span>
            </div>
            <button class="pref-close" @click="acessOpen = false" aria-label="Fechar preferências">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </header>
          <div class="pref-body">
            <!-- REALM (renomeado de Tema) -->
            <fieldset class="pref-group">
              <legend class="pref-group__label"><span aria-hidden="true">界</span> Realm</legend>
              <div class="pref-row">
                <!-- Celestial (escuro) -->
                <button
                  :class="['pref-realm', { 'is-active': site.tema === 'escuro' }]"
                  @click="site.toggleTema('escuro'); acessOpen = false"
                  data-realm="celestial"
                >
                  <span class="pref-realm__orb pref-realm__orb--celestial" aria-hidden="true"></span>
                  <div class="pref-realm__body">
                    <span class="pref-realm__name">Celestial</span>
                    <span class="pref-realm__sub">Noite dourada</span>
                  </div>
                  <span class="pref-realm__kanji" aria-hidden="true">天</span>
                </button>
                <!-- Autumn (claro) -->
                <button
                  :class="['pref-realm', { 'is-active': site.tema === 'claro' }]"
                  @click="site.toggleTema('claro'); acessOpen = false"
                  data-realm="autumn"
                >
                  <span class="pref-realm__orb pref-realm__orb--autumn" aria-hidden="true"></span>
                  <div class="pref-realm__body">
                    <span class="pref-realm__name">Autumn</span>
                    <span class="pref-realm__sub">Claridade fria</span>
                  </div>
                  <span class="pref-realm__kanji" aria-hidden="true">秋</span>
                </button>
                <!-- Ghost (gamer) -->
                <button
                  :class="['pref-realm', { 'is-active': site.tema === 'gamer' }]"
                  @click="site.toggleTema('gamer'); acessOpen = false"
                  data-realm="ghost"
                >
                  <span class="pref-realm__orb pref-realm__orb--ghost" aria-hidden="true"></span>
                  <div class="pref-realm__body">
                    <span class="pref-realm__name">Ghost</span>
                    <span class="pref-realm__sub">Brasa sombria</span>
                  </div>
                  <span class="pref-realm__kanji" aria-hidden="true">幽</span>
                </button>
              </div>
            </fieldset>

            <fieldset class="pref-group">
              <legend class="pref-group__label"><span aria-hidden="true">語</span> Idioma</legend>
              <div class="pref-row">
                <button :class="['pref-opt', { 'is-active': locale === 'pt-BR' }]" @click="trocarIdioma('pt-BR')" lang="pt-BR">🇧🇷 Português</button>
                <button :class="['pref-opt', { 'is-active': locale === 'en' }]" @click="trocarIdioma('en')" lang="en">🇺🇸 English</button>
              </div>
            </fieldset>
            <fieldset class="pref-group">
              <legend class="pref-group__label"><span aria-hidden="true">字</span> Tamanho do texto</legend>
              <div class="pref-row pref-row--3">
                <button :class="['pref-font', { 'is-active': site.fonte === 'pequena' }]" @click="site.setFonte('pequena'); acessOpen = false" aria-label="Texto pequeno">
                  <span style="font-size:11px;font-weight:700;line-height:1">A</span><span class="pref-font__lbl">Pequeno</span>
                </button>
                <button :class="['pref-font', { 'is-active': site.fonte === 'normal' }]" @click="site.setFonte('normal'); acessOpen = false" aria-label="Texto normal">
                  <span style="font-size:15px;font-weight:700;line-height:1">A</span><span class="pref-font__lbl">Normal</span>
                </button>
                <button :class="['pref-font', { 'is-active': site.fonte === 'grande' }]" @click="site.setFonte('grande'); acessOpen = false" aria-label="Texto grande">
                  <span style="font-size:19px;font-weight:700;line-height:1">A</span><span class="pref-font__lbl">Grande</span>
                </button>
              </div>
            </fieldset>
            <div class="pref-watermark" aria-hidden="true">The Art of Silent Power</div>
          </div>
        </div>
      </transition>

      <!-- ── MODAL AUTH ── -->
      <transition name="fade" appear>
  <div
    v-if="modalOpen"
    key="auth-modal-overlay"
    class="nb-overlay"
          @click.self="closeModal"
          role="dialog"
          :aria-label="modalTab === 'login' ? 'Fazer login' : 'Criar conta'"
          aria-modal="true"
        >
          <div class="auth-modal">

            <!-- Painel esquerdo com orbs atmosféricos -->
            <aside class="auth-esq" aria-hidden="true">
              <div class="auth-orb auth-orb--1"></div>
              <div class="auth-orb auth-orb--2"></div>
              <div class="auth-orb auth-orb--3"></div>
              <p class="auth-brand"><span class="auth-brand__icon">⊕</span>Noir<em>&amp;</em>Or</p>
              <div class="auth-copy">
                <h2 class="auth-titulo">
                  <span v-if="modalTab === 'login'">Bem-vindo<br/><em>de volta</em></span>
                  <span v-else>Entre para o<br/><em>seleto círculo</em></span>
                </h2>
                <p class="auth-desc">
                  <span v-if="modalTab === 'login'">Acesse sua coleção com total segurança e exclusividade.</span>
                  <span v-else>Acesso a lançamentos, peças limitadas e benefícios VIP.</span>
                </p>
              </div>
              <ul class="auth-feats">
                <li v-for="f in currentFeatures" :key="f"><span aria-hidden="true">◆</span>{{ f }}</li>
              </ul>
              <div class="auth-watermark" aria-hidden="true">The Art of<br/>Silent Power</div>
              <p class="auth-ssl">
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                SSL 256-bit · Dados protegidos
              </p>
            </aside>

            <!-- Painel direito -->
            <div class="auth-dir">
              <button class="auth-close" @click="closeModal" aria-label="Fechar">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>

              <transition name="slide-down">
                <div v-if="loginNecessario" class="auth-aviso" role="alert">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                  <span>Faça login para adicionar ao carrinho</span>
                </div>
              </transition>

              <transition name="slide-down">
                <div v-if="loginBloqueado" class="auth-bloqueado" role="alert" aria-live="assertive">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  <div>
                    <p class="bloqueado-titulo">Acesso temporariamente bloqueado</p>
                    <p class="bloqueado-desc">Muitas tentativas incorretas. Aguarde <strong>{{ bloqueioRestante }}s</strong> para tentar novamente.</p>
                  </div>
                </div>
              </transition>

              <transition name="slide-down">
                <div v-if="tentativasRestantes < 5 && tentativasRestantes > 0 && !loginBloqueado && modalTab === 'login'" class="auth-tentativas" role="status" aria-live="polite">
                  <div class="tentativas-dots">
                    <span v-for="i in 5" :key="i" :class="['tentativa-dot', { 'used': i > tentativasRestantes }]"></span>
                  </div>
                  <span>{{ tentativasRestantes }} tentativa{{ tentativasRestantes !== 1 ? 's' : '' }} restante{{ tentativasRestantes !== 1 ? 's' : '' }}</span>
                </div>
              </transition>

              <!-- Tabs com glow na ativa -->
              <div class="auth-tabs" role="tablist">
                <button :class="['auth-tab', { 'is-active': modalTab === 'login' }]" @click="switchTab('login')" role="tab" :aria-selected="modalTab === 'login'" id="tab-login" aria-controls="panel-login">入る — Entrar</button>
                <button :class="['auth-tab', { 'is-active': modalTab === 'cadastro' }]" @click="switchTab('cadastro')" role="tab" :aria-selected="modalTab === 'cadastro'" id="tab-cadastro" aria-controls="panel-cadastro">参加 — Cadastrar</button>
              </div>

              <transition name="slide" mode="out-in">

                <!-- LOGIN -->
                <div v-if="modalTab === 'login'" key="login" class="auth-form" role="tabpanel" id="panel-login" aria-labelledby="tab-login">
                  <div class="af-campo">
                    <label for="l-email">E-mail</label>
                    <div class="af-linha" :class="{ 'af-linha--erro': campoErro === 'email', 'af-linha--focus': focusField === 'email' }">
                      <input id="l-email" v-model="form.email" type="email" placeholder="seu@email.com" autocomplete="email" required :disabled="loginBloqueado"
                        @focus="focusField = 'email'" @blur="focusField = ''" />
                    </div>
                  </div>
                  <div class="af-campo">
                    <label for="l-senha">Senha</label>
                    <div class="af-linha" :class="{ 'af-linha--erro': campoErro === 'senha', 'af-linha--focus': focusField === 'senha' }">
                      <input id="l-senha" v-model="form.senha" :type="showPass ? 'text' : 'password'" placeholder="••••••••" autocomplete="current-password" required :disabled="loginBloqueado"
                        @focus="focusField = 'senha'" @blur="focusField = ''" />
                      <button type="button" class="af-eye" @click="showPass = !showPass" :aria-label="showPass ? 'Ocultar senha' : 'Mostrar senha'">
                        <svg v-if="!showPass" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                        <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                      </button>
                    </div>
                  </div>
                  <div class="af-esqueceu">
                    <router-link to="/redefinir-senha" @click="closeModal">Esqueceu a senha?</router-link>
                  </div>
                  <p v-if="formError" class="af-erro" role="alert">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    {{ formError }}
                  </p>
                  <button type="button" class="af-submit" :disabled="auth.loading || loginBloqueado" @click="fazerLogin">
                    <span v-if="auth.loading" class="or-spinner-sm" aria-hidden="true"></span>
                    <svg v-else width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
                    {{ auth.loading ? 'Verificando...' : loginBloqueado ? `Bloqueado (${bloqueioRestante}s)` : 'Acessar minha conta' }}
                  </button>
                  <div class="af-ou" aria-hidden="true"><span>ou continue com</span></div>
                  <div class="af-google-wrap">
                    <button type="button" class="af-google" @click="loginGoogle" :disabled="loginBloqueado">
                      <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                      Continuar com Google
                    </button>
                    <p class="af-google-nota">
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                      Novo usuário? Será redirecionado para o cadastro automaticamente.
                    </p>
                  </div>
                  <p class="af-rodape">Não tem conta? <button type="button" @click="switchTab('cadastro')">Cadastre-se</button></p>
                </div>

                <!-- CADASTRO -->
                <div v-else key="cadastro" class="auth-form" role="tabpanel" id="panel-cadastro" aria-labelledby="tab-cadastro">
                  <div class="af-duplo">
                    <div class="af-campo">
                      <label for="c-nome">Nome</label>
                      <div class="af-linha" :class="{ 'af-linha--erro': campoErro === 'nome', 'af-linha--focus': focusField === 'nome' }">
                        <input id="c-nome" v-model="form.nome" placeholder="Seu nome" autocomplete="given-name"
                          @focus="focusField = 'nome'" @blur="focusField = ''" />
                      </div>
                    </div>
                    <div class="af-campo">
                      <label for="c-sobrenome">Sobrenome</label>
                      <div class="af-linha" :class="{ 'af-linha--focus': focusField === 'sobrenome' }">
                        <input id="c-sobrenome" v-model="form.sobrenome" placeholder="Sobrenome" autocomplete="family-name"
                          @focus="focusField = 'sobrenome'" @blur="focusField = ''" />
                      </div>
                    </div>
                  </div>
                  <div class="af-campo">
                    <label for="c-email">E-mail</label>
                    <div class="af-linha" :class="{ 'af-linha--erro': campoErro === 'email', 'af-linha--focus': focusField === 'c-email' }">
                      <input id="c-email" v-model="form.email" type="email" placeholder="seu@email.com" autocomplete="email" required
                        @focus="focusField = 'c-email'" @blur="focusField = ''" />
                    </div>
                  </div>
                  <div class="af-campo">
                    <label for="c-senha">Senha</label>
                    <div class="af-linha" :class="{ 'af-linha--erro': campoErro === 'senha', 'af-linha--focus': focusField === 'c-senha' }">
                      <input id="c-senha" v-model="form.senha" :type="showPass ? 'text' : 'password'" placeholder="Mínimo 8 caracteres" autocomplete="new-password" required
                        @focus="focusField = 'c-senha'" @blur="focusField = ''" />
                      <button type="button" class="af-eye" @click="showPass = !showPass" :aria-label="showPass ? 'Ocultar senha' : 'Mostrar senha'">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                      </button>
                    </div>
                    <div v-if="form.senha" class="af-forca" aria-label="Força da senha">
                      <div class="forca-bar"><div class="forca-fill" :style="{ width: forcaSenha.pct + '%', background: forcaSenha.cor }"></div></div>
                      <span class="forca-txt" :style="{ color: forcaSenha.cor }">{{ forcaSenha.label }}</span>
                    </div>
                  </div>
                  <div class="af-campo">
                    <label for="c-senha2">Confirmar Senha</label>
                    <div class="af-linha" :class="{ 'af-linha--erro': form.senha2 && form.senha !== form.senha2, 'af-linha--focus': focusField === 'c-senha2' }">
                      <input id="c-senha2" v-model="form.senha2" :type="showPass2 ? 'text' : 'password'" placeholder="Repita a senha" autocomplete="new-password" required
                        @focus="focusField = 'c-senha2'" @blur="focusField = ''" />
                      <button type="button" class="af-eye" @click="showPass2 = !showPass2" :aria-label="showPass2 ? 'Ocultar' : 'Mostrar'">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                      </button>
                    </div>
                    <p v-if="form.senha2 && form.senha !== form.senha2" class="af-campo-erro">As senhas não coincidem</p>
                  </div>
                  <div class="af-termos">
                    <label class="af-check-row">
                      <input type="checkbox" v-model="aceitouTermos" />
                      <span class="af-check-box" aria-hidden="true"></span>
                      <span class="af-check-texto">
                        Li e aceito os
                        <button type="button" class="af-link-termos" @click.stop="termosOpen = !termosOpen">Termos</button>
                        e a
                        <a href="/politica-privacidade" target="_blank" class="af-link-termos">Privacidade</a>
                      </span>
                    </label>
                    <transition name="termos-drop">
                      <div v-if="termosOpen" class="af-termos-body">
                        <p>Ao criar sua conta, você concorda em usar a plataforma de forma lícita, manter a confidencialidade de seus dados e aceitar as condições de compra da Noir &amp; Or. <a href="/termos" target="_blank">Ver termos completos</a>.</p>
                      </div>
                    </transition>
                  </div>
                  <p v-if="formError" class="af-erro" role="alert">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    {{ formError }}
                  </p>
                  <button type="button" class="af-submit" :disabled="auth.loading || (form.senha2 && form.senha !== form.senha2)" @click="fazerCadastro">
                    <span v-if="auth.loading" class="or-spinner-sm" aria-hidden="true"></span>
                    <svg v-else width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
                    {{ auth.loading ? 'Criando conta...' : 'Criar minha conta' }}
                  </button>
                  <div class="af-ou" aria-hidden="true"><span>ou cadastre com</span></div>
                  <div class="af-google-wrap">
                    <button type="button" class="af-google" @click="loginGoogle">
                      <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                      Cadastrar com Google
                    </button>
                  </div>
                  <p class="af-rodape">Já tem conta? <button type="button" @click="switchTab('login')">Entre aqui</button></p>
                </div>

              </transition>
            </div>
          </div>
        </div>
      </transition>

      <!-- ── CARRINHO DRAWER ── -->
      <div :class="['drawer-overlay', { 'is-open': cartOpen }]" @click.self="cartOpen = false" role="dialog" aria-label="Carrinho" aria-modal="true">
        <aside class="drawer">
          <div class="drawer-kamon" aria-hidden="true">蔵</div>

          <header class="drawer__header">
            <div class="drawer__header__l">
              <div class="drawer__header__titles">
                <span class="drawer__kanji" aria-hidden="true">蔵</span>
                <div>
                  <span class="drawer__titulo">Meu Atelier</span>
                  <span v-if="auth.isLogado && totalItens > 0" class="drawer__qtd" aria-live="polite">{{ totalItens }} {{ totalItens === 1 ? 'item' : 'itens' }}</span>
                </div>
              </div>
            </div>
            <!-- Horário Brasília no header do drawer -->
            <div class="drawer__brasilia" aria-label="Horário de Brasília">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span>{{ brasiliaTime }}</span>
              <span class="drawer__brasilia-label">BRT</span>
            </div>
            <button class="drawer__close" @click="cartOpen = false" aria-label="Fechar carrinho">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </header>

          <!-- ABAS -->
          <div class="drawer__tabs" role="tablist" aria-label="Seções">
            <button
              :class="['drawer__tab', { 'is-active': drawerTab === 'carrinho' }]"
              @click="drawerTab = 'carrinho'"
              role="tab"
              :aria-selected="drawerTab === 'carrinho'"
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              Carrinho
              <span v-if="auth.isLogado && totalItens > 0" class="drawer__tab-badge">{{ totalItens > 9 ? '9+' : totalItens }}</span>
            </button>
            <button
              :class="['drawer__tab', { 'is-active': drawerTab === 'futuras' }]"
              @click="drawerTab = 'futuras'"
              role="tab"
              :aria-selected="drawerTab === 'futuras'"
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
              Compras Futuras
              <span v-if="savedItems.length > 0" class="drawer__tab-badge drawer__tab-badge--saved">{{ savedItems.length }}</span>
            </button>
          </div>

          <!-- ABA CARRINHO -->
          <template v-if="drawerTab === 'carrinho'">
            <div class="drawer__ornament" aria-hidden="true">
              <span>◆</span><span class="drawer__ornament-line"></span>
              <span class="drawer__ornament-text">コレクション</span>
              <span class="drawer__ornament-line"></span><span>◆</span>
            </div>

            <div v-if="auth.isLogado && cartItems.length" class="drawer__clear-bar">
              <span class="drawer__clear-count">{{ totalItens }} {{ totalItens === 1 ? 'item' : 'itens' }}</span>
              <button class="drawer__clear-btn" @click="confirmarLimparCarrinho" aria-label="Remover todos os itens do carrinho">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                Limpar carrinho
              </button>
            </div>

            <transition name="slide-down">
              <div v-if="confirmLimpar" class="drawer__confirm-bar" role="alert">
                <span class="drawer__confirm-txt">Remover todos os itens?</span>
                <div class="drawer__confirm-btns">
                  <button class="drawer__confirm-sim" @click="limparCarrinho">Sim, limpar</button>
                  <button class="drawer__confirm-nao" @click="confirmLimpar = false">Cancelar</button>
                </div>
              </div>
            </transition>

            <div class="drawer__items" role="list">
              <div v-if="!auth.isLogado" class="drawer__vazio drawer__vazio--login">
                <div class="drawer__vazio__ico" aria-hidden="true"><span class="vazio-kanji">客</span></div>
                <p class="drawer__vazio__titulo">Faça login para ver seu carrinho</p>
                <p class="drawer__vazio__sub">Suas peças selecionadas ficam salvas em sua conta</p>
                <div class="drawer__vazio__separador" aria-hidden="true"><span>一</span><span class="vazio-sep-txt">ou</span><span>一</span></div>
                <button class="drawer__vazio__cta" @click="cartOpen = false; openModal('login', true)">
                  Entrar na conta
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M12.5 5l7 7-7 7"/></svg>
                </button>
                <button class="drawer__vazio__cta-ghost" @click="cartOpen = false; openModal('cadastro')">Criar conta grátis</button>
              </div>

              <div v-else-if="!cartItems.length" class="drawer__vazio">
                <div class="drawer__vazio__ico" aria-hidden="true"><span class="vazio-kanji">空</span></div>
                <p class="drawer__vazio__titulo">Seu atelier está vazio</p>
                <p class="drawer__vazio__sub">Explore a coleção e adicione peças exclusivas</p>
                <button class="drawer__vazio__cta" @click="cartOpen = false; $router.push('/loja')">
                  Ver coleção
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M12.5 5l7 7-7 7"/></svg>
                </button>
              </div>

              <div v-else v-for="(item, idx) in cartItems" :key="item.id || item._id" class="di" role="listitem" :style="{ '--di-idx': idx }">
                <div class="di__num" aria-hidden="true">{{ String(idx + 1).padStart(2, '0') }}</div>
                <div class="di__img" aria-hidden="true">
                  <img v-if="item.imagem" :src="item.imagem" :alt="item.nome" loading="lazy" @error="e => e.target.style.opacity = '0'" />
                  <div v-else class="di__img__placeholder">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                  </div>
                </div>
                <div class="di__info">
  <span class="di__cat">{{ item.categoria }}</span>
  <p class="di__nome">{{ item.nome }}</p>

  <!-- VARIANTES VISUAIS -->
  <div v-if="item.corNome || item.storage" class="di__variantes">
    <span
      v-if="item.corHex"
      class="di__swatch"
      :style="{ background: item.corHex }"
      :title="item.corNome"
    ></span>
    <span v-if="item.corNome" class="di__var-txt">{{ item.corNome }}</span>
    <span v-if="item.corNome && item.storage" class="di__var-sep">·</span>
    <span v-if="item.storage" class="di__var-txt">{{ item.storage }}</span>
  </div>

  <div class="di__foot">
    <div class="di__qty" :aria-label="`Quantidade: ${item.qty}`">
      <button @click="changeQty(item, -1)" aria-label="Diminuir quantidade">−</button>
      <span aria-live="polite">{{ item.qty }}</span>
      <button @click="changeQty(item, +1)" aria-label="Aumentar quantidade">+</button>
    </div>
    <span class="di__preco">R$ {{ fmt(item.preco * item.qty) }}</span>
  </div>
  <button class="di__salvar" @click="salvarParaDepois(item)" :aria-label="`Salvar ${item.nome} para comprar depois`">
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
    Salvar para depois
  </button>
</div>
                <button class="di__remover" @click="removeItem(item.id || item._id)" :aria-label="`Remover ${item.nome} do carrinho`">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
              </div>
            </div>

            <footer class="drawer__footer">
              <template v-if="auth.isLogado && cartItems.length">
                <div class="drawer__footer-ornament" aria-hidden="true">
                  <span class="fo-line"></span><span class="fo-kanji">計</span><span class="fo-line"></span>
                </div>
                <div class="drawer__totais">
                  <div class="dt-row"><span>Subtotal</span><span>R$ {{ totalPreco }}</span></div>
                  <div class="dt-row dt-row--vip">
                    <span><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> Envio VIP</span>
                    <span>Grátis</span>
                  </div>
                  <div class="dt-row dt-row--total"><span>Total</span><span>R$ {{ totalPreco }}</span></div>
                </div>
              </template>
              <button class="drawer__checkout" :disabled="!auth.isLogado || !cartItems.length" @click="irParaCheckout">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 12h14M12.5 5l7 7-7 7"/></svg>
                {{ !auth.isLogado ? 'Entre para finalizar' : 'Finalizar seleção' }}
              </button>
              <p class="drawer__seguro">
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                Pagamento seguro via Mercado Pago
              </p>
            </footer>
          </template>

          <!-- ABA COMPRAS FUTURAS -->
          <template v-else-if="drawerTab === 'futuras'">
            <div class="drawer__ornament" aria-hidden="true">
              <span>◆</span><span class="drawer__ornament-line"></span>
              <span class="drawer__ornament-text">後で買う</span>
              <span class="drawer__ornament-line"></span><span>◆</span>
            </div>
            <div class="drawer__items" role="list">
              <div v-if="!auth.isLogado" class="drawer__vazio drawer__vazio--login">
                <div class="drawer__vazio__ico" aria-hidden="true"><span class="vazio-kanji">客</span></div>
                <p class="drawer__vazio__titulo">Faça login para usar esta função</p>
                <p class="drawer__vazio__sub">Salve produtos para comprar em outro momento</p>
                <button class="drawer__vazio__cta" @click="cartOpen = false; openModal('login', true)">
                  Entrar na conta
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M12.5 5l7 7-7 7"/></svg>
                </button>
              </div>
              <div v-else-if="!savedItems.length" class="drawer__vazio">
                <div class="drawer__vazio__ico" aria-hidden="true"><span class="vazio-kanji">後</span></div>
                <p class="drawer__vazio__titulo">Nenhuma compra futura</p>
                <p class="drawer__vazio__sub">Use "Salvar para depois" nos itens do carrinho para guardar aqui</p>
                <button class="drawer__vazio__cta" @click="drawerTab = 'carrinho'">
                  Ver carrinho
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M12.5 5l7 7-7 7"/></svg>
                </button>
              </div>
              <div v-else v-for="(item, idx) in savedItems" :key="item.id || item._id" class="di di--saved" role="listitem" :style="{ '--di-idx': idx }">
                <div class="di__num" aria-hidden="true">{{ String(idx + 1).padStart(2, '0') }}</div>
                <div class="di__img" aria-hidden="true">
                  <img v-if="item.imagem" :src="item.imagem" :alt="item.nome" loading="lazy" @error="e => e.target.style.opacity = '0'" />
                  <div v-else class="di__img__placeholder">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                  </div>
                </div>
                <div class="di__info">
                  <span class="di__cat">{{ item.categoria }}</span>
                  <p class="di__nome">{{ item.nome }}</p>
                  <div class="di__foot"><span class="di__preco">R$ {{ fmt(item.preco) }}</span></div>
                  <button class="di__mover" @click="moverParaCarrinho(item)" aria-label="Mover para o carrinho">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                    Mover para carrinho
                  </button>
                </div>
                <button class="di__remover" @click="removerSalvo(item.id || item._id)" :aria-label="`Remover ${item.nome} das compras futuras`">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
              </div>
            </div>
            <footer class="drawer__footer">
              <p class="drawer__saved-info">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                Itens salvos localmente neste dispositivo
              </p>
              <button class="drawer__checkout" :disabled="!auth.isLogado || !savedItems.length" @click="moverTodosParaCarrinho">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 12h14M12.5 5l7 7-7 7"/></svg>
                Mover tudo para o carrinho
              </button>
            </footer>
          </template>
        </aside>
      </div>

      <!-- ── SIDEBAR MOBILE ── -->
      <transition name="sb-fade" appear>
  <div v-if="sidebarOpen" key="sidebar-overlay" class="sb-overlay" @click.self="sidebarOpen = false" role="dialog" aria-label="Menu de navegação" aria-modal="true">
          <nav id="sidebar-menu" class="sb" @click.stop aria-label="Menu de navegação mobile">
            <div class="sb-kamon" aria-hidden="true">案内</div>

            <div class="sb__head">
              <router-link to="/" class="sb__brand" @click="sidebarOpen = false" aria-label="Página inicial">
                <div class="sb__brand__mark" aria-hidden="true"></div>
                <span class="sb__brand__txt">Noir<em>&amp;</em>Or</span>
              </router-link>
              <button class="sb__close" @click="sidebarOpen = false" aria-label="Fechar menu">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>

            <div class="sb__perfil">
              <div class="sb__av-wrap">
                <div class="sb__av" aria-hidden="true">
                  <img v-if="auth.user?.avatar" :src="auth.user.avatar" alt="" referrerpolicy="no-referrer" @error="e => e.target.style.display = 'none'" />
                  <span v-else-if="auth.isLogado">{{ inicialNome }}</span>
                  <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
                <div class="sb__av-kanji" aria-hidden="true">{{ auth.isLogado ? '会員' : '客' }}</div>
              </div>
              <div class="sb__perfil__info">
                <p class="sb__perfil__nome">{{ auth.isLogado ? (auth.user?.nome || 'Usuário') : 'Visitante' }}</p>
                <p class="sb__perfil__status">
                  <span v-if="auth.isLogado && auth.user?.vip" class="sb__perfil__vip">◆ {{ auth.user.vip }}</span>
                  <span v-else-if="auth.isLogado">Membro</span>
                  <span v-else>Explore a coleção</span>
                </p>
              </div>
            </div>

            <div class="sb__ornament" aria-hidden="true">
              <span class="sb-orn-line"></span><span class="sb-orn-kanji">道</span><span class="sb-orn-line"></span>
            </div>

            <div class="sb__links">
              <p class="sb__grupo-label"><span aria-hidden="true">行先</span> Navegação</p>
              <router-link to="/"        @click="sidebarOpen = false" class="sb__link"><span class="sb__link-num" aria-hidden="true">一</span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>Início</router-link>
              <router-link to="/loja"    @click="sidebarOpen = false" class="sb__link"><span class="sb__link-num" aria-hidden="true">二</span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>Loja</router-link>
              <router-link to="/sobre"   @click="sidebarOpen = false" class="sb__link"><span class="sb__link-num" aria-hidden="true">三</span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>Atelier</router-link>
              <router-link to="/gamer"   @click="sidebarOpen = false" class="sb__link sb__link--gamer"><span class="sb__link-num" aria-hidden="true">四</span><span class="sb__link--gamer__ico" aria-hidden="true">巴</span>Gamer</router-link>
              <router-link to="/contato" @click="sidebarOpen = false" class="sb__link"><span class="sb__link-num" aria-hidden="true">五</span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>Concierge</router-link>

              <div class="sb__ornament sb__ornament--small" aria-hidden="true">
                <span class="sb-orn-line"></span><span class="sb-orn-kanji">口</span><span class="sb-orn-line"></span>
              </div>
              <p class="sb__grupo-label"><span aria-hidden="true">口座</span> Conta</p>

              <template v-if="auth.isLogado">
                <a href="#" @click.prevent="sidebarOpen = false; irParaConta()" class="sb__link"><span class="sb__link-num" aria-hidden="true">◆</span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>Minha Conta</a>
                <a href="#" @click.prevent="sidebarOpen = false; cartOpen = true; drawerTab = 'carrinho'" class="sb__link"><span class="sb__link-num" aria-hidden="true">◆</span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>Carrinho<span v-if="totalItens > 0" class="sb__cart-num">{{ totalItens }}</span></a>
                <a href="#" @click.prevent="sidebarOpen = false; cartOpen = true; drawerTab = 'futuras'" class="sb__link sb__link--saved"><span class="sb__link-num" aria-hidden="true">◆</span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>Compras Futuras<span v-if="savedItems.length > 0" class="sb__cart-num sb__cart-num--saved">{{ savedItems.length }}</span></a>
                <router-link v-if="auth.isAdmin" to="/admin" @click="sidebarOpen = false" class="sb__link sb__link--admin"><span class="sb__link-num" aria-hidden="true">管</span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>Painel Admin</router-link>
                <a href="#" @click.prevent="fazerLogout" class="sb__link sb__link--sair"><span class="sb__link-num" aria-hidden="true">出</span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>Sair</a>
              </template>
              <template v-else>
                <a href="#" @click.prevent="sidebarOpen = false; openModal('login')" class="sb__link"><span class="sb__link-num" aria-hidden="true">入</span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>Entrar</a>
                <a href="#" @click.prevent="sidebarOpen = false; openModal('cadastro')" class="sb__link sb__link--cta"><span class="sb__link-num" aria-hidden="true">新</span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>Criar conta grátis</a>
              </template>
            </div>

            <div class="sb__rodape">
              <div class="sb__rodape-ornament" aria-hidden="true"><span>好み</span></div>
              <!-- Realm buttons na sidebar -->
              <div class="sb__realms">
                <button
                  v-for="r in realmsSb" :key="r.id"
                  :class="['sb__realm', { 'is-active': site.tema === r.id }]"
                  @click="site.toggleTema(r.id)"
                  :aria-label="`Realm ${r.name}`"
                >
                  <span class="sb__realm-dot" :class="`sb__realm-dot--${r.key}`" aria-hidden="true"></span>
                  {{ r.name }}
                </button>
              </div>
              <p class="sb__copy">© 2025 Noir &amp; Or &nbsp;·&nbsp; <span aria-hidden="true">黒と金</span></p>
            </div>
          </nav>
        </div>
      </transition>

    </teleport>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'
import { useSiteStore } from '@/stores/site.js'
import { useCartStore } from '@/stores/cart.js'
import { useI18n } from 'vue-i18n'

const auth   = useAuthStore()
const site   = useSiteStore()
const cart   = useCartStore()
const router = useRouter()
const { locale } = useI18n({ useScope: 'global' })

/* ── Estado geral ── */
const scrolled        = ref(false)
const scrollHide      = ref(false)
const scrollProgress  = ref(0)
const sidebarOpen     = ref(false)
const cartOpen        = ref(false)
const modalOpen       = ref(false)
const modalTab        = ref('login')
const showPass        = ref(false)
const showPass2       = ref(false)
const aceitouTermos   = ref(false)
const termosOpen      = ref(false)
const formError       = ref('')
const campoErro       = ref('')
const focusField      = ref('')
const cartBounce      = ref(false)
const loginNecessario = ref(false)
const acessOpen       = ref(false)
const userDropOpen    = ref(false)
const userDropRef     = ref(null)
const logoImgOk       = ref(true)
const form = ref({ email: '', senha: '', senha2: '', nome: '', sobrenome: '' })

/* ── Drawer tabs + compras futuras ── */
const drawerTab    = ref('carrinho')
const savedItems   = ref([])
const confirmLimpar = ref(false)

/* ── Busca ── */
const searchOpen    = ref(false)
const searchQuery   = ref('')
const searchResults = ref([])
const searchLoading = ref(false)
const searchFocusIdx = ref(-1)
const searchInput   = ref(null)
let searchTimer     = null

/* ── Horário Brasília ── */
const brasiliaTime = ref('')
let clockInterval = null

const updateClock = () => {
  const now = new Date()
  brasiliaTime.value = now.toLocaleTimeString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

/* ── Toast system ── */
const toasts = ref([])
let toastId = 0

const addToast = (title, msg = '', type = 'info', duration = 4000) => {
  const id = ++toastId
  toasts.value.push({ id, title, msg, type, duration })
  setTimeout(() => removeToast(id), duration + 300)
}

const removeToast = (id) => {
  toasts.value = toasts.value.filter(t => t.id !== id)
}

const onToastEnter = (el) => {
  el.style.opacity = '0'
  el.style.transform = 'translateX(30px)'
  requestAnimationFrame(() => {
    el.style.transition = 'opacity .3s, transform .4s'
    el.style.opacity = '1'
    el.style.transform = 'translateX(0)'
  })
}

const onToastLeave = (el, done) => {
  el.style.transition = 'opacity .25s, transform .3s'
  el.style.opacity = '0'
  el.style.transform = 'translateX(30px)'
  setTimeout(done, 300)
}

/* ── Realm buttons na sidebar ── */
const realmsSb = [
  { id: 'escuro', key: 'celestial', name: 'Celestial' },
  { id: 'claro',  key: 'autumn',    name: 'Autumn'    },
  { id: 'gamer',  key: 'ghost',     name: 'Ghost'     },
]

/* ══ SEGURANÇA DE LOGIN ══ */
const MAX_TENTATIVAS    = 5
const BLOQUEIO_BASE_SEG = 30
const BLOQUEIO_MAX_SEG  = 300

const tentativasFalhadas  = ref(0)
const loginBloqueado      = ref(false)
const bloqueioRestante    = ref(0)
const tentativasRestantes = computed(() => MAX_TENTATIVAS - tentativasFalhadas.value)
let bloqueioTimer    = null
let bloqueioInterval = null

const carregarEstadoSeguranca = () => {
  try {
    const salvo = sessionStorage.getItem('_nor_sec')
    if (!salvo) return
    const estado = JSON.parse(salvo)
    const agora = Date.now()
    tentativasFalhadas.value = estado.falhas || 0
    if (estado.bloqueioAte && estado.bloqueioAte > agora) {
      const restante = Math.ceil((estado.bloqueioAte - agora) / 1000)
      iniciarContadorBloqueio(restante)
    } else if (estado.bloqueioAte && estado.bloqueioAte <= agora) {
      tentativasFalhadas.value = Math.max(0, (estado.falhas || 0) - 2)
      salvarEstadoSeguranca()
    }
  } catch {}
}

const salvarEstadoSeguranca = (bloqueioAte = null) => {
  try { sessionStorage.setItem('_nor_sec', JSON.stringify({ falhas: tentativasFalhadas.value, bloqueioAte })) } catch {}
}

const calcularTempoBloqueio = () => {
  const fator = Math.floor(tentativasFalhadas.value / MAX_TENTATIVAS)
  return Math.min(BLOQUEIO_BASE_SEG * Math.pow(2, fator - 1), BLOQUEIO_MAX_SEG)
}

const iniciarContadorBloqueio = (segundos) => {
  loginBloqueado.value   = true
  bloqueioRestante.value = segundos
  clearInterval(bloqueioInterval)
  bloqueioInterval = setInterval(() => {
    bloqueioRestante.value--
    if (bloqueioRestante.value <= 0) {
      clearInterval(bloqueioInterval)
      loginBloqueado.value = false
    }
  }, 1000)
}

const registrarFalha = () => {
  tentativasFalhadas.value++
  if (tentativasFalhadas.value % MAX_TENTATIVAS === 0) {
    const tempo = calcularTempoBloqueio()
    const bloqueioAte = Date.now() + tempo * 1000
    salvarEstadoSeguranca(bloqueioAte)
    iniciarContadorBloqueio(tempo)
  } else {
    salvarEstadoSeguranca()
  }
}

const registrarSucesso = () => {
  tentativasFalhadas.value = 0
  loginBloqueado.value     = false
  clearInterval(bloqueioInterval)
  try { sessionStorage.removeItem('_nor_sec') } catch {}
}

/* ── Logo dinâmico ── */
const logoSrc = computed(() => site.tema === 'claro' ? '/logo-light.png' : '/logo-dark.png')
const logoAlt = computed(() => site.tema === 'claro' ? 'Noir & Or — logotipo (tema claro)' : 'Noir & Or — logotipo (tema escuro)')
watch(() => site.tema, () => { logoImgOk.value = true })

/* ── Links ── */
const allLinks = [
  { label: 'Início',  to: '/' },
  { label: 'Loja',    to: '/loja' },
  { label: 'Sobre',   to: '/sobre' },
  { label: 'Gamer',   to: '/gamer' },
  { label: 'Contato', to: '/contato' },
]

/* ── Carrinho ── */
const cartItems  = computed(() => cart.items)
const totalItens = computed(() => cart.totalItens)
const totalPreco = computed(() => cart.totalBrutoFmt)
const fmt = (v) => (v || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })

/* ── Compras futuras ── */
const carregarSalvos = () => {
  try {
    const salvo = localStorage.getItem('noir_saved')
    if (salvo) savedItems.value = JSON.parse(salvo)
  } catch {}
}

const persistirSalvos = () => {
  try { localStorage.setItem('noir_saved', JSON.stringify(savedItems.value)) } catch {}
}

const salvarParaDepois = (item) => {
  const jaExiste = savedItems.value.some(i => (i.id || i._id) === (item.id || item._id))
  if (!jaExiste) {
    savedItems.value = [...savedItems.value, { ...item }]
    persistirSalvos()
    addToast('Salvo para depois', item.nome, 'success')
  }
  removeItem(item.id || item._id)
  drawerTab.value = 'futuras'
}

const removerSalvo = (id) => {
  savedItems.value = savedItems.value.filter(i => (i.id || i._id) !== id)
  persistirSalvos()
}

const moverParaCarrinho = (item) => {
  cart.adicionar ? cart.adicionar(item) : cart.items.push({ ...item, qty: 1 })
  removerSalvo(item.id || item._id)
  drawerTab.value = 'carrinho'
  addToast('Adicionado ao carrinho', item.nome, 'success')
}

const moverTodosParaCarrinho = () => {
  const count = savedItems.value.length
  savedItems.value.forEach(item => {
    cart.adicionar ? cart.adicionar(item) : cart.items.push({ ...item, qty: 1 })
  })
  savedItems.value = []
  persistirSalvos()
  drawerTab.value = 'carrinho'
  addToast(`${count} ${count === 1 ? 'item movido' : 'itens movidos'}`, 'para o carrinho', 'success')
}

/* ── Limpar carrinho ── */
const confirmarLimparCarrinho = () => { confirmLimpar.value = true }

const limparCarrinho = () => {
  cart.limpar()
  confirmLimpar.value = false
  addToast('Carrinho limpo', '', 'info')
}

/* ── Usuário ── */
const primeiroNome = computed(() => (auth.user?.nome || '').split(' ')[0])
const inicialNome  = computed(() => (auth.user?.nome || 'U').charAt(0).toUpperCase())

/* ── Features do modal ── */
const currentFeatures = computed(() =>
  modalTab.value === 'login'
    ? ['Acesso a edições limitadas', 'Histórico de pedidos completo', 'Atendimento VIP 24h']
    : ['Frete VIP gratuito sempre', 'Acesso antecipado a lançamentos', 'Programa de fidelidade exclusivo']
)

/* ── Força da senha ── */
const forcaSenha = computed(() => {
  const s = form.value.senha
  if (!s) return { pct: 0, cor: '', label: '' }
  let score = 0
  if (s.length >= 8)           score++
  if (s.length >= 12)          score++
  if (/[A-Z]/.test(s))        score++
  if (/[0-9]/.test(s))        score++
  if (/[^A-Za-z0-9]/.test(s)) score++
  return [
    { pct: 20,  cor: '#ef4444', label: 'Muito fraca' },
    { pct: 40,  cor: '#f97316', label: 'Fraca' },
    { pct: 60,  cor: '#eab308', label: 'Média' },
    { pct: 80,  cor: '#22c55e', label: 'Forte' },
    { pct: 100, cor: '#16a34a', label: 'Muito forte' },
  ][Math.min(score - 1, 4)] || { pct: 10, cor: '#ef4444', label: 'Muito fraca' }
})

/* ── Scroll ── */
let lastScrollY = 0
const handleScroll = () => {
  const y    = window.scrollY
  const docH = document.documentElement.scrollHeight - window.innerHeight
  scrolled.value       = y > 40
  scrollProgress.value = docH > 0 ? (y / docH) * 100 : 0
  if (y > 200) scrollHide.value = y > lastScrollY
  else         scrollHide.value = false
  lastScrollY = y
}

/* ── Busca ── */
const toggleSearch = async () => {
  searchOpen.value = !searchOpen.value
  if (searchOpen.value) { await nextTick(); searchInput.value?.focus() }
  else clearSearch()
}
const closeSearch = () => { searchOpen.value = false; clearSearch() }
const clearSearch = () => {
  searchQuery.value = ''
  searchResults.value = []
  searchLoading.value = false
  searchFocusIdx.value = -1
  clearTimeout(searchTimer)
}

const searchNavUp = () => {
  if (searchFocusIdx.value > 0) searchFocusIdx.value--
  else searchFocusIdx.value = searchResults.value.length - 1
}
const searchNavDown = () => {
  if (searchFocusIdx.value < searchResults.value.length - 1) searchFocusIdx.value++
  else searchFocusIdx.value = 0
}

const onSearchInput = () => {
  clearTimeout(searchTimer)
  searchFocusIdx.value = -1
  const q = searchQuery.value.trim()
  if (q.length < 2) { searchResults.value = []; searchLoading.value = false; return }
  searchLoading.value = true
  searchResults.value = []
  searchTimer = setTimeout(async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/produtos?busca=${encodeURIComponent(q)}&limite=5`)
      if (res.ok) { const data = await res.json(); searchResults.value = data.produtos || data || [] }
    } catch { searchResults.value = [] }
    finally  { searchLoading.value = false }
  }, 280)
}

const irParaBusca = () => {
  if (searchFocusIdx.value >= 0 && searchResults.value[searchFocusIdx.value]) {
    const prod = searchResults.value[searchFocusIdx.value]
    irParaProduto(prod._id || prod.id)
    return
  }
  if (!searchQuery.value.trim()) return
  router.push({ path: '/loja', query: { busca: searchQuery.value.trim() } })
  closeSearch()
}
const irParaProduto = (id) => { router.push(`/produto/${id}`); closeSearch() }

/* ── Idioma ── */
const trocarIdioma = (lang) => { locale.value = lang; localStorage.setItem('noir_locale', lang); acessOpen.value = false }

/* ── Clique fora ── */
const handleOutsideClick = (e) => {
  if (acessOpen.value    && !e.target.closest('.nb-acess-wrap')  && !e.target.closest('.pref-panel'))  acessOpen.value   = false
  if (searchOpen.value   && !e.target.closest('.nb-search-wrap'))                                       closeSearch()
  if (userDropOpen.value && userDropRef.value && !userDropRef.value.contains(e.target))                userDropOpen.value = false
  if (confirmLimpar.value && !e.target.closest('.drawer__confirm-bar') && !e.target.closest('.drawer__clear-btn')) confirmLimpar.value = false
}

/* ── Modal ── */
const openModal  = (tab, comAviso = false) => {
  modalTab.value = tab; formError.value = ''; campoErro.value = ''; focusField.value = ''; loginNecessario.value = comAviso
  form.value = { email: '', senha: '', senha2: '', nome: '', sobrenome: '' }
  showPass.value = false; showPass2.value = false; aceitouTermos.value = false; termosOpen.value = false
  modalOpen.value = true
}
const closeModal = () => { modalOpen.value = false; formError.value = ''; campoErro.value = ''; loginNecessario.value = false }
const switchTab  = (tab) => {
  modalTab.value = tab; formError.value = ''; campoErro.value = ''
  form.value = { email: '', senha: '', senha2: '', nome: '', sobrenome: '' }
  termosOpen.value = false
}

/* ── AUTH — Login ── */
const fazerLogin = async () => {
  formError.value = ''; campoErro.value = ''
  if (loginBloqueado.value) { formError.value = `Aguarde ${bloqueioRestante.value}s antes de tentar novamente.`; return }
  if (!form.value.email || !form.value.email.includes('@')) { formError.value = 'Informe um e-mail válido.'; campoErro.value = 'email'; return }
  if (!form.value.senha) { formError.value = 'Informe a senha.'; campoErro.value = 'senha'; return }
  try {
    await auth.login(form.value.email, form.value.senha)
    registrarSucesso()
    closeModal()
    addToast('Bem-vindo de volta!', primeiroNome.value || '', 'success')
  } catch {
    registrarFalha()
    const restantes = tentativasRestantes.value
    if (loginBloqueado.value) {
      formError.value = `Muitas tentativas. Acesso bloqueado por ${bloqueioRestante.value}s.`
    } else if (restantes <= 2) {
      formError.value = `Credenciais inválidas. ${restantes} tentativa${restantes !== 1 ? 's' : ''} restante${restantes !== 1 ? 's' : ''}.`
    } else {
      formError.value = auth.error || 'E-mail ou senha incorretos.'
    }
    campoErro.value = 'senha'
    addToast('Falha no login', formError.value, 'error')
  }
}

const fazerCadastro = async () => {
  formError.value = ''; campoErro.value = ''
  if (!form.value.nome.trim())          { formError.value = 'Informe seu nome.'; campoErro.value = 'nome'; return }
  if (!form.value.email.includes('@'))  { formError.value = 'E-mail inválido.'; campoErro.value = 'email'; return }
  if (form.value.senha.length < 8)      { formError.value = 'Senha com mínimo 8 caracteres.'; campoErro.value = 'senha'; return }
  if (form.value.senha !== form.value.senha2) { formError.value = 'As senhas não coincidem.'; campoErro.value = 'senha'; return }
  if (!aceitouTermos.value)             { formError.value = 'Aceite os Termos de Uso para continuar.'; return }
  try {
    await auth.register(form.value.nome, form.value.sobrenome, form.value.email, form.value.senha)
    registrarSucesso()
    closeModal()
    addToast('Conta criada com sucesso!', `Bem-vindo, ${form.value.nome}`, 'success')
  } catch {
    formError.value = auth.error || 'Erro ao cadastrar. Tente novamente.'
    addToast('Erro ao cadastrar', formError.value, 'error')
  }
}

/* ── Google OAuth ── */
const loginGoogle = () => {
  if (!window.google) { alert('Google OAuth não carregado.'); return }
  window.google.accounts.oauth2.initTokenClient({
   client_id: '1072334614026-5g7u8oj8i1esvdkd5omlgbuirun0f2g6.apps.googleusercontent.com',
    scope: 'email profile',
    callback: async (response) => {
      if (response.error) return
      try {
        const res     = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', { headers: { Authorization: `Bearer ${response.access_token}` } })
        const perfil  = await res.json()
        const resultado = await auth.loginGoogle(perfil)
        if (resultado?.novoUsuario || resultado?.isNew) {
          switchTab('cadastro')
          form.value.nome      = perfil.given_name || ''
          form.value.sobrenome = perfil.family_name || ''
          form.value.email     = perfil.email || ''
          formError.value = ''
          return
        }
        registrarSucesso()
        closeModal()
        addToast('Login com Google realizado!', '', 'success')
      } catch {
        const msg = (auth.error || '').toLowerCase()
        if (msg.includes('não encontrado') || msg.includes('not found') || msg.includes('cadastro') || msg.includes('register')) {
          switchTab('cadastro')
          formError.value = 'Conta não encontrada. Por favor, faça seu cadastro primeiro.'
        } else {
          formError.value = 'Erro ao autenticar com Google. Tente novamente.'
          addToast('Erro Google OAuth', formError.value, 'error')
        }
      }
    }
  }).requestAccessToken()
}

const fazerLogout = async () => {
  userDropOpen.value = false
  sidebarOpen.value  = false
  await auth.logout()
  cart.limpar()
  router.push('/')
  addToast('Até logo!', 'Sessão encerrada com segurança', 'info')
}

/* ── Navegação ── */
const abrirCarrinho = () => { cartOpen.value = true; drawerTab.value = 'carrinho' }

const abrirComprasFuturas = () => {
  userDropOpen.value = false
  cartOpen.value     = true
  drawerTab.value    = 'futuras'
}

const irParaConta = () => {
  userDropOpen.value = false; sidebarOpen.value = false
  router.push('/configuracoes?secao=pedidos')
}
const changeQty  = (item, d) => cart.alterarQty(item.id || item._id, d)
const removeItem = (id) => {
  cart.remover(id)
  addToast('Item removido', '', 'info')
}

const irParaCheckout = () => {
  if (!auth.isLogado) { cartOpen.value = false; openModal('login', true); return }
  const items = JSON.parse(JSON.stringify(cart.items))
  if (!items.length) return
  cartOpen.value = false
  window.__noirCarrinho = items
  window.dispatchEvent(new CustomEvent('abrir-checkout', { detail: items }))
}

/* ── Lock scroll ── */
const lockScroll = (v) => { if (document) document.body.style.overflow = v ? 'hidden' : '' }
watch([modalOpen, cartOpen, sidebarOpen], ([m, c, s]) => lockScroll(m || c || s))

/* ── Keyboard ── */
const handleKeydown = (e) => {
  if (e.key !== 'Escape') return
  if (modalOpen.value)     closeModal()
  if (cartOpen.value)      cartOpen.value     = false
  if (sidebarOpen.value)   sidebarOpen.value  = false
  if (acessOpen.value)     acessOpen.value    = false
  if (searchOpen.value)    closeSearch()
  if (userDropOpen.value)  userDropOpen.value = false
  if (confirmLimpar.value) confirmLimpar.value = false
}

const handleAuthExpirado = () => {
  auth.user = null; auth.token = null
  cart.limpar()
  modalOpen.value = false; cartOpen.value = false; sidebarOpen.value = false; userDropOpen.value = false
  addToast('Sessão expirada', 'Por favor, faça login novamente', 'error')
}

onMounted(() => {
  window.addEventListener('scroll',         handleScroll,       { passive: true })
  window.addEventListener('click',          handleOutsideClick)
  window.addEventListener('keydown',        handleKeydown)
  window.addEventListener('carrinho-limpo', () => cart.limpar())
  window.addEventListener('auth:expirado',  handleAuthExpirado)
  const saved = localStorage.getItem('noir_locale')
  if (saved && ['pt-BR', 'en', 'en-US'].includes(saved)) locale.value = saved
  carregarEstadoSeguranca()
  carregarSalvos()
  updateClock()
  clockInterval = setInterval(updateClock, 1000)
})

onUnmounted(() => {
  window.removeEventListener('scroll',        handleScroll)
  window.removeEventListener('click',         handleOutsideClick)
  window.removeEventListener('keydown',       handleKeydown)
  window.removeEventListener('auth:expirado', handleAuthExpirado)
  clearTimeout(searchTimer)
  clearInterval(bloqueioInterval)
  clearInterval(clockInterval)
})

watch(
  () => auth.isLogado,
  (logado) => { if (logado) cart.init(); else cart.limpar() },
  { immediate: true }
)
</script>

<style scoped>

/* ══════════════════════════════════════
   SCROLL PROGRESS — realm-aware gradient
══════════════════════════════════════ */
.nb-progress {
  position: fixed; top: 0; left: 0; width: 100%; height: 2px;
  background: var(--grad-btn);
  transform-origin: left; transform: scaleX(0);
  z-index: 99999; pointer-events: none; transition: transform .1s linear;
}

/* ══════════════════════════════════════
   NAVBAR
══════════════════════════════════════ */
.navbar {
  position: fixed; top: 0; left: 0; right: 0;
  z-index: var(--z-high, 1000);
  height: var(--navbar-h, 56px);
  display: flex; align-items: center;
  background: var(--navbar-bg);
  font-family: var(--font-sans, 'Syne', sans-serif);
  transition: height .4s cubic-bezier(.16,1,.3,1), background .4s ease,
              box-shadow .4s ease, transform .4s cubic-bezier(.16,1,.3,1);
  will-change: transform;
}
.navbar-root { display: contents; }

.navbar--scrolled {
  height: max(48px, calc(var(--navbar-h, 68px) - 12px));
  background: var(--navbar-bg-scroll) !important;
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  backdrop-filter: blur(20px) saturate(180%);
  box-shadow: 0 1px 0 var(--cor-borda), 0 2px 20px rgba(0,0,0,.12);
}

.navbar--hidden { transform: translateY(-110%); }

.navbar__inner {
  width: 100%; max-width: 1760px; margin: 0 auto; padding: 0 44px;
  display: grid; grid-template-columns: 1fr auto 1fr;
  align-items: center; gap: 16px;
}

.navbar__left { display: flex; align-items: center; gap: 14px; justify-self: start; }

/* ── BURGER ── */
.nb-burger {
  background: none; border: none; cursor: pointer; padding: 6px 4px;
  display: none; flex-direction: column; gap: 5px; width: 28px; flex-shrink: 0;
}
.nb-burger__bar {
  display: block; height: 1.5px; background: var(--cor-texto-2); border-radius: 2px;
  transform-origin: center;
  transition: transform .35s cubic-bezier(.16,1,.3,1), width .35s cubic-bezier(.16,1,.3,1),
              opacity .25s ease, background .25s ease;
}
.nb-burger__bar--1 { width: 22px; }
.nb-burger__bar--2 { width: 14px; }
.nb-burger__bar--3 { width: 8px; }
.nb-burger:hover .nb-burger__bar    { background: var(--cor-primaria); }
.nb-burger:hover .nb-burger__bar--2 { width: 22px; }
.nb-burger:hover .nb-burger__bar--3 { width: 22px; }
.nb-burger.is-open .nb-burger__bar--1 { transform: translateY(6.5px) rotate(45deg); width: 22px; background: var(--cor-primaria); }
.nb-burger.is-open .nb-burger__bar--2 { transform: scaleX(0); opacity: 0; }
.nb-burger.is-open .nb-burger__bar--3 { transform: translateY(-6.5px) rotate(-45deg); width: 22px; background: var(--cor-primaria); }

/* ── LOGO ── */
.nb-logo {
  justify-self: center; display: flex; align-items: center; gap: 9px;
  text-decoration: none; flex-shrink: 0;
}
.nb-logo__img { height: 48px; width: auto; transition: opacity .25s; object-fit: contain; }
.nb-logo:hover .nb-logo__img { opacity: 0.82; }
.navbar--scrolled .nb-logo__img { height: 36px; }

.nb-logo__mark {
  width: 34px; height: 34px; flex-shrink: 0; border-radius: 50%;
  border: 1.5px solid rgba(245,166,35,0.45);
  display: flex; align-items: center; justify-content: center;
  transition: border-color .25s; position: relative;
}
.nb-logo__mark::before { content: '⊕'; color: var(--cor-primaria); font-size: 13px; line-height: 1; }
.nb-logo:hover .nb-logo__mark { border-color: var(--cor-primaria); }
.nb-logo__text {
  font-family: var(--font-serif, 'Playfair Display', serif);
  font-size: 18px; font-style: italic; letter-spacing: 0.16em;
  color: var(--cor-texto); transition: opacity .25s;
}
.nb-logo__text em { color: var(--cor-primaria); font-style: normal; }
.nb-logo:hover .nb-logo__text { opacity: 0.85; }
.navbar--scrolled .nb-logo__mark { width: 26px; height: 26px; }
.navbar--scrolled .nb-logo__text { font-size: 14px; }

/* ── LINKS DESKTOP ── */
.nb-links { display: flex; gap: 16px; align-items: center; }
.nb-link {
  font-size: 9px; letter-spacing: 0.38em; text-transform: uppercase; font-weight: 600;
  color: var(--cor-texto-2); text-decoration: none; display: flex; align-items: center; gap: 5px;
  position: relative; padding-bottom: 3px; transition: color .25s ease;
}
.nb-link::after {
  content: ''; position: absolute; bottom: 0; left: 0; width: 0; height: 1.5px;
  background: linear-gradient(90deg, var(--cor-secundaria) 0%, var(--cor-primaria) 100%);
  border-radius: 0 2px 2px 0; transition: width .35s cubic-bezier(.16,1,.3,1);
}
.nb-link:hover { color: var(--cor-primaria); }
.nb-link:hover::after, .nb-link.router-link-exact-active::after { width: 100%; }
.nb-link.router-link-exact-active { color: var(--cor-primaria); }

.nb-link--gamer {
  color: var(--cor-primaria); font-weight: 700;
  background: none !important; -webkit-text-fill-color: unset !important;
  border: none !important; padding: 4px 2px; margin-left: 2px; box-shadow: none !important;
}
.nb-link--gamer::before { display: none !important; }
.nb-link--gamer::after { background: linear-gradient(90deg, var(--cor-secundaria) 0%, var(--cor-primaria) 100%); }
.nb-link--gamer:hover { color: var(--cor-primaria); box-shadow: none !important; }
.nb-link--gamer__ico {
  font-family: 'Noto Serif JP', 'Yu Mincho', serif;
  font-size: 14px; color: var(--cor-primaria); opacity: 0.80; line-height: 1;
  transition: opacity .25s, transform .35s cubic-bezier(.16,1,.3,1); display: inline-block;
}
.nb-link--gamer:hover .nb-link--gamer__ico { opacity: 1; transform: rotate(-15deg) scale(1.15); }

/* ── DIREITA ── */
.nb-right { justify-self: end; display: flex; align-items: center; gap: 6px; }

.nb-icon {
  width: 34px; height: 34px; border-radius: var(--r-sm, 4px);
  display: flex; align-items: center; justify-content: center;
  background: none; border: none; color: var(--cor-texto-2); cursor: pointer;
  transition: color .25s, background .25s; flex-shrink: 0;
}
.nb-icon:hover, .nb-icon.is-active { color: var(--cor-primaria); background: var(--gold-08); }

.nb-cart { position: relative; }
.nb-cart__badge {
  position: absolute; top: 2px; right: 2px;
  background: var(--cor-primaria); color: #0A0A0A !important;
  font-size: 11px !important; font-weight: 900 !important;
  font-family: 'DM Mono', 'Courier New', monospace !important; letter-spacing: 0 !important;
  min-width: 14px; height: 14px; border-radius: 3px;
  display: flex; align-items: center; justify-content: center;
  padding: 0 3px; line-height: 1; box-shadow: 0 2px 6px rgba(0,0,0,0.4); pointer-events: none; z-index: 1;
}
.nb-cart__badge.is-bounce { animation: badge-bounce .5s cubic-bezier(.19,1,.22,1); }
@keyframes badge-bounce { 0%{transform:scale(1)} 40%{transform:scale(1.5)} 100%{transform:scale(1)} }

.nb-search-wrap { position: relative; }
.nb-sep { width: 1px; height: 18px; background: var(--cor-borda); margin: 0 4px; }
.nb-acess-wrap { position: relative; }

/* ══════════════════════════════════════
   ÁREA DE USUÁRIO
══════════════════════════════════════ */
.nb-user-area { position: relative; }
.nb-user-wrap { position: relative; }
.nb-user {
  display: flex; align-items: center; gap: 7px;
  background: none; border: none; cursor: pointer; padding: 4px 6px;
  border-radius: 6px; transition: background .25s;
}
.nb-user:hover { background: var(--gold-08); }
.nb-avatar {
  width: 30px; height: 30px; border-radius: 6px;
  background: var(--grad-btn);
  display: flex; align-items: center; justify-content: center;
  font-weight: 700; font-size: 11px; color: #0A0A0A;
  overflow: hidden; flex-shrink: 0; border: 1.5px solid rgba(245,166,35,.35);
}
.nb-avatar img { width: 100%; height: 100%; object-fit: cover; display: block; }
.nb-user__info  { display: flex; flex-direction: column; line-height: 1.2; }
.nb-user__nome  { font-size: 11px; font-weight: 500; color: var(--cor-texto-2); max-width: 70px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.nb-user__vip   { font-size: 8px; letter-spacing: .1em; font-weight: 700; background: var(--grad-texto); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
.nb-user__chevron { color: var(--cor-texto-3); transition: transform .3s cubic-bezier(.16,1,.3,1); flex-shrink: 0; }
.nb-user__chevron.is-open { transform: rotate(180deg); }

.nb-user-drop {
  position: absolute; top: calc(100% + 10px); right: 0; width: 252px;
  background: var(--or-deep, #09090f);
  border: 0.5px solid var(--or-hair, rgba(245,166,35,0.12));
  box-shadow: 0 20px 60px rgba(0,0,0,0.65), 0 4px 16px rgba(0,0,0,0.35);
  z-index: 9999; overflow: hidden;
}
.nb-user-drop::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 0.5px;
  background: linear-gradient(90deg, transparent, var(--cor-secundaria) 20%, var(--cor-primaria) 50%, var(--cor-secundaria) 80%, transparent);
  opacity: 0.65;
}
.nb-drop-head { display: flex; align-items: center; gap: 12px; padding: 16px 18px; background: rgba(245,166,35,0.03); }
.nb-drop-avatar {
  width: 38px; height: 38px; border-radius: 6px; background: var(--grad-btn);
  display: flex; align-items: center; justify-content: center;
  font-weight: 700; font-size: 14px; color: #0A0A0A;
  overflow: hidden; flex-shrink: 0; border: 1.5px solid rgba(245,166,35,.3);
}
.nb-drop-avatar img { width: 100%; height: 100%; object-fit: cover; display: block; }
.nb-drop-nome  { font-size: 12px; font-weight: 600; color: var(--cor-texto); line-height: 1.3; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 150px; }
.nb-drop-email { font-size: 10px; color: var(--cor-texto-3); letter-spacing: .02em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 150px; }
.nb-drop-vip   { font-size: 8px; letter-spacing: .15em; font-weight: 700; background: var(--grad-texto); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }

/* Horário Brasília no dropdown */
.nb-drop-clock {
  display: flex; align-items: center; gap: 7px; padding: 7px 18px;
  background: rgba(245,166,35,0.03); border-top: 0.5px solid var(--or-hair-2);
}
.nb-drop-clock svg { color: var(--or-gold); opacity: .5; flex-shrink: 0; }
.nb-drop-clock__label { font-family: var(--font-sans); font-size: 8px; letter-spacing: .35em; text-transform: uppercase; color: var(--or-silk-3); }
.nb-drop-clock__time { font-family: 'DM Mono', 'Courier New', monospace; font-size: 11px; color: var(--or-gold); margin-left: auto; letter-spacing: .08em; }

.nb-drop-sep { position: relative; height: 13px; margin: 2px 0; display: flex; align-items: center; }
.nb-drop-sep::before { content: ''; position: absolute; left: 0; right: 0; top: 50%; height: 0.5px; background: linear-gradient(90deg, transparent, var(--or-hair, rgba(245,166,35,0.12)), transparent); }
.nb-drop-sep::after { content: '◆'; position: absolute; left: 50%; transform: translateX(-50%); font-size: 4px; color: var(--cor-primaria); background: var(--or-deep, #09090f); padding: 0 6px; opacity: 0.45; line-height: 1; z-index: 1; }
.nb-drop-item {
  width: 100%; display: flex; align-items: center; gap: 10px;
  padding: 11px 18px; background: none; border: none;
  text-decoration: none; font-family: var(--font-sans);
  font-size: 11px; letter-spacing: .04em; color: var(--cor-texto-2);
  cursor: pointer; transition: all .2s; position: relative;
}
.nb-drop-item svg { color: var(--cor-texto-3); flex-shrink: 0; transition: color .2s; }
.nb-drop-item:hover { background: var(--gold-08); color: var(--cor-primaria); padding-left: 22px; }
.nb-drop-item:hover svg { color: var(--cor-primaria); }
.nb-drop-item--admin { color: var(--cor-secundaria); }
.nb-drop-item--admin svg { color: var(--cor-secundaria); }
.nb-drop-item--admin:hover { color: var(--cor-secundaria-h, #E8C84A); background: rgba(212,175,55,0.08); }
.nb-drop-item--saved { color: var(--or-gold, #F5A623); opacity: .8; }
.nb-drop-item--saved svg { color: var(--or-gold, #F5A623); opacity: .65; }
.nb-drop-item--saved:hover { opacity: 1; background: rgba(245,166,35,0.06); color: var(--or-gold, #F5A623); }
.nb-drop-item--sair { color: rgba(239,68,68,.65); }
.nb-drop-item--sair svg { color: rgba(239,68,68,.5); }
.nb-drop-item--sair:hover { background: rgba(239,68,68,.06); color: #ef4444; }
.nb-drop-item--sair:hover svg { color: #ef4444; }
.nb-drop-badge { margin-left: auto; background: var(--grad-btn); color: #0A0A0A; font-size: 8px; font-weight: 900; min-width: 16px; height: 16px; border-radius: 50%; display: flex; align-items: center; justify-content: center; padding: 0 4px; line-height: 1; }
.nb-drop-badge--saved { background: rgba(245,166,35,0.2); color: var(--or-gold, #F5A623); }
.drop-down-enter-active, .drop-down-leave-active { transition: opacity .2s, transform .25s cubic-bezier(.16,1,.3,1); }
.drop-down-enter-from, .drop-down-leave-to { opacity: 0; transform: translateY(-8px) scale(.97); }

.nb-auth { display: flex; align-items: center; gap: 8px; }
.nb-entrar { background: none; border: none; font-family: var(--font-sans); font-size: 9px; letter-spacing: .25em; text-transform: uppercase; color: var(--cor-texto-2); cursor: pointer; transition: color .25s; white-space: nowrap; }
.nb-entrar:hover { color: var(--cor-primaria); }
.nb-cadastrar { background: var(--grad-btn); border: none; border-radius: 2px; padding: 7px 14px; font-family: var(--font-sans); font-size: 9px; font-weight: 700; letter-spacing: .18em; text-transform: uppercase; color: #FFFFFF; cursor: pointer; white-space: nowrap; box-shadow: var(--shadow-btn); transition: transform .25s, box-shadow .25s; }
.nb-cadastrar:hover { transform: translateY(-1px); box-shadow: var(--shadow-btn-h, var(--shadow-btn)); }

/* ══════════════════════════════════════
   TRANSIÇÕES
══════════════════════════════════════ */
.fade-enter-active, .fade-leave-active { transition: opacity .3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.slide-enter-active, .slide-leave-active { transition: opacity .2s, transform .2s; }
.slide-enter-from { opacity: 0; transform: translateX(12px); }
.slide-leave-to   { opacity: 0; transform: translateX(-12px); }
.slide-down-enter-active, .slide-down-leave-active { transition: all .3s; }
.slide-down-enter-from, .slide-down-leave-to { opacity: 0; transform: translateY(-8px); }
.search-drop-enter-active, .search-drop-leave-active { transition: opacity .2s, transform .2s; }
.search-drop-enter-from, .search-drop-leave-to { opacity: 0; transform: translateY(-10px) scale(.97); }
.pref-drop-enter-active, .pref-drop-leave-active { transition: opacity .2s, transform .25s cubic-bezier(.16,1,.3,1); }
.pref-drop-enter-from, .pref-drop-leave-to { opacity: 0; transform: translateY(-8px) scale(.97); }

.nb-overlay {
  position: fixed; inset: 0; z-index: var(--z-modal, 10000);
  background: var(--overlay-bg);
  -webkit-backdrop-filter: blur(24px) saturate(150%);
  backdrop-filter: blur(24px) saturate(150%);
  display: flex; align-items: center; justify-content: center; padding: 20px;
}

/* ── AUTH MODAL ── */
/* Orbs atmosféricos */
.auth-orb {
  position: absolute; border-radius: 50%; pointer-events: none; z-index: 0;
  filter: blur(60px);
}
.auth-orb--1 {
  width: 220px; height: 220px; top: -60px; left: -60px;
  background: radial-gradient(circle, rgba(245,166,35,0.18) 0%, transparent 70%);
  animation: orb-drift-1 8s ease-in-out infinite;
}
.auth-orb--2 {
  width: 160px; height: 160px; bottom: 40px; right: -40px;
  background: radial-gradient(circle, rgba(245,166,35,0.10) 0%, transparent 70%);
  animation: orb-drift-2 11s ease-in-out infinite;
}
.auth-orb--3 {
  width: 100px; height: 100px; top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%);
  animation: orb-drift-3 14s ease-in-out infinite;
}
@keyframes orb-drift-1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(20px,30px)} }
@keyframes orb-drift-2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-15px,-20px)} }
@keyframes orb-drift-3 { 0%,100%{transform:translate(-50%,-50%) scale(1)} 50%{transform:translate(-50%,-50%) scale(1.4)} }

.auth-esq {
  background: var(--or-void); padding: 48px 32px;
  display: flex; flex-direction: column;
  border-right: 0.5px solid var(--or-hair);
  position: relative; overflow: hidden;
}
.auth-esq::after { content: ''; position: absolute; top: 0; bottom: 0; right: -0.5px; width: 0.5px; background: linear-gradient(180deg, transparent 0%, var(--cor-secundaria) 20%, var(--cor-primaria) 50%, var(--cor-secundaria) 80%, transparent 100%); opacity: 0.6; }
.auth-brand { font-family: var(--font-serif); font-size: 11px; font-weight: 400; letter-spacing: .55em; text-transform: uppercase; color: var(--or-gold); display: flex; align-items: center; gap: 10px; margin-bottom: 48px; position: relative; z-index: 1; }
.auth-brand__icon { font-size: 16px; opacity: .8; color: var(--or-gold); }
.auth-brand em { font-style: italic; opacity: .65; color: var(--or-gold); }
.auth-copy { position: relative; z-index: 1; flex: 1; }
.auth-titulo { font-family: var(--font-serif); font-size: 28px; font-weight: 300; font-style: italic; color: var(--or-silk); line-height: 1.25; margin: 0 0 16px; }
.auth-titulo em { font-style: italic; color: var(--or-gold); -webkit-text-fill-color: initial; background: none; }
.auth-desc { font-family: var(--font-sans); font-size: 11px; font-weight: 300; color: var(--or-silk-2); line-height: 1.9; letter-spacing: .04em; }
.auth-feats { list-style: none; padding: 0; margin: 32px 0 0; display: flex; flex-direction: column; gap: 10px; position: relative; z-index: 1; }
.auth-feats li { display: flex; align-items: center; gap: 12px; font-family: var(--font-sans); font-size: 10px; font-weight: 400; letter-spacing: .18em; text-transform: uppercase; color: var(--or-silk-3); }
.auth-feats li span { font-size: 5px; color: var(--or-gold); opacity: .7; flex-shrink: 0; }

/* Watermark painel esquerdo */
.auth-watermark {
  position: absolute; bottom: 52px; left: 32px; right: 32px;
  font-family: var(--font-serif); font-size: 9px; font-weight: 300; font-style: italic;
  letter-spacing: .45em; text-transform: uppercase; line-height: 1.8;
  color: var(--or-gold); opacity: .10; pointer-events: none; z-index: 0;
  text-align: center;
}

.auth-ssl { display: flex; align-items: center; gap: 8px; margin-top: auto; padding-top: 24px; font-family: var(--font-sans); font-size: 8px; letter-spacing: .25em; text-transform: uppercase; color: var(--or-silk-4); position: relative; z-index: 1; }
.auth-ssl svg { color: var(--or-gold); opacity: .5; }

.auth-dir { background: var(--or-deep); padding: 40px 44px 36px; display: flex; flex-direction: column; position: relative; overflow-y: auto; scrollbar-width: none; }
.auth-dir::-webkit-scrollbar { display: none; }
.auth-dir::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 0.5px; background: linear-gradient(90deg, transparent, var(--cor-secundaria) 10%, var(--cor-primaria) 50%, var(--cor-secundaria) 90%, transparent); opacity: 0.55; }

.auth-close { position: absolute; top: 16px; right: 16px; width: 28px; height: 28px; background: none; border: 0.5px solid var(--or-hair-2); display: flex; align-items: center; justify-content: center; color: var(--or-silk-3); cursor: pointer; transition: all .35s var(--or-easing); border-radius: 0; z-index: 2; }
.auth-close:hover { border-color: var(--or-gold); color: var(--or-gold); transform: rotate(90deg); }

.auth-aviso { display: flex; align-items: center; gap: 10px; background: rgba(245,166,35,0.05); border-left: 0.5px solid var(--or-gold); padding: 10px 14px; margin-bottom: 12px; font-family: var(--font-sans); font-size: 10px; letter-spacing: .12em; color: var(--or-silk-2); }
.auth-aviso svg { color: var(--or-gold); flex-shrink: 0; }

.auth-bloqueado { display: flex; align-items: flex-start; gap: 12px; background: rgba(239,68,68,.06); border-left: 0.5px solid rgba(239,68,68,.5); padding: 12px 14px; margin-bottom: 12px; animation: bloqueio-pulse 2s ease-in-out infinite; }
.auth-bloqueado svg { color: rgba(239,68,68,.8); flex-shrink: 0; margin-top: 2px; }
.bloqueado-titulo { font-family: var(--font-sans); font-size: 11px; font-weight: 600; color: rgba(239,68,68,.9); letter-spacing: .06em; margin-bottom: 3px; }
.bloqueado-desc { font-family: var(--font-sans); font-size: 10px; color: var(--or-silk-3); letter-spacing: .04em; line-height: 1.5; }
.bloqueado-desc strong { color: rgba(239,68,68,.8); font-weight: 700; }
@keyframes bloqueio-pulse { 0%,100%{border-color:rgba(239,68,68,.5)} 50%{border-color:rgba(239,68,68,.9)} }

.auth-tentativas { display: flex; align-items: center; gap: 10px; padding: 8px 14px; margin-bottom: 12px; background: rgba(245,166,35,.04); border-left: 0.5px solid rgba(245,166,35,.3); font-family: var(--font-sans); font-size: 9px; letter-spacing: .2em; text-transform: uppercase; color: var(--or-silk-3); }
.tentativas-dots { display: flex; gap: 4px; }
.tentativa-dot { width: 8px; height: 8px; border: 0.5px solid var(--or-gold); background: var(--or-gold); opacity: .7; transition: all .3s; }
.tentativa-dot.used { background: transparent; border-color: rgba(239,68,68,.5); opacity: .4; }

/* Tabs com glow na ativa */
.auth-tabs { display: flex; gap: 0; border-bottom: 0.5px solid var(--or-hair-2); margin-bottom: 28px; }
.auth-tab { flex: 1; background: none; border: none; border-bottom: 0.5px solid transparent; margin-bottom: -0.5px; padding: 12px 0; font-family: var(--font-sans); font-size: 8px; font-weight: 400; letter-spacing: .4em; text-transform: uppercase; color: var(--or-silk-3); cursor: pointer; transition: all .35s; position: relative; }
.auth-tab:hover { color: var(--or-silk-2); }
.auth-tab.is-active { color: var(--or-gold); border-bottom-color: var(--or-gold); }
.auth-tab.is-active::after {
  content: ''; position: absolute; bottom: -1px; left: 50%; transform: translateX(-50%);
  width: 80%; height: 1px;
  box-shadow: 0 0 12px 2px var(--or-gold);
  background: var(--or-gold); opacity: .5;
}

.auth-form { display: flex; flex-direction: column; flex: 1; }
.af-duplo { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
.af-campo { display: flex; flex-direction: column; margin-bottom: 18px; position: relative; }
.af-campo label { font-family: var(--font-sans); font-size: 7px; font-weight: 400; letter-spacing: .55em; text-transform: uppercase; color: var(--or-gold); opacity: .7; margin-bottom: 8px; }
.af-linha { display: flex; align-items: center; gap: 8px; border-bottom: 0.5px solid var(--or-hair-2); transition: border-color .4s; padding-bottom: 2px; position: relative; }
.af-linha::after {
  content: ''; position: absolute; bottom: -1px; left: 50%; transform: translateX(-50%);
  width: 0; height: 1.5px; background: var(--or-gold);
  transition: width .4s cubic-bezier(.16,1,.3,1);
}
.af-linha--focus::after { width: 100%; }
.af-linha--focus { border-bottom-color: transparent; }
.af-linha--erro { border-bottom-color: rgba(239,68,68,.6) !important; }
.af-linha--erro::after { background: transparent !important; }
.af-linha input { flex: 1; background: transparent !important; border: none; outline: none; font-family: var(--font-sans); font-size: 13px; font-weight: 300; letter-spacing: .04em; color: var(--or-silk) !important; padding: 8px 0; caret-color: var(--or-gold); -webkit-text-fill-color: var(--or-silk) !important; transition: background-color 9999s ease-in-out 0s, color 9999s ease-in-out 0s; }
.af-linha input:-webkit-autofill, .af-linha input:-webkit-autofill:hover, .af-linha input:-webkit-autofill:focus, .af-linha input:-webkit-autofill:active { -webkit-box-shadow: 0 0 0 1000px var(--or-deep) inset !important; box-shadow: 0 0 0 1000px var(--or-deep) inset !important; -webkit-text-fill-color: var(--or-gold) !important; caret-color: var(--or-gold); transition: background-color 9999s ease-in-out 0s, color 9999s ease-in-out 0s; }
.af-linha input::placeholder { color: var(--or-silk-4); font-size: 12px; letter-spacing: .08em; }
.af-linha input:disabled { opacity: .4; cursor: not-allowed; }
.af-eye { background: none; border: none; padding: 4px; color: var(--or-silk-3); cursor: pointer; display: flex; transition: color .25s; }
.af-eye:hover { color: var(--or-gold); }
.af-campo-erro { font-family: var(--font-sans); font-size: 9px; letter-spacing: .1em; color: rgba(239,68,68,.8); margin-top: 5px; }
.af-esqueceu { text-align: right; margin: -6px 0 16px; }
.af-esqueceu a { font-size: 9px; letter-spacing: .2em; text-transform: uppercase; color: var(--or-silk-3); text-decoration: none; transition: color .25s; }
.af-esqueceu a:hover { color: var(--or-gold); }
.af-forca { display: flex; align-items: center; gap: 12px; margin-top: 8px; }
.forca-bar { flex: 1; height: 1px; background: var(--or-hair-2); position: relative; }
.forca-fill { height: 100%; position: absolute; left: 0; top: 0; transition: width .5s, background .5s; }
.forca-txt { font-size: 8px; letter-spacing: .3em; text-transform: uppercase; white-space: nowrap; font-family: var(--font-sans); min-width: 68px; text-align: right; }
.af-termos { margin-bottom: 14px; }
.af-check-row { display: flex; align-items: center; gap: 10px; cursor: pointer; }
.af-check-row input[type="checkbox"] { display: none; }
.af-check-box { width: 12px; height: 12px; flex-shrink: 0; border: 0.5px solid var(--or-silk-3); display: flex; align-items: center; justify-content: center; background: transparent; }
.af-check-row input:checked ~ .af-check-box { background: var(--or-gold); border-color: var(--or-gold); }
.af-check-row input:checked ~ .af-check-box::after { content: '✓'; font-size: 8px; color: var(--or-void); font-weight: 900; line-height: 1; }
.af-check-texto { font-size: 10px; letter-spacing: .06em; color: var(--or-silk-3); line-height: 1.5; }
.af-link-termos { background: none; border: none; padding: 0; color: var(--or-gold); cursor: pointer; font-size: 10px; opacity: .8; text-decoration: none; transition: opacity .2s; }
.af-link-termos:hover { opacity: 1; }
.termos-drop-enter-active, .termos-drop-leave-active { transition: opacity .3s, max-height .4s; overflow: hidden; }
.termos-drop-enter-from, .termos-drop-leave-to { opacity: 0; max-height: 0; }
.termos-drop-enter-to, .termos-drop-leave-from { opacity: 1; max-height: 120px; }
.af-termos-body { margin-top: 10px; padding: 12px 14px; background: var(--or-gold-3); border-left: 0.5px solid var(--or-gold); font-size: 10px; font-weight: 300; color: var(--or-silk-2); line-height: 1.7; letter-spacing: .04em; }
.af-termos-body a { color: var(--or-gold); text-decoration: none; }
.af-erro { display: flex; align-items: center; gap: 8px; font-size: 10px; letter-spacing: .08em; color: rgba(220,100,100,.9); background: rgba(220,80,80,.05); border-left: 0.5px solid rgba(220,100,100,.5); padding: 8px 12px; margin-bottom: 12px; line-height: 1.5; font-family: var(--font-sans); }
.af-erro svg { flex-shrink: 0; }

/* Submit diagonal fill */
.af-submit {
  position: relative; overflow: hidden;
  background: transparent; border: 0.5px solid var(--or-gold); border-radius: 0;
  font-family: var(--font-sans); font-size: 8px; font-weight: 400; letter-spacing: .55em; text-transform: uppercase;
  color: var(--or-gold); padding: 14px; cursor: pointer; min-height: 46px;
  display: flex; align-items: center; justify-content: center; gap: 10px;
  margin-bottom: 14px; transition: color .45s; z-index: 0;
}
.af-submit::before {
  content: ''; position: absolute; inset: 0;
  background: var(--or-gold);
  transform: translateX(-101%) skewX(-8deg);
  transition: transform .55s cubic-bezier(.16,1,.3,1);
  z-index: -1;
}
.af-submit:hover:not(:disabled)::before { transform: translateX(0) skewX(0deg); }
.af-submit:hover:not(:disabled) { color: var(--or-void); }
.af-submit:disabled { opacity: .28; cursor: not-allowed; }

.af-ou { display: flex; align-items: center; gap: 16px; margin-bottom: 10px; }
.af-ou::before, .af-ou::after { content: ''; flex: 1; height: 0.5px; background: var(--or-hair-2); }
.af-ou span { font-size: 8px; letter-spacing: .4em; text-transform: uppercase; color: var(--or-silk-4); white-space: nowrap; }

.af-google-wrap { margin-bottom: 12px; }
.af-google { display: flex; align-items: center; justify-content: center; gap: 12px; width: 100%; border: 0.5px solid var(--or-hair-2); border-radius: 0; padding: 11px; cursor: pointer; font-family: var(--font-sans); font-size: 9px; font-weight: 400; letter-spacing: .3em; text-transform: uppercase; color: var(--or-silk-2); background: transparent; transition: all .35s; }
.af-google:hover:not(:disabled) { border-color: var(--or-silk-3); background: var(--or-hair-2); color: var(--or-silk); }
.af-google:disabled { opacity: .3; cursor: not-allowed; }
.af-google-nota { display: flex; align-items: flex-start; gap: 6px; margin-top: 7px; font-family: var(--font-sans); font-size: 9px; letter-spacing: .05em; color: var(--or-silk-4); line-height: 1.5; }
.af-google-nota svg { flex-shrink: 0; color: var(--or-gold); opacity: .5; margin-top: 2px; }
.af-rodape { font-size: 10px; letter-spacing: .1em; color: var(--or-silk-3); text-align: center; margin-top: auto; padding-top: 8px; }
.af-rodape button { background: none; border: none; font-size: 10px; letter-spacing: .1em; color: var(--or-gold); cursor: pointer; opacity: .8; transition: opacity .25s; }
.af-rodape button:hover { opacity: 1; }

.or-spinner-sm { width: 10px; height: 10px; border: 1px solid rgba(245,166,35,.25); border-top-color: var(--or-gold); border-radius: 50%; animation: or-spin .8s linear infinite; flex-shrink: 0; }
@keyframes or-spin { to { transform: rotate(360deg); } }

/* ══════════════════════════════════════
   RESPONSIVO
══════════════════════════════════════ */
@media (max-width: 1100px) {
  .nb-links { display: none; }
  .nb-burger { display: flex; }
  .navbar__inner { grid-template-columns: auto 1fr auto; }
  .navbar__left { justify-self: start; }
  .nb-logo { justify-self: center; }
  .nb-right { justify-self: end; }
}
@media (max-width: 768px) {
  .navbar__inner { padding: 0 20px; }
  .nb-user__info, .nb-user__chevron { display: none; }
}
@media (max-width: 480px) {
  .navbar__inner { padding: 0 16px; }
  .nb-sep, .nb-entrar { display: none; }
}
</style>

<style>
/* ═══════════════════════════════════════════════════════════
   NOIR & OR — ESTILOS GLOBAIS
═══════════════════════════════════════════════════════════ */

:root {
  --or-void:    #06060d;
  --or-deep:    #09090f;
  --or-surface: #0c0c18;
  --or-silk:    #ede8e0;
  --or-silk-2:  rgba(237,232,224,0.50);
  --or-silk-3:  rgba(237,232,224,0.22);
  --or-silk-4:  rgba(237,232,224,0.10);
  --or-gold:    #F5A623;
  --or-gold-2:  rgba(245,166,35,0.14);
  --or-gold-3:  rgba(245,166,35,0.06);
  --or-hair:    rgba(245,166,35,0.12);
  --or-hair-2:  rgba(237,232,224,0.07);
  --or-easing:  cubic-bezier(0.16,1,0.30,1);
  --or-font-num:'DM Mono','Courier New',monospace;
}

body.light-mode {
  --or-gold:   #3D6CBF; --or-gold-2: rgba(61,108,191,0.14); --or-gold-3: rgba(61,108,191,0.06);
  --or-hair:   rgba(61,108,191,0.12); --or-deep: #ffffff; --or-void: #f0f4fa;
  --or-silk:   #0a0a1e; --or-silk-2: rgba(10,10,30,0.60); --or-silk-3: rgba(10,10,30,0.35);
  --or-silk-4: rgba(10,10,30,0.18); --or-hair-2: rgba(10,10,30,0.08);
}
body.gamer-mode {
  --or-gold: #C85014; --or-gold-2: rgba(200,80,20,0.14); --or-gold-3: rgba(200,80,20,0.06);
  --or-hair: rgba(200,80,20,0.12);
}

/* ════════════ TOAST SYSTEM ════════════ */
.toast-container {
  position: fixed; bottom: 24px; right: 24px;
  z-index: 99999; display: flex; flex-direction: column; gap: 10px;
  pointer-events: none;
}
.toast {
  display: flex; align-items: flex-start; gap: 12px;
  min-width: 280px; max-width: 340px;
  background: var(--or-deep);
  border: 0.5px solid var(--or-hair);
  box-shadow: 0 12px 40px rgba(0,0,0,0.55);
  padding: 14px 14px 14px 14px;
  position: relative; overflow: hidden;
  pointer-events: auto;
}
.toast::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 0.5px;
  background: linear-gradient(90deg, transparent, var(--toast-accent, var(--or-gold)), transparent);
  opacity: .7;
}
.toast--success { --toast-accent: #22c55e; }
.toast--error   { --toast-accent: #ef4444; }
.toast--info    { --toast-accent: var(--or-gold); }
.toast__icon {
  width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
  background: color-mix(in srgb, var(--toast-accent, var(--or-gold)) 15%, transparent);
  color: var(--toast-accent, var(--or-gold)); flex-shrink: 0;
}
.toast__body { flex: 1; min-width: 0; }
.toast__title { display: block; font-family: var(--font-sans); font-size: 11px; font-weight: 600; letter-spacing: .06em; color: var(--or-silk); margin-bottom: 2px; }
.toast__msg { display: block; font-family: var(--font-sans); font-size: 10px; font-weight: 300; letter-spacing: .04em; color: var(--or-silk-3); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.toast__close { background: none; border: none; color: var(--or-silk-4); cursor: pointer; display: flex; align-items: center; justify-content: center; width: 18px; height: 18px; flex-shrink: 0; transition: color .2s; }
.toast__close:hover { color: var(--or-gold); }
.toast__progress {
  position: absolute; bottom: 0; left: 0; height: 1px;
  background: var(--toast-accent, var(--or-gold)); opacity: .5;
  width: 100%;
  transform-origin: left;
  animation: toast-progress linear 1 forwards;
}
@keyframes toast-progress { from { transform: scaleX(1); } to { transform: scaleX(0); } }

.toast-enter-active { transition: opacity .3s, transform .4s cubic-bezier(.16,1,.3,1); }
.toast-leave-active { transition: opacity .25s, transform .3s ease; }
.toast-enter-from { opacity: 0; transform: translateX(30px) scale(.95); }
.toast-leave-to { opacity: 0; transform: translateX(30px) scale(.95); }

/* ════════════ PREF PANEL — REALM BUTTONS ════════════ */
.or-panel-border {
  position: absolute; top: 0; left: 0; right: 0; height: 0.5px;
  background: linear-gradient(90deg, transparent, var(--or-gold) 20%, rgba(245,166,35,0.8) 50%, var(--or-gold) 80%, transparent);
  opacity: 0.7; z-index: 2; pointer-events: none;
}
.or-panel-kamon {
  position: absolute; top: 14px; right: 16px;
  font-family: 'Noto Serif JP', 'Yu Mincho', 'Hiragino Mincho Pro', serif;
  font-size: 9px; letter-spacing: .15em; color: var(--or-gold);
  opacity: 0.18; pointer-events: none; z-index: 1; line-height: 1;
}
.or-panel-kamon--pref { top: 12px; right: 14px; font-size: 8px; }

.or-spinner { width: 18px; height: 18px; border: 1px solid var(--or-hair-2); border-top-color: var(--or-gold); border-radius: 50%; animation: or-spin 0.7s linear infinite; }
.search-loading-text { font-family: 'Noto Serif JP', serif; font-size: 9px; letter-spacing: .3em; color: var(--or-gold); opacity: .5; }
@keyframes or-spin { to { transform: rotate(360deg); } }

.pref-panel {
  position: fixed; top: calc(var(--navbar-h, 68px) + 32px); right: 60px;
  width: 300px; background: var(--or-deep);
  border: 0.5px solid var(--or-hair);
  box-shadow: 0 20px 60px rgba(0,0,0,0.6);
  z-index: 9999; overflow: hidden;
}
.pref-header { display: flex; justify-content: space-between; align-items: center; padding: 14px 16px; border-bottom: 0.5px solid var(--or-hair-2); position: relative; z-index: 1; }
.pref-header-inner { display: flex; align-items: center; gap: 10px; }
.pref-kanji { font-family: 'Noto Serif JP', serif; font-size: 18px; color: var(--or-gold); opacity: .3; line-height: 1; }
.pref-title { font-family: var(--font-sans); font-size: 8px; letter-spacing: .45em; text-transform: uppercase; color: var(--or-gold); }
.pref-close { background: none; border: none; color: var(--or-silk-3); cursor: pointer; display: flex; align-items: center; justify-content: center; width: 22px; height: 22px; transition: color .2s, transform .3s; }
.pref-close:hover { color: var(--or-gold); transform: rotate(90deg); }
.pref-body { padding: 16px; display: flex; flex-direction: column; gap: 18px; position: relative; z-index: 1; }
.pref-group { border: none; padding: 0; margin: 0; }
.pref-group__label { font-family: var(--font-sans); font-size: 7px; letter-spacing: .5em; text-transform: uppercase; color: var(--or-silk-3); display: flex; align-items: center; gap: 8px; margin-bottom: 10px; }
.pref-group__label span { font-family: 'Noto Serif JP', serif; font-size: 11px; color: var(--or-gold); opacity: .4; }
.pref-row { display: flex; gap: 6px; flex-wrap: wrap; }
.pref-row--3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px; }

/* Realm buttons */
.pref-realm {
  display: flex; align-items: center; gap: 10px;
  width: 100%; padding: 10px 12px;
  background: none; border: 0.5px solid var(--or-hair-2);
  cursor: pointer; transition: all .3s; position: relative; overflow: hidden;
  margin-bottom: 6px;
}
.pref-realm:last-child { margin-bottom: 0; }
.pref-realm::before {
  content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 0;
  background: var(--realm-color, var(--or-gold)); opacity: .07;
  transition: width .4s cubic-bezier(.16,1,.3,1);
}
.pref-realm:hover::before, .pref-realm.is-active::before { width: 100%; }
.pref-realm:hover { border-color: var(--realm-color, var(--or-gold)); }
.pref-realm.is-active {
  border-color: var(--realm-color, var(--or-gold));
  box-shadow: inset 0 0 0 0.5px color-mix(in srgb, var(--realm-color, var(--or-gold)) 25%, transparent);
}

/* Celestial */
.pref-realm[data-realm="celestial"] { --realm-color: #F5A623; }
/* Autumn */
.pref-realm[data-realm="autumn"]    { --realm-color: #3D6CBF; }
/* Ghost */
.pref-realm[data-realm="ghost"]     { --realm-color: #C85014; }

.pref-realm__orb {
  width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0;
  position: relative; z-index: 1;
}
.pref-realm__orb--celestial {
  background: radial-gradient(circle at 35% 35%, #FFD97D, #F5A623);
  box-shadow: 0 0 8px 2px rgba(245,166,35,0.5);
}
.pref-realm__orb--autumn {
  background: radial-gradient(circle at 35% 35%, #90BAFF, #3D6CBF);
  box-shadow: 0 0 8px 2px rgba(61,108,191,0.5);
}
.pref-realm__orb--ghost {
  background: radial-gradient(circle at 35% 35%, #FF9966, #C85014);
  box-shadow: 0 0 8px 2px rgba(200,80,20,0.5);
}
.pref-realm__body { flex: 1; text-align: left; position: relative; z-index: 1; }
.pref-realm__name { display: block; font-family: var(--font-sans); font-size: 10px; font-weight: 600; letter-spacing: .1em; color: var(--or-silk); }
.pref-realm__sub  { display: block; font-family: var(--font-sans); font-size: 8px; letter-spacing: .15em; color: var(--or-silk-3); margin-top: 1px; }
.pref-realm.is-active .pref-realm__name { color: var(--realm-color, var(--or-gold)); }
.pref-realm__kanji {
  font-family: 'Noto Serif JP', serif; font-size: 16px;
  color: var(--realm-color, var(--or-gold)); opacity: .2;
  line-height: 1; position: relative; z-index: 1;
  transition: opacity .3s;
}
.pref-realm.is-active .pref-realm__kanji,
.pref-realm:hover .pref-realm__kanji { opacity: .5; }

.pref-opt { flex: 1; display: flex; align-items: center; justify-content: center; gap: 6px; padding: 8px 10px; background: none; border: 0.5px solid var(--or-hair-2); font-family: var(--font-sans); font-size: 9px; letter-spacing: .12em; color: var(--or-silk-2); cursor: pointer; transition: all .25s; white-space: nowrap; border-radius: 0; }
.pref-opt:hover { border-color: var(--or-gold); color: var(--or-gold); background: var(--or-gold-3); }
.pref-opt.is-active { border-color: var(--or-gold); color: var(--or-gold); background: var(--or-gold-3); }
.pref-opt.is-active::before { content: '◆'; font-size: 4px; color: var(--or-gold); margin-right: 2px; }
.pref-opt svg { flex-shrink: 0; color: inherit; }
.pref-font { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; padding: 10px 6px; background: none; border: 0.5px solid var(--or-hair-2); cursor: pointer; transition: all .25s; border-radius: 0; }
.pref-font:hover, .pref-font.is-active { border-color: var(--or-gold); background: var(--or-gold-3); }
.pref-font__lbl { font-family: var(--font-sans); font-size: 7px; letter-spacing: .2em; text-transform: uppercase; color: var(--or-silk-3); }

/* Watermark nas preferências */
.pref-watermark {
  text-align: center; padding: 6px 0 2px;
  font-family: var(--font-serif, 'Playfair Display', serif);
  font-size: 8px; font-style: italic; letter-spacing: .55em; text-transform: uppercase;
  color: var(--or-gold); opacity: .12; line-height: 1.6;
  user-select: none; pointer-events: none;
}

/* ════════════ AUTH MODAL ════════════ */
.auth-modal {
  position: relative; display: grid; grid-template-columns: 280px 1fr;
  width: 100%; max-width: 800px; height: min(90vh, 620px);
  border-radius: 0; overflow: hidden;
  border: 0.5px solid var(--or-hair);
  box-shadow: 0 0 0 0.5px var(--or-hair), 0 60px 120px rgba(0,0,0,.85);
  animation: or-modal-in 0.65s var(--or-easing) both;
}
@keyframes or-modal-in { from { opacity: 0; transform: translateY(20px) scale(.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
.auth-modal .auth-dir > *:not(.auth-close) { position: relative; z-index: 1; }

/* ════════════ SEARCH PANEL ════════════ */
.nb-search-panel {
  position: absolute; top: calc(100% + 12px); right: -80px;
  width: 340px; background: var(--or-deep);
  border: 0.5px solid var(--or-hair);
  box-shadow: 0 20px 60px rgba(0,0,0,0.6);
  z-index: 9999; overflow: hidden;
}
.nb-search-panel .or-panel-kamon { font-size: 11px; opacity: .12; top: 10px; right: 12px; }

.nb-search-label { display: flex; align-items: center; gap: 10px; padding: 8px 16px; background: rgba(245,166,35,.025); border-bottom: 0.5px solid var(--or-hair-2); }
.search-kanji { font-family: 'Noto Serif JP', serif; font-size: 14px; color: var(--or-gold); opacity: .35; line-height: 1; }
.search-label-text { font-family: var(--font-sans, 'Syne', sans-serif); font-size: 7px; letter-spacing: .6em; text-transform: uppercase; color: var(--or-silk-3); }

.nb-search-field { display: flex; align-items: center; gap: 10px; padding: 14px 16px; border-bottom: 0.5px solid var(--or-hair-2); position: relative; z-index: 1; }
.nb-search-field svg { color: var(--or-gold); opacity: 0.6; flex-shrink: 0; }
.nb-search-field input { flex: 1; background: none; border: none; outline: none; font-family: var(--font-sans); font-size: 13px; font-weight: 300; color: var(--or-silk); caret-color: var(--or-gold); padding: 0; transition: background-color 9999s ease-in-out 0s, color 9999s ease-in-out 0s; -webkit-text-fill-color: var(--or-silk); }
.nb-search-field input::placeholder { color: var(--or-silk-4); font-size: 12px; }
.nb-search-field input:-webkit-autofill,
.nb-search-field input:-webkit-autofill:hover,
.nb-search-field input:-webkit-autofill:focus,
.nb-search-field input:-webkit-autofill:active { -webkit-box-shadow: 0 0 0 1000px var(--or-deep) inset !important; box-shadow: 0 0 0 1000px var(--or-deep) inset !important; -webkit-text-fill-color: var(--or-silk) !important; caret-color: var(--or-gold); }
body.light-mode .nb-search-field input:-webkit-autofill,
body.light-mode .nb-search-field input:-webkit-autofill:hover,
body.light-mode .nb-search-field input:-webkit-autofill:focus,
body.light-mode .nb-search-field input:-webkit-autofill:active { -webkit-box-shadow: 0 0 0 1000px #ffffff inset !important; box-shadow: 0 0 0 1000px #ffffff inset !important; -webkit-text-fill-color: #0a0a1e !important; }
.search-clear { background: none; border: none; color: var(--or-silk-3); cursor: pointer; display: flex; align-items: center; transition: color .2s; padding: 2px; }
.search-clear:hover { color: var(--or-gold); }

/* Skeleton loading */
.nb-search-skeletons { padding: 8px 0; }
.search-skeleton { display: flex; align-items: center; gap: 12px; padding: 10px 16px; border-bottom: 0.5px solid var(--or-hair-2); }
.search-skeleton:last-child { border-bottom: none; }
.sk-img { width: 40px; height: 40px; background: var(--or-hair-2); flex-shrink: 0; animation: sk-shimmer 1.4s ease-in-out infinite; }
.sk-lines { flex: 1; display: flex; flex-direction: column; gap: 6px; }
.sk-line { height: 8px; background: var(--or-hair-2); border-radius: 2px; animation: sk-shimmer 1.4s ease-in-out infinite; }
.sk-line--name { width: 65%; }
.sk-line--price { width: 30%; animation-delay: .1s; }
@keyframes sk-shimmer {
  0%   { opacity: .4; }
  50%  { opacity: .9; }
  100% { opacity: .4; }
}

.nb-search-results { max-height: 260px; overflow-y: auto; position: relative; z-index: 1; }
.search-result { display: flex; align-items: center; gap: 12px; width: 100%; padding: 11px 16px; background: none; border: none; border-bottom: 0.5px solid var(--or-hair-2); cursor: pointer; transition: background .2s; text-align: left; position: relative; }
.search-result::before { content: ''; position: absolute; left: 0; top: 8px; bottom: 8px; width: .5px; background: var(--or-gold); opacity: 0; transition: opacity .2s; }
.search-result.is-focused,
.search-result:hover { background: var(--or-gold-3); }
.search-result.is-focused::before,
.search-result:hover::before { opacity: .7; }
.search-result:last-child { border-bottom: none; }
.search-result__img { width: 40px; height: 40px; background: rgba(245,166,35,0.04); border: 0.5px solid var(--or-hair-2); display: flex; align-items: center; justify-content: center; overflow: hidden; flex-shrink: 0; }
.search-result__img img { width: 100%; height: 100%; object-fit: cover; }
.search-result__img svg { color: var(--or-silk-3); }
.search-result__info { flex: 1; min-width: 0; }
.search-result__nome { display: block; font-family: var(--font-sans); font-size: 12px; color: var(--or-silk); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.search-result__preco { display: block; font-family: var(--or-font-num); font-size: 10px; color: var(--or-gold); opacity: .8; }
.search-result svg { color: var(--or-silk-4); flex-shrink: 0; }
.search-empty { padding: 20px 16px; font-family: var(--font-sans); font-size: 11px; letter-spacing: .08em; color: var(--or-silk-3); text-align: center; display: flex; flex-direction: column; align-items: center; gap: 8px; position: relative; z-index: 1; }
.search-empty-kanji { font-family: 'Noto Serif JP', serif; font-size: 24px; color: var(--or-gold); opacity: .2; line-height: 1; }
.nb-search-footer { padding: 8px 16px; border-top: 0.5px solid var(--or-hair-2); font-family: var(--font-sans); font-size: 8px; letter-spacing: .15em; color: var(--or-silk-4); display: flex; justify-content: center; gap: 4px; flex-wrap: wrap; position: relative; z-index: 1; }
.nb-search-footer span { font-family: var(--or-font-num); color: var(--or-gold); opacity: .5; padding: 0 3px; background: var(--or-hair-2); border-radius: 2px; }

/* ════════════ DRAWER CARRINHO ════════════ */
.drawer-overlay { position: fixed; inset: 0; z-index: 9998; background: rgba(0,0,0,.75); -webkit-backdrop-filter: blur(8px) saturate(.8); backdrop-filter: blur(8px) saturate(.8); opacity: 0; visibility: hidden; pointer-events: none; transition: opacity .5s var(--or-easing), visibility .5s; }
.drawer-overlay.is-open { opacity: 1; visibility: visible; pointer-events: auto; }
.drawer { position: absolute; top: 0; right: 0; bottom: 0; width: 400px; background: var(--or-deep); border-left: 0.5px solid var(--or-hair); display: flex; flex-direction: column; transform: translateX(100%); transition: transform .65s var(--or-easing); overflow: hidden; }
.drawer-overlay.is-open .drawer { transform: translateX(0); }

.drawer-kamon { position: absolute; bottom: 100px; right: 28px; font-family: 'Noto Serif JP', serif; font-size: 56px; color: var(--or-gold); opacity: .04; pointer-events: none; z-index: 0; line-height: 1; }

/* Horário Brasília no header do drawer */
.drawer__brasilia {
  display: flex; align-items: center; gap: 5px; margin-right: 12px;
  font-family: 'DM Mono', 'Courier New', monospace; font-size: 10px; color: var(--or-silk-3);
}
.drawer__brasilia svg { color: var(--or-gold); opacity: .45; flex-shrink: 0; }
.drawer__brasilia-label { font-family: var(--font-sans); font-size: 7px; letter-spacing: .3em; text-transform: uppercase; color: var(--or-silk-4); margin-left: 2px; }

.drawer__header { display: flex; justify-content: space-between; align-items: center; padding: 24px 32px 16px; border-bottom: 0.5px solid var(--or-hair-2); flex-shrink: 0; position: relative; z-index: 1; }
.drawer__header::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 0.5px; background: linear-gradient(90deg, transparent, var(--cor-secundaria) 20%, var(--cor-primaria) 50%, var(--cor-secundaria) 80%, transparent); opacity: .65; }
.drawer__header__titles { display: flex; align-items: center; gap: 12px; }
.drawer__kanji { font-family: 'Noto Serif JP', serif; font-size: 22px; color: var(--or-gold); opacity: .25; line-height: 1; flex-shrink: 0; }
.drawer__titulo { display: block; font-family: var(--font-serif, 'Playfair Display', serif); font-size: 11px; font-weight: 400; font-style: italic; letter-spacing: .45em; text-transform: uppercase; color: var(--or-silk); }
.drawer__qtd { display: block; font-family: var(--or-font-num); font-size: 9px; letter-spacing: .2em; color: var(--or-gold); opacity: .7; margin-top: 2px; }
.drawer__close { width: 28px; height: 28px; background: none; border: 0.5px solid var(--or-hair-2); border-radius: 0; display: flex; align-items: center; justify-content: center; color: var(--or-silk-3); cursor: pointer; transition: all .35s; flex-shrink: 0; }
.drawer__close:hover { border-color: var(--or-gold); color: var(--or-gold); transform: rotate(90deg); }

.drawer__tabs { display: flex; border-bottom: 0.5px solid var(--or-hair-2); flex-shrink: 0; position: relative; z-index: 1; }
.drawer__tab { flex: 1; display: flex; align-items: center; justify-content: center; gap: 6px; padding: 11px 8px; background: none; border: none; border-bottom: 0.5px solid transparent; margin-bottom: -0.5px; font-family: var(--font-sans); font-size: 8px; font-weight: 400; letter-spacing: .28em; text-transform: uppercase; color: var(--or-silk-3); cursor: pointer; transition: all .3s; }
.drawer__tab:hover { color: var(--or-silk-2); }
.drawer__tab.is-active { color: var(--or-gold); border-bottom-color: var(--or-gold); }
.drawer__tab svg { flex-shrink: 0; }
.drawer__tab-badge { background: var(--or-gold); color: var(--or-void); font-family: var(--or-font-num); font-size: 8px; font-weight: 900; min-width: 15px; height: 15px; border-radius: 2px; display: flex; align-items: center; justify-content: center; padding: 0 3px; line-height: 1; }
.drawer__tab-badge--saved { background: rgba(245,166,35,0.2); color: var(--or-gold); }

.drawer__clear-bar { display: flex; align-items: center; justify-content: space-between; padding: 8px 32px; border-bottom: 0.5px solid var(--or-hair-2); background: transparent; position: relative; z-index: 1; flex-shrink: 0; }
.drawer__clear-count { font-family: var(--or-font-num); font-size: 9px; letter-spacing: .2em; text-transform: uppercase; color: var(--or-silk-3); }
.drawer__clear-btn { display: flex; align-items: center; gap: 6px; background: none; border: 0.5px solid rgba(239,68,68,0.3); padding: 5px 12px; font-family: var(--font-sans); font-size: 8px; letter-spacing: .2em; text-transform: uppercase; color: rgba(239,68,68,0.65); cursor: pointer; transition: all .25s; }
.drawer__clear-btn:hover { border-color: rgba(239,68,68,0.7); color: #ef4444; background: rgba(239,68,68,0.05); }

.drawer__confirm-bar { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 10px 32px; background: rgba(239,68,68,0.05); border-bottom: 0.5px solid rgba(239,68,68,0.2); flex-shrink: 0; position: relative; z-index: 1; }
.drawer__confirm-txt { font-family: var(--font-sans); font-size: 10px; letter-spacing: .08em; color: rgba(239,68,68,0.8); }
.drawer__confirm-btns { display: flex; gap: 8px; }
.drawer__confirm-sim { background: rgba(239,68,68,0.15); border: 0.5px solid rgba(239,68,68,0.4); padding: 5px 12px; font-family: var(--font-sans); font-size: 8px; letter-spacing: .2em; text-transform: uppercase; color: #ef4444; cursor: pointer; transition: all .2s; }
.drawer__confirm-sim:hover { background: rgba(239,68,68,0.25); }
.drawer__confirm-nao { background: none; border: 0.5px solid var(--or-hair-2); padding: 5px 12px; font-family: var(--font-sans); font-size: 8px; letter-spacing: .2em; text-transform: uppercase; color: var(--or-silk-3); cursor: pointer; transition: all .2s; }
.drawer__confirm-nao:hover { border-color: var(--or-silk-3); color: var(--or-silk-2); }

.drawer__ornament { display: flex; align-items: center; gap: 10px; padding: 8px 32px; background: transparent; position: relative; z-index: 1; }
.drawer__ornament span { font-size: 6px; color: var(--or-gold); opacity: .35; }
.drawer__ornament-line { flex: 1; height: .5px; background: linear-gradient(90deg, var(--or-gold), transparent); opacity: .2; }
.drawer__ornament-line:last-of-type { background: linear-gradient(270deg, var(--or-gold), transparent); }
.drawer__ornament-text { font-family: 'Noto Serif JP', serif; font-size: 8px; letter-spacing: .4em; color: var(--or-gold); opacity: .25; white-space: nowrap; }

.drawer__items { flex: 1; overflow-y: auto; padding: 4px 0; display: flex; flex-direction: column; scrollbar-width: thin; scrollbar-color: var(--or-hair) transparent; position: relative; z-index: 1; }

.drawer__items::-webkit-scrollbar { width: 6px; }
.drawer__items::-webkit-scrollbar-track { background: transparent; }
.drawer__items::-webkit-scrollbar-thumb { background: var(--or-hair); border-radius: 3px; }

.drawer__vazio { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; padding: 52px 40px; text-align: center; }
.drawer__vazio__ico { width: 64px; height: 64px; border: 0.5px solid var(--or-hair); display: flex; align-items: center; justify-content: center; position: relative; }
.drawer__vazio__ico::before { content:''; position:absolute; top:-1px; left:-1px; width:10px; height:10px; border-top:.5px solid var(--or-gold); border-left:.5px solid var(--or-gold); }
.drawer__vazio__ico::after  { content:''; position:absolute; bottom:-1px; right:-1px; width:10px; height:10px; border-bottom:.5px solid var(--or-gold); border-right:.5px solid var(--or-gold); }
.vazio-kanji { font-family: 'Noto Serif JP', serif; font-size: 28px; color: var(--or-gold); opacity: .35; line-height: 1; }
.drawer__vazio__titulo { font-family: var(--font-sans); font-size: 9px; font-weight: 400; letter-spacing: .4em; text-transform: uppercase; color: var(--or-silk-2); }
.drawer__vazio__sub { font-family: var(--font-sans); font-size: 11px; font-weight: 300; color: var(--or-silk-3); line-height: 1.7; max-width: 200px; letter-spacing: .04em; }
.drawer__vazio__separador { display: flex; align-items: center; gap: 10px; color: var(--or-gold); opacity: .25; font-family: 'Noto Serif JP', serif; font-size: 12px; width: 100%; justify-content: center; }
.vazio-sep-txt { font-family: var(--font-sans); font-size: 8px; letter-spacing: .4em; text-transform: uppercase; font-style: normal; }
.drawer__vazio__cta { display: inline-flex; align-items: center; gap: 10px; background: transparent; border: 0.5px solid var(--or-gold); border-radius: 0; padding: 10px 24px; font-family: var(--font-sans); font-size: 8px; font-weight: 400; letter-spacing: .45em; text-transform: uppercase; color: var(--or-gold); cursor: pointer; transition: all .45s var(--or-easing); position: relative; overflow: hidden; }
.drawer__vazio__cta::before { content:''; position:absolute; inset:0; background:var(--or-gold); transform:scaleX(0); transform-origin:left; transition:transform .5s var(--or-easing); z-index:-1; }
.drawer__vazio__cta:hover::before { transform: scaleX(1); }
.drawer__vazio__cta:hover { color: var(--or-void); }
.drawer__vazio__cta-ghost { background:none; border:none; padding:6px 0; font-family:var(--font-sans); font-size:9px; font-weight:300; letter-spacing:.3em; text-transform:uppercase; color:var(--or-silk-3); cursor:pointer; text-decoration:underline; text-decoration-color:var(--or-hair-2); text-underline-offset:4px; transition:color .25s; }
.drawer__vazio__cta-ghost:hover { color: var(--or-silk); }

.di { display:grid; grid-template-columns: 28px 60px 1fr auto; gap: 12px; padding:16px 32px; border-bottom:0.5px solid var(--or-hair-2); background:transparent; align-items:start; transition:background .3s; position:relative; }
.di:first-child { border-top: 0.5px solid var(--or-hair-2); }
.di:hover { background: var(--or-gold-3); }
.di::before { content:''; position:absolute; left:0; top:16px; bottom:16px; width:.5px; background:var(--or-gold); opacity:0; transition:opacity .35s; }
.di:hover::before { opacity: .6; }
.di--saved { opacity: .85; }
.di__num { font-family: 'Noto Serif JP', serif; font-size: 12px; color: var(--or-gold); opacity: .25; line-height: 1; align-self: center; text-align: center; letter-spacing: 0; }
.di__img { width:60px; height:60px; background:rgba(245,166,35,.03); overflow:hidden; display:flex; align-items:center; justify-content:center; flex-shrink:0; border:0.5px solid var(--or-hair-2); position:relative; }
.di__img::before,.di__img::after { content:''; position:absolute; width:6px; height:6px; z-index:1; }
.di__img::before { top:2px; left:2px; border-top:.5px solid var(--or-gold); border-left:.5px solid var(--or-gold); opacity:.5; }
.di__img::after  { bottom:2px; right:2px; border-bottom:.5px solid var(--or-gold); border-right:.5px solid var(--or-gold); opacity:.5; }
.di__img img { width:100%; height:100%; object-fit:cover; filter:saturate(.85); }
.di__img__placeholder { color: var(--or-silk-3); }
.di__info { display:flex; flex-direction:column; gap:4px; min-width:0; }
.di__cat { font-size:7px; letter-spacing:.5em; text-transform:uppercase; color:var(--or-gold); opacity:.65; font-family:var(--font-sans); }
.di__nome { font-size:12px; font-weight:300; letter-spacing:.06em; color:var(--or-silk); font-family:var(--font-sans); line-height:1.4; }
.di__foot { display:flex; align-items:center; justify-content:space-between; margin-top:10px; }
.di__qty { display:flex; align-items:center; border:0.5px solid var(--or-hair-2); }
.di__qty button { background:none; border:none; color:var(--or-silk-2); width:22px; height:22px; cursor:pointer; font-size:14px; display:flex; align-items:center; justify-content:center; transition:all .25s; line-height:1; }
.di__qty button:hover { background:var(--or-gold); color:var(--or-void); }
.di__qty span { font-family:var(--or-font-num); font-size:10px; color:var(--or-silk); min-width:28px; text-align:center; height:22px; display:flex; align-items:center; justify-content:center; border-left:0.5px solid var(--or-hair-2); border-right:0.5px solid var(--or-hair-2); letter-spacing:.1em; }
.di__preco { font-family:var(--or-font-num); font-size:11px; color:var(--or-gold); }
.di__remover { background:none; border:none; color:var(--or-silk-4); cursor:pointer; padding:2px; display:flex; transition:color .25s; align-self:flex-start; margin-top:2px; }
.di__remover:hover { color:rgba(220,80,80,.7); }
.di__salvar,
.di__mover { display: inline-flex; align-items: center; gap: 5px; background: none; border: none; padding: 0; margin-top: 6px; font-family: var(--font-sans); font-size: 8px; letter-spacing: .2em; text-transform: uppercase; cursor: pointer; transition: color .25s; }
.di__salvar { color: var(--or-silk-4); }
.di__salvar:hover { color: var(--or-silk-2); }
.di__mover { color: var(--or-gold); opacity: .7; }
.di__mover:hover { opacity: 1; }

.drawer__footer { padding:18px 32px 26px; border-top:0.5px solid var(--or-hair-2); flex-shrink:0; background:var(--or-void); position:relative; z-index: 1; }
.drawer__footer-ornament { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
.fo-line { flex: 1; height: .5px; background: linear-gradient(90deg, transparent, var(--or-gold)); opacity: .2; }
.fo-line:last-child { background: linear-gradient(270deg, transparent, var(--or-gold)); }
.fo-kanji { font-family: 'Noto Serif JP', serif; font-size: 14px; color: var(--or-gold); opacity: .3; line-height: 1; }
.drawer__totais { margin-bottom: 14px; }
.dt-row { display:flex; justify-content:space-between; align-items:center; font-family:var(--font-sans); font-size:9px; letter-spacing:.25em; text-transform:uppercase; color:var(--or-silk-3); margin-bottom:8px; padding-bottom:8px; }
.dt-row span:last-child { font-family:var(--or-font-num); letter-spacing:.08em; text-transform:none; }
.dt-row--vip { color:var(--or-gold); opacity:.7; }
.dt-row--vip span:first-child { display:flex; align-items:center; gap:6px; }
.dt-row--total { font-size:10px; letter-spacing:.15em; color:var(--or-silk); margin-top:10px; padding-top:10px; border-top:0.5px solid var(--or-hair-2); margin-bottom:0; }
.dt-row--total span:last-child { font-family:var(--or-font-num); font-size:14px; color:var(--or-gold); letter-spacing:.04em; }
.drawer__checkout { width:100%; display:flex; align-items:center; justify-content:center; gap:12px; background:transparent; color:var(--or-gold); font-family:var(--font-sans); font-size:8px; font-weight:400; letter-spacing:.55em; text-transform:uppercase; padding:14px; border:0.5px solid var(--or-gold); border-radius:0; cursor:pointer; margin-bottom:10px; transition:color .45s; position:relative; overflow:hidden; z-index:0; }
.drawer__checkout::before { content:''; position:absolute; inset:0; background:var(--or-gold); transform:scaleX(0); transform-origin:left; transition:transform .55s var(--or-easing); z-index:-1; }
.drawer__checkout:hover:not(:disabled)::before { transform:scaleX(1); }
.drawer__checkout:hover:not(:disabled) { color:var(--or-void); }
.drawer__checkout:disabled { opacity:.20; cursor:not-allowed; border-color:var(--or-hair); }
.drawer__seguro { display:flex; align-items:center; justify-content:center; gap:7px; font-family:var(--font-sans); font-size:8px; letter-spacing:.2em; text-transform:uppercase; color:var(--or-silk-4); text-align:center; }
.drawer__seguro svg { color:var(--or-gold); opacity:.4; }
.drawer__saved-info { display: flex; align-items: center; justify-content: center; gap: 6px; font-family: var(--font-sans); font-size: 9px; letter-spacing: .12em; color: var(--or-silk-4); margin-bottom: 12px; text-align: center; }
.drawer__saved-info svg { color: var(--or-gold); opacity: .4; flex-shrink: 0; }

/* ════════════ SIDEBAR MOBILE ════════════ */
.sb-overlay { position:fixed; inset:0; z-index:9999; background:rgba(0,0,0,.82); -webkit-backdrop-filter:blur(10px); backdrop-filter:blur(10px); display:flex; }
.sb { width:310px; height:100%; background:var(--or-deep); border-right:0.5px solid var(--or-hair); display:flex; flex-direction:column; overflow-y:auto; scrollbar-width:none; position:relative; }
.sb::-webkit-scrollbar { display:none; }
.sb-kamon { position: absolute; bottom: 80px; right: 16px; font-family: 'Noto Serif JP', serif; font-size: 52px; color: var(--or-gold); opacity: .04; pointer-events: none; z-index: 0; line-height: 1; }
.sb__head { display:flex; justify-content:space-between; align-items:center; padding:20px 20px 16px; border-bottom:0.5px solid var(--or-hair-2); flex-shrink:0; position: relative; z-index: 1; }
.sb__close { width:28px; height:28px; background:none; border:0.5px solid var(--or-hair-2); display:flex; align-items:center; justify-content:center; color:var(--or-silk-3); cursor:pointer; transition:all .3s; }
.sb__close:hover { border-color:var(--or-gold); color:var(--or-gold); transform: rotate(90deg); }
.sb__brand { display: flex; align-items: center; gap: 8px; text-decoration: none; }
.sb__brand__mark { width: 22px; height: 22px; flex-shrink: 0; border-radius: 50%; border: 1.5px solid rgba(245,166,35,0.4); display: flex; align-items: center; justify-content: center; }
.sb__brand__mark::before { content: '⊕'; color: var(--cor-primaria); font-size: 10px; line-height: 1; }
.sb__brand__txt { font-family: var(--font-serif); font-size: 13px; font-style: italic; letter-spacing: 0.14em; color: var(--cor-texto); }
.sb__brand__txt em { color: var(--cor-primaria); font-style: normal; }
.sb__perfil { display:flex; align-items:center; gap:14px; padding:18px 20px; border-bottom:0.5px solid var(--or-hair-2); background:transparent; position: relative; z-index: 1; }
.sb__av-wrap { position: relative; flex-shrink: 0; }
.sb__av { width:44px; height:44px; border-radius:0; background:var(--grad-btn); display:flex; align-items:center; justify-content:center; font-weight:700; font-size:16px; color:#0A0A0A; overflow:hidden; border:0.5px solid rgba(245,166,35,.35); }
.sb__av img { width:100%; height:100%; object-fit:cover; }
.sb__av-kanji { position: absolute; bottom: -8px; right: -8px; font-family: 'Noto Serif JP', serif; font-size: 9px; color: var(--or-gold); opacity: .5; background: var(--or-deep); padding: 1px 3px; border: 0.5px solid var(--or-hair); letter-spacing: .1em; line-height: 1; }
.sb__perfil__info { min-width: 0; }
.sb__perfil__nome { font-family:var(--font-sans); font-size:13px; font-weight:500; color:var(--or-silk); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.sb__perfil__status { font-size:10px; letter-spacing:.08em; color:var(--or-silk-3); }
.sb__perfil__vip { font-size:9px; letter-spacing:.15em; font-weight:700; background:var(--grad-texto); -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent; }
.sb__ornament { display: flex; align-items: center; gap: 10px; padding: 10px 20px; position: relative; z-index: 1; }
.sb__ornament--small { padding: 6px 20px; }
.sb-orn-line { flex: 1; height: .5px; background: linear-gradient(90deg, var(--or-gold), transparent); opacity: .15; }
.sb-orn-line:last-child { background: linear-gradient(270deg, var(--or-gold), transparent); }
.sb-orn-kanji { font-family: 'Noto Serif JP', serif; font-size: 12px; color: var(--or-gold); opacity: .25; line-height: 1; }
.sb__links { flex:1; padding: 8px 0; display:flex; flex-direction:column; gap:1px; position: relative; z-index: 1; }
.sb__grupo-label { font-family:var(--font-sans); font-size:7px; letter-spacing:.55em; text-transform:uppercase; color:var(--or-gold); opacity:.5; padding:6px 20px 4px; display: flex; align-items: center; gap: 8px; }
.sb__grupo-label span { font-family: 'Noto Serif JP', serif; font-size: 10px; opacity: .6; letter-spacing: .1em; }
.sb__link { display:flex; align-items:center; gap:12px; padding:10px 20px; font-family:var(--font-sans); font-size:12px; color:var(--or-silk-2); text-decoration:none; cursor:pointer; background:none; border:none; width:100%; text-align:left; transition:all .2s; position:relative; }
.sb__link::before { content:''; position:absolute; left:0; top:8px; bottom:8px; width:.5px; background:var(--or-gold); opacity:0; transition:opacity .2s; }
.sb__link:hover { color:var(--or-silk); background:var(--or-gold-3); padding-left:24px; }
.sb__link:hover::before { opacity:.6; }
.sb__link svg { flex-shrink:0; color:var(--or-silk-3); transition:color .2s; }
.sb__link:hover svg { color:var(--or-gold); }
.sb__link-num { font-family: 'Noto Serif JP', serif; font-size: 11px; color: var(--or-gold); opacity: .3; line-height: 1; flex-shrink: 0; width: 16px; text-align: center; }

/* Gamer link — cor por realm */
.sb__link--gamer { color: var(--cor-primaria) !important; -webkit-text-fill-color: var(--cor-primaria) !important; font-weight: 600; }
.sb__link--gamer:hover { color: var(--cor-primaria) !important; -webkit-text-fill-color: var(--cor-primaria) !important; background: var(--or-gold-3) !important; padding-left: 24px !important; }
.sb__link--gamer::before { background: var(--cor-primaria) !important; }
.sb__link--gamer__ico { font-family: 'Noto Serif JP', 'Yu Mincho', serif; font-size: 16px; color: var(--cor-primaria); opacity: 0.80; line-height: 1; flex-shrink: 0; transition: opacity .25s, transform .35s cubic-bezier(.16,1,.3,1); display: inline-block; }
.sb__link--gamer:hover .sb__link--gamer__ico { opacity: 1; transform: rotate(-15deg) scale(1.15); }
/* Acento lateral colorido por realm para o link Gamer na sidebar */
.sb__link--gamer::before { width: 2px !important; }

.sb__link--admin { color: var(--cor-secundaria) !important; }
.sb__link--admin svg { color: var(--cor-secundaria) !important; }
.sb__link--saved { color: var(--or-gold) !important; opacity: .75; }
.sb__link--saved svg { color: var(--or-gold) !important; opacity: .65; }
.sb__link--saved:hover { opacity: 1 !important; }
.sb__link--cta { color: var(--or-gold) !important; font-weight: 600; }
.sb__link--sair { color: rgba(239,68,68,.65) !important; }
.sb__link--sair svg { color: rgba(239,68,68,.5) !important; }
.sb__cart-num { margin-left:auto; background:var(--grad-btn); color:#0A0A0A; font-size:8px; font-weight:900; min-width:16px; height:16px; border-radius:50%; display:flex; align-items:center; justify-content:center; padding:0 4px; }
.sb__cart-num--saved { background: rgba(245,166,35,0.2); color: var(--or-gold); }

.sb__rodape { padding:14px 20px 22px; border-top:0.5px solid var(--or-hair-2); flex-shrink:0; position: relative; z-index: 1; }
.sb__rodape-ornament { text-align: center; margin-bottom: 10px; font-family: 'Noto Serif JP', serif; font-size: 8px; letter-spacing: .5em; color: var(--or-gold); opacity: .2; }

/* Realm dots na sidebar */
.sb__realms { display: flex; gap: 6px; margin-bottom: 12px; }
.sb__realm { flex: 1; display: flex; align-items: center; justify-content: center; gap: 6px; padding: 8px 6px; background: none; border: 0.5px solid var(--or-hair-2); font-family: var(--font-sans); font-size: 9px; letter-spacing: .1em; color: var(--or-silk-3); cursor: pointer; transition: all .25s; white-space: nowrap; }
.sb__realm:hover, .sb__realm.is-active { border-color: var(--realm-sb-color, var(--or-gold)); color: var(--realm-sb-color, var(--or-gold)); background: var(--or-gold-3); }
.sb__realm-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
.sb__realm-dot--celestial { background: #F5A623; }
.sb__realm-dot--autumn    { background: #3D6CBF; }
.sb__realm-dot--ghost     { background: #C85014; }

.sb__copy { font-family:var(--font-sans); font-size:8px; letter-spacing:.2em; text-transform:uppercase; color:var(--or-silk-4); display: flex; align-items: center; gap: 10px; }
.sb__copy span { font-family: 'Noto Serif JP', serif; font-size: 11px; opacity: .6; letter-spacing: .1em; }
.sb-fade-enter-active, .sb-fade-leave-active { transition: opacity .35s; }
.sb-fade-enter-from, .sb-fade-leave-to { opacity: 0; }

/* ════════════ RESPONSIVO ════════════ */
@media (max-width: 768px) {
  .auth-modal { grid-template-columns:1fr; max-width:100%; height:95dvh; margin:0; }
  .auth-esq { display:none; }
  .auth-dir { padding:32px 24px; }
  .af-duplo { grid-template-columns:1fr; gap:0; }
  .drawer { width:100%; }
  .di { padding:14px 20px; grid-template-columns: 22px 52px 1fr auto; gap: 10px; }
  .drawer__header { padding:20px 20px 14px; }
  .drawer__ornament { padding: 6px 20px; }
  .drawer__footer { padding:14px 20px 22px; }
  .drawer__clear-bar { padding: 8px 20px; }
  .drawer__confirm-bar { padding: 10px 20px; flex-direction: column; align-items: flex-start; gap: 8px; }
  .pref-panel { right:16px; left:16px; width:auto; }
  .nb-search-panel { right:-40px; width:calc(100vw - 32px); max-width:340px; }
  .sb { width: 290px; }
  .toast-container { bottom: 16px; right: 16px; left: 16px; }
  .toast { min-width: unset; max-width: 100%; }
}

/* Autofill light mode */
body.light-mode .af-linha input:-webkit-autofill,
body.light-mode .af-linha input:-webkit-autofill:hover,
body.light-mode .af-linha input:-webkit-autofill:focus,
body.light-mode .af-linha input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 1000px #ffffff inset !important;
  box-shadow: 0 0 0 1000px #ffffff inset !important;
  -webkit-text-fill-color: #0a0a1e !important;
}

/* ══ VARIANTES DO PRODUTO NO DRAWER ══ */
.di__variantes {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 5px 0 3px;
  flex-wrap: wrap;
}

.di__swatch {
  display: inline-block;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  border: 0.5px solid rgba(245, 240, 232, 0.22);
  flex-shrink: 0;
  box-shadow:
    0 0 0 1px rgba(0, 0, 0, 0.35),
    inset 0 1px 2px rgba(255, 255, 255, 0.08);
  transition: transform 0.2s;
}

.di__swatch:hover {
  transform: scale(1.25);
}

.di__var-txt {
  font-family: 'DM Mono', 'Courier New', monospace;
  font-size: 9px;
  letter-spacing: 1.5px;
  color: rgba(237, 232, 224, 0.4);
  text-transform: uppercase;
  line-height: 1;
}

.di__var-sep {
  color: rgba(237, 232, 224, 0.18);
  font-size: 8px;
  line-height: 1;
}

</style>