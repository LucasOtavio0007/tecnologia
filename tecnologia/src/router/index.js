import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Store from '../pages/Store.vue'

const routes = [
  {
    path: '/',
    name: 'Inicio',
    component: Home
  },
  {
    path: '/loja',
    name: 'Loja',
    component: Store
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router