import type * as T from './type'
import http from '@/utils/http'

export type * from './type'

/** 获取文件列表 */
export function getFileList(params: { fileType: string | number }) {
  return http.get<PageRes<T.FileItem[]>>('/file/getFileList', params)
}
