<template>
  <div>
    <!-- NAVBAR -->
    <header :class="['navbar', { scrolled: isScrolled }]">
      <div class="container">

        <!-- LOGO -->
        <router-link to="/" class="logo">
          <span class="brand">NEXUS</span>
        </router-link>

        <!-- LINKS -->
        <nav :class="['links', { active: menuAberto }]">
          <router-link to="/">Início</router-link>
          <router-link to="/loja">Dispositivos</router-link>
          <router-link to="/tecnologia">Tecnologia</router-link>
          <router-link to="/suporte">Suporte</router-link>
        </nav>

        <!-- AÇÕES -->
        <div class="acoes">

          <!-- PESQUISA -->
          <div class="icon-btn" @click="toggleBusca">
            <svg class="icon" viewBox="0 0 24 24" fill="#111">
              <path d="M10 2a8 8 0 105.3 14.3l4.2 4.2 1.4-1.4-4.2-4.2A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z"/>
            </svg>
          </div>

          <!-- CARRINHO -->
          <div class="icon-btn carrinho" @click="toggleCarrinho">
            <svg class="icon" viewBox="0 0 24 24" fill="#111">
              <path d="M7 4H3v2h2l3.6 7.6-1.35 2.44A2 2 0 009 19h9v-2H9.42a.25.25 0 01-.22-.37L10.1 15h6.45a2 2 0 001.8-1.1L21 8H7.42L6.5 6H7V4zm2 16a2 2 0 100-4 2 2 0 000 4zm8 0a2 2 0 100-4 2 2 0 000 4z"/>
            </svg>

            <span v-if="carrinho.length" class="badge">
              {{ carrinho.length }}
            </span>
          </div>

          <!-- HAMBURGER -->
          <div class="hamburger" @click="toggleMenu">
            <span :class="{ open: menuAberto }"></span>
            <span :class="{ open: menuAberto }"></span>
            <span :class="{ open: menuAberto }"></span>
          </div>

        </div>
      </div>
    </header>

    <!-- BUSCA -->
    <transition name="fade">
      <div v-if="buscaAberta" class="busca-overlay">
        <input v-model="pesquisa" placeholder="Buscar dispositivos premium..." />
      </div>
    </transition>

    <!-- OVERLAY -->
    <transition name="fade">
      <div v-if="carrinhoAberto" class="overlay" @click="toggleCarrinho"></div>
    </transition>

    <!-- CARRINHO -->
    <transition name="slide">
      <div v-if="carrinhoAberto" class="painel-carrinho">
        <h2>Seu Carrinho</h2>

        <div v-if="carrinho.length === 0" class="vazio">
          Nenhum produto adicionado.
        </div>

        <div v-for="(item, index) in carrinho" :key="index" class="item">
          <div>
            <strong>{{ item.nome }}</strong>
            <p>R$ {{ item.preco }}</p>
          </div>
          <button @click="remover(index)">Remover</button>
        </div>

        <div v-if="carrinho.length" class="total">
          Total: <strong>R$ {{ total }}</strong>
        </div>

        <button v-if="carrinho.length" class="btn-finalizar">
          Finalizar Compra
        </button>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      isScrolled: false,
      menuAberto: false,
      buscaAberta: false,
      carrinhoAberto: false,
      pesquisa: "",
      carrinho: [
        { nome: "MacBook Pro M3", preco: 18999 },
        { nome: "iPhone 16 Ultra", preco: 12999 }
      ]
    }
  },
  computed: {
    total() {
      return this.carrinho.reduce((acc, item) => acc + item.preco, 0)
    }
  },
  mounted() {
    window.addEventListener("scroll", () => {
      this.isScrolled = window.scrollY > 10
    })
  },
  methods: {
    toggleMenu() {
      this.menuAberto = !this.menuAberto
    },
    toggleBusca() {
      this.buscaAberta = !this.buscaAberta
    },
    toggleCarrinho() {
      this.carrinhoAberto = !this.carrinhoAberto
    },
    remover(index) {
      this.carrinho.splice(index, 1)
    }
  }
}
</script>

<style>
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
}

/* NAVBAR */
.navbar {
  position: fixed;
  width: 100%;
  padding: 20px 80px;
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(15px);
  transition: 0.3s ease;
  z-index: 1000;
}

.navbar.scrolled {
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand {
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 6px;
  color: #111;
}

.links {
  display: flex;
  gap: 35px;
}

.links a {
  text-decoration: none;
  color: #444;
  font-size: 14px;
  position: relative;
}

.links a::after {
  content: "";
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -6px;
  left: 0;
  background: #000;
  transition: 0.3s;
}

.links a:hover::after {
  width: 100%;
}

.acoes {
  display: flex;
  align-items: center;
  gap: 25px;
}

.icon {
  width: 24px;
  height: 24px;
  display: block;
}

.icon-btn {
  position: relative;
  cursor: pointer;
  transition: 0.3s;
}

.icon-btn:hover {
  transform: scale(1.1);
}

.badge {
  position: absolute;
  top: -6px;
  right: -8px;
  background: #000;
  color: white;
  font-size: 10px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
}

.hamburger span {
  width: 24px;
  height: 2px;
  background: #111;
  transition: 0.3s;
}

.hamburger span.open:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}
.hamburger span.open:nth-child(2) {
  opacity: 0;
}
.hamburger span.open:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

.busca-overlay {
  position: fixed;
  top: 80px;
  width: 100%;
  background: white;
  padding: 20px;
  display: flex;
  justify-content: center;
  border-top: 1px solid #eee;
}

.busca-overlay input {
  width: 40%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
}

.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.2);
}

.painel-carrinho {
  position: fixed;
  right: 0;
  top: 0;
  width: 420px;
  height: 100vh;
  background: white;
  padding: 50px 40px;
  box-shadow: -10px 0 40px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
}

.item {
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
}

.total {
  margin-top: 20px;
}

.btn-finalizar {
  margin-top: auto;
  padding: 14px;
  background: #111;
  color: white;
  border: none;
  cursor: pointer;
}

.slide-enter-active,
.slide-leave-active {
  transition: 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media(max-width:900px){
  .links {
    position: fixed;
    top: 80px;
    right: -100%;
    flex-direction: column;
    background: white;
    width: 250px;
    height: 100vh;
    padding: 40px;
    gap: 25px;
    transition: 0.3s;
  }

  .links.active {
    right: 0;
  }

  .hamburger {
    display: flex;
  }
}
</style>