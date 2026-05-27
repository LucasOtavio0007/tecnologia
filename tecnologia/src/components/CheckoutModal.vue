<template>
  <teleport to="body">
    <div v-if="aberto" class="checkout-overlay" @click.self="fechar" role="dialog" aria-modal="true" aria-label="Checkout">
      <div class="checkout-modal">

        <!-- HEADER -->
        <div class="cm-header">
          <div class="cm-logo">
            <span class="cm-logo-kanji">廉</span>
            <span class="cm-logo-text">{{ $t('n.amp.o') }}</span>
          </div>

          <!-- PROGRESS BAR -->
          <div class="cm-progress-wrap">
            <div class="cm-progress-track">
              <div class="cm-progress-fill" :style="{ width: progressoPct + '%' }"></div>
            </div>
            <div class="cm-steps">
              <button
                v-for="(s, i) in etapasConfig"
                :key="i"
                :class="['cm-step-btn', { ativo: etapa > i, atual: etapa === i+1 }]"
                @click="etapa > i+1 ? etapa = i+1 : null"
                :disabled="etapa <= i"
                :title="s.label"
              >
                <span class="cm-step-num">
                  <svg v-if="etapa > i+1" width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span v-else>{{ i+1 }}</span>
                </span>
                <span class="cm-step-label">{{ s.label }}</span>
              </button>
            </div>
          </div>

          <!-- CONTROLES DE ACESSIBILIDADE -->
          <div class="cm-acessibilidade">
            <select v-model="$i18n.locale" @change="salvarIdioma" class="cm-idio-select">
              <option value="pt-BR">{{ $t('pt') }}</option>
              <option value="en-US">{{ $t('en') }}</option>
            </select>
            <div class="cm-fonte-btns">
              <button class="cm-fonte-btn" :class="{ ativo: site.fonte === 'pequena' }" @click="site.setFonte('pequena')" title="Diminuir fonte">A</button>
              <button class="cm-fonte-btn" :class="{ ativo: site.fonte === 'normal' }" @click="site.setFonte('normal')" title="Fonte normal">A</button>
              <button class="cm-fonte-btn" :class="{ ativo: site.fonte === 'grande' }" @click="site.setFonte('grande')" title="Aumentar fonte">A</button>
            </div>
          </div>

          <button class="cm-close" @click="fechar" aria-label="Fechar">✕</button>
        </div>

        <!-- BODY -->
        <div class="cm-body">

          <!-- COLUNA PRINCIPAL -->
          <div class="cm-main">
            <!-- Kanji decorativo de fundo -->
            <div class="cm-brush-deco" aria-hidden="true">識</div>

            <transition :name="transitionDir" mode="out-in">
              <div :key="etapa">

                <!-- ETAPA 1: CARRINHO -->
                <div v-if="etapa === 1" class="cm-etapa">
                  <div class="cm-etapa-header">
                    <h2 class="cm-titulo">
                      <span class="cm-titulo-num">{{ $t('01') }}</span>
                      {{ $t('carrinho.titulo') }}
                    </h2>
                    <span class="cm-badge">{{ itens.length }} {{ itens.length === 1 ? $t('carrinho.item') : $t('carrinho.itens') }}</span>
                  </div>

                  <div v-if="!itens.length" class="cm-vazio">
                    <div class="cm-vazio-icone">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                        <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                      </svg>
                    </div>
                    <p>{{ $t('carrinho.vazio') }}</p>
                    <button class="btn-lacquer" @click="fechar">{{ $t('carrinho.explorar') }}</button>
                  </div>

                  <div v-else>
                    <TransitionGroup name="item-list" tag="div" class="cm-itens-lista">
                      <div v-for="item in itens" :key="item._id||item.id" class="cm-item">
                        <div class="cm-item-img">
                          <img :src="item.imagem" :alt="item.nome" @error="e=>e.target.style.opacity='0'" loading="lazy" />
                        </div>
                        <div class="cm-item-info">
                          <p class="cm-item-cat">{{ item.categoria }}</p>
                          <p class="cm-item-nome">{{ item.nome }}</p>
                          <div class="cm-qty">
                            <button class="cm-qty-btn" @click="alterarQty(item,-1)" aria-label="Diminuir">−</button>
                            <span class="cm-qty-val">{{ item.qty }}</span>
                            <button class="cm-qty-btn" @click="alterarQty(item,+1)" aria-label="Aumentar">+</button>
                          </div>
                        </div>
                        <div class="cm-item-right">
                          <p class="cm-item-preco">R$ {{ fmt(item.preco * item.qty) }}</p>
                          <button class="cm-remove" @click="remover(item)" aria-label="Remover item">
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </TransitionGroup>

                    <!-- CUPOM -->
                    <div class="cm-cupom-wrap">
                      <div class="cm-cupom-row">
                        <div class="cm-campo cm-campo--inline">
                          <input v-model="cupomCodigo" :placeholder="$t('carrinho.cupomPlaceholder')" class="cm-cupom-input" @keyup.enter="aplicarCupom" :disabled="cupomAplicado" />
                        </div>
                        <button v-if="!cupomAplicado" class="btn-cupom" @click="aplicarCupom" :disabled="salvandoCupom || !cupomCodigo">
                          <span v-if="!salvandoCupom">{{ $t('carrinho.aplicar') }}</span>
                          <span v-else class="spinner spinner--sm"></span>
                        </button>
                        <button v-else class="btn-cupom btn-cupom--remover" @click="removerCupom">{{ $t('carrinho.remover') }}</button>
                      </div>
                      <transition name="fade-msg">
                        <p v-if="cupomMensagem" :class="['cm-cupom-msg', cupomAplicado ? 'cm-cupom-msg--ok' : 'cm-cupom-msg--erro']">{{ cupomMensagem }}</p>
                      </transition>
                    </div>

                    <button class="btn-lacquer btn--full" @click="avancarEtapa(2)">
                      {{ $t('carrinho.continuar') }}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </button>
                  </div>
                </div>

                <!-- ETAPA 2: DADOS -->
                <div v-if="etapa === 2" class="cm-etapa">
                  <div class="cm-etapa-header">
                    <h2 class="cm-titulo"><span class="cm-titulo-num">{{ $t('02') }}</span>{{ $t('dados.titulo') }}</h2>
                  </div>
                  <div class="cm-form">
                    <div class="cm-duplo">
                      <div class="cm-campo" :class="{ 'cm-campo--erro': erros.nome, 'cm-campo--ok': !erros.nome && cliente.nome }">
                        <label>{{ $t('dados.nome') }}</label>
                        <input v-model="cliente.nome" placeholder="Seu nome completo" @blur="validarCampo('nome')" autocomplete="name" />
                        <span class="cm-campo-msg" v-if="erros.nome">{{ erros.nome }}</span>
                      </div>
                      <div class="cm-campo" :class="{ 'cm-campo--erro': erros.cpf, 'cm-campo--ok': !erros.cpf && cliente.cpf.length === 14 }">
                        <label>{{ $t('dados.cpf') }}</label>
                        <input v-model="cliente.cpf" placeholder="000.000.000-00" @input="maskCPF" @blur="validarCampo('cpf')" maxlength="14" inputmode="numeric" />
                        <span class="cm-campo-msg" v-if="erros.cpf">{{ erros.cpf }}</span>
                      </div>
                    </div>
                    <div class="cm-duplo">
                      <div class="cm-campo" :class="{ 'cm-campo--erro': erros.email, 'cm-campo--ok': !erros.email && cliente.email.includes('@') }">
                        <label>{{ $t('dados.email') }}</label>
                        <input v-model="cliente.email" type="email" placeholder="seu@email.com" @blur="validarCampo('email')" autocomplete="email" />
                        <span class="cm-campo-msg" v-if="erros.email">{{ erros.email }}</span>
                      </div>
                      <div class="cm-campo" :class="{ 'cm-campo--erro': erros.telefone, 'cm-campo--ok': !erros.telefone && cliente.telefone.length >= 14 }">
                        <label>{{ $t('dados.telefone') }}</label>
                        <input v-model="cliente.telefone" placeholder="(00) 00000-0000" @input="maskTelefone" @blur="validarCampo('telefone')" maxlength="15" inputmode="tel" />
                        <span class="cm-campo-msg" v-if="erros.telefone">{{ erros.telefone }}</span>
                      </div>
                    </div>
                  </div>
                  <transition name="fade-msg">
                    <p v-if="erroForm" class="cm-erro">⚠ {{ erroForm }}</p>
                  </transition>
                  <div class="cm-btns">
                    <button class="btn-ghost" @click="avancarEtapa(1)">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                      {{ $t('dados.voltar') }}
                    </button>
                    <button class="btn-lacquer" @click="validarDados">
                      {{ $t('dados.continuar') }}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </button>
                  </div>
                </div>

                <!-- ETAPA 3: ENTREGA -->
                <div v-if="etapa === 3" class="cm-etapa">
                  <div class="cm-etapa-header">
                    <h2 class="cm-titulo"><span class="cm-titulo-num">{{ $t('03') }}</span>{{ $t('entrega.titulo') }}</h2>
                  </div>
                  <div class="cm-form">
                    <div class="cm-duplo">
                      <div class="cm-campo" :class="{ 'cm-campo--erro': erros.cep, 'cm-campo--ok': !erros.cep && entrega.cep.length === 9 }">
                        <label>{{ $t('entrega.cep') }}</label>
                        <div class="cm-input-wrap">
                          <input v-model="entrega.cep" placeholder="00000-000" @input="maskCEP" @blur="buscarCEP" maxlength="9" inputmode="numeric" />
                          <span v-if="buscandoCEP" class="cm-input-spinner"><span class="spinner spinner--sm"></span></span>
                        </div>
                        <span class="cm-campo-msg" v-if="erros.cep">{{ erros.cep }}</span>
                      </div>
                      <div class="cm-campo">
                        <label>{{ $t('entrega.estado') }}</label>
                        <input v-model="entrega.estado" placeholder="MG" maxlength="2" style="text-transform:uppercase" />
                      </div>
                    </div>
                    <div class="cm-campo" :class="{ 'cm-campo--erro': erros.endereco, 'cm-campo--ok': !erros.endereco && entrega.endereco }">
                      <label>{{ $t('entrega.endereco') }}</label>
                      <input v-model="entrega.endereco" placeholder="Rua, número, complemento" @blur="validarCampo('endereco')" />
                      <span class="cm-campo-msg" v-if="erros.endereco">{{ erros.endereco }}</span>
                    </div>
                    <div class="cm-campo" :class="{ 'cm-campo--ok': entrega.cidade }">
                      <label>{{ $t('entrega.cidade') }}</label>
                      <input v-model="entrega.cidade" placeholder="Sua cidade" />
                    </div>
                  </div>

                  <div v-if="opcoesEntrega.length" class="cm-frete-wrap">
                    <div class="cm-divider"><span>{{ $t('entrega.opcoesFrete') }}</span></div>
                    <div class="cm-frete-opcoes">
                      <label v-for="op in opcoesEntrega" :key="op.codigo" :class="['cm-frete-op', { selecionado: freteEscolhido === op.codigo }]">
                        <input type="radio" v-model="freteEscolhido" :value="op.codigo" hidden />
                        <div class="cm-frete-op-info">
                          <div class="cm-frete-op-nome">
                            <svg v-if="op.codigo==='expresso'" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                            <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                            {{ op.nome }}
                          </div>
                          <span class="cm-frete-prazo">{{ op.prazo }}</span>
                        </div>
                        <span class="cm-frete-valor">{{ op.valor === 0 ? 'GRÁTIS' : 'R$ ' + fmt(op.valor) }}</span>
                        <span class="cm-frete-radio-indicator"></span>
                      </label>
                    </div>
                  </div>
                  <div v-else-if="entrega.cep.length === 9 && !buscandoCEP" class="cm-frete-vip">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    {{ $t('entrega.freteVip') }}
                  </div>

                  <transition name="fade-msg">
                    <p v-if="erroForm" class="cm-erro">⚠ {{ erroForm }}</p>
                  </transition>
                  <div class="cm-btns">
                    <button class="btn-ghost" @click="avancarEtapa(2)">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                      {{ $t('entrega.voltar') }}
                    </button>
                    <button class="btn-lacquer" @click="validarEntrega">
                      {{ $t('entrega.continuar') }}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </button>
                  </div>
                </div>

                <!-- ETAPA 4: PAGAMENTO -->
                <div v-if="etapa === 4" class="cm-etapa">
                  <div class="cm-etapa-header">
                    <h2 class="cm-titulo"><span class="cm-titulo-num">{{ $t('04') }}</span>{{ $t('pagamento.titulo') }}</h2>
                  </div>
                  <div class="cm-tabs">
                    <button :class="['cm-tab', { ativo: metodoPag==='pix' }]" @click="metodoPag='pix'">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                      {{ $t('pix') }}
                    </button>
                    <button :class="['cm-tab', { ativo: metodoPag==='cartao' }]" @click="metodoPag='cartao'">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                      {{ $t('pagamento.cartao') }}
                    </button>
                    <button :class="['cm-tab', { ativo: metodoPag==='boleto' }]" @click="metodoPag='boleto'">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                      {{ $t('boleto') }}
                    </button>
                  </div>

                  <div v-if="metodoPag==='pix'" key="pix" class="cm-pay-info">
                    <div class="cm-pay-icon cm-pay-icon--pix">
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                    </div>
                    <h3>{{ $t('pagamento.pixTitulo') }}</h3>
                    <p>{{ $t('pagamento.pixDesc') }}</p>
                    <div class="cm-vantagens">
                      <span><span class="cm-van-dot"></span>{{ $t('pagamento.pixVantagem1') }}</span>
                      <span><span class="cm-van-dot"></span>{{ $t('pagamento.pixVantagem2') }}</span>
                      <span><span class="cm-van-dot"></span>{{ $t('pagamento.pixVantagem3') }}</span>
                    </div>
                  </div>

                  <div v-else-if="metodoPag==='cartao'" key="cartao" class="cm-form">
                    <div class="cm-cartao-preview">
                      <div class="cm-cartao" :class="{ 'cm-cartao--virado': cartaoVirado }">
                        <div class="cm-cartao-frente">
                          <div class="cm-cartao-top">
                            <div class="cm-cartao-chip"></div>
                            <div class="cm-cartao-brand">{{ bandeiraCartao }}</div>
                          </div>
                          <p class="cm-cartao-num">{{ cartao.numero || '•••• •••• •••• ••••' }}</p>
                          <div class="cm-cartao-bottom">
                            <div>
                              <p class="cm-cartao-label">{{ $t('titular') }}</p>
                              <p class="cm-cartao-val">{{ cartao.nome || 'SEU NOME' }}</p>
                            </div>
                            <div>
                              <p class="cm-cartao-label">{{ $t('validade') }}</p>
                              <p class="cm-cartao-val">{{ cartao.validade || 'MM/AA' }}</p>
                            </div>
                          </div>
                        </div>
                        <div class="cm-cartao-verso" v-if="cartaoVirado">
                          <div class="cm-cartao-cvv">CVV {{ cartao.cvv || '•••' }}</div>
                        </div>
                      </div>
                    </div>
                    <div class="cm-campo">
                      <label>{{ $t('bandeira') }}</label>
                      <div class="cm-band-btn-group">
                        <button v-for="b in bandeiras" :key="b.id" type="button" :class="['cm-band-btn', { ativo: bandeiraCartao === b.id }]" @click="bandeiraCartao = b.id">{{ b.nome }}</button>
                      </div>
                    </div>
                    <div class="cm-campo">
                      <label>{{ $t('tipo.de.cartao') }}</label>
                      <div class="cm-tipo-group">
                        <label class="cm-radio"><input type="radio" value="credito" v-model="tipoCartao" />{{ $t('credito_1') }}</label>
                        <label class="cm-radio"><input type="radio" value="debito" v-model="tipoCartao" />{{ $t('debito_1') }}</label>
                      </div>
                    </div>
                    <div class="cm-campo" :class="{ 'cm-campo--erro': erros.cartaoNum, 'cm-campo--ok': !erros.cartaoNum && cartao.numero.replace(/\s/g,'').length === 16 }">
                      <label>{{ $t('numero.do.cartao') }}</label>
                      <input v-model="cartao.numero" placeholder="0000 0000 0000 0000" maxlength="19" @input="maskCartao" @blur="validarCampo('cartaoNum')" inputmode="numeric" />
                      <span class="cm-campo-msg" v-if="erros.cartaoNum">{{ erros.cartaoNum }}</span>
                    </div>
                    <div class="cm-campo" :class="{ 'cm-campo--ok': cartao.nome }">
                      <label>{{ $t('nome.no.cartao') }}</label>
                      <input v-model="cartao.nome" placeholder="Nome como no cartão" style="text-transform:uppercase" autocomplete="cc-name" />
                    </div>
                    <div class="cm-duplo">
                      <div class="cm-campo" :class="{ 'cm-campo--erro': erros.cartaoVal, 'cm-campo--ok': !erros.cartaoVal && cartao.validade.length === 5 }">
                        <label>{{ $t('validade') }}</label>
                        <input v-model="cartao.validade" placeholder="MM/AA" maxlength="5" @input="maskValidade" @blur="validarCampo('cartaoVal')" inputmode="numeric" autocomplete="cc-exp" />
                        <span class="cm-campo-msg" v-if="erros.cartaoVal">{{ erros.cartaoVal }}</span>
                      </div>
                      <div class="cm-campo" :class="{ 'cm-campo--ok': cartao.cvv.length >= 3 }">
                        <label>{{ $t('cvv') }}</label>
                        <input v-model="cartao.cvv" placeholder="•••" maxlength="4" type="password" @focus="cartaoVirado=true" @blur="cartaoVirado=false" inputmode="numeric" autocomplete="cc-csc" />
                      </div>
                    </div>
                    <div class="cm-campo">
                      <label>{{ $t('parcelas') }}</label>
                      <select v-model="cartao.parcelas" class="cm-select">
                        <option v-for="p in parcelasDisponiveis" :key="p.n" :value="p.n">{{ p.n }}x de R$ {{ fmt(p.valor) }} {{ p.n===1 ? '(à vista)' : 'sem juros' }}</option>
                      </select>
                    </div>
                  </div>

                  <div v-else key="boleto" class="cm-pay-info">
                    <div class="cm-pay-icon cm-pay-icon--boleto">
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                    </div>
                    <h3>{{ $t('pagamento.boletoTitulo') }}</h3>
                    <p>{{ $t('pagamento.boletoDesc') }}</p>
                    <div class="cm-vantagens">
                      <span><span class="cm-van-dot"></span>{{ $t('pagamento.boletoVantagem1') }}</span>
                      <span><span class="cm-van-dot"></span>{{ $t('pagamento.boletoVantagem2') }}</span>
                      <span style="opacity:.5"><span class="cm-van-dot"></span>{{ $t('pagamento.boletoVantagem3') }}</span>
                    </div>
                  </div>

                  <div class="cm-seguranca">
                    <div class="cm-seguranca-item"><span class="cm-seg-dot"></span><span>{{ $t('ssl.256.bit') }}</span></div>
                    <div class="cm-seguranca-item"><span class="cm-seg-dot"></span><span>{{ $t('criptografia.total') }}</span></div>
                    <div class="cm-seguranca-item"><span class="cm-seg-dot"></span><span>{{ $t('compra.garantida') }}</span></div>
                  </div>

                  <transition name="fade-msg">
                    <p v-if="erroForm" class="cm-erro">⚠ {{ erroForm }}</p>
                  </transition>
                  <div class="cm-btns">
                    <button class="btn-ghost" @click="avancarEtapa(3)">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                      {{ $t('pagamento.voltar') }}
                    </button>
                    <button class="btn-lacquer btn--finalizar" @click="finalizarPedido" :disabled="salvando">
                      <template v-if="!salvando">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                        {{ $t('pagamento.finalizar') }}
                      </template>
                      <span v-else class="spinner"></span>
                    </button>
                  </div>
                </div>

                <!-- ETAPA 5: CONFIRMAÇÃO -->
                <div v-if="etapa === 5 && pedidoCriado" class="cm-etapa cm-confirmacao">
                  <div :class="['cm-status-icone', `cm-status-icone--${pedidoCriado.status}`]">
                    <svg v-if="pedidoCriado.status==='aprovado'" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    <svg v-else width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  </div>
                  <h2 class="cm-titulo cm-titulo--center">
                    <template v-if="pedidoCriado.status==='aprovado'">{{ $t('confirmacao.aprovado') }} 🎉</template>
                    <template v-else-if="pedidoCriado.pagamento.metodo==='pix'">{{ $t('confirmacao.aguardandoPix') }}</template>
                    <template v-else>{{ $t('confirmacao.boletoGerado') }}</template>
                  </h2>
                  <p class="cm-pedido-id">{{ $t('confirmacao.pedido') }} <span>#{{ pedidoCriado._id.slice(-8).toUpperCase() }}</span></p>

                  <div v-if="pedidoCriado.pagamento.metodo==='pix' && pedidoCriado.status==='pendente'" class="cm-pix-box">
                    <p class="cm-pix-label">{{ $t('confirmacao.qrLabel') }}</p>
                    <div class="cm-qr-wrap"><canvas ref="qrCanvas" class="cm-qr-canvas"></canvas></div>
                    <p class="cm-pix-label" style="margin-top:16px">{{ $t('confirmacao.pixCopiar') }}</p>
                    <div class="cm-copia-wrap">
                      <input readonly :value="pedidoCriado.pagamento.pixCopia" class="cm-pix-input" />
                      <button class="cm-copiar" @click="copiarPix">
                        <svg v-if="copiado" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
                        <span v-else>{{ $t('confirmacao.copiar') }}</span>
                      </button>
                    </div>
                    <p class="cm-pix-aviso">{{ $t('confirmacao.pixAviso') }}</p>
                    <button class="btn-simular" @click="simularPagamento">🧪 {{ $t('confirmacao.simular') }}</button>
                  </div>

                  <div v-if="pedidoCriado.pagamento.metodo==='boleto' && pedidoCriado.status==='pendente'" class="cm-pix-box">
                    <p class="cm-pix-label">{{ $t('confirmacao.linhaDigitavel') }}</p>
                    <div class="cm-copia-wrap">
                      <input readonly :value="pedidoCriado.pagamento.boleto" class="cm-pix-input" />
                      <button class="cm-copiar" @click="copiarBoleto">
                        <svg v-if="copiado" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
                        <span v-else>{{ $t('confirmacao.copiar') }}</span>
                      </button>
                    </div>
                    <p class="cm-pix-aviso">{{ $t('confirmacao.boletoAviso') }}</p>
                    <button class="btn-simular" @click="simularPagamento">🧪 {{ $t('confirmacao.simular') }}</button>
                  </div>

                  <div v-if="pedidoCriado.status==='aprovado'" class="cm-aprovado">
                    <div class="cm-aprovado-linha">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                      {{ $t('confirmacao.envioEmail') }} <strong>{{ pedidoCriado.cliente.email }}</strong>
                    </div>
                    <div class="cm-aprovado-linha">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      {{ $t('confirmacao.prazoEntrega') }}
                    </div>
                  </div>

                  <button class="btn-lacquer btn--full" style="margin-top:8px" @click="fecharELimpar">{{ $t('confirmacao.fechar') }}</button>
                </div>

              </div>
            </transition>
          </div>

          <!-- ASIDE: RESUMO STICKY -->
          <aside class="cm-aside" v-if="etapa < 5">
            <h3 class="cm-aside-titulo">{{ $t('resumo.titulo') }}</h3>
            <div v-if="carregandoResumo" class="cm-skeleton-wrap"></div>
            <div v-else class="cm-aside-itens">
              <div v-for="item in itens" :key="item._id||item.id" class="cm-aside-item">
                <div class="cm-aside-img">
                  <img :src="item.imagem" :alt="item.nome" @error="e=>e.target.style.opacity='0'" loading="lazy" />
                  <span class="cm-aside-qty">{{ item.qty }}</span>
                </div>
                <div>
                  <p class="cm-aside-nome">{{ item.nome }}</p>
                  <p class="cm-aside-preco">R$ {{ fmt(item.preco * item.qty) }}</p>
                </div>
              </div>
            </div>
            <div class="cm-aside-totais">
              <div class="cm-aside-linha"><span>{{ $t('resumo.subtotal') }}</span><span>R$ {{ fmt(subtotal) }}</span></div>
              <div v-if="desconto > 0" class="cm-aside-linha cm-aside-linha--desconto cm-fade-in"><span>{{ $t('resumo.desconto') }} <em>{{ cupomCodigo }}</em></span><span>− R$ {{ fmt(desconto) }}</span></div>
              <div class="cm-aside-linha" :class="freteValor === 0 ? 'cm-aside-linha--gratis' : ''"><span>{{ $t('resumo.frete') }}</span><span>{{ freteValor === 0 ? $t('resumo.gratis') : 'R$ ' + fmt(freteValor) }}</span></div>
              <div class="cm-aside-total"><span>{{ $t('resumo.total') }}</span><span>R$ {{ fmt(total) }}</span></div>
              <div v-if="metodoPag==='cartao' && cartao.parcelas > 1" class="cm-aside-parcela">
                {{ cartao.parcelas }}x de R$ {{ fmt(Math.ceil(total / cartao.parcelas)) }} sem juros
              </div>
            </div>

            <!-- KANJI DECORATIVO DO ASIDE -->
            <div class="cm-aside-kanji" aria-hidden="true">
              <span>誠</span>
              <span>信</span>
            </div>
            <p class="cm-aside-kanji-legenda">SINCERIDADE · CONFIANÇA</p>

            <div class="cm-ssl">
              <span class="cm-ssl-dot"></span>
              <span>{{ $t('pagamento.100.seguro.ssl.256.bit') }}</span>
            </div>
          </aside>

        </div>

        <!-- MOBILE FOOTER -->
        <div class="cm-mobile-footer" v-if="etapa < 5 && itens.length">
          <div class="cm-mobile-total">
            <span class="cm-mobile-label">{{ $t('total_1') }}</span>
            <span class="cm-mobile-valor">R$ {{ fmt(total) }}</span>
          </div>
          <button class="btn-lacquer btn--mobile-acao" @click="acaoMobilePrimaria" :disabled="salvando">
            <span v-if="!salvando">{{ labelMobileBtn }}</span>
            <span v-else class="spinner spinner--sm"></span>
          </button>
        </div>

      </div>
    </div>
  </teleport>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import QRCode from 'qrcode'
import api from '@/api.js'
import { useAuthStore } from '@/stores/auth.js'
import { useSiteStore } from '@/stores/site.js'

const auth = useAuthStore()
const site = useSiteStore()
const { t, locale } = useI18n()

function salvarIdioma() {
  localStorage.setItem('noir_locale', locale.value)
}

// ─── STATE ───────────────────────────────────────────────────────────────────
const aberto            = ref(false)
const etapa             = ref(1)
const transitionDir     = ref('slide-next')
const metodoPag         = ref('pix')
const salvando          = ref(false)
const erroForm          = ref('')
const itens             = ref([])
const pedidoCriado      = ref(null)
const copiado           = ref(false)
const qrCanvas          = ref(null)
const cartaoVirado      = ref(false)
const carregandoResumo  = ref(false)
const buscandoCEP       = ref(false)

const cupomCodigo       = ref('')
const cupomAplicado     = ref(false)
const cupomMensagem     = ref('')
const salvandoCupom     = ref(false)
const desconto          = ref(0)

const opcoesEntrega     = ref([])
const freteEscolhido    = ref('')
const freteValor        = ref(0)

const erros = ref({
  nome: '', email: '', cpf: '', telefone: '',
  cep: '', endereco: '',
  cartaoNum: '', cartaoVal: ''
})

const cliente     = ref({ nome: '', email: '', cpf: '', telefone: '' })
const entrega     = ref({ cep: '', endereco: '', cidade: '', estado: '' })
const cartao      = ref({ numero: '', nome: '', validade: '', cvv: '', parcelas: 1 })
const localizacao = ref({ lat: null, lng: null })

const bandeiraCartao = ref('visa')
const tipoCartao     = ref('credito')

const bandeiras = [
  { id: 'visa',      nome: 'Visa',            regex: /^4/,                                                                                                maxLength: 16 },
  { id: 'mastercard',nome: 'Mastercard',       regex: /^5[1-5]/,                                                                                          maxLength: 16 },
  { id: 'amex',      nome: 'Amex',            regex: /^3[47]/,                                                                                           maxLength: 15 },
  { id: 'elo',       nome: 'Elo',             regex: /^(4011|4312|4389|4514|4576|5046|5067|5090|6277|6362|6363|6504|6505|6506|6507|6509|6516)/,         maxLength: 16 },
  { id: 'hipercard', nome: 'Hipercard',        regex: /^(6062|3841)/,                                                                                     maxLength: 16 },
]

function detectarBandeira(numero) {
  const numLimpo = numero.replace(/\s/g, '')
  const b = bandeiras.find(b => b.regex.test(numLimpo))
  if (b) bandeiraCartao.value = b.id
}

const etapasConfig = [
  { label: 'Carrinho' },
  { label: 'Dados' },
  { label: 'Entrega' },
  { label: 'Pagamento' },
  { label: 'Confirmação' },
]

// ─── COMPUTED ────────────────────────────────────────────────────────────────
const subtotal            = computed(() => itens.value.reduce((s, i) => s + i.preco * i.qty, 0))
const total               = computed(() => Math.max(0, subtotal.value - desconto.value + freteValor.value))
const progressoPct        = computed(() => ((etapa.value - 1) / (etapasConfig.length - 1)) * 100)
const parcelasDisponiveis = computed(() =>
  Array.from({ length: 12 }, (_, i) => ({ n: i + 1, valor: Math.ceil(total.value / (i + 1)) }))
)
const labelMobileBtn = computed(() => {
  const labels = { 1: 'CONTINUAR', 2: 'CONTINUAR', 3: 'CONTINUAR', 4: 'FINALIZAR' }
  return labels[etapa.value] || ''
})

// ─── WATCHERS ────────────────────────────────────────────────────────────────
watch(freteEscolhido, (cod) => {
  const op = opcoesEntrega.value.find(o => o.codigo === cod)
  freteValor.value = op ? op.valor : 0
})
watch(metodoPag, (val) => {
  try { localStorage.setItem('no_metodo_pag', val) } catch {}
})

// ─── GEOLOCALIZAÇÃO ──────────────────────────────────────────────────────────
const obterLocalizacao = () => {
  if (!navigator.geolocation) return
  navigator.geolocation.getCurrentPosition(
    (pos) => { localizacao.value = { lat: pos.coords.latitude, lng: pos.coords.longitude } },
    (err) => console.warn('Geolocation:', err.message),
    { enableHighAccuracy: true, timeout: 5000 }
  )
}

// ─── HANDLER DO EVENTO ───────────────────────────────────────────────────────
const onAbrirCheckout = (e) => {
  itens.value        = e.detail || window.__noirCarrinho || []
  etapa.value        = 1
  erroForm.value     = ''
  pedidoCriado.value = null
  cupomAplicado.value  = false
  cupomCodigo.value    = ''
  cupomMensagem.value  = ''
  desconto.value       = 0
  freteValor.value     = 0
  opcoesEntrega.value  = []

  if (auth.user) {
    cliente.value.nome     = `${auth.user.nome} ${auth.user.sobrenome || ''}`.trim()
    cliente.value.email    = auth.user.email
    cliente.value.telefone = auth.user.telefone || ''
    entrega.value.cep      = auth.user.cep      || ''
    entrega.value.cidade   = auth.user.cidade   || ''
    entrega.value.endereco = auth.user.endereco || ''
    entrega.value.estado   = auth.user.estado   || ''
  } else {
    try {
      const saved    = JSON.parse(localStorage.getItem('no_cliente') || '{}')
      if (saved.email) cliente.value = { ...cliente.value, ...saved }
      const savedEnd = JSON.parse(localStorage.getItem('no_entrega') || '{}')
      if (savedEnd.cep) entrega.value = { ...entrega.value, ...savedEnd }
      const savedMetodo = localStorage.getItem('no_metodo_pag')
      if (savedMetodo) metodoPag.value = savedMetodo
    } catch {}
  }

  obterLocalizacao()
  aberto.value = true
  document.body.style.overflow = 'hidden'
}

const onKeyDown = (e) => {
  if (e.key === 'Escape' && aberto.value) fechar()
}

onMounted(() => {
  window.addEventListener('abrir-checkout', onAbrirCheckout)
  window.addEventListener('keydown', onKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('abrir-checkout', onAbrirCheckout)
  window.removeEventListener('keydown', onKeyDown)
})

// ─── NAVEGAÇÃO ───────────────────────────────────────────────────────────────
const avancarEtapa = (nova) => {
  transitionDir.value = nova > etapa.value ? 'slide-next' : 'slide-prev'
  etapa.value  = nova
  erroForm.value = ''
}
const acaoMobilePrimaria = () => {
  if      (etapa.value === 1) avancarEtapa(2)
  else if (etapa.value === 2) validarDados()
  else if (etapa.value === 3) validarEntrega()
  else if (etapa.value === 4) finalizarPedido()
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const fmt = (v) => (v || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })
const fechar = () => { aberto.value = false; document.body.style.overflow = '' }
const fecharELimpar = () => {
  fechar()
  window.dispatchEvent(new CustomEvent('carrinho-limpo'))
  itens.value        = []
  pedidoCriado.value = null
  etapa.value        = 1
}

// ─── ITENS ───────────────────────────────────────────────────────────────────
const alterarQty = (item, d) => {
  item.qty += d
  if (item.qty <= 0) remover(item)
}
const remover = (item) => {
  itens.value = itens.value.filter(i => (i._id || i.id) !== (item._id || item.id))
}

// ─── CUPOM ───────────────────────────────────────────────────────────────────
const aplicarCupom = async () => {
  if (!cupomCodigo.value.trim()) return
  salvandoCupom.value = true
  cupomMensagem.value = ''
  try {
    const { data } = await api.post('/cupom/validar', { codigo: cupomCodigo.value.trim().toUpperCase() })
    desconto.value      = data.desconto || 0
    cupomAplicado.value = true
    cupomMensagem.value = `✓ Cupom aplicado! Desconto de R$ ${fmt(data.desconto)}`
  } catch (e) {
    cupomMensagem.value = e.response?.data?.msg || 'Cupom inválido ou expirado.'
    cupomAplicado.value = false
    desconto.value      = 0
  } finally { salvandoCupom.value = false }
}
const removerCupom = () => {
  cupomCodigo.value   = ''
  cupomAplicado.value = false
  cupomMensagem.value = ''
  desconto.value      = 0
}

// ─── MÁSCARAS ────────────────────────────────────────────────────────────────
const maskCPF = () => {
  let v = cliente.value.cpf.replace(/\D/g, '').slice(0, 11)
  v = v.replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2')
  cliente.value.cpf = v
}
const maskCEP = () => {
  let v = entrega.value.cep.replace(/\D/g, '').slice(0, 8)
  if (v.length > 5) v = v.replace(/(\d{5})(\d)/, '$1-$2')
  entrega.value.cep = v
}
const maskCartao = () => {
  let v = cartao.value.numero.replace(/\D/g, '').slice(0, 16)
  v = v.replace(/(\d{4})/g, '$1 ').trim()
  cartao.value.numero = v
  detectarBandeira(v)
}
const maskValidade = () => {
  let v = cartao.value.validade.replace(/\D/g, '').slice(0, 4)
  if (v.length > 2) v = v.replace(/(\d{2})(\d)/, '$1/$2')
  cartao.value.validade = v
}
const maskTelefone = () => {
  let v = cliente.value.telefone.replace(/\D/g, '').slice(0, 11)
  if      (v.length > 10) v = v.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  else if (v.length > 6)  v = v.replace(/(\d{2})(\d{4})(\d)/,    '($1) $2-$3')
  else if (v.length > 2)  v = v.replace(/(\d{2})(\d)/,            '($1) $2')
  cliente.value.telefone = v
}

// ─── VALIDAÇÃO ───────────────────────────────────────────────────────────────
const validarCampo = (campo) => {
  switch (campo) {
    case 'nome':      erros.value.nome      = cliente.value.nome.trim().length < 3 ? 'Nome muito curto.' : ''; break
    case 'email':     erros.value.email     = !cliente.value.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) ? 'E-mail inválido.' : ''; break
    case 'cpf':       erros.value.cpf       = cliente.value.cpf.length < 14 ? 'CPF inválido.' : ''; break
    case 'telefone':  erros.value.telefone  = cliente.value.telefone.replace(/\D/g,'').length < 10 ? 'Telefone inválido.' : ''; break
    case 'cep':       erros.value.cep       = entrega.value.cep.length < 9 ? 'CEP inválido.' : ''; break
    case 'endereco':  erros.value.endereco  = !entrega.value.endereco.trim() ? 'Endereço obrigatório.' : ''; break
    case 'cartaoNum': erros.value.cartaoNum = cartao.value.numero.replace(/\s/g,'').length < 16 ? 'Número inválido.' : ''; break
    case 'cartaoVal': erros.value.cartaoVal = cartao.value.validade.length < 5 ? 'Validade inválida.' : ''; break
  }
}
const validarDados = () => {
  erroForm.value = ''
  ;['nome','email','cpf','telefone'].forEach(validarCampo)
  if (Object.entries(erros.value).filter(([k]) => ['nome','email','cpf','telefone'].includes(k)).some(([,v]) => v)) {
    erroForm.value = 'Corrija os campos destacados.'
    return
  }
  try { localStorage.setItem('no_cliente', JSON.stringify(cliente.value)) } catch {}
  avancarEtapa(3)
}
const validarEntrega = () => {
  erroForm.value = ''
  ;['cep','endereco'].forEach(validarCampo)
  if (erros.value.cep || erros.value.endereco) { erroForm.value = 'Corrija os campos destacados.'; return }
  if (!entrega.value.cidade) { erroForm.value = 'Informe a cidade.'; return }
  try { localStorage.setItem('no_entrega', JSON.stringify(entrega.value)) } catch {}
  avancarEtapa(4)
}

// ─── CEP / FRETE ─────────────────────────────────────────────────────────────
const buscarCEP = async () => {
  const cep = entrega.value.cep.replace(/\D/g, '')
  if (cep.length !== 8) return
  buscandoCEP.value = true
  try {
    const res  = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    const data = await res.json()
    if (!data.erro) {
      entrega.value.endereco = `${data.logradouro}${data.bairro ? ', ' + data.bairro : ''}`
      entrega.value.cidade   = data.localidade
      entrega.value.estado   = data.uf
      erros.value.cep        = ''
      calcularFrete(cep)
    } else { erros.value.cep = 'CEP não encontrado.' }
  } catch { erros.value.cep = 'Erro ao buscar CEP.' }
  finally  { buscandoCEP.value = false }
}
const calcularFrete = async (cep) => {
  try {
    const { data } = await api.post('/frete/calcular', {
      cep,
      itens: itens.value.map(i => ({ produto: i._id || i.id, qty: i.qty }))
    })
    if (data.opcoes?.length) {
      opcoesEntrega.value  = data.opcoes
      freteEscolhido.value = data.opcoes[0].codigo
    }
  } catch { opcoesEntrega.value = []; freteValor.value = 0 }
}

// ─── PEDIDO ──────────────────────────────────────────────────────────────────
const finalizarPedido = async () => {
  erroForm.value = ''
  if (metodoPag.value === 'cartao') {
    if (tipoCartao.value === 'debito' && cartao.value.parcelas > 1) {
      erroForm.value = 'Cartão de débito não permite parcelamento. Selecione crédito ou 1x.'
      return
    }
    ;['cartaoNum','cartaoVal'].forEach(validarCampo)
    if (!cartao.value.nome.trim())            { erroForm.value = 'Nome no cartão é obrigatório.'; return }
    if (cartao.value.cvv.length < 3)          { erroForm.value = 'CVV inválido.'; return }
    if (erros.value.cartaoNum || erros.value.cartaoVal) { erroForm.value = 'Verifique os dados do cartão.'; return }
  }
  salvando.value = true
  try {
    const payload = {
      itens: itens.value.map(i => ({ produto: i._id || i.id, qty: i.qty })),
      pagamento: {
        metodo: metodoPag.value,
        parcelas: cartao.value.parcelas,
        cartao: metodoPag.value === 'cartao' ? {
          numero:   cartao.value.numero.replace(/\s/g,''),
          nome:     cartao.value.nome,
          validade: cartao.value.validade,
          cvv:      cartao.value.cvv,
          bandeira: bandeiraCartao.value,
          tipo:     tipoCartao.value,
        } : undefined
      },
      cliente:    cliente.value,
      entrega:    entrega.value,
      cupom:      cupomAplicado.value ? cupomCodigo.value : undefined,
      frete:      freteEscolhido.value || undefined,
      localizacao: localizacao.value,
    }
    const { data } = await api.post('/pedidos', payload)
    pedidoCriado.value = data.pedido
    avancarEtapa(5)
    if (data.pedido.pagamento.metodo === 'pix' && data.pedido.status === 'pendente') {
      await nextTick()
      await gerarQRCode(data.pedido.pagamento.pixCopia)
    }
  } catch (e) {
    erroForm.value = e.response?.data?.msg || e.response?.data?.message || `Erro ${e.response?.status || ''}: Tente novamente.`
  } finally {
    salvando.value = false
  }
}

// ─── QR / CLIPBOARD ──────────────────────────────────────────────────────────
const gerarQRCode = async (texto) => {
  await nextTick()
  if (!qrCanvas.value) return
  try {
    await QRCode.toCanvas(qrCanvas.value, texto, {
      width: 200, margin: 2,
      color: { dark: '#8b1a1a', light: '#0d0a04' }
    })
  } catch (e) { console.error('QR Code error:', e) }
}
const copiarPix = () => {
  navigator.clipboard.writeText(pedidoCriado.value.pagamento.pixCopia)
  copiado.value = true
  setTimeout(() => { copiado.value = false }, 2000)
}
const copiarBoleto = () => {
  navigator.clipboard.writeText(pedidoCriado.value.pagamento.boleto)
  copiado.value = true
  setTimeout(() => { copiado.value = false }, 2000)
}
const simularPagamento = async () => {
  try {
    const { data } = await api.patch(`/pedidos/${pedidoCriado.value._id}/confirmar`)
    pedidoCriado.value = data.pedido
  } catch (e) { console.error(e) }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@200;300;400;700&family=Noto+Sans+JP:wght@300;400;500&display=swap');

/* ─── RESET ──────────────────────────────────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

/* ─── VARIÁVEIS ORIENTAIS ────────────────────────────────────────────────── */
:root {
  --tinta:         #0d0a04;
  --tinta-fundo:   #060400;
  --lacre:         #8b1a1a;
  --lacre-vivo:    #c0392b;
  --lacre-dim:     rgba(139,26,26,0.15);
  --ouro-queimado: #c9a84c;
  --ouro-dim:      rgba(201,168,76,0.12);
  --sepia:         #6b5c3e;
  --sepia-luz:     rgba(107,92,62,0.3);
  --arroz:         #f5f0e8;
  --arroz-suave:   #ede8dc;
  --neve:          rgba(245,240,232,0.06);
  --bruma:         rgba(245,240,232,0.1);
}

/* ─── OVERLAY ────────────────────────────────────────────────────────────── */
.checkout-overlay {
  position: fixed; inset: 0; z-index: 9500;
  background: rgba(0,0,0,.92);
  backdrop-filter: blur(20px);
  display: flex; align-items: center; justify-content: center;
  padding: 16px;
}

/* ─── MODAL ──────────────────────────────────────────────────────────────── */
.checkout-modal {
  background: linear-gradient(160deg, #110d05 0%, var(--tinta-fundo) 100%);
  border: 1px solid var(--sepia-luz);
  border-radius: 4px;
  width: 100%; max-width: 1000px;
  max-height: 92vh;
  overflow: hidden;
  display: flex; flex-direction: column;
  box-shadow:
    0 60px 120px rgba(0,0,0,.9),
    0 0 0 1px rgba(139,26,26,0.06) inset;
  animation: popIn .45s cubic-bezier(.19,1,.22,1);
  position: relative;
}
/* Linha de lacre no topo */
.checkout-modal::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, transparent, var(--lacre), transparent);
  opacity: 0.6; z-index: 1;
}

@keyframes popIn {
  from { opacity: 0; transform: scale(.96) translateY(16px); }
}

/* ─── HEADER ─────────────────────────────────────────────────────────────── */
.cm-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 24px;
  border-bottom: 1px solid rgba(107,92,62,0.18);
  flex-shrink: 0; gap: 16px;
  background: rgba(0,0,0,.25);
  position: relative;
}
/* linha de ouro sutil na borda inferior do header */
.cm-header::after {
  content: '';
  position: absolute; bottom: -1px; left: 24px; right: 24px; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(201,168,76,0.25), transparent);
}

/* LOGO */
.cm-logo {
  display: flex; align-items: center; gap: 8px; flex-shrink: 0;
}
.cm-logo-kanji {
  font-family: 'Noto Serif JP', serif;
  font-size: 1.4rem; font-weight: 700;
  color: var(--lacre);
  line-height: 1; opacity: 0.85;
}
.cm-logo-text {
  font-family: 'Noto Serif JP', serif;
  font-size: 0.85rem; font-weight: 200;
  color: var(--ouro-queimado);
  letter-spacing: 7px;
}

/* PROGRESS */
.cm-progress-wrap { flex: 1; display: flex; flex-direction: column; gap: 10px; }
.cm-progress-track {
  height: 1px; background: rgba(107,92,62,0.15);
  position: relative; overflow: visible;
}
.cm-progress-fill {
  height: 100%; background: var(--lacre);
  position: absolute; top: 0; left: 0;
  transition: width .5s cubic-bezier(.4,0,.2,1);
  box-shadow: 0 0 6px rgba(139,26,26,0.5);
}

.cm-steps {
  display: flex; align-items: center; justify-content: space-between; gap: 4px;
}
.cm-step-btn {
  display: flex; align-items: center; gap: 6px;
  background: none; border: none; cursor: default;
  transition: all .3s; opacity: .3;
}
.cm-step-btn.ativo  { opacity: .6; cursor: pointer; }
.cm-step-btn.atual  { opacity: 1; }
.cm-step-btn:not(:disabled):hover { cursor: pointer; }

.cm-step-num {
  width: 20px; height: 20px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 8px; font-weight: 500;
  background: rgba(107,92,62,0.06);
  border: 1px solid rgba(107,92,62,0.25);
  color: var(--sepia); transition: all .3s; flex-shrink: 0;
}
.cm-step-btn.ativo .cm-step-num {
  background: rgba(139,26,26,0.12);
  border-color: var(--lacre);
  color: var(--lacre);
}
.cm-step-btn.atual .cm-step-num {
  background: var(--lacre);
  border-color: var(--lacre);
  color: var(--arroz); font-weight: 700;
  box-shadow: 0 0 10px rgba(139,26,26,0.4);
}
.cm-step-label {
  font-family: 'Noto Sans JP', sans-serif; font-size: 8px;
  letter-spacing: 2px; text-transform: uppercase; color: var(--sepia);
  transition: color .3s;
}
.cm-step-btn.ativo .cm-step-label { color: rgba(139,26,26,0.7); }
.cm-step-btn.atual .cm-step-label { color: var(--arroz); }

/* FECHAR */
.cm-close {
  background: none; border: 1px solid rgba(107,92,62,0.25);
  border-radius: 50%; width: 28px; height: 28px;
  color: rgba(245,240,232,0.25); cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  font-size: 10px; transition: all .25s; flex-shrink: 0;
}
.cm-close:hover { border-color: var(--lacre); color: var(--lacre); transform: rotate(90deg); }

/* ─── BODY ───────────────────────────────────────────────────────────────── */
.cm-body {
  display: grid; grid-template-columns: 1fr 290px;
  flex: 1; overflow: hidden;
}

/* ─── MAIN ───────────────────────────────────────────────────────────────── */
.cm-main {
  padding: 28px; overflow-y: auto;
  border-right: 1px solid rgba(107,92,62,0.1);
  scrollbar-width: thin;
  scrollbar-color: rgba(107,92,62,0.2) transparent;
  position: relative;
}
.cm-main::-webkit-scrollbar { width: 3px; }
.cm-main::-webkit-scrollbar-thumb { background: rgba(107,92,62,0.2); border-radius: 0; }

/* KANJI DECORATIVO DE FUNDO */
.cm-brush-deco {
  position: absolute; right: 18px; top: 16px;
  font-family: 'Noto Serif JP', serif;
  font-size: 110px; font-weight: 700;
  color: rgba(245,240,232,0.025);
  line-height: 1; user-select: none; pointer-events: none;
  writing-mode: vertical-rl;
}

/* ─── TRANSIÇÕES ─────────────────────────────────────────────────────────── */
.slide-next-enter-active, .slide-next-leave-active,
.slide-prev-enter-active,  .slide-prev-leave-active {
  transition: all .35s cubic-bezier(.4,0,.2,1);
}
.slide-next-enter-from  { opacity: 0; transform: translateX(36px); }
.slide-next-leave-to    { opacity: 0; transform: translateX(-36px); }
.slide-prev-enter-from  { opacity: 0; transform: translateX(-36px); }
.slide-prev-leave-to    { opacity: 0; transform: translateX(36px); }

.fade-msg-enter-active, .fade-msg-leave-active { transition: all .25s ease; }
.fade-msg-enter-from, .fade-msg-leave-to { opacity: 0; transform: translateY(-4px); }

.item-list-enter-active, .item-list-leave-active { transition: all .3s ease; }
.item-list-enter-from   { opacity: 0; transform: translateY(-10px); }
.item-list-leave-to     { opacity: 0; transform: translateX(20px); height: 0; }

/* ─── ETAPA ──────────────────────────────────────────────────────────────── */
.cm-etapa { min-height: 0; }
.cm-etapa-header {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 22px; padding-bottom: 14px;
  border-bottom: 1px solid rgba(107,92,62,0.14);
  position: relative;
}
/* linha de lacre curta no underline */
.cm-etapa-header::after {
  content: '';
  position: absolute; bottom: -1px; left: 0; width: 50px; height: 1px;
  background: var(--lacre); opacity: 0.65;
}

.cm-titulo {
  font-family: 'Noto Serif JP', serif;
  font-size: 1.45rem; font-weight: 200; color: var(--arroz);
  display: flex; align-items: center; gap: 10px;
}
.cm-titulo--center { text-align: center; justify-content: center; }
.cm-titulo-num {
  font-size: .7rem; font-weight: 300; letter-spacing: 2px;
  color: var(--lacre); opacity: .7;
  font-family: 'Noto Sans JP', sans-serif;
}

.cm-badge {
  font-family: 'Noto Sans JP', sans-serif; font-size: 8px;
  letter-spacing: 3px; text-transform: uppercase;
  color: var(--ouro-queimado);
  background: var(--ouro-dim);
  border: 1px solid rgba(201,168,76,0.2);
  padding: 4px 10px; border-radius: 1px;
}

/* ─── ITENS ──────────────────────────────────────────────────────────────── */
.cm-itens-lista { display: flex; flex-direction: column; }
.cm-item {
  display: grid; grid-template-columns: 70px 1fr auto;
  gap: 14px; padding: 14px 0;
  border-bottom: 1px solid rgba(107,92,62,0.1);
  transition: background .2s;
}
.cm-item:hover { background: rgba(107,92,62,0.03); margin: 0 -8px; padding-left: 8px; padding-right: 8px; }

.cm-item-img {
  width: 70px; height: 70px; border-radius: 2px;
  overflow: hidden; background: rgba(107,92,62,0.08);
  border: 1px solid rgba(107,92,62,0.18); flex-shrink: 0;
}
.cm-item-img img { width: 100%; height: 100%; object-fit: cover; }

.cm-item-cat {
  font-size: 7px; letter-spacing: 4px; color: var(--lacre);
  text-transform: uppercase; margin-bottom: 4px;
  font-family: 'Noto Sans JP', sans-serif;
}
.cm-item-nome { font-size: 12px; color: var(--arroz); font-weight: 300; line-height: 1.4; }

.cm-qty { display: flex; align-items: center; gap: 8px; margin-top: 8px; }
.cm-qty-btn {
  background: rgba(107,92,62,0.08); border: 1px solid rgba(107,92,62,0.22);
  border-radius: 1px; color: var(--arroz-suave);
  width: 24px; height: 24px; cursor: pointer;
  font-size: 14px; display: flex; align-items: center; justify-content: center;
  transition: all .2s;
}
.cm-qty-btn:hover { background: var(--lacre); border-color: var(--lacre); color: var(--arroz); }
.cm-qty-val { font-size: 12px; min-width: 16px; text-align: center; color: var(--arroz); }

.cm-item-right { display: flex; flex-direction: column; align-items: flex-end; gap: 8px; }
.cm-item-preco { font-family: 'Noto Serif JP', serif; font-size: 1rem; color: var(--ouro-queimado); }
.cm-remove {
  background: none; border: 1px solid rgba(107,92,62,0.15);
  border-radius: 1px; color: rgba(245,240,232,0.18);
  width: 24px; height: 24px; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: all .2s;
}
.cm-remove:hover { border-color: var(--lacre); color: var(--lacre); background: rgba(139,26,26,0.07); }

/* ─── VAZIO ──────────────────────────────────────────────────────────────── */
.cm-vazio {
  text-align: center; padding: 40px 0;
  display: flex; flex-direction: column; align-items: center;
  gap: 16px; color: rgba(245,240,232,0.25);
}
.cm-vazio-icone { color: rgba(245,240,232,0.08); animation: float 3s ease-in-out infinite; }
@keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }

/* ─── CUPOM ──────────────────────────────────────────────────────────────── */
.cm-cupom-wrap {
  margin: 20px 0 0; padding: 14px 16px;
  background: rgba(107,92,62,0.04);
  border: 1px solid rgba(107,92,62,0.12);
  border-left: 2px solid rgba(139,26,26,0.4);
  border-radius: 1px;
}
.cm-cupom-row { display: flex; gap: 8px; }
.cm-cupom-input {
  flex: 1; background: rgba(107,92,62,0.06);
  border: 1px solid rgba(107,92,62,0.2); border-radius: 1px;
  padding: 10px 13px; color: var(--arroz);
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 11px; letter-spacing: 3px; text-transform: uppercase;
  outline: none; transition: border-color .25s;
}
.cm-cupom-input:focus { border-color: rgba(139,26,26,0.45); }
.cm-cupom-input::placeholder { text-transform: none; letter-spacing: 0; color: rgba(107,92,62,0.45); }
.cm-cupom-input:disabled { opacity: .5; }

.btn-cupom {
  background: rgba(139,26,26,0.1);
  border: 1px solid rgba(139,26,26,0.3);
  border-radius: 1px; padding: 10px 16px;
  color: var(--lacre); font-family: 'Noto Sans JP', sans-serif;
  font-size: 8px; font-weight: 500; letter-spacing: 3px;
  cursor: pointer; transition: all .2s; white-space: nowrap; text-transform: uppercase;
}
.btn-cupom:hover:not(:disabled) { background: rgba(139,26,26,0.2); }
.btn-cupom:disabled { opacity: .4; cursor: not-allowed; }
.btn-cupom--remover { color: #c0392b; border-color: rgba(192,57,43,0.3); background: rgba(192,57,43,0.06); }
.btn-cupom--remover:hover { background: rgba(192,57,43,0.12); }
.cm-cupom-msg { font-size: 11px; margin-top: 8px; font-family: 'Noto Sans JP', sans-serif; }
.cm-cupom-msg--ok   { color: #5a9a6e; }
.cm-cupom-msg--erro { color: #c0392b; }

/* ─── FORMULÁRIO ─────────────────────────────────────────────────────────── */
.cm-form { display: flex; flex-direction: column; gap: 14px; }
.cm-duplo { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }

.cm-campo { display: flex; flex-direction: column; gap: 5px; }
.cm-campo label {
  font-size: 7px; letter-spacing: 4px;
  color: rgba(139,26,26,0.65); text-transform: uppercase;
  font-family: 'Noto Sans JP', sans-serif; transition: color .25s;
}
.cm-campo:focus-within label { color: var(--lacre); }

.cm-campo input, .cm-select {
  background: rgba(107,92,62,0.06);
  border: 1px solid rgba(107,92,62,0.18);
  border-radius: 1px; padding: 11px 14px;
  color: var(--arroz); font-family: 'Noto Sans JP', sans-serif;
  font-size: 13px; font-weight: 300; outline: none; transition: all .25s;
}
.cm-campo input:focus, .cm-select:focus {
  border-color: rgba(139,26,26,0.45);
  background: rgba(139,26,26,0.03);
  box-shadow: 0 0 0 3px rgba(139,26,26,0.05);
}
.cm-campo input::placeholder { color: rgba(107,92,62,0.35); }
.cm-campo--ok    input { border-color: rgba(90,154,110,0.35); }
.cm-campo--erro  input { border-color: rgba(192,57,43,0.45); }
.cm-campo--erro  label { color: #c0392b; }
.cm-campo-msg { font-size: 10px; color: #c0392b; animation: fadeInMsg .2s ease; font-family: 'Noto Sans JP', sans-serif; }
@keyframes fadeInMsg { from { opacity: 0; transform: translateY(-4px); } }

.cm-select {
  appearance: none; cursor: pointer;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(139,26,26,0.5)' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
  background-repeat: no-repeat; background-position: right 12px center; padding-right: 32px;
}
.cm-select option { background: #110d05; color: var(--arroz); }

.cm-input-wrap { position: relative; }
.cm-input-wrap input { width: 100%; }
.cm-input-spinner { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); }

/* ─── DIVIDER ────────────────────────────────────────────────────────────── */
.cm-divider { display: flex; align-items: center; gap: 12px; margin: 6px 0; }
.cm-divider::before, .cm-divider::after { content: ''; flex: 1; height: 1px; background: rgba(107,92,62,0.12); }
.cm-divider span {
  font-size: 7px; letter-spacing: 4px; color: rgba(139,26,26,0.45);
  text-transform: uppercase; white-space: nowrap; font-family: 'Noto Sans JP', sans-serif;
}

.cm-erro {
  font-size: 11px; color: #c0392b;
  background: rgba(192,57,43,0.06);
  border: 1px solid rgba(192,57,43,0.18); border-left: 2px solid #c0392b;
  border-radius: 1px; padding: 9px 13px; margin-top: 10px;
  font-family: 'Noto Sans JP', sans-serif;
}

/* ─── FRETE ──────────────────────────────────────────────────────────────── */
.cm-frete-wrap { margin-top: 20px; }
.cm-frete-opcoes { display: flex; flex-direction: column; gap: 8px; margin-top: 12px; }
.cm-frete-op {
  display: flex; align-items: center; gap: 12px;
  padding: 12px 14px;
  background: rgba(107,92,62,0.04);
  border: 1px solid rgba(107,92,62,0.14);
  border-radius: 1px; cursor: pointer; transition: all .25s; position: relative;
}
.cm-frete-op:hover { border-color: rgba(139,26,26,0.25); background: rgba(139,26,26,0.03); }
.cm-frete-op.selecionado {
  border-color: rgba(139,26,26,0.4);
  background: rgba(139,26,26,0.05);
  border-left: 3px solid var(--lacre);
}
.cm-frete-op-info { flex: 1; display: flex; flex-direction: column; gap: 2px; }
.cm-frete-op-nome { display: flex; align-items: center; gap: 7px; font-size: 12px; color: var(--arroz); font-weight: 300; }
.cm-frete-prazo { font-size: 10px; color: var(--sepia); }
.cm-frete-valor { font-family: 'Noto Serif JP', serif; font-size: 0.95rem; color: var(--ouro-queimado); }
.cm-frete-radio-indicator {
  width: 14px; height: 14px; border-radius: 50%;
  border: 1px solid rgba(107,92,62,0.3);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; transition: all .25s;
}
.cm-frete-op.selecionado .cm-frete-radio-indicator {
  border-color: var(--lacre); background: var(--lacre);
  box-shadow: 0 0 0 3px rgba(139,26,26,0.12);
}
.cm-frete-op.selecionado .cm-frete-radio-indicator::after { content: ''; width: 5px; height: 5px; background: var(--arroz); border-radius: 50%; }
.cm-frete-vip {
  display: flex; align-items: center; gap: 7px;
  font-size: 11px; color: var(--lacre);
  background: rgba(139,26,26,0.06); border: 1px solid rgba(139,26,26,0.15);
  border-radius: 1px; padding: 10px 14px; margin-top: 16px;
  font-family: 'Noto Sans JP', sans-serif;
}

/* ─── BOTÕES ─────────────────────────────────────────────────────────────── */
.btn-lacquer {
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--lacre); color: var(--arroz);
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 9px; font-weight: 500; letter-spacing: 4px;
  padding: 13px 28px; border-radius: 1px;
  border: none; cursor: pointer;
  transition: all .25s; text-transform: uppercase;
  position: relative; overflow: hidden;
}
/* borda interna sutil — pegada de lacre japonês */
.btn-lacquer::after {
  content: ''; position: absolute; inset: 3px;
  border: 1px solid rgba(245,240,232,0.12); border-radius: 0; pointer-events: none;
}
.btn-lacquer:hover:not(:disabled) { background: var(--lacre-vivo); transform: translateY(-1px); box-shadow: 0 6px 20px rgba(139,26,26,0.35); }
.btn-lacquer:active:not(:disabled) { transform: translateY(0) scale(.98); }
.btn-lacquer:disabled { opacity: .4; cursor: not-allowed; }
.btn--full { width: 100%; justify-content: center; margin-top: 20px; }
.btn--finalizar { min-width: 190px; justify-content: center; }

.btn-ghost {
  display: inline-flex; align-items: center; gap: 7px;
  background: transparent; border: 1px solid rgba(107,92,62,0.22);
  color: rgba(245,240,232,0.35);
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 9px; letter-spacing: 3px; text-transform: uppercase;
  padding: 12px 22px; border-radius: 1px;
  cursor: pointer; transition: all .25s;
}
.btn-ghost:hover { border-color: rgba(107,92,62,0.5); color: rgba(245,240,232,0.6); }

.cm-btns { display: flex; justify-content: space-between; align-items: center; margin-top: 22px; gap: 10px; }

/* ─── TABS PAGAMENTO ─────────────────────────────────────────────────────── */
.cm-tabs { display: flex; gap: 0; margin-bottom: 20px; border: 1px solid rgba(107,92,62,0.18); border-radius: 1px; overflow: hidden; }
.cm-tab {
  flex: 1; display: flex; align-items: center; justify-content: center; gap: 7px;
  background: rgba(107,92,62,0.04);
  border: none; border-right: 1px solid rgba(107,92,62,0.15);
  padding: 12px;
  font-family: 'Noto Sans JP', sans-serif; font-size: 8px; letter-spacing: 2px;
  color: rgba(107,92,62,0.6); cursor: pointer; transition: all .25s; text-transform: uppercase;
}
.cm-tab:last-child { border-right: none; }
.cm-tab:hover { background: rgba(107,92,62,0.08); color: rgba(245,240,232,0.5); }
.cm-tab.ativo {
  background: rgba(139,26,26,0.1); color: var(--lacre);
  border-bottom: 2px solid var(--lacre);
  box-shadow: 0 0 0 1px rgba(139,26,26,0.1) inset;
}

/* ─── PAY INFO ───────────────────────────────────────────────────────────── */
.cm-pay-info {
  text-align: center; padding: 24px;
  background: rgba(107,92,62,0.04);
  border-radius: 1px; border: 1px solid rgba(107,92,62,0.1);
  position: relative;
}
.cm-pay-info::before {
  content: ''; position: absolute; top: 0; left: 50%; transform: translateX(-50%);
  width: 40px; height: 2px; background: var(--lacre); opacity: 0.45;
}

.cm-pay-icon {
  width: 56px; height: 56px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 14px;
}
.cm-pay-icon--pix {
  background: rgba(139,26,26,0.08); border: 1px solid rgba(139,26,26,0.2); color: var(--lacre);
}
.cm-pay-icon--boleto {
  background: rgba(107,92,62,0.06); border: 1px solid rgba(107,92,62,0.2); color: var(--sepia);
}
.cm-pay-info h3 {
  font-family: 'Noto Serif JP', serif; font-size: 1.1rem; font-weight: 300;
  color: var(--arroz); margin-bottom: 8px;
}
.cm-pay-info p { font-size: 11px; color: rgba(107,92,62,0.8); margin-bottom: 16px; font-family: 'Noto Sans JP', sans-serif; }

.cm-vantagens { display: flex; flex-direction: column; gap: 8px; align-items: center; }
.cm-vantagens span { display: flex; align-items: center; gap: 8px; font-size: 11px; color: rgba(245,240,232,0.4); font-family: 'Noto Sans JP', sans-serif; }
.cm-van-dot { width: 4px; height: 4px; background: var(--lacre); border-radius: 50%; flex-shrink: 0; opacity: 0.7; }

/* ─── CARTÃO ─────────────────────────────────────────────────────────────── */
.cm-cartao-preview { display: flex; justify-content: center; margin-bottom: 18px; }
.cm-cartao {
  width: 100%; max-width: 300px; height: 170px;
  background: linear-gradient(135deg, #1c0f0f, #0a0804);
  border: 1px solid rgba(139,26,26,0.22); border-radius: 3px; padding: 20px;
  display: flex; flex-direction: column; justify-content: space-between;
  position: relative; overflow: hidden;
  box-shadow: 0 20px 50px rgba(0,0,0,.5);
  transition: transform .4s ease;
}
/* Kanji decorativo 福 no cartão */
.cm-cartao::before {
  content: '福'; position: absolute; right: 14px; bottom: 6px;
  font-family: 'Noto Serif JP', serif; font-size: 58px;
  color: rgba(139,26,26,0.07); line-height: 1; pointer-events: none;
}
/* padrão de ondas sutis */
.cm-cartao::after {
  content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0;
  background: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 8px,
    rgba(139,26,26,0.02) 8px,
    rgba(139,26,26,0.02) 9px
  );
  pointer-events: none;
}
.cm-cartao-top { display: flex; justify-content: space-between; align-items: center; }
.cm-cartao-chip {
  width: 30px; height: 22px;
  background: linear-gradient(135deg, #8b6914, #5c4209);
  border-radius: 2px; opacity: .8;
}
.cm-cartao-brand { opacity: .5; font-family: 'Noto Sans JP', sans-serif; font-size: 10px; letter-spacing: 2px; color: var(--ouro-queimado); }
.cm-cartao-num { font-family: 'Courier New', monospace; font-size: 1rem; letter-spacing: 3px; color: rgba(245,240,232,0.75); text-align: center; }
.cm-cartao-bottom { display: flex; justify-content: space-between; }
.cm-cartao-label { font-size: 6px; letter-spacing: 2px; color: rgba(245,240,232,0.28); text-transform: uppercase; margin-bottom: 2px; font-family: 'Noto Sans JP', sans-serif; }
.cm-cartao-val { font-size: 10px; color: rgba(245,240,232,0.7); letter-spacing: 1px; }
.cm-cartao-verso {
  position: absolute; top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(135deg, #1c0f0f, #0a0804);
  border-radius: 3px; display: flex; align-items: center; justify-content: flex-end; padding: 20px;
}
.cm-cartao-cvv { background: var(--arroz-suave); color: var(--tinta); padding: 4px 8px; border-radius: 1px; font-family: monospace; font-size: 12px; }

/* BANDEIRAS */
.cm-band-btn-group { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 4px; }
.cm-band-btn {
  background: rgba(107,92,62,0.05); border: 1px solid rgba(107,92,62,0.18);
  border-radius: 1px; padding: 6px 12px; font-size: 11px;
  color: rgba(245,240,232,0.45); cursor: pointer; transition: all .2s;
  font-family: 'Noto Sans JP', sans-serif;
}
.cm-band-btn.ativo { background: rgba(139,26,26,0.12); border-color: rgba(139,26,26,0.45); color: var(--lacre); font-weight: 500; }
.cm-band-btn:hover:not(.ativo) { border-color: rgba(139,26,26,0.28); color: rgba(139,26,26,0.8); }

.cm-tipo-group { display: flex; gap: 16px; margin-top: 6px; }
.cm-radio { display: flex; align-items: center; gap: 6px; font-size: 12px; color: rgba(245,240,232,0.45); cursor: pointer; font-family: 'Noto Sans JP', sans-serif; }
.cm-radio input { accent-color: var(--lacre); width: 14px; height: 14px; }

/* ─── SEGURANÇA ──────────────────────────────────────────────────────────── */
.cm-seguranca { display: flex; align-items: center; justify-content: center; gap: 20px; margin-top: 18px; flex-wrap: wrap; }
.cm-seguranca-item { display: flex; align-items: center; gap: 6px; font-size: 8px; letter-spacing: 1.5px; color: rgba(107,92,62,0.45); text-transform: uppercase; font-family: 'Noto Sans JP', sans-serif; }
.cm-seg-dot { width: 4px; height: 4px; background: rgba(139,26,26,0.45); border-radius: 50%; flex-shrink: 0; }

/* ─── CONFIRMAÇÃO ────────────────────────────────────────────────────────── */
.cm-confirmacao { display: flex; flex-direction: column; align-items: center; gap: 14px; padding-top: 8px; }
.cm-status-icone {
  width: 70px; height: 70px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  animation: scaleIn .5s cubic-bezier(.19,1,.22,1);
}
@keyframes scaleIn { from { transform: scale(0); opacity: 0; } }
.cm-status-icone--aprovado { background: rgba(90,154,110,0.1); border: 1px solid rgba(90,154,110,0.25); color: #5a9a6e; }
.cm-status-icone--pendente { background: rgba(139,26,26,0.1); border: 1px solid rgba(139,26,26,0.25); color: var(--lacre); }

.cm-pedido-id { font-size: 9px; letter-spacing: 4px; color: var(--sepia); text-transform: uppercase; font-family: 'Noto Sans JP', sans-serif; }
.cm-pedido-id span { color: var(--lacre); }

.cm-pix-box {
  width: 100%; background: rgba(107,92,62,0.04);
  border: 1px solid rgba(201,168,76,0.12); border-radius: 1px;
  padding: 20px; display: flex; flex-direction: column; align-items: center; gap: 12px;
}
.cm-pix-label { font-size: 7px; letter-spacing: 4px; color: rgba(139,26,26,0.65); text-transform: uppercase; font-family: 'Noto Sans JP', sans-serif; }
.cm-qr-wrap { background: #0a0804; padding: 12px; border-radius: 2px; border: 1px solid rgba(107,92,62,0.15); }
.cm-qr-canvas { display: block; border-radius: 1px; }
.cm-copia-wrap { display: flex; gap: 7px; width: 100%; }
.cm-pix-input {
  flex: 1; min-width: 0; background: rgba(107,92,62,0.05);
  border: 1px solid rgba(107,92,62,0.15); border-radius: 1px;
  padding: 9px 11px; color: rgba(245,240,232,0.35);
  font-size: 10px; font-family: 'Courier New', monospace; outline: none;
}
.cm-copiar {
  background: var(--lacre); border: none; border-radius: 1px;
  padding: 9px 15px; color: var(--arroz);
  font-family: 'Noto Sans JP', sans-serif; font-size: 8px; font-weight: 500;
  letter-spacing: 2px; cursor: pointer; transition: all .2s; white-space: nowrap;
  display: flex; align-items: center; justify-content: center; min-width: 60px; text-transform: uppercase;
}
.cm-copiar:hover { background: var(--lacre-vivo); }
.cm-pix-aviso { font-size: 11px; color: rgba(245,240,232,0.2); text-align: center; font-family: 'Noto Sans JP', sans-serif; }

.btn-simular {
  background: rgba(107,92,62,0.06); border: 1px solid rgba(107,92,62,0.18);
  border-radius: 1px; padding: 9px 16px; color: rgba(245,240,232,0.25);
  font-family: 'Noto Sans JP', sans-serif; font-size: 10px; cursor: pointer; transition: all .2s;
}
.btn-simular:hover { background: rgba(107,92,62,0.12); color: rgba(245,240,232,0.45); }

.cm-aprovado {
  width: 100%; background: rgba(90,154,110,0.04);
  border: 1px solid rgba(90,154,110,0.12); border-left: 2px solid rgba(90,154,110,0.4);
  border-radius: 1px; padding: 16px;
  display: flex; flex-direction: column; gap: 10px;
}
.cm-aprovado-linha { display: flex; align-items: center; gap: 9px; font-size: 12px; color: rgba(245,240,232,0.4); line-height: 1.5; font-family: 'Noto Sans JP', sans-serif; }
.cm-aprovado-linha svg { color: #5a9a6e; flex-shrink: 0; }
.cm-aprovado-linha strong { color: #5a9a6e; }

/* ─── ASIDE ──────────────────────────────────────────────────────────────── */
.cm-aside {
  padding: 24px; background: rgba(0,0,0,.18); overflow-y: auto;
  scrollbar-width: thin; scrollbar-color: rgba(107,92,62,0.15) transparent;
  position: relative;
}
/* Padrão de traços verticais — lateral direita */
.cm-aside::before {
  content: ''; position: absolute; right: 0; top: 0; bottom: 0; width: 2px;
  background: repeating-linear-gradient(to bottom, var(--lacre) 0, var(--lacre) 3px, transparent 3px, transparent 10px);
  opacity: 0.18;
}

.cm-aside-titulo {
  font-size: 7px; letter-spacing: 5px; color: rgba(139,26,26,0.55);
  text-transform: uppercase; margin-bottom: 16px; padding-bottom: 12px;
  border-bottom: 1px solid rgba(107,92,62,0.1);
  font-family: 'Noto Sans JP', sans-serif;
  display: flex; align-items: center; gap: 8px;
}
.cm-aside-titulo::before { content: ''; width: 18px; height: 1px; background: var(--lacre); opacity: 0.5; flex-shrink: 0; }

.cm-skeleton-wrap { display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px; }
.cm-sk { background: rgba(107,92,62,0.06); border-radius: 0; animation: shimmer 1.4s ease-in-out infinite; }
@keyframes shimmer { 0%,100% { opacity: .4; } 50% { opacity: .7; } }

.cm-aside-itens { display: flex; flex-direction: column; gap: 12px; margin-bottom: 16px; }
.cm-aside-item  { display: flex; align-items: center; gap: 10px; }
.cm-aside-img {
  position: relative; width: 42px; height: 42px;
  border-radius: 1px; overflow: hidden;
  background: rgba(107,92,62,0.08); border: 1px solid rgba(107,92,62,0.18); flex-shrink: 0;
}
.cm-aside-img img { width: 100%; height: 100%; object-fit: cover; }
.cm-aside-qty {
  position: absolute; top: -4px; right: -4px;
  background: var(--lacre); color: var(--arroz);
  font-size: 7px; font-weight: 700;
  width: 14px; height: 14px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
}
.cm-aside-nome  { font-size: 10px; color: rgba(245,240,232,0.5); margin-bottom: 2px; line-height: 1.3; font-family: 'Noto Sans JP', sans-serif; }
.cm-aside-preco { font-family: 'Noto Serif JP', serif; font-size: 11px; color: var(--ouro-queimado); }

.cm-aside-totais { border-top: 1px solid rgba(107,92,62,0.1); padding-top: 12px; }
.cm-aside-linha {
  display: flex; justify-content: space-between; align-items: center;
  font-size: 8px; letter-spacing: 2px; text-transform: uppercase;
  color: rgba(245,240,232,0.25); padding: 5px 0;
  font-family: 'Noto Sans JP', sans-serif;
}
.cm-aside-linha--gratis    { color: var(--lacre); }
.cm-aside-linha--desconto  { color: #5a9a6e; font-size: 8px; }
.cm-aside-linha--desconto em {
  font-style: normal; color: rgba(90,154,110,0.65); font-size: 7px;
  letter-spacing: 2px; background: rgba(90,154,110,0.08);
  padding: 2px 5px; border-radius: 1px;
}
.cm-aside-total {
  display: flex; justify-content: space-between; align-items: baseline;
  padding: 12px 0 0; border-top: 1px solid rgba(139,26,26,0.15);
  font-family: 'Noto Serif JP', serif; font-size: 1.2rem;
  color: var(--arroz); font-weight: 200;
}
.cm-aside-total span:first-child {
  font-family: 'Noto Sans JP', sans-serif; font-size: 8px;
  letter-spacing: 3px; text-transform: uppercase; color: rgba(245,240,232,0.3);
}
.cm-aside-parcela { font-size: 9px; color: rgba(245,240,232,0.2); text-align: right; margin-top: 4px; font-family: 'Noto Sans JP', sans-serif; }

/* KANJI DECORATIVO DO ASIDE */
.cm-aside-kanji {
  margin-top: 20px; padding-top: 16px;
  border-top: 1px solid rgba(107,92,62,0.08);
  text-align: center;
  font-family: 'Noto Serif JP', serif;
  font-size: 26px; font-weight: 700;
  color: rgba(139,26,26,0.1);
  letter-spacing: 12px; line-height: 1.3;
  display: flex; justify-content: center; gap: 12px;
}
.cm-aside-kanji-legenda {
  font-size: 6px; letter-spacing: 3px;
  color: rgba(107,92,62,0.28); text-align: center;
  margin-top: 6px; font-family: 'Noto Sans JP', sans-serif;
  text-transform: uppercase;
}

.cm-ssl {
  display: flex; align-items: center; gap: 7px; margin-top: 14px; padding-top: 12px;
  border-top: 1px solid rgba(107,92,62,0.08);
  font-size: 8px; color: rgba(245,240,232,0.15); letter-spacing: .5px;
  font-family: 'Noto Sans JP', sans-serif;
}
.cm-ssl-dot { width: 5px; height: 5px; background: rgba(139,26,26,0.4); border-radius: 50%; flex-shrink: 0; }

/* ─── SPINNER ────────────────────────────────────────────────────────────── */
.spinner {
  width: 16px; height: 16px;
  border: 2px solid rgba(245,240,232,0.15); border-top-color: var(--arroz);
  border-radius: 50%; animation: spin .7s linear infinite; display: inline-block;
}
.spinner--sm {
  width: 12px; height: 12px; border-width: 1.5px;
  border-color: rgba(139,26,26,0.2); border-top-color: var(--lacre);
}
@keyframes spin { to { transform: rotate(360deg); } }

/* ─── MOBILE FOOTER ──────────────────────────────────────────────────────── */
.cm-mobile-footer {
  display: none; position: sticky; bottom: 0; z-index: 10;
  padding: 12px 20px;
  background: rgba(6,4,0,.96); border-top: 1px solid rgba(139,26,26,0.15);
  backdrop-filter: blur(10px);
  flex-direction: row; align-items: center; justify-content: space-between; gap: 14px;
}
.cm-mobile-total { display: flex; flex-direction: column; gap: 2px; }
.cm-mobile-label { font-size: 7px; letter-spacing: 3px; text-transform: uppercase; color: rgba(245,240,232,0.2); font-family: 'Noto Sans JP', sans-serif; }
.cm-mobile-valor { font-family: 'Noto Serif JP', serif; font-size: 1.25rem; color: var(--arroz); }
.btn--mobile-acao { padding: 12px 24px; font-size: 9px; }

/* ─── ACESSIBILIDADE ─────────────────────────────────────────────────────── */
.cm-acessibilidade {
  display: flex; align-items: center; gap: 10px; margin-right: 8px;
  background: rgba(107,92,62,0.04); padding: 5px 10px;
  border-radius: 1px; border: 1px solid rgba(107,92,62,0.14);
}
.cm-idio-select {
  background: transparent; border: none; color: rgba(245,240,232,0.5);
  font-size: 9px; font-family: 'Noto Sans JP', sans-serif; cursor: pointer; outline: none;
}
.cm-idio-select option { background: #110d05; color: var(--arroz); }
.cm-fonte-btns { display: flex; align-items: center; gap: 5px; }
.cm-fonte-btn {
  background: rgba(107,92,62,0.06); border: 1px solid rgba(107,92,62,0.2);
  border-radius: 1px; color: rgba(245,240,232,0.45);
  width: 24px; height: 24px;
  display: inline-flex; align-items: center; justify-content: center;
  font-size: 11px; font-weight: 500; cursor: pointer; transition: all .2s;
  font-family: 'Noto Serif JP', serif;
}
.cm-fonte-btn:hover { background: var(--lacre); border-color: var(--lacre); color: var(--arroz); }
.cm-fonte-btn.ativo { background: var(--lacre); border-color: var(--lacre); color: var(--arroz); box-shadow: 0 0 4px rgba(139,26,26,0.4); }

/* ─── ANIMAÇÃO EXTRA ─────────────────────────────────────────────────────── */
.cm-fade-in { animation: fadeInRow .3s ease; }
@keyframes fadeInRow { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }

/* ─── RESPONSIVO ─────────────────────────────────────────────────────────── */
@media (max-width: 768px) {
  .checkout-modal { max-height: 95vh; border-radius: 4px 4px 0 0; align-self: flex-end; }
  .checkout-overlay { align-items: flex-end; padding: 0; }
  .cm-body { grid-template-columns: 1fr; }
  .cm-aside { display: none; }
  .cm-duplo { grid-template-columns: 1fr; }
  .cm-tabs  { flex-direction: column; }
  .cm-mobile-footer { display: flex; }
  .cm-btns { flex-direction: column; }
  .cm-btns .btn-ghost  { width: 100%; justify-content: center; order: 2; }
  .cm-btns .btn-lacquer { width: 100%; justify-content: center; }
  .cm-header { padding: 12px 16px; }
  .cm-main   { padding: 20px 16px; padding-bottom: 90px; }
  .cm-step-label { display: none; }
  .cm-progress-wrap { gap: 6px; }
  .cm-steps { justify-content: center; }
  .cm-cartao { max-width: 100%; }
  .cm-acessibilidade { padding: 4px 8px; gap: 6px; }
  .cm-fonte-btn { width: 20px; height: 20px; font-size: 10px; }
  .cm-idio-select { font-size: 8px; }
  .cm-brush-deco { font-size: 70px; opacity: 0.015; }
}

@media (max-width: 480px) {
  .cm-steps { gap: 2px; }
}
</style>