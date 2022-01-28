import { defineStore } from 'pinia'

type ViewMode = 1 | 2

type FileState = {
  viewMode: ViewMode
  selectedFileList: object[]
  isBatchMode: boolean
}

export const useFileStore = defineStore({
  id: 'File',
  state: (): FileState => {
    return {
      // 视图: 1宫格模式 2列表模式
      viewMode: 1,
      // 当前批量勾选的文件列表
      selectedFileList: JSON.parse(window.sessionStorage.getItem('FILE_LIST')) || [],
      // 是否批量操作: true:批量 false:单文件
      isBatchMode: false
    }
  },
  getters: {
    // 当前勾选文件的id数组
    selectedFileIdList() {
      return this.selectedFileList.map((i) => i.id)
    }
  },
  actions: {
    // 设置视图模式
    changeViewMode(value: ViewMode) {
      this.viewMode = value
    },
    // 添加选中的文件到文件勾选列表
    addSelectedFileItem(item) {
      if (this.selectedFileIdList.includes(item.id)) {
        let index = this.selectedFileList.findIndex((i) => i.id === item.id)
        this.selectedFileList.splice(index, 1)
        window.sessionStorage.setItem('FILE_LIST', JSON.stringify(this.selectedFileList))
      } else {
        this.selectedFileList.push(item)
        window.sessionStorage.setItem('FILE_LIST', JSON.stringify(this.selectedFileList))
      }
    }
  }
})
