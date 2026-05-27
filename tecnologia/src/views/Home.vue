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

    <!-- ══ 04 — GALERIA MOSAICO ══ -->
    <section class="sec sec--gallery" data-reveal>
      <div class="wrap">
        <header class="sec__head">
          <div class="sec__kicker">
            <span class="sec__num" aria-hidden="true">04</span>
            <div class="kicker__line" aria-hidden="true"></div>
          </div>
          <div class="sec__titles">
            <span class="eyebrow">Curadoria Visual</span>
            <h2 class="heading">Arte em <em>Metal Nobre</em></h2>
          </div>
        </header>
        <div class="gallery-mosaic">
          <div
            v-for="(g, i) in gallery"
            :key="i"
            class="gal-item"
            :class="'gal-item--'+i"
            @mouseenter="() => hoveredGal = i"
            @mouseleave="() => hoveredGal = -1"
          >
            <div class="gal-item__inner" :style="{ background: g.grad }">
              <div class="gal-item__art" v-html="g.art"></div>
              <div v-if="i === 0" class="gal-phone" aria-hidden="true">
                <div class="gal-phone__body">
                  <div class="gal-phone__island"></div>
                  <div class="gal-phone__screen">
                    <div class="gal-phone__badge">NOIR</div>
                    <div class="gal-phone__line" style="width:70%"></div>
                    <div class="gal-phone__line" style="width:45%;opacity:.4"></div>
                    <div class="gal-phone__chips">
                      <div class="gal-phone__chip"></div>
                      <div class="gal-phone__chip"></div>
                    </div>
                  </div>
                  <div class="gal-phone__shine"></div>
                </div>
              </div>
            </div>
            <div class="gal-item__overlay"></div>
            <div class="gal-item__grain"></div>
            <div class="gal-item__num" aria-hidden="true">{{ String(i+1).padStart(2,'0') }}</div>
            <div class="gal-item__tag">{{ g.tag }}</div>
            <div class="gal-item__info">
              <div class="gal-item__label">{{ g.label }}</div>
              <div class="gal-item__price">{{ g.preco }}</div>
            </div>
          </div>
        </div>
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

    <!-- ══ 07 — CONFIGURADOR ══ -->
    <section class="sec sec--config" data-reveal>
      <div class="wrap">
        <header class="sec__head">
          <div class="sec__kicker">
            <span class="sec__num" aria-hidden="true">07</span>
            <div class="kicker__line" aria-hidden="true"></div>
          </div>
          <div class="sec__titles">
            <span class="eyebrow">Seu estilo · sua assinatura</span>
            <h2 class="heading">Configure sua <em>obra</em></h2>
          </div>
        </header>
        <div class="config">
          <div class="config__opts">
            <div class="cfg-group">
              <h4 class="cfg-label">Modelo</h4>
              <div class="cfg-row">
                <button v-for="m in models" :key="m.id" class="cfg-btn" :class="{ 'is-active': modelId === m.id }" @click="selectModel(m.id)">{{ m.name }}</button>
              </div>
            </div>
            <div class="cfg-group">
              <h4 class="cfg-label">Acabamento</h4>
              <div class="cfg-row cfg-row--swatches">
                <button v-for="(c, i) in finishes" :key="i" class="cfg-swatch" :class="{ 'is-active': finishIdx === i }" :style="{ background: c.grad }" :title="c.name" @click="selectFinish(i)" :aria-label="c.name"></button>
              </div>
              <transition name="cfg-fade">
                <span class="cfg-sel" :key="finishIdx">{{ finishes[finishIdx].name }}</span>
              </transition>
            </div>
            <div class="cfg-group">
              <h4 class="cfg-label">Capacidade</h4>
              <div class="cfg-row">
                <button v-for="s in storages" :key="s.val" class="cfg-btn" :class="{ 'is-active': storageVal === s.val }" @click="storageVal = s.val">{{ s.label }}</button>
              </div>
            </div>
            <div class="cfg-group">
              <h4 class="cfg-label">Material</h4>
              <div class="cfg-row">
                <button v-for="(a, i) in coatings" :key="i" class="cfg-btn" :class="{ 'is-active': coatingIdx === i }" @click="coatingIdx = i">{{ a }}</button>
              </div>
            </div>
            <div class="cfg-price">
              <span class="cfg-price__label">Valor estimado</span>
              <span class="cfg-price__val" ref="priceRef">R$ {{ fmt(totalPrice) }}</span>
              <span class="cfg-price__inst">até 12× de R$ {{ fmt(Math.ceil(totalPrice/12)) }}</span>
            </div>
            <router-link to="/contato" class="cfg-cta">
              <span class="cfg-cta__fill" aria-hidden="true"></span>
              <span>Solicitar Orçamento</span>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 12h14M12.5 5l7 7-7 7"/></svg>
            </router-link>
          </div>
          <div class="config__preview" ref="previewRef" @mousemove="tiltPhone" @mouseleave="resetPhone" @mouseenter="pausePhoneAnim">
            <div class="phone-scene" ref="phoneSceneRef">
              <div class="phone" :style="{ '--metal': finishes[finishIdx].solid }">
                <div class="phone__body">
                  <div class="phone__island"></div>
                  <div class="phone__hud"><span class="phone__time">9:41</span></div>
                  <div class="phone__screen">
                    <div class="phone__badge">NOIR</div>
                    <div class="phone__lines">
                      <div class="phone__line" style="width:75%"></div>
                      <div class="phone__line" style="width:48%;opacity:.4"></div>
                    </div>
                    <div class="phone__chips">
                      <div class="phone__chip"></div>
                      <div class="phone__chip"></div>
                      <div class="phone__chip"></div>
                    </div>
                    <div class="phone__price-row">
                      <div class="phone__line" style="width:40%;height:12px"></div>
                      <div class="phone__add">+</div>
                    </div>
                  </div>
                  <div class="phone__bar"></div>
                  <div class="phone__shine"></div>
                </div>
              </div>
            </div>
            <p class="preview__tag">
              <span :style="{ color: finishes[finishIdx].solid }">{{ finishes[finishIdx].name }}</span>
              &nbsp;·&nbsp;{{ currentStorage?.label }}
              &nbsp;·&nbsp;{{ coatings[coatingIdx] }}
            </p>
            <div class="preview__glow" :style="{ background: finishes[finishIdx].glow }"></div>
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
                v-for="(p, i) in featured" :key="p._id||p.id"
                class="prod-card"
                :class="{ 'is-active': slideIdx === i }"
                @mouseenter="autoPause = true"
                @mouseleave="autoPause = false"
                @click="openModal(p)"
                role="button"
                :aria-label="`Ver ${p.nome}`"
                tabindex="0"
                @keydown.enter="openModal(p)"
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
              <path d="M0 20 Q20 30 0 40" fill="none" stroke="rgba(200,168,75,0.03)" stroke-width="0.5"/>
              <path d="M40 20 Q20 30 40 40" fill="none" stroke="rgba(200,168,75,0.03)" stroke-width="0.5"/>
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

    <!-- ══ CARRINHO DRAWER ══ -->
    <teleport to="body">
      <transition name="cart-backdrop-fade">
        <div
          v-if="cartOpen"
          class="cart-backdrop"
          @click.self="cartOpen = false"
          role="dialog"
          aria-modal="true"
          aria-label="Carrinho de compras"
        >
          <div class="cart-drawer" ref="cartDrawerRef">

            <!-- ── Linha realm topo ── -->
            <div class="cart__realm-line" aria-hidden="true"></div>

            <!-- ── Canvas cristais geométricos ── -->
            <canvas class="cart__canvas" ref="cartCanvasRef" aria-hidden="true"></canvas>

            <!-- ── Grain overlay atmosférico ── -->
            <div class="cart__grain" aria-hidden="true"></div>

            <!-- ── Kamons de fundo ── -->
            <div class="cart__kamon" aria-hidden="true">黒</div>
            <div class="cart__kamon cart__kamon--2" aria-hidden="true">金</div>

            <!-- ── Scanline cinemática ── -->
            <div class="cart__scanline" aria-hidden="true"></div>

            <!-- Header -->
            <div class="cart__head">
              <div class="cart__head-left">
                <div class="cart__kicker">
                  <span class="cart__kicker-num">00</span>
                  <div class="cart__kicker-bar"></div>
                </div>
                <div>
                  <span class="cart__eyebrow">Atelier Privé</span>
                  <h2 class="cart__title">Seu <em>Atelier</em></h2>
                </div>
              </div>
              <div class="cart__head-right">
                <transition name="badge-pop">
                  <span v-if="cartCount > 0" class="cart__count-badge" :key="cartCount">{{ cartCount }}</span>
                </transition>
                <button class="cart__close" @click="cartOpen = false" aria-label="Fechar carrinho">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
              </div>
            </div>

            <!-- Ornamento -->
            <div class="cart__ornament" aria-hidden="true">
              <span class="cart__orn-line"></span>
              <span class="cart__orn-gem">◆</span>
              <span class="cart__orn-line cart__orn-line--r"></span>
            </div>

            <!-- Corpo -->
            <div class="cart__body" ref="cartBodyRef">

              <!-- Vazio -->
              <transition name="fade">
                <div v-if="cartItems.length === 0" class="cart__vazio">
                  <div class="cart__vazio-mon" aria-hidden="true">
                    <svg viewBox="0 0 80 80" width="64" height="64">
                      <circle cx="40" cy="40" r="36" fill="none" stroke="rgba(200,168,75,0.18)" stroke-width="0.5"/>
                      <circle cx="40" cy="40" r="24" fill="none" stroke="rgba(200,168,75,0.10)" stroke-width="0.5"/>
                      <path d="M40 16 L43 28 L40 26 L37 28 Z" fill="rgba(200,168,75,0.28)"/>
                      <path d="M40 64 L43 52 L40 54 L37 52 Z" fill="rgba(200,168,75,0.28)"/>
                      <path d="M16 40 L28 37 L26 40 L28 43 Z" fill="rgba(200,168,75,0.28)"/>
                      <path d="M64 40 L52 37 L54 40 L52 43 Z" fill="rgba(200,168,75,0.28)"/>
                      <circle cx="40" cy="40" r="4" fill="none" stroke="rgba(200,168,75,0.35)" stroke-width="0.5"/>
                    </svg>
                  </div>
                  <p class="cart__vazio-title">Seu atelier está vazio</p>
                  <p class="cart__vazio-sub">Explore a coleção e adicione peças exclusivas</p>
                  <router-link to="/loja" class="cart__vazio-cta" @click="cartOpen = false">
                    <span class="cart__vazio-cta-fill" aria-hidden="true"></span>
                    Explorar Coleção
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M5 12h14M12.5 5l7 7-7 7"/></svg>
                  </router-link>
                </div>
              </transition>

              <!-- Lista de itens -->
              <transition-group name="cart-item" tag="div" class="cart__list">
                <div v-for="item in cartItems" :key="item._id || item.id" class="cart-item">
                  <div class="cart-item__img" :style="item.imagem ? { backgroundImage: `url(${item.imagem})` } : {}">
                    <div v-if="!item.imagem" class="cart-item__gen" aria-hidden="true">
                      <div class="cart-item__gen-inner"></div>
                    </div>
                    <div class="cart-item__img-overlay"></div>
                  </div>
                  <div class="cart-item__info">
                    <span class="cart-item__cat">{{ item.categoria }}</span>
                    <h4 class="cart-item__name">{{ item.nome }}</h4>
                    <div class="cart-item__foot">
                      <div class="cart-item__qty">
                        <button class="qty-btn" @click="decrementItem(item)" :aria-label="`Remover um ${item.nome}`">
                          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/></svg>
                        </button>
                        <span class="qty-num">{{ item.qty }}</span>
                        <button class="qty-btn" @click="incrementItem(item)" :aria-label="`Adicionar um ${item.nome}`">
                          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                        </button>
                      </div>
                      <span class="cart-item__price">R$ {{ fmt((item.preco||0) * item.qty) }}</span>
                    </div>
                  </div>
                  <button class="cart-item__remove" @click="removeItem(item)" :aria-label="`Remover ${item.nome}`">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M18 6L6 18M6 6l12 12"/></svg>
                  </button>
                  <div class="cart-item__line" aria-hidden="true"></div>
                </div>
              </transition-group>
            </div>

            <!-- Footer -->
            <div class="cart__foot" v-if="cartItems.length > 0">
              <div class="cart__foot-sep" aria-hidden="true">
                <span class="cart__foot-sep-line"></span>
                <span class="cart__foot-sep-gem">◆</span>
                <span class="cart__foot-sep-line cart__foot-sep-line--r"></span>
              </div>

              <div class="cart__totals">
                <div class="cart__total-row">
                  <span class="cart__total-label">Subtotal</span>
                  <span class="cart__total-val">R$ {{ fmt(cartSubtotal) }}</span>
                </div>
                <div class="cart__total-row">
                  <span class="cart__total-label">Parcelamento</span>
                  <span class="cart__total-inst">12× de R$ {{ fmt(Math.ceil(cartSubtotal/12)) }}</span>
                </div>
                <div class="cart__total-row">
                  <span class="cart__total-label">Frete</span>
                  <span class="cart__total-free">
                    <span class="free-dot" aria-hidden="true"></span>
                    Grátis · VIP
                  </span>
                </div>
              </div>

              <div class="cart__selos">
                <div class="cart__selo">
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  <span>SSL 256-bit</span>
                </div>
                <span class="cart__selo-dot" aria-hidden="true">·</span>
                <div class="cart__selo">
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>Compra segura</span>
                </div>
                <span class="cart__selo-dot" aria-hidden="true">·</span>
                <div class="cart__selo">
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  <span>Dados protegidos</span>
                </div>
              </div>

              <div class="cart__actions">
                <router-link to="/checkout" class="cart__cta cart__cta--primary" @click="cartOpen = false">
                  <span class="cart__cta-fill" aria-hidden="true"></span>
                  <span>Finalizar Pedido</span>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M5 12h14M12.5 5l7 7-7 7"/></svg>
                </router-link>
                <button class="cart__cta cart__cta--ghost" @click="cartOpen = false">
                  <span>Continuar Comprando</span>
                </button>
              </div>

              <div class="cart__foot-kanji" aria-hidden="true">購</div>
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
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const site = useSiteStore()

/* ─── STORE ─── */
const prodStore = useProdutosStore()
const featured  = ref([])
const loading   = ref(true)
const addedIds  = ref([])
const modal     = ref(null)

/* ─── CART STATE ─── */
const cartOpen  = ref(false)
const cartItems = ref([])

const cartSubtotal = computed(() =>
  cartItems.value.reduce((acc, i) => acc + (i.preco || 0) * i.qty, 0)
)
const cartCount = computed(() =>
  cartItems.value.reduce((a, i) => a + i.qty, 0)
)

function addCart(p) {
  if (!p?.estoque) return
  window.dispatchEvent(new CustomEvent('add-to-cart', { detail: p }))
  const k = p._id || p.id
  addedIds.value.push(k)
  setTimeout(() => { addedIds.value = addedIds.value.filter(id => id !== k) }, 2200)
  const existing = cartItems.value.find(i => (i._id || i.id) === k)
  if (existing) { existing.qty++ }
  else { cartItems.value.push({ ...p, qty: 1 }) }
  cartOpen.value = true
}

function removeItem(item) {
  const k = item._id || item.id
  cartItems.value = cartItems.value.filter(i => (i._id || i.id) !== k)
}
function incrementItem(item) {
  const found = cartItems.value.find(i => (i._id || i.id) === (item._id || item.id))
  if (found) found.qty++
}
function decrementItem(item) {
  const k = item._id || item.id
  const found = cartItems.value.find(i => (i._id || i.id) === k)
  if (!found) return
  if (found.qty <= 1) removeItem(item)
  else found.qty--
}

/* ═══════════════════════════════════════════════════════════
   CART CANVAS — Cristais Geométricos Caindo
═══════════════════════════════════════════════════════════ */
const cartCanvasRef = ref(null)
const cartDrawerRef = ref(null)
let cartRaf        = null
let cartCtx        = null
let cartParticles  = []
let cartRO         = null

function createCartCrystal(W, H, randomY = false) {
  const t = site.tema
  const palettes = {
    escuro: [
      'rgba(200,168,75,',
      'rgba(245,215,142,',
      'rgba(180,150,60,',
      'rgba(220,200,120,',
      'rgba(160,130,50,',
    ],
    claro: [
      'rgba(61,108,191,',
      'rgba(100,140,220,',
      'rgba(180,200,245,',
      'rgba(80,120,200,',
    ],
    gamer: [
      'rgba(200,80,20,',
      'rgba(240,120,40,',
      'rgba(160,40,10,',
      'rgba(220,90,30,',
    ],
  }
  const colors = palettes[t] || palettes.escuro
  const shapes = ['hex', 'hex', 'diamond', 'diamond', 'cross', 'shard', 'tri', 'dot']

  return {
    x:         Math.random() * W,
    y:         randomY ? Math.random() * H : -Math.random() * H * 0.5 - 10,
    size:      Math.random() * 5 + 1.5,
    speedY:    Math.random() * 0.35 + 0.08,
    speedX:    (Math.random() - 0.5) * 0.22,
    rot:       Math.random() * Math.PI * 2,
    rotSpeed:  (Math.random() - 0.5) * 0.006,
    opacity:   Math.random() * 0.30 + 0.04,
    opacityDir:Math.random() > 0.5 ? 1 : -1,
    color:     colors[Math.floor(Math.random() * colors.length)],
    shape:     shapes[Math.floor(Math.random() * shapes.length)],
    spiral:    Math.random() * Math.PI * 2,
    spiralSpeed:Math.random() * 0.008 + 0.002,
    spiralAmp: Math.random() * 0.6 + 0.1,
    glint:     Math.random() * Math.PI * 2,
    glintSpeed:Math.random() * 0.02 + 0.008,
  }
}

function drawHex(ctx, p) {
  ctx.save()
  ctx.translate(p.x, p.y)
  ctx.rotate(p.rot)
  const glintBoost = (Math.sin(p.glint) * 0.5 + 0.5) * 0.15
  ctx.globalAlpha = Math.min(p.opacity + glintBoost, 0.55)
  ctx.beginPath()
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i - Math.PI / 6
    const r = p.size
    i === 0 ? ctx.moveTo(r * Math.cos(a), r * Math.sin(a)) : ctx.lineTo(r * Math.cos(a), r * Math.sin(a))
  }
  ctx.closePath()
  ctx.strokeStyle = p.color + Math.min(p.opacity * 2.2 + glintBoost * 3, 0.75) + ')'
  ctx.lineWidth = 0.6
  ctx.stroke()
  ctx.fillStyle = p.color + (p.opacity * 0.08) + ')'
  ctx.fill()
  ctx.beginPath()
  const a0 = -Math.PI / 6
  ctx.moveTo(p.size * 0.5 * Math.cos(a0), p.size * 0.5 * Math.sin(a0))
  ctx.lineTo(p.size * 0.5 * Math.cos(a0 + Math.PI * 2 / 3), p.size * 0.5 * Math.sin(a0 + Math.PI * 2 / 3))
  ctx.strokeStyle = p.color + (p.opacity * 0.35) + ')'
  ctx.lineWidth = 0.3
  ctx.stroke()
  ctx.restore()
}

function drawDiamond(ctx, p) {
  ctx.save()
  ctx.translate(p.x, p.y)
  ctx.rotate(p.rot)
  const glintBoost = (Math.sin(p.glint) * 0.5 + 0.5) * 0.2
  ctx.globalAlpha = Math.min(p.opacity + glintBoost, 0.6)
  const s = p.size
  ctx.beginPath()
  ctx.moveTo(0, -s * 1.4)
  ctx.lineTo(s * 0.7, 0)
  ctx.lineTo(0, s * 1.4)
  ctx.lineTo(-s * 0.7, 0)
  ctx.closePath()
  ctx.strokeStyle = p.color + Math.min(p.opacity * 2.5 + glintBoost * 3, 0.85) + ')'
  ctx.lineWidth = 0.5
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(-s * 0.4, 0)
  ctx.lineTo(s * 0.4, 0)
  ctx.strokeStyle = p.color + (p.opacity * 0.5) + ')'
  ctx.lineWidth = 0.3
  ctx.stroke()
  ctx.restore()
}

function drawCross(ctx, p) {
  ctx.save()
  ctx.translate(p.x, p.y)
  ctx.rotate(p.rot)
  const glintBoost = (Math.sin(p.glint) * 0.5 + 0.5) * 0.12
  ctx.globalAlpha = Math.min(p.opacity + glintBoost, 0.45)
  const s = p.size * 1.1
  ctx.strokeStyle = p.color + Math.min(p.opacity * 1.8, 0.55) + ')'
  ctx.lineWidth = 0.5
  ctx.beginPath()
  ctx.moveTo(-s, 0); ctx.lineTo(s, 0)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(0, -s); ctx.lineTo(0, s)
  ctx.stroke()
  ctx.beginPath()
  ctx.arc(0, 0, 0.8, 0, Math.PI * 2)
  ctx.fillStyle = p.color + Math.min(p.opacity * 3 + glintBoost * 4, 1) + ')'
  ctx.fill()
  ctx.restore()
}

function drawShard(ctx, p) {
  ctx.save()
  ctx.translate(p.x, p.y)
  ctx.rotate(p.rot)
  const glintBoost = (Math.sin(p.glint) * 0.5 + 0.5) * 0.18
  ctx.globalAlpha = Math.min(p.opacity + glintBoost, 0.50)
  const s = p.size
  ctx.beginPath()
  ctx.moveTo(0, -s * 1.8)
  ctx.lineTo(s * 0.5, s * 0.4)
  ctx.lineTo(-s * 0.3, s * 0.8)
  ctx.closePath()
  ctx.strokeStyle = p.color + Math.min(p.opacity * 2 + glintBoost * 2.5, 0.70) + ')'
  ctx.lineWidth = 0.5
  ctx.stroke()
  ctx.fillStyle = p.color + (p.opacity * 0.06) + ')'
  ctx.fill()
  ctx.restore()
}

function drawTri(ctx, p) {
  ctx.save()
  ctx.translate(p.x, p.y)
  ctx.rotate(p.rot)
  const glintBoost = (Math.sin(p.glint) * 0.5 + 0.5) * 0.14
  ctx.globalAlpha = Math.min(p.opacity + glintBoost, 0.48)
  const s = p.size
  ctx.beginPath()
  ctx.moveTo(0, -s)
  ctx.lineTo(s * 0.866, s * 0.5)
  ctx.lineTo(-s * 0.866, s * 0.5)
  ctx.closePath()
  ctx.strokeStyle = p.color + Math.min(p.opacity * 2 + glintBoost * 2, 0.65) + ')'
  ctx.lineWidth = 0.5
  ctx.stroke()
  ctx.restore()
}

function drawCrystalDot(ctx, p) {
  ctx.save()
  ctx.translate(p.x, p.y)
  const glintBoost = (Math.sin(p.glint) * 0.5 + 0.5) * 0.25
  ctx.globalAlpha = Math.min(p.opacity + glintBoost, 0.55)
  const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size * 1.2)
  grad.addColorStop(0,   p.color + Math.min(p.opacity * 3 + glintBoost * 4, 1) + ')')
  grad.addColorStop(0.4, p.color + Math.min(p.opacity * 1.2, 0.5) + ')')
  grad.addColorStop(1,   p.color + '0)')
  ctx.beginPath()
  ctx.arc(0, 0, p.size * 1.2, 0, Math.PI * 2)
  ctx.fillStyle = grad
  ctx.fill()
  ctx.restore()
}

function animateCartCanvas() {
  if (!cartCtx || !cartCanvasRef.value) return
  const W = cartCanvasRef.value.width
  const H = cartCanvasRef.value.height
  cartCtx.clearRect(0, 0, W, H)

  const COUNT = 48
  while (cartParticles.length < COUNT) cartParticles.push(createCartCrystal(W, H))
  while (cartParticles.length > COUNT) cartParticles.pop()

  cartParticles.forEach((p, i) => {
    p.spiral   += p.spiralSpeed
    p.glint    += p.glintSpeed
    p.x        += p.speedX + Math.sin(p.spiral) * p.spiralAmp
    p.y        += p.speedY
    p.rot      += p.rotSpeed
    p.opacity  += p.opacityDir * 0.0007
    if (p.opacity > 0.34) p.opacityDir = -1
    if (p.opacity < 0.03) p.opacityDir = 1

    if (p.y > H + 20 || p.x < -20 || p.x > W + 20) {
      cartParticles[i] = createCartCrystal(W, H)
      cartParticles[i].y = -10
    }

    switch (p.shape) {
      case 'hex':     drawHex(cartCtx, p);         break
      case 'diamond': drawDiamond(cartCtx, p);     break
      case 'cross':   drawCross(cartCtx, p);       break
      case 'shard':   drawShard(cartCtx, p);       break
      case 'tri':     drawTri(cartCtx, p);         break
      default:        drawCrystalDot(cartCtx, p);  break
    }
  })
  cartRaf = requestAnimationFrame(animateCartCanvas)
}

function initCartCanvas() {
  const canvas = cartCanvasRef.value
  if (!canvas) return
  cartCtx = canvas.getContext('2d')
  const resize = () => {
    canvas.width  = canvas.offsetWidth  || 440
    canvas.height = canvas.offsetHeight || window.innerHeight
  }
  resize()
  cartRO = new ResizeObserver(resize)
  cartRO.observe(canvas)
  cartParticles = Array.from({ length: 48 }, () => {
    const p = createCartCrystal(canvas.width, canvas.height)
    p.y = Math.random() * canvas.height
    return p
  })
  animateCartCanvas()
}

function destroyCartCanvas() {
  if (cartRaf) { cancelAnimationFrame(cartRaf); cartRaf = null }
  if (cartRO)  { cartRO.disconnect(); cartRO = null }
  cartCtx = null
  cartParticles = []
}

/* ─── Watcher Cart Open ─── */
watch(cartOpen, async (val) => {
  if (val) {
    document.body.style.overflow = 'hidden'
    await nextTick()
    initCartCanvas()

    gsap.fromTo(cartDrawerRef.value,
      { x: '100%', opacity: 0 },
      {
        x: '0%',
        opacity: 1,
        duration: 0.65,
        ease: 'expo.out',
        onComplete: () => {
          const items = cartDrawerRef.value?.querySelectorAll('.cart-item')
          if (items?.length) {
            gsap.fromTo(items,
              { x: 24, opacity: 0 },
              { x: 0, opacity: 1, duration: 0.45, stagger: 0.07, ease: 'power3.out' }
            )
          }
          const line = cartDrawerRef.value?.querySelector('.cart__realm-line')
          if (line) {
            gsap.fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: 'power3.out', transformOrigin: 'center' })
          }
        }
      }
    )
  } else {
    document.body.style.overflow = ''
    if (cartDrawerRef.value) {
      gsap.to(cartDrawerRef.value, {
        x: '100%',
        opacity: 0,
        duration: 0.42,
        ease: 'power3.in',
        onComplete: destroyCartCanvas
      })
    } else {
      destroyCartCanvas()
    }
  }
})

function handleOpenCart() { cartOpen.value = true }

/* ─── DOM REFS ─── */
const carousel       = ref(null)
const previewRef     = ref(null)
const phoneSceneRef  = ref(null)
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
const cartBodyRef    = ref(null)
const hoveredGal     = ref(-1)

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
  { id:'macbook', name:'MacBook Pro',   base:18990 },
  { id:'iphone',  name:'iPhone 16 Pro', base:12990 },
  { id:'ipad',    name:'iPad Pro',      base:10990 },
  { id:'imac',    name:'iMac',          base:24990 },
]
const storageMaps = {
  macbook:[{label:'512GB',val:'512GB',add:0},{label:'1TB',val:'1TB',add:1500},{label:'2TB',val:'2TB',add:3500}],
  iphone: [{label:'256GB',val:'256GB',add:0},{label:'512GB',val:'512GB',add:800},{label:'1TB',val:'1TB',add:1800}],
  ipad:   [{label:'256GB',val:'256GB',add:0},{label:'512GB',val:'512GB',add:1000},{label:'1TB',val:'1TB',add:2000}],
  imac:   [{label:'512GB',val:'512GB',add:0},{label:'1TB',val:'1TB',add:2000},{label:'2TB',val:'2TB',add:4000}],
}
const finishes = [
  { name:'Ouro 24K',   solid:'#C8A84B', grad:'linear-gradient(145deg,#c8a84b,#f5d78e,#b8952a)', glow:'radial-gradient(circle,rgba(200,168,75,.45),transparent 65%)', add:0 },
  { name:'Rose Gold',  solid:'#C2847A', grad:'linear-gradient(145deg,#b76e79,#e8b4bc,#a85d68)', glow:'radial-gradient(circle,rgba(183,110,121,.45),transparent 65%)', add:500 },
  { name:'Platina',    solid:'#A8A8A8', grad:'linear-gradient(145deg,#8e8e8e,#d4d4d4,#7a7a7a)', glow:'radial-gradient(circle,rgba(180,180,180,.45),transparent 65%)', add:800 },
  { name:'Preto Onyx', solid:'#555',    grad:'linear-gradient(145deg,#2a2a2a,#4a4a4a,#111)',    glow:'radial-gradient(circle,rgba(120,120,120,.35),transparent 65%)', add:300 },
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

function selectModel(id) {
  modelId.value    = id
  storageVal.value = storageMaps[id]?.[0]?.val || '512GB'
  coatingIdx.value = 0
  if (phoneSceneRef.value) gsap.to(phoneSceneRef.value, { scale:0.95, duration:0.15, yoyo:true, repeat:1, ease:'power2.inOut' })
}
function selectFinish(i) {
  finishIdx.value = i
  if (phoneSceneRef.value) gsap.to(phoneSceneRef.value, { rotateY:360, duration:0.6, ease:'power2.inOut', onComplete:()=> gsap.set(phoneSceneRef.value, { rotateY:0 }) })
}
function pausePhoneAnim() {}

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
  { tag:'Édition Limitée', label:'Ouro 24K · iPhone 16 Pro', preco:'R$ 18.990', grad:'radial-gradient(ellipse at 30% 40%, rgba(200,168,75,.22) 0%, rgba(10,8,2,.97) 60%)', art:`<svg width="100%" height="100%" viewBox="0 0 300 500" fill="none"><circle cx="150" cy="250" r="120" stroke="rgba(200,168,75,.06)" stroke-width="1"/><circle cx="150" cy="250" r="80" stroke="rgba(200,168,75,.05)" stroke-width=".5"/><line x1="30" y1="250" x2="270" y2="250" stroke="rgba(200,168,75,.04)" stroke-width=".5"/><line x1="150" y1="80" x2="150" y2="420" stroke="rgba(200,168,75,.04)" stroke-width=".5"/></svg>` },
  { tag:'Exclusivo', label:'MacBook Pro · Titânio', preco:'R$ 22.490', grad:'radial-gradient(ellipse at 60% 30%, rgba(100,80,200,.12) 0%, rgba(5,5,12,.98) 65%)', art:`<svg width="100%" height="100%" viewBox="0 0 200 200" fill="none">${Array.from({length:8},(_,i)=>`<line x1="${i*28}" y1="0" x2="${i*28}" y2="200" stroke="rgba(120,100,220,.05)" stroke-width=".5"/>`).join('')}<circle cx="100" cy="100" r="40" stroke="rgba(140,120,240,.1)" stroke-width=".5"/></svg>` },
  { tag:'Novo', label:'iPad Pro · Platina', preco:'R$ 14.790', grad:'radial-gradient(ellipse at 50% 50%, rgba(168,168,168,.18) 0%, rgba(5,5,12,.98) 60%)', art:`<svg width="100%" height="100%" viewBox="0 0 200 200" fill="none">${Array.from({length:7},(_,i)=>`<circle cx="100" cy="100" r="${15+i*12}" stroke="rgba(168,168,168,${0.1-i*0.012})" stroke-width=".5"/>`).join('')}</svg>` },
  { tag:'Limitado', label:'iMac · Rose Gold', preco:'R$ 28.490', grad:'radial-gradient(ellipse at 40% 60%, rgba(194,132,122,.18) 0%, rgba(8,4,4,.98) 60%)', art:`<svg width="100%" height="100%" viewBox="0 0 200 200" fill="none"><path d="M100 20L180 100L100 180L20 100Z" stroke="rgba(194,132,122,.12)" stroke-width="1" fill="rgba(194,132,122,.02)"/><circle cx="100" cy="100" r="8" fill="rgba(194,132,122,.2)"/></svg>` },
  { tag:'Raro', label:'Apple Watch · Onyx', preco:'R$ 9.990', grad:'radial-gradient(ellipse at 50% 40%, rgba(74,74,74,.22) 0%, rgba(4,4,4,.98) 60%)', art:`<svg width="100%" height="100%" viewBox="0 0 200 200" fill="none"><rect x="55" y="45" width="90" height="110" rx="28" stroke="rgba(120,120,120,.12)" stroke-width="1"/><rect x="68" y="58" width="64" height="84" rx="18" stroke="rgba(120,120,120,.08)" stroke-width=".5"/></svg>` },
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
  if (!modal.value) return
  if (e.key === 'Escape') { modal.value = null; return }
  if (e.key !== 'Tab') return
  const focusable = modalRef.value?.querySelectorAll('button, a, [tabindex]:not([tabindex="-1"])')
  if (!focusable?.length) return
  const first = focusable[0], last = focusable[focusable.length-1]
  if (e.shiftKey) { if (document.activeElement === first) { e.preventDefault(); last.focus() } }
  else            { if (document.activeElement === last)  { e.preventDefault(); first.focus() } }
}
function handleCartKeydown(e) { if (!cartOpen.value) return; if (e.key === 'Escape') cartOpen.value = false }

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
const tiltPhone = (e) => {
  if (!previewRef.value||!phoneSceneRef.value) return
  const r = previewRef.value.getBoundingClientRect()
  gsap.to(phoneSceneRef.value, { rotateY:((e.clientX-r.left)/r.width-.5)*22, rotateX:-((e.clientY-r.top)/r.height-.5)*14, duration:.5, ease:'power2.out' })
}
const resetPhone = () => { if(phoneSceneRef.value) gsap.to(phoneSceneRef.value,{rotateY:0,rotateX:0,duration:1.2,ease:'elastic.out(1,.4)'}) }

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
  gsap.from('.gal-item',{opacity:0,scale:.93,filter:'blur(6px)',stagger:{amount:.55,from:'random'},duration:1.15,ease:'power3.out',scrollTrigger:{trigger:'.gallery-mosaic',start:'top 80%',once:true}})
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
  gsap.from('.config__opts',{opacity:0,x:-28,duration:1,ease:'power3.out',scrollTrigger:{trigger:'.config',start:'top 78%',once:true}})
  gsap.from('.config__preview',{opacity:0,x:28,duration:1,ease:'power3.out',scrollTrigger:{trigger:'.config',start:'top 78%',once:true}})
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
  autoTimer = setInterval(() => {
    if (!autoPause.value && !modal.value && featured.value.length > 1) nextSlide()
  }, 3800)
  carouselRO = new ResizeObserver(() => { if(carousel.value) goTo(slideIdx.value) })
  if (carousel.value) carouselRO.observe(carousel.value)
  document.addEventListener('visibilitychange', handleVisibility)
  document.addEventListener('keydown', handleModalKeydown)
  document.addEventListener('keydown', handleCartKeydown)
  window.addEventListener('open-cart', handleOpenCart)
})

onUnmounted(() => {
  if (autoTimer)  clearInterval(autoTimer)
  if (sakuraRaf)  cancelAnimationFrame(sakuraRaf)
  if (sakuraRO)   sakuraRO.disconnect()
  if (carouselRO) carouselRO.disconnect()
  destroyCartCanvas()
  triggers.forEach(t => t?.kill())
  document.removeEventListener('visibilitychange', handleVisibility)
  document.removeEventListener('keydown', handleModalKeydown)
  document.removeEventListener('keydown', handleCartKeydown)
  window.removeEventListener('open-cart', handleOpenCart)
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
.home.realm--gamer { filter:contrast(1.03) brightness(0.98); }

:global(body.light-mode) .home {
  --h-gold:  var(--cor-primaria,  #3D6CBF);
  --h-gold2: var(--cor-secundaria,#7A9CC8);
  --h-void:  var(--cor-fundo,     #EAF0F8);
  --h-surf:  var(--cor-superficie,#FFFFFF);
  --h-text:  var(--cor-texto,     #0D0D20);
  --h-text2: var(--cor-texto-2,   rgba(13,13,32,0.82));
  --h-text3: var(--cor-texto-3,   rgba(13,13,32,0.58));
  --h-hair:  var(--cor-borda,     rgba(61,108,191,0.18));
  --h-hairH: var(--cor-borda-h,   rgba(61,108,191,0.50));
}
:global(body.gamer-mode) .home {
  --h-gold:  var(--cor-primaria,  #C85014);
  --h-gold2: var(--cor-secundaria,#E8830A);
  --h-void:  var(--cor-fundo,     #0A0A0F);
  --h-surf:  var(--cor-superficie,#12120A);
  --h-hair:  var(--cor-borda,     rgba(200,80,20,0.18));
  --h-hairH: var(--cor-borda-h,   rgba(200,80,20,0.5));
}

@keyframes goldShine  { from{background-position:0% center} to{background-position:200% center} }
@keyframes beamSway   { from{transform:skewX(-6deg) translateX(-30px)} to{transform:skewX(6deg) translateX(30px)} }
@keyframes pulseRing  { 0%{transform:scale(.5);opacity:.8} 100%{transform:scale(2.8);opacity:0} }
@keyframes phoneFloat { 0%,100%{transform:translateY(0) rotateY(-4deg) rotateX(2deg)} 50%{transform:translateY(-18px) rotateY(4deg) rotateX(-2deg)} }
@keyframes skelPulse  { 0%,100%{background-color:var(--h-surf)} 50%{background-color:rgba(200,168,75,.05)} }
@keyframes kanjiPulse { 0%,100%{opacity:.06} 50%{opacity:.13} }
@keyframes tickerMove { from{transform:translateX(0)} to{transform:translateX(-33.333%)} }
@keyframes bridgeGlow { 0%,100%{opacity:.28;transform:scale(1)} 50%{opacity:.65;transform:scale(1.2)} }
@keyframes monSpin    { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
@keyframes monPulse   { 0%,100%{opacity:.55;filter:drop-shadow(0 0 4px rgba(200,168,75,.2))} 50%{opacity:.9;filter:drop-shadow(0 0 12px rgba(200,168,75,.5))} }
@keyframes cornerPulse{ 0%,100%{opacity:.2} 50%{opacity:.55} }
@keyframes vagasBlink { 0%,100%{opacity:.35} 50%{opacity:.55} }
@keyframes ringRotate { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
@keyframes freeDot    { 0%,100%{opacity:.4;transform:scale(1)} 50%{opacity:1;transform:scale(1.5)} }
@keyframes realmLineIn { from{transform:scaleX(0)} to{transform:scaleX(1)} }
@keyframes badgePop   { 0%{transform:scale(0.5);opacity:0} 70%{transform:scale(1.15)} 100%{transform:scale(1);opacity:1} }
@keyframes kamonFloat { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-12px) rotate(2deg)} }

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
.sec__grid-bg {
  position:absolute; inset:0;
  background-image:linear-gradient(rgba(200,168,75,.022) 1px,transparent 1px),linear-gradient(90deg,rgba(200,168,75,.022) 1px,transparent 1px);
  background-size:80px 80px; pointer-events:none;
}

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
.ticker--gamer .ticker__item { color:rgba(200,80,20,.6); }
.ticker--gamer .ticker__sep  { color:rgba(200,80,20,.45); }

.sec--pillars { border-top:none; }
.pillars { display:grid; grid-template-columns:repeat(4,1fr); gap:0; border-left:.5px solid var(--h-hair); border-top:.5px solid var(--h-hair); }
.pillar { padding:48px 32px; border-right:.5px solid var(--h-hair); border-bottom:.5px solid var(--h-hair); position:relative; overflow:hidden; transition:background .5s; transform-style:preserve-3d; perspective:800px; }
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
.pillar__icon  { color:var(--h-gold); margin-bottom:18px; opacity:.65; transition:opacity .3s,transform .4s; transform-style:preserve-3d; }
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

.sec--gallery { overflow:visible; }
.gallery-mosaic { display:grid; grid-template-columns:2fr 1fr 1fr; grid-template-rows:300px 220px; gap:2px; }
.gal-item { position:relative; overflow:hidden; cursor:pointer; background:var(--h-surf); }
.gal-item--0 { grid-row:1/3; }
.gal-item__inner { position:absolute; inset:0; background-size:cover; background-position:center; transition:transform .7s var(--ease),filter .6s; }
.gal-item:hover .gal-item__inner { transform:scale(1.05); filter:brightness(1.15) saturate(1.1); }
.gal-item__art { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; }
.gal-phone { position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); width:110px; transition:transform .7s var(--ease); }
.gal-item--0:hover .gal-phone { transform:translate(-50%,-58%) scale(1.04); }
.gal-phone__body { background:linear-gradient(160deg,rgba(200,168,75,.35),rgba(200,168,75,.1)); border-radius:24px; padding:2px; box-shadow:0 24px 48px rgba(0,0,0,.6),inset 0 1px 0 rgba(255,255,255,.2); }
.gal-phone__screen { background:#080810; border-radius:22px; padding:8px; min-height:180px; display:flex; flex-direction:column; gap:6px; position:relative; overflow:hidden; }
.gal-phone__island { width:40px; height:14px; background:#000; border-radius:0 0 10px 10px; margin:0 auto 4px; }
.gal-phone__badge  { font-size:5px; letter-spacing:.4em; color:rgba(200,168,75,.8); background:rgba(200,168,75,.08); border:.5px solid rgba(200,168,75,.2); padding:2px 5px; align-self:flex-start; }
.gal-phone__line   { height:5px; border-radius:3px; background:rgba(200,168,75,.1); }
.gal-phone__chips  { display:flex; gap:4px; }
.gal-phone__chip   { flex:1; height:14px; border-radius:3px; background:rgba(200,168,75,.04); border:.5px solid rgba(200,168,75,.08); }
.gal-phone__shine  { position:absolute; top:10%; right:0; width:2px; height:30%; background:linear-gradient(to bottom,transparent,rgba(255,255,255,.25),transparent); border-radius:1px; }
.gal-item__overlay { position:absolute; inset:0; background:linear-gradient(to top,rgba(5,5,12,.9) 0%,rgba(5,5,12,.2) 50%,transparent 100%); z-index:1; }
.gal-item__grain { position:absolute; inset:0; z-index:2; pointer-events:none; background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E"); mix-blend-mode:overlay; }
.gal-item__num { position:absolute; top:12px; left:14px; z-index:3; font-family:'DM Mono',monospace; font-size:8px; letter-spacing:.25em; color:rgba(200,168,75,.4); }
.gal-item__tag { position:absolute; top:12px; right:14px; z-index:3; font-size:7px; letter-spacing:.3em; text-transform:uppercase; color:var(--h-gold); border:.5px solid rgba(200,168,75,.4); background:rgba(200,168,75,.07); padding:3px 9px; transition:transform .4s var(--ease); }
.gal-item:hover .gal-item__tag { transform:translateY(3px); }
.gal-item__info { position:absolute; bottom:0; left:0; right:0; z-index:3; padding:14px 16px; transform:translateY(6px); opacity:0; transition:transform .45s var(--ease),opacity .35s; }
.gal-item:hover .gal-item__info { transform:translateY(0); opacity:1; }
.gal-item__label { font-size:9px; letter-spacing:.35em; text-transform:uppercase; color:rgba(237,232,224,.8); margin-bottom:4px; }
.gal-item__price { font-family:'Cormorant Garamond',serif; font-size:1.1rem; font-weight:300; color:var(--h-gold); }

.oriental-divider { position:relative; display:flex; align-items:center; justify-content:center; padding:44px 12%; background:var(--h-void); border-top:.5px solid var(--h-hair); border-bottom:.5px solid var(--h-hair); gap:16px; }
.od-line { flex:1; max-width:180px; height:.5px; background:linear-gradient(to right,transparent,var(--h-hairH)); }
.od-line--r { background:linear-gradient(to left,transparent,var(--h-hairH)); }
.od-gem { font-size:5px; color:var(--h-gold); opacity:.45; }
.od-mon { width:56px; height:56px; border-radius:50%; border:.5px solid var(--h-hairH); display:flex; align-items:center; justify-content:center; font-family:'Cormorant Garamond',serif; font-size:1.4rem; font-style:italic; color:var(--h-gold); opacity:.65; margin:0 10px; position:relative; transform-style:preserve-3d; }
.od-mon::before { content:''; position:absolute; inset:4px; border-radius:50%; border:.5px solid var(--h-hair); }
.od-mini-line { width:24px; height:.5px; background:var(--h-hairH); opacity:.4; }
.od-center { display:flex; align-items:center; justify-content:center; }
.od-mon-wrap { position:relative; display:flex; align-items:center; justify-content:center; }
.od-ring { position:absolute; border-radius:50%; border:.5px solid var(--h-hairH); opacity:.25; }
.od-ring--1 { width:72px; height:72px; animation:ringRotate 18s linear infinite; }
.od-ring--2 { width:90px; height:90px; animation:ringRotate 30s linear infinite reverse; }

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

.sec--materials { padding-bottom:0; }
.materials { display:grid; grid-template-columns:repeat(3,1fr); gap:0; border-top:.5px solid var(--h-hair); border-left:.5px solid var(--h-hair); }
.mat { padding:52px 40px; border-right:.5px solid var(--h-hair); border-bottom:.5px solid var(--h-hair); display:flex; flex-direction:column; gap:13px; position:relative; overflow:hidden; transition:background .4s; }
.mat:hover { background:rgba(var(--realm-accent-rgb),.02); }
.mat::before { content:''; position:absolute; top:0;left:0;right:0;height:.5px; background:linear-gradient(90deg,var(--h-gold),transparent); opacity:0; transition:opacity .5s; }
.mat:hover::before { opacity:.5; }
.mat__abbr { position:absolute; top:14px; right:20px; font-family:'Cormorant Garamond',serif; font-size:3.8rem; font-style:italic; font-weight:300; color:var(--h-gold); opacity:.1; line-height:1; pointer-events:none; transition:opacity .4s,transform .4s; }
.mat:hover .mat__abbr { opacity:.22; transform:scale(1.1); }
.mat__icon { color:var(--h-gold); opacity:.55; transition:opacity .3s,transform .5s; transform-style:preserve-3d; }
.mat:hover .mat__icon { opacity:.9; }
.mat__title { font-size:10px; letter-spacing:.25em; text-transform:uppercase; font-weight:700; color:var(--h-text2); }
.mat__desc  { font-size:12px; color:var(--h-text3); line-height:1.85; }
.mat__specs { display:flex; flex-direction:column; gap:6px; padding-top:12px; border-top:.5px solid var(--h-hair); margin-top:4px; }
.mat__specs li { font-family:'DM Mono',monospace; font-size:9px; letter-spacing:.15em; color:var(--h-text3); padding-left:14px; position:relative; }
.mat__specs li::before { content:'—'; position:absolute; left:0; color:var(--h-gold); opacity:.4; font-size:8px; }
.mat__progress { height:.5px; background:var(--h-hair); margin-top:auto; overflow:hidden; }
.mat__progress-fill { height:100%; width:0; background:linear-gradient(to right,var(--h-gold),transparent); transition:width .8s var(--ease); }
.mat:hover .mat__progress-fill { width:100%; }

.config { display:grid; grid-template-columns:1fr 1fr; gap:72px; align-items:center; }
.config__opts { display:flex; flex-direction:column; gap:28px; }
.cfg-group { display:flex; flex-direction:column; gap:11px; }
.cfg-label { font-size:7px; letter-spacing:.55em; text-transform:uppercase; color:var(--h-gold); opacity:.6; }
.cfg-row   { display:flex; gap:8px; flex-wrap:wrap; }
.cfg-row--swatches { align-items:center; }
.cfg-btn { padding:8px 18px; border:.5px solid var(--h-hair); background:transparent; color:var(--h-text3); font-family:'Syne',sans-serif; font-size:9px; letter-spacing:.18em; text-transform:uppercase; font-weight:600; cursor:pointer; transition:all .3s; }
.cfg-btn:hover { border-color:var(--h-gold); color:var(--h-gold); }
.cfg-btn.is-active { background:var(--h-gold); color:var(--h-void); border-color:transparent; }
.cfg-swatch { width:26px; height:26px; border-radius:50%; border:1.5px solid transparent; cursor:pointer; transition:transform .25s,border-color .25s; }
.cfg-swatch:hover { transform:scale(1.15); }
.cfg-swatch.is-active { border-color:var(--h-gold); box-shadow:0 0 0 3px rgba(200,168,75,.2); }
.cfg-sel { font-size:9px; letter-spacing:.2em; color:var(--h-gold); text-transform:uppercase; }
.cfg-fade-enter-active,.cfg-fade-leave-active { transition:opacity .2s,transform .2s; }
.cfg-fade-enter-from,.cfg-fade-leave-to { opacity:0; transform:translateY(4px); }
.cfg-price { display:flex; flex-direction:column; gap:5px; padding:22px 0; border-top:.5px solid var(--h-hair); border-bottom:.5px solid var(--h-hair); }
.cfg-price__label { font-size:7px; letter-spacing:.45em; text-transform:uppercase; color:var(--h-text3); }
.cfg-price__val   { font-family:'Cormorant Garamond',serif; font-size:2.6rem; font-weight:300; color:var(--h-text); line-height:1.1; }
.cfg-price__inst  { font-size:10px; color:var(--h-text3); }
.cfg-cta { display:inline-flex; align-items:center; gap:10px; padding:14px 30px; border:.5px solid var(--h-gold); color:var(--h-gold); text-decoration:none; font-size:8px; font-weight:700; letter-spacing:.45em; text-transform:uppercase; position:relative; overflow:hidden; align-self:flex-start; transition:color .45s var(--ease); }
.cfg-cta__fill { position:absolute; inset:0; background:var(--h-gold); transform:translateX(-101%) skewX(-8deg); transform-origin:left; transition:transform .55s var(--ease); z-index:0; }
.cfg-cta:hover .cfg-cta__fill { transform:translateX(0) skewX(0deg); }
.cfg-cta:hover { color:var(--h-void); }
.cfg-cta span:last-of-type,.cfg-cta svg { position:relative; z-index:1; }

.config__preview { position:relative; display:flex; flex-direction:column; align-items:center; gap:26px; perspective:1200px; }
.phone-scene { transform-style:preserve-3d; animation:phoneFloat 5s ease-in-out infinite; }
.phone { width:180px; background:linear-gradient(160deg,var(--metal),color-mix(in srgb,var(--metal) 60%,#fff 40%),var(--metal)); padding:3px; border-radius:36px; box-shadow:0 48px 96px rgba(0,0,0,.75),inset 0 1px 0 rgba(255,255,255,.3),0 0 60px rgba(200,168,75,.06); transition:background .5s; }
.phone__body   { width:100%; background:#05050c; border-radius:34px; overflow:hidden; display:flex; flex-direction:column; min-height:360px; position:relative; }
.phone__island { width:66px; height:24px; background:#000; border-radius:0 0 18px 18px; margin:0 auto; flex-shrink:0; }
.phone__hud    { padding:5px 14px; display:flex; justify-content:space-between; flex-shrink:0; }
.phone__time   { font-size:9px; font-weight:700; color:rgba(237,232,224,.5); }
.phone__screen { flex:1; padding:8px 12px 12px; display:flex; flex-direction:column; gap:8px; }
.phone__badge  { font-size:7px; letter-spacing:.4em; font-weight:800; color:var(--h-gold); background:rgba(200,168,75,.08); border:.5px solid rgba(200,168,75,.14); padding:4px 10px; align-self:flex-start; }
.phone__lines  { display:flex; flex-direction:column; gap:5px; }
.phone__line   { height:7px; border-radius:3px; background:rgba(200,168,75,.1); }
.phone__chips  { display:flex; gap:6px; margin:4px 0; }
.phone__chip   { flex:1; height:20px; border-radius:5px; background:rgba(200,168,75,.04); border:.5px solid rgba(200,168,75,.1); }
.phone__price-row { display:flex; justify-content:space-between; align-items:center; margin-top:4px; }
.phone__add    { width:22px; height:22px; border-radius:50%; background:var(--h-gold); color:#05050c; font-size:14px; font-weight:700; display:flex; align-items:center; justify-content:center; }
.phone__bar    { width:76px; height:4px; border-radius:2px; background:rgba(255,255,255,.15); margin:0 auto 10px; flex-shrink:0; }
.phone__shine  { position:absolute; top:10%; right:0; width:3px; height:35%; background:linear-gradient(to bottom,transparent,rgba(255,255,255,.3),transparent); border-radius:2px; }
.preview__tag  { font-size:8px; letter-spacing:.2em; text-transform:uppercase; color:var(--h-text3); text-align:center; }
.preview__glow { position:absolute; width:280px; height:280px; border-radius:50%; filter:blur(80px); opacity:.15; pointer-events:none; z-index:0; bottom:-60px; transition:background .5s; }

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

/* CART DRAWER */
.cart-backdrop {
  position: fixed; inset: 0; z-index: 9998;
  background: rgba(5,5,12,.80);
  backdrop-filter: blur(18px) saturate(0.8);
  -webkit-backdrop-filter: blur(18px) saturate(0.8);
  display: flex; justify-content: flex-end;
}
.cart-backdrop-fade-enter-active { transition: opacity .3s ease; }
.cart-backdrop-fade-leave-active { transition: opacity .28s ease .18s; }
.cart-backdrop-fade-enter-from,
.cart-backdrop-fade-leave-to { opacity: 0; }

.cart-drawer {
  position: relative;
  width: 440px; max-width: 94vw; height: 100%;
  background: #09090f;
  background-image:
    radial-gradient(ellipse at 20% 0%, rgba(200,168,75,.04) 0%, transparent 55%),
    radial-gradient(ellipse at 80% 100%, rgba(200,168,75,.03) 0%, transparent 50%);
  border-left: .5px solid rgba(200,168,75,.10);
  display: flex; flex-direction: column;
  overflow: hidden;
  will-change: transform, opacity;
  box-shadow: -24px 0 80px rgba(0,0,0,.65), -1px 0 0 rgba(200,168,75,.06);
}

.cart__realm-line {
  position: absolute; top: 0; left: 0; right: 0; height: .5px;
  background: linear-gradient(
    90deg,
    transparent 0%, transparent 5%,
    rgba(245,215,142,.5) 18%,
    #C8A84B 50%,
    rgba(245,215,142,.5) 82%,
    transparent 95%, transparent 100%
  );
  opacity: .7; z-index: 10; pointer-events: none;
  transform-origin: center;
}
.cart__canvas {
  position: absolute; inset: 0; z-index: 1;
  width: 100%; height: 100%;
  pointer-events: none;
}
.cart__grain {
  position: absolute; inset: 0; z-index: 2; pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
  mix-blend-mode: overlay;
}
.cart__kamon {
  position: absolute;
  font-family: 'Noto Serif JP','Yu Mincho','Hiragino Mincho Pro',serif;
  font-size: 300px; font-weight: 300;
  color: #C8A84B; opacity: .022;
  pointer-events: none; z-index: 2;
  line-height: 1; user-select: none;
  bottom: -50px; right: -40px;
  animation: kamonFloat 20s ease-in-out infinite;
}
.cart__kamon--2 {
  font-size: 160px; opacity: .016;
  top: 60px; left: -25px;
  right: auto; bottom: auto;
  animation: kamonFloat 28s ease-in-out infinite reverse;
}
.cart__scanline {
  position: absolute; inset: 0; z-index: 2; pointer-events: none;
  background: repeating-linear-gradient(
    to bottom,
    transparent 0, transparent 3px,
    rgba(0,0,0,.018) 3px, rgba(0,0,0,.018) 4px
  );
  opacity: .4;
}

.cart__head {
  position: relative; z-index: 5;
  display: flex; align-items: flex-start; justify-content: space-between;
  padding: 32px 28px 0;
}
.cart__head-left { display: flex; align-items: flex-start; gap: 16px; }
.cart__head-right { display: flex; align-items: center; gap: 10px; flex-shrink: 0; margin-top: 6px; }
.cart__kicker { display: flex; flex-direction: column; align-items: center; gap: 7px; flex-shrink: 0; padding-top: 4px; }
.cart__kicker-num { font-family: 'DM Mono',monospace; font-size: 8px; letter-spacing: .3em; color: var(--h-gold); opacity: .4; }
.cart__kicker-bar { width: .5px; height: 38px; background: linear-gradient(to bottom,var(--h-gold),transparent); opacity: .25; }
.cart__eyebrow { display: block; font-size: 7px; letter-spacing: .55em; text-transform: uppercase; color: var(--h-gold); opacity: .6; margin-bottom: 6px; }
.cart__title { font-family: 'Cormorant Garamond',serif; font-size: 1.75rem; font-weight: 300; color: var(--h-text); margin: 0; line-height: 1.05; }
.cart__title em { font-style: italic; color: var(--h-gold); }

.cart__count-badge {
  min-width: 20px; height: 20px; padding: 0 5px;
  background: var(--h-gold); color: #09090f;
  border-radius: 10px; font-size: 8px; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  font-family: 'DM Mono',monospace; letter-spacing: 0; flex-shrink: 0;
}
.badge-pop-enter-active { animation: badgePop .35s var(--ease) both; }
.badge-pop-leave-active { transition: opacity .15s, transform .15s; }
.badge-pop-leave-to { opacity: 0; transform: scale(0.6); }

.cart__close {
  width: 32px; height: 32px; flex-shrink: 0;
  border: .5px solid rgba(200,168,75,.18); border-radius: 50%;
  background: transparent; color: var(--h-text3);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: all .3s;
}
.cart__close:hover { border-color: var(--h-gold); color: var(--h-gold); transform: rotate(90deg); background: rgba(200,168,75,.06); }

.cart__ornament { position: relative; z-index: 5; display: flex; align-items: center; gap: 10px; padding: 20px 28px 16px; }
.cart__orn-line { flex: 1; height: .5px; background: linear-gradient(90deg,var(--h-gold),transparent); opacity: .15; }
.cart__orn-line--r { background: linear-gradient(270deg,var(--h-gold),transparent); }
.cart__orn-gem { font-size: 5px; color: var(--h-gold); opacity: .28; flex-shrink: 0; }

.cart__body {
  flex: 1; overflow-y: auto; overflow-x: hidden;
  padding: 0 28px; position: relative; z-index: 5;
  scrollbar-width: thin; scrollbar-color: rgba(200,168,75,.15) transparent;
}
.cart__body::-webkit-scrollbar { width: 2px; }
.cart__body::-webkit-scrollbar-track { background: transparent; }
.cart__body::-webkit-scrollbar-thumb { background: rgba(200,168,75,.2); border-radius: 1px; }

.cart__vazio { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px; padding: 56px 20px; text-align: center; }
.cart__vazio-mon { opacity: .55; animation: monPulse 5s ease-in-out infinite; }
.cart__vazio-title { font-family: 'Cormorant Garamond',serif; font-size: 1.3rem; font-weight: 300; color: var(--h-text); margin: 0; }
.cart__vazio-sub { font-size: 11px; color: var(--h-text3); letter-spacing: .06em; margin: 0; }
.cart__vazio-cta { display: inline-flex; align-items: center; gap: 8px; margin-top: 8px; padding: 11px 26px; border: .5px solid var(--h-gold); color: var(--h-gold); text-decoration: none; font-size: 8px; font-weight: 700; letter-spacing: .42em; text-transform: uppercase; position: relative; overflow: hidden; transition: color .45s var(--ease); }
.cart__vazio-cta-fill { position: absolute; inset: 0; background: var(--h-gold); transform: scaleX(0); transform-origin: left; transition: transform .5s var(--ease); z-index: 0; }
.cart__vazio-cta:hover .cart__vazio-cta-fill { transform: scaleX(1); }
.cart__vazio-cta:hover { color: var(--h-void); }
.cart__vazio-cta span,.cart__vazio-cta svg { position: relative; z-index: 1; }

.cart__list { display: flex; flex-direction: column; padding-bottom: 8px; }

.cart-item { display: grid; grid-template-columns: 72px 1fr 24px; gap: 14px; align-items: start; padding: 16px 0; position: relative; transition: background .3s, padding .3s, margin .3s; }
.cart-item:hover { background: rgba(200,168,75,.025); margin: 0 -28px; padding-left: 28px; padding-right: 28px; }
.cart-item__img { width: 72px; height: 88px; flex-shrink: 0; background-size: cover; background-position: center; background-color: var(--h-surf); position: relative; overflow: hidden; border: .5px solid var(--h-hair); }
.cart-item__gen { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; }
.cart-item__gen-inner { width: 40px; height: 40px; border: .5px solid rgba(200,168,75,.15); animation: ringRotate 12s linear infinite; }
.cart-item__img-overlay { position: absolute; inset: 0; background: linear-gradient(to top,rgba(5,5,12,.55),transparent 55%); }
.cart-item__info { display: flex; flex-direction: column; gap: 5px; min-width: 0; }
.cart-item__cat { font-size: 7px; letter-spacing: .4em; text-transform: uppercase; color: var(--h-gold); opacity: .7; }
.cart-item__name { font-size: 11px; font-weight: 500; letter-spacing: .04em; text-transform: uppercase; color: var(--h-text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.cart-item__foot { display: flex; align-items: center; justify-content: space-between; margin-top: 4px; }
.cart-item__price { font-family: 'Cormorant Garamond',serif; font-size: 1.05rem; font-weight: 300; color: var(--h-gold); }
.cart-item__qty { display: flex; align-items: center; gap: 0; border: .5px solid var(--h-hair); }
.qty-btn { width: 24px; height: 24px; background: transparent; border: none; color: var(--h-text3); cursor: pointer; display: flex; align-items: center; justify-content: center; transition: color .2s,background .2s; }
.qty-btn:hover { color: var(--h-gold); background: rgba(200,168,75,.06); }
.qty-num { font-family: 'DM Mono',monospace; font-size: 10px; color: var(--h-text); min-width: 22px; text-align: center; line-height: 24px; }
.cart-item__remove { width: 22px; height: 22px; background: transparent; border: .5px solid transparent; border-radius: 50%; color: var(--h-text3); cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all .25s; align-self: center; flex-shrink: 0; }
.cart-item__remove:hover { border-color: rgba(239,68,68,.4); color: rgba(239,68,68,.8); background: rgba(239,68,68,.05); }
.cart-item__line { position: absolute; bottom: 0; left: 0; right: 0; height: .5px; background: linear-gradient(to right,transparent,var(--h-hair),transparent); }

.cart__foot { position: relative; z-index: 5; padding: 0 28px 28px; flex-shrink: 0; background: linear-gradient(to bottom, transparent 0%, rgba(9,9,15,.98) 20%); }
.cart__foot-sep { display: flex; align-items: center; gap: 10px; padding: 14px 0 12px; }
.cart__foot-sep-line { flex: 1; height: .5px; background: linear-gradient(90deg,transparent,rgba(200,168,75,.2)); }
.cart__foot-sep-line--r { background: linear-gradient(270deg,transparent,rgba(200,168,75,.2)); }
.cart__foot-sep-gem { font-size: 5px; color: var(--h-gold); opacity: .3; flex-shrink: 0; }

.cart__totals { display: flex; flex-direction: column; gap: 8px; margin-bottom: 14px; }
.cart__total-row { display: flex; justify-content: space-between; align-items: baseline; }
.cart__total-label { font-size: 8px; letter-spacing: .4em; text-transform: uppercase; color: var(--h-text3); }
.cart__total-val   { font-family: 'Cormorant Garamond',serif; font-size: 1.55rem; font-weight: 300; color: var(--h-text); }
.cart__total-inst  { font-size: 9px; color: var(--h-text3); }
.cart__total-free  { display: inline-flex; align-items: center; gap: 6px; font-size: 9px; letter-spacing: .2em; text-transform: uppercase; color: var(--h-gold); opacity: .75; }
.free-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--h-gold); animation: freeDot 2.5s ease-in-out infinite; flex-shrink: 0; }

.cart__selos { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; padding: 10px 0 14px; border-top: .5px solid var(--h-hair); border-bottom: .5px solid var(--h-hair); margin-bottom: 14px; font-size: 7px; letter-spacing: .2em; text-transform: uppercase; color: rgba(237,232,224,.1); }
.cart__selo     { display: flex; align-items: center; gap: 5px; }
.cart__selo svg { color: var(--h-gold); opacity: .3; flex-shrink: 0; }
.cart__selo-dot { color: var(--h-hair); font-size: 10px; }

.cart__actions { display: flex; flex-direction: column; gap: 8px; }
.cart__cta { display: flex; align-items: center; justify-content: center; gap: 10px; padding: 14px; font-family: 'Syne',sans-serif; font-size: 8px; font-weight: 700; letter-spacing: .45em; text-transform: uppercase; cursor: pointer; text-decoration: none; position: relative; overflow: hidden; transition: color .45s var(--ease); border: none; }
.cart__cta--primary { background: var(--h-gold); color: var(--h-void); border: .5px solid var(--h-gold); }
.cart__cta-fill { position: absolute; inset: 0; background: var(--h-gold2); transform: scaleX(0); transform-origin: left; transition: transform .5s var(--ease); z-index: 0; }
.cart__cta--primary:hover .cart__cta-fill { transform: scaleX(1); }
.cart__cta--primary span,.cart__cta--primary svg { position: relative; z-index: 1; }
.cart__cta--ghost { background: transparent; color: var(--h-text3); border: .5px solid var(--h-hair); font-size: 7.5px; }
.cart__cta--ghost:hover { border-color: var(--h-gold); color: var(--h-gold); }
.cart__foot-kanji { font-family: 'Cormorant Garamond',serif; font-size: 4rem; font-weight: 300; color: var(--h-gold); opacity: .035; text-align: right; line-height: 1; margin-top: 10px; pointer-events: none; user-select: none; }

/* MODAL */
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

.fade-enter-active,.fade-leave-active { transition:opacity .3s; }
.fade-enter-from,.fade-leave-to { opacity:0; }
.cart-item-enter-active { transition:all .45s var(--ease); }
.cart-item-leave-active { transition:all .3s ease-in; position:absolute; width:100%; }
.cart-item-enter-from   { opacity:0; transform:translateX(30px); }
.cart-item-leave-to     { opacity:0; transform:translateX(30px); }

:global(body.light-mode) .cart-drawer   { background:var(--h-surf); }
:global(body.light-mode) .cart-backdrop { background:rgba(234,240,248,.75); }
:global(body.light-mode) .manifesto__bg-text { -webkit-text-stroke:.5px rgba(61,108,191,.07); }
:global(body.light-mode) .home-ticker   { background:rgba(255,255,255,.92); border-color:rgba(61,108,191,.14); }
:global(body.light-mode) .review__text  { color:rgba(13,13,32,.72); }
:global(body.light-mode) .cfg-btn       { border-color:rgba(61,108,191,.22); color:rgba(13,13,32,.55); }
:global(body.light-mode) .cfg-btn.is-active { background:var(--h-gold); color:#fff; }

@media (max-width:1200px) {
  .wrap { width:84%; }
  .pillars   { grid-template-columns:repeat(2,1fr); }
  .tech-grid { grid-template-columns:repeat(2,1fr); }
}
@media (max-width:1024px) {
  .wrap { width:90%; }
  .manifesto { grid-template-columns:1fr; gap:52px; }
  .gallery-mosaic { grid-template-columns:1fr 1fr; grid-template-rows:repeat(3,210px); }
  .gal-item--0 { grid-row:auto; }
  .materials { grid-template-columns:1fr; }
  .config { grid-template-columns:1fr; }
  .config__preview { order:-1; }
  .concierge { grid-template-columns:1fr; gap:44px; padding:44px 36px; }
  .modal { grid-template-columns:1fr; }
  .modal__img { aspect-ratio:4/3; }
  .cart-drawer { width:380px; }
}
@media (max-width:768px) {
  .wrap { width:94%; }
  .sec  { padding:80px 0; }
  .pillars   { grid-template-columns:1fr 1fr; }
  .tech-grid { grid-template-columns:1fr 1fr; }
  .reviews   { grid-template-columns:1fr; }
  .gallery-mosaic { grid-template-columns:1fr; grid-template-rows:auto; }
  .gal-item  { height:210px; }
  .shop-head { flex-direction:column; align-items:flex-start; gap:18px; }
  .shop-head__ctrl { width:100%; justify-content:space-between; }
  .exclus__letterbox { height:36px; }
  .exclus__kanji,.portal__kanji-v { display:none; }
  .cart-drawer { width:100vw; max-width:100vw; }
  .cart__head { padding:22px 20px 0; }
  .cart__ornament { padding:14px 20px 10px; }
  .cart__body { padding:0 20px; }
  .cart__foot { padding:0 20px 24px; }
  .cart-item:hover { margin:0; padding-left:0; padding-right:0; }
}
@media (max-width:480px) {
  .wrap { width:96%; }
  .pillar { padding:28px 20px; }
  .pillars   { grid-template-columns:1fr; }
  .tech-grid { grid-template-columns:1fr; }
  .modal__specs { grid-template-columns:1fr; }
  .concierge { padding:28px 16px; }
}
@media (prefers-reduced-motion: reduce) {
  .phone-scene,.ticker__track,.exclus__beam,.pillar__kanji,
  .portal__mon,.portal__kanji-v,.mf__corner,.concierge__vagas,
  .bridge__gem,.bridge__line,.cart__vazio-mon,.free-dot,
  .cart__kamon { animation:none !important; }
}
</style>