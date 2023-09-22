import http from '@/utils/http'
import { prefix } from '../config'
import type * as System from './type'

/** @desc 获取部门数据 */
export function getSystemDeptList() {
  return http.get<System.DeptItem[]>(`${prefix}/system/dept`)
}

/** @desc 获取部门详情 */
export function getSystemDeptDetil(params: { id: string }) {
  return http.get<System.DeptItem>(`${prefix}/system/dept/detail`, params)
}

/** @desc 保存部门 */
export function saveSystemDept(data: any) {
  return http.post<boolean>(`${prefix}/system/dept/save`, data)
}

/** @desc 获取角色数据 */
export function getSystemRoleList() {
  return http.get<ApiListData<System.RoleItem[]>>(`${prefix}/system/role`)
}

/** @desc 获取角色详情 */
export function getSystemRoleDetail(params: { id: string }) {
  return http.get<System.RoleItem>(`${prefix}/system/role/detail`, params)
}

/** @desc 保存角色 */
export function saveSystemRole(data: any) {
  return http.post<boolean>(`${prefix}/system/role/save`, data)
}

/** @desc 获取角色权限 */
export function getSystemRoleMenuIds(params: { role: string }) {
  return http.get<string[]>(`${prefix}/system/role/menuIds`, params)
}

/** @desc 获取用户数据 */
export function getSystemUserList() {
  return http.get<ApiListData<System.UserItem[]>>(`${prefix}/system/user`)
}

/** @desc 获取用户详情 */
export function getSystemUserDetail(params: { id: string }) {
  return http.get<System.UserDetailResult>(`${prefix}/system/user/detail`, params)
}

/** @desc 保存用户 */
export function saveSystemUser(data: any) {
  return http.post<boolean>(`${prefix}/system/user/save`, data)
}

/** @desc 获取菜单数据 */
export function getSystemMenuList() {
  return http.get<System.MenuItem[]>(`${prefix}/system/menu`)
}

/** @desc 获取菜单详情 */
export function getSystemMenuDetail(params: { id: string }) {
  return http.get<System.MenuItem>(`${prefix}/system/menu/detail`, params)
}

/** @desc 保存菜单 */
export function saveSystemMenu(data: any) {
  return http.post<boolean>(`${prefix}/system/menu/save`, data)
}

/** @desc 获取角色分配权限菜单树 */
export function getSystemMenuOptions() {
  return http.get<System.MenuOptionsItem[]>(`${prefix}/system/menu/options`)
}

/** @desc 获取动态路由数据 */
export function getSystemAsyncRoutes() {
  return http.get<any[]>(`${prefix}/system/menu/routes`)
}
