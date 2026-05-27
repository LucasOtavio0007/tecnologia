<template>
  <main class="sobre">

    <!-- ══ FUNDO — mesma pegada do footer/contato, detalhe diferente ══ -->
    <div class="sb-bg" aria-hidden="true">
      <!-- Kamons grandes como no footer -->
      <div class="sb-bg__kamon sb-bg__kamon--1">黒</div>
      <div class="sb-bg__kamon sb-bg__kamon--2">金</div>
      <div class="sb-bg__kamon sb-bg__kamon--3">美</div>
      <div class="sb-bg__kamon sb-bg__kamon--4">道</div>
      <!-- Linha realm no topo -->
      <div class="sb-bg__realm-line"></div>
      <!-- Detalhe diferente: anéis concêntricos no centro -->
      <div class="sb-bg__rings" aria-hidden="true">
        <div class="sb-bg__ring sb-bg__ring--1"></div>
        <div class="sb-bg__ring sb-bg__ring--2"></div>
        <div class="sb-bg__ring sb-bg__ring--3"></div>
      </div>
      <!-- Grid sutil -->
      <div class="sb-bg__grid"></div>
      <!-- Beams -->
      <div class="sb-bg__beam sb-bg__beam--1"></div>
      <div class="sb-bg__beam sb-bg__beam--2"></div>
      <div class="sb-bg__beam sb-bg__beam--3"></div>
      <!-- Grain -->
      <div class="sb-bg__grain"></div>
    </div>

    <!-- ══ CANTOS ORNAMENTAIS ══ -->
    <div class="sb-corner sb-corner--tl" aria-hidden="true"></div>
    <div class="sb-corner sb-corner--tr" aria-hidden="true"></div>
    <div class="sb-corner sb-corner--bl" aria-hidden="true"></div>
    <div class="sb-corner sb-corner--br" aria-hidden="true"></div>

    <!-- ══ BARRAS LATERAIS ══ -->
    <div class="sb-sidebar sb-sidebar--l" aria-hidden="true"></div>
    <div class="sb-sidebar sb-sidebar--r" aria-hidden="true"></div>

    <!-- ══ NÚMERO EDITORIAL ══ -->
    <div class="sb-editorial" aria-hidden="true">2021</div>

    <!-- ══ HERO ══ -->
    <section class="sb-hero">
      <div class="sb-hero__mon" aria-hidden="true">
        <svg viewBox="0 0 80 80" width="56" height="56">
          <circle cx="40" cy="40" r="36" fill="none" stroke="rgba(200,168,75,0.25)" stroke-width="0.5"/>
          <circle cx="40" cy="40" r="27" fill="none" stroke="rgba(200,168,75,0.14)" stroke-width="0.5"/>
          <path d="M40 10 L43.5 28 L40 25 L36.5 28 Z" fill="rgba(200,168,75,0.45)"/>
          <path d="M40 70 L43.5 52 L40 55 L36.5 52 Z" fill="rgba(200,168,75,0.45)"/>
          <path d="M10 40 L28 36.5 L25 40 L28 43.5 Z" fill="rgba(200,168,75,0.45)"/>
          <path d="M70 40 L52 36.5 L55 40 L52 43.5 Z" fill="rgba(200,168,75,0.45)"/>
          <circle cx="40" cy="40" r="5"  fill="none" stroke="rgba(200,168,75,0.5)" stroke-width="0.5"/>
          <circle cx="40" cy="40" r="2"  fill="rgba(200,168,75,0.55)"/>
        </svg>
      </div>
      <div class="sb-hero__kanji" aria-hidden="true">物語<br/>の金</div>

      <div class="sb-hero__content">
        <div class="sb-hero__eyebrow">
          <span class="sb-hero__eyebrow-line" aria-hidden="true"></span>
          <span class="sb-hero__eyebrow-kanji" aria-hidden="true">黄金</span>
          <span class="eyebrow">Depuis 2021 · Sabará, MG</span>
        </div>
        <h1 class="sb-titulo">
          <span class="sb-titulo__sup">O Atelier</span>
          <em class="sb-titulo__em">Noir &amp; Or.</em>
        </h1>
        <p class="sb-sub">
          <span class="sb-sub__gem" aria-hidden="true">◆</span>
          Onde a tecnologia encontra a perenidade
        </p>
        <div class="sb-hero__divider" aria-hidden="true">
          <span class="sbhd__line"></span>
          <span class="sbhd__char">永</span>
          <span class="sbhd__line sbhd__line--r"></span>
        </div>
      </div>
    </section>

    <!-- ══ FILOSOFIA ══ -->
    <section class="sb-filosofia reveal-section">
      <div class="sb-wrap">
        <div class="sb-section-hd">
          <span class="sb-sec-gem" aria-hidden="true">◆</span>
          <span class="eyebrow">Nossa Filosofia</span>
          <span class="sb-sec-line" aria-hidden="true"></span>
        </div>
        <div class="sb-filosofia__grid">
          <div class="sb-filosofia__texto">
            <h2 class="sb-filosofia__titulo">
              Tecnologia que<br/><em>transcende</em>
            </h2>
            <p class="sb-filosofia__desc">Criamos objetos que unem o melhor da engenharia moderna com a alma da joalheria tradicional. Cada peça é projetada para durar gerações, desafiar o tempo e contar uma história de exclusividade.</p>
            <p class="sb-filosofia__desc">Acreditamos que a verdadeira sofisticação está nos detalhes invisíveis — acabamentos perfeitos, materiais nobres, e uma experiência que começa antes mesmo do unboxing.</p>
            <div class="sb-filosofia__selo">
              <span class="sb-filosofia__selo-icon">◆</span>
              <span>Certificação de autenticidade · Número de série único</span>
            </div>
          </div>
          <div class="sb-filosofia__visual">
            <div class="sb-filosofia__kanji" aria-hidden="true">美</div>
            <div class="sb-filosofia__orb"></div>
            <div class="sb-filosofia__badge">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              <span>Edição Limitada</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══ STATS — LARGURA TOTAL, QUEBRA DE RITMO ══ -->
    <section class="sb-stats reveal-section">
      <div class="sb-stats__full">
        <div class="sb-stats__grid">
          <div v-for="s in stats" :key="s.num" class="sb-stat">
            <span class="sb-stat__corner sb-stat__corner--tl" aria-hidden="true"></span>
            <span class="sb-stat__corner sb-stat__corner--br" aria-hidden="true"></span>
            <span class="sb-stat__num">{{ s.num }}</span>
            <span class="sb-stat__label">{{ s.label }}</span>
            <p class="sb-stat__note">{{ s.footnote }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ══ DIVISOR ORIENTAL ══ -->
    <div class="sb-divider-or" aria-hidden="true">
      <div class="sbdo__line"></div>
      <div class="sbdo__mon">品</div>
      <div class="sbdo__line sbdo__line--r"></div>
    </div>

    <!-- ══ FUNDADORES ══ -->
    <section class="sb-fundadores reveal-section" ref="fundadoresRef">
      <div class="sb-wrap">
        <div class="sb-section-hd">
          <span class="sb-sec-gem" aria-hidden="true">◆</span>
          <span class="eyebrow">Os Visionários</span>
          <span class="sb-sec-line" aria-hidden="true"></span>
        </div>
        <h2 class="sb-fundadores__titulo">
          A dupla por trás do<br/><em>Noir &amp; Or</em>
        </h2>

        <div class="sb-fundadores__grid">
          <!-- Lucas -->
          <div class="sb-founder sb-founder--lucas" ref="lucasRef">
            <div class="sb-founder__bg-kanji" aria-hidden="true">創</div>
            <div class="sb-founder__aura" aria-hidden="true"></div>
            <div class="sb-founder__header">
              <div class="sb-founder__seal">
                <svg viewBox="0 0 120 120" width="120" height="120">
                  <circle cx="60" cy="60" r="56" fill="none" stroke="url(#gFounder1)" stroke-width="0.5"/>
                  <circle cx="60" cy="60" r="44" fill="none" stroke="url(#gFounder1)" stroke-width="0.4" stroke-dasharray="3 6"/>
                  <circle cx="60" cy="60" r="34" fill="rgba(200,168,75,0.04)"/>
                  <text x="60" y="72" text-anchor="middle" font-family="Cormorant Garamond, serif" font-size="36" font-style="italic" fill="url(#gFounder1)" opacity="0.9">L</text>
                  <path d="M60 6  L63 18 L60 15 L57 18 Z" fill="rgba(200,168,75,0.55)"/>
                  <path d="M60 114 L63 102 L60 105 L57 102 Z" fill="rgba(200,168,75,0.55)"/>
                  <path d="M6  60 L18 57 L15 60 L18 63 Z" fill="rgba(200,168,75,0.55)"/>
                  <path d="M114 60 L102 57 L105 60 L102 63 Z" fill="rgba(200,168,75,0.55)"/>
                  <defs>
                    <linearGradient id="gFounder1" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
                      <stop offset="0%"   stop-color="#7A5C00"/>
                      <stop offset="40%"  stop-color="#F0D060"/>
                      <stop offset="70%"  stop-color="#D4AF37"/>
                      <stop offset="100%" stop-color="#7A5C00"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div class="sb-founder__identity">
                <span class="sb-founder__kanji-name" aria-hidden="true">創造</span>
                <h3 class="sb-founder__nome">Lucas Souza</h3>
                <span class="sb-founder__cargo">Fundador &amp; CEO · Visionário</span>
                <div class="sb-founder__divider" aria-hidden="true">
                  <span class="sbfd__line"></span>
                  <span class="sbfd__gem">◆</span>
                  <span class="sbfd__line"></span>
                </div>
              </div>
            </div>
            <blockquote class="sb-founder__quote">
              <span class="sb-founder__quote-mark" aria-hidden="true">"</span>
              Recusei a mediocridade desde o primeiro dia. Cada peça que sai do atelier carrega uma obsessão: ser impossível de ignorar.
            </blockquote>
            <p class="sb-founder__bio">Fundou o Atelier Noir &amp; Or em 2021 em Sabará, MG, com a missão de criar objetos tecnológicos que recusam o descartável. Lucas lidera a estratégia criativa, curadoria de materiais e a visão de longo prazo da marca — alguém que acredita que luxo verdadeiro é aquele que ninguém consegue definir, mas todos reconhecem.</p>
            <div class="sb-founder__pilares">
              <div class="sb-founder__pilar" v-for="p in lucasPilares" :key="p">
                <span class="sb-founder__pilar-dot" aria-hidden="true">◆</span>
                {{ p }}
              </div>
            </div>
            <div class="sb-founder__line" aria-hidden="true"></div>
          </div>

          <!-- Luis -->
          <div class="sb-founder sb-founder--luis" ref="luisRef">
            <div class="sb-founder__bg-kanji" aria-hidden="true">技</div>
            <div class="sb-founder__aura sb-founder__aura--r" aria-hidden="true"></div>
            <div class="sb-founder__header">
              <div class="sb-founder__seal sb-founder__seal--r">
                <svg viewBox="0 0 120 120" width="120" height="120">
                  <circle cx="60" cy="60" r="56" fill="none" stroke="url(#gFounder2)" stroke-width="0.5"/>
                  <circle cx="60" cy="60" r="44" fill="none" stroke="url(#gFounder2)" stroke-width="0.4" stroke-dasharray="3 6"/>
                  <circle cx="60" cy="60" r="34" fill="rgba(200,168,75,0.04)"/>
                  <text x="60" y="72" text-anchor="middle" font-family="Cormorant Garamond, serif" font-size="36" font-style="italic" fill="url(#gFounder2)" opacity="0.9">L</text>
                  <path d="M60 6  L63 18 L60 15 L57 18 Z" fill="rgba(200,168,75,0.55)"/>
                  <path d="M60 114 L63 102 L60 105 L57 102 Z" fill="rgba(200,168,75,0.55)"/>
                  <path d="M6  60 L18 57 L15 60 L18 63 Z" fill="rgba(200,168,75,0.55)"/>
                  <path d="M114 60 L102 57 L105 60 L102 63 Z" fill="rgba(200,168,75,0.55)"/>
                  <defs>
                    <linearGradient id="gFounder2" x1="120" y1="0" x2="0" y2="120" gradientUnits="userSpaceOnUse">
                      <stop offset="0%"   stop-color="#7A5C00"/>
                      <stop offset="40%"  stop-color="#F0D060"/>
                      <stop offset="70%"  stop-color="#D4AF37"/>
                      <stop offset="100%" stop-color="#7A5C00"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div class="sb-founder__identity">
                <span class="sb-founder__kanji-name" aria-hidden="true">技術</span>
                <h3 class="sb-founder__nome">Luis</h3>
                <span class="sb-founder__cargo">Co-Fundador &amp; Diretor de Operações</span>
                <div class="sb-founder__divider" aria-hidden="true">
                  <span class="sbfd__line"></span>
                  <span class="sbfd__gem">◆</span>
                  <span class="sbfd__line"></span>
                </div>
              </div>
            </div>
            <blockquote class="sb-founder__quote">
              <span class="sb-founder__quote-mark" aria-hidden="true">"</span>
              A beleza de um objeto está na sua perfeição estrutural. Não basta parecer luxuoso — cada milímetro precisa justificar esse status.
            </blockquote>
            <p class="sb-founder__bio">Luis é o arquiteto silencioso que transforma visão em realidade. Responsável pela cadeia de produção, integração técnica e controle de qualidade, ele garante que cada peça que deixa o atelier seja impecável — do revestimento em ouro aos componentes eletrônicos internos. Sua obsessão pela precisão é a garantia por trás de cada certificado de autenticidade.</p>
            <div class="sb-founder__pilares">
              <div class="sb-founder__pilar" v-for="p in luisPilares" :key="p">
                <span class="sb-founder__pilar-dot" aria-hidden="true">◆</span>
                {{ p }}
              </div>
            </div>
            <div class="sb-founder__line" aria-hidden="true"></div>
          </div>
        </div>

        <!-- Manifesto -->
        <div class="sb-fundadores__manifesto">
          <div class="sb-manifesto__corner sb-manifesto__corner--tl" aria-hidden="true"></div>
          <div class="sb-manifesto__corner sb-manifesto__corner--br" aria-hidden="true"></div>
          <div class="sb-manifesto__kanji" aria-hidden="true">共</div>
          <div class="sb-manifesto__gem" aria-hidden="true">◆</div>
          <p class="sb-manifesto__texto">
            Dois olhares. Uma obsessão:<br/>
            <em>criar o que não deveria existir — e fazer existir de forma perfeita.</em>
          </p>
          <div class="sb-manifesto__assinaturas">
            <div class="sb-manifesto__ass">
              <span class="sb-manifesto__ass-nome">Lucas Souza</span>
              <span class="sb-manifesto__ass-line" aria-hidden="true"></span>
            </div>
            <div class="sb-manifesto__sep" aria-hidden="true">◆</div>
            <div class="sb-manifesto__ass">
              <span class="sb-manifesto__ass-nome">Luis</span>
              <span class="sb-manifesto__ass-line" aria-hidden="true"></span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══ DIVISOR ══ -->
    <div class="sb-divider-or" aria-hidden="true">
      <div class="sbdo__line"></div>
      <div class="sbdo__mon">道</div>
      <div class="sbdo__line sbdo__line--r"></div>
    </div>

    <!-- ══ PROCESSO — RESPIRO: LARGURA TOTAL COM FUNDO DIFERENTE ══ -->
    <section class="sb-processo reveal-section">
      <div class="sb-processo__full-bg" aria-hidden="true"></div>
      <div class="sb-wrap sb-wrap--rel">
        <div class="sb-section-hd">
          <span class="sb-sec-gem" aria-hidden="true">◆</span>
          <span class="eyebrow">Como Criamos</span>
          <span class="sb-sec-line" aria-hidden="true"></span>
        </div>
        <h2 class="sb-sec-titulo">Artesania<em> &amp; </em>Inovação</h2>
        <div class="sb-processo__grid">
          <div v-for="(p, i) in processo" :key="i" class="sb-processo__card">
            <span class="sb-processo__card-corner sb-processo__card-corner--tl" aria-hidden="true"></span>
            <span class="sb-processo__card-corner sb-processo__card-corner--br" aria-hidden="true"></span>
            <div class="sb-processo__kanji" aria-hidden="true">{{ p.kanji }}</div>
            <div class="sb-processo__step">{{ String(i + 1).padStart(2, '0') }}</div>
            <h3 class="sb-processo__titulo">{{ p.titulo }}</h3>
            <p class="sb-processo__desc">{{ p.desc }}</p>
            <div class="sb-processo__line" aria-hidden="true"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══ TIMELINE ══ -->
    <section class="sb-timeline reveal-section">
      <div class="sb-wrap">
        <div class="sb-section-hd">
          <span class="sb-sec-gem" aria-hidden="true">◆</span>
          <span class="eyebrow">Nossa História</span>
          <span class="sb-sec-line" aria-hidden="true"></span>
        </div>
        <h2 class="sb-sec-titulo">Uma jornada de<em> excelência</em></h2>
        <div class="sb-timeline__container">
          <div class="sb-timeline__line" aria-hidden="true"></div>
          <div v-for="(ev, i) in timeline" :key="i" class="sb-timeline__item" :class="[i % 2 === 0 ? 'left' : 'right']">
            <div class="sb-timeline__card">
              <span class="sb-timeline__ano">{{ ev.ano }}</span>
              <h3 class="sb-timeline__titulo">{{ ev.titulo }}</h3>
              <p class="sb-timeline__desc">{{ ev.desc }}</p>
            </div>
            <div class="sb-timeline__dot" aria-hidden="true"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══ DIVISOR ══ -->
    <div class="sb-divider-or" aria-hidden="true">
      <div class="sbdo__line"></div>
      <div class="sbdo__mon">術</div>
      <div class="sbdo__line sbdo__line--r"></div>
    </div>

    <!-- ══ MATERIAIS ══ -->
    <section class="sb-tecnologia reveal-section">
      <div class="sb-wrap">
        <div class="sb-section-hd">
          <span class="sb-sec-gem" aria-hidden="true">◆</span>
          <span class="eyebrow">Materiais &amp; Tecnologia</span>
          <span class="sb-sec-line" aria-hidden="true"></span>
        </div>
        <h2 class="sb-sec-titulo">O que há<em> dentro</em> de cada peça</h2>
        <div class="sb-tecnologia__grid">
          <div v-for="t in tech" :key="t.titulo" class="sb-tec__card">
            <span class="sb-tec__corner sb-tec__corner--tl" aria-hidden="true"></span>
            <span class="sb-tec__corner sb-tec__corner--br" aria-hidden="true"></span>
            <div class="sb-tec__kanji" aria-hidden="true">{{ t.kanji }}</div>
            <div class="sb-tec__icon" v-html="t.icon" aria-hidden="true"></div>
            <h3 class="sb-tec__titulo">{{ t.titulo }}</h3>
            <p class="sb-tec__desc">{{ t.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ══ DEPOIMENTOS — QUEBRA DE RITMO: FUNDO ESCURO TOTAL ══ -->
    <section class="sb-depoimentos reveal-section">
      <div class="sb-dep__full-bg" aria-hidden="true">
        <div class="sb-dep__full-kanji" aria-hidden="true">声</div>
      </div>
      <div class="sb-wrap sb-wrap--rel">
        <div class="sb-section-hd">
          <span class="sb-sec-gem" aria-hidden="true">◆</span>
          <span class="eyebrow">O que Dizem</span>
          <span class="sb-sec-line" aria-hidden="true"></span>
        </div>
        <h2 class="sb-sec-titulo">Clientes<em> Noir &amp; Or</em></h2>
        <div class="sb-depoimentos__grid">
          <div v-for="(d, i) in depoimentos" :key="i" class="sb-dep__card">
            <div class="sb-dep__gold-line" aria-hidden="true"></div>
            <div class="sb-dep__quote-mark" aria-hidden="true">"</div>
            <p class="sb-dep__texto">{{ d.texto }}</p>
            <div class="sb-dep__sep" aria-hidden="true">
              <span></span><span class="sb-dep__sep-gem">◆</span><span></span>
            </div>
            <div class="sb-dep__autor">
              <div class="sb-dep__avatar">{{ d.nome.charAt(0) }}</div>
              <div>
                <span class="sb-dep__nome">{{ d.nome }}</span>
                <span class="sb-dep__cargo">{{ d.cargo }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══ SUSTENTABILIDADE ══ -->
    <section class="sb-sustentabilidade reveal-section">
      <div class="sb-wrap">
        <div class="sb-sus__grid">
          <div class="sb-sus__texto">
            <div class="sb-section-hd sb-section-hd--left">
              <span class="sb-sec-gem" aria-hidden="true">◆</span>
              <span class="eyebrow">Compromisso Ético</span>
            </div>
            <h2 class="sb-sus__titulo">Luxo com<br/><em>consciência</em></h2>
            <p class="sb-sus__desc">Trabalhamos apenas com fornecedores certificados que respeitam o meio ambiente e os direitos humanos. Cada grama de ouro é rastreada, cada componente eletrônico é reciclável.</p>
            <div class="sb-sus__selos">
              <div class="sb-sus__selo">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                <span>Fornecimento ético</span>
              </div>
              <div class="sb-sus__selo">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                <span>Reciclagem garantida</span>
              </div>
              <div class="sb-sus__selo">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                <span>Baixa emissão</span>
              </div>
            </div>
          </div>
          <div class="sb-sus__visual">
            <div class="sb-sus__kanji" aria-hidden="true">命</div>
            <div class="sb-sus__orb" aria-hidden="true"></div>
            <!-- Anéis extras diferenciando do contato -->
            <div class="sb-sus__rings" aria-hidden="true">
              <div class="sb-sus__ring sb-sus__ring--1"></div>
              <div class="sb-sus__ring sb-sus__ring--2"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══ FAQ ══ -->
    <section class="sb-faq reveal-section">
      <div class="sb-wrap">
        <div class="sb-section-hd">
          <span class="sb-sec-gem" aria-hidden="true">◆</span>
          <span class="eyebrow">Dúvidas Frequentes</span>
          <span class="sb-sec-line" aria-hidden="true"></span>
        </div>
        <h2 class="sb-sec-titulo">Perguntas<em> &amp; Respostas</em></h2>
        <div class="sb-faq__lista">
          <div v-for="(f, i) in faq" :key="i" class="sb-faq__item"
               :class="{ active: faqAberto === i }"
               @click="faqAberto = faqAberto === i ? null : i"
               role="button" tabindex="0"
               :aria-expanded="faqAberto === i"
               @keyup.enter="faqAberto = faqAberto === i ? null : i"
               @keyup.space.prevent="faqAberto = faqAberto === i ? null : i">
            <div class="sb-faq__pergunta">
              <span class="sb-faq__bullet" :class="{ active: faqAberto === i }" aria-hidden="true">◆</span>
              <span>{{ f.q }}</span>
              <div class="sb-faq__chevron" :class="{ open: faqAberto === i }" aria-hidden="true">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </div>
            </div>
            <transition name="faq-slide">
              <div v-if="faqAberto === i" class="sb-faq__resp">
                <span class="sb-faq__resp-bar" aria-hidden="true"></span>
                {{ f.a }}
              </div>
            </transition>
          </div>
        </div>
      </div>
    </section>

    <!-- ══ VIP — QUEBRA DE RITMO: FAIXA DOURADA ESCURA ══ -->
    <div class="sb-vip reveal-section">
      <div class="sb-vip__bg-line" aria-hidden="true"></div>
      <div class="sb-vip__inner">
        <div class="sb-vip__ornament" aria-hidden="true">
          <span class="sb-vip__ornament-line"></span>
          <span class="sb-vip__ornament-diamond">◆</span>
          <span class="sb-vip__ornament-line"></span>
        </div>
        <span class="eyebrow">Programme Exclusif Noir &amp; Or</span>
        <h3 class="sb-vip__titulo">Uma experiência<br/><em>reservada a poucos</em></h3>
        <p class="sb-vip__sub">Acesso prioritário · Peças únicas · Consultoria pessoal<br/>Para quem recusa o convencional</p>
        <button class="sb-vip__btn" @click="vipOpen = true">
          <span class="sb-vip__btn-glow" aria-hidden="true"></span>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
          <span>Solicitar Acesso VIP</span>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- ══ CTA FINAL ══ -->
    <section class="sb-cta reveal-section">
      <div class="sb-wrap">
        <div class="sb-cta__inner">
          <div class="sb-section-hd" style="justify-content:center">
            <span class="sb-sec-gem" aria-hidden="true">◆</span>
            <span class="eyebrow">Pronto para o Extraordinário</span>
            <span class="sb-sec-gem" aria-hidden="true">◆</span>
          </div>
          <h2 class="sb-cta__titulo">Descubra nossa<br/><em>coleção</em></h2>
          <div class="sb-cta__btns">
            <router-link to="/loja" class="sb-btn-gold">Explorar Loja</router-link>
            <router-link to="/contato" class="sb-btn-ghost">Falar com Consultor</router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- ══ MODAL VIP ══ -->
    <Teleport to="body">
      <transition name="vip-overlay">
        <div v-if="vipOpen" class="vip-overlay" @click.self="closeVip">
          <transition name="vip-modal">
            <div v-if="vipOpen" class="vip-modal">
              <button class="vip-modal__close" @click="closeVip" aria-label="Fechar">✕</button>
              <div class="vip-modal__seal">
                <svg viewBox="0 0 64 64" width="56" height="56">
                  <circle cx="32" cy="32" r="30" stroke="url(#gSeal)" stroke-width="0.5" fill="none"/>
                  <circle cx="32" cy="32" r="23" stroke="url(#gSeal)" stroke-width="0.4" fill="none"/>
                  <polygon points="32,10 35.8,22.4 49,22.4 38.5,30 42.5,43 32,35.2 21.5,43 25.5,30 15,22.4 28.2,22.4" stroke="url(#gSeal)" stroke-width="0.8" fill="none"/>
                  <defs>
                    <linearGradient id="gSeal" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
                      <stop offset="0%"   stop-color="#7A5C00"/>
                      <stop offset="40%"  stop-color="#F0D060"/>
                      <stop offset="70%"  stop-color="#D4AF37"/>
                      <stop offset="100%" stop-color="#7A5C00"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <span class="eyebrow">Noir &amp; Or · Programme Exclusif</span>
              <h2 class="vip-modal__titulo">Acesso<br/><em>Reservado</em></h2>
              <p class="vip-modal__lead">Uma experiência concebida para quem não aceita o ordinário.</p>
              <div class="vip-modal__divider" aria-hidden="true">
                <span></span><span class="vip-modal__divider-icon">◆</span><span></span>
              </div>
              <transition name="ct-fade-scale" mode="out-in">
                <div v-if="vipStatus === 'idle'" key="form" class="vip-form">
                  <input v-model="vipEmail" type="email" placeholder="Seu e-mail exclusivo" class="vip-form__input" @keyup.enter="solicitarVip"/>
                  <button class="vip-form__btn" @click="solicitarVip">
                    <span>Solicitar Acesso</span>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                  </button>
                </div>
                <div v-else-if="vipStatus === 'loading'" key="loading" class="vip-loading">
                  <div class="vip-loading__spinner"></div>
                  <span>Verificando elegibilidade</span>
                </div>
                <div v-else key="success" class="vip-success">
                  <div class="vip-success__icon">✓</div>
                  <p class="vip-success__titulo">Solicitação recebida</p>
                  <p class="vip-success__sub">Nossa equipe entrará em contato em até 24h</p>
                </div>
              </transition>
              <p class="vip-modal__note">Acesso sujeito a avaliação individual · Vagas extremamente limitadas</p>
            </div>
          </transition>
        </div>
      </transition>
    </Teleport>

  </main>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

/* ══ DADOS ══ */
const stats = [
  { num: '2.400+', label: 'Peças Entregues',     footnote: 'em 5 anos' },
  { num: '98%',    label: 'Satisfação',           footnote: 'clientes fiéis' },
  { num: '5',      label: 'Anos de Excelência',   footnote: 'desde 2021' },
  { num: '40+',    label: 'Produtos no Catálogo', footnote: 'e crescendo' },
]

const lucasPilares = ['Visão Criativa', 'Curadoria de Produto', 'Estratégia de Marca', 'Experiência do Cliente']
const luisPilares  = ['Engenharia de Precisão', 'Controle de Qualidade', 'Cadeia de Produção', 'Integração Técnica']

const processo = [
  { titulo: 'Design e Concepção',   kanji: '想', desc: 'Cada projeto nasce de uma curadoria minuciosa de materiais e tendências, unindo estética atemporal à tecnologia.' },
  { titulo: 'Seleção de Materiais', kanji: '選', desc: 'Ouro 24k, titânio aeroespacial e componentes de grau militar. Rastreabilidade total de cada elemento.' },
  { titulo: 'Manufatura Joalheira', kanji: '工', desc: 'Corte, polimento e revestimento feitos à mão por ourives com décadas de experiência.' },
  { titulo: 'Montagem Técnica',     kanji: '組', desc: 'Integração dos componentes eletrônicos em ambiente controlado, com testes rigorosos.' },
  { titulo: 'Certificação',         kanji: '証', desc: 'Número de série gravado a laser, certificado de autenticidade e caixa de apresentação.' },
]

const timeline = [
  { ano: '2021', titulo: 'Fundação',          desc: 'Lucas e Luis fundam o Atelier Noir & Or em Sabará, MG, com a missão de unir luxo e tecnologia.' },
  { ano: '2022', titulo: 'Primeira Coleção',  desc: 'Gold Edition com 10 MacBooks revestidos. Esgotado em 48 horas.' },
  { ano: '2022', titulo: 'Reconhecimento',    desc: 'Prêmio ABNT de inovação em joalheria aplicada à eletrônica.' },
  { ano: '2023', titulo: 'Expansão',          desc: 'Ampliação do ateliê e contratação de joalheiros especializados.' },
  { ano: '2024', titulo: 'Mobile & Audio',    desc: 'Lançamento de smartphones e headphones. Catálogo chega a 40+ produtos.' },
  { ano: '2025', titulo: 'Plataforma Digital',desc: 'Loja online com atendimento VIP e consultoria exclusiva.' },
  { ano: '2026', titulo: 'Hoje',              desc: 'Mais de 2.400 peças entregues, 98% de satisfação e a maior coleção de tech luxo do Brasil.' },
]

const tech = [
  { titulo: 'Ouro 24k',       kanji: '金', desc: 'Galvanoplastia de alta densidade com certificação internacional. Resistência superior ao desgaste.', icon: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="rgba(200,168,75,0.8)" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2v20M2 12h20"/></svg>' },
  { titulo: 'Titânio G5',     kanji: '鋼', desc: 'Liga aeroespacial usada em foguetes e implantes médicos. Leve, durável e indestrutível.', icon: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="rgba(200,168,75,0.8)" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>' },
  { titulo: 'Vidro Cerâmico', kanji: '陶', desc: 'Superfície ultra-resistente a riscos e impressões. Transparência cristalina e toque premium.', icon: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="rgba(200,168,75,0.8)" stroke-width="1.5"><polygon points="12 2 22 7 22 17 12 22 2 17 2 7 12 2"/><line x1="12" y1="22" x2="12" y2="12"/><polyline points="22 7 12 12 2 7"/></svg>' },
]

const depoimentos = [
  { nome: 'Rafael M.',   cargo: 'Colecionador',            texto: 'Nunca imaginei que um smartphone pudesse ser uma obra de arte. A peça dourada que recebi simplesmente parou o tempo.' },
  { nome: 'Isabela C.',  cargo: 'Designer de Interiores',  texto: 'O cuidado na embalagem, o toque do metal nobre, a atenção ao detalhe — tudo transmite uma exclusividade que nenhuma marca entrega.' },
  { nome: 'Lucas T.',    cargo: 'Investidor',               texto: 'Meu iPhone em titânio é o objeto que mais me orgulho de ter. Cada olhar confirma que valeu cada centavo.' },
]

const faq = [
  { q: 'Qual o prazo de produção?',           a: 'Cada peça é feita sob encomenda, com prazo médio de 15 a 30 dias úteis, dependendo da complexidade.' },
  { q: 'A garantia é realmente vitalícia?',   a: 'Sim, cobrimos todo e qualquer defeito de fabricação e desgaste do revestimento enquanto você for o proprietário original.' },
  { q: 'Posso personalizar meu dispositivo?', a: 'Sim, oferecemos gravação de iniciais, escolha de banho (ouro, ródio, platina) e design exclusivo para peças de coleção.' },
  { q: 'Como funciona o atendimento VIP?',    a: 'Clientes VIP têm um consultor pessoal disponível 24/7 por WhatsApp, E-mail e telefone, além de lançamentos antes do público.' },
]

/* ══ ESTADO ══ */
const vipOpen   = ref(false)
const vipStatus = ref('idle')
const vipEmail  = ref('')
const faqAberto = ref(null)
const fundadoresRef = ref(null)
const lucasRef      = ref(null)
const luisRef       = ref(null)

function solicitarVip() {
  if (!vipEmail.value || !vipEmail.value.includes('@')) return
  vipStatus.value = 'loading'
  setTimeout(() => { vipStatus.value = 'success' }, 2000)
}
function closeVip() {
  vipOpen.value = false
  setTimeout(() => { vipStatus.value = 'idle'; vipEmail.value = '' }, 300)
}

/* ══ SCROLL REVEAL — sem opacity:0 inicial, usa classe ══ */
let observer = null
onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed')
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.06 })
  document.querySelectorAll('.reveal-section').forEach(el => observer.observe(el))
  window.addEventListener('keydown', e => { if (e.key === 'Escape') closeVip() })

  /* Animação nativa dos fundadores sem GSAP */
  animateFundadoresNative()
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})

function animateFundadoresNative() {
  if (!fundadoresRef.value) return
  const cards = [lucasRef.value, luisRef.value]
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('founder-in')
        io.unobserve(entry.target)
      }
    })
  }, { threshold: 0.1 })
  cards.forEach(c => { if (c) io.observe(c) })
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Syne:wght@400;500;600;700;800&family=DM+Mono:wght@300;400&display=swap');

/* ══ TOKENS — alinhados ao footer e contato ══ */
.sobre {
  --sb-gold:  #C8A84B;
  --sb-gold2: #F5D78E;
  --sb-deep:  #09090f;
  --sb-surf:  #0d0d14;
  --sb-surf2: #111118;
  --sb-text:  rgba(237,232,224,0.92);
  --sb-text2: rgba(237,232,224,0.50);
  --sb-text3: rgba(237,232,224,0.22);
  --sb-text4: rgba(237,232,224,0.10);
  --sb-hair:  rgba(237,232,224,0.07);
  --sb-hairH: rgba(200,168,75,0.35);
  --sb-gold3: rgba(200,168,75,0.06);
  --ease:     cubic-bezier(0.16,1,0.30,1);

  background:  var(--sb-deep);
  color:       var(--sb-text);
  font-family: 'Syne', sans-serif;
  padding-top: var(--navbar-h, 88px);
  min-height:  100vh;
  position:    relative;
  overflow-x:  hidden;
}

/* ══ KEYFRAMES ══ */
@keyframes beamSway    { from{transform:skewX(-5deg) translateX(-20px)} to{transform:skewX(5deg) translateX(20px)} }
@keyframes kanjiPulse  { 0%,100%{opacity:.025} 50%{opacity:.05} }
@keyframes monSpin     { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
@keyframes cornerGlow  { from{border-color:rgba(200,168,75,.08)} to{border-color:rgba(200,168,75,.28)} }
@keyframes goldShine   { from{background-position:0% center} to{background-position:200% center} }
@keyframes lineExpand  { to{width:160px} }
@keyframes heroFadeIn  { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
@keyframes sealSpin    { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
@keyframes sealSpinR   { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
@keyframes auraPulse   { 0%,100%{opacity:.07;transform:scale(1)} 50%{opacity:.16;transform:scale(1.1)} }
@keyframes ringPulse   { 0%,100%{opacity:.04;transform:translate(-50%,-50%) scale(1)} 50%{opacity:.09;transform:translate(-50%,-50%) scale(1.04)} }
@keyframes founderSlideL { from{opacity:0;transform:translateX(-48px)} to{opacity:1;transform:translateX(0)} }
@keyframes founderSlideR { from{opacity:0;transform:translateX(48px)}  to{opacity:1;transform:translateX(0)} }
@keyframes spin         { to{transform:rotate(360deg)} }

/* ══ FUNDO — mesma cor do footer/contato, detalhe: anéis concêntricos ══ */
.sb-bg {
  position: fixed; inset: 0; z-index: 0; pointer-events: none;
  background: var(--sb-deep);
}

/* Kamons — mesmo padrão do footer ══ */
.sb-bg__kamon {
  position: absolute;
  font-family: 'Noto Serif JP', 'Yu Mincho', serif;
  font-weight: 300; color: var(--sb-gold);
  pointer-events: none; user-select: none; line-height: 1;
  animation: kanjiPulse 10s ease-in-out infinite;
}
.sb-bg__kamon--1 { font-size: clamp(180px,26vw,340px); bottom:-70px; right:-45px; opacity:.025; }
.sb-bg__kamon--2 { font-size: clamp(110px,16vw,200px); top:50px; left:-35px; opacity:.018; animation-delay:-3s; }
.sb-bg__kamon--3 { font-size: clamp(70px,10vw,120px);  top:35%; right:6%; opacity:.012; animation-delay:-6s; }
.sb-bg__kamon--4 { font-size: clamp(55px,7vw,90px);    bottom:25%; left:5%; opacity:.010; animation-delay:-9s; }

/* Linha realm — igual ao footer ══ */
.sb-bg__realm-line {
  position: absolute; top:0; left:0; right:0; height:.5px;
  background: linear-gradient(
    90deg,
    transparent 0%, transparent 6%,
    rgba(200,168,75,.45) 20%,
    var(--sb-gold) 50%,
    rgba(200,168,75,.45) 80%,
    transparent 94%, transparent 100%
  );
  opacity:.5;
}

/* Detalhe diferente: anéis concêntricos no centro ══ */
.sb-bg__rings {
  position: absolute; left:50%; top:38%;
  pointer-events: none;
}
.sb-bg__ring {
  position: absolute; border-radius:50%;
  border:.5px solid var(--sb-gold);
  transform: translate(-50%,-50%);
  animation: ringPulse 12s ease-in-out infinite;
}
.sb-bg__ring--1 { width:clamp(300px,40vw,600px); height:clamp(300px,40vw,600px); opacity:.04; }
.sb-bg__ring--2 { width:clamp(500px,65vw,900px); height:clamp(500px,65vw,900px); opacity:.025; animation-delay:-4s; }
.sb-bg__ring--3 { width:clamp(700px,90vw,1200px); height:clamp(700px,90vw,1200px); opacity:.015; animation-delay:-8s; }

/* Grid ══ */
.sb-bg__grid {
  position: absolute; inset:0;
  background-image:
    linear-gradient(rgba(237,232,224,.016) 1px, transparent 1px),
    linear-gradient(90deg, rgba(237,232,224,.016) 1px, transparent 1px);
  background-size:64px 64px;
  mask-image: radial-gradient(ellipse 100% 80% at 50% 30%, black 20%, transparent 100%);
}

/* Beams ══ */
.sb-bg__beam {
  position: absolute; top:-20%; width:1px; height:140%;
  background: linear-gradient(to bottom, transparent, rgba(200,168,75,.12), transparent);
  filter: blur(3px);
  animation: beamSway 14s ease-in-out infinite alternate;
}
.sb-bg__beam--1 { left:15%; }
.sb-bg__beam--2 { left:55%; filter:blur(5px); animation-delay:-5s; animation-direction:alternate-reverse; opacity:.45; }
.sb-bg__beam--3 { left:80%; filter:blur(4px); animation-delay:-9s; opacity:.3; }

/* Grain ══ */
.sb-bg__grain {
  position: absolute; inset:0; opacity:.016;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
}

/* ══ CANTOS ══ */
.sb-corner {
  position: fixed; z-index:3; width:22px; height:22px;
  border-color:rgba(200,168,75,.1); border-style:solid;
  pointer-events:none; animation:cornerGlow 4s infinite alternate;
}
.sb-corner--tl { top:18px; left:18px;  border-width:1px 0 0 1px; }
.sb-corner--tr { top:18px; right:18px; border-width:1px 1px 0 0; }
.sb-corner--bl { bottom:18px; left:18px;  border-width:0 0 1px 1px; }
.sb-corner--br { bottom:18px; right:18px; border-width:0 1px 1px 0; }

/* ══ BARRAS LATERAIS ══ */
.sb-sidebar {
  position: fixed; top:0; bottom:0; z-index:2;
  width:.5px; pointer-events:none;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(200,168,75,.12) 20%,
    rgba(200,168,75,.25) 50%,
    rgba(200,168,75,.12) 80%,
    transparent 100%
  );
}
.sb-sidebar--l { left:52px; }
.sb-sidebar--r { right:52px; }

/* ══ EDITORIAL ══ */
.sb-editorial {
  position: fixed; bottom:-2%; right:5%; z-index:1;
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(110px,16vw,200px); font-weight:300;
  color:transparent; -webkit-text-stroke:1px rgba(200,168,75,.04);
  pointer-events:none; user-select:none; line-height:1;
}

/* ══ WRAP ══ */
.sb-wrap { max-width:1380px; margin:0 auto; padding:0 80px; }
.sb-wrap--rel { position:relative; z-index:2; }

/* ══ EYEBROW ══ */
.eyebrow {
  font-size:9px; letter-spacing:7px; font-weight:700;
  text-transform:uppercase; display:inline-block;
  background:linear-gradient(135deg,var(--sb-gold),var(--sb-gold2));
  -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
}

/* ══ SECTION HEADER ══ */
.sb-section-hd { display:flex; align-items:center; gap:12px; margin-bottom:28px; }
.sb-section-hd--left { margin-bottom:12px; }
.sb-sec-gem { font-size:5px; color:var(--sb-gold); opacity:.5; flex-shrink:0; }
.sb-sec-line { flex:1; height:.5px; background:linear-gradient(to right,rgba(200,168,75,.2),transparent); }

/* ══ SEC TITULO ══ */
.sb-sec-titulo {
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(2rem,4vw,3.2rem); font-weight:300;
  color:var(--sb-text); margin:0 0 52px;
}
.sb-sec-titulo em { font-style:italic; color:var(--sb-gold); }

/* ══ HERO ══ */
.sb-hero {
  position:relative; z-index:2;
  padding:88px 80px 72px;
  border-bottom:.5px solid var(--sb-hair); overflow:hidden;
}
.sb-hero__mon {
  position:absolute; top:88px; right:80px;
  animation:monSpin 28s linear infinite; opacity:.6;
  pointer-events:none; z-index:1;
}
.sb-hero__kanji {
  position:absolute; right:5%; top:50%; transform:translateY(-60%);
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(2rem,4vw,3.5rem); font-weight:300;
  color:transparent; -webkit-text-stroke:.5px rgba(200,168,75,.06);
  letter-spacing:.2em; writing-mode:vertical-rl;
  pointer-events:none; z-index:1; animation:kanjiPulse 8s ease-in-out infinite;
}
.sb-hero__content {
  position:relative; z-index:2; max-width:820px;
  animation:heroFadeIn .8s cubic-bezier(.22,1,.36,1) both;
}
.sb-hero__eyebrow { display:flex; align-items:center; gap:12px; margin-bottom:24px; }
.sb-hero__eyebrow-line {
  display:block; width:38px; height:.5px;
  background:linear-gradient(to right,transparent,rgba(200,168,75,.4));
  flex-shrink:0;
}
.sb-hero__eyebrow-kanji {
  font-family:'Cormorant Garamond',serif;
  font-size:1.05rem; font-style:italic; color:var(--sb-gold); opacity:.3;
}
.sb-titulo { font-family:'Cormorant Garamond',serif; line-height:.92; margin-bottom:22px; }
.sb-titulo__sup {
  display:block; font-size:clamp(1.5rem,3vw,2.4rem); font-weight:500;
  color:var(--sb-text2); letter-spacing:8px;
  font-family:'Syne',sans-serif; text-transform:uppercase; margin-bottom:8px;
}
.sb-titulo__em {
  display:block; font-style:italic;
  font-size:clamp(4rem,9vw,8.5rem); font-weight:300;
  background:linear-gradient(135deg,#E8E0C8 0%,#D4AF37 40%,#F5E6A3 70%,#C8A84B 100%);
  background-size:200% auto;
  -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent;
  animation:goldShine 6s linear infinite; line-height:.95;
}
.sb-sub {
  font-family:'DM Mono',monospace; font-size:9px; letter-spacing:2.5px;
  color:var(--sb-text3); text-transform:uppercase; margin-bottom:28px;
  display:flex; align-items:center; gap:12px;
}
.sb-sub__gem { font-size:5px; color:var(--sb-gold); opacity:.5; }
.sb-hero__divider { display:flex; align-items:center; gap:14px; }
.sbhd__line {
  display:block; width:0; height:.5px;
  background:linear-gradient(to right,rgba(200,168,75,.5),transparent);
  animation:lineExpand 1.2s .9s cubic-bezier(.16,1,.3,1) forwards;
}
.sbhd__line--r { background:linear-gradient(to left,rgba(200,168,75,.25),transparent); animation-delay:1.1s; }
.sbhd__char { font-family:'Cormorant Garamond',serif; font-size:.95rem; font-style:italic; color:var(--sb-gold); opacity:.35; }

/* ══ SCROLL REVEAL — visibility evita problema SEO/a11y ══ */
.reveal-section {
  visibility:hidden;
  transform:translateY(28px);
  transition:visibility 0s .5s, opacity .7s var(--ease), transform .7s var(--ease);
  opacity:0;
}
.reveal-section.revealed {
  visibility:visible; opacity:1; transform:translateY(0);
  transition:opacity .7s var(--ease), transform .7s var(--ease);
}

/* ══ FILOSOFIA ══ */
.sb-filosofia { padding:80px 0; border-bottom:.5px solid var(--sb-hair); position:relative; z-index:2; }
.sb-filosofia__grid { display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:center; }
.sb-filosofia__titulo {
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(2rem,3.5vw,3.2rem); font-weight:300; line-height:1.1; margin-bottom:20px;
}
.sb-filosofia__titulo em { font-style:italic; color:var(--sb-gold); }
.sb-filosofia__desc { font-size:13px; color:var(--sb-text2); line-height:1.9; margin-bottom:14px; }
.sb-filosofia__selo {
  display:flex; align-items:center; gap:10px; margin-top:20px; padding-top:16px;
  border-top:.5px solid var(--sb-hair);
  font-family:'DM Mono',monospace; font-size:8px; letter-spacing:2px;
  color:var(--sb-gold); opacity:.65; text-transform:uppercase;
}
.sb-filosofia__selo-icon { font-size:5px; }
.sb-filosofia__visual {
  position:relative; aspect-ratio:1/1;
  display:flex; align-items:center; justify-content:center;
}
.sb-filosofia__kanji {
  position:absolute; font-family:'Cormorant Garamond',serif;
  font-size:clamp(6rem,14vw,14rem); font-weight:300; font-style:italic;
  color:transparent; -webkit-text-stroke:.5px rgba(200,168,75,.07);
  pointer-events:none; animation:kanjiPulse 9s ease-in-out infinite;
}
.sb-filosofia__orb {
  width:60%; height:60%; border-radius:50%;
  background:radial-gradient(circle,rgba(200,168,75,.1) 0%,transparent 80%);
  animation:auraPulse 6s ease-in-out infinite;
}
.sb-filosofia__badge {
  position:absolute; bottom:20px; right:0;
  background:rgba(9,9,15,.85); backdrop-filter:blur(8px);
  padding:8px 16px; display:flex; align-items:center; gap:8px;
  font-family:'DM Mono',monospace; font-size:8px; letter-spacing:2px;
  color:var(--sb-gold); border:.5px solid var(--sb-hair);
}

/* ══ STATS — LARGURA TOTAL, SEM WRAP ══ */
.sb-stats { position:relative; z-index:2; }
.sb-stats__full {
  border-top:.5px solid var(--sb-hair);
  border-bottom:.5px solid var(--sb-hair);
  background:rgba(200,168,75,.02);
}
.sb-stats__grid {
  display:grid; grid-template-columns:repeat(4,1fr); gap:0;
  border-left:.5px solid var(--sb-hair);
  max-width:1380px; margin:0 auto; padding:0 80px;
}
.sb-stat {
  padding:44px 24px; border-right:.5px solid var(--sb-hair);
  position:relative; overflow:hidden;
  display:flex; flex-direction:column; align-items:center; text-align:center;
  transition:background .3s;
}
.sb-stat:hover { background:rgba(200,168,75,.03); }
.sb-stat__corner { position:absolute; width:12px; height:12px; border-color:rgba(200,168,75,.2); border-style:solid; opacity:0; transition:opacity .3s; }
.sb-stat:hover .sb-stat__corner { opacity:1; }
.sb-stat__corner--tl { top:8px; left:8px;  border-width:.5px 0 0 .5px; }
.sb-stat__corner--br { bottom:8px; right:8px; border-width:0 .5px .5px 0; }
.sb-stat__num {
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(2.2rem,3.5vw,3.5rem); font-weight:300;
  background:linear-gradient(135deg,#B8960C,#F0D060,#D4AF37);
  -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
  line-height:1; margin-bottom:8px;
}
.sb-stat__label {
  font-family:'DM Mono',monospace; font-size:7px;
  letter-spacing:3px; text-transform:uppercase; color:var(--sb-text3);
}
.sb-stat__note { font-size:9px; color:rgba(200,168,75,.3); margin-top:6px; }

/* ══ DIVISOR ORIENTAL ══ */
.sb-divider-or {
  position:relative; display:flex; align-items:center; justify-content:center;
  padding:40px 0; background:var(--sb-deep); z-index:2;
  border-top:.5px solid var(--sb-hair); border-bottom:.5px solid var(--sb-hair);
}
.sbdo__line { flex:1; max-width:160px; height:.5px; background:linear-gradient(to right,transparent,rgba(200,168,75,.2)); }
.sbdo__line--r { background:linear-gradient(to left,transparent,rgba(200,168,75,.2)); }
.sbdo__mon {
  width:46px; height:46px; border-radius:50%;
  border:.5px solid rgba(200,168,75,.2);
  display:flex; align-items:center; justify-content:center;
  font-family:'Cormorant Garamond',serif; font-size:1.15rem; font-style:italic;
  color:var(--sb-gold); opacity:.5; margin:0 20px; position:relative;
}
.sbdo__mon::before { content:''; position:absolute; inset:4px; border-radius:50%; border:.5px solid var(--sb-hair); }

/* ══ FUNDADORES ══ */
.sb-fundadores { padding:96px 0; border-bottom:.5px solid var(--sb-hair); position:relative; z-index:2; }
.sb-fundadores__titulo {
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(2rem,3.5vw,3.2rem); font-weight:300;
  color:var(--sb-text); margin-bottom:56px;
}
.sb-fundadores__titulo em { font-style:italic; color:var(--sb-gold); }
.sb-fundadores__grid { display:grid; grid-template-columns:1fr 1fr; gap:32px; margin-bottom:48px; }

/* Card fundador */
.sb-founder {
  background:var(--sb-surf); border:.5px solid var(--sb-hair);
  padding:52px 44px; position:relative; overflow:hidden;
  transition:border-color .4s, opacity .6s var(--ease), transform .6s var(--ease);
  opacity:0; transform:translateX(-40px);
}
.sb-founder--luis { transform:translateX(40px); }
.sb-founder.founder-in { opacity:1; transform:translateX(0); }
.sb-founder--luis.founder-in { opacity:1; transform:translateX(0); }
.sb-founder:hover { border-color:var(--sb-hairH); }
.sb-founder::before {
  content:''; position:absolute; top:0; left:0; right:0; height:1px;
  background:linear-gradient(90deg,transparent,var(--sb-gold),transparent);
  opacity:0; transition:opacity .6s;
}
.sb-founder:hover::before { opacity:.5; }
.sb-founder__bg-kanji {
  position:absolute; right:-20px; bottom:-40px;
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(8rem,18vw,18rem); font-weight:300; font-style:italic;
  color:transparent; -webkit-text-stroke:.5px rgba(200,168,75,.05);
  pointer-events:none; line-height:1; animation:kanjiPulse 10s ease-in-out infinite;
}
.sb-founder:hover .sb-founder__bg-kanji { -webkit-text-stroke-color:rgba(200,168,75,.1); }
.sb-founder__aura {
  position:absolute; top:-60px; left:-60px;
  width:260px; height:260px; border-radius:50%;
  background:radial-gradient(circle,rgba(200,168,75,.07) 0%,transparent 70%);
  animation:auraPulse 7s ease-in-out infinite; pointer-events:none;
}
.sb-founder__aura--r { left:auto; right:-60px; animation-delay:-4s; }
.sb-founder__header { display:flex; align-items:flex-start; gap:28px; margin-bottom:36px; }
.sb-founder__seal { flex-shrink:0; }
.sb-founder__seal svg { animation:sealSpin 30s linear infinite; }
.sb-founder__seal--r svg { animation:sealSpinR 30s linear infinite; }
.sb-founder__identity { flex:1; display:flex; flex-direction:column; justify-content:center; }
.sb-founder__kanji-name {
  font-family:'Cormorant Garamond',serif;
  font-size:1.1rem; font-style:italic; font-weight:300;
  color:var(--sb-gold); opacity:.28; letter-spacing:.15em;
  display:block; margin-bottom:6px; transition:opacity .3s;
}
.sb-founder:hover .sb-founder__kanji-name { opacity:.55; }
.sb-founder__nome {
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(2rem,3vw,2.8rem); font-weight:300;
  color:var(--sb-text); line-height:1; margin-bottom:8px;
}
.sb-founder__cargo {
  font-family:'DM Mono',monospace; font-size:7px;
  letter-spacing:3.5px; text-transform:uppercase;
  color:var(--sb-gold); opacity:.65; display:block; margin-bottom:14px;
}
.sb-founder__divider { display:flex; align-items:center; gap:10px; }
.sbfd__line { flex:1; max-width:36px; height:.5px; background:linear-gradient(to right,rgba(200,168,75,.35),transparent); }
.sbfd__gem { font-size:5px; color:var(--sb-gold); opacity:.4; }
.sb-founder__quote {
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(1rem,1.6vw,1.25rem); font-style:italic; font-weight:300;
  color:var(--sb-text2); line-height:1.65; margin:0 0 24px; position:relative;
}
.sb-founder__quote-mark {
  display:block; font-size:4rem; line-height:.7;
  color:var(--sb-gold); opacity:.2; margin-bottom:8px;
  font-family:'Cormorant Garamond',serif;
}
.sb-founder__bio { font-size:12.5px; color:var(--sb-text3); line-height:1.85; margin-bottom:28px; }
.sb-founder__pilares { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:32px; }
.sb-founder__pilar {
  display:flex; align-items:center; gap:7px;
  font-family:'DM Mono',monospace; font-size:7.5px; letter-spacing:2.5px;
  text-transform:uppercase; color:var(--sb-text3);
  padding:5px 12px; border:.5px solid var(--sb-hair);
  transition:all .25s;
}
.sb-founder__pilar:hover { border-color:var(--sb-hairH); color:var(--sb-gold); background:rgba(200,168,75,.04); }
.sb-founder__pilar-dot { font-size:4px; color:var(--sb-gold); opacity:.45; }
.sb-founder__line { width:0; height:.5px; background:linear-gradient(to right,var(--sb-gold),transparent); transition:width .8s var(--ease); }
.sb-founder:hover .sb-founder__line { width:100%; }

/* Manifesto */
.sb-fundadores__manifesto {
  background:var(--sb-surf); border:.5px solid var(--sb-hair);
  padding:52px 60px; text-align:center;
  position:relative; overflow:hidden; transition:border-color .3s;
}
.sb-fundadores__manifesto:hover { border-color:var(--sb-hairH); }
.sb-manifesto__corner { position:absolute; width:20px; height:20px; border-color:rgba(200,168,75,.22); border-style:solid; }
.sb-manifesto__corner--tl { top:16px; left:16px; border-width:.5px 0 0 .5px; }
.sb-manifesto__corner--br { bottom:16px; right:16px; border-width:0 .5px .5px 0; }
.sb-manifesto__kanji {
  position:absolute; left:50%; top:50%; transform:translate(-50%,-50%);
  font-family:'Cormorant Garamond',serif; font-size:clamp(6rem,12vw,12rem);
  font-weight:300; color:transparent; -webkit-text-stroke:.5px rgba(200,168,75,.04); pointer-events:none;
}
.sb-manifesto__gem { font-size:7px; color:var(--sb-gold); opacity:.35; margin-bottom:20px; }
.sb-manifesto__texto {
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(1.3rem,2.5vw,2rem); font-weight:300;
  color:var(--sb-text2); line-height:1.6; margin-bottom:36px;
}
.sb-manifesto__texto em { font-style:italic; color:var(--sb-text); }
.sb-manifesto__assinaturas { display:flex; align-items:center; justify-content:center; gap:32px; }
.sb-manifesto__ass { display:flex; flex-direction:column; align-items:center; gap:8px; }
.sb-manifesto__ass-nome { font-family:'Cormorant Garamond',serif; font-size:1.1rem; font-style:italic; color:var(--sb-gold); opacity:.75; }
.sb-manifesto__ass-line { width:80px; height:.5px; background:linear-gradient(to right,transparent,rgba(200,168,75,.35),transparent); }
.sb-manifesto__sep { font-size:6px; color:var(--sb-gold); opacity:.3; }

/* ══ PROCESSO — FUNDO LEVEMENTE DIFERENTE ══ */
.sb-processo { position:relative; z-index:2; padding:80px 0; }
.sb-processo__full-bg {
  position:absolute; inset:0;
  background:linear-gradient(180deg, rgba(200,168,75,.025) 0%, transparent 40%, transparent 60%, rgba(200,168,75,.015) 100%);
  border-top:.5px solid var(--sb-hair); border-bottom:.5px solid var(--sb-hair);
  pointer-events:none;
}
.sb-processo__grid {
  display:grid; grid-template-columns:repeat(5,1fr); gap:0;
  border-left:.5px solid var(--sb-hair); border-top:.5px solid var(--sb-hair);
}
.sb-processo__card {
  padding:36px 22px; border-right:.5px solid var(--sb-hair); border-bottom:.5px solid var(--sb-hair);
  position:relative; overflow:hidden; transition:background .3s;
}
.sb-processo__card:hover { background:rgba(200,168,75,.03); }
.sb-processo__card-corner { position:absolute; width:12px; height:12px; border-color:rgba(200,168,75,.2); border-style:solid; opacity:0; transition:opacity .3s; }
.sb-processo__card:hover .sb-processo__card-corner { opacity:1; }
.sb-processo__card-corner--tl { top:8px; left:8px; border-width:.5px 0 0 .5px; }
.sb-processo__card-corner--br { bottom:8px; right:8px; border-width:0 .5px .5px 0; }
.sb-processo__kanji {
  position:absolute; right:8px; top:4px;
  font-family:'Cormorant Garamond',serif;
  font-size:2.6rem; font-weight:300; font-style:italic;
  color:var(--sb-gold); opacity:.05; pointer-events:none;
  animation:kanjiPulse 8s ease-in-out infinite; transition:opacity .3s;
}
.sb-processo__card:hover .sb-processo__kanji { opacity:.13; }
.sb-processo__step {
  font-family:'Cormorant Garamond',serif;
  font-size:2rem; color:rgba(200,168,75,.14); margin-bottom:14px; line-height:1;
}
.sb-processo__titulo {
  font-family:'DM Mono',monospace; font-size:8px; letter-spacing:2.5px;
  text-transform:uppercase; color:var(--sb-text); margin-bottom:10px;
}
.sb-processo__desc { font-size:11.5px; color:var(--sb-text3); line-height:1.8; }
.sb-processo__line { width:0; height:.5px; background:linear-gradient(to right,var(--sb-gold),transparent); margin-top:16px; transition:width .5s var(--ease); }
.sb-processo__card:hover .sb-processo__line { width:100%; }

/* ══ TIMELINE ══ */
.sb-timeline { padding:80px 0; border-bottom:.5px solid var(--sb-hair); position:relative; z-index:2; }
.sb-timeline__container { position:relative; display:flex; flex-direction:column; gap:40px; }
.sb-timeline__line { position:absolute; left:50%; top:0; bottom:0; width:.5px; background:linear-gradient(to bottom,transparent,rgba(237,232,224,.07) 15%,rgba(237,232,224,.07) 85%,transparent); transform:translateX(-50%); }
.sb-timeline__item { display:flex; align-items:flex-start; justify-content:space-between; position:relative; }
.sb-timeline__item.left  { flex-direction:row; }
.sb-timeline__item.right { flex-direction:row-reverse; }
.sb-timeline__item.left  .sb-timeline__card { text-align:right; margin-right:2rem; width:calc(50% - 2rem); }
.sb-timeline__item.right .sb-timeline__card { text-align:left;  margin-left:2rem;  width:calc(50% - 2rem); }
.sb-timeline__card {
  background:var(--sb-surf); border:.5px solid var(--sb-hair);
  padding:22px 26px; transition:all .3s;
}
.sb-timeline__card:hover { border-color:var(--sb-hairH); transform:translateY(-4px); }
.sb-timeline__ano {
  font-family:'Cormorant Garamond',serif; font-size:1.9rem;
  color:rgba(200,168,75,.16); font-weight:300; display:block; line-height:1; margin-bottom:4px;
  transition:color .3s;
}
.sb-timeline__card:hover .sb-timeline__ano { color:rgba(200,168,75,.42); }
.sb-timeline__titulo { font-family:'DM Mono',monospace; font-size:8px; letter-spacing:2.5px; color:var(--sb-text); margin-bottom:8px; text-transform:uppercase; }
.sb-timeline__desc { font-size:11.5px; color:var(--sb-text3); line-height:1.75; }
.sb-timeline__dot {
  position:absolute; left:50%; top:26px; transform:translateX(-50%);
  width:10px; height:10px; border-radius:50%;
  background:linear-gradient(135deg,var(--sb-gold),var(--sb-gold2));
  box-shadow:0 0 0 3px rgba(200,168,75,.08); transition:box-shadow .3s; z-index:2;
}
.sb-timeline__item:hover .sb-timeline__dot { box-shadow:0 0 0 6px rgba(200,168,75,.18); }

/* ══ TECNOLOGIA ══ */
.sb-tecnologia { padding:80px 0; border-bottom:.5px solid var(--sb-hair); position:relative; z-index:2; }
.sb-tecnologia__grid { display:grid; grid-template-columns:repeat(3,1fr); gap:0; border-left:.5px solid var(--sb-hair); border-top:.5px solid var(--sb-hair); }
.sb-tec__card {
  padding:44px 36px; border-right:.5px solid var(--sb-hair); border-bottom:.5px solid var(--sb-hair);
  position:relative; overflow:hidden; text-align:center; transition:background .3s;
}
.sb-tec__card:hover { background:rgba(200,168,75,.02); }
.sb-tec__corner { position:absolute; width:12px; height:12px; border-color:rgba(200,168,75,.2); border-style:solid; opacity:0; transition:opacity .3s; }
.sb-tec__card:hover .sb-tec__corner { opacity:1; }
.sb-tec__corner--tl { top:10px; left:10px; border-width:.5px 0 0 .5px; }
.sb-tec__corner--br { bottom:10px; right:10px; border-width:0 .5px .5px 0; }
.sb-tec__kanji {
  position:absolute; right:10px; top:6px;
  font-family:'Cormorant Garamond',serif; font-size:3rem; font-weight:300; font-style:italic;
  color:var(--sb-gold); opacity:.05; pointer-events:none;
  animation:kanjiPulse 9s ease-in-out infinite; transition:opacity .3s;
}
.sb-tec__card:hover .sb-tec__kanji { opacity:.14; }
.sb-tec__icon { margin-bottom:20px; opacity:.7; transition:opacity .3s,transform .4s var(--ease); }
.sb-tec__card:hover .sb-tec__icon { opacity:1; transform:scale(1.08); }
.sb-tec__titulo { font-family:'DM Mono',monospace; font-size:8.5px; letter-spacing:3px; text-transform:uppercase; color:var(--sb-text); margin-bottom:12px; }
.sb-tec__desc { font-size:12px; color:var(--sb-text3); line-height:1.8; }

/* ══ DEPOIMENTOS — FUNDO TOTAL DIFERENCIADO ══ */
.sb-depoimentos { position:relative; z-index:2; padding:80px 0; }
.sb-dep__full-bg {
  position:absolute; inset:0; overflow:hidden;
  background:rgba(200,168,75,.025);
  border-top:.5px solid var(--sb-hair); border-bottom:.5px solid var(--sb-hair);
  pointer-events:none;
}
.sb-dep__full-kanji {
  position:absolute; right:-30px; top:50%; transform:translateY(-50%);
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(200px,28vw,380px); font-weight:300; color:var(--sb-gold);
  opacity:.025; pointer-events:none; line-height:1;
  animation:kanjiPulse 12s ease-in-out infinite;
}
.sb-depoimentos__grid {
  display:grid; grid-template-columns:repeat(3,1fr); gap:0;
  border-left:.5px solid var(--sb-hair); border-top:.5px solid var(--sb-hair);
}
.sb-dep__card {
  padding:40px 32px; border-right:.5px solid var(--sb-hair); border-bottom:.5px solid var(--sb-hair);
  position:relative; overflow:hidden; transition:background .3s;
  background:rgba(9,9,15,.6);
}
.sb-dep__card:hover { background:rgba(200,168,75,.03); }
/* Linha dourada superior — detalhe diferenciador */
.sb-dep__gold-line {
  position:absolute; top:0; left:0; width:0; height:.5px;
  background:linear-gradient(to right,var(--sb-gold),transparent);
  transition:width .6s var(--ease);
}
.sb-dep__card:hover .sb-dep__gold-line { width:100%; }
.sb-dep__quote-mark {
  font-family:'Cormorant Garamond',serif; font-size:3.5rem; line-height:1;
  color:var(--sb-gold); opacity:.2; margin-bottom:14px;
}
.sb-dep__texto {
  font-family:'Cormorant Garamond',serif;
  font-size:1.05rem; font-style:italic; font-weight:300;
  color:var(--sb-text2); line-height:1.8; margin-bottom:20px;
}
.sb-dep__sep {
  display:flex; align-items:center; gap:12px; margin-bottom:20px;
}
.sb-dep__sep span:first-child,
.sb-dep__sep span:last-child { flex:1; height:.5px; background:linear-gradient(to right,transparent,rgba(200,168,75,.15),transparent); }
.sb-dep__sep-gem { font-size:5px; color:var(--sb-gold); opacity:.3; flex-shrink:0; }
.sb-dep__autor { display:flex; align-items:center; gap:14px; }
.sb-dep__avatar {
  width:38px; height:38px; border-radius:50%; flex-shrink:0;
  background:linear-gradient(135deg,var(--sb-gold),var(--sb-gold2));
  display:flex; align-items:center; justify-content:center;
  font-weight:700; color:#09090f; font-size:14px;
}
.sb-dep__nome { display:block; font-family:'DM Mono',monospace; font-size:9px; letter-spacing:2px; color:var(--sb-text); text-transform:uppercase; }
.sb-dep__cargo { font-size:10px; color:var(--sb-text3); }

/* ══ SUSTENTABILIDADE ══ */
.sb-sustentabilidade { padding:80px 0; border-bottom:.5px solid var(--sb-hair); position:relative; z-index:2; }
.sb-sus__grid { display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:center; }
.sb-sus__titulo {
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(2rem,3.5vw,3rem); font-weight:300; line-height:1.1; margin-bottom:18px;
}
.sb-sus__titulo em { font-style:italic; color:var(--sb-gold); }
.sb-sus__desc { font-size:13px; color:var(--sb-text2); line-height:1.9; margin-bottom:24px; }
.sb-sus__selos { display:flex; flex-direction:column; gap:10px; }
.sb-sus__selo {
  display:flex; align-items:center; gap:10px;
  font-family:'DM Mono',monospace; font-size:8px; letter-spacing:2px;
  color:var(--sb-gold); padding:7px 14px; border:.5px solid var(--sb-hair);
  text-transform:uppercase; width:fit-content; transition:border-color .25s,background .25s;
}
.sb-sus__selo svg { color:var(--sb-gold); opacity:.7; }
.sb-sus__selo:hover { border-color:var(--sb-hairH); background:rgba(200,168,75,.04); }
.sb-sus__visual { position:relative; aspect-ratio:1/1; display:flex; align-items:center; justify-content:center; }
.sb-sus__kanji {
  position:absolute; font-family:'Cormorant Garamond',serif;
  font-size:clamp(8rem,18vw,16rem); font-weight:300; font-style:italic;
  color:transparent; -webkit-text-stroke:.5px rgba(200,168,75,.06);
  pointer-events:none; animation:kanjiPulse 10s ease-in-out infinite;
}
.sb-sus__orb {
  width:55%; height:55%; border-radius:50%;
  background:radial-gradient(circle,rgba(200,168,75,.09) 0%,transparent 80%);
  animation:auraPulse 7s ease-in-out infinite;
}
/* Anéis extras na sustentabilidade */
.sb-sus__rings { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; pointer-events:none; }
.sb-sus__ring { position:absolute; border-radius:50%; border:.5px solid rgba(200,168,75,.08); }
.sb-sus__ring--1 { width:72%; height:72%; animation:ringPulse 8s ease-in-out infinite; }
.sb-sus__ring--2 { width:88%; height:88%; animation:ringPulse 8s ease-in-out infinite; animation-delay:-4s; }

/* ══ FAQ ══ */
.sb-faq { padding:80px 0; border-bottom:.5px solid var(--sb-hair); position:relative; z-index:2; }
.sb-faq__lista { max-width:860px; }
.sb-faq__item {
  border-bottom:.5px solid var(--sb-hair); cursor:pointer;
  transition:border-color .25s; outline:none;
}
.sb-faq__item:first-child { border-top:.5px solid var(--sb-hair); }
.sb-faq__item.active { border-color:rgba(200,168,75,.2); }
.sb-faq__item:focus-visible { box-shadow:0 0 0 2px rgba(200,168,75,.3); }
.sb-faq__pergunta {
  display:flex; align-items:center; gap:14px; padding:20px 0;
  font-size:13.5px; color:var(--sb-text2); transition:color .2s;
}
.sb-faq__item:hover .sb-faq__pergunta,
.sb-faq__item.active .sb-faq__pergunta { color:var(--sb-text); }
.sb-faq__bullet { font-size:5px; color:var(--sb-gold); opacity:.28; flex-shrink:0; transition:opacity .25s; }
.sb-faq__bullet.active { opacity:1; }
.sb-faq__item:hover .sb-faq__bullet { opacity:.55; }
.sb-faq__chevron {
  margin-left:auto; flex-shrink:0; width:26px; height:26px;
  border:.5px solid var(--sb-hair);
  display:flex; align-items:center; justify-content:center;
  color:var(--sb-text3); transition:all .25s;
}
.sb-faq__chevron.open { transform:rotate(180deg); border-color:rgba(200,168,75,.25); color:var(--sb-gold); background:rgba(200,168,75,.05); }
.sb-faq__resp {
  display:flex; gap:14px; align-items:flex-start;
  font-size:12.5px; color:var(--sb-text3); line-height:1.85; padding-bottom:20px;
}
.sb-faq__resp-bar { display:block; flex-shrink:0; margin-top:6px; width:.5px; min-height:36px; background:linear-gradient(to bottom,var(--sb-gold),transparent); opacity:.3; }
.faq-slide-enter-active,.faq-slide-leave-active { transition:opacity .25s,max-height .32s var(--ease); max-height:200px; overflow:hidden; }
.faq-slide-enter-from,.faq-slide-leave-to { opacity:0; max-height:0; }

/* ══ VIP — FAIXA DOURADA ESCURA ══ */
.sb-vip {
  padding:80px 0; text-align:center;
  position:relative; z-index:2;
  background:rgba(200,168,75,.03);
  border-top:.5px solid rgba(200,168,75,.15);
  border-bottom:.5px solid rgba(200,168,75,.15);
  overflow:hidden;
}
.sb-vip__bg-line {
  position:absolute; top:0; left:0; right:0; height:.5px;
  background:linear-gradient(90deg,transparent,rgba(200,168,75,.4),transparent);
}
.sb-vip__inner { max-width:680px; margin:0 auto; position:relative; z-index:1; }
.sb-vip__ornament { display:flex; align-items:center; justify-content:center; gap:16px; margin-bottom:28px; }
.sb-vip__ornament-line { width:100px; height:.5px; background:linear-gradient(to right,transparent,rgba(200,168,75,.4),transparent); }
.sb-vip__ornament-diamond { font-size:7px; color:var(--sb-gold); opacity:.55; }
.sb-vip__titulo {
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(2rem,4vw,3.5rem); font-weight:300;
  line-height:1.05; color:var(--sb-text); margin:16px 0;
}
.sb-vip__titulo em { font-style:italic; color:var(--sb-gold); }
.sb-vip__sub { font-size:12px; color:var(--sb-text3); line-height:1.8; margin-bottom:32px; }
.sb-vip__btn {
  position:relative; overflow:hidden;
  display:inline-flex; align-items:center; gap:12px;
  padding:14px 44px;
  background:transparent; border:.5px solid rgba(200,168,75,.4);
  color:var(--sb-gold); font-family:'DM Mono',monospace;
  font-size:8.5px; letter-spacing:3.5px; text-transform:uppercase;
  cursor:pointer; transition:all .3s;
}
.sb-vip__btn:hover { border-color:rgba(200,168,75,.8); transform:translateY(-2px); box-shadow:0 0 28px rgba(200,168,75,.14); }
.sb-vip__btn-glow {
  position:absolute; inset:0;
  background:linear-gradient(135deg,rgba(200,168,75,.06),rgba(200,168,75,.09));
  opacity:0; transition:opacity .4s;
}
.sb-vip__btn:hover .sb-vip__btn-glow { opacity:1; }

/* ══ CTA FINAL ══ */
.sb-cta { padding:100px 0; text-align:center; position:relative; z-index:2; }
.sb-cta__inner { max-width:680px; margin:0 auto; }
.sb-cta__titulo {
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(2.5rem,5vw,5rem); font-weight:300;
  color:var(--sb-text); line-height:.95; margin:20px 0 44px;
}
.sb-cta__titulo em { font-style:italic; color:var(--sb-gold); }
.sb-cta__btns { display:flex; gap:16px; justify-content:center; flex-wrap:wrap; }
.sb-btn-gold {
  display:inline-flex; align-items:center; gap:10px;
  font-family:'DM Mono',monospace; font-size:8.5px; letter-spacing:3.5px;
  text-transform:uppercase; padding:14px 32px; text-decoration:none;
  background:linear-gradient(135deg,#BF953F 0%,#FCF6BA 40%,#B38728 70%,#FBF5B7 100%);
  background-size:200% auto; color:#09090f;
  transition:background-position .5s,transform .3s,box-shadow .3s;
}
.sb-btn-gold:hover { background-position:right center; transform:translateY(-2px); box-shadow:0 0 32px rgba(200,168,75,.28); }
.sb-btn-ghost {
  display:inline-flex; align-items:center; gap:10px;
  font-family:'DM Mono',monospace; font-size:8.5px; letter-spacing:3.5px;
  text-transform:uppercase; padding:14px 32px; text-decoration:none;
  border:.5px solid var(--sb-hairH); color:var(--sb-gold); transition:all .3s;
}
.sb-btn-ghost:hover { background:rgba(200,168,75,.07); transform:translateY(-2px); }

/* ══ MODAL VIP ══ */
.vip-overlay { position:fixed; inset:0; z-index:9999; display:flex; align-items:center; justify-content:center; padding:24px; background:rgba(0,0,0,.9); backdrop-filter:blur(20px); }
.vip-overlay-enter-active,.vip-overlay-leave-active { transition:opacity .4s; }
.vip-overlay-enter-from,.vip-overlay-leave-to { opacity:0; }
.vip-modal-enter-active { transition:all .5s cubic-bezier(.16,1,.3,1); }
.vip-modal-leave-active { transition:all .3s ease; }
.vip-modal-enter-from { opacity:0; transform:translateY(32px) scale(.96); }
.vip-modal-leave-to   { opacity:0; transform:translateY(-16px) scale(.98); }
.vip-modal {
  position:relative; width:100%; max-width:520px; max-height:90vh; overflow-y:auto;
  background:rgba(9,9,15,.98); border:.5px solid rgba(200,168,75,.18);
  padding:48px 42px 42px; text-align:center; scrollbar-width:thin;
}
.vip-modal__close {
  position:absolute; top:18px; right:18px; width:30px; height:30px;
  background:transparent; border:.5px solid rgba(200,168,75,.18); border-radius:50%;
  color:rgba(237,232,224,.35); cursor:pointer; transition:all .3s; font-size:11px;
}
.vip-modal__close:hover { border-color:rgba(200,168,75,.55); color:var(--sb-gold); transform:rotate(90deg); }
.vip-modal__seal { margin:0 auto 20px; animation:sealSpin 18s linear infinite; display:flex; justify-content:center; }
.vip-modal__titulo { font-family:'Cormorant Garamond',serif; font-size:clamp(2rem,5vw,3rem); font-weight:300; line-height:.95; color:#fff; margin:12px 0; }
.vip-modal__titulo em { font-style:italic; color:var(--sb-gold); }
.vip-modal__lead { font-size:12px; color:rgba(237,232,224,.38); line-height:1.7; }
.vip-modal__divider { display:flex; align-items:center; gap:16px; margin:28px 0; }
.vip-modal__divider span:first-child,.vip-modal__divider span:last-child { flex:1; height:.5px; background:linear-gradient(to right,transparent,rgba(200,168,75,.18),transparent); }
.vip-modal__divider-icon { font-size:7px; color:rgba(200,168,75,.3); }
.vip-form { display:flex; flex-direction:column; gap:14px; }
.vip-form__input { width:100%; background:rgba(255,255,255,.025); border:.5px solid rgba(200,168,75,.18); padding:13px 16px; font-family:'DM Mono',monospace; font-size:12px; color:rgba(237,232,224,.75); outline:none; transition:border-color .3s; }
.vip-form__input:focus { border-color:rgba(200,168,75,.55); }
.vip-form__btn { display:inline-flex; align-items:center; justify-content:center; gap:10px; padding:13px; background:linear-gradient(135deg,#BF953F,#D4AF37); border:none; font-family:'DM Mono',monospace; font-size:8.5px; letter-spacing:3px; color:#09090f; cursor:pointer; text-transform:uppercase; transition:transform .2s,box-shadow .2s; }
.vip-form__btn:hover { transform:translateY(-2px); box-shadow:0 4px 16px rgba(200,168,75,.35); }
.vip-loading { display:flex; flex-direction:column; align-items:center; gap:14px; padding:20px 0; }
.vip-loading__spinner { width:30px; height:30px; border:.5px solid transparent; border-top-color:rgba(200,168,75,.75); border-right-color:rgba(200,168,75,.28); border-radius:50%; animation:spin 1s linear infinite; }
.vip-loading span { font-family:'DM Mono',monospace; font-size:8.5px; letter-spacing:2.5px; color:rgba(200,168,75,.55); text-transform:uppercase; }
.vip-success { text-align:center; padding:20px 0; }
.vip-success__icon { width:46px; height:46px; margin:0 auto 14px; border-radius:50%; border:.5px solid rgba(200,168,75,.35); display:flex; align-items:center; justify-content:center; font-size:22px; color:var(--sb-gold); }
.vip-success__titulo { font-family:'Cormorant Garamond',serif; font-size:1.3rem; font-style:italic; color:#fff; margin-bottom:6px; }
.vip-success__sub { font-family:'DM Mono',monospace; font-size:9px; letter-spacing:1.5px; color:rgba(237,232,224,.35); text-transform:uppercase; }
.vip-modal__note { margin-top:22px; font-family:'DM Mono',monospace; font-size:7px; letter-spacing:2px; color:rgba(200,168,75,.28); text-transform:uppercase; }
.ct-fade-scale-enter-active,.ct-fade-scale-leave-active { transition:opacity .3s,transform .3s; }
.ct-fade-scale-enter-from { opacity:0; transform:scale(.97) translateY(8px); }
.ct-fade-scale-leave-to   { opacity:0; transform:scale(.97) translateY(-8px); }

/* ══ RESPONSIVO ══ */
@media (max-width:1200px) {
  .sb-wrap { padding:0 48px; }
  .sb-hero  { padding:72px 48px 60px; }
  .sb-processo__grid { grid-template-columns:repeat(3,1fr); }
  .sb-stats__grid { padding:0 48px; }
}
@media (max-width:1024px) {
  .sb-fundadores__grid { grid-template-columns:1fr; gap:24px; }
  .sb-stats__grid { grid-template-columns:repeat(2,1fr); }
  .sb-filosofia__grid,.sb-sus__grid { grid-template-columns:1fr; gap:40px; }
  .sb-timeline__item.left  .sb-timeline__card,
  .sb-timeline__item.right .sb-timeline__card { width:calc(100% - 40px); margin:0 0 0 40px; text-align:left; }
  .sb-timeline__item,.sb-timeline__item.right { flex-direction:row; }
  .sb-timeline__dot { left:20px; }
  .sb-timeline__line { left:20px; }
}
@media (max-width:768px) {
  .sb-wrap { padding:0 24px; }
  .sb-hero  { padding:52px 24px; }
  .sb-hero__kanji { display:none; }
  .sb-hero__mon   { right:24px; }
  .sb-stats__grid { grid-template-columns:1fr 1fr; padding:0 24px; }
  .sb-tecnologia__grid { grid-template-columns:1fr; }
  .sb-depoimentos__grid { grid-template-columns:1fr; }
  .sb-processo__grid { grid-template-columns:1fr 1fr; }
  .sb-founder { padding:36px 28px; }
  .sb-founder__header { flex-direction:column; gap:20px; }
  .sb-manifesto__assinaturas { flex-direction:column; gap:20px; }
  .sb-fundadores__manifesto { padding:36px 24px; }
  .sb-sidebar { display:none; }
  .sb-editorial { display:none; }
  .sb-cta__btns { flex-direction:column; align-items:center; }
  .sb-vip__btn { padding:12px 28px; }
  .sb-bg__ring { display:none; }
}
@media (max-width:480px) {
  .sb-stats__grid { grid-template-columns:1fr; }
  .sb-processo__grid { grid-template-columns:1fr; }
  .vip-modal { padding:36px 20px 28px; }
}
@media (prefers-reduced-motion:reduce) {
  .sb-bg__beam,.sb-hero__mon,.sb-hero__kanji,
  .sb-founder__bg-kanji,.sb-founder__aura,
  .sb-founder__seal svg,.sb-founder__seal--r svg,
  .sb-bg__kamon,.sb-bg__ring { animation:none !important; }
}
</style>