import { getBaseApi } from '@/apis/base'

export interface ListItem {
  id: string
  createUserString: string
  createTime: string
  disabled: boolean
  deptId: string
  deptName: string
  username: string
  nickname: string
  gender: Gender
  avatar: string
  email: string
  phone: string
  status: Status
  type: 1 | 2
  description: string
  roleIds: string[]
  roleNames: string[]
}

/** 用户模块 */
export const baseAPI = getBaseApi<ListItem>({ baseUrl: '/system/user' })
