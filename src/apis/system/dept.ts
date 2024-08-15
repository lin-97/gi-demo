import type * as T from './type'
import http from '@/utils/http'

/** 获取部门数据 */
export function getSystemDeptList() {
  return http.get<T.SystemDeptItem[]>('/system/dept')
}

/** 获取部门详情 */
export function getSystemDeptDetail(params: { id: string }) {
  return http.get<T.SystemDeptItem>('/system/dept/detail', params)
}
