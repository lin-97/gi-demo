import { getBaseApi } from '@/apis/base'
import http from '@/utils/http'

export interface ListItem {
  id: string
  createUserString: string
  createTime: string
  disabled: boolean
  name: string
  code: string
  sort: number
  status: Status
  type: number
  description: string
}

/** 角色模块 */
export const baseAPI = getBaseApi<ListItem>({ baseUrl: '/system/role' })

/** 获取角色权限 */
export function getRoleMenuIds(params: { role: string }) {
  return http.get<string[]>('/system/role/getRoleMenuIds', params)
}
