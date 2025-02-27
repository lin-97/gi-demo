import type * as T from './type'
import http from '@/utils/http'

/** 获取用户数据 */
export function getUserList(params: Pagination) {
  return http.get<PageRes<T.UserItem[]>>('/system/user/getUserList', params)
}

/** 获取用户详情 */
export function getUserDetail(params: { id: string }) {
  return http.get<T.UserDetail>('/system/user/getUserDetail', params)
}
