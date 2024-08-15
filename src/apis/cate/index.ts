import type * as T from './type'
import http from '@/utils/http'

/** 获取分类树 */
export function getCateTreeData() {
  return http.get<T.CateTreeItem[]>('/cate/tree')
}
