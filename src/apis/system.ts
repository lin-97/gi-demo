import axios from '@/utils/axios'
const prefix = '/mock'
import type { Res } from '@/types/global'

interface ListData<T> {
  total: number
  list: T[]
}

type ResListData<T> = Res<ListData<T>>

// 获取部门数据
export interface DeptItem {
  id: string
  name: string
  sort: number
  status: 0 | 1
  createTime: string
  parentId: string
  children?: DeptItem[]
}

export function getSystemDeptList() {
  return axios.get<ResListData<DeptItem>>(`${prefix}/system/dept/list`)
}

// 获取用户数据
export interface UserItem {
  id: string
  userNo: string
  userName: string
  nickName: string
  avatar: string
  sex: 0 | 1 // 1男 0女
  status: 0 | 1
  address: string
  phone: string
  createTime: string
}

export function getSystemUserList() {
  return axios.get<ResListData<UserItem>>(`${prefix}/system/user/list`, data)
}

// 获取角色数据
export interface RoleItem {
  id: string
  name: string
  roleCode: string
  status: 1 | 0
  description: string
  createTime: string
}

export function getSystemRoleList() {
  return axios.get<ResListData<RoleItem>>(`${prefix}/system/role/list`, data)
}
