import axios from '@/utils/axios'
const prefix = '/mock'
import type { Res, Pagination } from '@/types/global'

interface ListData<T> {
  total: number
  list: T[]
}

type ResListData<T> = Res<ListData<T>>

export interface FileItem {
  id: string
  type: string
  name: string
  extendName: string
  src: string | null
  updateTime: string
  isDir: boolean
  filePath: string
  [propName: string]: any // 一个 interface 中任意属性只能有一个
}

// 获取文件列表
export function getFileList(data: { fileType: string | number }) {
  return axios.get<ResListData<FileItem>>(`${prefix}/file/list`, data)
}
