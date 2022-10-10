import http from '@/utils/http'
const prefix = '/mock'

import type { CateItem } from './type'

/** @desc 获取分类树 */
export function getCateTreeData() {
  return http.get<ApiRes<CateItem[]>>(`${prefix}/cate/tree`)
}
