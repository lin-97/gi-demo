import axios from '@/utils/axios'
const prefix = '/mock'
import type { ApiLoginParams } from './type'

export function login(data: ApiLoginParams) {
  return axios.post(`${prefix}/user/login`, data)
}

export function logout() {
  return axios.post(`${prefix}/user/logout`)
}
