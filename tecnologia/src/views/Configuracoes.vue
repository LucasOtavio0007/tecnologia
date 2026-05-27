<template>
  <main class="cfg" :class="{ 'sidebar-open': sidebarOpen }" ref="rootRef">

    <!-- ═══════════════════════════════════════════════════
         FUNDO — DNA do footer
    ═══════════════════════════════════════════════════ -->
    <div class="cfg-bg" aria-hidden="true">
      <div class="cfg-bg__kanji cfg-bg__kanji--1">設</div>
      <div class="cfg-bg__kanji cfg-bg__kanji--2">金</div>
      <div class="cfg-bg__kanji cfg-bg__kanji--3">道</div>
      <div class="cfg-bg__kanji cfg-bg__kanji--4">武</div>
      <div class="cfg-bg__washi"></div>
      <div class="cfg-bg__grain"></div>
      <div class="cfg-bg__fog cfg-bg__fog--1"></div>
      <div class="cfg-bg__fog cfg-bg__fog--2"></div>
      <div class="cfg-bg__scanline"></div>
      <div class="cfg-bg__brush cfg-bg__brush--h"></div>
      <div class="cfg-bg__brush cfg-bg__brush--v"></div>
      <div class="cfg-bg__realm-line"></div>
    </div>

    <!-- ═══════════════════════════════════════════════════
         ASIDE
    ═══════════════════════════════════════════════════ -->
    <aside class="cfg-aside" role="navigation" aria-label="Navegação da conta">
      <div class="cfg-aside__kamon" aria-hidden="true">案</div>
      <div class="cfg-aside__topline" aria-hidden="true"></div>

      <!-- Brand -->
      <div class="cfg-aside__brand">
        <router-link to="/" class="cfg-aside__logo" aria-label="Ir para a página inicial">
          <span class="cfg-aside__logo-mark" aria-hidden="true">⊕</span>
          <span class="cfg-aside__logo-txt">Noir<em>&amp;</em>Or</span>
        </router-link>
        <p class="cfg-aside__sub">Configurações da Conta</p>
      </div>

      <!-- Ornamento divisor -->
      <div class="cfg-orn" aria-hidden="true">
        <span class="cfg-orn__line"></span>
        <span class="cfg-orn__gem">◆</span>
        <span class="cfg-orn__line"></span>
      </div>

      <!-- Perfil resumido — nome, role e kanji na mesma linha -->
      <div class="cfg-aside__perfil">
        <!-- Avatar com upload -->
        <div class="cfg-aside__av-wrap">
          <div class="cfg-aside__av" @click="triggerAvatarUpload" :title="'Trocar foto'">
            <img v-if="perfil.avatar" :src="perfil.avatar" alt=""
              @error="e => e.target.style.display='none'" />
            <span v-else>{{ inicialNome }}</span>
            <div class="cfg-aside__av-overlay" aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 0 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                <circle cx="12" cy="13" r="4"/>
              </svg>
            </div>
          </div>
          <input ref="avatarInput" type="file" accept="image/*" style="display:none" @change="onAvatarChange" />
        </div>

        <div class="cfg-aside__perfil-info">
          <!-- Nome + role + kanji na MESMA linha -->
          <div class="cfg-aside__perfil-linha">
            <p class="cfg-aside__perfil-nome">{{ primeiroNome }}</p>
            <span class="cfg-badge-role">
              <span class="cfg-badge-role__gem" aria-hidden="true">◆</span>
              {{ isAdmin ? 'Admin' : 'Usuário' }}
            </span>
            <span class="cfg-aside__perfil-kanji" aria-hidden="true">注</span>
          </div>
          <p class="cfg-aside__perfil-email">{{ perfil.email }}</p>
        </div>
      </div>

      <!-- Horário Brasília -->
      <div class="cfg-aside__clock">
        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
        </svg>
        <span class="cfg-aside__clock-label">Brasília</span>
        <span class="cfg-aside__clock-time">{{ brasiliaTime }}</span>
      </div>

      <!-- Ornamento menor -->
      <div class="cfg-orn cfg-orn--sm" aria-hidden="true">
        <span class="cfg-orn__line"></span>
        <span class="cfg-orn__kanji">口</span>
        <span class="cfg-orn__line"></span>
      </div>

      <!-- Navegação compacta -->
      <nav class="cfg-aside__nav">
        <p class="cfg-aside__nav-label">
          <span aria-hidden="true" class="cfg-aside__nav-kanji">行</span>
          Navegação
        </p>
        <button
          v-for="s in secoes" :key="s.id"
          :class="['cfg-nav-item', { 'is-active': secaoAtiva === s.id }]"
          @click="navegar(s.id)"
        >
          <span class="cfg-nav-item__blade" aria-hidden="true"></span>
          <span class="cfg-nav-item__num" aria-hidden="true">{{ s.num }}</span>
          <span class="cfg-nav-item__icon" v-html="s.icon" aria-hidden="true"></span>
          <span class="cfg-nav-item__txt">{{ s.label }}</span>
          <span v-if="s.id === 'pedidos' && pedidos.length" class="cfg-nav-item__badge">
            {{ pedidos.length }}
          </span>
        </button>
      </nav>

      <!-- Footer do aside -->
      <div class="cfg-aside__foot">
        <router-link to="/" class="cfg-aside__back">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Voltar ao Atelier
        </router-link>
        <p class="cfg-aside__copy" aria-hidden="true">© {{ anoAtual }} Noir &amp; Or</p>
      </div>
    </aside>

    <!-- ═══════════════════════════════════════════════════
         CONTEÚDO PRINCIPAL
    ═══════════════════════════════════════════════════ -->
    <div class="cfg-content">

      <!-- Topbar -->
      <header class="cfg-topbar">
        <button class="cfg-topbar__burger"
          @click="sidebarOpen = !sidebarOpen"
          :aria-label="sidebarOpen ? 'Fechar menu' : 'Abrir menu'"
          :aria-expanded="sidebarOpen">
          <span></span><span></span><span></span>
        </button>

        <div class="cfg-topbar__heading">
          <span class="cfg-topbar__kanji" aria-hidden="true">{{ secaoAtual?.kanji }}</span>
          <div>
            <h1 class="cfg-topbar__titulo">{{ secaoAtual?.label }}</h1>
            <p class="cfg-topbar__desc">{{ secaoAtual?.desc }}</p>
          </div>
        </div>

        <div class="cfg-topbar__right">
          <div class="cfg-realm-badge" aria-label="Tema ativo">
            <span class="cfg-realm-badge__dot"></span>
            <span class="cfg-realm-badge__name">{{ realmName }}</span>
          </div>
          <template v-if="['perfil','notificacoes'].includes(secaoAtiva)">
            <button class="btn btn--ghost btn--sm" @click="descartar" :disabled="salvando">Descartar</button>
            <button class="btn btn--gold btn--sm" @click="salvar" :disabled="salvando || !temAlteracoes">
              <span v-if="salvando" class="cfg-spinner" aria-hidden="true"></span>
              <svg v-else width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                <polyline points="17 21 17 13 7 13"/><polyline points="7 3 7 8 15 8"/>
              </svg>
              {{ salvando ? 'Salvando…' : 'Salvar' }}
            </button>
          </template>
        </div>
      </header>

      <!-- Toast global -->
      <transition name="toast-slide">
        <div v-if="toast.msg"
          :class="['cfg-toast', `cfg-toast--${toast.tipo}`]"
          role="alert" aria-live="assertive">
          <div class="cfg-toast__icon" aria-hidden="true">
            <svg v-if="toast.tipo==='sucesso'" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            <svg v-else-if="toast.tipo==='erro'" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <svg v-else width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          </div>
          <div class="cfg-toast__body">
            <span class="cfg-toast__titulo">{{ toast.titulo }}</span>
            <span v-if="toast.msg" class="cfg-toast__msg">{{ toast.msg }}</span>
          </div>
          <button class="cfg-toast__close" @click="toast.msg=''" aria-label="Fechar">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
          <div class="cfg-toast__bar" :style="{animationDuration: '3500ms'}"></div>
        </div>
      </transition>

      <!-- ════════════════════════════════════
           SEÇÃO: PEDIDOS
      ════════════════════════════════════ -->
      <section v-if="secaoAtiva === 'pedidos'" class="cfg-section">
        <div class="cfg-grid-4">
          <div class="cfg-stat" v-for="ms in miniStatsPedidos" :key="ms.label">
            <div class="cfg-stat__topline" aria-hidden="true"></div>
            <span class="cfg-stat__num" :style="ms.cor ? {color:ms.cor} : {}">{{ ms.num }}</span>
            <span class="cfg-stat__label">{{ ms.label }}</span>
            <div class="cfg-stat__bar" :style="{width: ms.pct+'%'}"></div>
          </div>
        </div>

        <div class="cfg-toolbar">
          <div class="cfg-search">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
            </svg>
            <input v-model="buscaPedidos" placeholder="Buscar por ID ou status…" autocomplete="off"/>
            <button v-if="buscaPedidos" @click="buscaPedidos=''" class="cfg-search__clear" aria-label="Limpar busca">✕</button>
          </div>
          <select v-model="filtroPedido" class="cfg-select">
            <option value="">Todos os status</option>
            <option value="pendente">Pendente</option>
            <option value="aprovado">Aprovado</option>
            <option value="enviado">Enviado</option>
            <option value="entregue">Entregue</option>
            <option value="cancelado">Cancelado</option>
          </select>
          <button class="cfg-btn-icon" @click="recarregarPedidos" :disabled="loadingPedidos" aria-label="Recarregar pedidos">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.51"/>
            </svg>
          </button>
        </div>

        <div v-if="loadingPedidos" class="cfg-skel-wrap">
          <div v-for="n in 5" :key="n" class="cfg-skel-row"></div>
        </div>

        <div v-else-if="!pedidosFiltrados.length" class="cfg-vazio">
          <span class="cfg-vazio__kanji" aria-hidden="true">空</span>
          <p class="cfg-vazio__titulo">Nenhum pedido encontrado</p>
          <p class="cfg-vazio__sub">{{ buscaPedidos || filtroPedido ? 'Tente outros filtros' : 'Sua jornada no Atelier começa na loja' }}</p>
          <router-link v-if="!buscaPedidos && !filtroPedido" to="/loja" class="btn btn--gold" style="margin-top:10px">
            Explorar Coleção
          </router-link>
        </div>

        <div v-else class="cfg-card" style="padding:0;overflow-x:auto">
          <div class="cfg-card__topline" aria-hidden="true"></div>
          <div class="cfg-tbl-head">
            <span>Pedido</span><span>Data</span><span>Itens</span><span>Total</span><span>Status</span><span></span>
          </div>
          <div v-for="p in pedidosPaginados" :key="p._id"
            class="cfg-tbl-row"
            role="button" tabindex="0"
            :aria-label="`Pedido ${(p.numero||p._id?.slice(-6))?.toUpperCase()} — ${statusLabel(p.status)}`"
            @click="abrirDetalhe(p)" @keydown.enter="abrirDetalhe(p)">
            <span class="cfg-mono-id">#{{ (p.numero||p._id?.slice(-6))?.toUpperCase() }}</span>
            <span class="cfg-mono-date">{{ fmtDate(p.criadoEm) }}</span>
            <span class="cfg-badge-count">{{ p.itens?.length||0 }} item(s)</span>
            <span class="cfg-gold-val">R$ {{ fmt(p.total) }}</span>
            <span :class="['cfg-status', `cfg-status--${statusClass(p.status)}`]">
              <span class="cfg-status__dot"></span>{{ statusLabel(p.status) }}
            </span>
            <span class="cfg-tbl-arr" aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 18l6-6-6-6"/></svg>
            </span>
          </div>
          <div v-if="totalPagPedidos > 1" class="cfg-pag">
            <button class="cfg-pag__btn" :disabled="pagPedidos===1" @click="pagPedidos--">‹</button>
            <span class="cfg-pag__info">{{ pagPedidos }} / {{ totalPagPedidos }}</span>
            <button class="cfg-pag__btn" :disabled="pagPedidos===totalPagPedidos" @click="pagPedidos++">›</button>
          </div>
        </div>
      </section>

      <!-- ════════════════════════════════════
           SEÇÃO: REEMBOLSOS
      ════════════════════════════════════ -->
      <section v-if="secaoAtiva === 'reembolsos'" class="cfg-section">
        <div class="cfg-card">
          <div class="cfg-card__topline" aria-hidden="true"></div>
          <div class="cfg-card__head">
            <span class="cfg-card__kanji" aria-hidden="true">申</span>
            <h3 class="cfg-card__titulo">Nova Solicitação de Reembolso</h3>
          </div>

          <div v-if="!pedidosElegiveis.length" class="cfg-vazio" style="padding:28px 0">
            <span class="cfg-vazio__kanji" aria-hidden="true">無</span>
            <p class="cfg-vazio__titulo">Nenhum pedido elegível</p>
            <p class="cfg-vazio__sub">Reembolsos são aceitos para pedidos entregues ou enviados, ainda não solicitados.</p>
          </div>

          <template v-else>
            <div class="cfg-grid-2">
              <div class="cfg-campo">
                <label>Pedido elegível</label>
                <select v-model="reembolsoForm.pedidoId" class="cfg-select cfg-select--line">
                  <option value="">Selecionar pedido…</option>
                  <option v-for="p in pedidosElegiveis" :key="p._id" :value="p._id">
                    #{{ (p.numero||p._id?.slice(-6))?.toUpperCase() }} — R$ {{ fmt(p.total) }}
                  </option>
                </select>
              </div>
              <div class="cfg-campo">
                <label>Motivo</label>
                <select v-model="reembolsoForm.motivo" class="cfg-select cfg-select--line">
                  <option value="">Selecionar motivo…</option>
                  <option value="produto_danificado">Produto danificado</option>
                  <option value="produto_errado">Produto errado</option>
                  <option value="nao_chegou">Não chegou</option>
                  <option value="nao_gostei">Não era o esperado</option>
                  <option value="outro">Outro</option>
                </select>
              </div>
              <div class="cfg-campo cfg-col-2">
                <label>Descrição detalhada</label>
                <textarea v-model="reembolsoForm.descricao" rows="3"
                  placeholder="Descreva o problema com detalhes…"></textarea>
              </div>
            </div>
            <p v-if="erroReembolso" class="cfg-erro-msg">{{ erroReembolso }}</p>
            <div class="cfg-card__foot">
              <button class="btn btn--gold" @click="enviarReembolso" :disabled="enviandoReembolso">
                <span v-if="enviandoReembolso" class="cfg-spinner"></span>
                {{ enviandoReembolso ? 'Enviando…' : 'Enviar Solicitação' }}
              </button>
            </div>
          </template>
        </div>

        <div v-if="reembolsos.length" class="cfg-card">
          <div class="cfg-card__topline" aria-hidden="true"></div>
          <div class="cfg-card__head">
            <span class="cfg-card__kanji" aria-hidden="true">歴</span>
            <h3 class="cfg-card__titulo">Histórico de Solicitações</h3>
          </div>
          <div v-for="r in reembolsos" :key="r._id" class="cfg-reimb-item">
            <div class="cfg-reimb-item__info">
              <p class="cfg-reimb-item__nome">Pedido #{{ r.pedidoNumero }}</p>
              <p class="cfg-reimb-item__motivo">{{ motivoLabel(r.motivo) }}</p>
              <p class="cfg-mono-date">{{ fmtDate(r.criadoEm) }}</p>
            </div>
            <span :class="['cfg-reimb-status', `cfg-reimb-status--${r.status}`]">
              {{ reembolsoStatusLabel(r.status) }}
            </span>
          </div>
        </div>

        <div class="cfg-card cfg-card--info">
          <div class="cfg-card__topline" aria-hidden="true"></div>
          <div class="cfg-card__head">
            <span class="cfg-card__kanji" aria-hidden="true">規</span>
            <h3 class="cfg-card__titulo">Política de Reembolso</h3>
          </div>
          <ul class="cfg-policy-list">
            <li><span class="cfg-policy-gem" aria-hidden="true">◆</span>Reembolsos aceitos em até <strong>30 dias</strong> após a entrega</li>
            <li><span class="cfg-policy-gem" aria-hidden="true">◆</span>Produto deve estar em condições originais</li>
            <li><span class="cfg-policy-gem" aria-hidden="true">◆</span>Análise em até <strong>5 dias úteis</strong></li>
            <li><span class="cfg-policy-gem" aria-hidden="true">◆</span>Estorno em até <strong>10 dias úteis</strong> após aprovação</li>
            <li><span class="cfg-policy-gem" aria-hidden="true">◆</span>Frete de devolução coberto pela Noir &amp; Or</li>
          </ul>
        </div>
      </section>

      <!-- ════════════════════════════════════
           SEÇÃO: PERFIL
      ════════════════════════════════════ -->
      <section v-if="secaoAtiva === 'perfil'" class="cfg-section">

        <!-- Hero do perfil com upload de avatar -->
        <div class="cfg-perfil-hero">
          <div class="cfg-perfil-hero__av-wrap">
            <div class="cfg-perfil-hero__av" @click="triggerAvatarUpload" title="Trocar foto de perfil">
              <img v-if="perfil.avatar" :src="perfil.avatar" alt="" />
              <span v-else>{{ inicialNome }}</span>
              <div class="cfg-perfil-hero__av-overlay" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 0 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                  <circle cx="12" cy="13" r="4"/>
                </svg>
                <span>Trocar foto</span>
              </div>
            </div>
            <div class="cfg-perfil-hero__av-hint">Clique para alterar</div>
          </div>
          <div class="cfg-perfil-hero__info">
            <h2 class="cfg-perfil-hero__nome">{{ perfil.nome }} {{ perfil.sobrenome }}</h2>
            <p class="cfg-perfil-hero__email">{{ perfil.email }}</p>
            <div class="cfg-perfil-hero__badges">
              <span class="cfg-badge-role">
                <span class="cfg-badge-role__gem" aria-hidden="true">◆</span>
                {{ isAdmin ? 'Admin' : 'Usuário' }}
              </span>
              <span class="cfg-badge-role cfg-badge-role--since">Membro Noir &amp; Or</span>
            </div>
          </div>
          <div class="cfg-perfil-hero__orn" aria-hidden="true">
            <span class="cfg-perfil-hero__kanji">会</span>
          </div>
        </div>

        <!-- Dados pessoais -->
        <div class="cfg-card">
          <div class="cfg-card__topline" aria-hidden="true"></div>
          <div class="cfg-card__head">
            <span class="cfg-card__kanji" aria-hidden="true">身</span>
            <h3 class="cfg-card__titulo">Dados Pessoais</h3>
          </div>
          <div class="cfg-grid-2">
            <div class="cfg-campo">
              <label for="p-nome">Nome</label>
              <input id="p-nome" v-model="perfil.nome" autocomplete="given-name" @input="marcarAlterado"/>
            </div>
            <div class="cfg-campo">
              <label for="p-sob">Sobrenome</label>
              <input id="p-sob" v-model="perfil.sobrenome" autocomplete="family-name" @input="marcarAlterado"/>
            </div>
            <div class="cfg-campo">
              <label for="p-email">E-mail</label>
              <input id="p-email" :value="perfil.email" disabled/>
            </div>
            <div class="cfg-campo">
              <label for="p-tel">Telefone</label>
              <input id="p-tel" v-model="perfil.telefone" autocomplete="tel"
                placeholder="(11) 99999-9999"
                @input="e => { perfil.telefone = mascaraTel(e.target.value); marcarAlterado() }"
                maxlength="15"/>
            </div>
            <div class="cfg-campo cfg-col-2">
              <label for="p-bio">Bio</label>
              <textarea id="p-bio" v-model="perfil.bio" rows="2"
                placeholder="Conta um pouco sobre você…" @input="marcarAlterado"></textarea>
            </div>
          </div>
        </div>

        <!-- Endereço com busca de CEP -->
        <div class="cfg-card">
          <div class="cfg-card__topline" aria-hidden="true"></div>
          <div class="cfg-card__head">
            <span class="cfg-card__kanji" aria-hidden="true">住</span>
            <h3 class="cfg-card__titulo">Endereço de Entrega</h3>
          </div>
          <div class="cfg-grid-2">
            <div class="cfg-campo">
              <label for="p-cep">CEP</label>
              <div class="cfg-campo__cep-row">
                <input id="p-cep" v-model="perfil.cep" autocomplete="postal-code"
                  placeholder="00000-000" maxlength="9"
                  @input="e => { perfil.cep = mascaraCep(e.target.value); if(perfil.cep.length===9) buscarCep() }"
                  @blur="() => { if(perfil.cep.length===9) buscarCep() }"/>
                <div v-if="buscandoCep" class="cfg-cep-spinner" aria-label="Buscando CEP…">
                  <span class="cfg-spinner" style="border-top-color:var(--or)"></span>
                </div>
              </div>
              <p v-if="erroCep" class="cfg-campo__err">{{ erroCep }}</p>
            </div>
            <div class="cfg-campo">
              <label for="p-uf">Estado</label>
              <input id="p-uf" v-model="perfil.uf" autocomplete="off" placeholder="UF" maxlength="2" @input="marcarAlterado"/>
            </div>
            <div class="cfg-campo">
              <label for="p-city">Cidade</label>
             <input id="p-city" v-model="perfil.cidade" autocomplete="off" @input="marcarAlterado"/>
            </div>
            <div class="cfg-campo">
              <label for="p-bairro">Bairro</label>
              <input id="p-bairro" v-model="perfil.bairro" autocomplete="off" @input="marcarAlterado"/>
            </div>
            <div class="cfg-campo cfg-col-2">
              <label for="p-end">Logradouro</label>
              <input id="p-end" v-model="perfil.endereco" autocomplete="off" @input="marcarAlterado"/>
            </div>
            <div class="cfg-campo">
              <label for="p-num">Número</label>
              <input id="p-num" v-model="perfil.numero" autocomplete="off" placeholder="Ex: 42" @input="marcarAlterado"/>
            </div>
            <div class="cfg-campo">
              <label for="p-comp">Complemento</label>
              <input id="p-comp" v-model="perfil.complemento" autocomplete="off" placeholder="Apto, bloco…" @input="marcarAlterado"/>
            </div>
          </div>
        </div>

        <!-- Alterar senha — stepper premium -->
        <div class="cfg-card">
          <div class="cfg-card__topline" aria-hidden="true"></div>
          <div class="cfg-card__head">
            <span class="cfg-card__kanji" aria-hidden="true">鍵</span>
            <h3 class="cfg-card__titulo">Alterar Senha</h3>
          </div>

          <div class="cfg-stepper" role="list" aria-label="Etapas para alterar senha">
            <div v-for="(s, i) in etapasSenha" :key="s.id"
              :class="['cfg-step', { 'is-active': etapaSenha===i, 'is-done': etapaSenha>i }]"
              role="listitem" :aria-current="etapaSenha===i ? 'step' : undefined">
              <div class="cfg-step__orb" aria-hidden="true">
                <svg v-if="etapaSenha>i" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                <span v-else>{{ i+1 }}</span>
              </div>
              <span class="cfg-step__label">{{ s.label }}</span>
              <div v-if="i < etapasSenha.length-1" class="cfg-step__linha" aria-hidden="true"></div>
            </div>
          </div>

          <!-- Etapa 0: Verificar senha atual -->
          <transition name="panel-fade" mode="out-in">
            <div v-if="etapaSenha===0" key="s0" class="cfg-panel">
              <p class="cfg-panel__desc">
                Confirme sua senha atual antes de prosseguir.
                Após <strong>{{ maxTentativas }} tentativas incorretas</strong> o acesso será bloqueado temporariamente.
              </p>

              <div class="cfg-gemas" :aria-label="`${tentativasRestantes} tentativas restantes`">
                <span v-for="i in maxTentativas" :key="i"
                  :class="['cfg-gema', { 'is-usada': i > tentativasRestantes }]" aria-hidden="true"></span>
                <span class="cfg-gemas__txt">{{ tentativasRestantes }} {{ tentativasRestantes===1 ? 'tentativa restante' : 'tentativas disponíveis' }}</span>
              </div>

              <div :class="['cfg-alerta', {
                'cfg-alerta--warn':  tentativasRestantes===2,
                'cfg-alerta--alert': tentativasRestantes<=1 || bloqueado,
                'cfg-alerta--safe':  tentativasRestantes===maxTentativas && !bloqueado
              }]">
                <div class="cfg-alerta__ico" aria-hidden="true">
                  <svg v-if="bloqueado" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  <svg v-else-if="tentativasRestantes<=1" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                  <svg v-else width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <div>
                  <p class="cfg-alerta__titulo">
                    <template v-if="bloqueado">Bloqueado por {{ bloqueioRestante }}s</template>
                    <template v-else-if="tentativasRestantes<=1">Última tentativa antes do bloqueio</template>
                    <template v-else-if="tentativasRestantes===2">Atenção — mais 1 erro bloqueia</template>
                    <template v-else>Confirme sua identidade</template>
                  </p>
                  <p class="cfg-alerta__desc">
                    <template v-if="bloqueado">Muitas tentativas. Aguarde {{ bloqueioRestante }}s.</template>
                    <template v-else-if="tentativasRestantes<=1">O próximo erro bloqueia por {{ bloqueioBase }}s.</template>
                    <template v-else>Sua senha atual é exigida por segurança.</template>
                  </p>
                </div>
              </div>

              <div class="cfg-campo cfg-campo--senha">
                <label for="s-atual">Senha Atual</label>
                <div :class="['cfg-campo__row', { 'is-err': errosSenha.senhaAtual, 'is-ok': senhaAtualOk }]">
                  <input id="s-atual" v-model="formSenha.senhaAtual"
  :type="verSenha.atual ? 'text' : 'password'"
  placeholder="••••••••" autocomplete="new-password"
  :disabled="bloqueado"
  @input="errosSenha.senhaAtual=''"
  @keydown.enter="step0"/>
                  <button class="cfg-eye" type="button" @click="verSenha.atual=!verSenha.atual"
                    :aria-label="verSenha.atual ? 'Ocultar senha' : 'Mostrar senha'">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                </div>
                <transition name="err-slide">
                  <p v-if="errosSenha.senhaAtual" class="cfg-campo__err" role="alert" :id="`err-s-atual`">{{ errosSenha.senhaAtual }}</p>
                </transition>
              </div>

              <button class="btn btn--gold btn--full" @click="step0" :disabled="bloqueado||salvandoSenha">
                <span v-if="salvandoSenha" class="cfg-spinner"></span>
                <svg v-else width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>
                {{ salvandoSenha ? 'Verificando…' : 'Verificar Identidade' }}
              </button>
            </div>
          </transition>

          <!-- Etapa 1: Código OTP -->
          <transition name="panel-fade" mode="out-in">
            <div v-if="etapaSenha===1" key="s1" class="cfg-panel">
              <p class="cfg-panel__desc">
                Um código de 6 dígitos foi enviado para <strong>{{ emailMascarado }}</strong>.
                O código expira em <strong>5 minutos</strong>.
              </p>

              <div class="cfg-timer-wrap" :aria-label="`Código expira em ${timerFmt}`">
                <div class="cfg-timer-ring">
                  <svg viewBox="0 0 84 84" width="84" height="84" aria-hidden="true">
                    <circle class="cfg-timer-ring__bg" cx="42" cy="42" r="36.5"/>
                    <circle class="cfg-timer-ring__fg" cx="42" cy="42" r="36.5"
                      :style="{
                        strokeDashoffset: timerOffset,
                        stroke: timerSecs<=60 ? (timerSecs<=30 ? 'var(--red)' : 'var(--orange)') : 'var(--or)'
                      }"/>
                  </svg>
                  <span class="cfg-timer-num"
                    :style="{color: timerSecs<=60 ? (timerSecs<=30?'var(--red)':'var(--orange)') : 'var(--or)'}">
                    {{ timerFmt }}
                  </span>
                </div>
                <span class="cfg-timer-label">Código expira em</span>
              </div>

              <div class="cfg-otp-row" role="group" aria-label="Código de verificação — 6 dígitos">
                <input v-for="i in 6" :key="i"
                  :id="`otp-${i-1}`"
                  :ref="el => { if(el) otpRefs[i-1]=el }"
                  v-model="otpDigits[i-1]"
                  :class="['cfg-otp', { 'is-filled': otpDigits[i-1] }]"
                  maxlength="1" type="text" inputmode="numeric" pattern="[0-9]"
                  :aria-label="`Dígito ${i}`"
                  @input="onOtpInput(i-1,$event)"
                  @keydown="onOtpKeydown(i-1,$event)"
                  @paste="onOtpPaste"/>
              </div>

              <transition name="err-slide">
                <p v-if="errosSenha.otp" class="cfg-campo__err" role="alert">{{ errosSenha.otp }}</p>
              </transition>

              <div class="cfg-btn-row">
                <button class="btn btn--ghost" @click="irEtapa(0)">Voltar</button>
                <button class="btn btn--gold" style="flex:1" @click="step1" :disabled="salvandoSenha">
                  <span v-if="salvandoSenha" class="cfg-spinner"></span>
                  <svg v-else width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                  {{ salvandoSenha ? 'Verificando…' : 'Confirmar Código' }}
                </button>
              </div>

              <div class="cfg-reenvio">
                <button class="cfg-reenvio__btn" @click="reenviarOtp" :disabled="resendSecs>0">
                  Reenviar código
                </button>
                <span v-if="resendSecs>0" class="cfg-reenvio__timer">— aguarde {{ resendSecs }}s</span>
              </div>
            </div>
          </transition>

          <!-- Etapa 2: Nova senha -->
          <transition name="panel-fade" mode="out-in">
            <div v-if="etapaSenha===2" key="s2" class="cfg-panel">
              <div class="cfg-id-confirmed">
                <div class="cfg-id-confirmed__ico" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>
                  </svg>
                </div>
                <div>
                  <p class="cfg-id-confirmed__titulo">Identidade confirmada</p>
                  <p class="cfg-id-confirmed__sub">Defina sua nova senha de acesso abaixo</p>
                </div>
              </div>

              <div class="cfg-campo cfg-campo--senha">
                <label for="s-nova">Nova Senha</label>
                <div :class="['cfg-campo__row', { 'is-err': errosSenha.novaSenha }]">
                  <input id="s-nova" v-model="formSenha.novaSenha"
                    :type="verSenha.nova ? 'text' : 'password'"
                    placeholder="Mínimo 12 caracteres" autocomplete="new-password"
                    @input="errosSenha.novaSenha=''; checkConfirm()"/>
                  <button class="cfg-eye" type="button" @click="verSenha.nova=!verSenha.nova"
                    :aria-label="verSenha.nova ? 'Ocultar' : 'Mostrar'">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                </div>
                <div v-if="formSenha.novaSenha" class="cfg-forca">
                  <div class="cfg-forca__bar"><div class="cfg-forca__fill" :style="{width:forca.pct+'%',background:forca.cor}"></div></div>
                  <span class="cfg-forca__txt" :style="{color:forca.cor}">{{ forca.label }}</span>
                </div>
              </div>

              <div class="cfg-reqs" role="list" aria-label="Requisitos da senha">
                <div v-for="r in requisitos" :key="r.id"
                  :class="['cfg-req', { 'is-ok': r.met }]"
                  role="listitem" :aria-label="`${r.label}: ${r.met ? 'OK' : 'pendente'}`">
                  <span class="cfg-req__dot" aria-hidden="true"></span>{{ r.label }}
                </div>
              </div>

              <div class="cfg-campo cfg-campo--senha" style="margin-top:16px">
                <label for="s-conf">Confirmar Nova Senha</label>
                <div :class="['cfg-campo__row', { 'is-err': errosSenha.confirmar, 'is-ok': confirmOk }]">
                  <input id="s-conf" v-model="formSenha.confirmar"
                    :type="verSenha.conf ? 'text' : 'password'"
                    placeholder="Repita a nova senha" autocomplete="new-password"
                    @input="checkConfirm" @keydown.enter="step2"/>
                  <button class="cfg-eye" type="button" @click="verSenha.conf=!verSenha.conf"
                    :aria-label="verSenha.conf ? 'Ocultar' : 'Mostrar'">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                </div>
                <transition name="err-slide">
                  <p v-if="errosSenha.confirmar" class="cfg-campo__err" role="alert">{{ errosSenha.confirmar }}</p>
                </transition>
              </div>

              <button class="btn btn--gold btn--full" style="margin-top:20px"
                @click="step2" :disabled="!podeSalvarSenha||salvandoSenha">
                <span v-if="salvandoSenha" class="cfg-spinner"></span>
                <svg v-else width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/></svg>
                {{ salvandoSenha ? 'Salvando…' : 'Salvar Nova Senha' }}
              </button>
            </div>
          </transition>

          <!-- Etapa 3: Sucesso -->
          <transition name="panel-fade" mode="out-in">
            <div v-if="etapaSenha===3" key="s3" class="cfg-panel">
              <div class="cfg-sucesso">
                <div class="cfg-sucesso__ico" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h3 class="cfg-sucesso__titulo">Senha Alterada com Sucesso</h3>
                <p class="cfg-sucesso__sub">Sua nova senha está ativa. Todas as outras sessões foram encerradas por segurança.</p>
                <div class="cfg-sec-log" aria-label="Log de segurança">
                  <div class="cfg-sec-log__item" v-for="l in logSeguranca" :key="l">
                    <span class="cfg-sec-log__dot" aria-hidden="true"></span>{{ l }}
                  </div>
                </div>
                <button class="btn btn--ghost" style="margin-top:14px" @click="resetarSenha">
                  Alterar novamente
                </button>
              </div>
            </div>
          </transition>

          <div class="cfg-card__foot-info">
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <span>{{ footerSenha }}</span>
          </div>
        </div>
      </section>

      <!-- ════════════════════════════════════
           SEÇÃO: NOTIFICAÇÕES
      ════════════════════════════════════ -->
      <section v-if="secaoAtiva === 'notificacoes'" class="cfg-section">
        <div class="cfg-card">
          <div class="cfg-card__topline" aria-hidden="true"></div>
          <div class="cfg-card__head">
            <span class="cfg-card__kanji" aria-hidden="true">通</span>
            <h3 class="cfg-card__titulo">Preferências de E-mail</h3>
          </div>
          <div class="cfg-toggle-list">
            <div v-for="t in togglesEmail" :key="t.key" class="cfg-toggle-row">
              <div class="cfg-toggle-row__info">
                <p class="cfg-toggle-row__label">{{ t.label }}</p>
                <p class="cfg-toggle-row__desc">{{ t.desc }}</p>
              </div>
              <button :class="['cfg-toggle', { 'is-on': notif.email[t.key] }]"
                @click="notif.email[t.key] = !notif.email[t.key]; marcarAlterado()"
                :aria-pressed="notif.email[t.key]" :aria-label="t.label">
                <span class="cfg-toggle__track" aria-hidden="true"></span>
                <span class="cfg-toggle__thumb" aria-hidden="true"></span>
              </button>
            </div>
          </div>
          <p class="cfg-hint" style="margin-top:14px;padding-top:14px;border-top:.5px solid var(--hair)">
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true" style="vertical-align:middle;margin-right:6px;color:var(--or);opacity:.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            Clique em <strong style="color:var(--text2)">Salvar</strong> para aplicar suas preferências de notificação.
          </p>
        </div>
      </section>

      <!-- ════════════════════════════════════
           SEÇÃO: HISTÓRICO
      ════════════════════════════════════ -->
      <section v-if="secaoAtiva === 'historico'" class="cfg-section">
        <div class="cfg-grid-4">
          <div class="cfg-stat" v-for="ms in miniStatsHistorico" :key="ms.label">
            <div class="cfg-stat__topline" aria-hidden="true"></div>
            <span class="cfg-stat__num" :style="ms.cor ? {color:ms.cor} : {}">{{ ms.num }}</span>
            <span class="cfg-stat__label">{{ ms.label }}</span>
            <div class="cfg-stat__bar" :style="{width: ms.pct+'%'}"></div>
          </div>
        </div>

        <div class="cfg-card" style="padding:0;overflow-x:auto">
          <div class="cfg-card__topline" aria-hidden="true"></div>
          <div class="cfg-card__head" style="padding:16px 22px;border-bottom:.5px solid var(--hair)">
            <span class="cfg-card__kanji" aria-hidden="true">購</span>
            <h3 class="cfg-card__titulo">Histórico de Compras</h3>
            <div class="cfg-hist-tools">
              <div class="cfg-search cfg-search--sm">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                <input v-model="buscaHistorico" placeholder="Buscar pedido…" autocomplete="off"/>
              </div>
              <select v-model="filtroHistStatus" class="cfg-select cfg-select--sm">
                <option value="">Todos</option>
                <option value="entregue">Entregues</option>
                <option value="enviado">Enviados</option>
                <option value="cancelado">Cancelados</option>
                <option value="pendente">Pendentes</option>
              </select>
            </div>
          </div>
          <div v-if="loadingPedidos" class="cfg-skel-wrap" style="padding:14px 22px">
            <div v-for="n in 4" :key="n" class="cfg-skel-row"></div>
          </div>
          <div v-else-if="!histFiltrado.length" class="cfg-vazio" style="padding:40px 22px">
            <span class="cfg-vazio__kanji" aria-hidden="true">無</span>
            <p class="cfg-vazio__titulo">Nenhuma compra encontrada</p>
            <p class="cfg-vazio__sub">{{ buscaHistorico||filtroHistStatus ? 'Tente outros filtros' : 'Suas compras aparecerão aqui' }}</p>
          </div>
          <template v-else>
            <div class="cfg-tbl-head cfg-tbl-head--hist">
              <span>Pedido</span><span>Data</span><span>Produto(s)</span><span>Pgto</span><span>Total</span><span>Status</span><span></span>
            </div>
            <div v-for="p in histPaginado" :key="p._id"
              class="cfg-tbl-row cfg-tbl-row--hist"
              role="button" tabindex="0"
              :aria-label="`Pedido ${(p.numero||p._id?.slice(-6))?.toUpperCase()} — ${statusLabel(p.status)}`"
              @click="abrirDetalhe(p)" @keydown.enter="abrirDetalhe(p)">
              <span class="cfg-mono-id">#{{ (p.numero||p._id?.slice(-6))?.toUpperCase() }}</span>
              <span class="cfg-mono-date">{{ fmtDate(p.criadoEm) }}</span>
              <span class="cfg-hist-prod">
                <span class="cfg-badge-count">{{ p.itens?.length||0 }} item(s)</span>
                <span v-if="p.itens?.[0]" class="cfg-hist-prod__nome">{{ p.itens[0].nome||p.itens[0].produto?.nome }}</span>
              </span>
              <span class="cfg-badge-count">{{ (p.pagamento?.metodo||'—').toUpperCase() }}</span>
              <span class="cfg-gold-val">R$ {{ fmt(p.total) }}</span>
              <span :class="['cfg-status', `cfg-status--${statusClass(p.status)}`]">
                <span class="cfg-status__dot"></span>{{ statusLabel(p.status) }}
              </span>
              <span class="cfg-tbl-arr" aria-hidden="true">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 18l6-6-6-6"/></svg>
              </span>
            </div>
            <div v-if="totalPagHist > 1" class="cfg-pag">
              <button class="cfg-pag__btn" :disabled="pagHist===1" @click="pagHist--">‹</button>
              <span class="cfg-pag__info">{{ pagHist }} / {{ totalPagHist }}</span>
              <button class="cfg-pag__btn" :disabled="pagHist===totalPagHist" @click="pagHist++">›</button>
            </div>
          </template>
        </div>

        <!-- Log de ações -->
        <div class="cfg-card" style="padding:0">
          <div class="cfg-card__topline" aria-hidden="true"></div>
          <div class="cfg-card__head" style="padding:16px 22px;border-bottom:.5px solid var(--hair)">
            <span class="cfg-card__kanji" aria-hidden="true">履</span>
            <h3 class="cfg-card__titulo">Ações da Conta</h3>
            <button class="btn btn--ghost btn--sm" style="margin-left:auto" @click="carregarLog" aria-label="Recarregar log">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.51"/></svg>
            </button>
          </div>
          <div v-if="loadingLog" class="cfg-skel-wrap" style="padding:14px 22px">
            <div v-for="n in 5" :key="n" class="cfg-skel-row cfg-skel-row--sm"></div>
          </div>
          <div v-else-if="!logConta.length" class="cfg-vazio" style="padding:36px 22px">
            <span class="cfg-vazio__kanji" aria-hidden="true">無</span>
            <p class="cfg-vazio__titulo">Nenhuma ação registrada</p>
          </div>
          <div v-else class="cfg-log">
            <div v-for="(l,i) in logConta" :key="i" class="cfg-log-item">
              <div :class="['cfg-log-item__ico', `cfg-log-item__ico--${l.tipo}`]" aria-hidden="true">
                <span v-html="logIcone(l.tipo)"></span>
              </div>
              <div class="cfg-log-item__body">
                <p class="cfg-log-item__msg">{{ l.msg }}</p>
                <p class="cfg-mono-date">{{ fmtDate(l.criadoEm) }}</p>
              </div>
              <span :class="['cfg-log-badge', `cfg-log-badge--${l.tipo}`]">{{ logLabel(l.tipo) }}</span>
            </div>
          </div>
        </div>

        <!-- Sessões ativas -->
        <div class="cfg-card">
          <div class="cfg-card__topline" aria-hidden="true"></div>
          <div class="cfg-card__head">
            <span class="cfg-card__kanji" aria-hidden="true">盾</span>
            <h3 class="cfg-card__titulo">Sessões Ativas</h3>
          </div>
          <div v-if="!sessoes.length" class="cfg-vazio" style="padding:24px 0">
            <p class="cfg-vazio__titulo" style="font-size:12px">Nenhuma sessão encontrada</p>
          </div>
          <div v-for="s in sessoes" :key="s.id" class="cfg-sessao">
            <div class="cfg-sessao__ico" aria-hidden="true">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
            </div>
            <div class="cfg-sessao__info">
              <p class="cfg-sessao__nome">{{ s.dispositivo || 'Sessão ativa' }}</p>
              <p class="cfg-mono-date">{{ fmtDate(s.criadoEm) }}</p>
            </div>
            <span v-if="s.atual" class="cfg-badge-count" style="color:var(--or)">Atual</span>
            <button v-else class="btn btn--danger btn--sm" @click="encerrarSessao(s.id)">Encerrar</button>
          </div>
          <div class="cfg-card__foot">
            <button class="btn btn--danger" @click="confirmarEncerrarTodas">Encerrar Todas as Outras</button>
          </div>
        </div>

        <!-- 2FA -->
        <div class="cfg-card">
          <div class="cfg-card__topline" aria-hidden="true"></div>
          <div class="cfg-card__head">
            <span class="cfg-card__kanji" aria-hidden="true">印</span>
            <h3 class="cfg-card__titulo">Autenticação em Dois Fatores</h3>
          </div>
          <div :class="['cfg-2fa-status', { 'is-on': twoFA }]">
            <span class="cfg-2fa-status__dot"></span>
            {{ twoFA ? '2FA Ativado — Conta protegida' : '2FA Desativado — Conta vulnerável' }}
          </div>
          <p class="cfg-hint" style="margin:10px 0 16px">
            Adiciona uma camada extra de proteção. Recomendado para todas as contas.
          </p>
          <button :class="twoFA ? 'btn btn--danger' : 'btn btn--gold'" @click="toggle2FA">
            {{ twoFA ? 'Desativar 2FA' : 'Ativar 2FA' }}
          </button>
        </div>

        <!-- Zona de perigo -->
        <div class="cfg-card cfg-card--danger">
          <div class="cfg-card__topline cfg-card__topline--red" aria-hidden="true"></div>
          <div class="cfg-card__head">
            <span class="cfg-card__kanji cfg-card__kanji--red" aria-hidden="true">危</span>
            <h3 class="cfg-card__titulo">Zona de Perigo</h3>
          </div>
          <p class="cfg-hint" style="margin-bottom:18px">
            Ações irreversíveis. Não podem ser desfeitas após confirmação.
          </p>
          <div style="display:flex;gap:10px;flex-wrap:wrap">
            <button class="btn btn--danger" @click="exportarDados">Exportar Meus Dados</button>
            <button class="btn btn--danger" @click="confirmarExcluirConta">Excluir Conta</button>
          </div>
        </div>
      </section>

    </div><!-- /cfg-content -->

    <!-- Overlay mobile -->
    <transition name="overlay-fade">
      <div v-if="sidebarOpen" class="cfg-overlay" @click="sidebarOpen=false" aria-hidden="true"></div>
    </transition>

    <!-- ═══════════════════════════════════════════════════
         MODAL: Cancelamento (substituindo prompt() nativo)
    ═══════════════════════════════════════════════════ -->
    <transition name="modal-fade">
      <div v-if="modalCancelamento" class="cfg-modal-wrap"
        @click.self="modalCancelamento=null"
        role="dialog" aria-modal="true" aria-label="Cancelar pedido">
        <div class="cfg-modal cfg-modal--sm">
          <div class="cfg-modal__topline" aria-hidden="true"></div>
          <div class="cfg-modal__head">
            <h3 class="cfg-modal__titulo">
              <span class="cfg-modal__kanji" aria-hidden="true">取</span>
              Cancelar Pedido
            </h3>
            <button class="cfg-modal__close" @click="modalCancelamento=null" aria-label="Fechar">✕</button>
          </div>
          <div class="cfg-modal__body">
            <p class="cfg-hint" style="margin-bottom:16px">
              Pedido <strong style="color:var(--or)">#{{ (modalCancelamento?.numero||modalCancelamento?._id?.slice(-6))?.toUpperCase() }}</strong> — esta ação não pode ser desfeita após confirmação.
            </p>
            <div class="cfg-campo">
              <label>Motivo do cancelamento</label>
              <select v-model="cancelamentoMotivo" class="cfg-select cfg-select--line">
                <option value="">Selecionar motivo…</option>
                <option value="Desisti da compra">Desisti da compra</option>
                <option value="Comprei por engano">Comprei por engano</option>
                <option value="Produto indisponível">Produto demorou demais</option>
                <option value="Encontrei melhor preço">Encontrei melhor preço</option>
                <option value="Outro">Outro</option>
              </select>
            </div>
            <div class="cfg-campo" style="margin-top:12px">
              <label>Detalhes (opcional)</label>
              <textarea v-model="cancelamentoDetalhe" rows="2" placeholder="Descreva o motivo com mais detalhes…"></textarea>
            </div>
            <p v-if="erroCancelamento" class="cfg-erro-msg" style="margin-top:10px">{{ erroCancelamento }}</p>
          </div>
          <div class="cfg-modal__foot">
            <button class="btn btn--ghost" @click="modalCancelamento=null">Voltar</button>
            <button class="btn btn--danger" @click="confirmarCancelamento" :disabled="enviandoCancelamento">
              <span v-if="enviandoCancelamento" class="cfg-spinner"></span>
              Confirmar Cancelamento
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- ═══════════════════════════════════════════════════
         MODAL: Detalhe do Pedido
    ═══════════════════════════════════════════════════ -->
    <transition name="modal-fade">
      <div v-if="modalDetalhe" class="cfg-modal-wrap"
        @click.self="modalDetalhe=null"
        role="dialog" aria-modal="true" aria-label="Detalhes do pedido">
        <div class="cfg-modal cfg-modal--xl">
          <div class="cfg-modal__topline" aria-hidden="true"></div>
          <div class="cfg-modal__head">
            <h3 class="cfg-modal__titulo">
              <span class="cfg-modal__kanji" aria-hidden="true">令</span>
              Pedido #{{ (modalDetalhe.numero||modalDetalhe._id?.slice(-6))?.toUpperCase() }}
            </h3>
            <button class="cfg-modal__close" @click="modalDetalhe=null" aria-label="Fechar">✕</button>
          </div>
          <div class="cfg-modal__body">
            <div class="cfg-ped-hero">
              <div :class="['cfg-ped-hero__badge', `cfg-ped-hero__badge--${statusClass(modalDetalhe.status)}`]">
                <span class="cfg-status__dot"></span>{{ statusLabel(modalDetalhe.status) }}
              </div>
              <div class="cfg-ped-hero__meta">
                <span class="cfg-field-label">Realizado em</span>
                <span class="cfg-mono-date">{{ fmtDate(modalDetalhe.criadoEm) }}</span>
              </div>
              <div class="cfg-ped-hero__meta">
                <span class="cfg-field-label">Total</span>
                <span class="cfg-gold-val" style="font-size:1.1rem">R$ {{ fmt(modalDetalhe.total) }}</span>
              </div>
              <div v-if="modalDetalhe.pagamento?.metodo" class="cfg-ped-hero__meta">
                <span class="cfg-field-label">Pagamento</span>
                <span class="cfg-badge-count">{{ modalDetalhe.pagamento.metodo.toUpperCase() }}</span>
                <span v-if="modalDetalhe.pagamento.parcelas>1" class="cfg-mono-date" style="margin-top:2px">
                  {{ modalDetalhe.pagamento.parcelas }}x sem juros
                </span>
              </div>
            </div>

            <div class="cfg-ped-section">
              <p class="cfg-ped-section__titulo">
                <span class="cfg-ped-section__kanji" aria-hidden="true">歴</span>
                Histórico de Status
              </p>
              <div class="cfg-timeline">
                <template v-if="modalDetalhe.status !== 'cancelado'">
                  <div v-for="(etapa,ei) in etapasTimeline" :key="etapa.id"
                    :class="['cfg-etapa', {
                      'is-done':   etapaIdx(modalDetalhe.status)>ei,
                      'is-active': etapaIdx(modalDetalhe.status)===ei,
                      'is-future': etapaIdx(modalDetalhe.status)<ei
                    }]">
                    <div class="cfg-etapa__left">
                      <div class="cfg-etapa__orb" v-html="etapa.icon"></div>
                      <div v-if="ei < etapasTimeline.length-1" class="cfg-etapa__linha"></div>
                    </div>
                    <div class="cfg-etapa__body">
                      <div class="cfg-etapa__header">
                        <span class="cfg-etapa__kanji" aria-hidden="true">{{ etapa.kanji }}</span>
                        <span class="cfg-etapa__nome">{{ etapa.label }}</span>
                        <span v-if="etapaIdx(modalDetalhe.status)===ei" class="cfg-etapa__tag cfg-etapa__tag--active">Atual</span>
                        <span v-else-if="etapaIdx(modalDetalhe.status)>ei" class="cfg-etapa__tag cfg-etapa__tag--done">✓ Concluído</span>
                        <span v-else class="cfg-etapa__tag cfg-etapa__tag--future">Aguardando</span>
                      </div>
                      <p class="cfg-etapa__desc">{{ etapa.desc }}</p>
                      <div v-if="etapa.id==='enviado' && (modalDetalhe.rastreio||modalDetalhe.tracking)" class="cfg-rastreio">
                        <span class="cfg-mono-id">{{ modalDetalhe.rastreio||modalDetalhe.tracking }}</span>
                        <button class="btn btn--ghost btn--sm" @click="copiar(modalDetalhe.rastreio||modalDetalhe.tracking)">Copiar</button>
                        <a :href="`https://rastreamento.correios.com.br/app/index.php/pesquisa/search?objetos=${modalDetalhe.rastreio||modalDetalhe.tracking}`"
                          target="_blank" rel="noopener" class="btn btn--ghost btn--sm">Correios ↗</a>
                      </div>
                    </div>
                  </div>
                </template>
                <template v-else>
                  <div class="cfg-etapa is-done">
                    <div class="cfg-etapa__left">
                      <div class="cfg-etapa__orb" v-html="etapasTimeline[0].icon"></div>
                      <div class="cfg-etapa__linha cfg-etapa__linha--cancel"></div>
                    </div>
                    <div class="cfg-etapa__body">
                      <div class="cfg-etapa__header">
                        <span class="cfg-etapa__kanji" aria-hidden="true">確</span>
                        <span class="cfg-etapa__nome">Pedido Recebido</span>
                        <span class="cfg-etapa__tag cfg-etapa__tag--done">✓ Recebido</span>
                      </div>
                    </div>
                  </div>
                  <div class="cfg-etapa is-active">
                    <div class="cfg-etapa__left">
                      <div class="cfg-etapa__orb cfg-etapa__orb--cancel">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
                      </div>
                    </div>
                    <div class="cfg-etapa__body">
                      <div class="cfg-etapa__header">
                        <span class="cfg-etapa__kanji" aria-hidden="true">取</span>
                        <span class="cfg-etapa__nome" style="color:var(--red)">Cancelado</span>
                        <span class="cfg-etapa__tag cfg-etapa__tag--cancel">✕ Encerrado</span>
                      </div>
                      <div v-if="modalDetalhe.solicitacaoCancelamento?.motivo" class="cfg-cancel-info">
                        <p class="cfg-field-label">Motivo</p>
                        <p style="font-size:12px;color:var(--text3)">{{ modalDetalhe.solicitacaoCancelamento.motivo }}</p>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </div>

            <div class="cfg-ped-section">
              <p class="cfg-ped-section__titulo">
                <span class="cfg-ped-section__kanji" aria-hidden="true">品</span>
                Itens do Pedido
              </p>
              <div class="cfg-itens">
                <div v-for="item in (modalDetalhe.itens||[])" :key="item._id" class="cfg-item">
                  <div class="cfg-item__img">
                    <img v-if="item.imagem||item.produto?.imagem"
                      :src="item.imagem||item.produto?.imagem"
                      :alt="item.nome||item.produto?.nome" loading="lazy"/>
                  </div>
                  <div class="cfg-item__info">
                    <span class="cfg-item__nome">{{ item.nome||item.produto?.nome }}</span>
                    <span class="cfg-item__qty">Qtd: {{ item.qty||item.quantidade||1 }}</span>
                  </div>
                  <span class="cfg-gold-val">R$ {{ fmt((item.preco||item.produto?.preco||0)*(item.qty||1)) }}</span>
                </div>
              </div>
              <div class="cfg-total-row">
                <span class="cfg-field-label">Total</span>
                <span class="cfg-gold-val" style="font-size:1.15rem">R$ {{ fmt(modalDetalhe.total) }}</span>
              </div>
            </div>

            <div v-if="modalDetalhe.entrega" class="cfg-ped-section">
              <p class="cfg-ped-section__titulo">
                <span class="cfg-ped-section__kanji" aria-hidden="true">住</span>
                Endereço de Entrega
              </p>
              <div class="cfg-endereco">
                <p>{{ modalDetalhe.entrega.endereco }}</p>
                <p>{{ modalDetalhe.entrega.cidade }} — CEP {{ modalDetalhe.entrega.cep }}</p>
              </div>
            </div>

            <div class="cfg-ped-actions">
              <button v-if="podeReembolsar(modalDetalhe)" class="btn btn--danger"
                @click="abrirModalReembolso(modalDetalhe); modalDetalhe=null">
                Solicitar Reembolso
              </button>
              <button v-if="podeCancelar(modalDetalhe)" class="btn btn--ghost"
                @click="abrirModalCancelamento(modalDetalhe)">
                Cancelar Pedido
              </button>
            </div>
          </div>
          <div class="cfg-modal__foot">
            <button class="btn btn--ghost" @click="modalDetalhe=null">Fechar</button>
          </div>
        </div>
      </div>
    </transition>

    <!-- ═══════════════════════════════════════════════════
         MODAL: Reembolso rápido
    ═══════════════════════════════════════════════════ -->
    <transition name="modal-fade">
      <div v-if="modalReembolso" class="cfg-modal-wrap"
        @click.self="modalReembolso=null"
        role="dialog" aria-modal="true" aria-label="Solicitar reembolso">
        <div class="cfg-modal cfg-modal--sm">
          <div class="cfg-modal__topline" aria-hidden="true"></div>
          <div class="cfg-modal__head">
            <h3 class="cfg-modal__titulo">Solicitar Reembolso</h3>
            <button class="cfg-modal__close" @click="modalReembolso=null" aria-label="Fechar">✕</button>
          </div>
          <div class="cfg-modal__body">
            <p class="cfg-field-label" style="margin-bottom:12px">
              Pedido #{{ (modalReembolso?.numero||modalReembolso?._id?.slice(-6))?.toUpperCase() }}
            </p>
            <div class="cfg-campo" style="margin-bottom:14px">
              <label>Motivo</label>
              <select v-model="reembolsoForm.motivo" class="cfg-select cfg-select--line">
                <option value="">Selecionar…</option>
                <option value="produto_danificado">Produto danificado</option>
                <option value="produto_errado">Produto errado</option>
                <option value="nao_chegou">Não chegou</option>
                <option value="nao_gostei">Não era o esperado</option>
                <option value="outro">Outro</option>
              </select>
            </div>
            <div class="cfg-campo">
              <label>Descrição</label>
              <textarea v-model="reembolsoForm.descricao" rows="3" placeholder="Detalhe o problema…"></textarea>
            </div>
            <p v-if="erroReembolso" class="cfg-erro-msg" style="margin-top:10px">{{ erroReembolso }}</p>
          </div>
          <div class="cfg-modal__foot">
            <button class="btn btn--ghost" @click="modalReembolso=null">Cancelar</button>
            <button class="btn btn--gold" @click="enviarReembolsoModal" :disabled="enviandoReembolso">
              <span v-if="enviandoReembolso" class="cfg-spinner"></span>
              Confirmar Solicitação
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- ═══════════════════════════════════════════════════
         MODAL: Confirmação encerrar todas as sessões
    ═══════════════════════════════════════════════════ -->
    <transition name="modal-fade">
      <div v-if="modalEncerrarSessoes" class="cfg-modal-wrap"
        @click.self="modalEncerrarSessoes=false"
        role="dialog" aria-modal="true" aria-label="Encerrar sessões">
        <div class="cfg-modal cfg-modal--sm">
          <div class="cfg-modal__topline cfg-modal__topline--red" aria-hidden="true"></div>
          <div class="cfg-modal__head">
            <h3 class="cfg-modal__titulo">
              <span class="cfg-modal__kanji" aria-hidden="true" style="color:var(--red);opacity:.5">危</span>
              Encerrar Sessões
            </h3>
            <button class="cfg-modal__close" @click="modalEncerrarSessoes=false" aria-label="Fechar">✕</button>
          </div>
          <div class="cfg-modal__body">
            <p class="cfg-hint">
              Todas as sessões ativas — exceto a atual — serão encerradas imediatamente.
              Você precisará fazer login novamente em outros dispositivos.
            </p>
          </div>
          <div class="cfg-modal__foot">
            <button class="btn btn--ghost" @click="modalEncerrarSessoes=false">Cancelar</button>
            <button class="btn btn--danger" @click="encerrarTodas">Confirmar</button>
          </div>
        </div>
      </div>
    </transition>

  </main>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'
import api from '@/api.js'

const auth  = useAuthStore()
const route = useRoute()

// ── Constantes ────────────────────────────────────────
const POR_PAGINA      = 8
const MAX_TENTATIVAS  = 3
const BLOQUEIO_BASE   = 30
const OTP_DURACAO     = 300
const RESEND_COOLDOWN = 60
const PALAVRAS_COMUNS = ['password','123456','senha','qwerty','abc123','letmein','admin','noir']

// ── UI ───────────────────────────────────────────────
const rootRef           = ref(null)
const avatarInput       = ref(null)
const secaoAtiva        = ref('pedidos')
const sidebarOpen       = ref(false)
const salvando          = ref(false)
const temAlteracoes     = ref(false)
const toast             = ref({ msg:'', titulo:'', tipo:'sucesso' })
const anoAtual          = new Date().getFullYear()
let   _toastTimer       = null

// Estado para modais sem prompt()
const modalCancelamento   = ref(null)
const cancelamentoMotivo  = ref('')
const cancelamentoDetalhe = ref('')
const erroCancelamento    = ref('')
const enviandoCancelamento = ref(false)
const modalEncerrarSessoes = ref(false)

const secoes = [
  { id:'pedidos',      num:'一', kanji:'注', label:'Meus Pedidos',  desc:'Acompanhe seus pedidos e entregas',   icon:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>' },
  { id:'reembolsos',   num:'二', kanji:'払', label:'Reembolsos',    desc:'Solicite e acompanhe devoluções',     icon:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.51"/></svg>' },
  { id:'perfil',       num:'三', kanji:'身', label:'Perfil',        desc:'Dados pessoais, endereço e senha',    icon:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>' },
  { id:'notificacoes', num:'四', kanji:'通', label:'Notificações',  desc:'Preferências de comunicação',         icon:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>' },
  { id:'historico',    num:'五', kanji:'歴', label:'Histórico',     desc:'Compras, ações e segurança',          icon:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>' },
]
const secaoAtual = computed(() => secoes.find(s => s.id === secaoAtiva.value))

const isAdmin = computed(() => auth.user?.role === 'admin' || auth.user?.isAdmin === true)

const realmName = computed(() => {
  const map = { escuro:'Celestial', claro:'Autumn', gamer:'Ghost' }
  try { const s = JSON.parse(localStorage.getItem('noir_site') || '{}'); return map[s.tema] || 'Celestial' } catch { return 'Celestial' }
})

const navegar = (id) => { secaoAtiva.value = id; sidebarOpen.value = false; temAlteracoes.value = false }
const marcarAlterado = () => { temAlteracoes.value = true }

const mostrarToast = (titulo, msg = '', tipo = 'sucesso') => {
  clearTimeout(_toastTimer)
  toast.value = { titulo, msg, tipo }
  _toastTimer = setTimeout(() => { toast.value = { msg:'', titulo:'', tipo:'sucesso' } }, 3800)
}

// ── Relógio Brasília ─────────────────────────────────
const brasiliaTime = ref('')
let clockInt = null
const updateClock = () => {
  brasiliaTime.value = new Date().toLocaleTimeString('pt-BR', {
    timeZone:'America/Sao_Paulo', hour:'2-digit', minute:'2-digit', second:'2-digit'
  })
}

// ── Máscaras ─────────────────────────────────────────
const mascaraTel = (v) => {
  const n = v.replace(/\D/g,'').slice(0,11)
  if (n.length <= 10)
    return n.replace(/(\d{2})(\d{4})(\d{0,4})/,'($1) $2-$3').replace(/-$/,'')
  return n.replace(/(\d{2})(\d{5})(\d{0,4})/,'($1) $2-$3').replace(/-$/,'')
}
const mascaraCep = (v) => {
  const n = v.replace(/\D/g,'').slice(0,8)
  return n.length > 5 ? n.replace(/(\d{5})(\d{0,3})/,'$1-$2') : n
}

// ── Busca de CEP (ViaCEP) ────────────────────────────
const buscandoCep = ref(false)
const erroCep     = ref('')
const buscarCep   = async () => {
  const cep = perfil.value.cep.replace(/\D/g,'')
  if (cep.length !== 8) return
  buscandoCep.value = true; erroCep.value = ''
  try {
    const r = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    const d = await r.json()
    if (d.erro) { erroCep.value = 'CEP não encontrado.'; return }
    perfil.value.endereco    = d.logradouro  || perfil.value.endereco
    perfil.value.bairro      = d.bairro      || perfil.value.bairro
    perfil.value.cidade      = d.localidade  || perfil.value.cidade
    perfil.value.uf          = d.uf          || perfil.value.uf
    marcarAlterado()
    mostrarToast('CEP encontrado!', `${d.localidade} — ${d.uf}`, 'sucesso')
  } catch { erroCep.value = 'Erro ao buscar CEP.' }
  finally { buscandoCep.value = false }
}

// ── Upload de avatar ─────────────────────────────────
const triggerAvatarUpload = () => avatarInput.value?.click()
const onAvatarChange = async (e) => {
  const file = e.target.files?.[0]
  if (!file) return
  if (file.size > 2 * 1024 * 1024) { mostrarToast('Arquivo muito grande', 'Máximo 2MB', 'erro'); return }
  const reader = new FileReader()
  reader.onload = async (ev) => {
    const base64 = ev.target.result
    perfil.value.avatar = base64
    marcarAlterado()
    // Opcional: enviar pro servidor imediatamente
    try {
      await api.patch('/usuarios/avatar', { avatar: base64 })
      mostrarToast('Foto atualizada!', '', 'sucesso')
    } catch { /* salva localmente, vai junto no salvar */ }
  }
  reader.readAsDataURL(file)
  e.target.value = ''
}

// ── Helpers ──────────────────────────────────────────
const primeiroNome = computed(() => (auth.user?.nome||'').split(' ')[0])
const inicialNome  = computed(() => (auth.user?.nome||'U').charAt(0).toUpperCase())
const fmt          = (v) => (v||0).toLocaleString('pt-BR', { minimumFractionDigits:2 })
const fmtDate      = (d) => d ? new Date(d).toLocaleDateString('pt-BR', { day:'2-digit', month:'2-digit', year:'2-digit', hour:'2-digit', minute:'2-digit' }) : '—'
const copiar       = (txt) => navigator.clipboard?.writeText(txt).then(() => mostrarToast('Copiado!', '', 'sucesso'))
const statusLabel  = (s) => ({ pendente:'Pendente', confirmado:'Confirmado', preparando:'Em Preparo', aprovado:'Aprovado', enviado:'Enviado', transito:'A Caminho', entregue:'Entregue', cancelado:'Cancelado' })[s] || s || '—'
const statusClass  = (s) => { if(s==='entregue') return 'entregue'; if(['enviado','transito','aprovado'].includes(s)) return 'enviado'; if(s==='cancelado') return 'cancelado'; return 'pendente' }
const motivoLabel  = (m) => ({ produto_danificado:'Produto danificado', produto_errado:'Produto errado', nao_chegou:'Não chegou', nao_gostei:'Não era o esperado', outro:'Outro' })[m] || m
const reembolsoStatusLabel = (s) => ({ pendente:'Aguardando', aprovado:'Aprovado', recusado:'Recusado', processando:'Processando' })[s] || s
const podeReembolsar = (p) => ['entregue','enviado'].includes(p.status) && !p.reembolsoSolicitado
const podeCancelar   = (p) => ['pendente','aprovado'].includes(p.status) && !p.solicitacaoCancelamento?.solicitado

// ── Pedidos ──────────────────────────────────────────
const pedidos        = ref([])
const loadingPedidos = ref(false)
const buscaPedidos   = ref('')
const filtroPedido   = ref('')
const pagPedidos     = ref(1)
const modalDetalhe   = ref(null)

watch([buscaPedidos, filtroPedido], () => { pagPedidos.value = 1 })

const pedidosFiltrados = computed(() => {
  let l = [...pedidos.value]
  if (filtroPedido.value) l = l.filter(p => p.status === filtroPedido.value)
  if (buscaPedidos.value.trim()) {
    const q = buscaPedidos.value.toLowerCase()
    l = l.filter(p => (p._id||'').toLowerCase().includes(q)||(p.numero||'').toLowerCase().includes(q)||(p.status||'').toLowerCase().includes(q))
  }
  return l
})
const totalPagPedidos  = computed(() => Math.max(1, Math.ceil(pedidosFiltrados.value.length / POR_PAGINA)))
const pedidosPaginados = computed(() => { const s=(pagPedidos.value-1)*POR_PAGINA; return pedidosFiltrados.value.slice(s,s+POR_PAGINA) })

const miniStatsPedidos = computed(() => [
  { num:pedidos.value.length, label:'Total de Pedidos', pct:100 },
  { num:pedidos.value.filter(p=>p.status==='entregue').length, label:'Entregues', pct:Math.round((pedidos.value.filter(p=>p.status==='entregue').length/Math.max(pedidos.value.length,1))*100), cor:'#2ecc71' },
  { num:pedidos.value.filter(p=>p.status==='enviado').length, label:'Em Trânsito', pct:60, cor:'#3498db' },
  { num:pedidos.value.filter(p=>p.status==='pendente').length, label:'Pendentes', pct:30, cor:'#f39c12' },
])

const recarregarPedidos = async () => {
  loadingPedidos.value = true
  try { const { data } = await api.get('/pedidos/meus'); pedidos.value = data.pedidos||data||[] }
  catch { pedidos.value = [] }
  finally { loadingPedidos.value = false }
}
const abrirDetalhe = (p) => { modalDetalhe.value = p; nextTick(() => document.querySelector('.cfg-modal__close')?.focus()) }

// ── Histórico ────────────────────────────────────────
const buscaHistorico   = ref('')
const filtroHistStatus = ref('')
const pagHist          = ref(1)
const logConta         = ref([])
const loadingLog       = ref(false)

watch([buscaHistorico, filtroHistStatus], () => { pagHist.value = 1 })

const histFiltrado = computed(() => {
  let l = [...pedidos.value]
  if (filtroHistStatus.value) l = l.filter(p => p.status === filtroHistStatus.value)
  if (buscaHistorico.value.trim()) {
    const q = buscaHistorico.value.toLowerCase()
    l = l.filter(p => (p._id||'').toLowerCase().includes(q)||(p.numero||'').toLowerCase().includes(q)||(p.itens||[]).some(i=>(i.nome||i.produto?.nome||'').toLowerCase().includes(q)))
  }
  return l
})
const totalPagHist = computed(() => Math.max(1, Math.ceil(histFiltrado.value.length / POR_PAGINA)))
const histPaginado = computed(() => { const s=(pagHist.value-1)*POR_PAGINA; return histFiltrado.value.slice(s,s+POR_PAGINA) })

const miniStatsHistorico = computed(() => {
  const total = pedidos.value.reduce((a,p) => a+(p.status!=='cancelado'?(p.total||0):0), 0)
  return [
    { num:pedidos.value.length, label:'Total de Pedidos', pct:100 },
    { num:`R$ ${(total||0).toLocaleString('pt-BR')}`, label:'Total Gasto', pct:80, cor:'#C8A84B' },
    { num:pedidos.value.filter(p=>p.status==='entregue').length, label:'Entregues', pct:70, cor:'#2ecc71' },
    { num:pedidos.value.filter(p=>p.status==='cancelado').length, label:'Cancelados', pct:20, cor:'#e74c3c' },
  ]
})

const carregarLog = async () => {
  loadingLog.value = true
  try { const { data } = await api.get('/usuarios/log'); logConta.value = data.log||data||[] }
  catch { logConta.value = pedidos.value.slice(0,10).map(p => ({ tipo:p.status==='cancelado'?'cancelamento':p.status==='entregue'?'entrega':'pedido', msg:`Pedido #${(p.numero||p._id?.slice(-6))?.toUpperCase()} — ${statusLabel(p.status)}`, criadoEm:p.criadoEm })) }
  finally { loadingLog.value = false }
}
const logIcone = (tipo) => ({ pedido:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/></svg>', entrega:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="20 6 9 17 4 12"/></svg>', cancelamento:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 6L6 18M6 6l12 12"/></svg>', senha:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>', login:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/></svg>', perfil:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>' })[tipo]||''
const logLabel = (tipo) => ({ pedido:'Compra', entrega:'Entrega', cancelamento:'Cancelamento', senha:'Senha', login:'Acesso', perfil:'Perfil' })[tipo]||tipo

// ── Reembolsos ───────────────────────────────────────
const reembolsos        = ref([])
const reembolsoForm     = ref({ pedidoId:'', motivo:'', descricao:'' })
const erroReembolso     = ref('')
const enviandoReembolso = ref(false)
const modalReembolso    = ref(null)
const pedidosElegiveis  = computed(() => pedidos.value.filter(p => podeReembolsar(p)))

const abrirModalReembolso = (p) => { modalReembolso.value = p; reembolsoForm.value = { pedidoId:p._id, motivo:'', descricao:'' }; erroReembolso.value = '' }

const _postReembolso = async () => {
  await api.post('/reembolsos', reembolsoForm.value)
  reembolsoForm.value = { pedidoId:'', motivo:'', descricao:'' }
  mostrarToast('Reembolso solicitado!', 'Você será notificado por e-mail', 'sucesso')
  const { data } = await api.get('/reembolsos/meus')
  reembolsos.value = data.reembolsos||data||[]
}
const enviarReembolso = async () => {
  erroReembolso.value = ''
  if (!reembolsoForm.value.pedidoId) { erroReembolso.value = 'Selecione um pedido.'; return }
  if (!reembolsoForm.value.motivo)   { erroReembolso.value = 'Selecione um motivo.'; return }
  if (!reembolsoForm.value.descricao.trim()) { erroReembolso.value = 'Descreva o problema.'; return }
  enviandoReembolso.value = true
  try { await _postReembolso() } catch(e) { erroReembolso.value = e.response?.data?.msg||'Erro ao enviar.' }
  finally { enviandoReembolso.value = false }
}
const enviarReembolsoModal = async () => {
  erroReembolso.value = ''
  if (!reembolsoForm.value.motivo)           { erroReembolso.value = 'Selecione um motivo.'; return }
  if (!reembolsoForm.value.descricao.trim()) { erroReembolso.value = 'Descreva o problema.'; return }
  enviandoReembolso.value = true
  try { await _postReembolso(); modalReembolso.value = null }
  catch(e) { erroReembolso.value = e.response?.data?.msg||'Erro.' }
  finally { enviandoReembolso.value = false }
}

// ── Cancelamento (modal próprio) ─────────────────────
const abrirModalCancelamento = (p) => {
  modalCancelamento.value = p
  cancelamentoMotivo.value = ''
  cancelamentoDetalhe.value = ''
  erroCancelamento.value = ''
  modalDetalhe.value = null
}
const confirmarCancelamento = async () => {
  if (!cancelamentoMotivo.value) { erroCancelamento.value = 'Selecione um motivo.'; return }
  enviandoCancelamento.value = true
  const motivo = cancelamentoDetalhe.value
    ? `${cancelamentoMotivo.value}: ${cancelamentoDetalhe.value}`
    : cancelamentoMotivo.value
  try {
    await api.post(`/pedidos/${modalCancelamento.value._id}/cancelar`, { motivo })
    await recarregarPedidos()
    modalCancelamento.value = null
    mostrarToast('Cancelamento solicitado', '', 'sucesso')
  } catch(e) {
    erroCancelamento.value = e.response?.data?.msg||'Erro ao cancelar.'
  } finally { enviandoCancelamento.value = false }
}

// ── Perfil ───────────────────────────────────────────
const perfil = ref({
  nome:'', sobrenome:'', email:'', telefone:'', bio:'',
  cep:'', cidade:'', uf:'', bairro:'', endereco:'', numero:'', complemento:'',
  avatar:null
})

// ── Senha — stepper ──────────────────────────────────
const etapasSenha    = [{ id:'verificar', label:'Verificar' }, { id:'confirmar', label:'Confirmar' }, { id:'nova', label:'Nova Senha' }, { id:'concluido', label:'Concluído' }]
const etapaSenha     = ref(0)
const formSenha      = ref({ senhaAtual:'', novaSenha:'', confirmar:'' })
const verSenha       = ref({ atual:false, nova:false, conf:false })
const errosSenha     = ref({ senhaAtual:'', otp:'', novaSenha:'', confirmar:'' })
const salvandoSenha  = ref(false)
const senhaAtualOk   = ref(false)
const confirmOk      = ref(false)
const logSeguranca   = ref([])

// Tentativas / Bloqueio
const tentativas          = ref(0)
const tentativasRestantes = computed(() => MAX_TENTATIVAS - tentativas.value)
const bloqueado           = ref(false)
const bloqueioRestante    = ref(0)
const maxTentativas       = MAX_TENTATIVAS
const bloqueioBase        = BLOQUEIO_BASE
let   bloqueioInt         = null
let   ciclosBloqueio      = 0

const registrarFalha = () => {
  tentativas.value++
  if (tentativas.value % MAX_TENTATIVAS === 0) {
    ciclosBloqueio++
    const tempo = Math.min(BLOQUEIO_BASE * Math.pow(2, ciclosBloqueio-1), 300)
    bloqueado.value = true; bloqueioRestante.value = tempo
    clearInterval(bloqueioInt)
    bloqueioInt = setInterval(() => {
      bloqueioRestante.value--
      if (bloqueioRestante.value <= 0) {
        clearInterval(bloqueioInt)
        bloqueado.value = false
        tentativas.value = 0
        formSenha.value.senhaAtual = ''
      }
    }, 1000)
  }
}

// OTP
const otpDigits = ref(Array(6).fill(''))
const otpRefs   = ref([])

const onOtpInput = (idx, e) => {
  const v = e.target.value.replace(/[^0-9]/g,'').slice(-1)
  otpDigits.value[idx] = v
  if (v && idx < 5) nextTick(() => otpRefs.value[idx+1]?.focus())
  errosSenha.value.otp = ''
}
const onOtpKeydown = (idx, e) => {
  if (e.key==='Backspace' && !otpDigits.value[idx] && idx>0) {
    otpDigits.value[idx-1]=''
    nextTick(() => otpRefs.value[idx-1]?.focus())
  }
}
const onOtpPaste = (e) => {
  const txt = e.clipboardData?.getData('text')?.replace(/[^0-9]/g,'').slice(0,6)
  if (!txt) return; e.preventDefault()
  txt.split('').forEach((c,i) => { otpDigits.value[i] = c })
  nextTick(() => otpRefs.value[Math.min(txt.length,5)]?.focus())
}
const otpValue = computed(() => otpDigits.value.join(''))

// Timer
const timerSecs   = ref(OTP_DURACAO)
const timerOffset = computed(() => { const c=2*Math.PI*36.5; return c*(1-timerSecs.value/OTP_DURACAO) })
const timerFmt    = computed(() => { const m=Math.floor(timerSecs.value/60), s=timerSecs.value%60; return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}` })
let   timerInt    = null
const iniciarTimer = () => {
  timerSecs.value = OTP_DURACAO; clearInterval(timerInt)
  timerInt = setInterval(() => { timerSecs.value--; if(timerSecs.value<=0) clearInterval(timerInt) }, 1000)
}

const resendSecs = ref(0)
let   resendInt  = null
const iniciarResend = () => {
  resendSecs.value = RESEND_COOLDOWN; clearInterval(resendInt)
  resendInt = setInterval(() => { resendSecs.value--; if(resendSecs.value<=0) clearInterval(resendInt) }, 1000)
}
const reenviarOtp = async () => {
  errosSenha.value.otp=''; otpDigits.value=Array(6).fill('')
  iniciarTimer(); iniciarResend()
  try { await api.post('/auth/otp/reenviar') } catch {}
  mostrarToast('Código reenviado', 'Verifique seu e-mail', 'info')
}

const emailMascarado = computed(() => {
  const email = auth.user?.email || ''
  if (!email) return 's****o@email.com'
  const [local, domain] = email.split('@')
  return `${local[0]}****${local.slice(-1)}@${domain}`
})

// Força da senha
const forca = computed(() => {
  const v = formSenha.value.novaSenha; if (!v) return { pct:0, cor:'', label:'' }
  let s = 0
  if (v.length>=12) s++; if (v.length>=16) s++
  if (/[A-Z]/.test(v)) s++; if (/[0-9]/.test(v)) s++
  if (/[^A-Za-z0-9]/.test(v)) s++
  if (!PALAVRAS_COMUNS.some(w=>v.toLowerCase().includes(w))) s++
  return [{ pct:15, cor:'#e74c3c', label:'Muito fraca' },{ pct:35, cor:'#e67e22', label:'Fraca' },{ pct:58, cor:'#f39c12', label:'Média' },{ pct:80, cor:'#27ae60', label:'Forte' },{ pct:100, cor:'#2ecc71', label:'Excelente' }][Math.min(Math.max(s-1,0),4)]
})

const requisitos = computed(() => {
  const v = formSenha.value.novaSenha
  return [
    { id:'len',    label:'12+ caracteres',      met:v.length>=12 },
    { id:'up',     label:'Letra maiúscula',      met:/[A-Z]/.test(v) },
    { id:'num',    label:'Número',               met:/[0-9]/.test(v) },
    { id:'sym',    label:'Símbolo (!@#…)',       met:/[^A-Za-z0-9]/.test(v) },
    { id:'nodict', label:'Sem palavras comuns',  met:v.length>0&&!PALAVRAS_COMUNS.some(w=>v.toLowerCase().includes(w)) },
    { id:'nodiff', label:'Diferente da anterior',met:v.length>=4&&v!==formSenha.value.senhaAtual },
  ]
})
const todosRequisitos = computed(() => requisitos.value.every(r=>r.met))
const checkConfirm = () => {
  const n=formSenha.value.novaSenha, c=formSenha.value.confirmar
  if (!c) { errosSenha.value.confirmar=''; confirmOk.value=false; return }
  if (n!==c) { errosSenha.value.confirmar='As senhas não coincidem.'; confirmOk.value=false }
  else        { errosSenha.value.confirmar=''; confirmOk.value=true }
}
const podeSalvarSenha = computed(() => todosRequisitos.value && formSenha.value.novaSenha===formSenha.value.confirmar && formSenha.value.confirmar.length>0)
const irEtapa  = (n) => { etapaSenha.value = n }
const footerSenha = computed(() => ['Verificando identidade — Etapa 1 de 3','Validando código — Etapa 2 de 3','Definindo nova senha — Etapa 3 de 3','Processo concluído com segurança'][etapaSenha.value]??'')

const step0 = async () => {
  if (bloqueado.value) return
  errosSenha.value.senhaAtual = ''
  if (!formSenha.value.senhaAtual) { errosSenha.value.senhaAtual='Informe sua senha atual.'; return }
  salvandoSenha.value = true
  try {
    await api.post('/auth/otp/solicitar', { senhaAtual:formSenha.value.senhaAtual })
    senhaAtualOk.value = true; irEtapa(1); iniciarTimer(); iniciarResend()
    mostrarToast('Código enviado', 'Verifique seu e-mail', 'sucesso')
  } catch(e) {
    registrarFalha()
    if (bloqueado.value) errosSenha.value.senhaAtual=`Bloqueado por ${bloqueioRestante.value}s.`
    else if (tentativasRestantes.value<=1) errosSenha.value.senhaAtual='Senha incorreta. Última tentativa antes do bloqueio.'
    else errosSenha.value.senhaAtual = e?.response?.data?.msg||'Senha incorreta.'
  } finally { salvandoSenha.value = false }
}
const step1 = async () => {
  errosSenha.value.otp = ''
  if (otpValue.value.length<6) { errosSenha.value.otp='Digite todos os 6 dígitos.'; return }
  if (timerSecs.value<=0) { errosSenha.value.otp='Código expirado. Solicite um novo.'; return }
  salvandoSenha.value = true
  try {
    await api.post('/auth/otp/verificar', { codigo:otpValue.value })
    clearInterval(timerInt); mostrarToast('Código verificado', '', 'sucesso'); irEtapa(2)
  } catch(e) { errosSenha.value.otp = e?.response?.data?.msg||'Código inválido.' }
  finally { salvandoSenha.value = false }
}
const step2 = async () => {
  errosSenha.value.novaSenha=''; errosSenha.value.confirmar=''
  if (!todosRequisitos.value) { errosSenha.value.novaSenha='A senha não atende todos os requisitos.'; return }
  if (formSenha.value.novaSenha!==formSenha.value.confirmar) { errosSenha.value.confirmar='As senhas não coincidem.'; return }
  salvandoSenha.value = true
  try {
    await api.patch('/usuarios/password', { senhaAtual:formSenha.value.senhaAtual, novaSenha:formSenha.value.novaSenha })
    const agora = new Date()
    const f = n=>String(n).padStart(2,'0')
    logSeguranca.value = [
      'Sessão atual mantida ativa',
      'Demais sessões encerradas',
      'Log de segurança atualizado',
      `Alterada em ${f(agora.getDate())}/${f(agora.getMonth()+1)}/${agora.getFullYear()} às ${f(agora.getHours())}:${f(agora.getMinutes())}`,
    ]
    irEtapa(3); mostrarToast('Senha alterada!', 'Sua conta está protegida', 'sucesso')
  } catch(e) { errosSenha.value.novaSenha = e?.response?.data?.msg||'Erro ao salvar.' }
  finally { salvandoSenha.value = false }
}
const resetarSenha = () => {
  etapaSenha.value=0
  formSenha.value={ senhaAtual:'', novaSenha:'', confirmar:'' }
  errosSenha.value={ senhaAtual:'', otp:'', novaSenha:'', confirmar:'' }
  otpDigits.value=Array(6).fill('')
  senhaAtualOk.value=false; confirmOk.value=false
  tentativas.value=0; ciclosBloqueio=0
}

// ── Notificações ─────────────────────────────────────
const notif = ref({ email:{ novidades:true, pedidos:true, vip:true, newsletter:false } })
const togglesEmail = [
  { key:'novidades',  label:'Novidades e lançamentos', desc:'E-mail quando houver novo produto na coleção' },
  { key:'pedidos',    label:'Status de pedidos',       desc:'Atualizações sobre seus pedidos em tempo real' },
  { key:'vip',        label:'Ofertas VIP',             desc:'Promoções exclusivas para membros selecionados' },
  { key:'newsletter', label:'Newsletter semanal',      desc:'Curadoria editorial de novidades toda semana' },
]

// ── Segurança ────────────────────────────────────────
const sessoes = ref([])
const twoFA   = ref(false)

const encerrarSessao = async (id) => {
  try {
    await api.delete(`/usuarios/sessions/${id}`)
    sessoes.value=sessoes.value.filter(s=>s.id!==id)
    mostrarToast('Sessão encerrada', '', 'sucesso')
  } catch { mostrarToast('Erro ao encerrar sessão', '', 'erro') }
}
const confirmarEncerrarTodas = () => { modalEncerrarSessoes.value = true }
const encerrarTodas = async () => {
  try {
    await api.post('/auth/logout-all')
    sessoes.value=sessoes.value.filter(s=>s.atual)
    modalEncerrarSessoes.value = false
    mostrarToast('Sessões encerradas', '', 'sucesso')
  } catch { mostrarToast('Erro', '', 'erro') }
}
const toggle2FA = async () => {
  try {
    const { data } = await api.patch('/usuarios/2fa', { ativo:!twoFA.value })
    twoFA.value=data.twoFA
    mostrarToast(twoFA.value?'2FA ativado':'2FA desativado','','sucesso')
  } catch { mostrarToast('Erro ao alterar 2FA','','erro') }
}
const exportarDados = async () => {
  try {
    // Busca dados completos do servidor antes de exportar
    let dadosServidor = { perfil: perfil.value, pedidos: pedidos.value }
    try {
      const { data } = await api.get('/usuarios/meus-dados')
      dadosServidor = data
    } catch { /* usa dados locais */ }
    const blob = new Blob([JSON.stringify(dadosServidor, null, 2)], { type:'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `noiror-dados-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(a.href)
    mostrarToast('Dados exportados!','', 'sucesso')
  } catch { mostrarToast('Erro ao exportar','','erro') }
}
const confirmarExcluirConta = () => {
  mostrarToast('Entre em contato com o suporte para prosseguir.','support@noiror.com.br','info')
}

// ── Timeline pedido ───────────────────────────────────
const etapasTimeline = [
  { id:'pendente', kanji:'確', label:'Confirmado',  desc:'Pedido recebido e em análise', icon:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="20 6 9 17 4 12"/></svg>' },
  { id:'aprovado', kanji:'準', label:'Em Preparo',  desc:'Separando e embalando seu pedido', icon:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>' },
  { id:'enviado',  kanji:'発', label:'Enviado',     desc:'Partiu em direção ao seu endereço', icon:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1 3h15v13H1z"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>' },
  { id:'transito', kanji:'配', label:'A Caminho',   desc:'Em rota de entrega final', icon:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>' },
  { id:'entregue', kanji:'完', label:'Entregue',    desc:'Bem-vindo ao Atelier Noir & Or', icon:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>' },
]
const etapaIdx = (status) => ({ pendente:0, confirmado:0, aprovado:1, preparando:1, enviado:2, transito:3, entregue:4 })[status]??0

// ── Salvar / Descartar ───────────────────────────────
const salvar = async () => {
  salvando.value = true
  try {
    if (secaoAtiva.value==='perfil') {
      // Valida e-mail não pode ser alterado (apenas verifica nome)
      if (!perfil.value.nome?.trim()) {
        mostrarToast('Nome é obrigatório', '', 'erro')
        salvando.value = false
        return
      }
      await auth.updateProfile({
        nome:perfil.value.nome, sobrenome:perfil.value.sobrenome,
        telefone:perfil.value.telefone, bio:perfil.value.bio,
        cep:perfil.value.cep, cidade:perfil.value.cidade,
        uf:perfil.value.uf, bairro:perfil.value.bairro,
        endereco:perfil.value.endereco, numero:perfil.value.numero,
        complemento:perfil.value.complemento,
        avatar:perfil.value.avatar
      })
      mostrarToast('Perfil atualizado!', '', 'sucesso')
    }
    if (secaoAtiva.value==='notificacoes') {
      await api.patch('/usuarios/notifications',{ notificacoes:notif.value })
      mostrarToast('Notificações salvas!','','sucesso')
    }
    temAlteracoes.value = false
  } catch(e) { mostrarToast(e.response?.data?.msg||'Erro ao salvar','','erro') }
  finally { salvando.value = false }
}
const descartar = () => {
  // Restaura dados do usuário original
  const u = auth.user
  if (u) {
    Object.assign(perfil.value, {
      nome:u.nome||'', sobrenome:u.sobrenome||'', email:u.email,
      telefone:u.telefone||'', bio:u.bio||'',
      cep:u.cep||'', cidade:u.cidade||'', uf:u.uf||'',
      bairro:u.bairro||'', endereco:u.endereco||'',
      numero:u.numero||'', complemento:u.complemento||'',
      avatar:u.avatar||null
    })
  }
  temAlteracoes.value = false
  mostrarToast('Alterações descartadas','','info')
}

// ── Lifecycle ────────────────────────────────────────
onMounted(async () => {
  const q = route.query.secao; if (q) secaoAtiva.value = q
  const u = auth.user
  if (u) {
    Object.assign(perfil.value, {
      nome:u.nome||'', sobrenome:u.sobrenome||'', email:u.email,
      telefone:u.telefone||'', bio:u.bio||'',
      cep:u.cep||'', cidade:u.cidade||'', uf:u.uf||'',
      bairro:u.bairro||'', endereco:u.endereco||'',
      numero:u.numero||'', complemento:u.complemento||'',
      avatar:u.avatar||null
    })
    twoFA.value = u.twoFA || false
  }
  await recarregarPedidos()
  try { const { data } = await api.get('/reembolsos/meus'); reembolsos.value = data.reembolsos||data||[] } catch {}
  try { const { data } = await api.get('/usuarios/sessions'); sessoes.value = data.sessoes||[] } catch {}
  await carregarLog()
  updateClock(); clockInt = setInterval(updateClock, 1000)
})

onUnmounted(() => {
  clearInterval(bloqueioInt); clearInterval(timerInt); clearInterval(resendInt)
  clearInterval(clockInt); clearTimeout(_toastTimer)
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Syne:wght@300;400;600;700&family=DM+Mono:wght@300;400&display=swap');

/* ═══════════════════════════════════════════════════════
   TOKENS
═══════════════════════════════════════════════════════ */
.cfg {
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
  padding-top: var(--navbar-h, 56px);
  background:          var(--void);
  font-family:         'Syne', sans-serif;
  color:               var(--text);
  position:            relative;
  overflow-x:          hidden;
}

/* ═══════════════════════════════════════════════════════
   FUNDO
═══════════════════════════════════════════════════════ */
.cfg-bg { position:fixed; inset:0; z-index:0; pointer-events:none; overflow:hidden; }
.cfg-bg__realm-line {
  position:absolute; top:0; left:0; right:0; height:0.5px;
  background:linear-gradient(90deg,transparent 0%,transparent 6%,var(--or2,rgba(212,175,55,.6)) 20%,var(--or,#C8A84B) 50%,var(--or2,rgba(212,175,55,.6)) 80%,transparent 94%,transparent 100%);
  opacity:.65;
}
.cfg-bg__kanji {
  position:absolute; font-family:'Noto Serif JP','Cormorant Garamond',serif;
  font-weight:200; color:var(--or); pointer-events:none; user-select:none; line-height:1;
}
.cfg-bg__kanji--1 { font-size:clamp(200px,28vw,380px); bottom:-80px; right:-40px; opacity:.022; animation:kDrift1 20s ease-in-out infinite; }
.cfg-bg__kanji--2 { font-size:clamp(120px,16vw,220px); top:40px; left:-30px; opacity:.018; animation:kDrift2 26s ease-in-out infinite; }
.cfg-bg__kanji--3 { font-size:clamp(60px,8vw,100px); top:45%; left:50%; transform:translateX(-50%); opacity:.014; animation:kDrift3 32s ease-in-out infinite; }
.cfg-bg__kanji--4 { font-size:clamp(80px,10vw,140px); bottom:30%; right:20%; opacity:.012; animation:kDrift1 28s ease-in-out infinite reverse; }
@keyframes kDrift1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-18px,24px)} }
@keyframes kDrift2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(22px,-18px)} }
@keyframes kDrift3 { 0%,100%{transform:translateX(-50%) scale(1)} 50%{transform:translateX(-50%) scale(1.08)} }
.cfg-bg__washi {
  position:absolute; inset:0;
  background:
    repeating-linear-gradient(90deg,rgba(255,255,255,.008) 0,rgba(255,255,255,.008) 1px,transparent 1px,transparent 54px),
    repeating-linear-gradient(0deg,rgba(255,255,255,.006) 0,rgba(255,255,255,.006) 1px,transparent 1px,transparent 42px);
}
.cfg-bg__grain {
  position:absolute; inset:0;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.022'/%3E%3C/svg%3E");
  opacity:.55;
}
.cfg-bg__fog { position:absolute; pointer-events:none; border-radius:50%; filter:blur(90px); }
.cfg-bg__fog--1 { width:65vw; height:65vw; bottom:-22vw; left:-12vw; background:radial-gradient(circle,rgba(6,6,13,.9) 0%,transparent 70%); animation:fogD1 22s ease-in-out infinite; }
.cfg-bg__fog--2 { width:44vw; height:44vw; top:-12vw; right:16vw; background:radial-gradient(circle,rgba(200,168,75,.022) 0%,transparent 70%); animation:fogD2 28s ease-in-out infinite; }
@keyframes fogD1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-28px)} }
@keyframes fogD2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(18px,18px)} }
.cfg-bg__scanline { position:absolute; inset:0; background:repeating-linear-gradient(to bottom,transparent 0,transparent 3px,rgba(0,0,0,.028) 3px,rgba(0,0,0,.028) 4px); opacity:.22; }
.cfg-bg__brush { position:absolute; pointer-events:none; }
.cfg-bg__brush--h { top:22%; left:0; width:40%; height:1px; background:linear-gradient(to right,transparent,rgba(200,168,75,.06),transparent); }
.cfg-bg__brush--v { top:0; right:30%; width:1px; height:35%; background:linear-gradient(to bottom,transparent,rgba(200,168,75,.05),transparent); }

/* ═══════════════════════════════════════════════════════
   ORNAMENTO
═══════════════════════════════════════════════════════ */
.cfg-orn { display:flex; align-items:center; gap:10px; padding:8px 16px; }
.cfg-orn--sm { padding:4px 16px; }
.cfg-orn__line { flex:1; height:0.5px; background:linear-gradient(to right,var(--or),transparent); opacity:.18; }
.cfg-orn__line:last-child { background:linear-gradient(to left,var(--or),transparent); }
.cfg-orn__gem  { font-size:5px; color:var(--or); opacity:.38; }
.cfg-orn__kanji { font-family:'Cormorant Garamond',serif; font-size:13px; font-style:italic; color:var(--or); opacity:.22; line-height:1; }

/* ═══════════════════════════════════════════════════════
   ASIDE — mais compacto
═══════════════════════════════════════════════════════ */
.cfg-aside {
  position:sticky; top:0;
  height:100vh;
  padding-top:var(--navbar-h,56px);
  overflow-y:auto; scrollbar-width:none;
  background:linear-gradient(180deg,rgba(6,5,10,.99),rgba(5,4,9,.99));
  border-right:0.5px solid var(--hair);
  display:flex; flex-direction:column;
  z-index:10; position:relative;
}
.cfg-aside::-webkit-scrollbar { display:none; }
.cfg-aside__kamon {
  position:absolute; bottom:80px; right:12px;
  font-family:'Noto Serif JP','Cormorant Garamond',serif;
  font-size:55px; font-weight:200;
  color:var(--or); opacity:.04;
  pointer-events:none; user-select:none; line-height:1; z-index:0;
}
.cfg-aside__topline {
  position:absolute; top:0; left:0; right:0; height:0.5px;
  background:linear-gradient(90deg,transparent,var(--or),transparent);
  opacity:.5; z-index:1;
}

/* Brand — mais compacto */
.cfg-aside__brand {
  padding:16px 16px 10px; position:relative; z-index:1;
}
.cfg-aside__logo { display:inline-flex; align-items:center; gap:8px; text-decoration:none; }
.cfg-aside__logo-mark { font-size:13px; color:var(--or); opacity:.8; }
.cfg-aside__logo-txt { font-family:'Cormorant Garamond',serif; font-size:15px; font-style:italic; letter-spacing:.14em; color:var(--text); }
.cfg-aside__logo-txt em { color:var(--or); font-style:normal; }
.cfg-aside__sub { font-family:'DM Mono',monospace; font-size:7px; letter-spacing:.38em; text-transform:uppercase; color:var(--or); opacity:.35; margin-top:3px; }

/* Perfil — compacto, nome+role+kanji na mesma linha */
.cfg-aside__perfil {
  display:flex; align-items:center; gap:10px;
  padding:10px 16px;
  background:rgba(200,168,75,.025);
  border-top:0.5px solid var(--hair);
  border-bottom:0.5px solid var(--hair);
  position:relative; z-index:1;
}
.cfg-aside__av-wrap { position:relative; flex-shrink:0; }
.cfg-aside__av {
  width:36px; height:36px;
  background:linear-gradient(135deg,var(--or),var(--or2));
  border:1.5px solid rgba(200,168,75,.35);
  display:flex; align-items:center; justify-content:center;
  font-family:'Cormorant Garamond',serif; font-size:14px; font-weight:700;
  color:var(--void); overflow:hidden; flex-shrink:0; position:relative;
  cursor:pointer; transition:border-color .25s;
}
.cfg-aside__av:hover { border-color:var(--or); }
.cfg-aside__av img { width:100%; height:100%; object-fit:cover; display:block; }
.cfg-aside__av-overlay {
  position:absolute; inset:0; background:rgba(6,6,13,.65);
  display:flex; align-items:center; justify-content:center;
  color:var(--or); opacity:0; transition:opacity .25s;
}
.cfg-aside__av:hover .cfg-aside__av-overlay { opacity:1; }

/* Nome + role + kanji — todos na mesma linha */
.cfg-aside__perfil-linha {
  display:flex; align-items:center; gap:6px; flex-wrap:nowrap;
}
.cfg-aside__perfil-nome {
  font-size:11.5px; font-weight:600; color:var(--text);
  white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
  max-width:80px;
}
.cfg-badge-role {
  display:inline-flex; align-items:center; gap:4px;
  font-family:'DM Mono',monospace; font-size:7px; letter-spacing:.2em;
  text-transform:uppercase; color:var(--or); opacity:.65;
  background:rgba(200,168,75,.06); border:0.5px solid var(--hair);
  padding:2px 7px; white-space:nowrap; flex-shrink:0;
}
.cfg-badge-role__gem { font-size:4px; opacity:.8; }
.cfg-badge-role--since { color:var(--text3); opacity:.45; background:transparent; border:none; padding:0; font-size:6.5px; }
.cfg-aside__perfil-kanji {
  font-family:'Cormorant Garamond',serif; font-size:14px; font-style:italic;
  color:var(--or); opacity:.28; flex-shrink:0; line-height:1;
}
.cfg-aside__perfil-email {
  font-family:'DM Mono',monospace; font-size:8px; color:var(--text3);
  letter-spacing:.03em; margin-top:2px;
  white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
  max-width:140px;
}

/* Horário Brasília */
.cfg-aside__clock {
  display:flex; align-items:center; gap:6px;
  padding:7px 16px;
  background:rgba(200,168,75,.02); border-bottom:0.5px solid var(--hair);
  position:relative; z-index:1;
}
.cfg-aside__clock svg    { color:var(--or); opacity:.45; flex-shrink:0; }
.cfg-aside__clock-label  { font-family:'DM Mono',monospace; font-size:7px; letter-spacing:.4em; text-transform:uppercase; color:var(--text3); font-weight:600; }
.cfg-aside__clock-time   { font-family:'DM Mono',monospace; font-size:11px; color:var(--or); margin-left:auto; letter-spacing:.06em; }

/* Navegação — compacta, sem excessos de espaçamento */
.cfg-aside__nav { flex:1; padding:4px 0; position:relative; z-index:1; }
.cfg-aside__nav-label {
  display:flex; align-items:center; gap:7px;
  font-family:'DM Mono',monospace; font-size:7px; letter-spacing:.48em;
  text-transform:uppercase; color:var(--or); opacity:.4;
  padding:7px 16px 4px;
}
.cfg-aside__nav-kanji { font-family:'Cormorant Garamond',serif; font-size:11px; font-style:italic; opacity:.7; letter-spacing:0; }

/* Nav item — compacto */
.cfg-nav-item {
  display:flex; align-items:center; gap:8px;
  padding:7px 16px;
  background:none; border:none; width:100%; text-align:left;
  font-family:'Syne',sans-serif; font-size:11px;
  color:var(--text3); cursor:pointer;
  transition:all .22s var(--ease); position:relative;
}
.cfg-nav-item__blade {
  position:absolute; left:0; top:5px; bottom:5px; width:0.5px;
  background:linear-gradient(to bottom,var(--or),rgba(200,168,75,.3));
  opacity:0; border-radius:0 1px 1px 0; transition:opacity .3s;
}
.cfg-nav-item__num {
  font-family:'Cormorant Garamond',serif; font-size:12px; font-style:italic;
  color:var(--or); opacity:.2; width:14px; text-align:center;
  flex-shrink:0; line-height:1; transition:opacity .22s;
}
.cfg-nav-item__icon { color:inherit; opacity:.4; flex-shrink:0; }
.cfg-nav-item__txt  { flex:1; letter-spacing:.03em; }
.cfg-nav-item__badge {
  background:var(--or); color:var(--void);
  font-family:'DM Mono',monospace; font-size:7px; font-weight:900;
  min-width:15px; height:15px; border-radius:2px;
  display:flex; align-items:center; justify-content:center;
  padding:0 3px; line-height:1;
}
.cfg-nav-item:hover { color:var(--text2); background:rgba(200,168,75,.03); padding-left:20px; }
.cfg-nav-item:hover .cfg-nav-item__blade { opacity:.5; }
.cfg-nav-item:hover .cfg-nav-item__num   { opacity:.42; }
.cfg-nav-item.is-active { color:var(--or); background:rgba(200,168,75,.055); }
.cfg-nav-item.is-active .cfg-nav-item__blade { opacity:1; }
.cfg-nav-item.is-active .cfg-nav-item__num   { opacity:.58; }
.cfg-nav-item.is-active .cfg-nav-item__icon  { opacity:1; }

/* Footer do aside */
.cfg-aside__foot {
  padding:12px 16px 18px; border-top:0.5px solid var(--hair);
  flex-shrink:0; position:relative; z-index:1;
}
.cfg-aside__back {
  display:flex; align-items:center; gap:7px;
  font-family:'DM Mono',monospace; font-size:7.5px; letter-spacing:.26em;
  text-transform:uppercase; color:var(--text3); text-decoration:none;
  transition:color .22s, gap .28s;
}
.cfg-aside__back:hover { color:var(--or); gap:11px; }
.cfg-aside__copy {
  font-family:'DM Mono',monospace; font-size:7px; letter-spacing:.15em;
  color:rgba(200,168,75,.16); margin-top:8px;
}

/* ═══════════════════════════════════════════════════════
   TOPBAR + CONTEÚDO
═══════════════════════════════════════════════════════ */
.cfg-content { display:flex; flex-direction:column; min-height:calc(100vh - var(--navbar-h,56px)); position:relative; z-index:1; }

.cfg-topbar {
  display:flex; align-items:center; gap:14px;
  padding:13px 28px;
  border-bottom:0.5px solid var(--hair);
  position:sticky; top:0; z-index:20;
  background:rgba(6,6,13,.94); backdrop-filter:blur(28px);
}
.cfg-topbar::before {
  content:''; position:absolute; top:0; left:0; right:0; height:0.5px;
  background:linear-gradient(90deg,transparent,var(--or) 30%,transparent 70%);
  opacity:.28;
}
.cfg-topbar__burger { display:none; flex-direction:column; gap:5px; background:none; border:none; cursor:pointer; padding:4px; flex-shrink:0; }
.cfg-topbar__burger span { display:block; width:22px; height:1.5px; background:var(--text2); border-radius:1px; }
.cfg-topbar__heading { flex:1; display:flex; align-items:center; gap:12px; }
.cfg-topbar__kanji { font-family:'Cormorant Garamond',serif; font-size:1.9rem; font-style:italic; color:var(--or); opacity:.14; flex-shrink:0; line-height:1; }
.cfg-topbar__titulo { font-family:'Cormorant Garamond',serif; font-size:clamp(1rem,2vw,1.4rem); font-weight:300; font-style:italic; color:var(--text); margin:0; line-height:1.1; }
.cfg-topbar__desc { font-family:'DM Mono',monospace; font-size:7.5px; letter-spacing:.22em; text-transform:uppercase; color:var(--text3); margin-top:3px; }
.cfg-topbar__right { display:flex; align-items:center; gap:8px; flex-shrink:0; }

.cfg-realm-badge { display:flex; align-items:center; gap:5px; font-family:'DM Mono',monospace; font-size:7px; letter-spacing:.38em; text-transform:uppercase; color:var(--or); opacity:.42; }
.cfg-realm-badge__dot { width:5px; height:5px; border-radius:50%; background:var(--or); opacity:.7; animation:dotPulse 3s ease-in-out infinite; }
@keyframes dotPulse { 0%,100%{box-shadow:0 0 0 0 rgba(200,168,75,0)} 50%{box-shadow:0 0 0 4px rgba(200,168,75,0)} }

/* ═══════════════════════════════════════════════════════
   TOAST
═══════════════════════════════════════════════════════ */
.cfg-toast {
  position:fixed; top:22px; right:22px; z-index:9100;
  display:flex; align-items:flex-start; gap:11px;
  min-width:260px; max-width:320px;
  background:var(--deep); border:0.5px solid var(--hair);
  box-shadow:0 12px 40px rgba(0,0,0,.55);
  padding:12px 12px 12px 12px; overflow:hidden;
}
.cfg-toast::before { content:''; position:absolute; top:0; left:0; right:0; height:0.5px; background:linear-gradient(90deg,transparent,var(--toast-accent,var(--or)),transparent); opacity:.7; }
.cfg-toast--sucesso { --toast-accent:#2ecc71; }
.cfg-toast--erro    { --toast-accent:#e74c3c; }
.cfg-toast--info    { --toast-accent:var(--or); }
.cfg-toast__icon { width:22px; height:22px; flex-shrink:0; border-radius:50%; display:flex; align-items:center; justify-content:center; background:color-mix(in srgb,var(--toast-accent,var(--or)) 15%,transparent); color:var(--toast-accent,var(--or)); }
.cfg-toast__titulo { display:block; font-size:11px; font-weight:600; letter-spacing:.04em; color:var(--text); margin-bottom:2px; }
.cfg-toast__msg    { display:block; font-size:10px; font-weight:300; color:var(--text3); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.cfg-toast__close  { background:none; border:none; color:var(--text4); cursor:pointer; display:flex; align-items:center; justify-content:center; width:18px; height:18px; flex-shrink:0; transition:color .2s; margin-left:auto; }
.cfg-toast__close:hover { color:var(--or); }
.cfg-toast__bar { position:absolute; bottom:0; left:0; height:1px; background:var(--toast-accent,var(--or)); opacity:.5; width:100%; transform-origin:left; animation:toastBar linear 1 forwards; }
@keyframes toastBar { from{transform:scaleX(1)} to{transform:scaleX(0)} }
.toast-slide-enter-active,.toast-slide-leave-active { transition:opacity .3s,transform .3s; }
.toast-slide-enter-from,.toast-slide-leave-to { opacity:0; transform:translateX(14px); }

/* ═══════════════════════════════════════════════════════
   SEÇÃO — menos padding, mais compacta
═══════════════════════════════════════════════════════ */
.cfg-section { padding:20px 28px; display:flex; flex-direction:column; gap:14px; }

/* ═══════════════════════════════════════════════════════
   STATS
═══════════════════════════════════════════════════════ */
.cfg-grid-4 { display:grid; grid-template-columns:repeat(4,1fr); gap:10px; }
.cfg-stat { background:var(--panel); border:0.5px solid var(--hair); padding:14px 16px; position:relative; overflow:hidden; }
.cfg-stat__topline { position:absolute; top:0; left:0; right:0; height:0.5px; background:linear-gradient(90deg,var(--or),transparent); opacity:.18; }
.cfg-stat__num { display:block; font-family:'Cormorant Garamond',serif; font-size:1.6rem; font-weight:300; color:var(--text); line-height:1; margin-bottom:4px; }
.cfg-stat__label { font-family:'DM Mono',monospace; font-size:7px; letter-spacing:.4em; text-transform:uppercase; color:var(--text3); display:block; }
.cfg-stat__bar { position:absolute; bottom:0; left:0; height:2px; background:linear-gradient(to right,var(--or),rgba(200,168,75,.3)); transition:width 1s var(--ease); }

/* ═══════════════════════════════════════════════════════
   TOOLBAR
═══════════════════════════════════════════════════════ */
.cfg-toolbar { display:flex; align-items:center; gap:8px; flex-wrap:wrap; }
.cfg-search {
  display:flex; align-items:center; gap:7px;
  background:rgba(200,168,75,.035); border:0.5px solid var(--hair);
  padding:7px 12px; flex:1; min-width:180px; max-width:340px;
  transition:border-color .2s;
}
.cfg-search:focus-within { border-color:var(--hairH); }
.cfg-search svg { color:var(--or); opacity:.5; flex-shrink:0; }
.cfg-search input { background:none; border:none; outline:none; font-family:'Syne',sans-serif; font-size:12px; color:var(--text); width:100%; caret-color:var(--or); }
.cfg-search input::placeholder { color:var(--text4); }
.cfg-search--sm { max-width:190px; min-width:130px; }
.cfg-search__clear { background:none; border:none; color:var(--text3); cursor:pointer; font-size:10px; transition:color .2s; }
.cfg-search__clear:hover { color:var(--or); }
.cfg-select {
  background:rgba(200,168,75,.035); border:0.5px solid var(--hair);
  padding:7px 26px 7px 11px; color:var(--text2);
  font-family:'Syne',sans-serif; font-size:11px;
  outline:none; cursor:pointer; appearance:none;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='rgba(200,168,75,0.4)' stroke-width='1.5' fill='none'/%3E%3C/svg%3E");
  background-repeat:no-repeat; background-position:right 9px center;
  transition:border-color .2s;
}
.cfg-select:focus { border-color:var(--hairH); }
.cfg-select option { background:var(--deep); }
.cfg-select--line { background:none; border:none; border-bottom:0.5px solid var(--hair); padding:8px 20px 8px 0; border-radius:0; width:100%; }
.cfg-select--sm { max-width:140px; }
.cfg-btn-icon { width:34px; height:34px; background:rgba(200,168,75,.035); border:0.5px solid var(--hair); color:var(--text2); display:flex; align-items:center; justify-content:center; cursor:pointer; transition:all .2s; flex-shrink:0; }
.cfg-btn-icon:hover:not(:disabled) { border-color:var(--hairH); color:var(--or); }
.cfg-btn-icon:disabled { opacity:.3; cursor:not-allowed; }

/* ═══════════════════════════════════════════════════════
   SKELETON
═══════════════════════════════════════════════════════ */
@keyframes skelPulse { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
.cfg-skel-wrap { display:flex; flex-direction:column; gap:8px; padding:12px 18px; }
.cfg-skel-row {
  height:40px;
  background:linear-gradient(90deg,rgba(200,168,75,.04) 0%,rgba(200,168,75,.08) 50%,rgba(200,168,75,.04) 100%);
  background-size:200% 100%; animation:skelPulse 1.6s ease-in-out infinite;
}
.cfg-skel-row--sm { height:28px; }

/* ═══════════════════════════════════════════════════════
   VAZIO
═══════════════════════════════════════════════════════ */
.cfg-vazio { display:flex; flex-direction:column; align-items:center; gap:8px; padding:50px 20px; text-align:center; }
.cfg-vazio__kanji { font-family:'Cormorant Garamond',serif; font-size:3.5rem; font-style:italic; color:var(--or); opacity:.1; }
.cfg-vazio__titulo { font-size:13px; font-weight:600; color:var(--text2); }
.cfg-vazio__sub    { font-size:11px; color:var(--text3); line-height:1.6; }

/* ═══════════════════════════════════════════════════════
   TABELA
═══════════════════════════════════════════════════════ */
.cfg-tbl-head {
  display:grid; grid-template-columns:100px 105px 75px 120px 110px 26px;
  gap:10px; padding:9px 18px; border-bottom:0.5px solid var(--hairH);
}
.cfg-tbl-head span { font-family:'DM Mono',monospace; font-size:7px; letter-spacing:.4em; text-transform:uppercase; color:rgba(200,168,75,.38); }
.cfg-tbl-head--hist { grid-template-columns:85px 95px 1fr 80px 100px 100px 26px; }
.cfg-tbl-row {
  display:grid; grid-template-columns:100px 105px 75px 120px 110px 26px;
  gap:10px; padding:11px 18px; border-bottom:0.5px solid rgba(200,168,75,.04);
  align-items:center; font-size:12px; cursor:pointer; transition:background .18s; position:relative;
}
.cfg-tbl-row::before { content:''; position:absolute; left:0; top:8px; bottom:8px; width:0.5px; background:var(--or); opacity:0; transition:opacity .18s; }
.cfg-tbl-row:hover { background:rgba(200,168,75,.028); }
.cfg-tbl-row:hover::before { opacity:.55; }
.cfg-tbl-row:last-child { border-bottom:none; }
.cfg-tbl-row--hist { grid-template-columns:85px 95px 1fr 80px 100px 100px 26px; }
.cfg-tbl-arr { display:flex; align-items:center; justify-content:flex-end; color:var(--text3); transition:color .18s,transform .18s; }
.cfg-tbl-row:hover .cfg-tbl-arr { color:var(--or); transform:translateX(3px); }

/* Células */
.cfg-mono-id { font-family:'DM Mono',monospace; font-size:10px; font-weight:600; color:var(--or); background:rgba(200,168,75,.07); padding:3px 7px; display:inline-block; white-space:nowrap; }
.cfg-mono-date { font-family:'DM Mono',monospace; font-size:9px; color:var(--text3); white-space:nowrap; }
.cfg-gold-val  { font-family:'Cormorant Garamond',serif; font-size:13.5px; color:var(--text); }
.cfg-badge-count { font-size:7.5px; letter-spacing:.12em; text-transform:uppercase; color:var(--or); background:rgba(200,168,75,.07); border:0.5px solid var(--hair); padding:2px 8px; white-space:nowrap; display:inline-block; }
.cfg-field-label { font-family:'DM Mono',monospace; font-size:7px; letter-spacing:.43em; text-transform:uppercase; color:var(--or); opacity:.58; display:block; }
.cfg-hint { font-size:11px; color:var(--text3); line-height:1.65; }

/* Status */
.cfg-status { display:inline-flex; align-items:center; gap:5px; font-family:'DM Mono',monospace; font-size:7.5px; letter-spacing:.16em; text-transform:uppercase; white-space:nowrap; }
.cfg-status__dot { width:5px; height:5px; border-radius:50%; flex-shrink:0; }
.cfg-status--entregue { color:var(--green); }
.cfg-status--entregue .cfg-status__dot { background:var(--green); box-shadow:0 0 5px rgba(46,204,113,.5); }
.cfg-status--enviado  { color:var(--or); }
.cfg-status--enviado  .cfg-status__dot { background:var(--or); }
.cfg-status--cancelado { color:var(--red); }
.cfg-status--cancelado .cfg-status__dot { background:var(--red); }
.cfg-status--pendente  { color:var(--text3); }
.cfg-status--pendente  .cfg-status__dot { background:var(--text3); }

/* Paginação */
.cfg-pag { display:flex; align-items:center; justify-content:center; gap:12px; padding:14px; border-top:0.5px solid var(--hair); }
.cfg-pag__btn { width:30px; height:30px; background:rgba(200,168,75,.05); border:0.5px solid var(--hair); color:var(--text2); cursor:pointer; transition:all .2s; }
.cfg-pag__btn:hover:not(:disabled) { border-color:var(--hairH); color:var(--or); }
.cfg-pag__btn:disabled { opacity:.3; cursor:not-allowed; }
.cfg-pag__info { font-family:'DM Mono',monospace; font-size:11px; color:var(--text3); letter-spacing:.12em; }

/* ═══════════════════════════════════════════════════════
   CARD — mais compacto
═══════════════════════════════════════════════════════ */
.cfg-card {
  background:var(--panel); border:0.5px solid var(--hair);
  padding:18px 22px; position:relative; overflow:hidden;
}
.cfg-card::after {
  content:''; position:absolute; top:0; left:0; bottom:0; width:0.5px;
  background:linear-gradient(180deg,var(--or),transparent 60%); opacity:.1;
}
.cfg-card__topline { position:absolute; top:0; left:0; right:0; height:0.5px; background:linear-gradient(90deg,var(--or),transparent 50%); opacity:.2; }
.cfg-card__topline--red { background:linear-gradient(90deg,var(--red),transparent 50%); opacity:.5; }
.cfg-card__head {
  display:flex; align-items:center; gap:12px;
  margin-bottom:16px; padding-bottom:12px; border-bottom:0.5px solid var(--hair);
}
.cfg-card__kanji { font-family:'Cormorant Garamond',serif; font-size:1.25rem; font-style:italic; color:var(--or); opacity:.26; flex-shrink:0; line-height:1; }
.cfg-card__kanji--red { color:var(--red); opacity:.48; }
.cfg-card__titulo { font-family:'DM Mono',monospace; font-size:7.5px; font-weight:600; letter-spacing:.32em; text-transform:uppercase; color:var(--text2); margin:0; }
.cfg-card__foot { display:flex; gap:8px; margin-top:14px; padding-top:14px; border-top:0.5px solid var(--hair); }
.cfg-card__foot-info { display:flex; align-items:center; gap:7px; border-top:0.5px solid var(--hair); margin-top:16px; padding-top:12px; }
.cfg-card__foot-info svg  { color:var(--or); opacity:.33; flex-shrink:0; }
.cfg-card__foot-info span { font-family:'DM Mono',monospace; font-size:7.5px; letter-spacing:.16em; color:var(--text4); }
.cfg-card--info   { background:rgba(200,168,75,.016); }
.cfg-card--danger { border-color:rgba(231,76,60,.16); }

/* Grid inputs — compacto */
.cfg-grid-2 { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
.cfg-col-2  { grid-column:span 2; }

/* ═══════════════════════════════════════════════════════
   CAMPOS / INPUTS
═══════════════════════════════════════════════════════ */
.cfg-campo { display:flex; flex-direction:column; gap:6px; }
.cfg-campo label { font-family:'DM Mono',monospace; font-size:7px; letter-spacing:.52em; text-transform:uppercase; color:var(--or); opacity:.58; }
.cfg-campo input,.cfg-campo textarea {
  background:transparent; border:none; border-bottom:0.5px solid var(--hair);
  padding:7px 0; color:var(--text);
  font-family:'Syne',sans-serif; font-size:12.5px; font-weight:300;
  outline:none; resize:none; transition:border-color .28s;
  caret-color:var(--or); width:100%;
}
.cfg-campo input:focus,.cfg-campo textarea:focus { border-bottom-color:var(--or); }
.cfg-campo input:disabled { opacity:.3; cursor:not-allowed; }
.cfg-campo input::placeholder,.cfg-campo textarea::placeholder { color:var(--text4); font-size:11.5px; }

/* CEP row */
.cfg-campo__cep-row { display:flex; align-items:center; gap:8px; border-bottom:0.5px solid var(--hair); }
.cfg-campo__cep-row input { border-bottom:none; padding:7px 0; }
.cfg-cep-spinner { display:flex; align-items:center; }

/* Campo senha */
.cfg-campo--senha label { font-family:'DM Mono',monospace; font-size:7px; letter-spacing:.52em; text-transform:uppercase; color:var(--or); opacity:.58; margin-bottom:6px; display:block; }
.cfg-campo__row {
  display:flex; align-items:center; border-bottom:0.5px solid var(--hair);
  padding-bottom:2px; position:relative; transition:border-color .4s;
}
.cfg-campo__row::after { content:''; position:absolute; bottom:-1px; left:50%; transform:translateX(-50%); width:0; height:1.5px; background:var(--or); transition:width .42s var(--ease); }
.cfg-campo__row:focus-within { border-bottom-color:transparent; }
.cfg-campo__row:focus-within::after { width:100%; }
.cfg-campo__row.is-err { border-bottom-color:rgba(231,76,60,.55) !important; }
.cfg-campo__row.is-err::after { background:transparent !important; }
.cfg-campo__row.is-ok::after { background:var(--green); width:100%; }
.cfg-campo__row input { flex:1; background:transparent; border:none; outline:none; font-family:'Syne',sans-serif; font-size:12.5px; font-weight:300; color:var(--text); padding:7px 0; caret-color:var(--or); }
.cfg-campo__row input::placeholder { color:var(--text4); font-size:11.5px; }
.cfg-campo__row input:disabled { opacity:.35; cursor:not-allowed; }
.cfg-campo__err { font-size:9px; letter-spacing:.06em; color:rgba(231,76,60,.85); background:rgba(231,76,60,.04); border-left:0.5px solid rgba(231,76,60,.4); padding:5px 9px; margin-top:5px; }
.err-slide-enter-active,.err-slide-leave-active { transition:opacity .22s,transform .22s; }
.err-slide-enter-from,.err-slide-leave-to { opacity:0; transform:translateY(-4px); }
.cfg-eye { background:none; border:none; color:var(--text3); cursor:pointer; padding:4px; display:flex; transition:color .2s; }
.cfg-eye:hover { color:var(--or); }
.cfg-erro-msg { font-size:10px; letter-spacing:.05em; color:rgba(231,76,60,.85); background:rgba(231,76,60,.04); border-left:0.5px solid rgba(231,76,60,.4); padding:7px 11px; margin-top:7px; }

/* ═══════════════════════════════════════════════════════
   BOTÕES
═══════════════════════════════════════════════════════ */
.btn {
  display:inline-flex; align-items:center; justify-content:center; gap:6px;
  font-family:'Syne',sans-serif; font-size:7.5px; font-weight:700;
  letter-spacing:.4em; text-transform:uppercase;
  padding:10px 20px; border:none; cursor:pointer;
  transition:all .32s var(--ease); white-space:nowrap;
  position:relative; overflow:hidden; text-decoration:none;
}
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
.cfg-btn-row { display:flex; gap:8px; }
.cfg-spinner { width:10px; height:10px; border:1.5px solid rgba(200,168,75,.2); border-top-color:var(--or); border-radius:50%; animation:spin .7s linear infinite; flex-shrink:0; }
@keyframes spin { to{transform:rotate(360deg)} }

/* ═══════════════════════════════════════════════════════
   STEPPER SENHA — compacto
═══════════════════════════════════════════════════════ */
.cfg-stepper { display:flex; align-items:flex-start; padding:16px 0 20px; }
.cfg-step    { display:flex; flex-direction:column; align-items:center; gap:5px; flex:1; position:relative; }
.cfg-step__linha { position:absolute; top:13px; left:calc(50% + 14px); right:calc(-50% + 14px); height:0.5px; background:var(--hair); transition:background .55s var(--ease); z-index:0; }
.cfg-step.is-done .cfg-step__linha { background:rgba(200,168,75,.42); }
.cfg-step__orb {
  width:26px; height:26px; border:0.5px solid var(--hair);
  display:flex; align-items:center; justify-content:center;
  position:relative; z-index:1; background:var(--deep);
  font-family:'DM Mono',monospace; font-size:8.5px; color:var(--text3);
  transition:all .38s var(--ease);
}
.cfg-step.is-active .cfg-step__orb { border-color:var(--or); color:var(--or); background:rgba(200,168,75,.07); box-shadow:0 0 16px rgba(200,168,75,.16); }
.cfg-step.is-done .cfg-step__orb   { border-color:rgba(200,168,75,.42); background:rgba(200,168,75,.06); color:var(--or); }
.cfg-step__label { font-family:'DM Mono',monospace; font-size:7px; letter-spacing:.28em; text-transform:uppercase; color:var(--text3); text-align:center; transition:color .28s; }
.cfg-step.is-active .cfg-step__label { color:var(--or); }
.cfg-step.is-done   .cfg-step__label { color:rgba(200,168,75,.52); }

/* Panel */
.cfg-panel { display:block; padding-top:2px; }
.panel-fade-enter-active,.panel-fade-leave-active { transition:opacity .28s,transform .28s var(--ease); }
.panel-fade-enter-from { opacity:0; transform:translateY(8px); }
.panel-fade-leave-to   { opacity:0; transform:translateY(-7px); }
.cfg-panel__desc { font-size:11px; color:var(--text3); line-height:1.75; letter-spacing:.03em; margin-bottom:16px; padding-bottom:14px; border-bottom:0.5px solid var(--hair); }
.cfg-panel__desc strong { color:var(--text2); font-weight:600; }

/* Gemas */
.cfg-gemas { display:flex; align-items:center; gap:6px; margin-bottom:13px; padding:9px 12px; background:rgba(200,168,75,.022); border:0.5px solid var(--hair); }
.cfg-gema  { width:8px; height:8px; flex-shrink:0; background:rgba(200,168,75,.52); border-radius:1px; transition:all .28s; }
.cfg-gema.is-usada { background:rgba(231,76,60,.22); }
.cfg-gemas__txt { font-family:'DM Mono',monospace; font-size:7.5px; letter-spacing:.24em; text-transform:uppercase; color:var(--text3); margin-left:3px; }

/* Alerta */
.cfg-alerta { border:0.5px solid var(--hair); padding:11px 13px; margin-bottom:16px; display:flex; align-items:flex-start; gap:10px; background:rgba(200,168,75,.018); transition:border-color .38s,background .38s; }
.cfg-alerta--warn  { border-color:rgba(243,156,18,.28); background:rgba(243,156,18,.035); }
.cfg-alerta--alert { border-color:rgba(231,76,60,.28); background:rgba(231,76,60,.035); animation:alertPulse 2s ease-in-out infinite; }
.cfg-alerta--safe  { border-color:rgba(46,204,113,.18); background:rgba(46,204,113,.018); }
@keyframes alertPulse { 0%,100%{border-color:rgba(231,76,60,.28)} 50%{border-color:rgba(231,76,60,.65)} }
.cfg-alerta__ico { width:26px; height:26px; flex-shrink:0; border:0.5px solid var(--hair); display:flex; align-items:center; justify-content:center; color:var(--text3); transition:all .28s; }
.cfg-alerta--warn  .cfg-alerta__ico { border-color:rgba(243,156,18,.38); color:var(--orange); }
.cfg-alerta--alert .cfg-alerta__ico { border-color:rgba(231,76,60,.38); color:var(--red); }
.cfg-alerta--safe  .cfg-alerta__ico { border-color:rgba(46,204,113,.28); color:var(--green); }
.cfg-alerta__titulo { font-size:10.5px; color:var(--text2); font-weight:500; margin-bottom:2px; }
.cfg-alerta__desc   { font-size:9.5px; color:var(--text3); line-height:1.55; }

/* Força senha */
.cfg-forca { display:flex; align-items:center; gap:10px; margin-top:7px; }
.cfg-forca__bar { flex:1; height:1px; background:var(--hair); position:relative; overflow:hidden; }
.cfg-forca__fill { height:100%; position:absolute; left:0; top:0; transition:width .5s var(--ease),background .38s; }
.cfg-forca__txt { font-family:'DM Mono',monospace; font-size:7.5px; letter-spacing:.22em; text-transform:uppercase; min-width:68px; text-align:right; transition:color .28s; }

/* Requisitos */
.cfg-reqs { display:grid; grid-template-columns:1fr 1fr; gap:6px; background:rgba(200,168,75,.018); border:0.5px solid var(--hair); padding:12px 14px; }
.cfg-req  { display:flex; align-items:center; gap:7px; font-family:'DM Mono',monospace; font-size:7.5px; letter-spacing:.08em; color:var(--text3); transition:color .28s; }
.cfg-req.is-ok { color:var(--green); }
.cfg-req__dot { width:4px; height:4px; border-radius:50%; background:var(--text3); flex-shrink:0; transition:all .28s; }
.cfg-req.is-ok .cfg-req__dot { background:var(--green); box-shadow:0 0 5px rgba(46,204,113,.5); }

/* Timer OTP */
.cfg-timer-wrap { display:flex; flex-direction:column; align-items:center; gap:10px; padding:18px 0 15px; }
.cfg-timer-ring  { position:relative; width:80px; height:80px; display:flex; align-items:center; justify-content:center; }
.cfg-timer-ring svg { position:absolute; inset:0; transform:rotate(-90deg); }
.cfg-timer-ring__bg { fill:none; stroke:var(--hair); stroke-width:1.5; }
.cfg-timer-ring__fg { fill:none; stroke:var(--or); stroke-width:1.5; stroke-linecap:butt; stroke-dasharray:229.3; transition:stroke-dashoffset 1s linear,stroke .38s; }
.cfg-timer-num   { font-family:'DM Mono',monospace; font-size:19px; letter-spacing:.04em; color:var(--or); position:relative; z-index:1; transition:color .28s; }
.cfg-timer-label { font-family:'DM Mono',monospace; font-size:7.5px; letter-spacing:.4em; text-transform:uppercase; color:var(--text3); }

/* OTP inputs */
.cfg-otp-row { display:flex; gap:8px; justify-content:center; margin:6px 0 15px; }
.cfg-otp {
  width:38px; height:46px; background:transparent; border:0.5px solid var(--hair);
  text-align:center; font-family:'DM Mono',monospace; font-size:19px;
  color:var(--or); outline:none; caret-color:var(--or);
  transition:border-color .28s,background .28s;
}
.cfg-otp:focus    { border-color:var(--or); background:rgba(200,168,75,.045); }
.cfg-otp.is-filled { border-color:rgba(200,168,75,.42); }

/* Reenvio OTP */
.cfg-reenvio { display:flex; align-items:center; justify-content:center; gap:7px; margin-top:12px; }
.cfg-reenvio__btn { background:none; border:none; font-family:'DM Mono',monospace; font-size:7.5px; letter-spacing:.26em; text-transform:uppercase; color:rgba(200,168,75,.42); cursor:pointer; transition:color .22s; }
.cfg-reenvio__btn:hover:not(:disabled) { color:var(--or); }
.cfg-reenvio__btn:disabled { opacity:.28; cursor:not-allowed; }
.cfg-reenvio__timer { font-family:'DM Mono',monospace; font-size:7.5px; letter-spacing:.18em; color:var(--text4); }

/* Identidade confirmada */
.cfg-id-confirmed { display:flex; align-items:center; gap:12px; padding:12px 14px; margin-bottom:16px; background:rgba(200,168,75,.018); border:0.5px solid var(--hair); }
.cfg-id-confirmed__ico { width:38px; height:38px; flex-shrink:0; border:0.5px solid rgba(200,168,75,.32); display:flex; align-items:center; justify-content:center; background:rgba(200,168,75,.06); color:var(--or); animation:icoGlow 2.5s ease-in-out infinite; }
@keyframes icoGlow { 0%,100%{box-shadow:0 0 8px rgba(200,168,75,.1)} 50%{box-shadow:0 0 20px rgba(200,168,75,.26)} }
.cfg-id-confirmed__titulo { font-family:'Cormorant Garamond',serif; font-size:1rem; font-style:italic; color:var(--text); margin-bottom:2px; }
.cfg-id-confirmed__sub    { font-size:10px; color:var(--text3); letter-spacing:.03em; }

/* Sucesso senha */
.cfg-sucesso { display:flex; flex-direction:column; align-items:center; gap:12px; padding:12px 0 4px; text-align:center; }
.cfg-sucesso__ico { width:56px; height:56px; border:0.5px solid rgba(46,204,113,.32); display:flex; align-items:center; justify-content:center; background:rgba(46,204,113,.055); color:var(--green); animation:successGlow 2.5s ease-in-out infinite; }
@keyframes successGlow { 0%,100%{box-shadow:0 0 0 rgba(46,204,113,0)} 50%{box-shadow:0 0 20px rgba(46,204,113,.18)} }
.cfg-sucesso__titulo { font-family:'Cormorant Garamond',serif; font-size:1.5rem; font-style:italic; color:var(--text); }
.cfg-sucesso__sub    { font-size:11px; color:var(--text3); line-height:1.72; max-width:290px; letter-spacing:.03em; }
.cfg-sec-log { width:100%; background:rgba(200,168,75,.018); border:0.5px solid var(--hair); padding:12px 14px; text-align:left; margin-top:2px; }
.cfg-sec-log__item { display:flex; align-items:center; gap:9px; font-family:'DM Mono',monospace; font-size:8.5px; letter-spacing:.12em; color:var(--text3); margin-bottom:6px; }
.cfg-sec-log__item:last-child { margin-bottom:0; }
.cfg-sec-log__dot  { width:4px; height:4px; border-radius:50%; background:var(--or); opacity:.48; flex-shrink:0; }

/* ═══════════════════════════════════════════════════════
   NOTIFICAÇÕES
═══════════════════════════════════════════════════════ */
.cfg-toggle-list { display:flex; flex-direction:column; }
.cfg-toggle-row { display:flex; justify-content:space-between; align-items:center; padding:12px 0; border-bottom:0.5px solid var(--hair); }
.cfg-toggle-row:hover { background:rgba(200,168,75,.012); }
.cfg-toggle-row:last-child { border-bottom:none; }
.cfg-toggle-row__label { font-size:12.5px; color:var(--text2); margin-bottom:2px; }
.cfg-toggle-row__desc  { font-size:10px; color:var(--text3); line-height:1.55; }
.cfg-toggle { position:relative; width:44px; height:24px; background:none; border:0.5px solid var(--hair); cursor:pointer; flex-shrink:0; transition:border-color .28s; }
.cfg-toggle.is-on { border-color:var(--hairH); }
.cfg-toggle__track { position:absolute; inset:0; background:transparent; transition:background .32s; }
.cfg-toggle.is-on .cfg-toggle__track { background:rgba(200,168,75,.1); }
.cfg-toggle__thumb { position:absolute; top:3px; left:3px; width:16px; height:16px; background:rgba(237,232,224,.16); transition:transform .32s var(--ease),background .22s; }
.cfg-toggle.is-on .cfg-toggle__thumb { transform:translateX(20px); background:var(--or); box-shadow:0 0 9px rgba(200,168,75,.42); }

/* ═══════════════════════════════════════════════════════
   HISTÓRICO — LOG, SESSÕES, 2FA
═══════════════════════════════════════════════════════ */
.cfg-hist-tools { display:flex; align-items:center; gap:7px; margin-left:auto; flex-wrap:wrap; }
.cfg-hist-prod  { display:flex; flex-direction:column; gap:2px; }
.cfg-hist-prod__nome { font-size:10px; color:var(--text3); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:170px; }
.cfg-log { display:flex; flex-direction:column; }
.cfg-log-item { display:flex; align-items:center; gap:10px; padding:11px 18px; border-bottom:0.5px solid var(--hair); transition:background .18s; }
.cfg-log-item:hover { background:rgba(200,168,75,.018); }
.cfg-log-item:last-child { border-bottom:none; }
.cfg-log-item__ico { width:28px; height:28px; border:0.5px solid var(--hair); display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.cfg-log-item__ico--pedido       { color:var(--or); }
.cfg-log-item__ico--entrega      { color:var(--green); border-color:rgba(46,204,113,.2); }
.cfg-log-item__ico--cancelamento { color:var(--red); border-color:rgba(231,76,60,.2); }
.cfg-log-item__ico--senha        { color:var(--blue); border-color:rgba(52,152,219,.2); }
.cfg-log-item__ico--login        { color:var(--text2); }
.cfg-log-item__ico--perfil       { color:var(--text2); }
.cfg-log-item__body { flex:1; min-width:0; }
.cfg-log-item__msg  { font-size:11.5px; color:var(--text2); line-height:1.5; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.cfg-log-badge { font-family:'DM Mono',monospace; font-size:7px; letter-spacing:.18em; text-transform:uppercase; padding:3px 8px; border:0.5px solid; white-space:nowrap; }
.cfg-log-badge--pedido       { color:var(--or); border-color:var(--hair); }
.cfg-log-badge--entrega      { color:var(--green); border-color:rgba(46,204,113,.22); }
.cfg-log-badge--cancelamento { color:var(--red); border-color:rgba(231,76,60,.22); }
.cfg-log-badge--senha        { color:var(--blue); border-color:rgba(52,152,219,.22); }
.cfg-log-badge--login        { color:var(--text3); border-color:var(--hair); }
.cfg-log-badge--perfil       { color:var(--text3); border-color:var(--hair); }
.cfg-sessao { display:flex; align-items:center; gap:10px; padding:11px 0; border-bottom:0.5px solid var(--hair); }
.cfg-sessao:last-child { border-bottom:none; }
.cfg-sessao__ico  { width:30px; height:30px; border:0.5px solid var(--hair); display:flex; align-items:center; justify-content:center; color:var(--or); opacity:.48; flex-shrink:0; }
.cfg-sessao__nome { font-size:12px; color:var(--text2); font-weight:500; }
.cfg-sessao__info { flex:1; }
.cfg-2fa-status { display:inline-flex; align-items:center; gap:7px; font-family:'DM Mono',monospace; font-size:8.5px; letter-spacing:.2em; text-transform:uppercase; color:var(--text3); margin-bottom:6px; }
.cfg-2fa-status.is-on { color:var(--green); }
.cfg-2fa-status__dot  { width:5px; height:5px; border-radius:50%; background:var(--text3); transition:background .28s; }
.cfg-2fa-status.is-on .cfg-2fa-status__dot { background:var(--green); box-shadow:0 0 7px rgba(46,204,113,.5); }

/* ═══════════════════════════════════════════════════════
   REEMBOLSO
═══════════════════════════════════════════════════════ */
.cfg-reimb-item { display:flex; align-items:center; justify-content:space-between; padding:11px 0; border-bottom:0.5px solid var(--hair); }
.cfg-reimb-item:last-child { border-bottom:none; }
.cfg-reimb-item__info { display:flex; flex-direction:column; gap:2px; }
.cfg-reimb-item__nome   { font-size:11.5px; color:var(--text2); font-weight:500; }
.cfg-reimb-item__motivo { font-size:10px; color:var(--text3); }
.cfg-reimb-status { font-family:'DM Mono',monospace; font-size:7px; letter-spacing:.25em; text-transform:uppercase; padding:3px 9px; border:0.5px solid; }
.cfg-reimb-status--pendente    { color:var(--text3); border-color:var(--hair); }
.cfg-reimb-status--aprovado    { color:var(--green); border-color:rgba(46,204,113,.28); }
.cfg-reimb-status--recusado    { color:var(--red);   border-color:rgba(231,76,60,.28); }
.cfg-reimb-status--processando { color:var(--or);   border-color:var(--hairH); }
.cfg-policy-list { list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:8px; }
.cfg-policy-list li { display:flex; align-items:flex-start; gap:9px; font-size:11.5px; color:var(--text3); line-height:1.65; }
.cfg-policy-gem { font-size:5px; color:var(--or); opacity:.58; margin-top:5px; flex-shrink:0; }
.cfg-policy-list strong { color:var(--text2); font-weight:600; }

/* ═══════════════════════════════════════════════════════
   PERFIL HERO — com upload melhorado
═══════════════════════════════════════════════════════ */
.cfg-perfil-hero {
  display:flex; align-items:center; gap:18px;
  padding:22px 24px; border:0.5px solid var(--hair);
  background:linear-gradient(135deg,var(--panel),rgba(10,9,3,.96));
  position:relative; overflow:hidden;
}
.cfg-perfil-hero::before {
  content:''; position:absolute; inset:0;
  background:radial-gradient(ellipse at 70% 50%,rgba(200,168,75,.055),transparent 65%);
  pointer-events:none;
}
.cfg-perfil-hero__av-wrap { display:flex; flex-direction:column; align-items:center; gap:4px; flex-shrink:0; position:relative; z-index:1; }
.cfg-perfil-hero__av {
  width:58px; height:58px;
  background:linear-gradient(135deg,var(--or),var(--or2));
  border:1.5px solid rgba(200,168,75,.35);
  display:flex; align-items:center; justify-content:center;
  font-family:'Cormorant Garamond',serif; font-size:1.5rem;
  color:var(--void); overflow:hidden; position:relative;
  cursor:pointer; transition:border-color .25s;
}
.cfg-perfil-hero__av:hover { border-color:var(--or); }
.cfg-perfil-hero__av img { width:100%; height:100%; object-fit:cover; }
.cfg-perfil-hero__av-overlay {
  position:absolute; inset:0; background:rgba(6,6,13,.7);
  display:flex; flex-direction:column; align-items:center; justify-content:center; gap:3px;
  color:var(--or); opacity:0; transition:opacity .25s;
  font-family:'DM Mono',monospace; font-size:6px; letter-spacing:.2em; text-transform:uppercase;
}
.cfg-perfil-hero__av:hover .cfg-perfil-hero__av-overlay { opacity:1; }
.cfg-perfil-hero__av-hint { font-family:'DM Mono',monospace; font-size:7px; letter-spacing:.18em; text-transform:uppercase; color:var(--or); opacity:.28; white-space:nowrap; }
.cfg-perfil-hero__info { position:relative; z-index:1; flex:1; min-width:0; }
.cfg-perfil-hero__nome { font-family:'Cormorant Garamond',serif; font-size:clamp(1.1rem,2vw,1.55rem); font-weight:300; color:var(--text); margin:0 0 3px; line-height:1.1; }
.cfg-perfil-hero__email { font-family:'DM Mono',monospace; font-size:10px; color:var(--text3); letter-spacing:.05em; margin-bottom:6px; }
.cfg-perfil-hero__badges { display:flex; align-items:center; gap:6px; flex-wrap:wrap; }
.cfg-perfil-hero__orn { position:absolute; right:20px; top:50%; transform:translateY(-50%); z-index:0; pointer-events:none; }
.cfg-perfil-hero__kanji { font-family:'Cormorant Garamond',serif; font-size:3.8rem; font-style:italic; color:var(--or); opacity:.045; line-height:1; }

/* ═══════════════════════════════════════════════════════
   MODAL
═══════════════════════════════════════════════════════ */
.cfg-modal-wrap {
  position:fixed; inset:0; z-index:9200;
  background:rgba(5,5,9,.92); backdrop-filter:blur(22px);
  display:flex; align-items:center; justify-content:center; padding:20px;
}
.cfg-modal { background:linear-gradient(135deg,rgba(10,8,2,.99),rgba(7,6,1,.99)); border:0.5px solid var(--hair); max-width:680px; width:100%; max-height:90vh; overflow-y:auto; position:relative; }
.cfg-modal--xl { max-width:760px; }
.cfg-modal--sm { max-width:440px; }
.cfg-modal__topline { position:absolute; top:0; left:0; right:0; height:0.5px; background:linear-gradient(90deg,transparent,var(--or),transparent); opacity:.42; }
.cfg-modal__topline--red { background:linear-gradient(90deg,transparent,var(--red),transparent); opacity:.5; }
.cfg-modal__head { display:flex; justify-content:space-between; align-items:center; padding:16px 22px; border-bottom:0.5px solid var(--hair); }
.cfg-modal__titulo { font-family:'Cormorant Garamond',serif; font-size:1.25rem; font-weight:300; color:var(--text); margin:0; display:flex; align-items:center; gap:9px; }
.cfg-modal__kanji  { font-style:italic; color:var(--or); opacity:.38; }
.cfg-modal__close  { background:none; border:0.5px solid var(--hair); width:26px; height:26px; color:var(--text3); display:flex; align-items:center; justify-content:center; cursor:pointer; transition:all .28s; font-size:11px; }
.cfg-modal__close:hover { border-color:var(--or); color:var(--or); transform:rotate(90deg); }
.cfg-modal__body { padding:20px 22px; display:flex; flex-direction:column; gap:18px; }
.cfg-modal__foot { padding:14px 22px; border-top:0.5px solid var(--hair); display:flex; justify-content:flex-end; gap:8px; }

/* Ped hero modal */
.cfg-ped-hero { display:flex; align-items:center; gap:18px; padding:14px 17px; background:rgba(200,168,75,.018); border:0.5px solid var(--hair); flex-wrap:wrap; }
.cfg-ped-hero__badge { display:inline-flex; align-items:center; gap:6px; padding:6px 12px; border:0.5px solid; font-family:'DM Mono',monospace; font-size:8.5px; font-weight:700; letter-spacing:.2em; text-transform:uppercase; }
.cfg-ped-hero__badge--entregue { color:var(--green); border-color:rgba(46,204,113,.28); background:rgba(46,204,113,.055); }
.cfg-ped-hero__badge--enviado  { color:var(--or); border-color:var(--hairH); background:rgba(200,168,75,.055); }
.cfg-ped-hero__badge--cancelado{ color:var(--red); border-color:rgba(231,76,60,.28); background:rgba(231,76,60,.045); }
.cfg-ped-hero__badge--pendente { color:var(--text3); border-color:var(--hair); }
.cfg-ped-hero__meta { display:flex; flex-direction:column; gap:2px; }

/* Timeline */
.cfg-ped-section { display:flex; flex-direction:column; gap:12px; }
.cfg-ped-section__titulo { display:flex; align-items:center; gap:9px; margin:0; font-family:'DM Mono',monospace; font-size:7.5px; letter-spacing:.38em; text-transform:uppercase; color:rgba(200,168,75,.48); }
.cfg-ped-section__kanji { font-family:'Cormorant Garamond',serif; font-size:1.1rem; font-style:italic; color:var(--or); opacity:.32; letter-spacing:0; }
.cfg-timeline { display:flex; flex-direction:column; }
.cfg-etapa    { display:flex; gap:12px; align-items:flex-start; }
.cfg-etapa__left { display:flex; flex-direction:column; align-items:center; flex-shrink:0; }
.cfg-etapa__orb { width:32px; height:32px; border:0.5px solid var(--hair); display:flex; align-items:center; justify-content:center; background:rgba(8,7,14,.95); color:var(--text3); position:relative; z-index:1; flex-shrink:0; transition:all .32s; }
.cfg-etapa__orb--cancel { border-color:rgba(231,76,60,.28); color:var(--red); background:rgba(231,76,60,.055); }
.cfg-etapa__linha { width:0.5px; flex:1; min-height:16px; background:linear-gradient(to bottom,rgba(200,168,75,.18),rgba(200,168,75,.04)); margin:3px 0; }
.cfg-etapa__linha--cancel { background:linear-gradient(to bottom,rgba(231,76,60,.18),rgba(231,76,60,.04)); }
.cfg-etapa.is-done .cfg-etapa__orb { background:rgba(200,168,75,.07); color:var(--or); border-color:rgba(200,168,75,.38); }
.cfg-etapa.is-active .cfg-etapa__orb { background:rgba(200,168,75,.055); color:var(--or); border-color:var(--or); animation:etapaGlow 2s ease-in-out infinite; }
.cfg-etapa.is-future .cfg-etapa__orb { opacity:.32; }
@keyframes etapaGlow { 0%,100%{box-shadow:0 0 10px rgba(200,168,75,.1)} 50%{box-shadow:0 0 20px rgba(200,168,75,.28)} }
.cfg-etapa__body { padding:3px 0 16px; flex:1; min-width:0; }
.cfg-etapa__header { display:flex; align-items:center; gap:8px; flex-wrap:wrap; margin-bottom:3px; }
.cfg-etapa__kanji { font-family:'Cormorant Garamond',serif; font-size:9.5px; font-style:italic; color:var(--or); opacity:.26; letter-spacing:.12em; }
.cfg-etapa.is-active .cfg-etapa__kanji,.cfg-etapa.is-done .cfg-etapa__kanji { opacity:.52; }
.cfg-etapa__nome { font-size:11px; font-weight:600; letter-spacing:.06em; text-transform:uppercase; color:var(--text3); }
.cfg-etapa.is-active .cfg-etapa__nome { color:var(--or); }
.cfg-etapa.is-done .cfg-etapa__nome   { color:var(--text2); }
.cfg-etapa__desc { font-size:10.5px; color:var(--text3); line-height:1.5; }
.cfg-etapa__tag { font-family:'DM Mono',monospace; font-size:6.5px; letter-spacing:.2em; text-transform:uppercase; padding:2px 8px; border:0.5px solid; }
.cfg-etapa__tag--active { color:var(--or);   border-color:var(--hairH); background:rgba(200,168,75,.065); }
.cfg-etapa__tag--done   { color:var(--green); border-color:rgba(46,204,113,.22); }
.cfg-etapa__tag--future { color:var(--text3); border-color:var(--hair); }
.cfg-etapa__tag--cancel { color:var(--red);   border-color:rgba(231,76,60,.22); }
.cfg-rastreio { display:flex; align-items:center; gap:7px; flex-wrap:wrap; margin-top:7px; padding:8px 11px; background:rgba(200,168,75,.018); border:0.5px solid var(--hair); }
.cfg-cancel-info { margin-top:9px; padding:9px 11px; background:rgba(231,76,60,.035); border:0.5px solid rgba(231,76,60,.14); }
.cfg-itens { display:flex; flex-direction:column; }
.cfg-item  { display:flex; align-items:center; gap:11px; padding:9px 0; border-bottom:0.5px solid var(--hair); }
.cfg-item:last-child { border-bottom:none; }
.cfg-item__img { width:40px; height:40px; border:0.5px solid var(--hair); background:rgba(200,168,75,.028); overflow:hidden; flex-shrink:0; display:flex; align-items:center; justify-content:center; }
.cfg-item__img img { width:100%; height:100%; object-fit:cover; }
.cfg-item__info { flex:1; min-width:0; }
.cfg-item__nome { display:block; font-size:11.5px; color:var(--text2); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.cfg-item__qty  { font-family:'DM Mono',monospace; font-size:9px; color:var(--text3); margin-top:2px; display:block; }
.cfg-total-row  { display:flex; justify-content:space-between; align-items:center; padding:12px 0 0; border-top:0.5px solid var(--hair); margin-top:3px; }
.cfg-endereco   { padding:11px 14px; background:rgba(200,168,75,.018); border:0.5px solid var(--hair); }
.cfg-endereco p { font-size:11.5px; color:var(--text2); line-height:1.65; margin:0; }
.cfg-ped-actions { display:flex; gap:8px; flex-wrap:wrap; }

/* Modal fade */
.modal-fade-enter-active,.modal-fade-leave-active { transition:opacity .28s; }
.modal-fade-enter-from,.modal-fade-leave-to { opacity:0; }

/* ═══════════════════════════════════════════════════════
   OVERLAY MOBILE
═══════════════════════════════════════════════════════ */
.cfg-overlay { position:fixed; inset:0; background:rgba(0,0,0,.78); backdrop-filter:blur(8px); z-index:9; }
.overlay-fade-enter-active,.overlay-fade-leave-active { transition:opacity .28s; }
.overlay-fade-enter-from,.overlay-fade-leave-to { opacity:0; }

/* ═══════════════════════════════════════════════════════
   RESPONSIVO
═══════════════════════════════════════════════════════ */
@media (max-width:1200px) {
  .cfg { grid-template-columns:200px 1fr; }
  .cfg-grid-4 { grid-template-columns:repeat(2,1fr); }
}
@media (max-width:900px) {
  .cfg { grid-template-columns:1fr; }
  .cfg-aside {
    position:fixed; left:0; top:0; bottom:0; z-index:100;
    width:270px; transform:translateX(-100%);
    transition:transform .45s var(--ease); height:100vh;
  }
  .cfg.sidebar-open .cfg-aside { transform:translateX(0); }
  .cfg-topbar__burger { display:flex; }
  .cfg-topbar  { padding:12px 16px; }
  .cfg-section { padding:16px 16px; }
  .cfg-grid-2  { grid-template-columns:1fr; }
  .cfg-col-2   { grid-column:auto; }
  .cfg-grid-4  { grid-template-columns:1fr 1fr; }
  .cfg-tbl-head { grid-template-columns:85px 1fr 85px 22px; }
  .cfg-tbl-head span:nth-child(3),.cfg-tbl-head span:nth-child(4),.cfg-tbl-head span:nth-child(5) { display:none; }
  .cfg-tbl-row { grid-template-columns:85px 1fr 85px 22px; }
  .cfg-tbl-row > :nth-child(3),.cfg-tbl-row > :nth-child(4),.cfg-tbl-row > :nth-child(5) { display:none; }
  .cfg-tbl-head--hist,.cfg-tbl-row--hist { grid-template-columns:85px 1fr 85px 22px; }
  .cfg-reqs { grid-template-columns:1fr; }
  .cfg-otp { width:34px; height:42px; font-size:17px; }
  .cfg-otp-row { gap:6px; }
  .cfg-bg__kanji--1 { display:none; }
  .cfg-realm-badge  { display:none; }
}
@media (max-width:500px) {
  .cfg-topbar__right .btn--ghost { display:none; }
  .cfg-otp { width:28px; height:36px; font-size:15px; }
  .cfg-otp-row { gap:4px; }
  .cfg-btn-row { flex-direction:column; }
  .cfg-perfil-hero { flex-direction:column; text-align:center; }
  .cfg-perfil-hero__orn { display:none; }
  .cfg-grid-4 { grid-template-columns:1fr; }
  .cfg-aside__perfil-nome { max-width:60px; }
}

@media (prefers-reduced-motion:reduce) {
  .cfg-gema,.cfg-bg__kanji--1,.cfg-bg__kanji--2,.cfg-bg__kanji--3,.cfg-bg__fog--1,.cfg-bg__fog--2,
  .cfg-alerta--alert,.cfg-sucesso__ico,.cfg-id-confirmed__ico,.cfg-etapa.is-active .cfg-etapa__orb { animation:none !important; }
}
</style>