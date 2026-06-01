<template>
  <teleport to="body">
    <div v-if="aberto" class="co-overlay" @click.self="tentarFechar" role="dialog" aria-modal="true" aria-label="Checkout Noir & Or">

      <div class="co-realm-line" aria-hidden="true"></div>

      <div class="co-modal" ref="modalRef">

        <span class="co-corner co-corner--tl" aria-hidden="true"></span>
        <span class="co-corner co-corner--tr" aria-hidden="true"></span>
        <span class="co-corner co-corner--bl" aria-hidden="true"></span>
        <span class="co-corner co-corner--br" aria-hidden="true"></span>

        <div class="co-kanji-bg" aria-hidden="true">識</div>

        <!-- ══ HEADER ══ -->
        <header class="co-header">
          <div class="co-header__brand">
            <span class="co-brand-mark" aria-hidden="true">⊕</span>
            <span class="co-brand-txt">Noir<em>&amp;</em>Or</span>
            <span class="co-brand-sub">Atelier</span>
          </div>

          <nav class="co-stepper" aria-label="Etapas do checkout" role="tablist">
            <button
              v-for="(s, i) in ETAPAS"
              :key="s.id"
              :class="['co-step', { 'is-done': etapa > i+1, 'is-active': etapa === i+1, 'is-future': etapa < i+1 }]"
              @click="etapa > i+1 ? irParaEtapa(i+1) : null"
              :disabled="etapa <= i"
              :aria-label="s.label"
              :aria-current="etapa === i+1 ? 'step' : undefined"
              role="tab"
            >
              <span class="co-step__orb" aria-hidden="true">
                <svg v-if="etapa > i+1" width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
                <span v-else>{{ i+1 }}</span>
              </span>
              <span class="co-step__line" v-if="i < ETAPAS.length-1" aria-hidden="true"></span>
            </button>
            <div class="co-stepper__label">{{ ETAPAS[etapa-1]?.label }}</div>
          </nav>

          <div class="co-header__right">
            <select v-model="locale" class="co-locale-sel" @change="salvarLocale">
              <option value="pt-BR">🇧🇷</option>
              <option value="en-US">🇺🇸</option>
            </select>
            <button class="co-close" @click="tentarFechar" aria-label="Fechar checkout">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>
        </header>

        <div class="co-progress" aria-hidden="true">
          <div class="co-progress__fill" :style="{ width: progressoPct + '%' }"></div>
        </div>

        <!-- ══ BODY ══ -->
        <div class="co-body">

          <main class="co-main">

            <!-- ─── ETAPA 1: CARRINHO ─── -->
            <transition name="co-slide" mode="out-in">
            <section v-if="etapa === 1" key="e1" class="co-etapa">
              <div class="co-etapa__head">
                <span class="co-etapa__kanji" aria-hidden="true">品</span>
                <h2 class="co-titulo"><span class="co-titulo__num">01</span>{{ t('Meu Carrinho') }}</h2>
                <span class="co-badge">{{ itens.length }} {{ itens.length === 1 ? t('item') : t('itens') }}</span>
              </div>

              <div v-if="!itens.length" class="co-vazio">
                <div class="co-vazio__ico" aria-hidden="true">
                  <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                  </svg>
                </div>
                <p class="co-vazio__txt">{{ t('Carrinho vazio') }}</p>
                <button class="btn-gold" @click="fechar">{{ t('Explorar Coleção') }}</button>
              </div>

              <div v-else>
                <TransitionGroup name="item-list" tag="div" class="co-itens">
                  <div v-for="item in itens" :key="item._id||item.id" class="co-item">
                    <div class="co-item__num" aria-hidden="true">{{ String(itens.indexOf(item)+1).padStart(2,'0') }}</div>
                    <div class="co-item__img">
                      <img :src="item.imagem" :alt="item.nome" loading="lazy" @error="e=>e.target.style.opacity='0'"/>
                    </div>
                    <div class="co-item__info">
  <span class="co-item__cat">{{ item.categoria }}</span>
  <p class="co-item__nome">{{ item.nome }}</p>

  <div v-if="item.corNome || item.storage" style="display:flex;align-items:center;gap:6px;margin-top:3px;flex-wrap:wrap;">
    <span v-if="item.corHex" :style="`display:inline-block;width:9px;height:9px;border-radius:50%;background:${item.corHex};border:0.5px solid rgba(200,168,75,0.25);flex-shrink:0`"></span>
    <span style="font-family:'DM Mono',monospace;font-size:9px;letter-spacing:.12em;color:rgba(245,240,232,0.35);text-transform:uppercase;">{{ [item.corNome, item.storage].filter(Boolean).join(' · ') }}</span>
  </div>

                      <div class="co-qty" :aria-label="`Quantidade: ${item.qty}`">
                        <button class="co-qty__btn" @click="alterarQty(item,-1)" aria-label="Diminuir">−</button>
                        <span class="co-qty__val" aria-live="polite">{{ item.qty }}</span>
                        <button class="co-qty__btn" @click="alterarQty(item,+1)" aria-label="Aumentar">+</button>
                      </div>
                    </div>
                    <div class="co-item__right">
                      <p class="co-item__preco">R$ {{ fmt(item.preco * item.qty) }}</p>
                      <button class="co-remove" @click="removerItem(item)" aria-label="Remover item">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
                      </button>
                    </div>
                  </div>
                </TransitionGroup>

                <!-- CUPOM -->
                <div class="co-cupom">
                  <div class="co-cupom__row">
                    <input
                      v-model="cupomCodigo"
                      :placeholder="t('Código de cupom')"
                      class="co-cupom__input"
                      @keyup.enter="aplicarCupom"
                      :disabled="cupomAplicado"
                      autocomplete="off"
                      style="text-transform:uppercase"
                    />
                    <button v-if="!cupomAplicado" class="btn-ghost btn-sm" @click="aplicarCupom" :disabled="salvandoCupom||!cupomCodigo">
                      <span v-if="!salvandoCupom">{{ t('Aplicar') }}</span>
                      <span v-else class="co-spin co-spin--sm"></span>
                    </button>
                    <button v-else class="btn-ghost btn-sm btn-ghost--danger" @click="removerCupom">{{ t('Remover') }}</button>
                  </div>
                  <transition name="msg-fade">
                    <p v-if="cupomMsg" :class="['co-cupom__msg', cupomAplicado ? 'co-cupom__msg--ok' : 'co-cupom__msg--err']">{{ cupomMsg }}</p>
                  </transition>
                </div>

                <button class="btn-gold btn-full" @click="irParaEtapa(2)">
                  {{ t('Continuar para Dados') }}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </div>
            </section>
            </transition>

            <!-- ─── ETAPA 2: IDENTIDADE / VALIDAÇÃO CPF ─── -->
            <transition name="co-slide" mode="out-in">
            <section v-if="etapa === 2" key="e2" class="co-etapa">
              <div class="co-etapa__head">
                <span class="co-etapa__kanji" aria-hidden="true">身</span>
                <h2 class="co-titulo"><span class="co-titulo__num">02</span>{{ t('Seus Dados') }}</h2>
              </div>

              <div class="co-segid">
                <div class="co-segid__ico" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <div>
                  <p class="co-segid__titulo">{{ t('Verificação de identidade') }}</p>
                  <p class="co-segid__desc">{{ t('CPF e nome validados em tempo real para sua segurança') }}</p>
                </div>
              </div>

              <!-- STATUS DA VALIDAÇÃO CPF -->
              <transition name="msg-fade">
                <div v-if="cpfStatus !== 'idle'" :class="['co-cpf-status', `co-cpf-status--${cpfStatus}`]">
                  <span v-if="cpfStatus === 'loading'" class="co-spin co-spin--sm"></span>
                  <svg v-else-if="cpfStatus === 'ok'" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
                  <svg v-else width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
                  <span>{{ cpfStatusMsg }}</span>
                </div>
              </transition>

              <div class="co-form">
                <div class="co-grid-2">
                  <div class="co-campo" :class="campoClass('nome')">
                    <label for="f-nome">{{ t('Nome completo') }} *</label>
                    <div class="co-campo__row">
                      <input id="f-nome" v-model="cliente.nome" @blur="validarCampoNome" @input="limparErro('nome')" autocomplete="name" :placeholder="t('Como no documento')"/>
                      <span class="co-campo__ok" v-if="!erros.nome && cliente.nome.trim().split(' ').length >= 2" aria-label="Campo válido">✓</span>
                    </div>
                    <span class="co-campo__err" v-if="erros.nome" role="alert">{{ erros.nome }}</span>
                  </div>
                  <div class="co-campo" :class="campoClass('cpf')">
                    <label for="f-cpf">CPF *</label>
                    <div class="co-campo__row">
                      <input id="f-cpf" v-model="cliente.cpf" @input="maskCPF" @blur="validarCPFCompleto" maxlength="14" inputmode="numeric" placeholder="000.000.000-00"/>
                      <span v-if="cpfStatus === 'loading'" class="co-spin co-spin--sm"></span>
                      <span class="co-campo__ok" v-else-if="cpfStatus === 'ok'" aria-label="CPF válido">✓</span>
                    </div>
                    <span class="co-campo__err" v-if="erros.cpf" role="alert">{{ erros.cpf }}</span>
                  </div>
                </div>
                <div class="co-grid-2">
                  <div class="co-campo" :class="campoClass('email')">
                    <label for="f-email">{{ t('E-mail') }} *</label>
                    <div class="co-campo__row">
                      <input id="f-email" v-model="cliente.email" type="email" @blur="validarCampo('email')" @input="limparErro('email')" autocomplete="email" placeholder="seu@email.com"/>
                      <span class="co-campo__ok" v-if="!erros.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cliente.email)" aria-label="E-mail válido">✓</span>
                    </div>
                    <span class="co-campo__err" v-if="erros.email" role="alert">{{ erros.email }}</span>
                  </div>
                  <div class="co-campo" :class="campoClass('telefone')">
                    <label for="f-tel">{{ t('Telefone') }} *</label>
                    <div class="co-campo__row">
                      <input id="f-tel" v-model="cliente.telefone" @input="maskTel" @blur="validarCampo('telefone')" maxlength="15" inputmode="tel" placeholder="(11) 99999-9999" autocomplete="tel"/>
                      <span class="co-campo__ok" v-if="!erros.telefone && cliente.telefone.replace(/\D/g,'').length >= 10" aria-label="Telefone válido">✓</span>
                    </div>
                    <span class="co-campo__err" v-if="erros.telefone" role="alert">{{ erros.telefone }}</span>
                  </div>
                </div>
              </div>

              <div class="co-completude">
                <div class="co-completude__bar">
                  <div class="co-completude__fill" :style="{width: completudePct+'%', background: completudePct===100 ? '#2ecc71' : 'var(--or)'}"></div>
                </div>
                <span class="co-completude__txt">{{ completudePct }}% {{ t('preenchido') }}</span>
              </div>

              <transition name="msg-fade">
                <p v-if="erroForm" class="co-erro-form" role="alert">⚠ {{ erroForm }}</p>
              </transition>
              <div class="co-btns">
                <button class="btn-ghost" @click="irParaEtapa(1)">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                  {{ t('Voltar') }}
                </button>
                <button class="btn-gold" @click="validarDados" :disabled="cpfStatus === 'loading'">
                  <span v-if="cpfStatus !== 'loading'">{{ t('Continuar para Entrega') }}</span>
                  <span v-else class="co-spin co-spin--sm"></span>
                  <svg v-if="cpfStatus !== 'loading'" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </div>
            </section>
            </transition>

            <!-- ─── ETAPA 3: ENTREGA ─── -->
            <transition name="co-slide" mode="out-in">
            <section v-if="etapa === 3" key="e3" class="co-etapa">
              <div class="co-etapa__head">
                <span class="co-etapa__kanji" aria-hidden="true">住</span>
                <h2 class="co-titulo"><span class="co-titulo__num">03</span>{{ t('Entrega') }}</h2>
              </div>

              <div class="co-form">
                <div class="co-grid-2">
                  <div class="co-campo" :class="campoClass('cep')">
                    <label for="f-cep">CEP *</label>
                    <div class="co-campo__row">
                      <input id="f-cep" v-model="entrega.cep" @input="maskCEP" @blur="buscarCEP" maxlength="9" inputmode="numeric" placeholder="00000-000"/>
                      <span v-if="buscandoCEP" class="co-spin co-spin--sm"></span>
                      <span class="co-campo__ok" v-else-if="!erros.cep && entrega.cep.length===9" aria-label="CEP válido">✓</span>
                    </div>
                    <span class="co-campo__err" v-if="erros.cep" role="alert">{{ erros.cep }}</span>
                  </div>
                  <div class="co-campo">
                    <label for="f-uf">{{ t('Estado') }}</label>
                    <input id="f-uf" v-model="entrega.estado" maxlength="2" placeholder="MG" style="text-transform:uppercase"/>
                  </div>
                </div>
                <div class="co-campo" :class="campoClass('endereco')">
                  <label for="f-end">{{ t('Endereço') }} *</label>
                  <input id="f-end" v-model="entrega.endereco" @blur="validarCampo('endereco')" :placeholder="t('Rua, número, complemento')"/>
                  <span class="co-campo__err" v-if="erros.endereco" role="alert">{{ erros.endereco }}</span>
                </div>
                <div class="co-grid-2">
                  <div class="co-campo">
                    <label for="f-cidade">{{ t('Cidade') }}</label>
                    <input id="f-cidade" v-model="entrega.cidade" :placeholder="t('Sua cidade')"/>
                  </div>
                  <div class="co-campo">
                    <label for="f-bairro">{{ t('Bairro') }}</label>
                    <input id="f-bairro" v-model="entrega.bairro" :placeholder="t('Seu bairro')"/>
                  </div>
                </div>
              </div>

              <div v-if="opcoesEntrega.length" class="co-frete">
                <div class="co-divider"><span>{{ t('Opções de frete') }}</span></div>
                <div class="co-frete__lista">
                  <label
                    v-for="op in opcoesEntrega" :key="op.codigo"
                    :class="['co-frete__op', { 'is-sel': freteEscolhido === op.codigo }]"
                  >
                    <input type="radio" v-model="freteEscolhido" :value="op.codigo" hidden/>
                    <div class="co-frete__op-info">
                      <span class="co-frete__op-nome">
                        <svg v-if="op.codigo==='expresso'" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                        <svg v-else width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                        {{ op.nome }}
                      </span>
                      <span class="co-frete__op-prazo">{{ op.prazo }}</span>
                    </div>
                    <span class="co-frete__op-val">{{ op.valor===0 ? 'GRÁTIS' : 'R$ '+fmt(op.valor) }}</span>
                    <span class="co-frete__radio" aria-hidden="true"></span>
                  </label>
                </div>
              </div>
              <div v-else-if="entrega.cep.length===9 && !buscandoCEP" class="co-frete__vip">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                {{ t('Frete VIP: entrega especial para este endereço') }}
              </div>

              <transition name="msg-fade">
                <p v-if="erroForm" class="co-erro-form" role="alert">⚠ {{ erroForm }}</p>
              </transition>
              <div class="co-btns">
                <button class="btn-ghost" @click="irParaEtapa(2)">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                  {{ t('Voltar') }}
                </button>
                <button class="btn-gold" @click="validarEntrega">
                  {{ t('Continuar para Pagamento') }}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </div>
            </section>
            </transition>

            <!-- ─── ETAPA 4: PAGAMENTO ─── -->
            <transition name="co-slide" mode="out-in">
            <section v-if="etapa === 4" key="e4" class="co-etapa">
              <div class="co-etapa__head">
                <span class="co-etapa__kanji" aria-hidden="true">金</span>
                <h2 class="co-titulo"><span class="co-titulo__num">04</span>{{ t('Pagamento') }}</h2>
              </div>

              <div class="co-tabs" role="tablist" aria-label="Método de pagamento">
                <button :class="['co-tab', {active: metodo==='pix'}]" @click="metodo='pix'" role="tab" :aria-selected="metodo==='pix'">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                  Pix
                </button>
                <button :class="['co-tab', {active: metodo==='cartao'}]" @click="metodo='cartao'" role="tab" :aria-selected="metodo==='cartao'">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                  {{ t('Cartão') }}
                </button>
                <button :class="['co-tab', {active: metodo==='boleto'}]" @click="metodo='boleto'" role="tab" :aria-selected="metodo==='boleto'">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                  Boleto
                </button>
              </div>

              <!-- PIX -->
              <div v-if="metodo==='pix'" class="co-pay-info">
                <div class="co-pay-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                </div>
                <h3>{{ t('Pagamento via Pix') }}</h3>
                <p>{{ t('QR Code gerado pelo Mercado Pago após confirmar o pedido') }}</p>
                <div class="co-vantagens">
                  <span><span class="co-gem" aria-hidden="true">◆</span>{{ t('Aprovação imediata') }}</span>
                  <span><span class="co-gem" aria-hidden="true">◆</span>{{ t('100% seguro e criptografado') }}</span>
                  <span><span class="co-gem" aria-hidden="true">◆</span>{{ t('Disponível 24 horas') }}</span>
                </div>
              </div>

              <!-- CARTÃO -->
              <div v-else-if="metodo==='cartao'" class="co-form">
                <div class="co-card-preview">
                  <div :class="['co-card', { 'co-card--flip': cartaoVirado }]">
                    <div class="co-card__front">
                      <div class="co-card__top">
                        <div class="co-card__chip" aria-hidden="true"></div>
                        <span class="co-card__brand">{{ bandeiraCartao.toUpperCase() }}</span>
                      </div>
                      <p class="co-card__num">{{ cartao.numero || '•••• •••• •••• ••••' }}</p>
                      <div class="co-card__bottom">
                        <div><p class="co-card__lbl">{{ t('Titular') }}</p><p class="co-card__val">{{ cartao.nome||'SEU NOME' }}</p></div>
                        <div><p class="co-card__lbl">{{ t('Validade') }}</p><p class="co-card__val">{{ cartao.validade||'MM/AA' }}</p></div>
                      </div>
                    </div>
                    <div class="co-card__back" v-if="cartaoVirado">
                      <div class="co-card__tarja" aria-hidden="true"></div>
                      <div class="co-card__cvv-wrap">CVV <span>{{ cartao.cvv||'•••' }}</span></div>
                    </div>
                  </div>
                </div>

                <div class="co-campo">
                  <label>{{ t('Bandeira') }}</label>
                  <div class="co-bandeiras">
                    <button v-for="b in BANDEIRAS" :key="b.id" type="button" :class="['co-bandeira', {active: bandeiraCartao===b.id}]" @click="bandeiraCartao=b.id">{{ b.nome }}</button>
                  </div>
                </div>

                <div class="co-campo">
                  <label>{{ t('Tipo de cartão') }}</label>
                  <div class="co-radio-group">
                    <label class="co-radio"><input type="radio" value="credito" v-model="tipoCartao"/>{{ t('Crédito') }}</label>
                    <label class="co-radio"><input type="radio" value="debito"  v-model="tipoCartao"/>{{ t('Débito') }}</label>
                  </div>
                </div>

                <div class="co-campo" :class="campoClass('cartaoNum')">
                  <label for="c-num">{{ t('Número do cartão') }} *</label>
                  <div class="co-campo__row">
                    <input id="c-num" v-model="cartao.numero" placeholder="0000 0000 0000 0000" maxlength="19" @input="maskCartao" @blur="validarCampo('cartaoNum')" inputmode="numeric"/>
                    <span class="co-campo__ok" v-if="luhnValido && !erros.cartaoNum">✓</span>
                  </div>
                  <span class="co-campo__err" v-if="erros.cartaoNum" role="alert">{{ erros.cartaoNum }}</span>
                  <span class="co-campo__hint" v-if="luhnValido && !erros.cartaoNum">{{ t('Número válido') }}</span>
                </div>

                <div class="co-campo">
                  <label for="c-nome">{{ t('Nome no cartão') }}</label>
                  <input id="c-nome" v-model="cartao.nome" :placeholder="t('Como impresso no cartão')" style="text-transform:uppercase" autocomplete="cc-name"/>
                </div>

                <div class="co-grid-2">
                  <div class="co-campo" :class="campoClass('cartaoVal')">
                    <label for="c-val">{{ t('Validade') }} *</label>
                    <input id="c-val" v-model="cartao.validade" placeholder="MM/AA" maxlength="5" @input="maskValidade" @blur="validarCampo('cartaoVal')" inputmode="numeric" autocomplete="cc-exp"/>
                    <span class="co-campo__err" v-if="erros.cartaoVal" role="alert">{{ erros.cartaoVal }}</span>
                  </div>
                  <div class="co-campo">
                    <label for="c-cvv">CVV</label>
                    <input id="c-cvv" v-model="cartao.cvv" placeholder="•••" maxlength="4" type="password" @focus="cartaoVirado=true" @blur="cartaoVirado=false" inputmode="numeric" autocomplete="cc-csc"/>
                  </div>
                </div>

                <div class="co-campo">
                  <label for="c-parc">{{ t('Parcelamento') }}</label>
                  <select id="c-parc" v-model="cartao.parcelas" class="co-select" :disabled="tipoCartao==='debito'">
                    <option v-for="p in parcelasDisp" :key="p.n" :value="p.n">{{ p.n }}x de R$ {{ fmt(p.val) }} {{ p.n===1 ? t('(à vista)') : t('sem juros') }}</option>
                  </select>
                  <span class="co-campo__hint" v-if="tipoCartao==='debito'">{{ t('Débito disponível apenas à vista') }}</span>
                </div>
              </div>

              <!-- BOLETO -->
              <div v-else class="co-pay-info">
                <div class="co-pay-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                </div>
                <h3>{{ t('Boleto Bancário') }}</h3>
                <p>{{ t('Gerado via Mercado Pago. Vence em 3 dias úteis.') }}</p>
                <div class="co-vantagens">
                  <span><span class="co-gem" aria-hidden="true">◆</span>{{ t('Sem taxa extra') }}</span>
                  <span><span class="co-gem" aria-hidden="true">◆</span>{{ t('Pague em qualquer banco') }}</span>
                  <span style="opacity:.45"><span class="co-gem" aria-hidden="true">◆</span>{{ t('Aprovação em até 3 dias') }}</span>
                </div>
              </div>

              <!-- ANTIFRAUDE BADGE -->
              <div class="co-antifraude">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                <span>{{ t('Análise antifraude automática aplicada') }}</span>
              </div>

              <div class="co-seals">
                <div class="co-seal"><span class="co-seal__dot"></span>SSL 256-bit</div>
                <div class="co-seal"><span class="co-seal__dot"></span>{{ t('Mercado Pago') }}</div>
                <div class="co-seal"><span class="co-seal__dot"></span>{{ t('Compra garantida') }}</div>
              </div>

              <transition name="msg-fade">
                <p v-if="erroForm" class="co-erro-form" role="alert">⚠ {{ erroForm }}</p>
              </transition>
              <div class="co-btns">
                <button class="btn-ghost" @click="irParaEtapa(3)">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                  {{ t('Voltar') }}
                </button>
                <button class="btn-gold btn-finalizar" @click="finalizarPedido" :disabled="salvando">
                  <template v-if="!salvando">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    {{ t('Finalizar Pedido') }}
                  </template>
                  <span v-else class="co-spin"></span>
                </button>
              </div>
            </section>
            </transition>

            <!-- ─── ETAPA 5: CONFIRMAÇÃO + COMPROVANTE ─── -->
            <transition name="co-slide" mode="out-in">
            <section v-if="etapa === 5 && pedidoCriado" key="e5" class="co-etapa co-confirmacao">

              <div :class="['co-status-ico', `co-status-ico--${pedidoCriado.status}`]" aria-hidden="true">
                <svg v-if="pedidoCriado.status==='aprovado'" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                <svg v-else-if="pedidoCriado.status==='cancelado'" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
                <svg v-else width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>

              <h2 class="co-titulo co-titulo--center">
                <template v-if="pedidoCriado.status==='aprovado'">{{ t('Pedido Aprovado') }} 🎉</template>
                <template v-else-if="pedidoCriado.pagamento?.metodo==='pix'">{{ t('Aguardando Pagamento Pix') }}</template>
                <template v-else-if="pedidoCriado.pagamento?.metodo==='boleto'">{{ t('Boleto Gerado') }}</template>
                <template v-else>{{ t('Pedido Recebido') }}</template>
              </h2>

              <!-- E-MAIL STATUS -->
              <transition name="msg-fade">
                <div v-if="emailStatus !== 'idle'" :class="['co-email-status', `co-email-status--${emailStatus}`]">
                  <span v-if="emailStatus === 'sending'" class="co-spin co-spin--sm"></span>
                  <svg v-else-if="emailStatus === 'sent'" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <svg v-else width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
                  <span>{{ emailStatusMsg }}</span>
                </div>
              </transition>

              <p class="co-ped-id">
                {{ t('Pedido') }} <strong>#{{ idPedidoFormatado }}</strong>
              </p>

              <!-- ══ COMPROVANTE ══ -->
              <div class="co-comprovante" ref="comprovanteRef">
                <div class="co-comprovante__header">
                  <div class="co-comprovante__marca">
                    <span class="co-comprovante__marca-ico" aria-hidden="true">⊕</span>
                    <span class="co-comprovante__marca-txt">Noir<em>&amp;</em>Or</span>
                  </div>
                  <div class="co-comprovante__meta">
                    <span class="co-comprovante__data">{{ fmtDateLong(pedidoCriado.criadoEm) }}</span>
                    <span class="co-comprovante__id">#{{ idPedidoFormatado }}</span>
                  </div>
                </div>

                <div class="co-comprovante__divider" aria-hidden="true">
                  <span></span><span class="co-comprovante__gem">◆</span><span></span>
                </div>

                <div class="co-comprovante__section">
                  <p class="co-comprovante__section-title">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    {{ t('Comprador') }}
                  </p>
                  <div class="co-comprovante__row"><span>{{ t('Nome') }}</span><span>{{ pedidoCriado.cliente?.nome }}</span></div>
                  <div class="co-comprovante__row"><span>CPF</span><span>{{ maskCPFDisplay(pedidoCriado.cliente?.cpf) }}</span></div>
                  <div class="co-comprovante__row"><span>{{ t('E-mail') }}</span><span>{{ maskEmailDisplay(pedidoCriado.cliente?.email) }}</span></div>
                  <div class="co-comprovante__row"><span>{{ t('Telefone') }}</span><span>{{ pedidoCriado.cliente?.telefone }}</span></div>
                </div>

                <div class="co-comprovante__section">
                  <p class="co-comprovante__section-title">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    {{ t('Entrega') }}
                  </p>
                  <div class="co-comprovante__row"><span>{{ t('Endereço') }}</span><span>{{ pedidoCriado.entrega?.endereco }}</span></div>
                  <div class="co-comprovante__row"><span>{{ t('Cidade') }}</span><span>{{ pedidoCriado.entrega?.cidade }} — CEP {{ pedidoCriado.entrega?.cep }}</span></div>
                </div>

                <div class="co-comprovante__section">
                  <p class="co-comprovante__section-title">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/></svg>
                    {{ t('Itens do Pedido') }}
                  </p>
                  <div v-for="item in (pedidoCriado.itens||[])" :key="item._id||item.id" class="co-comprovante__item">
                    <div class="co-comprovante__item-info">
  <span class="co-comprovante__item-nome">{{ item.nome||item.produto?.nome }}</span>
  <div v-if="item.corNome || item.storage" style="display:flex;align-items:center;gap:4px;margin-top:2px;">
    <span v-if="item.corHex" :style="`width:8px;height:8px;border-radius:50%;background:${item.corHex};display:inline-block;border:0.5px solid rgba(200,168,75,0.2);flex-shrink:0`"></span>
    <span style="font-family:'DM Mono',monospace;font-size:9px;color:rgba(200,168,75,0.4);letter-spacing:.08em;">{{ [item.corNome, item.storage].filter(Boolean).join(' · ') }}</span>
  </div>
  <span class="co-comprovante__item-qty">{{ t('Qtd') }}: {{ item.qty||item.quantidade||1 }}</span>
</div>
                    <span class="co-comprovante__item-val">R$ {{ fmt((item.preco||item.produto?.preco||0)*(item.qty||1)) }}</span>
                  </div>
                </div>

                <div class="co-comprovante__totais">
                  <div class="co-comprovante__row"><span>{{ t('Subtotal') }}</span><span>R$ {{ fmt(subtotal) }}</span></div>
                  <div v-if="descontoValor>0" class="co-comprovante__row co-comprovante__row--desc"><span>{{ t('Desconto') }}</span><span>−R$ {{ fmt(descontoValor) }}</span></div>
                  <div class="co-comprovante__row"><span>{{ t('Frete') }}</span><span>{{ freteValor===0 ? t('GRÁTIS') : 'R$ '+fmt(freteValor) }}</span></div>
                  <div class="co-comprovante__row co-comprovante__row--total"><span>TOTAL</span><span>R$ {{ fmt(totalFinal) }}</span></div>
                  <div v-if="pedidoCriado.pagamento?.parcelas>1" class="co-comprovante__row co-comprovante__row--parc">
                    <span>{{ t('Parcelamento') }}</span>
                    <span>{{ pedidoCriado.pagamento.parcelas }}x de R$ {{ fmt(totalFinal/pedidoCriado.pagamento.parcelas) }}</span>
                  </div>
                </div>

                <div class="co-comprovante__section">
                  <p class="co-comprovante__section-title">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                    {{ t('Pagamento') }}
                  </p>
                  <div class="co-comprovante__row"><span>{{ t('Método') }}</span><span>{{ (pedidoCriado.pagamento?.metodo||'').toUpperCase() }}</span></div>
                  <div class="co-comprovante__row"><span>{{ t('Status') }}</span>
                    <span :class="['co-comprovante__status', `co-comprovante__status--${pedidoCriado.status}`]">{{ statusLabel(pedidoCriado.status) }}</span>
                  </div>
                  <div v-if="pedidoCriado.pagamento?.bandeira" class="co-comprovante__row"><span>{{ t('Bandeira') }}</span><span>{{ pedidoCriado.pagamento.bandeira.toUpperCase() }}</span></div>
                  <div class="co-comprovante__row"><span>{{ t('Processado por') }}</span><span>Mercado Pago</span></div>
                </div>

                <!-- QR CODE PIX -->
                <div v-if="pedidoCriado.pagamento?.metodo==='pix' && pedidoCriado.status!=='aprovado'" class="co-pix-box">
                  <p class="co-pix-box__titulo">{{ t('QR Code para pagamento') }}</p>
                  <div class="co-qr-wrap">
                    <img v-if="pedidoCriado.pagamento.pixQrImage" :src="`data:image/png;base64,${pedidoCriado.pagamento.pixQrImage}`" alt="QR Code Pix" class="co-qr-img"/>
                    <canvas v-else ref="qrCanvasRef" class="co-qr-canvas" aria-label="QR Code Pix"></canvas>
                  </div>
                  <div class="co-pix-timer" :class="{ 'co-pix-timer--urgente': pixTimerSecs <= 300 }">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    {{ t('Expira em') }} <strong>{{ pixTimerFmt }}</strong>
                  </div>
                  <div v-if="pedidoCriado.pagamento.pixCopia" class="co-pix-copia">
                    <p class="co-pix-copia__label">{{ t('Pix Copia e Cola') }}</p>
                    <div class="co-pix-copia__row">
                      <input readonly :value="pedidoCriado.pagamento.pixCopia" class="co-pix-copia__input" @click="e=>e.target.select()"/>
                      <button class="co-copiar" @click="copiarTexto(pedidoCriado.pagamento.pixCopia, 'pix')">
                        <svg v-if="copiado==='pix'" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
                        <span v-else>{{ t('Copiar') }}</span>
                      </button>
                    </div>
                  </div>
                  <p class="co-pix-aviso">{{ t('Após o pagamento, a confirmação é automática em segundos.') }}</p>
                  <button v-if="isDev" class="co-btn-simular" @click="simularPagamento">🧪 {{ t('Simular Pagamento') }}</button>
                </div>

                <!-- BOLETO -->
                <div v-if="pedidoCriado.pagamento?.metodo==='boleto' && pedidoCriado.status!=='aprovado'" class="co-pix-box">
                  <p class="co-pix-box__titulo">{{ t('Linha Digitável do Boleto') }}</p>
                  <div class="co-pix-copia__row">
                    <input readonly :value="pedidoCriado.pagamento.boleto" class="co-pix-copia__input"/>
                    <button class="co-copiar" @click="copiarTexto(pedidoCriado.pagamento.boleto, 'boleto')">
                      <svg v-if="copiado==='boleto'" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
                      <span v-else>{{ t('Copiar') }}</span>
                    </button>
                  </div>
                  <a v-if="pedidoCriado.pagamento.boletoUrl" :href="pedidoCriado.pagamento.boletoUrl" target="_blank" rel="noopener noreferrer" class="btn-gold btn-full" style="margin-top:10px;text-decoration:none;display:flex;align-items:center;justify-content:center;gap:8px">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    {{ t('Ver Boleto') }}
                  </a>
                  <p class="co-pix-aviso">{{ t('Vencimento em 3 dias úteis. Pague em qualquer banco ou app.') }}</p>
                  <button v-if="isDev" class="co-btn-simular" @click="simularPagamento">🧪 {{ t('Simular Pagamento') }}</button>
                </div>

                <!-- APROVADO INFO -->
                <div v-if="pedidoCriado.status==='aprovado'" class="co-aprovado">
                  <div class="co-aprovado__linha">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    {{ t('Confirmação enviada para') }} <strong>{{ maskEmailDisplay(pedidoCriado.cliente?.email) }}</strong>
                  </div>
                  <div class="co-aprovado__linha">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                    {{ t('Prazo de entrega: 5 a 10 dias úteis') }}
                  </div>
                </div>

                <!-- NOTA FISCAL SIMULADA -->
                <div class="co-nf">
                  <div class="co-nf__header">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                    <span>{{ t('DANFE — Documento Auxiliar de Nota Fiscal') }}</span>
                    <span class="co-nf__sim">{{ t('(Simulada — TCC)') }}</span>
                  </div>
                  <div class="co-nf__body">
                    <div class="co-nf__row"><span>{{ t('Série') }}</span><span>001</span></div>
                    <div class="co-nf__row"><span>{{ t('Número NF') }}</span><span>{{ nfNumero }}</span></div>
                    <div class="co-nf__row"><span>{{ t('Chave de acesso') }}</span><span class="co-nf__chave">{{ nfChave }}</span></div>
                    <div class="co-nf__row"><span>{{ t('Data emissão') }}</span><span>{{ fmtDateLong(pedidoCriado.criadoEm) }}</span></div>
                    <div class="co-nf__row"><span>CNPJ {{ t('Emitente') }}</span><span>00.000.000/0001-00</span></div>
                    <div class="co-nf__row"><span>{{ t('Emitente') }}</span><span>NOIR & OR ATELIER LTDA</span></div>
                    <div class="co-nf__row"><span>{{ t('Total NF') }}</span><span>R$ {{ fmt(totalFinal) }}</span></div>
                  </div>
                  <button class="co-nf__btn" @click="baixarNF">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                    {{ t('Baixar Nota Fiscal (HTML)') }}
                  </button>
                </div>

                <div class="co-comprovante__hash">
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  <span>{{ t('Verificação') }}: {{ hashVerificacao }}</span>
                </div>

                <div class="co-comprovante__footer">
                  <span>NOIR &amp; OR · ATELIER</span>
                  <span>◆</span>
                  <span>{{ t('Compra segura via Mercado Pago') }}</span>
                  <span>◆</span>
                  <span>noiror.com.br</span>
                </div>
              </div>

              <div class="co-comprovante__acoes">
                <button class="btn-ghost" @click="imprimirComprovante">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
                  {{ t('Imprimir') }}
                </button>
                <button class="btn-ghost" @click="baixarComprovante">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  {{ t('Baixar Comprovante') }}
                </button>
                <button class="btn-gold" @click="fecharELimpar">{{ t('Concluir') }}</button>
              </div>

            </section>
            </transition>

          </main>

          <!-- ══ ASIDE RESUMO ══ -->
          <aside class="co-aside" v-if="etapa < 5" aria-label="Resumo do pedido">
            <h3 class="co-aside__titulo">
              <span aria-hidden="true">◆</span>
              {{ t('Resumo') }}
            </h3>
            <div class="co-aside__itens">
              <div v-for="item in itens" :key="item._id||item.id" class="co-aside__item">
                <div class="co-aside__item-img">
                  <img :src="item.imagem" :alt="item.nome" loading="lazy" @error="e=>e.target.style.opacity='0'"/>
                  <span class="co-aside__item-qty">{{ item.qty }}</span>
                </div>
                <div>
  <p class="co-aside__item-nome">{{ item.nome }}</p>
  <div v-if="item.corNome || item.storage" style="display:flex;align-items:center;gap:5px;margin-top:2px;">
    <span v-if="item.corHex" :style="`width:8px;height:8px;border-radius:50%;background:${item.corHex};display:inline-block;border:0.5px solid rgba(200,168,75,0.2);flex-shrink:0`"></span>
    <span style="font-size:9px;color:rgba(245,240,232,0.3);font-family:'DM Mono',monospace;">{{ [item.corNome, item.storage].filter(Boolean).join(' · ') }}</span>
  </div>
  <p class="co-aside__item-preco">R$ {{ fmt(item.preco * item.qty) }}</p>
</div>
              </div>
            </div>
            <div class="co-aside__totais">
              <div class="co-aside__linha"><span>{{ t('Subtotal') }}</span><span>R$ {{ fmt(subtotal) }}</span></div>
              <transition name="msg-fade">
                <div v-if="descontoValor>0" class="co-aside__linha co-aside__linha--desc">
                  <span>{{ t('Desconto') }} <em>{{ cupomCodigo }}</em></span>
                  <span>−R$ {{ fmt(descontoValor) }}</span>
                </div>
              </transition>
              <div class="co-aside__linha" :class="{ 'co-aside__linha--gratis': freteValor===0 && freteEscolhido }">
                <span>{{ t('Frete') }}</span>
                <span>{{ !freteEscolhido ? '—' : freteValor===0 ? t('GRÁTIS') : 'R$ '+fmt(freteValor) }}</span>
              </div>
              <div class="co-aside__total">
                <span>TOTAL</span>
                <span>R$ {{ fmt(totalFinal) }}</span>
              </div>
              <div v-if="metodo==='cartao' && cartao.parcelas>1" class="co-aside__parcela">
                {{ cartao.parcelas }}x de R$ {{ fmt(totalFinal/cartao.parcelas) }}
              </div>
            </div>
            <div class="co-aside__kanji" aria-hidden="true">
              <span>誠</span><span>信</span>
            </div>
            <p class="co-aside__kanji-leg">SINCERIDADE · CONFIANÇA</p>
            <div class="co-aside__ssl">
              <span class="co-aside__ssl-dot"></span>
              {{ t('Pagamento 100% seguro via Mercado Pago') }}
            </div>
          </aside>

        </div>

        <!-- ══ MOBILE FOOTER ══ -->
        <div class="co-mobile-footer" v-if="etapa < 5 && itens.length">
          <div>
            <span class="co-mobile-footer__lbl">TOTAL</span>
            <span class="co-mobile-footer__val">R$ {{ fmt(totalFinal) }}</span>
          </div>
          <button class="btn-gold" @click="acaoMobile" :disabled="salvando || cpfStatus === 'loading'">
            <span v-if="!salvando && cpfStatus !== 'loading'">{{ labelMobile }}</span>
            <span v-else class="co-spin co-spin--sm"></span>
          </button>
        </div>

      </div>
    </div>
  </teleport>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import QRCode from 'qrcode'
import api from '@/api.js'
import { useAuthStore } from '@/stores/auth.js'

const auth = useAuthStore()

// ─────────────────────────────────────────────────────────────────────────────
// ── CONFIGURAÇÃO — altere aqui os valores do seu projeto ─────────────────────
// ─────────────────────────────────────────────────────────────────────────────

// Nome e dados da loja (aparece no comprovante e NF)
const LOJA = {
  nome:     'NOIR & OR ATELIER LTDA',  // ← altere
  cnpj:     '00.000.000/0001-00',       // ← altere
  site:     'noiror.com.br',            // ← altere
  email:    'contato@noiror.com.br',    // ← altere
  telefone: '(11) 99999-9999',          // ← altere
}

// Modo desenvolvimento — controla o botão "Simular Pagamento"
// Em produção, defina como: const isDev = import.meta.env.DEV
const isDev = ref(true) // ← mude para false em produção

// Número máximo de parcelas no crédito
const MAX_PARCELAS = 12 // ← altere conforme sua necessidade

// Parcelamento sem juros até esta parcela; acima disso, aplique juros se quiser
const PARCELAS_SEM_JUROS = 12 // ← altere

// Valor mínimo de pedido para frete grátis (0 = nunca grátis automaticamente)
const FRETE_GRATIS_ACIMA_DE = 300 // ← altere em R$

// Cupons válidos (para TCC sem backend de cupom — simulado no frontend)
// Em produção, remova isso e valide no backend via /cupom/validar
const CUPONS_VALIDOS = {
  'NOIR10':  { desconto: 0.10, tipo: 'percent', msg: '10% de desconto aplicado!' },
  'TCC2025': { desconto: 50,   tipo: 'fixed',   msg: 'R$ 50 de desconto aplicado!' },
  'FRETEGRATIS': { desconto: 0, tipo: 'frete',  msg: 'Frete grátis aplicado!' },
} // ← adicione/remova cupons aqui

// Resend API Key — e-mail de confirmação (https://resend.com — gratuito até 3k/mês)
// IMPORTANTE: em produção mova para variável de ambiente no BACKEND, nunca no frontend
// Para TCC com backend: process.env.RESEND_API_KEY
const RESEND_API_KEY = 're_XXXXXXXXXXXXXXXX' // ← substitua pela sua chave

// Endereço de e-mail remetente (deve estar verificado no Resend)
const EMAIL_FROM = 'noreply@noiror.com.br' // ← altere

// ─────────────────────────────────────────────────────────────────────────────
// ── FIM DA CONFIGURAÇÃO ───────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────

// ─── i18n ──────────────────────────────────────────────────────────────────
const locale = ref(localStorage.getItem('noir_locale') || 'pt-BR')
const salvarLocale = () => localStorage.setItem('noir_locale', locale.value)

const TRAD = {
  'pt-BR': {},
  'en-US': {
    'Meu Carrinho':'My Cart','item':'item','itens':'items',
    'Carrinho vazio':'Empty cart','Explorar Coleção':'Explore Collection',
    'Código de cupom':'Coupon code','Aplicar':'Apply','Remover':'Remove',
    'Continuar para Dados':'Continue to Details','Verificação de identidade':'Identity verification',
    'CPF e nome validados em tempo real para sua segurança':'CPF and name validated in real time for your security',
    'Como no documento':'As on your ID','Nome completo':'Full name',
    'E-mail':'Email','Telefone':'Phone','preenchido':'filled','Voltar':'Back',
    'Continuar para Entrega':'Continue to Delivery','Entrega':'Delivery',
    'Estado':'State','Endereço':'Address','Rua, número, complemento':'Street, number, complement',
    'Cidade':'City','Bairro':'Neighborhood','Sua cidade':'Your city','Seu bairro':'Your neighborhood',
    'Opções de frete':'Shipping options',
    'Frete VIP: entrega especial para este endereço':'VIP Shipping: special delivery for this address',
    'Continuar para Pagamento':'Continue to Payment','Pagamento':'Payment',
    'Cartão':'Card','Pagamento via Pix':'Pix Payment',
    'QR Code gerado pelo Mercado Pago após confirmar o pedido':'QR Code generated by Mercado Pago after order confirmation',
    'Aprovação imediata':'Immediate approval','100% seguro e criptografado':'100% secure and encrypted',
    'Disponível 24 horas':'Available 24 hours','Titular':'Holder','Validade':'Expiry',
    'Bandeira':'Card Brand','Tipo de cartão':'Card Type','Crédito':'Credit','Débito':'Debit',
    'Número do cartão':'Card number','Como impresso no cartão':'As printed on card',
    'Nome no cartão':'Name on card','Parcelamento':'Installments','Número válido':'Valid number',
    '(à vista)':'(in full)','sem juros':'no interest',
    'Débito disponível apenas à vista':'Debit available at full amount only',
    'Boleto Bancário':'Bank Slip','Gerado via Mercado Pago. Vence em 3 dias úteis.':'Generated via Mercado Pago. Expires in 3 business days.',
    'Sem taxa extra':'No extra fee','Pague em qualquer banco':'Pay at any bank',
    'Aprovação em até 3 dias':'Approval up to 3 days',
    'Análise antifraude automática aplicada':'Automatic fraud analysis applied',
    'Mercado Pago':'Mercado Pago','Compra garantida':'Purchase guaranteed',
    'Finalizar Pedido':'Place Order','Pedido Aprovado':'Order Approved',
    'Aguardando Pagamento Pix':'Waiting Pix Payment','Boleto Gerado':'Bank Slip Generated',
    'Pedido Recebido':'Order Received','Pedido':'Order','Comprador':'Buyer','Nome':'Name',
    'Itens do Pedido':'Order Items','Qtd':'Qty','Subtotal':'Subtotal','Desconto':'Discount',
    'Frete':'Shipping','GRÁTIS':'FREE','Método':'Method','Status':'Status',
    'Processado por':'Processed by','QR Code para pagamento':'QR Code for payment',
    'Expira em':'Expires in','Pix Copia e Cola':'Pix Copy & Paste','Copiar':'Copy',
    'Após o pagamento, a confirmação é automática em segundos.':'After payment, confirmation is automatic in seconds.',
    'Simular Pagamento':'Simulate Payment','Linha Digitável do Boleto':'Bank Slip Code',
    'Ver Boleto':'View Bank Slip',
    'Vencimento em 3 dias úteis. Pague em qualquer banco ou app.':'Due in 3 business days. Pay at any bank or app.',
    'Confirmação enviada para':'Confirmation sent to',
    'Prazo de entrega: 5 a 10 dias úteis':'Delivery: 5 to 10 business days',
    'DANFE — Documento Auxiliar de Nota Fiscal':'DANFE — Invoice Auxiliary Document',
    '(Simulada — TCC)':'(Simulated — Academic)',
    'Série':'Series','Número NF':'Invoice No.','Chave de acesso':'Access key',
    'Data emissão':'Issue date','Emitente':'Issuer','Total NF':'Invoice total',
    'Baixar Nota Fiscal (HTML)':'Download Invoice (HTML)',
    'Verificação':'Verification','Compra segura via Mercado Pago':'Secure purchase via Mercado Pago',
    'Imprimir':'Print','Baixar Comprovante':'Download Receipt','Concluir':'Finish',
    'Resumo':'Summary','Pagamento 100% seguro via Mercado Pago':'100% secure payment via Mercado Pago',
  }
}
const t = (key) => (locale.value === 'en-US' && TRAD['en-US'][key]) ? TRAD['en-US'][key] : key

// ─── Constantes ─────────────────────────────────────────────────────────────
const ETAPAS = [
  { id: 'carrinho',    label: 'Carrinho'    },
  { id: 'dados',       label: 'Dados'       },
  { id: 'entrega',     label: 'Entrega'     },
  { id: 'pagamento',   label: 'Pagamento'   },
  { id: 'confirmacao', label: 'Confirmação' },
]

const BANDEIRAS = [
  { id: 'visa',       nome: 'Visa',       regex: /^4/ },
  { id: 'mastercard', nome: 'Mastercard', regex: /^5[1-5]/ },
  { id: 'amex',       nome: 'Amex',       regex: /^3[47]/ },
  { id: 'elo',        nome: 'Elo',        regex: /^(4011|4312|4514|5046|5067|6277|6362|6504|6509)/ },
  { id: 'hipercard',  nome: 'Hipercard',  regex: /^(6062|3841)/ },
]

// ─── State ──────────────────────────────────────────────────────────────────
const aberto         = ref(false)
const etapa          = ref(1)
const salvando       = ref(false)
const erroForm       = ref('')
const itens          = ref([])
const pedidoCriado   = ref(null)
const copiado        = ref('')
const modalRef       = ref(null)
const comprovanteRef = ref(null)
const qrCanvasRef    = ref(null)

// Cupom
const cupomCodigo    = ref('')
const cupomAplicado  = ref(false)
const cupomMsg       = ref('')
const salvandoCupom  = ref(false)
const descontoValor  = ref(0)
const freteGratisPosCupom = ref(false)

// Frete
const opcoesEntrega  = ref([])
const freteEscolhido = ref('')
const freteValor     = ref(0)
const buscandoCEP    = ref(false)

// Pagamento
const metodo         = ref('pix')
const cartaoVirado   = ref(false)
const bandeiraCartao = ref('visa')
const tipoCartao     = ref('credito')

// Validação CPF
const cpfStatus      = ref('idle') // idle | loading | ok | error
const cpfStatusMsg   = ref('')

// E-mail
const emailStatus    = ref('idle') // idle | sending | sent | error
const emailStatusMsg = ref('')

// PIX Timer
const pixTimerSecs = ref(1800)
let pixTimerInt = null
const pixTimerFmt = computed(() => {
  const m = Math.floor(pixTimerSecs.value / 60)
  const s = pixTimerSecs.value % 60
  return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`
})

// Nota Fiscal
const nfNumero = ref('')
const nfChave  = ref('')

const erros = ref({
  nome:'', email:'', cpf:'', telefone:'',
  cep:'', endereco:'',
  cartaoNum:'', cartaoVal:''
})

const cliente = ref({ nome:'', email:'', cpf:'', telefone:'' })
const entrega = ref({ cep:'', endereco:'', cidade:'', estado:'', bairro:'' })
const cartao  = ref({ numero:'', nome:'', validade:'', cvv:'', parcelas:1 })
const localizacao = ref({ lat: null, lng: null })

// ─── Computed ────────────────────────────────────────────────────────────────
const subtotal   = computed(() => itens.value.reduce((s,i) => s + i.preco*i.qty, 0))
const totalFinal = computed(() => Math.max(0, subtotal.value - descontoValor.value + freteValor.value))

const progressoPct = computed(() => ((etapa.value-1) / (ETAPAS.length-1)) * 100)

const parcelasDisp = computed(() =>
  Array.from({ length: tipoCartao.value==='debito' ? 1 : MAX_PARCELAS }, (_,i) => ({
    n: i+1,
    val: Math.ceil(totalFinal.value / (i+1))
  }))
)

const completudePct = computed(() => {
  const campos = [
    cliente.value.nome.trim().split(' ').length >= 2,
    validarCPF(cliente.value.cpf),
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cliente.value.email),
    cliente.value.telefone.replace(/\D/g,'').length >= 10,
  ]
  return Math.round((campos.filter(Boolean).length / campos.length) * 100)
})

const idPedidoFormatado = computed(() =>
  pedidoCriado.value ? (pedidoCriado.value.numero || (pedidoCriado.value._id||'').slice(-8).toUpperCase()) : ''
)

const hashVerificacao = computed(() => {
  if (!pedidoCriado.value) return ''
  const str = `${pedidoCriado.value._id}${pedidoCriado.value.criadoEm}${totalFinal.value}`
  return btoa(str).slice(0,16).toUpperCase()
})

const labelMobile = computed(() => {
  const map = { 1:'CONTINUAR', 2:'CONTINUAR', 3:'CONTINUAR', 4:'FINALIZAR' }
  return map[etapa.value] || ''
})

// Validação Luhn para cartão
const luhnValido = computed(() => {
  const num = cartao.value.numero.replace(/\s/g,'')
  if (num.length < 16) return false
  let sum = 0
  let alt = false
  for (let i = num.length - 1; i >= 0; i--) {
    let n = parseInt(num.charAt(i), 10)
    if (alt) { n *= 2; if (n > 9) n -= 9 }
    sum += n
    alt = !alt
  }
  return sum % 10 === 0
})

// ─── Watchers ────────────────────────────────────────────────────────────────
watch(freteEscolhido, (cod) => {
  if (freteGratisPosCupom.value) { freteValor.value = 0; return }
  const op = opcoesEntrega.value.find(o => o.codigo === cod)
  freteValor.value = op ? op.valor : 0
})

watch(metodo, (v) => {
  try { localStorage.setItem('no_metodo_pag', v) } catch {}
})

watch(() => pedidoCriado.value?.status, (status) => {
  if (status === 'aprovado') clearInterval(pixTimerInt)
})

// Frete grátis automático acima do valor configurado
watch(subtotal, (val) => {
  if (FRETE_GRATIS_ACIMA_DE > 0 && val >= FRETE_GRATIS_ACIMA_DE) {
    freteValor.value = 0
  }
})

// ─── Helpers ─────────────────────────────────────────────────────────────────
const fmt = (v) => (v||0).toLocaleString('pt-BR', { minimumFractionDigits:2 })

const fmtDateLong = (d) => {
  if (!d) return ''
  return new Date(d).toLocaleDateString('pt-BR', {
    weekday:'long', day:'2-digit', month:'long', year:'numeric',
    hour:'2-digit', minute:'2-digit'
  })
}

const statusLabel = (s) => ({
  pendente:'Pendente', aprovado:'Aprovado', enviado:'Enviado',
  entregue:'Entregue', cancelado:'Cancelado'
})[s] || s

const maskCPFDisplay = (cpf) => {
  if (!cpf) return ''
  return cpf.replace(/(\d{3})\.\d{3}\.\d{3}-(\d{2})/, '$1.***.***-$2')
}

const maskEmailDisplay = (email) => {
  if (!email) return ''
  const [u,d] = email.split('@')
  return `${u.slice(0,2)}***@${d}`
}

const campoClass = (campo) => ({
  'co-campo--err': erros.value[campo],
  'co-campo--ok': !erros.value[campo] && (
    campo==='nome'      ? cliente.value.nome.trim().split(' ').length >= 2 :
    campo==='cpf'       ? cpfStatus.value === 'ok' :
    campo==='email'     ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cliente.value.email) :
    campo==='telefone'  ? cliente.value.telefone.replace(/\D/g,'').length >= 10 :
    campo==='cep'       ? entrega.value.cep.length === 9 :
    campo==='endereco'  ? !!entrega.value.endereco.trim() :
    campo==='cartaoNum' ? luhnValido.value :
    campo==='cartaoVal' ? cartao.value.validade.length === 5 :
    false
  )
})

// ─── Validação CPF (algoritmo real) ──────────────────────────────────────────
const validarCPF = (cpf) => {
  const n = cpf.replace(/\D/g,'')
  if (n.length !== 11 || /^(\d)\1{10}$/.test(n)) return false
  let sum = 0, rest
  for (let i=1; i<=9; i++) sum += parseInt(n.substring(i-1,i)) * (11-i)
  rest = (sum*10)%11
  if (rest===10||rest===11) rest=0
  if (rest !== parseInt(n.substring(9,10))) return false
  sum=0
  for (let i=1; i<=10; i++) sum += parseInt(n.substring(i-1,i)) * (12-i)
  rest = (sum*10)%11
  if (rest===10||rest===11) rest=0
  return rest === parseInt(n.substring(10,11))
}

// ─── Validação CPF completa (algoritmo + simulação nome/existência) ──────────
const validarCPFCompleto = async () => {
  const cpf = cliente.value.cpf
  if (cpf.length < 14) return

  if (!validarCPF(cpf)) {
    erros.value.cpf = 'CPF inválido. Verifique os dígitos.'
    cpfStatus.value = 'error'
    cpfStatusMsg.value = 'CPF não encontrado na base da Receita Federal.'
    return
  }

  cpfStatus.value = 'loading'
  cpfStatusMsg.value = 'Consultando Receita Federal...'
  erros.value.cpf = ''

  try {
    // ── OPÇÃO A: Se você tem backend, descomente e use sua rota: ──
    // const { data } = await api.post('/validar-cpf', {
    //   cpf: cpf.replace(/\D/g,''),
    //   nome: cliente.value.nome.trim()
    // })
    // if (!data.ok) throw new Error(data.msg)

    // ── OPÇÃO B: Simulação realista para TCC (sem backend) ──
    // Simula delay de API real
    await new Promise(r => setTimeout(r, 1200))

    // CPFs de teste que sempre falham (para demo)
    const CPF_BLOQUEADOS = ['000.000.000-00', '111.111.111-11', '999.999.999-99']
    if (CPF_BLOQUEADOS.includes(cpf)) {
      throw new Error('CPF não localizado na base de dados da Receita Federal.')
    }

    // Verifica se nome tem pelo menos 2 palavras (simula validação de nome)
    const nomePartes = cliente.value.nome.trim().split(/\s+/)
    if (nomePartes.length < 2) {
      throw new Error('O nome informado não confere com o titular do CPF.')
    }

    // Aprovado
    cpfStatus.value  = 'ok'
    cpfStatusMsg.value = `CPF ${cpf} validado — titular identificado.`
    erros.value.cpf  = ''

  } catch (e) {
    cpfStatus.value  = 'error'
    cpfStatusMsg.value = e.message || 'Erro ao validar CPF. Tente novamente.'
    erros.value.cpf  = cpfStatusMsg.value
  }
}

// ─── Validação nome (aciona re-checagem de CPF se CPF já preenchido) ─────────
const validarCampoNome = async () => {
  const nome = cliente.value.nome.trim()
  if (nome.split(/\s+/).length < 2) {
    erros.value.nome = 'Informe nome e sobrenome.'
    return
  }
  if (/[0-9]/.test(nome)) {
    erros.value.nome = 'Nome não pode conter números.'
    return
  }
  erros.value.nome = ''
  // Re-valida CPF se já preenchido
  if (cliente.value.cpf.length === 14 && cpfStatus.value !== 'idle') {
    await validarCPFCompleto()
  }
}

const limparErro = (campo) => { erros.value[campo] = '' }

const validarCampo = (campo) => {
  switch (campo) {
    case 'nome':
      erros.value.nome = cliente.value.nome.trim().split(/\s+/).length < 2 ? 'Informe nome e sobrenome.' : ''
      break
    case 'email':
      erros.value.email = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cliente.value.email) ? 'E-mail inválido.' : ''
      break
    case 'cpf':
      if (!validarCPF(cliente.value.cpf)) erros.value.cpf = 'CPF inválido.'
      break
    case 'telefone':
      erros.value.telefone = cliente.value.telefone.replace(/\D/g,'').length < 10 ? 'Telefone inválido.' : ''
      break
    case 'cep':
      erros.value.cep = entrega.value.cep.length < 9 ? 'CEP inválido.' : ''
      break
    case 'endereco':
      erros.value.endereco = !entrega.value.endereco.trim() ? 'Endereço obrigatório.' : ''
      break
    case 'cartaoNum':
      erros.value.cartaoNum = !luhnValido.value ? 'Número de cartão inválido.' : ''
      break
    case 'cartaoVal': {
      const [mm,aa] = cartao.value.validade.split('/')
      const agora = new Date()
      const ano4 = 2000 + parseInt(aa||'0')
      const expirado = aa && mm && (ano4 < agora.getFullYear() || (ano4===agora.getFullYear() && parseInt(mm) < agora.getMonth()+1))
      erros.value.cartaoVal = cartao.value.validade.length < 5 ? 'Validade inválida.' : expirado ? 'Cartão expirado.' : ''
      break
    }
  }
}

// ─── Máscaras ─────────────────────────────────────────────────────────────────
const maskCPF = () => {
  let v = cliente.value.cpf.replace(/\D/g,'').slice(0,11)
  v = v.replace(/(\d{3})(\d)/,'$1.$2').replace(/(\d{3})(\d)/,'$1.$2').replace(/(\d{3})(\d{1,2})$/,'$1-$2')
  cliente.value.cpf = v
  // Reset status ao editar
  if (cpfStatus.value !== 'idle') { cpfStatus.value = 'idle'; cpfStatusMsg.value = '' }
}

const maskCEP = () => {
  let v = entrega.value.cep.replace(/\D/g,'').slice(0,8)
  if (v.length > 5) v = v.replace(/(\d{5})(\d)/,'$1-$2')
  entrega.value.cep = v
}

const maskCartao = () => {
  let v = cartao.value.numero.replace(/\D/g,'').slice(0,16)
  v = v.replace(/(\d{4})/g,'$1 ').trim()
  cartao.value.numero = v
  const clean = v.replace(/\s/g,'')
  const b = BANDEIRAS.find(b => b.regex.test(clean))
  if (b) bandeiraCartao.value = b.id
}

const maskValidade = () => {
  let v = cartao.value.validade.replace(/\D/g,'').slice(0,4)
  if (v.length > 2) v = v.replace(/(\d{2})(\d)/,'$1/$2')
  cartao.value.validade = v
}

const maskTel = () => {
  let v = cliente.value.telefone.replace(/\D/g,'').slice(0,11)
  if (v.length > 10) v = v.replace(/(\d{2})(\d{5})(\d{4})/,'($1) $2-$3')
  else if (v.length > 6) v = v.replace(/(\d{2})(\d{4})(\d)/,'($1) $2-$3')
  else if (v.length > 2) v = v.replace(/(\d{2})(\d)/,'($1) $2')
  cliente.value.telefone = v
}

// ─── CEP / Frete ──────────────────────────────────────────────────────────────
const buscarCEP = async () => {
  const cep = entrega.value.cep.replace(/\D/g,'')
  if (cep.length !== 8) return
  buscandoCEP.value = true
  erros.value.cep = ''
  try {
    const r = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    const d = await r.json()
    if (d.erro) { erros.value.cep = 'CEP não encontrado.'; return }
    entrega.value.endereco = `${d.logradouro}${d.bairro ? ', '+d.bairro : ''}`
    entrega.value.cidade   = d.localidade
    entrega.value.estado   = d.uf
    entrega.value.bairro   = d.bairro
    await calcularFrete(cep)
  } catch {
    erros.value.cep = 'Erro ao buscar CEP. Verifique sua conexão.'
  } finally {
    buscandoCEP.value = false
  }
}

const calcularFrete = async (cep) => {
  // Frete grátis automático
  if (FRETE_GRATIS_ACIMA_DE > 0 && subtotal.value >= FRETE_GRATIS_ACIMA_DE) {
    opcoesEntrega.value = [
      { codigo: 'gratis', nome: 'Frete Grátis', prazo: '5 a 10 dias úteis', valor: 0 }
    ]
    freteEscolhido.value = 'gratis'
    freteValor.value = 0
    return
  }

  try {
    const { data } = await api.post('/frete/calcular', {
      cep,
      itens: itens.value.map(i => ({ produto: i._id||i.id, qty: i.qty }))
    })
    if (data.opcoes?.length) {
      opcoesEntrega.value  = data.opcoes
      freteEscolhido.value = data.opcoes[0].codigo
    }
  } catch {
    // Fallback para TCC sem backend de frete
    opcoesEntrega.value = [
      { codigo: 'pac',      nome: 'PAC — Correios',       prazo: '7 a 12 dias úteis', valor: 18.90 },
      { codigo: 'sedex',    nome: 'SEDEX — Correios',     prazo: '2 a 4 dias úteis',  valor: 34.50 },
      { codigo: 'expresso', nome: 'Expresso Premium',     prazo: '1 a 2 dias úteis',  valor: 55.00 },
    ]
    freteEscolhido.value = 'pac'
  }
}

// ─── Cupom ────────────────────────────────────────────────────────────────────
const aplicarCupom = async () => {
  if (!cupomCodigo.value.trim()) return
  salvandoCupom.value = true
  cupomMsg.value = ''

  try {
    // ── Tenta backend primeiro ──
    const { data } = await api.post('/cupom/validar', {
      codigo: cupomCodigo.value.trim().toUpperCase()
    })
    descontoValor.value      = data.desconto || 0
    freteGratisPosCupom.value = data.freteGratis || false
    if (freteGratisPosCupom.value) freteValor.value = 0
    cupomAplicado.value      = true
    cupomMsg.value           = `✓ ${data.msg || 'Cupom aplicado!'}`

  } catch {
    // ── Fallback: valida nos cupons locais (TCC sem backend) ──
    const codigo = cupomCodigo.value.trim().toUpperCase()
    const cupom  = CUPONS_VALIDOS[codigo]

    if (!cupom) {
      cupomMsg.value      = 'Cupom inválido ou expirado.'
      cupomAplicado.value = false
      descontoValor.value = 0
    } else {
      if (cupom.tipo === 'percent') {
        descontoValor.value = subtotal.value * cupom.desconto
      } else if (cupom.tipo === 'fixed') {
        descontoValor.value = cupom.desconto
      } else if (cupom.tipo === 'frete') {
        descontoValor.value       = 0
        freteGratisPosCupom.value = true
        freteValor.value          = 0
      }
      cupomAplicado.value = true
      cupomMsg.value      = `✓ ${cupom.msg}`
    }
  } finally {
    salvandoCupom.value = false
  }
}

const removerCupom = () => {
  cupomCodigo.value         = ''
  cupomAplicado.value       = false
  cupomMsg.value            = ''
  descontoValor.value       = 0
  freteGratisPosCupom.value = false
  // Recalcula frete
  const op = opcoesEntrega.value.find(o => o.codigo === freteEscolhido.value)
  freteValor.value = op ? op.valor : 0
}

// ─── Antifraude (regras locais) ───────────────────────────────────────────────
const verificarAntifraude = () => {
  const alertas = []

  // Valor muito alto para primeira compra
  if (totalFinal.value > 5000) alertas.push('valor_alto')

  // CEP inválido/suspeito
  if (!entrega.value.cidade || !entrega.value.cep) alertas.push('endereco_incompleto')

  // Muitos itens
  if (itens.value.length > 15) alertas.push('muitos_itens')

  // Cartão: CVV parece falso
  if (metodo.value === 'cartao' && cartao.value.cvv === '000') alertas.push('cvv_suspeito')

  return alertas
}

// ─── Validações de etapa ──────────────────────────────────────────────────────
const validarDados = async () => {
  erroForm.value = ''

  // Validar campos básicos
  ;['nome','email','telefone'].forEach(validarCampo)

  if (erros.value.nome || erros.value.email || erros.value.telefone) {
    erroForm.value = 'Corrija os campos destacados para continuar.'
    return
  }

  // Garantir que CPF foi validado
  if (cpfStatus.value === 'idle' || cpfStatus.value === 'error') {
    await validarCPFCompleto()
  }

  if (cpfStatus.value !== 'ok') {
    erroForm.value = erros.value.cpf || 'Valide seu CPF antes de continuar.'
    return
  }

  try {
    localStorage.setItem('no_cliente', JSON.stringify({
      nome: cliente.value.nome,
      email: cliente.value.email,
      telefone: cliente.value.telefone
      // Nunca salvar CPF completo no localStorage
    }))
  } catch {}

  irParaEtapa(3)
}

const validarEntrega = () => {
  erroForm.value = ''
  ;['cep','endereco'].forEach(validarCampo)
  if (erros.value.cep || erros.value.endereco) {
    erroForm.value = 'Corrija os campos destacados.'
    return
  }
  if (!entrega.value.cidade) {
    erroForm.value = 'Informe a cidade.'
    return
  }
  if (opcoesEntrega.value.length && !freteEscolhido.value) {
    erroForm.value = 'Selecione uma opção de frete.'
    return
  }
  try { localStorage.setItem('no_entrega', JSON.stringify(entrega.value)) } catch {}
  irParaEtapa(4)
}

// ─── Finalizar pedido ─────────────────────────────────────────────────────────
const finalizarPedido = async () => {
  erroForm.value = ''

  if (metodo.value === 'cartao') {
    if (tipoCartao.value === 'debito' && cartao.value.parcelas > 1) {
      erroForm.value = 'Débito não permite parcelamento.'
      return
    }
    ;['cartaoNum','cartaoVal'].forEach(validarCampo)
    if (!cartao.value.nome.trim()) { erroForm.value = 'Nome no cartão é obrigatório.'; return }
    if (cartao.value.cvv.length < 3) { erroForm.value = 'CVV inválido.'; return }
    if (erros.value.cartaoNum || erros.value.cartaoVal) {
      erroForm.value = 'Verifique os dados do cartão.'
      return
    }
  }

  // Antifraude
  const alertas = verificarAntifraude()
  if (alertas.length >= 2) {
    erroForm.value = 'Pedido em análise de segurança. Nossa equipe entrará em contato.'
    return
  }

  salvando.value = true

  try {
    const payload = {
      itens:    itens.value.map(i => ({ produto: i._id||i.id, qty: i.qty })),
      pagamento: {
        metodo:   metodo.value,
        parcelas: cartao.value.parcelas,
        cartao:   metodo.value === 'cartao' ? {
          numero:   cartao.value.numero.replace(/\s/g,''),
          nome:     cartao.value.nome,
          validade: cartao.value.validade,
          cvv:      cartao.value.cvv,
          bandeira: bandeiraCartao.value,
          tipo:     tipoCartao.value,
        } : undefined,
      },
      cliente:     cliente.value,
      entrega:     entrega.value,
      cupom:       cupomAplicado.value ? cupomCodigo.value : undefined,
      frete:       freteEscolhido.value || undefined,
      freteValor:  freteValor.value,
       total: totalFinal.value,      // ← adiciona essa linha
      totalFinal:  totalFinal.value,    // ← enviado explicitamente para o backend
      localizacao: localizacao.value,
    }

    const { data } = await api.post('/pedidos', payload)
pedidoCriado.value = data.pedido || data
console.log('Pedido criado:', data)

    // Gerar número e chave da NF
    nfNumero.value = String(Math.floor(Math.random() * 900000) + 100000)
    nfChave.value  = Array.from({length:44}, () => Math.floor(Math.random()*10)).join('')

    irParaEtapa(5)

    // Gerar QR Code Pix
    if (data.pedido.pagamento?.metodo === 'pix' && data.pedido.status !== 'aprovado') {
      iniciarTimerPix()
      await nextTick()
      await gerarQRCode(data.pedido)
    }

    // Enviar e-mail de confirmação
    await enviarEmailConfirmacao(data.pedido)

    // Limpar dados sensíveis do cartão da memória
    cartao.value.cvv    = ''
    cartao.value.numero = ''

  } catch (e) {
    erroForm.value = e.response?.data?.msg
      || e.response?.data?.message
      || `Erro ao finalizar (${e.response?.status||'sem conexão'}). Tente novamente.`
  } finally {
    salvando.value = false
  }
}

// ─── E-mail de confirmação via Resend ────────────────────────────────────────
const enviarEmailConfirmacao = async (pedido) => {
  emailStatus.value    = 'sending'
  emailStatusMsg.value = 'Enviando confirmação por e-mail...'

  // Template HTML do e-mail
  const htmlEmail = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Georgia, serif; background: #f5f0e8; margin: 0; padding: 40px 20px; color: #0d0a04; }
    .container { max-width: 580px; margin: 0 auto; background: #fff; border: 1px solid #e0d5b8; }
    .header { background: #0d0a04; padding: 28px; text-align: center; }
    .header h1 { color: #C8A84B; font-size: 22px; letter-spacing: 4px; margin: 0; font-style: italic; }
    .header p { color: rgba(245,240,232,0.4); font-size: 9px; letter-spacing: 5px; margin: 4px 0 0; }
    .body { padding: 28px; }
    .titulo { font-size: 18px; color: #0d0a04; margin-bottom: 6px; }
    .sub { font-size: 13px; color: #666; margin-bottom: 24px; }
    .section-title { font-size: 9px; letter-spacing: 4px; text-transform: uppercase; color: #8b6914; border-bottom: 1px solid #e0d5b8; padding-bottom: 6px; margin: 18px 0 10px; font-family: monospace; }
    .row { display: flex; justify-content: space-between; padding: 5px 0; border-bottom: 1px solid #f0ebe0; font-size: 13px; }
    .row span:first-child { color: #888; }
    .total-row { display: flex; justify-content: space-between; padding: 10px 0; font-size: 16px; font-weight: bold; border-top: 2px solid #C8A84B; margin-top: 6px; }
    .total-row span:last-child { color: #C8A84B; }
    .footer { background: #0d0a04; padding: 18px; text-align: center; }
    .footer p { color: rgba(245,240,232,0.25); font-size: 9px; letter-spacing: 3px; margin: 0; }
    .badge { display: inline-block; background: #e8f5e9; color: #2e7d32; padding: 3px 10px; border-radius: 3px; font-size: 11px; font-weight: bold; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Noir <span style="color:#C8A84B">&amp;</span> Or</h1>
      <p>ATELIER · CONFIRMAÇÃO DE PEDIDO</p>
    </div>
    <div class="body">
      <p class="titulo">Olá, ${pedido.cliente?.nome?.split(' ')[0]} 👋</p>
      <p class="sub">Seu pedido foi recebido e está sendo processado. Veja os detalhes abaixo:</p>

      <div class="section-title">◆ Pedido</div>
      <div class="row"><span>Número</span><span><strong>#${pedido.numero || (pedido._id||'').slice(-8).toUpperCase()}</strong></span></div>
      <div class="row"><span>Data</span><span>${new Date(pedido.criadoEm || Date.now()).toLocaleDateString('pt-BR')}</span></div>
      <div class="row"><span>Status</span><span><span class="badge">${pedido.status || 'Pendente'}</span></span></div>

      <div class="section-title">◆ Itens</div>
      ${(pedido.itens||[]).map(item => `
        <div class="row">
          <span>${item.nome||item.produto?.nome} × ${item.qty||1}</span>
          <span>R$ ${((item.preco||0)*(item.qty||1)).toLocaleString('pt-BR',{minimumFractionDigits:2})}</span>
        </div>
      `).join('')}

      <div class="section-title">◆ Valores</div>
      <div class="row"><span>Subtotal</span><span>R$ ${subtotal.value.toLocaleString('pt-BR',{minimumFractionDigits:2})}</span></div>
      ${descontoValor.value > 0 ? `<div class="row"><span>Desconto</span><span style="color:green">−R$ ${descontoValor.value.toLocaleString('pt-BR',{minimumFractionDigits:2})}</span></div>` : ''}
      <div class="row"><span>Frete</span><span>${freteValor.value === 0 ? 'GRÁTIS' : 'R$ '+freteValor.value.toLocaleString('pt-BR',{minimumFractionDigits:2})}</span></div>
      <div class="total-row"><span>TOTAL</span><span>R$ ${totalFinal.value.toLocaleString('pt-BR',{minimumFractionDigits:2})}</span></div>

      <div class="section-title">◆ Entrega</div>
      <div class="row"><span>Endereço</span><span>${pedido.entrega?.endereco}</span></div>
      <div class="row"><span>Cidade</span><span>${pedido.entrega?.cidade} — CEP ${pedido.entrega?.cep}</span></div>
      <div class="row"><span>Prazo</span><span>5 a 10 dias úteis</span></div>
    </div>
    <div class="footer">
      <p>NOIR &amp; OR · ATELIER &nbsp;◆&nbsp; ${LOJA.site} &nbsp;◆&nbsp; ${LOJA.email}</p>
      <p style="margin-top:6px">Pagamento processado com segurança via Mercado Pago · SSL 256-bit</p>
    </div>
  </div>
</body>
</html>`

  try {
    // ── Opção A: Via backend (recomendado para produção) ──
    // await api.post('/email/confirmacao', {
    //   to:      pedido.cliente.email,
    //   subject: `Pedido #${pedido.numero||''} confirmado — Noir & Or`,
    //   html:    htmlEmail,
    // })

    // ── Opção B: Direto via Resend (apenas para TCC/demo) ──
    // ATENÇÃO: em produção NUNCA chame a Resend diretamente do frontend
    // pois expõe sua API Key. Use sempre o backend.
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from:    EMAIL_FROM,
        to:      [pedido.cliente.email],
        subject: `✓ Pedido #${pedido.numero || (pedido._id||'').slice(-8).toUpperCase()} confirmado — Noir & Or`,
        html:    htmlEmail,
      })
    })

    if (!res.ok) throw new Error(`Resend: ${res.status}`)

    emailStatus.value    = 'sent'
    emailStatusMsg.value = `E-mail de confirmação enviado para ${maskEmailDisplay(pedido.cliente.email)}`

  } catch (e) {
    // E-mail falhou mas não cancela o pedido
    console.warn('[Email] Falhou:', e.message)
    emailStatus.value    = 'error'
    emailStatusMsg.value = 'E-mail de confirmação não pôde ser enviado, mas seu pedido está confirmado.'
  }
}

// ─── Nota Fiscal (HTML simulada) ──────────────────────────────────────────────
const baixarNF = () => {
  if (!pedidoCriado.value) return

  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>DANFE — NF-e Nº ${nfNumero.value}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Courier New', monospace; font-size: 11px; color: #000; background: #fff; padding: 20px; }
    .nf-container { max-width: 780px; margin: 0 auto; border: 2px solid #000; }
    .nf-header { display: flex; border-bottom: 1px solid #000; }
    .nf-header__logo { flex: 1; padding: 12px; border-right: 1px solid #000; }
    .nf-header__logo h1 { font-size: 16px; font-weight: bold; letter-spacing: 2px; }
    .nf-header__logo p  { font-size: 9px; margin-top: 2px; }
    .nf-header__danfe { width: 180px; padding: 10px; text-align: center; }
    .nf-header__danfe h2 { font-size: 13px; font-weight: bold; }
    .nf-header__danfe p  { font-size: 9px; margin: 2px 0; }
    .nf-header__num { width: 160px; padding: 10px; border-left: 1px solid #000; text-align: center; font-size: 9px; }
    .nf-header__num strong { display: block; font-size: 15px; margin: 4px 0; }
    .nf-section { border-bottom: 1px solid #000; }
    .nf-section__title { background: #eee; padding: 3px 8px; font-weight: bold; font-size: 9px; letter-spacing: 1px; border-bottom: 1px solid #000; }
    .nf-fields { display: flex; flex-wrap: wrap; }
    .nf-field { padding: 5px 8px; border-right: 1px dotted #ccc; border-bottom: 1px dotted #ccc; }
    .nf-field__label { font-size: 7px; font-weight: bold; letter-spacing: 1px; text-transform: uppercase; color: #555; }
    .nf-field__value { font-size: 11px; margin-top: 1px; }
    .nf-field--w25 { width: 25%; }
    .nf-field--w50 { width: 50%; }
    .nf-field--w100 { width: 100%; }
    .nf-itens table { width: 100%; border-collapse: collapse; }
    .nf-itens th { background: #eee; font-size: 8px; letter-spacing: 1px; padding: 4px 6px; border: 1px solid #ccc; text-align: left; }
    .nf-itens td { padding: 4px 6px; border: 1px solid #eee; font-size: 10px; }
    .nf-totais { display: flex; justify-content: flex-end; padding: 10px; }
    .nf-totais table { border-collapse: collapse; }
    .nf-totais td { padding: 3px 10px; font-size: 11px; border: 1px solid #ccc; }
    .nf-totais .total { font-weight: bold; font-size: 14px; background: #f9f9f9; }
    .nf-chave { padding: 8px; text-align: center; font-size: 9px; letter-spacing: 1px; background: #f9f9f9; word-break: break-all; border-top: 1px solid #000; }
    .nf-rodape { padding: 8px; text-align: center; font-size: 8px; color: #777; border-top: 1px solid #000; }
    .nf-sim-badge { background: #fff3cd; border: 1px solid #ffc107; padding: 6px 12px; text-align: center; font-weight: bold; font-size: 11px; color: #856404; }
    @media print { .nf-sim-badge { display: none; } }
  </style>
</head>
<body>
  <div class="nf-sim-badge">⚠ DOCUMENTO SIMULADO — TRABALHO DE CONCLUSÃO DE CURSO — NÃO TEM VALIDADE FISCAL</div>
  <div class="nf-container">
    <div class="nf-header">
      <div class="nf-header__logo">
        <h1>NOIR &amp; OR ATELIER</h1>
        <p>CNPJ: ${LOJA.cnpj}</p>
        <p>IE: 000.000.000.000</p>
        <p>${LOJA.site} | ${LOJA.email}</p>
      </div>
      <div class="nf-header__danfe">
        <h2>DANFE</h2>
        <p>Documento Auxiliar da<br>Nota Fiscal Eletrônica</p>
        <p style="margin-top:6px;font-weight:bold">0 - ENTRADA<br>1 - SAÍDA</p>
        <p style="font-size:16px;font-weight:bold;margin-top:4px;border:2px solid #000;display:inline-block;padding:2px 10px">1</p>
      </div>
      <div class="nf-header__num">
        <p>Nº</p>
        <strong>${nfNumero.value}</strong>
        <p>SÉRIE 001</p>
        <p style="margin-top:6px;font-size:8px">Folha 1/1</p>
      </div>
    </div>

    <div class="nf-section">
      <div class="nf-section__title">EMITENTE</div>
      <div class="nf-fields">
        <div class="nf-field nf-field--w50"><div class="nf-field__label">RAZÃO SOCIAL</div><div class="nf-field__value">${LOJA.nome}</div></div>
        <div class="nf-field nf-field--w25"><div class="nf-field__label">CNPJ</div><div class="nf-field__value">${LOJA.cnpj}</div></div>
        <div class="nf-field nf-field--w25"><div class="nf-field__label">DATA EMISSÃO</div><div class="nf-field__value">${new Date(pedidoCriado.value.criadoEm||Date.now()).toLocaleDateString('pt-BR')}</div></div>
      </div>
    </div>

    <div class="nf-section">
      <div class="nf-section__title">DESTINATÁRIO / REMETENTE</div>
      <div class="nf-fields">
        <div class="nf-field nf-field--w50"><div class="nf-field__label">NOME / RAZÃO SOCIAL</div><div class="nf-field__value">${pedidoCriado.value.cliente?.nome}</div></div>
        <div class="nf-field nf-field--w25"><div class="nf-field__label">CPF</div><div class="nf-field__value">${maskCPFDisplay(pedidoCriado.value.cliente?.cpf)}</div></div>
        <div class="nf-field nf-field--w25"><div class="nf-field__label">E-MAIL</div><div class="nf-field__value">${maskEmailDisplay(pedidoCriado.value.cliente?.email)}</div></div>
        <div class="nf-field nf-field--w50"><div class="nf-field__label">ENDEREÇO</div><div class="nf-field__value">${pedidoCriado.value.entrega?.endereco}</div></div>
        <div class="nf-field nf-field--w25"><div class="nf-field__label">MUNICÍPIO</div><div class="nf-field__value">${pedidoCriado.value.entrega?.cidade}</div></div>
        <div class="nf-field nf-field--w25"><div class="nf-field__label">CEP</div><div class="nf-field__value">${pedidoCriado.value.entrega?.cep}</div></div>
      </div>
    </div>

    <div class="nf-section nf-itens">
      <div class="nf-section__title">DADOS DOS PRODUTOS / SERVIÇOS</div>
      <table>
        <thead>
          <tr>
            <th style="width:40px">COD.</th>
            <th>DESCRIÇÃO DO PRODUTO</th>
            <th style="width:50px">QTD</th>
            <th style="width:80px">VALOR UNIT.</th>
            <th style="width:80px">VALOR TOTAL</th>
          </tr>
        </thead>
        <tbody>
          ${(pedidoCriado.value.itens||[]).map((item, idx) => `
            <tr>
              <td>${String(idx+1).padStart(3,'0')}</td>
              <td>${item.nome||item.produto?.nome||'Produto'}</td>
              <td style="text-align:center">${item.qty||1}</td>
              <td style="text-align:right">R$ ${(item.preco||0).toLocaleString('pt-BR',{minimumFractionDigits:2})}</td>
              <td style="text-align:right">R$ ${((item.preco||0)*(item.qty||1)).toLocaleString('pt-BR',{minimumFractionDigits:2})}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    <div class="nf-totais">
      <table>
        <tr><td>Subtotal</td><td style="text-align:right">R$ ${subtotal.value.toLocaleString('pt-BR',{minimumFractionDigits:2})}</td></tr>
        ${descontoValor.value > 0 ? `<tr><td>Desconto</td><td style="text-align:right;color:green">−R$ ${descontoValor.value.toLocaleString('pt-BR',{minimumFractionDigits:2})}</td></tr>` : ''}
        <tr><td>Frete</td><td style="text-align:right">${freteValor.value === 0 ? 'GRÁTIS' : 'R$ '+freteValor.value.toLocaleString('pt-BR',{minimumFractionDigits:2})}</td></tr>
        <tr class="total"><td><strong>VALOR TOTAL NF-e</strong></td><td style="text-align:right"><strong>R$ ${totalFinal.value.toLocaleString('pt-BR',{minimumFractionDigits:2})}</strong></td></tr>
      </table>
    </div>

    <div class="nf-chave">
      CHAVE DE ACESSO (44 dígitos): ${nfChave.value}
    </div>

    <div class="nf-rodape">
      Documento simulado para fins acadêmicos (TCC) | ${LOJA.nome} | Gerado em ${new Date().toLocaleString('pt-BR')}
    </div>
  </div>
</body>
</html>`

  const blob = new Blob([html], { type: 'text/html;charset=utf-8' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = `nf-noiror-${nfNumero.value}.html`
  a.click()
  URL.revokeObjectURL(a.href)
}

// ─── QR Code ──────────────────────────────────────────────────────────────────
const gerarQRCode = async (pedido) => {
  await nextTick()
  if (pedido.pagamento?.pixQrImage) return

  const pixStr = pedido.pagamento?.pixCopia || pedido.pagamento?.pix_copy_paste
  if (!pixStr) return

  const canvas = qrCanvasRef.value
  if (!canvas) return

  try {
    await QRCode.toCanvas(canvas, pixStr, {
      width: 200, margin: 2,
      color: { dark: '#0d0a04', light: '#f5f0e8' },
      errorCorrectionLevel: 'H',
    })
  } catch (e) {
    console.error('[QRCode] Erro:', e)
    try {
      await QRCode.toCanvas(canvas, pixStr.slice(0,256), { width: 200, margin: 2 })
    } catch {}
  }
}

// ─── Timer PIX ────────────────────────────────────────────────────────────────
const iniciarTimerPix = () => {
  pixTimerSecs.value = 1800
  clearInterval(pixTimerInt)
  pixTimerInt = setInterval(() => {
    if (pixTimerSecs.value <= 0) { clearInterval(pixTimerInt); return }
    pixTimerSecs.value--
  }, 1000)
}

// ─── Simular pagamento (apenas dev) ──────────────────────────────────────────
const simularPagamento = async () => {
  if (!isDev.value) return
  try {
    const { data } = await api.patch(`/pedidos/${pedidoCriado.value._id}/confirmar`)
    pedidoCriado.value = data.pedido
    clearInterval(pixTimerInt)
  } catch (e) { console.error(e) }
}

// ─── Copiar texto ─────────────────────────────────────────────────────────────
const copiarTexto = async (txt, tipo) => {
  try {
    await navigator.clipboard.writeText(txt)
    copiado.value = tipo
    setTimeout(() => { copiado.value = '' }, 2500)
  } catch { copiado.value = '' }
}

// ─── Comprovante ──────────────────────────────────────────────────────────────
const imprimirComprovante = () => {
  const c = comprovanteRef.value
  if (!c) return
  const win = window.open('','_blank')
  win.document.write(`
    <html><head><title>Comprovante Noir & Or — #${idPedidoFormatado.value}</title>
    <style>
      body{font-family:Georgia,serif;background:#f5f0e8;color:#0d0a04;padding:40px;max-width:600px;margin:0 auto}
      .co-comprovante{background:#fff;border:1px solid #ccc;padding:24px}
    </style></head><body>
    ${c.outerHTML}
    <script>setTimeout(()=>window.print(),200)<\/script>
    </body></html>
  `)
  win.document.close()
}

const baixarComprovante = () => {
  const c = comprovanteRef.value
  if (!c) return
  const html = `<!DOCTYPE html><html lang="pt-BR"><head>
    <meta charset="UTF-8">
    <title>Comprovante #${idPedidoFormatado.value}</title>
    <style>
      body{font-family:Georgia,serif;padding:40px;max-width:600px;margin:0 auto;background:#f5f0e8;color:#0d0a04}
      .co-comprovante{background:#fff;border:1px solid #ccc;padding:24px}
      .co-comprovante__row{display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px solid #eee;font-size:13px}
      .co-comprovante__row span:first-child{color:#888}
      .co-comprovante__section-title{font-size:9px;letter-spacing:3px;text-transform:uppercase;color:#8b6914;margin:12px 0 6px;display:flex;align-items:center;gap:6px}
      .co-comprovante__row--total{font-weight:700;font-size:16px;border-top:2px solid #ccc;margin-top:4px}
      .co-comprovante__footer{margin-top:16px;text-align:center;font-size:9px;color:#999;letter-spacing:2px;display:flex;gap:8px;justify-content:center;flex-wrap:wrap}
      .co-nf{margin-top:14px;background:#fffde7;border:1px solid #ffc107;padding:14px}
      .co-nf__header{display:flex;align-items:center;gap:8px;font-size:9px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;margin-bottom:10px}
      .co-nf__sim{color:#f57f17;font-style:italic;font-size:8px;font-weight:normal}
      .co-nf__row{display:flex;justify-content:space-between;font-size:11px;padding:3px 0;border-bottom:1px solid #f0e68c}
      .co-nf__row span:first-child{color:#777}
      .co-nf__chave{font-family:monospace;font-size:8px;word-break:break-all;color:#555}
    </style>
    </head><body>${c.outerHTML}</body></html>`

  const blob = new Blob([html], { type: 'text/html;charset=utf-8' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = `comprovante-noiror-${idPedidoFormatado.value}.html`
  a.click()
  URL.revokeObjectURL(a.href)
}

// ─── Navegação ────────────────────────────────────────────────────────────────
const irParaEtapa = (n) => {
  erroForm.value = ''
  etapa.value = n
  nextTick(() => modalRef.value?.querySelector('.co-main')?.scrollTo({ top: 0, behavior: 'smooth' }))
}

const acaoMobile = () => {
  if      (etapa.value===1) irParaEtapa(2)
  else if (etapa.value===2) validarDados()
  else if (etapa.value===3) validarEntrega()
  else if (etapa.value===4) finalizarPedido()
}

// ─── Itens ────────────────────────────────────────────────────────────────────
const alterarQty = (item, d) => {
  item.qty += d
  if (item.qty <= 0) removerItem(item)
}

const removerItem = (item) => {
  itens.value = itens.value.filter(i => (i._id||i.id) !== (item._id||item.id))
}

// ─── Fechar ───────────────────────────────────────────────────────────────────
const tentarFechar = () => {
  if (etapa.value === 5) { fecharELimpar(); return }
  if (itens.value.length && etapa.value > 1) {
    if (!confirm('Tem certeza que deseja sair? Seu progresso será perdido.')) return
  }
  fechar()
}

const fechar = () => {
  aberto.value = false
  document.body.style.overflow = ''
}

const fecharELimpar = () => {
  fechar()
  window.dispatchEvent(new CustomEvent('carrinho-limpo'))
  itens.value          = []
  pedidoCriado.value   = null
  etapa.value          = 1
  cupomCodigo.value    = ''
  cupomAplicado.value  = false
  descontoValor.value  = 0
  freteValor.value     = 0
  opcoesEntrega.value  = []
  erroForm.value       = ''
  cpfStatus.value      = 'idle'
  emailStatus.value    = 'idle'
  freteGratisPosCupom.value = false
  clearInterval(pixTimerInt)
  // Limpar cartão da memória
  cartao.value = { numero:'', nome:'', validade:'', cvv:'', parcelas:1 }
}

// ─── Geolocalização ───────────────────────────────────────────────────────────
const obterLocalizacao = () => {
  if (!navigator.geolocation) return
  navigator.geolocation.getCurrentPosition(
    (p) => { localizacao.value = { lat: p.coords.latitude, lng: p.coords.longitude } },
    () => {},
    { enableHighAccuracy: false, timeout: 5000 }
  )
}

// ─── Evento de abertura ───────────────────────────────────────────────────────
const onAbrirCheckout = (e) => {
  itens.value          = e.detail || window.__noirCarrinho || []
  etapa.value          = 1
  pedidoCriado.value   = null
  erroForm.value       = ''
  cupomAplicado.value  = false
  cupomCodigo.value    = ''
  cupomMsg.value       = ''
  descontoValor.value  = 0
  freteValor.value     = 0
  opcoesEntrega.value  = []
  copiado.value        = ''
  cpfStatus.value      = 'idle'
  emailStatus.value    = 'idle'
  freteGratisPosCupom.value = false

  // Pré-preenche com dados do usuário logado
  if (auth.user) {
    cliente.value.nome     = `${auth.user.nome||''} ${auth.user.sobrenome||''}`.trim()
    cliente.value.email    = auth.user.email     || ''
    cliente.value.cpf      = auth.user.cpf       || ''
    cliente.value.telefone = auth.user.telefone  || ''
    entrega.value.cep      = auth.user.cep       || ''
    entrega.value.cidade   = auth.user.cidade    || ''
    entrega.value.endereco = auth.user.endereco  || ''
    entrega.value.estado   = auth.user.uf        || auth.user.estado || ''
    entrega.value.bairro   = auth.user.bairro    || ''
    // Se CPF já preenchido do perfil, valida automaticamente
    if (cliente.value.cpf.length === 14) validarCPFCompleto()
  } else {
    // Restaura do localStorage (sem CPF por segurança)
    try {
      const c = JSON.parse(localStorage.getItem('no_cliente')||'{}')
      if (c.email) { cliente.value.email = c.email; cliente.value.nome = c.nome||''; cliente.value.telefone = c.telefone||'' }
      const en = JSON.parse(localStorage.getItem('no_entrega')||'{}')
      if (en.cep) Object.assign(entrega.value, en)
      const m = localStorage.getItem('no_metodo_pag')
      if (m) metodo.value = m
    } catch {}
  }

  obterLocalizacao()
  aberto.value = true
  document.body.style.overflow = 'hidden'
}

const onKeyDown = (e) => {
  if (e.key === 'Escape' && aberto.value) tentarFechar()
}

onMounted(() => {
  window.addEventListener('abrir-checkout', onAbrirCheckout)
  window.addEventListener('keydown', onKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('abrir-checkout', onAbrirCheckout)
  window.removeEventListener('keydown', onKeyDown)
  clearInterval(pixTimerInt)
})
</script>

<style>
/* ══ VARIÁVEIS GLOBAIS — cole no main.css ou App.vue (fora de scoped) ══
   Se estiver usando <style scoped>, mova este bloco :root para
   seu arquivo global de CSS (src/assets/main.css ou similar)        */
:root {
  --or:    #C8A84B;   /* dourado principal     — altere para sua cor */
  --or2:   #F5D78E;   /* dourado claro (hover) — altere para sua cor */
  --void:  #060400;   /* fundo mais escuro      */
  --deep:  #09090f;   /* fundo secundário       */
  --panel: rgba(9,9,15,0.98);
  --surf:  #0d0a04;
  --hair:  rgba(200,168,75,0.12);
  --hairH: rgba(200,168,75,0.38);
  --text:  rgba(245,240,232,0.92);
  --text2: rgba(245,240,232,0.55);
  --text3: rgba(245,240,232,0.28);
  --text4: rgba(245,240,232,0.10);
  --green: #2ecc71;
  --red:   #e74c3c;
  --orange:#f39c12;
  --ease:  cubic-bezier(0.16,1,0.30,1);
}
</style>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@200;300;400;700&family=Syne:wght@300;400;500;600;700&family=DM+Mono:wght@300;400&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

/* ══ OVERLAY ══ */
.co-overlay {
  position: fixed; inset: 0; z-index: 9500;
  background: rgba(0,0,0,.9);
  backdrop-filter: blur(24px) saturate(160%);
  display: flex; align-items: center; justify-content: center;
  padding: 16px;
}
.co-realm-line {
  position: fixed; top: 0; left: 0; right: 0; height: 2px; z-index: 9600;
  background: linear-gradient(90deg, transparent 5%, var(--or2) 20%, var(--or) 50%, var(--or2) 80%, transparent 95%);
  opacity: .7;
}

/* ══ MODAL ══ */
.co-modal {
  position: relative;
  background: linear-gradient(160deg, #110d05 0%, #06040a 100%);
  border: 0.5px solid var(--hair);
  border-radius: 3px;
  width: 100%; max-width: 1020px;
  max-height: 92vh;
  display: flex; flex-direction: column;
  overflow: hidden;
  box-shadow: 0 60px 120px rgba(0,0,0,.95), 0 0 0 1px rgba(200,168,75,0.04) inset;
  animation: coPopIn .5s var(--ease) both;
}
@keyframes coPopIn {
  from { opacity:0; transform: scale(.96) translateY(20px); }
  to   { opacity:1; transform: scale(1) translateY(0); }
}

.co-corner {
  position: absolute; width: 16px; height: 16px;
  border-color: rgba(200,168,75,0.22); border-style: solid; pointer-events: none; z-index: 2;
}
.co-corner--tl { top:8px; left:8px;   border-width: .5px 0 0 .5px; }
.co-corner--tr { top:8px; right:8px;  border-width: .5px .5px 0 0; }
.co-corner--bl { bottom:8px; left:8px;  border-width: 0 0 .5px .5px; }
.co-corner--br { bottom:8px; right:8px; border-width: 0 .5px .5px 0; }

.co-kanji-bg {
  position: absolute; right: 20px; top: 60px;
  font-family: 'Noto Serif JP', serif;
  font-size: 120px; font-weight: 700;
  color: rgba(245,240,232,0.02);
  line-height: 1; user-select: none; pointer-events: none; z-index: 0;
  writing-mode: vertical-rl;
}

/* ══ HEADER ══ */
.co-header {
  display: flex; align-items: center; gap: 16px;
  padding: 14px 24px;
  border-bottom: 0.5px solid var(--hair);
  flex-shrink: 0;
  background: rgba(0,0,0,.3);
  position: relative; z-index: 5;
}
.co-header::after {
  content: ''; position: absolute; bottom: -1px; left: 24px; right: 24px; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(200,168,75,0.2), transparent);
}

.co-header__brand { display: flex; align-items: center; gap: 7px; flex-shrink: 0; }
.co-brand-mark { font-size: 14px; color: var(--or); opacity: .8; }
.co-brand-txt {
  font-family: 'Noto Serif JP', serif;
  font-size: 15px; font-style: italic; letter-spacing: .14em; color: var(--text);
}
.co-brand-txt em { color: var(--or); font-style: normal; }
.co-brand-sub {
  font-family: 'DM Mono', monospace;
  font-size: 7px; letter-spacing: .45em; text-transform: uppercase;
  color: var(--or); opacity: .35;
}

/* Stepper */
.co-stepper {
  flex: 1; display: flex; align-items: center; gap: 0; position: relative;
}
.co-stepper__label {
  position: absolute; bottom: -18px; left: 50%; transform: translateX(-50%);
  font-family: 'DM Mono', monospace;
  font-size: 7px; letter-spacing: .45em; text-transform: uppercase;
  color: var(--or); opacity: .55; white-space: nowrap;
}
.co-step {
  display: flex; align-items: center;
  background: none; border: none; cursor: default; padding: 0; flex: 1;
}
.co-step:last-child { flex: none; }
.co-step__orb {
  width: 22px; height: 22px; border-radius: 50%; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  font-family: 'DM Mono', monospace; font-size: 8px;
  background: rgba(200,168,75,0.05);
  border: 0.5px solid rgba(200,168,75,0.2);
  color: var(--text3); transition: all .35s var(--ease);
}
.co-step.is-done .co-step__orb { background: rgba(200,168,75,0.12); border-color: var(--or); color: var(--or); }
.co-step.is-active .co-step__orb {
  background: var(--or); border-color: var(--or); color: var(--void); font-weight: 700;
  box-shadow: 0 0 12px rgba(200,168,75,.45);
}
.co-step.is-done { cursor: pointer; }
.co-step__line { flex: 1; height: 0.5px; background: rgba(200,168,75,0.12); transition: background .35s; }
.co-step.is-done .co-step__line { background: rgba(200,168,75,0.35); }

.co-header__right { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
.co-locale-sel {
  background: rgba(200,168,75,0.05); border: 0.5px solid var(--hair);
  color: var(--text2); font-size: 11px; padding: 4px 6px; outline: none; cursor: pointer;
}
.co-close {
  width: 30px; height: 30px; background: none;
  border: 0.5px solid rgba(200,168,75,0.2);
  border-radius: 50%; color: var(--text3); cursor: pointer;
  display: flex; align-items: center; justify-content: center; transition: all .25s;
}
.co-close:hover { border-color: var(--red); color: var(--red); transform: rotate(90deg); }

.co-progress { height: 1.5px; background: rgba(200,168,75,0.06); flex-shrink: 0; position: relative; overflow: hidden; }
.co-progress__fill {
  position: absolute; top: 0; left: 0; height: 100%;
  background: linear-gradient(90deg, var(--or), var(--or2));
  transition: width .6s var(--ease);
  box-shadow: 0 0 8px rgba(200,168,75,.5);
}

/* ══ BODY ══ */
.co-body { display: grid; grid-template-columns: 1fr 280px; flex: 1; overflow: hidden; }

.co-main {
  padding: 28px;
  overflow-y: auto;
  border-right: 0.5px solid rgba(200,168,75,0.08);
  scrollbar-width: thin; scrollbar-color: rgba(200,168,75,0.12) transparent;
  position: relative; z-index: 1;
}
.co-main::-webkit-scrollbar { width: 3px; }
.co-main::-webkit-scrollbar-thumb { background: rgba(200,168,75,0.14); }

.co-slide-enter-active, .co-slide-leave-active { transition: all .32s var(--ease); }
.co-slide-enter-from { opacity: 0; transform: translateX(24px); }
.co-slide-leave-to   { opacity: 0; transform: translateX(-24px); }

/* ══ ETAPA ══ */
.co-etapa { min-height: 0; }
.co-etapa__head {
  display: flex; align-items: center; gap: 10px;
  margin-bottom: 22px; padding-bottom: 14px;
  border-bottom: 0.5px solid var(--hair); position: relative;
}
.co-etapa__head::after {
  content: ''; position: absolute; bottom: -1px; left: 0; width: 44px; height: 1px;
  background: var(--or); opacity: .6;
}
.co-etapa__kanji {
  font-family: 'Noto Serif JP', serif;
  font-size: 1.4rem; font-weight: 700; color: var(--or); opacity: .15; line-height: 1; flex-shrink: 0;
}

.co-titulo {
  font-family: 'Noto Serif JP', serif;
  font-size: 1.35rem; font-weight: 200; color: var(--text);
  display: flex; align-items: center; gap: 8px;
}
.co-titulo--center { justify-content: center; text-align: center; }
.co-titulo__num {
  font-size: .65rem; font-weight: 300; letter-spacing: .25em;
  color: var(--or); opacity: .65; font-family: 'DM Mono', monospace;
}
.co-badge {
  font-family: 'DM Mono', monospace; font-size: 7.5px; letter-spacing: .3em;
  text-transform: uppercase; color: var(--or);
  background: rgba(200,168,75,.08); border: 0.5px solid rgba(200,168,75,.2);
  padding: 3px 9px; margin-left: auto;
}

/* ══ ITENS ══ */
.co-itens { display: flex; flex-direction: column; }
.co-item {
  display: grid; grid-template-columns: 22px 64px 1fr auto;
  gap: 12px; padding: 13px 0;
  border-bottom: 0.5px solid rgba(200,168,75,0.07);
  transition: background .2s; position: relative;
}
.co-item:hover { background: rgba(200,168,75,0.02); margin: 0 -8px; padding-left: 8px; padding-right: 8px; }
.co-item__num { font-family: 'DM Mono', monospace; font-size: 9px; color: var(--or); opacity: .25; align-self: center; }
.co-item__img { width: 64px; height: 64px; overflow: hidden; background: rgba(200,168,75,.04); border: 0.5px solid var(--hair); flex-shrink: 0; }
.co-item__img img { width: 100%; height: 100%; object-fit: cover; }
.co-item__cat  { font-size: 7px; letter-spacing: .45em; color: var(--or); text-transform: uppercase; margin-bottom: 3px; font-family: 'DM Mono', monospace; display: block; }
.co-item__nome { font-size: 12px; color: var(--text); font-weight: 300; line-height: 1.4; }
.co-qty { display: flex; align-items: center; gap: 6px; margin-top: 7px; }
.co-qty__btn {
  background: rgba(200,168,75,0.06); border: 0.5px solid rgba(200,168,75,0.18);
  color: var(--text2); width: 22px; height: 22px; cursor: pointer;
  font-size: 14px; display: flex; align-items: center; justify-content: center; transition: all .2s;
}
.co-qty__btn:hover { background: var(--or); border-color: var(--or); color: var(--void); }
.co-qty__val { font-size: 12px; min-width: 16px; text-align: center; color: var(--text); }
.co-item__right { display: flex; flex-direction: column; align-items: flex-end; gap: 7px; }
.co-item__preco { font-family: 'Noto Serif JP', serif; font-size: 1rem; color: var(--or); }
.co-remove {
  background: none; border: 0.5px solid rgba(200,168,75,0.12);
  color: rgba(245,240,232,0.18); width: 22px; height: 22px; cursor: pointer;
  display: flex; align-items: center; justify-content: center; transition: all .2s;
}
.co-remove:hover { border-color: var(--red); color: var(--red); background: rgba(231,76,60,.06); }

.item-list-enter-active, .item-list-leave-active { transition: all .28s ease; }
.item-list-enter-from { opacity:0; transform:translateY(-8px); }
.item-list-leave-to   { opacity:0; transform:translateX(18px); }

/* ══ VAZIO ══ */
.co-vazio { text-align: center; padding: 48px 0; display: flex; flex-direction: column; align-items: center; gap: 14px; color: rgba(245,240,232,0.22); }
.co-vazio__ico { color: rgba(245,240,232,0.08); animation: coFloat 3s ease-in-out infinite; }
@keyframes coFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
.co-vazio__txt { font-size: 13px; }

/* ══ CUPOM ══ */
.co-cupom { margin: 18px 0 0; padding: 13px 15px; background: rgba(200,168,75,0.03); border: 0.5px solid var(--hair); border-left: 2px solid rgba(200,168,75,0.3); }
.co-cupom__row { display: flex; gap: 8px; }
.co-cupom__input {
  flex: 1; background: rgba(200,168,75,0.04); border: 0.5px solid var(--hair);
  padding: 9px 12px; color: var(--text);
  font-family: 'DM Mono', monospace; font-size: 11px; letter-spacing: .2em;
  outline: none; transition: border-color .25s;
}
.co-cupom__input:focus { border-color: var(--hairH); }
.co-cupom__input::placeholder { letter-spacing: 0; color: rgba(200,168,75,0.3); text-transform: none; }
.co-cupom__input:disabled { opacity: .45; }
.co-cupom__msg { font-size: 10px; margin-top: 7px; font-family: 'DM Mono', monospace; letter-spacing: .05em; }
.co-cupom__msg--ok  { color: var(--green); }
.co-cupom__msg--err { color: var(--red); }

/* ══ STATUS CPF / EMAIL ══ */
.co-cpf-status {
  display: flex; align-items: center; gap: 9px;
  padding: 9px 13px; margin-bottom: 14px;
  font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: .08em;
  border: 0.5px solid; border-radius: 2px;
}
.co-cpf-status--loading { border-color: rgba(200,168,75,0.25); background: rgba(200,168,75,0.04); color: var(--or); }
.co-cpf-status--ok      { border-color: rgba(46,204,113,0.3);  background: rgba(46,204,113,0.04); color: var(--green); }
.co-cpf-status--error   { border-color: rgba(231,76,60,0.3);   background: rgba(231,76,60,0.04);  color: var(--red); }

.co-email-status {
  display: flex; align-items: center; gap: 9px;
  padding: 8px 12px; margin-bottom: 10px;
  font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: .08em;
  border: 0.5px solid; border-radius: 2px;
}
.co-email-status--sending { border-color: rgba(200,168,75,0.25); background: rgba(200,168,75,0.04); color: var(--or); }
.co-email-status--sent    { border-color: rgba(46,204,113,0.3);  background: rgba(46,204,113,0.04); color: var(--green); }
.co-email-status--error   { border-color: rgba(231,76,60,0.2);   background: rgba(231,76,60,0.03);  color: rgba(231,76,60,0.7); }

/* ══ FORMULÁRIO ══ */
.co-form { display: flex; flex-direction: column; gap: 14px; }
.co-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.co-campo { display: flex; flex-direction: column; gap: 6px; }
.co-campo label {
  font-family: 'DM Mono', monospace; font-size: 7px; letter-spacing: .52em;
  text-transform: uppercase; color: rgba(200,168,75,0.6); transition: color .25s;
}
.co-campo:focus-within label { color: var(--or); }
.co-campo__row {
  display: flex; align-items: center; border-bottom: 0.5px solid var(--hair);
  transition: border-color .3s; position: relative;
}
.co-campo__row::after {
  content: ''; position: absolute; bottom: -1px; left: 50%; transform: translateX(-50%);
  width: 0; height: 1.5px; background: var(--or); transition: width .4s var(--ease);
}
.co-campo:focus-within .co-campo__row::after { width: 100%; }
.co-campo:focus-within .co-campo__row { border-bottom-color: transparent; }
.co-campo--err .co-campo__row { border-bottom-color: rgba(231,76,60,0.5) !important; }
.co-campo--err .co-campo__row::after { background: transparent !important; }
.co-campo--err label { color: var(--red) !important; }
.co-campo--ok .co-campo__row::after { width: 100%; background: rgba(46,204,113,0.6); }
.co-campo input, .co-select {
  flex: 1; background: transparent; border: none;
  padding: 8px 0; color: var(--text);
  font-family: 'Syne', sans-serif; font-size: 12.5px; font-weight: 300;
  outline: none; caret-color: var(--or); width: 100%;
  transition: background-color 9999s;
}
.co-campo input::placeholder { color: rgba(245,240,232,0.18); }
.co-campo input:disabled { opacity: .3; cursor: not-allowed; }
.co-campo__ok   { color: var(--green); font-size: 11px; flex-shrink: 0; padding-left: 6px; }
.co-campo__err  { font-family: 'DM Mono', monospace; font-size: 9px; color: rgba(231,76,60,.85); letter-spacing: .05em; }
.co-campo__hint { font-size: 9px; color: var(--text3); margin-top: 3px; }

/* Campos sem co-campo__row */
.co-campo:not(:has(.co-campo__row)) > input {
  background: rgba(200,168,75,0.04); border: 0.5px solid var(--hair);
  padding: 10px 12px; transition: border-color .25s, box-shadow .25s;
}
.co-campo:not(:has(.co-campo__row)) > input:focus { border-color: var(--hairH); box-shadow: 0 0 0 3px rgba(200,168,75,0.04); }

.co-select {
  appearance: none; cursor: pointer;
  background: rgba(200,168,75,0.04); border: 0.5px solid var(--hair);
  padding: 9px 32px 9px 11px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='rgba(200,168,75,0.4)' stroke-width='1.5' fill='none'/%3E%3C/svg%3E");
  background-repeat: no-repeat; background-position: right 10px center;
}
.co-select option { background: #0d0a04; }
.co-select:focus { border-color: var(--hairH); outline: none; }
.co-select:disabled { opacity: .4; cursor: not-allowed; }

/* ══ COMPLETUDE ══ */
.co-completude { display: flex; align-items: center; gap: 10px; margin-top: 10px; padding: 8px 12px; background: rgba(200,168,75,0.03); border: 0.5px solid var(--hair); }
.co-completude__bar { flex: 1; height: 2px; background: rgba(200,168,75,0.08); overflow: hidden; }
.co-completude__fill { height: 100%; transition: width .6s var(--ease), background .4s; }
.co-completude__txt { font-family: 'DM Mono', monospace; font-size: 8px; letter-spacing: .2em; color: var(--text3); white-space: nowrap; }

/* ══ SEGID ══ */
.co-segid { display: flex; align-items: flex-start; gap: 12px; padding: 12px 14px; margin-bottom: 16px; background: rgba(200,168,75,0.03); border: 0.5px solid var(--hair); border-left: 2px solid rgba(200,168,75,0.35); }
.co-segid__ico { width: 32px; height: 32px; flex-shrink: 0; border: 0.5px solid var(--hair); display: flex; align-items: center; justify-content: center; color: var(--or); opacity: .7; }
.co-segid__titulo { font-size: 11px; font-weight: 600; color: var(--text2); margin-bottom: 3px; }
.co-segid__desc   { font-size: 10px; color: var(--text3); line-height: 1.55; }

/* ══ FRETE ══ */
.co-frete { margin-top: 18px; }
.co-frete__lista { display: flex; flex-direction: column; gap: 7px; margin-top: 10px; }
.co-frete__op { display: flex; align-items: center; gap: 10px; padding: 11px 13px; background: rgba(200,168,75,0.03); border: 0.5px solid var(--hair); cursor: pointer; transition: all .22s; position: relative; }
.co-frete__op:hover { border-color: rgba(200,168,75,0.25); background: rgba(200,168,75,0.05); }
.co-frete__op.is-sel { border-color: rgba(200,168,75,0.45); background: rgba(200,168,75,0.06); border-left: 2.5px solid var(--or); }
.co-frete__op-info { flex: 1; display: flex; flex-direction: column; gap: 2px; }
.co-frete__op-nome  { display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--text); font-weight: 300; }
.co-frete__op-prazo { font-size: 10px; color: var(--text3); }
.co-frete__op-val   { font-family: 'Noto Serif JP', serif; font-size: .95rem; color: var(--or); }
.co-frete__radio    { width: 13px; height: 13px; border-radius: 50%; border: 0.5px solid rgba(200,168,75,0.25); flex-shrink: 0; transition: all .22s; }
.co-frete__op.is-sel .co-frete__radio { border-color: var(--or); background: var(--or); box-shadow: 0 0 0 3px rgba(200,168,75,0.1); }
.co-frete__vip { display: flex; align-items: center; gap: 7px; font-size: 11px; color: var(--or); background: rgba(200,168,75,0.04); border: 0.5px solid rgba(200,168,75,0.15); padding: 9px 13px; margin-top: 14px; font-family: 'DM Mono', monospace; letter-spacing: .05em; }

/* ══ TABS PAGAMENTO ══ */
.co-tabs { display: flex; gap: 0; margin-bottom: 18px; border: 0.5px solid var(--hair); overflow: hidden; }
.co-tab { flex: 1; display: flex; align-items: center; justify-content: center; gap: 7px; background: rgba(200,168,75,0.02); border: none; border-right: 0.5px solid var(--hair); padding: 11px 8px; font-family: 'DM Mono', monospace; font-size: 8px; letter-spacing: .2em; color: rgba(200,168,75,0.45); cursor: pointer; transition: all .22s; text-transform: uppercase; }
.co-tab:last-child { border-right: none; }
.co-tab:hover  { background: rgba(200,168,75,0.05); color: var(--text2); }
.co-tab.active { background: rgba(200,168,75,0.1); color: var(--or); border-bottom: 2px solid var(--or); }

/* ══ PAY INFO ══ */
.co-pay-info { text-align: center; padding: 22px 18px; background: rgba(200,168,75,0.02); border: 0.5px solid var(--hair); position: relative; margin-bottom: 16px; }
.co-pay-info::before { content: ''; position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 36px; height: 1.5px; background: var(--or); opacity: .4; }
.co-pay-icon { width: 52px; height: 52px; border-radius: 50%; background: rgba(200,168,75,0.07); border: 0.5px solid rgba(200,168,75,0.2); display: flex; align-items: center; justify-content: center; color: var(--or); margin: 0 auto 12px; }
.co-pay-info h3 { font-family: 'Noto Serif JP', serif; font-size: 1rem; font-weight: 300; color: var(--text); margin-bottom: 7px; }
.co-pay-info p  { font-size: 11px; color: var(--text3); margin-bottom: 14px; line-height: 1.6; }
.co-vantagens { display: flex; flex-direction: column; gap: 7px; align-items: center; }
.co-vantagens span { display: flex; align-items: center; gap: 8px; font-size: 11px; color: rgba(245,240,232,0.38); }
.co-gem { font-size: 5px; color: var(--or); opacity: .6; flex-shrink: 0; }

/* ══ ANTIFRAUDE ══ */
.co-antifraude { display: flex; align-items: center; gap: 7px; padding: 8px 13px; margin-bottom: 14px; background: rgba(200,168,75,0.02); border: 0.5px solid rgba(200,168,75,0.1); font-family: 'DM Mono', monospace; font-size: 8.5px; letter-spacing: .1em; color: rgba(200,168,75,0.4); }
.co-antifraude svg { color: var(--or); opacity: .5; flex-shrink: 0; }

/* ══ CARTÃO ══ */
.co-card-preview { display: flex; justify-content: center; margin-bottom: 16px; perspective: 1000px; }
.co-card { width: 100%; max-width: 290px; height: 162px; background: linear-gradient(135deg, #1c0f0f, #08060a); border: 0.5px solid rgba(200,168,75,0.2); border-radius: 3px; padding: 18px; display: flex; flex-direction: column; justify-content: space-between; position: relative; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,.55); transition: transform .5s var(--ease); transform-style: preserve-3d; }
.co-card::before { content: '福'; position: absolute; right: 12px; bottom: 4px; font-family: 'Noto Serif JP', serif; font-size: 52px; color: rgba(200,168,75,0.06); line-height: 1; pointer-events: none; }
.co-card--flip { transform: rotateY(180deg); }
.co-card__front { display: flex; flex-direction: column; height: 100%; }
.co-card__top   { display: flex; justify-content: space-between; align-items: center; }
.co-card__chip  { width: 28px; height: 20px; background: linear-gradient(135deg, #8b6914, #5c4209); border-radius: 2px; opacity: .8; }
.co-card__brand { font-size: 9px; letter-spacing: .15em; color: var(--or); opacity: .55; }
.co-card__num   { font-family: 'DM Mono', monospace; font-size: .95rem; letter-spacing: .2em; color: rgba(245,240,232,0.7); text-align: center; flex: 1; display: flex; align-items: center; justify-content: center; }
.co-card__bottom { display: flex; justify-content: space-between; }
.co-card__lbl   { font-size: 6px; letter-spacing: .2em; color: rgba(245,240,232,0.25); text-transform: uppercase; margin-bottom: 2px; }
.co-card__val   { font-size: 10px; color: rgba(245,240,232,0.65); }
.co-card__back  { position: absolute; inset: 0; background: linear-gradient(135deg, #1c0f0f, #08060a); display: flex; flex-direction: column; align-items: flex-end; justify-content: center; padding: 18px; backface-visibility: hidden; }
.co-card__tarja { position: absolute; top: 28px; left: 0; right: 0; height: 32px; background: rgba(0,0,0,0.7); }
.co-card__cvv-wrap { background: #f5f0e8; color: #0d0a04; padding: 3px 10px; font-family: 'DM Mono', monospace; font-size: 13px; margin-top: 20px; }

.co-bandeiras { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 3px; }
.co-bandeira { background: rgba(200,168,75,0.04); border: 0.5px solid var(--hair); padding: 5px 11px; font-size: 11px; color: var(--text3); cursor: pointer; transition: all .2s; }
.co-bandeira.active { background: rgba(200,168,75,0.12); border-color: rgba(200,168,75,0.45); color: var(--or); font-weight: 600; }
.co-bandeira:hover:not(.active) { border-color: rgba(200,168,75,0.28); color: var(--or); }

.co-radio-group { display: flex; gap: 16px; margin-top: 4px; }
.co-radio { display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--text2); cursor: pointer; }
.co-radio input { accent-color: var(--or); width: 14px; height: 14px; }

/* ══ SELOS ══ */
.co-seals { display: flex; align-items: center; justify-content: center; gap: 18px; margin-top: 14px; flex-wrap: wrap; }
.co-seal { display: flex; align-items: center; gap: 6px; font-family: 'DM Mono', monospace; font-size: 7.5px; letter-spacing: .15em; color: rgba(200,168,75,0.3); text-transform: uppercase; }
.co-seal__dot { width: 4px; height: 4px; background: rgba(200,168,75,0.4); border-radius: 50%; flex-shrink: 0; }

/* ══ BOTÕES ══ */
.btn-gold {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  background: var(--or); color: var(--void);
  font-family: 'DM Mono', monospace; font-size: 8px; font-weight: 700;
  letter-spacing: .42em; padding: 12px 24px;
  border: none; cursor: pointer; text-transform: uppercase;
  transition: all .28s var(--ease); position: relative; overflow: hidden;
}
.btn-gold::before { content: ''; position: absolute; inset: 0; background: var(--or2); transform: scaleX(0); transform-origin: left; transition: transform .45s var(--ease); z-index: 0; }
.btn-gold:hover:not(:disabled)::before { transform: scaleX(1); }
.btn-gold > * { position: relative; z-index: 1; }
.btn-gold:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(200,168,75,0.35); }
.btn-gold:active:not(:disabled) { transform: translateY(0) scale(.98); }
.btn-gold:disabled { opacity: .3; cursor: not-allowed; }
.btn-full { width: 100%; margin-top: 18px; }
.btn-finalizar { min-width: 180px; }

.btn-ghost { display: inline-flex; align-items: center; justify-content: center; gap: 7px; background: transparent; border: 0.5px solid var(--hair); color: var(--text3); font-family: 'DM Mono', monospace; font-size: 8px; letter-spacing: .3em; text-transform: uppercase; padding: 11px 20px; cursor: pointer; transition: all .22s; }
.btn-ghost:hover { border-color: var(--hairH); color: var(--text2); }
.btn-ghost--danger { border-color: rgba(231,76,60,.25); color: rgba(231,76,60,.65); }
.btn-ghost--danger:hover { border-color: var(--red); color: var(--red); }
.btn-sm { padding: 8px 14px; font-size: 7.5px; }

.co-btns { display: flex; justify-content: space-between; align-items: center; margin-top: 20px; gap: 10px; }

.co-erro-form { font-size: 11px; color: var(--red); background: rgba(231,76,60,0.05); border: 0.5px solid rgba(231,76,60,0.18); border-left: 2px solid var(--red); padding: 8px 12px; margin-top: 10px; font-family: 'DM Mono', monospace; }

.co-divider { display: flex; align-items: center; gap: 10px; margin: 6px 0; }
.co-divider::before, .co-divider::after { content: ''; flex: 1; height: 0.5px; background: rgba(200,168,75,0.1); }
.co-divider span { font-size: 7px; letter-spacing: .4em; color: rgba(200,168,75,0.38); text-transform: uppercase; font-family: 'DM Mono', monospace; white-space: nowrap; }

.msg-fade-enter-active, .msg-fade-leave-active { transition: all .22s ease; }
.msg-fade-enter-from, .msg-fade-leave-to { opacity: 0; transform: translateY(-4px); }

/* ══ SPINNER ══ */
.co-spin { width: 15px; height: 15px; border: 2px solid rgba(245,240,232,0.12); border-top-color: var(--text); border-radius: 50%; animation: coSpin .7s linear infinite; display: inline-block; flex-shrink: 0; }
.co-spin--sm { width: 11px; height: 11px; border-width: 1.5px; border-top-color: var(--or); border-color: rgba(200,168,75,0.15); }
@keyframes coSpin { to { transform: rotate(360deg); } }

/* ══ CONFIRMAÇÃO ══ */
.co-confirmacao { display: flex; flex-direction: column; align-items: center; gap: 14px; padding-top: 4px; }
.co-status-ico { width: 68px; height: 68px; border-radius: 50%; display: flex; align-items: center; justify-content: center; animation: coScaleIn .55s var(--ease) both; }
@keyframes coScaleIn { from { transform: scale(0); opacity: 0; } }
.co-status-ico--aprovado { background: rgba(46,204,113,0.1); border: 1px solid rgba(46,204,113,0.25); color: var(--green); }
.co-status-ico--pendente  { background: rgba(200,168,75,0.1); border: 1px solid rgba(200,168,75,0.25); color: var(--or); }
.co-status-ico--cancelado { background: rgba(231,76,60,0.1);  border: 1px solid rgba(231,76,60,0.25);  color: var(--red); }
.co-ped-id { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: .35em; color: var(--text3); text-transform: uppercase; }
.co-ped-id strong { color: var(--or); }

/* ══ COMPROVANTE ══ */
.co-comprovante { width: 100%; max-width: 520px; background: linear-gradient(160deg, #110d05, #08060a); border: 0.5px solid rgba(200,168,75,0.22); padding: 24px; position: relative; }
.co-comprovante::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, var(--or), transparent); opacity: .5; }

.co-comprovante__header  { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
.co-comprovante__marca   { display: flex; align-items: center; gap: 6px; }
.co-comprovante__marca-ico { color: var(--or); opacity: .75; font-size: 13px; }
.co-comprovante__marca-txt { font-family: 'Noto Serif JP', serif; font-size: 13px; font-style: italic; letter-spacing: .12em; color: var(--text); }
.co-comprovante__marca-txt em { color: var(--or); font-style: normal; }
.co-comprovante__meta    { display: flex; flex-direction: column; align-items: flex-end; gap: 2px; }
.co-comprovante__data    { font-family: 'DM Mono', monospace; font-size: 8px; color: var(--text3); }
.co-comprovante__id      { font-family: 'DM Mono', monospace; font-size: 9px; color: var(--or); letter-spacing: .15em; }

.co-comprovante__divider { display: flex; align-items: center; gap: 10px; margin: 12px 0; }
.co-comprovante__divider span { flex: 1; height: 0.5px; background: rgba(200,168,75,0.15); }
.co-comprovante__gem { font-size: 5px; color: var(--or); opacity: .5; flex: none !important; }

.co-comprovante__section { margin-bottom: 12px; }
.co-comprovante__section-title { display: flex; align-items: center; gap: 6px; font-family: 'DM Mono', monospace; font-size: 7px; letter-spacing: .45em; text-transform: uppercase; color: rgba(200,168,75,0.5); margin-bottom: 8px; }
.co-comprovante__row { display: flex; justify-content: space-between; align-items: flex-start; padding: 5px 0; border-bottom: 0.5px solid rgba(200,168,75,0.05); font-size: 11.5px; }
.co-comprovante__row span:first-child { color: var(--text3); flex-shrink: 0; margin-right: 10px; }
.co-comprovante__row span:last-child  { color: var(--text2); text-align: right; }
.co-comprovante__row--desc span { color: var(--green) !important; }
.co-comprovante__row--total { font-family: 'Noto Serif JP', serif; font-size: 1.1rem !important; border-top: 0.5px solid rgba(200,168,75,0.2) !important; border-bottom: none !important; padding-top: 10px !important; margin-top: 4px; }
.co-comprovante__row--total span:last-child { color: var(--or) !important; }
.co-comprovante__row--parc { font-size: 10px !important; }

.co-comprovante__item       { display: flex; justify-content: space-between; align-items: flex-start; padding: 6px 0; border-bottom: 0.5px solid rgba(200,168,75,0.04); }
.co-comprovante__item-info  { display: flex; flex-direction: column; gap: 2px; }
.co-comprovante__item-nome  { font-size: 11.5px; color: var(--text2); }
.co-comprovante__item-qty   { font-size: 9px; color: var(--text3); font-family: 'DM Mono', monospace; }
.co-comprovante__item-val   { font-family: 'Noto Serif JP', serif; font-size: .95rem; color: var(--or); flex-shrink: 0; }

.co-comprovante__totais { margin: 10px 0; padding: 10px 12px; background: rgba(200,168,75,0.025); border: 0.5px solid rgba(200,168,75,0.08); }

.co-comprovante__status { font-family: 'DM Mono', monospace; font-size: 8px; letter-spacing: .15em; text-transform: uppercase; padding: 2px 8px; }
.co-comprovante__status--aprovado { color: var(--green); background: rgba(46,204,113,0.08); }
.co-comprovante__status--pendente  { color: var(--or);   background: rgba(200,168,75,0.08); }
.co-comprovante__status--cancelado { color: var(--red);  background: rgba(231,76,60,0.08); }

.co-comprovante__hash { display: flex; align-items: center; gap: 7px; margin-top: 12px; padding: 8px 10px; background: rgba(200,168,75,0.02); border: 0.5px solid rgba(200,168,75,0.08); font-family: 'DM Mono', monospace; font-size: 8px; color: rgba(200,168,75,0.25); letter-spacing: .1em; }
.co-comprovante__hash svg { color: var(--or); opacity: .35; flex-shrink: 0; }

.co-comprovante__footer { display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 8px; margin-top: 14px; padding-top: 12px; border-top: 0.5px solid rgba(200,168,75,0.1); font-family: 'DM Mono', monospace; font-size: 7px; letter-spacing: .25em; text-transform: uppercase; color: rgba(200,168,75,0.2); }

/* ══ NOTA FISCAL ══ */
.co-nf { width: 100%; margin-top: 14px; background: rgba(255,215,0,0.03); border: 0.5px solid rgba(255,215,0,0.2); border-left: 2px solid rgba(255,215,0,0.4); padding: 14px; }
.co-nf__header { display: flex; align-items: center; gap: 8px; font-family: 'DM Mono', monospace; font-size: 7.5px; letter-spacing: .4em; text-transform: uppercase; color: rgba(255,215,0,0.5); margin-bottom: 10px; }
.co-nf__sim { color: rgba(255,200,0,0.3); font-size: 7px; letter-spacing: .15em; }
.co-nf__body { display: flex; flex-direction: column; gap: 0; }
.co-nf__row { display: flex; justify-content: space-between; align-items: flex-start; padding: 4px 0; border-bottom: 0.5px solid rgba(255,215,0,0.06); font-size: 10.5px; }
.co-nf__row span:first-child { color: rgba(255,215,0,0.35); flex-shrink: 0; margin-right: 10px; font-family: 'DM Mono', monospace; font-size: 9px; }
.co-nf__row span:last-child  { color: rgba(245,240,232,0.5); text-align: right; }
.co-nf__chave { color: rgba(245,240,232,0.2) !important; font-family: 'DM Mono', monospace; font-size: 8px; letter-spacing: .05em; word-break: break-all; }
.co-nf__btn { display: flex; align-items: center; gap: 7px; margin-top: 10px; background: rgba(255,215,0,0.05); border: 0.5px solid rgba(255,215,0,0.2); padding: 7px 12px; color: rgba(255,215,0,0.45); font-family: 'DM Mono', monospace; font-size: 8px; letter-spacing: .2em; text-transform: uppercase; cursor: pointer; transition: all .2s; }
.co-nf__btn:hover { background: rgba(255,215,0,0.1); color: rgba(255,215,0,0.7); }

/* ══ PIX BOX ══ */
.co-pix-box { width: 100%; margin-top: 14px; background: rgba(200,168,75,0.03); border: 0.5px solid rgba(200,168,75,0.15); padding: 18px; display: flex; flex-direction: column; align-items: center; gap: 11px; }
.co-pix-box__titulo { font-family: 'DM Mono', monospace; font-size: 7.5px; letter-spacing: .4em; text-transform: uppercase; color: rgba(200,168,75,0.6); }
.co-qr-wrap { background: #f5f0e8; padding: 10px; border: 0.5px solid rgba(200,168,75,0.2); display: flex; align-items: center; justify-content: center; }
.co-qr-img   { display: block; width: 200px; height: 200px; image-rendering: pixelated; }
.co-qr-canvas { display: block; border-radius: 1px; }
.co-pix-timer { display: flex; align-items: center; gap: 7px; font-family: 'DM Mono', monospace; font-size: 10px; color: var(--or); background: rgba(200,168,75,0.05); border: 0.5px solid rgba(200,168,75,0.15); padding: 7px 14px; width: 100%; justify-content: center; }
.co-pix-timer strong { font-size: 13px; letter-spacing: .08em; }
.co-pix-timer--urgente { border-color: rgba(231,76,60,0.3); color: var(--red); animation: timerPulse 1.5s ease-in-out infinite; }
@keyframes timerPulse { 0%,100%{opacity:1} 50%{opacity:.7} }
.co-pix-copia        { width: 100%; display: flex; flex-direction: column; gap: 6px; }
.co-pix-copia__label { font-family: 'DM Mono', monospace; font-size: 7px; letter-spacing: .4em; color: rgba(200,168,75,0.5); text-transform: uppercase; align-self: flex-start; }
.co-pix-copia__row   { display: flex; gap: 6px; width: 100%; }
.co-pix-copia__input { flex: 1; min-width: 0; background: rgba(200,168,75,0.03); border: 0.5px solid rgba(200,168,75,0.12); padding: 8px 10px; color: rgba(245,240,232,0.32); font-size: 9px; font-family: 'DM Mono', monospace; outline: none; cursor: pointer; }
.co-copiar           { background: var(--or); border: none; padding: 8px 14px; color: var(--void); font-family: 'DM Mono', monospace; font-size: 8px; font-weight: 700; letter-spacing: .2em; cursor: pointer; transition: all .2s; white-space: nowrap; text-transform: uppercase; display: flex; align-items: center; justify-content: center; min-width: 60px; }
.co-copiar:hover     { background: var(--or2); }
.co-pix-aviso        { font-size: 10px; color: rgba(245,240,232,0.2); text-align: center; }
.co-btn-simular      { background: rgba(200,168,75,0.04); border: 0.5px solid rgba(200,168,75,0.14); padding: 8px 14px; color: rgba(245,240,232,0.22); font-size: 10px; cursor: pointer; transition: all .2s; font-family: 'DM Mono', monospace; letter-spacing: .1em; }
.co-btn-simular:hover { background: rgba(200,168,75,0.1); color: rgba(245,240,232,0.45); }

/* ══ APROVADO ══ */
.co-aprovado { width: 100%; background: rgba(46,204,113,0.04); border: 0.5px solid rgba(46,204,113,0.12); border-left: 2px solid rgba(46,204,113,0.4); padding: 14px; display: flex; flex-direction: column; gap: 9px; margin-top: 10px; }
.co-aprovado__linha { display: flex; align-items: center; gap: 8px; font-size: 11.5px; color: rgba(245,240,232,0.4); line-height: 1.5; }
.co-aprovado__linha svg    { color: var(--green); flex-shrink: 0; }
.co-aprovado__linha strong { color: var(--green); }

.co-comprovante__acoes { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; margin-top: 14px; }

/* ══ ASIDE ══ */
.co-aside { padding: 22px 18px; background: rgba(0,0,0,.22); overflow-y: auto; scrollbar-width: thin; scrollbar-color: rgba(200,168,75,0.1) transparent; position: relative; }
.co-aside::after { content: ''; position: absolute; right: 0; top: 0; bottom: 0; width: 1.5px; background: repeating-linear-gradient(to bottom, var(--or) 0, var(--or) 3px, transparent 3px, transparent 10px); opacity: .12; }
.co-aside__titulo { font-family: 'DM Mono', monospace; font-size: 7px; letter-spacing: .5em; text-transform: uppercase; color: rgba(200,168,75,0.5); margin-bottom: 14px; padding-bottom: 10px; border-bottom: 0.5px solid var(--hair); display: flex; align-items: center; gap: 7px; }
.co-aside__itens { display: flex; flex-direction: column; gap: 10px; margin-bottom: 14px; }
.co-aside__item  { display: flex; align-items: center; gap: 9px; }
.co-aside__item-img { position: relative; width: 40px; height: 40px; background: rgba(200,168,75,.04); border: 0.5px solid var(--hair); overflow: hidden; flex-shrink: 0; }
.co-aside__item-img img { width: 100%; height: 100%; object-fit: cover; }
.co-aside__item-qty { position: absolute; top: -3px; right: -3px; background: var(--or); color: var(--void); font-size: 7px; font-weight: 700; width: 14px; height: 14px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
.co-aside__item-nome  { font-size: 10px; color: var(--text3); margin-bottom: 1px; line-height: 1.3; }
.co-aside__item-preco { font-family: 'Noto Serif JP', serif; font-size: 11px; color: var(--or); }
.co-aside__totais { border-top: 0.5px solid var(--hair); padding-top: 10px; }
.co-aside__linha { display: flex; justify-content: space-between; align-items: center; font-family: 'DM Mono', monospace; font-size: 8px; letter-spacing: .2em; text-transform: uppercase; color: rgba(245,240,232,0.22); padding: 5px 0; }
.co-aside__linha--gratis { color: var(--or); }
.co-aside__linha--desc   { color: var(--green); font-size: 8px; }
.co-aside__linha--desc em { font-style: normal; color: rgba(46,204,113,0.6); font-size: 7px; background: rgba(46,204,113,0.07); padding: 1px 5px; }
.co-aside__total { display: flex; justify-content: space-between; align-items: baseline; padding: 10px 0 0; border-top: 0.5px solid rgba(200,168,75,0.15); margin-top: 2px; font-family: 'Noto Serif JP', serif; font-size: 1.15rem; color: var(--text); font-weight: 200; }
.co-aside__total span:first-child { font-family: 'DM Mono', monospace; font-size: 7.5px; letter-spacing: .28em; text-transform: uppercase; color: var(--text3); }
.co-aside__parcela  { font-size: 9px; color: rgba(245,240,232,0.18); text-align: right; margin-top: 3px; }
.co-aside__kanji    { margin-top: 18px; padding-top: 14px; border-top: 0.5px solid rgba(200,168,75,0.06); text-align: center; font-family: 'Noto Serif JP', serif; font-size: 24px; font-weight: 700; color: rgba(200,168,75,0.09); letter-spacing: 10px; display: flex; justify-content: center; gap: 10px; }
.co-aside__kanji-leg { font-size: 6px; letter-spacing: .25em; color: rgba(200,168,75,0.22); text-align: center; margin-top: 5px; font-family: 'DM Mono', monospace; text-transform: uppercase; }
.co-aside__ssl     { display: flex; align-items: center; gap: 6px; margin-top: 12px; padding-top: 10px; border-top: 0.5px solid rgba(200,168,75,0.06); font-family: 'DM Mono', monospace; font-size: 7.5px; color: rgba(245,240,232,0.12); letter-spacing: .05em; }
.co-aside__ssl-dot { width: 5px; height: 5px; background: rgba(200,168,75,0.4); border-radius: 50%; flex-shrink: 0; }

/* ══ MOBILE FOOTER ══ */
.co-mobile-footer { display: none; padding: 11px 20px; background: rgba(6,4,0,.97); border-top: 0.5px solid rgba(200,168,75,0.14); flex-direction: row; align-items: center; justify-content: space-between; gap: 14px; }
.co-mobile-footer__lbl { font-family: 'DM Mono', monospace; font-size: 7px; letter-spacing: .35em; text-transform: uppercase; color: rgba(245,240,232,0.2); display: block; }
.co-mobile-footer__val { font-family: 'Noto Serif JP', serif; font-size: 1.2rem; color: var(--text); }

/* ══ RESPONSIVO ══ */
@media (max-width: 768px) {
  .co-overlay { align-items: flex-end; padding: 0; }
  .co-modal   { max-height: 95vh; border-radius: 4px 4px 0 0; align-self: flex-end; }
  .co-body    { grid-template-columns: 1fr; }
  .co-aside   { display: none; }
  .co-grid-2  { grid-template-columns: 1fr; }
  .co-tabs    { flex-direction: column; }
  .co-mobile-footer { display: flex; }
  .co-btns    { flex-direction: column; }
  .co-btns .btn-ghost { width: 100%; justify-content: center; order: 2; }
  .co-btns .btn-gold  { width: 100%; justify-content: center; }
  .co-header  { padding: 11px 14px; gap: 10px; }
  .co-main    { padding: 18px 14px; padding-bottom: 88px; }
  .co-step__orb { width: 18px; height: 18px; font-size: 7px; }
  .co-card    { max-width: 100%; }
  .co-comprovante { padding: 16px; }
  .co-comprovante__acoes { justify-content: stretch; }
  .co-comprovante__acoes > * { flex: 1; }
}

@media print {
  .co-overlay  { position: static; background: white; padding: 0; }
  .co-modal    { box-shadow: none; border: 1px solid #ccc; max-height: none; }
  .co-header, .co-progress, .co-btns, .co-aside, .co-mobile-footer,
  .co-btn-simular, .co-comprovante__acoes, .co-status-ico { display: none !important; }
  .co-body { grid-template-columns: 1fr; }
  .co-comprovante { border: 1px solid #ccc; background: white; color: #000; }
}
</style>