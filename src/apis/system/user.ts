import type * as System from './type'
import http from '@/utils/http'

/** @desc 获取用户数据 */
export function getSystemUserList(params: Pagination) {
  return http.get<PageRes<System.UserItem[]>>('/system/user', params)
}

/** @desc 获取用户详情 */
export function getSystemUserDetail(params: { id: string }) {
  return http.get<System.UserDetailResult>('/system/user/detail', params)
}
