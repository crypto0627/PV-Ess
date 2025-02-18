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
      const res = await login(email, password)
      this.user = res.data.user
      this.isAuthenticated = true
      return res
    },
    async register(username: string, email: string, password: string) {
      const { register } = useAuthApi()
      const res = await register(username, email, password)
      this.user = res.data.user
      this.isAuthenticated = false
      return res
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
      const res = await me()
      if (res.status === 200) {
        this.user = res.data.user
        this.isAuthenticated = true
      } else {
        this.user = null
        this.isAuthenticated = false
      }
    },
    async forgot_password(email: string) {
      const { forgot_password } = useAuthApi()
      const res = await forgot_password(email)
      return res
    },
    async verify_reset_token(resetToken: string) {
      const { verify_reset_token } = useAuthApi()
      const res = await verify_reset_token(resetToken)
      return res
    },
    async reset_password(token: string, password: string) {
      const { reset_password } = useAuthApi()
      const res = await reset_password(token, password)
      return res
    }
  }
})
