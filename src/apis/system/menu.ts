import { getBaseApi } from '@/apis/base'
import http from '@/utils/http'

export interface ListItem {
  activeMenu: string
  alwaysShow: boolean
  breadcrumb: boolean
  children: ListItem[]
  component: string
  hidden: boolean
  icon: string
  id: string
  keepAlive: boolean
  parentId: string
  path: string
  permission: string
  redirect: string
  roles: string[]
  showInTabs: boolean
  sort: number
  status: Status
  svgIcon: string
  title: string
  type: 1 | 2 | 3
  affix: boolean
}

export interface MenuOptionsItem {
  id: string
  title: string
  children: MenuOptionsItem[]
}

/** 菜单模块 */
export const baseAPI = getBaseApi<ListItem>({ baseUrl: '/system/menu' })

/** 获取角色分配权限菜单树 */
export function getMenuOptions() {
  return http.get<MenuOptionsItem[]>('/system/menu/getMenuOptions')
}
