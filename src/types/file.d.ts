declare namespace File {
  interface FileItem {
    id: string
    type: string
    name: string
    extendName: string
    src: string | null
    updateTime: string
    isDir: boolean
    filePath: string
  }
}
