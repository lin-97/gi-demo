import axios from '@/utils/axios'
const prefix = '/mock'
import type { Pagination } from '@/types'
import type { ApiResListData } from '../type'
import type { ApiTableItem } from './type'

// 获取表格
export function getTableList(data: Pagination) {
  return axios.get<ApiResListData<ApiTableItem>>(`${prefix}/table/list`, data)
}
