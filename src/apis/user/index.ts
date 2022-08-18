import axios from '@/utils/http'
const prefix = '/mock'
import type { LoginParams } from './type'

/** @desc 登录 */
export function login(data: LoginParams) {
  return axios.post(`${prefix}/user/login`, data)
}

/** @desc 退出登录 */
export function logout() {
  return axios.post(`${prefix}/user/logout`)
}

/** @desc 获取动态菜单 */
export function getMenuList() {
  return axios.get(`${prefix}/user/menu`)
}
