import { RouteRecordRaw } from 'vue-router'

export const routes: Array<RouteRecordRaw> = [
  // 登入驗證後 requiresAuth代表需要登入驗證才能造訪
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/pages/home/HomePage.vue'),
    meta: { requiresAuth: true }
  },
  // 尚未登入可使用isPublic代表公開的 requireGuest代表登入後不可造訪
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/auth/LoginPage.vue'),
    meta: { isPublic: true, requiresGuest: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/pages/auth/RegisterPage.vue'),
    meta: { isPublic: true, requiresGuest: true }
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () => import('@/pages/auth/ForgotPasswordPage.vue'),
    meta: { isPublic: true, requiresGuest: true }
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: () => import('@/pages/auth/ResetPasswordPage.vue'),
    props: (route) => ({ token: route.query.token }),
    beforeEnter: (to, from, next) => {
      if (!to.query.token) {
        next('/forgot-password')
      } else {
        next()
      }
    }
  },
  {
    path: '/terms-conditions',
    name: 'TermsConditions',
    component: () => import('@/pages/auth/TermsConditions.vue'),
    meta: { isPublic: true, requiresGuest: true }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/pages/error/NotFoundPage.vue')
  }
]
