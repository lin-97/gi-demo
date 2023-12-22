import http from '@/utils/http'
import type * as System from './type'

/** @desc 获取部门数据 */
export function getSystemDeptList() {
  return http.get<System.DeptItem[]>('/system/dept')
}

/** @desc 获取部门详情 */
export function getSystemDeptDetil(params: { id: string }) {
  return http.get<System.DeptItem>('/system/dept/detail', params)
}

/** @desc 保存部门 */
export function saveSystemDept(data: any) {
  return http.post<boolean>('/system/dept/save', data)
}
