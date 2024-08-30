import type * as T from './type'
import http from '@/utils/http'
import type { SystemMenuItem } from '@/apis/system'

export type * from './type'

/** 登录 */
export function login(data: { username: string, password: string }) {
  return http.post<T.UserLoginResult>('/user/login', data)
}

/** 退出登录 */
export function logout() {
  return http.post('/user/logout')
}

/** 获取用户信息 */
export const getUserInfo = () => {
  return http.get<T.UserInfoResult>('/user/getUserInfo')
}

/** 获取用户路由信息 */
export const getUserAsyncRoutes = () => {
  return http.get<SystemMenuItem[]>('/user/routes')
}
