import { useAuthStore } from '@/store/auth'
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

export function authGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const authStore = useAuthStore()
  if (!authStore.token) {
    next('/login') // 🚀 未登入，跳轉到登入頁
  } else {
    next() // ✅ 允許進入
  }
}
