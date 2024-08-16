import http from '@/utils/http'

/** 保存 */
export function saveBaseApi(data: any) {
  return http.post<boolean>('/base/save', data)
}

/** 删除 */
export function deleteBaseApi(data: { ids: string[] }) {
  return http.post<string[]>('/base/delete', data)
}
