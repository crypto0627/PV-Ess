import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
})

export function useAuthApi() {
  const login = async (email: string, password: string) => {
    return api.post('/auth/login', { email, password })
  }

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    return api.post('/auth/register', { username, email, password })
  }

  const logout = async (config = {}) => {
    return api.post('/auth/logout', {}, config)
  }

  const me = async () => {
    return api.get('/auth/me')
  }

  const forgot_password = async (email: string) => {
    return api.post('/auth/forgot-password', { email })
  }

  const verify_reset_token = async (resetToken: string) => {
    return api.post('/auth/verify-reset-token', { resetToken })
  }

  const reset_password = async (token: string, password: string) => {
    return api.post('/auth/reset-password', { token, password })
  }

  return {
    login,
    register,
    logout,
    me,
    forgot_password,
    reset_password,
    verify_reset_token
  }
}
