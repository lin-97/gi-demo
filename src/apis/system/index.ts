import http from '@/utils/http'
import { prefix } from '../config'

import type { DeptItem, RoleItem, UserItem } from './type'

/** @desc 获取部门数据 */
export function getSystemDeptList() {
  return http.get<ApiListData<DeptItem[]>>(`${prefix}/system/dept/list`)
}

/** @desc 获取用户数据 */
export function getSystemUserList() {
  return http.get<ApiListData<UserItem[]>>(`${prefix}/system/user/list`)
}

/** @desc 获取角色数据 */
export function getSystemRoleList() {
  return http.get<ApiListData<RoleItem[]>>(`${prefix}/system/role/list`)
}
