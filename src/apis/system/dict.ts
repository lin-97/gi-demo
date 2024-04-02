import http from '@/utils/http'
import type * as System from './type'

/** @desc 获取字典数据 */
export function getSystemDictList(params: { current: number; pageSize: number }) {
  return http.get<PageRes<System.DictItem[]>>('/system/dict', params)
}

/** @desc 获取字典详情 */
export function getSystemDictDetail(params: { id: string }) {
  return http.get<System.DictDetailResult>('/system/dict/detail', params)
}

/** @desc 字典数据列表 */
export function getSystemDictDataList(params: { current: number; pageSize: number; code: string }) {
  return http.get<PageRes<System.DictDataItem[]>>('/system/dict/dataList', params)
}

/** @desc 字典数据详情 */
export function getSystemDictDataDetail(params: { id: string; code: string }) {
  return http.get<System.DictDataItem>('/system/dict/dataDetail', params)
}
