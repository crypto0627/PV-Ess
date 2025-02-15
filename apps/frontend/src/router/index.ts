import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomePage from '@/pages/home/HomePage.vue'
import LoginPage from '@/pages/auth/LoginPage.vue'
import RegisterPage from '@/pages/auth/RegisterPage.vue'
import ForgotPasswordPage from '@/pages/auth/ForgotPasswordPage.vue'
import NotFoundPage from '@/pages/error/NotFoundPage.vue'
import { useAuthStore } from '@/store/auth'

// 定義路由
const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    name: 'Home',
    component: HomePage,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    meta: { isPublic: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage,
    meta: { isPublic: true }
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPasswordPage,
    meta: { isPublic: true }
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundPage }
]

// 創建路由實例
const router = createRouter({
  history: createWebHistory(),
  routes
})

// 全局路由守衛
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  // 若 isAuthenticated 為 null，表示需要向後端確認登入狀態
  if (authStore.isAuthenticated === null) {
    await authStore.checkAuth()
  }

  // 取得最新的登入狀態
  const isAuthenticated = authStore.isAuthenticated

  // 若需要登入但未登入，導向 /login
  if (to.meta.requiresAuth && !isAuthenticated) {
    return next('/login')
  }

  // 若已登入但嘗試訪問公開頁面，導向 /home
  if (isAuthenticated && to.meta.isPublic) {
    return next('/home')
  }

  next() // 允許正常導航
})

export default router
