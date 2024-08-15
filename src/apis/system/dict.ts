import type { SelectOptionData } from '@arco-design/web-vue'
import type * as T from './type'
import http from '@/utils/http'

/** 获取字典数据 */
export function getSystemDictList(params: Pagination) {
  return http.get<PageRes<T.SystemDictItem[]>>('/system/dict', params)
}

/** 获取字典详情 */
export function getSystemDictDetail(params: { id: string }) {
  return http.get<T.SystemDictDetail>('/system/dict/detail', params)
}

/** 字典数据列表 */
export function getSystemDictDataList(params: { code: string } & Pagination) {
  return http.get<PageRes<T.SystemDictDataItem[]>>('/system/dict/dataList', params)
}

/** 字典数据详情 */
export function getSystemDictDataDetail(params: { id: string, code: string }) {
  return http.get<T.SystemDictDataItem>('/system/dict/dataDetail', params)
}

/** 获取字典数据映射 */
export function getSystemDictData() {
  return http.get<Record<string, SelectOptionData[]>>('/system/dictData')
}
