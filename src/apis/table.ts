import axios from '@/utils/axios'
const prefix = '/mock'
import type { Res, Pagination } from '@/types/global'

interface ListData<T> {
  total: number
  list: T[]
}

type ResListData<T> = Res<ListData<T>>

export interface TableItem {
  id: string
  index: number
  name: string
  phone: string
  startTime: string
  endTime: string
  address: string
  avatar: string
  date: string
  time: string
  proportion: number
  no: number
  status: true | false
  color: string
}

// 获取表格
export function getTableList(data: Pagination) {
  return axios.get<ResListData<TableItem>>(`${prefix}/table/list`, data)
}
