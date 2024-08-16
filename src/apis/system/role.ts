import type * as T from './type'
import http from '@/utils/http'

/** 获取角色数据 */
export function getSystemRoleList(params: Pagination) {
  return http.get<PageRes<T.SystemRoleItem[]>>('/system/role', params)
}

/** 获取角色详情 */
export function getSystemRoleDetail(params: { id: string }) {
  return http.get<T.SystemRoleItem>('/system/role/detail', params)
}

/** 获取角色权限 */
export function getSystemRoleMenuIds(params: { role: string }) {
  return http.get<string[]>('/system/role/menuIds', params)
}
