<template>
  <div class="policy-page">
    <div class="policy-hero">
      <div class="policy-hero-glow"></div>
      <div class="policy-hero-content">
        <div class="breadcrumb">
          <router-link to="/">{{ $t('inicio') }}</router-link>
          <span class="sep">{{ $t('') }}</span>
          <span class="current">{{ $t('devolucoes') }}</span>
        </div>
        <h1>{{ $t('devolucoes') }}</h1>
        <p class="hero-sub">{{ $t('troca.e.devolucao.simplificadas') }}</p>
      </div>
    </div>

    <div class="policy-container">
      <div class="policy-content">
        <h2>{{ $t('prazo.para.solicitacao') }}</h2>
        <p>{{ $t('o.cliente.dispoe.de.ate') }}<strong>{{ $t('7.dias.corridos') }}</strong>{{ $t('contados.a.partir.do.recebimento.do.produto.para.manifestar.interesse.na.devolucao') }}</p>

        <h2>{{ $t('condicoes.obrigatorias') }}</h2>
        <p>{{ $t('o.produto.deve.ser.devolvido.na.embalagem.original.sem.indicios.de.uso.ou.avarias.o.revestimento.em.ouro.ou.metais.nobres.deve.estar.integro.sem.intervencoes.externas') }}</p>

        <h2>{{ $t('procedimento.de.reembolso') }}</h2>
        <p>{{ $t('apos.a.analise.e.aprovacao.da.devolucao.o.reembolso.sera.processado.em.ate') }}<strong>{{ $t('10.dias.uteis') }}</strong>{{ $t('utilizando.o.mesmo.metodo.de.pagamento.da.compra') }}</p>

        <h2>{{ $t('custos.de.frete') }}</h2>
        <p>{{ $t('em.caso.de.devolucao.por.arrependimento.o.custo.do.frete.de.retorno.e.por.conta.do.cliente.se.o.produto.apresentar.defeito.o.atelier.arca.com.o.frete') }}</p>
      </div>

      <aside class="policy-sidebar">
        <h4>{{ $t('politicas') }}</h4>
        <ul>
          <li><router-link to="/politica-entrega">{{ $t('entrega') }}</router-link></li>
          <li><router-link to="/devolucoes">{{ $t('devolucoes') }}</router-link></li>
          <li><router-link to="/garantia">{{ $t('garantia.vitalicia') }}</router-link></li>
          <li><router-link to="/termos-custodia">{{ $t('termos.de.custodia') }}</router-link></li>
          <li><router-link to="/politica-privacidade">{{ $t('privacidade') }}</router-link></li>
          <li><router-link to="/politica-cookies">{{ $t('cookies') }}</router-link></li>
        </ul>
        <div class="back-home">
  <router-link to="/" class="btn-back">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M19 12H5M12 19l-7-7 7-7" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    {{ $t('voltar.ao.inicio') }}
  </router-link>
</div>
      </aside>
    </div>
  </div>
</template>

<style scoped>
/* EXATAMENTE O MESMO CSS DA Política de Entrega – copie o bloco <style> inteiro de lá */
.policy-page { background: var(--cor-fundo); min-height: 100vh; padding-top: calc(var(--navbar-h, 88px) + 40px); font-family: 'Syne', sans-serif; }
.policy-hero { position: relative; background: linear-gradient(135deg, var(--cor-superficie), var(--cor-superficie-2)); border-bottom: 1px solid var(--cor-borda); padding: 56px 0; text-align: center; overflow: hidden; }
.policy-hero-glow { position: absolute; inset: 0; background: radial-gradient(ellipse at 50% 50%, var(--gold-08) 0%, transparent 70%); pointer-events: none; }
.policy-hero-content { position: relative; max-width: 1200px; margin: 0 auto; padding: 0 24px; }
.breadcrumb { font-size: 11px; letter-spacing: 2px; margin-bottom: 20px; color: var(--cor-texto-3); }
.breadcrumb a { color: var(--cor-primaria); text-decoration: none; transition: color 0.2s; }
.breadcrumb a:hover { color: var(--cor-clara); }
.breadcrumb .sep { margin: 0 6px; color: var(--cor-borda); }
.breadcrumb .current { color: var(--cor-texto-2); }
.policy-hero h1 { font-family: 'Playfair Display', serif; font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 400; background: linear-gradient(135deg, var(--cor-texto), var(--cor-primaria)); -webkit-background-clip: text; background-clip: text; color: transparent; margin-bottom: 12px; }
.hero-sub { font-size: 14px; color: var(--cor-texto-3); }
.policy-container { max-width: 1200px; margin: 0 auto; padding: 56px 24px; display: grid; grid-template-columns: 1fr 260px; gap: 48px; }
.policy-content { background: var(--card-bg); border: 1px solid var(--cor-borda); border-radius: 12px; padding: 40px; }
.policy-content h2 { font-family: 'Playfair Display', serif; font-size: 1.5rem; font-weight: 400; color: var(--cor-primaria); margin: 32px 0 16px; border-left: 3px solid var(--cor-primaria); padding-left: 16px; }
.policy-content h2:first-of-type { margin-top: 0; }
.policy-content p { font-size: 15px; line-height: 1.7; color: var(--cor-texto-2); margin-bottom: 20px; }
.policy-content strong { color: var(--cor-primaria); font-weight: 600; }
.policy-sidebar { background: var(--cor-superficie-2); border: 1px solid var(--cor-borda); border-radius: 12px; padding: 28px; position: sticky; top: calc(var(--navbar-h, 88px) + 20px); align-self: start; }
.policy-sidebar h4 { font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: var(--cor-primaria); margin-bottom: 20px; padding-bottom: 10px; border-bottom: 1px solid var(--cor-borda); }
.policy-sidebar ul { list-style: none; padding: 0; margin: 0 0 32px 0; }
.policy-sidebar li { margin-bottom: 12px; }
.policy-sidebar a { display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--cor-texto-2); text-decoration: none; transition: all 0.2s; padding: 6px 0; }
.policy-sidebar a:hover { color: var(--cor-primaria); transform: translateX(4px); }
.back-home { margin-top: 24px; }
.btn-back { display: inline-flex; align-items: center; gap: 8px; background: transparent; border: 1px solid var(--cor-borda-hover); border-radius: 40px; padding: 8px 16px; font-size: 11px; font-weight: 500; letter-spacing: 1px; color: var(--cor-primaria); text-decoration: none; transition: all 0.2s; }
.btn-back:hover { background: var(--gold-08); transform: translateX(-4px); border-color: var(--cor-primaria); }
@media (max-width: 900px) { .policy-container { grid-template-columns: 1fr; gap: 32px; } .policy-sidebar { position: static; } .policy-content { padding: 28px; } }
@media (max-width: 600px) { .policy-hero { padding: 36px 0; } .policy-container { padding: 32px 16px; } .policy-content { padding: 20px; } }
</style>