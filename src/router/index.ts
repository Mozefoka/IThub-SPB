import { createRouter, createWebHistory } from 'vue-router'
import MarketingPage from '@/pages/MarketingPage.vue'
import GamedevPage from '@/pages/GamedevPage.vue'
import ItPage from '@/pages/ItPage.vue'
import DesignPage from '@/pages/DesignPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/marketing',
      component: MarketingPage,
    },

    {
      path: '/gamedev',
      component: GamedevPage,
    },

    {
      path: '/it',
      component: ItPage,
    },

    {
      path: '/design',
      component: DesignPage
    }
  ],
})

export default router
