import type { SelectOptionData } from '@arco-design/web-vue'
import type * as T from './type'
import http from '@/utils/http'

/** 获取字典数据 */
export function getDictList(params: Pagination) {
  return http.get<PageRes<T.SystemDictItem[]>>('/system/dict/getDictList', params)
}

/** 获取字典详情 */
export function getDictDetail(params: { id: string }) {
  return http.get<T.DictDetail>('/system/dict/getDictDetail', params)
}

/** 字典数据列表 */
export function getDictDataList(params: { code: string } & Pagination) {
  return http.get<PageRes<T.DictDataItem[]>>('/system/dict/getDictDataList', params)
}

/** 字典数据详情 */
export function getDictDataDetail(params: { id: string, code: string }) {
  return http.get<T.DictDataItem>('/system/dict/getDictDataDetail', params)
}

/** 获取字典数据映射 */
export function getDictData() {
  return http.get<Record<string, SelectOptionData[]>>('/system/dict/getDictData')
}
