import Vue from 'vue'
import VueRouter from 'vue-router'
//import HomeView from '../views/HomeView.vue'
//import AppView from '../App.vue'
import AbastecimentoView from '../components/Abastecimentos.vue'
import VeiculosView from '../components/Veiculos.vue'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'abastecimentos',
    component: AbastecimentoView
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
