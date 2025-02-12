import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Search from '../views/Search.vue'
import Browse from '../views/Browse.vue'
import Spread from '../views/Spread.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/browse',
      name: 'Browse',
      component: Browse
    },
    {
      path: '/spread',
      name: 'Spread',
      component: Spread
    }
  ]
})

export default router