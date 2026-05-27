
<template>
  <div class="adm" :class="[`adm--secao-${secao}`, { 'adm--sidebar-open': sidebarOpen }]">

    <!-- ══ GUARD ══ -->
    <div v-if="!auth.isAdmin" class="adm-guard">
      <div class="adm-guard__inner">
        <p class="adm-guard__kanji" aria-hidden="true">禁</p>
        <h2 class="adm-guard__titulo">Acesso Restrito</h2>
        <p class="adm-guard__sub">将軍 · Apenas administradores</p>
        <router-link to="/" class="adm-guard__btn"><span>Retornar ao Atelier</span></router-link>
      </div>
    </div>

    <template v-else>

      <!-- ══ FUNDO ══ -->
      <div class="adm-bg" aria-hidden="true">
        <div class="adm-bg__kanji adm-bg__kanji--1">設</div>
        <div class="adm-bg__kanji adm-bg__kanji--2">金</div>
        <div class="adm-bg__kanji adm-bg__kanji--3">道</div>
        <div class="adm-bg__kanji adm-bg__kanji--4">武</div>
        <div class="adm-bg__washi"></div>
        <div class="adm-bg__grain"></div>
        <div class="adm-bg__fog adm-bg__fog--1"></div>
        <div class="adm-bg__fog adm-bg__fog--2"></div>
        <div class="adm-bg__scanline"></div>
        <div class="adm-bg__brush adm-bg__brush--h"></div>
        <div class="adm-bg__brush adm-bg__brush--v"></div>
        <div class="adm-bg__realm-line"></div>
      </div>

      <!-- ══ ASIDE ══ -->
      <aside class="adm-aside" role="navigation" aria-label="Painel admin">
        <div class="adm-aside__kamon" aria-hidden="true">管</div>
        <div class="adm-aside__topline" aria-hidden="true"></div>

        <!-- Brand -->
        <div class="adm-aside__brand">
          <router-link to="/" class="adm-aside__logo" aria-label="Ir para a página inicial">
            <span class="adm-aside__logo-mark" aria-hidden="true">⊕</span>
            <span class="adm-aside__logo-txt">Noir<em>&amp;</em>Or</span>
          </router-link>
          <p class="adm-aside__sub">将軍 · Shogunato ADM</p>
        </div>

        <!-- Ornamento -->
        <div class="adm-orn" aria-hidden="true">
          <span class="adm-orn__line"></span>
          <span class="adm-orn__gem">◆</span>
          <span class="adm-orn__line"></span>
        </div>

        <!-- Perfil admin -->
        <div class="adm-aside__perfil">
          <div class="adm-aside__av-wrap">
            <div class="adm-aside__av">
              <img v-if="auth.user?.avatar" :src="auth.user.avatar" alt=""
                @error="e => e.target.style.display='none'" />
              <span v-else>{{ inicialAdmin }}</span>
            </div>
          </div>
          <div class="adm-aside__perfil-info">
            <div class="adm-aside__perfil-linha">
              <p class="adm-aside__perfil-nome">{{ primeiroNomeAdmin }}</p>
              <span class="adm-badge-role">
                <span class="adm-badge-role__gem" aria-hidden="true">◆</span>
                Admin
              </span>
            </div>
            <p class="adm-aside__perfil-email">{{ auth.user?.email }}</p>
          </div>
        </div>

        <!-- Relógio -->
        <div class="adm-aside__clock">
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
          <span class="adm-aside__clock-label">Brasília</span>
          <span class="adm-aside__clock-time">{{ horaAtual }}</span>
        </div>

        <!-- Ornamento menor -->
        <div class="adm-orn adm-orn--sm" aria-hidden="true">
          <span class="adm-orn__line"></span>
          <span class="adm-orn__kanji">口</span>
          <span class="adm-orn__line"></span>
        </div>

        <!-- Nav -->
        <nav class="adm-nav">
          <p class="adm-nav__grupo-label">
            <span class="adm-nav__grupo-kanji" aria-hidden="true">統</span>
            Gestão
          </p>
          <button v-for="n in NAV_GESTAO" :key="n.id"
            :class="['adm-nav__item', { 'is-active': secao === n.id }]"
            @click="navegar(n.id)">
            <span class="adm-nav__blade" aria-hidden="true"></span>
            <span class="adm-nav__num" aria-hidden="true">{{ n.num }}</span>
            <span class="adm-nav__icon" v-html="n.icon" aria-hidden="true"></span>
            <span class="adm-nav__txt">{{ n.label }}</span>
            <span v-if="n.id === 'pedidos' && badgePedidos > 0" class="adm-nav__badge adm-nav__badge--pulse">{{ badgePedidos }}</span>
            <span v-if="n.id === 'notificacoes' && notifsNaoLidas > 0" class="adm-nav__badge">{{ notifsNaoLidas }}</span>
          </button>

          <p class="adm-nav__grupo-label" style="margin-top:10px">
            <span class="adm-nav__grupo-kanji" aria-hidden="true">設</span>
            Configuração
          </p>
          <button v-for="n in NAV_CONFIG" :key="n.id"
            :class="['adm-nav__item', { 'is-active': secao === n.id }]"
            @click="navegar(n.id)">
            <span class="adm-nav__blade" aria-hidden="true"></span>
            <span class="adm-nav__num" aria-hidden="true">{{ n.num }}</span>
            <span class="adm-nav__icon" v-html="n.icon" aria-hidden="true"></span>
            <span class="adm-nav__txt">{{ n.label }}</span>
          </button>
        </nav>

        <!-- Footer aside -->
        <div class="adm-aside__foot">
          <div class="adm-sys">
            <span class="adm-sys__dot"></span>
            <span class="adm-sys__txt">Sistema ativo</span>
          </div>
          <router-link to="/" class="adm-aside__back">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Retornar ao Atelier
          </router-link>
          <p class="adm-aside__copy">© {{ anoAtual }} Noir &amp; Or · 武士道</p>
        </div>
      </aside>

      <!-- Overlay mobile -->
      <transition name="overlay-fade">
        <div v-if="sidebarOpen" class="adm-overlay" @click="sidebarOpen = false" aria-hidden="true"></div>
      </transition>

      <!-- ══ MAIN ══ -->
      <div class="adm-content">

        <!-- TOPBAR -->
        <header class="adm-topbar">
          <button class="adm-topbar__burger"
            @click="sidebarOpen = !sidebarOpen"
            :aria-label="sidebarOpen ? 'Fechar menu' : 'Abrir menu'">
            <span></span><span></span><span></span>
          </button>

          <div class="adm-topbar__heading">
            <span class="adm-topbar__kanji" aria-hidden="true">{{ secaoAtual?.kanji || '統' }}</span>
            <div>
              <h1 class="adm-topbar__titulo">{{ secaoAtual?.label || 'Dashboard' }}</h1>
              <p class="adm-topbar__desc">Noir &amp; Or · Painel Administrativo</p>
            </div>
          </div>

          <div class="adm-topbar__right">
            <div class="adm-topbar__status">
              <span class="adm-topbar__status-dot"></span>
              <span>Online</span>
            </div>

            <!-- Notificações -->
            <div style="position:relative">
              <button class="adm-icon-btn" @click="notifOpen = !notifOpen" aria-label="Notificações">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                <span v-if="notifsNaoLidas > 0" class="adm-icon-btn__badge adm-icon-btn__badge--pulse">{{ notifsNaoLidas }}</span>
              </button>
              <transition name="notif-drop">
                <div v-if="notifOpen" class="adm-notif-panel" v-click-outside="() => notifOpen = false">
                  <div class="adm-notif-panel__head">
                    <span>通知 · Notificações</span>
                    <button @click="marcarTodasLidas" class="adm-notif-panel__mark">Marcar lidas</button>
                  </div>
                  <div v-if="!notificacoes.length" class="adm-notif-panel__vazio">Nenhuma notificação</div>
                  <div v-for="n in notificacoes" :key="n.id"
                    :class="['adm-notif-item', { 'adm-notif-item--nova': !n.lida }]"
                    @click="lerNotif(n)">
                    <span class="adm-notif-item__dot" v-if="!n.lida"></span>
                    <div>
                      <p class="adm-notif-item__msg">{{ n.msg }}</p>
                      <p class="adm-notif-item__time">{{ fmtDate(n.criadoEm) }}</p>
                    </div>
                  </div>
                </div>
              </transition>
            </div>

            <div class="adm-topbar__av" :title="auth.user?.nome">{{ inicialAdmin }}</div>
          </div>
        </header>

        <!-- Toast -->
        <transition name="toast-slide">
          <div v-if="toast.msg" :class="['adm-toast', `adm-toast--${toast.tipo}`]" role="alert">
            <div class="adm-toast__icon" aria-hidden="true">
              <svg v-if="toast.tipo==='sucesso'" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              <svg v-else-if="toast.tipo==='erro'" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              <svg v-else width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            </div>
            <div class="adm-toast__body">
              <span class="adm-toast__titulo">{{ toast.titulo }}</span>
              <span v-if="toast.msg" class="adm-toast__msg">{{ toast.msg }}</span>
            </div>
            <button class="adm-toast__close" @click="toast.msg=''" aria-label="Fechar">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
            <div class="adm-toast__bar" :style="{animationDuration: '3800ms'}"></div>
          </div>
        </transition>

        <!-- ══════════ DASHBOARD ══════════ -->
        <section v-if="secao === 'dashboard'" class="adm-section">
          <div class="adm-grid-4">
            <div v-for="(s, i) in statsReais" :key="i" class="adm-stat">
              <div class="adm-stat__topline" aria-hidden="true"></div>
              <div class="adm-stat__kanji">{{ s.kanji }}</div>
              <div class="adm-stat__spark">
                <svg width="110" height="36" viewBox="0 0 110 36">
                  <defs>
                    <linearGradient :id="`sg${i}`" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stop-color="rgba(200,168,75,0.18)"/>
                      <stop offset="100%" stop-color="rgba(200,168,75,0)"/>
                    </linearGradient>
                  </defs>
                  <polygon :points="sparkArea(s.spark)" :fill="`url(#sg${i})`"/>
                  <polyline :points="sparkLine(s.spark)" fill="none" stroke="rgba(200,168,75,0.6)"
                    stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div class="adm-stat__num">{{ s.num }}</div>
              <span class="adm-stat__label">{{ s.label }}</span>
              <span class="adm-stat__sub">{{ s.sub }}</span>
            </div>
          </div>

          <!-- Alertas -->
          <div v-if="alertas.length" class="adm-alertas">
            <div v-for="a in alertas" :key="a.id" :class="['adm-alerta', `adm-alerta--${a.tipo}`]">
              <span class="adm-alerta__gem">◆</span>
              <span>{{ a.msg }}</span>
              <button @click="alertas = alertas.filter(x => x.id !== a.id)">✕</button>
            </div>
          </div>

          <!-- Charts -->
          <div class="adm-charts">
            <div class="adm-card">
              <div class="adm-card__topline"></div>
              <div class="adm-card__head">
                <span class="adm-card__kanji">売</span>
                <div><p class="adm-card__titulo">Receita Mensal</p><p class="adm-card__sub">{{ anoAtual }}</p></div>
                <button class="btn btn--ghost btn--sm" style="margin-left:auto" @click="exportarReceitaCSV">↓ CSV</button>
              </div>
              <div class="adm-card__body">
                <div class="adm-bar">
                  <div v-for="(v, i) in revenueData" :key="i" class="adm-bar__col" :title="`${MESES[i]}: R$ ${fmtNum(v)}`">
                    <div class="adm-bar__bar" :style="{ height: (v / Math.max(...revenueData, 1) * 90) + 'px' }">
                      <span class="adm-bar__tooltip">R$ {{ fmtNum(v) }}</span>
                    </div>
                    <span class="adm-bar__label">{{ MESES[i] }}</span>
                  </div>
                </div>
                <div class="adm-bar__foot">
                  <span class="adm-bar__total">R$ {{ fmtNum(receitaTotalAno) }}</span>
                  <span class="adm-bar__pct" :style="{ color: crescimentoPct >= 0 ? 'var(--green)' : 'var(--red)' }">
                    {{ crescimentoPct >= 0 ? '↑' : '↓' }} {{ Math.abs(crescimentoPct) }}%
                  </span>
                </div>
              </div>
            </div>

            <div class="adm-card">
              <div class="adm-card__topline"></div>
              <div class="adm-card__head"><span class="adm-card__kanji">分</span><p class="adm-card__titulo">Por Categoria</p></div>
              <div class="adm-card__body adm-card__body--flex">
                <svg width="110" height="110" viewBox="0 0 110 110">
                  <circle cx="55" cy="55" r="42" fill="none" stroke="rgba(200,168,75,0.05)" stroke-width="16"/>
                  <circle v-for="(seg, i) in donutSegs" :key="i"
                    cx="55" cy="55" r="42" fill="none" :stroke="seg.color" stroke-width="16"
                    :stroke-dasharray="`${seg.dash} ${seg.circ - seg.dash}`"
                    :stroke-dashoffset="seg.offset"
                    style="transform-origin:55px 55px;transform:rotate(-90deg)"/>
                  <text x="55" y="52" text-anchor="middle" dominant-baseline="middle" fill="rgba(200,168,75,0.8)" font-size="11" font-family="'DM Mono',monospace">{{ todosProdutos.length }}</text>
                  <text x="55" y="64" text-anchor="middle" dominant-baseline="middle" fill="rgba(237,232,224,0.2)" font-size="5" letter-spacing="1.5">TOTAL</text>
                </svg>
                <div class="adm-donut-legenda">
                  <div v-for="(l, i) in CAT_LABELS" :key="l" class="adm-donut-item">
                    <span class="adm-donut-dot" :style="{ background: CAT_CORES[i] }"></span>
                    <span class="adm-donut-lbl">{{ l }}</span>
                    <span class="adm-donut-pct">{{ catTotaisCalc[i] }}%</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="adm-card">
              <div class="adm-card__topline"></div>
              <div class="adm-card__head"><span class="adm-card__kanji">績</span><p class="adm-card__titulo">Performance</p></div>
              <div class="adm-card__body adm-card__body--radiais">
                <div v-for="r in radiais" :key="r.label" class="adm-radial">
                  <svg width="84" height="84" viewBox="0 0 84 84">
                    <circle cx="42" cy="42" r="34" fill="none" stroke="rgba(200,168,75,0.06)" stroke-width="6"/>
                    <circle cx="42" cy="42" r="34" fill="none" stroke="rgba(200,168,75,0.55)" stroke-width="6"
                      :stroke-dasharray="`${(r.value/100)*(2*Math.PI*34)} ${2*Math.PI*34}`"
                      stroke-dashoffset="53.4" stroke-linecap="round"/>
                    <text x="42" y="38" text-anchor="middle" dominant-baseline="middle" fill="rgba(200,168,75,0.7)" font-size="13" font-family="'Cormorant Garamond',serif">{{ r.kanji }}</text>
                    <text x="42" y="50" text-anchor="middle" dominant-baseline="middle" fill="rgba(237,232,224,0.4)" font-size="8" font-family="'DM Mono',monospace">{{ r.value }}%</text>
                  </svg>
                  <span class="adm-radial__label">{{ r.label }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Pedidos recentes -->
          <div class="adm-card">
            <div class="adm-card__topline"></div>
            <div class="adm-card__head adm-card__head--between">
              <div style="display:flex;align-items:center;gap:12px"><span class="adm-card__kanji">令</span><p class="adm-card__titulo">Pedidos Recentes</p></div>
              <button class="btn btn--ghost btn--sm" @click="navegar('pedidos')">Ver Todos →</button>
            </div>
            <div v-if="loadingDash" class="adm-skel-wrap"><div v-for="n in 5" :key="n" class="adm-skel-row"></div></div>
            <div v-else>
              <div class="adm-tbl-head adm-tbl-head--ped">
                <span>Pedido</span><span>Cliente</span><span>Total</span><span>Status</span><span>Data</span>
              </div>
              <div v-if="!pedidosRecentes.length" class="adm-vazio-simples">Nenhum pedido</div>
              <div v-for="p in pedidosRecentes" :key="p._id" class="adm-tbl-row adm-tbl-row--ped"
                @click="detalheP = p" style="cursor:pointer">
                <span class="adm-mono-id">#{{ (p._id||'').slice(-6).toUpperCase() }}</span>
                <span class="adm-txt-sm">{{ p.cliente?.nome || '—' }}</span>
                <span class="adm-gold-val">R$ {{ fmt(p.total) }}</span>
                <span :class="['adm-status-badge', `adm-status-badge--${statusClass(p.status)}`]">{{ statusLabel(p.status) }}</span>
                <span class="adm-mono-date">{{ fmtDate(p.criadoEm) }}</span>
              </div>
            </div>
          </div>

          <!-- Log -->
          <div class="adm-card">
            <div class="adm-card__topline"></div>
            <div class="adm-card__head"><span class="adm-card__kanji">歴</span><p class="adm-card__titulo">Log de Atividade</p></div>
            <div class="adm-log">
              <div v-if="!logAtividade.length" class="adm-vazio-simples">Nenhuma atividade</div>
              <div v-for="l in logAtividade.slice(0,10)" :key="l.id" class="adm-log-item">
                <span class="adm-log-item__gem">◆</span>
                <div>
                  <span class="adm-log-item__msg">{{ l.msg }}</span>
                  <span class="adm-log-item__time">{{ fmtDate(l.criadoEm) }}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- ══════════ PEDIDOS ══════════ -->
        <section v-if="secao === 'pedidos'" class="adm-section">
          <div class="adm-grid-4" style="margin-bottom:20px">
            <div class="adm-mini-stat" v-for="ms in miniStatsPedidos" :key="ms.label">
              <div class="adm-mini-stat__topline"></div>
              <span class="adm-mini-stat__num">{{ ms.num }}</span>
              <span class="adm-mini-stat__label">{{ ms.label }}</span>
              <span class="adm-mini-stat__bar" :style="{ width: ms.pct + '%' }"></span>
            </div>
          </div>

          <div class="adm-toolbar">
            <div class="adm-search-box">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              <input v-model="buscaPedidos" placeholder="Buscar por ID, cliente ou e-mail…" autocomplete="off"/>
              <button v-if="buscaPedidos" @click="buscaPedidos=''" class="adm-search-clear" aria-label="Limpar">✕</button>
            </div>
            <select v-model="filtroPedStatus" class="adm-select">
              <option value="">Todos os status</option>
              <option v-for="s in STATUS_LIST" :key="s" :value="s">{{ statusLabel(s) }}</option>
            </select>
            <div class="adm-date-range">
              <input type="date" v-model="filtroPedDe" class="adm-date-input" title="De"/>
              <span style="color:rgba(200,168,75,0.2);font-size:9px">→</span>
              <input type="date" v-model="filtroPedAte" class="adm-date-input" title="Até"/>
            </div>
            <button class="btn btn--ghost btn--sm" @click="limparFiltrosPedidos">Limpar</button>
            <button class="btn btn--ghost btn--sm" @click="carregarPedidos">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.51"/></svg>
            </button>
            <button class="btn btn--ghost btn--sm" @click="exportarPedidosCSV">↓ CSV</button>
          </div>

          <div v-if="pedidosSelecionados.length" class="adm-bulk">
            <span class="adm-bulk__count">{{ pedidosSelecionados.length }} selecionado(s)</span>
            <select v-model="bulkStatus" class="adm-select" style="max-width:180px">
              <option value="">Alterar status…</option>
              <option v-for="s in STATUS_LIST" :key="s" :value="s">{{ statusLabel(s) }}</option>
            </select>
            <button class="btn btn--gold btn--sm" @click="aplicarBulkStatus" :disabled="!bulkStatus">Aplicar</button>
            <button class="btn btn--ghost btn--sm" @click="pedidosSelecionados=[]">Cancelar</button>
          </div>

          <div class="adm-card" style="overflow-x:auto;padding:0">
            <div class="adm-card__topline"></div>
            <div v-if="loadingPedidos" class="adm-skel-wrap" style="padding:14px 18px">
              <div v-for="n in 6" :key="n" class="adm-skel-row"></div>
            </div>
            <table v-else class="adm-tabela">
              <thead>
                <tr>
                  <th style="width:32px;padding-left:18px"><input type="checkbox" :checked="todosChecked" @change="toggleTodos" class="adm-check"/></th>
                  <th @click="sortBy('_id')" class="adm-th-sort">Pedido <span class="adm-sort-icon">{{ sortIcone('_id') }}</span></th>
                  <th @click="sortBy('cliente.nome')" class="adm-th-sort">Cliente <span class="adm-sort-icon">{{ sortIcone('cliente.nome') }}</span></th>
                  <th>Itens</th>
                  <th @click="sortBy('total')" class="adm-th-sort">Total <span class="adm-sort-icon">{{ sortIcone('total') }}</span></th>
                  <th>Pagamento</th>
                  <th @click="sortBy('status')" class="adm-th-sort">Status <span class="adm-sort-icon">{{ sortIcone('status') }}</span></th>
                  <th>Cancelamento</th>
                  <th @click="sortBy('criadoEm')" class="adm-th-sort">Data <span class="adm-sort-icon">{{ sortIcone('criadoEm') }}</span></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="!pedidosFiltrados.length"><td colspan="10" class="adm-vazio">Nenhum pedido encontrado</td></tr>
                <tr v-for="p in pedidosPaginados" :key="p._id" :class="{ 'adm-row--selected': pedidosSelecionados.includes(p._id) }">
                  <td style="padding-left:18px"><input type="checkbox" :checked="pedidosSelecionados.includes(p._id)" @change="toggleSelecionarPedido(p._id)" class="adm-check"/></td>
                  <td><span class="adm-mono-id">#{{ (p._id||'').slice(-8).toUpperCase() }}</span></td>
                  <td><p class="adm-nome">{{ p.cliente?.nome || 'N/A' }}</p><p class="adm-email">{{ p.cliente?.email || '' }}</p></td>
                  <td><span class="adm-badge">{{ p.itens?.length || 0 }} item(s)</span></td>
                  <td class="adm-gold-val">R$ {{ fmt(p.total) }}</td>
                  <td><span class="adm-badge">{{ (p.pagamento?.metodo||'').toUpperCase() || '—' }}</span></td>
                  <td>
                    <select :value="p.status" @change="atualizarStatusPedido(p, $event.target.value)"
                      :class="['adm-status-sel', `adm-status-sel--${p.status}`]">
                      <option v-for="s in STATUS_LIST" :key="s" :value="s">{{ statusLabel(s) }}</option>
                    </select>
                  </td>
                  <td>
                    <div v-if="p.solicitacaoCancelamento?.solicitado && p.solicitacaoCancelamento?.status === 'pendente'" class="adm-cancel-actions">
                      <button class="adm-btn-approve" @click="abrirModalRecusa(p, true)">Aprovar</button>
                      <button class="adm-btn-reject" @click="abrirModalRecusa(p, false)">Recusar</button>
                    </div>
                    <span v-else-if="p.solicitacaoCancelamento?.status === 'aprovado'" class="adm-cancel-tag adm-cancel-tag--ok">Cancelado</span>
                    <span v-else-if="p.solicitacaoCancelamento?.status === 'recusado'" class="adm-cancel-tag adm-cancel-tag--no">Recusado</span>
                    <span v-else class="adm-cancel-tag">—</span>
                  </td>
                  <td class="adm-mono-date">{{ fmtDate(p.criadoEm) }}</td>
                  <td>
                    <button class="adm-icon-btn adm-icon-btn--sm" @click="detalheP = p" title="Ver detalhes">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div v-if="totalPagPedidos > 1" class="adm-pag">
              <button class="adm-pag__btn" :disabled="pagPedidos===1" @click="pagPedidos--">‹</button>
              <span class="adm-pag__info">{{ pagPedidos }} / {{ totalPagPedidos }}</span>
              <button class="adm-pag__btn" :disabled="pagPedidos===totalPagPedidos" @click="pagPedidos++">›</button>
            </div>
          </div>
        </section>

        <!-- ══════════ PRODUTOS ══════════ -->
        <section v-if="secao === 'produtos'" class="adm-section">
          <div class="adm-grid-4" style="margin-bottom:20px">
            <div class="adm-mini-stat" v-for="ms in miniStatsProdutos" :key="ms.label">
              <div class="adm-mini-stat__topline"></div>
              <span class="adm-mini-stat__num">{{ ms.num }}</span>
              <span class="adm-mini-stat__label">{{ ms.label }}</span>
              <span class="adm-mini-stat__bar" :style="{ width: ms.pct + '%' }"></span>
            </div>
          </div>

          <div class="adm-toolbar">
            <div class="adm-search-box">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              <input v-model="buscaProdutos" placeholder="Buscar produto…" autocomplete="off"/>
              <button v-if="buscaProdutos" @click="buscaProdutos=''" class="adm-search-clear">✕</button>
            </div>
            <select v-model="filtroCat" class="adm-select">
              <option value="">Todas as categorias</option>
              <option v-for="c in CATEGORIAS" :key="c">{{ c }}</option>
            </select>
            <select v-model="filtroEstoque" class="adm-select">
              <option value="">Todos os estoques</option>
              <option value="ok">Em estoque</option>
              <option value="zero">Esgotados</option>
              <option value="baixo">Estoque baixo (≤5)</option>
            </select>
            <button class="btn btn--ghost btn--sm" @click="executarSeed" :disabled="seedando">
              {{ seedando ? 'Importando…' : '↑ Seed' }}
            </button>
            <button class="btn btn--gold" @click="abrirNovoProduto">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Novo Produto
            </button>
          </div>

          <div v-if="produtosSelecionados.length" class="adm-bulk">
            <span class="adm-bulk__count">{{ produtosSelecionados.length }} selecionado(s)</span>
            <button class="btn btn--danger btn--sm" @click="deletarProdutosEmMassa">Excluir selecionados</button>
            <button class="btn btn--ghost btn--sm" @click="produtosSelecionados=[]">Cancelar</button>
          </div>

          <div class="adm-card" style="overflow-x:auto;padding:0">
            <div class="adm-card__topline"></div>
            <div v-if="loadingProdutos" class="adm-skel-wrap" style="padding:14px 18px">
              <div v-for="n in 6" :key="n" class="adm-skel-row"></div>
            </div>
            <table v-else class="adm-tabela">
              <thead>
                <tr>
                  <th style="width:32px;padding-left:18px"><input type="checkbox" :checked="todosProdChecked" @change="toggleTodosProd" class="adm-check"/></th>
                  <th @click="sortBy('nome')" class="adm-th-sort">Produto <span class="adm-sort-icon">{{ sortIcone('nome') }}</span></th>
                  <th @click="sortBy('categoria')" class="adm-th-sort">Categoria <span class="adm-sort-icon">{{ sortIcone('categoria') }}</span></th>
                  <th @click="sortBy('preco')" class="adm-th-sort">Preço <span class="adm-sort-icon">{{ sortIcone('preco') }}</span></th>
                  <th @click="sortBy('estoque')" class="adm-th-sort">Estoque <span class="adm-sort-icon">{{ sortIcone('estoque') }}</span></th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="!produtosFiltrados.length"><td colspan="7" class="adm-vazio">Nenhum produto encontrado</td></tr>
                <tr v-for="p in produtosPaginados" :key="p._id" :class="{ 'adm-row--selected': produtosSelecionados.includes(p._id) }">
                  <td style="padding-left:18px"><input type="checkbox" :checked="produtosSelecionados.includes(p._id)" @change="toggleSelecionarProduto(p._id)" class="adm-check"/></td>
                  <td>
                    <div class="adm-prod-info">
                      <div class="adm-prod-img"><img :src="p.imagem" :alt="p.nome" @error="e=>e.target.style.opacity='0'"/></div>
                      <div><p class="adm-nome">{{ p.nome }}</p><p class="adm-email">{{ p.marca }}</p></div>
                    </div>
                  </td>
                  <td><span class="adm-badge">{{ p.categoria }}</span></td>
                  <td class="adm-gold-val">R$ {{ fmt(p.preco) }}</td>
                  <td>
                    <span :class="['adm-estoque-badge', p.estoque<=0?'adm-estoque-badge--no':p.estoque<=5?'adm-estoque-badge--baixo':'adm-estoque-badge--ok']">
                      {{ p.estoque<=0?'Esgotado':p.estoque<=5?`⚠ ${p.estoque} un.`:`${p.estoque} un.` }}
                    </span>
                  </td>
                  <td>
                    <span v-if="p.destaque" class="adm-badge adm-badge--destaque">Destaque</span>
                    <span v-else-if="p.novo" class="adm-badge adm-badge--novo">Novo</span>
                    <span v-else class="adm-badge">Normal</span>
                  </td>
                  <td>
                    <div style="display:flex;gap:6px">
                      <button class="adm-icon-btn adm-icon-btn--sm" @click="duplicarProduto(p)" title="Duplicar">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                      </button>
                      <button class="adm-icon-btn adm-icon-btn--sm" @click="abrirEditarProduto(p)" title="Editar">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      </button>
                      <button class="adm-icon-btn adm-icon-btn--sm adm-icon-btn--danger" @click="deletandoProduto = p" title="Excluir">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div v-if="totalPagProdutos > 1" class="adm-pag">
              <button class="adm-pag__btn" :disabled="pagProdutos===1" @click="pagProdutos--">‹</button>
              <span class="adm-pag__info">{{ pagProdutos }} / {{ totalPagProdutos }}</span>
              <button class="adm-pag__btn" :disabled="pagProdutos===totalPagProdutos" @click="pagProdutos++">›</button>
            </div>
          </div>
        </section>

        <!-- ══════════ GAMER ══════════ -->
        <section v-if="secao === 'gamer'" class="adm-section">
          <div class="adm-grid-4" style="margin-bottom:20px">
            <div class="adm-mini-stat" v-for="ms in miniStatsGamer" :key="ms.label">
              <div class="adm-mini-stat__topline"></div>
              <span class="adm-mini-stat__num">{{ ms.num }}</span>
              <span class="adm-mini-stat__label">{{ ms.label }}</span>
              <span class="adm-mini-stat__bar" :style="{ width: ms.pct + '%' }"></span>
            </div>
          </div>
          <div class="adm-toolbar">
            <div class="adm-search-box">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              <input v-model="buscaGamer" placeholder="Buscar produto gamer…" autocomplete="off"/>
            </div>
            <select v-model="filtroGamerCat" class="adm-select">
              <option value="">Todas as subcategorias</option>
              <option v-for="c in GAMER_SUBCATS" :key="c">{{ c }}</option>
            </select>
            <button class="btn btn--gold" @click="abrirNovoProdutoGamer">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Novo Produto Gamer
            </button>
          </div>
          <div class="adm-card" style="overflow-x:auto;padding:0">
            <div class="adm-card__topline"></div>
            <div v-if="!produtosGamerFiltrados.length && !loadingProdutos" class="adm-vazio-bloco">
              <span class="adm-vazio-bloco__kanji">無</span>
              <p class="adm-vazio-bloco__titulo">Nenhum produto gamer encontrado</p>
              <button class="btn btn--gold" @click="abrirNovoProdutoGamer" style="margin-top:16px">Adicionar primeiro produto</button>
            </div>
            <table v-else class="adm-tabela">
              <thead>
                <tr>
                  <th @click="sortBy('nome')" class="adm-th-sort">Produto</th>
                  <th>Subcategoria</th>
                  <th @click="sortBy('preco')" class="adm-th-sort">Preço</th>
                  <th @click="sortBy('estoque')" class="adm-th-sort">Estoque</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="p in produtosGamerPaginados" :key="p._id">
                  <td>
                    <div class="adm-prod-info">
                      <div class="adm-prod-img"><img :src="p.imagem" :alt="p.nome" @error="e=>e.target.style.opacity='0'"/></div>
                      <div><p class="adm-nome">{{ p.nome }}</p><p class="adm-email">{{ p.marca }}</p></div>
                    </div>
                  </td>
                  <td><span class="adm-badge">{{ p.subCategoria || p.categoria }}</span></td>
                  <td class="adm-gold-val">R$ {{ fmt(p.preco) }}</td>
                  <td>
                    <span :class="['adm-estoque-badge', p.estoque<=0?'adm-estoque-badge--no':p.estoque<=5?'adm-estoque-badge--baixo':'adm-estoque-badge--ok']">
                      {{ p.estoque<=0?'Esgotado':p.estoque<=5?`⚠ ${p.estoque} un.`:`${p.estoque} un.` }}
                    </span>
                  </td>
                  <td>
                    <span v-if="p.destaque" class="adm-badge adm-badge--destaque">Destaque</span>
                    <span v-else-if="p.novo" class="adm-badge adm-badge--novo">Novo</span>
                    <span v-else class="adm-badge">Normal</span>
                  </td>
                  <td>
                    <div style="display:flex;gap:6px">
                      <button class="adm-icon-btn adm-icon-btn--sm" @click="abrirEditarProduto(p, 'gamer')" title="Editar">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      </button>
                      <button class="adm-icon-btn adm-icon-btn--sm adm-icon-btn--danger" @click="deletandoProduto = p" title="Excluir">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div v-if="totalPagGamer > 1" class="adm-pag">
              <button class="adm-pag__btn" :disabled="pagGamer===1" @click="pagGamer--">‹</button>
              <span class="adm-pag__info">{{ pagGamer }} / {{ totalPagGamer }}</span>
              <button class="adm-pag__btn" :disabled="pagGamer===totalPagGamer" @click="pagGamer++">›</button>
            </div>
          </div>

          <!-- Config Gamer -->
          <div class="adm-card">
            <div class="adm-card__topline"></div>
            <div class="adm-card__head">
              <span class="adm-card__kanji">武</span>
              <div><p class="adm-card__titulo">Configurar Página Gamer</p><p class="adm-card__sub">Hero, banner, textos e estilo visual</p></div>
            </div>
            <div class="adm-card__body">
              <div class="adm-grid-2">
                <div class="adm-campo"><label>Título Hero (kanji)</label><input v-model="gamerConfig.heroKanji" placeholder="戦場" autocomplete="off"/></div>
                <div class="adm-campo"><label>Título Hero principal</label><input v-model="gamerConfig.heroTitulo" placeholder="Gaming" autocomplete="off"/></div>
                <div class="adm-campo"><label>Subtítulo</label><input v-model="gamerConfig.heroSub" autocomplete="off"/></div>
                <div class="adm-campo"><label>Descrição Hero</label><input v-model="gamerConfig.heroDesc" autocomplete="off"/></div>
                <div class="adm-campo adm-col-2"><label>Texto do Banner</label><textarea v-model="gamerConfig.bannerTexto" rows="2" class="adm-campo__input"></textarea></div>
                <div class="adm-campo"><label>Título do Banner</label><input v-model="gamerConfig.bannerTitulo" autocomplete="off"/></div>
                <div class="adm-campo"><label>CTA do Banner</label><input v-model="gamerConfig.bannerCta" autocomplete="off"/></div>
              </div>
              <div style="display:flex;gap:20px;margin-top:16px;flex-wrap:wrap">
                <label class="adm-toggle-lbl">
                  <div :class="['adm-tog', { on: gamerConfig.showBanner }]" @click="gamerConfig.showBanner = !gamerConfig.showBanner"><span class="adm-tog__thumb"></span></div>
                  Exibir Banner Especial
                </label>
                <label class="adm-toggle-lbl">
                  <div :class="['adm-tog', { on: gamerConfig.showParticles }]" @click="gamerConfig.showParticles = !gamerConfig.showParticles"><span class="adm-tog__thumb"></span></div>
                  Partículas animadas
                </label>
              </div>
            </div>
            <div class="adm-card__foot">
              <button class="btn btn--ghost btn--sm" @click="resetGamerConfig">Resetar</button>
              <button class="btn btn--gold" @click="salvarGamerConfig" :disabled="salvandoGamer">
                <span v-if="salvandoGamer" class="adm-spinner adm-spinner--sm"></span>
                {{ salvandoGamer ? 'Salvando…' : 'Salvar Config Gamer' }}
              </button>
            </div>
          </div>
        </section>

        <!-- ══════════ USUÁRIOS ══════════ -->
        <section v-if="secao === 'usuarios'" class="adm-section">
          <div class="adm-grid-4" style="margin-bottom:20px">
            <div class="adm-mini-stat" v-for="ms in miniStatsUsuarios" :key="ms.label">
              <div class="adm-mini-stat__topline"></div>
              <span class="adm-mini-stat__num">{{ ms.num }}</span>
              <span class="adm-mini-stat__label">{{ ms.label }}</span>
              <span class="adm-mini-stat__bar" :style="{ width: ms.pct + '%' }"></span>
            </div>
          </div>
          <div class="adm-toolbar">
            <div class="adm-search-box">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              <input v-model="buscaUsuarios" placeholder="Buscar por nome ou e-mail…" autocomplete="off"/>
              <button v-if="buscaUsuarios" @click="buscaUsuarios=''" class="adm-search-clear">✕</button>
            </div>
            <select v-model="filtroRole" class="adm-select">
              <option value="">Todos os roles</option>
              <option value="admin">Admins</option>
              <option value="user">Usuários</option>
            </select>
            <button class="btn btn--ghost btn--sm" @click="carregarUsuarios">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.51"/></svg>
            </button>
          </div>
          <div class="adm-card" style="overflow-x:auto;padding:0">
            <div class="adm-card__topline"></div>
            <div v-if="loadingUsuarios" class="adm-skel-wrap" style="padding:14px 18px"><div v-for="n in 6" :key="n" class="adm-skel-row"></div></div>
            <table v-else class="adm-tabela">
              <thead>
                <tr>
                  <th @click="sortBy('nome')" class="adm-th-sort">Usuário</th>
                  <th @click="sortBy('email')" class="adm-th-sort">E-mail</th>
                  <th>Role</th>
                  <th>2FA</th>
                  <th @click="sortBy('criadoEm')" class="adm-th-sort">Cadastro</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="!usuariosFiltrados.length"><td colspan="6" class="adm-vazio">Nenhum usuário encontrado</td></tr>
                <tr v-for="u in usuariosPaginados" :key="u._id">
                  <td>
                    <div class="adm-usr-info">
                      <div class="adm-usr-av">
                        <img v-if="u.avatar" :src="u.avatar" @error="e=>e.target.style.display='none'"/>
                        <span v-else>{{ (u.nome||'U').charAt(0) }}</span>
                      </div>
                      <div><p class="adm-nome">{{ u.nome }} {{ u.sobrenome }}</p><p class="adm-email">{{ u.provider || 'local' }}</p></div>
                    </div>
                  </td>
                  <td class="adm-email">{{ mascararEmail(u.email) }}</td>
                  <td><span :class="['adm-role-badge', u.role==='admin'?'adm-role-badge--admin':'']">{{ u.role==='admin'?'ADMIN':'USER' }}</span></td>
                  <td><span :class="['adm-2fa-badge', u.twoFA?'adm-2fa-badge--on':'']">{{ u.twoFA?'✓ ON':'✗ OFF' }}</span></td>
                  <td class="adm-mono-date">{{ fmtDate(u.criadoEm) }}</td>
                  <td>
                    <div style="display:flex;gap:6px">
                      <button class="adm-icon-btn adm-icon-btn--sm" :class="u.role==='admin'?'adm-icon-btn--danger':''" @click="toggleAdmin(u)" :disabled="u._id===meuId">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                      </button>
                      <button class="adm-icon-btn adm-icon-btn--sm adm-icon-btn--danger" @click="deletandoUsuario = u" :disabled="u._id===meuId">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div v-if="totalPagUsuarios > 1" class="adm-pag">
              <button class="adm-pag__btn" :disabled="pagUsuarios===1" @click="pagUsuarios--">‹</button>
              <span class="adm-pag__info">{{ pagUsuarios }} / {{ totalPagUsuarios }}</span>
              <button class="adm-pag__btn" :disabled="pagUsuarios===totalPagUsuarios" @click="pagUsuarios++">›</button>
            </div>
          </div>
        </section>

        <!-- ══════════ NOTIFICAÇÕES ══════════ -->
        <section v-if="secao === 'notificacoes'" class="adm-section">
          <div class="adm-card">
            <div class="adm-card__topline"></div>
            <div class="adm-card__head adm-card__head--between">
              <div style="display:flex;align-items:center;gap:12px"><span class="adm-card__kanji">知</span><p class="adm-card__titulo">Central de Notificações</p></div>
              <button class="btn btn--ghost btn--sm" @click="marcarTodasLidas">Marcar todas lidas</button>
            </div>
            <div v-if="!notificacoes.length" class="adm-vazio-bloco">
              <span class="adm-vazio-bloco__kanji">無</span>
              <p class="adm-vazio-bloco__titulo">Nenhuma notificação</p>
            </div>
            <div v-for="n in notificacoes" :key="n.id"
              :class="['adm-notif-row', { 'adm-notif-row--nova': !n.lida }]"
              @click="lerNotif(n)">
              <span class="adm-notif-row__dot" v-if="!n.lida"></span>
              <div class="adm-notif-row__body">
                <p class="adm-notif-row__msg">{{ n.msg }}</p>
                <p class="adm-notif-row__time">{{ fmtDate(n.criadoEm) }}</p>
              </div>
              <span v-if="!n.lida" class="adm-badge" style="flex-shrink:0">Nova</span>
            </div>
          </div>
        </section>

        <!-- ══════════ ANALYTICS ══════════ -->
        <section v-if="secao === 'analytics'" class="adm-section">
          <div class="adm-grid-4" style="margin-bottom:20px">
            <div class="adm-mini-stat" v-for="ms in miniStatsAnalytics" :key="ms.label">
              <div class="adm-mini-stat__topline"></div>
              <span class="adm-mini-stat__num">{{ ms.num }}</span>
              <span class="adm-mini-stat__label">{{ ms.label }}</span>
              <span class="adm-mini-stat__bar" :style="{ width: ms.pct + '%' }"></span>
            </div>
          </div>
          <div class="adm-charts">
            <div class="adm-card" style="grid-column:1/-1">
              <div class="adm-card__topline"></div>
              <div class="adm-card__head"><span class="adm-card__kanji">析</span><div><p class="adm-card__titulo">Receita Mensal Detalhada</p><p class="adm-card__sub">{{ anoAtual }}</p></div></div>
              <div class="adm-card__body">
                <div class="adm-bar adm-bar--tall">
                  <div v-for="(v, i) in revenueData" :key="i" class="adm-bar__col" :title="`${MESES_FULL[i]}: R$ ${fmtNum(v)}`">
                    <div class="adm-bar__bar" :style="{ height: (v / Math.max(...revenueData, 1) * 130) + 'px' }">
                      <span class="adm-bar__tooltip">R$ {{ fmtNum(v) }}</span>
                    </div>
                    <span class="adm-bar__label">{{ MESES[i] }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="adm-card">
              <div class="adm-card__topline"></div>
              <div class="adm-card__head"><span class="adm-card__kanji">状</span><p class="adm-card__titulo">Status dos Pedidos</p></div>
              <div class="adm-card__body">
                <div v-for="s in statusAnalytics" :key="s.label" class="adm-analytics-row">
                  <span class="adm-analytics-lbl">{{ s.label }}</span>
                  <div class="adm-analytics-bar"><div class="adm-analytics-fill" :style="{ width: s.pct + '%' }"></div></div>
                  <span class="adm-analytics-val">{{ s.count }}</span>
                </div>
              </div>
            </div>
            <div class="adm-card">
              <div class="adm-card__topline"></div>
              <div class="adm-card__head"><span class="adm-card__kanji">首</span><p class="adm-card__titulo">Top Produtos</p></div>
              <div class="adm-card__body">
                <div v-for="(p, i) in topProdutos" :key="p._id" class="adm-top-item">
                  <span class="adm-top-item__rank">{{ String(i+1).padStart(2,'0') }}</span>
                  <div class="adm-prod-img" style="width:32px;height:32px;flex-shrink:0"><img :src="p.imagem" :alt="p.nome" @error="e=>e.target.style.opacity='0'"/></div>
                  <div style="flex:1;min-width:0"><p class="adm-nome" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">{{ p.nome }}</p><p class="adm-email">{{ p.qtdVendida||0 }} un. vendidas</p></div>
                  <span class="adm-gold-val">R$ {{ fmt(p.preco) }}</span>
                </div>
                <div v-if="!topProdutos.length" class="adm-vazio-simples">Sem dados suficientes</div>
              </div>
            </div>
          </div>
        </section>

        <!-- ══════════ CUPONS ══════════ -->
        <section v-if="secao === 'cupons'" class="adm-section">
          <div class="adm-toolbar">
            <div class="adm-search-box">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              <input v-model="buscaCupons" placeholder="Buscar cupom…" autocomplete="off"/>
            </div>
            <button class="btn btn--gold" @click="abrirNovoCupom">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Novo Cupom
            </button>
          </div>
          <div class="adm-card" style="overflow-x:auto;padding:0">
            <div class="adm-card__topline"></div>
            <table class="adm-tabela">
              <thead>
                <tr><th>Código</th><th>Tipo</th><th>Valor</th><th>Uso</th><th>Validade</th><th>Status</th><th></th></tr>
              </thead>
              <tbody>
                <tr v-if="!cupons.length"><td colspan="7" class="adm-vazio">Nenhum cupom criado</td></tr>
                <tr v-for="c in cupons" :key="c._id||c.id">
                  <td><span class="adm-mono-id">{{ c.codigo }}</span></td>
                  <td><span class="adm-badge">{{ c.tipo==='pct'?'Percentual':c.tipo==='frete'?'Frete Grátis':'Valor Fixo' }}</span></td>
                  <td class="adm-gold-val">{{ c.tipo==='pct'?`${c.valor}%`:c.tipo==='frete'?'—':`R$ ${fmt(c.valor)}` }}</td>
                  <td class="adm-mono-date">{{ c.usos||0 }} / {{ c.limiteTotal||'∞' }}</td>
                  <td class="adm-mono-date">{{ c.validade?fmtDate(c.validade):'Sem limite' }}</td>
                  <td><span :class="['adm-estoque-badge', c.ativo?'adm-estoque-badge--ok':'adm-estoque-badge--no']">{{ c.ativo?'Ativo':'Inativo' }}</span></td>
                  <td>
                    <div style="display:flex;gap:6px">
                      <button class="adm-icon-btn adm-icon-btn--sm" @click="editarCupom(c)">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      </button>
                      <button class="adm-icon-btn adm-icon-btn--sm adm-icon-btn--danger" @click="deletarCupom(c)">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- ══════════ SITE ══════════ -->
        <section v-if="secao === 'site'" class="adm-section">
          <div class="adm-site-tabs">
            <button v-for="t in SITE_TABS" :key="t.id"
              :class="['adm-site-tab', { 'is-active': siteTab === t.id }]"
              @click="siteTab = t.id">
              <span class="adm-site-tab__kanji">{{ t.kanji }}</span>{{ t.label }}
            </button>
          </div>

          <template v-if="siteTab === 'identidade'">
            <div class="adm-card">
              <div class="adm-card__topline"></div>
              <div class="adm-card__head"><span class="adm-card__kanji">城</span><h3 class="adm-card__titulo">Identidade e Marca</h3></div>
              <div class="adm-card__body">
                <div class="adm-grid-2">
                  <div class="adm-campo"><label>Nome do Site</label><input v-model="siteLocal.nome" placeholder="Noir & Or"/></div>
                  <div class="adm-campo"><label>Slogan</label><input v-model="siteLocal.slogan"/></div>
                  <div class="adm-campo adm-col-2"><label>Descrição Meta (SEO)</label><textarea v-model="siteLocal.descricao" rows="2" class="adm-campo__input"></textarea></div>
                  <div class="adm-campo"><label>E-mail de Contato</label><input v-model="siteLocal.emailContato" type="email"/></div>
                  <div class="adm-campo"><label>WhatsApp</label><input v-model="siteLocal.whatsapp"/></div>
                  <div class="adm-campo"><label>Cor Primária</label><div style="display:flex;align-items:center;gap:10px"><input v-model="siteLocal.corPrimaria" type="color" class="adm-color-input"/><input v-model="siteLocal.corPrimaria" placeholder="#C8A84B" style="flex:1"/></div></div>
                  <div class="adm-campo"><label>Tema padrão</label>
                    <select v-model="siteLocal.temaDefault" class="adm-campo__sel">
                      <option value="escuro">Celestial (Escuro)</option>
                      <option value="claro">Autumn (Claro)</option>
                      <option value="gamer">Ghost (Gamer)</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="adm-card__foot">
                <button class="btn btn--gold" @click="salvarSite" :disabled="salvandoSite">
                  <span v-if="salvandoSite" class="adm-spinner adm-spinner--sm"></span>
                  {{ salvandoSite ? 'Salvando…' : 'Salvar Identidade' }}
                </button>
              </div>
            </div>
          </template>

          <template v-if="siteTab === 'seguranca'">
            <div class="adm-card">
              <div class="adm-card__topline"></div>
              <div class="adm-card__head"><span class="adm-card__kanji">守</span><h3 class="adm-card__titulo">Segurança de Login</h3></div>
              <div class="adm-card__body">
                <div class="adm-grid-2">
                  <div class="adm-campo"><label>Máx. tentativas</label><input v-model.number="siteLocal.seg.maxTentativas" type="number" min="3" max="20"/></div>
                  <div class="adm-campo"><label>Bloqueio base (s)</label><input v-model.number="siteLocal.seg.bloqueioBase" type="number"/></div>
                  <div class="adm-campo"><label>Google OAuth Client ID</label><input v-model="siteLocal.seg.googleClientId"/></div>
                  <div class="adm-campo"><label>Prazo cancelamento (h)</label><input v-model.number="siteLocal.seg.prazoCancelamento" type="number"/></div>
                </div>
              </div>
              <div class="adm-card__foot">
                <button class="btn btn--gold" @click="salvarSite" :disabled="salvandoSite">Salvar Segurança</button>
              </div>
            </div>
          </template>

          <template v-if="siteTab === 'politicas'">
            <div class="adm-card">
              <div class="adm-card__topline"></div>
              <div class="adm-card__head"><span class="adm-card__kanji">法</span><h3 class="adm-card__titulo">Políticas Legais</h3></div>
              <div class="adm-card__body" style="display:flex;flex-direction:column;gap:20px">
                <div class="adm-campo"><label>Termos de Uso</label><textarea v-model="siteLocal.politicas.termos" rows="5" class="adm-campo__input"></textarea></div>
                <div class="adm-campo"><label>Política de Privacidade</label><textarea v-model="siteLocal.politicas.privacidade" rows="5" class="adm-campo__input"></textarea></div>
                <div class="adm-campo"><label>Prefixo número do pedido</label><input v-model="siteLocal.politicas.pedidoPrefixo" placeholder="NOR-" maxlength="6"/></div>
              </div>
              <div class="adm-card__foot">
                <button class="btn btn--gold" @click="salvarSite" :disabled="salvandoSite">Salvar Políticas</button>
              </div>
            </div>
          </template>
        </section>

      </div><!-- /adm-content -->

      <!-- ══ MODAIS ══ -->

      <!-- Detalhe Pedido -->
      <transition name="modal-fade">
        <div v-if="detalheP" class="adm-modal-wrap" @click.self="detalheP=null" role="dialog" aria-modal="true">
          <div class="adm-modal">
            <div class="adm-modal__topline"></div>
            <div class="adm-modal__head">
              <h3 class="adm-modal__titulo"><span class="adm-modal__kanji">令</span>Pedido #{{ (detalheP._id||'').slice(-8).toUpperCase() }}</h3>
              <button class="adm-modal__close" @click="detalheP=null">✕</button>
            </div>
            <div class="adm-modal__body">
              <div class="adm-grid-2" style="margin-bottom:20px">
                <div><p class="adm-mini-label">Cliente</p><p class="adm-nome">{{ detalheP.cliente?.nome }}</p><p class="adm-email">{{ detalheP.cliente?.email }}</p></div>
                <div><p class="adm-mini-label">Entrega</p><p class="adm-nome">{{ detalheP.entrega?.endereco }}</p><p class="adm-email">{{ detalheP.entrega?.cidade }} · CEP {{ detalheP.entrega?.cep }}</p></div>
                <div><p class="adm-mini-label">Pagamento</p><p class="adm-nome">{{ (detalheP.pagamento?.metodo||'').toUpperCase() }}</p></div>
                <div><p class="adm-mini-label">Data</p><p class="adm-nome">{{ fmtDate(detalheP.criadoEm) }}</p></div>
              </div>
              <p class="adm-mini-label" style="margin-bottom:10px">Itens do Pedido</p>
              <div v-for="item in detalheP.itens" :key="item._id" class="adm-modal-item">
                <div class="adm-prod-img" style="width:48px;height:48px"><img :src="item.produto?.imagem||item.imagem" @error="e=>e.target.style.opacity='0'"/></div>
                <div style="flex:1"><p class="adm-nome">{{ item.produto?.nome||item.nome }}</p><p class="adm-email">Quantidade: {{ item.qty }}</p></div>
                <span class="adm-gold-val">R$ {{ fmt((item.produto?.preco||item.preco||0)*item.qty) }}</span>
              </div>
              <div class="adm-modal__total">
                <span>Total do Pedido</span>
                <span class="adm-gold-val" style="font-size:1.15rem">R$ {{ fmt(detalheP.total) }}</span>
              </div>
            </div>
            <div class="adm-modal__foot">
              <button class="btn btn--ghost" @click="detalheP=null">Fechar</button>
            </div>
          </div>
        </div>
      </transition>

      <!-- Modal recusa cancelamento -->
      <transition name="modal-fade">
        <div v-if="modalRecusa" class="adm-modal-wrap" @click.self="modalRecusa=null" role="dialog" aria-modal="true">
          <div class="adm-modal adm-modal--sm">
            <div class="adm-modal__topline"></div>
            <div class="adm-modal__head">
              <h3 class="adm-modal__titulo">{{ modalRecusaAprovando ? 'Aprovar Cancelamento' : 'Recusar Cancelamento' }}</h3>
              <button class="adm-modal__close" @click="modalRecusa=null">✕</button>
            </div>
            <div class="adm-modal__body">
              <p class="adm-email" style="margin-bottom:16px">Pedido #{{ (modalRecusa._id||'').slice(-8).toUpperCase() }}</p>
              <div v-if="!modalRecusaAprovando" class="adm-campo">
                <label>Motivo da Recusa</label>
                <textarea v-model="motivoRecusa" rows="3" class="adm-campo__input" placeholder="Informe o motivo…"></textarea>
              </div>
              <p v-else class="adm-email">Confirma a aprovação do cancelamento deste pedido?</p>
            </div>
            <div class="adm-modal__foot">
              <button class="btn btn--ghost" @click="modalRecusa=null">Cancelar</button>
              <button :class="['btn', modalRecusaAprovando ? 'btn--gold' : 'btn--danger']"
                @click="confirmarProcessarCancelamento" :disabled="processandoCancel">
                <span v-if="processandoCancel" class="adm-spinner adm-spinner--sm"></span>
                {{ modalRecusaAprovando ? 'Aprovar' : 'Recusar' }}
              </button>
            </div>
          </div>
        </div>
      </transition>

      <!-- Modal Produto -->
      <transition name="modal-fade">
        <div v-if="modalProduto" class="adm-modal-wrap" @click.self="modalProduto=false" role="dialog" aria-modal="true">
          <div class="adm-modal adm-modal--lg">
            <div class="adm-modal__topline"></div>
            <div class="adm-modal__head">
              <h3 class="adm-modal__titulo">
                <span class="adm-modal__kanji">{{ isGamerModal ? '戦' : '品' }}</span>
                {{ editandoProduto ? 'Editar Produto' : 'Novo Produto' }}
              </h3>
              <button class="adm-modal__close" @click="modalProduto=false">✕</button>
            </div>
            <div class="adm-modal__body">
              <div class="adm-prod-form-tabs">
                <button v-for="t in PROD_FORM_TABS" :key="t.id"
                  :class="['adm-prod-form-tab', { 'is-active': prodFormTab === t.id }]"
                  @click="prodFormTab = t.id">{{ t.label }}</button>
              </div>

              <div v-if="prodFormTab === 'basico'" class="adm-grid-2">
                <div class="adm-campo"><label>Nome *</label><input v-model="formProd.nome" autocomplete="off"/></div>
                <div class="adm-campo"><label>Marca *</label><input v-model="formProd.marca" autocomplete="off"/></div>
                <div class="adm-campo">
                  <label>Categoria</label>
                  <template v-if="isGamerModal">
                    <input value="GAMING" disabled class="adm-campo__sel" style="opacity:.4;cursor:not-allowed"/>
                  </template>
                  <template v-else>
                    <select v-model="formProd.categoria" class="adm-campo__sel">
                      <option v-for="c in CATEGORIAS" :key="c" :value="c">{{ c }}</option>
                    </select>
                  </template>
                </div>
                <div v-if="isGamerModal" class="adm-campo">
                  <label>Subcategoria Gamer</label>
                  <select v-model="formProd.subCategoria" class="adm-campo__sel">
                    <option v-for="c in GAMER_SUBCATS" :key="c" :value="c">{{ c }}</option>
                  </select>
                </div>
                <div class="adm-campo">
                  <label>Preço (R$) *</label>
                  <input type="text" inputmode="numeric" placeholder="0,00" autocomplete="off"
                    @input="e => { let d=e.target.value.replace(/\D/g,''); let n=(parseInt(d||'0')/100); formProd.preco=n; e.target.value=n.toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2}) }"
                    @focus="e => { let d=String(Math.round(formProd.preco*100)); let n=parseInt(d||'0')/100; e.target.value=n.toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2}) }"/>
                </div>
                <div class="adm-campo"><label>Estoque</label><input v-model.number="formProd.estoque" type="number" min="0"/></div>
                <div class="adm-campo"><label>Parcelas</label><input v-model.number="formProd.parcelas" type="number" min="1" max="24"/></div>
                <div class="adm-campo"><label>SKU</label><input v-model="formProd.sku" autocomplete="off"/></div>
                <div class="adm-campo adm-col-2"><label>Descrição</label><textarea v-model="formProd.descricao" rows="3" class="adm-campo__input"></textarea></div>
                <div class="adm-campo adm-col-2"><label>URL da Imagem Principal</label><input v-model="formProd.imagem" autocomplete="off"/></div>
              </div>

              <div v-if="prodFormTab === 'imagens'" class="adm-grid-2">
                <div class="adm-campo adm-col-2"><label>Imagem Principal</label><input v-model="formProd.imagem"/></div>
                <div class="adm-campo adm-col-2"><div v-if="formProd.imagem" class="adm-img-preview"><img :src="formProd.imagem" alt="Preview" @error="e=>e.target.style.opacity='0'"/></div></div>
                <div class="adm-campo"><label>Imagem 2</label><input v-model="formProd.imagem2"/></div>
                <div class="adm-campo"><label>Imagem 3</label><input v-model="formProd.imagem3"/></div>
              </div>

              <div v-if="prodFormTab === 'variantes'">
                <p class="adm-campo-hint" style="margin-bottom:14px">Cores disponíveis</p>
                <div v-for="(cor, i) in formProd.cores" :key="i" style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
                  <input v-model="cor.nome" placeholder="Nome da cor" style="flex:1"/>
                  <input v-model="cor.hex" type="color" class="adm-color-input"/>
                  <input v-model="cor.hex" placeholder="#000000" style="width:90px"/>
                  <button class="adm-icon-btn adm-icon-btn--sm adm-icon-btn--danger" @click="formProd.cores.splice(i,1)"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg></button>
                </div>
                <button class="btn btn--ghost btn--sm" @click="formProd.cores.push({nome:'',hex:'#000000'})">+ Adicionar cor</button>
              </div>

              <div v-if="prodFormTab === 'specs'">
                <p class="adm-campo-hint" style="margin-bottom:14px">Especificações técnicas</p>
                <div v-for="(sp, i) in formProd.specs" :key="i" style="display:flex;gap:10px;margin-bottom:8px">
                  <input v-model="sp.k" placeholder="ex: Processador" style="flex:1"/>
                  <input v-model="sp.v" placeholder="ex: Apple M4" style="flex:2"/>
                  <button class="adm-icon-btn adm-icon-btn--sm adm-icon-btn--danger" @click="formProd.specs.splice(i,1)"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg></button>
                </div>
                <button class="btn btn--ghost btn--sm" @click="formProd.specs.push({k:'',v:''})">+ Adicionar spec</button>
              </div>

              <div v-if="prodFormTab === 'status'">
                <div style="display:flex;gap:24px;margin-top:16px;flex-wrap:wrap">
                  <label class="adm-toggle-lbl"><div :class="['adm-tog',{on:formProd.destaque}]" @click="formProd.destaque=!formProd.destaque"><span class="adm-tog__thumb"></span></div>Produto Destaque</label>
                  <label class="adm-toggle-lbl"><div :class="['adm-tog',{on:formProd.novo}]" @click="formProd.novo=!formProd.novo"><span class="adm-tog__thumb"></span></div>Novo Lançamento</label>
                  <label class="adm-toggle-lbl"><div :class="['adm-tog',{on:formProd.limitada}]" @click="formProd.limitada=!formProd.limitada"><span class="adm-tog__thumb"></span></div>Edição Limitada</label>
                  <label v-if="isGamerModal" class="adm-toggle-lbl"><div :class="['adm-tog',{on:formProd.rgb}]" @click="formProd.rgb=!formProd.rgb"><span class="adm-tog__thumb"></span></div>RGB</label>
                </div>
              </div>

              <p v-if="erroFormProd" class="adm-erro" role="alert">{{ erroFormProd }}</p>
            </div>
            <div class="adm-modal__foot">
              <button class="btn btn--ghost" @click="modalProduto=false">Cancelar</button>
              <button class="btn btn--gold" @click="salvarProduto" :disabled="salvandoProd">
                <span v-if="salvandoProd" class="adm-spinner adm-spinner--sm"></span>
                {{ editandoProduto ? 'Salvar Alterações' : 'Criar Produto' }}
              </button>
            </div>
          </div>
        </div>
      </transition>

      <!-- Modal Cupom -->
      <transition name="modal-fade">
        <div v-if="modalCupom" class="adm-modal-wrap" @click.self="modalCupom=false" role="dialog" aria-modal="true">
          <div class="adm-modal adm-modal--sm">
            <div class="adm-modal__topline"></div>
            <div class="adm-modal__head">
              <h3 class="adm-modal__titulo">{{ editandoCupom ? 'Editar Cupom' : 'Novo Cupom' }}</h3>
              <button class="adm-modal__close" @click="modalCupom=false">✕</button>
            </div>
            <div class="adm-modal__body">
              <div class="adm-grid-2">
                <div class="adm-campo adm-col-2"><label>Código *</label><input v-model="formCupom.codigo" autocomplete="off" style="text-transform:uppercase"/></div>
                <div class="adm-campo"><label>Tipo</label><select v-model="formCupom.tipo" class="adm-campo__sel"><option value="pct">Percentual (%)</option><option value="fixo">Valor Fixo (R$)</option><option value="frete">Frete Grátis</option></select></div>
                <div class="adm-campo"><label>Valor</label><input v-model.number="formCupom.valor" type="number" min="0" :disabled="formCupom.tipo==='frete'"/></div>
                <div class="adm-campo"><label>Pedido mínimo (R$)</label><input v-model.number="formCupom.minPedido" type="number" min="0"/></div>
                <div class="adm-campo"><label>Limite de usos</label><input v-model.number="formCupom.limiteTotal" type="number" min="0"/></div>
                <div class="adm-campo"><label>Válido de</label><input v-model="formCupom.validoDe" type="date" class="adm-date-input"/></div>
                <div class="adm-campo"><label>Válido até</label><input v-model="formCupom.validoAte" type="date" class="adm-date-input"/></div>
              </div>
              <div style="display:flex;gap:20px;margin-top:16px">
                <label class="adm-toggle-lbl"><div :class="['adm-tog',{on:formCupom.ativo}]" @click="formCupom.ativo=!formCupom.ativo"><span class="adm-tog__thumb"></span></div>Cupom Ativo</label>
              </div>
              <p v-if="erroFormCupom" class="adm-erro">{{ erroFormCupom }}</p>
            </div>
            <div class="adm-modal__foot">
              <button class="btn btn--ghost" @click="modalCupom=false">Cancelar</button>
              <button class="btn btn--gold" @click="salvarCupom" :disabled="salvandoCupom">
                <span v-if="salvandoCupom" class="adm-spinner adm-spinner--sm"></span>
                {{ editandoCupom ? 'Salvar' : 'Criar Cupom' }}
              </button>
            </div>
          </div>
        </div>
      </transition>

      <!-- Confirm Delete Produto -->
      <transition name="modal-fade">
        <div v-if="deletandoProduto" class="adm-modal-wrap" @click.self="deletandoProduto=null">
          <div class="adm-modal adm-modal--sm">
            <div class="adm-modal__topline adm-modal__topline--red"></div>
            <div class="adm-modal__head"><h3 class="adm-modal__titulo">Confirmar Exclusão</h3><button class="adm-modal__close" @click="deletandoProduto=null">✕</button></div>
            <div class="adm-modal__body" style="text-align:center;padding:28px 26px">
              <p class="adm-modal__confirm-kanji">削</p>
              <p style="font-size:13px;color:rgba(237,232,224,0.55);line-height:1.7">Excluir <strong style="color:rgba(237,232,224,0.85)">{{ deletandoProduto.nome }}</strong>?<br/>Esta ação não pode ser desfeita.</p>
            </div>
            <div class="adm-modal__foot">
              <button class="btn btn--ghost" @click="deletandoProduto=null">Cancelar</button>
              <button class="btn btn--danger" @click="deletarProduto" :disabled="deletandoProdLoad">
                <span v-if="deletandoProdLoad" class="adm-spinner adm-spinner--sm"></span>Excluir
              </button>
            </div>
          </div>
        </div>
      </transition>

      <!-- Confirm Delete Usuário -->
      <transition name="modal-fade">
        <div v-if="deletandoUsuario" class="adm-modal-wrap" @click.self="deletandoUsuario=null">
          <div class="adm-modal adm-modal--sm">
            <div class="adm-modal__topline adm-modal__topline--red"></div>
            <div class="adm-modal__head"><h3 class="adm-modal__titulo">Excluir Usuário</h3><button class="adm-modal__close" @click="deletandoUsuario=null">✕</button></div>
            <div class="adm-modal__body" style="text-align:center;padding:28px 26px">
              <p class="adm-modal__confirm-kanji">除</p>
              <p style="font-size:13px;color:rgba(237,232,224,0.55);line-height:1.7">Excluir <strong style="color:rgba(237,232,224,0.85)">{{ deletandoUsuario.nome }}</strong>?<br/>Dados removidos permanentemente.</p>
            </div>
            <div class="adm-modal__foot">
              <button class="btn btn--ghost" @click="deletandoUsuario=null">Cancelar</button>
              <button class="btn btn--danger" @click="deletarUsuario" :disabled="deletandoUsrLoad">
                <span v-if="deletandoUsrLoad" class="adm-spinner adm-spinner--sm"></span>Excluir
              </button>
            </div>
          </div>
        </div>
      </transition>

    </template>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { useAuthStore }     from '@/stores/auth.js'
import { useProdutosStore } from '@/stores/produtos.js'
import { useSiteStore }     from '@/stores/site.js'
import api from '@/api.js'

// ─── Diretiva click-outside ───────────────────────────────────────────────────
const vClickOutside = {
  mounted(el, binding) {
    el._clickOutside = (e) => { if (!el.contains(e.target)) binding.value(e) }
    document.addEventListener('click', el._clickOutside)
  },
  unmounted(el) { document.removeEventListener('click', el._clickOutside) }
}

// ─── Stores ───────────────────────────────────────────────────────────────────
const auth          = useAuthStore()
const produtosStore = useProdutosStore()
const siteStore     = useSiteStore()

// ─── Constantes ───────────────────────────────────────────────────────────────
const MESES       = ['J','F','M','A','M','J','J','A','S','O','N','D']
const MESES_FULL  = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez']
const CATEGORIAS  = ['COMPUTING','MOBILE','AUDIO','GAMING','VISUAL','VIRTUAL']
const STATUS_LIST = ['pendente','aprovado','enviado','entregue','cancelado']
const CAT_LABELS  = ['Computing','Mobile','Audio','Gaming','Visual','Virtual']
const CAT_CORES   = ['#C8A84B','#3498db','#9b59b6','#2ecc71','#e67e22','#1abc9c']
const GAMER_SUBCATS = ['Mouse','Teclado','Headset','Mousepad','Monitor','Cadeira','Webcam','Controle','Headphone','Microfone']
const POR_PAGINA  = 10
const anoAtual    = new Date().getFullYear()

const NAV_GESTAO = [
  { id:'dashboard',    num:'一', kanji:'統', label:'Dashboard',      icon:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>' },
  { id:'pedidos',      num:'二', kanji:'令', label:'Pedidos',        icon:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1 3h15v13H1z"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>' },
  { id:'produtos',     num:'三', kanji:'品', label:'Produtos',       icon:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>' },
  { id:'gamer',        num:'四', kanji:'戦', label:'Gaming Arsenal', icon:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="6" width="20" height="12" rx="3"/><path d="M6 12h4M8 10v4"/><circle cx="15" cy="11" r="1" fill="currentColor"/><circle cx="18" cy="13" r="1" fill="currentColor"/></svg>' },
  { id:'usuarios',     num:'五', kanji:'民', label:'Usuários',       icon:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>' },
  { id:'notificacoes', num:'六', kanji:'知', label:'Notificações',   icon:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>' },
]
const NAV_CONFIG = [
  { id:'analytics', num:'七', kanji:'析', label:'Analytics',       icon:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>' },
  { id:'cupons',    num:'八', kanji:'券', label:'Cupons',           icon:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>' },
  { id:'site',      num:'九', kanji:'城', label:'Configurar Site', icon:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10 15 15 0 0 1-4-10 15 15 0 0 1 4-10z"/></svg>' },
]
const NAV = [...NAV_GESTAO, ...NAV_CONFIG]

const SITE_TABS = [
  { id:'identidade', kanji:'城', label:'Identidade' },
  { id:'seguranca',  kanji:'守', label:'Segurança'  },
  { id:'politicas',  kanji:'法', label:'Políticas'  },
]
const siteTab = ref('identidade')

const PROD_FORM_TABS = [
  { id:'basico',    label:'基 · Básico'    },
  { id:'imagens',   label:'画 · Imagens'   },
  { id:'variantes', label:'変 · Variantes' },
  { id:'specs',     label:'仕 · Specs'     },
  { id:'status',    label:'状 · Status'    },
]
const prodFormTab = ref('basico')

// ─── UI STATE ─────────────────────────────────────────────────────────────────
const secao         = ref('dashboard')
const sidebarOpen   = ref(false)
const horaAtual     = ref('')
const toast         = ref({ msg:'', titulo:'', tipo:'sucesso' })
const notifOpen     = ref(false)
const notificacoes  = ref([])
const alertas       = ref([])
const logAtividade  = ref([])
const loadingDash   = ref(false)
let   _toastTimer   = null
let   clockTimer    = null
let   pollingTimer  = null

const secaoAtual     = computed(() => NAV.find(n => n.id === secao.value))
const meuId          = computed(() => auth.user?._id)
const inicialAdmin   = computed(() => (auth.user?.nome || 'A').charAt(0).toUpperCase())
const primeiroNomeAdmin = computed(() => (auth.user?.nome || 'Admin').split(' ')[0])
const notifsNaoLidas = computed(() => notificacoes.value.filter(n => !n.lida).length)
const badgePedidos   = computed(() => todosPedidos.value.filter(p => p.status === 'pendente').length)

const navegar = (id) => { secao.value = id; sidebarOpen.value = false; resetSorts() }

// ─── TOAST ───────────────────────────────────────────────────────────────────
const mostrarToast = (titulo, msg = '', tipo = 'sucesso') => {
  clearTimeout(_toastTimer)
  toast.value = { titulo, msg, tipo }
  _toastTimer = setTimeout(() => { toast.value = { msg:'', titulo:'', tipo:'sucesso' } }, 3800)
}

// ─── SORTING ─────────────────────────────────────────────────────────────────
const sortField = ref('')
const sortDir   = ref('asc')
const sortBy    = (field) => {
  if (sortField.value === field) sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
  else { sortField.value = field; sortDir.value = 'asc' }
}
const sortIcone = (field) => sortField.value !== field ? '⇅' : sortDir.value === 'asc' ? '↑' : '↓'
const resetSorts = () => { sortField.value = ''; sortDir.value = 'asc' }
const sortarLista = (lista) => {
  if (!sortField.value) return lista
  return [...lista].sort((a, b) => {
    const va = sortField.value.split('.').reduce((o, k) => o?.[k], a) ?? ''
    const vb = sortField.value.split('.').reduce((o, k) => o?.[k], b) ?? ''
    if (typeof va === 'number' && typeof vb === 'number')
      return sortDir.value === 'asc' ? va - vb : vb - va
    return sortDir.value === 'asc'
      ? String(va).localeCompare(String(vb), 'pt-BR')
      : String(vb).localeCompare(String(va), 'pt-BR')
  })
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const fmt        = (v) => (v||0).toLocaleString('pt-BR', { minimumFractionDigits:2 })
const fmtNum     = (v) => (v||0).toLocaleString('pt-BR')
const fmtDate    = (d) => d ? new Date(d).toLocaleDateString('pt-BR', { day:'2-digit', month:'2-digit', year:'2-digit', hour:'2-digit', minute:'2-digit' }) : '—'
const mascararEmail = (email) => {
  if (!email) return ''
  const [u, d] = email.split('@')
  return !d ? email : u.slice(0, 2) + '***@' + d
}
const statusLabel = (s) => ({ pendente:'Pendente', confirmado:'Confirmado', preparando:'Em Preparo', aprovado:'Aprovado', enviado:'Enviado', transito:'A Caminho', entregue:'Entregue', cancelado:'Cancelado' })[s] || s || '—'
const statusClass = (s) => { if(s==='entregue') return 'entregue'; if(['enviado','transito','aprovado'].includes(s)) return 'enviado'; if(s==='cancelado') return 'cancelado'; return 'pendente' }
const sparkLine = (data) => {
  if (!data?.length) return ''
  const w=110, h=36, max=Math.max(...data)||1, min=Math.min(...data), r=max-min||1
  return data.map((v,i)=>`${(i/(data.length-1))*w},${h-((v-min)/r)*(h-8)-4}`).join(' ')
}
const sparkArea = (data) => `0,36 ${sparkLine(data)} 110,36`

// ─── LOG / NOTIF ──────────────────────────────────────────────────────────────
const registrarLog = (msg) => {
  logAtividade.value.unshift({ id:Date.now(), msg, criadoEm:new Date().toISOString() })
  if (logAtividade.value.length > 50) logAtividade.value = logAtividade.value.slice(0, 50)
}
const adicionarNotif = (msg, acao='') => {
  notificacoes.value.unshift({ id:Date.now(), msg, acao, lida:false, criadoEm:new Date().toISOString() })
  if (notificacoes.value.length > 20) notificacoes.value = notificacoes.value.slice(0, 20)
}
const marcarTodasLidas = () => notificacoes.value.forEach(n => (n.lida = true))
const lerNotif = (n) => { n.lida=true; if(n.acao==='pedidos'){navegar('pedidos');notifOpen.value=false} }

// ─── ALERTAS ─────────────────────────────────────────────────────────────────
const gerarAlertas = () => {
  alertas.value = []
  const pendentes = todosPedidos.value.filter(p=>p.status==='pendente')
  if (pendentes.length) alertas.value.push({ id:'pend', tipo:'warn', msg:`${pendentes.length} pedido(s) pendente(s) aguardando aprovação` })
  const baixo = todosProdutos.value.filter(p=>p.estoque>0&&p.estoque<=5)
  if (baixo.length) alertas.value.push({ id:'est', tipo:'warn', msg:`${baixo.length} produto(s) com estoque crítico (≤ 5 un.)` })
}

// ─── EXPORTS ─────────────────────────────────────────────────────────────────
const downloadCSV = (rows, filename) => {
  const csv  = rows.map(r=>r.map(c=>`"${String(c).replace(/"/g,'""')}"`).join(',')).join('\n')
  const blob = new Blob(['\uFEFF'+csv],{type:'text/csv;charset=utf-8;'})
  const a    = document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=filename; a.click(); URL.revokeObjectURL(a.href)
}
const exportarReceitaCSV = () => downloadCSV([['Mês','Receita (R$)'],...revenueData.value.map((v,i)=>[MESES_FULL[i],fmt(v)])],`receita_${anoAtual}.csv`)
const exportarPedidosCSV = () => {
  const cols = ['ID','Cliente','Email','Total','Status','Pagamento','Data']
  const rows = pedidosFiltrados.value.map(p=>[ `#${(p._id||'').slice(-8).toUpperCase()}`,p.cliente?.nome||'',p.cliente?.email||'',fmt(p.total),statusLabel(p.status),(p.pagamento?.metodo||'').toUpperCase(),fmtDate(p.criadoEm)])
  downloadCSV([cols,...rows],`pedidos_${Date.now()}.csv`)
}

// ═══════════════════ DASHBOARD ═══════════════════
const pedidosRecentes = ref([])
const revenueData = computed(() => {
  const arr=Array(12).fill(0)
  todosPedidos.value.filter(p=>p.status!=='cancelado'&&new Date(p.criadoEm).getFullYear()===anoAtual)
    .forEach(p=>{arr[new Date(p.criadoEm).getMonth()]+=p.total||0})
  return arr
})
const receitaTotalAno = computed(()=>revenueData.value.reduce((a,b)=>a+b,0))
const crescimentoPct  = computed(()=>{
  const m=new Date().getMonth(); if(!m) return 0
  const cur=revenueData.value[m], prev=revenueData.value[m-1]; if(!prev) return 0
  return +((( cur-prev)/prev)*100).toFixed(1)
})
const catTotaisCalc = computed(()=>{
  const total=todosProdutos.value.length||1
  return CAT_LABELS.map(cat=>Math.round((todosProdutos.value.filter(p=>p.categoria===cat.toUpperCase()).length/total)*100))
})
const donutSegs = computed(()=>{
  const circ=2*Math.PI*42; let angle=0
  return catTotaisCalc.value.map((pct,i)=>{
    const dash=(pct/100)*circ; const offset=circ-(angle/360)*circ
    angle+=(pct/100)*360; return{dash,circ,offset,color:CAT_CORES[i]}
  })
})
const radiais = computed(()=>[
  {kanji:'満',label:'Satisfação',value:Math.min(99,60+Math.round((todosPedidos.value.filter(p=>p.status==='entregue').length/(todosPedidos.value.length||1))*40))},
  {kanji:'転',label:'Conversão',value:+taxaConversao.value||0},
  {kanji:'留',label:'Retenção',value:Math.min(99,72)},
])
const statsReais = computed(()=>[
  {kanji:'売',label:'Receita Total',num:`R$ ${fmtNum(receitaTotal.value)}`,sub:`${crescimentoPct.value>=0?'+':''}${crescimentoPct.value}% vs mês ant.`,spark:revenueData.value.map(v=>Math.round(v/1000))},
  {kanji:'令',label:'Pedidos',num:String(todosPedidos.value.length),sub:`${todosPedidos.value.filter(p=>p.status==='pendente').length} pendentes`,spark:[30,28,35,40,38,52,48,60,55,68,72,65]},
  {kanji:'民',label:'Usuários',num:String(todosUsuarios.value.length),sub:`+${usuariosEsteMes.value} este mês`,spark:[80,82,79,84,88,85,90,89,93,91,95,98]},
  {kanji:'品',label:'Produtos',num:String(todosProdutos.value.length),sub:`${todosProdutos.value.filter(p=>!p.estoque||p.estoque<=0).length} esgotados`,spark:[90,92,91,94,92,95,93,96,94,97,96,94]},
])
const topProdutos = computed(()=>{
  const cnt={}
  todosPedidos.value.filter(p=>p.status!=='cancelado').forEach(ped=>{
    ;(ped.itens||[]).forEach(item=>{const id=item.produto?._id||item._id||item.produtoId; if(id) cnt[id]=(cnt[id]||0)+(item.qty||1)})
  })
  return todosProdutos.value.map(p=>({...p,qtdVendida:cnt[p._id]||0})).sort((a,b)=>b.qtdVendida-a.qtdVendida).slice(0,5)
})

// ═══════════════════ PEDIDOS ═══════════════════
const todosPedidos        = ref([])
const loadingPedidos      = ref(false)
const buscaPedidos        = ref('')
const filtroPedStatus     = ref('')
const filtroPedDe         = ref('')
const filtroPedAte        = ref('')
const pagPedidos          = ref(1)
const detalheP            = ref(null)
const pedidosSelecionados = ref([])
const bulkStatus          = ref('')
const modalRecusa         = ref(null)
const modalRecusaAprovando = ref(true)
const motivoRecusa        = ref('')
const processandoCancel   = ref(false)

let _bPedTimer = null
watch(buscaPedidos, ()=>{ clearTimeout(_bPedTimer); _bPedTimer=setTimeout(()=>{pagPedidos.value=1},350) })
watch([filtroPedStatus,filtroPedDe,filtroPedAte],()=>{pagPedidos.value=1})

const pedidosFiltrados = computed(()=>{
  let l=sortarLista([...todosPedidos.value])
  if(filtroPedStatus.value) l=l.filter(p=>p.status===filtroPedStatus.value)
  if(buscaPedidos.value.trim()){const q=buscaPedidos.value.toLowerCase();l=l.filter(p=>(p._id||'').toLowerCase().includes(q)||p.cliente?.nome?.toLowerCase().includes(q)||p.cliente?.email?.toLowerCase().includes(q))}
  if(filtroPedDe.value) l=l.filter(p=>new Date(p.criadoEm)>=new Date(filtroPedDe.value))
  if(filtroPedAte.value){const ate=new Date(filtroPedAte.value);ate.setHours(23,59,59,999);l=l.filter(p=>new Date(p.criadoEm)<=ate)}
  return l
})
const totalPagPedidos  = computed(()=>Math.max(1,Math.ceil(pedidosFiltrados.value.length/POR_PAGINA)))
const pedidosPaginados = computed(()=>{const s=(pagPedidos.value-1)*POR_PAGINA;return pedidosFiltrados.value.slice(s,s+POR_PAGINA)})
const todosChecked     = computed(()=>pedidosPaginados.value.length>0&&pedidosPaginados.value.every(p=>pedidosSelecionados.value.includes(p._id)))

const miniStatsPedidos = computed(()=>[
  {num:todosPedidos.value.length,label:'Total',pct:100},
  {num:todosPedidos.value.filter(p=>p.status==='pendente').length,label:'Pendentes',pct:Math.round((todosPedidos.value.filter(p=>p.status==='pendente').length/Math.max(todosPedidos.value.length,1))*100)},
  {num:todosPedidos.value.filter(p=>p.status==='enviado').length,label:'Enviados',pct:Math.round((todosPedidos.value.filter(p=>p.status==='enviado').length/Math.max(todosPedidos.value.length,1))*100)},
  {num:todosPedidos.value.filter(p=>p.status==='entregue').length,label:'Entregues',pct:Math.round((todosPedidos.value.filter(p=>p.status==='entregue').length/Math.max(todosPedidos.value.length,1))*100)},
])

const limparFiltrosPedidos=()=>{buscaPedidos.value='';filtroPedStatus.value='';filtroPedDe.value='';filtroPedAte.value='';pagPedidos.value=1}
const toggleSelecionarPedido=(id)=>{const i=pedidosSelecionados.value.indexOf(id);i===-1?pedidosSelecionados.value.push(id):pedidosSelecionados.value.splice(i,1)}
const toggleTodos=()=>{
  if(todosChecked.value) pedidosSelecionados.value=pedidosSelecionados.value.filter(id=>!pedidosPaginados.value.find(p=>p._id===id))
  else pedidosPaginados.value.forEach(p=>{if(!pedidosSelecionados.value.includes(p._id)) pedidosSelecionados.value.push(p._id)})
}

const carregarPedidos = async()=>{
  loadingPedidos.value=true
  try{const{data}=await api.get('/pedidos?limit=500');todosPedidos.value=data.pedidos||data||[];pedidosRecentes.value=(data.pedidos||data||[]).slice(0,6);gerarAlertas()}
  catch{todosPedidos.value=[]}
  finally{loadingPedidos.value=false}
}

const atualizarStatusPedido = async(pedido, novoStatus)=>{
  try{
    await api.patch(`/pedidos/${pedido._id}/status`,{status:novoStatus})
    pedido.status=novoStatus
    mostrarToast(`Status → ${statusLabel(novoStatus)}`,'','sucesso')
    registrarLog(`Pedido #${pedido._id.slice(-6).toUpperCase()} → ${statusLabel(novoStatus)}`)
  }catch(e){mostrarToast(e.response?.data?.msg||'Erro ao atualizar.','','erro')}
}

const aplicarBulkStatus=async()=>{
  if(!bulkStatus.value||!pedidosSelecionados.value.length) return
  await Promise.all(pedidosSelecionados.value.map(id=>{const p=todosPedidos.value.find(x=>x._id===id);return p?atualizarStatusPedido(p,bulkStatus.value):null}))
  pedidosSelecionados.value=[];bulkStatus.value=''
  mostrarToast('Status em massa atualizado!','','sucesso')
}

const abrirModalRecusa=(pedido,aprovando)=>{modalRecusa.value=pedido;modalRecusaAprovando.value=aprovando;motivoRecusa.value=''}
const confirmarProcessarCancelamento=async()=>{
  processandoCancel.value=true
  try{
    await api.patch(`/pedidos/${modalRecusa.value._id}/processar-cancelamento`,{aprovado:modalRecusaAprovando.value,observacao:motivoRecusa.value||null})
    await carregarPedidos()
    mostrarToast(modalRecusaAprovando.value?'Cancelamento aprovado':'Cancelamento recusado','','sucesso')
    modalRecusa.value=null
  }catch(e){mostrarToast(e.response?.data?.msg||'Erro.','','erro')}
  finally{processandoCancel.value=false}
}

// ═══════════════════ PRODUTOS ═══════════════════
const todosProdutos        = computed(()=>produtosStore.todos||[])
const loadingProdutos      = ref(false)
const buscaProdutos        = ref('')
const filtroCat            = ref('')
const filtroEstoque        = ref('')
const pagProdutos          = ref(1)
const modalProduto         = ref(false)
const editandoProduto      = ref(false)
const deletandoProduto     = ref(null)
const deletandoProdLoad    = ref(false)
const salvandoProd         = ref(false)
const erroFormProd         = ref('')
const seedando             = ref(false)
const produtosSelecionados = ref([])
const isGamerModal         = ref(false)

let _bProdTimer=null
watch(buscaProdutos,()=>{clearTimeout(_bProdTimer);_bProdTimer=setTimeout(()=>{pagProdutos.value=1},350)})
watch([filtroCat,filtroEstoque],()=>{pagProdutos.value=1})

const formProdPadrao=()=>({nome:'',marca:'',categoria:'COMPUTING',subCategoria:'',preco:0,estoque:10,parcelas:12,sku:'',descricao:'',imagem:'',imagem2:'',imagem3:'',destaque:false,novo:false,limitada:false,rgb:false,cores:[],storageOptions:[],specs:[]})
const formProd=ref(formProdPadrao())

const produtosFiltrados=computed(()=>{
  let l=sortarLista([...todosProdutos.value])
  if(buscaProdutos.value.trim()){const q=buscaProdutos.value.toLowerCase();l=l.filter(p=>p.nome?.toLowerCase().includes(q)||p.marca?.toLowerCase().includes(q))}
  if(filtroCat.value) l=l.filter(p=>p.categoria===filtroCat.value)
  if(filtroEstoque.value==='ok')   l=l.filter(p=>p.estoque>5)
  if(filtroEstoque.value==='zero') l=l.filter(p=>!p.estoque||p.estoque<=0)
  if(filtroEstoque.value==='baixo') l=l.filter(p=>p.estoque>0&&p.estoque<=5)
  return l
})
const totalPagProdutos  = computed(()=>Math.max(1,Math.ceil(produtosFiltrados.value.length/POR_PAGINA)))
const produtosPaginados = computed(()=>{const s=(pagProdutos.value-1)*POR_PAGINA;return produtosFiltrados.value.slice(s,s+POR_PAGINA)})
const todosProdChecked  = computed(()=>produtosPaginados.value.length>0&&produtosPaginados.value.every(p=>produtosSelecionados.value.includes(p._id)))

const miniStatsProdutos=computed(()=>[
  {num:todosProdutos.value.length,label:'Total',pct:100},
  {num:todosProdutos.value.filter(p=>p.destaque).length,label:'Destaques',pct:80},
  {num:todosProdutos.value.filter(p=>p.estoque>0&&p.estoque<=5).length,label:'Crítico',pct:40},
  {num:todosProdutos.value.filter(p=>!p.estoque||p.estoque<=0).length,label:'Esgotados',pct:20},
])

const toggleSelecionarProduto=(id)=>{const i=produtosSelecionados.value.indexOf(id);i===-1?produtosSelecionados.value.push(id):produtosSelecionados.value.splice(i,1)}
const toggleTodosProd=()=>{
  if(todosProdChecked.value) produtosSelecionados.value=produtosSelecionados.value.filter(id=>!produtosPaginados.value.find(p=>p._id===id))
  else produtosPaginados.value.forEach(p=>{if(!produtosSelecionados.value.includes(p._id)) produtosSelecionados.value.push(p._id)})
}

const carregarProdutos=async()=>{loadingProdutos.value=true;try{await produtosStore.recarregar()}catch{}finally{loadingProdutos.value=false}}
const executarSeed=async()=>{seedando.value=true;try{const{data}=await api.post('/produtos/seed');mostrarToast(data.msg||'Seed executado!','','sucesso');await carregarProdutos()}catch(e){mostrarToast(e.response?.data?.msg||'Erro no seed.','','erro')}finally{seedando.value=false}}

const abrirNovoProduto=()=>{isGamerModal.value=false;editandoProduto.value=false;formProd.value=formProdPadrao();prodFormTab.value='basico';erroFormProd.value='';modalProduto.value=true}
const abrirNovoProdutoGamer=()=>{isGamerModal.value=true;editandoProduto.value=false;formProd.value={...formProdPadrao(),categoria:'GAMING',subCategoria:'Mouse'};prodFormTab.value='basico';erroFormProd.value='';modalProduto.value=true}
const abrirEditarProduto=(p,origem='')=>{
  isGamerModal.value=origem==='gamer'||p.categoria==='GAMING';editandoProduto.value=true
  formProd.value={...formProdPadrao(),...p,preco:Number(p.preco)||0,estoque:Number(p.estoque)||0,parcelas:Number(p.parcelas)||12,destaque:Boolean(p.destaque),novo:Boolean(p.novo),limitada:Boolean(p.limitada),cores:p.cores||[],storageOptions:p.storageOptions||[],specs:p.specs||[]}
  prodFormTab.value='basico';erroFormProd.value='';modalProduto.value=true
}

const salvarProduto=async()=>{
  erroFormProd.value=''
  if(!formProd.value.nome?.trim()){erroFormProd.value='Nome obrigatório.';return}
  if(!formProd.value.marca?.trim()){erroFormProd.value='Marca obrigatória.';return}
  if(!formProd.value.preco||formProd.value.preco<=0){erroFormProd.value='Preço inválido.';return}
  salvandoProd.value=true
  try{
    if(editandoProduto.value){const{data}=await api.patch(`/produtos/${formProd.value._id}`,formProd.value);produtosStore.atualizarProduto?.(data.produto||data);mostrarToast('Produto atualizado!','','sucesso');registrarLog(`Produto "${formProd.value.nome}" atualizado`)}
    else{const{data}=await api.post('/produtos',formProd.value);produtosStore.adicionarProduto?.(data.produto||data);mostrarToast('Produto criado!','','sucesso');registrarLog(`Produto "${formProd.value.nome}" criado`)}
    await carregarProdutos();modalProduto.value=false
  }catch(e){erroFormProd.value=e.response?.data?.msg||'Erro ao salvar.'}
  finally{salvandoProd.value=false}
}
const deletarProduto=async()=>{
  deletandoProdLoad.value=true
  try{await api.delete(`/produtos/${deletandoProduto.value._id}`);produtosStore.removerProduto?.(deletandoProduto.value._id);await carregarProdutos();mostrarToast('Produto removido.','','sucesso');registrarLog(`Produto "${deletandoProduto.value.nome}" removido`);deletandoProduto.value=null}
  catch(e){mostrarToast(e.response?.data?.msg||'Erro ao deletar.','','erro')}
  finally{deletandoProdLoad.value=false}
}
const duplicarProduto=async(p)=>{
  const copia={...p,nome:`${p.nome} (Cópia)`,destaque:false};delete copia._id
  try{const{data}=await api.post('/produtos',copia);produtosStore.adicionarProduto?.(data.produto||data);await carregarProdutos();mostrarToast('Produto duplicado!','','sucesso')}
  catch(e){mostrarToast(e.response?.data?.msg||'Erro ao duplicar.','','erro')}
}
const deletarProdutosEmMassa=async()=>{
  if(!produtosSelecionados.value.length||!confirm(`Excluir ${produtosSelecionados.value.length} produto(s)?`)) return
  await Promise.all(produtosSelecionados.value.map(id=>api.delete(`/produtos/${id}`).catch(()=>{})))
  await carregarProdutos();mostrarToast(`${produtosSelecionados.value.length} produto(s) removido(s).','','sucesso`);produtosSelecionados.value=[]
}

// ═══════════════════ GAMER ═══════════════════
const buscaGamer         = ref('')
const filtroGamerCat     = ref('')
const pagGamer           = ref(1)
const salvandoGamer      = ref(false)
const gamerConfigPadrao  = ()=>({heroKanji:'戦場',heroTitulo:'Gaming',heroSub:'Noir & Or Edição',heroDesc:'Desempenho extremo.',bannerTexto:'Kit exclusivo.',bannerTitulo:'Kit Gamer',bannerCta:'Ver kit',showBanner:true,showParticles:true,showBloodDrips:false})
const gamerConfig        = ref(gamerConfigPadrao())

const produtosGamerFiltrados=computed(()=>{
  let l=sortarLista(todosProdutos.value.filter(p=>p.categoria==='GAMING'))
  if(buscaGamer.value.trim()){const q=buscaGamer.value.toLowerCase();l=l.filter(p=>p.nome?.toLowerCase().includes(q)||p.marca?.toLowerCase().includes(q))}
  if(filtroGamerCat.value) l=l.filter(p=>(p.subCategoria||p.categoria)===filtroGamerCat.value)
  return l
})
const totalPagGamer         =computed(()=>Math.max(1,Math.ceil(produtosGamerFiltrados.value.length/POR_PAGINA)))
const produtosGamerPaginados=computed(()=>{const s=(pagGamer.value-1)*POR_PAGINA;return produtosGamerFiltrados.value.slice(s,s+POR_PAGINA)})
const miniStatsGamer=computed(()=>[
  {num:produtosGamerFiltrados.value.length,label:'Produtos Gamer',pct:100},
  {num:produtosGamerFiltrados.value.filter(p=>p.destaque).length,label:'Destaques',pct:70},
  {num:produtosGamerFiltrados.value.filter(p=>p.estoque>0&&p.estoque<=5).length,label:'Crítico',pct:30},
  {num:produtosGamerFiltrados.value.filter(p=>!p.estoque||p.estoque<=0).length,label:'Esgotados',pct:10},
])
watch([buscaGamer,filtroGamerCat],()=>{pagGamer.value=1})
const salvarGamerConfig=async()=>{salvandoGamer.value=true;try{await api.post('/config/gamer',gamerConfig.value);mostrarToast('Config Gamer salva!','','sucesso')}catch(e){mostrarToast(e.response?.data?.msg||'Erro.','','erro')}finally{salvandoGamer.value=false}}
const resetGamerConfig=()=>{gamerConfig.value=gamerConfigPadrao();mostrarToast('Config resetada.','','info')}

// ═══════════════════ USUÁRIOS ═══════════════════
const todosUsuarios    = ref([])
const loadingUsuarios  = ref(false)
const buscaUsuarios    = ref('')
const filtroRole       = ref('')
const pagUsuarios      = ref(1)
const deletandoUsuario = ref(null)
const deletandoUsrLoad = ref(false)

let _bUsrTimer=null
watch(buscaUsuarios,()=>{clearTimeout(_bUsrTimer);_bUsrTimer=setTimeout(()=>{pagUsuarios.value=1},350)})
watch(filtroRole,()=>{pagUsuarios.value=1})

const usuariosFiltrados=computed(()=>{
  let l=sortarLista([...todosUsuarios.value])
  if(filtroRole.value) l=l.filter(u=>u.role===filtroRole.value)
  if(buscaUsuarios.value.trim()){const q=buscaUsuarios.value.toLowerCase();l=l.filter(u=>u.nome?.toLowerCase().includes(q)||u.email?.toLowerCase().includes(q))}
  return l
})
const totalPagUsuarios  =computed(()=>Math.max(1,Math.ceil(usuariosFiltrados.value.length/POR_PAGINA)))
const usuariosPaginados =computed(()=>{const s=(pagUsuarios.value-1)*POR_PAGINA;return usuariosFiltrados.value.slice(s,s+POR_PAGINA)})
const usuariosEsteMes   =computed(()=>{const start=new Date();start.setDate(1);start.setHours(0,0,0,0);return todosUsuarios.value.filter(u=>new Date(u.criadoEm)>=start).length})

const miniStatsUsuarios=computed(()=>[
  {num:todosUsuarios.value.length,label:'Total Usuários',pct:100},
  {num:todosUsuarios.value.filter(u=>u.role==='admin').length,label:'Admins',pct:20},
  {num:usuariosEsteMes.value,label:'Novos este mês',pct:50},
  {num:todosUsuarios.value.filter(u=>u.twoFA).length,label:'2FA Ativo',pct:60},
])

const carregarUsuarios=async()=>{loadingUsuarios.value=true;try{const{data}=await api.get('/usuarios?limit=500');todosUsuarios.value=data.users||data||[]}catch{todosUsuarios.value=[]}finally{loadingUsuarios.value=false}}
const toggleAdmin=async(u)=>{const role=u.role==='admin'?'user':'admin';try{await api.patch(`/usuarios/${u._id}/role`,{role});u.role=role;mostrarToast(`Usuário ${role==='admin'?'promovido a ADMIN':'rebaixado para USER'}','','sucesso`);registrarLog(`${u.nome} → ${role}`)}catch(e){mostrarToast(e.response?.data?.msg||'Erro.','','erro')}}
const deletarUsuario=async()=>{
  deletandoUsrLoad.value=true
  try{await api.delete(`/usuarios/${deletandoUsuario.value._id}`);todosUsuarios.value=todosUsuarios.value.filter(u=>u._id!==deletandoUsuario.value._id);mostrarToast('Usuário removido.','','sucesso');registrarLog(`Usuário "${deletandoUsuario.value.nome}" removido`);deletandoUsuario.value=null}
  catch(e){mostrarToast(e.response?.data?.msg||'Erro.','','erro')}
  finally{deletandoUsrLoad.value=false}
}

// ═══════════════════ ANALYTICS ═══════════════════
const receitaTotal  =computed(()=>todosPedidos.value.filter(p=>p.status!=='cancelado').reduce((a,p)=>a+(p.total||0),0))
const ticketMedio   =computed(()=>{const e=todosPedidos.value.filter(p=>p.status==='entregue');return e.length?'R$ '+fmt(e.reduce((a,p)=>a+(p.total||0),0)/e.length):'R$ 0,00'})
const taxaConversao =computed(()=>{const t=todosPedidos.value.length;return t?((todosPedidos.value.filter(p=>['enviado','entregue'].includes(p.status)).length/t)*100).toFixed(1):'0.0'})
const miniStatsAnalytics=computed(()=>[
  {num:'R$ '+fmtNum(receitaTotal.value),label:'Receita Total',pct:100},
  {num:ticketMedio.value,label:'Ticket Médio',pct:65},
  {num:taxaConversao.value+'%',label:'Taxa Conversão',pct:+taxaConversao.value},
  {num:todosPedidos.value.filter(p=>p.status==='cancelado').length,label:'Cancelamentos',pct:20},
])
const statusAnalytics=computed(()=>{
  const total=todosPedidos.value.length||1
  return [
    {label:'Entregues',count:todosPedidos.value.filter(p=>p.status==='entregue').length},
    {label:'Enviados',count:todosPedidos.value.filter(p=>p.status==='enviado').length},
    {label:'Aprovados',count:todosPedidos.value.filter(p=>p.status==='aprovado').length},
    {label:'Pendentes',count:todosPedidos.value.filter(p=>p.status==='pendente').length},
    {label:'Cancelados',count:todosPedidos.value.filter(p=>p.status==='cancelado').length},
  ].map(s=>({...s,pct:Math.round((s.count/total)*100)}))
})

// ═══════════════════ CUPONS ═══════════════════
const cupons        = ref([])
const buscaCupons   = ref('')
const modalCupom    = ref(false)
const editandoCupom = ref(false)
const salvandoCupom = ref(false)
const erroFormCupom = ref('')
const formCupomPadrao=()=>({codigo:'',tipo:'pct',valor:10,minPedido:0,limiteTotal:0,validoDe:'',validoAte:'',ativo:true})
const formCupom=ref(formCupomPadrao())

const carregarCupons=async()=>{try{const{data}=await api.get('/cupons');cupons.value=data.cupons||data||[]}catch{cupons.value=[]}}
const abrirNovoCupom=()=>{editandoCupom.value=false;formCupom.value=formCupomPadrao();erroFormCupom.value='';modalCupom.value=true}
const editarCupom=(c)=>{editandoCupom.value=true;formCupom.value={...formCupomPadrao(),...c,validoDe:c.validoDe?c.validoDe.slice(0,10):'',validoAte:c.validoAte?c.validoAte.slice(0,10):''};erroFormCupom.value='';modalCupom.value=true}
const salvarCupom=async()=>{
  erroFormCupom.value=''
  const cod=formCupom.value.codigo?.trim().toUpperCase();if(!cod){erroFormCupom.value='Código obrigatório.';return}
  formCupom.value.codigo=cod;salvandoCupom.value=true
  try{
    if(editandoCupom.value){const{data}=await api.patch(`/cupons/${formCupom.value._id}`,formCupom.value);const idx=cupons.value.findIndex(c=>c._id===formCupom.value._id);if(idx!==-1)cupons.value[idx]=data.cupom||data;mostrarToast('Cupom atualizado!','','sucesso')}
    else{const{data}=await api.post('/cupons',formCupom.value);cupons.value.unshift(data.cupom||data);mostrarToast('Cupom criado!','','sucesso')}
    modalCupom.value=false
  }catch(e){erroFormCupom.value=e.response?.data?.msg||'Erro ao salvar cupom.'}
  finally{salvandoCupom.value=false}
}
const deletarCupom=async(c)=>{
  if(!confirm(`Excluir cupom "${c.codigo}"?`)) return
  try{await api.delete(`/cupons/${c._id||c.id}`);cupons.value=cupons.value.filter(x=>(x._id||x.id)!==(c._id||c.id));mostrarToast('Cupom removido.','','sucesso')}
  catch(e){mostrarToast(e.response?.data?.msg||'Erro ao deletar.','','erro')}
}

// ═══════════════════ SITE ═══════════════════
const siteLocal=ref({nome:'',slogan:'',descricao:'',emailContato:'',whatsapp:'',corPrimaria:'#C8A84B',temaDefault:'escuro',seg:{maxTentativas:5,bloqueioBase:30,prazoCancelamento:24,googleClientId:''},politicas:{termos:'',privacidade:'',pedidoPrefixo:'NOR-'}})
const salvandoSite=ref(false)
const salvarSite=async()=>{salvandoSite.value=true;try{await siteStore.saveConfig(siteLocal.value);mostrarToast('Configurações salvas!','','sucesso');registrarLog('Config do site atualizada')}catch(e){mostrarToast(e.response?.data?.msg||'Erro ao salvar.','','erro')}finally{salvandoSite.value=false}}

// ═══════════════════ KEYBOARD ═══════════════════
const handleKeydown=(e)=>{
  if(e.key!=='Escape') return
  if(detalheP.value){detalheP.value=null;return}
  if(modalRecusa.value){modalRecusa.value=null;return}
  if(modalProduto.value){modalProduto.value=false;return}
  if(modalCupom.value){modalCupom.value=false;return}
  if(deletandoProduto.value){deletandoProduto.value=null;return}
  if(deletandoUsuario.value){deletandoUsuario.value=null;return}
  if(sidebarOpen.value){sidebarOpen.value=false;return}
  if(notifOpen.value){notifOpen.value=false}
}

// ═══════════════════ LIFECYCLE ═══════════════════
onMounted(async()=>{
  if(!auth.isAdmin) return
  const updateClock=()=>{ horaAtual.value=new Date().toLocaleTimeString('pt-BR',{timeZone:'America/Sao_Paulo',hour:'2-digit',minute:'2-digit',second:'2-digit'}) }
  updateClock(); clockTimer=setInterval(updateClock,1000)

  const cfg=siteStore.config; if(cfg) Object.assign(siteLocal.value,cfg)

  loadingDash.value=true
  await Promise.all([carregarPedidos(),carregarProdutos(),carregarUsuarios()])
  carregarCupons()
  loadingDash.value=false

  pollingTimer=setInterval(async()=>{
    const antes=todosPedidos.value.length
    await carregarPedidos()
    if(todosPedidos.value.length>antes) adicionarNotif(`${todosPedidos.value.length-antes} novo(s) pedido(s)!`,'pedidos')
  },30000)

  window.addEventListener('keydown',handleKeydown)
})

onUnmounted(()=>{
  clearInterval(clockTimer); clearInterval(pollingTimer); clearTimeout(_toastTimer)
  clearTimeout(_bPedTimer); clearTimeout(_bProdTimer); clearTimeout(_bUsrTimer)
  window.removeEventListener('keydown',handleKeydown)
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Syne:wght@300;400;600;700&family=DM+Mono:wght@300;400&display=swap');

/* ═══ TOKENS (idênticos ao cfg) ═══ */
.adm {
  --or:    var(--cor-primaria,   #C8A84B);
  --or2:   var(--cor-secundaria, #F5D78E);
  --void:  var(--or-void,  #06060d);
  --deep:  var(--or-deep,  #09090f);
  --panel: rgba(9,9,15,0.96);
  --hair:  var(--or-hair,  rgba(200,168,75,0.11));
  --hairH: rgba(200,168,75,0.38);
  --text:  var(--or-silk,  rgba(237,232,224,0.92));
  --text2: var(--or-silk-2,rgba(237,232,224,0.55));
  --text3: var(--or-silk-3,rgba(237,232,224,0.28));
  --text4: var(--or-silk-4,rgba(237,232,224,0.10));
  --green: #2ecc71;
  --red:   #e74c3c;
  --orange:#f39c12;
  --blue:  #3498db;
  --ease:  cubic-bezier(0.16,1,0.30,1);

  display:             grid;
  grid-template-columns:240px 1fr;
  min-height:          100vh;
  padding-top:         var(--navbar-h, 56px);
  background:          var(--void);
  font-family:         'Syne', sans-serif;
  color:               var(--text);
  position:            relative;
  overflow-x:          hidden;
}

/* ═══ GUARD ═══ */
.adm-guard { grid-column:1/-1; display:flex; align-items:center; justify-content:center; min-height:100vh; }
.adm-guard__inner { display:flex; flex-direction:column; align-items:center; gap:14px; text-align:center; padding:60px 48px; border:0.5px solid var(--hair); background:var(--panel); max-width:420px; position:relative; }
.adm-guard__inner::before { content:''; position:absolute; top:0; left:0; right:0; height:0.5px; background:linear-gradient(90deg,transparent,var(--or),transparent); opacity:.45; }
.adm-guard__kanji  { font-family:'Cormorant Garamond',serif; font-size:4.5rem; font-style:italic; color:var(--red); opacity:.1; line-height:1; margin-bottom:-10px; }
.adm-guard__titulo { font-family:'Cormorant Garamond',serif; font-size:1.8rem; font-weight:300; color:var(--text); margin:0; }
.adm-guard__sub    { font-family:'DM Mono',monospace; font-size:8px; letter-spacing:.35em; color:var(--text3); text-transform:uppercase; }
.adm-guard__btn    { margin-top:8px; padding:11px 28px; border:0.5px solid var(--or); color:var(--or); text-decoration:none; font-size:8px; font-weight:700; letter-spacing:.45em; text-transform:uppercase; transition:all .35s var(--ease); position:relative; overflow:hidden; display:inline-flex; align-items:center; }
.adm-guard__btn::before { content:''; position:absolute; inset:0; background:var(--or); transform:scaleX(0); transform-origin:left; transition:transform .4s var(--ease); z-index:0; }
.adm-guard__btn:hover::before { transform:scaleX(1); }
.adm-guard__btn:hover { color:var(--void); }
.adm-guard__btn span { position:relative; z-index:1; }

/* ═══ FUNDO (idêntico ao cfg) ═══ */
.adm-bg { position:fixed; inset:0; z-index:0; pointer-events:none; overflow:hidden; }
.adm-bg__realm-line { position:absolute; top:0; left:0; right:0; height:0.5px; background:linear-gradient(90deg,transparent 0%,transparent 6%,var(--or2,rgba(212,175,55,.6)) 20%,var(--or,#C8A84B) 50%,var(--or2,rgba(212,175,55,.6)) 80%,transparent 94%,transparent 100%); opacity:.65; }
.adm-bg__kanji { position:absolute; font-family:'Noto Serif JP','Cormorant Garamond',serif; font-weight:200; color:var(--or); pointer-events:none; user-select:none; line-height:1; }
.adm-bg__kanji--1 { font-size:clamp(200px,28vw,380px); bottom:-80px; right:-40px; opacity:.022; animation:kDrift1 20s ease-in-out infinite; }
.adm-bg__kanji--2 { font-size:clamp(120px,16vw,220px); top:40px; left:-30px; opacity:.018; animation:kDrift2 26s ease-in-out infinite; }
.adm-bg__kanji--3 { font-size:clamp(60px,8vw,100px); top:45%; left:50%; transform:translateX(-50%); opacity:.014; animation:kDrift3 32s ease-in-out infinite; }
.adm-bg__kanji--4 { font-size:clamp(80px,10vw,140px); bottom:30%; right:20%; opacity:.012; animation:kDrift1 28s ease-in-out infinite reverse; }
@keyframes kDrift1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-18px,24px)} }
@keyframes kDrift2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(22px,-18px)} }
@keyframes kDrift3 { 0%,100%{transform:translateX(-50%) scale(1)} 50%{transform:translateX(-50%) scale(1.08)} }
.adm-bg__washi { position:absolute; inset:0; background:repeating-linear-gradient(90deg,rgba(255,255,255,.008) 0,rgba(255,255,255,.008) 1px,transparent 1px,transparent 54px),repeating-linear-gradient(0deg,rgba(255,255,255,.006) 0,rgba(255,255,255,.006) 1px,transparent 1px,transparent 42px); }
.adm-bg__grain { position:absolute; inset:0; background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.022'/%3E%3C/svg%3E"); opacity:.55; }
.adm-bg__fog { position:absolute; pointer-events:none; border-radius:50%; filter:blur(90px); }
.adm-bg__fog--1 { width:65vw; height:65vw; bottom:-22vw; left:-12vw; background:radial-gradient(circle,rgba(6,6,13,.9) 0%,transparent 70%); animation:fogD1 22s ease-in-out infinite; }
.adm-bg__fog--2 { width:44vw; height:44vw; top:-12vw; right:16vw; background:radial-gradient(circle,rgba(200,168,75,.022) 0%,transparent 70%); animation:fogD2 28s ease-in-out infinite; }
@keyframes fogD1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-28px)} }
@keyframes fogD2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(18px,18px)} }
.adm-bg__scanline { position:absolute; inset:0; background:repeating-linear-gradient(to bottom,transparent 0,transparent 3px,rgba(0,0,0,.028) 3px,rgba(0,0,0,.028) 4px); opacity:.22; }
.adm-bg__brush { position:absolute; pointer-events:none; }
.adm-bg__brush--h { top:22%; left:0; width:40%; height:1px; background:linear-gradient(to right,transparent,rgba(200,168,75,.06),transparent); }
.adm-bg__brush--v { top:0; right:30%; width:1px; height:35%; background:linear-gradient(to bottom,transparent,rgba(200,168,75,.05),transparent); }

/* ═══ ORNAMENTO ═══ */
.adm-orn { display:flex; align-items:center; gap:10px; padding:8px 16px; }
.adm-orn--sm { padding:4px 16px; }
.adm-orn__line { flex:1; height:0.5px; background:linear-gradient(to right,var(--or),transparent); opacity:.18; }
.adm-orn__line:last-child { background:linear-gradient(to left,var(--or),transparent); }
.adm-orn__gem  { font-size:5px; color:var(--or); opacity:.38; }
.adm-orn__kanji { font-family:'Cormorant Garamond',serif; font-size:13px; font-style:italic; color:var(--or); opacity:.22; line-height:1; }

/* ═══ ASIDE (DNA do cfg-aside) ═══ */
.adm-aside {
  position:sticky; top:0;
  height:100vh;
  padding-top:var(--navbar-h,56px);
  overflow-y:auto; scrollbar-width:none;
  background:linear-gradient(180deg,rgba(6,5,10,.99),rgba(5,4,9,.99));
  border-right:0.5px solid var(--hair);
  display:flex; flex-direction:column;
  z-index:10;
}
.adm-aside::-webkit-scrollbar { display:none; }
.adm-aside__kamon { position:absolute; bottom:80px; right:12px; font-family:'Noto Serif JP','Cormorant Garamond',serif; font-size:55px; font-weight:200; color:var(--or); opacity:.04; pointer-events:none; user-select:none; line-height:1; z-index:0; }
.adm-aside__topline { position:absolute; top:0; left:0; right:0; height:0.5px; background:linear-gradient(90deg,transparent,var(--or),transparent); opacity:.5; z-index:1; }

.adm-aside__brand { padding:16px 16px 10px; position:relative; z-index:1; }
.adm-aside__logo { display:inline-flex; align-items:center; gap:8px; text-decoration:none; }
.adm-aside__logo-mark { font-size:13px; color:var(--or); opacity:.8; }
.adm-aside__logo-txt { font-family:'Cormorant Garamond',serif; font-size:15px; font-style:italic; letter-spacing:.14em; color:var(--text); }
.adm-aside__logo-txt em { color:var(--or); font-style:normal; }
.adm-aside__sub { font-family:'DM Mono',monospace; font-size:7px; letter-spacing:.38em; text-transform:uppercase; color:var(--or); opacity:.35; margin-top:3px; }

/* Perfil aside (idêntico ao cfg) */
.adm-aside__perfil { display:flex; align-items:center; gap:10px; padding:10px 16px; background:rgba(200,168,75,.025); border-top:0.5px solid var(--hair); border-bottom:0.5px solid var(--hair); position:relative; z-index:1; }
.adm-aside__av-wrap { position:relative; flex-shrink:0; }
.adm-aside__av { width:36px; height:36px; background:linear-gradient(135deg,var(--or),var(--or2)); border:1.5px solid rgba(200,168,75,.35); display:flex; align-items:center; justify-content:center; font-family:'Cormorant Garamond',serif; font-size:14px; font-weight:700; color:var(--void); overflow:hidden; flex-shrink:0; }
.adm-aside__av img { width:100%; height:100%; object-fit:cover; display:block; }
.adm-aside__perfil-info { flex:1; min-width:0; }
.adm-aside__perfil-linha { display:flex; align-items:center; gap:6px; flex-wrap:nowrap; }
.adm-aside__perfil-nome { font-size:11.5px; font-weight:600; color:var(--text); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:80px; }
.adm-badge-role { display:inline-flex; align-items:center; gap:4px; font-family:'DM Mono',monospace; font-size:7px; letter-spacing:.2em; text-transform:uppercase; color:var(--or); opacity:.65; background:rgba(200,168,75,.06); border:0.5px solid var(--hair); padding:2px 7px; white-space:nowrap; flex-shrink:0; }
.adm-badge-role__gem { font-size:4px; opacity:.8; }
.adm-aside__perfil-email { font-family:'DM Mono',monospace; font-size:8px; color:var(--text3); letter-spacing:.03em; margin-top:2px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:160px; }

/* Relógio */
.adm-aside__clock { display:flex; align-items:center; gap:6px; padding:7px 16px; background:rgba(200,168,75,.02); border-bottom:0.5px solid var(--hair); position:relative; z-index:1; }
.adm-aside__clock svg { color:var(--or); opacity:.45; flex-shrink:0; }
.adm-aside__clock-label { font-family:'DM Mono',monospace; font-size:7px; letter-spacing:.4em; text-transform:uppercase; color:var(--text3); font-weight:600; }
.adm-aside__clock-time  { font-family:'DM Mono',monospace; font-size:11px; color:var(--or); margin-left:auto; letter-spacing:.06em; }

/* Nav */
.adm-nav { flex:1; padding:4px 0; position:relative; z-index:1; }
.adm-nav__grupo-label { display:flex; align-items:center; gap:7px; font-family:'DM Mono',monospace; font-size:7px; letter-spacing:.48em; text-transform:uppercase; color:var(--or); opacity:.4; padding:7px 16px 4px; }
.adm-nav__grupo-kanji { font-family:'Cormorant Garamond',serif; font-size:11px; font-style:italic; opacity:.7; letter-spacing:0; }
.adm-nav__item { display:flex; align-items:center; gap:8px; padding:7px 16px; background:none; border:none; width:100%; text-align:left; font-family:'Syne',sans-serif; font-size:11px; color:var(--text3); cursor:pointer; transition:all .22s var(--ease); position:relative; }
.adm-nav__blade { position:absolute; left:0; top:5px; bottom:5px; width:0.5px; background:linear-gradient(to bottom,var(--or),rgba(200,168,75,.3)); opacity:0; border-radius:0 1px 1px 0; transition:opacity .3s; }
.adm-nav__num { font-family:'Cormorant Garamond',serif; font-size:12px; font-style:italic; color:var(--or); opacity:.2; width:14px; text-align:center; flex-shrink:0; line-height:1; }
.adm-nav__icon { color:inherit; opacity:.4; flex-shrink:0; }
.adm-nav__txt  { flex:1; letter-spacing:.03em; }
.adm-nav__badge { background:var(--or); color:var(--void); font-family:'DM Mono',monospace; font-size:7px; font-weight:900; min-width:15px; height:15px; border-radius:2px; display:flex; align-items:center; justify-content:center; padding:0 3px; }
.adm-nav__badge--pulse { animation:pulse 2s ease-in-out infinite; }
@keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.18)} }
.adm-nav__item:hover { color:var(--text2); background:rgba(200,168,75,.03); padding-left:20px; }
.adm-nav__item:hover .adm-nav__blade { opacity:.5; }
.adm-nav__item:hover .adm-nav__num   { opacity:.42; }
.adm-nav__item.is-active { color:var(--or); background:rgba(200,168,75,.055); }
.adm-nav__item.is-active .adm-nav__blade { opacity:1; }
.adm-nav__item.is-active .adm-nav__num   { opacity:.58; }
.adm-nav__item.is-active .adm-nav__icon  { opacity:1; }

/* Footer aside */
.adm-aside__foot { padding:12px 16px 18px; border-top:0.5px solid var(--hair); flex-shrink:0; position:relative; z-index:1; display:flex; flex-direction:column; gap:8px; }
.adm-sys { display:flex; align-items:center; gap:8px; }
.adm-sys__dot { width:6px; height:6px; border-radius:50%; background:var(--green); box-shadow:0 0 8px rgba(46,204,113,.55); flex-shrink:0; }
.adm-sys__txt { font-family:'DM Mono',monospace; font-size:8px; letter-spacing:.2em; color:var(--text3); }
.adm-aside__back { display:flex; align-items:center; gap:7px; font-family:'DM Mono',monospace; font-size:7.5px; letter-spacing:.26em; text-transform:uppercase; color:var(--text3); text-decoration:none; transition:color .22s, gap .28s; }
.adm-aside__back:hover { color:var(--or); gap:11px; }
.adm-aside__copy { font-family:'DM Mono',monospace; font-size:7px; letter-spacing:.15em; color:rgba(200,168,75,.16); }

/* ═══ OVERLAY MOBILE ═══ */
.adm-overlay { position:fixed; inset:0; background:rgba(0,0,0,.78); backdrop-filter:blur(8px); z-index:9; }
.overlay-fade-enter-active,.overlay-fade-leave-active { transition:opacity .28s; }
.overlay-fade-enter-from,.overlay-fade-leave-to { opacity:0; }

/* ═══ CONTENT + TOPBAR ═══ */
.adm-content { display:flex; flex-direction:column; min-height:calc(100vh - var(--navbar-h,56px)); position:relative; z-index:1; }

.adm-topbar { display:flex; align-items:center; gap:14px; padding:13px 28px; border-bottom:0.5px solid var(--hair); position:sticky; top:0; z-index:20; background:rgba(6,6,13,.94); backdrop-filter:blur(28px); }
.adm-topbar::before { content:''; position:absolute; top:0; left:0; right:0; height:0.5px; background:linear-gradient(90deg,transparent,var(--or) 30%,transparent 70%); opacity:.28; }
.adm-topbar__burger { display:none; flex-direction:column; gap:5px; background:none; border:none; cursor:pointer; padding:4px; flex-shrink:0; }
.adm-topbar__burger span { display:block; width:22px; height:1.5px; background:var(--text2); border-radius:1px; }
.adm-topbar__heading { flex:1; display:flex; align-items:center; gap:12px; }
.adm-topbar__kanji  { font-family:'Cormorant Garamond',serif; font-size:1.9rem; font-style:italic; color:var(--or); opacity:.14; flex-shrink:0; line-height:1; }
.adm-topbar__titulo { font-family:'Cormorant Garamond',serif; font-size:clamp(1rem,2vw,1.4rem); font-weight:300; font-style:italic; color:var(--text); margin:0; line-height:1.1; }
.adm-topbar__desc   { font-family:'DM Mono',monospace; font-size:7.5px; letter-spacing:.22em; text-transform:uppercase; color:var(--text3); margin-top:3px; }
.adm-topbar__right  { display:flex; align-items:center; gap:8px; flex-shrink:0; }
.adm-topbar__status { display:flex; align-items:center; gap:7px; font-family:'DM Mono',monospace; font-size:8px; letter-spacing:.2em; color:var(--text3); }
.adm-topbar__status-dot { width:6px; height:6px; border-radius:50%; background:var(--green); box-shadow:0 0 8px rgba(46,204,113,.55); }
.adm-topbar__av { width:32px; height:32px; background:linear-gradient(135deg,var(--or),var(--or2)); border:1.5px solid rgba(200,168,75,.35); border-radius:0; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:12px; color:var(--void); flex-shrink:0; }

/* Icon btn */
.adm-icon-btn { width:32px; height:32px; background:none; border:0.5px solid var(--hair); color:var(--text2); display:flex; align-items:center; justify-content:center; cursor:pointer; transition:all .2s; position:relative; flex-shrink:0; }
.adm-icon-btn:hover { border-color:var(--hairH); color:var(--or); background:rgba(200,168,75,.05); }
.adm-icon-btn--sm   { width:26px; height:26px; }
.adm-icon-btn--danger:hover { border-color:rgba(231,76,60,.4); color:var(--red); background:rgba(231,76,60,.06); }
.adm-icon-btn__badge { position:absolute; top:-4px; right:-4px; width:14px; height:14px; background:var(--red); border-radius:50%; border:1.5px solid var(--void); font-family:'DM Mono',monospace; font-size:7px; font-weight:700; display:flex; align-items:center; justify-content:center; color:#fff; }
.adm-icon-btn__badge--pulse { animation:pulse 2s ease-in-out infinite; }

/* Toast */
.adm-toast { position:fixed; top:22px; right:22px; z-index:9100; display:flex; align-items:flex-start; gap:11px; min-width:260px; max-width:320px; background:var(--deep); border:0.5px solid var(--hair); box-shadow:0 12px 40px rgba(0,0,0,.55); padding:12px; overflow:hidden; }
.adm-toast::before { content:''; position:absolute; top:0; left:0; right:0; height:0.5px; background:linear-gradient(90deg,transparent,var(--toast-accent,var(--or)),transparent); opacity:.7; }
.adm-toast--sucesso { --toast-accent:#2ecc71; }
.adm-toast--erro    { --toast-accent:#e74c3c; }
.adm-toast--info    { --toast-accent:var(--or); }
.adm-toast__icon { width:22px; height:22px; flex-shrink:0; border-radius:50%; display:flex; align-items:center; justify-content:center; background:color-mix(in srgb,var(--toast-accent,var(--or)) 15%,transparent); color:var(--toast-accent,var(--or)); }
.adm-toast__titulo { display:block; font-size:11px; font-weight:600; letter-spacing:.04em; color:var(--text); margin-bottom:2px; }
.adm-toast__msg    { display:block; font-size:10px; color:var(--text3); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.adm-toast__close  { background:none; border:none; color:var(--text4); cursor:pointer; display:flex; align-items:center; justify-content:center; width:18px; height:18px; flex-shrink:0; transition:color .2s; margin-left:auto; }
.adm-toast__close:hover { color:var(--or); }
.adm-toast__bar { position:absolute; bottom:0; left:0; height:1px; background:var(--toast-accent,var(--or)); opacity:.5; width:100%; transform-origin:left; animation:toastBar linear 1 forwards; }
@keyframes toastBar { from{transform:scaleX(1)} to{transform:scaleX(0)} }
.toast-slide-enter-active,.toast-slide-leave-active { transition:opacity .3s,transform .3s; }
.toast-slide-enter-from,.toast-slide-leave-to { opacity:0; transform:translateX(14px); }

/* Notif panel */
.adm-notif-panel { position:absolute; top:calc(100% + 10px); right:0; width:300px; background:var(--panel); border:0.5px solid var(--hairH); z-index:50; max-height:360px; overflow-y:auto; box-shadow:0 20px 60px rgba(0,0,0,.5); }
.adm-notif-panel__head { display:flex; align-items:center; justify-content:space-between; padding:12px 16px; border-bottom:0.5px solid var(--hair); font-family:'DM Mono',monospace; font-size:8px; letter-spacing:.3em; text-transform:uppercase; color:var(--or); opacity:.7; }
.adm-notif-panel__mark { background:none; border:none; font-family:'DM Mono',monospace; font-size:7px; color:var(--text3); cursor:pointer; letter-spacing:.15em; transition:color .2s; }
.adm-notif-panel__mark:hover { color:var(--or); }
.adm-notif-panel__vazio { padding:24px; text-align:center; font-size:12px; color:var(--text3); }
.adm-notif-item { display:flex; align-items:flex-start; gap:10px; padding:11px 16px; border-bottom:0.5px solid var(--hair); cursor:pointer; transition:background .2s; }
.adm-notif-item:hover { background:rgba(200,168,75,.04); }
.adm-notif-item--nova { background:rgba(200,168,75,.025); }
.adm-notif-item__dot  { width:6px; height:6px; border-radius:50%; background:var(--or); flex-shrink:0; margin-top:4px; }
.adm-notif-item__msg  { font-size:11px; color:var(--text2); line-height:1.5; }
.adm-notif-item__time { font-family:'DM Mono',monospace; font-size:8px; color:var(--text3); margin-top:3px; }
.notif-drop-enter-active,.notif-drop-leave-active { transition:opacity .2s,transform .25s; }
.notif-drop-enter-from,.notif-drop-leave-to { opacity:0; transform:translateY(-8px); }

/* ═══ SEÇÃO ═══ */
.adm-section { padding:20px 28px; display:flex; flex-direction:column; gap:14px; }

/* ═══ GRIDS ═══ */
.adm-grid-4 { display:grid; grid-template-columns:repeat(4,1fr); gap:10px; }
.adm-grid-2 { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
.adm-col-2  { grid-column:span 2; }

/* ═══ STAT CARDS ═══ */
.adm-stat { background:var(--panel); border:0.5px solid var(--hair); padding:14px 16px; position:relative; overflow:hidden; }
.adm-stat__topline { position:absolute; top:0; left:0; right:0; height:0.5px; background:linear-gradient(90deg,var(--or),transparent); opacity:.18; }
.adm-stat__kanji   { position:absolute; right:10px; top:8px; font-family:'Cormorant Garamond',serif; font-size:2.8rem; font-style:italic; color:var(--or); opacity:.06; line-height:1; pointer-events:none; }
.adm-stat__spark   { margin-bottom:8px; }
.adm-stat__num     { font-family:'Cormorant Garamond',serif; font-size:1.55rem; font-weight:300; color:var(--text); line-height:1; margin-bottom:4px; }
.adm-stat__label   { font-family:'DM Mono',monospace; font-size:7px; letter-spacing:.4em; text-transform:uppercase; color:var(--text3); display:block; }
.adm-stat__sub     { font-size:10px; color:var(--text3); margin-top:6px; display:block; }

/* ═══ MINI STAT ═══ */
.adm-mini-stat { background:var(--panel); border:0.5px solid var(--hair); padding:14px 16px; position:relative; overflow:hidden; }
.adm-mini-stat__topline { position:absolute; top:0; left:0; right:0; height:0.5px; background:linear-gradient(90deg,var(--or),transparent); opacity:.18; }
.adm-mini-stat__num   { display:block; font-family:'Cormorant Garamond',serif; font-size:1.6rem; font-weight:300; color:var(--text); line-height:1; margin-bottom:4px; }
.adm-mini-stat__label { font-family:'DM Mono',monospace; font-size:7px; letter-spacing:.4em; text-transform:uppercase; color:var(--text3); display:block; }
.adm-mini-stat__bar   { position:absolute; bottom:0; left:0; height:2px; background:linear-gradient(to right,var(--or),rgba(200,168,75,.3)); transition:width 1s var(--ease); }

/* ═══ ALERTAS ═══ */
.adm-alertas { display:flex; flex-direction:column; gap:8px; }
.adm-alerta  { display:flex; align-items:center; gap:10px; padding:10px 18px; border:0.5px solid; font-family:'DM Mono',monospace; font-size:9px; letter-spacing:.15em; }
.adm-alerta--warn { background:rgba(243,156,18,.05); border-color:rgba(243,156,18,.25); color:#f39c12; }
.adm-alerta--erro { background:rgba(231,76,60,.05); border-color:rgba(231,76,60,.25); color:var(--red); }
.adm-alerta__gem  { font-size:6px; flex-shrink:0; }
.adm-alerta button { margin-left:auto; background:none; border:none; cursor:pointer; color:inherit; opacity:.5; transition:opacity .2s; font-size:11px; }
.adm-alerta button:hover { opacity:1; }

/* ═══ CARD ═══ */
.adm-card { background:var(--panel); border:0.5px solid var(--hair); position:relative; overflow:hidden; }
.adm-card::after { content:''; position:absolute; top:0; left:0; bottom:0; width:0.5px; background:linear-gradient(180deg,var(--or),transparent 60%); opacity:.1; }
.adm-card__topline { position:absolute; top:0; left:0; right:0; height:0.5px; background:linear-gradient(90deg,var(--or),transparent 50%); opacity:.2; }
.adm-card__head         { display:flex; align-items:center; gap:12px; padding:14px 20px; border-bottom:0.5px solid var(--hair); }
.adm-card__head--between{ justify-content:space-between; }
.adm-card__kanji  { font-family:'Cormorant Garamond',serif; font-size:1.25rem; font-style:italic; color:var(--or); opacity:.26; flex-shrink:0; line-height:1; }
.adm-card__titulo { font-family:'DM Mono',monospace; font-size:7.5px; font-weight:600; letter-spacing:.32em; text-transform:uppercase; color:var(--text2); margin:0; }
.adm-card__sub    { font-family:'DM Mono',monospace; font-size:8px; color:var(--text3); margin-top:2px; }
.adm-card__body         { padding:18px 20px; }
.adm-card__body--flex   { display:flex; gap:14px; align-items:center; }
.adm-card__body--radiais{ display:flex; justify-content:space-around; padding:18px 20px; }
.adm-card__foot   { padding:14px 20px; border-top:0.5px solid var(--hair); display:flex; justify-content:flex-end; gap:8px; }

/* ═══ CHARTS ═══ */
.adm-charts { display:grid; grid-template-columns:1.4fr 1fr 1fr; gap:12px; }
.adm-bar      { display:flex; align-items:flex-end; gap:5px; height:90px; }
.adm-bar--tall{ height:130px; }
.adm-bar__col { flex:1; display:flex; flex-direction:column; align-items:center; gap:4px; position:relative; cursor:default; }
.adm-bar__col:hover .adm-bar__tooltip { opacity:1; transform:translateX(-50%) translateY(0); }
.adm-bar__bar { width:100%; background:linear-gradient(to top,rgba(200,168,75,.3),rgba(200,168,75,.7)); border:0.5px solid rgba(200,168,75,.35); border-radius:2px 2px 0 0; position:relative; transition:height .9s var(--ease); }
.adm-bar__bar:hover { background:linear-gradient(to top,rgba(200,168,75,.45),rgba(200,168,75,.9)); }
.adm-bar__tooltip { position:absolute; bottom:calc(100% + 4px); left:50%; transform:translateX(-50%) translateY(4px); white-space:nowrap; background:rgba(8,7,14,.96); border:0.5px solid var(--hair); padding:3px 8px; font-family:'DM Mono',monospace; font-size:8px; color:var(--or); opacity:0; transition:opacity .2s,transform .2s; pointer-events:none; z-index:5; }
.adm-bar__label { font-size:7px; letter-spacing:.1em; color:rgba(200,168,75,.32); text-transform:uppercase; }
.adm-bar__foot  { display:flex; align-items:center; gap:12px; margin-top:12px; padding-top:12px; border-top:0.5px solid var(--hair); }
.adm-bar__total { font-family:'Cormorant Garamond',serif; font-size:1.4rem; color:var(--text); }
.adm-bar__pct   { font-family:'DM Mono',monospace; font-size:9px; letter-spacing:.15em; }
.adm-donut-legenda { flex:1; display:flex; flex-direction:column; gap:7px; }
.adm-donut-item    { display:flex; align-items:center; gap:7px; }
.adm-donut-dot     { width:6px; height:6px; border-radius:50%; flex-shrink:0; }
.adm-donut-lbl     { font-size:9px; color:var(--text3); flex:1; letter-spacing:.05em; }
.adm-donut-pct     { font-family:'DM Mono',monospace; font-size:8px; color:var(--text2); }
.adm-radial        { display:flex; flex-direction:column; align-items:center; gap:6px; }
.adm-radial__label { font-size:7px; letter-spacing:.38em; text-transform:uppercase; color:var(--text3); }
.adm-analytics-row { display:flex; align-items:center; gap:12px; margin-bottom:12px; }
.adm-analytics-lbl { font-size:10px; color:var(--text3); width:80px; flex-shrink:0; }
.adm-analytics-bar { flex:1; height:4px; background:rgba(200,168,75,.06); border-radius:2px; overflow:hidden; }
.adm-analytics-fill{ height:100%; background:linear-gradient(to right,var(--or),var(--or2)); border-radius:2px; transition:width 1s var(--ease); }
.adm-analytics-val { font-family:'DM Mono',monospace; font-size:10px; min-width:30px; text-align:right; }
.adm-top-item       { display:flex; align-items:center; gap:10px; padding:8px 0; border-bottom:0.5px solid var(--hair); }
.adm-top-item:last-child { border-bottom:none; }
.adm-top-item__rank { font-family:'DM Mono',monospace; font-size:9px; color:var(--or); opacity:.4; flex-shrink:0; width:22px; }
.adm-log            { padding:12px 20px; }
.adm-log-item       { display:flex; align-items:flex-start; gap:10px; padding:8px 0; border-bottom:0.5px solid rgba(200,168,75,.04); }
.adm-log-item:last-child { border-bottom:none; }
.adm-log-item__gem  { font-size:6px; color:var(--or); opacity:.38; flex-shrink:0; margin-top:4px; }
.adm-log-item__msg  { font-size:11px; color:var(--text2); line-height:1.5; }
.adm-log-item__time { font-family:'DM Mono',monospace; font-size:8px; color:var(--text3); margin-top:2px; display:block; }

/* ═══ TOOLBAR / SEARCH ═══ */
.adm-toolbar    { display:flex; align-items:center; gap:8px; flex-wrap:wrap; }
.adm-search-box { display:flex; align-items:center; gap:8px; background:rgba(200,168,75,.035); border:0.5px solid var(--hair); padding:7px 12px; flex:1; min-width:200px; max-width:340px; transition:border-color .2s; }
.adm-search-box:focus-within { border-color:var(--hairH); }
.adm-search-box svg { color:var(--or); opacity:.5; flex-shrink:0; }
.adm-search-box input { background:none; border:none; outline:none; color:var(--text); font-family:'Syne',sans-serif; font-size:12px; width:100%; caret-color:var(--or); }
.adm-search-box input::placeholder { color:var(--text4); }
.adm-search-clear { background:none; border:none; color:var(--text3); cursor:pointer; font-size:11px; transition:color .2s; flex-shrink:0; }
.adm-search-clear:hover { color:var(--or); }
.adm-select { background:rgba(200,168,75,.035); border:0.5px solid var(--hair); padding:7px 26px 7px 11px; color:var(--text2); font-family:'Syne',sans-serif; font-size:11px; outline:none; cursor:pointer; appearance:none; background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='rgba(200,168,75,0.4)' stroke-width='1.5' fill='none'/%3E%3C/svg%3E"); background-repeat:no-repeat; background-position:right 9px center; transition:border-color .2s; }
.adm-select:focus { border-color:var(--hairH); }
.adm-select option { background:var(--deep); }
.adm-date-range { display:flex; align-items:center; gap:6px; }
.adm-date-input { background:rgba(200,168,75,.035); border:0.5px solid var(--hair); padding:7px 10px; color:var(--text2); font-family:'DM Mono',monospace; font-size:10px; outline:none; cursor:pointer; width:132px; }
.adm-date-input:focus { border-color:var(--hairH); }
.adm-bulk        { display:flex; align-items:center; gap:10px; padding:10px 16px; background:rgba(200,168,75,.04); border:0.5px solid var(--hairH); flex-wrap:wrap; }
.adm-bulk__count { font-family:'DM Mono',monospace; font-size:9px; color:var(--or); letter-spacing:.2em; }

/* ═══ TABELA ═══ */
.adm-tabela { width:100%; border-collapse:collapse; }
.adm-tabela thead tr { border-bottom:0.5px solid var(--hairH); }
.adm-tabela th { padding:12px 18px; font-family:'DM Mono',monospace; font-size:7px; letter-spacing:.42em; text-transform:uppercase; color:rgba(200,168,75,.48); text-align:left; font-weight:700; white-space:nowrap; }
.adm-th-sort { cursor:pointer; user-select:none; transition:color .2s; }
.adm-th-sort:hover { color:var(--or); }
.adm-sort-icon { font-size:9px; opacity:.5; margin-left:4px; }
.adm-tabela td  { padding:11px 18px; border-bottom:0.5px solid var(--hair); vertical-align:middle; }
.adm-tabela tbody tr { transition:background .2s; }
.adm-tabela tbody tr:hover { background:rgba(200,168,75,.028); }
.adm-tabela tbody tr:last-child td { border-bottom:none; }
.adm-row--selected { background:rgba(200,168,75,.06) !important; }
.adm-vazio { text-align:center; color:var(--text3); font-size:13px; padding:40px !important; }
.adm-check { width:14px; height:14px; accent-color:var(--or); cursor:pointer; appearance:none; border:0.5px solid rgba(200,168,75,0.4); border-radius:3px; background:transparent; position:relative; transition:all .2s; flex-shrink:0; }
.adm-check:checked { background:var(--or); border-color:var(--or); }
.adm-check:checked::after { content:''; position:absolute; left:4px; top:1px; width:4px; height:8px; border:1.5px solid var(--void); border-top:none; border-left:none; transform:rotate(45deg); }
.adm-check:hover { border-color:var(--or); }
@keyframes skelPulse { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
.adm-skel-wrap { display:flex; flex-direction:column; gap:8px; padding:12px 18px; }
.adm-skel-row  { height:40px; background:linear-gradient(90deg,rgba(200,168,75,.04) 0%,rgba(200,168,75,.08) 50%,rgba(200,168,75,.04) 100%); background-size:200% 100%; animation:skelPulse 1.6s ease-in-out infinite; }

/* ═══ TEXTO / BADGES ═══ */
.adm-nome      { font-size:12px; color:var(--text2); font-weight:500; margin:0; }
.adm-email     { font-size:10px; color:var(--text3); margin-top:2px; margin-bottom:0; }
.adm-txt-sm    { font-size:12px; color:var(--text2); }
.adm-mono-id   { font-family:'DM Mono',monospace; font-size:10px; font-weight:600; color:var(--or); background:rgba(200,168,75,.07); padding:3px 7px; display:inline-block; white-space:nowrap; }
.adm-mono-date { font-family:'DM Mono',monospace; font-size:9px; color:var(--text3); white-space:nowrap; }
.adm-gold-val  { font-family:'Cormorant Garamond',serif; font-size:13.5px; color:var(--text); }
.adm-mini-label{ font-family:'DM Mono',monospace; font-size:7px; letter-spacing:.48em; text-transform:uppercase; color:var(--or); opacity:.6; margin-bottom:7px; display:block; }
.adm-campo-hint{ font-size:11px; color:var(--text3); line-height:1.6; }

.adm-badge { font-size:8px; letter-spacing:.15em; text-transform:uppercase; color:var(--or); background:rgba(200,168,75,.07); border:0.5px solid var(--hair); padding:2px 8px; white-space:nowrap; display:inline-block; }
.adm-badge--destaque { background:rgba(200,168,75,.14); border-color:var(--hairH); }
.adm-badge--novo     { background:rgba(52,152,219,.1); border-color:rgba(52,152,219,.3); color:var(--blue); }

.adm-status-badge            { font-family:'DM Mono',monospace; font-size:7.5px; letter-spacing:.16em; text-transform:uppercase; }
.adm-status-badge--entregue  { color:var(--green); }
.adm-status-badge--enviado   { color:var(--or); }
.adm-status-badge--cancelado { color:var(--red); }
.adm-status-badge--pendente  { color:var(--text3); }

.adm-status-sel { padding:5px 10px; border:0.5px solid var(--hair); background:rgba(200,168,75,.03); font-family:'Syne',sans-serif; font-size:10px; font-weight:600; cursor:pointer; transition:all .2s; outline:none; color:var(--text2); width:100%; max-width:150px; }
.adm-status-sel--pendente  { color:#f39c12; border-color:rgba(243,156,18,.4); background:rgba(243,156,18,.05); }
.adm-status-sel--aprovado  { color:var(--green); border-color:rgba(46,204,113,.4); background:rgba(46,204,113,.05); }
.adm-status-sel--enviado   { color:var(--blue); border-color:rgba(52,152,219,.4); background:rgba(52,152,219,.05); }
.adm-status-sel--entregue  { color:#1abc9c; border-color:rgba(26,188,156,.4); background:rgba(26,188,156,.05); }
.adm-status-sel--cancelado { color:var(--red); border-color:rgba(231,76,60,.4); background:rgba(231,76,60,.05); }

.adm-estoque-badge        { font-size:8px; letter-spacing:.1em; padding:3px 10px; border:0.5px solid; font-weight:600; text-transform:uppercase; white-space:nowrap; display:inline-block; }
.adm-estoque-badge--ok    { background:rgba(46,204,113,.1); border-color:rgba(46,204,113,.25); color:var(--green); }
.adm-estoque-badge--baixo { background:rgba(243,156,18,.08); border-color:rgba(243,156,18,.3); color:#f39c12; }
.adm-estoque-badge--no    { background:rgba(231,76,60,.08); border-color:rgba(231,76,60,.2); color:var(--red); }

.adm-role-badge       { font-size:8px; letter-spacing:.2em; padding:3px 10px; border:0.5px solid var(--hair); font-weight:700; text-transform:uppercase; background:rgba(200,168,75,.05); color:var(--text3); display:inline-block; }
.adm-role-badge--admin{ background:rgba(200,168,75,.14); border-color:var(--hairH); color:var(--or); }
.adm-2fa-badge        { font-size:8px; letter-spacing:.1em; padding:3px 10px; border:0.5px solid rgba(231,76,60,.18); font-weight:700; text-transform:uppercase; background:rgba(231,76,60,.06); color:rgba(231,76,60,.7); display:inline-block; }
.adm-2fa-badge--on    { background:rgba(46,204,113,.1); border-color:rgba(46,204,113,.28); color:var(--green); }

.adm-cancel-actions { display:flex; gap:5px; flex-wrap:wrap; }
.adm-btn-approve { background:rgba(46,204,113,.08); border:0.5px solid rgba(46,204,113,.3); color:var(--green); padding:4px 10px; font-size:9px; font-weight:600; cursor:pointer; transition:all .2s; white-space:nowrap; }
.adm-btn-approve:hover { background:rgba(46,204,113,.18); }
.adm-btn-reject  { background:rgba(231,76,60,.08); border:0.5px solid rgba(231,76,60,.3); color:var(--red); padding:4px 10px; font-size:9px; font-weight:600; cursor:pointer; transition:all .2s; white-space:nowrap; }
.adm-btn-reject:hover { background:rgba(231,76,60,.18); }
.adm-cancel-tag     { font-size:9px; padding:3px 10px; font-weight:600; color:var(--text3); white-space:nowrap; }
.adm-cancel-tag--ok { color:var(--green); }
.adm-cancel-tag--no { color:var(--red); }

.adm-prod-info { display:flex; align-items:center; gap:10px; }
.adm-prod-img  { width:44px; height:44px; background:rgba(200,168,75,.03); border:0.5px solid var(--hair); overflow:hidden; flex-shrink:0; display:flex; align-items:center; justify-content:center; }
.adm-prod-img img { width:100%; height:100%; object-fit:cover; }

.adm-usr-info { display:flex; align-items:center; gap:10px; }
.adm-usr-av   { width:38px; height:38px; border-radius:50%; background:linear-gradient(135deg,var(--or),var(--or2)); display:flex; align-items:center; justify-content:center; font-size:14px; font-weight:700; color:var(--void); flex-shrink:0; overflow:hidden; border:0.5px solid var(--hair); }
.adm-usr-av img { width:100%; height:100%; object-fit:cover; }

/* ═══ PAGINAÇÃO ═══ */
.adm-pag      { display:flex; align-items:center; justify-content:center; gap:12px; padding:14px; border-top:0.5px solid var(--hair); }
.adm-pag__btn { width:30px; height:30px; background:rgba(200,168,75,.05); border:0.5px solid var(--hair); color:var(--text2); cursor:pointer; transition:all .2s; }
.adm-pag__btn:hover:not(:disabled) { border-color:var(--hairH); color:var(--or); }
.adm-pag__btn:disabled { opacity:.3; cursor:not-allowed; }
.adm-pag__info { font-family:'DM Mono',monospace; font-size:11px; color:var(--text3); letter-spacing:.12em; }

/* ═══ SPINNER ═══ */
.adm-spinner    { width:10px; height:10px; border:1.5px solid rgba(200,168,75,.2); border-top-color:var(--or); border-radius:50%; animation:spin .7s linear infinite; flex-shrink:0; display:inline-block; }
.adm-spinner--sm{ width:10px; height:10px; }
@keyframes spin { to{transform:rotate(360deg)} }

/* ═══ BOTÕES (idênticos ao cfg) ═══ */
.btn { display:inline-flex; align-items:center; justify-content:center; gap:6px; font-family:'Syne',sans-serif; font-size:7.5px; font-weight:700; letter-spacing:.4em; text-transform:uppercase; padding:10px 20px; border:none; cursor:pointer; transition:all .32s var(--ease); white-space:nowrap; position:relative; overflow:hidden; text-decoration:none; }
.btn:disabled { opacity:.3; cursor:not-allowed; }
.btn--gold { background:transparent; color:var(--or); border:0.5px solid var(--or); }
.btn--gold::before { content:''; position:absolute; inset:0; background:var(--or); transform:scaleX(0); transform-origin:left; transition:transform .38s var(--ease); z-index:0; }
.btn--gold:hover:not(:disabled)::before { transform:scaleX(1); }
.btn--gold:hover:not(:disabled) { color:var(--void); }
.btn--gold > * { position:relative; z-index:1; }
.btn--ghost  { background:transparent; color:var(--text3); border:0.5px solid var(--hair); }
.btn--ghost:hover:not(:disabled) { border-color:var(--hairH); color:var(--text2); }
.btn--danger { background:rgba(231,76,60,.05); color:rgba(231,76,60,.75); border:0.5px solid rgba(231,76,60,.2); }
.btn--danger:hover:not(:disabled) { background:rgba(231,76,60,.11); color:var(--red); border-color:rgba(231,76,60,.42); }
.btn--sm   { padding:6px 14px; font-size:7px; }
.btn--full { width:100%; }

/* ═══ SITE TABS ═══ */
.adm-site-tabs { display:flex; gap:4px; flex-wrap:wrap; }
.adm-site-tab  { display:flex; align-items:center; gap:7px; padding:9px 16px; background:rgba(200,168,75,.04); border:0.5px solid var(--hair); color:var(--text3); font-family:'Syne',sans-serif; font-size:10px; letter-spacing:.08em; cursor:pointer; transition:all .25s var(--ease); }
.adm-site-tab:hover { border-color:var(--hairH); color:var(--text2); }
.adm-site-tab.is-active { background:rgba(200,168,75,.1); border-color:var(--hairH); color:var(--or); }
.adm-site-tab__kanji{ font-family:'Cormorant Garamond',serif; font-size:14px; font-style:italic; opacity:.65; }

/* ═══ PROD FORM TABS ═══ */
.adm-prod-form-tabs { display:flex; gap:4px; flex-wrap:wrap; margin-bottom:20px; }
.adm-prod-form-tab  { padding:7px 14px; background:rgba(200,168,75,.04); border:0.5px solid var(--hair); color:var(--text3); font-size:9px; letter-spacing:.2em; text-transform:uppercase; cursor:pointer; transition:all .2s; font-family:'DM Mono',monospace; }
.adm-prod-form-tab:hover { border-color:var(--hairH); color:var(--text2); }
.adm-prod-form-tab.is-active { background:rgba(200,168,75,.1); border-color:var(--hairH); color:var(--or); }

/* ═══ CAMPOS ═══ */
.adm-campo { display:flex; flex-direction:column; gap:6px; }
.adm-campo label { font-family:'DM Mono',monospace; font-size:7px; letter-spacing:.52em; text-transform:uppercase; color:var(--or); opacity:.58; }
.adm-campo input, .adm-campo textarea, .adm-campo__input, .adm-campo__sel {
  background:transparent; border:none; border-bottom:0.5px solid var(--hair);
  padding:7px 0; color:var(--text); font-family:'Syne',sans-serif;
  font-size:12.5px; font-weight:300; outline:none; resize:none;
  transition:border-color .28s; caret-color:var(--or); width:100%;
}
.adm-campo input:focus, .adm-campo textarea:focus, .adm-campo__input:focus, .adm-campo__sel:focus { border-bottom-color:var(--or); }
.adm-campo__sel { cursor:pointer; appearance:none; background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='rgba(200,168,75,0.4)' stroke-width='1.5' fill='none'/%3E%3C/svg%3E"); background-repeat:no-repeat; background-position:right 2px center; padding-right:20px; }
.adm-campo__sel option { background:var(--deep); }
.adm-color-input { width:32px; height:32px; border:0.5px solid var(--hair); background:none; cursor:pointer; padding:2px; flex-shrink:0; }
.adm-erro { font-size:10px; color:rgba(231,76,60,.9); background:rgba(231,76,60,.04); border-left:0.5px solid rgba(231,76,60,.5); padding:8px 12px; margin-top:8px; }
.adm-img-preview { width:100%; height:140px; border:0.5px solid var(--hair); background:rgba(200,168,75,.03); overflow:hidden; }
.adm-img-preview img { width:100%; height:100%; object-fit:cover; }

/* Toggles */
.adm-toggle-lbl { display:flex; align-items:center; gap:10px; cursor:pointer; font-size:12px; color:var(--text2); }
.adm-tog        { width:42px; height:22px; border-radius:40px; background:rgba(200,168,75,.08); border:0.5px solid var(--hair); position:relative; transition:all .25s; cursor:pointer; flex-shrink:0; }
.adm-tog.on     { background:rgba(200,168,75,.2); border-color:var(--hairH); }
.adm-tog__thumb { position:absolute; top:2px; left:2px; width:16px; height:16px; border-radius:50%; background:#fff; box-shadow:0 1px 4px rgba(0,0,0,.3); transition:transform .25s var(--ease); }
.adm-tog.on .adm-tog__thumb { transform:translateX(20px); background:var(--or); }

/* Vazio */
.adm-vazio-bloco        { display:flex; flex-direction:column; align-items:center; gap:10px; padding:60px 20px; text-align:center; }
.adm-vazio-bloco__kanji { font-family:'Cormorant Garamond',serif; font-size:4rem; font-style:italic; color:var(--or); opacity:.1; }
.adm-vazio-bloco__titulo{ font-size:15px; font-weight:600; color:var(--text2); }
.adm-vazio-simples      { text-align:center; padding:24px; color:var(--text3); font-size:12px; }

/* Notif rows full */
.adm-notif-row       { display:flex; align-items:center; gap:12px; padding:14px 20px; border-bottom:0.5px solid var(--hair); cursor:pointer; transition:background .2s; }
.adm-notif-row:hover { background:rgba(200,168,75,.028); }
.adm-notif-row--nova { background:rgba(200,168,75,.025); }
.adm-notif-row__dot  { width:7px; height:7px; border-radius:50%; background:var(--or); flex-shrink:0; }
.adm-notif-row__body { flex:1; }
.adm-notif-row__msg  { font-size:12px; color:var(--text2); line-height:1.5; margin:0; }
.adm-notif-row__time { font-family:'DM Mono',monospace; font-size:8px; color:var(--text3); margin-top:3px; }

/* Tabela simples dash */
.adm-tbl-head { display:grid; grid-template-columns:90px 1fr 120px 120px 100px; gap:12px; padding:10px 20px; border-bottom:0.5px solid var(--hairH); }
.adm-tbl-head span { font-family:'DM Mono',monospace; font-size:7px; letter-spacing:.42em; text-transform:uppercase; color:rgba(200,168,75,.42); }
.adm-tbl-head--ped { grid-template-columns:90px 1fr 120px 120px 100px; }
.adm-tbl-row     { display:grid; grid-template-columns:90px 1fr 120px 120px 100px; gap:12px; padding:11px 20px; border-bottom:0.5px solid rgba(200,168,75,.04); align-items:center; font-size:12px; transition:background .2s; }
.adm-tbl-row--ped{ grid-template-columns:90px 1fr 120px 120px 100px; }
.adm-tbl-row:hover { background:rgba(200,168,75,.025); }

/* ═══ MODAL ═══ */
.adm-modal-wrap { position:fixed; inset:0; z-index:9200; background:rgba(5,5,9,.92); backdrop-filter:blur(22px); display:flex; align-items:center; justify-content:center; padding:20px; }
.adm-modal { background:linear-gradient(135deg,rgba(10,8,2,.99),rgba(7,6,1,.99)); border:0.5px solid var(--hair); max-width:680px; width:100%; max-height:90vh; overflow-y:auto; position:relative; }
.adm-modal--sm { max-width:440px; }
.adm-modal--lg { max-width:820px; }
.adm-modal__topline { position:absolute; top:0; left:0; right:0; height:0.5px; background:linear-gradient(90deg,transparent,var(--or),transparent); opacity:.42; }
.adm-modal__topline--red { background:linear-gradient(90deg,transparent,var(--red),transparent); opacity:.5; }
.adm-modal__head  { display:flex; justify-content:space-between; align-items:center; padding:16px 22px; border-bottom:0.5px solid var(--hair); }
.adm-modal__titulo { font-family:'Cormorant Garamond',serif; font-size:1.25rem; font-weight:300; color:var(--text); margin:0; display:flex; align-items:center; gap:9px; }
.adm-modal__kanji  { font-style:italic; color:var(--or); opacity:.38; }
.adm-modal__close  { background:none; border:0.5px solid var(--hair); width:26px; height:26px; color:var(--text3); display:flex; align-items:center; justify-content:center; cursor:pointer; transition:all .28s; font-size:11px; }
.adm-modal__close:hover { border-color:var(--or); color:var(--or); transform:rotate(90deg); }
.adm-modal__body  { padding:20px 22px; display:flex; flex-direction:column; gap:18px; }
.adm-modal__foot  { padding:14px 22px; border-top:0.5px solid var(--hair); display:flex; justify-content:flex-end; gap:8px; }
.adm-modal__total { display:flex; justify-content:space-between; align-items:center; padding-top:14px; border-top:0.5px solid var(--hair); margin-top:8px; font-size:13px; font-weight:600; color:var(--text2); }
.adm-modal__confirm-kanji { font-family:'Cormorant Garamond',serif; font-size:5rem; font-style:italic; color:var(--red); opacity:.12; margin:0 auto 12px; text-align:center; display:block; }
.adm-modal-item   { display:flex; align-items:center; gap:12px; padding:9px 0; border-bottom:0.5px solid var(--hair); }
.adm-modal-item:last-of-type { border-bottom:none; }
.modal-fade-enter-active,.modal-fade-leave-active { transition:opacity .28s; }
.modal-fade-enter-from,.modal-fade-leave-to { opacity:0; }

/* ═══ RESPONSIVO ═══ */
@media (max-width:1200px) {
  .adm { grid-template-columns:200px 1fr; }
  .adm-grid-4 { grid-template-columns:repeat(2,1fr); }
  .adm-charts { grid-template-columns:1fr 1fr; }
  .adm-charts > *:last-child { grid-column:span 2; }
}
@media (max-width:900px) {
  .adm { grid-template-columns:1fr; }
  .adm-aside { position:fixed; left:0; top:0; bottom:0; z-index:100; width:270px; transform:translateX(-100%); transition:transform .45s var(--ease); height:100vh; padding-top:0; }
  .adm--sidebar-open .adm-aside { transform:translateX(0); }
  .adm-topbar__burger { display:flex; }
  .adm-topbar  { padding:12px 16px; }
  .adm-section { padding:16px 16px; }
  .adm-grid-2  { grid-template-columns:1fr; }
  .adm-col-2   { grid-column:auto; }
  .adm-grid-4  { grid-template-columns:1fr 1fr; }
  .adm-charts  { grid-template-columns:1fr; }
  .adm-charts > * { grid-column:auto !important; }
  .adm-bg__kanji--1 { display:none; }
}
@media (max-width:500px) {
  .adm-grid-4 { grid-template-columns:1fr; }
  .adm-topbar__status { display:none; }
}

@media (prefers-reduced-motion:reduce) {
  .adm-bg__kanji--1,.adm-bg__kanji--2,.adm-bg__kanji--3,.adm-bg__fog--1,.adm-bg__fog--2 { animation:none !important; }
}
</style>