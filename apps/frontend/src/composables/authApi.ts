import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
})

export function useAuthApi() {
  const login = async (email: string, password: string, config = {}) => {
    return api.post('/auth/login', { email, password }, config)
  }
  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    return api.post('/auth/register', { username, email, password })
  }
  const logout = async (config = {}) => {
    return api.post('auth/logout', {}, config)
  }
  return { login, register, logout }
}
