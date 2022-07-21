import http from '@/utils/http'
const prefix = '/mock'
import type { Pagination } from '@/types'
import type { ApiListData } from '../type'
import type { ApiTableItem } from './type'

/** @desc 获取表格 */
export function getTableList(data: Pagination) {
  return http.get<ApiListData<ApiTableItem[]>>(`${prefix}/table/list`, data)
}
