import Vue from 'vue'
import VueRouter from 'vue-router'
//import AppView from '../App.vue' // App com NavBar sempre visível
import AbastecimentoView from '../components/Abastecimentos.vue'
import VeiculosView from '../components/Veiculos.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',  // Define rota inicial
    name: 'home',
    component: AbastecimentoView  // ou algum componente de entrada
  },
  {
    path: '/abastecimentos',
    name: 'abastecimentos',
    component: AbastecimentoView
  },
  {
    path: '/veiculos',
    name: 'veiculos',
    component: VeiculosView
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
