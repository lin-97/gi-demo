import axios from '@/utils/axios'
const prefix = '/mock'
import type { ApiListData } from '../type'
import type { ApiDeptItem, ApiRoleItem, ApiUserItem } from './type'

// 获取部门数据
export function getSystemDeptList() {
  return axios.get<ApiListData<ApiDeptItem>>(`${prefix}/system/dept/list`)
}

// 获取用户数据
export function getSystemUserList() {
  return axios.get<ApiListData<ApiUserItem>>(`${prefix}/system/user/list`)
}

// 获取角色数据
export function getSystemRoleList() {
  return axios.get<ApiListData<ApiRoleItem>>(`${prefix}/system/role/list`)
}
