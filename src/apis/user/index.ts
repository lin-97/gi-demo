import axios from '@/utils/http'
const prefix = '/mock'
import type { LoginRes } from './type'

/** @desc 登录 */
export function login(data: { username: string; password: string }) {
  return axios.post<ApiRes<LoginRes>>(`${prefix}/user/login`, data)
}

/** @desc 退出登录 */
export function logout() {
  return axios.post(`${prefix}/user/logout`)
}

/** @desc 获取动态菜单 */
export function getMenuList() {
  return axios.get(`${prefix}/user/menu`)
}
