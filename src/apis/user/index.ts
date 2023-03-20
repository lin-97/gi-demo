import http from '@/utils/http'
import { prefix } from '../config'
import type { LoginRes } from './type'

/** @desc 登录 */
export type LoginParams = { username: string; password: string }
export function login(data: LoginParams) {
  return http.post<ApiRes<LoginRes>>(`${prefix}/user/login`, data)
}

/** @desc 退出登录 */
export function logout() {
  return http.post(`${prefix}/user/logout`)
}
