<template>
  <transition name="fade">
    <div v-if="aberto" class="um-overlay" @click.self="fechar">
      <div class="um-modal">

        <!-- SIDEBAR -->
        <aside class="um-aside">
          <div class="um-aside-top">
            <div class="um-avatar" @click="abrirSeletorAvatar">
              <img v-if="avatarPreview || auth.user?.avatar" :src="avatarPreview || auth.user.avatar" alt="Avatar" />
              <span v-else>{{ auth.user?.nome?.charAt(0) || 'U' }}</span>
              <div class="um-avatar-overlay">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M12 4v16M4 12h16"/>
                </svg>
              </div>
            </div>
            <p class="um-nome">{{ auth.user?.nome }} {{ auth.user?.sobrenome }}</p>
            <p class="um-email">{{ auth.user?.email }}</p>
            <span class="um-role">{{ auth.isAdmin ? 'ADMINISTRADOR' : 'MEMBRO VIP' }}</span>
            <input
              ref="avatarInput"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              style="display:none"
              @change="uploadAvatar"
            />
          </div>

          <nav class="um-nav">
            <button
              v-for="s in secoes"
              :key="s.id"
              :class="['um-nav-btn', { ativo: secaoAtiva === s.id }]"
              @click="secaoAtiva = s.id"
            >
              <span v-html="s.icon"></span>
              {{ s.label }}
            </button>
          </nav>

          <button class="um-sair" @click="sair">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            {{ $t('sair.da.conta') }}
          </button>
        </aside>

        <!-- CONTEÚDO -->
        <div class="um-content">
          <button class="um-close" @click="fechar">✕</button>

          <!-- PERFIL -->
          <section v-if="secaoAtiva === 'perfil'" class="um-sec">
            <h2 class="um-titulo">{{ $t('meu.perfil') }}</h2>
            <div class="um-form">
              <div class="um-duplo">
                <div class="um-campo"><label>{{ $t('nome_2') }}</label><input v-model="form.nome" autocomplete="off" /></div>
                <div class="um-campo"><label>{{ $t('sobrenome_2') }}</label><input v-model="form.sobrenome" autocomplete="off" /></div>
              </div>
              <div class="um-campo"><label>{{ $t('e.mail') }}</label><input :value="auth.user?.email" disabled /></div>
              <div class="um-campo"><label>{{ $t('telefone') }}</label><input v-model="form.telefone" @input="mascararTelefone" maxlength="15" placeholder="(00) 00000-0000" /></div>
              <div class="um-campo"><label>{{ $t('bio') }}</label><textarea v-model="form.bio" rows="2" placeholder="Conte um pouco sobre você"></textarea></div>
            </div>
            <button class="um-btn-grad" @click="salvarPerfil" :disabled="salvando">
              <span v-if="!salvando">{{ $t('salvar.alteracoes') }}</span>
              <span v-else class="spinner"></span>
            </button>
          </section>

          <!-- ENDEREÇO -->
          <section v-if="secaoAtiva === 'endereco'" class="um-sec">
            <h2 class="um-titulo">{{ $t('endereco.de.entrega') }}</h2>
            <div class="um-form">
              <div class="um-duplo">
                <div class="um-campo">
                  <label>{{ $t('cep') }}</label>
                  <div class="um-field-icon">
                    <input v-model="form.cep" @blur="buscarCEP" placeholder="00000-000" maxlength="9" @input="maskCEP" autocomplete="off" />
                    <span v-if="buscandoCEP" class="um-field-spinner"></span>
                  </div>
                  <p v-if="cepErro" class="um-msg--erro um-msg-sm">{{ cepErro }}</p>
                </div>
                <div class="um-campo"><label>{{ $t('estado') }}</label><input v-model="form.estado" placeholder="MG" maxlength="2" /></div>
              </div>
              <div class="um-campo"><label>{{ $t('endereco') }}</label><input v-model="form.endereco" placeholder="Rua, número, complemento" /></div>
              <div class="um-campo"><label>{{ $t('cidade') }}</label><input v-model="form.cidade" /></div>
            </div>
            <button class="um-btn-grad" @click="salvarPerfil" :disabled="salvando">
              <span v-if="!salvando">{{ $t('salvar.endereco') }}</span>
              <span v-else class="spinner"></span>
            </button>
          </section>

          <!-- PEDIDOS -->
          <section v-if="secaoAtiva === 'pedidos'" class="um-sec">
            <h2 class="um-titulo">{{ $t('meus.pedidos') }}</h2>
            <div v-if="loadingPedidos" class="um-loading">
              <span class="spinner"></span>
            </div>
            <div v-else-if="!pedidos.length" class="um-vazio">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              <p>{{ $t('voce.ainda.nao.fez.nenhum.pedido') }}</p>
              <router-link to="/loja" class="um-btn-ghost" @click="fechar">{{ $t('explorar.loja_1') }}</router-link>
            </div>
            <div v-else class="um-pedidos">
              <div v-for="p in pedidos" :key="p._id" class="um-pedido" @click="verDetalhesPedido(p)">
                <div class="um-pedido-top">
                  <div>
                    <p class="um-pedido-id">#{{ p._id.slice(-8).toUpperCase() }}</p>
                    <p class="um-pedido-data">{{ formatDate(p.criadoEm) }}</p>
                  </div>
                  <span :class="['um-status', `um-status--${p.status}`]">{{ statusLabel(p.status) }}</span>
                </div>
                <div class="um-pedido-itens">
                  <div v-for="item in p.itens?.slice(0,3)" :key="item._id" class="um-pedido-item">
                    <img :src="item.produto?.imagem || item.imagem" @error="e => e.target.style.opacity='0'" />
                    <span>{{ item.produto?.nome || item.nome }}</span>
                  </div>
                  <span v-if="p.itens?.length > 3" class="um-pedido-mais">+{{ p.itens.length - 3 }}</span>
                </div>
                <div class="um-pedido-footer">
                  <div style="display:flex;align-items:center;gap:8px">
                    <span class="um-pedido-total">R$ {{ fmt(p.total) }}</span>
                    <span class="um-pedido-pag">{{ p.pagamento?.metodo?.toUpperCase() }}</span>
                  </div>
                  <button
                    v-if="p.status !== 'cancelado' && p.status !== 'entregue' && !p.solicitacaoCancelamento?.solicitado"
                    class="um-btn-cancelar"
                    @click.stop="abrirModalCancelamento(p)"
                  >
                    {{ $t('cancelar.pedido') }}
                  </button>
                  <span
                    v-else-if="p.solicitacaoCancelamento?.solicitado && p.solicitacaoCancelamento.status === 'pendente'"
                    class="um-cancel-badge"
                  >
                    {{ $t('cancelamento.solicitado') }}
                  </span>
                </div>
              </div>
            </div>
          </section>

          <!-- SEGURANÇA -->
          <section v-if="secaoAtiva === 'seguranca'" class="um-sec">
            <h2 class="um-titulo">{{ $t('seguranca') }}</h2>
            <div class="um-card">
              <h3 class="um-card-titulo">{{ $t('alterar.senha') }}</h3>
              <div class="um-form">
                <div class="um-campo">
                  <label>{{ $t('senha.atual') }}</label>
                  <div class="um-field-icon">
                    <input :type="verSenha.atual ? 'text' : 'password'" v-model="senha.atual" autocomplete="new-password" />
                    <button class="um-eye" @click="verSenha.atual = !verSenha.atual">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    </button>
                  </div>
                </div>
                <div class="um-campo">
                  <label>{{ $t('nova.senha') }}</label>
                  <div class="um-field-icon">
                    <input :type="verSenha.nova ? 'text' : 'password'" v-model="senha.nova" autocomplete="new-password" />
                    <button class="um-eye" @click="verSenha.nova = !verSenha.nova">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <button class="um-btn-grad um-btn-grad--auto" @click="alterarSenha" :disabled="salvandoSenha">
                <span v-if="!salvandoSenha">{{ $t('alterar.senha_1') }}</span>
                <span v-else class="spinner"></span>
              </button>
            </div>

            <div class="um-card">
              <h3 class="um-card-titulo">{{ $t('autenticacao.em.2.fatores') }}</h3>
              <div class="um-2fa-row">
                <div>
                  <p class="um-2fa-status" :class="{ on: auth.user?.twoFA }">
                    <span class="um-2fa-dot"></span>
                    {{ auth.user?.twoFA ? '2FA Ativado' : '2FA Desativado' }}
                  </p>
                  <p class="um-2fa-desc">{{ $t('protecao.extra.ao.fazer.login') }}</p>
                </div>
                <button
                  :class="auth.user?.twoFA ? 'um-btn-ghost' : 'um-btn-grad um-btn-grad--auto'"
                  @click="toggle2FA"
                >
                  {{ auth.user?.twoFA ? 'DESATIVAR' : 'ATIVAR 2FA' }}
                </button>
              </div>
            </div>
          </section>

          <!-- NOTIFICAÇÕES -->
          <section v-if="secaoAtiva === 'notif'" class="um-sec">
            <h2 class="um-titulo">{{ $t('notificacoes') }}</h2>
            <div class="um-card">
              <div v-for="n in notificacoes" :key="n.key" class="um-notif-row">
                <div>
                  <p class="um-notif-label">{{ n.label }}</p>
                  <p class="um-notif-desc">{{ n.desc }}</p>
                </div>
                <button
                  :class="['um-toggle', { on: notifState[n.key] }]"
                  @click="notifState[n.key] = !notifState[n.key]"
                >
                  <span class="um-toggle-thumb"></span>
                </button>
              </div>
            </div>
            <button class="um-btn-grad" @click="salvarNotif">{{ $t('salvar.preferencias') }}</button>
          </section>

          <!-- VIP -->
          <section v-if="secaoAtiva === 'vip'" class="um-sec">
            <h2 class="um-titulo">{{ $t('acesso.vip') }}</h2>
            <div class="um-vip-card">
              <div class="um-vip-orb"></div>
              <div class="um-vip-tag">{{ $t('membro.vip') }}</div>
              <p class="um-vip-nome">{{ auth.user?.nome }} {{ auth.user?.sobrenome }}</p>
              <p class="um-vip-since">Membro desde {{ memberSince }}</p>
              <div class="um-vip-beneficios">
                <div v-for="b in beneficios" :key="b" class="um-vip-item">
                  <span class="um-vip-dot"></span>{{ b }}
                </div>
              </div>
            </div>
            <div class="um-vip-stats">
              <div class="um-vip-stat">
                <span class="um-vip-stat-num">{{ pedidos.length }}</span>
                <span class="um-vip-stat-label">{{ $t('pedidos') }}</span>
              </div>
              <div class="um-vip-stat">
                <span class="um-vip-stat-num">R$ {{ fmt(totalGasto) }}</span>
                <span class="um-vip-stat-label">{{ $t('investido') }}</span>
              </div>
              <div class="um-vip-stat">
                <span class="um-vip-stat-num" :style="auth.user?.twoFA ? 'color:#2ecc71' : 'color:rgba(231,76,60,.6)'">
                  {{ auth.user?.twoFA ? '✓' : '✗' }}
                </span>
                <span class="um-vip-stat-label">{{ $t('2fa') }}</span>
              </div>
            </div>
          </section>

          <!-- APARÊNCIA -->
          <section v-if="secaoAtiva === 'aparencia'" class="um-sec">
            <h2 class="um-titulo">{{ $t('aparencia') }}</h2>
            <div class="um-card">
              <h3 class="um-card-titulo">{{ $t('tamanho.da.fonte') }}</h3>
              <div class="um-opcoes-row">
                <button :class="['um-opcao-btn', { ativo: site.fonte === 'pequena' }]" @click="site.setFonte('pequena')">{{ $t('pequena') }}</button>
                <button :class="['um-opcao-btn', { ativo: site.fonte === 'normal' }]" @click="site.setFonte('normal')">{{ $t('normal') }}</button>
                <button :class="['um-opcao-btn', { ativo: site.fonte === 'grande' }]" @click="site.setFonte('grande')">{{ $t('grande') }}</button>
              </div>
            </div>
            <div class="um-card">
              <h3 class="um-card-titulo">{{ $t('idioma.language') }}</h3>
              <div class="um-opcoes-row">
                <button :class="['um-opcao-btn', { ativo: $i18n.locale === 'pt-BR' }]" @click="mudarIdioma('pt-BR')">🇧🇷 Português</button>
                <button :class="['um-opcao-btn', { ativo: $i18n.locale === 'en-US' }]" @click="mudarIdioma('en-US')">🇺🇸 English</button>
              </div>
            </div>
          </section>
        </div>
      </div>

      <!-- MODAL DETALHES DO PEDIDO -->
      <transition name="fade">
        <div v-if="pedidoDetalhe" class="um-modal-overlay" @click.self="pedidoDetalhe = null">
          <div class="um-submodal">
            <div class="um-submodal-header">
              <h3>Pedido #{{ pedidoDetalhe._id.slice(-8).toUpperCase() }}</h3>
              <button @click="pedidoDetalhe = null" class="um-modal-close">✕</button>
            </div>
            <div class="um-submodal-body">
              <div class="um-detalhe-row"><span class="label">{{ $t('data') }}</span><span>{{ formatDate(pedidoDetalhe.criadoEm) }}</span></div>
              <div class="um-detalhe-row">
                <span class="label">{{ $t('status') }}</span>
                <span :class="['um-status', `um-status--${pedidoDetalhe.status}`]">{{ statusLabel(pedidoDetalhe.status) }}</span>
              </div>
              <div class="um-detalhe-row"><span class="label">{{ $t('pagamento_1') }}</span><span>{{ pedidoDetalhe.pagamento?.metodo?.toUpperCase() }}</span></div>
              <div class="um-detalhe-row">
                <span class="label">{{ $t('entrega_2') }}</span>
                <span>{{ pedidoDetalhe.entrega?.endereco }}, {{ pedidoDetalhe.entrega?.cidade }} - {{ pedidoDetalhe.entrega?.estado }}</span>
              </div>
              <div class="um-detalhe-itens">
                <p class="um-detalhe-label">{{ $t('itens') }}</p>
                <div v-for="item in pedidoDetalhe.itens" :key="item._id" class="um-detalhe-item">
                  <img :src="item.produto?.imagem || item.imagem" class="um-detalhe-img" @error="e => e.target.style.opacity='0'" />
                  <div class="um-detalhe-item-info">
                    <p>{{ item.produto?.nome || item.nome }}</p>
                    <span>{{ item.qty }} x R$ {{ fmt(item.produto?.preco || item.preco) }}</span>
                  </div>
                  <p class="um-preco">R$ {{ fmt((item.produto?.preco || item.preco) * item.qty) }}</p>
                </div>
              </div>
              <div class="um-detalhe-total">
                <span>{{ $t('total') }}</span>
                <span class="um-preco">R$ {{ fmt(pedidoDetalhe.total) }}</span>
              </div>
            </div>
            <div class="um-submodal-footer">
              <button class="um-btn-ghost" @click="pedidoDetalhe = null">{{ $t('fechar_2') }}</button>
            </div>
          </div>
        </div>
      </transition>

      <!-- MODAL CANCELAMENTO -->
      <transition name="fade">
        <div v-if="cancelandoPedido" class="um-modal-overlay" @click.self="cancelandoPedido = null">
          <div class="um-submodal">
            <div class="um-submodal-header">
              <h3>{{ $t('solicitar.cancelamento') }}</h3>
              <button @click="cancelandoPedido = null" class="um-modal-close">✕</button>
            </div>
            <div class="um-submodal-body">
              <p class="um-confirm-text">
                {{ $t('tem.certeza.que.deseja.cancelar.o.pedido') }}
                <strong>#{{ cancelandoPedido._id.slice(-8).toUpperCase() }}</strong>?
              </p>
              <div class="um-campo">
                <label>{{ $t('motivo.do.cancelamento') }}</label>
                <textarea v-model="motivoCancelamento" rows="2" placeholder="Descreva o motivo"></textarea>
              </div>
            </div>
            <div class="um-submodal-footer">
              <button class="um-btn-ghost" @click="cancelandoPedido = null">{{ $t('voltar_1') }}</button>
              <button class="um-btn-grad um-btn-grad--auto" @click="confirmarCancelamento" :disabled="enviandoCancelamento">
                <span v-if="!enviandoCancelamento">{{ $t('solicitar') }}</span>
                <span v-else class="spinner"></span>
              </button>
            </div>
          </div>
        </div>
      </transition>

      <!-- MODAL 2FA -->
      <transition name="fade">
        <div v-if="qrCodeData" class="um-modal-overlay" @click.self="qrCodeData = null">
          <div class="um-submodal" style="text-align:center">
            <div class="um-submodal-header">
              <h3>{{ $t('ativar.2fa') }}</h3>
              <button @click="qrCodeData = null" class="um-modal-close">✕</button>
            </div>
            <div class="um-submodal-body">
              <p class="um-2fa-desc" style="margin-bottom:12px">{{ $t('escaneie.o.qr.code.com.o.google.authenticator') }}</p>
              <img :src="qrCodeData" alt="QR Code 2FA" style="width:180px;height:180px;margin:0 auto 16px;border-radius:4px;border:1px solid var(--cor-borda)" />
              <p class="um-2fa-desc" style="margin-bottom:16px">{{ $t('apos.escanear.insira.o.codigo.gerado.para.ativar') }}</p>
              <div class="um-campo">
                <input v-model="codigo2FA" placeholder="Código de 6 dígitos" maxlength="6" style="text-align:center;letter-spacing:6px;font-size:18px" />
              </div>
            </div>
            <div class="um-submodal-footer">
              <button class="um-btn-ghost" @click="qrCodeData = null">{{ $t('cancelar') }}</button>
              <button class="um-btn-grad um-btn-grad--auto" @click="confirmar2FA" :disabled="salvando2FA">{{ $t('confirmar') }}</button>
            </div>
          </div>
        </div>
      </transition>

      <!-- TOAST -->
      <transition name="toast">
        <div v-if="toast.show" :class="['um-toast', `um-toast--${toast.tipo}`]">
          {{ toast.msg }}
        </div>
      </transition>
    </div>
  </transition>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'
import { useSiteStore } from '@/stores/site.js'
import { useI18n } from 'vue-i18n'
import api from '@/api.js'

const auth   = useAuthStore()
const site   = useSiteStore()
const { locale } = useI18n()
const router = useRouter()

const aberto             = ref(false)
const secaoAtiva         = ref('perfil')
const salvando           = ref(false)
const salvandoSenha      = ref(false)
const loadingPedidos     = ref(false)
const pedidos            = ref([])
const pedidoDetalhe      = ref(null)
const cancelandoPedido   = ref(null)
const motivoCancelamento = ref('')
const enviandoCancelamento = ref(false)
const buscandoCEP        = ref(false)
const cepErro            = ref('')
const verSenha           = ref({ atual: false, nova: false })
const senha              = ref({ atual: '', nova: '' })
const qrCodeData         = ref(null)
const codigo2FA          = ref('')
const salvando2FA        = ref(false)
const avatarInput        = ref(null)
const avatarPreview      = ref(null)
const toast              = ref({ show: false, msg: '', tipo: 'ok' })

const form = ref({
  nome: '', sobrenome: '', telefone: '', bio: '',
  cep: '', estado: '', endereco: '', cidade: ''
})

const notifState = ref({ novidades: true, pedidos: true, vip: true, newsletter: false })

const secoes = [
  { id: 'perfil',    label: 'Perfil',        icon: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>' },
  { id: 'endereco',  label: 'Endereço',       icon: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>' },
  { id: 'pedidos',   label: 'Pedidos',        icon: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>' },
  { id: 'seguranca', label: 'Segurança',      icon: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>' },
  { id: 'notif',     label: 'Notificações',   icon: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>' },
  { id: 'vip',       label: 'Acesso VIP',     icon: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>' },
  { id: 'aparencia', label: 'Aparência',      icon: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9"/></svg>' },
]

const notificacoes = [
  { key: 'novidades',   label: 'Lançamentos',       desc: 'Novos produtos e coleções' },
  { key: 'pedidos',     label: 'Status de pedidos',  desc: 'Atualizações sobre seus pedidos' },
  { key: 'vip',         label: 'Ofertas VIP',        desc: 'Promoções exclusivas para membros' },
  { key: 'newsletter',  label: 'Newsletter',          desc: 'Curadoria semanal do Atelier' },
]

const beneficios = [
  'Frete VIP gratuito',
  'Acesso antecipado a lançamentos',
  'Atendimento prioritário 24h',
  'Programa de fidelidade',
  'Embalagem premium exclusiva',
]

const totalGasto  = computed(() => pedidos.value.reduce((s, p) => s + (p.total || 0), 0))
const memberSince = computed(() => {
  const d = auth.user?.criadoEm
  if (!d) return '2025'
  return new Date(d).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
})

// ── HELPERS ──────────────────────────────────────────────
const fmt        = (v) => (v || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })
const formatDate = (d) => new Date(d).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' })
const statusLabel = (s) => ({ pendente: 'Pendente', aprovado: 'Aprovado', enviado: 'Enviado', entregue: 'Entregue', cancelado: 'Cancelado' }[s] || s)

function mostrarToast(msg, tipo = 'ok') {
  toast.value = { show: true, msg, tipo }
  setTimeout(() => { toast.value.show = false }, 3500)
}

function mascararTelefone() {
  let v = form.value.telefone.replace(/\D/g, '').slice(0, 11)
  if (v.length === 11) v = v.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  else if (v.length === 10) v = v.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
  form.value.telefone = v
}

function maskCEP() {
  let v = form.value.cep.replace(/\D/g, '').slice(0, 8)
  v = v.replace(/(\d{5})(\d)/, '$1-$2')
  form.value.cep = v
}

// ── API ──────────────────────────────────────────────────
async function buscarPedidos() {
  loadingPedidos.value = true
  try {
    const { data } = await api.get('/pedidos/meus')
    pedidos.value = data.pedidos || []
  } catch {
    pedidos.value = []
  } finally {
    loadingPedidos.value = false
  }
}

async function buscarCEP() {
  const cep = form.value.cep.replace(/\D/g, '')
  if (cep.length !== 8) return
  buscandoCEP.value = true
  cepErro.value = ''
  try {
    const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    const d = await res.json()
    if (!d.erro) {
      form.value.endereco = `${d.logradouro}, ${d.bairro}`
      form.value.cidade   = d.localidade
      form.value.estado   = d.uf
    } else {
      cepErro.value = 'CEP não encontrado'
    }
  } catch {
    cepErro.value = 'Erro ao buscar CEP'
  } finally {
    buscandoCEP.value = false
  }
}

async function salvarPerfil() {
  salvando.value = true
  try {
    await auth.updateProfile(form.value)
    mostrarToast('Perfil atualizado com sucesso!')
  } catch (e) {
    mostrarToast(e.response?.data?.msg || 'Erro ao salvar.', 'erro')
  } finally {
    salvando.value = false
  }
}

async function alterarSenha() {
  if (!senha.value.atual || !senha.value.nova) { mostrarToast('Preencha os dois campos.', 'erro'); return }
  if (senha.value.nova.length < 8) { mostrarToast('A nova senha deve ter no mínimo 8 caracteres.', 'erro'); return }
  salvandoSenha.value = true
  try {
    await api.patch('/usuarios/password', { senhaAtual: senha.value.atual, novaSenha: senha.value.nova })
    senha.value = { atual: '', nova: '' }
    mostrarToast('Senha alterada com sucesso!')
  } catch (e) {
    mostrarToast(e.response?.data?.msg || 'Erro ao alterar senha.', 'erro')
  } finally {
    salvandoSenha.value = false
  }
}

async function salvarNotif() {
  try {
    await api.patch('/usuarios/notifications', { notificacoes: notifState.value })
    mostrarToast('Preferências salvas!')
  } catch {
    mostrarToast('Erro ao salvar preferências.', 'erro')
  }
}

async function toggle2FA() {
  if (auth.user?.twoFA) {
    try {
      await api.patch('/usuarios/2fa', { ativo: false })
      auth.user.twoFA = false
      mostrarToast('2FA desativado.')
    } catch {
      mostrarToast('Erro ao desativar 2FA', 'erro')
    }
  } else {
    try {
      const { data } = await api.post('/usuarios/2fa/setup')
      qrCodeData.value = data.qrCode
    } catch {
      mostrarToast('Erro ao iniciar configuração 2FA', 'erro')
    }
  }
}

async function confirmar2FA() {
  if (!codigo2FA.value || codigo2FA.value.length !== 6) { mostrarToast('Digite o código de 6 dígitos.', 'erro'); return }
  salvando2FA.value = true
  try {
    await api.post('/usuarios/2fa/verify', { token: codigo2FA.value })
    auth.user.twoFA = true
    qrCodeData.value = null
    codigo2FA.value  = ''
    mostrarToast('2FA ativado com sucesso!')
  } catch {
    mostrarToast('Código inválido. Tente novamente.', 'erro')
  } finally {
    salvando2FA.value = false
  }
}

function abrirSeletorAvatar() { avatarInput.value?.click() }

async function uploadAvatar(e) {
  const file = e.target.files[0]
  if (!file) return
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) { mostrarToast('Formato inválido. Use JPG, PNG ou WEBP.', 'erro'); return }
  if (file.size > 2 * 1024 * 1024) { mostrarToast('Imagem muito grande (máx 2MB).', 'erro'); return }
  const formData = new FormData()
  formData.append('avatar', file)
  try {
    const { data } = await api.patch('/usuarios/avatar', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    auth.user.avatar = data.avatar
    avatarPreview.value = data.avatar
    mostrarToast('Avatar atualizado!')
  } catch {
    mostrarToast('Erro ao enviar avatar.', 'erro')
  }
}

function verDetalhesPedido(pedido) { pedidoDetalhe.value = pedido }

function abrirModalCancelamento(pedido) {
  cancelandoPedido.value   = pedido
  motivoCancelamento.value = ''
}

async function confirmarCancelamento() {
  if (!motivoCancelamento.value.trim()) { mostrarToast('Informe o motivo do cancelamento.', 'erro'); return }
  enviandoCancelamento.value = true
  try {
    await api.post(`/pedidos/${cancelandoPedido.value._id}/solicitar-cancelamento`, { motivo: motivoCancelamento.value })
    mostrarToast('Solicitação enviada. Aguarde análise.')
    cancelandoPedido.value = null
    await buscarPedidos()
  } catch (e) {
    mostrarToast(e.response?.data?.msg || 'Erro ao solicitar cancelamento.', 'erro')
  } finally {
    enviandoCancelamento.value = false
  }
}

function mudarIdioma(novoIdioma) {
  locale.value = novoIdioma
  localStorage.setItem('noir_locale', novoIdioma)
  mostrarToast(`Idioma alterado para ${novoIdioma === 'pt-BR' ? 'Português' : 'English'}`)
}

function preencherForm() {
  const u = auth.user
  if (!u) return
  form.value = {
    nome: u.nome || '', sobrenome: u.sobrenome || '', telefone: u.telefone || '',
    bio: u.bio || '', cep: u.cep || '', estado: u.estado || '',
    endereco: u.endereco || '', cidade: u.cidade || ''
  }
  avatarPreview.value = null
}

const fechar = () => {
  aberto.value = false
  document.body.style.overflow = ''
  pedidoDetalhe.value    = null
  cancelandoPedido.value = null
  qrCodeData.value       = null
}

const sair = async () => {
  fechar()
  await auth.logout()
  router.push('/')
}

if (typeof window !== 'undefined') {
  window.addEventListener('abrir-minha-conta', () => {
    aberto.value = true
    document.body.style.overflow = 'hidden'
    preencherForm()
    buscarPedidos()
  })
  window.addEventListener('keydown', e => { if (e.key === 'Escape' && aberto.value) fechar() })
}

onMounted(preencherForm)
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;1,400&display=swap');

/* ═══════════════════════════════════════════════════════════
   BASE
═══════════════════════════════════════════════════════════ */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

.um-overlay {
  position: fixed; inset: 0; z-index: 9000;
  background: var(--overlay-bg);
  backdrop-filter: blur(20px);
  display: flex; align-items: center; justify-content: center;
  padding: 20px;
  font-family: 'Syne', sans-serif;
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* ═══════════════════════════════════════════════════════════
   MODAL PRINCIPAL
═══════════════════════════════════════════════════════════ */
.um-modal {
  display: grid;
  grid-template-columns: 210px 1fr;
  width: 100%;
  max-width: 860px;
  height: min(88vh, 680px);
  background: var(--cor-superficie);
  border: 1px solid var(--cor-borda);
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 40px 80px rgba(0,0,0,0.6), var(--shadow-glow);
  animation: popIn 0.4s cubic-bezier(0.19, 1, 0.22, 1);
}

@keyframes popIn {
  from { opacity: 0; transform: scale(0.95) translateY(16px); }
}

/* ═══════════════════════════════════════════════════════════
   ASIDE / SIDEBAR
═══════════════════════════════════════════════════════════ */
.um-aside {
  background: var(--cor-superficie-2);
  border-right: 1px solid var(--cor-borda);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.um-aside-top {
  padding: 24px 16px 18px;
  text-align: center;
  border-bottom: 1px solid var(--cor-borda);
}

.um-avatar {
  position: relative;
  width: 68px; height: 68px;
  border-radius: 50%;
  background: var(--grad-btn);
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 10px;
  cursor: pointer; overflow: hidden;
  border: 1px solid var(--cor-borda-hover);
  transition: transform 0.2s;
}
.um-avatar:hover { transform: scale(1.03); }
.um-avatar img { width: 100%; height: 100%; object-fit: cover; }
.um-avatar span {
  font-family: 'Playfair Display', serif;
  font-size: 1.6rem; color: #0A0A0A;
}
.um-avatar-overlay {
  position: absolute; inset: 0; border-radius: 50%;
  background: rgba(0,0,0,0.58);
  display: flex; align-items: center; justify-content: center;
  color: #fff; opacity: 0; transition: opacity 0.2s;
}
.um-avatar:hover .um-avatar-overlay { opacity: 1; }

.um-nome { font-size: 12px; font-weight: 600; color: var(--cor-texto); margin-bottom: 2px; }
.um-email { font-size: 9px; color: var(--cor-texto-3); margin-bottom: 8px; word-break: break-all; }
.um-role {
  display: inline-block;
  font-size: 7px; letter-spacing: 3px;
  color: var(--cor-primaria);
  border: 1px solid var(--cor-borda-hover);
  padding: 3px 10px; border-radius: 20px;
  text-transform: uppercase;
}

/* NAV */
.um-nav {
  padding: 10px 8px; flex: 1;
  display: flex; flex-direction: column; gap: 2px;
}
.um-nav-btn {
  display: flex; align-items: center; gap: 9px;
  background: none; border: 1px solid transparent;
  border-radius: 4px; padding: 8px 10px;
  color: var(--cor-texto-3); font-family: inherit;
  font-size: 11px; cursor: pointer;
  transition: all 0.2s; text-align: left; width: 100%;
}
.um-nav-btn:hover { background: var(--gold-05); color: var(--cor-texto-2); }
.um-nav-btn.ativo {
  background: var(--gold-08);
  border-color: var(--cor-borda-hover);
  color: var(--cor-primaria);
}

/* SAIR */
.um-sair {
  margin: 8px 8px 10px;
  display: flex; align-items: center; justify-content: center; gap: 7px;
  background: none; border: 1px solid rgba(231,76,60,0.2);
  border-radius: 4px; padding: 8px;
  color: rgba(231,76,60,0.55); font-family: inherit;
  font-size: 9px; letter-spacing: 2px;
  cursor: pointer; transition: all 0.2s; text-transform: uppercase;
}
.um-sair:hover {
  background: rgba(231,76,60,0.08);
  color: #e74c3c; border-color: rgba(231,76,60,0.4);
}

/* ═══════════════════════════════════════════════════════════
   CONTEÚDO
═══════════════════════════════════════════════════════════ */
.um-content {
  position: relative; overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--gold-20) transparent;
}

.um-close {
  position: absolute; top: 14px; right: 14px; z-index: 10;
  width: 30px; height: 30px; border-radius: 50%;
  background: var(--gold-08); border: 1px solid var(--cor-borda);
  color: var(--cor-texto-2); cursor: pointer; font-size: 12px;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.2s;
}
.um-close:hover { border-color: var(--cor-primaria); color: var(--cor-primaria); transform: rotate(90deg); }

.um-sec { padding: 28px 24px; min-height: 100%; }
.um-titulo {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem; font-weight: 400;
  color: var(--cor-texto); margin-bottom: 22px;
}

/* ═══════════════════════════════════════════════════════════
   FORMULÁRIOS
═══════════════════════════════════════════════════════════ */
.um-form { display: flex; flex-direction: column; gap: 12px; margin-bottom: 18px; }
.um-duplo { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.um-campo { display: flex; flex-direction: column; gap: 5px; }

.um-campo label {
  font-size: 7px; letter-spacing: 4px;
  color: var(--cor-primaria); text-transform: uppercase;
  font-weight: 700; opacity: 0.85;
}

.um-campo input,
.um-campo textarea {
  background: var(--input-bg);
  border: 1px solid var(--input-borda);
  border-radius: 4px;
  padding: 9px 12px;
  color: var(--cor-texto);
  font-family: inherit; font-size: 13px;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  width: 100%;
}
.um-campo input:focus,
.um-campo textarea:focus {
  border-color: var(--input-borda-focus);
  box-shadow: 0 0 0 2px var(--gold-08);
}
.um-campo input:disabled { opacity: 0.38; cursor: not-allowed; }
.um-campo textarea { resize: vertical; }

.um-field-icon { position: relative; }
.um-field-icon input { padding-right: 36px; }
.um-eye {
  position: absolute; right: 10px; top: 50%;
  transform: translateY(-50%);
  background: none; border: none;
  color: var(--cor-texto-3); cursor: pointer;
  display: flex; transition: color 0.2s; padding: 0;
}
.um-eye:hover { color: var(--cor-primaria); }

.um-field-spinner {
  position: absolute; right: 10px; top: 50%;
  transform: translateY(-50%);
  width: 13px; height: 13px;
  border: 1.5px solid var(--gold-15);
  border-top-color: var(--cor-primaria);
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}
.um-msg--erro { font-size: 10px; color: #e74c3c; margin-top: 3px; }

/* ═══════════════════════════════════════════════════════════
   BOTÕES
═══════════════════════════════════════════════════════════ */
.um-btn-grad {
  display: flex; align-items: center; justify-content: center; gap: 8px;
  background: var(--grad-btn); color: #0A0A0A;
  font-family: inherit; font-size: 9px; font-weight: 700;
  letter-spacing: 3px; padding: 12px 24px;
  border-radius: 40px; border: none; cursor: pointer;
  box-shadow: var(--shadow-btn);
  transition: transform 0.2s, box-shadow 0.2s;
  text-transform: uppercase; width: 100%; min-height: 42px;
}
.um-btn-grad:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: var(--shadow-btn-hover);
}
.um-btn-grad:disabled { opacity: 0.45; cursor: not-allowed; }
.um-btn-grad--auto { width: auto; }

.um-btn-ghost {
  display: inline-flex; align-items: center; justify-content: center;
  background: transparent; border: 1px solid var(--cor-borda-hover);
  color: var(--cor-primaria); font-family: inherit;
  font-size: 9px; font-weight: 600; letter-spacing: 2px;
  padding: 10px 20px; border-radius: 40px; cursor: pointer;
  transition: all 0.2s; text-transform: uppercase;
}
.um-btn-ghost:hover { background: var(--gold-08); }

/* ═══════════════════════════════════════════════════════════
   PEDIDOS
═══════════════════════════════════════════════════════════ */
.um-loading { display: flex; justify-content: center; padding: 40px; }
.um-vazio {
  display: flex; flex-direction: column; align-items: center;
  gap: 12px; padding: 40px; text-align: center;
  color: var(--cor-texto-3);
}
.um-pedidos { display: flex; flex-direction: column; gap: 10px; }
.um-pedido {
  background: var(--gold-05); border: 1px solid var(--cor-borda);
  border-radius: 4px; padding: 14px;
  cursor: pointer; transition: border-color 0.2s;
}
.um-pedido:hover { border-color: var(--cor-borda-hover); }
.um-pedido-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px; }
.um-pedido-id { font-size: 11px; font-weight: 600; color: var(--cor-texto); letter-spacing: 1px; }
.um-pedido-data { font-size: 9px; color: var(--cor-texto-3); margin-top: 2px; }

.um-status {
  font-size: 7px; letter-spacing: 2px; padding: 3px 10px;
  border-radius: 30px; text-transform: uppercase; font-weight: 700;
}
.um-status--aprovado  { background: rgba(46,204,113,.1);  border: 1px solid rgba(46,204,113,.2);  color: #2ecc71; }
.um-status--pendente  { background: var(--gold-08);       border: 1px solid var(--cor-borda-hover); color: var(--cor-primaria); }
.um-status--enviado   { background: rgba(59,130,246,.1);  border: 1px solid rgba(59,130,246,.2);  color: #60a5fa; }
.um-status--entregue  { background: rgba(46,204,113,.12); border: 1px solid rgba(46,204,113,.25); color: #2ecc71; }
.um-status--cancelado { background: rgba(231,76,60,.1);   border: 1px solid rgba(231,76,60,.2);   color: #e74c3c; }

.um-pedido-itens {
  display: flex; align-items: center; gap: 8px;
  margin-bottom: 10px; flex-wrap: wrap;
}
.um-pedido-item { display: flex; align-items: center; gap: 5px; font-size: 10px; color: var(--cor-texto-3); }
.um-pedido-item img { width: 28px; height: 28px; border-radius: 4px; object-fit: cover; background: var(--cor-superficie); }
.um-pedido-mais {
  font-size: 9px; color: var(--cor-texto-3);
  background: var(--gold-08); padding: 2px 8px; border-radius: 20px;
}
.um-pedido-footer { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; }
.um-pedido-total { font-family: 'Playfair Display', serif; font-size: 1rem; color: var(--cor-texto); }
.um-pedido-pag {
  font-size: 8px; letter-spacing: 2px; color: var(--cor-texto-3);
  background: var(--gold-05); padding: 3px 9px;
  border-radius: 20px; border: 1px solid var(--cor-borda);
}
.um-btn-cancelar {
  background: rgba(231,76,60,.1); border: 1px solid rgba(231,76,60,.25);
  color: #e74c3c; padding: 4px 12px; border-radius: 30px;
  font-size: 9px; font-weight: 600; cursor: pointer; transition: all 0.2s;
}
.um-btn-cancelar:hover { background: rgba(231,76,60,.2); }
.um-cancel-badge {
  background: var(--gold-08); border: 1px solid var(--cor-borda-hover);
  color: var(--cor-primaria); padding: 3px 10px;
  border-radius: 30px; font-size: 9px; font-weight: 600;
}

/* ═══════════════════════════════════════════════════════════
   CARDS (SEGURANÇA / NOTIF)
═══════════════════════════════════════════════════════════ */
.um-card {
  background: var(--gold-05); border: 1px solid var(--cor-borda);
  border-radius: 4px; padding: 18px; margin-bottom: 14px;
}
.um-card-titulo {
  font-size: 8px; letter-spacing: 3px; color: var(--cor-primaria);
  text-transform: uppercase; margin-bottom: 14px; font-weight: 700;
}

/* 2FA */
.um-2fa-row { display: flex; align-items: center; justify-content: space-between; gap: 14px; flex-wrap: wrap; }
.um-2fa-status { display: flex; align-items: center; gap: 7px; font-size: 12px; color: var(--cor-texto-3); margin-bottom: 3px; }
.um-2fa-status.on { color: #2ecc71; }
.um-2fa-dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: var(--cor-borda); transition: background 0.3s;
}
.um-2fa-status.on .um-2fa-dot { background: #2ecc71; box-shadow: 0 0 6px rgba(46,204,113,.5); }
.um-2fa-desc { font-size: 10px; color: var(--cor-texto-3); }

/* NOTIFICAÇÕES */
.um-notif-row {
  display: flex; justify-content: space-between; align-items: center;
  padding: 12px 0; border-bottom: 1px solid var(--cor-borda);
}
.um-notif-row:last-child { border-bottom: none; }
.um-notif-label { font-size: 12px; color: var(--cor-texto-2); margin-bottom: 2px; }
.um-notif-desc  { font-size: 10px; color: var(--cor-texto-3); }

.um-toggle {
  width: 40px; height: 22px; border-radius: 30px;
  border: 1px solid var(--cor-borda); background: var(--gold-08);
  cursor: pointer; position: relative; flex-shrink: 0; transition: all 0.28s;
}
.um-toggle.on { background: var(--grad-btn); border-color: var(--cor-borda-hover); }
.um-toggle-thumb {
  position: absolute; top: 2px; left: 2px;
  width: 16px; height: 16px; border-radius: 50%; background: #fff;
  transition: transform 0.28s; box-shadow: 0 1px 4px rgba(0,0,0,.25);
}
.um-toggle.on .um-toggle-thumb { transform: translateX(18px); }

/* ═══════════════════════════════════════════════════════════
   VIP
═══════════════════════════════════════════════════════════ */
.um-vip-card {
  background: linear-gradient(135deg, var(--cor-superficie-2), var(--cor-superficie));
  border: 1px solid var(--cor-borda-hover);
  border-radius: 4px; padding: 24px; margin-bottom: 14px;
  position: relative; overflow: hidden;
}
.um-vip-orb {
  position: absolute; width: 180px; height: 180px; border-radius: 50%;
  background: radial-gradient(circle, var(--gold-10), transparent 70%);
  top: -50px; right: -50px; pointer-events: none;
}
.um-vip-tag {
  font-size: 7px; letter-spacing: 4px; color: var(--cor-primaria);
  text-transform: uppercase; font-weight: 700; margin-bottom: 10px;
  border: 1px solid var(--cor-borda-hover); display: inline-block;
  padding: 3px 10px; border-radius: 20px;
}
.um-vip-nome { font-family: 'Playfair Display', serif; font-size: 1.3rem; color: var(--cor-texto); margin-bottom: 3px; }
.um-vip-since { font-size: 10px; color: var(--cor-texto-3); margin-bottom: 16px; }
.um-vip-beneficios { display: flex; flex-direction: column; gap: 7px; }
.um-vip-item { display: flex; align-items: center; gap: 9px; font-size: 11px; color: var(--cor-texto-2); }
.um-vip-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--grad-btn); flex-shrink: 0; }

.um-vip-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
.um-vip-stat {
  background: var(--gold-05); border: 1px solid var(--cor-borda);
  border-radius: 4px; padding: 12px; text-align: center;
}
.um-vip-stat-num { display: block; font-family: 'Playfair Display', serif; font-size: 1.2rem; color: var(--cor-texto); }
.um-vip-stat-label { font-size: 7px; letter-spacing: 2px; color: var(--cor-texto-3); text-transform: uppercase; }

/* ═══════════════════════════════════════════════════════════
   APARÊNCIA
═══════════════════════════════════════════════════════════ */
.um-opcoes-row { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 10px; }
.um-opcao-btn {
  background: var(--input-bg); border: 1px solid var(--cor-borda);
  border-radius: 40px; padding: 8px 20px;
  font-size: 11px; font-weight: 600; color: var(--cor-texto-2);
  cursor: pointer; transition: all 0.2s; font-family: inherit;
}
.um-opcao-btn.ativo {
  background: var(--grad-btn); border-color: transparent; color: #0A0A0A;
}
.um-opcao-btn:hover:not(.ativo) { border-color: var(--cor-primaria); color: var(--cor-primaria); }

/* ═══════════════════════════════════════════════════════════
   SUBMODAIS (DETALHES / CANCELAMENTO / 2FA)
═══════════════════════════════════════════════════════════ */
.um-modal-overlay {
  position: fixed; inset: 0; z-index: 9100;
  background: rgba(0,0,0,0.82); backdrop-filter: blur(16px);
  display: flex; align-items: center; justify-content: center; padding: 20px;
}
.um-submodal {
  background: var(--cor-superficie);
  border: 1px solid var(--cor-borda-hover);
  border-radius: 4px; width: 100%; max-width: 500px;
  max-height: 88vh; overflow-y: auto;
  box-shadow: 0 40px 80px rgba(0,0,0,0.6), var(--shadow-glow);
  animation: popIn 0.35s cubic-bezier(0.16,1,0.3,1);
}
.um-submodal-header {
  display: flex; justify-content: space-between; align-items: center;
  padding: 18px 22px; border-bottom: 1px solid var(--cor-borda);
}
.um-submodal-header h3 {
  font-family: 'Playfair Display', serif;
  font-size: 1.2rem; font-weight: 400; color: var(--cor-texto);
}
.um-modal-close {
  background: none; border: 1px solid var(--cor-borda);
  border-radius: 50%; width: 28px; height: 28px;
  color: var(--cor-texto-3); cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.2s; font-size: 11px;
}
.um-modal-close:hover { border-color: var(--cor-primaria); color: var(--cor-primaria); transform: rotate(90deg); }
.um-submodal-body { padding: 22px; }
.um-submodal-footer {
  padding: 16px 22px; border-top: 1px solid var(--cor-borda);
  display: flex; justify-content: flex-end; gap: 10px;
}

.um-detalhe-row {
  display: flex; justify-content: space-between;
  margin-bottom: 10px; font-size: 13px; color: var(--cor-texto-2);
}
.um-detalhe-row .label { color: var(--cor-primaria); font-weight: 600; }
.um-detalhe-itens { margin-top: 18px; }
.um-detalhe-label {
  font-size: 8px; letter-spacing: 4px; color: var(--cor-primaria);
  text-transform: uppercase; margin-bottom: 10px; font-weight: 700;
}
.um-detalhe-item {
  display: flex; align-items: center; gap: 10px;
  padding: 9px 0; border-bottom: 1px solid var(--cor-borda);
}
.um-detalhe-img { width: 44px; height: 44px; border-radius: 4px; object-fit: cover; background: var(--cor-superficie); border: 1px solid var(--cor-borda); }
.um-detalhe-item-info { flex: 1; }
.um-detalhe-item-info p  { font-size: 12px; color: var(--cor-texto); margin-bottom: 3px; }
.um-detalhe-item-info span { font-size: 10px; color: var(--cor-texto-3); }
.um-preco { font-family: 'Playfair Display', serif; font-size: 13px; color: var(--cor-primaria); }
.um-detalhe-total {
  display: flex; justify-content: space-between;
  margin-top: 16px; padding-top: 10px;
  border-top: 1px solid var(--cor-borda);
  font-size: 15px; font-weight: 700; color: var(--cor-texto);
}
.um-confirm-text { font-size: 13px; color: var(--cor-texto-2); margin-bottom: 16px; text-align: center; }
.um-confirm-text strong { color: var(--cor-texto); }

/* ═══════════════════════════════════════════════════════════
   TOAST
═══════════════════════════════════════════════════════════ */
.um-toast {
  position: fixed; bottom: 28px; right: 28px; z-index: 10000;
  padding: 11px 22px; border-radius: 40px;
  font-size: 11px; font-weight: 600; letter-spacing: 1px;
  backdrop-filter: blur(12px); box-shadow: var(--shadow-glow);
}
.um-toast--ok   { background: rgba(46,204,113,.15); border: 1px solid rgba(46,204,113,.3); color: #2ecc71; }
.um-toast--erro { background: rgba(231,76,60,.12);  border: 1px solid rgba(231,76,60,.3);  color: #e74c3c; }

.toast-enter-active, .toast-leave-active { transition: all 0.35s cubic-bezier(0.19,1,0.22,1); }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(10px); }

/* ═══════════════════════════════════════════════════════════
   SPINNER
═══════════════════════════════════════════════════════════ */
.spinner {
  width: 15px; height: 15px;
  border: 2px solid rgba(10,10,10,.25);
  border-top-color: #0A0A0A;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  display: inline-block;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* ═══════════════════════════════════════════════════════════
   RESPONSIVO
═══════════════════════════════════════════════════════════ */
@media (max-width: 768px) {
  .um-modal { grid-template-columns: 1fr; height: 92vh; }
  .um-aside { border-right: none; border-bottom: 1px solid var(--cor-borda); }
  .um-nav { flex-direction: row; overflow-x: auto; padding: 8px; gap: 4px; scrollbar-width: none; }
  .um-nav::-webkit-scrollbar { display: none; }
  .um-nav-btn { white-space: nowrap; justify-content: center; padding: 7px 12px; }
  .um-sair { margin-top: 10px; }
  .um-sec { padding: 18px 14px; }
  .um-duplo { grid-template-columns: 1fr; }
  .um-vip-stats { grid-template-columns: 1fr; }
}
@media (max-width: 480px) {
  .um-submodal { width: 94%; }
}
</style>
