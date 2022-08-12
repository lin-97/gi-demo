import http from '@/utils/http'
import qs from 'qs'
const prefix = '/mock'
import type { ApiTableItem } from './type'

/** @desc 获取表格 */
export function getTableList(data: Pagination) {
  return http.get<IResListData<ApiTableItem[]>>(`${prefix}/table/list`, data)
}

/** @desc 获取表格, 如果想要以表单数据格式发请求, 可以用以下方式定义接口 */
export function getTableListByFormData(data: Pagination) {
  return http.get<IResListData<ApiTableItem[]>>(`${prefix}/table/list`, qs.stringify(data), {
    'Content-Type': 'application/x-www-form-urlencoded'
  })
}
