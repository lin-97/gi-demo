import axios from '@/utils/axios'
const prefix = '/mock'

import type { ApiListData } from '../type'
import type { ApiFileItem, GetFileListParams } from './type'

// 获取文件列表
export function getFileList(params: GetFileListParams) {
  return axios.get<ApiListData<ApiFileItem>>(`${prefix}/file/list`, params)
}