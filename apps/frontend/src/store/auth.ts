import { defineStore } from 'pinia'
import { useAuthApi } from '@/api/authApi'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: null as boolean | null
  }),
  actions: {
    async login(email: string, password: string) {
      const { login } = useAuthApi()
      const response = await login(email, password)
      this.user = response.data.user
      this.isAuthenticated = true
    },
    async register(username: string, email: string, password: string) {
      const { register } = useAuthApi()
      const response = await register(username, email, password)
      this.user = response.data.user
      this.isAuthenticated = false
    },
    async logout() {
      const { logout } = useAuthApi()
      await logout()
      this.user = null
      this.isAuthenticated = false
      window.location.href = '/login'
    },
    async me() {
      const { me } = useAuthApi()
      const response = await me()
      if (response.status === 200) {
        this.user = response.data.user
        this.isAuthenticated = true
      } else {
        this.user = null
        this.isAuthenticated = false
      }
    }
  }
})
