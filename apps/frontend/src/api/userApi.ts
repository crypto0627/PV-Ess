import { User } from '@/types/userType'
import axios from 'axios'

const api = axios.create({
  baseURL: process.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

export function useUserApi() {
  const getUserProfile = (): Promise<User> => {
    return api.get('/users/profile')
  }

  return { getUserProfile }
}
