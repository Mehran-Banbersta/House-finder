import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/house-detail/:id',
      name: 'HouseDetailView',
      component: () => import('../views/HouseDetailView.vue')
    },
    {
      path: '/house/:id',
      name: 'HouseDeleteView',
      component: () => import('../views/HouseDeleteView.vue')
    },
    {
      path: '/create-house',
      name: 'CreateHouseView',
      component: () => import('../views/CreateHouseView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/favorites',
      name: 'FavoriteHousesView',
      component: () => import('../views/FavoriteHousesView.vue')
    },
    {
      path: '/edit-house/:id',
      name: 'EditHouseView',
      component: () => import('../views/EditHouseView.vue')
    }
  ]
})

export default router
