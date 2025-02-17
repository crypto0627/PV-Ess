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
    meta: { isPublic: true, requiresGuest: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage,
    meta: { isPublic: true, requiresGuest: true }
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPasswordPage,
    meta: { isPublic: true, requiresGuest: true }
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

  // 確保登入狀態最新
  try {
    await authStore.me()
  } catch {
    authStore.isAuthenticated = false
  }

  const isAuthenticated = authStore.isAuthenticated

  // 已登入的使用者不能進入 Login / Register
  if (to.meta.requiresGuest && isAuthenticated) {
    return next('/home')
  }

  // 需要登入的頁面，卻未登入，導向登入頁
  if (to.meta.requiresAuth && !isAuthenticated) {
    return next('/login')
  }

  // 其他情況正常進入
  next()
})

export default router
