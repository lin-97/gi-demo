import type * as Cate from './type'
import http from '@/utils/http'

/** @desc 获取分类树 */
export function getCateTreeData() {
  return http.get<Cate.CateItem[]>('/cate/tree')
}
