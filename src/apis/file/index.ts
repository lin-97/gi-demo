import type * as File from './type'
import http from '@/utils/http'

/** @desc 获取文件列表 */
export function getFileList(params: { fileType: string | number }) {
  return http.get<PageRes<File.FileItem[]>>('/file/list', params)
}
