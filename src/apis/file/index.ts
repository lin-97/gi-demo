import http from '@/utils/http'
import { prefix } from '../config'

import type { FileItem } from './type'

/** @desc 获取文件列表 */
export function getFileList(params: { fileType: string | number }) {
  return http.get<ApiListData<FileItem[]>>(`${prefix}/file/list`, params)
}
