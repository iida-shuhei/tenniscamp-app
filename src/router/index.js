import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      name: 'Top',
      component: () => import('../views/Top.vue')
    },
    {
      path: '/registerMatch',
      name: 'RegisterMatch',
      component: () => import('../views/RegisterMatch.vue')
    },
    {
      path: '/registerSinglesPlayer',
      name: 'RegisterSinglesPlayer',
      component: () => import('../views/RegisterSinglesPlayer.vue')
    },
    {
      path: '/registerDoublesPlayer',
      name: 'RegisterDoublesPlayer',
      component: () => import('../views/RegisterDoublesPlayer.vue')
    },
    {
      path: '/showMatchList',
      name: 'ShowMatchList',
      component: () => import('../views/ShowMatchList.vue')
    },
    {
      path: '/editMatch',
      name: 'EditMatch',
      component: () => import('../views/EditMatch.vue')
    },
    {
      path: '/showPlayerList',
      name: 'ShowPlayerList',
      component: () => import('../views/ShowPlayerList.vue')
    },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
