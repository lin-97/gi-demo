import http from '@/utils/http'
import type * as System from './type'

/** @desc 获取菜单数据 */
export function getSystemMenuList() {
  return http.get<System.MenuItem[]>('/system/menu')
}

/** @desc 获取菜单详情 */
export function getSystemMenuDetail(params: { id: string }) {
  return http.get<System.MenuItem>('/system/menu/detail', params)
}

/** @desc 保存菜单 */
export function saveSystemMenu(data: any) {
  return http.post<boolean>('/system/menu/save', data)
}

/** @desc 获取角色分配权限菜单树 */
export function getSystemMenuOptions() {
  return http.get<System.MenuOptionsItem[]>('/system/menu/options')
}

/** @desc 获取动态路由数据 */
export function getSystemAsyncRoutes() {
  return http.get<any[]>('/system/menu/routes')
}
