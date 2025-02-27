import type * as T from './type'
import http from '@/utils/http'

export type * from './type'

/** 获取分类树 */
export function getCateTree() {
  return http.get<T.CateTreeItem[]>('/cate/getCateTree')
}
