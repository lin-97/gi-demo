// 文件
export interface ApiFileItem {
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

export type FileListParams = { fileType: string | number }
