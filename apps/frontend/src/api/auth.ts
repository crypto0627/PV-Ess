import api from './index'

export const login = async (email: string, password: string) => {
  return api.post('/auth/login', { email, password })
}

export const register = async (
  email: string,
  password: string,
  username: string
) => {
  return api.post('/auth/register', { email, password, username })
}

export const logout = async () => {
  return api.post('/auth/signout')
}
