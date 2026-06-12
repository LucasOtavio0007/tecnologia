<template>
  <div class="cia">

    <!-- ══ BOTÃO PRINCIPAL ══ -->
    <div class="cia-menu-container">
      <button v-show="!chatAberto"
        class="cia-trigger"
        @click="toggleMenu"
        :class="{ 'is-open': menuAberto, 'is-active': chatAberto }"
        title="Consultora IA"
        :aria-expanded="menuAberto"
        aria-haspopup="true"
        aria-label="Abrir menu de assistência"
      >
        <svg
          class="cia-stand"
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle cx="24" cy="24" r="22" stroke="currentColor" stroke-width="0.9"/>
          <circle cx="24" cy="24" r="19" stroke="currentColor" stroke-width="0.4" stroke-dasharray="2 2.5"/>
          <g transform="translate(24,24)">
            <ellipse cx="0" cy="-11" rx="4.8" ry="6.5" fill="currentColor"/>
            <path d="M0,-17.5 C-1.4,-16 -1.4,-13.5 0,-12.5 C1.4,-13.5 1.4,-16 0,-17.5Z" fill="#09090f"/>
          </g>
          <g transform="translate(24,24) rotate(72)">
            <ellipse cx="0" cy="-11" rx="4.8" ry="6.5" fill="currentColor"/>
            <path d="M0,-17.5 C-1.4,-16 -1.4,-13.5 0,-12.5 C1.4,-13.5 1.4,-16 0,-17.5Z" fill="#09090f"/>
          </g>
          <g transform="translate(24,24) rotate(144)">
            <ellipse cx="0" cy="-11" rx="4.8" ry="6.5" fill="currentColor"/>
            <path d="M0,-17.5 C-1.4,-16 -1.4,-13.5 0,-12.5 C1.4,-13.5 1.4,-16 0,-17.5Z" fill="#09090f"/>
          </g>
          <g transform="translate(24,24) rotate(216)">
            <ellipse cx="0" cy="-11" rx="4.8" ry="6.5" fill="currentColor"/>
            <path d="M0,-17.5 C-1.4,-16 -1.4,-13.5 0,-12.5 C1.4,-13.5 1.4,-16 0,-17.5Z" fill="#09090f"/>
          </g>
          <g transform="translate(24,24) rotate(288)">
            <ellipse cx="0" cy="-11" rx="4.8" ry="6.5" fill="currentColor"/>
            <path d="M0,-17.5 C-1.4,-16 -1.4,-13.5 0,-12.5 C1.4,-13.5 1.4,-16 0,-17.5Z" fill="#09090f"/>
          </g>
          <circle cx="24" cy="24" r="4.5" fill="currentColor"/>
          <circle cx="24" cy="24" r="2" fill="#09090f"/>
        </svg>

        <span class="cia-badge" aria-hidden="true">IA</span>
        <span class="cia-dot-online" aria-hidden="true"></span>
        <span class="cia-kanji-float" aria-hidden="true">花</span>
      </button>

      <!-- ══ MENU FLUTUANTE ══ -->
      <transition name="cia-menu-fade">
        <div v-if="menuAberto" class="cia-menu" role="menu" aria-label="Opções de assistência">
          <div class="cia-menu-realm-line" aria-hidden="true"></div>
          <div class="cia-menu-head" aria-hidden="true">
            <span class="cia-menu-orn-line"></span>
            <span class="cia-menu-gem">◆</span>
            <span class="cia-menu-orn-line cia-menu-orn-line--r"></span>
          </div>

          <button class="cia-menu-item" role="menuitem" @click="abrirChat">
            <span class="cia-menu-num" aria-hidden="true">一</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            Consultora IA
          </button>

          <button class="cia-menu-item" role="menuitem" @click="irParaSuporte">
            <span class="cia-menu-num" aria-hidden="true">二</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <circle cx="12" cy="12" r="10"/>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            Central de Suporte
          </button>

          <div class="cia-menu-kanji" aria-hidden="true">桜</div>
        </div>
      </transition>
    </div>

    <!-- ══ JANELA DO CHAT ══ -->
    <transition name="cia-slide">
      <div v-if="chatAberto" class="cia-janela" role="dialog" aria-modal="true" aria-label="Chat com Consultora IA">

        <div class="cia-janela-realm-line" aria-hidden="true"></div>

        <!-- ── HEADER ── -->
        <header class="cia-header">
          <div class="cia-header-seigaiha" aria-hidden="true">
            <svg width="100%" height="100%" aria-hidden="true">
              <defs>
                <pattern id="seg-cia" x="0" y="0" width="16" height="12" patternUnits="userSpaceOnUse">
                  <path d="M8 0 Q16 4 8 8 Q0 4 8 0Z" fill="none" stroke="rgba(200,168,75,0.07)" stroke-width="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#seg-cia)"/>
            </svg>
          </div>

          <div class="cia-header-avatar" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="24" cy="24" r="22" stroke="currentColor" stroke-width="1.5"/>
              <g transform="translate(24,24)"><ellipse cx="0" cy="-11" rx="4.8" ry="6.5" fill="currentColor"/><path d="M0,-17.5 C-1.4,-16 -1.4,-13.5 0,-12.5 C1.4,-13.5 1.4,-16 0,-17.5Z" fill="#0A0A0A"/></g>
              <g transform="translate(24,24) rotate(72)"><ellipse cx="0" cy="-11" rx="4.8" ry="6.5" fill="currentColor"/><path d="M0,-17.5 C-1.4,-16 -1.4,-13.5 0,-12.5 C1.4,-13.5 1.4,-16 0,-17.5Z" fill="#0A0A0A"/></g>
              <g transform="translate(24,24) rotate(144)"><ellipse cx="0" cy="-11" rx="4.8" ry="6.5" fill="currentColor"/><path d="M0,-17.5 C-1.4,-16 -1.4,-13.5 0,-12.5 C1.4,-13.5 1.4,-16 0,-17.5Z" fill="#0A0A0A"/></g>
              <g transform="translate(24,24) rotate(216)"><ellipse cx="0" cy="-11" rx="4.8" ry="6.5" fill="currentColor"/><path d="M0,-17.5 C-1.4,-16 -1.4,-13.5 0,-12.5 C1.4,-13.5 1.4,-16 0,-17.5Z" fill="#0A0A0A"/></g>
              <g transform="translate(24,24) rotate(288)"><ellipse cx="0" cy="-11" rx="4.8" ry="6.5" fill="currentColor"/><path d="M0,-17.5 C-1.4,-16 -1.4,-13.5 0,-12.5 C1.4,-13.5 1.4,-16 0,-17.5Z" fill="#0A0A0A"/></g>
              <circle cx="24" cy="24" r="4.5" fill="currentColor"/>
              <circle cx="24" cy="24" r="2" fill="#0A0A0A"/>
            </svg>
          </div>

          <div class="cia-header-info">
            <p class="cia-header-nome">Noir IA</p>
            <p class="cia-header-status">
              <span class="cia-status-dot" aria-hidden="true"></span>
              Online · Consultora Noir & Or
            </p>
          </div>

          <div class="cia-header-acoes">
            <button class="cia-header-btn" @click="confirmarLimpar" title="Limpar conversa" aria-label="Limpar conversa">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
              </svg>
            </button>
            <button class="cia-header-btn" @click="chatAberto = false" title="Fechar" aria-label="Fechar chat">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true">
                <line x1="5" y1="5" x2="19" y2="19"/>
                <line x1="19" y1="5" x2="5" y2="19"/>
              </svg>
            </button>
          </div>
        </header>

        <!-- ── CONFIRMAÇÃO LIMPAR ── -->
        <transition name="cia-confirm">
          <div v-if="confirmandoLimpar" class="cia-confirm-bar" role="alert">
            <span class="cia-confirm-txt">Apagar toda a conversa?</span>
            <div class="cia-confirm-btns">
              <button class="cia-confirm-sim" @click="limparChat">Sim</button>
              <button class="cia-confirm-nao" @click="confirmandoLimpar = false">Cancelar</button>
            </div>
          </div>
        </transition>

        <!-- ── MENSAGENS ── -->
        <div class="cia-msgs" ref="msgsRef" role="log" aria-live="polite" aria-label="Conversa">
          <div class="cia-msgs-kamon" aria-hidden="true">桜</div>

          <div
            v-for="(msg, i) in mensagens"
            :key="i"
            :class="['cia-msg', msg.role === 'user' ? 'cia-msg--user' : 'cia-msg--ia']"
          >
            <div v-if="msg.role === 'assistant'" class="cia-msg-avatar" aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 48 48" fill="none">
                <g transform="translate(24,24)"><ellipse cx="0" cy="-11" rx="4.8" ry="6.5" fill="currentColor"/></g>
                <g transform="translate(24,24) rotate(72)"><ellipse cx="0" cy="-11" rx="4.8" ry="6.5" fill="currentColor"/></g>
                <g transform="translate(24,24) rotate(144)"><ellipse cx="0" cy="-11" rx="4.8" ry="6.5" fill="currentColor"/></g>
                <g transform="translate(24,24) rotate(216)"><ellipse cx="0" cy="-11" rx="4.8" ry="6.5" fill="currentColor"/></g>
                <g transform="translate(24,24) rotate(288)"><ellipse cx="0" cy="-11" rx="4.8" ry="6.5" fill="currentColor"/></g>
                <circle cx="24" cy="24" r="4" fill="currentColor"/>
              </svg>
            </div>

            <div
              :class="[
                'cia-bubble',
                msg.role === 'assistant' ? 'cia-bubble--ia' : 'cia-bubble--user',
                msg.isError ? 'cia-bubble--erro' : ''
              ]"
              v-html="formatMsg(msg.content)"
            ></div>
          </div>

          <!-- typing indicator -->
          <div v-if="carregando" class="cia-msg cia-msg--ia" aria-label="Consultora digitando">
            <div class="cia-msg-avatar" aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 48 48" fill="none">
                <g transform="translate(24,24)"><ellipse cx="0" cy="-11" rx="4.8" ry="6.5" fill="currentColor"/></g>
                <g transform="translate(24,24) rotate(72)"><ellipse cx="0" cy="-11" rx="4.8" ry="6.5" fill="currentColor"/></g>
                <g transform="translate(24,24) rotate(144)"><ellipse cx="0" cy="-11" rx="4.8" ry="6.5" fill="currentColor"/></g>
                <g transform="translate(24,24) rotate(216)"><ellipse cx="0" cy="-11" rx="4.8" ry="6.5" fill="currentColor"/></g>
                <g transform="translate(24,24) rotate(288)"><ellipse cx="0" cy="-11" rx="4.8" ry="6.5" fill="currentColor"/></g>
                <circle cx="24" cy="24" r="4" fill="currentColor"/>
              </svg>
            </div>
            <div class="cia-bubble cia-bubble--ia cia-bubble--loading">
              <span></span><span></span><span></span>
            </div>
          </div>
        </div>

        <!-- ── SUGESTÕES ── -->
        <transition name="cia-fade">
          <div v-if="mostrarSugestoes" class="cia-sugestoes" role="list" aria-label="Sugestões de perguntas">
            <button
              v-for="s in sugestoes"
              :key="s"
              class="cia-sug"
              role="listitem"
              @click="enviar(s)"
            >
              <span class="cia-sug-gem" aria-hidden="true">◆</span>
              {{ s }}
            </button>
          </div>
        </transition>

        <!-- ── INPUT ── -->
        <div class="cia-input-wrap">
          <div class="cia-input-orn" aria-hidden="true">
            <svg width="9" height="16" viewBox="0 0 9 24" fill="none">
              <line x1="4.5" y1="0" x2="4.5" y2="17" stroke="rgba(200,168,75,0.3)" stroke-width="0.7"/>
              <path d="M2 14 L4.5 12.5 L7 14 L4.5 15.5Z" fill="rgba(200,168,75,0.28)"/>
            </svg>
          </div>

          <input
            v-model="inputMsg"
            placeholder="Pergunte sobre nossa coleção..."
            @keyup.enter="enviar()"
            :disabled="carregando"
            class="cia-input"
            autocomplete="off"
            ref="inputRef"
            maxlength="500"
            aria-label="Campo de mensagem"
          />

          <span
            v-if="inputMsg.length > 400"
            class="cia-char-count"
            :class="{ 'cia-char-count--warn': inputMsg.length > 470 }"
            aria-live="polite"
          >{{ 500 - inputMsg.length }}</span>

          <button
            class="cia-send"
            @click="enviar()"
            :disabled="carregando || !inputMsg.trim()"
            aria-label="Enviar mensagem"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

        <p class="cia-footer-watermark" aria-hidden="true">桜</p>

      </div>
    </transition>

  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

let router = null
try { router = useRouter() } catch {}

// ════════════════════════════════════════════════════
// ⚠️  CONFIGURAÇÃO — coloque sua chave aqui
//     Ou use uma variável de ambiente: import.meta.env.VITE_GROQ_KEY
// ════════════════════════════════════════════════════
const GROQ_API_KEY = import.meta.env.VITE_GROQ_KEY ?? 'SUA_CHAVE_AQUI'

// System prompt — define a personalidade e conhecimento da Noir
const SYSTEM_PROMPT = `Você é Noir, consultora virtual exclusiva da Noir & Or — marca de tecnologia de luxo.

Seu estilo é sofisticado, preciso e elegante. Respostas curtas, diretas e refinadas. Nunca prolixo.

SOBRE A NOIR & OR:
- Especializada em tecnologia de luxo: MacBooks, iPhones, iPads, acessórios premium
- Produtos com acabamento em ouro 18k e 24k disponíveis
- Frete VIP: entrega em até 24h com embalagem premium
- Parcelamento em até 12x sem juros
- Garantia estendida de 2 anos em todos os produtos

REGRAS:
- Responda SEMPRE em português brasileiro
- Use **negrito** para destacar produtos ou valores importantes
- Máximo 3 parágrafos por resposta
- Se não souber algo específico do estoque, oriente o cliente a entrar em contato pelo WhatsApp
- Nunca invente preços ou disponibilidade de produtos específicos
- Seja calorosa mas profissional — trate o cliente como um convidado especial`

/* ── Estado ── */
const chatAberto        = ref(false)
const menuAberto        = ref(false)
const inputMsg          = ref('')
const carregando        = ref(false)
const confirmandoLimpar = ref(false)
const msgsRef           = ref(null)
const inputRef          = ref(null)

/* ── Sugestões ── */
const sugestoes = [
  'Quais produtos estão em destaque?',
  'Tem MacBook disponível?',
  'Como funciona o frete VIP?',
  'Qual a diferença entre ouro 18k e 24k?',
]

/* ── Mensagem inicial ── */
const MSG_INICIAL = {
  role: 'assistant',
  content: 'Olá! Sou a **Noir**, consultora virtual da Noir & Or. Estou aqui para ajudá-lo a encontrar a peça perfeita da nossa coleção exclusiva de tecnologia de luxo. Como posso ajudar?',
  isError: false,
}

const mensagens = ref([{ ...MSG_INICIAL }])

const mostrarSugestoes = computed(() => mensagens.value.length <= 1 && !carregando.value)

/* ── Ações de navegação ── */
const toggleMenu = () => { menuAberto.value = !menuAberto.value }

const abrirChat = async () => {
  menuAberto.value = false
  chatAberto.value = true
  await nextTick()
  inputRef.value?.focus()
}

const irParaSuporte = () => {
  menuAberto.value = false
  router?.push?.('/contato')
}

/* ── Scroll ── */
const scrollBottom = async () => {
  await nextTick()
  if (msgsRef.value) msgsRef.value.scrollTop = msgsRef.value.scrollHeight
}

/* ── Formatar markdown simples ── */
const formatMsg = (text) => {
  if (!text) return ''
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br/>')
}

/* ── Limpar conversa ── */
const confirmarLimpar = () => {
  if (mensagens.value.length <= 1) return
  confirmandoLimpar.value = true
}

const limparChat = () => {
  mensagens.value = [{ ...MSG_INICIAL }]
  confirmandoLimpar.value = false
  scrollBottom()
}

/* ════════════════════════════════════════════════════
   ENVIAR — chama a API do Groq (gratuito)
════════════════════════════════════════════════════ */
const enviar = async (texto) => {
  const msg = (texto || inputMsg.value).trim()
  if (!msg || carregando.value) return

  inputMsg.value = ''
  confirmandoLimpar.value = false

  mensagens.value.push({ role: 'user', content: msg, isError: false })
  await scrollBottom()

  carregando.value = true

  try {
    const historico = mensagens.value
      .slice(1)
      .map(m => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.content
      }))

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        max_tokens: 512,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...historico,
        ],
      }),
    })

    if (!response.ok) {
      const err = await response.json().catch(() => ({}))
      const status = response.status
      if (status === 401) throw new Error('API_KEY_INVALIDA')
      if (status === 429) throw new Error('RATE_LIMIT')
      throw new Error(err?.error?.message || `HTTP ${status}`)
    }

    const data = await response.json()
    const resposta = data?.choices?.[0]?.message?.content

    if (!resposta) throw new Error('Resposta vazia da API')

    mensagens.value.push({ role: 'assistant', content: resposta, isError: false })

  } catch (error) {
    console.error('[Noir IA] Erro:', error.message)

    let msgErro = 'Desculpe, estou com dificuldades técnicas agora. Entre em contato pelo WhatsApp para atendimento imediato. 🌸'

    if (error.message === 'API_KEY_INVALIDA') {
      msgErro = 'Configuração pendente. Por favor, insira uma chave de API válida.'
    } else if (error.message === 'RATE_LIMIT') {
      msgErro = 'Muitas mensagens em pouco tempo. Aguarde um momento e tente novamente.'
    }

    mensagens.value.push({ role: 'assistant', content: msgErro, isError: true })
  } finally {
    carregando.value = false
    await scrollBottom()
  }
}


/* ── Fechar ao clicar fora ── */
const handleClickOutside = (e) => {
  if (!e.target.closest('.cia-menu-container')) menuAberto.value = false
  if (!e.target.closest('.cia-confirm-bar') && !e.target.closest('.cia-header-btn')) {
    confirmandoLimpar.value = false
  }
}

const handleKeydown = (e) => {
  if (e.key === 'Escape') {
    if (chatAberto.value) chatAberto.value = false
    if (menuAberto.value) menuAberto.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleKeydown)
})
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
/* ══════════════════════════════════════════════════════
   CONSULTORA IA — NOIR & OR
   Ícone Sakura (mon japonês) · Sistema OR completo
══════════════════════════════════════════════════════ */

.cia {
  position: fixed;
  bottom: 28px;
  right: 28px;
  z-index: 8500;
  font-family: var(--font-sans, 'Syne', sans-serif);
}

/* ══ KEYFRAMES ══════════════════════════════════════ */
@keyframes sakuraFloat {
  0%,100% { transform: translateY(0) rotate(0deg); }
  30%     { transform: translateY(-4px) rotate(3deg); }
  70%     { transform: translateY(-2px) rotate(-2deg); }
}
@keyframes sakuraSpin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
@keyframes auraPulse {
  0%,100% {
    opacity: 0.50;
    box-shadow: 0 0 18px 6px rgba(200,168,75,0.28), 0 0 44px 14px rgba(200,168,75,0.10);
  }
  50% {
    opacity: 0.80;
    box-shadow: 0 0 28px 10px rgba(200,168,75,0.44), 0 0 64px 22px rgba(200,168,75,0.16);
  }
}
@keyframes badgeFloat {
  0%,100% { transform: translateX(-50%) translateY(0); }
  50%     { transform: translateX(-50%) translateY(-2px); }
}
@keyframes dotBlink {
  0%,100% { opacity: 1; }
  50%     { opacity: 0.38; }
}
@keyframes kanjiRise {
  0%   { opacity: 0; transform: translateY(2px); }
  20%  { opacity: 0.75; }
  100% { opacity: 0; transform: translateY(-20px) scale(0.75); }
}
@keyframes ciaDot {
  0%,80%,100% { transform: scale(0.65); opacity: 0.45; }
  40%         { transform: scale(1);    opacity: 1; }
}
@keyframes menuSlide {
  from { opacity: 0; transform: translateY(14px) scale(0.95); }
  to   { opacity: 1; transform: translateY(0)    scale(1); }
}
@keyframes ciaSlideUp {
  from { opacity: 0; transform: translateY(28px) scale(0.93); }
  to   { opacity: 1; transform: translateY(0)    scale(1); }
}
@keyframes confirmIn {
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes sugIn {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ══ BOTÃO ══════════════════════════════════════════ */
.cia-trigger {
  width: 64px; height: 64px;
  background: none; border: none; border-radius: 0; box-shadow: none;
  cursor: pointer; position: relative;
  display: flex; align-items: center; justify-content: center;
  overflow: visible; padding: 0; outline: none;
}
.cia-trigger:focus-visible { outline: 1px solid var(--or-gold, #F5A623); outline-offset: 3px; }


.cia-stand {
  position: relative; z-index: 2;
  color: var(--or-gold, #C8A84B);
  animation: sakuraFloat 5s ease-in-out infinite;
  filter: drop-shadow(0 0 8px rgba(200,168,75,0.30));
  transition: filter 0.35s;
  will-change: transform, filter;
}
.cia-trigger:hover .cia-stand {
  animation: sakuraSpin 1.8s cubic-bezier(0.16,1,0.3,1) forwards;
  filter: drop-shadow(0 0 16px rgba(200,168,75,0.75));
}
.cia-trigger.is-active .cia-stand {
  animation: sakuraSpin 0.6s cubic-bezier(0.36,0.07,0.19,0.97) forwards;
  filter: drop-shadow(0 0 20px rgba(200,168,75,0.95));
}

.cia-badge {
  position: absolute; bottom: -4px; left: 50%; transform: translateX(-50%);
  background: rgba(200,168,75,0.12); border: 0.5px solid rgba(200,168,75,0.52);
  border-radius: 3px; padding: 1px 6px;
  font-family: var(--font-sans, 'Syne', sans-serif);
  font-size: 8px; font-weight: 700; letter-spacing: 0.18em;
  color: rgba(200,168,75,0.92); pointer-events: none; z-index: 5;
  animation: badgeFloat 3.4s ease-in-out infinite;
  white-space: nowrap; 
  -webkit-backdrop-filter: blur(4px);
backdrop-filter: blur(4px);
}

.cia-dot-online {
  position: absolute; top: 4px; right: 4px;
  width: 9px; height: 9px;
  background: #2ecc71; border-radius: 50%;
  border: 1.5px solid rgba(0,0,0,0.28);
  box-shadow: 0 0 8px rgba(46,204,113,0.9);
  animation: dotBlink 2.2s ease infinite; z-index: 6;
}

.cia-kanji-float {
  position: absolute; top: 0; left: 2px;
  font-family: var(--font-jp, 'Noto Serif JP', serif);
  font-size: 9px; color: rgba(200,168,75,0.65);
  pointer-events: none; opacity: 0; z-index: 3;
}
.cia-trigger:hover .cia-kanji-float { animation: kanjiRise 1.1s ease-out forwards; }

/* ══ MENU FLUTUANTE ════════════════════════════════ */
.cia-menu-container { position: relative; }

.cia-menu {
  position: absolute; bottom: 76px; right: 0;
  background: var(--or-deep, #09090f);
  border: 0.5px solid var(--or-hair, rgba(245,166,35,0.12));
  width: 218px;
  box-shadow: 0 24px 64px rgba(0,0,0,0.6), 0 0 40px rgba(200,168,75,0.05);
  overflow: hidden;
  animation: menuSlide 0.28s cubic-bezier(0.16,1,0.30,1);
  z-index: 10;
}

.cia-menu-realm-line {
  height: 0.5px;
  background: linear-gradient(90deg, transparent 5%, rgba(212,175,55,0.6) 20%, #F5A623 50%, rgba(212,175,55,0.6) 80%, transparent 95%);
  opacity: 0.65;
}

.cia-menu-head { display: flex; align-items: center; gap: 8px; padding: 9px 14px 5px; }
.cia-menu-orn-line {
  flex: 1; height: 0.5px;
  background: linear-gradient(90deg, var(--or-gold, #F5A623), transparent);
  opacity: 0.15;
}
.cia-menu-orn-line--r { background: linear-gradient(270deg, var(--or-gold, #F5A623), transparent); }
.cia-menu-gem { font-size: 5px; color: var(--or-gold, #F5A623); opacity: 0.3; }

.cia-menu-item {
  display: flex; align-items: center; gap: 11px;
  padding: 12px 16px; width: 100%;
  background: none; border: none;
  font-family: var(--font-sans, 'Syne', sans-serif);
  font-size: 11px; font-weight: 400; letter-spacing: 0.04em;
  color: var(--or-silk-2, rgba(237,232,224,0.50));
  cursor: pointer; position: relative;
  transition: color 0.25s, padding-left 0.28s;
  text-align: left;
}
.cia-menu-item::before {
  content: ''; position: absolute;
  left: 0; top: 8px; bottom: 8px; width: 0.5px;
  background: var(--or-gold, #F5A623); opacity: 0; transition: opacity 0.25s;
}
.cia-menu-item::after {
  content: ''; position: absolute; inset: 0;
  background: rgba(200,168,75,0.05);
  transform: scaleX(0); transform-origin: left;
  transition: transform 0.38s cubic-bezier(0.16,1,0.3,1); z-index: 0;
}
.cia-menu-item:hover::before  { opacity: 0.65; }
.cia-menu-item:hover::after   { transform: scaleX(1); }
.cia-menu-item:hover { color: var(--or-silk, #ede8e0); padding-left: 22px; }
.cia-menu-item svg  { flex-shrink: 0; opacity: 0.55; transition: opacity 0.25s; position: relative; z-index: 1; color: var(--or-gold, #F5A623); }
.cia-menu-item:hover svg { opacity: 1; }
.cia-menu-num {
  font-family: var(--font-jp, 'Noto Serif JP', serif);
  font-size: 11px; color: var(--or-gold, #F5A623);
  opacity: 0.22; line-height: 1; flex-shrink: 0;
  transition: opacity 0.25s; position: relative; z-index: 1;
}
.cia-menu-item:hover .cia-menu-num { opacity: 0.55; }
.cia-menu-kanji {
  text-align: center; padding: 4px 0 10px;
  font-family: var(--font-jp, 'Noto Serif JP', serif);
  font-size: 14px; font-weight: 300;
  color: var(--or-gold, #F5A623); opacity: 0.10;
  letter-spacing: 0.35em; user-select: none;
}

.cia-menu-fade-enter-active,
.cia-menu-fade-leave-active { transition: opacity 0.2s, transform 0.22s cubic-bezier(0.16,1,0.30,1); }
.cia-menu-fade-enter-from,
.cia-menu-fade-leave-to     { opacity: 0; transform: translateY(12px) scale(0.96); }

/* ══ JANELA DO CHAT ════════════════════════════════ */
.cia-janela {
  position: absolute; bottom: 76px; right: 0;
  width: 368px; height: 530px;
  background: var(--or-deep, #09090f);
  border: 0.5px solid var(--or-hair, rgba(245,166,35,0.12));
  border-radius: 0;
  display: flex; flex-direction: column;
  overflow: hidden;
  box-shadow: 0 24px 64px rgba(0,0,0,0.65), 0 0 28px rgba(200,168,75,0.07);
  position: relative; /* para o watermark absolute funcionar */
}

.cia-janela-realm-line {
  height: 0.5px;
  background: linear-gradient(90deg, transparent 5%, rgba(212,175,55,0.6) 20%, #F5A623 50%, rgba(212,175,55,0.6) 80%, transparent 95%);
  opacity: 0.65; flex-shrink: 0;
}

/* ── HEADER ── */
.cia-header {
  display: flex; align-items: center; gap: 10px;
  padding: 13px 16px;
  background: rgba(245,166,35,0.03);
  border-bottom: 0.5px solid var(--or-hair-2, rgba(237,232,224,0.07));
  flex-shrink: 0; position: relative; overflow: hidden;
}
.cia-header-seigaiha { position: absolute; inset: 0; pointer-events: none; opacity: 0.55; }

.cia-header-avatar {
  width: 36px; height: 36px; border-radius: 50%;
  background: var(--grad-btn, linear-gradient(135deg,#F5A623,#FF7A20));
  border: 0.5px solid var(--or-hair, rgba(245,166,35,0.12));
  display: flex; align-items: center; justify-content: center;
  color: #0A0A0A; flex-shrink: 0; position: relative; z-index: 1;
}

.cia-header-info { flex: 1; min-width: 0; position: relative; z-index: 1; }
.cia-header-nome {
  font-family: var(--font-serif, 'Playfair Display', serif);
  font-size: 12px; font-weight: 400; font-style: italic;
  color: var(--or-silk, #ede8e0); letter-spacing: 0.06em;
}
.cia-header-status {
  display: flex; align-items: center; gap: 5px;
  font-size: 9px; color: var(--or-silk-3, rgba(237,232,224,0.22));
  margin-top: 2px; letter-spacing: 0.04em;
}
.cia-status-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: #2ecc71; box-shadow: 0 0 6px rgba(46,204,113,0.75); flex-shrink: 0;
}

.cia-header-acoes { display: flex; gap: 5px; position: relative; z-index: 1; }
.cia-header-btn {
  width: 28px; height: 28px;
  background: rgba(245,166,35,0.06);
  border: 0.5px solid var(--or-hair-2, rgba(237,232,224,0.07));
  border-radius: 0;
  display: flex; align-items: center; justify-content: center;
  color: var(--or-silk-3, rgba(237,232,224,0.22));
  cursor: pointer;
  transition: border-color 0.25s, color 0.25s, transform 0.35s;
}
.cia-header-btn:hover { border-color: var(--or-gold, #F5A623); color: var(--or-gold, #F5A623); transform: rotate(15deg); }

/* ── CONFIRMAÇÃO LIMPAR ── */
.cia-confirm-bar {
  display: flex; align-items: center; justify-content: space-between;
  padding: 8px 16px;
  background: rgba(239,68,68,0.05);
  border-bottom: 0.5px solid rgba(239,68,68,0.22);
  flex-shrink: 0; animation: confirmIn 0.22s ease;
}
.cia-confirm-txt { font-family: var(--font-sans, 'Syne', sans-serif); font-size: 10px; letter-spacing: 0.06em; color: rgba(239,68,68,0.82); }
.cia-confirm-btns { display: flex; gap: 6px; }
.cia-confirm-sim {
  background: rgba(239,68,68,0.12); border: 0.5px solid rgba(239,68,68,0.42);
  padding: 4px 12px;
  font-family: var(--font-sans, 'Syne', sans-serif);
  font-size: 9px; letter-spacing: 0.15em; text-transform: uppercase;
  color: #ef4444; cursor: pointer; transition: background 0.2s;
}
.cia-confirm-sim:hover { background: rgba(239,68,68,0.22); }
.cia-confirm-nao {
  background: none; border: 0.5px solid var(--or-hair-2, rgba(237,232,224,0.07));
  padding: 4px 12px;
  font-family: var(--font-sans, 'Syne', sans-serif);
  font-size: 9px; letter-spacing: 0.15em; text-transform: uppercase;
  color: var(--or-silk-3, rgba(237,232,224,0.22));
  cursor: pointer; transition: border-color 0.2s, color 0.2s;
}
.cia-confirm-nao:hover { border-color: var(--or-hair, rgba(245,166,35,0.12)); color: var(--or-silk-2, rgba(237,232,224,0.50)); }

.cia-confirm-enter-active,
.cia-confirm-leave-active { transition: all 0.2s; }
.cia-confirm-enter-from,
.cia-confirm-leave-to { opacity: 0; transform: translateY(-8px); }

/* ── MENSAGENS ── */

.cia-msgs::-webkit-scrollbar { width: 6px; }
.cia-msgs::-webkit-scrollbar-track { background: transparent; }
.cia-msgs::-webkit-scrollbar-thumb { background: var(--or-hair, rgba(245,166,35,.12)); border-radius: 3px; }

.cia-msgs {
  flex: 1; overflow-y: auto;
  padding: 14px;
  display: flex; flex-direction: column; gap: 10px;
  scrollbar-width: thin;
  scrollbar-color: var(--or-hair, rgba(245,166,35,0.12)) transparent;
  position: relative;
}
.cia-msgs-kamon {
  position: absolute; right: 10px; top: 50%; transform: translateY(-50%);
  font-family: var(--font-jp, 'Noto Serif JP', serif);
  font-size: 5rem; font-weight: 300;
  color: var(--or-gold, #F5A623); opacity: 0.025;
  pointer-events: none; user-select: none; line-height: 1;
}

.cia-msg { display: flex; align-items: flex-end; gap: 7px; }
.cia-msg--user { justify-content: flex-end; }
.cia-msg--ia   { justify-content: flex-start; }

.cia-msg-avatar {
  width: 26px; height: 26px; border-radius: 50%;
  background: rgba(245,166,35,0.08);
  border: 0.5px solid var(--or-hair-2, rgba(237,232,224,0.07));
  display: flex; align-items: center; justify-content: center;
  color: var(--or-gold, #F5A623); flex-shrink: 0;
}

.cia-bubble {
  max-width: 82%; padding: 10px 13px;
  font-family: var(--font-sans, 'Syne', sans-serif);
  font-size: 13px; line-height: 1.65; font-weight: 300;
}
.cia-bubble--user {
  background: var(--grad-btn, linear-gradient(135deg,#F5A623,#FF7A20));
  color: #0A0A0A; border-bottom-right-radius: 3px;
}
.cia-bubble--ia {
  background: rgba(245,166,35,0.04);
  border: 0.5px solid var(--or-hair-2, rgba(237,232,224,0.07));
  color: var(--or-silk-2, rgba(237,232,224,0.50));
  border-bottom-left-radius: 3px; position: relative;
}
.cia-bubble--ia::before {
  content: ''; position: absolute;
  left: 0; top: 18%; bottom: 18%; width: 0.5px;
  background: linear-gradient(to bottom, transparent, var(--or-gold, #F5A623), transparent);
  opacity: 0.28;
}
.cia-bubble--erro {
  background: rgba(239,68,68,0.05) !important;
  border-color: rgba(239,68,68,0.25) !important;
  color: rgba(239,68,68,0.82) !important;
}
.cia-bubble--erro::before {
  background: linear-gradient(to bottom, transparent, rgba(239,68,68,0.4), transparent) !important;
}
.cia-bubble--loading { display: flex; align-items: center; gap: 5px; padding: 14px 16px; }
.cia-bubble--loading span {
  width: 7px; height: 7px; border-radius: 50%;
  background: var(--or-gold, #F5A623);
  animation: ciaDot 1.2s infinite;
}
.cia-bubble--loading span:nth-child(2) { animation-delay: 0.2s; }
.cia-bubble--loading span:nth-child(3) { animation-delay: 0.4s; }

/* ── SUGESTÕES ── */
.cia-sugestoes {
  padding: 6px 14px 8px;
  display: flex; flex-wrap: wrap; gap: 5px;
}
.cia-sug {
  display: inline-flex; align-items: center; gap: 6px;
  background: rgba(245,166,35,0.04);
  border: 0.5px solid var(--or-hair-2, rgba(237,232,224,0.07));
  padding: 5px 11px;
  font-family: var(--font-sans, 'Syne', sans-serif);
  font-size: 10px; font-weight: 400; letter-spacing: 0.04em;
  color: var(--or-silk-2, rgba(237,232,224,0.50));
  cursor: pointer; position: relative; overflow: hidden;
  transition: border-color 0.25s, color 0.25s;
  animation: sugIn 0.35s ease both;
}
.cia-sug:nth-child(2) { animation-delay: 0.05s; }
.cia-sug:nth-child(3) { animation-delay: 0.10s; }
.cia-sug:nth-child(4) { animation-delay: 0.15s; }
.cia-sug::before {
  content: ''; position: absolute; inset: 0;
  background: rgba(200,168,75,0.07);
  transform: scaleX(0); transform-origin: left;
  transition: transform 0.38s cubic-bezier(0.16,1,0.3,1); z-index: 0;
}
.cia-sug:hover::before  { transform: scaleX(1); }
.cia-sug:hover { border-color: var(--or-gold, #F5A623); color: var(--or-silk, #ede8e0); }
.cia-sug-gem { font-size: 4.5px; color: var(--or-gold, #F5A623); opacity: 0.28; position: relative; z-index: 1; transition: opacity 0.25s; }
.cia-sug:hover .cia-sug-gem { opacity: 0.65; }

.cia-fade-enter-active { transition: opacity 0.3s, transform 0.3s; }
.cia-fade-leave-active { transition: opacity 0.2s; }
.cia-fade-enter-from   { opacity: 0; transform: translateY(6px); }
.cia-fade-leave-to     { opacity: 0; }

/* ── INPUT ── */
.cia-input-wrap {
  display: flex; align-items: center; gap: 8px;
  padding: 12px 14px;
  border-top: 0.5px solid var(--or-hair-2, rgba(237,232,224,0.07));
  flex-shrink: 0; position: relative;
}
.cia-input-wrap::before {
  content: ''; position: absolute; top: 0; left: 18%; right: 18%; height: 0.5px;
  background: linear-gradient(90deg, transparent, rgba(200,168,75,0.22), transparent);
}
.cia-input-orn { display: flex; align-items: center; opacity: 0.45; flex-shrink: 0; }

.cia-input {
  flex: 1;
  background: rgba(245,166,35,0.03);
  border: 0.5px solid var(--or-hair-2, rgba(237,232,224,0.07));
  border-radius: 0; padding: 9px 13px;
  color: var(--or-silk, #ede8e0);
  font-family: var(--font-sans, 'Syne', sans-serif);
  font-size: 12px; font-weight: 300; letter-spacing: 0.03em;
  outline: none; transition: border-color 0.28s, box-shadow 0.28s;
  -webkit-text-fill-color: var(--or-silk, #ede8e0);
  caret-color: var(--or-gold, #F5A623);
}
.cia-input:focus { border-color: rgba(200,168,75,0.35); box-shadow: 0 0 0 2px rgba(200,168,75,0.06); }
.cia-input::placeholder { color: var(--or-silk-4, rgba(237,232,224,0.10)); font-size: 11px; letter-spacing: 0.07em; }
.cia-input:disabled { opacity: 0.4; cursor: not-allowed; }

.cia-char-count {
  font-family: var(--font-mono, 'DM Mono', monospace);
  font-size: 9px; color: var(--or-silk-3, rgba(237,232,224,0.22));
  flex-shrink: 0; letter-spacing: 0.05em; transition: color 0.2s;
}
.cia-char-count--warn { color: rgba(239,68,68,0.72); }

.cia-send {
  width: 36px; height: 36px; border-radius: 0;
  background: transparent; border: 0.5px solid var(--or-gold, #F5A623);
  color: var(--or-gold, #F5A623); cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; position: relative; overflow: hidden;
  transition: color 0.45s; z-index: 0;
}
.cia-send::before {
  content: ''; position: absolute; inset: 0;
  background: var(--or-gold, #F5A623);
  transform: scaleX(0); transform-origin: left;
  transition: transform 0.5s cubic-bezier(0.16,1,0.3,1); z-index: -1;
}
.cia-send:hover:not(:disabled)::before { transform: scaleX(1); }
.cia-send:hover:not(:disabled) { color: var(--or-void, #06060d); }
.cia-send:disabled { opacity: 0.28; cursor: not-allowed; border-color: var(--or-hair-2); }
.cia-send svg { position: relative; z-index: 1; }

.cia-footer-watermark {
  position: absolute; bottom: 58px; right: 10px;
  font-family: var(--font-jp, 'Noto Serif JP', serif);
  font-size: 9px; font-weight: 300; letter-spacing: 0.22em;
  color: var(--or-gold, #F5A623); opacity: 0.09;
  pointer-events: none; user-select: none; z-index: 0;
}

/* ── TRANSIÇÃO JANELA ── */
.cia-slide-enter-active { animation: ciaSlideUp 0.48s cubic-bezier(0.16,1,0.22,1); }
.cia-slide-leave-active { animation: ciaSlideUp 0.26s reverse ease-in; }

/* ══ RESPONSIVO ════════════════════════════════════ */
@media (max-width: 480px) {
  .cia { bottom: 16px; right: 16px; }
  .cia-janela { width: calc(100vw - 32px); height: calc(100dvh - 100px); right: -8px; bottom: 80px; }
  .cia-trigger { width: 56px; height: 56px; }
  .cia-stand   { width: 40px; height: 40px; }
  .cia-menu    { width: 196px; bottom: 72px; }
}

@media (prefers-reduced-motion: reduce) {
  .cia-stand, .cia-aura, .cia-badge, .cia-dot-online, .cia-bubble--loading span {
    animation: none !important;
  }
}
</style>