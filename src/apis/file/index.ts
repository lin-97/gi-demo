import http from '@/utils/http'
const prefix = '/mock'

import type { ApiFileItem, FileListParams } from './type'

/** @desc 获取文件列表 */
export function getFileList(params: FileListParams) {
  return http.get<ApiRes<ApiListData<ApiFileItem[]>>>(`${prefix}/file/list`, params)
}
