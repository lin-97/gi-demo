import axios from '@/utils/http'
const prefix = '/mock'
import type { UserLoginParams } from './type'

/** @desc 登录 */
export function login(data: UserLoginParams) {
  return axios.post(`${prefix}/user/login`, data)
}

/** @desc 退出登录 */
export function logout() {
  return axios.post(`${prefix}/user/logout`)
}
