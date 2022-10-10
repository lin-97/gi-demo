import http from '@/utils/http'
const prefix = '/mock'

import type { FileItem } from './type'

/** @desc 获取文件列表 */
export function getFileList(params: { fileType: string | number }) {
  return http.get<ApiRes<ApiListData<FileItem[]>>>(`${prefix}/file/list`, params)
}
