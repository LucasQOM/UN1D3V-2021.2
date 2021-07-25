import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Cadastro from '@/views/Cadastro.vue'
import Listagem from "@/views/Listagem.vue"

Vue.use(VueRouter)



const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/listagem',
    name: 'Listagem',
    component: Listagem
  },
  {
    path: '/cadastro',
    name: 'Cadastro',
    component: Cadastro
  },
]

const router = new VueRouter({
  routes
})

export default router
