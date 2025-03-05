import axios from 'axios'

const api = axios.create({
  baseURL: process.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

export function useAuthApi() {
  const login = (email: string, password: string) => {
    return api.post('/auth/login', { email, password })
  }

  const register = (username: string, email: string, password: string) => {
    return api.post('/auth/register', { username, email, password })
  }

  const logout = (config = {}) => {
    return api.post('/auth/logout', {}, config)
  }

  const me = () => {
    return api.get('/auth/me')
  }

  const forgotPassword = (email: string) => {
    return api.post('/auth/forgot-password', { email })
  }

  const verifyResetToken = (resetToken: string) => {
    return api.post('/auth/verify-reset-token', { resetToken })
  }

  const resetPassword = (token: string, password: string) => {
    return api.post('/auth/reset-password', { token, password })
  }

  return {
    login,
    register,
    logout,
    me,
    forgotPassword,
    resetPassword,
    verifyResetToken,
  }
}
