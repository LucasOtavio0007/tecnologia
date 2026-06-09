<template>
  <div class="home" :class="`realm--${site.tema}`" :style="realmVars">

    <!-- ══ BANNER ══ -->
    <Banner />

    <!-- ══ GRADIENT BRIDGE ══ -->
    <div class="hero-bridge" aria-hidden="true">
      <div class="bridge__ornament">
        <span class="bridge__line"></span>
        <span class="bridge__gem">◆</span>
        <span class="bridge__line bridge__line--r"></span>
      </div>
    </div>

    <!-- ══ 01 — PILARES ══ -->
    <section class="sec sec--pillars" data-reveal>
      <div class="sec__grid-bg" aria-hidden="true"></div>
      <div class="wrap">
        <header class="sec__head">
          <div class="sec__kicker">
            <span class="sec__num" aria-hidden="true">01</span>
            <div class="kicker__line" aria-hidden="true"></div>
          </div>
          <div class="sec__titles">
            <span class="eyebrow">Total Commitment</span>
            <h2 class="heading">Uma experiência <em>incomparável</em></h2>
          </div>
        </header>
        <div class="pillars">
          <article
            v-for="(p, i) in pillars"
            :key="i"
            class="pillar"
            :style="{ '--i': i }"
            @mouseenter="animatePillarIcon(i)"
          >
            <div class="pillar__glow" aria-hidden="true"></div>
            <div class="pillar__kanji" aria-hidden="true">{{ p.kanji }}</div>
            <div class="pillar__index" aria-hidden="true">
              <span class="pillar__index-num">{{ String(i+1).padStart(2,'0') }}</span>
            </div>
            <div class="pillar__icon" :ref="el => pillarIconRefs[i] = el" v-html="p.icon" aria-hidden="true"></div>
            <h3 class="pillar__title">{{ p.title }}</h3>
            <p class="pillar__desc">{{ p.desc }}</p>
            <div class="pillar__line" aria-hidden="true"></div>
            <div class="pillar__corner pillar__corner--tl" aria-hidden="true"></div>
            <div class="pillar__corner pillar__corner--br" aria-hidden="true"></div>
          </article>
        </div>
      </div>
    </section>

    <!-- ══ 02 — TICKER ══ -->
    <div class="home-ticker" aria-hidden="true" :class="`ticker--${site.tema}`">
      <div class="ticker__track" :style="{ animationDuration: tickerSpeed }">
        <span v-for="n in 3" :key="n" class="ticker__set">
          <template v-for="(item, idx) in tickerItems" :key="idx">
            <span class="ticker__item">{{ item }}</span>
            <span class="ticker__sep">{{ tickerSep }}</span>
          </template>
        </span>
      </div>
    </div>

    <!-- ══ 03 — MANIFESTO ══ -->
    <section class="sec sec--manifesto" data-reveal>
      <div class="manifesto__bg-text" aria-hidden="true">{{ manifestoBgText }}</div>
      <div class="manifesto__brush" aria-hidden="true"></div>
      <div class="wrap">
        <div class="manifesto">
          <div class="manifesto__left">
            <div class="sec__kicker">
              <span class="sec__num" aria-hidden="true">03</span>
              <div class="kicker__line" aria-hidden="true"></div>
            </div>
            <span class="eyebrow">Nossa essência</span>
            <h2 class="manifesto__headline">
              <span class="mh__light">Tecnologia</span>
              <span class="mh__script">e Imortal</span>
            </h2>
            <div class="manifesto__stats" ref="statsRef">
              <div v-for="s in stats" :key="s.key" class="mstat">
                <span class="mstat__num">
                  <span class="mstat__counter" :data-target="s.raw" :data-suffix="s.suffix">{{ s.display }}</span>
                </span>
                <span class="mstat__lbl">{{ s.lbl }}</span>
              </div>
            </div>
          </div>
          <div class="manifesto__right">
            <div class="manifesto__frame" aria-hidden="true">
              <span class="mf__corner mf__corner--tl"></span>
              <span class="mf__corner mf__corner--tr"></span>
              <span class="mf__corner mf__corner--bl"></span>
              <span class="mf__corner mf__corner--br"></span>
            </div>
            <p class="manifesto__lead">Dispositivos de elite revestidos com metais nobres e engenharia de precisão.</p>
            <p class="manifesto__body">Curadoria rigorosa de hardware premium — cada peça é uma fusão entre o poder do silício e a perenidade do metal nobre. Um objeto que atravessa gerações.</p>
            <router-link to="/sobre" class="manifesto__link">
              Conhecer o Atelier
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M5 12h14M12.5 5l7 7-7 7"/></svg>
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════
         04 — GALERIA CINEMATOGRÁFICA
    ══════════════════════════════════════════════════════ -->
    <section class="sec sec--cinegallery" data-reveal>
      <div class="cg__filmstrip" aria-hidden="true">
        <span v-for="n in 12" :key="n" class="cg__hole"></span>
      </div>
      <div class="cg__filmstrip cg__filmstrip--r" aria-hidden="true">
        <span v-for="n in 12" :key="n" class="cg__hole"></span>
      </div>

      <header class="cg__head">
        <div class="cg__head-left">
          <div class="sec__kicker">
            <span class="sec__num" aria-hidden="true">04</span>
            <div class="kicker__line" aria-hidden="true"></div>
          </div>
          <div>
            <span class="eyebrow">Curadoria Visual</span>
            <h2 class="heading">Forjado em <em>Metal Nobre</em></h2>
          </div>
        </div>
        <div class="cg__head-scroll" aria-hidden="true">
          <span class="cg__scroll-text">役者</span>
          <span class="cg__scroll-line"></span>
          <span class="cg__scroll-label">Deslize para explorar</span>
        </div>
      </header>

      <!-- REEL principal: scroll horizontal cinematográfico -->
      <div class="cg__reel-wrap">
        <div class="cg__reel" ref="galReel">
          <div
            v-for="(g, i) in gallery"
            :key="i"
            class="cg__frame"
            :class="{ 'is-active': activeGal === i }"
            @mouseenter="activeGal = i"
            @mouseleave="activeGal = -1"
            @click="openGalleryModal(g)"
          >
            <!-- Fundo ambiente -->
            <div class="cg__frame-bg" :style="{ background: g.grad }"></div>

            <!-- Arte generativa SVG -->
            <div class="cg__frame-art" v-html="g.art" aria-hidden="true"></div>

            <!-- Número de filme -->
            <div class="cg__frame-num" aria-hidden="true">
              <span>{{ String(i+1).padStart(2,'0') }}</span>
            </div>

            <!-- Categoria flutuante -->
            <div class="cg__frame-tag">{{ g.tag }}</div>

            <!-- Painel de info que sobe no hover -->
            <div class="cg__frame-info">
              <div class="cg__info-bar" aria-hidden="true"></div>
              <p class="cg__info-label">{{ g.label }}</p>
              <p class="cg__info-price">{{ g.preco }}</p>
              <div class="cg__info-cta">
                Ver peça
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12.5 5l7 7-7 7"/></svg>
              </div>
            </div>

            <!-- Grain overlay -->
            <div class="cg__frame-grain" aria-hidden="true"></div>

            <!-- Reflexo lateral cinematográfico -->
            <div class="cg__frame-glare" aria-hidden="true"></div>
          </div>
        </div>
      </div>

      <!-- Indicadores de reel -->
      <div class="cg__indicators" aria-hidden="true">
        <span
          v-for="(g, i) in gallery"
          :key="i"
          class="cg__dot"
          :class="{ 'is-active': activeGal === i }"
        ></span>
      </div>
    </section>

    <!-- ══ DIVISOR ORIENTAL ══ -->
    <div class="oriental-divider" ref="dividerRef" aria-hidden="true">
      <div class="od-line od-line--l"></div>
      <span class="od-gem">◆</span>
      <div class="od-mini-line"></div>
      <span class="od-gem od-gem--sm">◆</span>
      <div class="od-center">
        <div class="od-mon-wrap">
          <div class="od-ring od-ring--1"></div>
          <div class="od-ring od-ring--2"></div>
          <div class="od-mon">{{ realmKanji }}</div>
        </div>
      </div>
      <span class="od-gem od-gem--sm">◆</span>
      <div class="od-mini-line"></div>
      <span class="od-gem">◆</span>
      <div class="od-line od-line--r"></div>
    </div>

    <!-- ══ 05 — TECNOLOGIA ══ -->
    <section class="sec sec--tech" data-reveal>
      <div class="wrap">
        <header class="sec__head">
          <div class="sec__kicker">
            <span class="sec__num" aria-hidden="true">05</span>
            <div class="kicker__line" aria-hidden="true"></div>
          </div>
          <div class="sec__titles">
            <span class="eyebrow">Cutting-Edge Engineering</span>
            <h2 class="heading">Chip <em>&amp; Metal</em> Perfection</h2>
          </div>
        </header>
        <div class="tech-grid">
          <div
            v-for="(t, i) in techs"
            :key="i"
            class="tech-card"
            :style="{ '--i': i }"
            @mousemove="tiltCard($event, i)"
            @mouseleave="resetCard(i)"
            :ref="el => techCards[i] = el"
          >
            <div class="tech-card__beam" aria-hidden="true"></div>
            <div class="tech-card__beam tech-card__beam--2" aria-hidden="true"></div>
            <div class="tech-card__index" aria-hidden="true">{{ String(i+1).padStart(2,'0') }}</div>
            <span class="tech-card__num" :ref="el => techNumRefs[i] = el">{{ t.num }}</span>
            <h3 class="tech-card__name">{{ t.name }}</h3>
            <p class="tech-card__desc">{{ t.desc }}</p>
            <div class="tech-card__bar" aria-hidden="true"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══ 06 — MATERIAIS ══ -->
    <section class="sec sec--materials" data-reveal>
      <div class="wrap">
        <header class="sec__head">
          <div class="sec__kicker">
            <span class="sec__num" aria-hidden="true">06</span>
            <div class="kicker__line" aria-hidden="true"></div>
          </div>
          <div class="sec__titles">
            <span class="eyebrow">Matéria Prima</span>
            <h2 class="heading">Forjado em <em>Excelência</em></h2>
          </div>
        </header>
        <div class="materials">
          <div
            v-for="(m, i) in materials"
            :key="i"
            class="mat"
            :style="{ '--i': i }"
            @mouseenter="animateMaterialIcon(i)"
            :ref="el => matRefs[i] = el"
          >
            <div class="mat__abbr">{{ m.abbr }}</div>
            <div class="mat__icon" :ref="el => matIconRefs[i] = el" v-html="m.icon" aria-hidden="true"></div>
            <h3 class="mat__title">{{ m.title }}</h3>
            <p class="mat__desc">{{ m.desc }}</p>
            <ul class="mat__specs">
              <li v-for="(s, si) in m.specs" :key="s" :style="{ '--si': si }">{{ s }}</li>
            </ul>
            <div class="mat__progress" aria-hidden="true">
              <div class="mat__progress-fill"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════
         07 — CONFIGURADOR CINEMATOGRÁFICO
    ══════════════════════════════════════════════════════ -->
    <section class="sec sec--forge" data-reveal>
      <!-- Fundo atmosférico tipo forja -->
      <div class="forge__ambient" aria-hidden="true">
        <div class="forge__ember forge__ember--1"></div>
        <div class="forge__ember forge__ember--2"></div>
        <div class="forge__ember forge__ember--3"></div>
        <div class="forge__grid-lines"></div>
        <canvas class="forge__particles" ref="forgeCanvas" aria-hidden="true"></canvas>
      </div>

      <div class="wrap">
        <header class="sec__head">
          <div class="sec__kicker">
            <span class="sec__num" aria-hidden="true">07</span>
            <div class="kicker__line" aria-hidden="true"></div>
          </div>
          <div class="sec__titles">
            <span class="eyebrow">Seu estilo · Sua assinatura</span>
            <h2 class="heading">Configure sua <em>obra</em></h2>
          </div>
        </header>

        <div class="forge__layout">

          <!-- ── PAINEL ESQUERDO: preview 3D imersivo ── -->
          <div class="forge__stage" ref="forgeStageRef">
            <!-- Linhas de scan tipo holograma -->
            <div class="forge__scanlines" aria-hidden="true"></div>

            <!-- Anel orbital que gira -->
            <div class="forge__orbit" aria-hidden="true">
              <div class="forge__orbit-ring forge__orbit-ring--1"></div>
              <div class="forge__orbit-ring forge__orbit-ring--2"></div>
              <div class="forge__orbit-dot" v-for="n in 6" :key="n" :style="{ '--dn': n }"></div>
            </div>

            <!-- Dispositivo 3D com tilt -->
            <div
              class="forge__device-wrap"
              ref="forgeDeviceRef"
              @mousemove="tiltDevice"
              @mouseleave="resetDevice"
              @mouseenter="pauseDeviceAnim"
            >
              <div class="forge__device" :style="{ '--metal': finishes[finishIdx].solid }">
                <!-- Reflexo top -->
                <div class="forge__device-shine" aria-hidden="true"></div>

                <div class="forge__device-body">
                  <div class="forge__device-island"></div>
                  <div class="forge__device-hud">
                    <span class="forge__device-time">9:41</span>
                    <span class="forge__device-model">{{ models.find(m=>m.id===modelId)?.name }}</span>
                  </div>
                  <div class="forge__device-screen">
                    <div class="forge__device-badge">NOIR</div>
                    <div class="forge__device-lines">
                      <div class="forge__device-line" style="width:75%"></div>
                      <div class="forge__device-line" style="width:48%;opacity:.4"></div>
                    </div>
                    <div class="forge__device-specs">
                      <div class="forge__spec-chip">
                        <span class="forge__spec-val">{{ currentStorage?.label }}</span>
                        <span class="forge__spec-k">Storage</span>
                      </div>
                      <div class="forge__spec-chip">
                        <span class="forge__spec-val" :style="{ color: finishes[finishIdx].solid }">{{ finishes[finishIdx].name }}</span>
                        <span class="forge__spec-k">Acabamento</span>
                      </div>
                      <div class="forge__spec-chip">
                        <span class="forge__spec-val">{{ coatings[coatingIdx] }}</span>
                        <span class="forge__spec-k">Material</span>
                      </div>
                    </div>
                    <div class="forge__device-price-row">
                      <div class="forge__device-pval">R$ {{ fmt(totalPrice) }}</div>
                      <div class="forge__device-add">+</div>
                    </div>
                  </div>
                  <div class="forge__device-bar"></div>
                </div>
              </div>

              <!-- Sombra projetada -->
              <div class="forge__device-shadow" :style="{ background: finishes[finishIdx].glow }"></div>
            </div>

            <!-- Tag flutuante de material -->
            <div class="forge__material-tag" :style="{ borderColor: finishes[finishIdx].solid + '55' }">
              <span class="forge__mt-dot" :style="{ background: finishes[finishIdx].solid }"></span>
              <span>{{ finishes[finishIdx].name }}</span>
              <span class="forge__mt-sep">·</span>
              <span>{{ coatings[coatingIdx] }}</span>
            </div>

            <!-- Glow ambiente pulsante -->
            <div class="forge__glow-ambient" :style="{ background: finishes[finishIdx].glow }"></div>
          </div>

          <!-- ── PAINEL DIREITO: controles ── -->
          <div class="forge__controls">

            <!-- Modelo -->
            <div class="forge__group">
              <div class="forge__group-header">
                <span class="forge__group-kanji" aria-hidden="true">型</span>
                <span class="forge__group-label">Dispositivo</span>
                <span class="forge__group-num">01</span>
              </div>
              <div class="forge__models">
                <button
                  v-for="m in models"
                  :key="m.id"
                  class="forge__model-btn"
                  :class="{ 'is-active': modelId === m.id }"
                  @click="selectModel(m.id)"
                >
                  <div class="forge__model-icon" v-html="m.icon"></div>
                  <span class="forge__model-name">{{ m.name }}</span>
                  <span class="forge__model-base">R$ {{ fmt(m.base) }}</span>
                </button>
              </div>
            </div>

            <!-- Acabamento -->
            <div class="forge__group">
              <div class="forge__group-header">
                <span class="forge__group-kanji" aria-hidden="true">金</span>
                <span class="forge__group-label">Acabamento</span>
                <span class="forge__group-num">02</span>
              </div>
              <div class="forge__finishes">
                <button
                  v-for="(f, i) in finishes"
                  :key="i"
                  class="forge__finish-btn"
                  :class="{ 'is-active': finishIdx === i }"
                  @click="selectFinish(i)"
                  :title="f.name"
                  :aria-label="f.name"
                >
                  <span class="forge__finish-orb" :style="{ background: f.grad }"></span>
                  <span class="forge__finish-name">{{ f.name }}</span>
                  <span class="forge__finish-add" v-if="f.add > 0">+R$ {{ fmt(f.add) }}</span>
                </button>
              </div>
            </div>

            <!-- Capacidade + Material em linha -->
            <div class="forge__group-row">
              <div class="forge__group forge__group--half">
                <div class="forge__group-header">
                  <span class="forge__group-kanji" aria-hidden="true">容</span>
                  <span class="forge__group-label">Capacidade</span>
                  <span class="forge__group-num">03</span>
                </div>
                <div class="forge__pills">
                  <button
                    v-for="s in storages"
                    :key="s.val"
                    class="forge__pill"
                    :class="{ 'is-active': storageVal === s.val }"
                    @click="storageVal = s.val"
                  >{{ s.label }}</button>
                </div>
              </div>
              <div class="forge__group forge__group--half">
                <div class="forge__group-header">
                  <span class="forge__group-kanji" aria-hidden="true">質</span>
                  <span class="forge__group-label">Material</span>
                  <span class="forge__group-num">04</span>
                </div>
                <div class="forge__pills">
                  <button
                    v-for="(a, i) in coatings"
                    :key="i"
                    class="forge__pill"
                    :class="{ 'is-active': coatingIdx === i }"
                    @click="coatingIdx = i"
                  >{{ a }}</button>
                </div>
              </div>
            </div>

            <!-- Price display cinematográfico -->
            <div class="forge__price-block" ref="priceRef">
              <div class="forge__price-label">Valor estimado</div>
              <div class="forge__price-main">
                <span class="forge__price-currency">R$</span>
                <span class="forge__price-val">{{ fmt(totalPrice) }}</span>
              </div>
              <div class="forge__price-inst">
                <span class="forge__price-dot"></span>
                12× de R$ {{ fmt(Math.ceil(totalPrice/12)) }} sem juros
              </div>
              <!-- Barra de composição do preço -->
              <div class="forge__price-breakdown">
                <div
                  v-for="bd in priceBreakdown"
                  :key="bd.label"
                  class="forge__price-bd-item"
                >
                  <span class="forge__price-bd-label">{{ bd.label }}</span>
                  <span class="forge__price-bd-line" :style="{ width: bd.pct + '%', background: bd.color }"></span>
                  <span class="forge__price-bd-val">R$ {{ fmt(bd.val) }}</span>
                </div>
              </div>
            </div>

            <!-- CTA -->
            <router-link to="/contato" class="forge__cta">
              <span class="forge__cta-fill" aria-hidden="true"></span>
              <span class="forge__cta-text">Solicitar Orçamento</span>
              <span class="forge__cta-kanji" aria-hidden="true">見積</span>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 12h14M12.5 5l7 7-7 7"/></svg>
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- ══ 08 — PRODUTOS ══ -->
    <section class="sec sec--products" data-reveal>
      <div class="wrap">
        <header class="shop-head">
          <div class="shop-head__left">
            <div class="sec__kicker">
              <span class="sec__num" aria-hidden="true">08</span>
              <div class="kicker__line" aria-hidden="true"></div>
            </div>
            <div>
              <span class="eyebrow">Archive Selection</span>
              <h2 class="heading">Curadoria <em>2026</em></h2>
            </div>
          </div>
          <div class="shop-head__ctrl">
            <router-link to="/loja" class="ctrl-link">
              Ver coleção
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M5 12h14M12.5 5l7 7-7 7"/></svg>
            </router-link>
            <div class="ctrl-sep" aria-hidden="true"></div>
            <div class="ctrl-arrows">
              <button @click="prevSlide" class="arrow" aria-label="Anterior">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              </button>
              <div class="arrow-prog" role="status" :aria-label="`${slideIdx+1} de ${featured.length}`">
                <svg viewBox="0 0 44 44" width="44" height="44" class="prog-svg">
                  <circle cx="22" cy="22" r="18" class="prog-track"/>
                  <circle cx="22" cy="22" r="18" class="prog-fill" :style="progStyle"/>
                </svg>
                <span class="prog-label">{{ String(slideIdx+1).padStart(2,'0') }}<em>/{{ String(featured.length||4).padStart(2,'0') }}</em></span>
              </div>
              <button @click="nextSlide" class="arrow" aria-label="Próximo">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 12h14M12.5 5l7 7-7 7"/></svg>
              </button>
            </div>
          </div>
        </header>
      </div>
      <div class="carousel-outer">
        <div class="carousel" ref="carousel" @mousedown="dragStart" @mousemove="dragMove" @mouseup="dragEnd" @mouseleave="dragEnd" @scroll="onScroll">
          <div class="carousel__track">
            <template v-if="loading">
              <div v-for="n in 4" :key="'sk'+n" class="prod-card prod-card--skel">
                <div class="prod-card__img skel"></div>
                <div class="prod-card__info">
                  <div class="skel-line skel-line--sm"></div>
                  <div class="skel-line"></div>
                </div>
              </div>
            </template>
            <template v-else>
              <article
  class="prod-card"
  :class="{ 'is-active': slideIdx === i }"
  @mouseenter="autoPause = true"
  @mouseleave="autoPause = false"
  @click="openModal(p)"
>
                <div class="prod-card__img" :style="p.imagem ? { backgroundImage: `url(${p.imagem})` } : {}">
                  <div v-if="!p.imagem" class="prod-card__gen-art" :class="`gen-art--${p.categoria?.toLowerCase() || 'tech'}`" aria-hidden="true">
                    <div class="gen-art__inner"></div>
                  </div>
                  <div class="prod-card__grad"></div>
                  <div class="prod-card__top">
                    <span class="prod-card__tag">{{ p.novo ? 'NOVO' : 'LIMITADO' }}</span>
                    <span v-if="!p.estoque" class="prod-card__sold">Esgotado</span>
                  </div>
                  <button
                    class="prod-card__add"
                    :class="{ 'is-added': addedIds.includes(p._id||p.id) }"
                    :disabled="!p.estoque"
                    @click.stop="addCart(p)"
                    :aria-label="`Adicionar ${p.nome} ao carrinho`"
                  >
                    <span v-if="addedIds.includes(p._id||p.id)">✓ Adicionado</span>
                    <span v-else>+ Atelier</span>
                  </button>
                </div>
                <div class="prod-card__info">
                  <div class="prod-card__meta">
                    <span class="prod-card__cat">{{ p.categoria }}</span>
                    <span class="prod-card__nr">Nº {{ String(i+1).padStart(3,'0') }}</span>
                  </div>
                  <h4 class="prod-card__name">{{ p.nome }}</h4>
                  <div class="prod-card__foot">
                    <span class="prod-card__price">R$ {{ fmt(p.preco) }}</span>
                    <span class="prod-card__inst">12× sem juros</span>
                  </div>
                </div>
              </article>
            </template>
          </div>
        </div>
      </div>
    </section>

    <!-- ══ 09 — PORTAL ORIENTAL ══ -->
    <section class="sec sec--exclus sec--portal">
      <canvas class="portal__sakura" ref="sakuraCanvas" aria-hidden="true"></canvas>
      <div class="exclus__film-grain" aria-hidden="true"></div>
      <div class="portal__seigaiha" aria-hidden="true">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="seigaiha" x="0" y="0" width="40" height="30" patternUnits="userSpaceOnUse">
              <path d="M20 0 Q40 10 20 20 Q0 10 20 0Z" fill="none" stroke="rgba(200,168,75,0.045)" stroke-width="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#seigaiha)"/>
        </svg>
      </div>
      <div class="portal__torii" ref="toriiRef" aria-hidden="true">
        <svg viewBox="0 0 500 340" xmlns="http://www.w3.org/2000/svg" class="torii__svg">
          <path class="torii__path" d="M10 88 Q250 34 490 88" fill="none" stroke="rgba(200,168,75,0.22)" stroke-width="20" stroke-linecap="round"/>
          <path class="torii__path" d="M22 96 Q250 46 478 96" fill="none" stroke="rgba(200,168,75,0.09)" stroke-width="8" stroke-linecap="round"/>
          <line class="torii__path" x1="65" y1="148" x2="435" y2="148" stroke="rgba(200,168,75,0.15)" stroke-width="11" stroke-linecap="round"/>
          <line class="torii__path" x1="88" y1="82" x2="88" y2="148" stroke="rgba(200,168,75,0.18)" stroke-width="13" stroke-linecap="round"/>
          <line class="torii__path" x1="412" y1="82" x2="412" y2="148" stroke="rgba(200,168,75,0.18)" stroke-width="13" stroke-linecap="round"/>
          <line class="torii__path" x1="88" y1="148" x2="88" y2="340" stroke="rgba(200,168,75,0.13)" stroke-width="16" stroke-linecap="round"/>
          <line class="torii__path" x1="412" y1="148" x2="412" y2="340" stroke="rgba(200,168,75,0.13)" stroke-width="16" stroke-linecap="round"/>
          <ellipse cx="250" cy="230" rx="80" ry="100" fill="none" stroke="rgba(200,168,75,0.05)" stroke-width="1"/>
          <ellipse cx="250" cy="230" rx="44" ry="55" fill="rgba(200,168,75,0.02)" stroke="rgba(200,168,75,0.08)" stroke-width="0.5"/>
          <ellipse cx="250" cy="230" rx="12" ry="15" fill="rgba(200,168,75,0.06)"/>
        </svg>
      </div>
      <div class="exclus__beam exclus__beam--1" aria-hidden="true"></div>
      <div class="exclus__beam exclus__beam--2" aria-hidden="true"></div>
      <div class="exclus__beam exclus__beam--3" aria-hidden="true"></div>
      <div class="exclus__kanji" aria-hidden="true">永遠<br/>の美</div>
      <div class="exclus__kanji exclus__kanji--l" aria-hidden="true">希少<br/>限定</div>
      <div class="portal__kanji-v" aria-hidden="true">{{ portalKanjiV }}</div>
      <div class="exclus__letterbox exclus__letterbox--top" aria-hidden="true"></div>
      <div class="exclus__letterbox exclus__letterbox--bot" aria-hidden="true"></div>
      <div class="exclus__inner">
        <span class="exclus__corner exclus__corner--tl" aria-hidden="true"></span>
        <span class="exclus__corner exclus__corner--tr" aria-hidden="true"></span>
        <span class="exclus__corner exclus__corner--bl" aria-hidden="true"></span>
        <span class="exclus__corner exclus__corner--br" aria-hidden="true"></span>
        <div class="portal__mon" aria-hidden="true">
          <svg viewBox="0 0 80 80" width="64" height="64">
            <circle cx="40" cy="40" r="36" fill="none" stroke="rgba(200,168,75,0.32)" stroke-width="0.5"/>
            <circle cx="40" cy="40" r="27" fill="none" stroke="rgba(200,168,75,0.18)" stroke-width="0.5"/>
            <path d="M40 10 L43.5 28 L40 25 L36.5 28 Z" fill="rgba(200,168,75,0.5)"/>
            <path d="M40 70 L43.5 52 L40 55 L36.5 52 Z" fill="rgba(200,168,75,0.5)"/>
            <path d="M10 40 L28 36.5 L25 40 L28 43.5 Z" fill="rgba(200,168,75,0.5)"/>
            <path d="M70 40 L52 36.5 L55 40 L52 43.5 Z" fill="rgba(200,168,75,0.5)"/>
            <circle cx="40" cy="40" r="5" fill="none" stroke="rgba(200,168,75,0.55)" stroke-width="0.5"/>
            <circle cx="40" cy="40" r="2" fill="rgba(200,168,75,0.6)"/>
          </svg>
        </div>
        <span class="eyebrow">Cada unidade única</span>
        <h2 class="exclus__title" ref="portalTitleRef">Edições que não<br/><em>se repetem</em></h2>
        <p class="exclus__sub">Numeradas · Certificadas · Eternas</p>
        <router-link to="/loja" class="exclus__btn">
          <span class="exclus__btn-fill" aria-hidden="true"></span>
          Explorar Coleção
        </router-link>
      </div>
    </section>

    <!-- ══ 10 — DEPOIMENTOS ══ -->
    <section class="sec sec--reviews" data-reveal>
      <div class="wrap">
        <header class="sec__head">
          <div class="sec__kicker">
            <span class="sec__num" aria-hidden="true">10</span>
            <div class="kicker__line" aria-hidden="true"></div>
          </div>
          <div class="sec__titles">
            <span class="eyebrow">Clientes Noir &amp; Or</span>
            <h2 class="heading">O que dizem <em>nossos</em> clientes</h2>
          </div>
        </header>
        <div class="reviews">
          <article v-for="(r, i) in reviews" :key="i" class="review" :style="{ '--i': i }">
            <span class="review__mark" aria-hidden="true">"</span>
            <p class="review__text">{{ r.text }}</p>
            <div class="review__stars" aria-hidden="true">
              <span v-for="n in 5" :key="n" class="review__star" :style="{ '--si': n-1 }">◆</span>
            </div>
            <footer class="review__foot">
              <div class="review__av" aria-hidden="true">{{ r.name[0] }}</div>
              <div>
                <span class="review__name">{{ r.name }}</span>
                <span class="review__city">{{ r.city }}</span>
              </div>
            </footer>
            <div class="review__line" aria-hidden="true"></div>
          </article>
        </div>
      </div>
    </section>

    <!-- ══ 11 — CONCIERGE ══ -->
    <section class="sec sec--concierge" data-reveal>
      <div class="wrap">
        <div class="concierge">
          <div class="concierge__left">
            <div class="sec__kicker">
              <span class="sec__num" aria-hidden="true">11</span>
              <div class="kicker__line" aria-hidden="true"></div>
            </div>
            <span class="concierge__tag">Private Privilege</span>
            <h2 class="concierge__title">Comissionamento<br/>de <em>peças únicas</em></h2>
          </div>
          <div class="concierge__right">
            <p class="concierge__desc">Projetos sob medida onde a tecnologia encontra a exclusividade absoluta. Hardware customizado sob regime de agendamento restrito.</p>
            <router-link to="/contato" class="concierge__btn">
              <span class="concierge__btn-fill" aria-hidden="true"></span>
              Requerer Acesso Privado
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 12h14M12.5 5l7 7-7 7"/></svg>
            </router-link>
            <div class="concierge__status">
              <span class="pulse" aria-hidden="true"></span>
              <span class="pulse pulse--2" aria-hidden="true"></span>
              {{ conciergeStatus }}
            </div>
            <p class="concierge__vagas">
              <span class="vagas__num">03</span> vagas disponíveis
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ══ MODAL PRODUTO ══ -->
    <teleport to="body">
      <transition name="fade">
        <div
          v-if="modal"
          class="modal-wrap"
          @click.self="modal = null"
          role="dialog"
          :aria-label="modal?.nome"
          aria-modal="true"
          ref="modalWrapRef"
        >
          <div class="modal" ref="modalRef">
            <button class="modal__close" @click="modal = null" aria-label="Fechar" ref="modalCloseRef">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
            <div class="modal__img" :style="modal?.imagem ? { backgroundImage:`url(${modal.imagem})` } : {}">
              <div v-if="!modal?.imagem" class="modal__img-gen" aria-hidden="true"></div>
            </div>
            <div class="modal__info">
              <span class="eyebrow">{{ modal?.categoria }}</span>
              <h2 class="modal__title">{{ modal?.nome }}</h2>
              <p class="modal__brand">por {{ modal?.marca }}</p>
              <p class="modal__desc">{{ modal?.descricao }}</p>
              <div class="modal__specs" v-if="modal?.specs?.length">
                <div v-for="s in modal.specs" :key="s.k" class="modal__spec">
                  <span class="spec__k">{{ s.k }}</span>
                  <span class="spec__v">{{ s.v }}</span>
                </div>
              </div>
              <p class="modal__price">R$ {{ fmt(modal?.preco ?? 0) }}</p>
              <p class="modal__inst">12× de R$ {{ fmt(Math.ceil((modal?.preco||0)/12)) }} sem juros</p>
              <button class="modal__add" :disabled="!modal?.estoque" @click="addCart(modal); modal = null">
                <span class="modal__add-fill" aria-hidden="true"></span>
                {{ !modal?.estoque ? 'Esgotado' : '+ Adicionar ao Atelier' }}
              </button>
            </div>
          </div>
        </div>
      </transition>
    </teleport>

    <!-- ══ MODAL GALERIA ══ -->
    <teleport to="body">
      <transition name="fade">
        <div
          v-if="galModal"
          class="galmodal-wrap"
          @click.self="galModal = null"
          role="dialog"
          aria-modal="true"
        >
          <div class="galmodal">
            <button class="galmodal__close" @click="galModal = null" aria-label="Fechar">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
            <div class="galmodal__visual">
              <div class="galmodal__bg" :style="{ background: galModal.grad }"></div>
              <div class="galmodal__art" v-html="galModal.art"></div>
              <div class="galmodal__tag">{{ galModal.tag }}</div>
            </div>
            <div class="galmodal__info">
              <span class="eyebrow">Édition Exclusive</span>
              <h2 class="galmodal__title">{{ galModal.label }}</h2>
              <p class="galmodal__price">{{ galModal.preco }}</p>
              <router-link to="/loja" class="galmodal__cta" @click="galModal = null">
                <span class="galmodal__cta-fill"></span>
                Ver na Loja
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12.5 5l7 7-7 7"/></svg>
              </router-link>
            </div>
          </div>
        </div>
      </transition>
    </teleport>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import Banner from '@/components/Banner.vue'
import { useProdutosStore } from '@/stores/produtos.js'
import { useSiteStore } from '@/stores/site.js'
import { useCartStore } from '@/stores/cart.js'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const site = useSiteStore()
const cart = useCartStore()

/* ─── STORE ─── */
const prodStore = useProdutosStore()
const featured  = ref([])
const loading   = ref(true)
const addedIds  = ref([])
const modal     = ref(null)
const galModal  = ref(null)

/* ─── CART via navbar store (sem drawer próprio) ─── */
function addCart(p) {
  if (!p?.estoque) return
  // Usa o cartStore compartilhado com a navbar
  if (cart?.adicionar) {
    cart.adicionar(p)
  } else {
    window.dispatchEvent(new CustomEvent('add-to-cart', { detail: p }))
  }
  const k = p._id || p.id
  addedIds.value.push(k)
  setTimeout(() => { addedIds.value = addedIds.value.filter(id => id !== k) }, 2200)
  // Abre o drawer da navbar
  window.dispatchEvent(new CustomEvent('open-cart'))
}

const openGalleryModal = (g) => { galModal.value = g }

/* ─── DOM REFS ─── */
const carousel       = ref(null)
const sakuraCanvas   = ref(null)
const statsRef       = ref(null)
const dividerRef     = ref(null)
const toriiRef       = ref(null)
const portalTitleRef = ref(null)
const modalWrapRef   = ref(null)
const modalRef       = ref(null)
const modalCloseRef  = ref(null)
const priceRef       = ref(null)
const techCards      = ref([])
const techNumRefs    = ref([])
const pillarIconRefs = ref([])
const matRefs        = ref([])
const matIconRefs    = ref([])
const galReel        = ref(null)
const forgeCanvas    = ref(null)
const forgeStageRef  = ref(null)
const forgeDeviceRef = ref(null)

/* ─── GALLERY ─── */
const activeGal = ref(-1)

/* ─── CAROUSEL ─── */
const slideIdx  = ref(0)
const isDrag    = ref(false)
const dragX     = ref(0)
const dragSL    = ref(0)
const autoPause = ref(false)
let autoTimer   = null
let carouselRO  = null

/* ─── SAKURA ─── */
let sakuraRaf = null
let sakuraRO  = null
const triggers = []

/* ─── FORGE PARTICLES ─── */
let forgeRaf = null
let forgeCtx = null
let forgeParticles = []
let forgeRO = null

/* ─── REALM COMPUTEDS ─── */
const realmVars = computed(() => {
  const t = site.tema
  if (t === 'claro') return { '--realm-accent': '#3D6CBF', '--realm-accent-rgb': '61,108,191' }
  if (t === 'gamer') return { '--realm-accent': '#C85014', '--realm-accent-rgb': '200,80,20' }
  return { '--realm-accent': '#C8A84B', '--realm-accent-rgb': '200,168,75' }
})

const realmKanji      = computed(() => site.tema === 'gamer' ? '刃' : site.tema === 'claro' ? '道' : '永')
const manifestoBgText = computed(() => site.tema === 'gamer' ? 'WAR' : site.tema === 'claro' ? '道' : 'NOIR')
const portalKanjiV    = computed(() => site.tema === 'gamer' ? '刀火の時代' : site.tema === 'claro' ? '秋の黄金時代' : '黄金の時代')
const conciergeStatus = computed(() => site.tema === 'gamer' ? 'Acesso restrito · Forja ativa' : 'Lista de espera aberta')

const tickerItems = computed(() => {
  if (site.tema === 'claro') return ['Bambu','Laca Vermelha','Bronze Antigo','Cobre','Madeira Nobre','Papel Washi','Ferro Forjado']
  if (site.tema === 'gamer') return ['Aço Negro','Carbono','Ferro Bruto','Cinzas','Lâmina','Névoa','Sangue e Ouro']
  return ['Ouro 24K','Titânio G5','Platina','Rose Gold','Preto Onyx','Diamond Cut','Édition Limitée']
})
const tickerSep   = computed(() => site.tema === 'gamer' ? '†' : site.tema === 'claro' ? '✦' : '◆')
const tickerSpeed = computed(() => site.tema === 'gamer' ? '16s' : site.tema === 'claro' ? '22s' : '28s')

/* ─── CONFIGURADOR ─── */
const models = [
  { id:'macbook', name:'MacBook Pro',   base:18990, icon:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M0 21h24"/></svg>' },
  { id:'iphone',  name:'iPhone 16 Pro', base:12990, icon:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><rect x="5" y="1" width="14" height="22" rx="3"/><path d="M10 5h4"/></svg>' },
  { id:'ipad',    name:'iPad Pro',      base:10990, icon:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><rect x="3" y="1" width="18" height="22" rx="2"/><circle cx="12" cy="19" r="1"/></svg>' },
  { id:'imac',    name:'iMac',          base:24990, icon:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><rect x="1" y="2" width="22" height="16" rx="2"/><path d="M8 22h8M12 18v4"/></svg>' },
]
const storageMaps = {
  macbook:[{label:'512GB',val:'512GB',add:0},{label:'1TB',val:'1TB',add:1500},{label:'2TB',val:'2TB',add:3500}],
  iphone: [{label:'256GB',val:'256GB',add:0},{label:'512GB',val:'512GB',add:800},{label:'1TB',val:'1TB',add:1800}],
  ipad:   [{label:'256GB',val:'256GB',add:0},{label:'512GB',val:'512GB',add:1000},{label:'1TB',val:'1TB',add:2000}],
  imac:   [{label:'512GB',val:'512GB',add:0},{label:'1TB',val:'1TB',add:2000},{label:'2TB',val:'2TB',add:4000}],
}
const finishes = [
  { name:'Ouro 24K',   solid:'#C8A84B', grad:'radial-gradient(135deg,#FFD97D 0%,#C8A84B 50%,#8B6914 100%)', glow:'radial-gradient(circle,rgba(200,168,75,.55),transparent 65%)', add:0 },
  { name:'Rose Gold',  solid:'#C2847A', grad:'radial-gradient(135deg,#f4c2be 0%,#C2847A 50%,#8B4A47 100%)', glow:'radial-gradient(circle,rgba(183,110,121,.55),transparent 65%)', add:500 },
  { name:'Platina',    solid:'#C0C0C8', grad:'radial-gradient(135deg,#e8e8f0 0%,#A8A8B8 50%,#6a6a7a 100%)', glow:'radial-gradient(circle,rgba(192,192,200,.55),transparent 65%)', add:800 },
  { name:'Preto Onyx', solid:'#6a6a6a', grad:'radial-gradient(135deg,#5a5a5a 0%,#2a2a2a 50%,#111 100%)',    glow:'radial-gradient(circle,rgba(140,140,140,.45),transparent 65%)', add:300 },
]
const coatings      = ['Polido','Fosco','Escovado','Diamond Cut']
const coatingPrices = [0,200,400,800]

const modelId    = ref('macbook')
const finishIdx  = ref(0)
const storageVal = ref('512GB')
const coatingIdx = ref(0)

const storages       = computed(() => storageMaps[modelId.value] || storageMaps.macbook)
const currentStorage = computed(() => storages.value.find(s => s.val === storageVal.value) || storages.value[0])
const totalPrice     = computed(() => {
  const base = models.find(m => m.id === modelId.value)?.base || 18990
  return base + (currentStorage.value?.add||0) + (finishes[finishIdx.value]?.add||0) + (coatingPrices[coatingIdx.value]||0)
})

const priceBreakdown = computed(() => {
  const base    = models.find(m => m.id === modelId.value)?.base || 18990
  const storage = currentStorage.value?.add || 0
  const finish  = finishes[finishIdx.value]?.add || 0
  const coating = coatingPrices[coatingIdx.value] || 0
  const total   = totalPrice.value
  return [
    { label: 'Base',        val: base,    pct: (base/total)*100,    color: 'rgba(200,168,75,.8)' },
    { label: 'Armazenamento', val: storage, pct: (storage/total)*100, color: 'rgba(200,168,75,.5)' },
    { label: 'Acabamento',  val: finish,  pct: (finish/total)*100,  color: 'rgba(200,168,75,.35)' },
    { label: 'Material',    val: coating, pct: (coating/total)*100, color: 'rgba(200,168,75,.2)' },
  ].filter(b => b.val > 0)
})

function selectModel(id) {
  modelId.value    = id
  storageVal.value = storageMaps[id]?.[0]?.val || '512GB'
  coatingIdx.value = 0
  animateDeviceBump()
}
function selectFinish(i) {
  finishIdx.value = i
  animateDeviceSpin()
}

function animateDeviceBump() {
  if (!forgeDeviceRef.value) return
  gsap.to(forgeDeviceRef.value, { scale:0.94, duration:0.12, yoyo:true, repeat:1, ease:'power2.inOut' })
}
function animateDeviceSpin() {
  if (!forgeDeviceRef.value) return
  gsap.to(forgeDeviceRef.value, {
    rotateY: 360, duration: 0.8, ease:'power2.inOut',
    onComplete: () => gsap.set(forgeDeviceRef.value, { rotateY:0 })
  })
}
function pauseDeviceAnim() {}
function tiltDevice(e) {
  if (!forgeStageRef.value || !forgeDeviceRef.value) return
  const r = forgeStageRef.value.getBoundingClientRect()
  const x = ((e.clientX - r.left) / r.width - 0.5) * 26
  const y = -((e.clientY - r.top) / r.height - 0.5) * 18
  gsap.to(forgeDeviceRef.value, { rotateY: x, rotateX: y, duration:.5, ease:'power2.out' })
}
function resetDevice() {
  if (forgeDeviceRef.value) {
    gsap.to(forgeDeviceRef.value, { rotateY:0, rotateX:0, duration:1.4, ease:'elastic.out(1,.45)' })
  }
}

/* ─── FORGE PARTICLES ─── */
function createForgeParticle(W, H) {
  return {
    x: Math.random() * W,
    y: H + Math.random() * 80,
    size: Math.random() * 2.5 + 0.5,
    speedY: -(Math.random() * 1.2 + 0.4),
    speedX: (Math.random() - 0.5) * 0.5,
    opacity: Math.random() * 0.55 + 0.1,
    life: 1,
    lifeSpeed: Math.random() * 0.004 + 0.001,
    color: ['rgba(200,168,75,','rgba(245,215,142,','rgba(255,200,100,'][Math.floor(Math.random()*3)],
    wobble: Math.random() * Math.PI * 2,
    wobbleSpeed: Math.random() * 0.025 + 0.01,
  }
}

function animateForge() {
  if (!forgeCtx || !forgeCanvas.value) return
  const W = forgeCanvas.value.width
  const H = forgeCanvas.value.height
  forgeCtx.clearRect(0, 0, W, H)

  while (forgeParticles.length < 55) forgeParticles.push(createForgeParticle(W, H))

  forgeParticles.forEach((p, i) => {
    p.wobble += p.wobbleSpeed
    p.x += p.speedX + Math.sin(p.wobble) * 0.5
    p.y += p.speedY
    p.life -= p.lifeSpeed
    p.opacity = p.life * 0.5

    if (p.y < -20 || p.life <= 0) {
      forgeParticles[i] = createForgeParticle(W, H)
      return
    }

    const grd = forgeCtx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2)
    grd.addColorStop(0, p.color + Math.min(p.opacity, 0.9) + ')')
    grd.addColorStop(1, p.color + '0)')
    forgeCtx.beginPath()
    forgeCtx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2)
    forgeCtx.fillStyle = grd
    forgeCtx.fill()
  })

  forgeRaf = requestAnimationFrame(animateForge)
}

function initForge() {
  const canvas = forgeCanvas.value; if (!canvas) return
  forgeCtx = canvas.getContext('2d')
  const resize = () => { canvas.width = canvas.offsetWidth || 600; canvas.height = canvas.offsetHeight || 700 }
  resize()
  forgeRO = new ResizeObserver(resize)
  forgeRO.observe(canvas)
  forgeParticles = Array.from({ length: 55 }, () => {
    const p = createForgeParticle(canvas.width, canvas.height)
    p.y = Math.random() * canvas.height
    return p
  })
  animateForge()
}

function destroyForge() {
  if (forgeRaf) { cancelAnimationFrame(forgeRaf); forgeRaf = null }
  if (forgeRO)  { forgeRO.disconnect(); forgeRO = null }
  forgeCtx = null; forgeParticles = []
}

/* ─── DADOS ESTÁTICOS ─── */
const pillars = [
  { kanji:'護', title:'Entrega Blindada',   desc:'Embalagem de segurança com lacre verificável e rastreamento em tempo real.', icon:'<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>' },
  { kanji:'久', title:'Garantia Vitalícia', desc:'Cobertura completa enquanto você possui a peça. Sem asteriscos.', icon:'<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>' },
  { kanji:'専', title:'Suporte Privado',    desc:'Atendimento dedicado 24h. Um consultor exclusivo para cada cliente.', icon:'<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>' },
  { kanji:'鍵', title:'Segurança Total',    desc:'Dados protegidos com criptografia de nível militar. Privacidade garantida.', icon:'<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>' },
]
const stats = [
  { key:'pecas',      raw:2400, suffix:'+', display:'2.4k+', lbl:'Peças Entregues' },
  { key:'satisfacao', raw:98,   suffix:'%', display:'98%',   lbl:'Satisfação' },
  { key:'anos',       raw:5,    suffix:'',  display:'5',     lbl:'Anos de Atelier' },
]
const techs = [
  { num:'A17',   name:'Chip Neural',    desc:'Motor neural de 16 núcleos. Performance absoluta para cada interação.' },
  { num:'5nm',   name:'Processo TSMC',  desc:'Fabricação em nódulo de 5nm. Eficiência energética sem precedentes.' },
  { num:'48MP',  name:'Sistema Óptico', desc:'Sensor de alta resolução com processamento computacional avançado.' },
  { num:'120Hz', name:'ProMotion',      desc:'Taxa de atualização adaptativa para fluidez perfeita em qualquer conteúdo.' },
]
const materials = [
  { abbr:'24k', title:'Ouro Puro',   desc:'Galvanoplastia de alta densidade com certificação internacional de pureza.', specs:['Espessura mínima 2μm','Certificação ISO 3497','Resistência UV garantida'], icon:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><circle cx="12" cy="12" r="10"/><path d="M12 2v20M2 12h20"/></svg>' },
  { abbr:'Ti',  title:'Titânio G5',  desc:'Liga aeroespacial grau 5 — a mesma usada em aviação e implantes ortopédicos.', specs:['Dureza HRC 36','Peso 40% menor que aço','Biocompatível'], icon:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>' },
  { abbr:'5d',  title:'Cura Premium', desc:'Fusão molecular em câmara de atmosfera controlada por 5 dias consecutivos.', specs:['Temperatura ±0.1°C','Atmosfera de argônio','Adesão molecular permanente'], icon:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>' },
]
const gallery = [
  { tag:'Édition Limitée', label:'Ouro 24K · iPhone 16 Pro', preco:'R$ 18.990', grad:'radial-gradient(ellipse at 35% 40%, rgba(200,168,75,.35) 0%, rgba(6,5,2,.97) 65%)', art:`<svg width="100%" height="100%" viewBox="0 0 400 600" fill="none" preserveAspectRatio="xMidYMid slice"><defs><radialGradient id="g0" cx="50%" cy="45%"><stop offset="0%" stop-color="rgba(200,168,75,.18)"/><stop offset="100%" stop-color="transparent"/></radialGradient></defs><ellipse cx="200" cy="300" rx="160" ry="200" fill="url(#g0)"/><circle cx="200" cy="300" r="140" stroke="rgba(200,168,75,.07)" stroke-width="1"/><circle cx="200" cy="300" r="100" stroke="rgba(200,168,75,.05)" stroke-width=".5"/><circle cx="200" cy="300" r="60" stroke="rgba(200,168,75,.08)" stroke-width=".5"/><line x1="60" y1="300" x2="340" y2="300" stroke="rgba(200,168,75,.04)" stroke-width=".5"/><line x1="200" y1="100" x2="200" y2="500" stroke="rgba(200,168,75,.04)" stroke-width=".5"/><path d="M200 160 L210 195 L200 188 L190 195 Z" fill="rgba(200,168,75,.4)"/><path d="M200 440 L210 405 L200 412 L190 405 Z" fill="rgba(200,168,75,.4)"/></svg>` },
  { tag:'Exclusivo', label:'MacBook Pro · Titânio', preco:'R$ 22.490', grad:'radial-gradient(ellipse at 55% 35%, rgba(90,70,180,.22) 0%, rgba(5,4,14,.98) 70%)', art:`<svg width="100%" height="100%" viewBox="0 0 400 600" fill="none" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="g1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="rgba(120,90,220,.25)"/><stop offset="100%" stop-color="transparent"/></linearGradient></defs><rect x="80" y="150" width="240" height="300" fill="url(#g1)" stroke="rgba(120,90,220,.12)" stroke-width=".5"/>${Array.from({length:8},(_,i)=>`<line x1="${60+i*35}" y1="100" x2="${60+i*35}" y2="500" stroke="rgba(120,90,220,.05)" stroke-width=".5"/>`).join('')}<circle cx="200" cy="300" r="55" stroke="rgba(140,110,240,.12)" stroke-width=".8"/><circle cx="200" cy="300" r="20" fill="rgba(100,70,200,.08)" stroke="rgba(140,110,240,.18)" stroke-width=".5"/></svg>` },
  { tag:'Novo', label:'iPad Pro · Platina', preco:'R$ 14.790', grad:'radial-gradient(ellipse at 50% 50%, rgba(180,180,200,.22) 0%, rgba(5,4,14,.98) 65%)', art:`<svg width="100%" height="100%" viewBox="0 0 400 600" fill="none" preserveAspectRatio="xMidYMid slice">${Array.from({length:9},(_,i)=>`<circle cx="200" cy="300" r="${20+i*22}" stroke="rgba(180,180,200,${0.15-i*0.015})" stroke-width=".5"/>`).join('')}<circle cx="200" cy="300" r="10" fill="rgba(200,200,220,.12)"/></svg>` },
  { tag:'Limitado', label:'iMac · Rose Gold', preco:'R$ 28.490', grad:'radial-gradient(ellipse at 40% 60%, rgba(194,132,122,.25) 0%, rgba(10,4,4,.98) 65%)', art:`<svg width="100%" height="100%" viewBox="0 0 400 600" fill="none" preserveAspectRatio="xMidYMid slice"><path d="M200 80L360 300L200 520L40 300Z" stroke="rgba(194,132,122,.15)" stroke-width="1" fill="rgba(194,132,122,.03)"/><path d="M200 160L300 300L200 440L100 300Z" stroke="rgba(194,132,122,.08)" stroke-width=".5" fill="transparent"/><circle cx="200" cy="300" r="12" fill="rgba(194,132,122,.22)"/></svg>` },
  { tag:'Raro', label:'Apple Watch · Onyx', preco:'R$ 9.990', grad:'radial-gradient(ellipse at 50% 42%, rgba(90,90,90,.28) 0%, rgba(4,4,4,.98) 65%)', art:`<svg width="100%" height="100%" viewBox="0 0 400 600" fill="none" preserveAspectRatio="xMidYMid slice"><rect x="120" y="120" width="160" height="360" rx="52" stroke="rgba(130,130,130,.14)" stroke-width="1"/><rect x="145" y="150" width="110" height="300" rx="38" stroke="rgba(130,130,130,.08)" stroke-width=".5"/><circle cx="200" cy="300" r="40" stroke="rgba(130,130,130,.1)" stroke-width=".5"/></svg>` },
]
const reviews = [
  { name:'Rafael M.',  text:'Nunca imaginei que um smartphone pudesse ser uma obra de arte. A peça dourada simplesmente parou o tempo.', city:'São Paulo, SP' },
  { name:'Isabela C.', text:'O cuidado na embalagem, o toque do metal nobre, a atenção ao detalhe — exclusividade que nenhuma marca entrega.', city:'Belo Horizonte, MG' },
  { name:'Lucas T.',   text:'Meu iPhone em titânio é o objeto que mais me orgulho de ter. Cada olhar que recebo confirma que valeu.', city:'Rio de Janeiro, RJ' },
]

/* ─── UTILS ─── */
const fmt = (v) => (v||0).toLocaleString('pt-BR', { minimumFractionDigits:2 })
const openModal = (p) => {
  modal.value = p
  nextTick(() => { document.body.style.overflow = 'hidden'; modalCloseRef.value?.focus() })
}
watch(modal, (val) => { if (!val) document.body.style.overflow = '' })

function handleModalKeydown(e) {
  if (e.key === 'Escape') { modal.value = null; galModal.value = null }
  if (!modal.value || e.key !== 'Tab') return
  const focusable = modalRef.value?.querySelectorAll('button, a, [tabindex]:not([tabindex="-1"])')
  if (!focusable?.length) return
  const first = focusable[0], last = focusable[focusable.length-1]
  if (e.shiftKey) { if (document.activeElement === first) { e.preventDefault(); last.focus() } }
  else            { if (document.activeElement === last)  { e.preventDefault(); first.focus() } }
}

/* ─── CAROUSEL ─── */
const cardWidth = () => { const c = carousel.value?.querySelector('.prod-card'); return c ? c.offsetWidth+16 : 296 }
const goTo      = (idx) => {
  if (!carousel.value || !featured.value.length) return
  slideIdx.value = Math.max(0, Math.min(idx, featured.value.length-1))
  carousel.value.scrollTo({ left: slideIdx.value * cardWidth(), behavior:'smooth' })
}
const nextSlide = () => goTo((slideIdx.value+1) % featured.value.length)
const prevSlide = () => goTo((slideIdx.value-1+featured.value.length) % featured.value.length)
const onScroll  = () => { if (!carousel.value) return; slideIdx.value = Math.min(Math.round(carousel.value.scrollLeft/cardWidth()), featured.value.length-1) }
const dragStart = (e) => { isDrag.value=true; dragX.value=e.pageX-carousel.value.offsetLeft; dragSL.value=carousel.value.scrollLeft; autoPause.value=true }
const dragEnd   = () => { isDrag.value=false; goTo(slideIdx.value); setTimeout(()=>{ autoPause.value=false },800) }
const dragMove  = (e) => { if(!isDrag.value)return; carousel.value.scrollLeft=dragSL.value-(e.pageX-carousel.value.offsetLeft-dragX.value)*1.5 }

const progStyle = computed(() => {
  const c=2*Math.PI*18, f=((slideIdx.value+1)/(featured.value.length||1))*c
  return { strokeDasharray:`${c}`, strokeDashoffset:`${c-f}` }
})

/* ─── TILT 3D ─── */
const tiltCard = (e, i) => {
  const card = techCards.value[i]; if (!card) return
  const r = card.getBoundingClientRect()
  gsap.to(card, { rotateY:(e.clientX-r.left)/r.width*10-5, rotateX:-((e.clientY-r.top)/r.height-.5)*7, duration:.4, ease:'power2.out', transformPerspective:700 })
}
const resetCard = (i) => { const c=techCards.value[i]; if(c) gsap.to(c,{rotateY:0,rotateX:0,duration:.7,ease:'elastic.out(1,.5)'}) }

function animatePillarIcon(i) {
  const el = pillarIconRefs.value[i]; if (!el) return
  gsap.fromTo(el, { rotateY:0 }, { rotateY:360, duration:.5, ease:'power2.inOut' })
}
function animateMaterialIcon(i) {
  const el = matIconRefs.value[i]; if (!el) return
  gsap.fromTo(el, { rotateY:0 }, { rotateY:180, duration:.5, ease:'power2.inOut', yoyo:true, repeat:1 })
}

/* ─── COUNTER ─── */
function animateCounter(el, target, suffix, duration=1.2) {
  const obj = { val:0 }
  gsap.to(obj, {
    val:target, duration, ease:'power2.out',
    onUpdate: ()=>{ const v=Math.round(obj.val); el.textContent=target>=1000?(v/1000).toFixed(1)+'k'+suffix:v+suffix },
    onComplete:()=>{ el.textContent=target>=1000?(target/1000).toFixed(1)+'k'+suffix:target+suffix }
  })
}
function initCounters() {
  if (!statsRef.value) return
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return
      io.unobserve(entry.target)
      statsRef.value.querySelectorAll('.mstat__counter').forEach(el => {
        animateCounter(el, parseInt(el.dataset.target), el.dataset.suffix||'')
      })
    })
  }, { threshold:.5 })
  io.observe(statsRef.value)
}

/* ─── SAKURA ─── */
function getParticleConfig() {
  const t = site.tema
  if (t === 'claro') return { colors:['rgba(212,140,60,','rgba(180,100,40,','rgba(240,160,70,'], count:38, shapes:['leaf','leaf','dot'], speedMult:0.55 }
  if (t === 'gamer') return { colors:['rgba(200,80,20,','rgba(220,80,30,','rgba(180,40,10,'], count:32, shapes:['ember','ember','dot'], speedMult:0.7 }
  return { colors:['rgba(255,183,197,','rgba(255,160,180,','rgba(200,168,75,','rgba(255,200,210,'], count:42, shapes:['petal','petal','dot','petal'], speedMult:0.45 }
}
function createParticle(W, H) {
  const cfg=getParticleConfig(), shape=cfg.shapes[Math.floor(Math.random()*cfg.shapes.length)], color=cfg.colors[Math.floor(Math.random()*cfg.colors.length)]
  return { x:Math.random()*W, y:Math.random()*H-H, size:Math.random()*6+2, speedY:(Math.random()*0.6+0.15)*cfg.speedMult, speedX:(Math.random()-.5)*0.4, rot:Math.random()*Math.PI*2, rotSpeed:(Math.random()-.5)*0.018, opacity:Math.random()*0.4+0.08, opacitySpeed:(Math.random()-.5)*0.003, shape, color, wobble:Math.random()*Math.PI*2, wobbleSpeed:Math.random()*0.025+0.008, wobbleAmp:Math.random()*1.4+0.3 }
}
let particles=[], sakuraCtx=null
function animateCanvas() {
  if (!sakuraCtx||!sakuraCanvas.value) return
  if (document.hidden) { sakuraRaf=requestAnimationFrame(animateCanvas); return }
  const W=sakuraCanvas.value.width, H=sakuraCanvas.value.height
  sakuraCtx.clearRect(0,0,W,H)
  const cfg=getParticleConfig()
  while(particles.length<cfg.count) particles.push(createParticle(W,H))
  while(particles.length>cfg.count) particles.pop()
  particles.forEach((p,i)=>{
    p.wobble+=p.wobbleSpeed; p.x+=p.speedX+Math.sin(p.wobble)*p.wobbleAmp; p.y+=p.speedY; p.rot+=p.rotSpeed; p.opacity+=p.opacitySpeed
    if(p.opacity>0.52) p.opacitySpeed=-Math.abs(p.opacitySpeed)
    if(p.opacity<0.04) p.opacitySpeed=Math.abs(p.opacitySpeed)
    if(p.y>H+20||p.x<-30||p.x>W+30){particles[i]=createParticle(W,H);particles[i].y=-20}
    const ctx=sakuraCtx
    switch(p.shape){
      case'petal':{ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.rot);ctx.globalAlpha=p.opacity;ctx.beginPath();ctx.moveTo(0,-p.size);ctx.quadraticCurveTo(p.size*.6,-p.size*.6,p.size*.5,0);ctx.quadraticCurveTo(p.size*.4,p.size*.8,0,p.size*1.2);ctx.quadraticCurveTo(-p.size*.4,p.size*.8,-p.size*.5,0);ctx.quadraticCurveTo(-p.size*.6,-p.size*.6,0,-p.size);ctx.fillStyle=p.color+p.opacity+')';ctx.fill();ctx.restore();break}
      case'leaf':{ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.rot);ctx.globalAlpha=p.opacity;ctx.beginPath();ctx.ellipse(0,0,p.size*.4,p.size*1.2,0,0,Math.PI*2);ctx.fillStyle=p.color+p.opacity+')';ctx.fill();ctx.restore();break}
      case'ember':{ctx.save();ctx.translate(p.x,p.y);ctx.globalAlpha=p.opacity;const g=ctx.createRadialGradient(0,0,0,0,0,p.size);g.addColorStop(0,p.color+Math.min(p.opacity*2,1)+')');g.addColorStop(1,p.color+'0)');ctx.beginPath();ctx.arc(0,0,p.size,0,Math.PI*2);ctx.fillStyle=g;ctx.fill();ctx.restore();break}
      default:{ctx.save();ctx.translate(p.x,p.y);ctx.globalAlpha=p.opacity*.55;ctx.beginPath();ctx.arc(0,0,p.size*.35,0,Math.PI*2);ctx.fillStyle=p.color+p.opacity+')';ctx.fill();ctx.restore()}
    }
  })
  sakuraRaf=requestAnimationFrame(animateCanvas)
}
function initSakura() {
  const canvas=sakuraCanvas.value; if(!canvas) return
  sakuraCtx=canvas.getContext('2d')
  const resize=()=>{ canvas.width=canvas.offsetWidth||window.innerWidth; canvas.height=canvas.offsetHeight||600 }
  resize(); sakuraRO=new ResizeObserver(resize); sakuraRO.observe(canvas)
  const cfg=getParticleConfig()
  particles=Array.from({length:cfg.count},()=>createParticle(canvas.width,canvas.height))
  particles.forEach(p=>{p.y=Math.random()*canvas.height})
  animateCanvas()
}

/* ─── TORII ─── */
function animateTorii() {
  const paths=toriiRef.value?.querySelectorAll('.torii__path'); if(!paths?.length) return
  paths.forEach((path,i)=>{
    let len=500; try{ len=path.getTotalLength?.()||500 }catch{}
    gsap.set(path,{strokeDasharray:len,strokeDashoffset:len})
    gsap.to(path,{strokeDashoffset:0,duration:1.2,delay:i*.18,ease:'power2.inOut',scrollTrigger:{trigger:'.sec--portal',start:'top 80%',once:true}})
  })
}

/* ─── GSAP SCROLL ─── */
function initGSAP() {
  document.querySelectorAll('[data-reveal]').forEach(el => {
    const t=gsap.fromTo(el,{opacity:0,y:50},{opacity:1,y:0,duration:1.3,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 88%',once:true}})
    triggers.push(t.scrollTrigger)
  })
  gsap.from('.pillar',{opacity:0,y:40,rotateY:-12,stagger:{amount:.55},duration:1,ease:'power2.out',scrollTrigger:{trigger:'.pillars',start:'top 82%',once:true}})
  gsap.from('.cg__frame',{opacity:0,x:60,stagger:{amount:.55,from:'start'},duration:1.1,ease:'power3.out',scrollTrigger:{trigger:'.cg__reel',start:'top 85%',once:true}})
  gsap.from('.manifesto',{opacity:0,y:30,duration:1.1,ease:'power3.out',scrollTrigger:{trigger:'.manifesto',start:'top 74%',once:true}})
  gsap.from('.tech-card',{opacity:0,y:32,rotateY:-10,stagger:{amount:.45},duration:1,ease:'power2.out',scrollTrigger:{trigger:'.tech-grid',start:'top 82%',once:true}})
  matRefs.value.forEach((el,i)=>{ if(!el) return; gsap.from(el,{clipPath:'inset(0 100% 0 0)',opacity:0,duration:1,delay:i*.15,ease:'power3.out',scrollTrigger:{trigger:'.materials',start:'top 82%',once:true}}) })
  gsap.from('.od-mon',{opacity:0,rotateY:360,duration:1.1,ease:'back.out(2)',scrollTrigger:{trigger:'.oriental-divider',start:'top 88%',once:true}})
  gsap.from('.od-line',{scaleX:0,duration:.85,stagger:.15,ease:'power2.out',transformOrigin:'center',scrollTrigger:{trigger:'.oriental-divider',start:'top 88%',once:true}})
  gsap.from('.portal__torii',{opacity:0,y:80,scale:.94,duration:2,ease:'power3.out',scrollTrigger:{trigger:'.sec--portal',start:'top 80%',once:true}})
  gsap.from('.portal__mon',{opacity:0,scale:0,rotation:-180,duration:1.4,ease:'back.out(1.8)',scrollTrigger:{trigger:'.sec--portal',start:'top 72%',once:true}})
  gsap.from('.exclus__title',{opacity:0,y:50,duration:1.4,ease:'power3.out',scrollTrigger:{trigger:'.sec--portal',start:'top 72%',once:true}})
  gsap.from('.review',{opacity:0,y:26,stagger:.14,duration:1,ease:'power3.out',scrollTrigger:{trigger:'.reviews',start:'top 80%',once:true}})
  gsap.from('.concierge__left',{opacity:0,x:-32,duration:1.1,ease:'power3.out',scrollTrigger:{trigger:'.concierge',start:'top 80%',once:true}})
  gsap.from('.concierge__right',{opacity:0,x:32,duration:1.1,ease:'power3.out',scrollTrigger:{trigger:'.concierge',start:'top 80%',once:true}})
  gsap.from('.forge__stage',{opacity:0,x:-40,duration:1.1,ease:'power3.out',scrollTrigger:{trigger:'.sec--forge',start:'top 80%',once:true}})
  gsap.from('.forge__controls',{opacity:0,x:40,duration:1.1,ease:'power3.out',scrollTrigger:{trigger:'.sec--forge',start:'top 80%',once:true}})
  animateTorii()
  initCounters()
}

const handleVisibility = () => {
  if (document.hidden && sakuraRaf) { cancelAnimationFrame(sakuraRaf); sakuraRaf=null }
  else if (!document.hidden && !sakuraRaf) animateCanvas()
}

/* ─── LIFECYCLE ─── */
onMounted(async () => {
  await prodStore.fetchProdutos({ destaque:'true' })
  featured.value = prodStore.destaques || []
  loading.value  = false
  await nextTick()
  initGSAP()
  initSakura()
  initForge()
  autoTimer = setInterval(() => {
    if (!autoPause.value && !modal.value && featured.value.length > 1) nextSlide()
  }, 3800)
  carouselRO = new ResizeObserver(() => { if(carousel.value) goTo(slideIdx.value) })
  if (carousel.value) carouselRO.observe(carousel.value)
  document.addEventListener('visibilitychange', handleVisibility)
  document.addEventListener('keydown', handleModalKeydown)
})

onUnmounted(() => {
  if (autoTimer)  clearInterval(autoTimer)
  if (sakuraRaf)  cancelAnimationFrame(sakuraRaf)
  if (sakuraRO)   sakuraRO.disconnect()
  if (carouselRO) carouselRO.disconnect()
  destroyForge()
  triggers.forEach(t => t?.kill())
  document.removeEventListener('visibilitychange', handleVisibility)
  document.removeEventListener('keydown', handleModalKeydown)
  document.body.style.overflow = ''
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Syne:wght@300;400;600;700;800&family=DM+Mono:wght@300;400&display=swap');

.home {
  --h-gold:  var(--cor-primaria,   #C8A84B);
  --h-gold2: var(--cor-secundaria, #F5D78E);
  --h-void:  var(--cor-fundo,      #05050c);
  --h-surf:  var(--cor-superficie, #0d0d18);
  --h-text:  var(--cor-texto,      rgba(237,232,224,0.92));
  --h-text2: var(--cor-texto-2,    rgba(237,232,224,0.55));
  --h-text3: var(--cor-texto-3,    rgba(237,232,224,0.28));
  --h-hair:  var(--cor-borda,      rgba(200,168,75,0.14));
  --h-hairH: var(--cor-borda-h,    rgba(200,168,75,0.4));
  --realm-accent: #C8A84B;
  --realm-accent-rgb: 200,168,75;
  --ease: cubic-bezier(0.16,1,0.30,1);
  background: var(--h-void);
  color:      var(--h-text);
  font-family:'Syne', var(--font-sans, sans-serif);
}

:global(body.light-mode) .home { --h-gold:#3D6CBF; --h-gold2:#7A9CC8; --h-void:#EAF0F8; --h-surf:#FFFFFF; --h-text:#0D0D20; --h-text2:rgba(13,13,32,0.82); --h-text3:rgba(13,13,32,0.58); --h-hair:rgba(61,108,191,0.18); --h-hairH:rgba(61,108,191,0.50); }
:global(body.gamer-mode) .home  { --h-gold:#C85014; --h-gold2:#E8830A; --h-void:#0A0A0F; --h-surf:#12120A; --h-hair:rgba(200,80,20,0.18); --h-hairH:rgba(200,80,20,0.5); }

@keyframes goldShine    { from{background-position:0% center} to{background-position:200% center} }
@keyframes pulseRing    { 0%{transform:scale(.5);opacity:.8} 100%{transform:scale(2.8);opacity:0} }
@keyframes kanjiPulse   { 0%,100%{opacity:.06} 50%{opacity:.13} }
@keyframes tickerMove   { from{transform:translateX(0)} to{transform:translateX(-33.333%)} }
@keyframes bridgeGlow   { 0%,100%{opacity:.28;transform:scale(1)} 50%{opacity:.65;transform:scale(1.2)} }
@keyframes monSpin      { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
@keyframes monPulse     { 0%,100%{opacity:.55;filter:drop-shadow(0 0 4px rgba(200,168,75,.2))} 50%{opacity:.9;filter:drop-shadow(0 0 12px rgba(200,168,75,.5))} }
@keyframes cornerPulse  { 0%,100%{opacity:.2} 50%{opacity:.55} }
@keyframes vagasBlink   { 0%,100%{opacity:.35} 50%{opacity:.55} }
@keyframes ringRotate   { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
@keyframes beamSway     { from{transform:skewX(-6deg) translateX(-30px)} to{transform:skewX(6deg) translateX(30px)} }
@keyframes skelPulse    { 0%,100%{background-color:var(--h-surf)} 50%{background-color:rgba(200,168,75,.05)} }
@keyframes phoneFloat   { 0%,100%{transform:translateY(0) rotateY(-3deg) rotateX(1.5deg)} 50%{transform:translateY(-16px) rotateY(3deg) rotateX(-1.5deg)} }
@keyframes orbitRotate1 { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
@keyframes orbitRotate2 { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
@keyframes forgePulse   { 0%,100%{opacity:.08;transform:scale(1)} 50%{opacity:.18;transform:scale(1.06)} }
@keyframes emberDrift1  { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(60px,-40px) scale(1.3)} }
@keyframes emberDrift2  { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-50px,-30px) scale(0.8)} }
@keyframes emberDrift3  { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(30px,50px) scale(1.15)} }
@keyframes cgHoleAnim   { 0%,100%{opacity:.35} 50%{opacity:.65} }
@keyframes glareSlide   { 0%{transform:translateX(-200%) skewX(-18deg)} 100%{transform:translateX(300%) skewX(-18deg)} }
@keyframes forgeScanline { 0%{transform:translateY(-100%)} 100%{transform:translateY(100vh)} }

.wrap { width:76%; max-width:1280px; margin:0 auto; }
.sec  { padding:clamp(88px,8vw,130px) 0; border:.5px solid var(--h-hair); position:relative; overflow:hidden; background:var(--h-void); }
.sec__kicker  { display:flex; flex-direction:column; align-items:center; gap:10px; flex-shrink:0; }
.sec__num     { font-family:'DM Mono',monospace; font-size:9px; letter-spacing:.3em; color:var(--h-gold); opacity:.45; }
.kicker__line { width:.5px; height:48px; background:linear-gradient(to bottom,var(--h-gold),transparent); opacity:.3; }
.sec__head    { display:flex; align-items:flex-start; gap:32px; margin-bottom:64px; }
.sec__titles  { display:flex; flex-direction:column; gap:10px; }
.home .eyebrow { color:var(--h-gold) !important; -webkit-text-fill-color:var(--h-gold) !important; }
.heading    { font-family:'Cormorant Garamond',serif; font-size:clamp(1.9rem,3.6vw,3.5rem); font-weight:300; color:var(--h-text); margin:0; line-height:1.06; }
.heading em { font-style:italic; color:var(--h-gold); }
.sec__grid-bg { position:absolute; inset:0; background-image:linear-gradient(rgba(200,168,75,.022) 1px,transparent 1px),linear-gradient(90deg,rgba(200,168,75,.022) 1px,transparent 1px); background-size:80px 80px; pointer-events:none; }

.hero-bridge { position:relative; height:140px; margin-top:-140px; background:linear-gradient(to bottom,transparent 0%,rgba(5,5,12,.0) 35%,rgba(5,5,12,.3) 70%,var(--h-void) 100%); z-index:5; pointer-events:none; display:flex; align-items:center; justify-content:center; }
.bridge__ornament { position:relative; z-index:1; display:flex; align-items:center; gap:14px; }
.bridge__line { width:120px; height:.5px; background:linear-gradient(to right,transparent,var(--h-gold)); opacity:.24; animation:bridgeGlow 3.5s ease-in-out infinite; }
.bridge__line--r { background:linear-gradient(to left,transparent,var(--h-gold)); animation-delay:1.75s; }
.bridge__gem { font-size:6px; color:var(--h-gold); opacity:.5; animation:bridgeGlow 3.5s ease-in-out infinite .875s; }

.home-ticker  { overflow:hidden; border-top:.5px solid var(--h-hair); border-bottom:.5px solid var(--h-hair); padding:14px 0; background:var(--h-surf); }
.ticker__track{ display:flex; white-space:nowrap; animation:tickerMove 28s linear infinite; }
.ticker__set  { display:inline-flex; align-items:center; }
.ticker__item { font-family:'DM Mono',monospace; font-size:9px; letter-spacing:.4em; text-transform:uppercase; color:var(--h-text3); padding:0 32px; flex-shrink:0; }
.ticker__sep  { color:var(--h-gold); font-size:5px; opacity:.5; flex-shrink:0; }

.sec--pillars { border-top:none; }
.pillars { display:grid; grid-template-columns:repeat(4,1fr); gap:0; border-left:.5px solid var(--h-hair); border-top:.5px solid var(--h-hair); }
.pillar { padding:48px 32px; border-right:.5px solid var(--h-hair); border-bottom:.5px solid var(--h-hair); position:relative; overflow:hidden; transition:background .5s; }
.pillar__glow { position:absolute; bottom:-60px; left:50%; transform:translateX(-50%); width:160px; height:160px; border-radius:50%; background:radial-gradient(circle,rgba(var(--realm-accent-rgb),.14),transparent 70%); opacity:0; transition:opacity .5s; pointer-events:none; }
.pillar:hover { background:rgba(var(--realm-accent-rgb),.025); }
.pillar:hover .pillar__glow { opacity:1; }
.pillar::before { content:''; position:absolute; top:0; left:0; right:0; height:.5px; background:linear-gradient(90deg,var(--h-gold),transparent); transform:scaleX(0); transform-origin:left; transition:transform .6s var(--ease); opacity:.6; }
.pillar:hover::before { transform:scaleX(1); }
.pillar__corner { position:absolute; width:10px; height:10px; border-color:var(--h-hairH); border-style:solid; opacity:0; transition:opacity .4s; }
.pillar__corner--tl { top:8px; left:8px; border-width:.5px 0 0 .5px; }
.pillar__corner--br { bottom:8px; right:8px; border-width:0 .5px .5px 0; }
.pillar:hover .pillar__corner { opacity:1; }
.pillar__kanji { position:absolute; right:10px; top:8px; font-family:'Cormorant Garamond',serif; font-size:3rem; font-weight:300; color:var(--h-gold); opacity:.06; pointer-events:none; line-height:1; transition:opacity .5s,transform .5s; animation:kanjiPulse 7s ease-in-out infinite; }
.pillar:hover .pillar__kanji { opacity:.22; transform:scale(1.08); }
.pillar__index { font-family:'DM Mono',monospace; font-size:9px; letter-spacing:.2em; color:var(--h-gold); opacity:.3; margin-bottom:22px; }
.pillar__icon  { color:var(--h-gold); margin-bottom:18px; opacity:.65; transition:opacity .3s; }
.pillar:hover .pillar__icon { opacity:1; }
.pillar__title { font-size:10px; font-weight:700; letter-spacing:.18em; text-transform:uppercase; color:var(--h-text); margin:0 0 12px; }
.pillar__desc  { font-size:12px; color:var(--h-text3); line-height:1.9; margin:0 0 26px; }
.pillar__line  { height:.5px; width:0; background:linear-gradient(to right,var(--h-gold),transparent); transition:width .6s var(--ease); }
.pillar:hover .pillar__line { width:100%; }

.sec--manifesto { position:relative; }
.manifesto__bg-text { position:absolute; right:-2%; top:50%; transform:translateY(-50%); font-family:'Cormorant Garamond',serif; font-size:clamp(8rem,18vw,16rem); font-weight:300; font-style:italic; color:transparent; -webkit-text-stroke:.5px rgba(200,168,75,.055); pointer-events:none; user-select:none; line-height:1; white-space:nowrap; }
.manifesto__brush { position:absolute; left:0; top:10%; bottom:10%; width:2px; background:linear-gradient(to bottom,transparent,rgba(200,168,75,.07),transparent); pointer-events:none; }
.manifesto { display:grid; grid-template-columns:1fr 1fr; gap:88px; align-items:center; }
.manifesto__left { display:flex; flex-direction:column; gap:12px; }
.manifesto__headline { margin:12px 0 30px; line-height:1.0; }
.mh__light { display:block; font-family:'Syne',sans-serif; font-size:clamp(1.9rem,4vw,3.6rem); font-weight:300; color:var(--h-text2); letter-spacing:-.01em; text-transform:uppercase; line-height:1; }
.mh__script { display:block; font-family:'Cormorant Garamond',serif; font-size:clamp(2rem,7vw,6.5rem); font-weight:300; font-style:italic; line-height:1; color:var(--h-gold); opacity:.7; }
@supports (-webkit-text-stroke: 1px transparent) { .mh__script { color:transparent; -webkit-text-stroke:1px var(--h-gold); opacity:.8; } }
.manifesto__stats { display:flex; gap:32px; padding-top:26px; border-top:.5px solid var(--h-hair); }
.mstat { display:flex; flex-direction:column; gap:5px; }
.mstat__num { font-family:'Cormorant Garamond',serif; font-size:1.9rem; font-weight:300; color:var(--h-gold); line-height:1; }
.mstat__lbl { font-size:7px; letter-spacing:.38em; text-transform:uppercase; color:var(--h-text3); }
.manifesto__right { display:flex; flex-direction:column; gap:20px; position:relative; padding:36px; }
.manifesto__frame { position:absolute; inset:0; pointer-events:none; }
.mf__corner { position:absolute; width:20px; height:20px; border-color:var(--h-hairH); border-style:solid; display:block; animation:cornerPulse 4s ease-in-out infinite; }
.mf__corner--tl { top:0; left:0;  border-width:.5px 0 0 .5px; }
.mf__corner--tr { top:0; right:0; border-width:.5px .5px 0 0; animation-delay:.5s; }
.mf__corner--bl { bottom:0; left:0;  border-width:0 0 .5px .5px; animation-delay:1s; }
.mf__corner--br { bottom:0; right:0; border-width:0 .5px .5px 0; animation-delay:1.5s; }
.manifesto__lead { font-family:'Cormorant Garamond',serif; font-size:16px; font-style:italic; font-weight:300; color:var(--h-gold); line-height:1.7; opacity:.85; }
.manifesto__body { font-size:13px; color:var(--h-text3); line-height:1.95; }
.manifesto__link { display:inline-flex; align-items:center; gap:10px; font-size:9px; font-weight:600; letter-spacing:.4em; text-transform:uppercase; color:var(--h-text3); text-decoration:none; border-bottom:.5px solid var(--h-hair); padding-bottom:6px; align-self:flex-start; transition:color .3s,border-color .3s,gap .3s; }
.manifesto__link:hover { color:var(--h-gold); border-color:var(--h-gold); gap:16px; }

/* ══════════════════════════════════════
   04 — GALERIA CINEMATOGRÁFICA
══════════════════════════════════════ */
.sec--cinegallery {
  padding:clamp(60px,6vw,100px) 0;
  overflow:hidden;
  background:var(--h-void);
  position:relative;
}

/* Film strip holes laterais */
.cg__filmstrip {
  position:absolute; top:0; bottom:0; left:0;
  display:flex; flex-direction:column; justify-content:space-around;
  padding:24px 0; pointer-events:none; z-index:2; width:28px;
}
.cg__filmstrip--r { left:auto; right:0; }
.cg__hole {
  width:12px; height:12px; margin:0 8px;
  border-radius:2px; border:.5px solid rgba(200,168,75,.18);
  background:rgba(200,168,75,.04);
  animation:cgHoleAnim 3s ease-in-out infinite;
}
.cg__hole:nth-child(even) { animation-delay:.5s; }

.cg__head {
  display:flex; justify-content:space-between; align-items:flex-end;
  padding:0 clamp(36px,5vw,80px) 40px;
  max-width:1400px; margin:0 auto;
}
.cg__head-left { display:flex; align-items:flex-start; gap:28px; }
.cg__head-scroll { display:flex; align-items:center; gap:14px; }
.cg__scroll-text { font-family:'Cormorant Garamond',serif; font-size:1.5rem; font-style:italic; color:var(--h-gold); opacity:.3; line-height:1; }
.cg__scroll-line { width:48px; height:.5px; background:linear-gradient(to right,var(--h-gold),transparent); opacity:.3; }
.cg__scroll-label { font-family:'DM Mono',monospace; font-size:8px; letter-spacing:.35em; text-transform:uppercase; color:var(--h-text3); }

/* REEL de frames */
.cg__reel-wrap { overflow:hidden; padding:0 28px; }
.cg__reel {
  display:flex; gap:16px;
  padding:20px clamp(20px,4vw,60px) 36px;
  overflow-x:auto; scroll-snap-type:x mandatory;
  scrollbar-width:none; cursor:grab;
}
.cg__reel:active { cursor:grabbing; }
.cg__reel::-webkit-scrollbar { display:none; }

/* Frame individual — proporção de filme */
.cg__frame {
  flex-shrink:0;
  width:clamp(240px,28vw,340px);
  height:clamp(360px,42vw,520px);
  scroll-snap-align:start;
  position:relative; overflow:hidden;
  cursor:pointer;
  border:.5px solid rgba(200,168,75,.1);
  transition:
    border-color .5s var(--ease),
    transform .6s var(--ease);
}
.cg__frame::before {
  content:'';
  position:absolute; top:0; left:0; right:0; height:.5px;
  background:linear-gradient(90deg,transparent,var(--h-gold),transparent);
  opacity:0; transition:opacity .4s;
}
.cg__frame:hover { border-color:rgba(200,168,75,.35); transform:translateY(-8px) scale(1.015); }
.cg__frame:hover::before { opacity:.8; }
.cg__frame.is-active { border-color:rgba(200,168,75,.5); }

/* Background gradiente */
.cg__frame-bg { position:absolute; inset:0; }

/* Arte SVG */
.cg__frame-art {
  position:absolute; inset:0;
  display:flex; align-items:center; justify-content:center;
  opacity:.9; transition:opacity .4s, transform .7s var(--ease);
}
.cg__frame:hover .cg__frame-art { opacity:1; transform:scale(1.04); }

/* Número de filme */
.cg__frame-num {
  position:absolute; top:16px; left:18px; z-index:3;
  font-family:'DM Mono',monospace; font-size:9px; letter-spacing:.35em;
  color:rgba(200,168,75,.45);
  display:flex; align-items:center; gap:6px;
}
.cg__frame-num::before {
  content:''; display:block;
  width:16px; height:.5px;
  background:rgba(200,168,75,.35);
}

/* Tag de categoria */
.cg__frame-tag {
  position:absolute; top:16px; right:18px; z-index:3;
  font-size:7px; letter-spacing:.35em; text-transform:uppercase;
  color:var(--h-gold);
  border:.5px solid rgba(200,168,75,.35);
  background:rgba(200,168,75,.07);
  padding:4px 10px;
  backdrop-filter:blur(4px);
  transition:transform .4s var(--ease);
}
.cg__frame:hover .cg__frame-tag { transform:translateY(-2px); }

/* Painel info — sobe no hover */
.cg__frame-info {
  position:absolute; bottom:0; left:0; right:0; z-index:3;
  padding:0 20px 24px;
  background:linear-gradient(to top,rgba(5,5,12,.95) 0%,rgba(5,5,12,.6) 60%,transparent 100%);
  transform:translateY(12px);
  opacity:0;
  transition:transform .5s var(--ease), opacity .4s;
}
.cg__frame:hover .cg__frame-info { transform:translateY(0); opacity:1; }
.cg__info-bar { width:24px; height:.5px; background:var(--h-gold); opacity:.6; margin-bottom:12px; }
.cg__info-label { font-size:10px; letter-spacing:.25em; text-transform:uppercase; color:rgba(237,232,224,.75); margin-bottom:6px; }
.cg__info-price { font-family:'Cormorant Garamond',serif; font-size:1.4rem; font-weight:300; color:var(--h-gold); margin-bottom:14px; }
.cg__info-cta { display:inline-flex; align-items:center; gap:8px; font-size:8px; letter-spacing:.35em; text-transform:uppercase; color:var(--h-gold); opacity:.75; transition:opacity .25s, gap .3s; }
.cg__info-cta:hover { opacity:1; gap:14px; }

/* Grain overlay */
.cg__frame-grain {
  position:absolute; inset:0; z-index:2; pointer-events:none;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E");
  mix-blend-mode:overlay;
}

/* Glare lateral que passa no hover */
.cg__frame-glare {
  position:absolute; inset:0; z-index:4;
  background:linear-gradient(110deg,transparent 30%,rgba(255,255,255,.06) 50%,transparent 70%);
  transform:translateX(-200%) skewX(-18deg);
  pointer-events:none;
}
.cg__frame:hover .cg__frame-glare {
  animation:glareSlide .7s var(--ease) forwards;
}

/* Indicadores */
.cg__indicators {
  display:flex; justify-content:center; gap:8px;
  padding:0 0 8px;
}
.cg__dot {
  width:16px; height:2px;
  background:var(--h-hair);
  border-radius:1px;
  transition:width .4s var(--ease), background .3s;
}
.cg__dot.is-active { width:28px; background:var(--h-gold); }

/* ══ ORIENTAL DIVIDER ══ */
.oriental-divider { position:relative; display:flex; align-items:center; justify-content:center; padding:44px 12%; background:var(--h-void); border-top:.5px solid var(--h-hair); border-bottom:.5px solid var(--h-hair); gap:16px; }
.od-line { flex:1; max-width:180px; height:.5px; background:linear-gradient(to right,transparent,var(--h-hairH)); }
.od-line--r { background:linear-gradient(to left,transparent,var(--h-hairH)); }
.od-gem { font-size:5px; color:var(--h-gold); opacity:.45; }
.od-mon { width:56px; height:56px; border-radius:50%; border:.5px solid var(--h-hairH); display:flex; align-items:center; justify-content:center; font-family:'Cormorant Garamond',serif; font-size:1.4rem; font-style:italic; color:var(--h-gold); opacity:.65; margin:0 10px; position:relative; }
.od-mon::before { content:''; position:absolute; inset:4px; border-radius:50%; border:.5px solid var(--h-hair); }
.od-mini-line { width:24px; height:.5px; background:var(--h-hairH); opacity:.4; }
.od-center { display:flex; align-items:center; justify-content:center; }
.od-mon-wrap { position:relative; display:flex; align-items:center; justify-content:center; }
.od-ring { position:absolute; border-radius:50%; border:.5px solid var(--h-hairH); opacity:.25; }
.od-ring--1 { width:72px; height:72px; animation:ringRotate 18s linear infinite; }
.od-ring--2 { width:90px; height:90px; animation:ringRotate 30s linear infinite reverse; }

/* ══ TECH ══ */
.tech-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:0; border-left:.5px solid var(--h-hair); border-top:.5px solid var(--h-hair); }
.tech-card { padding:48px 32px 40px; border-right:.5px solid var(--h-hair); border-bottom:.5px solid var(--h-hair); position:relative; overflow:hidden; transition:background .4s; transform-style:preserve-3d; perspective:600px; cursor:default; }
.tech-card__beam { position:absolute; top:0; left:50%; transform:translateX(-50%); width:1px; height:0; background:linear-gradient(to bottom,var(--h-gold),transparent); opacity:0; transition:height .6s var(--ease),opacity .4s; }
.tech-card__beam--2 { width:20px; filter:blur(6px); opacity:0; transition:height .6s var(--ease),opacity .4s .1s; }
.tech-card:hover { background:rgba(var(--realm-accent-rgb),.025); }
.tech-card:hover .tech-card__beam    { height:55%; opacity:.4; }
.tech-card:hover .tech-card__beam--2 { height:55%; opacity:.2; }
.tech-card__index { font-family:'DM Mono',monospace; font-size:8px; letter-spacing:.25em; color:var(--h-gold); opacity:.25; margin-bottom:12px; }
.tech-card__num   { font-family:'Cormorant Garamond',serif; font-size:clamp(2rem,3.2vw,3rem); font-style:italic; font-weight:300; color:var(--h-gold); opacity:.42; display:block; margin-bottom:14px; line-height:1; transition:opacity .3s; }
.tech-card:hover .tech-card__num { opacity:.82; }
.tech-card__name { font-size:9px; letter-spacing:.3em; text-transform:uppercase; font-weight:700; color:var(--h-text2); margin:0 0 11px; }
.tech-card__desc { font-size:12px; color:var(--h-text3); line-height:1.8; margin:0 0 18px; }
.tech-card__bar  { height:.5px; width:0; background:linear-gradient(to right,var(--h-gold),transparent); transition:width .6s var(--ease); }
.tech-card:hover .tech-card__bar { width:60%; }

/* ══ MATERIAIS ══ */
.sec--materials { padding-bottom:0; }
.materials { display:grid; grid-template-columns:repeat(3,1fr); gap:0; border-top:.5px solid var(--h-hair); border-left:.5px solid var(--h-hair); }
.mat { padding:52px 40px; border-right:.5px solid var(--h-hair); border-bottom:.5px solid var(--h-hair); display:flex; flex-direction:column; gap:13px; position:relative; overflow:hidden; transition:background .4s; }
.mat:hover { background:rgba(var(--realm-accent-rgb),.02); }
.mat::before { content:''; position:absolute; top:0;left:0;right:0;height:.5px; background:linear-gradient(90deg,var(--h-gold),transparent); opacity:0; transition:opacity .5s; }
.mat:hover::before { opacity:.5; }
.mat__abbr { position:absolute; top:14px; right:20px; font-family:'Cormorant Garamond',serif; font-size:3.8rem; font-style:italic; font-weight:300; color:var(--h-gold); opacity:.1; line-height:1; pointer-events:none; transition:opacity .4s,transform .4s; }
.mat:hover .mat__abbr { opacity:.22; transform:scale(1.1); }
.mat__icon { color:var(--h-gold); opacity:.55; }
.mat:hover .mat__icon { opacity:.9; }
.mat__title { font-size:10px; letter-spacing:.25em; text-transform:uppercase; font-weight:700; color:var(--h-text2); }
.mat__desc  { font-size:12px; color:var(--h-text3); line-height:1.85; }
.mat__specs { display:flex; flex-direction:column; gap:6px; padding-top:12px; border-top:.5px solid var(--h-hair); margin-top:4px; }
.mat__specs li { font-family:'DM Mono',monospace; font-size:9px; letter-spacing:.15em; color:var(--h-text3); padding-left:14px; position:relative; }
.mat__specs li::before { content:'—'; position:absolute; left:0; color:var(--h-gold); opacity:.4; font-size:8px; }
.mat__progress { height:.5px; background:var(--h-hair); margin-top:auto; overflow:hidden; }
.mat__progress-fill { height:100%; width:0; background:linear-gradient(to right,var(--h-gold),transparent); transition:width .8s var(--ease); }
.mat:hover .mat__progress-fill { width:100%; }

/* ══════════════════════════════════════
   07 — FORGE (CONFIGURADOR)
══════════════════════════════════════ */
.sec--forge {
  padding:clamp(88px,8vw,130px) 0;
  border:.5px solid var(--h-hair);
  background:var(--h-void);
  position:relative;
  overflow:hidden;
}

/* Fundo atmosférico */
.forge__ambient {
  position:absolute; inset:0; pointer-events:none; z-index:0;
}
.forge__ember {
  position:absolute; border-radius:50%;
  filter:blur(120px); pointer-events:none;
}
.forge__ember--1 { width:500px; height:500px; top:-100px; right:-80px; background:radial-gradient(circle,rgba(200,168,75,.08),transparent 70%); animation:emberDrift1 16s ease-in-out infinite; }
.forge__ember--2 { width:400px; height:400px; bottom:0; left:-60px; background:radial-gradient(circle,rgba(200,168,75,.05),transparent 70%); animation:emberDrift2 20s ease-in-out infinite; }
.forge__ember--3 { width:300px; height:300px; top:50%; left:40%; background:radial-gradient(circle,rgba(200,168,75,.04),transparent 70%); animation:emberDrift3 12s ease-in-out infinite; }
.forge__grid-lines {
  position:absolute; inset:0;
  background-image:linear-gradient(rgba(200,168,75,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(200,168,75,.018) 1px,transparent 1px);
  background-size:60px 60px;
}
.forge__particles { position:absolute; inset:0; width:100%; height:100%; }

.forge__layout {
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:80px;
  align-items:center;
  position:relative; z-index:1;
}

/* ── STAGE (painel esquerdo preview) ── */
.forge__stage {
  position:relative;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  min-height:640px;
  perspective:1400px;
}

/* Scanlines hologramáticas */
.forge__scanlines {
  position:absolute; inset:0; pointer-events:none; z-index:0;
  background:repeating-linear-gradient(
    to bottom,
    transparent 0,
    transparent 5px,
    rgba(200,168,75,.012) 5px,
    rgba(200,168,75,.012) 6px
  );
  animation:forgeScanline 8s linear infinite;
  opacity:.5;
}

/* Anel orbital */
.forge__orbit {
  position:absolute; inset:0; pointer-events:none;
  display:flex; align-items:center; justify-content:center;
}
.forge__orbit-ring {
  position:absolute; border-radius:50%;
  border:.5px solid rgba(200,168,75,.12);
}
.forge__orbit-ring--1 { width:380px; height:380px; animation:orbitRotate1 24s linear infinite; }
.forge__orbit-ring--2 { width:440px; height:440px; animation:orbitRotate2 36s linear infinite; border-style:dashed; border-color:rgba(200,168,75,.07); }
.forge__orbit-dot {
  position:absolute;
  width:4px; height:4px; border-radius:50%;
  background:var(--h-gold);
  opacity:.4;
  /* distribuídos em círculo */
  transform:
    rotate(calc(var(--dn) * 60deg))
    translateX(190px)
    rotate(calc(var(--dn) * -60deg));
  animation:monPulse 3s ease-in-out infinite;
  animation-delay: calc(var(--dn) * 0.5s);
}

/* Dispositivo */
.forge__device-wrap {
  position:relative;
  transform-style:preserve-3d;
  animation:phoneFloat 5.5s ease-in-out infinite;
  z-index:2;
}
.forge__device-wrap:hover { animation-play-state:paused; }

.forge__device {
  width:clamp(150px,16vw,200px);
  background:
    linear-gradient(
      160deg,
      color-mix(in srgb, var(--metal, #C8A84B) 80%, white 20%) 0%,
      var(--metal, #C8A84B) 40%,
      color-mix(in srgb, var(--metal, #C8A84B) 70%, black 30%) 100%
    );
  padding:3px;
  border-radius:38px;
  box-shadow:
    0 60px 120px rgba(0,0,0,.85),
    inset 0 1px 0 rgba(255,255,255,.35),
    0 0 80px rgba(200,168,75,.08);
  transition:background .6s;
}
.forge__device-shine {
  position:absolute; top:0; right:0;
  width:3px; height:40%;
  background:linear-gradient(to bottom,transparent,rgba(255,255,255,.35),transparent);
  border-radius:2px;
  z-index:10; pointer-events:none;
}
.forge__device-body {
  background:#05050c;
  border-radius:36px;
  overflow:hidden;
  display:flex;
  flex-direction:column;
  min-height:clamp(320px,36vw,420px);
  position:relative;
}
.forge__device-island { width:72px; height:26px; background:#000; border-radius:0 0 18px 18px; margin:0 auto; flex-shrink:0; }
.forge__device-hud { padding:6px 16px; display:flex; justify-content:space-between; align-items:center; flex-shrink:0; }
.forge__device-time { font-family:'DM Mono',monospace; font-size:9px; font-weight:700; color:rgba(237,232,224,.45); }
.forge__device-model { font-family:'DM Mono',monospace; font-size:7px; letter-spacing:.2em; color:rgba(200,168,75,.35); }
.forge__device-screen { flex:1; padding:8px 14px 14px; display:flex; flex-direction:column; gap:10px; }
.forge__device-badge { font-size:7px; letter-spacing:.45em; font-weight:800; color:var(--h-gold); background:rgba(200,168,75,.08); border:.5px solid rgba(200,168,75,.15); padding:4px 10px; align-self:flex-start; }
.forge__device-lines { display:flex; flex-direction:column; gap:5px; }
.forge__device-line { height:6px; border-radius:3px; background:rgba(200,168,75,.1); }

/* Especificações no ecrã */
.forge__device-specs { display:flex; gap:6px; flex-wrap:wrap; }
.forge__spec-chip {
  flex:1; min-width:60px;
  background:rgba(200,168,75,.04);
  border:.5px solid rgba(200,168,75,.1);
  padding:6px 8px;
  display:flex; flex-direction:column; gap:2px;
}
.forge__spec-val { font-family:'DM Mono',monospace; font-size:8px; color:var(--h-gold); letter-spacing:.05em; }
.forge__spec-k   { font-size:6px; letter-spacing:.3em; text-transform:uppercase; color:rgba(237,232,224,.25); }

.forge__device-price-row { display:flex; justify-content:space-between; align-items:center; margin-top:4px; }
.forge__device-pval { font-family:'Cormorant Garamond',serif; font-size:1rem; color:var(--h-gold); font-style:italic; }
.forge__device-add { width:22px; height:22px; border-radius:50%; background:var(--h-gold); color:#05050c; font-size:14px; font-weight:700; display:flex; align-items:center; justify-content:center; }
.forge__device-bar { width:76px; height:4px; border-radius:2px; background:rgba(255,255,255,.15); margin:0 auto 10px; flex-shrink:0; }

/* Sombra projetada */
.forge__device-shadow {
  position:absolute; bottom:-40px; left:50%; transform:translateX(-50%);
  width:200px; height:60px;
  border-radius:50%;
  filter:blur(28px);
  opacity:.35;
  pointer-events:none;
  transition:background .5s;
}

/* Tag flutuante de material */
.forge__material-tag {
  position:absolute; bottom:-60px; left:50%; transform:translateX(-50%);
  display:inline-flex; align-items:center; gap:8px;
  border:.5px solid transparent;
  background:rgba(5,5,12,.75);
  backdrop-filter:blur(8px);
  padding:7px 16px;
  font-family:'DM Mono',monospace; font-size:8px; letter-spacing:.2em; text-transform:uppercase;
  color:var(--h-text3);
  transition:border-color .4s, opacity .4s;
  white-space:nowrap;
  z-index:3;
}
.forge__mt-dot { width:7px; height:7px; border-radius:50%; flex-shrink:0; transition:background .4s; }
.forge__mt-sep { color:var(--h-text3); opacity:.4; }

/* Glow pulsante */
.forge__glow-ambient {
  position:absolute; width:340px; height:340px;
  border-radius:50%; filter:blur(100px);
  opacity:.12; pointer-events:none;
  transition:background .6s;
  top:50%; left:50%; transform:translate(-50%,-50%);
  animation:forgePulse 5s ease-in-out infinite;
}

/* ── CONTROLS (painel direito) ── */
.forge__controls {
  display:flex;
  flex-direction:column;
  gap:32px;
  position:relative; z-index:1;
}

.forge__group { display:flex; flex-direction:column; gap:14px; }
.forge__group--half { gap:10px; }
.forge__group-row { display:grid; grid-template-columns:1fr 1fr; gap:24px; }

.forge__group-header {
  display:flex; align-items:center; gap:12px;
  padding-bottom:10px;
  border-bottom:.5px solid var(--h-hair);
}
.forge__group-kanji {
  font-family:'Cormorant Garamond',serif;
  font-size:1.3rem; font-style:italic; font-weight:300;
  color:var(--h-gold); opacity:.3; line-height:1; flex-shrink:0;
  transition:opacity .3s;
}
.forge__group:hover .forge__group-kanji { opacity:.6; }
.forge__group-label {
  font-family:'DM Mono',monospace;
  font-size:7px; letter-spacing:.5em; text-transform:uppercase;
  color:var(--h-text3); flex:1;
}
.forge__group-num {
  font-family:'DM Mono',monospace;
  font-size:8px; letter-spacing:.2em;
  color:var(--h-gold); opacity:.25;
}

/* Modelos */
.forge__models { display:grid; grid-template-columns:1fr 1fr; gap:8px; }
.forge__model-btn {
  display:flex; flex-direction:column; align-items:flex-start; gap:5px;
  padding:12px 14px;
  background:transparent;
  border:.5px solid var(--h-hair);
  color:var(--h-text3);
  cursor:pointer;
  transition:all .3s var(--ease);
  position:relative; overflow:hidden;
}
.forge__model-btn::before {
  content:'';
  position:absolute; bottom:0; left:0; right:0; height:.5px;
  background:var(--h-gold); transform:scaleX(0); transform-origin:left;
  transition:transform .4s var(--ease);
}
.forge__model-btn:hover { border-color:var(--h-hairH); color:var(--h-text2); }
.forge__model-btn:hover::before { transform:scaleX(1); }
.forge__model-btn.is-active {
  background:rgba(var(--realm-accent-rgb),.06);
  border-color:var(--h-gold);
  color:var(--h-text);
}
.forge__model-btn.is-active::before { transform:scaleX(1); }
.forge__model-icon { color:var(--h-gold); opacity:.5; transition:opacity .3s; }
.forge__model-btn.is-active .forge__model-icon,
.forge__model-btn:hover .forge__model-icon { opacity:.9; }
.forge__model-name { font-family:'Syne',sans-serif; font-size:10px; font-weight:600; letter-spacing:.08em; text-transform:uppercase; color:inherit; }
.forge__model-base { font-family:'DM Mono',monospace; font-size:8px; letter-spacing:.08em; color:var(--h-gold); opacity:.5; }
.forge__model-btn.is-active .forge__model-base { opacity:.85; }

/* Acabamentos */
.forge__finishes { display:flex; flex-direction:column; gap:7px; }
.forge__finish-btn {
  display:flex; align-items:center; gap:12px;
  padding:10px 14px;
  background:transparent;
  border:.5px solid var(--h-hair);
  cursor:pointer;
  transition:all .3s;
  position:relative;
}
.forge__finish-btn::after {
  content:'';
  position:absolute; right:14px; top:50%; transform:translateY(-50%);
  width:6px; height:6px; border-radius:50%;
  background:var(--h-gold); opacity:0;
  transition:opacity .3s;
}
.forge__finish-btn:hover { border-color:var(--h-hairH); }
.forge__finish-btn.is-active { border-color:var(--h-gold); background:rgba(var(--realm-accent-rgb),.04); }
.forge__finish-btn.is-active::after { opacity:.8; }
.forge__finish-orb {
  width:22px; height:22px; border-radius:50%; flex-shrink:0;
  box-shadow:inset 0 2px 4px rgba(255,255,255,.2), 0 2px 8px rgba(0,0,0,.4);
  border:.5px solid rgba(255,255,255,.15);
}
.forge__finish-name { font-family:'Syne',sans-serif; font-size:10px; font-weight:500; letter-spacing:.1em; color:var(--h-text2); flex:1; text-align:left; }
.forge__finish-add { font-family:'DM Mono',monospace; font-size:8px; color:var(--h-gold); opacity:.5; }
.forge__finish-btn.is-active .forge__finish-name { color:var(--h-text); }

/* Pills */
.forge__pills { display:flex; gap:6px; flex-wrap:wrap; }
.forge__pill {
  padding:6px 12px;
  background:transparent;
  border:.5px solid var(--h-hair);
  color:var(--h-text3);
  font-family:'DM Mono',monospace;
  font-size:9px; letter-spacing:.15em;
  cursor:pointer;
  transition:all .25s;
}
.forge__pill:hover { border-color:var(--h-hairH); color:var(--h-text2); }
.forge__pill.is-active { background:var(--h-gold); color:var(--h-void); border-color:transparent; }

/* Price block */
.forge__price-block {
  padding:24px;
  border:.5px solid var(--h-hair);
  position:relative; overflow:hidden;
  background:rgba(200,168,75,.025);
}
.forge__price-block::before {
  content:'';
  position:absolute; top:0; left:0; right:0; height:.5px;
  background:linear-gradient(90deg,var(--h-gold),transparent);
  opacity:.5;
}
.forge__price-label {
  font-family:'DM Mono',monospace;
  font-size:7px; letter-spacing:.5em; text-transform:uppercase;
  color:var(--h-text3); margin-bottom:10px;
}
.forge__price-main {
  display:flex; align-items:baseline; gap:6px;
  margin-bottom:8px;
}
.forge__price-currency {
  font-family:'DM Mono',monospace;
  font-size:14px; color:var(--h-gold); opacity:.55;
}
.forge__price-val {
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(2rem,4vw,2.8rem); font-weight:300;
  color:var(--h-text); line-height:1;
}
.forge__price-inst {
  font-size:10px; color:var(--h-text3);
  display:flex; align-items:center; gap:8px;
  margin-bottom:18px;
}
.forge__price-dot {
  width:5px; height:5px; border-radius:50%;
  background:var(--h-gold); opacity:.5;
  animation:monPulse 2.5s ease-in-out infinite;
}

/* Breakdown de preço */
.forge__price-breakdown { display:flex; flex-direction:column; gap:8px; }
.forge__price-bd-item { display:flex; align-items:center; gap:10px; }
.forge__price-bd-label {
  font-family:'DM Mono',monospace;
  font-size:7px; letter-spacing:.3em; text-transform:uppercase;
  color:var(--h-text3); width:90px; flex-shrink:0;
}
.forge__price-bd-line { height:1.5px; border-radius:1px; transition:width .6s var(--ease); min-width:4px; }
.forge__price-bd-val {
  font-family:'DM Mono',monospace;
  font-size:8px; letter-spacing:.08em;
  color:var(--h-text3); margin-left:auto; flex-shrink:0;
}

/* CTA */
.forge__cta {
  display:inline-flex; align-items:center; gap:12px;
  padding:16px 32px;
  border:.5px solid var(--h-gold);
  color:var(--h-gold);
  text-decoration:none;
  font-family:'Syne',sans-serif;
  font-size:8px; font-weight:700; letter-spacing:.5em; text-transform:uppercase;
  position:relative; overflow:hidden;
  transition:color .45s var(--ease);
}
.forge__cta-fill {
  position:absolute; inset:0;
  background:var(--h-gold);
  transform:translateX(-101%) skewX(-8deg);
  transform-origin:left;
  transition:transform .55s var(--ease);
  z-index:0;
}
.forge__cta:hover .forge__cta-fill { transform:translateX(0) skewX(0deg); }
.forge__cta:hover { color:var(--h-void); }
.forge__cta-text, .forge__cta svg { position:relative; z-index:1; }
.forge__cta-kanji {
  position:relative; z-index:1;
  font-family:'Cormorant Garamond',serif;
  font-size:1rem; font-style:italic;
  color:var(--h-gold); opacity:.35;
  margin-left:auto;
  transition:opacity .3s;
}
.forge__cta:hover .forge__cta-kanji { color:var(--h-void); opacity:.5; }

/* ══ PRODUTOS ══ */
.shop-head { display:flex; justify-content:space-between; align-items:flex-end; padding-bottom:30px; border-bottom:.5px solid var(--h-hair); }
.shop-head__left { display:flex; align-items:flex-start; gap:26px; }
.shop-head__ctrl { display:flex; align-items:center; gap:18px; }
.ctrl-link { display:inline-flex; align-items:center; gap:8px; font-size:9px; font-weight:600; letter-spacing:.35em; text-transform:uppercase; color:var(--h-text3); text-decoration:none; transition:color .25s,gap .25s; }
.ctrl-link:hover { color:var(--h-gold); gap:14px; }
.ctrl-sep   { width:.5px; height:28px; background:var(--h-hair); }
.ctrl-arrows{ display:flex; align-items:center; gap:10px; }
.arrow { width:36px; height:36px; border-radius:50%; border:.5px solid var(--h-hair); background:transparent; color:var(--h-text2); display:flex; align-items:center; justify-content:center; cursor:pointer; transition:all .3s; }
.arrow:hover { border-color:var(--h-gold); color:var(--h-gold); background:rgba(200,168,75,.06); }
.arrow-prog { position:relative; width:44px; height:44px; display:flex; align-items:center; justify-content:center; }
.prog-svg   { position:absolute; inset:0; transform:rotate(-90deg); }
.prog-track { fill:none; stroke:var(--h-hair); stroke-width:1.5; }
.prog-fill  { fill:none; stroke:var(--h-gold); stroke-width:1.5; stroke-linecap:round; transition:stroke-dashoffset .5s; }
.prog-label { font-size:8px; font-weight:700; color:var(--h-text2); position:relative; z-index:1; }
.prog-label em { font-style:normal; color:var(--h-text3); }
.carousel-outer { overflow:hidden; }
.carousel { overflow-x:auto; scrollbar-width:none; cursor:grab; padding:30px 5% 38px; scroll-snap-type:x mandatory; }
.carousel:active { cursor:grabbing; }
.carousel::-webkit-scrollbar { display:none; }
.carousel__track { display:flex; gap:16px; }
.prod-card { min-width:272px; max-width:272px; flex-shrink:0; scroll-snap-align:start; cursor:pointer; }
.prod-card__img { height:370px; border:.5px solid var(--h-hair); position:relative; overflow:hidden; background-size:cover; background-position:center; background-color:var(--h-surf); transition:border-color .4s,transform .6s var(--ease); }
.prod-card:hover .prod-card__img { border-color:var(--h-hairH); transform:translateY(-6px); }
.prod-card__gen-art { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; }
.gen-art--tech .gen-art__inner { width:120px; height:120px; border:.5px solid rgba(200,168,75,.12); position:relative; }
.gen-art--tech .gen-art__inner::before { content:''; position:absolute; inset:20px; border:.5px solid rgba(200,168,75,.08); }
.gen-art__inner { animation:ringRotate 20s linear infinite; }
.prod-card__grad { position:absolute; inset:0; background:linear-gradient(to top,rgba(5,5,12,.82) 0%,transparent 55%); }
.prod-card__top  { position:absolute; top:12px; left:12px; right:12px; display:flex; justify-content:space-between; }
.prod-card__tag  { font-size:7px; letter-spacing:.3em; color:var(--h-gold); border:.5px solid rgba(200,168,75,.4); background:rgba(200,168,75,.07); padding:3px 8px; }
.prod-card__sold { font-size:7px; letter-spacing:.2em; color:var(--h-text3); border:.5px solid var(--h-hair); padding:3px 8px; text-transform:uppercase; }
.prod-card__add { position:absolute; bottom:0; left:0; right:0; padding:13px; background:var(--h-gold); color:var(--h-void); font-family:'Syne',sans-serif; font-size:8px; font-weight:700; letter-spacing:.35em; text-transform:uppercase; border:none; cursor:pointer; transform:translateY(100%); opacity:0; transition:transform .45s var(--ease),opacity .3s,background .3s; }
.prod-card:hover .prod-card__add { transform:translateY(0); opacity:1; }
.prod-card__add.is-added { background:#22c55e; transform:translateY(0); opacity:1; }
.prod-card__add:disabled { opacity:.3; cursor:not-allowed; }
.prod-card__info { padding:15px 2px 0; display:flex; flex-direction:column; gap:5px; }
.prod-card__meta { display:flex; justify-content:space-between; }
.prod-card__cat  { font-size:8px; color:var(--h-gold); letter-spacing:.3em; text-transform:uppercase; }
.prod-card__nr   { font-size:8px; color:var(--h-text3); letter-spacing:.2em; font-family:'DM Mono',monospace; }
.prod-card__name { font-size:12px; font-weight:500; letter-spacing:.04em; text-transform:uppercase; color:var(--h-text); }
.prod-card__foot { display:flex; justify-content:space-between; align-items:baseline; }
.prod-card__price{ font-family:'Cormorant Garamond',serif; font-size:1.25rem; font-weight:300; color:var(--h-text); }
.prod-card__inst { font-size:9px; color:var(--h-text3); }
.skel { animation:skelPulse 1.6s ease-in-out infinite; }
.prod-card__info .skel-line { height:9px; border-radius:2px; background:var(--h-hair); margin-bottom:6px; }
.skel-line--sm { width:50%; }

/* ══ PORTAL ══ */
.sec--exclus { min-height:72vh; display:flex; align-items:center; justify-content:center; text-align:center; position:relative; overflow:hidden; background:#000 !important; border-top:none; border-bottom:.5px solid var(--h-hair); }
.portal__sakura { position:absolute; inset:0; z-index:1; pointer-events:none; width:100%; height:100%; }
.portal__seigaiha { position:absolute; inset:0; z-index:1; pointer-events:none; overflow:hidden; }
.portal__torii { position:absolute; bottom:0; left:50%; transform:translateX(-50%); width:clamp(300px,55vw,620px); z-index:2; pointer-events:none; }
.torii__svg { width:100%; height:auto; }
.portal__kanji-v { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); font-family:'Cormorant Garamond',serif; font-size:clamp(3.5rem,10vw,8rem); font-weight:300; color:rgba(200,168,75,.07); letter-spacing:.12em; writing-mode:vertical-rl; pointer-events:none; z-index:2; line-height:1; animation:kanjiPulse 9s ease-in-out infinite 2s; }
@supports (-webkit-text-stroke: 1px transparent) { .portal__kanji-v { color:transparent; -webkit-text-stroke:.5px rgba(200,168,75,.07); } }
.portal__mon { margin-bottom:10px; animation:monSpin 22s linear infinite, monPulse 4s ease-in-out infinite; position:relative; z-index:4; }
.exclus__film-grain { position:absolute; inset:0; z-index:1; pointer-events:none; background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E"); }
.exclus__beam { position:absolute; top:-20%; width:1px; height:140%; background:linear-gradient(to bottom,transparent,rgba(200,168,75,.28),transparent); filter:blur(3px); animation:beamSway 10s ease-in-out infinite alternate; pointer-events:none; z-index:3; }
.exclus__beam--1 { left:28%; }
.exclus__beam--2 { left:55%; filter:blur(5px); animation-delay:-3s; animation-direction:alternate-reverse; opacity:.7; }
.exclus__beam--3 { left:74%; filter:blur(2px); animation-delay:-7s; width:.5px; }
.exclus__kanji { position:absolute; right:8%; top:50%; transform:translateY(-50%); font-family:'Cormorant Garamond',serif; writing-mode:vertical-rl; font-size:clamp(1rem,3.5vw,1.8rem); font-weight:300; color:#C8A84B; opacity:.07; letter-spacing:.3em; pointer-events:none; z-index:4; animation:kanjiPulse 7s ease-in-out infinite; }
.exclus__kanji--l { right:auto; left:8%; opacity:.05; animation-delay:-3s; }
.exclus__letterbox { position:absolute; left:0; right:0; height:52px; background:#000; z-index:5; pointer-events:none; }
.exclus__letterbox--top { top:0; }
.exclus__letterbox--bot { bottom:0; }
.exclus__inner { position:relative; z-index:6; max-width:760px; padding:72px 52px; display:flex; flex-direction:column; align-items:center; gap:18px; }
.exclus__corner { position:absolute; width:24px; height:24px; border-color:rgba(200,168,75,.4); border-style:solid; display:block; }
.exclus__corner--tl { top:0; left:0;  border-width:.5px 0 0 .5px; }
.exclus__corner--tr { top:0; right:0; border-width:.5px .5px 0 0; }
.exclus__corner--bl { bottom:0; left:0;  border-width:0 0 .5px .5px; }
.exclus__corner--br { bottom:0; right:0; border-width:0 .5px .5px 0; }
.exclus__title { font-family:'Cormorant Garamond',serif; font-size:clamp(2.8rem,6.5vw,6rem); font-weight:300; color:#fff; line-height:1.0; margin:0; }
.exclus__title em { font-style:italic; color:#C8A84B; }
.exclus__sub { font-size:8px; letter-spacing:.55em; text-transform:uppercase; color:rgba(255,255,255,.28); }
.exclus__btn { margin-top:6px; padding:14px 42px; border:.5px solid rgba(200,168,75,.6); color:#C8A84B; text-decoration:none; font-size:8px; font-weight:600; letter-spacing:.5em; text-transform:uppercase; position:relative; overflow:hidden; transition:color .45s var(--ease); }
.exclus__btn-fill { position:absolute; inset:0; background:#C8A84B; transform:scaleX(0); transform-origin:left; transition:transform .55s var(--ease); z-index:0; }
.exclus__btn:hover .exclus__btn-fill { transform:scaleX(1); }
.exclus__btn:hover { color:#05050c; }

/* ══ REVIEWS ══ */
.reviews { display:grid; grid-template-columns:repeat(3,1fr); gap:0; border-left:.5px solid var(--h-hair); border-top:.5px solid var(--h-hair); }
.review { padding:48px 36px; border-right:.5px solid var(--h-hair); border-bottom:.5px solid var(--h-hair); position:relative; overflow:hidden; transition:background .4s; }
.review:hover { background:rgba(var(--realm-accent-rgb),.02); }
.review::before { content:''; position:absolute; left:0; top:0; bottom:0; width:.5px; background:var(--h-gold); transform:scaleY(0); transform-origin:top; transition:transform .5s var(--ease); }
.review:hover::before { transform:scaleY(1); }
.review__mark  { font-family:'Cormorant Garamond',serif; font-size:clamp(2.5rem,5vw,4rem); line-height:1; color:var(--h-gold); opacity:.22; display:block; margin-bottom:14px; }
.review__text  { font-family:'Cormorant Garamond',serif; font-size:15px; font-weight:300; font-style:italic; color:var(--h-text2); line-height:1.8; margin:0 0 16px; }
.review__stars { display:flex; gap:5px; margin-bottom:16px; }
.review__star  { font-size:6px; color:var(--h-gold); opacity:0; transition:opacity .3s calc(var(--si)*60ms); }
.review:hover .review__star { opacity:.55; }
.review__foot  { display:flex; align-items:center; gap:12px; }
.review__av    { width:36px; height:36px; border-radius:50%; background:var(--h-gold); color:var(--h-void); font-weight:700; font-size:13px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.review__name  { display:block; font-size:10px; font-weight:600; letter-spacing:.2em; text-transform:uppercase; color:var(--h-text2); }
.review__city  { font-size:9px; color:var(--h-text3); letter-spacing:.1em; display:block; }
.review__line  { position:absolute; bottom:0; left:36px; right:36px; height:.5px; background:var(--h-hair); }

/* ══ CONCIERGE ══ */
.concierge { display:grid; grid-template-columns:1fr 1fr; gap:88px; align-items:center; padding:64px 72px; position:relative; border:.5px solid var(--h-hair); }
.concierge::before { content:''; position:absolute; top:0; left:0; right:0; height:.5px; background:linear-gradient(90deg,var(--h-gold),transparent); opacity:.35; }
.concierge__left  { display:flex; flex-direction:column; gap:13px; }
.concierge__tag   { font-size:7px; letter-spacing:.6em; text-transform:uppercase; color:var(--h-gold); border:.5px solid var(--h-hair); padding:5px 14px; align-self:flex-start; }
.concierge__title { font-family:'Cormorant Garamond',serif; font-size:clamp(1.9rem,3.2vw,3rem); font-weight:300; line-height:1.1; color:var(--h-text); margin:0; }
.concierge__title em { font-style:italic; color:var(--h-gold); }
.concierge__right { display:flex; flex-direction:column; gap:22px; }
.concierge__desc  { font-size:13px; color:var(--h-text3); line-height:1.95; }
.concierge__btn   { display:inline-flex; align-items:center; gap:10px; padding:13px 30px; background:transparent; color:var(--h-gold); text-decoration:none; font-size:8px; font-weight:700; letter-spacing:.45em; text-transform:uppercase; align-self:flex-start; border:.5px solid var(--h-gold); position:relative; overflow:hidden; transition:color .45s var(--ease); }
.concierge__btn-fill { position:absolute; inset:0; background:var(--h-gold); transform:translateX(-101%) skewX(-8deg); transform-origin:left; transition:transform .55s var(--ease); z-index:0; }
.concierge__btn:hover .concierge__btn-fill { transform:translateX(0) skewX(0deg); }
.concierge__btn:hover { color:var(--h-void); }
.concierge__btn span,.concierge__btn svg { position:relative; z-index:1; }
.concierge__status { display:inline-flex; align-items:center; gap:10px; font-size:9px; letter-spacing:.3em; text-transform:uppercase; color:var(--h-gold); opacity:.55; position:relative; }
.pulse { width:6px; height:6px; background:var(--h-gold); border-radius:50%; position:relative; flex-shrink:0; }
.pulse::after { content:''; position:absolute; inset:-5px; border:1.5px solid var(--h-gold); border-radius:50%; animation:pulseRing 2s ease-out infinite; }
.pulse--2 { width:0; height:0; background:transparent; position:absolute; left:3px; }
.pulse--2::after { animation:pulseRing 2s ease-out infinite .8s; border-color:var(--h-gold); }
.concierge__vagas { font-family:'DM Mono',monospace; font-size:9px; letter-spacing:.2em; color:var(--h-text3); animation:vagasBlink 4s ease-in-out infinite; }
.vagas__num { color:var(--h-gold); opacity:.7; }

/* ══ MODAIS ══ */
.modal-wrap { position:fixed; inset:0; background:rgba(5,5,12,.92); backdrop-filter:blur(24px); display:flex; align-items:center; justify-content:center; z-index:9999; padding:24px; }
.modal { background:var(--h-surf); border:.5px solid var(--h-hair); max-width:820px; width:100%; display:grid; grid-template-columns:1fr 1fr; overflow:hidden; position:relative; max-height:88vh; overflow-y:auto; }
.modal__close { position:absolute; top:14px; right:14px; z-index:2; width:28px; height:28px; border:.5px solid var(--h-hair); background:transparent; color:var(--h-text3); display:flex; align-items:center; justify-content:center; cursor:pointer; transition:border-color .25s,color .25s,transform .35s; }
.modal__close:hover { border-color:var(--h-gold); color:var(--h-gold); transform:rotate(90deg); }
.modal__img { aspect-ratio:1; background-size:cover; background-position:center; background-color:var(--h-void); position:relative; overflow:hidden; }
.modal__img-gen { position:absolute; inset:0; background:radial-gradient(ellipse at center,rgba(200,168,75,.08),transparent 70%); }
.modal__info  { padding:30px 26px; display:flex; flex-direction:column; gap:10px; }
.modal__title { font-family:'Cormorant Garamond',serif; font-size:clamp(1.4rem,2.8vw,1.9rem); font-weight:300; color:var(--h-text); margin:0; }
.modal__brand { font-size:9px; letter-spacing:.3em; text-transform:uppercase; color:var(--h-text3); }
.modal__desc  { font-size:12px; color:var(--h-text3); line-height:1.8; }
.modal__specs { display:grid; grid-template-columns:1fr 1fr; gap:6px; }
.modal__spec  { padding:7px 11px; border:.5px solid var(--h-hair); display:flex; flex-direction:column; gap:2px; }
.spec__k { font-size:7px; letter-spacing:.4em; text-transform:uppercase; color:var(--h-gold); opacity:.7; }
.spec__v { font-size:12px; color:var(--h-text2); }
.modal__price { font-family:'Cormorant Garamond',serif; font-size:1.9rem; font-weight:300; color:var(--h-text); }
.modal__inst  { font-size:10px; color:var(--h-text3); }
.modal__add { padding:12px; border:.5px solid var(--h-gold); background:transparent; color:var(--h-gold); font-family:'Syne',sans-serif; font-size:8px; font-weight:700; letter-spacing:.45em; text-transform:uppercase; cursor:pointer; margin-top:auto; position:relative; overflow:hidden; transition:color .45s var(--ease); }
.modal__add-fill { position:absolute; inset:0; background:var(--h-gold); transform:scaleX(0); transform-origin:left; transition:transform .5s var(--ease); z-index:0; }
.modal__add:hover:not(:disabled) .modal__add-fill { transform:scaleX(1); }
.modal__add:hover:not(:disabled) { color:var(--h-void); }
.modal__add:disabled { opacity:.3; cursor:not-allowed; }

/* Modal galeria */
.galmodal-wrap { position:fixed; inset:0; background:rgba(5,5,12,.92); backdrop-filter:blur(24px); display:flex; align-items:center; justify-content:center; z-index:9999; padding:24px; }
.galmodal { background:var(--h-surf); border:.5px solid var(--h-hair); max-width:680px; width:100%; display:grid; grid-template-columns:1fr 1fr; overflow:hidden; position:relative; max-height:80vh; }
.galmodal__close { position:absolute; top:14px; right:14px; z-index:2; width:28px; height:28px; border:.5px solid var(--h-hair); background:transparent; color:var(--h-text3); display:flex; align-items:center; justify-content:center; cursor:pointer; transition:border-color .25s,color .25s,transform .35s; }
.galmodal__close:hover { border-color:var(--h-gold); color:var(--h-gold); transform:rotate(90deg); }
.galmodal__visual { position:relative; aspect-ratio:3/4; overflow:hidden; }
.galmodal__bg { position:absolute; inset:0; }
.galmodal__art { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; }
.galmodal__tag { position:absolute; top:14px; left:14px; font-size:7px; letter-spacing:.35em; text-transform:uppercase; color:var(--h-gold); border:.5px solid rgba(200,168,75,.35); background:rgba(200,168,75,.07); padding:4px 10px; }
.galmodal__info { padding:32px 28px; display:flex; flex-direction:column; gap:14px; }
.galmodal__title { font-family:'Cormorant Garamond',serif; font-size:1.7rem; font-weight:300; color:var(--h-text); margin:0; }
.galmodal__price { font-family:'Cormorant Garamond',serif; font-size:1.3rem; font-weight:300; color:var(--h-gold); margin-top:auto; }
.galmodal__cta { display:inline-flex; align-items:center; gap:10px; padding:12px 24px; border:.5px solid var(--h-gold); color:var(--h-gold); text-decoration:none; font-size:8px; font-weight:700; letter-spacing:.4em; text-transform:uppercase; position:relative; overflow:hidden; transition:color .45s var(--ease); }
.galmodal__cta-fill { position:absolute; inset:0; background:var(--h-gold); transform:scaleX(0); transform-origin:left; transition:transform .5s var(--ease); z-index:0; }
.galmodal__cta:hover .galmodal__cta-fill { transform:scaleX(1); }
.galmodal__cta:hover { color:var(--h-void); }
.galmodal__cta > * { position:relative; z-index:1; }

.fade-enter-active,.fade-leave-active { transition:opacity .3s; }
.fade-enter-from,.fade-leave-to { opacity:0; }

/* ══ RESPONSIVO ══ */
@media (max-width:1200px) {
  .wrap { width:84%; }
  .pillars   { grid-template-columns:repeat(2,1fr); }
  .tech-grid { grid-template-columns:repeat(2,1fr); }
  .forge__layout { gap:48px; }
  .forge__models { grid-template-columns:1fr 1fr; }
}
@media (max-width:1024px) {
  .wrap { width:90%; }
  .manifesto { grid-template-columns:1fr; gap:52px; }
  .materials { grid-template-columns:1fr; }
  .concierge { grid-template-columns:1fr; gap:44px; padding:44px 36px; }
  .modal { grid-template-columns:1fr; }
  .modal__img { aspect-ratio:4/3; }
  .galmodal { grid-template-columns:1fr; }
  .galmodal__visual { aspect-ratio:16/9; }
  .forge__layout { grid-template-columns:1fr; }
  .forge__stage { min-height:420px; }
  .forge__orbit-ring--1 { width:280px; height:280px; }
  .forge__orbit-ring--2 { width:320px; height:320px; }
}
@media (max-width:768px) {
  .wrap { width:94%; }
  .sec  { padding:80px 0; }
  .pillars   { grid-template-columns:1fr 1fr; }
  .tech-grid { grid-template-columns:1fr 1fr; }
  .reviews   { grid-template-columns:1fr; }
  .shop-head { flex-direction:column; align-items:flex-start; gap:18px; }
  .shop-head__ctrl { width:100%; justify-content:space-between; }
  .exclus__letterbox { height:36px; }
  .exclus__kanji,.portal__kanji-v { display:none; }
  .cg__frame { width:clamp(200px,72vw,280px); height:clamp(300px,60vw,400px); }
  .cg__filmstrip { display:none; }
  .forge__group-row { grid-template-columns:1fr; }
  .forge__stage { min-height:360px; }
}
@media (max-width:480px) {
  .wrap { width:96%; }
  .pillar { padding:28px 20px; }
  .pillars   { grid-template-columns:1fr; }
  .tech-grid { grid-template-columns:1fr; }
  .modal__specs { grid-template-columns:1fr; }
  .concierge { padding:28px 16px; }
  .forge__models { grid-template-columns:1fr; }
}
@media (prefers-reduced-motion: reduce) {
  .forge__device-wrap,.portal__mon,.portal__kanji-v,.mf__corner,
  .concierge__vagas,.bridge__gem,.bridge__line,.forge__scanlines,
  .forge__orbit-ring { animation:none !important; }
}
</style>