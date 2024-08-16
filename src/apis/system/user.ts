import type * as T from './type'
import http from '@/utils/http'

/** 获取用户数据 */
export function getSystemUserList(params: Pagination) {
  return http.get<PageRes<T.SystemUserItem[]>>('/system/user', params)
}

/** 获取用户详情 */
export function getSystemUserDetail(params: { id: string }) {
  return http.get<T.SystemUserDetail>('/system/user/detail', params)
}
