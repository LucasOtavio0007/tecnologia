<template>
  <transition name="checkout-$t('checkout.fade')v v-if="aberto" class="checkout-overlay" @click.self="fechar" role="dialog" a$t('dialog')l="true" ari$t('true')l="$t('checkout')">

      <div class="checkout-modal closable-on-click-outside" @close-request="handleClose">

        <!-- HEADER -->
        <div class="cm-header">
          <div class="cm-logo">{{ $t('n.amp.o') }}</div>
          <div class="cm-steps">
            <span :class="['cm-step',{ativo:etapa>=1}]">{{ $t('1.carrinho') }}</span>
            <span class="cm-step-div">{{ $t('_4') }}</span>
            <span :class="['cm-step',{ativo:etapa>=2}]">{{ $t('2.dados') }}</span>
            <span class="cm-step-div">{{ $t('_4') }}</span>
            <span :class="['cm-step',{ativo:etapa>=3}]">{{ $t('3.pagamento') }}</span>
            <span class="cm-step-div">{{ $t('_4') }}</span>
            <span :class="['cm-step',{ativo:etapa>=4}]">{{ $t('4.confirmacao') }}</span>
          </div>
          <button class="cm-close" @click="fechar">{{ $t('_1') }}</button>
        </div>

        <div class="cm-body">
          <div class="cm-main">

            <!-- ETAPA 1 -->
            <div v-if="etapa===1">
              <h2 class="cm-titulo">{{ $t('seu.atelier') }}</h2>
              <div v-if="!itens.length" class="cm-vazio">
                <p>{{ $t('carrinho.vazio') }}</p>
                <button class="btn-gold" @click="fechar">{{ $t('ir.a.loja') }}</button>
              </div>
              <div v-else>
                <div v-for="item in itens" :key="item._id||item.id" class="cm-item">
                  <div class="cm-item-img"><img :src="item.imagem" :alt="$t('item.nome')" @error="e=>e.target.style.opacity='0'"/></div>
                  <div class="cm-item-info">
                    <p class="cm-item-cat">{{ item.categoria }}</p>
                    <p class="cm-item-nome">{{ item.nome }}</p>
                    <div class="cm-qty">
                      <button @click="alterarQty(item,-1)">{{ $t('_9') }}</button>
                      <span>{{ item.qty }}</span>
                      <button @click="alterarQty(item,+1)">{{ $t('_10') }}</button>
                    </div>
                  </div>
                  <div class="cm-item-right">
                    <p class="cm-item-preco">R$ {{ fmt({{ $t('r') }}m.preco*item.qty) }}</p>
                    <button class="cm-remove" @click="remover(item)">{{ $t('_1') }}</button>
                  </div>
                </div>
                <button class="btn-gold" style="width:100%;justify-content:center;margin-top:20px" @click="etapa=2">{{ $t('continuar.dados') }}</button>
              </div>
            </div>

            <!-- ETAPA 2 -->
            <div v-if="etapa===2">
              <h2 class="cm-titulo">{{ $t('seus.dados') }}</h2>
              <div class="cm-form">
                <div class="cm-duplo">
                  <div class="cm-campo"><label>{{ $t('nome.completo') }}</label><input v-model="cliente.nome" placeholder="$t('seu.nome')" autocomplete="off"/></d$t('off')                  <div class="cm-campo"><label>{{ $t('cpf') }}</label><input v-model="cliente.cpf" placeholder="$t('000.000.000.00')" @input="maskCPF" maxlength="14" autocomplete="off"/></d$t('off')                </div>
                <div class="cm-duplo">
                  <div class="cm-campo"><label>{{ $t('e.mail') }}</label><input v-model="cliente.email" type="email" pl$t('email')er="$t('seu.email.com')" autocomplete="off"/></d$t('off')                  <div class="cm-campo"><label>{{ $t('telefone') }}</label><input v-model="cliente.telefone" placeholder="$t('55.31.9')" autocomplete="off"/></d$t('off')                </div>
                <div class="cm-divider"><span>{{ $t('entrega_1') }}</span></div>
                <div class="cm-duplo">
                  <div class="cm-campo"><label>{{ $t('cep') }}</label><input v-model="entrega.cep" placeholder="$t('00000.000')" @input="maskCEP" @blur="buscarCEP" maxlength="9" autocomplete="off"/></d$t('off')                  <div class="cm-campo"><label>{{ $t('estado') }}</label><input v-model="entrega.estado" placeholder="$t('mg')" maxlength="2" autocomplete="off"/></d$t('off')                </div>
                <div class="cm-campo"><label>{{ $t('endereco') }}</label><input v-model="entrega.endereco" placeholder="$t('rua.numero.complemento')" autocomplete="off"/></d$t('off')                <div class="cm-campo"><label>{{ $t('cidade') }}</label><input v-model="entrega.cidade" placeholder="$t('sua.cidade')" autocomplete="off"/></d$t('off')              </div>
              <p v-if="erroForm" class="cm-erro">⚠ {{ erroF{{ $t('_2') }}m }}</p>
              <div class="cm-btns">
                <button class="btn-ghost" @click="etapa=1">{{ $t('voltar') }}</button>
                <button class="btn-gold" @click="validarDados">{{ $t('continuar.pagamento') }}</button>
              </div>
            </div>

            <!-- ETAPA 3 -->
            <div v-if="etapa===3">
              <h2 class="cm-titulo">{{ $t('pagamento') }}</h2>
              <div class="cm-tabs">
                <button :class="['cm-tab',{ativo:metodoPag==='pix'}]" @click="metodoPag='pix'">
                  <svg width="16" height="16" viewBox="0 0 24 24$t('0.0.24.24')e" str$t('none')urrentCo$t('currentcolor')dth="1.5"><pat$t('1.5')M12 2L2 7$t('m12.2l2.7l10.5.10.5.10.5zm2.17l10.5.10.5m2.12l10.5.10.5')X
     {{ $t('pix') }}
                <button :class="['cm-tab',{ativo:metodoPag==='cartao'}]" @click="metodoPag='cartao'">
                  <svg width="16" height="16" viewBox="0 0 24 24$t('0.0.24.24')e" str$t('none')urrentCo$t('currentcolor')dth="1.5"><rec$t('1.5')1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>CARTÃO
  {{ $t('cartao') }}
                <button :class="['cm-tab',{ativo:metodoPag==='boleto'}]" @click="metodoPag='boleto'">
                  <svg width="16" height="16" viewBox="0 0 24 24$t('0.0.24.24')e" str$t('none')urrentCo$t('currentcolor')dth="1.5"><pat$t('1.5')M14 2H6a2$t('m14.2h6a2.2.0.0.0.2.2v16a2.2.0.0.0.2.2h12a2.2.0.0.0.2.2v8z')e points="14 2 14 8$t('14.2.14.8.20.8')LETO
  {{ $t('boleto') }}
              </div>

              <div v-if="metodoPag==='pix'" class="cm-pay-info">
                <div class="cm-pay-icon"><svg width="36" height="36" viewBox="0 0 24 24$t('0.0.24.24')e" str$t('none')ar(--cor$t('var.cor.primaria')dth="1"><path d="M12 2L2 7$t('m12.2l2.7l10.5.10.5.10.5zm2.17l10.5.10.5m2.12l10.5.10.5')div>
                <h3>{{ $t('pagamento.via.pix') }}</h3>
                <p>{{ $t('aprovacao.instantanea.disponivel.24h.sem.taxas') }}</p>
                <div class="cm-vantagens">
                  <span>{{ $t('confirmacao.em.segundos') }}</span>
                  <span>{{ $t('sem.limite.de.horario') }}</span>
                  <span>{{ $t('100.seguro') }}</span>
                </div>
              </div>

              <div v-if="metodoPag==='cartao'" class="cm-form">
                <div class="cm-cartao">
                  <div class="cm-cartao-chip"></div>
                  <p class="cm-cartao-num">{{ cartao.numero||'•••• •••• •••• ••••' }}</p>
                  <div class="cm-cartao-bottom">
                    <div><p class="cm-cartao-label">{{ $t('titular') }}</p><p class="cm-cartao-val">{{ cartao.nome||'SEU NOME' }}</p></div>
                    <div><p class="cm-cartao-label">{{ $t('validade') }}</p><p class="cm-cartao-val">{{ cartao.validade||'MM/AA' }}</p></div>
                  </div>
                </div>
                <div class="cm-campo"><label>{{ $t('numero.do.cartao') }}</label><input v-model="cartao.numero" placeholder="$t('0000.0000.0000.0000')" maxlength="19" @input="maskCartao" autocomplete="off"/></d$t('off')                <div class="cm-campo"><label>{{ $t('nome.no.cartao') }}</label><input v-model="cartao.nome" placeholder="$t('nome.como.no.cartao')" style="text-transform:uppercase" autocomplete="off"/></d$t('off')                <div class="cm-duplo">
                  <div class="cm-campo"><label>{{ $t('validade') }}</label><input v-model="cartao.validade" placeholder="$t('mm.aa')" maxlength="5" @input="maskValidade" autocomplete="off"/></d$t('off')                  <div class="cm-campo"><label>{{ $t('cvv') }}</label><input v-model="cartao.cvv" placeholder="$t('_13')" maxlength="4" type="password"$t('password')ete="new-passw$t('new.password')                </div>
                <div class="cm-campo">
                  <label>{{ $t('parcelas') }}</label>
                  <select v-model="cartao.parcelas" class="cm-select">
                    <option v-for="p in parcelasDisponiveis" :key="p.n" :value="$t('p.n')">{{ p.n }}x de R$ {{{{ $t('x.de.r') }}alor) }} {{ p.n===1?'(à vista)':'sem juros' }}</option>
                  </select>
                </div>
              </div>

              <div v-if="metodoPag==='boleto'" class="cm-pay-info">
                <div class="cm-pay-icon"><svg width="36" height="36" viewBox="0 0 24 24$t('0.0.24.24')e" str$t('none')ar(--cor$t('var.cor.primaria')dth="1"><path d="M14 2H6a2$t('m14.2h6a2.2.0.0.0.2.2v16a2.2.0.0.0.2.2h12a2.2.0.0.0.2.2v8z')e points="14 2 14 8$t('14.2.14.8.20.8')div>
                <h3>{{ $t('boleto.bancario') }}</h3>
                <p>{{ $t('vencimento.em.3.dias.uteis') }}</p>
                <div class="cm-vantagens">
                  <span>{{ $t('pague.em.qualquer.banco') }}</span>
                  <span>{{ $t('confirmacao.em.ate.3.dias') }}</span>
                  <span>{{ $t('pedido.reservado.por.3.dias') }}</span>
                </div>
              </div>

              <p v-if="erroForm" class="cm-erro">⚠ {{ erroF{{ $t('_2') }}m }}</p>
              <div class="cm-btns">
                <button class="btn-ghost" @click="etapa=2">{{ $t('voltar') }}</button>
                <button class="btn-gold" @click="finalizarPedido" :disabled="salvando" style="min-width:180px;justify-content:center">
                  <span v-if="!salvando">{{ $t('finalizar.pedido') }}</span>
                  <span v-else class="spinner"></span>
                </button>
              </div>
            </div>

            <!-- ETAPA 4 -->
            <div v-if="etapa===4&&pedidoCriado" class="cm-confirmacao">
              <div :class="['cm-status-icone',`cm-status-icone--${pedidoCriado.status}`]">
                <svg v-if="pedidoCriado.status==='aprovado'" width="32" height="32" viewBox="0 0 24 24$t('0.0.24.24')e" str$t('none')urrentCo$t('currentcolor')dth="2.5"><pol$t('2.5') points="20 6 9 17$t('20.6.9.17.4.12')                <svg v-else width="32" height="32" viewBox="0 0 24 24$t('0.0.24.24')e" str$t('none')urrentCo$t('currentcolor')dth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 1$t('12.6.12.12.16.14')              </div>
              <h2 class="cm-titulo" style="text-align:center">
                <template v-if="pedidoCriado.status==='aprovado'">{{ $t('pedido.confirmado_1') }}</template>
                <template v-else-if="pedidoCriado.pagamento.metodo==='pix'">{{ $t('aguardando.pix') }}</template>
                <template v-else>{{ $t('boleto.gerado') }}</template>
              </h2>
              <p class="cm-pedido-id">Pedido #{{{{ $t('pedido_1') }}riado._id.slice(-8).toUpperCase() }}</p>
              <div v-if="pedidoCriado.pagamento.metodo==='pix'&&pedidoCriado.status==='pendente'" class="cm-pix-box">
                <p class="cm-pix-label">{{ $t('escaneie.o.qr.code') }}</p>
                <div class="cm-qr-wrap"><canvas ref="qrCanvas" class="cm-qr-canvas"></canvas></div>
                <p class="cm-pix-label" style="margin-top:16px">{{ $t('ou.copie.o.codigo.pix') }}</p>
                <div class="cm-copia-wrap">
                  <input readonly :value="$t('pedidocriado.pagamento.pixcopia')" class="cm-pix-input"/>
                  <button class="cm-copiar" @click="copiarPix">{{ copiado?'✓':'COPIAR' }}</button>
                </div>
                <button class="btn-simular" @click="simularPagamento">{{ $t('simular.aprovacao.dev') }}</button>
              </div>
              <div v-if="pedidoCriado.pagamento.metodo==='boleto'&&pedidoCriado.status==='pendente'" class="cm-pix-box">
                <p class="cm-pix-label">{{ $t('linha.digitavel') }}</p>
                <div class="cm-copia-wrap">
                  <input readonly :value="$t('pedidocriado.pagamento.boleto')" class="cm-pix-input"/>
                  <button class="cm-copiar" @click="copiarBoleto">{{ copiado?'✓':'COPIAR' }}</button>
                </div>
                <button class="btn-simular" @click="simularPagamento">{{ $t('simular.aprovacao.dev') }}</button>
              </div>
              <div v-if="pedidoCriado.status==='aprovado'" class="cm-aprovado">
                <p>{{ $t('confirmacao.enviada.para') }}<strong>{{ pedidoCriado.cliente.email }}</strong></p>
                <p>{{ $t('sua.encomenda.sera.preparada.em.ate.30.dias') }}</p>
              </div>
              <button class="btn-gold" style="width:100%;justify-content:center;margin-top:24px" @click="fecharELimpar">{{ $t('fechar_2') }}</button>
            </div>
          </div>

          <!-- ASIDE RESUMO -->
          <aside class="cm-aside" v-if="etapa<4">
            <h3 class="cm-aside-titulo">{{ $t('resumo') }}</h3>
            <div class="cm-aside-itens">
              <div v-for="item in itens" :key="item._id||item.id" class="cm-aside-item">
                <div class="cm-aside-img">
                  <img :src="item.imagem" :alt="$t('item.nome')" @error="e=>e.target.style.opacity='0'"/>
                  <span class="cm-aside-qty">{{ item.qty }}</span>
                </div>
                <div>
                  <p class="cm-aside-nome">{{ item.nome }}</p>
                  <p class="cm-aside-preco">R$ {{ fmt({{ $t('r') }}m.preco*item.qty) }}</p>
                </div>
              </div>
            </div>
            <div class="cm-aside-linha"><span>{{ $t('subtotal') }}</span><span>R$ {{ fmt({{ $t('r') }}al) }}</span></div>
            <div class="cm-aside-linha cm-aside-linha--gold"><span>{{ $t('frete.vip') }}</span><span>{{ $t('gratuito') }}</span></div>
            <div class="cm-aside-total"><span>{{ $t('total') }}</span><span>R$ {{ fmt({{ $t('r') }}al) }}</span></div>
            <div v-if="metodoPag==='cartao'&&cartao.parcelas>1" class="cm-aside-parcela">{{ cartao.parcelas }}x de R$ {{{{ $t('x.de.r') }}h.ceil(total/cartao.parcelas)) }} sem juros{{ $t('sem.juros') }}          <div class="cm-ssl">
              <svg width="11" height="11" viewBox="0 0 24 24$t('0.0.24.24')e" str$t('none')ar(--cor$t('var.cor.primaria')dth="2"><path d="M12 22s8-$t('m12.22s8.4.8.10v5l.8.3.8.3v7c0.6.8.10.8.10z')              <span>{{ $t('compra.100.segura.ssl.256.bit') }}</span>
            </div>
          </aside>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import QRCode from 'qrcode'
import api from '@/api.js'
import { useAuthStore } from '@/stores/auth.js'

const auth = useAuthStore()
const aberto       = ref(false)
const etapa        = ref(1)
const metodoPag    = ref('pix')
const salvando     = ref(false)
const erroForm     = ref('')
const itens        = ref([])
const pedidoCriado = ref(null)
const copiado      = ref(false)
const qrCanvas     = ref(null)
const cliente = ref({nome:'',email:'',cpf:'',telefone:''})
const entrega = ref({cep:'',endereco:'',cidade:'',estado:''})
const cartao  = ref({numero:'',nome:'',validade:'',cvv:'',parcelas:1})

if (typeof window!=='undefined') {
  window.addEventListener('abrir-checkout', (e) => {
    itens.value=e.detail||window.__noirCarrinho||[]
    etapa.value=1; erroForm.value=''; pedidoCriado.value=null
    if (auth.user) {
      cliente.value.nome=`${auth.user.nome} ${auth.user.sobrenome||''}`.trim()
      cliente.value.email=auth.user.email
      cliente.value.telefone=auth.user.telefone||''
      entrega.value.cep=auth.user.cep||''
      entrega.value.cidade=auth.user.cidade||''
      entrega.value.endereco=auth.user.endereco||''
    }
    aberto.value=true; document.body.style.overflow='hidden'
  })
}

const total = computed(() => itens.value.reduce((s,i)=>s+i.preco*i.qty,0))
const parcelasDisponiveis = computed(() => Array.from({length:12},(_,i)=>({n:i+1,valor:Math.ceil(total.value/(i+1))})))
const fmt = (v) => (v||0).toLocaleString('pt-BR',{minimumFractionDigits:2})
const fechar = () => { aberto.value=false; document.body.style.overflow='' }
const fecharELimpar = () => { fechar(); window.dispatchEvent(new CustomEvent('carrinho-limpo')); itens.value=[]; pedidoCriado.value=null; etapa.value=1 }
const alterarQty = (item,d) => { item.qty+=d; if(item.qty<=0) remover(item) }
const remover = (item) => { itens.value=itens.value.filter(i=>(i._id||i.id)!==(item._id||item.id)) }
const maskCPF = () => { let v=cliente.value.cpf.replace(/\D/g,'').slice(0,11); v=v.replace(/(\d{3})(\d)/,'$1.$2').replace(/(\d{3})(\d)/,'$1.$2').replace(/(\d{3})(\d{1,2})$/,'$1-$2'); cliente.value.cpf=v }
const maskCEP = () => { let v=entrega.value.cep.replace(/\D/g,'').slice(0,8); v=v.replace(/(\d{5})(\d)/,'$1-$2'); entrega.value.cep=v }
const maskCartao = () => { let v=cartao.value.numero.replace(/\D/g,'').slice(0,16); v=v.replace(/(\d{4})/g,'$1 ').trim(); cartao.value.numero=v }
const maskValidade = () => { let v=cartao.value.validade.replace(/\D/g,'').slice(0,4); v=v.replace(/(\d{2})(\d)/,'$1/$2'); cartao.value.validade=v }
const buscarCEP = async () => {
  const cep=entrega.value.cep.replace(/\D/g,''); if(cep.length!==8) return
  try { const res=await fetch(`https://viacep.com.br/ws/${cep}/json/`); const d=await res.json(); if(!d.erro){entrega.value.endereco=`${d.logradouro}, ${d.bairro}`;entrega.value.cidade=d.localidade;entrega.value.estado=d.uf} } catch {}
}
const validarDados = () => {
  erroForm.value=''
  if (!cliente.value.nome.trim()){erroForm.value='Informe seu nome.';return}
  if (!cliente.value.email.includes('@')){erroForm.value='E-mail inválido.';return}
  if (cliente.value.cpf.length<14){erroForm.value='CPF inválido.';return}
  if (!entrega.value.cep){erroForm.value='Informe o CEP.';return}
  if (!entrega.value.endereco){erroForm.value='Informe o endereço.';return}
  if (!entrega.value.cidade){erroForm.value='Informe a cidade.';return}
  etapa.value=3
}
const finalizarPedido = async () => {
  erroForm.value=''
  if (metodoPag.value==='cartao') {
    if (cartao.value.numero.replace(/\s/g,'').length<16){erroForm.value='Número inválido.';return}
    if (!cartao.value.nome.trim()){erroForm.value='Nome no cartão obrigatório.';return}
    if (cartao.value.validade.length<5){erroForm.value='Validade inválida.';return}
    if (cartao.value.cvv.length<3){erroForm.value='CVV inválido.';return}
  }
  salvando.value=true
  try {
    const {data}=await api.post('/pedidos',{itens:itens.value.map(i=>({produto:i._id||i.id,qty:i.qty})),pagamento:{metodo:metodoPag.value,parcelas:cartao.value.parcelas},cliente:cliente.value,entrega:entrega.value})
    pedidoCriado.value=data.pedido; etapa.value=4
    if (data.pedido.pagamento.metodo==='pix'){await nextTick();await gerarQRCode(data.pedido.pagamento.pixCopia)}
  } catch(e){erroForm.value=e.response?.data?.msg||'Erro ao processar pedido.'}
  finally{salvando.value=false}
}
const gerarQRCode = async (texto) => {
  await nextTick(); if(!qrCanvas.value) return
  try { await QRCode.toCanvas(qrCanvas.value,texto,{width:200,margin:2,color:{dark:'#D4AF37',light:'transparent'}}) } catch {}
}
const copiarPix    = () => { navigator.clipboard.writeText(pedidoCriado.value.pagamento.pixCopia); copiado.value=true; setTimeout(()=>{copiado.value=false},2000) }
const copiarBoleto = () => { navigator.clipboard.writeText(pedidoCriado.value.pagamento.boleto); copiado.value=true; setTimeout(()=>{copiado.value=false},2000) }
const simularPagamento = async () => { const {data}=await api.patch(`/pedidos/${pedidoCriado.value._id}/confirmar`); pedidoCriado.value=data.pedido }

// ─── FECHAR AO CLICAR FORA (evento global) ─────────────────────────────────
const handleClose = (e) => {
  if (e.detail.target === e.currentTarget) {
    fechar()
  }
}

if(typeof window!=='undefined'){window.addEventListener('keydown',e=>{if(e.key==='Escape'&&aberto.value)fechar()})}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;1,400&display=swap');

.checkout-overlay{position:fixed;inset:0;z-index:9500;background:var(--overlay-bg);backdrop-filter:blur(18px);display:flex;align-items:center;justify-content:center;padding:20px}
.checkout-fade-enter-active,.checkout-fade-leave-active{transition:opacity .35s ease}
.checkout-fade-enter-from,.checkout-fade-leave-to{opacity:0}
.checkout-modal{background:var(--cor-superficie);border:1px solid var(--cor-borda);border-radius:var(--border-radius);width:100%;max-width:980px;max-height:92vh;overflow:hidden;display:flex;flex-direction:column;box-shadow:var(--shadow-card),var(--shadow-glow);animation:popIn .4s cubic-bezier(.19,1,.22,1)}
@keyframes popIn{from{opacity:0;transform:scale(.96) translateY(16px)}}

.cm-header{display:flex;align-items:center;justify-content:space-between;padding:18px 28px;border-bottom:1px solid var(--cor-borda);flex-shrink:0;gap:16px;background:var(--cor-superficie)}
.cm-logo{font-family:'Playfair Display',serif;font-size:1.4rem;font-style:italic;background:var(--grad-texto);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;letter-spacing:3px}
.cm-steps{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.cm-step{font-size:9px;letter-spacing:2px;color:var(--cor-texto-3);text-transform:uppercase;font-weight:600;transition:color .3s}
.cm-step.ativo{color:var(--cor-primaria)}
.cm-step-div{color:var(--cor-borda);font-size:10px}
.cm-close{background:none;border:1px solid var(--cor-borda);border-radius:50%;width:30px;height:30px;color:var(--cor-texto-3);cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:12px;transition:all .2s;flex-shrink:0}
.cm-close:hover{border-color:var(--cor-primaria);color:var(--cor-primaria);transform:rotate(90deg)}

.cm-body{display:grid;grid-template-columns:1fr 300px;overflow-y:auto;flex:1}
.cm-main{padding:28px;overflow-y:auto;border-right:1px solid var(--cor-borda)}
.cm-titulo{font-family:'Playfair Display',serif;font-size:1.6rem;font-weight:400;color:var(--cor-texto);margin-bottom:20px}

.cm-item{display:grid;grid-template-columns:60px 1fr auto;gap:12px;padding:12px 0;border-bottom:1px solid var(--cor-borda)}
.cm-item-img{width:60px;height:60px;border-radius:2px;overflow:hidden;background:var(--cor-superficie-2)}
.cm-item-img img{width:100%;height:100%;object-fit:cover}
.cm-item-cat{font-size:7px;letter-spacing:4px;color:var(--cor-primaria);text-transform:uppercase;margin-bottom:3px;font-weight:700}
.cm-item-nome{font-size:12px;color:var(--cor-texto);font-weight:400}
.cm-qty{display:flex;align-items:center;gap:7px;margin-top:7px}
.cm-qty button{background:var(--gold-08);border:none;border-radius:2px;color:var(--cor-texto);width:20px;height:20px;cursor:pointer;font-size:12px;transition:background .2s}
.cm-qty button:hover{background:var(--cor-primaria);color:#0A0A0A}
.cm-qty span{font-size:12px;min-width:14px;text-align:center;color:var(--cor-texto)}
.cm-item-right{display:flex;flex-direction:column;align-items:flex-end;gap:8px}
.cm-item-preco{font-family:'Playfair Display',serif;font-size:1rem;color:var(--cor-texto)}
.cm-remove{background:none;border:none;color:var(--cor-texto-3);cursor:pointer;font-size:11px;transition:color .2s}
.cm-remove:hover{color:#e74c3c}
.cm-vazio{text-align:center;padding:32px 0;display:flex;flex-direction:column;align-items:center;gap:16px;color:var(--cor-texto-3)}

.cm-form{display:flex;flex-direction:column;gap:12px}
.cm-duplo{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.cm-campo{display:flex;flex-direction:column;gap:6px}
.cm-campo label{font-size:7px;letter-spacing:4px;color:var(--cor-primaria);text-transform:uppercase;opacity:.8;font-weight:700}
.cm-campo input,.cm-select{background:var(--input-bg);border:1px solid var(--input-borda);border-radius:2px;padding:10px 13px;color:var(--cor-texto);font-family:'Syne',sans-serif;font-size:13px;outline:none;transition:border-color .25s,box-shadow .25s}
.cm-campo input:focus,.cm-select:focus{border-color:var(--input-borda-focus);box-shadow:0 0 0 3px var(--gold-08)}
.cm-campo input::placeholder{color:var(--cor-texto-3)}
.cm-select{appearance:none;cursor:pointer}
.cm-select option{background:var(--cor-superficie);color:var(--cor-texto)}
.cm-divider{display:flex;align-items:center;gap:10px;margin:4px 0}
.cm-divider::before,.cm-divider::after{content:'';flex:1;height:1px;background:var(--cor-borda)}
.cm-divider span{font-size:7px;letter-spacing:4px;color:var(--cor-primaria);text-transform:uppercase;white-space:nowrap;opacity:.8;font-weight:700}
.cm-erro{font-size:11px;color:#e74c3c;background:rgba(231,76,60,.07);border:1px solid rgba(231,76,60,.2);border-radius:2px;padding:8px 12px;margin-top:8px}

.btn-gold{display:inline-flex;align-items:center;gap:8px;background:var(--grad-btn);color:#0A0A0A;font-family:'Syne',sans-serif;font-size:10px;font-weight:700;letter-spacing:3px;padding:13px 26px;border-radius:2px;border:none;cursor:pointer;box-shadow:var(--shadow-btn);transition:transform .25s,box-shadow .25s;text-transform:uppercase}
.btn-gold:hover:not(:disabled){transform:translateY(-1px);box-shadow:var(--shadow-btn-hover)}
.btn-gold:disabled{opacity:.4;cursor:not-allowed;transform:none}
.btn-ghost{display:inline-flex;align-items:center;background:transparent;border:1px solid var(--cor-borda);color:var(--cor-texto-2);font-family:'Syne',sans-serif;font-size:10px;letter-spacing:3px;padding:12px 22px;border-radius:2px;cursor:pointer;transition:all .25s;text-transform:uppercase}
.btn-ghost:hover{border-color:var(--cor-borda-hover);color:var(--cor-texto)}
.cm-btns{display:flex;justify-content:space-between;align-items:center;margin-top:20px;gap:10px}

.cm-tabs{display:flex;gap:6px;margin-bottom:20px}
.cm-tab{flex:1;display:flex;align-items:center;justify-content:center;gap:7px;background:var(--gold-05);border:1px solid var(--cor-borda);border-radius:2px;padding:12px;font-family:'Syne',sans-serif;font-size:9px;letter-spacing:2px;color:var(--cor-texto-3);cursor:pointer;transition:all .25s;text-transform:uppercase;font-weight:600}
.cm-tab.ativo{background:var(--gold-10);border-color:var(--cor-borda-hover);color:var(--cor-primaria)}
.cm-pay-info{text-align:center;padding:20px;background:var(--gold-05);border-radius:2px;border:1px solid var(--cor-borda)}
.cm-pay-icon{margin-bottom:12px;display:flex;justify-content:center}
.cm-pay-info h3{font-family:'Playfair Display',serif;font-size:1.3rem;font-weight:400;color:var(--cor-texto);margin-bottom:6px}
.cm-pay-info p{font-size:12px;color:var(--cor-texto-3);margin-bottom:14px}
.cm-vantagens{display:flex;flex-direction:column;gap:6px;align-items:center}
.cm-vantagens span{font-size:11px;color:var(--cor-texto-2)}

.cm-cartao{width:100%;max-width:300px;height:170px;background:linear-gradient(135deg,#1a1400,#0A0A0A);border:1px solid var(--cor-borda-hover);border-radius:2px;padding:20px;display:flex;flex-direction:column;justify-content:space-between;position:relative;overflow:hidden;margin:0 auto 16px}
.cm-cartao::before{content:'';position:absolute;top:-30px;right:-30px;width:150px;height:150px;border-radius:50%;background:var(--gold-08);pointer-events:none}
.cm-cartao-chip{width:30px;height:24px;background:var(--grad-btn);border-radius:2px}
.cm-cartao-num{font-family:'Courier New',monospace;font-size:1rem;letter-spacing:2px;color:#fff;text-align:center}
.cm-cartao-bottom{display:flex;justify-content:space-between}
.cm-cartao-label{font-size:6px;letter-spacing:2px;color:rgba(255,255,255,.4);text-transform:uppercase;margin-bottom:2px}
.cm-cartao-val{font-size:11px;color:#fff;letter-spacing:1px}

.cm-confirmacao{display:flex;flex-direction:column;align-items:center;gap:16px;text-align:center}
.cm-status-icone{width:70px;height:70px;border-radius:50%;display:flex;align-items:center;justify-content:center}
.cm-status-icone--aprovado{background:rgba(46,204,113,.1);border:1px solid rgba(46,204,113,.3);color:#2ecc71}
.cm-status-icone--pendente{background:var(--gold-10);border:1px solid var(--cor-borda-hover);color:var(--cor-primaria)}
.cm-pedido-id{font-size:11px;letter-spacing:3px;color:var(--cor-texto-3);text-transform:uppercase}
.cm-pix-box{width:100%;background:var(--gold-05);border:1px solid var(--cor-borda);border-radius:2px;padding:20px;display:flex;flex-direction:column;align-items:center;gap:12px}
.cm-pix-label{font-size:8px;letter-spacing:4px;color:var(--cor-primaria);text-transform:uppercase;font-weight:700}
.cm-qr-wrap{background:var(--cor-superficie);padding:12px;border-radius:2px;border:1px solid var(--cor-borda)}
.cm-qr-canvas{display:block;border-radius:2px}
.cm-copia-wrap{display:flex;gap:7px;width:100%}
.cm-pix-input{flex:1;background:var(--input-bg);border:1px solid var(--input-borda);border-radius:2px;padding:9px 11px;color:var(--cor-texto-3);font-size:10px;font-family:'Courier New',monospace;outline:none;min-width:0}
.cm-copiar{background:var(--grad-btn);border:none;border-radius:2px;padding:9px 14px;color:#0A0A0A;font-family:'Syne',sans-serif;font-size:9px;font-weight:700;letter-spacing:2px;cursor:pointer;transition:opacity .2s;white-space:nowrap;text-transform:uppercase}
.cm-copiar:hover{opacity:.85}
.btn-simular{background:var(--gold-05);border:1px solid var(--cor-borda);border-radius:2px;padding:9px 14px;color:var(--cor-texto-3);font-family:'Syne',sans-serif;font-size:10px;cursor:pointer;transition:all .2s}
.btn-simular:hover{background:var(--gold-10);color:var(--cor-texto)}
.cm-aprovado{width:100%;background:rgba(46,204,113,.05);border:1px solid rgba(46,204,113,.14);border-radius:2px;padding:16px;display:flex;flex-direction:column;gap:6px}
.cm-aprovado p{font-size:13px;color:var(--cor-texto-3);line-height:1.5}
.cm-aprovado strong{color:#2ecc71}

.cm-aside{padding:24px;background:var(--cor-superficie-2);overflow-y:auto}
.cm-aside-titulo{font-size:8px;letter-spacing:5px;color:var(--cor-primaria);text-transform:uppercase;margin-bottom:16px;padding-bottom:12px;border-bottom:1px solid var(--cor-borda);font-weight:700;opacity:.8}
.cm-aside-itens{display:flex;flex-direction:column;gap:10px;margin-bottom:16px}
.cm-aside-item{display:flex;align-items:center;gap:9px}
.cm-aside-img{position:relative;width:40px;height:40px;border-radius:2px;overflow:hidden;background:var(--cor-superficie);flex-shrink:0}
.cm-aside-img img{width:100%;height:100%;object-fit:cover}
.cm-aside-qty{position:absolute;top:-4px;right:-4px;background:var(--grad-btn);color:#0A0A0A;font-size:7px;font-weight:800;width:14px;height:14px;border-radius:50%;display:flex;align-items:center;justify-content:center}
.cm-aside-nome{font-size:10px;color:var(--cor-texto-2);margin-bottom:2px;line-height:1.3}
.cm-aside-preco{font-family:'Playfair Display',serif;font-size:12px;color:var(--cor-texto)}
.cm-aside-linha{display:flex;justify-content:space-between;font-size:9px;letter-spacing:2px;color:var(--cor-texto-3);padding:7px 0;border-top:1px solid var(--cor-borda);text-transform:uppercase}
.cm-aside-linha--gold{color:var(--cor-primaria)}
.cm-aside-total{display:flex;justify-content:space-between;font-size:15px;color:var(--cor-texto);padding:12px 0 0;border-top:1px solid var(--cor-borda-hover);font-family:'Playfair Display',serif;font-weight:400}
.cm-aside-parcela{font-size:10px;color:var(--cor-texto-3);text-align:right;margin-top:3px}
.cm-ssl{display:flex;align-items:center;gap:6px;margin-top:14px;font-size:9px;color:var(--cor-texto-3);letter-spacing:.5px}

.spinner{width:16px;height:16px;border:2px solid rgba(212,175,55,.2);border-top-color:var(--cor-primaria);border-radius:50%;animation:spin .7s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}

@media(max-width:768px){.cm-body{grid-template-columns:1fr}.cm-aside{display:none}.cm-duplo{grid-template-columns:1fr}}
</style>