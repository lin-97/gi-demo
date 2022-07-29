import http from '@/utils/http'
const prefix = '/mock'

import type { ApiCateTreeNode } from './type'

/** @desc 获取分类树 */
export function getCateTreeData() {
  return http.get<ApiCateTreeNode[]>(`${prefix}/cate/tree`)
}
