import axios from '@/utils/axios'
const prefix = '/mock'

export interface LoginData {
  username: string
  password: string
}

export function login(data: LoginData) {
  return axios.post(`${prefix}/user/login`, data)
}

export function logout() {
  return axios.post(`${prefix}/user/logout`)
}
