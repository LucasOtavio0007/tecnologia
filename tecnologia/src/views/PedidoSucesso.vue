<template>
  <main class="sucesso-page">
    <div class="sucesso-inner">

      <!-- Loading -->
      <div v-if="loading" class="sucesso-loading">
        <div class="loading-ring"></div>
        <p>{{ $t('carregando.pedido') }}</p>
      </div>

      <!-- Erro -->
      <div v-else-if="!pedido" class="sucesso-erro">
        <p>{{ $t('pedido.nao.encontrado') }}</p>
        <router-link to="/" class="btn-ouro">{{ $t('voltar.ao.inicio_1') }}</router-link>
      </div>

      <!-- Sucesso -->
      <div v-else class="sucesso-content">

        <!-- Ícone status -->
        <div :class="['sucesso-icone', `sucesso-icone--${pedido.status}`]">
          <svg v-if="pedido.status === 'aprovado'" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          <svg v-else-if="pedido.status === 'pendente'" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
          <svg v-else width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>

        <!-- Título -->
        <h1 class="sucesso-titulo">
          <template v-if="pedido.status === 'aprovado'">{{ $t('pedido.confirmado') }}</template>
          <template v-else-if="pedido.pagamento.metodo === 'pix'">{{ $t('aguardando.pagamento.pix') }}</template>
          <template v-else-if="pedido.pagamento.metodo === 'boleto'">{{ $t('boleto.gerado') }}</template>
          <template v-else>{{ $t('pedido.recebido') }}</template>
        </h1>

        <p class="sucesso-sub">
          {{ $t('pedido') }} <strong>#{{ pedido._id.slice(-8).toUpperCase() }}</strong>
        </p>

        <!-- PIX -->
        <div v-if="pedido.pagamento.metodo === 'pix' && pedido.status === 'pendente'" class="pix-box">
          <div class="pix-qr">
            <div class="pix-qr-placeholder">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--cor-primaria)" stroke-width="1">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
              <p>{{ $t('qr.code.pix') }}</p>
            </div>
          </div>
          <div class="pix-codigo">
            <p class="pix-label">{{ $t('copie.o.codigo.pix') }}</p>
            <div class="pix-copia-wrap">
              <input readonly :value="pedido.pagamento.pixCopia" class="pix-input" />
              <button class="pix-copiar" @click="copiarPix">
                {{ copiado ? '✓ COPIADO' : 'COPIAR' }}
              </button>
            </div>
            <p class="pix-aviso">{{ $t('apos.o.pagamento.a.confirmacao.e.instantanea') }}</p>
          </div>
          <button class="btn-simular" @click="simularPagamento">
            {{ $t('simular.pagamento.aprovado.dev') }}
          </button>
        </div>

        <!-- BOLETO -->
        <div v-if="pedido.pagamento.metodo === 'boleto' && pedido.status === 'pendente'" class="boleto-box">
          <p class="boleto-label">{{ $t('linha.digitavel') }}</p>
          <div class="pix-copia-wrap">
            <input readonly :value="pedido.pagamento.boleto" class="pix-input" />
            <button class="pix-copiar" @click="copiarBoleto">
              {{ copiado ? '✓ COPIADO' : 'COPIAR' }}
            </button>
          </div>
          <p class="pix-aviso">{{ $t('vencimento.em.3.dias.uteis.confirme.o.pagamento.no.seu.banco') }}</p>
          <button class="btn-simular" @click="simularPagamento">
            {{ $t('simular.pagamento.aprovado.dev') }}
          </button>
        </div>

        <!-- Aprovado -->
        <div v-if="pedido.status === 'aprovado'" class="aprovado-box">
          <p>{{ $t('enviamos.a.confirmacao.para') }} <strong>{{ pedido.cliente.email }}</strong></p>
          <p>{{ $t('sua.encomenda.exclusiva.sera.preparada.pelo.atelier.em.ate.30.dias') }}</p>
        </div>

        <!-- Resumo do pedido -->
        <div class="sucesso-resumo">
          <h3 class="resumo-titulo">{{ $t('itens.do.pedido') }}</h3>
          <div v-for="item in pedido.itens" :key="item._id" class="resumo-item">
            <div class="resumo-img">
              <img :src="item.imagem" :alt="item.nome" @error="e=>e.target.style.opacity='0'" />
            </div>
            <div class="resumo-info">
              <p class="resumo-nome">{{ item.nome }}</p>
              <p class="resumo-qty">Qtd: {{ item.qty }}</p>
            </div>
            <p class="resumo-preco">R$ {{ fmt(item.preco * item.qty) }}</p>
          </div>
          <div class="resumo-total">
            <span>{{ $t('total.pago') }}</span>
            <span>R$ {{ fmt(pedido.total) }}</span>
          </div>
        </div>

        <!-- Ações -->
        <div class="sucesso-acoes">
          <router-link to="/" class="btn-ouro">{{ $t('voltar.ao.inicio_1') }}</router-link>
          <router-link to="/loja" class="btn-fantasma">{{ $t('continuar.comprando') }}</router-link>
        </div>

      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/api.js'

const route   = useRoute()
const pedido  = ref(null)
const loading = ref(true)
const copiado = ref(false)

onMounted(async () => {
  try {
    const { data } = await api.get(`/pedidos/${route.params.id}`)
    pedido.value = data.pedido
  } catch { pedido.value = null }
  finally  { loading.value = false }
})

const fmt = (v) => (v||0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })

const copiarPix = () => {
  navigator.clipboard.writeText(pedido.value.pagamento.pixCopia)
  copiado.value = true
  setTimeout(() => { copiado.value = false }, 2000)
}
const copiarBoleto = () => {
  navigator.clipboard.writeText(pedido.value.pagamento.boleto)
  copiado.value = true
  setTimeout(() => { copiado.value = false }, 2000)
}

const simularPagamento = async () => {
  const { data } = await api.patch(`/pedidos/${pedido.value._id}/confirmar`)
  pedido.value = data.pedido
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@200;300;400;600;800&family=Cormorant+Garamond:ital,wght@0,300;1,400&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
.sucesso-page{background:var(--cor-fundo,#000);color:var(--cor-texto,#fff);font-family:'Outfit',sans-serif;min-height:100vh;padding-top:var(--navbar-h,88px);display:flex;align-items:center;justify-content:center}
.sucesso-inner{max-width:680px;width:100%;margin:0 auto;padding:60px 24px}
.sucesso-loading{display:flex;flex-direction:column;align-items:center;gap:20px;color:rgba(255,255,255,.3)}
.loading-ring{width:40px;height:40px;border:2px solid rgba(184,134,11,.2);border-top-color:var(--cor-primaria,#B8860B);border-radius:50%;animation:spin .8s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
.sucesso-content{display:flex;flex-direction:column;align-items:center;gap:20px;text-align:center}
.sucesso-icone{width:80px;height:80px;border-radius:50%;display:flex;align-items:center;justify-content:center;margin-bottom:8px}
.sucesso-icone--aprovado{background:rgba(46,204,113,.1);border:1px solid rgba(46,204,113,.3);color:#2ecc71}
.sucesso-icone--pendente{background:rgba(184,134,11,.1);border:1px solid rgba(184,134,11,.3);color:var(--cor-primaria,#B8860B)}
.sucesso-titulo{font-family:'Cormorant Garamond',serif;font-size:clamp(2rem,5vw,3rem);font-weight:300;color:#fff}
.sucesso-sub{font-size:12px;letter-spacing:3px;color:rgba(255,255,255,.3);text-transform:uppercase}
.sucesso-sub strong{color:var(--cor-primaria,#B8860B)}

/* PIX */
.pix-box{width:100%;background:#0a0900;border:1px solid rgba(184,134,11,.15);border-radius:16px;padding:28px;display:flex;flex-direction:column;gap:20px}
.pix-qr{display:flex;justify-content:center}
.pix-qr-placeholder{width:160px;height:160px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);border-radius:12px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px}
.pix-qr-placeholder p{font-size:10px;letter-spacing:2px;color:rgba(255,255,255,.25);text-transform:uppercase}
.pix-label{font-size:8px;letter-spacing:4px;color:rgba(184,134,11,.7);text-align:center;text-transform:uppercase;margin-bottom:8px}
.pix-copia-wrap{display:flex;gap:8px}
.pix-input{flex:1;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);border-radius:8px;padding:10px 12px;color:rgba(255,255,255,.5);font-size:11px;font-family:'Courier New',monospace;outline:none;cursor:text}
.pix-copiar{background:var(--cor-primaria,#B8860B);border:none;border-radius:8px;padding:10px 16px;color:#000;font-family:'Outfit',sans-serif;font-size:9px;font-weight:800;letter-spacing:2px;cursor:pointer;transition:background .2s;white-space:nowrap;text-transform:uppercase}
.pix-copiar:hover{background:var(--cor-clara,#d4af37)}
.pix-aviso{font-size:11px;color:rgba(255,255,255,.25);text-align:center}

/* BOLETO */
.boleto-box{width:100%;background:#0a0900;border:1px solid rgba(184,134,11,.15);border-radius:16px;padding:28px;display:flex;flex-direction:column;gap:14px}
.boleto-label{font-size:8px;letter-spacing:4px;color:rgba(184,134,11,.7);text-transform:uppercase}

/* SIMULAR */
.btn-simular{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:10px 16px;color:rgba(255,255,255,.3);font-family:'Outfit',sans-serif;font-size:10px;cursor:pointer;transition:all .2s;margin-top:4px}
.btn-simular:hover{background:rgba(255,255,255,.08);color:rgba(255,255,255,.5)}

/* APROVADO */
.aprovado-box{background:rgba(46,204,113,.05);border:1px solid rgba(46,204,113,.15);border-radius:12px;padding:20px;display:flex;flex-direction:column;gap:8px}
.aprovado-box p{font-size:13px;color:rgba(255,255,255,.45);line-height:1.6}
.aprovado-box strong{color:#2ecc71}

/* RESUMO */
.sucesso-resumo{width:100%;background:#0a0900;border:1px solid rgba(184,134,11,.12);border-radius:16px;padding:24px}
.resumo-titulo{font-size:9px;letter-spacing:4px;color:rgba(184,134,11,.6);text-transform:uppercase;margin-bottom:16px;padding-bottom:12px;border-bottom:1px solid rgba(255,255,255,.05)}
.resumo-item{display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid rgba(255,255,255,.04)}
.resumo-img{width:44px;height:44px;border-radius:6px;overflow:hidden;background:#0d0b07;flex-shrink:0}
.resumo-img img{width:100%;height:100%;object-fit:cover}
.resumo-info{flex:1;text-align:left}
.resumo-nome{font-size:12px;color:rgba(255,255,255,.7);margin-bottom:2px}
.resumo-qty{font-size:10px;color:rgba(255,255,255,.25)}
.resumo-preco{font-family:'Cormorant Garamond',serif;font-size:1rem;color:#E7D5B1;white-space:nowrap}
.resumo-total{display:flex;justify-content:space-between;padding:14px 0 0;font-size:13px;letter-spacing:2px;color:#fff;font-weight:300;text-transform:uppercase}

/* AÇÕES */
.sucesso-acoes{display:flex;gap:12px;flex-wrap:wrap;justify-content:center}
.btn-ouro{display:inline-flex;align-items:center;gap:8px;background:var(--cor-primaria,#B8860B);color:#000;font-family:'Outfit',sans-serif;font-size:10px;font-weight:800;letter-spacing:3px;padding:14px 28px;border-radius:50px;border:none;cursor:pointer;text-decoration:none;transition:background .25s,transform .25s;text-transform:uppercase}
.btn-ouro:hover{background:var(--cor-clara,#d4af37);transform:translateY(-1px)}
.btn-fantasma{display:inline-flex;align-items:center;background:transparent;border:1px solid rgba(255,255,255,.12);color:rgba(255,255,255,.4);font-family:'Outfit',sans-serif;font-size:10px;letter-spacing:3px;padding:13px 24px;border-radius:50px;text-decoration:none;transition:all .25s;text-transform:uppercase}
.btn-fantasma:hover{border-color:rgba(255,255,255,.3);color:#fff}

.sucesso-erro{text-align:center;display:flex;flex-direction:column;align-items:center;gap:20px;color:rgba(255,255,255,.3)}
</style>