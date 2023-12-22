import http from '@/utils/http'
import type * as System from './type'

/** @desc 获取角色数据 */
export function getSystemRoleList(params: { current: number; pageSize: number }) {
  return http.get<PageRes<System.RoleItem[]>>('/system/role', params)
}

/** @desc 获取角色详情 */
export function getSystemRoleDetail(params: { id: string }) {
  return http.get<System.RoleItem>('/system/role/detail', params)
}

/** @desc 保存角色 */
export function saveSystemRole(data: any) {
  return http.post<boolean>('/system/role/save', data)
}

/** @desc 删除角色 */
export function deleteSystemRole(data: { ids: string[] }) {
  return http.post<string[]>('/system/role/delete', data)
}

/** @desc 获取角色权限 */
export function getSystemRoleMenuIds(params: { role: string }) {
  return http.get<string[]>('/system/role/menuIds', params)
}
