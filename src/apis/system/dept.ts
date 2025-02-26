import type * as T from './type'
import http from '@/utils/http'

/** 获取部门数据 */
export function getDeptList() {
  return http.get<T.DeptItem[]>('/system/dept/getDeptList')
}

/** 获取部门详情 */
export function getDeptDetail(params: { id: string }) {
  return http.get<T.DeptItem>('/system/dept/getDeptDetail', params)
}
