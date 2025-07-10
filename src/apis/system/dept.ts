import { getBaseApi } from '@/apis/base'

export interface ListItem {
  id: string
  name: string
  sort: number
  status: Status
  createTime: string
  parentId: string
  children?: ListItem[]
  description: string
}

/** 部门模块 */
export const baseAPI = getBaseApi<ListItem>({ baseUrl: '/system/dept' })
