import { defineStore } from 'pinia'
import { login, logout } from '@/api/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as null | { id: string; email: string; username: string },
    token: localStorage.getItem('token') || ''
  }),
  actions: {
    async loginUser(email: string, password: string) {
      try {
        const res = await login(email, password)
        this.token = res.data.token
        this.user = res.data.user
        localStorage.setItem('token', res.data.token)
      } catch (error) {
        console.error('登入失敗:', error)
        throw error
      }
    },
    async logoutUser() {
      try {
        await logout()
        this.token = ''
        this.user = null
        localStorage.removeItem('token')
      } catch (error) {
        console.error('登出失敗:', error)
      }
    }
  }
})
