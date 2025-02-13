import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/pages/Login.vue'
// import Dashboard from '@/pages/Dashboard.vue';
import { authGuard } from './guards'

const routes = [
  { path: '/login', component: Login }
  //   { path: '/dashboard', component: Dashboard, beforeEnter: authGuard } // ✅ 需要登入
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
