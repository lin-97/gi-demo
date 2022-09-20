import http from '@/utils/http'
const prefix = '/mock'

import type { DeptItem, RoleItem, UserItem } from './type'

/** @desc 获取部门数据 */
export function getSystemDeptList() {
  return http.get<ApiRes<ApiListData<DeptItem[]>>>(`${prefix}/system/dept/list`)
}

/** @desc 获取用户数据 */
export function getSystemUserList() {
  return http.get<ApiRes<ApiListData<UserItem[]>>>(`${prefix}/system/user/list`)
}

/** @desc 获取角色数据 */
export function getSystemRoleList() {
  return http.get<ApiRes<ApiListData<RoleItem[]>>>(`${prefix}/system/role/list`)
}
