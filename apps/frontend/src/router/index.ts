import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomePage from '@/pages/home/HomePage.vue'
import LoginPage from '@/pages/auth/LoginPage.vue'
import RegisterPage from '@/pages/auth/RegisterPage.vue'
import ForgotPasswordPage from '@/pages/auth/ForgotPasswordPage.vue'
import NotFoundPage from '@/pages/error/NotFoundPage.vue'

// 定義路由
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home' // 默認重定向到首頁
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage,
    meta: { requiresAuth: true } // 需要登入
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    meta: { isPublic: true } // 公開路由
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage,
    meta: { isPublic: true } // 公開路由
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPasswordPage,
    meta: { isPublic: true } // 公開路由
  },
  {
    path: '/:pathMatch(.*)*', // 捕獲所有不存在的路由
    name: 'NotFound',
    component: NotFoundPage // 顯示 404 頁面
  }
]

// 創建路由實例
const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守衛：檢查是否需要登入
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token') // 從 localStorage 檢查 token
  // 如果路由是公開的，直接放行
  if (to.meta.isPublic) {
    return next()
  }

  // 如果路由需要驗證且用戶未登入，重定向到登入頁面
  if (to.meta.requiresAuth && !isAuthenticated) {
    return next('/login')
  }
  // 如果用戶已登入且嘗試訪問公開路由，重定向到首頁
  if (isAuthenticated && to.meta.isPublic) {
    return next('/home')
  }
  // 否則繼續
  next()
})

export default router
