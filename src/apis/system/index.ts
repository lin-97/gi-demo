import http from '@/utils/http'
import { prefix } from '../config'
import type * as System from './type'

/** @desc 获取部门数据 */
export function getSystemDeptList() {
  return http.get<ApiListData<System.DeptItem[]>>(`${prefix}/system/dept/list`)
}

/** @desc 获取用户数据 */
export function getSystemUserList() {
  return http.get<ApiListData<System.UserItem[]>>(`${prefix}/system/user/list`)
}

/** @desc 获取角色数据 */
export function getSystemRoleList() {
  return http.get<ApiListData<System.RoleItem[]>>(`${prefix}/system/role/list`)
}
