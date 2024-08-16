import type * as T from './type'
import http from '@/utils/http'

/** 获取菜单数据 */
export function getSystemMenuList() {
  return http.get<T.SystemMenuItem[]>('/system/menu')
}

/** 获取菜单详情 */
export function getSystemMenuDetail(params: { id: string }) {
  return http.get<T.SystemMenuItem>('/system/menu/detail', params)
}

/** 获取角色分配权限菜单树 */
export function getSystemMenuOptions() {
  return http.get<T.SystemMenuOptionsItem[]>('/system/menu/options')
}

/** 获取动态路由数据 */
export function getSystemAsyncRoutes() {
  return http.get<any[]>('/system/menu/routes')
}
