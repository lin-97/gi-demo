import type * as T from './type'
import http from '@/utils/http'

/** 获取角色数据 */
export function getRoleList(params: Pagination) {
  return http.get<PageRes<T.RoleItem[]>>('/system/role/getRoleList', params)
}

/** 获取角色详情 */
export function getRoleDetail(params: { id: string }) {
  return http.get<T.RoleItem>('/system/role/getRoleDetail', params)
}

/** 获取角色权限 */
export function getRoleMenuIds(params: { role: string }) {
  return http.get<string[]>('/system/role/getRoleMenuIds', params)
}
